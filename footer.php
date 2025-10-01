<?php
/**
 * Footer template
 *
 * @package SuitePress
 */
?>


<footer id="site-footer" class="suitepress-theme-footer">
    <div class="container">
        <div class="row">
            <section class="col-lg-3 col-md-6 col-sm-12">
                <img src="https://suitepress.org/wp-content/uploads/2025/02/footer-logo.png" class="img-fluid"/>
                <div class="social-links">
                    <i class="fa-brands fa-facebook-f"></i>
                    <i class="fa-brands fa-instagram"></i>
                    <i class="fa-brands fa-twitter"></i>
                    <i class="fa-brands fa-linkedin"></i>
                </div>
            </section>
            <section class="col-lg-3 col-md-6 col-sm-12">
                <?php if ( is_active_sidebar( 'footer-widgets-one' ) ) { ?>
                    <aside>
                        <?php dynamic_sidebar( 'footer-widgets-one' ); ?>
                    </aside>
                <?php } ?>
            </section>
            <section class="col-lg-3 col-md-6 col-sm-12">
                <?php if ( is_active_sidebar( 'footer-widgets-two' ) ) { ?>
                    <aside>
                        <?php dynamic_sidebar( 'footer-widgets-two' ); ?>
                    </aside>
                <?php } ?>
            </section>
            <section class="col-lg-3 col-md-6 col-sm-12">
                <?php if ( is_active_sidebar( 'footer-widgets-three' ) ) { ?>
                    <aside>
                        <?php dynamic_sidebar( 'footer-widgets-three' ); ?>
                    </aside>
                <?php } ?>
            </section>
        </div>
    </div>

    <div class="copywrite-section-suitepress">
        <div class="container">
            <div class="row">
                <section class="col-lg-6 col-md-6 col-sm-12">
                   <span>  ©copyright 2023 | SuitePress.org </span>
                </section>
                <section class="col-lg-6 col-md-6 col-sm-12">
                    <?php if ( is_active_sidebar( 'footer_sidebar' ) ) { ?>
                        <aside>
                            <?php dynamic_sidebar( 'footer_sidebar' ); ?>
                        </aside>
                    <?php } ?>
                </section>
            </div>
        </div>
    </div>

</footer>
</div>
</div>
<?php
//get_template_part( 'template-parts/content', 'svgs' );
wp_footer();
?>
</body>
</html>