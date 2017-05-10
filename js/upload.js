window.onload = function () {
    $('.add-page').click(function () {
        // Add the chapter_id to the form
        var chapterId = $(this).closest('table').attr('data-chapter-id');
        $('#addPageModal #chapterId').val(chapterId);
    });

    $('.delete-page').click(function () {
        // Add the page_id to the form
        var pageId = $(this).attr('data-page-id');
        $('#deletePageModal #pageId').val(pageId);
    });
};
