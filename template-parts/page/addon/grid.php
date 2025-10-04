<?php
/*
 * Addon grid part
 *
 * @package SuitePress
 */

// Get the selected category from the page template
$addon_category = get_query_var('addon_category', '');

?>
<section class="suitepress-addons-grid">
    <div class="container">

        <?php
        // Build query arguments
        $args = array(
            'post_type'      => 'addon',
            'posts_per_page' => -1,
            'orderby'        => 'menu_order',
            'order'          => 'ASC',
        );

        // Add taxonomy query if a category is selected
        if (!empty($addon_category)) {
            $args['tax_query'] = array(
                array(
                    'taxonomy' => 'addon_category',
                    'field'    => 'slug',
                    'terms'    => $addon_category,
                ),
            );
        }

        // Execute the query
        $addons_query = new WP_Query($args);

        if ($addons_query->have_posts()) :

            // Optional: Display the category name if filtered
            if (!empty($addon_category)) {
                $category_obj = get_term_by('slug', $addon_category, 'addon_category');
                if ($category_obj) {
                    echo '<div class="category-header">';
                    echo '<h2 class="category-title">' . esc_html($category_obj->name) . '</h2>';
                    if (!empty($category_obj->description)) {
                        echo '<p class="category-description">' . esc_html($category_obj->description) . '</p>';
                    }
                    echo '</div>';
                }
            }
            ?>

            <div class="row addons-row">
                <?php
                while ($addons_query->have_posts()) : $addons_query->the_post();

                    // Get addon details
                    $addon_image = get_the_post_thumbnail_url(get_the_ID(), 'medium');
                    if (empty($addon_image)) {
                        $addon_image = get_template_directory_uri() . '/assets/images/placeholder-addon.png';
                    }

                    $addon_description = get_the_excerpt();
                    if (empty($addon_description)) {
                        $addon_description = get_the_content();
                    }

                    // Get addon categories for this post
                    $terms = get_the_terms(get_the_ID(), 'addon_category');
                    $category_names = array();
                    if ($terms && !is_wp_error($terms)) {
                        foreach ($terms as $term) {
                            $category_names[] = $term->name;
                        }
                    }
                    ?>

                    <div class="col-lg-4 col-md-6 col-sm-12 addon-column">
                        <a href="<?php echo esc_url(get_permalink()); ?>" class="addon-card-link">
                            <div class="addon-card">
                                <div class="addon-image-wrapper">
                                    <img src="<?php echo esc_url($addon_image); ?>"
                                         alt="<?php the_title_attribute(); ?>"
                                         class="addon-image">
                                    <div class="addon-overlay">
                                        <?php if (!empty($category_names)) : ?>
                                            <span class="addon-badge"><?php echo esc_html($category_names[0]); ?></span>
                                        <?php else : ?>
                                            <span class="addon-badge">Premium Addon</span>
                                        <?php endif; ?>
                                    </div>
                                </div>
                                <div class="addon-content">
                                    <h3 class="addon-title"><?php the_title(); ?></h3>
                                    <div class="addon-description">
                                        <?php echo wp_kses_post(wpautop(wp_trim_words($addon_description, 30))); ?>
                                    </div>
                                    <div class="addon-meta">
                                        <?php
                                        // Display addon version if available
                                        $version = get_post_meta(get_the_ID(), 'addon_version', true);
                                        if ($version) {
                                            echo '<span class="addon-version">Version: ' . esc_html($version) . '</span>';
                                        }

                                        // Display all categories as tags
                                        if (!empty($category_names)) {
                                            echo '<div class="addon-categories">';
                                            foreach ($category_names as $cat_name) {
                                                echo '<span class="addon-category-tag">' . esc_html($cat_name) . '</span>';
                                            }
                                            echo '</div>';
                                        }
                                        ?>
                                    </div>
                                    <div class="addon-card-footer">
                                        <span class="view-details">View Details →</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>

                <?php
                endwhile;
                wp_reset_postdata();
                ?>
            </div>

            <?php
            // Display post count info
            $total_posts = $addons_query->found_posts;
            if (!empty($addon_category)) {
                echo '<div class="addons-count">';
                echo '<p>Showing ' . esc_html($total_posts) . ' addon(s) in this category</p>';
                echo '</div>';
            }
            ?>

        <?php
        else :
            // No addons found - display message
            ?>
            <div class="row">
                <div class="col-lg-12">
                    <div class="no-addons-found">
                        <?php if (!empty($addon_category)) : ?>
                            <p>No addons found in the selected category.</p>
                        <?php else : ?>
                            <p>No addons available at the moment.</p>
                        <?php endif; ?>

                        <?php
                        // Fallback: Display page content if available
                        if (have_posts()) {
                            while (have_posts()) {
                                the_post();
                                if (get_the_content()) {
                                    echo '<div class="page-content">';
                                    the_content();
                                    echo '</div>';
                                }
                            }
                        }
                        ?>
                    </div>
                </div>
            </div>
        <?php
        endif;
        ?>

    </div>
</section>
