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

<script type="text/javascript" src="http://cb-comic.com/wp-content/themes/cb-comics/js/jquery-2.1.4.min.js"></script>
<script type="text/javascript" src="http://cb-comic.com/wp-content/themes/cb-comics/js/content-navigation-1.1.js"></script>

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

<div class="posts">
  <h2 class="header">News + Updates</h2>

  <?php
  $posts = get_posts(array('posts_per_page' => 2, 'offset' => 0));

  foreach($posts as $post) {
    $postDate = new DateTime($post->post_date);
    $postHeader = $postDate->format('d M Y');
    $postContent = $post->post_content;
    $postTitle = $post->post_title;
    ?>
      <div class="post">
        <h2><?php echo $postHeader; ?></h2>
        <div class="post-text">
		<h2><?php echo $postTitle; ?></h2>
		<br>
		<?php echo nl2br($postContent); ?>
	</div>
      </div>
    <?php
  }
  ?>
</div>

<?php get_footer(); ?>