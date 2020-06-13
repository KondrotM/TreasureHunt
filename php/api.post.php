<?php

	include('config.php');

	// start the session if it hasn't been already
	// using include_once to make sure it's not starting the session more than once, (on)
	include_once('session.php');

	// generate a universal unique identifier
	function genUUID() {
		return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
			mt_rand(0, 0xffff), mt_rand(0, 0xffff),
			mt_rand(0, 0xffff),
			mt_rand(0, 0x0fff) | 0x4000,
			mt_rand(0, 0x3fff) | 0x8000,mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
		);
	}

	if (isset($_POST['fn'])){

		// Create quests, (on)
		if ($_POST['fn'] == 'createQuest') {
			$mapName = $_POST["mapName"];
			$difficulty = $_POST["difficulty"];
			$description = $_POST["description"];
			$latitude = $_POST["lat"];
			$longitude = $_POST["lng"];
			$userID = $_POST["userID"];

			// Check if any of the required inputs are empty and respond with an error if they are
			if (empty($mapName) | empty($difficulty) | empty($description) | empty($latitude) | empty($longitude) | empty($userID)) {
				echo json_encode(["Type" => "Error", "msg" => "One or more of the required inputs are empty."]);
				http_response_code(400);
			} else {
				
				// Create a new variable called dbQuery that stores a preparational query to PDO. Once PDO has prepared the query, execute it with the appropriate variables.
				// https://phpdelusions.net/pdo
				try {
					// Check if the email is already in use
					$dbQuery = $db->prepare('SELECT * FROM tablequests WHERE mapName=:mapName');
					$dbQuery->execute(['mapName' => $mapName]);
				} catch (PDOException $e) {
					// If it fails, show the error and exit
					echo json_encode(["Type" => "Error", "msg" => strval($e)]);
					http_response_code(500);
					exit;
				}

				$dbRow = $dbQuery->fetch();
				// Check if a quest with the map name already exists
				if ($dbRow['mapName'] == $mapName) {
					// there is an entry found in the database that matches the map name, so show an error that the map name is already in use
					echo json_encode(["Type" => "Error", "msg" => "Map name already in use"]);
					http_response_code(500);
				} else {
					// map name not currently in use, so make a new quest entry in the database and then the new quest entry

					// generate a UUID
					$uuid = genUUID();

					// check if the UUID is already in use, and if so regenerate the UUID until it isn't
					try {
						$dbQueryUUID = $db->prepare('SELECT locationUUID from `tablelocations` WHERE locationUUID=:uuid');
						$dbQueryUUID->execute(['uuid' => $uuid]);
						$dbRow = $dbQueryUUID->fetch();
						while ($dbRow) {
							$uuid = genUUID();
							$dbQueryUUID->execute(['uuid' => $uuid]);
							$dbRow = $dbQueryUUID->fetch();
						}
					} catch (PDOException $e) {
						// If it fails, show the error and exit
						echo json_encode(["Type" => "Error", "msg" => strval($e)]);
						http_response_code(500);
						exit;
					}

					// we have a unique UUID now, so use it when adding the latitude and longitude to the database
					try {
						$dbQueryTwo = $db->prepare('INSERT INTO `tablelocations` (`locationUUID`, `userID`, `posX`, `posY`) VALUES (:uuid, :userID, :lng, :lat)');
						$dbQueryTwo->execute(['userID' => $userID, 'lng' => $longitude, 'lat' => $latitude, 'uuid' => $uuid]);
					} catch (PDOException $e) {
						// If it fails, show the error and exit
						echo json_encode(["Type" => "Error", "msg" => strval($e)]);
						http_response_code(500);
						exit;
					}

					// add the quest entry to the tablequests in the database with the locationUUID
					try {
						$dbQueryTwo = $db->prepare('INSERT INTO `tablequests` (`mapID`, `userID`, `locationUUID`, `difficulty`, `mapName`, `description`, `crumbs`, `dateCreated`) VALUES (NULL, :userID, :locationUUID, :difficulty, :mapName, :descr, NULL, NULL)');
						$dbQueryTwo->execute(['userID' => $userID, 'difficulty' => $difficulty, 'mapName' => $mapName, 'descr' => $description, 'locationUUID' => $uuid]);
						echo json_encode(["Type" => "Success", "msg" => "Quest created."]);
					} catch (PDOException $e) {
						// If it fails, show the error and exit
						echo json_encode(["Type" => "Error", "msg" => strval($e)]);
						http_response_code(500);
						exit;
					}
				}
			}
		}

		// Get quests, (on)
		if ($_POST['fn'] == 'getQuests') {
			try {
				$dbQuery = $db->prepare('SELECT * FROM tablequests');
				$dbQuery->execute();
			} catch (PDOException $e) {
				// If it fails, show the error and exit
				// The strval() function converts the exception type to a string type
				echo json_encode(["Type" => "Error", "msg" => strval($e)]);
				http_response_code(500);
				exit;
			}

			$questsObj;
			$dbRow = $dbQueryUUID->fetch();
			while ($dbRow) { // for each row returned, add it to the questsObj
				$questsObj += $dbRow;
			}
			echo json_encode(["Type" => "Success", "msg" => "Quests returned.", "quests" => $questsObj]);

			/*
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
			*/
		}

		// Get quest details by questID, (on)
		if ($_POST['fn'] == 'getQuestDetails') {
			$questID = $_POST['questID'];

			// Check if any of the required inputs are empty and respond with an error if they are
			if (empty($questID)) {
				echo json_encode(["Type" => "Error", "msg" => "questID is empty."]);
				http_response_code(400);
			} else {
				try {
					$dbQuery = $db->prepare('SELECT * FROM tablequests WHERE id=:questID');
					$dbQuery->execute(['questID' => $questID]);
				} catch (PDOException $e) {
					// If it fails, show the error and exit
					// The strval() function converts the exception type to a string type
					echo json_encode(["Type" => "Error", "msg" => strval($e)]);
					http_response_code(500);
					exit;
				}

				$dbRow = $dbQuery->fetch();
				if ($dbRow) {
					echo json_encode(["Type" => "Success", "msg" => "Quest returned.", "quest" => $dbRow]);
				} else {
					echo json_encode(["Type" => "Error", "msg" => "No quests found with that questID."]);
					http_response_code(500);
				}
			}
		}

		// Get breadcrumb data by breadcrumbID, (on)
		/*if ($_POST['fn'] == 'getQuestDetails') {
			$questID = $_POST['questID'];

			// Check if any of the required inputs are empty and respond with an error if they are
			if (empty($questID)) {
				echo json_encode(["Type" => "Error", "msg" => "questID is empty."]);
			} else {
				try {
					$dbQuery = $db->prepare('SELECT * FROM tablequests WHERE id=:questID');
					$dbQuery->execute(['questID' => $questID]);
				} catch (PDOException $e) {
					// If it fails, show the error and exit
					// The strval() function converts the exception type to a string type
					echo json_encode(["Type" => "Error", "msg" => strval($e)]);
					http_response_code(500);
					exit;
				}

				$dbRow = $dbQuery->fetch();
				if ($dbRow) {
					echo json_encode(["Type" => "Success", "msg" => "Quest returned.", "quest" => $dbRow]);
				} else {
					echo json_encode(["Type" => "Error", "msg" => "No quests found with that questID."]);
					http_response_code(500);
				}
			}
		}*/
		

		// Login, (on)
		if ($_POST['fn'] == 'login') {
			$username = $_POST['username'];
			$password = $_POST['password'];

			// for debugging
			//echo $username . "<br>";
			//echo $password . "<br>";

			// First check if a username and password have been provided
			if (empty($username) | empty($password)) {
				// No username or password provided, so respond with an error
				echo json_encode(["Type" => "Error", "msg" => "Username and/or Password are empty."]);
				http_response_code(400);
			} else {
				// Both the username and password have been provided, so carry on...

				// Hash the password before checking it against the database
				$password = sha1($password);

				// Create a new variable called dbQuery that stores a preparational query to PDO. Once PDO has prepared the query, execute it with the appropriate variables.
				// https://phpdelusions.net/pdo
				try {
					$dbQuery = $db->prepare('SELECT * FROM tablelogin WHERE username=:username AND password=:password');
					$dbQuery->execute([':username' => $username, ':password' => $password]);
				} catch (PDOException $e) {
					// If it fails, show the error and exit
					// The strval() function converts the exception type to a string type
					echo json_encode(["Type" => "Error", "msg" => strval($e)]);
					http_response_code(500);
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
					http_response_code(403);
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
				http_response_code(400);
			} else if (empty($password)) {
				echo json_encode(["Type" => "Error", "msg" => "Password is empty."]);
				http_response_code(400);
			} else if (strlen($password) < 6) { // if the length of the password string is under 6 characters
				echo json_encode(["Type" => "Error", "msg" => "Password must be at least 6 characters long."]);
				http_response_code(400);
			} else if (empty($email)) {
				echo json_encode(["Type" => "Error", "msg" => "Email is empty."]);
				http_response_code(400);
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
					http_response_code(500);
					exit;
				}

				if ($dbRow['email'] == $email) {
					// there is an entry found in the database that matches the email, so show an error that the email is already in use
					echo json_encode(["Type" => "Error", "msg" => "Email already in use"]);
					http_response_code(500);
				} else if ($dbRow['username'] == $username) {
					echo json_encode(["Type" => "Error", "msg" => "Username already in use"]);
					http_response_code(500);
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
						http_response_code(500);
						exit;
					}
				}
			}
		}
	} else {
		echo json_encode(["Type" => "Error", "msg" => "?fn not specified."]);
		http_response_code(400);
	}
?>