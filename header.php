<?php
/**
 * The Header
 */
?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
<?php wp_head(); ?>

</head>

<body <?php body_class(''); ?>>
<div class="header-banner">
  <a href="/"><h1>Crash and Burn</h1></a>
</div>

<div class="header-links header">
  <h2>
  <a href="/">Read the Comic</a> -
  <a href="<?php echo get_page_link(31); ?>">About</a> -
  <a href="<?php echo get_page_link(20); ?>">Support the Series</a> - 
  <a href="http://cbcomic.bandcamp.com">Soundtrack</a> -
  <a href="<?php echo get_page_link(74); ?>">News</a>
  </h2>
</div>