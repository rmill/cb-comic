<?php
/**
 * Template Name: Upload (backend)
 * Description: Uploads an image to a chapter
 */
?>

<?php
include_once 'lib/Chapter.php';
include_once 'lib/Comic.php';
include_once 'lib/Page.php';

// Only logged in users have access to POST and DELETE
if (!current_user_can('upload_files')) {
    return;
}

$requestMethod = $_SERVER['REQUEST_METHOD'];

if ($requestMethod == 'POST') {
	$data = $_POST;
	$resourceType = $data['resource'];

  if ($resourceType == 'delete_page') {
    $page = Page::findById($data['id']);

  	if (!$page) {
  		return;
  	}

  	$page->delete();
  }

	if ($resourceType == 'page') {
		$resource = new Page($data['page_name'], $data['page_number'], $data['chapter_id'], $_FILES['page_image']['name']);

		// Upload the image
		$filePath = $_FILES['page_image']['tmp_name'];
		$newFilePath = ABSPATH . 'wp-content/uploads/live/' . $_FILES['page_image']['name'];

		rename($filePath, $newFilePath);
		chmod($newFilePath, 0644);
	}

	if ($resourceType == 'chapter') {
		$resource = new Chapter($data['chapter_number'], $data['chapter_title']);
	}

  if ($resource) {
  	$resource->save();
  }
}

header("Location: " . $_SERVER['HTTP_REFERER']);
return '';
