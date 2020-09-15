<?php
header("Content-Type: application/json; charset=UTF-8");
require 'db.php';
require 'user.php';

$req = $_GET['req'] ?? null;
$db=new database();
$usert = new usertable($db->connect());

switch($req)
{
    case 'add':
        $obj=$_GET['object'];
        $temp=json_decode($obj);
        echo $usert->addrow($temp);
        break;

    case 'retrieve':
        echo $usert->getdetails();
        break;

    default:
        echo json_encode(["Invalid request"]);
        break;
}

?>