<?php
include_once "../core/header.php";
include "../../database/db.php";
require_once "../../helpers/validation.php";
include_once "../../logging/logging.php";

if (session_status() === PHP_SESSION_NONE) {
	session_start();
}

header('Content-Type: application/json');

try {
	if (!isset($_SESSION["user_id"]) || $_SESSION["role"] !== 'admin') {
		echo json_encode(["success" => false, "message" => "Unauthorized"]);
		exit;
	}

	$method = $_SERVER['REQUEST_METHOD'];

	if ($method === 'GET') {
		// Fetch all organizers
		$result = $conn->query("SELECT id, first_name AS firstName, last_name AS lastName, CONCAT(first_name, ' ', last_name) AS name, email, organization as org, status FROM users WHERE role = 'organizer'");
		$organizers = [];
		while ($row = $result->fetch_assoc()) {
			$organizers[] = $row;
		}
		echo json_encode(["success" => true, "data" => $organizers]);
	} elseif ($method === 'PUT') {
		// Update organizer status
		$data = json_decode(file_get_contents("php://input"), true);

		$errors = [];
		if (!Validator::int($data['id'] ?? null)) {
			$errors['id'] = "Valid ID is required.";
		}
		if (!Validator::in($data['status'] ?? '', ['pending', 'approved', 'rejected'])) {
			$errors['status'] = "Invalid status.";
		}

		if (!empty($errors)) {
			echo json_encode(["success" => false, "message" => "Validation failed", "errors" => $errors]);
			exit;
		}

		$id = $data['id'] ?? null;
		$status = $data['status'] ?? null;

		$stmt = $conn->prepare("UPDATE users SET status = ? WHERE id = ?");
		$stmt->bind_param("si", $status, $id);
		echo json_encode(["success" => $stmt->execute(), "message" => "Organizer status updated"]);
		$stmt->close();
	} else {
		echo json_encode(["success" => false, "message" => "Invalid request method"]);
	}
} catch (Exception $e) {
	Logger::log("Error in manageOrganizer.php: " . $e->getMessage());
	echo json_encode(["success" => false, "message" => "An internal server error occurred."]);
} finally {
	if (isset($conn) && $conn instanceof mysqli) {
		$conn->close();
	}
}