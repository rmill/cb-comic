<?php
/**
 * The template for displaying home page.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package cb-comics
 */
?>

<?php get_header(); ?>

<div class="content">
  <div class="content-navigation">
    <h3>
      <a class="first">&lt;&lt;<span class="content-navigation-link">First</span></a>
      <a class="previous">&lt;<span class="content-navigation-link">Previous</span></a>
      <select class="chapter-select"></select>
      <a class="next"><span class="content-navigation-link">Next</span>&gt;</a>
      <a class="last"><span class="content-navigation-link">Latest</span>&gt;&gt;</a>
    </h3>
  </div>

  <div class='comic-page'>
    <img></img>
  </div>

  <div class="content-navigation">
    <h3>
      <a class="first">&lt;&lt;<span class="content-navigation-link">First</span></a>
      <a class="previous">&lt;<span class="content-navigation-link">Previous</span></a>
      <select class="chapter-select"></select>
      <a class="next"><span class="content-navigation-link">Next</span>&gt;</a>
      <a class="last"><span class="content-navigation-link">Latest</span>&gt;&gt;</a>
    </h3>
  </div>
</div>

<audio id="audio"></audio>

<?php get_footer(); ?>
