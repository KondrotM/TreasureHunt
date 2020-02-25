<?php
	ob_start(); // Show at least partial errors even if there was an error attempting to show an error

	$dbUsername = "database-username-here";
	$dbPassword = "database-pass-here";
	$dbServer = "localhost";
	$dbPort = "database-port-number-here";
	$dbDatabase = "database-name-here";

	// Connect to the database
	$db = new PDO("mysql:host=" . $dbServer . ";port=" . $dbPort . ";dbname=" . $dbDatabase, $dbUsername, $dbPassword);
	
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>