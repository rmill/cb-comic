<?php
/**
 * Template Name: Upload
 * Description: Uploads an image to a chapter
 */

include '/lib/comic.php';
include '/lib/config.php';
?>

<?php get_header(); ?>

<script type="text/javascript" src=<?php echo JAVASCRIPT_PATH . '/jquery-2.1.4.min.js'; ?>></script>
<script type="text/javascript" src=<?php echo JAVASCRIPT_PATH . '/upload.js'; ?>></script>

<?php
$comic = new Comic();
?>

<div>
    <?php
    foreach($comic->getChapters() as $chapter) {
        ?>
        <div>
            <span><?php echo $chapter->getName(); ?></span>
            <div>
                <?php
                foreach ($chapter->getPages() as $page) {
                    ?>
                        <div>
                            <span><?php echo $page->getNumber(); ?></span>
                            <button>delete</button>
                        </div>
                    <?php
                }
                ?>
            </div>
        </div>
        <?php
    }
    ?>
</div>

<?php get_footer(); ?>
