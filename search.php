<?php
/**
 * Search result page.
 */

get_header();
global $wp_query;

?>
    <div id="primary">
        <main id="main" class="site-main mt-5" role="main">

            <?php  get_search_form(); ?>

            <div class="container">

                <header class="mb-5 search-result-header">
                    <h1 class="page-title"> <?php echo $wp_query->found_posts; ?>
                        <span> <?php _e( 'Search Results Found For', 'suitepress' ); ?>: </span> "<?php the_search_query(); ?>"
                    </h1>
                </header>

                <div class="row">

                    <?php get_template_part( 'template-parts/author/posts-list-view' ); ?>

                    <div class="col-md-4 col-lg-4 col-sm-12">
                        <div class="most-read-category">
                            <header class="mb-3">
                                <h3 class="category-title"> Most Read Category Posts </h3>
                                <ul>
                                    <?php
                                    $categories = get_categories([
                                        'orderby' => 'count',
                                        'order' => 'DESC',
                                        'number' => 10,
                                    ]);

                                    foreach ( $categories as $category ) {
                                        echo '<li><a href="' . esc_url( get_category_link( $category->term_id ) ) . '">' . esc_html( $category->name ) . '</a></li>';
                                    }
                                    ?>
                                </ul>
                            </header>
                        </div>
                    </div>

                </div>

            </div>
        </main>
    </div>
<?php get_footer(); ?>
