<?php
/**
 * Assets template
 *
 * @package SuitePress
 */

namespace SUITEPRESS_THEME\Inc;

use SUITEPRESS_THEME\Inc\Traits\Singleton;

class Assets{
    use Singleton;

    protected function __construct()
    {
       $this->setup_hooks();
    }
    public function setup_hooks(): void
    {
        /**
        * Filter Hooks
        */


        /**
         * Action Hooks
         */
        add_action('wp_enqueue_scripts',[$this, 'suitepress_register_styles']);
        add_action('wp_enqueue_scripts',[$this, 'suitepress_register_scripts']);

        /**
         * The 'enqueue_block_assets' hook includes styles and scripts both in editor and frontend,
         * except when is_admin() is used to include them conditionally
         */
        add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_editor_assets' ] );
        add_action('enqueue_block_assets', [$this,'both_enqueue_block_assets']);
    }
    public function suitepress_register_styles(): void
    {
        /**
        * register and enqueue styles
        */

        wp_register_style('boostrap-css',SUITEPRESS_DIR_URI. '/assets/src/library/css/bootstrap.min.css', [], false, 'all');
        wp_enqueue_style('boostrap-css');

        wp_register_style( 'main-css', SUITEPRESS_BUILD_CSS_URI . '/main.css', ['boostrap-css'], filemtime( SUITEPRESS_BUILD_CSS_DIR_PATH . '/main.css' ), 'all' );
        wp_enqueue_style('main-css');

        wp_enqueue_style('fonts-css',SUITEPRESS_DIR_URI. '/assets/src/library/fonts/fonts.css', [], false, 'all');

        wp_register_style( 'slick-css', SUITEPRESS_BUILD_LIB_URI . '/css/slick.css', [], false, 'all' );
        wp_register_style( 'slick-theme-css', SUITEPRESS_BUILD_LIB_URI . '/css/slick-theme.css', ['slick-css'], false, 'all' );

        wp_enqueue_style( 'slick-css' );
        wp_enqueue_style( 'slick-theme-css' );

        wp_register_style('sweetalert2-css',SUITEPRESS_BUILD_LIB_URI. '/css/sweetalert2.min.css', [], false, 'all');
        wp_enqueue_style('sweetalert2-css');

        wp_register_style( 'search-css', SUITEPRESS_BUILD_CSS_URI . '/search.css', [], filemtime( SUITEPRESS_BUILD_CSS_DIR_PATH . '/search.css' ), 'all' );

        //search page
        if ( is_page( 'search' ) ) {
            wp_enqueue_style( 'search-css' );
        }
    }
    public function suitepress_register_scripts(): void
    {

        /**
        * register and enqueue scripts
        */
        wp_register_script('main-js', SUITEPRESS_BUILD_JS_URI. '/main.js', ['jquery','slick-js'], fileatime(SUITEPRESS_BUILD_JS_DIR_PATH. '/main.js'), true);
        wp_enqueue_script('main-js');

        wp_register_script('boostrap-js', SUITEPRESS_DIR_URI. '/assets/src/library/js/bootstrap.min.js', ['jquery'], false, true);
        wp_enqueue_script('boostrap-js');

        wp_register_script( 'slick-js', SUITEPRESS_BUILD_LIB_URI . '/js/slick.min.js', ['jquery'], false, true );
        wp_enqueue_script( 'slick-js' );

        wp_register_script( 'sweetalert2-js', SUITEPRESS_BUILD_LIB_URI . '/js/sweetalert2.min.js', ['jquery'], false, true );
        wp_enqueue_script( 'sweetalert2-js' );

        wp_register_script( 'single-js', SUITEPRESS_BUILD_JS_URI . '/single.js', ['jquery', 'slick-js'], filemtime( SUITEPRESS_BUILD_JS_DIR_PATH . '/single.js' ), true );

        wp_register_script( 'search-js', SUITEPRESS_BUILD_JS_URI . '/search.js', ['main-js'], filemtime( SUITEPRESS_BUILD_JS_DIR_PATH . '/search.js' ), true );

        // If search page.
        if( is_page('search') ) {
            $filters_data = get_filters_data();
            wp_enqueue_script( 'search-js' );
            wp_localize_script( 'search-js', 'search_settings',
                [
                    'rest_api_url' => home_url( '/wp-json/suitepress/v1/posts' ),
                    'root_url'     => home_url('search'),
                    'filter_ids'   => get_filter_ids( $filters_data ),
                ]
            );
        }

        // If single post page.
        if ( is_single() ) {
            wp_enqueue_script( 'single-js' );
        }

        wp_register_script( 'author-js', SUITEPRESS_BUILD_JS_URI . '/author.js', ['jquery', 'slick-js'], filemtime( SUITEPRESS_BUILD_JS_DIR_PATH . '/author.js' ), true );
        // If single post page.
        if ( is_author() ) {
            wp_enqueue_script( 'author-js' );
        }

        wp_localize_script( 'main-js', 'siteConfig', [
            'ajaxUrl'    => admin_url( 'admin-ajax.php' ),
            'nonce' => [
                'loadmore_post_nonce' => wp_create_nonce( 'loadmore_post_nonce' ),
                'author_follow_nonce' => wp_create_nonce( 'author_follow_nonce' ),
            ],
        ] );

    }
    public function enqueue_editor_assets(){

        $asset_config_file = sprintf( '%s/assets.php', SUITEPRESS_BUILD_PATH );

        if ( ! file_exists( $asset_config_file ) ) {
            return;
        }

        $asset_config = require_once $asset_config_file;

        if ( empty( $asset_config['js/editor.js'] ) ) {
            return;
        }

        $editor_asset    = $asset_config['js/editor.js'];
        $js_dependencies = ( ! empty( $editor_asset['dependencies'] ) ) ? $editor_asset['dependencies'] : [];
        $version         = ( ! empty( $editor_asset['version'] ) ) ? $editor_asset['version'] : filemtime( $asset_config_file );

        // Theme Gutenberg blocks JS.
        if ( is_admin() ) {
            wp_enqueue_script(
                'suitepress-blocks-js',
                SUITEPRESS_BUILD_JS_URI . '/blocks.js',
                $js_dependencies,
                $version,
                true
            );
        }

        // Theme Gutenberg blocks CSS.
        $css_dependencies = [
            'wp-block-library-theme',
            'wp-block-library',
        ];

        wp_enqueue_style(
            'suitepress-blocks-css',
            SUITEPRESS_BUILD_CSS_URI . '/blocks.css',
            $css_dependencies,
            filemtime( SUITEPRESS_BUILD_CSS_DIR_PATH . '/blocks.css' ),
            'all'
        );
    }
    public function both_enqueue_block_assets(){
        $style_path = SUITEPRESS_BUILD_CSS_DIR_PATH . '/blocks.css';
        $style_uri  = SUITEPRESS_BUILD_CSS_URI . '/blocks.css';

        if ( file_exists( $style_path ) ) {
            wp_enqueue_style(
                'suitepress-blocks-css',
                $style_uri,
                [ 'wp-block-library', 'wp-block-library-theme' ],
                filemtime( $style_path )
            );
        }
    }

}
