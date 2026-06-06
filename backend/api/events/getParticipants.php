<?php
error_reporting(E_ALL);
ini_set('display_errors', 1); // Expose errors to frontend console instead of returning a silent 500

include_once "../core/header.php";
include "../../database/db.php";

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
	$event_id = isset($_GET['event_id']) ? intval($_GET['event_id']) : null;
	$status = isset($_GET['status']) ? trim($_GET['status']) : null;
	$search = isset($_GET['search']) ? trim($_GET['search']) : null;

	$query = "SELECT 
				er.event_id, 
				e.title as event_title, 
				er.participant_id, 
				CONCAT(u.first_name, ' ', u.last_name) as name, 
				u.email, 
				er.status 
			  FROM event_registrations er
			  JOIN events e ON er.event_id = e.id
			  JOIN participants u ON er.participant_id = u.id
			  WHERE 1=1";

	$types = "";
	$params = [];

	if ($event_id) {
		$query .= " AND er.event_id = ?";
		$types .= "i";
		$params[] = $event_id;
	}

	if ($status) {
		$query .= " AND er.status = ?";
		$types .= "s";
		$params[] = $status;
	}

	if ($search) {
		$query .= " AND (u.email LIKE ? OR CONCAT(u.first_name, ' ', u.last_name) LIKE ? OR e.title LIKE ?)";
		$types .= "sss";
		$searchTerm = "%{$search}%";
		array_push($params, $searchTerm, $searchTerm, $searchTerm);
	}

	$stmt = $conn->prepare($query);
	if ($stmt) {
		if (!empty($params))
			$stmt->bind_param($types, ...$params);

		if (!$stmt->execute()) {
			echo json_encode(["success" => false, "message" => "Database execute failed: " . $stmt->error]);
			exit;
		}

		$result = $stmt->get_result();
		$participants = [];
		if ($result) {
			while ($row = $result->fetch_assoc()) {
				$participants[] = $row;
			}
		}
		echo json_encode(["success" => true, "data" => $participants]);
		$stmt->close();
	} else {
		echo json_encode(["success" => false, "message" => "Database query failed: " . $conn->error]);
	}
} else {
	echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
$conn->close();
?>