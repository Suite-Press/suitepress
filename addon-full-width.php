<?php
/**
 * Template Name: Addons by Category
 * Template Post Type: page
 *
 * @package SuitePress
 */

get_header();

?>
    <div id="primary">
        <main id="main" class="site-main" role="main">

            <?php
            if ( have_posts() ) :
                while ( have_posts() ) : the_post();

                    $selected_category = get_post_meta( get_the_ID(), '_addon_category', true );
                    // Pass category to template parts
                    set_query_var( 'addon_category', $selected_category );
                    ?>
                    <!-- Hero Header Section with Shimmer Effect -->
                    <?php get_template_part( 'template-parts/page/addon/hero' ); ?>

                    <!-- Addons Grid Section -->
                    <?php get_template_part( 'template-parts/page/addon/grid' ); ?>

                    <!-- Donation Section -->
                    <?php get_template_part( 'template-parts/page/addon/donation' ); ?>

                <?php
                endwhile;
            endif;
            ?>

        </main>
    </div>

<?php

get_footer();
