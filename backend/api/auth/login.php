<?php
include_once "../core/header.php";
include "../../database/db.php";
include_once "../../logging/logging.php";

if (session_status() === PHP_SESSION_NONE) {
	session_start();
}

header('Content-Type: application/json');

try {
	$raw_input = file_get_contents("php://input");
	Logger::log("Login API called. Raw input: " . $raw_input);

	$data = json_decode($raw_input, true);

	if (
		empty($data["email"]) ||
		empty($data["password"])
	) {
		Logger::log("Missing email or password.");
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
		Logger::log("Invalid email format: " . $email);
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
			status
		FROM organizers
		WHERE email = ?
		LIMIT 1
	");

	if (!$stmt) {
		Logger::log("Database error on prepare: " . $conn->error);
		echo json_encode([
			"success" => false,
			"message" => "Database error: " . $conn->error
		]);
		exit;
	}

	$stmt->bind_param("s", $email);
	$stmt->execute();

	$result = $stmt->get_result();

	if ($result->num_rows === 0) {
		Logger::log("Login failed: Email not found. Email: " . $email);
		echo json_encode([
			"success" => false,
			"message" => "Email not found"
		]);

		$stmt->close();
		$conn->close();
		exit;
	}

	$user = $result->fetch_assoc();

	// Verify password hash
	if (!password_verify($password, $user["password"])) {
		Logger::log("Login failed: Invalid password for email: " . $email);
		echo json_encode([
			"success" => false,
			"message" => "Invalid password"
		]);

		$stmt->close();
		$conn->close();
		exit;
	}

	// Verify account status
	if ($user["status"] !== 'approved') {
		Logger::log("Login failed: Account not approved. Email: " . $email . " | Status: " . $user["status"]);
		echo json_encode([
			"success" => false,
			"message" => "Account not approved"
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

	Logger::log("Login successful for email: " . $email);
	echo json_encode([
		"success" => true,
		"message" => "Login successful",
		"user" => $user
	]);

	$stmt->close();
	$conn->close();

} catch (Throwable $e) {
	Logger::log("Exception during login: " . $e->getMessage() . " in " . $e->getFile() . " on line " . $e->getLine());
	echo json_encode(["success" => false, "message" => "An internal server error occurred"]);
}