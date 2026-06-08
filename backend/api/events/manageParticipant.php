<?php
include_once "../core/header.php";
include "../../database/db.php";
require_once "../../helpers/validation.php";

if (session_status() === PHP_SESSION_NONE) {
	session_start();
}

header('Content-Type: application/json');

if (!isset($_SESSION["user_id"])) {
	echo json_encode(["success" => false, "message" => "Unauthorized"]);
	exit;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'PUT') {
	$data = json_decode(file_get_contents("php://input"), true);
	$event_id = $data['eventId'] ?? null;
	$participant_id = $data['participantId'] ?? null;
	$status = $data['status'] ?? null;

	$errors = [];
	if (!Validator::int($event_id)) {
		$errors['eventId'] = "Valid Event ID is required.";
	}
	if (!Validator::int($participant_id)) {
		$errors['participantId'] = "Valid Participant ID is required.";
	}
	if (!Validator::string($status)) {
		$errors['status'] = "Status is required.";
	}
	if (!empty($errors)) {
		echo json_encode(["success" => false, "message" => "Validation failed", "errors" => $errors]);
		exit;
	}

	$points = 0;
	if ($status === 'registered')
		$points = 10;
	else if ($status === 'attended')
		$points = 50;

	$stmt = $conn->prepare("UPDATE event_registrations SET status = ?, points = ? WHERE event_id = ? AND participant_id = ?");
	$stmt->bind_param("siii", $status, $points, $event_id, $participant_id);
	echo json_encode(["success" => $stmt->execute(), "message" => "Participant status updated"]);
	$stmt->close();
}