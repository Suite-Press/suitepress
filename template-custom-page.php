<?php
/**
 * Template Name: Custom Full Width Page
 * Template Post Type: page
 *
 * @package SuitePress
 */

get_header();

?>
    <div id="primary">
        <main id="main" class="site-main mt-5" role="main">

            <div class="container suitepress-custom-page-container">

                <div class="row">

                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <?php
                        if ( have_posts() ) :

                            while ( have_posts() ) : the_post();

                                get_template_part( 'template-parts/content', 'page' );

                                // If comments are open or we have at least one comment, load up the comment template.
                                if ( comments_open() || get_comments_number() ) :
                                    comments_template();
                                endif;

                            endwhile;

                        else :

                            get_template_part( 'template-parts/content-none' );

                        endif;
                        ?>
                    </div> <!-- Column End -->

                </div> <!-- Row End -->

            </div> <!-- Container End -->

        </main>
    </div>

<?php

get_footer();
