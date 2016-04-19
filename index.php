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
      <a class="first">&lt;&lt;First</a>
      <a class="previous">&lt;Previous</a>
      <select class="chapter-select"></select>
      <a class="next">Next&gt;</a>
      <a class="last">Latest&gt;&gt;</a>
    </h3>
  </div>

  <div class='comic-page'>
    <img />
  </div>

  <div class="content-navigation">
    <h3>
      <a class="first">&lt;&lt;First</a>
      <a class="previous">&lt;Previous</a>
      <select class="chapter-select"></select>
      <a class="next">Next&gt;</a>
      <a class="last">Latest&gt;&gt;</a>
    </h3>
  </div>
</div>

<?php get_footer(); ?>
