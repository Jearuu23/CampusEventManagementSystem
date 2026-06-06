<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "cemsdb";

$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

$sql = "CREATE DATABASE IF NOT EXISTS $database";
if ($conn->query($sql) === TRUE) {
	echo "Database '$database' created successfully or already exists\n";
} else {
	echo "Error creating database: " . $conn->error . "\n";
}

$conn->select_db($database);


$files = glob("migrations/*.sql");

foreach ($files as $file) {
	$sql = file_get_contents($file);

	if ($conn->multi_query($sql)) {
		echo "Executed: $file\n";
		while ($conn->more_results() && $conn->next_result()) {
		}
	} else {
		echo "Error in $file: " . $conn->error . "\n";
	}
}

echo "Migration complete \nSeeding start";

$files = glob("seeds/*.sql");

foreach ($files as $file) {
	$sql = file_get_contents($file);

	if ($conn->multi_query($sql)) {
		echo "Executed: $file\n";
		while ($conn->more_results() && $conn->next_result()) {
		}
	} else {
		echo "Error in $file: " . $conn->error . "\n";
	}
}

echo "Seeding complete";