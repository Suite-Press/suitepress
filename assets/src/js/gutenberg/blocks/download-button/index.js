/**
 * Download Button Block - Updated with file handling and webhook mapping
 * File: assets/src/js/blocks/download-button/block.js
 */
import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, Button, ToggleControl, TextControl, TextareaControl, SelectControl, BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('suitepress/download-button', {
    title: __('Download Button', 'suitepress'),
    description: __('Download button with optional lead capture and webhook integration', 'suitepress'),
    category: 'suitepress',
    icon: 'download',
    keywords: [
        __('download', 'suitepress'),
        __('button', 'suitepress'),
        __('lead capture', 'suitepress'),
        __('webhook', 'suitepress')
    ],

    attributes: {
        files: {
            type: 'array',
            default: []
        },
        buttonText: {
            type: 'string',
            default: __('Download Now', 'suitepress')
        },
        enableLeadCapture: {
            type: 'boolean',
            default: true
        },
        requireLeadCapture: {
            type: 'boolean',
            default: false
        },
        webhookUrl: {
            type: 'string',
            default: ''
        },
        webhookMethod: {
            type: 'string',
            default: 'POST'
        },
        webhookHeaders: {
            type: 'string',
            default: '{"Content-Type": "application/json"}'
        },
        fieldMappings: {
            type: 'object',
            default: {
                name: 'name',
                email: 'email',
                phone: 'phone'
            }
        },
        successMessage: {
            type: 'string',
            default: __('Thank you! Your download will begin shortly.', 'suitepress')
        },
        errorMessage: {
            type: 'string',
            default: __('Something went wrong. Please try again.', 'suitepress')
        },
        privacyText: {
            type: 'string',
            default: __('I agree to the privacy policy and terms of service.', 'suitepress')
        },
        requirePrivacy: {
            type: 'boolean',
            default: true
        },
        downloadType: {
            type: 'string',
            default: 'zip' // 'zip' or 'individual'
        },
        leadStorage: {
            type: 'string',
            default: 'both' // 'webhook', 'local', 'both'
        },
        autoCreateFluentContact: {
            type: 'boolean',
            default: true
        },
        fluentLists: {
            type: 'array',
            default: []
        }
    },

    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps({
            className: 'suitepress-download-button-editor'
        });

        const {
            files,
            buttonText,
            enableLeadCapture,
            requireLeadCapture,
            webhookUrl,
            webhookMethod,
            webhookHeaders,
            fieldMappings,
            successMessage,
            errorMessage,
            privacyText,
            requirePrivacy,
            downloadType
        } = attributes;

        const handleFileSelect = (event) => {
            const selectedFiles = Array.from(event.target.files);
            const newFiles = selectedFiles.map(file => ({
                id: 'file-' + Date.now() + Math.random(),
                name: file.name,
                size: file.size,
                type: file.type,
                file: file,
                url: URL.createObjectURL(file) // Create object URL for preview
            }));
            setAttributes({ files: [...files, ...newFiles] });
            event.target.value = '';
        };

        const removeFile = (index) => {
            const newFiles = files.filter((file, i) => i !== index);
            setAttributes({ files: newFiles });
        };

        const openFileManager = () => {
            document.getElementById('suitepress-file-upload').click();
        };

        const updateFieldMapping = (field, value) => {
            const newMappings = { ...fieldMappings, [field]: value };
            setAttributes({ fieldMappings: newMappings });
        };

        const updateWebhookHeaders = (value) => {
            try {
                JSON.parse(value); // Validate JSON
                setAttributes({ webhookHeaders: value });
            } catch (e) {
                // Keep old value if invalid JSON
                console.error('Invalid JSON for headers');
            }
        };

        return (
            <div {...blockProps}>
                <InspectorControls>
                    <PanelBody title={__('Button Settings', 'suitepress')} initialOpen={true}>
                        <TextControl
                            label={__('Button Text', 'suitepress')}
                            value={buttonText}
                            onChange={(value) => setAttributes({ buttonText: value })}
                        />

                        <SelectControl
                            label={__('Download Type', 'suitepress')}
                            value={downloadType}
                            options={[
                                { label: __('ZIP Archive', 'suitepress'), value: 'zip' },
                                { label: __('Individual Files', 'suitepress'), value: 'individual' }
                            ]}
                            onChange={(value) => setAttributes({ downloadType: value })}
                        />

                        <ToggleControl
                            label={__('Enable Lead Capture', 'suitepress')}
                            checked={enableLeadCapture}
                            onChange={(value) => setAttributes({ enableLeadCapture: value })}
                            help={__('Show form to collect user information before download', 'suitepress')}
                        />

                        {enableLeadCapture && (
                            <ToggleControl
                                label={__('Require Lead Capture', 'suitepress')}
                                checked={requireLeadCapture}
                                onChange={(value) => setAttributes({ requireLeadCapture: value })}
                                help={__('Users must fill the form to download', 'suitepress')}
                            />
                        )}

                        <ToggleControl
                            label={__('Require Privacy Agreement', 'suitepress')}
                            checked={requirePrivacy}
                            onChange={(value) => setAttributes({ requirePrivacy: value })}
                        />
                    </PanelBody>

                    <PanelBody title={__('Webhook Settings', 'suitepress')} initialOpen={false}>
                        <TextControl
                            label={__('Webhook URL', 'suitepress')}
                            value={webhookUrl}
                            onChange={(value) => setAttributes({ webhookUrl: value })}
                            placeholder="https://api.example.com/leads"
                            help={__('URL to send lead data when users fill the form', 'suitepress')}
                        />

                        <SelectControl
                            label={__('Webhook Method', 'suitepress')}
                            value={webhookMethod}
                            options={[
                                { label: 'POST', value: 'POST' },
                                { label: 'PUT', value: 'PUT' },
                                { label: 'PATCH', value: 'PATCH' }
                            ]}
                            onChange={(value) => setAttributes({ webhookMethod: value })}
                        />

                        <TextareaControl
                            label={__('Webhook Headers (JSON)', 'suitepress')}
                            value={webhookHeaders}
                            onChange={updateWebhookHeaders}
                            help={__('Custom headers for webhook request', 'suitepress')}
                            placeholder='{"Content-Type": "application/json", "Authorization": "Bearer token"}'
                        />

                        <BaseControl label={__('Field Mappings', 'suitepress')} help={__('Map form fields to your webhook endpoint field names')}>
                            <div className="field-mappings">
                                <TextControl
                                    label={__('Name Field', 'suitepress')}
                                    value={fieldMappings.name}
                                    onChange={(value) => updateFieldMapping('name', value)}
                                    placeholder="name"
                                />
                                <TextControl
                                    label={__('Email Field', 'suitepress')}
                                    value={fieldMappings.email}
                                    onChange={(value) => updateFieldMapping('email', value)}
                                    placeholder="email"
                                />
                                <TextControl
                                    label={__('Phone Field', 'suitepress')}
                                    value={fieldMappings.phone}
                                    onChange={(value) => updateFieldMapping('phone', value)}
                                    placeholder="phone"
                                />
                            </div>
                        </BaseControl>

                        <TextareaControl
                            label={__('Success Message', 'suitepress')}
                            value={successMessage}
                            onChange={(value) => setAttributes({ successMessage: value })}
                        />

                        <TextareaControl
                            label={__('Error Message', 'suitepress')}
                            value={errorMessage}
                            onChange={(value) => setAttributes({ errorMessage: value })}
                        />
                    </PanelBody>
                </InspectorControls>

                {/* Rest of the editor UI remains the same */}
                <div className="download-button-header">
                    <h3>{__('Download Button', 'suitepress')}</h3>
                    <div className="button-group">
                        <Button isPrimary onClick={openFileManager}>
                            {__('Add Files', 'suitepress')}
                        </Button>
                        <input
                            id="suitepress-file-upload"
                            type="file"
                            multiple
                            onChange={handleFileSelect}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>

                {/* Files List - Updated to show actual files */}
                {files.length > 0 && (
                    <div className="files-list">
                        <h4>{__('Selected Files', 'suitepress')}</h4>
                        <div className="files-summary">
                            <p>
                                {__('Total files:', 'suitepress')} <strong>{files.length}</strong> |
                                {__(' Download as:', 'suitepress')} <strong>{downloadType === 'zip' ? 'ZIP Archive' : 'Individual Files'}</strong>
                            </p>
                        </div>

                        {files.map((file, index) => (
                            <div key={file.id} className="file-item">
                                <div className="file-info">
                                    <span className="file-name">{file.name}</span>
                                    <span className="file-size">{formatFileSize(file.size)}</span>
                                </div>
                                <Button
                                    icon="trash"
                                    onClick={() => removeFile(index)}
                                    label={__('Remove file', 'suitepress')}
                                    isDestructive
                                    isSmall
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Rest of editor UI remains the same */}
            </div>
        );
    },

    save: ({ attributes }) => {
        const blockProps = useBlockProps.save({
            className: 'suitepress-download-button',
            'data-enable-lead-capture': attributes.enableLeadCapture,
            'data-require-lead-capture': attributes.requireLeadCapture,
            'data-webhook-url': attributes.webhookUrl,
            'data-webhook-method': attributes.webhookMethod,
            'data-webhook-headers': attributes.webhookHeaders,
            'data-field-mappings': JSON.stringify(attributes.fieldMappings),
            'data-success-message': attributes.successMessage,
            'data-error-message': attributes.errorMessage,
            'data-require-privacy': attributes.requirePrivacy,
            'data-download-type': attributes.downloadType
        });

        const { files, buttonText, privacyText } = attributes;

        return (
            <div {...blockProps}>
                <div className="download-button-container">
                    <button
                        type="button"
                        className="suitepress-download-trigger"
                        data-files={JSON.stringify(files)}
                    >
                        {buttonText}
                    </button>

                    {/* Lead Capture Form */}
                    <div className="lead-capture-form" style={{display: 'none'}}>
                        <div className="form-fields">
                            <div className="form-group">
                                <label htmlFor="download-name">{__('Name', 'suitepress')}</label>
                                <input
                                    type="text"
                                    id="download-name"
                                    className="form-input"
                                    placeholder={__('Enter your name', 'suitepress')}
                                    data-field="name"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="download-email">{__('Email', 'suitepress')}</label>
                                <input
                                    type="email"
                                    id="download-email"
                                    className="form-input"
                                    placeholder={__('Enter your email', 'suitepress')}
                                    required
                                    data-field="email"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="download-phone">{__('Phone', 'suitepress')}</label>
                                <input
                                    type="tel"
                                    id="download-phone"
                                    className="form-input"
                                    placeholder={__('Enter your phone number', 'suitepress')}
                                    data-field="phone"
                                />
                            </div>

                            {attributes.requirePrivacy && (
                                <div className="form-group privacy-agreement">
                                    <label className="checkbox-label">
                                        <input type="checkbox" className="privacy-checkbox" required={attributes.requirePrivacy} />
                                        <span className="checkmark"></span>
                                        {privacyText}
                                    </label>
                                </div>
                            )}
                        </div>

                        <div className="form-actions">
                            <button type="button" className="btn-cancel">
                                {__('Cancel', 'suitepress')}
                            </button>
                            <button type="button" className="btn-submit">
                                {__('Download & Submit', 'suitepress')}
                            </button>
                        </div>

                        <div className="skip-option">
                            <button type="button" className="btn-skip">
                                {__('Skip form and download directly', 'suitepress')}
                            </button>
                        </div>
                    </div>

                    <div className="download-messages" style={{display: 'none'}}>
                        <div className="success-message"></div>
                        <div className="error-message"></div>
                    </div>
                </div>
            </div>
        );
    }
});

// Helper function
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
