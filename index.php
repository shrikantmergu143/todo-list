<?php
// Headers
//http://api.todo.com/
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once 'config/Database.php';
include_once 'models/Todo.php';

// Instantiate DB & connect
$database = new Database();
$db = $database->connect();
$output = array();
// Instantiate task object
$todo = new Todo($db);

// task dataList query
$dataList = $todo->getdataList();
// Get row count
$numdataList = $dataList->rowCount();

// Check if any todos
if ($numdataList > 0) {
    // Task dataList array
    while ($row = $dataList->fetch(PDO::FETCH_ASSOC)) {
        $output['data'][] = $row;
    }
    http_response_code(200);
} else {
    http_response_code(400);
    $output['status'] = 204;
    $output['message'] = 'No Tasks Found';
    $output['data'][] = [];
}
// Turn to JSON & output
echo json_encode($output);
