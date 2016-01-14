<?php
/**
 * Template Name: Upload
 * Description: Uploads an image to a chapter
 */
?>

<?php

$requestMethod = $_SERVER['REQUEST_METHOD'];

// Get all images and chapters
if ($requestMethod == 'GET') {
	return;
}

$pageNumber = $_POST['page_number'];
$chapterNumber = $_POST['chapter_number'];

$comicDir = dirname(__FILE__) . '/../../uploads/live';

// Add a new image/chapter
if ($requesetMethod == 'POST') {
        $fileExtension = $_FILE['page']['type'];
        $fileContents = file_get_contents($FILE['page']['?']);
        $filePath = "$comicDir/$chapter/$pageNumber.$fileExtenstion";

	file_put_contents($filePath, $fileContents);
}

if ($requestMethod == 'DELETE') {
	$filePath = $_DELETE['file_path'];
	unlink($filePath);
}
?>