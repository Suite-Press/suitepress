<?php
/**
 * Cover Section for SuitePress
 *
 * @package SuitePress
 */
?>
<section id="suitepress-cover-container">
    <div class="container">
        <div class="suitepress-cover-wrapper">
            <!-- Main Content -->
            <div class="hero-content">
                <div class="hero-badge">
                    <span class="badge-text"> Trust to build your problem solutions </span>
                </div>

                <h1 class="suitepress-cover-title">
                    Elevate Your WordPress Experience with <br>
                    <div class="typing-wrapper">
                        <span class="typing-text" id="typing-text"></span>
                        <span class="typing-cursor">|</span>
                    </div>
                </h1>

                <p class="hero-description">
                    Everything you need to build, grow, and maintain exceptional WordPress sites.
                </p>

                <!-- Enhanced Search -->
                <div class="suitepress-search">
                    <div class="search-container">
                        <?php get_search_form(); ?>
                    </div>
                    <div class="search-suggestions">
                        <span>Popular: </span>
                        <a href="#">WordPress Security</a>
                        <a href="#">Custom Themes</a>
                        <a href="#">Plugin Development</a>
                    </div>
                </div>
            </div>

            <!-- Services Grid -->
            <div class="suitepress-cover-service-wrapper">
                <div class="service-card">
                    <div class="card-icon">
                        <img src="<?php echo SUITEPRESS_DIR_URI.'/assets/src/img/cover/wordpress-tutorial.png' ?>" alt="WordPress Tutorials" loading="lazy">
                    </div>
                    <div class="card-content">
                        <h3>WordPress Tutorials</h3>
                        <p>Master WordPress with comprehensive tutorials</p>
                        <span class="card-count">Coming soon...</span>
                    </div>
                    <div class="card-hover">
                        <a href=""> <span>Explore Tutorials →</span> </a>
                    </div>
                </div>

                <div class="service-card">
                    <div class="card-icon">
                        <img src="<?php echo SUITEPRESS_DIR_URI.'/assets/src/img/cover/wordpress-blog.png' ?>" alt="WordPress Blogs" loading="lazy">
                    </div>
                    <div class="card-content">
                        <h3>Expert Insights</h3>
                        <p>Latest trends and best practices</p>
                        <span class="card-count">Weekly Updates</span>
                    </div>
                    <div class="card-hover">
                        <a href="<?php  ?>"> <span>Read Blogs →</span> </a>
                    </div>
                </div>

                <div class="service-card">
                    <div class="card-icon">
                        <img src="<?php echo SUITEPRESS_DIR_URI.'/assets/src/img/cover/wordpress-plugin.png' ?>" alt="WordPress Plugins" loading="lazy">
                    </div>
                    <div class="card-content">
                        <h3>Premium Plugins</h3>
                        <p>Enhance functionality </p>
                        <span class="card-count">Coming soon...</span>
                    </div>
                    <div class="card-hover">
                        <span>Browse Plugins →</span>
                    </div>
                </div>

                <div class="service-card">
                    <div class="card-icon">
                        <img src="<?php echo SUITEPRESS_DIR_URI.'/assets/src/img/cover/wordpress-plugin.png' ?>" alt="WordPress Themes" loading="lazy">
                    </div>
                    <div class="card-content">
                        <h3>Modern Themes</h3>
                        <p>Responsive, SEO-optimized </p>
                        <span class="card-count">Coming soon...</span>
                    </div>
                    <div class="card-hover">
                        <span>View Themes →</span>
                    </div>
                </div>

                <div class="service-card">
                    <div class="card-icon">
                        <img src="<?php echo SUITEPRESS_DIR_URI.'/assets/src/img/cover/custom-development.png' ?>" alt="Custom Development" loading="lazy">
                    </div>
                    <div class="card-content">
                        <h3>Custom Development</h3>
                        <p>Tailored solutions </p>
                        <span class="card-count">24/7 Support</span>
                    </div>
                    <div class="card-hover">
                        <span>Get Quote →</span>
                    </div>
                </div>

                <div class="service-card">
                    <div class="card-icon">
                        <img src="<?php echo SUITEPRESS_DIR_URI.'/assets/src/img/cover/tech-support.png' ?>" alt="Technical Support" loading="lazy">
                    </div>
                    <div class="card-content">
                        <h3>Expert Support</h3>
                        <p>Technical support </p>
                        <span class="card-count">1hr Response</span>
                    </div>
                    <div class="card-hover">
                        <span>Get Support →</span>
                    </div>
                </div>
            </div>

            <!-- Trust Indicators -->
            <div class="trust-indicators">
                <div class="trust-item">
                    <span class="trust-number">1</span>
                    <span class="trust-label">Developers</span>
                </div>
                <div class="trust-item">
                    <span class="trust-number">1k+</span>
                    <span class="trust-label">Downloads</span>
                </div>
                <div class="trust-item">
                    <span class="trust-number">24/7</span>
                    <span class="trust-label">Support</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Background Elements -->
    <div class="hero-background">
        <div class="bg-shape shape-1"></div>
        <div class="bg-shape shape-2"></div>
        <div class="bg-shape shape-3"></div>
    </div>
</section>
