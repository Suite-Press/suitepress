<?php
/*
 * Addon hero part
 *
 * @package SuitePress
 */
?>
<section class="suitepress-addons-hero">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="hero-content">
                    <h1 class="hero-title shimmer-text">
                        <?php the_title(); ?>
                    </h1>
                    <div class="hero-description">
                        <?php
                        // Get page content
                        $content = get_the_content();

                        if (!empty($content)) {
                            // Clean the content
                            $content = strip_shortcodes($content);
                            $content = wp_strip_all_tags($content);

                            // Get first paragraph
                            $paragraphs = preg_split('/\n\s*\n/', $content);
                            $hero_description = !empty($paragraphs[0]) ? trim($paragraphs[0]) : wp_trim_words($content, 30, '...');
                        } else {
                            // Fallback
                            $hero_description = 'This page lists all Fluent Forms Custom Addons, which users can utilize on their website by donating.';
                        }

                        echo wp_kses_post(wpautop($hero_description));
                        ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
