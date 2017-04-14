<?php

/**
 * Template Name: Upload Page
 * Description: Uploads an image to a chapter
 */

?>

<?php get_header(); ?>

<?php
include_once 'lib/Comic.php';
$comic = Comic::factory();
?>

<div class="container">
<div class="row header-row">
	<h1 class="col-md-8">Chapters</h1>
	<div class="col-md-4">
	  <button class="btn" data-toggle="modal" data-target="#addChapterModal">Add chapter</button>
	</div>
</div>
<div class="row">
<?php
foreach ($comic->getChapters() as $chapter) {
?>
<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingOne">
      <h4 class="panel-title">
        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#chapter-<?php echo $chapter->getNumber(); ?>"  aria-expanded="false" aria-controls="chapter-<?php echo $chapter->getNumber(); ?>">
          <?php echo $chapter->getName(); ?>
        </a>
      </h4>
    </div>
    <div id="chapter-<?php echo $chapter->getNumber(); ?>" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
      <div class="panel-body">
        <table class="table table-hover" data-chapter-id=<?php echo $chapter->getId(); ?>>
      	  <tr>
        		<th>Page Number</th>
            <th>Page Name</th>
            <th>Image Name</th>
  		      <th><button class="btn btn-link btn-xs add-page" data-toggle="modal" data-target="#addPageModal">+ Add page</button></th>
      	  </tr>
          <?php
          foreach($chapter->getPages() as $page) {
	  ?>
	  <tr>
		<td><?php echo $page->getNumber(); ?></td>
                <td><?php echo $page->getName(); ?></td>
                <td><?php echo $page->getFileName(); ?> <a target="_blank" href="<?php echo $page->getFilePath(); ?>">view</a></td>
		<td>
			<button class="btn btn-danger btn-xs delete-page" data-page-id=<?php echo $page->getId(); ?> data-toggle="modal" data-target="#deletePageModal">delete</button>
		</td>
	  </tr>
	  <?php
	  }
	  ?>
	</table>
      </div>
    </div>
  </div>
<?php
}
?>

<?php /***** MODALS *****/ ?>

<div class="modal fade" id="addChapterModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Add Chapter</h4>
      </div>
      <div class="modal-body">
        <form>
          <input type="hidden" name='resource' value='chapter'>
          <div class="form-group">
            <input type="text" class="form-control" id="chapterTile" name="chapter_title" placeholder="Title">
          </div>
          <div class="form-group">
            <input type="text" class="form-control" id="chapterNumber" name="chapter_number" placeholder="Chapter number">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary submit">Submit</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="addPageModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Add Page</h4>
      </div>
      <div class="modal-body">
        <form enctype="multipart/form-data" action="/upload-script" method="POST">
          <input type="hidden" name='resource' value='page'>
          <input type="hidden" id="chapterId" name='chapter_id' value=''>
          <div class="form-group">
            <input type="text" class="form-control" id="pageName" name="page_name" placeholder="Name">
          </div>
          <div class="form-group">
            <input type="text" class="form-control" id="pageNumber" name="page_number" placeholder="Page number">
          </div>
          <div class="form-group">
            <label for="imageFile">File input</label>
            <input type="file" name="page_image" id="imageFile">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary submit">Submit</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="deletePageModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Delete Page</h4>
      </div>
      <div class="modal-body">
        Are you sure that you want to delete the page?

        <form enctype="multipart/form-data" action="/wp-content/themes/cb-comics/upload.php" method="DELETE">
          <input type="hidden" name='resource' value='page'>
          <input type="hidden" id="pageId" name='page_id' value=''>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary submit">Submit</button>
      </div>
    </div>
  </div>
</div>
