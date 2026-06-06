<?php
include_once "../core/header.php";
include "../../database/db.php";

if (session_status() === PHP_SESSION_NONE) {
	session_start();
}

header('Content-Type: application/json');

if (!isset($_SESSION["user_id"])) {
	echo json_encode(["success" => false, "message" => "Unauthorized"]);
	exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true);

if ($method === 'PUT') {
	// Update Event Status
	$id = $data['id'] ?? null;
	$status = $data['status'] ?? null;

	if (!$id || !$status) {
		echo json_encode(["success" => false, "message" => "Missing id or status"]);
		exit;
	}

	$stmt = $conn->prepare("UPDATE events SET status = ? WHERE id = ?");
	$stmt->bind_param("si", $status, $id);
	echo json_encode(["success" => $stmt->execute(), "message" => "Event status updated"]);
	$stmt->close();
} elseif ($method === 'DELETE') {
	// Delete Event
	$id = $data['id'] ?? null;

	$stmt = $conn->prepare("DELETE FROM events WHERE id = ?");
	$stmt->bind_param("i", $id);
	echo json_encode(["success" => $stmt->execute(), "message" => "Event deleted"]);
	$stmt->close();
} else {
	echo json_encode(["success" => false, "message" => "Invalid request method"]);
}