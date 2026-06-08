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
if (empty($data['eventStartDate'])) {
	$errors['eventStartDate'] = "Event date is required.";
}
if (!Validator::int($data['organizerId'] ?? null)) {
	$errors['organizerId'] = "Organizer ID is required.";
}
if (!empty($data['maxParticipants']) && !Validator::int($data['maxParticipants'])) {
	$errors['maxParticipants'] = "Max participants must be a valid number.";
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
$event_start_date = trim($data["eventStartDate"]);
$event_start_time = isset($data["eventStartTime"]) ? trim($data["eventStartTime"]) : "00:00:00";
$event_end_date = isset($data["eventEndDate"]) ? trim($data["eventEndDate"]) : $event_start_date;
$event_end_time = isset($data["eventEndTime"]) ? trim($data["eventEndTime"]) : $event_start_time;
$location = isset($data["location"]) ? trim($data["location"]) : null;
$max_participants = isset($data["maxParticipants"]) ? intval($data["maxParticipants"]) : null;
$status = isset($data["status"]) ? trim($data["status"]) : "pending";
$organizer_id = intval($data["organizerId"]);

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
		"message" => "Invalid organizerId or user is not authorized"
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
		"eventId" => $insertStmt->insert_id
	]);
} else {
	echo json_encode([
		"success" => false,
		"message" => "Event creation failed: " . $conn->error
	]);
}

$insertStmt->close();
$conn->close();
