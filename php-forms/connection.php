<<<<<<< HEAD
<?php
function getConnection() {
	require_once 'secret/db-credentials.php';
	
	try {
		$conn = new PDO("mysql:host={$dbHost};dbname={$dbDatabase}", $dbUser, $dbPassword);
		
		return $conn;
		
	} catch(PDOException $e) {
		die('Could not connect to database ' .$e);
	}
}
=======
<?php 
function getConnection() {
    require_once 'secret/db-credentials.php';
    
    try {
        $conn = new PDO("mysql:host={$dbHost};dbname={$dbDatabase}", 
              $dbUser, $dbPassword);
        
        return $conn;
        
    } catch(PDOException $e) {
        die('Could not connect to database ' . $e);
    }
}

>>>>>>> 278f399a03f67ccb40c80ec9fe59b166249f0dbb
?>