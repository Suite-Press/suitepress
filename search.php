<?php
/**
 * Search result page.
 */

get_header();
global $wp_query;

?>
<div id="primary">
    <main id="main" class="site-main" role="main">
        <div class="search-hero-section">
            <div class="container">
                <div class="search-hero-content">
                    <h1 class="search-hero-title"><?php echo $wp_query->found_posts; ?> Results Found</h1>
                    <p class="search-query">For: "<?php the_search_query(); ?>"</p>
                </div>
            </div>
        </div>

        <div class="container search-results-container">
            <div class="search-results-layout">
                <div class="search-results-main">
                    <?php get_template_part( 'template-parts/author/posts-list-view' ); ?>
                </div>

                <div class="search-results-sidebar">
<!--                    <div class="sidebar-widget">-->
<!--                        <h3 class="widget-title">Popular Categories</h3>-->
<!--                        <ul class="category-list">-->
<!--                            --><?php
//                            $categories = get_categories([
//                                'orderby' => 'count',
//                                'order' => 'DESC',
//                                'number' => 10,
//                            ]);
//
//                            foreach ( $categories as $category ) {
//                                echo '<li class="category-item"><a href="' . esc_url( get_category_link( $category->term_id ) ) . '" class="category-link"><span class="category-name">' . esc_html( $category->name ) . '</span><span class="post-count">' . esc_html( $category->count ) . '</span></a></li>';
//                            }
//                            ?>
<!--                        </ul>-->
<!--                    </div>-->

                    <div class="sidebar-widget">
                        <h3 class="widget-title">Need More Help?</h3>
                        <div class="help-cta">
                            <p>Can't find what you're looking for?</p>
                            <a href="/contact" class="cta-button">Contact Our Experts</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>

<?php get_footer(); ?>
