<?php

$host = "localhost"; /* Host name */
$user = "nicolgy207_nicolgy207"; /* User */
$password = "7jaoakxe"; /* Password */
$dbname = "nicolgy207_kristdepuydt"; /* Database name */

$con = mysqli_connect($host, $user, $password,$dbname);
// Check connection
if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}
