<?php
$json = file_get_contents("php://input");
$file = fopen('./data/contact.json','w+');
fwrite($file, $json);
fclose($file);
