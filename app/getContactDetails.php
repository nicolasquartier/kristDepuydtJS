<?php
//require_once 'config.php';

//$sel = mysqli_query($con,"select * from contactdetails");
//$data = array();
//
//while ($row = mysqli_fetch_array($sel)) {
//$data[] = array("fname"=>$row['json'],"lname"=>$row['json'],"username"=>$row['json']);
//}
header('Content-Type: application/json');
echo json_encode("testdata");
//$arr = array();
//$arr[] = "gibberish";
//echo $json_info = json_encode($arr);
//echo true;

// mysqli query to fetch all data from database
//$query = "SELECT * from emp_details ORDER BY emp_id ASC";
//$result = mysqli_query($con, $query);
//$arr = array();
//if(mysqli_num_rows($result) != 0) {
//  while($row = mysqli_fetch_assoc($result)) {
//    $arr[] = $row;
//  }
//}
//// Return json array containing data from the database
//echo $json_info = json_encode($arr);
?>
