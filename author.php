<?php
/**
 * Author Archive Page template file.
 *
 * @package SuitePress
 */

get_header();
$author = get_queried_object();

?>
    <div id="primary">
        <main id="main" class="site-main my-5" role="main">

            <?php
            if( have_posts() ) :
            ?>

            <div class="container">

                <?php get_template_part( 'template-parts/author/header' ); ?>

                <div class="row">

                    <?php get_template_part( 'template-parts/author/posts-list-view' ); ?>

                    <?php get_template_part( 'template-parts/author/author-follow-card' ); ?>

                    <?php else: get_search_form(); ?>

                </div>

            </div> <!--Container end-->

            <?php endif; ?>

        </main>
    </div>

<?php

get_footer();
