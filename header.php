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
  <button class="btn header-links-btn mobile-only"><i class="fa fa-bars" aria-hidden="true"></i></button>
  <a href="/"><h1>Crash and Burn</h1></a>
</div>

<div class="header-links header">
  <h2>
    <a href="/">Read the Comic</a><br class="mobile-only"/><span class="header-links-separator"></span>
    <a href="<?php echo get_page_link(31); ?>">About</a><br class="mobile-only"/><span class="header-links-separator"></span>
    <a href="<?php echo get_page_link(178); ?>">Buy the Comic</a><br class="mobile-only"/><span class="header-links-separator"></span>
    <a href="https://www.patreon.com/cbcomic">Patreon</a><br class="mobile-only"/><span class="header-links-separator"></span>
    <a href="http://cb-comic.com/soundtrack">Soundtrack</a><br class="mobile-only"/><span class="header-links-separator"></span>
    <a href="https://redbubble.com/people/cbcomic">CB Store</a>
    <i class="volume fa" aria-hidden="true"></i>
  </h2>
</div>
