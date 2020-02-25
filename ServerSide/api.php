<?php
	include("config.php");
	//include_once("session.php");

	if (isset($_GET['fn'])) {
		$fnToRun = $_GET['fn'];
		if ($fnToRun === 'username') {
			echo json_encode("Example username");
		} else {
			echo json_encode("Error: Empty '?fn='");
		}
	} else {
		echo json_encode("So tell me what you want, what you really really want. ('?fn=' missing)");
	}
?>