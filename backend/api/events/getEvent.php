<?php
include_once "../core/header.php";
include "../../database/db.php";
require_once "../../helpers/validation.php";

$id = $_GET['eventId'] ?? ($_GET['event_id'] ?? ($_GET['id'] ?? null)); // Fallbacks
$withRewards = filter_var($_GET['withRewards'] ?? false, FILTER_VALIDATE_BOOLEAN);

if (!$id) {
	$data = json_decode(file_get_contents("php://input"), true);
	$id = $data['eventId'] ?? ($data['event_id'] ?? ($data['id'] ?? null));
	if (isset($data['withRewards'])) {
		$withRewards = filter_var($data['withRewards'], FILTER_VALIDATE_BOOLEAN);
	}
}

$errors = [];

if (!Validator::int($id)) {
	$errors['eventId'] = "Valid Event ID is required.";
}

if (!empty($errors)) {
	echo json_encode([
		"success" => false,
		"message" => "Validation failed",
		"errors" => $errors
	]);
	exit;
}

$id = intval($id);

$query = "
	SELECT
		e.id,
		e.title,
		e.description,
		e.event_start_date AS eventStartDate,
		e.event_start_time AS eventStartTime,
		e.event_end_date AS eventEndDate,
		e.event_end_time AS eventEndTime,
		e.location,
		e.organizer_id AS organizerId,
		e.max_participants AS maxParticipants,
		e.current_participants AS currentParticipants,
		e.status,
		e.image_path AS imagePath,
		e.department,
		e.created_at AS createdAt,
		e.updated_at AS updatedAt,
		CONCAT(o.first_name, ' ', o.last_name) AS organizerName
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
	if ($withRewards) {
		$rewardsQuery = "SELECT id, event_id AS eventId, name, description, points_price AS pointsPrice, image_path AS imagePath, stock, created_at AS createdAt, updated_at AS updatedAt FROM rewards WHERE event_id = ?";
		$stmtRewards = $conn->prepare($rewardsQuery);
		if ($stmtRewards) {
			$stmtRewards->bind_param("i", $id);
			$stmtRewards->execute();
			$rewardsResult = $stmtRewards->get_result();
			$rewards = [];
			while ($rewardRow = $rewardsResult->fetch_assoc()) {
				$rewards[] = $rewardRow;
			}
			$row['rewards'] = $rewards;
			$stmtRewards->close();
		}
	}

	echo json_encode([
		"success" => true,
		"data" => $row
	]);
} else {
	echo json_encode([
		"success" => false,
		"message" => "Event not found"
	]);
}

$stmt->close();
$conn->close();
