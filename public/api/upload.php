<?php
include('./includes/con_local.php');
// $conn = new mysqli($servername, $user, $pass, $dbname);

extract($_POST);

if (isset($_FILES['pdf'])) {
  $fileName = $_FILES['pdf']['name'];
  $fileTmp = $_FILES['pdf']['tmp_name'];

  $data = [
    'program' => $program,
    'areaNum' => $areaNum,
    'parameter' => $parameter,
    'fileName' => $fileName
  ];

  $sql = "INSERT INTO uploads (program, areaNum, parameter, fileName, dateUpload) VALUES (:program, :areaNum, :parameter, :fileName, NOW())";
  $stmt =  $con->prepare($sql)->execute($data);



  move_uploaded_file($fileTmp, 'uploads/' . $program . '/' . $areaNum . '/' . $parameter . '/' . $fileName); //TODO: cloud ('./../')
  echo true;
} else {
  echo false;
}
