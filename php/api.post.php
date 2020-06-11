<?php
	include('config.php');
	include_once('session.php');

	if (isset($_POST['fn'])){
		if($_POST['fn'] == 'createMap') {
			echo json_encode(["Type" => "Success", "msg" => "Map Created"]);
		}
		if($_POST['fn'] == 'getQuests'){
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
		if($_POST['fn'] == 'login') {
			$username = $_POST['username'];
			$password = $_POST['password'];

			if ($username == 'Eric') {
				$obj = [
					'login' => 'true',
					'id' => '12'
				];

				echo json_encode(['Type' => 'Success', 'msg' => $obj]);
			} else {
				$obj = [
					'login' => 'false',
					'username' => $username
				];
				echo json_encode(['Type' => 'Success', 'msg' => $obj]);
			}
		}
		if($_POST['fn'] == 'register') {
			$username = $_POST['username'];
			$password = $_POST['password'];
			$email = $_POST['email'];

			// rudimentary checks for username and password, you can use 'valid' or your own way in order to distinguish between username or email taken, mk
			$valid = True;

			// Check if username is valid
			if ($username == 'Eric') {
				$valid = False;
			}
			// Check if email is valid
			if ($email == 'mail@123.com') {
				$valid = False;
			}

			// Check if password is valid? nice-to-have feature, mk

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