<?php
// save_image.php
$data = json_decode(file_get_contents("php://input"));
$filename = $data->flename;
if (!isset($data->url)) {
    http_response_code(400);
    echo "No URL provided.";
    exit;
}

$imageUrl = $data->url;
$imageContents = file_get_contents($imageUrl);

if ($imageContents === false) {
    http_response_code(500);
    echo "Failed to fetch image.";
    exit;
}

// Make sure the images folder exists and is writable
if (!is_dir('images')) {
    mkdir('images', 0777, true);
}

//$filename=$dst.$flename.'.jpg';
if (file_put_contents($filename, $imageContents)) {
    echo $filename;
} else {
    http_response_code(500);
    echo "Failed to save image.";
}
?>
