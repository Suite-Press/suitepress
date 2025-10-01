/**
 * Internal Dependencies.
 */
import { getIconComponent } from './icons-map';

/**
 * WordPress Dependencies.
 */
import { PanelBody, RadioControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { RichText, InspectorControls } from '@wordpress/block-editor';

const Edit = ( props ) => {
	const { className, attributes, setAttributes } = props;
	const { option, content } = attributes;

	const HeadingIcon = getIconComponent(option);

	return (
		<div className="suitepress-icon-heading">
			<span className="suitepress-icon-heading__heading">
				<HeadingIcon />
			</span>
			{}
			<RichText
				tagName="h4"
				className={className}
				value={content}
				onChange={(contentVal) => setAttributes({ contentVal })}
				placeholder={__('Heading…', 'suitepress')}
			/>
			<InspectorControls>
				<PanelBody title={__('Block Settings', 'suitepress')}>
					<RadioControl
						label={__('Select the icon', 'suitepress')}
						help={__('Controls icon selection', 'suitepress')}
						selected={option}
						options={[
							{ label: __('Dos', 'suitepress'), value: 'dos' },
							{
								label: __("Dont's", 'suitepress'),
								value: 'donts',
							},
						]}
						onChange={(option) => {
							setAttributes({ option });
						}}
					/>
				</PanelBody>
				d
			</InspectorControls>
		</div>
	);
};

export default Edit;
