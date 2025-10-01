<?php
/**
 * Register Sidebar
 *
 * @package SuitePress
 */
namespace SUITEPRESS_THEME\Inc;

use SUITEPRESS_THEME\Inc\Traits\Singleton;

class Sidebar{
    use Singleton;
    public function __construct()
    {
        $this->setup_hook();
    }
    public function setup_hook(): void {
        add_action( 'widgets_init', [$this,'suitepress_register_sidebars'] );
        add_action( 'widgets_init', [$this,'suitepress_register_clock_widget'] );
    }
    public function suitepress_register_sidebars()
    {
        register_sidebar(
            [
                'id' => 'main_sidebar',
                'name' => __('Main Sidebar', 'suitepress'),
                'description' => __('SuitePress Main sidebar.', 'suitepress'),
                'before_widget' => '<div id="%1$s" class="widget widget-sidebar %2$s">',
                'after_widget' => '</div>',
                'before_title' => '<h3 class="widget-title">',
                'after_title' => '</h3>',
            ]
        );
        register_sidebar(
            [
                'id' => 'footer_sidebar',
                'name' => __('Footer Sidebar', 'suitepress'),
                'description' => __('SuitePress Footer sidebar.', 'suitepress'),
                'before_widget' => '<div id="%1$s" class="widget widget-sidebar %2$s">',
                'after_widget' => '</div>',
                'before_title' => '<h3 class="widget-title">',
                'after_title' => '</h3>',
            ]
        );
        register_sidebar(
            [
                'id' => 'optional_sidebar',
                'name' => __('Optional Sidebar', 'suitepress'),
                'description' => __('SuitePress Optional sidebar.', 'suitepress'),
                'before_widget' => '<div id="%1$s" class="widget widget-sidebar %2$s">',
                'after_widget' => '</div>',
                'before_title' => '<h3 class="widget-title">',
                'after_title' => '</h3>',
            ]
        );
        register_sidebar(
            [
                'id' => 'suitepress_credit_sidebar',
                'name' => __('SuitePress Credit', 'suitepress'),
                'description' => __('SuitePress Credit sidebar.', 'suitepress'),
                'before_widget' => '<div id="%1$s" class="widget widget-sidebar %2$s">',
                'after_widget' => '</div>',
                'before_title' => '<h3 class="widget-title">',
                'after_title' => '</h3>',
            ]
        );
        register_sidebar(
            [
                'id' => 'single_blog_sidebar',
                'name' => __('Single Blog Sidebar', 'suitepress'),
                'description' => __('Single Blog Sidebar.', 'suitepress'),
                'before_widget' => '<div id="%1$s" class="widget widget-sidebar %2$s">',
                'after_widget' => '</div>',
                'before_title' => '<h3 class="widget-title">',
                'after_title' => '</h3>',
            ]
        );
    }
    public function suitepress_register_clock_widget(){
        register_widget( 'SUITEPRESS_THEME\Inc\Clock_Widget' );
    }

}
