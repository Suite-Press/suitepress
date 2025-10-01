/**
 * Register Blocks Styles
 */
import { registerBlockStyle,unregisterBlockStyle } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

const layoutStyleQuote = [
    {
        name: 'layout-dark-background',
        label: __( 'Layout style dark background', 'aquila' ),
    },
];

// Define block styles
const layoutStyleButton = [
    {
        name: "layout-border-blue-fill",
        label: __("Blue outline", "suitepress"),
    },
    {
        name: "layout-border-white-no-fill",
        label: __("White outline - to be used with dark background", "suitepress"),
    },
];

/**
 * Function to register block styles
 */
const register = () => {

    layoutStyleButton.forEach((layoutStyle) => {
        registerBlockStyle("core/button", layoutStyle);
    });

    layoutStyleQuote.forEach( ( layoutStyle ) =>
        registerBlockStyle( 'core/quote', layoutStyle )
    );
};

const deRegister = () => {
    unregisterBlockStyle( 'core/quote', 'large' );
    unregisterBlockStyle( 'core/button', 'outline' );
};


/**
 * DOM Ready: Register styles when WordPress is ready.
 */
wp.domReady(() => {
    deRegister();
    register();
});