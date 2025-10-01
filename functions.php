<?php
/*
 * Functions Template
 *
 * @package SuitePress
 */
if ( !defined('SUITEPRESS_DIR_PATH') ){
    define('SUITEPRESS_DIR_PATH',untrailingslashit(get_template_directory()));
}
if ( !defined('SUITEPRESS_DIR_URI') ){
    define('SUITEPRESS_DIR_URI',untrailingslashit(get_template_directory_uri()));
}
if ( !defined('SUITEPRESS_BUILD_DIR_URI') ){
    define('SUITEPRESS_BUILD_DIR_URI',untrailingslashit(get_template_directory_uri() ) . '/assets/build' );
}
if ( ! defined( 'SUITEPRESS_BUILD_PATH' ) ) {
    define( 'SUITEPRESS_BUILD_PATH', untrailingslashit( get_template_directory() ) . '/assets/build' );
}
if ( !defined('SUITEPRESS_BUILD_JS_URI') ){
    define('SUITEPRESS_BUILD_JS_URI',untrailingslashit(get_template_directory_uri() ) . '/assets/build/js' );
}
if ( !defined('SUITEPRESS_BUILD_JS_DIR_PATH') ){
    define('SUITEPRESS_BUILD_JS_DIR_PATH',untrailingslashit(get_template_directory()). '/assets/build/js');
}
if ( !defined('SUITEPRESS_BUILD_IMG_URI') ){
    define('SUITEPRESS_BUILD_IMG_URI',untrailingslashit(get_template_directory_uri() ) . '/assets/build/src/img' );
}
if ( !defined('SUITEPRESS_BUILD_CSS_URI') ){
    define('SUITEPRESS_BUILD_CSS_URI',untrailingslashit(get_template_directory_uri() ) . '/assets/build/css' );
}
if ( !defined('SUITEPRESS_BUILD_CSS_DIR_PATH') ){
    define('SUITEPRESS_BUILD_CSS_DIR_PATH',untrailingslashit(get_template_directory()). '/assets/build/css');
}
if ( ! defined( 'SUITEPRESS_BUILD_LIB_URI' ) ) {
    define( 'SUITEPRESS_BUILD_LIB_URI', untrailingslashit( get_template_directory_uri() ) . '/assets/build/library' );
}

require_once SUITEPRESS_DIR_PATH. '/inc/helpers/autoloader.php';
require_once SUITEPRESS_DIR_PATH. '/inc/helpers/template-tags.php';

function suitepress_theme_instance(): void
{
    \SUITEPRESS_THEME\Inc\SUITEPRESS_THEME::get_instance();
}
suitepress_theme_instance();