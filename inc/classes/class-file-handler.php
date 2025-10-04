<?php
/**
 * Post Type Register
 *
 * @package SuitePress
 */
namespace SUITEPRESS_THEME\Inc;

use SUITEPRESS_THEME\Inc\Traits\Singleton;

class File_Handler{
    use Singleton;
    private $table_name;
    public function __construct()
    {
        $this->setup_hook();
    }
    public function setup_hook(): void {
        global $wpdb;
        $this->table_name = $wpdb->prefix . 'suitepress_download_leads';

        add_action('wp_ajax_suitepress_download_files', array($this, 'handle_file_download'));
        add_action('wp_ajax_nopriv_suitepress_download_files', array($this, 'handle_file_download'));
        add_action('wp_ajax_suitepress_upload_files', array($this, 'handle_file_upload'));
        add_action('wp_ajax_suitepress_store_lead', array($this, 'store_lead_data'));
        add_action('wp_ajax_nopriv_suitepress_store_lead', array($this, 'store_lead_data'));

        register_activation_hook(__FILE__, array($this, 'create_lead_table'));
    }

    /**
     * Create leads table on plugin activation
     */
    public function create_lead_table() {
        global $wpdb;

        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE {$this->table_name} (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            name varchar(100) NOT NULL,
            email varchar(100) NOT NULL,
            phone varchar(50) DEFAULT NULL,
            files text NOT NULL,
            download_type varchar(20) NOT NULL,
            ip_address varchar(45) NOT NULL,
            user_agent text NOT NULL,
            created_at datetime NOT NULL,
            webhook_sent tinyint(1) DEFAULT 0,
            webhook_response text DEFAULT NULL,
            PRIMARY KEY (id),
            KEY email (email),
            KEY created_at (created_at)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }

    /**
     * Store lead data locally
     */
    public function store_lead_data() {
        // Verify nonce
        if (!wp_verify_nonce($_POST['nonce'], 'suitepress_lead_nonce')) {
            wp_send_json_error('Security check failed');
        }

        $lead_data = array(
            'name' => sanitize_text_field($_POST['name']),
            'email' => sanitize_email($_POST['email']),
            'phone' => sanitize_text_field($_POST['phone']),
            'files' => json_encode($_POST['files']),
            'download_type' => sanitize_text_field($_POST['download_type']),
            'ip_address' => $this->get_client_ip(),
            'user_agent' => sanitize_text_field($_SERVER['HTTP_USER_AGENT']),
            'created_at' => current_time('mysql')
        );

        global $wpdb;
        $result = $wpdb->insert($this->table_name, $lead_data);

        if ($result) {
            $lead_id = $wpdb->insert_id;

            // Send to webhook if configured
            $webhook_sent = $this->send_to_webhook($lead_data, $_POST['webhook_config']);

            // Update webhook status
            if ($webhook_sent) {
                $wpdb->update(
                    $this->table_name,
                    array('webhook_sent' => 1, 'webhook_response' => $webhook_sent),
                    array('id' => $lead_id)
                );
            }

            // Create FluentCRM contact if enabled
            if (isset($_POST['fluentcrm_integration']) && $_POST['fluentcrm_integration']) {
                $this->create_fluentcrm_contact($lead_data, $_POST['fluent_lists']);
            }

            wp_send_json_success(array(
                'lead_id' => $lead_id,
                'webhook_sent' => $webhook_sent
            ));
        } else {
            wp_send_json_error('Failed to store lead data');
        }
    }

    /**
     * Send lead data to webhook
     */
    private function send_to_webhook($lead_data, $webhook_config) {
        if (empty($webhook_config['url'])) {
            return false;
        }

        $webhook_url = $webhook_config['url'];
        $method = $webhook_config['method'] ?? 'POST';
        $headers = $webhook_config['headers'] ?? array();
        $field_mappings = $webhook_config['field_mappings'] ?? array();

        // Map fields according to configuration
        $mapped_data = array();
        foreach ($field_mappings as $form_field => $endpoint_field) {
            if (isset($lead_data[$form_field]) && !empty($endpoint_field)) {
                $mapped_data[$endpoint_field] = $lead_data[$form_field];
            }
        }

        $payload = array(
            'timestamp' => current_time('c'),
            'source' => 'suitepress_download_button',
            'lead' => $mapped_data,
            'files' => json_decode($lead_data['files'], true),
            'download_type' => $lead_data['download_type'],
            'site_url' => get_site_url()
        );

        $args = array(
            'method' => $method,
            'headers' => array_merge(
                array('Content-Type' => 'application/json'),
                $headers
            ),
            'body' => json_encode($payload),
            'timeout' => 30
        );

        $response = wp_remote_request($webhook_url, $args);

        if (is_wp_error($response)) {
            return $response->get_error_message();
        }

        return array(
            'code' => wp_remote_retrieve_response_code($response),
            'body' => wp_remote_retrieve_body($response)
        );
    }

    /**
     * Create FluentCRM contact
     */
    private function create_fluentcrm_contact($lead_data, $list_ids = array()) {
        // Check if FluentCRM is active
        if (!function_exists('FluentCrmApi')) {
            return false;
        }

        try {
            $contact_api = FluentCrmApi('contacts');

            $contact_data = array(
                'email' => $lead_data['email'],
                'first_name' => $lead_data['name'],
                'phone' => $lead_data['phone'],
                'status' => 'subscribed',
                'source' => 'SuitePress Download Button'
            );

            // Create or update contact
            $contact = $contact_api->createOrUpdate($contact_data);

            // Add to lists if specified
            if (!empty($list_ids) && $contact) {
                $contact->attachLists($list_ids);
            }

            // Add custom note about download
            $note = "Downloaded files: " . implode(', ', json_decode($lead_data['files'], true)) .
                "\nDownload type: " . $lead_data['download_type'] .
                "\nIP: " . $lead_data['ip_address'] .
                "\nDate: " . $lead_data['created_at'];

            $contact->addNote([
                'title' => 'File Download',
                'description' => $note
            ]);

            return $contact->id;

        } catch (Exception $e) {
            error_log('FluentCRM integration error: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Get client IP address
     */
    private function get_client_ip() {
        $ip_keys = array('HTTP_X_FORWARDED_FOR', 'HTTP_X_REAL_IP', 'HTTP_CLIENT_IP', 'REMOTE_ADDR');

        foreach ($ip_keys as $key) {
            if (!empty($_SERVER[$key])) {
                $ip = trim($_SERVER[$key]);
                // Handle multiple IPs in X_FORWARDED_FOR
                if (strpos($ip, ',') !== false) {
                    $ips = explode(',', $ip);
                    $ip = trim($ips[0]);
                }
                if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
                    return $ip;
                }
            }
        }

        return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    }

    /**
     * Handle file upload - Store files in WordPress media library
     */
    public function handle_file_upload() {
        if (!wp_verify_nonce($_POST['nonce'], 'suitepress_upload_nonce')) {
            wp_send_json_error('Security check failed');
        }

        if (!function_exists('wp_handle_upload')) {
            require_once(ABSPATH . 'wp-admin/includes/file.php');
        }

        $uploaded_files = array();

        foreach ($_FILES as $file) {
            $upload_overrides = array(
                'test_form' => false,
                'unique_filename_callback' => array($this, 'generate_unique_filename')
            );

            $movefile = wp_handle_upload($file, $upload_overrides);

            if ($movefile && !isset($movefile['error'])) {
                // Insert into media library
                $attachment_id = $this->insert_attachment($movefile['file'], $movefile['url']);

                if ($attachment_id) {
                    $uploaded_files[] = array(
                        'id' => $attachment_id,
                        'url' => $movefile['url'],
                        'name' => $file['name'],
                        'size' => $file['size'],
                        'type' => $file['type'],
                        'wp_url' => wp_get_attachment_url($attachment_id)
                    );
                }
            }
        }

        wp_send_json_success($uploaded_files);
    }

    /**
     * Insert file into media library
     */
    private function insert_attachment($file_path, $file_url) {
        $file_type = wp_check_filetype($file_path, null);
        $file_name = basename($file_path);

        $attachment = array(
            'post_mime_type' => $file_type['type'],
            'post_title' => preg_replace('/\.[^.]+$/', '', $file_name),
            'post_content' => '',
            'post_status' => 'inherit',
            'guid' => $file_url
        );

        $attachment_id = wp_insert_attachment($attachment, $file_path);

        if (!is_wp_error($attachment_id)) {
            require_once(ABSPATH . 'wp-admin/includes/image.php');
            $attachment_data = wp_generate_attachment_metadata($attachment_id, $file_path);
            wp_update_attachment_metadata($attachment_id, $attachment_data);
        }

        return $attachment_id;
    }

    /**
     * Generate unique filename
     */
    public function generate_unique_filename($dir, $name, $ext) {
        $filename = sanitize_file_name($name);
        return $filename;
    }
}
