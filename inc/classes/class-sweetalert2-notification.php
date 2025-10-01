<?php
/**
 * SweetAlert2 global function
 *
 * @package SuitePress
 */

namespace SUITEPRESS_THEME\Inc;

use SUITEPRESS_THEME\Inc\Traits\Singleton;

class Sweetalert2_Notification{
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
        add_action( 'wp_footer', [ $this, 'sweetalert2_notification_js' ]);
    }
    public function sweetalert2_notification_js() {
        ?>
        <script type="text/javascript">
            function showNotification(message, type) {
                const notificationOptions = {
                    icon: type === "success" ? "success" : "error",
                    title: type === "success" ? "Success!" : "Error!",
                    text: message,
                    timer: 3000,
                    showConfirmButton: false,
                    position: "top-end",
                    toast: true,
                    customClass: {
                        popup: 'swal2-toast'
                    },
                    timerProgressBar: true,
                };

                Swal.fire(notificationOptions);
            }
        </script>
        <?php
    }

}