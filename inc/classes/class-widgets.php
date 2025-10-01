<?php
/**
 * Register Widgets
 *
 * @package SuitePress
 */
namespace SUITEPRESS_THEME\Inc;

use SUITEPRESS_THEME\Inc\Traits\Singleton;

class Widgets{
    use Singleton;
    public function __construct()
    {
        $this->setup_hook();
    }
    public function setup_hook(): void {
        add_action('widgets_init',[$this, 'suitepress_register_footer_widget']);
    }
    public function suitepress_register_footer_widget() {

        register_sidebar( array(
            'name'          => __( 'Footer Widgets 1', 'suitepress' ),
            'id'            => 'footer-widgets-one',
            'description'   => __( 'Widgets added here will appear in the footer.', 'suitepress' ),
            'before_widget' => '<div class="footer-widget">',
            'after_widget'  => '</div>',
            'before_title'  => '<h4 class="footer-widget-title">',
            'after_title'   => '</h4>',
        ) );

        register_sidebar( array(
            'name'          => __( 'Footer Widgets 2', 'suitepress' ),
            'id'            => 'footer-widgets-two',
            'description'   => __( 'Widgets added here will appear in the footer.', 'suitepress' ),
            'before_widget' => '<div class="footer-widget">',
            'after_widget'  => '</div>',
            'before_title'  => '<h4 class="footer-widget-title">',
            'after_title'   => '</h4>',
        ) );

        register_sidebar( array(
            'name'          => __( 'Footer Widgets 3', 'suitepress' ),
            'id'            => 'footer-widgets-three',
            'description'   => __( 'Widgets added here will appear in the footer.', 'suitepress' ),
            'before_widget' => '<div class="footer-widget">',
            'after_widget'  => '</div>',
            'before_title'  => '<h4 class="footer-widget-title">',
            'after_title'   => '</h4>',
        ) );

    }

}
