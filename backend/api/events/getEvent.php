<?php
include_once "../core/header.php";
include "../../database/db.php";

if (!isset($_GET['id']) || empty(trim($_GET['id']))) {
	echo json_encode([
		"success" => false,
		"message" => "Event ID is required"
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
	LEFT JOIN organizers o ON e.organizer_id = o.id
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
