<?php
include_once "../core/header.php";
include "../../database/db.php";
include_once "../../logging/logging.php";
require_once "../../helpers/validation.php";

session_start();

try {

	$raw_input = file_get_contents("php://input");
	Logger::log("Register API called. Raw input: " . $raw_input);

	$data = json_decode($raw_input, true);

	$errors = [];

	if (!Validator::string($data['first_name'] ?? '')) {
		$errors['first_name'] = "First name is required.";
	}
	if (!Validator::string($data['last_name'] ?? '')) {
		$errors['last_name'] = "Last name is required.";
	}
	if (!Validator::string($data['organization'] ?? '')) {
		$errors['organization'] = "Organization is required.";
	}
	if (!Validator::email($data['email'] ?? '')) {
		$errors['email'] = "A valid email address is required.";
	}
	if (!Validator::string($data['password'] ?? '', 6, 255)) {
		$errors['password'] = "Password must be at least 6 characters.";
	}

	if (!empty($errors)) {
		Logger::log("Validation failed during registration: " . json_encode($errors));
		echo json_encode([
			"success" => false,
			"message" => "Validation failed",
			"errors" => $errors
		]);
		exit;
	}

	$first_name = trim($data["first_name"]);
	$last_name = trim($data["last_name"]);
	$email = trim($data["email"]);
	$password = password_hash($data["password"], PASSWORD_BCRYPT);
	$organization = $data["organization"] ?? null;
	$role = $data["role"] ?? "organizer";
	$status = "pending";

	$checkStmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
	if (!$checkStmt) {
		Logger::log("Database error on prepare checkStmt: " . $conn->error);
		echo json_encode([
			"success" => false,
			"message" => "Database error: " . $conn->error
		]);
		exit;
	}

	$checkStmt->bind_param("s", $email);
	$checkStmt->execute();
	$result = $checkStmt->get_result();

	if ($result->num_rows > 0) {
		Logger::log("Email already exists: " . $email);
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
        role,
        status
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
");

	if (!$insertStmt) {
		Logger::log("Database error on prepare insertStmt: " . $conn->error);
		echo json_encode([
			"success" => false,
			"message" => "Database error: " . $conn->error
		]);
		exit;
	}

	$insertStmt->bind_param(
		"sssssss",
		$first_name,
		$last_name,
		$email,
		$password,
		$organization,
		$role,
		$status
	);

	if ($insertStmt->execute()) {
		Logger::log("Registration successful for email: " . $email);
		echo json_encode([
			"success" => true,
			"message" => "User registered successfully"
		]);
	} else {
		Logger::log("Registration execute failed for email: " . $email . ". Error: " . $insertStmt->error);
		echo json_encode([
			"success" => false,
			"message" => "Registration failed"
		]);
	}

	$insertStmt->close();
	$conn->close();

} catch (Throwable $e) {
	Logger::log("Exception during registration: " . $e->getMessage() . " in " . $e->getFile() . " on line " . $e->getLine());
	echo json_encode(["success" => false, "message" => "An internal server error occurred"]);
}
