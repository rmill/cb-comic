<?php
/**
 * Template Name: Test
 */
?>

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
<link rel="stylesheet" type="text/css" href="<?php bloginfo('template_directory'); ?>/style-test.css" media="screen" />
</head>

<body <?php body_class(''); ?>>

<div class="navigation">
  <button class="navigation-toggle" href="#">&#9776;</button>

  <div class="header-banner">
    <a href="/"><h1>Crash and Burn</h1></a>
  </div>
</div>

<div class="header-links">
  <h2>
  <a href="/">Read the Comic</a><span class="separator"> - </span>
  <a href="<?php echo get_page_link(31); ?>">About</a><span class="separator"> - </span>
  <a href="<?php echo get_page_link(20); ?>">Support the Series</a><span class="separator"> - </span>
  <a href="http://cbcomic.bandcamp.com">Soundtrack</a><span  class="separator"> - </span>
  <a href="<?php echo get_page_link(74); ?>">News</a>
  </h2>
</div>