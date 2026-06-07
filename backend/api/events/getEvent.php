<?php
include_once "../core/header.php";
include "../../database/db.php";
require_once "../../helpers/validation.php";

$id = $_GET['id'] ?? null;
$errors = [];

if (!Validator::int($id)) {
	$errors['id'] = "Valid Event ID is required.";
}

if (!empty($errors)) {
	echo json_encode([
		"success" => false,
		"message" => "Validation failed",
		"errors" => $errors
	]);
	exit;
}

$id = intval($_GET['id']);

$query = "
	SELECT 
		e.*, 
		CONCAT(o.first_name, ' ', o.last_name) AS organizer_name,
		o.organization AS department
	FROM events e
	LEFT JOIN users o ON e.organizer_id = o.id
	WHERE e.id = ?";

$stmt = $conn->prepare($query);
if (!$stmt) {
	echo json_encode([
		"success" => false,
		"message" => "Failed to prepare query: " . $conn->error
	]);
	exit;
}

$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
	echo json_encode([
		"success" => true,
		"event" => $row
	]);
} else {
	echo json_encode([
		"success" => false,
		"message" => "Event not found"
	]);
}

$stmt->close();
$conn->close();
