<?php
/**
 * Register Block Categories
 *
 * @package SuitePress
 */
namespace SUITEPRESS_THEME\Inc;

use SUITEPRESS_THEME\Inc\Traits\Singleton;

class Blocks{
    use Singleton;
    protected function __construct()
    {
        $this->setup_hook();
    }
    protected function setup_hook(): void {
        /**
         * Actions.
         */
        add_filter( 'block_categories_all', [ $this, 'add_block_categories' ] );
    }
    public function add_block_categories($categories){

        $category_slugs = wp_list_pluck( $categories, 'slug' );

        return in_array( 'suitepress', $category_slugs, true ) ? $categories : array_merge(
            $categories,
            [
                [
                    'slug'  => 'suitepress',
                    'title' => __( 'SuitePress Blocks', 'suitepress' ),
                    'icon'  => 'table-row-after',
                ],
            ]
        );

    }

}