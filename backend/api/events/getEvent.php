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

// Fetch the event along with the organizer's details
$query = "
    SELECT 
        e.*, 
        u.first_name AS organizer_first_name, 
        u.last_name AS organizer_last_name,
        u.organization AS organizer_organization
    FROM events e
    LEFT JOIN users u ON e.organizer_id = u.id
    WHERE e.id = ?
";

$stmt = $conn->prepare($query);

if (!$stmt) {
	echo json_encode([
		"success" => false,
		"message" => "Database error: " . $conn->error
	]);
	exit;
}

$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
	echo json_encode(["success" => false, "message" => "Event not found"]);
} else {
	$event = $result->fetch_assoc();
	echo json_encode(["success" => true, "event" => $event]);
}

$stmt->close();
$conn->close();
?>