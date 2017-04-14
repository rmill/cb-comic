<?php
/**
 * Template Name: Api
 */
?>

<?php
include_once 'lib/Comic.php';
$comic = Comic::factory();
echo json_encode($comic->toArray());
?>
