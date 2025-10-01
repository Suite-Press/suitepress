<?php
/**
 * Register menus
 *
 * @package SuitePress
 */
namespace SUITEPRESS_THEME\Inc;

use SUITEPRESS_THEME\Inc\Traits\Singleton;

class Menus{
    use Singleton;
    public function __construct()
    {
        $this->setup_hook();
    }
    public function setup_hook(): void {
        add_action('init',[$this, 'suitepress_register_menus']);
    }
    public function suitepress_register_menus(): void
    {
        register_nav_menus( [
            'suitepress-primary-menu'=>esc_html__('Primary Menu','suitepress'),
            'suitepress-secondary-menu'=>esc_html__('Secondary Menu','suitepress'),
            'suitepress-off-canvas-menu'=>esc_html__('Off-Canvas Menu','suitepress'),
            'suitepress-logged-in-menu'=>esc_html__('Logged In Account Menu','suitepress'),
            'suitepress-footer-menu'=>esc_html__('Footer Menu','suitepress'),
            'suitepress-quick-link-menu'=>esc_html__('Quick Link','suitepress'),
            'suitepress-blog-category-menu'=>esc_html__('Popular Blogs Category','suitepress'),
            'suitepress-support-menu'=>esc_html__('Support','suitepress'),
            'suitepress-technical-docs-menu'=>esc_html__('Technical Docs','suitepress'),
        ]);
    }
    public function get_menu_id($location): int|string
    {
        // get menu location
        $locations = get_nav_menu_locations();

        if (isset($locations[$location])) {
            $menu_id = $locations[$location];
            return $menu_id;
        }
        return '';
    }

    public function get_child_menus($menu_array, $parent_id)
    {
        $child_menus = [];

        if( ! empty( $menu_array ) && is_array($menu_array)){
            foreach ($menu_array as $menu){
                if ( intval($menu->menu_item_parent) === $parent_id){
                    $child_menus[] = $menu;
                }
            }
        }
        return $child_menus;
    }

}
