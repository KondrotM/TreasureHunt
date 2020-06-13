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
		mt_rand(0, 0x3fff) | 0x8000,mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff));
	}

	if (isset($_POST['fn'])){

		// Create quests
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
					exit;
				}

				$dbRow = $dbQuery->fetch();
				// Check if a quest with the map name already exists
				if ($dbRow['mapName'] == $mapName) {
					// there is an entry found in the database that matches the map name, so show an error that the map name is already in use
					echo json_encode(["Type" => "Error", "msg" => "Map name already in use"]);
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
						exit;
					}

					// we have a unique UUID now, so use it when adding the latitude and longitude to the database
					try {
						$dbQueryTwo = $db->prepare('INSERT INTO `tablelocations` (`locationUUID`, `userID`, `posX`, `posY`) VALUES (:uuid, :userID, :lng, :lat)');
						$dbQueryTwo->execute(['userID' => $userID, 'lng' => $longitude, 'lat' => $latitude, 'uuid' => $uuid]);
					} catch (PDOException $e) {
						// If it fails, show the error and exit
						echo json_encode(["Type" => "Error", "msg" => strval($e)]);
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
						exit;
					}
				}
			}
		}

		// Get quests
		if ($_POST['fn'] == 'getQuests') {
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

		if ($_POST['fn'] == 'getQuestDetails') {
			// Quest details used to view when user is editing them through the quest editor

			$quest_id = $_POST['questId'];

			// 
			// Code to fetch quest details
			// 

			// fn stays as editMap, the rest are set according to fetched data
			$obj = [
				'fn' => 'editMap',
				'lat' => 23.042,
				'lng' => 42.043,
				'difficulty' => 'easy',
				'descripition' => 'Here is a description describing a map',
				'name' => 'Locals Only'
			];

			echo json_encode(["Type" => "Success", "mapDetails" => $obj]);
		}

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

		if ($_POST['fn'] == 'editMap') {
			$quest_id = $_POST['questId'];

			// 
			// Find quest
			// 

			$map_name = $_POST['mapName'];
			$difficulty = $_POST['difficulty'];
			$description = $_POST['description'];
			$lat = $_POST['lat'];
			$lng = $_POST['lng'];

			// 
			// Update map details
			// 

			echo json_encode(["Type" => "Success", "msg" => "Map Details Updated"]);
		}

		if ($_POST['fn'] == 'createCrumb') {

			$id = $_POST['id'];
			$hint = $_POST['hint'];
			$lat = $_POST['lat'];
			$lng = $_POST['lng'];

			// check if these are empty, if yes, return "created" => "false" 
			$name = $_POST['name'];
			$riddle = $_POST['riddle'];
			$answer = $_POST['answer'];


			echo json_encode(["Type" => "Success", "created" => "true", "msg" => "Breadcrumb Created"]);
		}

		if ($_POST['fn'] == 'getUserQuests') {
			// Return an object with all the quests created by the user with user_id == $id
			// Used for quest editor overview 
			$id = $_POST['id'];

			$obj = [
				[
					'id' => '2',
					'title' => 'Chelt Locals Only',
					'diff' => 'Medium'
				],
				[
					'id' => '3',
					'title' => 'Mind Your Business',
					'diff' => 'Hard'
				],
				[
					'id' => '4',
					'title' => 'Quest in progerss',
					'diff' => 'Easy'
				]
			];

			echo json_encode(["Type" => "Success", "msg" => "Maps Returned", "maps" => $obj]);
		}

		if ($_POST['fn'] == 'getQuestCrumbs') {
			// Return the crumbs for a specific quest
			// User in the quest editor
			// Return with the greatest id last
			$obj = [
				[
					'id' => '1',
					'name' => 'Go to the hills'
				],
				[
					'id' => '2',
					'name' => 'Explore the road'
				],
				[
					'id' => '3',
					'name' => 'Through the forest'
				]
			];
			echo json_encode(["Type" => "Success", "msg" => "Crumbs Returned", "crumbs" => $obj]);
		}

		if ($_POST['fn'] == 'deleteCrumb') {
			// User request to delete a breadcrumb
			$crumb_id = $_POST['crumbId'];
			$quest_id = $_POST['questId'];

			// 
			// Code to delete crumb
			// 

			// 
			// Get new list of breadcrumbs still in quest
			// 

			$obj = [
				[
					'id' => '1',
					'name' => 'Go to the hills'
				],
				[
					'id' => '3',
					'name' => 'Through the forest'
				]
			];

			echo json_encode(["Type" => "Success", "deleted" => "true", "msg" => "Crumb Deleted", "crumbs" => $obj]);

		}

		if ($_POST['fn'] == 'deleteQuest') {
			$quest_id = $_POST['questId'];

			// 
			// Code to delete quest
			// 

			echo json_encode(["Type" => "Success", "deleted" => "true", "msg" => "Quest Deleted"]);
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