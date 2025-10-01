<?php
/**
 * Register Block Patterns
 *
 * @package SuitePress
 */
namespace SUITEPRESS_THEME\Inc;

use SUITEPRESS_THEME\Inc\Traits\Singleton;

class Block_Patterns{
    use Singleton;
    protected function __construct()
    {
        $this->setup_hook();
    }
    protected function setup_hook(): void {
        add_action('init',[$this, 'suitepress_register_block_patterns']);
        add_action( 'init', [ $this, 'suitepress_register_block_pattern_categories' ] );
    }
    public function suitepress_register_block_patterns(){

        /**
         * Cover Patterns
         */
        $cover_content = $this->get_pattern_content( 'template-parts/patterns/cover' );
        register_block_pattern(
            'suitepress/cover',
            [
            'title'      => __( 'SuitePress Cover', 'suitepress' ),
            'description' => __( 'cover', 'suitepress' ),
            'categories' => [ 'cover' ],
            'content'    => $cover_content,
            ]
        );

        /**
         * Reviews Patterns
         */
        $reviews_content = $this->get_pattern_content( 'template-parts/patterns/reviews' );
        register_block_pattern(
            'suitepress/reviews',
            [
                'title'      => __( 'SuitePress Reviews', 'suitepress' ),
                'description' => __( 'SuitePress reviews', 'suitepress' ),
                'categories' => [ 'reviews' ],
                'content'    => $reviews_content,
            ]
        );

    }
    public function get_pattern_content( $template_path ) {
        ob_start();
        get_template_part( $template_path );
        $pattern_content = ob_get_contents();
        ob_end_clean();

        return $pattern_content;
    }

    public function suitepress_register_block_pattern_categories(){

        $pattern_categories = [
            'cover' => __( 'Cover', 'suitepress' ),
            'columns' => __( 'Columns', 'suitepress' ),
            'reviews' => __( 'Reviews', 'suitepress' ),
        ];

        if ( ! empty( $pattern_categories ) && is_array( $pattern_categories ) ) {
            foreach ( $pattern_categories as $pattern_category => $pattern_category_label ) {
                register_block_pattern_category(
                    $pattern_category,
                    [ 'label' => $pattern_category_label ]
                );
            }
        }

    }

}