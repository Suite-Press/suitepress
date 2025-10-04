/**
 * Addon Accordion Block
 * File: assets/src/js/blocks/accordion/block.js
 */
import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('suitepress/addon-accordion', {
    title: __('Addon Accordion', 'suitepress'),
    description: __('Q&A Accordion for addon pages', 'suitepress'),
    category: 'suitepress',
    icon: 'list-view',
    keywords: [
        __('accordion', 'suitepress'),
        __('faq', 'suitepress'),
        __('qa', 'suitepress')
    ],

    attributes: {
        items: {
            type: 'array',
            default: [
                {
                    question: __('What is this addon?', 'suitepress'),
                    answer: __('Add your answer here...', 'suitepress'),
                    id: 'item-1'
                }
            ]
        }
    },

    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps({
            className: 'suitepress-accordion-editor'
        });

        const { items } = attributes;

        const addItem = () => {
            const newItems = [...items];
            newItems.push({
                question: __('New Question?', 'suitepress'),
                answer: __('Add your answer here...', 'suitepress'),
                id: 'item-' + Date.now()
            });
            setAttributes({ items: newItems });
        };

        const removeItem = (index) => {
            const newItems = items.filter((item, i) => i !== index);
            setAttributes({ items: newItems });
        };

        const updateItem = (index, field, value) => {
            const newItems = [...items];
            newItems[index][field] = value;
            setAttributes({ items: newItems });
        };

        const moveItem = (index, direction) => {
            const newItems = [...items];
            const targetIndex = direction === 'up' ? index - 1 : index + 1;

            if (targetIndex < 0 || targetIndex >= newItems.length) return;

            [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
            setAttributes({ items: newItems });
        };

        return (
            <div {...blockProps}>
                <div className="accordion-header">
                    <h3>{__('Accordion Items', 'suitepress')}</h3>
                    <Button isPrimary onClick={addItem}>
                        {__('+ Add Item', 'suitepress')}
                    </Button>
                </div>

                <div className="accordion-items">
                    {items.map((item, index) => (
                        <div key={item.id} className="accordion-item-editor">
                            <div className="item-controls">
                                <span className="item-number">#{index + 1}</span>
                                <div className="item-actions">
                                    {index > 0 && (
                                        <Button
                                            icon="arrow-up-alt2"
                                            onClick={() => moveItem(index, 'up')}
                                            label={__('Move Up', 'suitepress')}
                                            isSmall
                                        />
                                    )}
                                    {index < items.length - 1 && (
                                        <Button
                                            icon="arrow-down-alt2"
                                            onClick={() => moveItem(index, 'down')}
                                            label={__('Move Down', 'suitepress')}
                                            isSmall
                                        />
                                    )}
                                    <Button
                                        icon="trash"
                                        onClick={() => removeItem(index)}
                                        label={__('Remove', 'suitepress')}
                                        isDestructive
                                        isSmall
                                    />
                                </div>
                            </div>

                            <div className="accordion-question-wrapper">
                                <label>{__('Question:', 'suitepress')}</label>
                                <RichText
                                    tagName="div"
                                    value={item.question}
                                    onChange={(value) => updateItem(index, 'question', value)}
                                    placeholder={__('Enter question...', 'suitepress')}
                                    className="accordion-question"
                                />
                            </div>

                            <div className="accordion-answer-wrapper">
                                <label>{__('Answer:', 'suitepress')}</label>
                                <RichText
                                    tagName="div"
                                    value={item.answer}
                                    onChange={(value) => updateItem(index, 'answer', value)}
                                    placeholder={__('Enter answer...', 'suitepress')}
                                    className="accordion-answer"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    },

    save: ({ attributes }) => {
        const blockProps = useBlockProps.save({
            className: 'suitepress-accordion'
        });

        const { items } = attributes;

        return (
            <div {...blockProps}>
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        className="accordion-item"
                        data-open={index === 0 ? "true" : "false"}
                    >
                        <div className="accordion-header-item">
                            <RichText.Content
                                tagName="h3"
                                value={item.question}
                                className="accordion-question"
                            />
                            <span className="accordion-icon">{index === 0 ? '−' : '+'}</span>
                        </div>
                        <div className="accordion-content">
                            <RichText.Content
                                tagName="div"
                                value={item.answer}
                                className="accordion-answer"
                            />
                        </div>
                    </div>
                ))}
            </div>
        );
    }
});
