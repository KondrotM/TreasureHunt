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
	}
	 else {

		echo json_encode(["Type" => "Success", "msg" => "Map Not Created"]);
	}