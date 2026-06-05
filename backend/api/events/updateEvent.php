<?php
include_once "../core/header.php";
include "../../database/db.php";

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

if (
	empty($data["id"]) ||
	empty($data["title"]) ||
	empty($data["event_date"]) ||
	empty($data["organizer_id"])
) {
	echo json_encode([
		"success" => false,
		"message" => "Missing required fields: id, title, event_date, organizer_id"
	]);
	exit;
}

$id = intval($data["id"]);
$title = trim($data["title"]);
$description = isset($data["description"]) ? trim($data["description"]) : null;
$event_date = trim($data["event_date"]);
$event_time = isset($data["event_time"]) ? trim($data["event_time"]) : null;
$location = isset($data["location"]) ? trim($data["location"]) : null;
$max_participants = isset($data["max_participants"]) ? intval($data["max_participants"]) : null;
$status = isset($data["status"]) ? trim($data["status"]) : "draft";
$organizer_id = intval($data["organizer_id"]);

if ($_SESSION["role"] !== "admin" && $_SESSION["user_id"] !== $organizer_id) {
	echo json_encode([
		"success" => false,
		"message" => "Unauthorized: You can only modify your own events."
	]);
	exit;
}

$allowedStatuses = ["draft", "published", "ongoing", "completed", "cancelled"];
if (!in_array($status, $allowedStatuses, true)) {
	echo json_encode([
		"success" => false,
		"message" => "Invalid event status"
	]);
	exit;
}

$dateTime = DateTime::createFromFormat("Y-m-d H:i:s", $event_date);
if (!$dateTime) {
	echo json_encode([
		"success" => false,
		"message" => "Invalid event_date format. Use YYYY-MM-DD HH:MM:SS"
	]);
	exit;
}

if ($event_time !== null && !DateTime::createFromFormat("H:i:s", $event_time)) {
	echo json_encode([
		"success" => false,
		"message" => "Invalid event_time format. Use HH:MM:SS"
	]);
	exit;
}

$checkStmt = $conn->prepare("SELECT id FROM events WHERE id = ? AND organizer_id = ?");
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
		"UPDATE events SET title = ?, description = ?, event_date = ?, event_time = ?, location = ?, max_participants = ?, status = ?, image_path = ? WHERE id = ?"
	);
	$updateStmt->bind_param("sssssissi", $title, $description, $event_date, $event_time, $location, $max_participants, $status, $image_path, $id);
} else {
	$updateStmt = $conn->prepare(
		"UPDATE events SET title = ?, description = ?, event_date = ?, event_time = ?, location = ?, max_participants = ?, status = ? WHERE id = ?"
	);
	$updateStmt->bind_param("sssssisi", $title, $description, $event_date, $event_time, $location, $max_participants, $status, $id);
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