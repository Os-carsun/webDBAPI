<?php
ini_set('display_errors', 'on');//for debug
include 'dbInfo.php';
$dsn = "$dbtype:dbname=$dbname;host=$host";
echo "$dsn</br>";
$dbh = new PDO($dsn,$username,$password);

$insertStmt = $dbh->prepare("INSERT INTO test_table (ip, rate, times) VALUES (:ip, :rate, :times)");
$insertStmt->bindParam(':ip', $ip);
$insertStmt->bindParam(':rate', $rate);
$insertStmt->bindParam(':times', $times);

$queryStmt = $dbh->prepare("SELECT * FROM test_table");
$queryStmt->execute();

if( isset($_POST['data']) ){
	echo $_POST['data'];
	$data_string=json_decode($_POST['data']);
	// var_dump($data_string);
	$ip = $data_string->{'ip'};
	$rate = $data_string->{'rate'};
	$times = $data_string->{'times'};
	// $insertStmt->execute();
	// echo $ip;
}else{
	while ($row = $queryStmt->fetch()) {
		  print(json_encode($row));
		  echo "<br/>";
	}
}
// echo $queryStmt;
// $ip = "127.0.0.1";
// $rate = 0.99;
// $times = 1000;
// $insertStmt->execute();

// $_POST['ip']
// echo "1123";
