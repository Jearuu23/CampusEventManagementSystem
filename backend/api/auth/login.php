<?php
include_once "../core/header.php";
include "../../database/db.php";

session_start();

$data = json_decode(file_get_contents("php://input"), true);

if (
	empty($data["email"]) ||
	empty($data["password"])
) {
	echo json_encode([
		"success" => false,
		"message" => "Email and password required"
	]);
	exit;
}

$email = trim($data["email"]);
$password = $data["password"];

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
	echo json_encode([
		"success" => false,
		"message" => "Invalid credentials"
	]);
	exit;
}

// Prepared statement
$stmt = $conn->prepare("
    SELECT
        id,
        first_name,
        last_name,
        email,
        password,
        organization,
        role,
        is_active
    FROM users
    WHERE email = ?
      AND is_active = 1
    LIMIT 1
");

$stmt->bind_param("s", $email);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows === 0) {
	echo json_encode([
		"success" => false,
		"message" => "Invalid credentials"
	]);

	$stmt->close();
	$conn->close();
	exit;
}

$user = $result->fetch_assoc();

// Verify password hash
if (!password_verify($password, $user["password"])) {
	echo json_encode([
		"success" => false,
		"message" => "Invalid credentials"
	]);

	$stmt->close();
	$conn->close();
	exit;
}

// Remove password before returning user
unset($user["password"]);

// Set session variables
$_SESSION["user_id"] = $user["id"];
$_SESSION["role"] = $user["role"];
$_SESSION["email"] = $user["email"];

echo json_encode([
	"success" => true,
	"message" => "Login successful",
	"user" => $user
]);

$stmt->close();
$conn->close();