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
                <div class="hero-badge wave-text">
                    <h4 class="badge-text"> Code. Create. <span>S</span><span>c</span><span>a</span><span>l</span><span>e</span> </h4>
                </div>

                <h1 class="suitepress-cover-title">
                    Where Code Becomes Craft. <br>
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
                        <a href="#">SVN repository</a>
                        <a href="#">Ecommerce Themes</a>
                        <a href="#">Fluent Addons</a>
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
                        <h3>Tech Tutorials</h3>
                        <p>Comprehensive tutorials</p>
                    </div>
                </div>

                <div class="service-card">
                    <div class="card-icon">
                        <img src="<?php echo SUITEPRESS_DIR_URI.'/assets/src/img/cover/wordpress-blog.png' ?>" alt="WordPress Blogs" loading="lazy">
                    </div>
                    <div class="card-content">
                        <h3>Expert Insights</h3>
                        <p>Latest trends and best practices</p>
                    </div>
                </div>

                <div class="service-card">
                    <div class="card-icon">
                        <img src="<?php echo SUITEPRESS_DIR_URI.'/assets/src/img/cover/wordpress-plugin.png' ?>" alt="WordPress Plugins" loading="lazy">
                    </div>
                    <div class="card-content">
                        <h3>Free WP Addons</h3>
                        <p>Enhance functionality </p>
                    </div>
                </div>

                <div class="service-card">
                    <div class="card-icon">
                        <img src="<?php echo SUITEPRESS_DIR_URI.'/assets/src/img/cover/wordpress-plugin.png' ?>" alt="WordPress Themes" loading="lazy">
                    </div>
                    <div class="card-content">
                        <h3>Ecommerce Themes</h3>
                        <p>Responsive, SEO-optimized </p>
                    </div>
                </div>

                <div class="service-card">
                    <div class="card-icon">
                        <img src="<?php echo SUITEPRESS_DIR_URI.'/assets/src/img/cover/custom-development.png' ?>" alt="Custom Development" loading="lazy">
                    </div>
                    <div class="card-content">
                        <h3>Custom Development</h3>
                        <p>Tailored solutions </p>
                    </div>
                </div>

                <div class="service-card">
                    <div class="card-icon">
                        <img src="<?php echo SUITEPRESS_DIR_URI.'/assets/src/img/cover/tech-support.png' ?>" alt="Technical Support" loading="lazy">
                    </div>
                    <div class="card-content">
                        <h3>Free Technical Support</h3>
                        <p>For WordPress Sites</p>
                    </div>
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
