<?php
include_once "../core/header.php";
include "../../database/db.php";
require_once "../../helpers/validation.php";

$status = isset($_GET["status"]) ? trim($_GET["status"]) : null;
$organizer_id = isset($_GET["organizerId"]) ? intval($_GET["organizerId"]) : null;
$limit = isset($_GET["limit"]) ? intval($_GET["limit"]) : null;

$errors = [];
if (isset($_GET['organizerId']) && !Validator::int($_GET['organizerId'])) {
	$errors['organizer_id'] = "Organizer ID must be a valid integer.";
}
if (isset($_GET['limit']) && !Validator::int($_GET['limit'])) {
	$errors['limit'] = "Limit must be a valid integer.";
}
if (isset($_GET['offset']) && !Validator::int($_GET['offset'])) {
	$errors['offset'] = "Offset must be a valid integer.";
}

if (!empty($errors)) {
	echo json_encode(["success" => false, "message" => "Validation failed", "errors" => $errors]);
	exit;
}

$allowedStatuses = ["draft", "published", "ongoing", "completed", "cancelled", "pending", "approved", "rejected"];
$statusArray = [];
if ($status !== null && $status !== "") {
	$statusArray = array_map('trim', explode(',', $status));
	foreach ($statusArray as $s) {
		if (!in_array($s, $allowedStatuses, true)) {
			echo json_encode([
				"success" => false,
				"message" => "Invalid status filter"
			]);
			exit;
		}
	}
}

$whereSql = " WHERE 1=1";
$params = [];
$types = "";

if ($organizer_id !== null && $organizer_id > 0) {
	$whereSql .= " AND organizer_id = ?";
	$types .= "i";
	$params[] = $organizer_id;
}

if (!empty($statusArray)) {
	$placeholders = implode(',', array_fill(0, count($statusArray), '?'));
	$whereSql .= " AND status IN ($placeholders)";
	foreach ($statusArray as $s) {
		$types .= "s";
		$params[] = $s;
	}
}

// Calculate total rows for frontend pagination math
$totalEvents = 0;
$countQuery = "SELECT COUNT(*) as total FROM events" . $whereSql;
$countStmt = $conn->prepare($countQuery);
if ($countStmt) {
	if (!empty($types)) {
		$count_bind_params = [];
		foreach ($params as $key => $value) {
			$count_bind_params[$key] = &$params[$key];
		}
		$countStmt->bind_param($types, ...$count_bind_params);
	}
	$countStmt->execute();
	$countResult = $countStmt->get_result();
	if ($row = $countResult->fetch_assoc()) {
		$totalEvents = intval($row['total']);
	}
	$countStmt->close();
}

// Main Query
$query = "SELECT
         id,
         title,
         description,
         event_start_date AS eventStartDate,
         event_start_time AS eventStartTime,
         event_end_date AS eventEndDate,
         event_end_time AS eventEndTime,
         location,
         organizer_id AS organizerId,
         max_participants AS maxParticipants,
         current_participants AS currentParticipants,
         status,
         image_path AS imagePath,
         department,
         created_at AS createdAt,
         updated_at AS updatedAt
     FROM events" . $whereSql . " ORDER BY event_start_date ASC, event_start_time ASC";

$offset = isset($_GET["offset"]) ? intval($_GET["offset"]) : null;

if ($limit !== null && $limit > 0) {
	$query .= " LIMIT ?";
	$types .= "i";
	$params[] = $limit;

	if ($offset !== null && $offset > 0) {
		$query .= " OFFSET ?";
		$types .= "i";
		$params[] = $offset;
	}
}

$stmt = $conn->prepare($query);
if (!$stmt) {
	echo json_encode([
		"success" => false,
		"message" => "Failed to prepare query: " . $conn->error
	]);
	exit;
}

if (!empty($types)) {
	$bind_params = [];
	foreach ($params as $key => $value) {
		$bind_params[$key] = &$params[$key];
	}
	$stmt->bind_param($types, ...$bind_params);
}

$stmt->execute();

$result = $stmt->get_result();
$events = [];
while ($row = $result->fetch_assoc()) {
	$events[] = $row;
}

$stmt->close();
$conn->close();

echo json_encode([
	"success" => true,
	"total" => $totalEvents,
	"events" => $events
]);
