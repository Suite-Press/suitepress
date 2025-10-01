<?php
/**
 * Register Post Type
 *
 * @package SuitePress
 */
namespace SUITEPRESS_THEME\Inc;

use SUITEPRESS_THEME\Inc\Traits\Singleton;

class Register_Post_Types{
    use Singleton;
    protected function __construct()
    {
        $this->setup_hook();
    }
    protected function setup_hook(): void {
        /**
         * Actions.
         */
        add_action('init',[$this,'create_movie_cpt']);
    }
    public function create_movie_cpt(){
        $labels = array(
            'name' => _x( 'movies', 'Post Type General Name', 'suitepress' ),
            'singular_name' => _x( 'Movie', 'Post Type Singular Name', 'suitepress' ),
            'menu_name' => _x( 'Movies', 'Admin Menu text', 'suitepress' ),
            'name_admin_bar' => _x( 'Movie', 'Add New on Toolbar', 'suitepress' ),
            'archives' => __( 'Movie Archives', 'suitepress' ),
            'attributes' => __( 'Movie Attributes', 'suitepress' ),
            'parent_item_colon' => __( 'Parent Movie:', 'suitepress' ),
            'all_items' => __( 'All movies', 'suitepress' ),
            'add_new_item' => __( 'Add New Movie', 'suitepress' ),
            'add_new' => __( 'Add New', 'suitepress' ),
            'new_item' => __( 'New Movie', 'suitepress' ),
            'edit_item' => __( 'Edit Movie', 'suitepress' ),
            'update_item' => __( 'Update Movie', 'suitepress' ),
            'view_item' => __( 'View Movie', 'suitepress' ),
            'view_items' => __( 'View movies', 'suitepress' ),
            'search_items' => __( 'Search Movie', 'suitepress' ),
            'not_found' => __( 'Not found', 'suitepress' ),
            'not_found_in_trash' => __( 'Not found in Trash', 'suitepress' ),
            'featured_image' => __( 'Featured Image', 'suitepress' ),
            'set_featured_image' => __( 'Set featured image', 'suitepress' ),
            'remove_featured_image' => __( 'Remove featured image', 'suitepress' ),
            'use_featured_image' => __( 'Use as featured image', 'suitepress' ),
            'insert_into_item' => __( 'Insert into Movie', 'suitepress' ),
            'uploaded_to_this_item' => __( 'Uploaded to this Movie', 'suitepress' ),
            'items_list' => __( 'movies list', 'suitepress' ),
            'items_list_navigation' => __( 'movies list navigation', 'suitepress' ),
            'filter_items_list' => __( 'Filter movies list', 'suitepress' ),
        );
        $args = array(
            'label' => __( 'Movie', 'suitepress' ),
            'description' => __( 'The movies', 'suitepress' ),
            'labels' => $labels,
            'menu_icon' => 'dashicons-admin-collapse',
            'supports' => array('title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'author', 'comments', 'trackbacks', 'page-attributes', 'post-formats', 'custom-fields'),
            'taxonomies' => array(),
            'public' => true,
            'show_ui' => true,
            'show_in_menu' => true,
            'menu_position' => 5,
            'show_in_admin_bar' => true,
            'show_in_nav_menus' => true,
            'can_export' => true,
            'has_archive' => true,
            'hierarchical' => false,
            'exclude_from_search' => false,
            'show_in_rest' => true,
            'publicly_queryable' => true,
            'capability_type' => 'post',
        );
        register_post_type( 'movies', $args );
    }

}