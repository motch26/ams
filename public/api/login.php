<?php
$user = 'chmscams';
$pass = 'p@33w0rd';
$con = new PDO('mysql:host=43.255.154.56;dbname=chmscams', $user, $pass);
extract($_POST);

$selectUser = $con->query("SELECT * FROM test WHERE username = $username AND password = $password");
$user = $selectUser->fetch(PDO::FETCH_ASSOC);

echo json_encode($user);
