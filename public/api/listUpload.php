<?php
include('./includes/con_local.php');

$data = [];
$datesArr = [];
$dates = $con->query("SELECT DISTINCT dateUpload FROM uploads ORDER BY dateUpload DESC")->fetchAll(PDO::FETCH_ASSOC);
foreach ($dates as $date) {
  $_date = $date['dateUpload'];
  array_push($datesArr, $_date);
}
$rows = [];
$records = $con->query("SELECT * FROM uploads")->fetchAll(PDO::FETCH_ASSOC);
array_push($data, $datesArr, $records);

echo json_encode($data);
