<?php
/**
 * Blog Page Header for SuitePress
 *
 * @package SuitePress
 */
?>
<!-- Page Header -->
<section class="sp-blog-hero">
    <div class="container">
        <div class="sp-container">
            <header class="sp-blog-header">
                <?php if( is_home() && !is_front_page() ) : ?>
                    <h1 class="sp-blog-title"><?php single_post_title(); ?></h1>
                <?php else: ?>
                    <h1 class="sp-blog-title">Our Blog</h1>
                <?php endif; ?>

                <!-- Blog Stats -->
                <div class="sp-blog-stats">
                    <div class="sp-stat-item">
                        <div class="sp-stat-number"><?php echo wp_count_posts()->publish; ?>+</div>
                        <div class="sp-stat-label">Articles Published</div>
                    </div>
                    <div class="sp-stat-item">
                        <div class="sp-stat-number"><?php echo count(get_categories()); ?>+</div>
                        <div class="sp-stat-label">Categories</div>
                    </div>
                    <div class="sp-stat-item">
                        <div class="sp-stat-number">
                            <?php
                            $authors = get_users(array(
                                'has_published_posts' => array('post'), // Only count authors with published posts
                                'fields' => 'ID'
                            ));
                            echo esc_html(count($authors)) . '+';
                            ?>
                        </div>
                        <div class="sp-stat-label">Expert Writers</div>
                    </div>
                </div>

                <!-- Featured Categories -->
                <div class="sp-featured-categories">
                    <span class="sp-categories-label">Popular Topics:</span>
                    <div class="sp-categories-list">
                        <?php
                        $categories = get_categories(array(
                            'number' => 4,
                            'orderby' => 'count',
                            'order' => 'DESC'
                        ));

                        foreach ($categories as $category) {
                            echo '<a href="' . esc_url(get_category_link($category->term_id)) . '" class="sp-category-tag">' . esc_html($category->name) . '</a>';
                        }
                        ?>
                    </div>
                </div>

                <!-- Search Bar -->
                <div class="sp-blog-search">
                    <form role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>" class="sp-search-form">
                        <div class="sp-search-input-group">
                            <svg class="sp-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </svg>
                            <input type="search" placeholder="Search articles, tutorials, guides..." value="<?php echo get_search_query(); ?>" name="s" class="sp-search-input">
                            <button type="submit" class="sp-search-btn">Search</button>
                        </div>
                    </form>
                </div>
            </header>
        </div>
    </div>
</section>
