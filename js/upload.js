window.onload = function () {
    jQuery('.add-page').click(function() {
        // Add the chapter_id to the form
        var chapterId = jQuery(this).closest('table').attr('data-chapter-id');
        jQuery('#addPageModal #chapterId').val(chapterId);
    });

    jQuery('.delete-page').click(function() {
        // Add the page_id to the form
        var pageId = jQuery(this).attr('data-page-id');
        jQuery('#deletePageModal #pageId').val(pageId);
    });

    jQuery("#deletePageModal .submit").click(function(event) {
        // Do not close the modal
        event.stopPropagation();

        // Disable the button
        jQuery(this).attr('disabled', 'disabled');

        // Send the API request
        var formData = jQuery(this).closest('.modal').find('form').first().serializeArray();

        jQuery.ajax({
            url: '/upload-script?' + jQuery.param(formData),
            method: 'DELETE',
            success: function () {
                location.reload();
            },
            failure: function () {
                alert('Error deleting Page');
            }
        });
    });

    jQuery("#addPageModal .submit").click(function(event) {
        // Do not close the modal
        event.stopPropagation();

        // Disable the button
        jQuery(this).attr('disabled', 'disabled');

        // Send the API request
        jQuery(this).closest('.modal').find('form').first().submit();
    });

    jQuery("#addChapterModal .submit").click(function(event) {
        // Do not close the modal
        event.stopPropagation();

        // Disable the button
        jQuery(this).attr('disabled', 'disabled');

        // Send the API request
        var formData = jQuery(this).closest('.modal').find('form').first().serializeArray();

        jQuery.ajax({
            url: '/upload-script',
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
