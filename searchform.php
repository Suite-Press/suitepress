<?php
/**
 * Custom Search Form.
 *
 * @package SuitePress
 */

?>

<form role="search" method="get" class="form-inline search-form-suitepress my-2 my-lg-0" action="<?php echo esc_url( home_url( '/' ) ); ?>">
    <span class="screen-reader-text"><?php echo _x( 'Search for:', 'label', 'suitepress' ); ?></span>
    <input class="form-control mr-sm-2" type="search" placeholder="<?php echo esc_attr_x( 'Search', 'placeholder', 'suitepress' ); ?>" value="<?php the_search_query(); ?>" aria-label="Search" name="s">
    <button class="btn my-2 my-sm-0 suitepress-btn" type="submit"><?php echo esc_attr_x( 'Search', 'submit button', 'suitepress' ); ?></button>
</form>
