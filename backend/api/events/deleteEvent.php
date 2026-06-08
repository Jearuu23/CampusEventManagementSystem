<?php
include_once "../core/header.php";
include "../../database/db.php";

session_start();
if (!isset($_SESSION["user_id"])) {
	echo json_encode([
		"success" => false,
		"message" => "Unauthorized access. Please log in."
	]);
	exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data["id"]) || empty($data["organizerId"])) {
	echo json_encode([
		"success" => false,
		"message" => "Missing required fields: id, organizerId"
	]);
	exit;
}

$id = intval($data["id"]);
$organizer_id = intval($data["organizerId"]);

if ($_SESSION["role"] !== "admin" && $_SESSION["user_id"] !== $organizer_id) {
	echo json_encode([
		"success" => false,
		"message" => "Unauthorized: You can only delete your own events."
	]);
	exit;
}

$checkStmt = $conn->prepare("SELECT id FROM events WHERE id = ? AND organizer_id = ?");
$checkStmt->bind_param("ii", $id, $organizer_id);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();

if ($checkResult->num_rows === 0) {
	echo json_encode([
		"success" => false,
		"message" => "Event not found or unauthorized to delete"
	]);
	$checkStmt->close();
	$conn->close();
	exit;
}
$checkStmt->close();

$deleteStmt = $conn->prepare("DELETE FROM events WHERE id = ? AND organizer_id = ?");
$deleteStmt->bind_param("ii", $id, $organizer_id);

if ($deleteStmt->execute()) {
	echo json_encode([
		"success" => true,
		"message" => "Event deleted successfully"
	]);
} else {
	echo json_encode([
		"success" => false,
		"message" => "Event deletion failed: " . $conn->error
	]);
}

$deleteStmt->close();
$conn->close();