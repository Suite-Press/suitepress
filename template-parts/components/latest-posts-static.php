<?php
/**
 * Latest Post Static Template
 *
 * @package SuitePress
 */
$args = [
    'posts_per_page'         => 6,
    'post_type'              => 'post',
    'update_post_meta_cache' => false,
    'update_post_term_cache' => false,
];

$post_query = new \WP_Query( $args );

?>

<section id="blog_fr" class="blog-fr">
    <div class="container">
        <div class="blog-fr-container">

            <div class="sp-home-title">
                Explore <span style="color: #008080">  Featured </span> Blogs?
                <p>
                    Discover top insights! Explore featured blogs for the latest tips,
                    trends, and tutorials.
                </p>
            </div>

            <div class="blog-fr-wrapper">

                <?php
                if ( $post_query->have_posts() ):
                while ( $post_query->have_posts() ) :
                $post_query->the_post();
                ?>

                <div class="blog-fr-card">
                    <div class="blog-fr-img">
                        <?php
                        if ( has_post_thumbnail() ) {
                            the_post_custom_thumbnail(
                                get_the_ID(),
                                'featured-thumbnail',
                                [
                                    'sizes' => '(max-width: 350px) 221px, 233px',
                                    'class' => 'w-100 img-fluid',
                                ]
                            );
                        } else {
                            ?>
                            <img src="https://via.placeholder.com/510x340" class="w-100" alt="Card image cap">
                            <?php
                        }
                        ?>
                    </div>
                    <div class="blog-fr-des">
                        <?php the_title( '<h2 class="post-title">', '</h2>' ); ?>
                       <p> <?php suitepress_the_excerpt(60); ?> </p>
                        <a href="<?php echo esc_url( get_the_permalink() ); ?>" class="">
                            <?php esc_html_e( 'Read More', 'suitepress' ); ?>
                        </a>
                    </div>
                </div>

                <?php
                endwhile;
                else:
                    echo "No posts found, please add a new posts to previews";
                endif;
                wp_reset_postdata(); ?>
            </div>

        </div>
    </div>
</section>
