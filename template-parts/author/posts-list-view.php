<?php
/**
 * Author Post Lists View Template
 *
 * @package SuitePress
 */
?>
<div class="search-results-main">
    <?php if (have_posts()) : ?>
        <div class="search-results-list">
            <?php while ( have_posts() ) {
                the_post(); ?>
                <article class="search-result-card">
                    <div class="result-card-content">
                        <div class="result-meta">
                            <div class="author-info">
                                <a href="<?php echo esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ); ?>" class="author-link">
                                    <?php echo get_avatar( get_the_author_meta( 'ID' ), 32 ); ?>
                                    <span class="author-name"><?php the_author(); ?></span>
                                </a>
                            </div>
                            <div class="post-category">
                                <?php
                                $categories = get_the_category();
                                if (!empty($categories)) {
                                    echo '<a href="' . esc_url(get_category_link($categories[0]->term_id)) . '">' . esc_html($categories[0]->name) . '</a>';
                                }
                                ?>
                            </div>
                        </div>

                        <h3 class="result-title">
                            <a href="<?php echo esc_url(get_the_permalink()); ?>">
                                <?php the_title(); ?>
                            </a>
                        </h3>

                        <div class="result-excerpt">
                            <?php suitepress_the_excerpt(80); ?>
                        </div>

                        <div class="result-footer">
                            <div class="post-info">
                                <span class="publish-date"><?php echo get_the_date(); ?></span>
                                <span class="reading-time"><?php sutiepress_reading_time() ?> read</span>
                            </div>
                            <div class="post-actions">
                                <button class="share-trigger" aria-label="Share this article">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="18" cy="5" r="3"></circle>
                                        <circle cx="6" cy="12" r="3"></circle>
                                        <circle cx="18" cy="19" r="3"></circle>
                                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                                    </svg>
                                    Share
                                </button>
                                <div class="share-options" style="display: none;">
                                    <button class="share-btn" data-post-link="<?php echo esc_url(get_the_permalink()); ?>">
                                        Copy Link
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            <?php } ?>
        </div>

        <div class="search-results-pagination">
            <?php suitepress_pagination(); ?>
        </div>
    <?php else : ?>
        <div class="no-results">
            <div class="no-results-content">
                <h3>No results found</h3>
                <p>We couldn't find any content matching your search. Try different keywords or browse our popular categories.</p>
                <a href="/blog" class="cta-button">Browse All Articles</a>
            </div>
        </div>
    <?php endif; ?>
</div>
