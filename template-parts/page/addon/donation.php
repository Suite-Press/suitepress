<?php
/*
 * Professional Donation/CTA Section
 */
?>
<!-- Enterprise CTA Section -->
<section class="sp-enterprise-section">
    <div class="container">
        <div class="sp-container">
            <div class="sp-enterprise-content">
                <div class="sp-enterprise-text">
                    <h2>Enterprise-Ready Form Solutions</h2>
                    <p>Scale your business with professional Fluent Forms extensions built for agencies, developers, and large-scale implementations.</p>

                    <div class="sp-enterprise-features">
                        <div class="sp-feature-grid">
                            <div class="sp-feature-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                                <div>
                                    <strong>Security First</strong>
                                    <span>Enterprise-grade security protocols</span>
                                </div>
                            </div>
                            <div class="sp-feature-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <div>
                                    <strong>Priority Support</strong>
                                    <span>24/7 technical support</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="sp-enterprise-cta">
                    <div class="sp-cta-card">
                        <h3>Ready to Scale?</h3>
                        <p>Get professional addons with priority support.</p>

                        <div class="sp-cta-buttons">
                            <?php
                            $pricing_url = get_post_meta(get_the_ID(), 'pricing_url', true) ?: '#pricing';
                            $demo_url = get_post_meta(get_the_ID(), 'demo_url', true) ?: '#demo';
                            ?>
                            <a href="<?php echo esc_url($pricing_url); ?>" class="sp-btn sp-btn-primary">
                                View Pricing
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </a>
                            <a href="<?php echo esc_url($demo_url); ?>" class="sp-btn sp-btn-secondary">
                                Schedule Demo
                            </a>
                        </div>

                        <div class="sp-cta-footer">
                            <div class="sp-guarantee">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                                <span>15-day money-back guarantee</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
