<?php
/**
 * Comment Template
 *
 * @package SuitePress
 */

/*
 * If the current post is protected by a password and the visitor has not yet
 * entered the password we will return early without loading the comments.
 */
if ( post_password_required() ) {
    return;
}

?>

<div id="comments" class="comments-area-suitepress">

    <?php if ( have_comments() ) : ?>
        <h3 class="comments-title-suitepress pb-3">
            <?php
            printf(
                _nx(
                    'One comment on ',
                    'Latest Comments (%1$s)',
                    get_comments_number(),
                    'suitepress'
                ),
                number_format_i18n( get_comments_number() ),
            );
            ?>
        </h3>

        <ul class="comment-list-suitepress">
            <?php
            wp_list_comments( array(
                'style'       => 'ul',
                'short_ping'  => true,
                'avatar_size' => 60,
            ) );
            ?>
        </ul><!-- .comment-list -->

        <?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : ?>
            <nav class="navigation comment-navigation" role="navigation">

                <h1 class="screen-reader-text section-heading"><?php _e( 'Comment navigation', 'suitepress' ); ?></h1>
                <div class="nav-previous"><?php previous_comments_link( __( '&larr; Older Comments', 'suitepress' ) ); ?></div>
                <div class="nav-next"><?php next_comments_link( __( 'Newer Comments &rarr;', 'suitepress' ) ); ?></div>
            </nav><!-- .comment-navigation -->
        <?php endif; // Check for comment navigation ?>

        <?php if ( ! comments_open() && get_comments_number() ) : ?>
            <p class="no-comments"><?php _e( 'Comments are closed.', 'suitepress' ); ?></p>
        <?php endif; ?>

    <?php endif; // have_comments() ?>

    <?php comment_form(); ?>

</div><!-- #comments -->
