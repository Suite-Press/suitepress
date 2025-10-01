<?php
/**
 * Single post template template.
 *
 * @package SuitePress
 */

get_header();

?>
    <div id="primary">
        <main id="main" class="site-main mt-5" role="main">

            <div class="container suitepress-single-blog-container">

                <div class="row">

                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <?php
                        if ( have_posts() ) :
                            ?>
                            <div class="post-wrap">
                                <?php
                                if ( is_home() && ! is_front_page() ) {
                                    ?>
                                    <header class="mb-5">
                                        <h1 class="page-title screen-reader-text">
                                            <?php single_post_title(); ?>
                                        </h1>
                                    </header>
                                    <?php
                                }

                                while ( have_posts() ) : the_post();

                                    get_template_part( 'template-parts/content' );

                                endwhile;
                                ?>

                            <?php

                            else :

                                get_template_part( 'template-parts/content-none' );

                                ?>

                            </div> <!-- Post Wrap -->
                        <?php
                        endif;

                       //  For Single Post loadmore button, uncomment this code and comment next and prev link code below.
//                        						 echo do_shortcode( '[single_post_listings]' )
                        ?>
                    </div> <!-- Column End -->
                    <?php
                    // Next and previous link for page navigation.
                    ?>

                </div> <!-- Row End -->

                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <div class="suitepress-prev-next">
                            <div class="prev-link"><?php previous_post_link(); ?></div>
                            <div class="next-link"><?php next_post_link(); ?></div>
                        </div>
                    </div>
                </div>

                <div class="row">

                    <div class="col-lg-8 col-md-6 col-sm-12">
                        <?php comments_template(); ?>
                    </div>

                    <div class="col-lg-4 col-md-6 col-sm-12">

                        <div class="recent-posts-blocks-suitepress">
                            <?php if ( is_active_sidebar( 'single_blog_sidebar' ) ) { ?>
                                <aside>
                                    <?php dynamic_sidebar( 'single_blog_sidebar' ); ?>
                                </aside>
                            <?php } ?>
                        </div>

                    </div>
                </div>

            </div> <!-- Container End -->

        </main>
    </div>

<?php

get_footer();
