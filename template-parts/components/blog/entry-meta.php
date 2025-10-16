<?php
/**
 * Entry Meta template
 *
 * @package SuitePress
 */
?>
<div class="sp-entry-meta">
    <div class="sp-meta-items">
        <?php suitepress_posted_on(); ?>
        <span class="sp-meta-separator">•</span>
        <?php suitepress_posted_by(); ?>
        <span class="sp-meta-separator">•</span>
        <span class="sp-reading-time"><?php echo esc_html( suitepress_get_reading_time() ); ?></span>
    </div>
</div>
