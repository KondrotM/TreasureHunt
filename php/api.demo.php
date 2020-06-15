<?php

	include('config.php');

	// start the session if it hasn't been already
	// using include_once to make sure it's not starting the session more than once
	include_once('session.php');


	// Login
	if ($_POST['fn'] == 'login') {
		$username = $_POST['username'];
		$password = $_POST['password'];


		$obj = [
			"login" => "true",
			"id" => '12'
		];

		// and return a success response with the object we just made
		echo json_encode(["Type" => "Success", "msg" => $obj]);

	}

	$questsObj = [
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
		],
		[
			'id' => '4',
			'title' => 'Cool Quest',
			'diff' => 'Medium'
		],
		[
			'id' => '5',
			'title' => 'Walk Around',
			'diff' => 'Easy'
		]
	];

	$yourQuestsObj = [
		[
			'id' => '4',
			'title' => 'Cool Quest',
			'diff' => 'Medium'
		],
		[
			'id' => '5',
			'title' => 'Walk Around',
			'diff' => 'Easy'
		]
	];

	$coolQuestBreadcrumbs = [
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
		],
		[
			'id' => '8',
			'name' => 'The final stretch'
		]
	];

	$publicQuestBreadcrumbs = [
		[
			'id' => '4',
			'name' => 'A walk in the park'
		],
		[
			'id' => '5',
			'name' => 'A wildered path'
		],
		[
			'id' => '6',
			'name' => 'A very long walk'
		]
	];

	$newQuestBreadcrumbs = [
	];

	if ($_POST['fn'] == 'getQuests') {
			echo json_encode(["Type" => "Success", "msg" => "Maps Returned", "quests" => $questsObj]);
	}

	if ($_POST['fn'] == 'getUserQuests') {
		echo json_encode(["Type" => "Success", "msg" => "Maps Returned", "quests" => $yourQuestsObj]);
	}

	if ($_POST['fn'] == 'getQuestCrumbs') {
			// Return the crumbs for a specific quest

			$questID = $_POST['questId'];

			if ($questID == 6) {
				echo json_encode(["Type" => "Success", "msg" => "Crumbs Returned", "crumbs" => $newQuestBreadcrumbs]);
			} else if ($questID == 4) {
				echo json_encode(["Type" => "Success", "msg" => "Crumbs Returned", "crumbs" => $coolQuestBreadcrumbs]);

			} else {
				echo json_encode(["Type" => "Success", "msg" => "Crumbs Returned", "crumbs" => $publicQuestBreadcrumbs]);

			}

	}

	if ($_POST['fn'] == 'createCrumb'){
		$name == $_POST['name'];

		$crumb = [
			'id' => '8',
			'name' => $name
		];

		array_push($newQuestBreadcrumbs, $crumb);
	}

	if ($_POST['fn'] == 'createQuest') {
		$name = $_POST['questName'];

		$diff = $_POST['difficulty'];

		$quest = [
			'id' => '6',
			'title' => $name,
			'diff' => $diff
		];

		array_push($questsObj, $quest);
		array_push($yourQuestsObj, $quest);
		echo json_encode(["Type" => "Success", "msg" => "Quest created."]);
	}

	if ($_POST['fn'] == 'deleteQuest') {
		array_pop($yourQuestsObj);

		echo json_encode(["Type" => "Success", "deleted" => "true", "msg" => "Quest Deleted"]);
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
				'riddle' => 'Name me a sticky square',
				'hint' => 'Look near walls',
				'answer' => 'Sticky Note',
				'difficulty' => 'easy',
				'crumbPos' => 5,
				'totalCrumbs' => 6,
				// lat and lng of crumb
				'lat' => 52.91983,
				'lng' => -1.1986
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

			if ($crumb_id == 5) {
				$obj = [
					'crumbPos' => 7,
					'totalCrumbs' => 6
				];
			}  else {

			$obj = [
				'questId' => 2,
				'crumbId' => 5,
				'questName' => 'Getting Around',
				'crumbName' => "Bag's in the river",
				'riddle' => 'Here is a riddle',
				'hint' => 'Riddle hint',
				'answer' => 'Ans',
				'difficulty' => 'easy',
				'crumbPos' => 6,
				'totalCrumbs' => 6,
				// lat and lng of crumb
				'lat' => 43.125,
				'lng' => 2.512
			];
		}

			echo json_encode(["Type" => "Success", "details" => $obj]);
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
				'name' => 'Getting Around',
				'id' => $quest_id,
				'description' => 'Check out this brand new quest! You can explore all around the local town',
				'difficulty' => 'Easy',
				'lat' => 52.9,
				'lng' => -1.20,
				'totalCrumbs' => 6,
				'completedCrumbs' => 4
			];

			echo json_encode(["Type" => "Success", "msg" => "Quest Overview Retrieved", "questDetails" => $obj]);
		}	

	?>