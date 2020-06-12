<?php

	include('config.php');

	// start the session if it hasn't been already
	// using include_once to make sure it's not starting the session more than once, (on)
	include_once('session.php');

	if (isset($_POST['fn'])){

		// Create map
		if ($_POST['fn'] == 'createMap') {
			echo json_encode(["Type" => "Success", "msg" => "Map Created"]);
		}

		// Get quests
		if ($_POST['fn'] == 'getQuests'){
			$obj = [
			[
					'id' => '1',
					'title' => 'Getting Around',
					'diff' => 'Easy'
				],
			[
					'id' => '2',
					'title' => 'Chelt Locals Only',
					'diff' => 'Medium'
				],
			[
					'id' => '3',
					'title' => 'Mind Your Business',
					'diff' => 'Hard'
				]
			];
			echo json_encode(["Type" => "Success", "msg" => "Maps Returned", "maps" => $obj]);
		}

		// Login, (on)
		if ($_POST['fn'] == 'login') {
			$username = $_POST['username'];
			$password = $_POST['password'];

			// for debugging
			//echo $username . "<br>";
			//echo $password . "<br>";

			// First check if a username and password have been provided
			if (empty($_POST['username']) | empty($_POST['password'])) {
				// No username or password provided, so respond with an error
				echo json_encode(["Type" => "Error", "msg" => "Username and/or Password are empty."]);
			} else {
				// Both the username and password have been provided, so carry on...

				// Hash the password before checking it against the database
				$password = sha1($_POST['password']);

				// Create a new variable called dbQuery that stores a preparational query to PDO. Once PDO has prepared the query, execute it with the appropriate variables.
				// https://phpdelusions.net/pdo
				try {
					$dbQuery = $db->prepare('SELECT * FROM tablelogin WHERE username=:username AND password=:password');
					$dbQuery->execute([':username' => $username, ':password' => $password]);
				} catch (PDOException $e) {
					// If it fails, show the error and exit
					// The strval() function converts the exception type to a string type
					echo json_encode(["Type" => "Error", "msg" => strval($e)]);
					exit;
				}

				$dbRow = $dbQuery->fetch();
				if ($dbRow) {
					// there is an entry found in the database that matches the username and password,
					// so store the username in the session cookie
					$_SESSION['username'] = $username;
					$_SESSION['userDetails'] = ['userID' => $dbRow['userID'], 'email' => $dbRow['email']];

					// and in an object we're going to send back to the client
					$obj = [
						"login" => "true",
						"id" => strval($dbRow['userID'])
					];

					// and return a success response with the object we just made
					echo json_encode(["Type" => "Success", "msg" => $obj]);
					exit;
				} else {
					echo json_encode(["Type" => "Error", "msg" => "Invalid username or password"]);
					exit;
				}

			}
		}

		// Signup/register, (on)
		if ($_POST['fn'] == 'register') {
			$username = $_POST['username'];
			$password = $_POST['password'];
			$email = $_POST['email'];

			// First check if each of the required fields have been provided and show an error otherwise
			if (empty($username)) {
				echo json_encode(["Type" => "Error", "msg" => "Username is empty."]);
			} else if (empty($password)) {
				echo json_encode(["Type" => "Error", "msg" => "Password is empty."]);
			} else if (strlen($password) < 6) { // if the length of the password string is under 6 characters
				echo json_encode(["Type" => "Error", "msg" => "Password must be at least 6 characters long."]);
			} else if (empty($email)) {
				echo json_encode(["Type" => "Error", "msg" => "Email is empty."]);
			} else {
				// All fields supplied, so carry on

				// Create a new variable called dbQuery that stores a preparational query to PDO. Once PDO has prepared the query, execute it with the appropriate variables.
				// https://phpdelusions.net/pdo
				try {
					// Check if the email is already in use
					$dbQuery = $db->prepare('SELECT * FROM tablelogin WHERE email=:email');
					$dbQuery->execute(['email' => $email]);
				} catch (PDOException $e) {
					// If it fails, show the error and exit
					echo json_encode(["Type" => "Error", "msg" => strval($e)]);
					exit;
				}

				$dbRow = $dbQuery->fetch();
				if ($dbRow['email'] == $email) {
					// there is an entry found in the database that matches the email, so show an error that the email is already in use
					echo json_encode(["Type" => "Error", "msg" => "Email already in use"]);
				} else if ($dbRow['username'] == $username) {
					echo json_encode(["Type" => "Error", "msg" => "Username already in use"]);
				} else {
					// email and username not currently in use, so carry on

					// Hash the password with sha1 before storing it
					$password = sha1($password);
					
					// if we got to this point, both the password fields match and the email and pass aren't already in use, so make the new account entry in the database
					try {
						// Make the account
						$dbQueryTwo = $db->prepare('INSERT INTO `tablelogin` (`userID`, `username`, `password`, `email`) VALUES (NULL, :username, :password, :email)');
						$dbQueryTwo->execute(['email' => $email, 'password' => $password, 'username' => $username]);
						echo json_encode(['Type' => 'Success', 'msg' => 'Account registered.']);
					} catch (PDOException $e) {
						// If it fails, show the error and exit
						echo json_encode(["Type" => "Error", "msg" => strval($e)]);
						exit;
					}
				}
			}
		}
	} else {
		echo json_encode(["Type" => "Error", "msg" => "?fn not specified."]);
	}
?>