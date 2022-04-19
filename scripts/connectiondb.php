<?php
$servername = "localhost";
$username = "root";
$password = "";
$db = "db_webgisapp";

// Create connection
$conn = new mysqli($servername, $username, $password,$db);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully\n";


// $result = mysqli_query($conn,"SELECT * FROM tb_testing");

// //storing in array
// $data = array();
// while($row = mysqli_fetch_assoc($result)){
//   $data[] = $row;
// }

// echo json_encode($data);


$sql = "SELECT * FROM tb_testing LIMIT 3";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of array
  while($row = $result->fetch_assoc()) {
    $data[] = $row;
  }
  echo json_encode($data);
} else {
  echo "0 results";
}
?> 