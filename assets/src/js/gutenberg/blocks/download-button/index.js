/**
 * Download Button Block - Simple file download button
 * File: assets/src/js/gutenberg/blocks/download-button/index.js
 */
import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, useBlockProps, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('suitepress/download-button', {
    title: __('Download Button', 'suitepress'),
    description: __('Simple download button for files', 'suitepress'),
    category: 'suitepress',
    icon: 'download',
    keywords: [
        __('download', 'suitepress'),
        __('button', 'suitepress'),
        __('file', 'suitepress')
    ],

    attributes: {
        files: {
            type: 'array',
            default: []
        },
        buttonText: {
            type: 'string',
            default: __('Download', 'suitepress')
        },
        downloadType: {
            type: 'string',
            default: 'zip' // 'zip' or 'individual'
        }
    },

    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps({
            className: 'suitepress-download-button-editor'
        });

        const { files, buttonText, downloadType } = attributes;

        const handleFileSelect = (selectedMedia) => {
            // Handle both single and multiple selections
            const selectedFiles = Array.isArray(selectedMedia) ? selectedMedia : [selectedMedia];
            
            const newFiles = selectedFiles.map(media => {
                // Extract filename from URL if not available
                let fileName = media.filename || media.title || '';
                if (!fileName && media.url) {
                    const urlParts = media.url.split('/');
                    fileName = urlParts[urlParts.length - 1].split('?')[0];
                }
                if (!fileName) {
                    fileName = `file-${media.id}`;
                }
                
                return {
                    id: media.id,
                    name: fileName,
                    url: media.url,
                    size: media.filesizeInBytes || media.fileSize || 0,
                    type: media.mime || media.type || 'application/octet-stream'
                };
            });
            
            // Merge with existing files, avoiding duplicates
            const existingIds = files.map(f => f.id);
            const uniqueNewFiles = newFiles.filter(f => !existingIds.includes(f.id));
            setAttributes({ files: [...files, ...uniqueNewFiles] });
        };

        const removeFile = (index) => {
            const newFiles = files.filter((file, i) => i !== index);
            setAttributes({ files: newFiles });
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
                            help={files.length === 1 ? __('Single file will download directly', 'suitepress') : ''}
                        />
                    </PanelBody>
                </InspectorControls>

                <div className="download-button-header">
                    <h3>{__('Download Button', 'suitepress')}</h3>
                    <div className="button-group">
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={handleFileSelect}
                                allowedTypes={[]}
                                multiple={true}
                                value={files.map(f => f.id)}
                                render={({ open }) => (
                                    <Button isPrimary onClick={open}>
                                        {files.length > 0
                                            ? __('Add/Edit Files', 'suitepress')
                                            : __('Add Files', 'suitepress')
                                        }
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                    </div>
                </div>

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

                {files.length === 0 && (
                    <div className="no-files-message">
                        <p>{__('No files selected. Click "Add Files" to select files for download.', 'suitepress')}</p>
                    </div>
                )}
            </div>
        );
    },

    save: ({ attributes }) => {
        const blockProps = useBlockProps.save({
            className: 'suitepress-download-button',
            'data-download-type': attributes.downloadType
        });

        const { files, buttonText } = attributes;

        return (
            <div {...blockProps}>
                <button
                    type="button"
                    className="suitepress-download-trigger"
                    data-files={JSON.stringify(files)}
                >
                    {buttonText}
                </button>
            </div>
        );
    }
});

// Helper function
function formatFileSize(bytes) {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
