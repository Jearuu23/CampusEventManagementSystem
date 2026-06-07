<?php
include_once "../core/header.php";
include "../../database/db.php";
include_once "../../logging/logging.php";

$data = json_decode(file_get_contents("php://input"), true);
if (empty($data)) {
	$data = $_POST;
}

if (
	empty($data["event_id"]) ||
	empty($data["first_name"]) ||
	empty($data["last_name"]) ||
	empty($data["email"])
) {
	echo json_encode([
		"success" => false,
		"message" => "Missing required fields: event_id, first_name, last_name, email"
	]);
	exit;
}

$event_id = intval($data["event_id"]);
$first_name = trim($data["first_name"]);
$last_name = trim($data["last_name"]);
$email = trim($data["email"]);
$phone = isset($data["phone"]) ? trim($data["phone"]) : null;
$organization = isset($data["organization"]) ? trim($data["organization"]) : null;

// 1. Verify Event exists
$checkEventStmt = $conn->prepare("SELECT id, title FROM events WHERE id = ?");
$checkEventStmt->bind_param("i", $event_id);
$checkEventStmt->execute();
$eventResult = $checkEventStmt->get_result();

if ($eventResult->num_rows === 0) {
	echo json_encode(["success" => false, "message" => "Event not found"]);
	$checkEventStmt->close();
	$conn->close();
	exit;
}
$eventRow = $eventResult->fetch_assoc();
$eventTitle = $eventRow['title'];
$checkEventStmt->close();

// 2. Find or Create Participant
$participant_id = null;
$checkParticipantStmt = $conn->prepare("SELECT id FROM participants WHERE email = ?");
$checkParticipantStmt->bind_param("s", $email);
$checkParticipantStmt->execute();
$participantResult = $checkParticipantStmt->get_result();

if ($participantResult->num_rows > 0) {
	// Participant exists, get their ID and optionally update their details
	$row = $participantResult->fetch_assoc();
	$participant_id = $row['id'];

	$updateParticipantStmt = $conn->prepare("UPDATE participants SET first_name = ?, last_name = ?, phone = ?, organization = ? WHERE id = ?");
	$updateParticipantStmt->bind_param("ssssi", $first_name, $last_name, $phone, $organization, $participant_id);
	$updateParticipantStmt->execute();
	$updateParticipantStmt->close();
} else {
	// Participant does not exist, create a new one
	$insertParticipantStmt = $conn->prepare("INSERT INTO participants (first_name, last_name, email, phone, organization) VALUES (?, ?, ?, ?, ?)");
	$insertParticipantStmt->bind_param("sssss", $first_name, $last_name, $email, $phone, $organization);

	if ($insertParticipantStmt->execute()) {
		$participant_id = $insertParticipantStmt->insert_id;
	} else {
		echo json_encode(["success" => false, "message" => "Failed to create participant: " . $conn->error]);
		$insertParticipantStmt->close();
		$conn->close();
		exit;
	}
	$insertParticipantStmt->close();
}
$checkParticipantStmt->close();

$registerStmt = $conn->prepare("INSERT INTO event_registrations (event_id, participant_id, status) VALUES (?, ?, 'registered')");
$registerStmt->bind_param("ii", $event_id, $participant_id);

if ($registerStmt->execute()) {
	$updateEventCountStmt = $conn->prepare("UPDATE events SET current_participants = current_participants + 1 WHERE id = ?");
	$updateEventCountStmt->bind_param("i", $event_id);
	$updateEventCountStmt->execute();
	$updateEventCountStmt->close();

	$domain = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : "localhost";
	$protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
	$cancelLink = "$protocol://$domain/CEMS/backend/api/events/updateParticipation.php?event_id=$event_id&email=" . urlencode($email) . "&status=cancelled";

	$subject = "Event Registration Confirmation: " . $eventTitle;
	$message = "Hello $first_name $last_name,\n\nYou have successfully registered for the event: '$eventTitle'.\n\nIf you need to cancel your registration, please click the link below:\n$cancelLink\n\nThank you!";
	$headers = "From: noreply@university.edu\r\n";
	$headers .= "Reply-To: noreply@university.edu\r\n";
	$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

	// Attempt to send the email
	$mailSent = @mail($email, $subject, $message, $headers);
	if ($mailSent) {
		Logger::log("Email successfully sent to: " . $email);
	} else {
		Logger::log("Failed to send email to: " . $email . ". Check XAMPP sendmail/SMTP config. Simulated Email Body:\n" . $message);
	}

	echo json_encode([
		"success" => true,
		"message" => "Successfully registered for the event." . ($mailSent ? " A confirmation email has been sent." : " (Email simulated locally).")
	]);
} else {
	if ($conn->errno === 1062) { // 1062 is MySQL duplicate entry error code
		echo json_encode(["success" => false, "message" => "Participant is already registered for this event."]);
	} else {
		echo json_encode(["success" => false, "message" => "Failed to register for event: " . $conn->error]);
	}
}

$registerStmt->close();
$conn->close();