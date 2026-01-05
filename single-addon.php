<?php
/**
 * Single Addon Template
 *
 * @package SuitePress
 */

get_header();

?>
    <div id="primary" class="content-area single-addon-wrapper">
        <main id="main" class="site-main" role="main">

            <?php
            while (have_posts()) :
                the_post();

                // Get addon image for background
                $addon_image = get_the_post_thumbnail_url(get_the_ID(), 'full');
                if (empty($addon_image)) {
                    $addon_image = get_template_directory_uri() . '/assets/images/placeholder-addon.png';
                }

                // Get addon categories
                $terms = get_the_terms(get_the_ID(), 'addon_category');
                $category_name = '';
                if ($terms && !is_wp_error($terms)) {
                    $category_name = $terms[0]->name;
                }
                ?>

                <!-- HEADER: 3D Animated Title with Blurred Background -->
                <header class="single-addon-hero" style="background-image: url('<?php echo esc_url($addon_image); ?>');">
                    <div class="hero-overlay"></div>
                    <div class="hero-blur-bg" style="background-image: url('<?php echo esc_url($addon_image); ?>');"></div>

                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="hero-content-wrapper">

                                    <!-- Breadcrumb -->
                                    <nav class="addon-breadcrumb" aria-label="breadcrumb">
                                        <a href="<?php echo esc_url(home_url('/')); ?>">Home</a>
                                        <span class="separator">/</span>
                                        <?php
                                        // Get referring page URL
                                        $referer = wp_get_referer();
                                        $addons_link = '';
                                        $addons_text = 'Addons';

                                        // Check if referer exists and is from the same site
                                        if ($referer && strpos($referer, home_url()) === 0) {
                                            // Get the page ID from the referer URL
                                            $referer_id = url_to_postid($referer);

                                            if ($referer_id) {
                                                // Check if it's a page using the addon template
                                                $page_template = get_post_meta($referer_id, '_wp_page_template', true);
                                                if ($page_template === 'page-templates/product-full-width.php' ||
                                                    strpos($page_template, 'addon') !== false) {
                                                    $addons_link = $referer;
                                                    $addons_text = get_the_title($referer_id);
                                                }
                                            }
                                        }

                                        // Fallback to archive or a default addons page
                                        if (empty($addons_link)) {
                                            // Try to find a page using the addon template
                                            $addon_pages = get_pages(array(
                                                'meta_key' => '_wp_page_template',
                                                'meta_value' => 'page-templates/product-full-width.php',
                                                'number' => 1
                                            ));

                                            if (!empty($addon_pages)) {
                                                $addons_link = get_permalink($addon_pages[0]->ID);
                                                $addons_text = $addon_pages[0]->post_title;
                                            } else {
                                                // Ultimate fallback
                                                $addons_link = home_url('/all-wp-addon/');
                                            }
                                        }
                                        ?>
                                        <a href="<?php echo esc_url($addons_link); ?>"><?php echo esc_html($addons_text); ?></a>
                                        <?php if (!empty($category_name)) : ?>
                                            <span class="separator">/</span>
                                            <span class="category"><?php echo esc_html($category_name); ?></span>
                                        <?php endif; ?>
                                        <span class="separator">/</span>
                                        <span class="current"><?php the_title(); ?></span>
                                    </nav>

                                    <!-- 3D Animated Title -->
                                    <h1 class="addon-3d-title" data-text="<?php echo esc_attr(get_the_title()); ?>">
                                        <?php the_title(); ?>
                                    </h1>

                                    <!-- Meta Information -->
                                    <div class="addon-hero-meta">
                                        <?php
                                        // Display categories
                                        if ($terms && !is_wp_error($terms)) {
                                            echo '<div class="addon-categories-hero">';
                                            foreach ($terms as $term) {
                                                echo '<span class="category-badge">' . esc_html($term->name) . '</span>';
                                            }
                                            echo '</div>';
                                        }

                                        // Display version
                                        $version = get_post_meta(get_the_ID(), 'addon_version', true);
                                        if ($version) {
                                            echo '<span class="version-badge">v' . esc_html($version) . '</span>';
                                        }

                                        // Display excerpt if available
                                        if (has_excerpt()) {
                                            echo '<p class="addon-excerpt">' . esc_html(get_the_excerpt()) . '</p>';
                                        }
                                        ?>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Scroll Indicator -->
                    <div class="scroll-indicator">
                        <span class="scroll-text">Scroll Down</span>
                        <div class="scroll-arrow">↓</div>
                    </div>
                </header>

                <!-- BODY: Addon Content -->
                <article id="post-<?php the_ID(); ?>" <?php post_class('single-addon-content'); ?>>
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-10 offset-lg-1">
                                <div class="addon-content-body">
                                    <?php the_content(); ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>

                <!-- FOOTER: Your Custom Design Goes Here -->

            <?php
            endwhile;
            ?>

        </main>
    </div>


<?php

get_footer();
