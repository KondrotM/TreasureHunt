<?php
//outdated connection, but keep it as it has the uni database username and password, mk

// details to connect to server, mk
$servername = "localhost";
$DBusername = "group";
$DBpassword = "0?4L5yyj";
$DBname = "thenathanists_treasurehunt";

$connection = new mysqli($servername,$DBusername,$DBpassword,$DBname);

if($connection->connect_error){
    die("Connection failed: ". $conn->connect_error);
} else {
  session_start();
//  echo "connection successful";
}
?>