<?php
/**
 * Post can not be found page template
 *
 * @package SuitePress
 */
?>

<section class="sp-no-results">
    <div class="sp-no-results-container">

        <!-- Visual Element -->
        <div class="sp-no-results-graphic">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
        </div>

        <!-- Header -->
        <header class="sp-no-results-header">
            <h1 class="sp-no-results-title">
                <?php
                if (is_search()) {
                    esc_html_e('No Results Found', 'suitepress');
                } else {
                    esc_html_e('Nothing Found', 'suitepress');
                }
                ?>
            </h1>
            <div class="sp-no-results-subtitle">
                <?php
                if (is_search()) {
                    echo '<span class="sp-search-query">' . get_search_query() . '</span>';
                }
                ?>
            </div>
        </header>

        <!-- Content -->
        <div class="sp-no-results-content">
            <?php
            if (is_home() && current_user_can('publish_posts')) {
                ?>
                <div class="sp-no-results-message">
                    <p class="sp-main-message"><?php esc_html_e('Ready to start your blogging journey?', 'suitepress'); ?></p>
                    <p class="sp-secondary-message">
                        <?php
                        printf(
                            wp_kses(
                                __('Publish your first post and share your thoughts with the world. <a href="%s">Get started here</a>.', 'suitepress'),
                                [
                                    'a' => [
                                        'href' => [],
                                        'class' => []
                                    ]
                                ]
                            ),
                            esc_url(admin_url('post-new.php'))
                        );
                        ?>
                    </p>
                </div>
                <div class="sp-action-buttons">
                    <a href="<?php echo esc_url(admin_url('post-new.php')); ?>" class="sp-btn sp-btn-primary">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        <?php esc_html_e('Create First Post', 'suitepress'); ?>
                    </a>
                </div>
                <?php
            } elseif (is_search()) {
                ?>
                <div class="sp-no-results-message">
                    <p class="sp-main-message"><?php esc_html_e('We couldn\'t find any matches for your search', 'suitepress'); ?></p>
                    <p class="sp-secondary-message"><?php esc_html_e('Try adjusting your search terms or explore our popular content below.', 'suitepress'); ?></p>
                </div>

                <!-- Enhanced Search Form -->
                <div class="sp-search-suggestions">
                    <div class="sp-search-form-enhanced">
                        <?php get_search_form(); ?>
                    </div>
                    <p class="sp-search-tips"><?php esc_html_e('Try: Using different keywords, checking spelling, or more general terms', 'suitepress'); ?></p>
                </div>

                <!-- Popular Categories -->
                <div class="sp-popular-content">
                    <h3 class="sp-popular-title"><?php esc_html_e('Popular Categories', 'suitepress'); ?></h3>
                    <div class="sp-popular-categories">
                        <?php
                        $categories = get_categories(array(
                            'number' => 6,
                            'orderby' => 'count',
                            'order' => 'DESC'
                        ));

                        foreach ($categories as $category) {
                            echo '<a href="' . esc_url(get_category_link($category->term_id)) . '" class="sp-category-pill">' .
                                esc_html($category->name) .
                                '<span class="sp-post-count">' . esc_html($category->count) . '</span>' .
                                '</a>';
                        }
                        ?>
                    </div>
                </div>
                <?php
            } else {
                ?>
                <div class="sp-no-results-message">
                    <p class="sp-main-message"><?php esc_html_e('We can\'t find what you\'re looking for', 'suitepress'); ?></p>
                    <p class="sp-secondary-message"><?php esc_html_e('The page may have been moved, deleted, or doesn\'t exist. Try searching below.', 'suitepress'); ?></p>
                </div>

                <!-- Quick Actions -->
                <div class="sp-quick-actions">
                    <h3 class="sp-actions-title"><?php esc_html_e('Quick Links', 'suitepress'); ?></h3>
                    <div class="sp-action-links">
                        <a href="<?php echo esc_url(home_url('/')); ?>" class="sp-action-link">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                            <?php esc_html_e('Back to Homepage', 'suitepress'); ?>
                        </a>
                        <a href="<?php echo esc_url(get_permalink(get_option('page_for_posts'))); ?>" class="sp-action-link">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                            <?php esc_html_e('Browse All Posts', 'suitepress'); ?>
                        </a>
                    </div>
                </div>
                <?php
            }
            ?>
        </div>

    </div>
</section>
