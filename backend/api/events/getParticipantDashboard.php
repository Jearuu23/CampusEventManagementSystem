<?php
include_once "../core/header.php";
include "../../database/db.php";
include_once "../../logging/logging.php";

try {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    if (!isset($_SESSION["user_id"]) || $_SESSION["role"] !== 'participant') {
        Logger::log("Unauthorized access attempt. Session data: " . json_encode($_SESSION ?? []));
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
            SUM(points) as totalPoints,
            COUNT(CASE WHEN status = 'attended' THEN 1 END) as attendedCount,
            COUNT(CASE WHEN status = 'registered' THEN 1 END) as upcomingCount
        FROM event_registrations
        WHERE participant_id = ?
    ";
    $stmt = $conn->prepare($query);
    if (!$stmt) {
        throw new Exception("Prepare statement failed: " . $conn->error);
    }
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $stats = $result->fetch_assoc();
    $stmt->close();

    // Fetch recent activity history
    $queryActivity = "
        SELECT 
            er.id,
            e.id AS eventId,
            er.status AS action,
            e.title AS event,
            er.points,
            DATE_FORMAT(er.updated_at, '%Y-%m-%d') AS date
        FROM event_registrations er
        JOIN events e ON er.event_id = e.id
        WHERE er.participant_id = ?
        ORDER BY er.updated_at DESC
    ";
    $stmtActivity = $conn->prepare($queryActivity);
    if (!$stmtActivity) {
        throw new Exception("Prepare statement for activity failed: " . $conn->error);
    }
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
            "points" => intval($stats['totalPoints'] ?? 0),
            "attendedCount" => intval($stats['attendedCount'] ?? 0),
            "upcomingCount" => intval($stats['upcomingCount'] ?? 0),
            "activities" => $activities
        ]
    ]);
} catch (Exception $e) {
    Logger::log("Error in getParticipantDashboard.php: " . $e->getMessage());
    echo json_encode([
        "success" => false,
        "message" => "An internal server error occurred."
    ]);
} finally {
    if (isset($conn) && $conn instanceof mysqli) {
        $conn->close();
    }
}