<?php
/**
 * Template Name: Contact Page
 *
 * @package SuitePress
 */

get_header();
?>

    <main id="primary" class="site-main">
        <!-- Hero Section -->
        <section class="sp-contact-hero">
            <div class="sp-container">
                <div class="sp-contact-hero-content">
                    <h1 class="sp-contact-title">How can I help you?</h1>
                    <p class="sp-contact-subtitle">Type your question here!</p>
                </div>
            </div>
        </section>

        <!-- Contact Main Section -->
        <section class="sp-contact-main">
            <div class="sp-container">
                <div class="sp-contact-grid">
                    <!-- Contact Form -->
                    <div class="sp-contact-form-section">
                        <div class="sp-form-header">
                            <h2>Send a Message</h2>
                        </div>
                        <?php echo do_shortcode('[fluentform id="4"]') ?>
                        <div class="sp-form-notice">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            We respect your privacy and will never share your information with third parties.
                        </div>
                    </div>

                    <!-- Contact Info -->
                    <div class="sp-contact-info-section">
                        <div class="sp-info-card">
                            <h3>Get in Touch</h3>
                            <p> Let's discuss how we can help you achieve your goals.</p>

                            <div class="sp-contact-methods">
                                <div class="sp-contact-method">
                                    <div class="sp-method-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                            <polyline points="22,6 12,13 2,6"></polyline>
                                        </svg>
                                    </div>
                                    <div class="sp-method-content">
                                        <h4>Email Us</h4>
                                        <p>contact_support@suitepress.com<br>We'll respond within 24 hours</p>
                                    </div>
                                </div>
                            </div>

                            <div class="sp-social-links">
                                <h4>Follow On</h4>
                                <div class="sp-social-grid">
                                    <a href="#" class="sp-social-link" aria-label="LinkedIn">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="sp-faq-card">
                            <h3>Common Questions</h3>
                            Available soon...
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

<?php
get_footer();
