<?php
/**
 * Template Name: Api
 */
?>

<?php
$comicDir = dirname(__FILE__) . '/../../uploads/live';
$chapterDirs = glob("$comicDir/*" , GLOB_ONLYDIR);
$comic = array('chapters' => array());

foreach($chapterDirs as $chapterDir) {
  $chapter = array();
  $chapterNumber = (int) substr($chapterDir, strrpos($chapterDir, '/') + 1);
  $chapterName = ($chapterNumber == 0) ? 'Prologue' : "Chapter $chapterNumber";

  $pages = array();
  $pageFiles = scandir($chapterDir);

  foreach($pageFiles as $pageFile) {
    if (!in_array($pageFile, array('.', '..'))) {
      $pages[] = $chapterDir . '/' . $pageFile;
    }
  }
 
  $comic['chapters'][] = array(
    'number' => $chapterNumber,
    'name' => $chapterName,
    'pages' => $pages
  );
}

echo json_encode($comic);
?>