<?php
/**
 * Template Name: Page with Sidebar
 * Template Post Type: page
 *
 * @package SuitePress
 */

get_header();

?>
    <div id="primary">
        <main id="main" class="site-main mt-5" role="main">

            <div class="container suitepress-sidebar-page-container">

                <div class="row">

                    <div class="col-lg-8 col-md-8 col-sm-12">
                        <?php
                        if ( have_posts() ) :

                            while ( have_posts() ) : the_post();

                                get_template_part( 'template-parts/content', 'page' );

                                if ( comments_open() || get_comments_number() ) :
                                    comments_template();
                                endif;

                            endwhile;

                        else :

                            get_template_part( 'template-parts/content-none' );

                        endif;
                        ?>
                    </div> <!-- Column End -->

                    <div class="col-lg-4 col-md-4 col-sm-12">
                        <?php if ( is_active_sidebar( 'page_sidebar' ) ) { ?>
                            <aside>
                                <?php dynamic_sidebar( 'page_sidebar' ); ?>
                            </aside>
                        <?php } ?>
                    </div>

                </div> <!-- Row End -->

            </div> <!-- Container End -->

        </main>
    </div>

<?php

get_footer();
