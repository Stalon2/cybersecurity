<?php

function pdo_connect_mysql() {
    $DATABASE_HOST = 'localhost';
    $DATABASE_USER = 'root';
    $DATABASE_PASS = '';
    $DATABASE_NAME = 'cybe_db';
    try {
    	return new PDO('mysql:host=' . $DATABASE_HOST . ';dbname=' . $DATABASE_NAME . ';charset=utf8', $DATABASE_USER, $DATABASE_PASS);
    } catch (PDOException $exception) {
    	exit('Failed to connect to database!');
    }
}

$pdo = pdo_connect_mysql();

  $query = $pdo->prepare('INSERT INTO `contactform`(`nom`, `email`, `telephone`, `message`) VALUES (?,?,?,?)');
  $query->execute(
    [
        $_POST["nom"],$_POST['email'],$_POST['telephone'],$_POST['message']
        ]
);
header('location:index.html');
