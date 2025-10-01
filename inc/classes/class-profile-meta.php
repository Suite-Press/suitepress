<?php
/**
 * Profile Meta Fields template
 *
 * @package SuitePress
 */

namespace SUITEPRESS_THEME\Inc;

use SUITEPRESS_THEME\Inc\Traits\Singleton;

class Profile_Meta{
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
        add_action( 'show_user_profile', [$this,'suitepress_add_author_title_field'] );
        add_action( 'edit_user_profile', [$this,'suitepress_add_author_title_field'] );

        /**
         * Action Hooks - Save the custom user meta field
         */
        add_action( 'personal_options_update', [$this,'suitepress_save_author_title_field'] );
        add_action( 'edit_user_profile_update', [$this,'suitepress_save_author_title_field'] );
    }
    public function suitepress_add_author_title_field($user){
        ?>
        <h3><?php esc_html_e( 'Additional Author Information (SuitePress)', 'suitepress' ); ?></h3>
        <table class="form-table">
            <tr>
                <th><label for="author_title"><?php esc_html_e( 'Author Title', 'suitepress' ); ?></label></th>
                <td>
                    <input type="text" name="author_title" id="author_title" value="<?php echo esc_attr( get_the_author_meta( 'author_title', $user->ID ) ); ?>" class="regular-text" /><br />
                    <span class="description"><?php esc_html_e( 'Enter the author\'s title (e.g., Writer, Editor, CEO).', 'suitepress' ); ?></span>
                </td>
            </tr>
        </table>
        <?php
        wp_nonce_field( 'suitepress_save_author_title', 'suitepress_author_title_nonce' );
    }
    public function suitepress_save_author_title_field( $user_id ) {
        if ( ! current_user_can( 'edit_user', $user_id ) ) {
            return false;
        }
        if ( ! isset( $_POST['suitepress_author_title_nonce'] ) || ! wp_verify_nonce( $_POST['suitepress_author_title_nonce'], 'suitepress_save_author_title' ) ) {
            return false;
        }
        if ( isset( $_POST['author_title'] ) ) {
            update_user_meta( $user_id, 'author_title', sanitize_text_field( $_POST['author_title'] ) );
        }
    }

}