<?php
include_once "../core/header.php";
session_start();

if (isset($_SESSION["user_id"]) && isset($_SESSION["role"])) {
	echo json_encode([
		"success" => true,
		"user" => [
			"id" => $_SESSION["user_id"],
			"role" => $_SESSION["role"],
			"email" => $_SESSION["email"] ?? ""
		]
	]);
} else {
	echo json_encode([
		"success" => false,
		"message" => "Not authenticated"
	]);
}