<?php
/**
 * Register Meta Boxes
 *
 * @package SuitePress
 */

namespace SUITEPRESS_THEME\Inc;
use SUITEPRESS_THEME\Inc\Traits\Singleton;

class Meta_Boxes{
    use Singleton;

    protected function __construct()
    {
        $this->setup_hook();
    }
    public function setup_hook(){
        add_action( 'add_meta_boxes', [ $this, 'add_custom_meta_box' ] );
        add_action( 'save_post', [ $this, 'save_post_meta_data' ] );
    }
    public function add_custom_meta_box() {

        $screens = [ 'post' ];
        foreach ( $screens as $screen ) {
            add_meta_box(
                'hide-page-title',
                __( 'Hide page title', 'suitepress' ),
                [ $this, 'custom_meta_box_html' ],
                $screen,
                'side'
            );
        }
    }
    public function custom_meta_box_html( $post ) {

        $value = get_post_meta( $post->ID, '_hide_page_title', true );

        /**
         * Use nonce for verification
         */
        wp_nonce_field( plugin_basename(__FILE__), 'hide_title_meta_box_nonce_name' );

        ?>
        <label for="suitepress-field"><?php esc_html_e( 'Hide the page title', 'suitepress' ); ?></label>
        <select name="suitepress_hide_title_field" id="suitepress-field" class="postbox">
            <option value=""><?php esc_html_e( 'Select', 'suitepress' ); ?></option>
            <option value="yes" <?php selected( $value, 'yes' ); ?>>
                <?php esc_html_e( 'Yes', 'suitepress' ); ?>
            </option>
            <option value="no" <?php selected( $value, 'no' ); ?>>
                <?php esc_html_e( 'No', 'suitepress' ); ?>
            </option>
        </select>
        <?php
    }
    public function save_post_meta_data($post_id){

        /**
         * When post save this action will run
         */
        if ( ! current_user_can( 'edit_post', $post_id ) ) {
            return;
        }
        if ( ! isset( $_POST['hide_title_meta_box_nonce_name'] ) ||
            ! wp_verify_nonce( $_POST['hide_title_meta_box_nonce_name'], plugin_basename(__FILE__) )
        ) {
            return;
        }

        if ( array_key_exists( 'suitepress_hide_title_field', $_POST ) ) {
            update_post_meta(
                $post_id,
                '_hide_page_title',
                $_POST['suitepress_hide_title_field']
            );
        }
    }
}