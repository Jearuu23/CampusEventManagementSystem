<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include "../../database/db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data["email"]) || empty($data["password"])) {
	echo json_encode([
		"success" => false,
		"message" => "Email and password required"
	]);
	exit;
}

$email = $conn->real_escape_string($data["email"]);
$password = $data["password"];

// Get user
$sql = "SELECT * FROM users WHERE email='$email' AND is_active=1 LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows === 0) {
	echo json_encode([
		"success" => false,
		"message" => "Invalid credentials"
	]);
	exit;
}

$user = $result->fetch_assoc();

// Verify password
if (!password_verify($password, $user["password"])) {
	echo json_encode([
		"success" => false,
		"message" => "Invalid credentials"
	]);
	exit;
}

// Remove password before sending response
unset($user["password"]);

echo json_encode([
	"success" => true,
	"message" => "Login successful",
	"user" => $user
]);

$conn->close();