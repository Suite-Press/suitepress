<?php
/**
 * LoadMore Posts template
 *
 * @package SuitePress
 */

namespace SUITEPRESS_THEME\Inc;

use SUITEPRESS_THEME\Inc\Traits\Singleton;

class Loadmore_Posts{
    use Singleton;

    protected function __construct()
    {
        $this->setup_hooks();
    }
    protected function setup_hooks(): void
    {
        /**
         * Action Hooks - Add custom user meta field for Author Title
         */

        add_action( 'wp_ajax_nopriv_load_more', [ $this, 'ajax_script_post_load_more' ] );
        add_action( 'wp_ajax_load_more', [ $this, 'ajax_script_post_load_more' ] );

        /**
         * Create a short code.
         *
         * Usage echo do_shortcode('[post_listings]');
         */
        add_shortcode( 'post_listings', [ $this, 'post_script_load_more' ] );
    }
    public function ajax_script_post_load_more(bool $initial_request = false ): void
    {

        if ( ! $initial_request && ! check_ajax_referer( 'loadmore_post_nonce', 'ajax_nonce', false ) ) {
            wp_send_json_error( __( 'Invalid security token sent.', 'text-domain' ) );
            wp_die( '0', 400 );
        }

        // Check if it's an ajax call.
        $is_ajax_request = ! empty( $_SERVER['HTTP_X_REQUESTED_WITH'] ) &&
            strtolower( $_SERVER['HTTP_X_REQUESTED_WITH'] ) === 'xmlhttprequest';

        $page_no = get_query_var( 'paged' ) ? get_query_var( 'paged' ) : 1;
        $page_no = ! empty( $_POST['page'] ) ? filter_var( $_POST['page'], FILTER_VALIDATE_INT ) + 1 : $page_no;

        // Default Argument.
        $args = [
            'post_type'      => 'post',
            'post_status'    => 'publish',
            'posts_per_page' => 6, // Number of posts per page - default
            'paged'          => $page_no,
        ];

        $query = new \WP_Query( $args );

        if ( $query->have_posts() ):
            // Loop Posts.
            while ( $query->have_posts() ): $query->the_post();
                get_template_part( 'template-parts/components/post-card' );
            endwhile;

            // Pagination for Google.
            if ( ! $is_ajax_request ) :
                $total_pages = $query->max_num_pages;
                get_template_part( 'template-parts/common/pagination', null, [
                    'total_pages'  => $total_pages,
                    'current_page' => $page_no,
                ] );
            endif;
        else:
            wp_die( '0' );
        endif;

        wp_reset_postdata();

        if ( $is_ajax_request && ! $initial_request ) {
            wp_die();
        }
    }
    public function post_script_load_more(): void
    {

        // Initial Post Load.
        ?>
        <div class="load-more-content-wrap">
            <div id="load-more-content" class="row">
                <?php
                $this->ajax_script_post_load_more( true );

                // If user is not in editor and on page one, show the load more.
                ?>
            </div>
            <button id="load-more" data-page="1" class="load-more-btn my-4 d-flex flex-column mx-auto px-4 py-2 border-0 bg-transparent">
                <span><?php esc_html_e( 'Loading...', 'text-domain' ); ?></span>
                <?php get_template_part( 'template-parts/svg-icons/loading' ); ?>
            </button>
        </div>
        <?php
    }

}
