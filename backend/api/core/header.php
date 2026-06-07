<?php
// 1. Dynamically allow the specific origin making the request instead of using '*'
if (isset($_SERVER['HTTP_ORIGIN'])) {
	header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
} else {
	// Fallback if HTTP_ORIGIN isn't set
	header("Access-Control-Allow-Origin: http://localhost:5173");
}

// 2. Explicitly allow credentials (cookies, sessions)
header("Access-Control-Allow-Credentials: true");

// 3. Allow standard methods and headers
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// 4. Immediately exit on Preflight (OPTIONS) requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
	http_response_code(200);
	exit();
}

include_once "../../logging/logging.php";