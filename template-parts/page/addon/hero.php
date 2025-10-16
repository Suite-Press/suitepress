<?php
/*
 * Professional Addon Hero Section
 *
 * @package SuitePress
 */
?>
<section class="suitepress-addons-hero">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-10 col-xl-8">
                <div class="hero-content text-center">
                    <div class="hero-badge">
                        <span class="badge">Top Priority Addons</span>
                    </div>
                    <h1 class="hero-title">
                        <?php the_title(); ?>
                    </h1>
                    <div class="hero-description">
                        <?php
                        $content = get_the_content();
                        if (!empty($content)) {
                            $content = strip_shortcodes($content);
                            $content = wp_strip_all_tags($content);
                            $paragraphs = preg_split('/\n\s*\n/', $content);
                            $hero_description = !empty($paragraphs[0]) ? trim($paragraphs[0]) : wp_trim_words($content, 30, '...');
                        } else {
                            $hero_description = 'Professional-grade Fluent Forms addons designed to solve complex form requirements and enhance user experience. Built with expertise and maintained with care.';
                        }
                        echo wp_kses_post(wpautop($hero_description));
                        ?>
                    </div>
                    <div class="hero-stats">
                        <div class="stat-item">
                            <div class="stat-number"><?php echo wp_count_posts('addon')->publish; ?>+</div>
                            <div class="stat-label">Premium Addons</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">24/7</div>
                            <div class="stat-label">Priority Support</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">Lifetime</div>
                            <div class="stat-label">Updates Included</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
