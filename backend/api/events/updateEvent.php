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
if (!Validator::int($data['id'] ?? null)) {
	$errors['id'] = "Valid Event ID is required.";
}
if (!Validator::string($data['title'] ?? '')) {
	$errors['title'] = "Title is required.";
}
if (empty($data['eventStartDate'])) { // Assuming eventStartDate is the primary date field
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
		"errors" => $errors // Return camelCase error keys
	]);
	exit;
}

$id = intval($data["id"]);
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
		"message" => "Unauthorized: You can only modify your own events."
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

$checkStmt = $conn->prepare("SELECT id, status FROM events WHERE id = ? AND organizer_id = ?");
$checkStmt->bind_param("ii", $id, $organizer_id);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();

if ($checkResult->num_rows === 0) {
	echo json_encode([
		"success" => false,
		"message" => "Event not found or unauthorized to update"
	]);
	$checkStmt->close();
	$conn->close();
	exit;
}

$eventRow = $checkResult->fetch_assoc();
if (in_array($eventRow['status'], ['completed', 'cancelled'])) {
	echo json_encode([
		"success" => false,
		"message" => "Cannot edit a completed or cancelled event"
	]);
	$checkStmt->close();
	$conn->close();
	exit;
}
$checkStmt->close();

$image_path = null;
$image_updated = false;

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
			$image_updated = true;
		}
	}
}

if ($image_updated) {
	$updateStmt = $conn->prepare(
		"UPDATE events SET title = ?, description = ?, event_start_date = ?, event_start_time = ?, event_end_date = ?, event_end_time = ?, location = ?, max_participants = ?, status = ?, image_path = ? WHERE id = ?"
	);
	$updateStmt->bind_param("sssssssissi", $title, $description, $event_start_date, $event_start_time, $event_end_date, $event_end_time, $location, $max_participants, $status, $image_path, $id);
} else {
	$updateStmt = $conn->prepare(
		"UPDATE events SET title = ?, description = ?, event_start_date = ?, event_start_time = ?, event_end_date = ?, event_end_time = ?, location = ?, max_participants = ?, status = ? WHERE id = ?"
	);
	$updateStmt->bind_param("sssssssisi", $title, $description, $event_start_date, $event_start_time, $event_end_date, $event_end_time, $location, $max_participants, $status, $id);
}

if ($updateStmt->execute()) {
	echo json_encode([
		"success" => true,
		"message" => "Event updated successfully"
	]);
} else {
	echo json_encode([
		"success" => false,
		"message" => "Event update failed: " . $conn->error
	]);
}

$updateStmt->close();
$conn->close();