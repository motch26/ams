<?php
date_default_timezone_set('Asia/Manila');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
$user = 'root';
$pass = '';
$servername = 'localhost';
$dbname = 'qaa';
$con = new PDO('mysql:host=' . $servername . ';dbname=' . $dbname, $user, $pass);
