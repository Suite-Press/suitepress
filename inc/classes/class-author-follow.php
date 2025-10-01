<?php
/**
 * Author Follow Button Implementation
 *
 * @package SuitePress
 */

namespace SUITEPRESS_THEME\Inc;

use SUITEPRESS_THEME\Inc\Traits\Singleton;

class Author_Follow{
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
        add_action( 'wp_ajax_nopriv_author_follow', [ $this, 'ajax_script_author_follow' ] );
        add_action( 'wp_ajax_author_follow', [ $this, 'ajax_script_author_follow' ] );

        add_action('wp_ajax_nopriv_author_unfollow', [$this,'ajax_script_author_unfollow']);
        add_action('wp_ajax_author_unfollow', [$this,'ajax_script_author_unfollow']);

        add_action('wp_ajax_nopriv_check_follow_status', [$this,'ajax_script_check_author_follow_status']);
        add_action('wp_ajax_check_follow_status', [$this,'ajax_script_check_author_follow_status']);
    }
    public function ajax_script_author_follow(){

        check_ajax_referer( 'author_follow_nonce', 'nonce' );

        $author_id = intval( $_POST['author_id'] );
        if ( ! $author_id || ! get_user_by( 'id', $author_id ) ) {
            wp_send_json_error( [ 'message' => 'Invalid author ID.' ] );
        }

        $current_user_id = get_current_user_id();
        if ( ! $current_user_id ) {
            wp_send_json_error( [ 'message' => 'You must be logged in to follow authors.' ] );
        }

        $followers = get_user_meta( $author_id, 'followers', true ) ?: [];

        if ( in_array( $current_user_id, $followers, true ) ) {
            wp_send_json_error( [ 'message' => 'You have already follow this author' ] );
        }

        $followers[] = $current_user_id;
        update_user_meta( $author_id, 'followers', $followers );

        update_user_meta( $author_id, 'followers_count', count( $followers ) );

        wp_send_json_success( [ 'followers_count' => count( $followers ) ] );
    }
    public function ajax_script_author_unfollow(){

        if ( ! isset( $_POST['nonce'] ) || ! wp_verify_nonce( $_POST['nonce'], 'author_follow_nonce' ) ) {
            wp_send_json_error(['message' => 'Nonce verification failed']);
        }

        $author_id = intval( $_POST['author_id'] );
        $user_id = get_current_user_id();

        if ( $author_id && $user_id ) {
            $followers = get_user_meta( $user_id, 'followers', true );
            if ( is_array( $followers ) && in_array( $author_id, $followers ) ) {
                $followers = array_diff( $followers, [ $author_id ] );
                update_user_meta( $user_id, 'followers', $followers );
                wp_send_json_success([
                    'followers_count' => count( $followers ),
                ]);
            } else {
                wp_send_json_error(['message' => 'You are not following this author.']);
            }
        }

        wp_send_json_error(['message' => 'Unfollow failed']);
    }

    function ajax_script_check_author_follow_status() {

        if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'author_follow_nonce')) {
            wp_send_json_error(['message' => 'Nonce verification failed.']);
        }

        $author_id = intval($_POST['author_id']);
        $user_id = get_current_user_id();

        if (!$user_id || !$author_id) {
            wp_send_json_error(['message' => 'Invalid request.']);
        }

        $followers = get_user_meta($user_id, 'followed_authors', true);
        $is_following = is_array($followers) && in_array($author_id, $followers);

        $author_followers = get_user_meta($author_id, 'followers_count', true);
        $author_followers = $author_followers ? intval($author_followers) : 0;

        wp_send_json_success([
            'is_following' => $is_following,
            'followers_count' => $author_followers,
        ]);
    }


}