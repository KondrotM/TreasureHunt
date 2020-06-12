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
				]];
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
				echo json_encode(["Type" => "Error", "Msg" => "Username and/or Password are empty."]);
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
					echo json_encode(["Type" => "Error", "Msg" => strval($e)]);
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
					echo json_encode(["Type" => "Success", "Msg" => $obj]);
					exit;
				} else {
					echo json_encode(["Type" => "Error", "Msg" => "Invalid username or password"]);
					exit;
				}

			}
		}

		// Signup/register
		if($_POST['fn'] == 'register') {
			$username = $_POST['username'];
			$password = $_POST['password'];
			$email = $_POST['email'];

			// rudimentary checks for username and password, you can use 'valid' or your own way in order to distinguish between username or email taken, (mk)
			$valid = True;

			// Check if username is valid
			if ($username == 'Eric') {
				$valid = False;
			}
			// Check if email is valid
			if ($email == 'mail@123.com') {
				$valid = False;
			}

			// Check if password is valid? nice-to-have feature, (mk)

			if ($valid) {
				// Register acount
				echo json_encode(['Type' => 'Success', 'msg' => 'Account Registered']);
			} else {
				echo json_encode(['Type' => 'Success', 'msg' => 'Username or Email already exists']);
			}

		}
	}
	 else {

		echo json_encode(["Type" => "Success", "msg" => "Map Not Created"]);
	}