<?php
include_once "../core/header.php";
include "../../database/db.php";
require_once "../../helpers/validation.php";

session_start();
if (!isset($_SESSION["user_id"])) {
	echo json_encode([
		"success" => false,
		"message" => "Unauthorized access. Please log in."
	]);
	exit;
}

$data = json_decode(file_get_contents("php://input"), true);
if (empty($data)) {
	$data = $_POST;
}

$errors = [];
if (!Validator::string($data['title'] ?? '')) {
	$errors['title'] = "Title is required.";
}
if (empty($data['event_date']) && empty($data['event_start_date'])) {
	$errors['event_start_date'] = "Event date is required.";
}
if (!Validator::int($data['organizer_id'] ?? null)) {
	$errors['organizer_id'] = "Organizer ID is required.";
}
if (!empty($data['max_participants']) && !Validator::int($data['max_participants'])) {
	$errors['max_participants'] = "Max participants must be a valid number.";
}

if (!empty($errors)) {
	echo json_encode([
		"success" => false,
		"message" => "Validation failed",
		"errors" => $errors
	]);
	exit;
}

$title = trim($data["title"]);
$description = isset($data["description"]) ? trim($data["description"]) : null;
$event_start_date = isset($data["event_start_date"]) ? trim($data["event_start_date"]) : trim($data["event_date"]);
$event_start_time = isset($data["event_time"]) ? trim($data["event_time"]) : (isset($data["event_start_time"]) ? trim($data["event_start_time"]) : "00:00:00");
$event_end_date = isset($data["event_end_date"]) ? trim($data["event_end_date"]) : $event_start_date;
$event_end_time = isset($data["event_end_time"]) ? trim($data["event_end_time"]) : $event_start_time;
$location = isset($data["location"]) ? trim($data["location"]) : null;
$max_participants = isset($data["max_participants"]) ? intval($data["max_participants"]) : null;
$status = isset($data["status"]) ? trim($data["status"]) : "pending";
$organizer_id = intval($data["organizer_id"]);

if ($_SESSION["role"] !== "admin" && $_SESSION["user_id"] !== $organizer_id) {
	echo json_encode([
		"success" => false,
		"message" => "Unauthorized: You can only create events for your own account."
	]);
	exit;
}

$allowedStatuses = ["pending", "approved", "rejected", "ongoing", "completed", "cancelled"];
if (!in_array($status, $allowedStatuses, true)) {
	echo json_encode([
		"success" => false,
		"message" => "Invalid event status"
	]);
	exit;
}

// Verify organizer exists and has admin/organizer role.
$userStmt = $conn->prepare("SELECT id FROM users WHERE id = ? AND role IN ('admin','organizer') AND status = 'approved'");
$userStmt->bind_param("i", $organizer_id);
$userStmt->execute();
$userResult = $userStmt->get_result();

if ($userResult->num_rows === 0) {
	echo json_encode([
		"success" => false,
		"message" => "Invalid organizer_id or user is not authorized"
	]);
	$userStmt->close();
	$conn->close();
	exit;
}

$userStmt->close();

$image_path = null;
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
	$uploadDir = '../../uploads/events/';
	if (!is_dir($uploadDir)) {
		mkdir($uploadDir, 0777, true);
	}
	$fileExt = strtolower(pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));
	$allowedExts = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

	if (in_array($fileExt, $allowedExts)) {
		$fileName = uniqid('event_') . '.' . $fileExt;
		$targetFile = $uploadDir . $fileName;

		if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
			$image_path = 'uploads/events/' . $fileName;
		}
	}
}

$insertStmt = $conn->prepare(
	"INSERT INTO events (
        title,
        description,
        event_start_date,
        event_start_time,
        event_end_date,
        event_end_time,
        location,
        organizer_id,
        max_participants,
        status,
        image_path
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
);

$insertStmt->bind_param(
	"sssssssiiss",
	$title,
	$description,
	$event_start_date,
	$event_start_time,
	$event_end_date,
	$event_end_time,
	$location,
	$organizer_id,
	$max_participants,
	$status,
	$image_path
);

if ($insertStmt->execute()) {
	echo json_encode([
		"success" => true,
		"message" => "Event created successfully",
		"event_id" => $insertStmt->insert_id
	]);
} else {
	echo json_encode([
		"success" => false,
		"message" => "Event creation failed: " . $conn->error
	]);
}

$insertStmt->close();
$conn->close();
