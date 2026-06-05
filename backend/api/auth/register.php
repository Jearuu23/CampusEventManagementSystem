<?php
include_once "../core/header.php";
include "../../database/db.php";

session_start();

$data = json_decode(file_get_contents("php://input"), true);

if (
	empty($data["first_name"]) ||
	empty($data["last_name"]) ||
	empty($data["email"]) ||
	empty($data["password"])
) {
	echo json_encode([
		"success" => false,
		"message" => "Missing required fields"
	]);
	exit;
}

$first_name = trim($data["first_name"]);
$last_name = trim($data["last_name"]);
$email = trim($data["email"]);
$password = password_hash($data["password"], PASSWORD_BCRYPT);
$organization = $data["organization"] ?? null;
$role = $data["role"] ?? "organizer";

$checkStmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$checkStmt->bind_param("s", $email);
$checkStmt->execute();
$result = $checkStmt->get_result();

if ($result->num_rows > 0) {
	echo json_encode([
		"success" => false,
		"message" => "Email already exists"
	]);

	$checkStmt->close();
	$conn->close();
	exit;
}

$checkStmt->close();

$insertStmt = $conn->prepare("
    INSERT INTO users (
        first_name,
        last_name,
        email,
        password,
        organization,
        role
    ) VALUES (?, ?, ?, ?, ?, ?)
");

$insertStmt->bind_param(
	"ssssss",
	$first_name,
	$last_name,
	$email,
	$password,
	$organization,
	$role
);

if ($insertStmt->execute()) {
	echo json_encode([
		"success" => true,
		"message" => "User registered successfully"
	]);
} else {
	echo json_encode([
		"success" => false,
		"message" => "Registration failed"
	]);
}

$insertStmt->close();
$conn->close();
