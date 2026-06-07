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

$errors = [];
if (!Validator::int($_GET['event_id'] ?? null)) {
	$errors['event_id'] = "Valid Event ID is required.";
}

if (!empty($errors)) {
	echo json_encode([
		"success" => false,
		"message" => "Validation failed",
		"errors" => $errors
	]);
	exit;
}

$event_id = intval($_GET['event_id']);
$user_id = $_SESSION["user_id"];
$user_role = $_SESSION["role"];

// Check authorization: must be admin or the organizer of this event
if ($user_role !== "admin") {
	$checkEventStmt = $conn->prepare("SELECT organizer_id FROM events WHERE id = ?");
	$checkEventStmt->bind_param("i", $event_id);
	$checkEventStmt->execute();
	$eventResult = $checkEventStmt->get_result();

	if ($eventResult->num_rows === 0) {
		echo json_encode(["success" => false, "message" => "Event not found"]);
		$checkEventStmt->close();
		$conn->close();
		exit;
	}

	$eventRow = $eventResult->fetch_assoc();
	if ($eventRow["organizer_id"] !== $user_id) {
		echo json_encode([
			"success" => false,
			"message" => "Unauthorized: You can only view participants for your own events."
		]);
		$checkEventStmt->close();
		$conn->close();
		exit;
	}
	$checkEventStmt->close();
}

// Fetch participants along with their registration status
$query = "
    SELECT 
        p.id, 
        p.first_name, 
        p.last_name, 
        p.email, 
        p.phone, 
        p.organization, 
        er.status, 
        er.registered_at,
        er.points
    FROM event_registrations er
    JOIN users p ON er.participant_id = p.id
    WHERE er.event_id = ?
    ORDER BY er.registered_at DESC
";

$stmt = $conn->prepare($query);

$stmt->bind_param("i", $event_id);
$stmt->execute();
$result = $stmt->get_result();

$participants = [];
while ($row = $result->fetch_assoc()) {
	$participants[] = $row;
}

echo json_encode(["success" => true, "participants" => $participants]);

$stmt->close();
$conn->close();
