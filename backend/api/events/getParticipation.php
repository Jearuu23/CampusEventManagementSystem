<?php
include_once "../core/header.php";
include "../../database/db.php";
require_once "../../helpers/validation.php";

$event_id = isset($_GET['eventId']) ? intval($_GET['eventId']) : null;
$email = isset($_GET['email']) ? trim($_GET['email']) : null;

$errors = [];
if (!Validator::int($event_id)) {
	$errors['eventId'] = "Valid Event ID is required.";
}
if (!Validator::email($email)) {
	$errors['email'] = "A valid email is required.";
}

if (!empty($errors)) {
	echo json_encode(["success" => false, "message" => "Validation failed", "errors" => $errors]);
	exit;
}

$stmt = $conn->prepare("
    SELECT er.status, er.points 
    FROM event_registrations er
    JOIN users p ON er.participant_id = p.id
    WHERE er.event_id = ? AND p.email = ?
");

$stmt->bind_param("is", $event_id, $email);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
	echo json_encode(["success" => true, "data" => ["status" => $row['status'], "points" => intval($row['points'])]]);
} else {
	echo json_encode(["success" => false, "message" => "Participation record not found."]);
}

$stmt->close();
$conn->close();