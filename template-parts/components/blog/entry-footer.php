<?php
/**
 * Template for entry footer.
 *
 * @package SuitePress
 */
?>
<div class="sp-entry-footer">
    <div class="sp-footer-content">
        <?php if ( ! is_single() ) : ?>
            <div class="sp-read-more">
                <a href="<?php echo esc_url( get_permalink() ); ?>" class="sp-read-more-btn">
                    Read More
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </a>
            </div>
        <?php endif; ?>

        <div class="sp-post-meta">
            <span class="sp-reading-time"><?php echo esc_html( suitepress_get_reading_time() ); ?></span>
        </div>
    </div>
</div>
