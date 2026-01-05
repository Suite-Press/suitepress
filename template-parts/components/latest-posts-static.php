<?php
/**
 * Latest Post Static Template
 *
 * @package SuitePress
 */
$args = [
    'posts_per_page'         => 5,
    'post_type'              => 'post',
    'update_post_meta_cache' => false,
    'update_post_term_cache' => false,
];

$post_query = new \WP_Query( $args );
?>

<section id="blog_fr" class="blog-section">
    <div class="container">
        <div class="blog-section-container">
            <!-- Section Header -->
            <div class="section-header">
                <div class="section-badge">
                    <span>Latest Insights</span>
                </div>
                <h2 class="section-title">
                    Explore <span class="text-accent">Featured</span> Blogs
                </h2>
            </div>

            <!-- Blog Grid -->
            <div class="blog-grid">
                <?php if ( $post_query->have_posts() ) : ?>
                    <?php while ( $post_query->have_posts() ) : $post_query->the_post(); ?>
                        <article class="blog-card">
                            <!-- Featured Image -->
                            <div class="blog-card-image">
                                <?php if ( has_post_thumbnail() ) : ?>
                                    <?php
                                    the_post_custom_thumbnail(
                                        get_the_ID(),
                                        'featured-thumbnail',
                                        [
                                            'sizes' => '(max-width: 350px) 350px, 510px',
                                            'class' => 'blog-image',
                                            'loading' => 'lazy'
                                        ]
                                    );
                                    ?>
                                <?php else : ?>
                                    <div class="blog-image-placeholder">
                                        <span class="placeholder-icon">📝</span>
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

                                <!-- Post Date -->
                                <div class="post-date">
                                    <span class="date-day"><?php echo get_the_date('d'); ?></span>
                                    <span class="date-month"><?php echo get_the_date('M'); ?></span>
                                </div>
                            </div>

                            <!-- Card Content -->
                            <div class="blog-card-content">
                                <h3 class="blog-title">
                                    <a href="<?php echo esc_url( get_the_permalink() ); ?>">
                                        <?php the_title(); ?>
                                    </a>
                                </h3>

                                <div class="blog-excerpt">
                                    <?php suitepress_the_excerpt(100); ?>
                                </div>

                                <!-- Post Meta -->
                                <div class="blog-meta">
                                    <div class="author-blog-meta">
                                        <div class="author-avatar">
                                            <?php echo get_avatar( get_the_author_meta('ID'), 32 ); ?>
                                        </div>
                                        <div class="meta-info">
                                            <span class="author-name"><?php the_author(); ?></span>
                                            <span class="post-date"><?php echo get_the_date('M j, Y'); ?></span>
                                        </div>
                                    </div>

                                    <div class="blog-card-actions">
                                        <a href="<?php echo esc_url( get_the_permalink() ); ?>" class="read-more-btn">
                                            <span>Read More</span>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M5 12h14M12 5l7 7-7 7"/>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </article>
                    <?php endwhile; ?>
                <?php else : ?>
                    <div class="no-posts-message">
                        <div class="empty-state">
                            <span class="empty-icon">📝</span>
                            <h3>No Posts Yet</h3>
                            <p>Stay tuned! We're preparing some amazing content for you.</p>
                        </div>
                    </div>
                <?php endif; ?>
                <?php wp_reset_postdata(); ?>
            </div>

            <!-- View All Button -->
            <div class="section-cta">
                <a href="<?php echo esc_url( get_permalink( get_option( 'page_for_posts' ) ) ); ?>" class="view-all-btn">
                    View All Articles
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</section>
