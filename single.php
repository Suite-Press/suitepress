<?php
/**
 * Single post template template.
 *
 * @package SuitePress
 */

get_header();

?>
    <div id="primary" class="sp-blog-single">
        <main id="main" class="site-main" role="main">
            <div class="container">
                <div class="sp-blog-container">

                    <!-- Main Content Area -->
                    <div class="sp-blog-main">
                        <?php if ( have_posts() ) : ?>
                            <div class="sp-posts-wrap">
                                <?php while ( have_posts() ) : the_post(); ?>
                                    <?php get_template_part( 'template-parts/content-single' ); ?>
                                <?php endwhile; ?>
                            </div>

                            <!-- Navigation -->
                            <div class="sp-article-navigation">
                                <div class="sp-nav-links">
                                    <div class="sp-prev-link"><?php previous_post_link('%link', 'Previous Post'); ?></div>
                                    <div class="sp-next-link"><?php next_post_link('%link', 'Next Post'); ?></div>
                                </div>
                            </div>

                        <?php else : ?>
                            <?php get_template_part( 'template-parts/content-none' ); ?>
                        <?php endif; ?>
                    </div>

                    <!-- Comments & Sidebar Section -->
                    <div class="sp-blog-sidebar">
                        <div class="sp-sidebar-widgets">
                            <?php if ( is_active_sidebar( 'single_blog_sidebar' ) ) : ?>
                                <aside class="sp-blog-sidebar-inner">
                                    <?php dynamic_sidebar( 'single_blog_sidebar' ); ?>
                                </aside>
                            <?php endif; ?>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    </div>

<?php get_footer(); ?>
