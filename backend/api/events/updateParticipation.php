<?php
include_once "../core/header.php";
include "../../database/db.php";
require_once "../../helpers/validation.php";

$method = $_SERVER['REQUEST_METHOD'];
$isGet = $method === 'GET';

if (!$isGet) {
	header("Content-Type: application/json");
}

// Helper function to output HTML for email links, or JSON for API calls
function sendResponse($success, $message, $isGet)
{
	if ($isGet) {
		header("Content-Type: text/html");
		$color = $success ? "#16a34a" : "#dc2626";
		echo "<!DOCTYPE html>
        <html lang='en'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>Event Status</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background-color: #f9fafb; }
                .card { background: white; padding: 2.5rem; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); text-align: center; max-width: 400px; width: 90%; }
                h1 { color: $color; margin-top: 0; }
                p { color: #4b5563; line-height: 1.5; margin-bottom: 0; }
            </style>
        </head>
        <body>
            <div class='card'>
                <h1>" . ($success ? "Success" : "Notice") . "</h1>
                <p>$message</p>
            </div>
        </body>
        </html>";
	} else {
		echo json_encode(["success" => $success, "message" => strip_tags($message)]);
	}
	exit;
}

$event_id = null;
$email = null;
$status = null;

if ($isGet) {
	$event_id = isset($_GET['event_id']) ? intval($_GET['event_id']) : null;
	$email = isset($_GET['email']) ? trim($_GET['email']) : null;
	$status = isset($_GET['status']) ? trim($_GET['status']) : null;
} else {
	$data = json_decode(file_get_contents("php://input"), true);
	if ($data) {
		$event_id = isset($data['event_id']) ? intval($data['event_id']) : null;
		$email = isset($data['email']) ? trim($data['email']) : null;
		$status = isset($data['status']) ? trim($data['status']) : null;
	}
}

$errors = [];
if (!Validator::int($event_id ?? null)) {
	$errors['event_id'] = "Valid Event ID is required.";
}
if (!Validator::email($email ?? '')) {
	$errors['email'] = "A valid email address is required.";
}
if (!Validator::string($status ?? '')) {
	$errors['status'] = "Status is required.";
}

if (!empty($errors)) {
	sendResponse(false, "Validation failed: " . implode(', ', $errors), $isGet);
}

$allowedStatuses = ["registered", "attended", "cancelled"];
if (!in_array($status, $allowedStatuses, true)) {
	sendResponse(false, "Invalid status provided.", $isGet);
}

// Find participant by email
$participantStmt = $conn->prepare("SELECT id FROM users WHERE email = ?");

if (!$participantStmt) {
	sendResponse(false, "Database error: unable to prepare query.", $isGet);
}

$participantStmt->bind_param("s", $email);
$participantStmt->execute();
$participantResult = $participantStmt->get_result();

if ($participantResult->num_rows === 0) {
	$participantStmt->close();
	$conn->close();
	sendResponse(false, "Participant not found with the provided email.", $isGet);
}

$participantRow = $participantResult->fetch_assoc();
$participant_id = $participantRow['id'];
$participantStmt->close();

// Update participation status
$updateStmt = $conn->prepare("UPDATE event_registrations SET status = ? WHERE event_id = ? AND participant_id = ?");

$updateStmt->bind_param("sii", $status, $event_id, $participant_id);

if ($updateStmt->execute() && $updateStmt->affected_rows > 0) {
	sendResponse(true, "Your participation status has been successfully updated to <strong>" . htmlspecialchars($status) . "</strong>.", $isGet);
} else {
	sendResponse(false, "Registration not found or your status is already set to <strong>" . htmlspecialchars($status) . "</strong>.", $isGet);
}

$updateStmt->close();
$conn->close();