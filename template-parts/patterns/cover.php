<?php
/**
 * Cover Patterns
 *
 * @package SuitePress
 */
?>

<!-- wp:cover {"url":"<?php echo esc_url( SUITEPRESS_BUILD_IMG_URI . '/patterns/cover.jpg' ) ?>","dimRatio":50,"customOverlayColor":"#afa088","isUserOverlayColor":false,"minHeight":700,"isDark":false,"align":"full","layout":{"type":"constrained"}} -->
<div class="wp-block-cover alignfull is-light" style="min-height:700px">
    <span aria-hidden="true" class="wp-block-cover__background has-background-dim" style="background-color:#afa088"></span>
    <img class="wp-block-cover__image-background"
         alt=""
         src="<?php echo esc_url( SUITEPRESS_BUILD_IMG_URI . '/patterns/cover.jpg' ) ?>"
         onerror="this.src='<?php echo esc_url( SUITEPRESS_BUILD_IMG_URI . '/patterns/cover.jpg' ) ?>';"
         data-object-fit="cover"/>
    <div class="wp-block-cover__inner-container">
        <!-- wp:paragraph {"align":"left","placeholder":"Write title…","style":{"elements":{"link":{"color":{"text":"var:preset|color|white"}}}},"textColor":"white","fontSize":"large"} -->
        <p class="has-text-align-left has-white-color has-text-color has-link-color has-large-font-size"><strong>SuitePress Premium WP Theme</strong></p>
        <!-- /wp:paragraph -->

        <!-- wp:paragraph {"style":{"elements":{"link":{"color":{"text":"var:preset|color|white"}}}},"textColor":"white"} -->
        <p class="has-white-color has-text-color has-link-color">
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
        </p>
        <!-- /wp:paragraph -->

        <!-- wp:buttons -->
        <div class="wp-block-buttons">
            <!-- wp:button -->
            <div class="wp-block-button"><a class="wp-block-button__link wp-element-button">Book your spot now</a></div>
            <!-- /wp:button -->
        </div>
        <!-- /wp:buttons -->
    </div>
</div>
<!-- /wp:cover -->
