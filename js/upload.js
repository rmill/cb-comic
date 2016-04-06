window.onload = function () {
    $('.add-page').click(function() {
        // Add the chapter_id to the form
        var chapterId = $(this).closest('table').attr('data-chapter-id');
        $('#addPageModal #chapterId').val(chapterId);
    });

    $('.delete-page').click(function() {
        // Add the page_id to the form
        var pageId = $(this).attr('data-page-id');
        $('#deletePageModal #pageId').val(pageId);
    });

    $("#deletePageModal .submit").click(function(event) {
        // Do not close the modal
        event.stopPropagation();

        // Disable the button
        $(this).attr('disabled', 'disabled');

        // Send the API request
        var formData = $(this).closest('.modal').find('form').first().serializeArray();

        $.ajax({
            url: '/wp-content/themes/cb-comics/upload.php?' + $.param(formData),
            method: 'DELETE',
            success: function () {
                location.reload();
            },
            failure: function () {
                alert('Error deleting Page');
            }
        });
    });

    $("#addPageModal .submit").click(function(event) {
        // Do not close the modal
        event.stopPropagation();

        // Disable the button
        $(this).attr('disabled', 'disabled');

        // Send the API request
        $(this).closest('.modal').find('form').first().submit();
    });

    $("#addChapterModal .submit").click(function(event) {
        // Do not close the modal
        event.stopPropagation();

        // Disable the button
        $(this).attr('disabled', 'disabled');

        // Send the API request
        var formData = $(this).closest('.modal').find('form').first().serializeArray();

        $.ajax({
            url: '/wp-content/themes/cb-comics/upload.php',
            data: formData,
            method: 'POST',
            success: function () {
                location.reload();
            },
            failure: function () {
                alert('Error adding Chapter');
            }
        });
    });
};