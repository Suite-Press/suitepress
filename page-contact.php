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
                    <h1 class="sp-contact-title">Start a Conversation</h1>
                    <p class="sp-contact-subtitle">Ready to transform your digital presence?</p>
                    <div class="sp-contact-stats">
                        <div class="sp-contact-stat">
                            <div class="sp-stat-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                            </div>
                            <div class="sp-stat-content">
                                <div class="sp-stat-number">24h</div>
                                <div class="sp-stat-label">Average Response Time</div>
                            </div>
                        </div>
                        <div class="sp-contact-stat">
                            <div class="sp-stat-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                                </svg>
                            </div>
                            <div class="sp-stat-content">
                                <div class="sp-stat-number">100%</div>
                                <div class="sp-stat-label">Client Satisfaction</div>
                            </div>
                        </div>
                    </div>
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
                            <h2>Send us a Message</h2>
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
<!--                                <div class="sp-contact-method">-->
<!--                                    <div class="sp-method-icon">-->
<!--                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">-->
<!--                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>-->
<!--                                            <circle cx="12" cy="10" r="3"></circle>-->
<!--                                        </svg>-->
<!--                                    </div>-->
<!--                                    <div class="sp-method-content">-->
<!--                                        <h4>Visit Our Office</h4>-->
<!--                                        <p>123 Business District<br>Digital City, DC 12345</p>-->
<!--                                    </div>-->
<!--                                </div>-->

<!--                                <div class="sp-contact-method">-->
<!--                                    <div class="sp-method-icon">-->
<!--                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">-->
<!--                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>-->
<!--                                        </svg>-->
<!--                                    </div>-->
<!--                                    <div class="sp-method-content">-->
<!--                                        <h4>Call Us</h4>-->
<!--                                        <p>+1 (555) 123-4567<br>Mon-Fri, 9am-6pm EST</p>-->
<!--                                    </div>-->
<!--                                </div>-->

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

<!--                            <div class="sp-social-links">-->
<!--                                <h4>Follow Us</h4>-->
<!--                                <div class="sp-social-grid">-->
<!--                                    <a href="#" class="sp-social-link" aria-label="LinkedIn">-->
<!--                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">-->
<!--                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>-->
<!--                                        </svg>-->
<!--                                    </a>-->
<!--                                    <a href="#" class="sp-social-link" aria-label="Twitter">-->
<!--                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">-->
<!--                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>-->
<!--                                        </svg>-->
<!--                                    </a>-->
<!--                                    <a href="#" class="sp-social-link" aria-label="GitHub">-->
<!--                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">-->
<!--                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>-->
<!--                                        </svg>-->
<!--                                    </a>-->
<!--                                    <a href="#" class="sp-social-link" aria-label="Dribbble">-->
<!--                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">-->
<!--                                            <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.253-8.89c-.584-3.741-3.342-6.765-7.087-7.507.767 1.458 1.253 3.1 1.253 4.868 0 1.81-.518 3.543-1.458 5.015 2.943-.2 5.675-1.543 7.292-3.376zm-6.005 5.658c1.015-.93 1.768-2.13 2.1-3.48-2.59 1.02-5.643 1.02-8.233 0 .332 1.35 1.085 2.55 2.1 3.48 1.42 1.3 3.29 2.03 5.283 2.03 1.993 0 3.863-.73 5.283-2.03zm-10.5-2.03c.332-1.35 1.085-2.55 2.1-3.48-2.59 1.02-5.643 1.02-8.233 0 .332 1.35 1.085 2.55 2.1 3.48C2.137 18.77 4.007 19.5 6 19.5c1.993 0 3.863-.73 5.283-2.03zm-.767-5.658c-3.745.742-6.503 3.766-7.087 7.507 1.617 1.833 4.349 3.176 7.292 3.376-.94-1.472-1.458-3.205-1.458-5.015 0-1.768.486-3.41 1.253-4.868zM12 4.5c-4.142 0-7.5 3.358-7.5 7.5 0 4.142 3.358 7.5 7.5 7.5 4.142 0 7.5-3.358 7.5-7.5 0-4.142-3.358-7.5-7.5-7.5z"/>-->
<!--                                        </svg>-->
<!--                                    </a>-->
<!--                                </div>-->
<!--                            </div>-->
                        </div>

                        <div class="sp-faq-card">
                            <h3>Common Questions</h3>
                            coming soon...
<!--                            <div class="sp-faq-list">-->
<!--                                <div class="sp-faq-item">-->
<!--                                    <h4>What's your typical project timeline?</h4>-->
<!--                                    <p>Most projects range from 4-12 weeks depending on complexity. We provide detailed timelines during our initial consultation.</p>-->
<!--                                </div>-->
<!--                                <div class="sp-faq-item">-->
<!--                                    <h4>Do you offer ongoing support?</h4>-->
<!--                                    <p>Yes, we provide comprehensive maintenance and support packages to ensure your project continues to perform optimally.</p>-->
<!--                                </div>-->
<!--                                <div class="sp-faq-item">-->
<!--                                    <h4>What industries do you work with?</h4>-->
<!--                                    <p>We've worked with startups, enterprises, and everything in between across various industries including tech, healthcare, and e-commerce.</p>-->
<!--                                </div>-->
<!--                            </div>-->
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

<?php
get_footer();
