<?php
/**
 * Post Type Register
 *
 * @package SuitePress
 */
namespace SUITEPRESS_THEME\Inc;

use SUITEPRESS_THEME\Inc\Traits\Singleton;

class Post_Type_Register{
    use Singleton;
    public function __construct()
    {
        $this->setup_hook();
    }
    public function setup_hook(): void {
        add_action('init',[$this, 'suitepress_register_addon_post_type']);
        add_action( 'init', [$this, 'suitepress_register_addon_taxonomy'], 0 );
//        add_filter( 'manage_addon_posts_columns', [$this,'suitepress_addon_custom_columns'] );
//        add_action( 'manage_addon_posts_custom_column', [$this,'suitepress_addon_custom_column_content'], 10, 2 );
//        add_filter( 'manage_edit-addon_sortable_columns', [$this,'suitepress_addon_sortable_columns'] );
//        add_action( 'restrict_manage_posts', [$this,'suitepress_addon_category_filter'] );
        add_action('add_meta_boxes', [$this, 'suitepress_add_category_meta_box']);
        add_action('save_post', [$this, 'suitepress_save_category_meta_box']);

        // Flush rewrite rules on theme activation
        add_action('after_switch_theme', [$this, 'suitepress_flush_rewrites']);
    }
    public function suitepress_register_addon_post_type()
    {
        $labels = array(
            'name' => 'Addons',
            'singular_name' => 'Addon',
            'add_new' => 'Add New Addon',
            'add_new_item' => 'Add New Addon',
            'edit_item' => 'Edit Addon',
            'new_item' => 'New Addon',
            'view_item' => 'View Addon',
            'search_items' => 'Search Addons',
            'not_found' => 'No addons found',
            'not_found_in_trash' => 'No addons found in Trash',
        );

        $args = array(
            'labels' => $labels,
            'public' => true,
            'has_archive' => false,
            'publicly_queryable' => true,
            'show_ui' => true,
            'show_in_menu' => true,
            'show_in_rest' => true, // THIS ENABLES GUTENBERG
            'query_var' => true,
            'rewrite' => array('slug' => 'addon'),
            'capability_type' => 'post',
            'hierarchical' => false,
            'menu_position' => 5,
            'menu_icon' => 'dashicons-admin-plugins',
            'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
        );

        register_post_type('addon', $args);
    }
    public function suitepress_register_addon_taxonomy(): void
    {
        // Addon Categories
        $category_labels = array(
            'name'                       => 'Addon Categories',
            'singular_name'              => 'Addon Category',
            'menu_name'                  => 'Categories',
            'all_items'                  => 'All Categories',
            'parent_item'                => 'Parent Category',
            'parent_item_colon'          => 'Parent Category:',
            'new_item_name'              => 'New Category Name',
            'add_new_item'               => 'Add New Category',
            'edit_item'                  => 'Edit Category',
            'update_item'                => 'Update Category',
            'view_item'                  => 'View Category',
            'separate_items_with_commas' => 'Separate categories with commas',
            'add_or_remove_items'        => 'Add or remove categories',
            'choose_from_most_used'      => 'Choose from the most used',
            'popular_items'              => 'Popular Categories',
            'search_items'               => 'Search Categories',
            'not_found'                  => 'Not Found',
            'no_terms'                   => 'No categories',
            'items_list'                 => 'Categories list',
            'items_list_navigation'      => 'Categories list navigation',
        );

        $category_args = array(
            'labels'                     => $category_labels,
            'hierarchical'               => true, // Like categories (true) or tags (false)
            'public'                     => true,
            'show_ui'                    => true,
            'show_admin_column'          => true, // Show in admin columns
            'show_in_nav_menus'          => true,
            'show_tagcloud'              => true,
            'show_in_rest'               => true, // For Gutenberg editor
            'rewrite'                    => array( 'slug' => 'addon-category' ),
        );

        register_taxonomy( 'addon_category', array( 'addon' ), $category_args );

        // Addon Tags (Optional - uncomment if you want tags too)
        /*
        $tag_labels = array(
            'name'                       => 'Addon Tags',
            'singular_name'              => 'Addon Tag',
            'menu_name'                  => 'Tags',
            'all_items'                  => 'All Tags',
            'parent_item'                => null,
            'parent_item_colon'          => null,
            'new_item_name'              => 'New Tag Name',
            'add_new_item'               => 'Add New Tag',
            'edit_item'                  => 'Edit Tag',
            'update_item'                => 'Update Tag',
            'view_item'                  => 'View Tag',
            'separate_items_with_commas' => 'Separate tags with commas',
            'add_or_remove_items'        => 'Add or remove tags',
            'choose_from_most_used'      => 'Choose from the most used',
            'popular_items'              => 'Popular Tags',
            'search_items'               => 'Search Tags',
            'not_found'                  => 'Not Found',
            'no_terms'                   => 'No tags',
            'items_list'                 => 'Tags list',
            'items_list_navigation'      => 'Tags list navigation',
        );

        $tag_args = array(
            'labels'                     => $tag_labels,
            'hierarchical'               => false,
            'public'                     => true,
            'show_ui'                    => true,
            'show_admin_column'          => true,
            'show_in_nav_menus'          => true,
            'show_tagcloud'              => true,
            'show_in_rest'               => true,
            'rewrite'                    => array( 'slug' => 'addon-tag' ),
        );

        register_taxonomy( 'addon_tag', array( 'addon' ), $tag_args );
        */
    }
//    public function suitepress_addon_custom_columns($columns){
//        $new_columns = array();
//
//        foreach ( $columns as $key => $value ) {
//            $new_columns[ $key ] = $value;
//
//            // Add category column after title
//            if ( $key === 'title' ) {
//                $new_columns['addon_categories'] = 'Categories';
//            }
//        }
//        return $new_columns;
//    }
//    public function suitepress_addon_custom_column_content($column, $post_id){
//        if ( $column === 'addon_categories' ) {
//            $terms = get_the_terms( $post_id, 'addon_category' );
//
//            if ( ! empty( $terms ) && ! is_wp_error( $terms ) ) {
//                $term_names = array();
//                foreach ( $terms as $term ) {
//                    $term_names[] = esc_html( $term->name );
//                }
//                echo implode( ', ', $term_names );
//            } else {
//                echo '—';
//            }
//        }
//    }
//    public function suitepress_addon_sortable_columns($columns){
//        $columns['addon_categories'] = 'addon_category';
//        return $columns;
//    }
//    public function suitepress_addon_category_filter(){
//        global $typenow;
//
//        if ( $typenow === 'addon' ) {
//            $taxonomy = 'addon_category';
//            $selected = isset( $_GET[ $taxonomy ] ) ? $_GET[ $taxonomy ] : '';
//
//            $info_taxonomy = get_taxonomy( $taxonomy );
//
//            wp_dropdown_categories( array(
//                'show_option_all' => sprintf( __( 'All %s', 'suitepress' ), $info_taxonomy->label ),
//                'taxonomy'        => $taxonomy,
//                'name'            => $taxonomy,
//                'orderby'         => 'name',
//                'selected'        => $selected,
//                'show_count'      => true,
//                'hide_empty'      => true,
//                'value_field'     => 'slug',
//                'hierarchical'    => true,
//            ) );
//        }
//    }
    public function suitepress_add_category_meta_box(): void
    {
        add_meta_box(
            'addon_category_select',
            'Select Addon Category to Display',
            [$this, 'suitepress_category_meta_box_callback'],
            'page',
            'side',
            'default'
        );
    }

    public function suitepress_category_meta_box_callback($post): void
    {
        wp_nonce_field('suitepress_save_category', 'suitepress_category_nonce');

        $selected_category = get_post_meta($post->ID, '_addon_category', true);

        $categories = get_terms(array(
            'taxonomy' => 'addon_category',
            'hide_empty' => false,
        ));

        echo '<select name="addon_category" style="width: 100%;">';
        echo '<option value="">All Categories</option>';

        foreach ($categories as $category) {
            $selected = ($selected_category == $category->slug) ? 'selected' : '';
            echo '<option value="' . esc_attr($category->slug) . '" ' . $selected . '>';
            echo esc_html($category->name);
            echo '</option>';
        }

        echo '</select>';
    }

    public function suitepress_save_category_meta_box($post_id): void
    {
        if (!isset($_POST['suitepress_category_nonce'])) {
            return;
        }

        if (!wp_verify_nonce($_POST['suitepress_category_nonce'], 'suitepress_save_category')) {
            return;
        }

        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        if (!current_user_can('edit_post', $post_id)) {
            return;
        }

        if (isset($_POST['addon_category'])) {
            update_post_meta($post_id, '_addon_category', sanitize_text_field($_POST['addon_category']));
        }
    }
    public function suitepress_flush_rewrites(): void
    {
        $this->suitepress_register_addon_post_type();
        $this->suitepress_register_addon_taxonomy();
        flush_rewrite_rules();
    }
}
