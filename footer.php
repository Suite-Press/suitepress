<?php
/**
 * Footer template
 *
 * @package SuitePress
 */
?>

<footer id="site-footer" class="suitepress-theme-footer">

    <!-- First Section: Subscription Card/Popup Style -->
    <section class="footer-subscription-card">
        <div class="container">
            <div class="subscription-card">
                <div class="card-close">
                    <button class="close-btn" aria-label="Close subscription card">
                        <i class="fa-solid fa-times"></i>
                    </button>
                </div>
                <div class="card-content">
                    <div class="card-icon">
                        <i class="fa-regular fa-envelope-open"></i>
                    </div>
                    <div class="card-text">
                        <h3>Stay Ahead with SuitePress Insights</h3>
                        <p>Get exclusive WordPress tips, industry updates, and expert tutorials delivered directly to your inbox. Join our community of 10,000+ developers.</p>
                    </div>
                    <div class="subscription-form">
                        <?php echo do_shortcode('[fluentform id="6"]'); ?>
                    </div>
                    <div class="subscription-benefits">
                        <div class="benefit-item">
                            <i class="fa-solid fa-check"></i>
                            <span>Weekly WordPress Tips</span>
                        </div>
                        <div class="benefit-item">
                            <i class="fa-solid fa-check"></i>
                            <span>Exclusive Tutorials</span>
                        </div>
                        <div class="benefit-item">
                            <i class="fa-solid fa-check"></i>
                            <span>No Spam, Unsubscribe Anytime</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Second Section: Main Footer Content -->
    <section class="footer-main-section">
        <div class="container">
            <div class="footer-content-wrapper">
                <!-- Brand & Description -->
                <div class="footer-brand-column">
                    <div class="footer-logo">
                        <?php
                        if ( function_exists( 'the_custom_logo' ) ) {
                            the_custom_logo();
                        } else {
                            echo '<h3>SuitePress</h3>';
                        }
                        ?>
                    </div>
                    <p class="footer-description">
                        Empowering WordPress developers with premium tutorials, plugins,
                        and expert support since 2023. Building the future of web development, one site at a time.
                    </p>
                    <div class="footer-achievements">
                        <div class="achievement">
                            <span class="achievement-number">500+</span>
                            <span class="achievement-label">Tutorials</span>
                        </div>
                        <div class="achievement">
                            <span class="achievement-number">10K+</span>
                            <span class="achievement-label">Developers</span>
                        </div>
                        <div class="achievement">
                            <span class="achievement-number">24/7</span>
                            <span class="achievement-label">Support</span>
                        </div>
                    </div>
                </div>

                <!-- Widget Columns -->
                <div class="footer-widgets-columns">
                    <div class="footer-widget-column">
                        <h4 class="widget-title">
                            <?php if ( is_active_sidebar( 'footer-widgets-one' ) ) : ?>
                                <aside>
                                    <?php dynamic_sidebar( 'footer-widgets-one' ); ?>
                                </aside>
                            <?php else : ?>
                            </h4>
                            <ul class="footer-menu">
                                <li><a href="/wordpress-tutorials">WordPress Tutorials</a></li>
                                <li><a href="/plugin-development">Plugin Development</a></li>
                                <li><a href="/theme-customization">Theme Customization</a></li>
                                <li><a href="/performance-optimization">Performance Optimization</a></li>
                                <li><a href="/security-best-practices">Security Best Practices</a></li>
                            </ul>
                        <?php endif; ?>
                    </div>

                    <div class="footer-widget-column">
                        <h4 class="widget-title">
                            <?php if ( is_active_sidebar( 'footer-widgets-two' ) ) : ?>
                                <aside>
                                    <?php dynamic_sidebar( 'footer-widgets-two' ); ?>
                                </aside>
                            <?php else : ?>
                        </h4>
                            <ul class="footer-menu">
                                <li><a href="/technical-support">Technical Support</a></li>
                                <li><a href="/custom-development">Custom Development</a></li>
                                <li><a href="/website-audit">Website Audit</a></li>
                                <li><a href="/consultation">Consultation Services</a></li>
                                <li><a href="/maintenance">Maintenance Plans</a></li>
                            </ul>
                        <?php endif; ?>
                    </div>

                    <!-- Let's Talk Column -->
                    <div class="footer-cta-column">
                        <div class="cta-content">
                            <h2 class="lets-talk-heading">Let's Build Something Amazing Together</h2>
                            <div class="cta-actions">
                                <a href="/contact" class="btn-primary">
                                    <i class="fa-regular fa-comment-dots"></i>
                                    Start a Conversation
                                </a>
                                <a href="mailto:hello@suitepress.org" class="btn-secondary">
                                    <i class="fa-regular fa-envelope"></i>
                                    contact_support @suitepress.org
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Third Section: Footer Bottom -->
    <section class="footer-bottom-section">
        <div class="container">
            <div class="footer-bottom-content">
                <!-- Copyright & Links -->
                <div class="footer-bottom-left">
                    <div class="copyright">
                        <span>&copy; <?php echo date('Y'); ?> suitepress.org</span>
                    </div>
                    <nav class="footer-links-menu">
                        <?php if ( is_active_sidebar( 'footer_sidebar' ) ) : ?>
                            <aside>
                                <?php dynamic_sidebar( 'footer_sidebar' ); ?>
                            </aside>
                        <?php else : ?>
                            <ul>
                                <li><a href="/privacy-policy">Privacy Policy</a></li>
                                <li><a href="/terms-of-service">Terms of Service</a></li>
                                <li><a href="/cookie-policy">Cookie Policy</a></li>
                                <li><a href="/sitemap">Sitemap</a></li>
                            </ul>
                        <?php endif; ?>
                    </nav>
                </div>

                <!-- Social Links -->
                <div class="footer-bottom-right">
                    <div class="social-links-wrapper">
                        <div class="social-links">
                            <a href="#" class="social-icon" aria-label="Facebook">
                                <i class="fa-brands fa-facebook-f"></i>
                            </a>
                            <a href="#" class="social-icon" aria-label="Twitter">
                                <i class="fa-brands fa-twitter"></i>
                            </a>
                            <a href="#" class="social-icon" aria-label="Instagram">
                                <i class="fa-brands fa-instagram"></i>
                            </a>
                            <a href="#" class="social-icon" aria-label="LinkedIn">
                                <i class="fa-brands fa-linkedin-in"></i>
                            </a>
                            <a href="#" class="social-icon" aria-label="GitHub">
                                <i class="fa-brands fa-github"></i>
                            </a>
                            <a href="#" class="social-icon" aria-label="YouTube">
                                <i class="fa-brands fa-youtube"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</footer>

<?php wp_footer(); ?>
</body>
</html>
