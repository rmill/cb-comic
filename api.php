<?php
/**
 * Template Name: Api
 */
?>

<?php
  $comic = new Comic();
  echo json_encode($comic->toArray());
?>