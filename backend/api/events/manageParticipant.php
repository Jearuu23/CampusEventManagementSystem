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
	$event_id = $data['event_id'] ?? null;
	$participant_id = $data['participant_id'] ?? null;
	$status = $data['status'] ?? null;

	$errors = [];
	if (!Validator::int($event_id)) {
		$errors['event_id'] = "Valid Event ID is required.";
	}
	if (!Validator::int($participant_id)) {
		$errors['participant_id'] = "Valid Participant ID is required.";
	}
	if (!Validator::string($status)) {
		$errors['status'] = "Status is required.";
	}
	if (!empty($errors)) {
		echo json_encode(["success" => false, "message" => "Validation failed", "errors" => $errors]);
		exit;
	}

	$stmt = $conn->prepare("UPDATE event_registrations SET status = ? WHERE event_id = ? AND participant_id = ?");
	$stmt->bind_param("sii", $status, $event_id, $participant_id);
	echo json_encode(["success" => $stmt->execute(), "message" => "Participant status updated"]);
	$stmt->close();
}