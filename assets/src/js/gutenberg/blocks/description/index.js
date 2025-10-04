/**
 * Description Block
 * Entry point for webpack compilation
 */

import { registerBlockType } from '@wordpress/blocks';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('suitepress/description', {
    title: __('Description Field', 'suitepress'),
    description: __('A customizable description block with predefined content', 'suitepress'),
    icon: 'text',
    category: 'common',
    keywords: [__('description', 'suitepress'), __('text', 'suitepress'), __('content', 'suitepress')],

    attributes: {
        content: {
            type: 'string',
            default: __('This is a predefined description. You can edit this text to customize your content.', 'suitepress')
        },
        style: {
            type: 'string',
            default: 'default'
        }
    },

    edit: ({ attributes, setAttributes, className }) => {
        const { content, style } = attributes;

        const onChangeContent = (newContent) => {
            setAttributes({ content: newContent });
        };

        const onChangeStyle = (newStyle) => {
            setAttributes({ style: newStyle });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Description Settings', 'suitepress')}>
                        <SelectControl
                            label={__('Style', 'suitepress')}
                            value={style}
                            options={[
                                { label: __('Default', 'suitepress'), value: 'default' },
                                { label: __('Highlighted', 'suitepress'), value: 'highlighted' },
                                { label: __('Minimal', 'suitepress'), value: 'minimal' },
                                { label: __('Boxed', 'suitepress'), value: 'boxed' },
                                { label: __('Modern Card', 'suitepress'), value: 'modern-card' },
                                { label: __('Informative Note', 'suitepress'), value: 'note' },
                                { label: __('Success', 'suitepress'), value: 'success' },
                                { label: __('Error', 'suitepress'), value: 'error' },
                                { label: __('Gradient', 'suitepress'), value: 'gradient' },
                            ]}
                            onChange={onChangeStyle}
                        />
                    </PanelBody>
                </InspectorControls>

                <div className={`${className} description-block description-${style}`}>
                    <RichText
                        tagName="p"
                        className="description-text"
                        value={content}
                        onChange={onChangeContent}
                        placeholder={__('Enter your description here...', 'suitepress')}
                    />
                </div>
            </>
        );
    },

    save: ({ attributes }) => {
        const { content, style } = attributes;

        return (
            <div className={`description-block description-${style}`}>
                <RichText.Content
                    tagName="p"
                    className="description-text"
                    value={content}
                />
            </div>
        );
    }
});
