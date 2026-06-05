<?php
include_once "../core/header.php";
include "../../database/db.php";

$status = isset($_GET["status"]) ? trim($_GET["status"]) : null;
$organizer_id = isset($_GET["organizer_id"]) ? intval($_GET["organizer_id"]) : null;

$allowedStatuses = ["draft", "published", "ongoing", "completed", "cancelled"];
if ($status !== null && $status !== "" && !in_array($status, $allowedStatuses, true)) {
	echo json_encode([
		"success" => false,
		"message" => "Invalid status filter"
	]);
	exit;
}

$query = "SELECT
        id,
        title,
        description,
        event_start_date,
        event_start_time,
        event_end_date,
        event_end_time,
        location,
        organizer_id,
        max_participants,
        current_participants,
        status,
        created_at,
        updated_at
    FROM events
    WHERE 1=1";

$params = [];
$types = "";

if ($organizer_id !== null && $organizer_id > 0) {
	$query .= " AND organizer_id = ?";
	$types .= "i";
	$params[] = $organizer_id;
}

if ($status !== null && $status !== "") {
	$query .= " AND status = ?";
	$types .= "s";
	$params[] = $status;
}

$query .= " ORDER BY event_start_date ASC, event_start_time ASC";

$stmt = $conn->prepare($query);
if (!$stmt) {
	echo json_encode([
		"success" => false,
		"message" => "Failed to prepare query: " . $conn->error
	]);
	exit;
}

if (!empty($types)) {
	$bind_names[] = $types;
	for ($i = 0; $i < count($params); $i++) {
		$bind_name = "param" . $i;
		$$bind_name = $params[$i];
		$bind_names[] = &$$bind_name;
	}
	call_user_func_array([$stmt, "bind_param"], $bind_names);
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
	"events" => $events
]);
?>