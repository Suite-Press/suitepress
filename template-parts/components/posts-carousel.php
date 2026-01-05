<?php
/**
 * Post Carousel
 *
 * @package SuitePress
 */
$args = [
    'posts_per_page'         => 12,
    'post_type'              => 'post',
    'update_post_meta_cache' => false,
    'update_post_term_cache' => false,
];

$post_query = new \WP_Query( $args );
?>
<section id="posts_carousel_home" class="featured-posts-carousel">
    <div class="container">
        <div class="carousel-container">

            <!-- Section Header -->
            <div class="section-header">
                <h2 class="section-title">
                    Explore <span class="text-accent">Featured Articles</span>
                </h2>
                <p class="section-description">
                    Discover the latest WordPress tips, tutorials, and industry insights.
                </p>
            </div>

            <!-- Carousel Navigation -->
            <div class="carousel-navigation">
                <button class="nav-btn prev-btn" aria-label="Previous articles">
                    <i class="fa-solid fa-chevron-left"></i>
                </button>
                <div class="carousel-indicators"></div>
                <button class="nav-btn next-btn" aria-label="Next articles">
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
            </div>

            <!-- Posts Carousel -->
            <div class="posts-carousel">
                <?php if ( $post_query->have_posts() ) : ?>
                    <?php while ( $post_query->have_posts() ) : $post_query->the_post(); ?>
                        <article class="post-card">
                            <!-- Featured Image -->
                            <div class="post-card-image">
                                <?php if ( has_post_thumbnail() ) : ?>
                                    <?php
                                    the_post_custom_thumbnail(
                                        get_the_ID(),
                                        'featured-thumbnail',
                                        [
                                            'sizes' => '(max-width: 350px) 350px, 510px',
                                            'class' => 'post-image',
                                            'loading' => 'lazy'
                                        ]
                                    );
                                    ?>
                                <?php else : ?>
                                    <div class="post-image-placeholder">
                                        <i class="fa-regular fa-newspaper"></i>
                                    </div>
                                <?php endif; ?>

                                <!-- Category Badge -->
                                <div class="category-badge">
                                    <?php
                                    $categories = get_the_category();
                                    if ( ! empty( $categories ) ) {
                                        echo esc_html( $categories[0]->name );
                                    }
                                    ?>
                                </div>

                            </div>

                            <!-- Card Content -->
                            <div class="post-card-content">
                                <div class="post-meta">
                                    <span class="post-date"><?php echo get_the_date('M j, Y'); ?></span>
                                    <span class="post-author">By <?php the_author(); ?></span>
                                </div>

                                <h3 class="post-title">
                                    <a href="<?php echo esc_url( get_the_permalink() ); ?>">
                                        <?php the_title(); ?>
                                    </a>
                                </h3>

                                <!-- Card Footer -->
                                <div class="post-card-footer">
                                    <a href="<?php echo esc_url( get_the_permalink() ); ?>" class="read-more-btn">
                                        <span>Read More</span>
                                        <i class="fa-solid fa-arrow-right"></i>
                                    </a>
                                    <div class="post-stats">
                                        <span class="comments">
                                            <i class="fa-regular fa-comment"></i>
                                            <?php echo get_comments_number(); ?>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    <?php endwhile; ?>
                <?php else : ?>
                    <div class="no-posts-message">
                        <div class="empty-state">
                            <i class="fa-regular fa-newspaper"></i>
                            <h3>No Articles Yet</h3>
                            <p>Stay tuned! We're preparing amazing content for you.</p>
                        </div>
                    </div>
                <?php endif; ?>
                <?php wp_reset_postdata(); ?>
            </div>

            <!-- View All CTA -->
            <div class="carousel-cta">
                <a href="<?php echo esc_url( get_permalink( get_option( 'page_for_posts' ) ) ); ?>" class="view-all-btn">
                    <span>View All Articles</span>
                    <i class="fa-solid fa-arrow-right"></i>
                </a>
            </div>

        </div>
    </div>

    <!-- Background Elements -->
    <div class="carousel-background">
        <div class="bg-dot dot-1"></div>
        <div class="bg-dot dot-2"></div>
        <div class="bg-dot dot-3"></div>
    </div>
</section>
