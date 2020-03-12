<?php
	include("config.php");

	// start the session if it hasn't been already
	// using include_once to make sure it's not starting the session more than once
	include_once('session.php');

	if (isset($_GET['fn'])) { // GET method
		$fnToRun = $_GET['fn'];
		$invalidFn = true;
		if ($fnToRun === 'username') {
			$invalidFn = false;
			echo json_encode(["Type" => "Success", "Msg" => "Example username"]);
		} 
		if ($fnToRun === 'createMap') {
			$invalidFn = false;
			echo json_encode(["Type" => "Success", "Msg" => "Map Created"]);
		}
		if ($invalidFn) {
			echo json_encode(["Type" => "Error", "Msg" => "Invalid '?fn='"]);
		}
		
	} else if (isset($_POST['fn'])) { // POST method
		if ($fnToRun === "login") {
			// First check if a username and password have been provided
			if (empty($_POST['username']) | empty($_POST['password'])) {
				// No username or password provided, so respond with an error
				echo json_encode(["Type" => "Error", "Msg" => "Username and/or Password are empty."]);
			} else {
				// Both the username and password have been provided, so carry on...

				$username = $_POST['username'];
				// Hash the password before checking it against the database
				$password = sha1($_POST['password']);

				// Create a new variable called dbQuery that stores a preparational query to PDO. Once PDO has prepared the query, execute it with the appropriate variables.
				// https://phpdelusions.net/pdo
				try {
					$dbQuery = $this->_db->prepare('SELECT * FROM tablelogin WHERE username=:username AND password=:password');
					$dbQuery->execute([':username' => $username, ':password' => $password]);
				} catch (PDOException $e) {
					// If it fails, show the error and exit
					// The strval() function converts the exception type to a string type
					echo json_encode(["Type" => "Error", "Msg" => strval($e)]);
					exit;
				}

				$dbRow = $dbQuery->fetch();
				if ($dbRow) {
					// there is an entry found in the database that matches the username and password,
					// so store the username in the session cookie
					$_SESSION['username'] = $username;
					$_SESSION['userDetails'] = ['userID' => $dbRow['userID'], 'email' => $dbRow['email']];

					// and return a success response
					echo json_encode(["Type" => "Success", "Msg" => "Logged in."]);
					exit;
				} else {
					echo json_encode(["Type" => "Error", "Msg" => "Invalid username or password"]);
					exit;
				}
			}
		} else if ($fnToRun === "signup") {
			// todo: signup functionality
			echo json_encode(["Type" => "Error", "Msg" => "Currently unimplemented."]);
		} else if ($fnToRun === "logout") {
			// destroy the current session
			session_destroy();

			// and return a success response
			echo json_encode(["Type" => "Success", "Msg" => "Logged out."]);
			exit;
		} else {
			echo json_encode(["Type" => "Error", "Msg" => "Empty fn in POST request."]);
			exit;
		}
	} else {
		echo json_encode("So tell me what you want, what you really really want. ('?fn=' missing)");
	}
?>