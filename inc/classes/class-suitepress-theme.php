<?php
/*
 * Boostrap for the theme
 *
 * @package SuitePress
 */

namespace SUITEPRESS_THEME\Inc;

use SUITEPRESS_THEME\Inc\Traits\Singleton;

class SUITEPRESS_THEME{
    use Singleton;

    protected function __construct()
    {
        //load class.
        Assets::get_instance();
        Menus::get_instance();
        Meta_Boxes::get_instance();
        Sidebar::get_instance();
        Blocks::get_instance();
        Block_Patterns::get_instance();
        Profile_Meta::get_instance();
        Loadmore_Posts::get_instance();
        Author_Follow::get_instance();
        Sweetalert2_Notification::get_instance();
        Loadmore_Single::get_instance();
        Register_Post_Types::get_instance();
        Register_Taxonomies::get_instance();
//        Custom_Rest_Api::get_instance();
        Widgets::get_instance();

        $this->setup_hooks();
    }
    protected function setup_hooks(){

        /*
        * Filter Hooks
        */


       /*
        * Action Hooks
        */
        add_action('after_setup_theme',[$this, 'setup_theme']);
    }
    public function setup_theme(){
        /**
         * Let WordPress manage the document title.
         * By adding theme support, we declare that this theme does not use a
         * hard-coded <title> tag in the document head, and expect WordPress to
         * provide it for us.
         */
        add_theme_support('title-tag');

        add_theme_support('custom-logo',[
            'header-text'          => array( 'site-title', 'site-description' ),
            'height'               => 100,
            'width'                => 400,
            'flex-height'          => true,
            'flex-width'           => true,
            'unlink-homepage-logo' => true,
        ]);

        /**
         * Adds Custom background panel to customizer.
         *
         * @see Enable Custom Backgrounds
         * @link https://developer.wordpress.org/themes/functionality/custom-backgrounds/#enable-custom-backgrounds
         */
        add_theme_support( 'custom-background',[
            'default-image'          => '',
            'default-preset'         => 'default', // 'default', 'fill', 'fit', 'repeat', 'custom'
            'default-position-x'     => 'left',    // 'left', 'center', 'right'
            'default-position-y'     => 'top',     // 'top', 'center', 'bottom'
            'default-size'           => 'auto',    // 'auto', 'contain', 'cover'
            'default-repeat'         => 'repeat',  // 'repeat-x', 'repeat-y', 'repeat', 'no-repeat'
            'default-attachment'     => 'scroll',  // 'scroll', 'fixed'
            'default-color'          => 'ffffff',
            'wp-head-callback'       => '_custom_background_cb',
            'admin-head-callback'    => '',
            'admin-preview-callback' => '',
        ] );

        add_theme_support( 'post-formats', array( 'aside', 'gallery','audio','video','standard' ) );

        /**
         * Switch default core markup for search form, comment form, comment-list, gallery, caption, script and style
         * to output valid HTML5.
         */
        add_theme_support( 'post-thumbnails' );
        add_theme_support( 'customize-selective-refresh-widgets' );
        add_theme_support( 'automatic-feed-links' );
        add_theme_support( 'html5',[
            'comment-list',
            'comment-form',
            'search-form',
            'gallery',
            'caption',
            'style',
            'script',
        ] );

        add_theme_support( 'editor-styles' );
        add_editor_style('assets/build/css/editor.css');

        // Remove the core block patterns
        remove_theme_support( 'core-block-patterns' );
        add_editor_style();
        add_theme_support('wp-block-styles');
        add_theme_support('align-wide');

        global $content_width;
        if( !isset( $content_width ) ){
            $content_width = 1240;
        }

        /**
         * Add Image Size
         */
        add_image_size('featured-thumbnail', 350,183, true);

        // Get existing Gutenberg default colors
        $default_colors = [
            [
                'name'  => __('Black', 'suitepress'),
                'slug'  => 'black',
                'color' => '#000000',
            ],
            [
                'name'  => __('White', 'suitepress'),
                'slug'  => 'white',
                'color' => '#ffffff',
            ],
            [
                'name'  => __('Red', 'suitepress'),
                'slug'  => 'red',
                'color' => '#ff0000',
            ],
            [
                'name'  => __('Green', 'suitepress'),
                'slug'  => 'green',
                'color' => '#00ff00',
            ],
            [
                'name'  => __('Blue', 'suitepress'),
                'slug'  => 'blue',
                'color' => '#0000ff',
            ],
        ];

        // Define SuitePress custom colors
        $custom_colors = [
            [
                'name'  => __('SuitePress Primary', 'suitepress'),
                'slug'  => 'suitepress-primary',
                'color' => '#008080',
            ],
            [
                'name'  => __('SuitePress Secondary', 'suitepress'),
                'slug'  => 'suitepress-secondary',
                'color' => '#4C5D73',
            ],
            [
                'name'  => __('SuitePress Text', 'suitepress'),
                'slug'  => 'suitepress-text',
                'color' => '#4C5D73',
            ],
            [
                'name'  => __('SuitePress Primary BG', 'suitepress'),
                'slug'  => 'suitepress-primary-bg',
                'color' => 'rgba(0, 128, 128, 0.02)',
            ],
            [
                'name'  => __('SuitePress BG Color', 'suitepress'),
                'slug'  => 'suitepress-bg-color',
                'color' => '#4C5D73',
            ],
        ];

        // Merge default and custom colors
        $merged_colors = array_merge($default_colors, $custom_colors);

        // Register the final color palette
        add_theme_support('editor-color-palette', $merged_colors);

    }
}
