<?php
/**
 * Template Name: News
 */
?>

<?php get_header(); ?>

<div class="posts">
  <?php
  $posts = get_posts(array('posts_per_page' => 100, 'offset' => 0));

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
		<?php echo  nl2br($postContent); ?>
	</div>
      </div>
    <?php
  }
  ?>
</div>

<?php get_footer(); ?>