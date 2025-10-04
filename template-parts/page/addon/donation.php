<?php
/*
 * Addon donation part
 *
 * @package SuitePress
 */
?>
<section class="suitepress-donation-section">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="donation-card">
                    <div class="donation-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </div>
                    <h2 class="donation-title">Support Our Development</h2>
                    <div class="donation-description">
                        <?php
                        // Get custom field for donation description
                        $donation_description = get_post_meta( get_the_ID(), 'donation_description', true );
                        if ( empty( $donation_description ) ) {
                            $donation_description = '<p>These addons are developed with care and dedication to enhance your Fluent Forms experience. Your donation helps us continue creating and maintaining these valuable tools.</p><p>By donating, you gain access to premium addons, priority support, and lifetime updates.</p>';
                        }
                        echo wp_kses_post( wpautop( $donation_description ) );
                        ?>
                    </div>
                    <div class="donation-actions">
                        <?php
                        // Get donation button URL from custom field
                        $donation_url = get_post_meta( get_the_ID(), 'donation_url', true );
                        if ( empty( $donation_url ) ) {
                            $donation_url = '#donate';
                        }
                        ?>
                        <a href="<?php echo esc_url( $donation_url ); ?>" class="btn-donate primary">
                            <span>Donate Now</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </a>
                        <a href="#contact" class="btn-donate secondary">Contact Us</a>
                    </div>
                    <div class="donation-benefits">
                        <div class="benefit-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <span>Lifetime Updates</span>
                        </div>
                        <div class="benefit-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <span>Priority Support</span>
                        </div>
                        <div class="benefit-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <span>All Premium Addons</span>
                        </div>
                        <div class="benefit-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <span>Commercial License</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
