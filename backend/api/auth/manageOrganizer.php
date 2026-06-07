<?php
include_once "../core/header.php";
include "../../database/db.php";

if (session_status() === PHP_SESSION_NONE) {
	session_start();
}

header('Content-Type: application/json');

if (!isset($_SESSION["user_id"]) || $_SESSION["role"] !== 'admin') {
	echo json_encode(["success" => false, "message" => "Unauthorized"]);
	exit;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
	// Fetch all organizers
	$result = $conn->query("SELECT id, first_name, last_name, CONCAT(first_name, ' ', last_name) AS name, email, organization as org, status FROM organizers WHERE role = 'organizer'");
	$organizers = [];
	while ($row = $result->fetch_assoc()) {
		$organizers[] = $row;
	}
	echo json_encode(["success" => true, "data" => $organizers]);
} elseif ($method === 'PUT') {
	// Update organizer status
	$data = json_decode(file_get_contents("php://input"), true);
	$id = $data['id'] ?? null;
	$status = $data['status'] ?? null;

	$stmt = $conn->prepare("UPDATE organizers SET status = ? WHERE id = ?");
	$stmt->bind_param("si", $status, $id);
	echo json_encode(["success" => $stmt->execute(), "message" => "Organizer status updated"]);
	$stmt->close();
} else {
	echo json_encode(["success" => false, "message" => "Invalid request method"]);
}