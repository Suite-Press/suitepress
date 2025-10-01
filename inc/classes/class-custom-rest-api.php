<?php
/**
 * Register Custom REST API
 *
 * @package SuitePress
 */
namespace SUITEPRESS_THEME\Inc;

use SUITEPRESS_THEME\Inc\Traits\Singleton;

class Custom_Rest_Api{
    use Singleton;
    protected function __construct()
    {
        $this->setup_hook();
    }
    protected function setup_hook(): void {
        /**
         * Actions.
         */
        add_action( 'rest_api_init', [ $this, 'rest_api_init_route_function' ] );
    }
    public function rest_api_init_route_function(){

        register_rest_route( 'suitepress/v1', '/posts', [
            'methods'  => 'GET',
            'callback' => [ $this, 'suitepress_filter_posts' ],
        ]);
    }
    public function suitepress_filter_posts($request){
        $args = [
            'post_type'   => 'post',
            'post_status' => 'publish',
            'category__in' => $request->get_param( 'categories' ), // Comma-separated category IDs.
            'tag__in'      => $request->get_param( 'tags' ),      // Comma-separated tag IDs.
        ];

        $query = new \WP_Query( $args );

        $posts = [];
        foreach ( $query->posts as $post ) {
            $posts[] = [
                'id'     => $post->ID,
                'title'  => $post->post_title,
                'link'   => get_permalink( $post->ID ),
                'excerpt' => wp_trim_words( $post->post_content, 20 ),
            ];
        }

        return rest_ensure_response( $posts );
    }

}
