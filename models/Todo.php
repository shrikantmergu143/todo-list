<?php

class Todo
{
    // DB stuff
    /**
     * @var PDO
     */
    private $conn;
    private $table = 'todo';

    // Todo Properties
    public $id;
    public $item;
    public $priority;
    public $sort;
    public $todoStatu;
    public $addDate;
    public $completDate;
    public $from;
    public $to;
    public $PosFrom;
    public $PosTo;

    // Constructor with DB
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Get Uncompleted tasks
    public function getdataList()
    {
        // Create query
        $query = 'SELECT * FROM ' . $this->table . ' ORDER BY sort ASC  ';

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Execute query
        $stmt->execute();

        return $stmt;
    }

    // Get Completed tasks
    public function getCompleted()
    {
        // Create query
        $query = 'SELECT * FROM ' . $this->table . ' WHERE  todoStatu=2  ORDER BY sort ASC  ';

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Execute query
        $stmt->execute();

        return $stmt;
    }

    // Get Single Task
    public function read_one()
    {
        // Create query
        $query = 'SELECT  * FROM ' . $this->table . '  WHERE id = ? LIMIT 0,1';

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        $this->id = filter_var($this->id, FILTER_SANITIZE_NUMBER_INT);

        // Bind ID
        $stmt->bindParam(1, $this->id);

        // Execute query
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // Set properties
        $this->item = $row['item'];
        $this->sort = $row['sort'];
        $this->priority = $row['priority'];
        $this->todoStatu = $row['todoStatu'];
        $this->addDate = $row['addDate'];
        $this->completDate = $row['completDate'];
    }

    // Create Task
    public function create()
    {
        // Create query
        if (!empty($this->item)) {
            $query = 'UPDATE ' . $this->table . ' SET sort = sort+1 WHERE todoStatu = 1';

            // Prepare statement
            $stmtUpdate = $this->conn->prepare($query);

            // Execute query
            if ($stmtUpdate->execute()) {
                // Create query
                $query = 'INSERT INTO ' . $this->table . ' SET item=:item, todoStatu=:todoStatu, sort=:sort, priority=:priority';

                // Prepare statement
                $stmt = $this->conn->prepare($query);

                // Clean data
                $this->item = filter_var($this->item, FILTER_SANITIZE_STRING);
                $this->priority = filter_var($this->priority, FILTER_SANITIZE_STRING);
                $this->sort = filter_var(1, FILTER_SANITIZE_NUMBER_INT);
                $this->todoStatu = filter_var(1, FILTER_SANITIZE_NUMBER_INT);

                // Bind data
                $stmt->bindParam(':item', $this->item);
                $stmt->bindParam(':priority', $this->priority);
                $stmt->bindParam(':sort', $this->sort);
                $stmt->bindParam(':todoStatu', $this->todoStatu);
                if ($stmt->execute()) {
                    return true;
                }
            }

        }


        return false;
    }
    // Update Post
    public function update()
    {
        // Create query
        $query = 'UPDATE ' . $this->table . ' SET priority=:priority, item=:item WHERE id=:id';
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Clean data
        $this->id = filter_var($this->id, FILTER_SANITIZE_NUMBER_INT);
        $this->item = filter_var($this->item, FILTER_SANITIZE_STRING);
        $this->priority = filter_var($this->priority, FILTER_SANITIZE_STRING);

        // Bind data
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':priority', $this->priority);
        $stmt->bindParam(':item', $this->item); // Missing binding for item parameter

        // Execute query
        if ($stmt->execute()) {
            return true; // Return true if execution is successful
        } else {
            return false; // Return false if execution fails
        }
    }


    // Delete Post
    public function delete()
    {
        $query = 'SELECT item FROM ' . $this->table . ' WHERE id = :id';

        // Prepare statement
        $stmtFind = $this->conn->prepare($query);

        // Clean data
        $this->id = filter_var($this->id, FILTER_SANITIZE_NUMBER_INT);
        // Bind data
        $stmtFind->bindParam(':id', $this->id);
        // Execute query
        if ($stmtFind->execute()) {
                $query = 'DELETE FROM ' . $this->table . ' WHERE id = :id';

                // Prepare statement
                $stmt = $this->conn->prepare($query);

                // Clean data
                $this->id = filter_var($this->id, FILTER_SANITIZE_NUMBER_INT);
                // Bind data
                $stmt->bindParam(':id', $this->id);

                // Execute query
                if ($stmt->execute()) {
                    return true;

                }

        }


        return false;
    }

    public function Sort()
    {
        $query = 'UPDATE ' . $this->table . ' SET sort = CASE id WHEN :from THEN  :posFrom
                  WHEN :to THEN :posTo  END  WHERE id in (:from, :to)';
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Clean data
        $this->from = filter_var($this->from, FILTER_SANITIZE_NUMBER_INT);
        $this->to = filter_var($this->to, FILTER_SANITIZE_NUMBER_INT);
        $this->PosFrom = filter_var($this->PosFrom, FILTER_SANITIZE_NUMBER_INT);
        $this->PosTo = filter_var($this->PosTo, FILTER_SANITIZE_NUMBER_INT);
        // Bind data
        $stmt->bindParam(':from', $this->from);
        $stmt->bindParam(':to', $this->to);
        $stmt->bindParam(':posFrom', $this->PosFrom);
        $stmt->bindParam(':posTo', $this->PosTo);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

}
