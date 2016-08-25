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
  <a href="<?php echo get_page_link(178); ?>">Buy the Comic</a> - 
  <a href="https://www.patreon.com/cbcomic">Patreon</a> - 
  <a href="https://cb-comic.com/soundtrack">Soundtrack</a> - 
  <a href="https://redbubble.com/people/cbcomic">CB Store</a>
  </h2>
</div>
