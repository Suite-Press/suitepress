<?php
/*
 * Enhanced Addon Grid Section
 */
$addon_category = get_query_var('addon_category', '');
?>
<!-- Addons Grid Section -->
<section class="sp-addons-section">
    <div class="container">
        <div class="sp-container">
            <?php
            $addon_category = get_query_var('addon_category', '');
            $args = array(
                'post_type'      => 'addon',
                'posts_per_page' => -1,
                'orderby'        => 'menu_order',
                'order'          => 'ASC',
            );

            if (!empty($addon_category)) {
                $args['tax_query'] = array(
                    array(
                        'taxonomy' => 'addon_category',
                        'field'    => 'slug',
                        'terms'    => $addon_category,
                    ),
                );
            }

            $addons_query = new WP_Query($args);

            if ($addons_query->have_posts()) :

                if (!empty($addon_category)) {
                    $category_obj = get_term_by('slug', $addon_category, 'addon_category');
                    if ($category_obj) {
                        echo '<div class="sp-section-header">';
                        echo '<div class="sp-section-badge">' . esc_html($category_obj->name) . '</div>';
                        if (!empty($category_obj->description)) {
                            echo '<p class="sp-section-description">' . esc_html($category_obj->description) . '</p>';
                        }
                        echo '</div>';
                    }
                }
                ?>

                <div class="sp-addons-grid">
                    <?php while ($addons_query->have_posts()) : $addons_query->the_post();
                        $addon_image = get_the_post_thumbnail_url(get_the_ID(), 'medium');
                        if (empty($addon_image)) {
                            $addon_image = get_template_directory_uri() . '/assets/images/addon-placeholder.jpg';
                        }

                        $addon_description = get_the_excerpt();
                        if (empty($addon_description)) {
                            $addon_description = wp_trim_words(get_the_content(), 20);
                        }

                        $terms = get_the_terms(get_the_ID(), 'addon_category');
                        $category_names = array();
                        if ($terms && !is_wp_error($terms)) {
                            foreach ($terms as $term) {
                                $category_names[] = $term->name;
                            }
                        }

                        $version = get_post_meta(get_the_ID(), 'addon_version', true);
                        $last_updated = get_the_modified_time('M j, Y');
                        $compatibility = get_post_meta(get_the_ID(), 'addon_compatibility', true);
                        ?>

                        <article class="sp-addon-card">
                            <div class="sp-addon-header">
                                <div class="sp-addon-image">
                                    <img src="<?php echo esc_url($addon_image); ?>" alt="<?php the_title_attribute(); ?>">
                                    <div class="sp-addon-overlay">
                                        <a href="<?php echo esc_url(get_permalink()); ?>" class="sp-addon-btn">
                                            View Documentation
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div class="sp-addon-body">
                                <div class="sp-addon-meta">
                                    <?php if (!empty($category_names)) : ?>
                                        <div class="sp-addon-tags">
                                            <?php foreach (array_slice($category_names, 0, 2) as $cat_name) : ?>
                                                <span class="sp-tag"><?php echo esc_html($cat_name); ?></span>
                                            <?php endforeach; ?>
                                            <?php if (count($category_names) > 2) : ?>
                                                <span class="sp-tag">+<?php echo count($category_names) - 2; ?></span>
                                            <?php endif; ?>
                                        </div>
                                    <?php endif; ?>
                                </div>

                                <div class="sp-addon-title-section">
                                    <h3 class="sp-addon-title"><?php the_title(); ?></h3>
                                    <?php if ($version) : ?>
                                        <span class="sp-addon-version">v<?php echo esc_html($version); ?></span>
                                    <?php endif; ?>
                                </div>

                                <p class="sp-addon-description"><?php echo esc_html($addon_description); ?></p>

                                <div class="sp-addon-features">
                                    <?php if ($compatibility) : ?>
                                        <div class="sp-feature">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                            </svg>
                                            Fluent Forms <?php echo esc_html($compatibility); ?>+
                                        </div>
                                    <?php endif; ?>
                                </div>
                            </div>

                            <div class="sp-addon-footer">
                                <a href="<?php echo esc_url(get_permalink()); ?>" class="sp-addon-cta">
                                    Explore Addon
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </a>
                            </div>
                        </article>

                    <?php endwhile; wp_reset_postdata(); ?>
                </div>

                <?php if (!empty($addon_category)) : ?>
                <div class="sp-results-count">
                    <p>Showing <strong><?php echo $addons_query->found_posts; ?></strong> professional addons in <strong><?php echo esc_html($category_obj->name); ?></strong></p>
                </div>
            <?php endif; ?>

            <?php else : ?>
                <div class="sp-no-results">
                    <div class="sp-no-results-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                    </div>
                    <h3>No Addons Available</h3>
                    <p>We're currently curating our professional addons collection. Please check back soon for enterprise-ready solutions.</p>
                    <a href="<?php echo home_url('/contact'); ?>" class="sp-btn sp-btn-primary">Contact Sales</a>
                </div>
            <?php endif; ?>
        </div>
    </div>
</section>
