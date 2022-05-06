<?php
include('./includes/con_local.php');
extract($_POST);

$selectUser = $con->query("SELECT * FROM users WHERE username = '$username' AND password = '$password'");
$userCred = $selectUser->fetch(PDO::FETCH_ASSOC);

echo json_encode($userCred);
