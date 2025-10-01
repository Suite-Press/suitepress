/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/author/follow.js":
/*!*********************************!*\
  !*** ./src/js/author/follow.js ***!
  \*********************************/
/***/ (function() {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
(function ($) {
  var AuthorFollow = /*#__PURE__*/function () {
    function AuthorFollow() {
      _classCallCheck(this, AuthorFollow);
      this.ajaxUrl = siteConfig.ajaxUrl;
      this.nonce = siteConfig.nonce.author_follow_nonce;
      this.followButton = $("#follow-button");
      this.unfollowButton = $("#unfollow-button");
      this.followersCountEl = $("#followers-count");
      this.init();
    }
    return _createClass(AuthorFollow, [{
      key: "init",
      value: function init() {
        var _this = this;
        if (!this.followButton.length && !this.unfollowButton.length) {
          return;
        }

        // Check initial follow status on page load
        this.checkFollowStatus();
        this.followButton.on("click", function (e) {
          return _this.handleFollowClick(e);
        });
        this.unfollowButton.on("click", function (e) {
          return _this.handleUnfollowClick(e);
        });
      }
    }, {
      key: "checkFollowStatus",
      value: function checkFollowStatus() {
        var _this2 = this;
        var authorId = this.followButton.data("author-id") || this.unfollowButton.data("author-id");
        $.ajax({
          url: this.ajaxUrl,
          type: "POST",
          data: {
            action: "check_follow_status",
            author_id: authorId,
            nonce: this.nonce
          },
          success: function success(response) {
            if (response.success) {
              // Set initial button state based on follow status
              if (response.data.is_following) {
                _this2.unfollowButton.removeClass("d-none");
                _this2.followButton.addClass("d-none");
              } else {
                _this2.followButton.removeClass("d-none");
                _this2.unfollowButton.addClass("d-none");
              }

              // Update followers count
              _this2.followersCountEl.text(response.data.followers_count);
            }
          },
          error: function error() {
            console.error("Failed to check follow status.");
          }
        });
      }
    }, {
      key: "handleFollowClick",
      value: function handleFollowClick(e) {
        e.preventDefault();
        var authorId = this.followButton.data("author-id");
        this.followAuthor(authorId);
      }
    }, {
      key: "handleUnfollowClick",
      value: function handleUnfollowClick(e) {
        e.preventDefault();
        var authorId = this.unfollowButton.data("author-id");
        this.unfollowAuthor(authorId);
      }
    }, {
      key: "followAuthor",
      value: function followAuthor(authorId) {
        var _this3 = this;
        $.ajax({
          url: this.ajaxUrl,
          type: "POST",
          data: {
            action: "author_follow",
            author_id: authorId,
            nonce: this.nonce
          },
          success: function success(response) {
            return _this3.handleFollowSuccess(response);
          },
          error: function error() {
            return _this3.handleError();
          }
        });
      }
    }, {
      key: "unfollowAuthor",
      value: function unfollowAuthor(authorId) {
        var _this4 = this;
        $.ajax({
          url: this.ajaxUrl,
          type: "POST",
          data: {
            action: "author_unfollow",
            author_id: authorId,
            nonce: this.nonce
          },
          success: function success(response) {
            return _this4.handleUnfollowSuccess(response);
          },
          error: function error() {
            return _this4.handleError();
          }
        });
      }
    }, {
      key: "handleFollowSuccess",
      value: function handleFollowSuccess(response) {
        if (response.success) {
          this.followersCountEl.text(response.data.followers_count);
          this.followButton.addClass("d-none");
          this.unfollowButton.removeClass("d-none");
          showNotification("You are now following this author!");
        } else {
          showNotification(response.data.message);
        }
      }
    }, {
      key: "handleUnfollowSuccess",
      value: function handleUnfollowSuccess(response) {
        if (response.success) {
          this.followersCountEl.text(response.data.followers_count);
          this.unfollowButton.addClass("d-none");
          this.followButton.removeClass("d-none");
          showNotification("You have unfollowed this author.");
        } else {
          showNotification(response.data.message);
        }
      }
    }, {
      key: "handleError",
      value: function handleError() {
        showNotification("An error occurred. Please try again.");
      }
    }]);
  }();
  new AuthorFollow();
})(jQuery);

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
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
!function() {
"use strict";
/*!**************************!*\
  !*** ./src/js/author.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _author_follow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./author/follow */ "./src/js/author/follow.js");
/* harmony import */ var _author_follow__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_author_follow__WEBPACK_IMPORTED_MODULE_0__);

}();
/******/ })()
;
//# sourceMappingURL=author.js.map