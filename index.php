<?php
/*
 * Main Template File
 *
 * @package SuitePress
 */
get_header();
?>
    <div id="primary" class="sp-blog-archive">
        <div id="main" class="site-main" role="main">

                <div class="sp-blog-page-container">

                    <!-- Page Header -->
                    <?php get_template_part( 'template-parts/components/blog-page-header' ); ?>

                   <div class="container">
                       <!-- Blog Grid -->
                       <?php suitepress_display_blog_grid(); ?>

                       <!-- Pagination -->
                       <?php suitepress_display_pagination(); ?>
                   </div>

                </div>

        </div>
    </div>

<?php get_footer();
