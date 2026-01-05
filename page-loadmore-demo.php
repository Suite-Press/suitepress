<?php
/**
 * Page template
 *
 * @package SuitePress
 */

use SUITEPRESS_THEME\Inc\Loadmore_Posts;

get_header();

$loadmore_posts = Loadmore_Posts::get_instance();

?>

    <div class="container">
        <h1 class="mt-4 mb-4 text-center"> Scroll to find more posts... </h1>
        <?php $loadmore_posts->post_script_load_more(); ?>
    </div>

<?php get_footer(); ?>
