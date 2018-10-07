$(document).ready(() => {

    $('.save-art-btn').on('click', function () {
        event.preventDefault();
        let artId = $(this).parent().parent().attr('data-artId');

        $.ajax({
            type: 'PUT',
            url: `/saved/${artId}`,
        }).done(function (res) {

            if (res === 'OK') {
                window.location.href = "/";
            } else {
                alert('Please try again');
            }
        });

    });

    console.log($('.saved-div').children().length)
    // display a message if the saved page has no saved articles
    if ($('.saved-div').children().length === 0) {
        $('.none-stored').show();
    } else {
        $('.none-stored').hide();
    }

    // Removed a saved article from the database
    $('.remove-saved').on('click', function () {
        event.preventDefault();

        let savedId = $(this).parent().parent().parent().attr('data-savedId');

        $.ajax({
            type: 'PUT',
            url: `/unsaved/${savedId}`,
        }).done(function (res) {
            if (res === 'OK') {
                window.location.href = '/savedArticles';
            } else {
                alert('Bad request, please try again')
            }
        });

    });


    $('.add-note').on('click', function () {
        event.preventDefault();

        // empty object to store the comment and pass to server
        let newComment = {}

        let commentBody = $(this).parent().siblings('.form-group').find('textarea').val();
        let articleId = $(this).closest('.modal').attr('id');

        if (commentBody && articleId) {
            // if there is a comment and article id, then send update request to server and clear the textarea
            newComment.body = commentBody;
            //Clear any text area once a note has been added
            $('.comment-text').val('');

            $.ajax({
                type: 'POST',
                data: newComment,
                url: `/newComment/${articleId}`
            }).done(function (res) {
                if (res === 'Created') {
                    window.location.href = '/savedArticles';
                }
            });
        } else {
            $('.comment-text').addClass('border-danger');
        }
    });

    $('.comment-text').on('click', function () {
        if ($(this).hasClass('border-danger')) {
            $(this).removeClass('border-danger');
        }
    });

    $('.delete-note').on('click', function () {
        event.preventDefault();

        let noteId = $(this).parents().attr('data-noteId');

        $.ajax({
            type: 'DELETE',
            url: `/notes/delete/${noteId}`
        }).done(function (res) {
            if (res === 'Accepted') {
                window.location.href = '/savedArticles';
            } else {
                alert('Could not delete, please try again')
            }
        });
    });
});