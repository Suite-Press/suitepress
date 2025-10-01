<?php
/**
 * Front page template
 *
 * @package SuitePress
 */

get_header();

?>

    <div id="primary">
        <main id="main" class="site-main" role="main">
            <div class="home-page-wrap">

                <?php
                if ( have_posts() ) :
                    while ( have_posts() ) : the_post();
// If want to render the Gutenberg or Elementor to edit the page then, use the Template part
//                        get_template_part( 'template-parts/content', 'page' );

                    endwhile;
                    ?>

                <?php

                else :

// No content shows error
//                    get_template_part( 'template-parts/content-none' );

                endif;

                //Cover Home Page
                get_template_part( 'template-parts/components/cover-section' );

                //Explore Feature Blogs
                get_template_part( 'template-parts/components/latest-posts-static' );

                //Technical Support
                get_template_part( 'template-parts/components/technical-support' );

                //WordPress Tutorial
                get_template_part( 'template-parts/components/wordpress-tutorial' );

                //Course Section
                get_template_part( 'template-parts/components/how-course' );

                //post carousel
//                get_template_part( 'template-parts/components/posts-carousel' );


//                get_template_part( 'template-parts/components/post-card.php' );

                ?>
            </div>
        </main>
    </div>

<?php
get_footer();
