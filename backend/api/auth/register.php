<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include "../../database/db.php";

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

$first_name = $conn->real_escape_string($data["first_name"]);
$last_name = $conn->real_escape_string($data["last_name"]);
$email = $conn->real_escape_string($data["email"]);
$password = password_hash($data["password"], PASSWORD_BCRYPT);
$organization = isset($data["organization"]) ? $conn->real_escape_string($data["organization"]) : null;
$role = isset($data["role"]) ? $conn->real_escape_string($data["role"]) : "organizer";

// Check if email exists
$check = $conn->query("SELECT id FROM users WHERE email='$email'");
if ($check->num_rows > 0) {
	echo json_encode([
		"success" => false,
		"message" => "Email already exists"
	]);
	exit;
}

// Insert user
$sql = "INSERT INTO users (first_name, last_name, email, password, organization, role)
        VALUES ('$first_name', '$last_name', '$email', '$password', '$organization', '$role')";

if ($conn->query($sql)) {
	echo json_encode([
		"success" => true,
		"message" => "User registered successfully"
	]);
} else {
	echo json_encode([
		"success" => false,
		"message" => "Registration failed",
		"error" => $conn->error
	]);
}

$conn->close();