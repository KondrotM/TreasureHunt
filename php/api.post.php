<?php

	include('config.php');

	// start the session if it hasn't been already
	// using include_once to make sure it's not starting the session more than once
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
				http_response_code(400);
			} else {
				
				// Create a new variable called dbQuery that stores a preparational query to PDO. Once PDO has prepared the query, execute it with the appropriate variables.
				// https://phpdelusions.net/pdo
				try {
					// Check if the email is already in use
					$dbQuery = $db->prepare('SELECT * FROM quests WHERE mapName=:mapName');
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
					echo json_encode(["Type" => "Error", "msg" => "Map name already in use."]);
					http_response_code(500);
				} else {
					// map name not currently in use, so make a new quest entry in the database and then the new quest entry

					// generate a UUID
					$uuid = genUUID();

					// check if the UUID is already in use, and if so regenerate the UUID until it isn't
					try {
						$dbQueryUUID = $db->prepare('SELECT locationUUID from `locations` WHERE locationUUID=:uuid');
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
						$dbQueryTwo = $db->prepare('INSERT INTO `tablelocations` (`locationUUID`, `latitude`, `longitude`) VALUES (:uuid, :lat, :lng)');
						$dbQueryTwo->execute(['lng' => $longitude, 'lat' => $latitude, 'uuid' => $uuid]);
					} catch (PDOException $e) {
						// If it fails, show the error and exit
						echo json_encode(["Type" => "Error", "msg" => strval($e)]);
						http_response_code(500);
						exit;
					}

					// add the quest entry to the tablequests in the database with the locationUUID
					try {
						$dbQueryTwo = $db->prepare('INSERT INTO `quests` (`questID`, `userID`, `locationUUID`, `difficulty`, `mapName`, `description`, `dateCreated`) VALUES (NULL, :userID, :locationUUID, :difficulty, :mapName, :descr, NULL)');
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

		// Get quests
		if ($_POST['fn'] == 'getQuests') {
			try {
				// Check if the email is already in use
				$dbQuery = $db->prepare('SELECT * FROM quests');
				$dbQuery->execute();
			} catch (PDOException $e) {
				// If it fails, show the error and exit
				echo json_encode(["Type" => "Error", "msg" => strval($e)]);
				http_response_code(500);
				exit;
			}

			$questsObj;
			$dbRow = $dbQuery->fetch();
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

		// Get a specific quest
		if ($_POST['fn'] == 'getQuestDetails') {
			// Quest details used to view when user is editing them through the quest editor

			$questID = $_POST['questID'];

			if (empty($questID)) {
				// No username or password provided, so respond with an error
				echo json_encode(["Type" => "Error", "msg" => "questID is empty."]);
				http_response_code(400);
			} else {
				try {
					// Check if the email is already in use
					$dbQuery = $db->prepare('SELECT * FROM quests WHERE questID=:questID');
					$dbQuery->execute();
				} catch (PDOException $e) {
					// If it fails, show the error and exit
					echo json_encode(["Type" => "Error", "msg" => strval($e)]);
					http_response_code(500);
					exit;
				}
	
				$dbRow = $dbQueryUUID->fetch();
				if ($dbRow) {
					echo json_encode(["Type" => "Success", "msg" => "Quest returned.", "quests" => $dbRow]);
				} else {
					echo json_encode(["Type" => "Error", "msg" => "No quests found with that questID."]);
					http_response_code(500);
				}
			}

			/*
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
			*/
		}

		// Login
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

				// Create a new variable called dbQuery that stores a preparational query to PDO. Once PDO has prepared the query, execute it with the appropriate variables.
				// https://phpdelusions.net/pdo
				// https://phpdelusions.net/pdo_examples/password_hash
				try {
					$dbQuery = $db->prepare('SELECT * FROM users WHERE username=:username');
					$dbQuery->execute([':username' => $username]);
				} catch (PDOException $e) {
					// If it fails, show the error and exit
					// The strval() function converts the exception type to a string type
					echo json_encode(["Type" => "Error", "msg" => strval($e)]);
					http_response_code(500);
					exit;
				}

				$dbRow = $dbQuery->fetch();
				if ($dbRow) {
					// there is an entry found in the database that matches the username,
					// so check if the password matches

					if (password_verify($password, $dbRow['hashedPass'])) {
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
						echo json_encode(["Type" => "Error", "msg" => "Incorrect password."]);
						http_response_code(403);
						exit;	
					}
				} else {
					echo json_encode(["Type" => "Error", "msg" => "Invalid username or password."]);
					http_response_code(403);
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

				if ($_POST['fn'] == 'getCrumbDetails') {
			$quest_id = $_POST['questId'];
			$user_id = $_POST['userId'];

			// 
			// Find the first not-completed crumb by user for specified quest
			// 

			// 
			// Return crumb details
			// 

			$obj = [
				'questId' => 2,
				'crumbId' => 3,
				'questName' => 'Getting Around',
				'crumbName' => 'Down the Road',
				'riddle' => 'Here is a riddle',
				'hint' => 'Riddle hint',
				'answer' => 'Ans',
				'difficulty' => 'easy',
				'crumbPos' => 3,
				'totalCrumbs' => 6,
				// lat and lng of crumb
				'lat' => 43.125,
				'lng' => 2.512
			];

					echo json_encode(["Type" => "Success", "details" => $obj]);
		}

		if ($_POST['fn'] == 'completeCrumb') {
			$crumb_id = $_POST['crumbId'];
			$user_id = $_POST['userId'];

			// 
			// Set the crumb as complete
			// 

			// 
			// Get the next crumb details and return them
			// 

			// 
			// If the player completed the last crumb in the quest, return +1
			// so then the completion will say 7/6, i'll further handle the quest being completed react-side
			// 

			$obj = [
				'questId' => 2,
				'crumbId' => 5,
				'questName' => 'Getting Around',
				'crumbName' => "Bag's in the river",
				'riddle' => 'Here is a riddle',
				'hint' => 'Riddle hint',
				'answer' => 'Ans',
				'difficulty' => 'easy',
				'crumbPos' => 4,
				'totalCrumbs' => 6,
				// lat and lng of crumb
				'lat' => 43.125,
				'lng' => 2.512
			];

			echo json_encode(["Type" => "Success", "details" => $obj]);
		}

		// Create a new crumb
		if ($_POST['fn'] == 'createCrumb') {

			$questID = $_POST['questID'];
			$order = $_POST['order'];
			$hints = $_POST['hints'];

			if (empty($questID) | empty($order) | empty($hints)) {
				echo json_encode(["Type" => "Error", "msg" => "One or more of the required inputs are empty."]);
				http_response_code(400);
			} else {
				try {
					$dbQuery = $db->prepare('INSERT INTO `crumbs` (`crumbID`, `questID`, `order`, `hints`) VALUES (NULL, :questID, :order, :hints)');
					$dbQuery->execute(['questID' => $questID, 'order' => $order, 'hints' => $hints]);
					echo json_encode(['Type' => 'Success', 'created' => 'true', 'msg' => 'Breadcrumb created.']);
				} catch (PDOException $e) {
					// If it fails, show the error and exit
					echo json_encode(["Type" => "Error", "msg" => strval($e)]);
					http_response_code(500);
					exit;
				}
			}

			/*
			// check if these are empty, if yes, return "created" => "false" 
			$name = $_POST['name'];
			$riddle = $_POST['riddle'];
			$answer = $_POST['answer'];

			echo json_encode(["Type" => "Success", "created" => "true", "msg" => "Breadcrumb Created"]);
			*/
		}

		// Get hint from crumbID
		if ($_POST['fn'] == 'getHint') {
			$crumbID = $_POST['crumbID'];

			if (empty($crumbID)) {
				echo json_encode(["Type" => "Error", "msg" => "crumbID is empty."]);
				http_response_code(400);
			} else {
				try {
					// Check if the email is already in use
					$dbQuery = $db->prepare('SELECT * FROM hints WHERE crumbID=:crumbID');
					$dbQuery->execute(['crumbID' => $crumbID]);
				} catch (PDOException $e) {
					// If it fails, show the error and exit
					echo json_encode(["Type" => "Error", "msg" => strval($e)]);
					http_response_code(500);
					exit;
				}
	
				$dbRow = $dbQuery->fetch();
				if ($dbRow) {
					echo json_encode(["Type" => "Success", "msg" => "Hint returned.", "hint" => $dbRow]);
				} else {
					echo json_encode(["Type" => "Error", "msg" => "No hints found with that crumbID."]);
					http_response_code(500);
				}
			}
		}

		if ($_POST['fn'] == 'getUserQuests') {
			// Return an object with all the quests created by the user with user_id == $id
			// Used for quest editor overview

			$userID = $_POST['userID'];

			if (empty($userID)) {
				echo json_encode(["Type" => "Error", "msg" => "userID is empty."]);
				http_response_code(400);
			} else {
				try {
					// Check if the email is already in use
					$dbQuery = $db->prepare('SELECT * FROM quests WHERE userID=:userID');
					$dbQuery->execute(['userID' => $userID]);
				} catch (PDOException $e) {
					// If it fails, show the error and exit
					echo json_encode(["Type" => "Error", "msg" => strval($e)]);
					http_response_code(500);
					exit;
				}
	
				$questsObj;
				$dbRow = $dbQuery->fetch();
				while ($dbRow) { // for each row returned, add it to the questsObj
					$questsObj += $dbRow;
				}
				echo json_encode(["Type" => "Success", "msg" => "Quests returned.", "quests" => $questsObj]);
			}

			/*
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
			*/
		}

		if ($_POST['fn'] == "getCrumbData") {
			$crumbID = $_POST['crumbID'];

			if (empty($questID)) {
				echo json_encode(["Type" => "Error", "msg" => "questID is empty."]);
				http_response_code(400);
			} else {
				try {
					// Check if the email is already in use
					$dbQuery = $db->prepare('SELECT * FROM crumbs WHERE questID=:questID');
					$dbQuery->execute(['questID' => $questID]);
				} catch (PDOException $e) {
					// If it fails, show the error and exit
					echo json_encode(["Type" => "Error", "msg" => strval($e)]);
					http_response_code(500);
					exit;
				}

				$dbRow = $dbQuery->fetch();
				if ($dbRow) {
					echo json_encode(["Type" => "Success", "msg" => "Crumb returned.", "crumb" => $dbRow]);
				} else {
					echo json_encode(["Type" => "Error", "msg" => "No crumbs found with that crumbID."]);
					http_response_code(500);
				}
			}
		}

		if ($_POST['fn'] == 'getQuestCrumbs') {
			// Return the crumbs for a specific quest

			$questID = $_POST['questID'];

			if (empty($questID)) {
				echo json_encode(["Type" => "Error", "msg" => "questID is empty."]);
				http_response_code(400);
			} else {
				try {
					// Check if the email is already in use
					$dbQuery = $db->prepare('SELECT * FROM crumbs WHERE questID=:questID');
					$dbQuery->execute(['questID' => $questID]);
				} catch (PDOException $e) {
					// If it fails, show the error and exit
					echo json_encode(["Type" => "Error", "msg" => strval($e)]);
					http_response_code(500);
					exit;
				}
	
				$crumbsObj;
				$dbRow = $dbQuery->fetch();
				while ($dbRow) { // for each row returned, add it to the crumbsObj
					$crumbsObj += $dbRow;
				}
				echo json_encode(["Type" => "Success", "msg" => "Crumbs returned.", "crumbs" => $crumbsObj]);
			}


			/*
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
			*/
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

		if ($_POST['fn'] == 'getQuestOverview') {
			$quest_id = ['questId'];
			$user_id = ['userId'];

			// 
			// Get quest name, diff, desc, starting coords
			// 

			// 
			// Get total quest breadcrumbs
			// 

			// 
			// Get breadcrumbs completed by user
			// 

			// Please keep this object syntax
			$obj = [
				'name' => 'Quest Name',
				'id' => $quest_id,
				'description' => 'Check out this brand new quest! You can explore all around the local town',
				'difficulty' => 'Easy',
				'lat' => 42.02,
				'lng' => 46.51,
				'totalCrumbs' => 6,
				'completedCrumbs' => 4
			];

			echo json_encode(["Type" => "Success", "msg" => "Quest Overview Retrieved", "questDetails" => $obj]);
		}	

		if ($_POST['fn'] == 'deleteQuest') {
			$quest_id = $_POST['questId'];

			// 
			// Code to delete quest
			// 

			echo json_encode(["Type" => "Success", "deleted" => "true", "msg" => "Quest Deleted"]);
		}

		// Complete breadcrumb
		if ($_POST['fn'] == "completeBreadcrumb") {
			$crumbID = $_POST['crumbID'];
			$userID = $_POST['userID'];

			if (empty($crumbID)) {
				echo json_encode(["Type" => "Error", "msg" => "crumbID is empty."]);
				http_response_code(400);
			} else if (empty($userID)) {
				echo json_encode(["Type" => "Error", "msg" => "userID is empty."]);
				http_response_code(400);
			} else {
				try {
					$dbQuery = $db->prepare('SELECT * FROM progresses WHERE userID=:userID AND crumbID=:crumbID');
					$dbQuery->execute(['userID' => $userID, 'crumbID' => $crumbID]);
				} catch (PDOException $e) {
					echo json_encode(["Type" => "Error", "msg" => strval($e)]);
					http_response_code(500);
					exit;
				}

				$dbRow = $dbQuery->fetch();
				if ($dbRow) {
					try {
						$dbQuery = $db->prepare('UPDATE progresses SET `completed` = TRUE WHERE userID=:userID AND crumbID=:crumbID');
						$dbQuery->execute(['userID' => $userID, 'crumbID' => $crumbID]);
					} catch (PDOException $e) {
						echo json_encode(["Type" => "Error", "msg" => strval($e)]);
						http_response_code(500);
						exit;
					}
				} else {
					try {
						$dbQueryTwo = $db->prepare('INSERT INTO `progresses` (`userID`, `crumbID`, `completed`) VALUES (:userID, :crumbID, TRUE)');
						$dbQuery->execute(['userID' => $userID, 'crumbID' => $crumbID]);
					} catch (PDOException $e) {
						echo json_encode(["Type" => "Error", "msg" => strval($e)]);
						http_response_code(500);
						exit;
					}
				}

				echo json_encode(["Type" => "Success", "msg" => "Crumb marked as completed.", "crumb" => $dbRow]);
			}
		}


		// Signup/register
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
					$dbQuery = $db->prepare('SELECT * FROM users WHERE email=:email OR username=:username');
					$dbQuery->execute(['email' => $email, 'username' => $username]);
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

					// Hash the password before storing it
					// https://www.php.net/manual/en/function.password-hash.php
					$password = password_hash($password, "PASSWORD_DEFAULT");
					
					// if we got to this point, both the password fields match and the email and pass aren't already in use, so make the new account entry in the database
					try {
						// Make the account
						$dbQueryTwo = $db->prepare('INSERT INTO `users` (`userID`, `username`, `hashedPass`, `email`) VALUES (NULL, :username, :password, :email)');
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