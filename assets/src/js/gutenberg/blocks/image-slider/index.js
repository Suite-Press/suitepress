/**
 * Image Swiper Slider Block
 * File: assets/src/js/blocks/image-swiper/block.js
 */
import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, MediaUpload, MediaUploadCheck, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, Button, SelectControl, ToggleControl, RangeControl, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('suitepress/image-swiper', {
    title: __('Image Swiper Slider', 'suitepress'),
    description: __('Advanced image slider with swiper effects', 'suitepress'),
    category: 'suitepress',
    icon: 'images-alt2',
    keywords: [
        __('slider', 'suitepress'),
        __('swiper', 'suitepress'),
        __('carousel', 'suitepress'),
        __('image', 'suitepress')
    ],

    attributes: {
        images: {
            type: 'array',
            default: []
        },
        effect: {
            type: 'string',
            default: 'slide'
        },
        autoplay: {
            type: 'boolean',
            default: true
        },
        autoplayDelay: {
            type: 'number',
            default: 3000
        },
        loop: {
            type: 'boolean',
            default: true
        },
        navigation: {
            type: 'boolean',
            default: true
        },
        pagination: {
            type: 'boolean',
            default: true
        },
        slidesPerView: {
            type: 'number',
            default: 1
        },
        spaceBetween: {
            type: 'number',
            default: 30
        }
    },

    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps({
            className: 'suitepress-swiper-editor'
        });

        const {
            images,
            effect,
            autoplay,
            autoplayDelay,
            loop,
            navigation,
            pagination,
            slidesPerView,
            spaceBetween
        } = attributes;

        const onSelectImages = (newImages) => {
            const formattedImages = newImages.map(img => ({
                id: img.id,
                url: img.url,
                alt: img.alt,
                caption: img.caption || ''
            }));
            setAttributes({ images: formattedImages });
        };

        const removeImage = (index) => {
            const newImages = images.filter((img, i) => i !== index);
            setAttributes({ images: newImages });
        };

        const updateImageCaption = (index, caption) => {
            const newImages = [...images];
            newImages[index].caption = caption;
            setAttributes({ images: newImages });
        };

        const moveImage = (index, direction) => {
            const newImages = [...images];
            const targetIndex = direction === 'up' ? index - 1 : index + 1;

            if (targetIndex < 0 || targetIndex >= newImages.length) return;

            [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
            setAttributes({ images: newImages });
        };

        return (
            <div {...blockProps}>
                <InspectorControls>
                    <PanelBody title={__('Slider Settings', 'suitepress')} initialOpen={true}>
                        <SelectControl
                            label={__('Transition Effect', 'suitepress')}
                            value={effect}
                            options={[
                                { label: __('Slide', 'suitepress'), value: 'slide' },
                                { label: __('Fade', 'suitepress'), value: 'fade' },
                                { label: __('Cube', 'suitepress'), value: 'cube' },
                                { label: __('Coverflow', 'suitepress'), value: 'coverflow' },
                                { label: __('Flip', 'suitepress'), value: 'flip' }
                            ]}
                            onChange={(value) => setAttributes({ effect: value })}
                        />

                        <RangeControl
                            label={__('Slides Per View', 'suitepress')}
                            value={slidesPerView}
                            onChange={(value) => setAttributes({ slidesPerView: value })}
                            min={1}
                            max={5}
                        />

                        <RangeControl
                            label={__('Space Between Slides', 'suitepress')}
                            value={spaceBetween}
                            onChange={(value) => setAttributes({ spaceBetween: value })}
                            min={0}
                            max={100}
                        />

                        <ToggleControl
                            label={__('Autoplay', 'suitepress')}
                            checked={autoplay}
                            onChange={(value) => setAttributes({ autoplay: value })}
                        />

                        {autoplay && (
                            <RangeControl
                                label={__('Autoplay Delay (ms)', 'suitepress')}
                                value={autoplayDelay}
                                onChange={(value) => setAttributes({ autoplayDelay: value })}
                                min={1000}
                                max={10000}
                                step={500}
                            />
                        )}

                        <ToggleControl
                            label={__('Loop', 'suitepress')}
                            checked={loop}
                            onChange={(value) => setAttributes({ loop: value })}
                        />

                        <ToggleControl
                            label={__('Navigation Arrows', 'suitepress')}
                            checked={navigation}
                            onChange={(value) => setAttributes({ navigation: value })}
                        />

                        <ToggleControl
                            label={__('Pagination Dots', 'suitepress')}
                            checked={pagination}
                            onChange={(value) => setAttributes({ pagination: value })}
                        />
                    </PanelBody>
                </InspectorControls>

                <div className="swiper-header">
                    <h3>{__('Image Swiper Slider', 'suitepress')}</h3>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={onSelectImages}
                            allowedTypes={['image']}
                            multiple={true}
                            gallery={true}
                            value={images.map(img => img.id)}
                            render={({ open }) => (
                                <Button isPrimary onClick={open}>
                                    {images.length > 0
                                        ? __('Add/Edit Images', 'suitepress')
                                        : __('Add Images', 'suitepress')
                                    }
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>
                </div>

                {images.length > 0 ? (
                    <div className="swiper-images-preview">
                        <div className="swiper-settings-summary">
                            <p>
                                {__('Effect:', 'suitepress')} <strong>{effect}</strong> |
                                {__(' Slides:', 'suitepress')} <strong>{slidesPerView}</strong> |
                                {__(' Autoplay:', 'suitepress')} <strong>{autoplay ? __('Yes', 'suitepress') : __('No', 'suitepress')}</strong>
                            </p>
                        </div>

                        <div className="swiper-images-list">
                            {images.map((image, index) => (
                                <div key={image.id} className="swiper-image-item-editor">
                                    <div className="image-controls">
                                        <span className="image-number">#{index + 1}</span>
                                        <div className="image-actions">
                                            {index > 0 && (
                                                <Button
                                                    icon="arrow-up-alt2"
                                                    onClick={() => moveImage(index, 'up')}
                                                    label={__('Move Up', 'suitepress')}
                                                    isSmall
                                                />
                                            )}
                                            {index < images.length - 1 && (
                                                <Button
                                                    icon="arrow-down-alt2"
                                                    onClick={() => moveImage(index, 'down')}
                                                    label={__('Move Down', 'suitepress')}
                                                    isSmall
                                                />
                                            )}
                                            <Button
                                                icon="trash"
                                                onClick={() => removeImage(index)}
                                                label={__('Remove', 'suitepress')}
                                                isDestructive
                                                isSmall
                                            />
                                        </div>
                                    </div>

                                    <div className="image-preview">
                                        <img src={image.url} alt={image.alt} />
                                    </div>

                                    <div className="image-caption-wrapper">
                                        <label>{__('Caption:', 'suitepress')}</label>
                                        <TextareaControl
                                            value={image.caption}
                                            onChange={(value) => updateImageCaption(index, value)}
                                            placeholder={__('Enter image caption...', 'suitepress')}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="swiper-empty-state">
                        <p>{__('No images selected. Click "Add Images" to get started.', 'suitepress')}</p>
                    </div>
                )}
            </div>
        );
    },

    save: ({ attributes }) => {
        const blockProps = useBlockProps.save({
            className: 'suitepress-swiper',
            'data-effect': attributes.effect,
            'data-autoplay': attributes.autoplay,
            'data-delay': attributes.autoplayDelay,
            'data-loop': attributes.loop,
            'data-navigation': attributes.navigation,
            'data-pagination': attributes.pagination,
            'data-slides-per-view': attributes.slidesPerView,
            'data-space-between': attributes.spaceBetween
        });

        const { images } = attributes;

        return (
            <div {...blockProps}>
                <div className="swiper-wrapper">
                    {images.map((image, index) => (
                        <div key={image.id} className="swiper-slide">
                            <img
                                src={image.url}
                                alt={image.alt}
                                className="swiper-image"
                            />
                            {image.caption && (
                                <div className="swiper-caption">
                                    {image.caption}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {attributes.navigation && (
                    <>
                        <div className="swiper-button-prev"></div>
                        <div className="swiper-button-next"></div>
                    </>
                )}

                {attributes.pagination && (
                    <div className="swiper-pagination"></div>
                )}
            </div>
        );
    }
});
