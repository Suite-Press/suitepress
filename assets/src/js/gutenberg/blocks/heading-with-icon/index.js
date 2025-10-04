/**
 * Heading with Icon block.
 *
 * @package
 */
import { getIconComponent } from './icons-map';
import Edit from './edit';

import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

/**
 * Register block type.
 */
registerBlockType( 'suitepress-blocks/heading', {
	title: __( 'Heading with Icon', 'suitepress' ),
	icon: 'editor-spellcheck',
	description: __('Add Heading and select Icons', 'suitepress'),
	category: 'suitepress',
	attributes: {
		option: {
			type: 'string',
			default: 'dos',
		},
		content: {
			type: 'string',
			source: 'html',
			selector: 'h4',
			default: __('Dos', 'suitepress'),
		},
	},
	edit: Edit,
	save(props) {
		const {
			attributes: { option, content },
		} = props;
		const HeadingIcon = getIconComponent(option);

		return (
			<div className="suitepress-icon-heading">
				<span className="suitepress-icon-heading__heading">
					<HeadingIcon />
				</span>
				{/* Saves <h2>Content added in the editor...</h2> to the database for frontend display */}
				<RichText.Content tagName="h4" value={content} />
			</div>
		);
	},
} );
