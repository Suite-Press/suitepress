/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/gutenberg/block-extension/register-block-styles.js":
/*!*******************************************************************!*\
  !*** ./src/js/gutenberg/block-extension/register-block-styles.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/**
 * Register Blocks Styles
 */


var layoutStyleQuote = [{
  name: 'layout-dark-background',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Layout style dark background', 'aquila')
}];

// Define block styles
var layoutStyleButton = [{
  name: "layout-border-blue-fill",
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Blue outline", "suitepress")
}, {
  name: "layout-border-white-no-fill",
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("White outline - to be used with dark background", "suitepress")
}];

/**
 * Function to register block styles
 */
var register = function register() {
  layoutStyleButton.forEach(function (layoutStyle) {
    (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockStyle)("core/button", layoutStyle);
  });
  layoutStyleQuote.forEach(function (layoutStyle) {
    return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockStyle)('core/quote', layoutStyle);
  });
};
var deRegister = function deRegister() {
  (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.unregisterBlockStyle)('core/quote', 'large');
  (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.unregisterBlockStyle)('core/button', 'outline');
};

/**
 * DOM Ready: Register styles when WordPress is ready.
 */
wp.domReady(function () {
  deRegister();
  register();
});

/***/ }),

/***/ "./src/js/gutenberg/blocks/according/index.js":
/*!****************************************************!*\
  !*** ./src/js/gutenberg/blocks/according/index.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/**
 * Addon Accordion Block
 * File: assets/src/js/blocks/accordion/block.js
 */




(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('suitepress/addon-accordion', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Addon Accordion', 'suitepress'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Q&A Accordion for addon pages', 'suitepress'),
  category: 'suitepress',
  icon: 'list-view',
  keywords: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('accordion', 'suitepress'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('faq', 'suitepress'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('qa', 'suitepress')],
  attributes: {
    items: {
      type: 'array',
      default: [{
        question: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('What is this addon?', 'suitepress'),
        answer: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add your answer here...', 'suitepress'),
        id: 'item-1'
      }]
    }
  },
  edit: function edit(_ref) {
    var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes;
    var blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: 'suitepress-accordion-editor'
    });
    var items = attributes.items;
    var addItem = function addItem() {
      var newItems = _toConsumableArray(items);
      newItems.push({
        question: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('New Question?', 'suitepress'),
        answer: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add your answer here...', 'suitepress'),
        id: 'item-' + Date.now()
      });
      setAttributes({
        items: newItems
      });
    };
    var removeItem = function removeItem(index) {
      var newItems = items.filter(function (item, i) {
        return i !== index;
      });
      setAttributes({
        items: newItems
      });
    };
    var updateItem = function updateItem(index, field, value) {
      var newItems = _toConsumableArray(items);
      newItems[index][field] = value;
      setAttributes({
        items: newItems
      });
    };
    var moveItem = function moveItem(index, direction) {
      var newItems = _toConsumableArray(items);
      var targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= newItems.length) return;
      var _ref2 = [newItems[targetIndex], newItems[index]];
      newItems[index] = _ref2[0];
      newItems[targetIndex] = _ref2[1];
      setAttributes({
        items: newItems
      });
    };
    return /*#__PURE__*/React.createElement("div", blockProps, /*#__PURE__*/React.createElement("div", {
      className: "accordion-header"
    }, /*#__PURE__*/React.createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Accordion Items', 'suitepress')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      isPrimary: true,
      onClick: addItem
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('+ Add Item', 'suitepress'))), /*#__PURE__*/React.createElement("div", {
      className: "accordion-items"
    }, items.map(function (item, index) {
      return /*#__PURE__*/React.createElement("div", {
        key: item.id,
        className: "accordion-item-editor"
      }, /*#__PURE__*/React.createElement("div", {
        className: "item-controls"
      }, /*#__PURE__*/React.createElement("span", {
        className: "item-number"
      }, "#", index + 1), /*#__PURE__*/React.createElement("div", {
        className: "item-actions"
      }, index > 0 && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
        icon: "arrow-up-alt2",
        onClick: function onClick() {
          return moveItem(index, 'up');
        },
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Move Up', 'suitepress'),
        isSmall: true
      }), index < items.length - 1 && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
        icon: "arrow-down-alt2",
        onClick: function onClick() {
          return moveItem(index, 'down');
        },
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Move Down', 'suitepress'),
        isSmall: true
      }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
        icon: "trash",
        onClick: function onClick() {
          return removeItem(index);
        },
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Remove', 'suitepress'),
        isDestructive: true,
        isSmall: true
      }))), /*#__PURE__*/React.createElement("div", {
        className: "accordion-question-wrapper"
      }, /*#__PURE__*/React.createElement("label", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Question:', 'suitepress')), /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
        tagName: "div",
        value: item.question,
        onChange: function onChange(value) {
          return updateItem(index, 'question', value);
        },
        placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enter question...', 'suitepress'),
        className: "accordion-question"
      })), /*#__PURE__*/React.createElement("div", {
        className: "accordion-answer-wrapper"
      }, /*#__PURE__*/React.createElement("label", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Answer:', 'suitepress')), /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
        tagName: "div",
        value: item.answer,
        onChange: function onChange(value) {
          return updateItem(index, 'answer', value);
        },
        placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enter answer...', 'suitepress'),
        className: "accordion-answer"
      })));
    })));
  },
  save: function save(_ref3) {
    var attributes = _ref3.attributes;
    var blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: 'suitepress-accordion'
    });
    var items = attributes.items;
    return /*#__PURE__*/React.createElement("div", blockProps, items.map(function (item, index) {
      return /*#__PURE__*/React.createElement("div", {
        key: item.id,
        className: "accordion-item",
        "data-open": index === 0 ? "true" : "false"
      }, /*#__PURE__*/React.createElement("div", {
        className: "accordion-header-item"
      }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText.Content, {
        tagName: "h3",
        value: item.question,
        className: "accordion-question"
      }), /*#__PURE__*/React.createElement("span", {
        className: "accordion-icon"
      }, index === 0 ? '−' : '+')), /*#__PURE__*/React.createElement("div", {
        className: "accordion-content"
      }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText.Content, {
        tagName: "div",
        value: item.answer,
        className: "accordion-answer"
      })));
    }));
  }
});

/***/ }),

/***/ "./src/js/gutenberg/blocks/description/index.js":
/*!******************************************************!*\
  !*** ./src/js/gutenberg/blocks/description/index.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/**
 * Description Block
 * Entry point for webpack compilation
 */





(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('suitepress/description', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Description Field', 'suitepress'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('A customizable description block with predefined content', 'suitepress'),
  icon: 'text',
  category: 'common',
  keywords: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('description', 'suitepress'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('text', 'suitepress'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('content', 'suitepress')],
  attributes: {
    content: {
      type: 'string',
      default: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This is a predefined description. You can edit this text to customize your content.', 'suitepress')
    },
    style: {
      type: 'string',
      default: 'default'
    }
  },
  edit: function edit(_ref) {
    var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes,
      className = _ref.className;
    var content = attributes.content,
      style = attributes.style;
    var onChangeContent = function onChangeContent(newContent) {
      setAttributes({
        content: newContent
      });
    };
    var onChangeStyle = function onChangeStyle(newStyle) {
      setAttributes({
        style: newStyle
      });
    };
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Description Settings', 'suitepress')
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Style', 'suitepress'),
      value: style,
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Default', 'suitepress'),
        value: 'default'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Highlighted', 'suitepress'),
        value: 'highlighted'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Minimal', 'suitepress'),
        value: 'minimal'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Boxed', 'suitepress'),
        value: 'boxed'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Modern Card', 'suitepress'),
        value: 'modern-card'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Informative Note', 'suitepress'),
        value: 'note'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Success', 'suitepress'),
        value: 'success'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Error', 'suitepress'),
        value: 'error'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Gradient', 'suitepress'),
        value: 'gradient'
      }],
      onChange: onChangeStyle
    }))), /*#__PURE__*/React.createElement("div", {
      className: "".concat(className, " description-block description-").concat(style)
    }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
      tagName: "p",
      className: "description-text",
      value: content,
      onChange: onChangeContent,
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enter your description here...', 'suitepress')
    })));
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes;
    var content = attributes.content,
      style = attributes.style;
    return /*#__PURE__*/React.createElement("div", {
      className: "description-block description-".concat(style)
    }, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText.Content, {
      tagName: "p",
      className: "description-text",
      value: content
    }));
  }
});

/***/ }),

/***/ "./src/js/gutenberg/blocks/download-button/index.js":
/*!**********************************************************!*\
  !*** ./src/js/gutenberg/blocks/download-button/index.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/**
 * Download Button Block - Updated with file handling and webhook mapping
 * File: assets/src/js/blocks/download-button/block.js
 */




(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('suitepress/download-button', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Download Button', 'suitepress'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Download button with optional lead capture and webhook integration', 'suitepress'),
  category: 'suitepress',
  icon: 'download',
  keywords: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('download', 'suitepress'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('button', 'suitepress'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('lead capture', 'suitepress'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('webhook', 'suitepress')],
  attributes: {
    files: {
      type: 'array',
      default: []
    },
    buttonText: {
      type: 'string',
      default: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Download Now', 'suitepress')
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
      default: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Thank you! Your download will begin shortly.', 'suitepress')
    },
    errorMessage: {
      type: 'string',
      default: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Something went wrong. Please try again.', 'suitepress')
    },
    privacyText: {
      type: 'string',
      default: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('I agree to the privacy policy and terms of service.', 'suitepress')
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
  edit: function edit(_ref) {
    var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes;
    var blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: 'suitepress-download-button-editor'
    });
    var files = attributes.files,
      buttonText = attributes.buttonText,
      enableLeadCapture = attributes.enableLeadCapture,
      requireLeadCapture = attributes.requireLeadCapture,
      webhookUrl = attributes.webhookUrl,
      webhookMethod = attributes.webhookMethod,
      webhookHeaders = attributes.webhookHeaders,
      fieldMappings = attributes.fieldMappings,
      successMessage = attributes.successMessage,
      errorMessage = attributes.errorMessage,
      privacyText = attributes.privacyText,
      requirePrivacy = attributes.requirePrivacy,
      downloadType = attributes.downloadType;
    var handleFileSelect = function handleFileSelect(event) {
      var selectedFiles = Array.from(event.target.files);
      var newFiles = selectedFiles.map(function (file) {
        return {
          id: 'file-' + Date.now() + Math.random(),
          name: file.name,
          size: file.size,
          type: file.type,
          file: file,
          url: URL.createObjectURL(file) // Create object URL for preview
        };
      });
      setAttributes({
        files: [].concat(_toConsumableArray(files), _toConsumableArray(newFiles))
      });
      event.target.value = '';
    };
    var removeFile = function removeFile(index) {
      var newFiles = files.filter(function (file, i) {
        return i !== index;
      });
      setAttributes({
        files: newFiles
      });
    };
    var openFileManager = function openFileManager() {
      document.getElementById('suitepress-file-upload').click();
    };
    var updateFieldMapping = function updateFieldMapping(field, value) {
      var newMappings = _objectSpread(_objectSpread({}, fieldMappings), {}, _defineProperty({}, field, value));
      setAttributes({
        fieldMappings: newMappings
      });
    };
    var updateWebhookHeaders = function updateWebhookHeaders(value) {
      try {
        JSON.parse(value); // Validate JSON
        setAttributes({
          webhookHeaders: value
        });
      } catch (e) {
        // Keep old value if invalid JSON
        console.error('Invalid JSON for headers');
      }
    };
    return /*#__PURE__*/React.createElement("div", blockProps, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Button Settings', 'suitepress'),
      initialOpen: true
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Button Text', 'suitepress'),
      value: buttonText,
      onChange: function onChange(value) {
        return setAttributes({
          buttonText: value
        });
      }
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Download Type', 'suitepress'),
      value: downloadType,
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('ZIP Archive', 'suitepress'),
        value: 'zip'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Individual Files', 'suitepress'),
        value: 'individual'
      }],
      onChange: function onChange(value) {
        return setAttributes({
          downloadType: value
        });
      }
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable Lead Capture', 'suitepress'),
      checked: enableLeadCapture,
      onChange: function onChange(value) {
        return setAttributes({
          enableLeadCapture: value
        });
      },
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Show form to collect user information before download', 'suitepress')
    }), enableLeadCapture && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Require Lead Capture', 'suitepress'),
      checked: requireLeadCapture,
      onChange: function onChange(value) {
        return setAttributes({
          requireLeadCapture: value
        });
      },
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Users must fill the form to download', 'suitepress')
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Require Privacy Agreement', 'suitepress'),
      checked: requirePrivacy,
      onChange: function onChange(value) {
        return setAttributes({
          requirePrivacy: value
        });
      }
    })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Webhook Settings', 'suitepress'),
      initialOpen: false
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Webhook URL', 'suitepress'),
      value: webhookUrl,
      onChange: function onChange(value) {
        return setAttributes({
          webhookUrl: value
        });
      },
      placeholder: "https://api.example.com/leads",
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('URL to send lead data when users fill the form', 'suitepress')
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Webhook Method', 'suitepress'),
      value: webhookMethod,
      options: [{
        label: 'POST',
        value: 'POST'
      }, {
        label: 'PUT',
        value: 'PUT'
      }, {
        label: 'PATCH',
        value: 'PATCH'
      }],
      onChange: function onChange(value) {
        return setAttributes({
          webhookMethod: value
        });
      }
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Webhook Headers (JSON)', 'suitepress'),
      value: webhookHeaders,
      onChange: updateWebhookHeaders,
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Custom headers for webhook request', 'suitepress'),
      placeholder: "{\"Content-Type\": \"application/json\", \"Authorization\": \"Bearer token\"}"
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.BaseControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Field Mappings', 'suitepress'),
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Map form fields to your webhook endpoint field names')
    }, /*#__PURE__*/React.createElement("div", {
      className: "field-mappings"
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Name Field', 'suitepress'),
      value: fieldMappings.name,
      onChange: function onChange(value) {
        return updateFieldMapping('name', value);
      },
      placeholder: "name"
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Email Field', 'suitepress'),
      value: fieldMappings.email,
      onChange: function onChange(value) {
        return updateFieldMapping('email', value);
      },
      placeholder: "email"
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Phone Field', 'suitepress'),
      value: fieldMappings.phone,
      onChange: function onChange(value) {
        return updateFieldMapping('phone', value);
      },
      placeholder: "phone"
    }))), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Success Message', 'suitepress'),
      value: successMessage,
      onChange: function onChange(value) {
        return setAttributes({
          successMessage: value
        });
      }
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Error Message', 'suitepress'),
      value: errorMessage,
      onChange: function onChange(value) {
        return setAttributes({
          errorMessage: value
        });
      }
    }))), /*#__PURE__*/React.createElement("div", {
      className: "download-button-header"
    }, /*#__PURE__*/React.createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Download Button', 'suitepress')), /*#__PURE__*/React.createElement("div", {
      className: "button-group"
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      isPrimary: true,
      onClick: openFileManager
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add Files', 'suitepress')), /*#__PURE__*/React.createElement("input", {
      id: "suitepress-file-upload",
      type: "file",
      multiple: true,
      onChange: handleFileSelect,
      style: {
        display: 'none'
      }
    }))), files.length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "files-list"
    }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Selected Files', 'suitepress')), /*#__PURE__*/React.createElement("div", {
      className: "files-summary"
    }, /*#__PURE__*/React.createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Total files:', 'suitepress'), " ", /*#__PURE__*/React.createElement("strong", null, files.length), " |", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(' Download as:', 'suitepress'), " ", /*#__PURE__*/React.createElement("strong", null, downloadType === 'zip' ? 'ZIP Archive' : 'Individual Files'))), files.map(function (file, index) {
      return /*#__PURE__*/React.createElement("div", {
        key: file.id,
        className: "file-item"
      }, /*#__PURE__*/React.createElement("div", {
        className: "file-info"
      }, /*#__PURE__*/React.createElement("span", {
        className: "file-name"
      }, file.name), /*#__PURE__*/React.createElement("span", {
        className: "file-size"
      }, formatFileSize(file.size))), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
        icon: "trash",
        onClick: function onClick() {
          return removeFile(index);
        },
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Remove file', 'suitepress'),
        isDestructive: true,
        isSmall: true
      }));
    })));
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes;
    var blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
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
    var files = attributes.files,
      buttonText = attributes.buttonText,
      privacyText = attributes.privacyText;
    return /*#__PURE__*/React.createElement("div", blockProps, /*#__PURE__*/React.createElement("div", {
      className: "download-button-container"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "suitepress-download-trigger",
      "data-files": JSON.stringify(files)
    }, buttonText), /*#__PURE__*/React.createElement("div", {
      className: "lead-capture-form",
      style: {
        display: 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-fields"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "download-name"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Name', 'suitepress')), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "download-name",
      className: "form-input",
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enter your name', 'suitepress'),
      "data-field": "name"
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "download-email"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Email', 'suitepress')), /*#__PURE__*/React.createElement("input", {
      type: "email",
      id: "download-email",
      className: "form-input",
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enter your email', 'suitepress'),
      required: true,
      "data-field": "email"
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "download-phone"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Phone', 'suitepress')), /*#__PURE__*/React.createElement("input", {
      type: "tel",
      id: "download-phone",
      className: "form-input",
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enter your phone number', 'suitepress'),
      "data-field": "phone"
    })), attributes.requirePrivacy && /*#__PURE__*/React.createElement("div", {
      className: "form-group privacy-agreement"
    }, /*#__PURE__*/React.createElement("label", {
      className: "checkbox-label"
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      className: "privacy-checkbox",
      required: attributes.requirePrivacy
    }), /*#__PURE__*/React.createElement("span", {
      className: "checkmark"
    }), privacyText))), /*#__PURE__*/React.createElement("div", {
      className: "form-actions"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn-cancel"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Cancel', 'suitepress')), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn-submit"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Download & Submit', 'suitepress'))), /*#__PURE__*/React.createElement("div", {
      className: "skip-option"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn-skip"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Skip form and download directly', 'suitepress')))), /*#__PURE__*/React.createElement("div", {
      className: "download-messages",
      style: {
        display: 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "success-message"
    }), /*#__PURE__*/React.createElement("div", {
      className: "error-message"
    }))));
  }
});

// Helper function
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  var k = 1024;
  var sizes = ['Bytes', 'KB', 'MB', 'GB'];
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/***/ }),

/***/ "./src/js/gutenberg/blocks/heading-with-icon/edit.js":
/*!***********************************************************!*\
  !*** ./src/js/gutenberg/blocks/heading-with-icon/edit.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _icons_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./icons-map */ "./src/js/gutenberg/blocks/heading-with-icon/icons-map.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/**
 * Internal Dependencies.
 */


/**
 * WordPress Dependencies.
 */



var Edit = function Edit(props) {
  var className = props.className,
    attributes = props.attributes,
    setAttributes = props.setAttributes;
  var option = attributes.option,
    content = attributes.content;
  var HeadingIcon = (0,_icons_map__WEBPACK_IMPORTED_MODULE_0__.getIconComponent)(option);
  return /*#__PURE__*/React.createElement("div", {
    className: "suitepress-icon-heading"
  }, /*#__PURE__*/React.createElement("span", {
    className: "suitepress-icon-heading__heading"
  }, /*#__PURE__*/React.createElement(HeadingIcon, null)), /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText, {
    tagName: "h4",
    className: className,
    value: content,
    onChange: function onChange(contentVal) {
      return setAttributes({
        contentVal: contentVal
      });
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Heading…', 'suitepress')
  }), /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Block Settings', 'suitepress')
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RadioControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select the icon', 'suitepress'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Controls icon selection', 'suitepress'),
    selected: option,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Dos', 'suitepress'),
      value: 'dos'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Dont's", 'suitepress'),
      value: 'donts'
    }],
    onChange: function onChange(option) {
      setAttributes({
        option: option
      });
    }
  })), "d"));
};
/* harmony default export */ __webpack_exports__["default"] = (Edit);

/***/ }),

/***/ "./src/js/gutenberg/blocks/heading-with-icon/icons-map.js":
/*!****************************************************************!*\
  !*** ./src/js/gutenberg/blocks/heading-with-icon/icons-map.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getIconComponent: function() { return /* binding */ getIconComponent; }
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./src/js/icons/index.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);



/**
 * Get icon component.
 *
 * @param {String} option Option.
 *
 * @return {*|SvgCheck} SVG Component.
 */
var getIconComponent = function getIconComponent(option) {
  var IconsMap = {
    dos: _icons__WEBPACK_IMPORTED_MODULE_0__.Check,
    donts: _icons__WEBPACK_IMPORTED_MODULE_0__.Cross
  };
  return !(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(option) && option in IconsMap ? IconsMap[option] : IconsMap.dos;
};

/***/ }),

/***/ "./src/js/gutenberg/blocks/heading-with-icon/index.js":
/*!************************************************************!*\
  !*** ./src/js/gutenberg/blocks/heading-with-icon/index.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _icons_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./icons-map */ "./src/js/gutenberg/blocks/heading-with-icon/icons-map.js");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "./src/js/gutenberg/blocks/heading-with-icon/edit.js");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);
/**
 * Heading with Icon block.
 *
 * @package
 */






/**
 * Register block type.
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.registerBlockType)('suitepress-blocks/heading', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Heading with Icon', 'suitepress'),
  icon: 'editor-spellcheck',
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add Heading and select Icons', 'suitepress'),
  category: 'suitepress',
  attributes: {
    option: {
      type: 'string',
      default: 'dos'
    },
    content: {
      type: 'string',
      source: 'html',
      selector: 'h4',
      default: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Dos', 'suitepress')
    }
  },
  edit: _edit__WEBPACK_IMPORTED_MODULE_1__["default"],
  save: function save(props) {
    var _props$attributes = props.attributes,
      option = _props$attributes.option,
      content = _props$attributes.content;
    var HeadingIcon = (0,_icons_map__WEBPACK_IMPORTED_MODULE_0__.getIconComponent)(option);
    return /*#__PURE__*/React.createElement("div", {
      className: "suitepress-icon-heading"
    }, /*#__PURE__*/React.createElement("span", {
      className: "suitepress-icon-heading__heading"
    }, /*#__PURE__*/React.createElement(HeadingIcon, null)), /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.RichText.Content, {
      tagName: "h4",
      value: content
    }));
  }
});

/***/ }),

/***/ "./src/js/gutenberg/blocks/image-slider/index.js":
/*!*******************************************************!*\
  !*** ./src/js/gutenberg/blocks/image-slider/index.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/**
 * Image Swiper Slider Block
 * File: assets/src/js/blocks/image-swiper/block.js
 */




(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('suitepress/image-swiper', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Image Swiper Slider', 'suitepress'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Advanced image slider with swiper effects', 'suitepress'),
  category: 'suitepress',
  icon: 'images-alt2',
  keywords: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('slider', 'suitepress'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('swiper', 'suitepress'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('carousel', 'suitepress'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('image', 'suitepress')],
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
  edit: function edit(_ref) {
    var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes;
    var blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: 'suitepress-swiper-editor'
    });
    var images = attributes.images,
      effect = attributes.effect,
      autoplay = attributes.autoplay,
      autoplayDelay = attributes.autoplayDelay,
      loop = attributes.loop,
      navigation = attributes.navigation,
      pagination = attributes.pagination,
      slidesPerView = attributes.slidesPerView,
      spaceBetween = attributes.spaceBetween;
    var onSelectImages = function onSelectImages(newImages) {
      var formattedImages = newImages.map(function (img) {
        return {
          id: img.id,
          url: img.url,
          alt: img.alt,
          caption: img.caption || ''
        };
      });
      setAttributes({
        images: formattedImages
      });
    };
    var removeImage = function removeImage(index) {
      var newImages = images.filter(function (img, i) {
        return i !== index;
      });
      setAttributes({
        images: newImages
      });
    };
    var updateImageCaption = function updateImageCaption(index, caption) {
      var newImages = _toConsumableArray(images);
      newImages[index].caption = caption;
      setAttributes({
        images: newImages
      });
    };
    var moveImage = function moveImage(index, direction) {
      var newImages = _toConsumableArray(images);
      var targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= newImages.length) return;
      var _ref2 = [newImages[targetIndex], newImages[index]];
      newImages[index] = _ref2[0];
      newImages[targetIndex] = _ref2[1];
      setAttributes({
        images: newImages
      });
    };
    return /*#__PURE__*/React.createElement("div", blockProps, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Slider Settings', 'suitepress'),
      initialOpen: true
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Transition Effect', 'suitepress'),
      value: effect,
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Slide', 'suitepress'),
        value: 'slide'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Fade', 'suitepress'),
        value: 'fade'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Cube', 'suitepress'),
        value: 'cube'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Coverflow', 'suitepress'),
        value: 'coverflow'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Flip', 'suitepress'),
        value: 'flip'
      }],
      onChange: function onChange(value) {
        return setAttributes({
          effect: value
        });
      }
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Slides Per View', 'suitepress'),
      value: slidesPerView,
      onChange: function onChange(value) {
        return setAttributes({
          slidesPerView: value
        });
      },
      min: 1,
      max: 5
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Space Between Slides', 'suitepress'),
      value: spaceBetween,
      onChange: function onChange(value) {
        return setAttributes({
          spaceBetween: value
        });
      },
      min: 0,
      max: 100
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Autoplay', 'suitepress'),
      checked: autoplay,
      onChange: function onChange(value) {
        return setAttributes({
          autoplay: value
        });
      }
    }), autoplay && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Autoplay Delay (ms)', 'suitepress'),
      value: autoplayDelay,
      onChange: function onChange(value) {
        return setAttributes({
          autoplayDelay: value
        });
      },
      min: 1000,
      max: 10000,
      step: 500
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Loop', 'suitepress'),
      checked: loop,
      onChange: function onChange(value) {
        return setAttributes({
          loop: value
        });
      }
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Navigation Arrows', 'suitepress'),
      checked: navigation,
      onChange: function onChange(value) {
        return setAttributes({
          navigation: value
        });
      }
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Pagination Dots', 'suitepress'),
      checked: pagination,
      onChange: function onChange(value) {
        return setAttributes({
          pagination: value
        });
      }
    }))), /*#__PURE__*/React.createElement("div", {
      className: "swiper-header"
    }, /*#__PURE__*/React.createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Image Swiper Slider', 'suitepress')), /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUploadCheck, null, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUpload, {
      onSelect: onSelectImages,
      allowedTypes: ['image'],
      multiple: true,
      gallery: true,
      value: images.map(function (img) {
        return img.id;
      }),
      render: function render(_ref3) {
        var open = _ref3.open;
        return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
          isPrimary: true,
          onClick: open
        }, images.length > 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add/Edit Images', 'suitepress') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add Images', 'suitepress'));
      }
    }))), images.length > 0 ? /*#__PURE__*/React.createElement("div", {
      className: "swiper-images-preview"
    }, /*#__PURE__*/React.createElement("div", {
      className: "swiper-settings-summary"
    }, /*#__PURE__*/React.createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Effect:', 'suitepress'), " ", /*#__PURE__*/React.createElement("strong", null, effect), " |", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(' Slides:', 'suitepress'), " ", /*#__PURE__*/React.createElement("strong", null, slidesPerView), " |", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(' Autoplay:', 'suitepress'), " ", /*#__PURE__*/React.createElement("strong", null, autoplay ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Yes', 'suitepress') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('No', 'suitepress')))), /*#__PURE__*/React.createElement("div", {
      className: "swiper-images-list"
    }, images.map(function (image, index) {
      return /*#__PURE__*/React.createElement("div", {
        key: image.id,
        className: "swiper-image-item-editor"
      }, /*#__PURE__*/React.createElement("div", {
        className: "image-controls"
      }, /*#__PURE__*/React.createElement("span", {
        className: "image-number"
      }, "#", index + 1), /*#__PURE__*/React.createElement("div", {
        className: "image-actions"
      }, index > 0 && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
        icon: "arrow-up-alt2",
        onClick: function onClick() {
          return moveImage(index, 'up');
        },
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Move Up', 'suitepress'),
        isSmall: true
      }), index < images.length - 1 && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
        icon: "arrow-down-alt2",
        onClick: function onClick() {
          return moveImage(index, 'down');
        },
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Move Down', 'suitepress'),
        isSmall: true
      }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
        icon: "trash",
        onClick: function onClick() {
          return removeImage(index);
        },
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Remove', 'suitepress'),
        isDestructive: true,
        isSmall: true
      }))), /*#__PURE__*/React.createElement("div", {
        className: "image-preview"
      }, /*#__PURE__*/React.createElement("img", {
        src: image.url,
        alt: image.alt
      })), /*#__PURE__*/React.createElement("div", {
        className: "image-caption-wrapper"
      }, /*#__PURE__*/React.createElement("label", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Caption:', 'suitepress')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
        value: image.caption,
        onChange: function onChange(value) {
          return updateImageCaption(index, value);
        },
        placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enter image caption...', 'suitepress')
      })));
    }))) : /*#__PURE__*/React.createElement("div", {
      className: "swiper-empty-state"
    }, /*#__PURE__*/React.createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('No images selected. Click "Add Images" to get started.', 'suitepress'))));
  },
  save: function save(_ref4) {
    var attributes = _ref4.attributes;
    var blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
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
    var images = attributes.images;
    return /*#__PURE__*/React.createElement("div", blockProps, /*#__PURE__*/React.createElement("div", {
      className: "swiper-wrapper"
    }, images.map(function (image, index) {
      return /*#__PURE__*/React.createElement("div", {
        key: image.id,
        className: "swiper-slide"
      }, /*#__PURE__*/React.createElement("img", {
        src: image.url,
        alt: image.alt,
        className: "swiper-image"
      }), image.caption && /*#__PURE__*/React.createElement("div", {
        className: "swiper-caption"
      }, image.caption));
    })), attributes.navigation && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "swiper-button-prev"
    }), /*#__PURE__*/React.createElement("div", {
      className: "swiper-button-next"
    })), attributes.pagination && /*#__PURE__*/React.createElement("div", {
      className: "swiper-pagination"
    }));
  }
});

/***/ }),

/***/ "./src/js/icons/Check.js":
/*!*******************************!*\
  !*** ./src/js/icons/Check.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var SvgCheck = function SvgCheck(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    xmlSpace: "preserve",
    width: 20,
    height: 20,
    viewBox: "0 0 417.813 417"
  }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "#06ab1c",
    d: "M159.988 318.582c-3.988 4.012-9.43 6.25-15.082 6.25s-11.094-2.238-15.082-6.25L9.375 198.113c-12.5-12.5-12.5-32.77 0-45.246l15.082-15.086c12.504-12.5 32.75-12.5 45.25 0l75.2 75.203L348.104 9.781c12.504-12.5 32.77-12.5 45.25 0l15.082 15.086c12.5 12.5 12.5 32.766 0 45.246zm0 0",
    "data-original": "#2196f3"
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (SvgCheck);

/***/ }),

/***/ "./src/js/icons/Cross.js":
/*!*******************************!*\
  !*** ./src/js/icons/Cross.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var SvgCross = function SvgCross(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    xmlSpace: "preserve",
    width: 20,
    height: 20,
    viewBox: "0 0 123.05 123.05"
  }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "#e30101",
    d: "m121.325 10.925-8.5-8.399c-2.3-2.3-6.1-2.3-8.5 0l-42.4 42.399L18.726 1.726c-2.301-2.301-6.101-2.301-8.5 0l-8.5 8.5c-2.301 2.3-2.301 6.1 0 8.5l43.1 43.1-42.3 42.5c-2.3 2.3-2.3 6.1 0 8.5l8.5 8.5c2.3 2.3 6.1 2.3 8.5 0l42.399-42.4 42.4 42.4c2.3 2.3 6.1 2.3 8.5 0l8.5-8.5c2.3-2.3 2.3-6.1 0-8.5l-42.5-42.4 42.4-42.399a6.13 6.13 0 0 0 .1-8.602",
    "data-original": "#000000"
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (SvgCross);

/***/ }),

/***/ "./src/js/icons/index.js":
/*!*******************************!*\
  !*** ./src/js/icons/index.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Check: function() { return /* reexport safe */ _Check__WEBPACK_IMPORTED_MODULE_0__["default"]; },
/* harmony export */   Cross: function() { return /* reexport safe */ _Cross__WEBPACK_IMPORTED_MODULE_1__["default"]; }
/* harmony export */ });
/* harmony import */ var _Check__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Check */ "./src/js/icons/Check.js");
/* harmony import */ var _Cross__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Cross */ "./src/js/icons/Cross.js");



/***/ }),

/***/ "./src/sass/blocks.scss":
/*!******************************!*\
  !*** ./src/sass/blocks.scss ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

module.exports = window["React"];

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ (function(module) {

module.exports = window["lodash"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
!function() {
/*!**************************!*\
  !*** ./src/js/blocks.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sass_blocks_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/blocks.scss */ "./src/sass/blocks.scss");
/* harmony import */ var _gutenberg_blocks_heading_with_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gutenberg/blocks/heading-with-icon */ "./src/js/gutenberg/blocks/heading-with-icon/index.js");
/* harmony import */ var _gutenberg_blocks_description__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gutenberg/blocks/description */ "./src/js/gutenberg/blocks/description/index.js");
/* harmony import */ var _gutenberg_blocks_according__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gutenberg/blocks/according */ "./src/js/gutenberg/blocks/according/index.js");
/* harmony import */ var _gutenberg_blocks_image_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gutenberg/blocks/image-slider */ "./src/js/gutenberg/blocks/image-slider/index.js");
/* harmony import */ var _gutenberg_blocks_download_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./gutenberg/blocks/download-button */ "./src/js/gutenberg/blocks/download-button/index.js");
/* harmony import */ var _gutenberg_block_extension_register_block_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./gutenberg/block-extension/register-block-styles */ "./src/js/gutenberg/block-extension/register-block-styles.js");


//Blocks






//blocks extension

}();
/******/ })()
;
//# sourceMappingURL=blocks.js.map