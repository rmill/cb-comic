<?php

class Connection {

    private static $_instance;

    private $connection;

    public function __construct() {
        $this->connection = new mysqli(
            DB_HOST,
            DB_USER,
            DB_PASSWORD,
            DB_NAME
        );
    }

    public static function getInstance() {
        if (!self::$_instance) {
            self::$_instance  = new self();
        }

        return self::$_instance;
    }

    public function run($sql, $values = array()) {
        if (!$this->connection) {
            return;
        }

        // Bind the values
        foreach ($values as $name => $value) {
            if (is_array($value) || is_object($value)) {
                continue;
            }

            $sql = str_replace(":$name", $value, $sql);
        }

        $result =  $this->connection->query($sql);

	if (!($result instanceof mysqli_result)) {
		return $result;
	}

	// Get all the rows
	$fetchedRows = array();
	for ($i = 0; $i < $result->num_rows; $i++) {
		$fetchedRows[] = $result->fetch_assoc();
	}

	return $fetchedRows;
    }
}
