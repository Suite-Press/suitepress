<?php
/**
 * Template for entry content.
 *
 * @package SuitePress
 */
?>
<div class="sp-entry-content">
    <?php
    if ( is_single() ) {
        the_content(
            sprintf(
                wp_kses(
                    __( 'Continue reading %s <span class="meta-nav">&rarr;</span>', 'suitepress' ),
                    [
                        'span' => [
                            'class' => [],
                        ],
                    ]
                ),
                the_title( '<span class="screen-reader-text">"', '"</span>', false )
            )
        );

        wp_link_pages(
            [
                'before' => '<div class="sp-page-links">' . esc_html__( 'Pages:', 'suitepress' ),
                'after'  => '</div>',
            ]
        );

    } else {
        ?>
        <div class="sp-entry-excerpt">
            <?php suitepress_the_excerpt( 60 ); ?>
        </div>
        <?php
        echo suitepress_excerpt_more();
    }
    ?>
</div>
