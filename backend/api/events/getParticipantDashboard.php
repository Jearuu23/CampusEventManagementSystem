<?php
include_once "../core/header.php";
include "../../database/db.php";

if (session_status() === PHP_SESSION_NONE) {
	session_start();
}

if (!isset($_SESSION["user_id"]) || $_SESSION["role"] !== 'participant') {
	echo json_encode([
		"success" => false,
		"message" => "Unauthorized access. Please log in as a participant."
	]);
	exit;
}

$user_id = $_SESSION["user_id"];

// Fetch points and counts
$query = "
    SELECT 
        SUM(points) as total_points,
        COUNT(CASE WHEN status = 'attended' THEN 1 END) as attended_count,
        COUNT(CASE WHEN status = 'registered' THEN 1 END) as upcoming_count
    FROM event_registrations
    WHERE participant_id = ?
";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$stats = $result->fetch_assoc();
$stmt->close();

// Fetch recent activity history
$queryActivity = "
    SELECT 
        er.id,
        er.status as action,
        e.title as event,
        er.points,
        DATE_FORMAT(er.updated_at, '%Y-%m-%d') as date
    FROM event_registrations er
    JOIN events e ON er.event_id = e.id
    WHERE er.participant_id = ? AND er.points > 0
    ORDER BY er.updated_at DESC
    LIMIT 10
";
$stmtActivity = $conn->prepare($queryActivity);
$stmtActivity->bind_param("i", $user_id);
$stmtActivity->execute();
$resultActivity = $stmtActivity->get_result();
$activities = [];
while ($row = $resultActivity->fetch_assoc()) {
	$activities[] = $row;
}
$stmtActivity->close();

echo json_encode([
	"success" => true,
	"data" => [
		"points" => intval($stats['total_points'] ?? 0),
		"attendedCount" => intval($stats['attended_count'] ?? 0),
		"upcomingCount" => intval($stats['upcoming_count'] ?? 0),
		"activities" => $activities
	]
]);
$conn->close();