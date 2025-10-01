<?php
/**
 * Register Taxonomies
 *
 * @package SuitePress
 */
namespace SUITEPRESS_THEME\Inc;

use SUITEPRESS_THEME\Inc\Traits\Singleton;

class Register_Taxonomies{
    use Singleton;
    protected function __construct()
    {
        $this->setup_hook();
    }
    protected function setup_hook(): void {
        /**
         * Actions.
         */
        add_action('init',[$this,'create_genre_tax']);
        add_action( 'init', [ $this, 'create_year_taxonomy' ] );
    }
    public function create_genre_tax(){
        $labels = array(
            'name'              => _x( 'Generes', 'taxonomy general name', 'suitepress' ),
            'singular_name'     => _x( 'Genre', 'taxonomy singular name', 'suitepress' ),
            'search_items'      => __( 'Search Generes', 'suitepress' ),
            'all_items'         => __( 'All Generes', 'suitepress' ),
            'parent_item'       => __( 'Parent Genre', 'suitepress' ),
            'parent_item_colon' => __( 'Parent Genre:', 'suitepress' ),
            'edit_item'         => __( 'Edit Genre', 'suitepress' ),
            'update_item'       => __( 'Update Genre', 'suitepress' ),
            'add_new_item'      => __( 'Add New Genre', 'suitepress' ),
            'new_item_name'     => __( 'New Genre Name', 'suitepress' ),
            'menu_name'         => __( 'Genre', 'suitepress' ),
        );
        $args = array(
            'labels' => $labels,
            'description' => __( 'Movies Genre', 'suitepress' ),
            'hierarchical' => true,
            'public' => true,
            'publicly_queryable' => true,
            'show_ui' => true,
            'show_in_menu' => true,
            'show_in_nav_menus' => true,
            'show_tagcloud' => true,
            'show_in_quick_edit' => true,
            'show_admin_column' => true,
            'show_in_rest' => true,
        );
        register_taxonomy( 'genre', ['movies'], $args );
    }
    public function create_year_taxonomy(){
        $labels = [
            'name'              => _x( 'Years', 'taxonomy general name', 'aquila' ),
            'singular_name'     => _x( 'Year', 'taxonomy singular name', 'aquila' ),
            'search_items'      => __( 'Search Years', 'aquila' ),
            'all_items'         => __( 'All Years', 'aquila' ),
            'parent_item'       => __( 'Parent Year', 'aquila' ),
            'parent_item_colon' => __( 'Parent Year:', 'aquila' ),
            'edit_item'         => __( 'Edit Year', 'aquila' ),
            'update_item'       => __( 'Update Year', 'aquila' ),
            'add_new_item'      => __( 'Add New Year', 'aquila' ),
            'new_item_name'     => __( 'New Year Name', 'aquila' ),
            'menu_name'         => __( 'Year', 'aquila' ),
        ];
        $args   = [
            'labels'             => $labels,
            'description'        => __( 'Movie Release Year', 'aquila' ),
            'hierarchical'       => false,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'show_in_nav_menus'  => true,
            'show_tagcloud'      => true,
            'show_in_quick_edit' => true,
            'show_admin_column'  => true,
            'show_in_rest'       => true,
        ];
        register_taxonomy( 'movie-year', [ 'movies' ], $args );
    }

}