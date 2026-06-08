<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "activo";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
	die(json_encode([
		"success" => false,
		"message" => "DB connection failed"
	]));
}