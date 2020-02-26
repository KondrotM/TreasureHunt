<?php
	ob_start(); // Show at least partial errors even if there was an error attempting to show an error

	$dbUsername = "group";
	$dbPassword = "1sp!0mD3";
	$dbServer = "localhost";
	$dbPort = "3306";
	$dbDatabase = "thenathanists_treasurehunt";

	// Connect to the database
	$db = new PDO("mysql:host=" . $dbServer . ";port=" . $dbPort . ";dbname=" . $dbDatabase, $dbUsername, $dbPassword);
	
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>