/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/aboutPage/index.js":
/*!***********************************!*\
  !*** ./src/js/aboutPage/index.js ***!
  \***********************************/
/***/ (function() {

document.addEventListener('DOMContentLoaded', function () {
  // Counter animation
  var counters = document.querySelectorAll('.sp-stat-number');
  var animateCounters = function animateCounters() {
    counters.forEach(function (counter) {
      var target = parseInt(counter.getAttribute('data-count'));
      var duration = 2000;
      var step = target / (duration / 16);
      var current = 0;
      var _updateCounter = function updateCounter() {
        current += step;
        if (current < target) {
          counter.textContent = Math.ceil(current);
          requestAnimationFrame(_updateCounter);
        } else {
          counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
        }
      };
      _updateCounter();
    });
  };

  // Intersection Observer for counter animation
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });
  observer.observe(document.querySelector('.sp-about-hero'));
});

/***/ }),

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

/***/ }),

/***/ "./src/js/carousel/index.js":
/*!**********************************!*\
  !*** ./src/js/carousel/index.js ***!
  \**********************************/
/***/ (function() {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
(function ($) {
  var SlickCarousel = /*#__PURE__*/function () {
    function SlickCarousel() {
      _classCallCheck(this, SlickCarousel);
      this.initiateCarousel();
    }
    return _createClass(SlickCarousel, [{
      key: "initiateCarousel",
      value: function initiateCarousel() {
        $('.posts-carousel').slick({
          autoplay: true,
          autoplaySpeed: 4000,
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: true,
          prevArrow: '.prev-btn',
          nextArrow: '.next-btn',
          responsive: [{
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          }, {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }, {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }]
        });
      }
    }]);
  }();
  new SlickCarousel();
})(jQuery);

/***/ }),

/***/ "./src/js/clock/index.js":
/*!*******************************!*\
  !*** ./src/js/clock/index.js ***!
  \*******************************/
/***/ (function() {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
(function ($) {
  /**
   * Clock Class.
   */
  var Clock = /*#__PURE__*/function () {
    /**
     * Constructor
     */
    function Clock() {
      _classCallCheck(this, Clock);
      this.initializeClock();
    }

    /**
     * initializeClock
     */
    return _createClass(Clock, [{
      key: "initializeClock",
      value: function initializeClock() {
        var _this = this;
        setInterval(function () {
          return _this.time();
        }, 1000);
      }

      /**
       * Numpad
       *
       * @param {String} str String
       *
       * @return {string} String
       */
    }, {
      key: "numPad",
      value: function numPad(str) {
        var cStr = str.toString();
        if (2 > cStr.length) {
          str = 0 + cStr;
        }
        return str;
      }

      /**
       * Time
       */
    }, {
      key: "time",
      value: function time() {
        var currDate = new Date();
        var currSec = currDate.getSeconds();
        var currMin = currDate.getMinutes();
        var curr24Hr = currDate.getHours();
        var ampm = 12 <= curr24Hr ? 'pm' : 'am';
        var currHr = curr24Hr % 12;
        currHr = currHr ? currHr : 12;
        var stringTime = currHr + ':' + this.numPad(currMin) + ':' + this.numPad(currSec);
        var timeEmojiEl = $('#time-emoji');
        if (5 <= curr24Hr && 17 >= curr24Hr) {
          timeEmojiEl.text('🌞');
        } else {
          timeEmojiEl.text('🌜');
        }
        $('#time').text(stringTime);
        $('#ampm').text(ampm);
      }
    }]);
  }();
  new Clock();
})(jQuery);

/***/ }),

/***/ "./src/js/global/header/index.js":
/*!***************************************!*\
  !*** ./src/js/global/header/index.js ***!
  \***************************************/
/***/ (function() {

/**
 * Header functionality
 */

// Search popup functionality
function initHeaderFunctionality() {
  var searchToggle = document.querySelector('.search-toggle');
  var searchPopup = document.querySelector('.search-popup');
  var searchClose = document.querySelector('.search-close');
  var searchOverlay = document.querySelector('.search-popup-overlay');
  var bannerClose = document.querySelector('.banner-close');
  var topBanner = document.querySelector('.top-banner');

  // const navbarToggler = document.querySelector('.navbar-toggler');
  // const navbarCollapse = document.querySelector('.navbar-collapse');
  // if (navbarToggler && navbarCollapse) {
  //     // Optional: Add smooth transition
  //     navbarCollapse.style.transition = 'all 0.3s ease-in-out';
  //
  //     // Optional: Close menu when clicking on nav links
  //     const navLinks = navbarCollapse.querySelectorAll('.nav-link');
  //     navLinks.forEach(link => {
  //         link.addEventListener('click', function() {
  //             // Only close if it's not a dropdown toggle
  //             if (!this.classList.contains('dropdown-toggle')) {
  //                 navbarCollapse.classList.remove('show');
  //             }
  //         });
  //     });
  // }

  // const toggler = document.querySelector('.navbar-toggler');
  // const menu = document.querySelector('.navbar-collapse');
  //
  // if (toggler && menu) {
  //     toggler.addEventListener('click', function() {
  //         console.log('Toggler clicked!');
  //         menu.classList.toggle('show');
  //     });
  // }

  // Open search popup
  if (searchToggle && searchPopup) {
    searchToggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Search toggle clicked');
      searchPopup.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  // Close search popup
  function closeSearchPopup() {
    if (searchPopup) {
      searchPopup.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
  if (searchClose) {
    searchClose.addEventListener('click', closeSearchPopup);
  }
  if (searchOverlay) {
    searchOverlay.addEventListener('click', closeSearchPopup);
  }

  // Close banner
  // if (bannerClose && topBanner) {
  //     bannerClose.addEventListener('click', function() {
  //         topBanner.style.display = 'none';
  //         // Optional: Set cookie to remember closed state
  //         document.cookie = "topBannerClosed=true; max-age=" + 60*60*24; // 1 day
  //     });
  // }

  // Check if banner was previously closed
  if (document.cookie.includes('topBannerClosed=true')) {
    if (topBanner) {
      topBanner.style.display = 'none';
    }
  }

  // Close popup with Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && searchPopup && searchPopup.classList.contains('active')) {
      closeSearchPopup();
    }
  });

  // Prevent search form submission from closing popup
  var searchForm = document.querySelector('.search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.stopPropagation();
    });
  }
  var dropdowns = document.querySelectorAll('.nav-item.dropdown');
  dropdowns.forEach(function (dropdown) {
    var link = dropdown.querySelector('.nav-link');
    var menu = dropdown.querySelector('.dropdown-menu');

    // Prevent link navigation on mobile when clicking to open dropdown
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 1024) {
        // Mobile breakpoint
        e.preventDefault();
        var isOpen = menu.classList.contains('show');

        // Close all other dropdowns
        document.querySelectorAll('.dropdown-menu.show').forEach(function (openMenu) {
          if (openMenu !== menu) {
            openMenu.classList.remove('show');
          }
        });

        // Toggle current dropdown
        menu.classList.toggle('show');
      }
      // On desktop, the link will navigate normally due to hover CSS
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (e) {
      if (!dropdown.contains(e.target)) {
        menu.classList.remove('show');
      }
    });
  });

  // Close dropdowns on window resize
  window.addEventListener('resize', function () {
    document.querySelectorAll('.dropdown-menu.show').forEach(function (menu) {
      menu.classList.remove('show');
    });
  });
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeaderFunctionality);
} else {
  initHeaderFunctionality();
}

/***/ }),

/***/ "./src/js/gutenberg/blocks/according/scripts.js":
/*!******************************************************!*\
  !*** ./src/js/gutenberg/blocks/according/scripts.js ***!
  \******************************************************/
/***/ (function() {

/**
 * Accordion Frontend Script
 * File: assets/src/js/accordion-scripts.js
 *
 * This handles the accordion functionality on the frontend
 * Only the first item is open by default
 */

document.addEventListener('DOMContentLoaded', function () {
  var accordions = document.querySelectorAll('.suitepress-accordion');
  accordions.forEach(function (accordion) {
    var items = accordion.querySelectorAll('.accordion-item');
    items.forEach(function (item, index) {
      var header = item.querySelector('.accordion-header-item');
      var content = item.querySelector('.accordion-content');
      var icon = item.querySelector('.accordion-icon');

      // Set initial state - only first item open
      var isOpen = item.getAttribute('data-open') === 'true';
      if (isOpen) {
        // Open state
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.textContent = '−';
      } else {
        // Closed state
        content.style.maxHeight = '0';
        icon.textContent = '+';
      }

      // Click handler
      header.addEventListener('click', function () {
        var isCurrentlyOpen = item.getAttribute('data-open') === 'true';
        if (isCurrentlyOpen) {
          // Close
          content.style.maxHeight = '0';
          icon.textContent = '+';
          item.setAttribute('data-open', 'false');
        } else {
          // Open
          content.style.maxHeight = content.scrollHeight + 'px';
          icon.textContent = '−';
          item.setAttribute('data-open', 'true');
        }
      });

      // Recalculate height on window resize (only for open items)
      var resizeTimer;
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          if (item.getAttribute('data-open') === 'true') {
            content.style.maxHeight = content.scrollHeight + 'px';
          }
        }, 250);
      });
    });
  });
});

/***/ }),

/***/ "./src/js/gutenberg/blocks/download-button/scripts.js":
/*!************************************************************!*\
  !*** ./src/js/gutenberg/blocks/download-button/scripts.js ***!
  \************************************************************/
/***/ (function() {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Download Button Frontend Script - Simple click to download
 * File: assets/src/js/gutenberg/blocks/download-button/scripts.js
 */

document.addEventListener('DOMContentLoaded', function () {
  var downloadButtons = document.querySelectorAll('.suitepress-download-button');
  downloadButtons.forEach(function (container) {
    var triggerBtn = container.querySelector('.suitepress-download-trigger');
    if (!triggerBtn) {
      console.error('Download trigger button not found');
      return;
    }
    var downloadType = container.getAttribute('data-download-type') || 'zip';

    // Helper function to ensure HTTPS URLs (fix mixed content issues)
    function ensureHttpsUrl(url) {
      if (!url) return url;

      // If page is HTTPS, convert HTTP URLs to HTTPS
      if (window.location.protocol === 'https:' && url.startsWith('http://')) {
        return url.replace('http://', 'https://');
      }

      // If URL is protocol-relative (starts with //), use current protocol
      if (url.startsWith('//')) {
        return window.location.protocol + url;
      }
      return url;
    }

    // Parse file data from the block
    var files = [];
    try {
      var filesData = triggerBtn.getAttribute('data-files') || '[]';
      files = JSON.parse(filesData);

      // Validate files array
      if (!Array.isArray(files)) {
        console.error('Files data is not an array:', files);
        files = [];
      }

      // Filter out files without URLs and normalize URLs to HTTPS
      files = files.map(function (file) {
        if (file && file.url) {
          return _objectSpread(_objectSpread({}, file), {}, {
            url: ensureHttpsUrl(file.url)
          });
        }
        return file;
      }).filter(function (file) {
        return file && file.url;
      });
      if (files.length === 0) {
        console.warn('No valid files found in block data');
        triggerBtn.disabled = true;
        triggerBtn.textContent = 'No files available';
        return;
      }
    } catch (error) {
      console.error('Error parsing files data:', error);
      files = [];
      triggerBtn.disabled = true;
      return;
    }

    // Download single file directly
    function downloadSingleFile(_x) {
      return _downloadSingleFile.apply(this, arguments);
    } // Download as ZIP
    function _downloadSingleFile() {
      _downloadSingleFile = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(file) {
        var fileUrl, fileName, response, blob, blobUrl, link, _link;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (file.url) {
                _context.next = 2;
                break;
              }
              throw new Error('File URL is missing');
            case 2:
              // Ensure HTTPS URL
              fileUrl = ensureHttpsUrl(file.url);
              fileName = file.name || fileUrl.split('/').pop().split('?')[0] || "file-".concat(file.id);
              _context.prev = 4;
              _context.next = 7;
              return fetch(fileUrl, {
                method: 'GET',
                credentials: 'same-origin',
                mode: 'cors'
              });
            case 7:
              response = _context.sent;
              if (response.ok) {
                _context.next = 10;
                break;
              }
              throw new Error("HTTP error! status: ".concat(response.status));
            case 10:
              _context.next = 12;
              return response.blob();
            case 12:
              blob = _context.sent;
              blobUrl = URL.createObjectURL(blob);
              link = document.createElement('a');
              link.href = blobUrl;
              link.download = fileName;
              link.style.display = 'none';
              document.body.appendChild(link);

              // Trigger download
              link.click();

              // Clean up after a short delay
              setTimeout(function () {
                document.body.removeChild(link);
                URL.revokeObjectURL(blobUrl);
              }, 100);
              _context.next = 33;
              break;
            case 23:
              _context.prev = 23;
              _context.t0 = _context["catch"](4);
              console.error("Failed to download ".concat(fileName, ":"), _context.t0);
              // Fallback: try direct link download (using HTTPS URL)
              _link = document.createElement('a');
              _link.href = fileUrl;
              _link.download = fileName;
              _link.style.display = 'none';
              document.body.appendChild(_link);
              _link.click();
              setTimeout(function () {
                document.body.removeChild(_link);
              }, 100);
            case 33:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[4, 23]]);
      }));
      return _downloadSingleFile.apply(this, arguments);
    }
    function downloadAsZip() {
      return _downloadAsZip.apply(this, arguments);
    } // Download individual files
    function _downloadAsZip() {
      _downloadAsZip = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var zip, _iterator, _step, file, fileUrl, response, blob, fileName, zipBlob, zipUrl, link;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (!(typeof JSZip === 'undefined')) {
                _context2.next = 3;
                break;
              }
              _context2.next = 3;
              return loadJSZip();
            case 3:
              zip = new JSZip(); // Add files to zip
              _iterator = _createForOfIteratorHelper(files);
              _context2.prev = 5;
              _iterator.s();
            case 7:
              if ((_step = _iterator.n()).done) {
                _context2.next = 29;
                break;
              }
              file = _step.value;
              if (!file.url) {
                _context2.next = 27;
                break;
              }
              _context2.prev = 10;
              // Ensure HTTPS URL
              fileUrl = ensureHttpsUrl(file.url);
              _context2.next = 14;
              return fetch(fileUrl, {
                method: 'GET',
                credentials: 'same-origin',
                mode: 'cors'
              });
            case 14:
              response = _context2.sent;
              if (response.ok) {
                _context2.next = 17;
                break;
              }
              throw new Error("HTTP error! status: ".concat(response.status));
            case 17:
              _context2.next = 19;
              return response.blob();
            case 19:
              blob = _context2.sent;
              fileName = file.name || fileUrl.split('/').pop().split('?')[0] || "file-".concat(file.id);
              zip.file(fileName, blob);
              _context2.next = 27;
              break;
            case 24:
              _context2.prev = 24;
              _context2.t0 = _context2["catch"](10);
              console.error("Failed to fetch file ".concat(file.name || file.url, ":"), _context2.t0);
            case 27:
              _context2.next = 7;
              break;
            case 29:
              _context2.next = 34;
              break;
            case 31:
              _context2.prev = 31;
              _context2.t1 = _context2["catch"](5);
              _iterator.e(_context2.t1);
            case 34:
              _context2.prev = 34;
              _iterator.f();
              return _context2.finish(34);
            case 37:
              if (!(Object.keys(zip.files).length === 0)) {
                _context2.next = 39;
                break;
              }
              throw new Error('No files could be added to the ZIP archive.');
            case 39:
              _context2.next = 41;
              return zip.generateAsync({
                type: 'blob'
              });
            case 41:
              zipBlob = _context2.sent;
              zipUrl = URL.createObjectURL(zipBlob);
              link = document.createElement('a');
              link.href = zipUrl;
              link.download = "download-".concat(Date.now(), ".zip");
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);

              // Clean up
              URL.revokeObjectURL(zipUrl);
            case 50:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[5, 31, 34, 37], [10, 24]]);
      }));
      return _downloadAsZip.apply(this, arguments);
    }
    function downloadIndividualFiles() {
      return _downloadIndividualFiles.apply(this, arguments);
    } // Load JSZip library
    function _downloadIndividualFiles() {
      _downloadIndividualFiles = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var _iterator2, _step2, file;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _iterator2 = _createForOfIteratorHelper(files);
              _context3.prev = 1;
              _iterator2.s();
            case 3:
              if ((_step2 = _iterator2.n()).done) {
                _context3.next = 12;
                break;
              }
              file = _step2.value;
              if (!file.url) {
                _context3.next = 10;
                break;
              }
              _context3.next = 8;
              return downloadSingleFile(file);
            case 8:
              _context3.next = 10;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 300);
              });
            case 10:
              _context3.next = 3;
              break;
            case 12:
              _context3.next = 17;
              break;
            case 14:
              _context3.prev = 14;
              _context3.t0 = _context3["catch"](1);
              _iterator2.e(_context3.t0);
            case 17:
              _context3.prev = 17;
              _iterator2.f();
              return _context3.finish(17);
            case 20:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[1, 14, 17, 20]]);
      }));
      return _downloadIndividualFiles.apply(this, arguments);
    }
    function loadJSZip() {
      return new Promise(function (resolve, reject) {
        if (typeof JSZip !== 'undefined') {
          resolve();
          return;
        }
        var script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
        script.onload = resolve;
        script.onerror = function () {
          return reject(new Error('Failed to load JSZip library'));
        };
        document.head.appendChild(script);
      });
    }

    // Main download function
    function downloadFiles() {
      return _downloadFiles.apply(this, arguments);
    } // Simple click handler - just download
    function _downloadFiles() {
      _downloadFiles = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              if (!(files.length === 0)) {
                _context4.next = 3;
                break;
              }
              console.error('No files available for download');
              return _context4.abrupt("return");
            case 3:
              _context4.prev = 3;
              triggerBtn.classList.add('loading');
              triggerBtn.disabled = true;

              // If single file, download directly
              if (!(files.length === 1)) {
                _context4.next = 11;
                break;
              }
              _context4.next = 9;
              return downloadSingleFile(files[0]);
            case 9:
              _context4.next = 18;
              break;
            case 11:
              if (!(downloadType === 'zip')) {
                _context4.next = 16;
                break;
              }
              _context4.next = 14;
              return downloadAsZip();
            case 14:
              _context4.next = 18;
              break;
            case 16:
              _context4.next = 18;
              return downloadIndividualFiles();
            case 18:
              _context4.next = 24;
              break;
            case 20:
              _context4.prev = 20;
              _context4.t0 = _context4["catch"](3);
              console.error('Download error:', _context4.t0);
              alert('Download failed. Please try again.');
            case 24:
              _context4.prev = 24;
              triggerBtn.classList.remove('loading');
              triggerBtn.disabled = false;
              return _context4.finish(24);
            case 28:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[3, 20, 24, 28]]);
      }));
      return _downloadFiles.apply(this, arguments);
    }
    triggerBtn.addEventListener('click', function (e) {
      e.preventDefault();
      downloadFiles();
    });
  });
});

/***/ }),

/***/ "./src/js/gutenberg/blocks/image-slider/scripts.js":
/*!*********************************************************!*\
  !*** ./src/js/gutenberg/blocks/image-slider/scripts.js ***!
  \*********************************************************/
/***/ (function() {

/**
 * Swiper Frontend Script
 * File: assets/src/js/swiper-scripts.js
 *
 * This handles the swiper slider functionality on the frontend
 * Requires Swiper library to be enqueued
 */

document.addEventListener('DOMContentLoaded', function () {
  var sliders = document.querySelectorAll('.suitepress-swiper');

  // Load Swiper CSS and JS dynamically if not already loaded
  function loadSwiperAssets() {
    return new Promise(function (resolve) {
      if (typeof Swiper !== 'undefined') {
        resolve();
        return;
      }

      // Load Swiper CSS
      var cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
      document.head.appendChild(cssLink);

      // Load Swiper JS
      var jsScript = document.createElement('script');
      jsScript.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
      jsScript.onload = resolve;
      document.head.appendChild(jsScript);
    });
  }
  function initializeSliders() {
    sliders.forEach(function (slider, index) {
      var effect = slider.getAttribute('data-effect') || 'slide';
      var autoplay = slider.getAttribute('data-autoplay') === 'true';
      var delay = parseInt(slider.getAttribute('data-delay')) || 3000;
      var loop = slider.getAttribute('data-loop') === 'true';
      var navigation = slider.getAttribute('data-navigation') === 'true';
      var pagination = slider.getAttribute('data-pagination') === 'true';
      var slidesPerView = parseInt(slider.getAttribute('data-slides-per-view')) || 1;
      var spaceBetween = parseInt(slider.getAttribute('data-space-between')) || 30;
      var swiperConfig = {
        effect: effect,
        loop: loop,
        slidesPerView: slidesPerView,
        spaceBetween: spaceBetween,
        speed: 600,
        grabCursor: true,
        // Autoplay
        autoplay: autoplay ? {
          delay: delay,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        } : false,
        // Navigation
        navigation: navigation ? {
          nextEl: slider.querySelector('.swiper-button-next'),
          prevEl: slider.querySelector('.swiper-button-prev')
        } : false,
        // Pagination
        pagination: pagination ? {
          el: slider.querySelector('.swiper-pagination'),
          clickable: true,
          dynamicBullets: true
        } : false,
        // Effect-specific settings
        coverflowEffect: effect === 'coverflow' ? {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        } : {},
        cubeEffect: effect === 'cube' ? {
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94
        } : {},
        flipEffect: effect === 'flip' ? {
          slideShadows: true,
          limitRotation: true
        } : {},
        fadeEffect: effect === 'fade' ? {
          crossFade: true
        } : {},
        // Breakpoints for responsive design
        breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: Math.min(1, slidesPerView),
            spaceBetween: 10
          },
          // when window width is >= 768px
          768: {
            slidesPerView: Math.min(2, slidesPerView),
            spaceBetween: 20
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: slidesPerView,
            spaceBetween: spaceBetween
          }
        },
        // Accessibility
        a11y: {
          prevSlideMessage: 'Previous slide',
          nextSlideMessage: 'Next slide',
          firstSlideMessage: 'This is the first slide',
          lastSlideMessage: 'This is the last slide',
          paginationBulletMessage: 'Go to slide {{index}}'
        }
      };

      // Initialize Swiper
      var swiper = new Swiper(slider, swiperConfig);

      // Add resize observer to update slider on container resize
      var resizeObserver = new ResizeObserver(function () {
        swiper.update();
      });
      resizeObserver.observe(slider);

      // Lazy load images
      var images = slider.querySelectorAll('img');
      images.forEach(function (img) {
        if (!img.loading) {
          img.loading = 'lazy';
        }
      });
    });
  }

  // Initialize sliders when Swiper is loaded
  loadSwiperAssets().then(function () {
    if (typeof Swiper !== 'undefined') {
      initializeSliders();
    }
  }).catch(function (error) {
    console.error('Error loading Swiper:', error);
  });
});

/***/ }),

/***/ "./src/js/homePage/index.js":
/*!**********************************!*\
  !*** ./src/js/homePage/index.js ***!
  \**********************************/
/***/ (function() {

document.addEventListener('DOMContentLoaded', function () {
  var words = ['Technical Blogs', 'Tech Tutorials', 'Free plugins', 'Free Addons', 'Free WP Support', 'WP Tips'];
  var typingElement = document.getElementById('typing-text');
  var wordIndex = 0;
  var charIndex = 0;
  var isDeleting = false;
  var typeSpeed = 100;
  function typeWriter() {
    var currentWord = words[wordIndex];
    if (isDeleting) {
      // Deleting text
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50; // Faster when deleting
    } else {
      // Typing text
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100; // Normal typing speed
    }

    // If word is complete
    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at the end of the word
      typeSpeed = 2000; // 2 second pause
      isDeleting = true;
    }
    // If word is completely deleted
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500; // Pause before starting next word
    }
    setTimeout(typeWriter, typeSpeed);
  }

  // Start the typing effect
  typeWriter();
});

/***/ }),

/***/ "./src/js/posts/loadmore.js":
/*!**********************************!*\
  !*** ./src/js/posts/loadmore.js ***!
  \**********************************/
/***/ (function() {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
(function ($) {
  var LoadMore = /*#__PURE__*/function () {
    function LoadMore() {
      var _siteConfig$ajaxUrl, _siteConfig;
      _classCallCheck(this, LoadMore);
      this.ajaxUrl = (_siteConfig$ajaxUrl = (_siteConfig = siteConfig) === null || _siteConfig === void 0 ? void 0 : _siteConfig.ajaxUrl) !== null && _siteConfig$ajaxUrl !== void 0 ? _siteConfig$ajaxUrl : '';
      this.ajaxNonce = siteConfig.nonce.loadmore_post_nonce;
      this.loadMoreBtn = $('#load-more');
      this.loadingTextEl = $('#loading-text');
      this.isRequestProcessing = false;
      this.options = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
      };
      this.init();
    }
    return _createClass(LoadMore, [{
      key: "init",
      value: function init() {
        var _this = this;
        if (!this.loadMoreBtn.length) {
          return;
        }
        this.totalPagesCount = $('#post-pagination').data('max-pages');
        var observer = new IntersectionObserver(function (entries) {
          return _this.intersectionObserverCallback(entries);
        }, this.options);
        observer.observe(this.loadMoreBtn[0]);
      }
    }, {
      key: "intersectionObserverCallback",
      value: function intersectionObserverCallback(entries) {
        var _this2 = this;
        entries.forEach(function (entry) {
          if (entry !== null && entry !== void 0 && entry.isIntersecting) {
            _this2.handleLoadMorePosts();
          }
        });
      }
    }, {
      key: "handleLoadMorePosts",
      value: function handleLoadMorePosts() {
        var _this3 = this;
        // Get page no from data attribute of load-more button.
        var page = this.loadMoreBtn.data('page');
        if (!page || this.isRequestProcessing) {
          return null;
        }
        var nextPage = parseInt(page) + 1; // Increment page count by one.
        this.isRequestProcessing = true;
        $.ajax({
          url: this.ajaxUrl,
          type: 'post',
          data: {
            page: page,
            action: 'load_more',
            ajax_nonce: this.ajaxNonce
          },
          success: function success(response) {
            _this3.loadMoreBtn.data('page', nextPage);
            $('#load-more-content').append(response);
            _this3.removeLoadMoreIfOnLastPage(nextPage);
            _this3.isRequestProcessing = false;
          },
          error: function error(response) {
            console.log(response);
            _this3.isRequestProcessing = false;
          }
        });
      }
    }, {
      key: "removeLoadMoreIfOnLastPage",
      value: function removeLoadMoreIfOnLastPage(nextPage) {
        if (nextPage + 1 > this.totalPagesCount) {
          this.loadMoreBtn.remove();
        }
      }
    }]);
  }();
  new LoadMore();
})(jQuery);

/***/ }),

/***/ "./src/js/search-result/index.js":
/*!***************************************!*\
  !*** ./src/js/search-result/index.js ***!
  \***************************************/
/***/ (function() {

jQuery(document).ready(function ($) {
  $(".share-trigger").on("click", function () {
    var $shareOptions = $(this).siblings(".share-options");
    $shareOptions.toggle();
  });
  $(".share-btn").on("click", function () {
    var _this = this;
    var postLink = $(this).data("post-link");
    navigator.clipboard.writeText(postLink).then(function () {
      var $successMessage = $("<span>").text("Link copied!").css({
        color: "green",
        marginLeft: "10px"
      });
      $(_this).parent().append($successMessage);
      setTimeout(function () {
        return $successMessage.remove();
      }, 2000);
    }).catch(function (err) {
      console.error("Failed to copy link: ", err);
    });
  });
});

/***/ }),

/***/ "./src/js/zustand.js":
/*!***************************!*\
  !*** ./src/js/zustand.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var zustand_vanilla__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zustand/vanilla */ "./node_modules/zustand/esm/vanilla.mjs");
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zustand/middleware */ "./node_modules/zustand/esm/middleware.mjs");


var stores = [];
var zustand = {
  persist: zustand_middleware__WEBPACK_IMPORTED_MODULE_0__.persist,
  createStore: zustand_vanilla__WEBPACK_IMPORTED_MODULE_1__.createStore,
  stores: stores
};
window.zustand = zustand;

/***/ }),

/***/ "./src/img/250x80.png":
/*!****************************!*\
  !*** ./src/img/250x80.png ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("../../src/img/250x80.png");

/***/ }),

/***/ "./src/img/patterns/cover.jpg":
/*!************************************!*\
  !*** ./src/img/patterns/cover.jpg ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("../../src/img/patterns/cover.jpg");

/***/ }),

/***/ "./src/img/patterns/david.png":
/*!************************************!*\
  !*** ./src/img/patterns/david.png ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("../../src/img/patterns/david.png");

/***/ }),

/***/ "./src/img/patterns/misa.png":
/*!***********************************!*\
  !*** ./src/img/patterns/misa.png ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("../../src/img/patterns/misa.png");

/***/ }),

/***/ "./src/img/patterns/ruman.jpg":
/*!************************************!*\
  !*** ./src/img/patterns/ruman.jpg ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("../../src/img/patterns/ruman.jpg");

/***/ }),

/***/ "./src/sass/main.scss":
/*!****************************!*\
  !*** ./src/sass/main.scss ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/zustand/esm/middleware.mjs":
/*!*************************************************!*\
  !*** ./node_modules/zustand/esm/middleware.mjs ***!
  \*************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   combine: function() { return /* binding */ combine; },
/* harmony export */   createJSONStorage: function() { return /* binding */ createJSONStorage; },
/* harmony export */   devtools: function() { return /* binding */ devtools; },
/* harmony export */   persist: function() { return /* binding */ persist; },
/* harmony export */   redux: function() { return /* binding */ redux; },
/* harmony export */   subscribeWithSelector: function() { return /* binding */ subscribeWithSelector; }
/* harmony export */ });
const reduxImpl = (reducer, initial) => (set, _get, api) => {
  api.dispatch = (action) => {
    set((state) => reducer(state, action), false, action);
    return action;
  };
  api.dispatchFromDevtools = true;
  return { dispatch: (...a) => api.dispatch(...a), ...initial };
};
const redux = reduxImpl;

const trackedConnections = /* @__PURE__ */ new Map();
const getTrackedConnectionState = (name) => {
  const api = trackedConnections.get(name);
  if (!api) return {};
  return Object.fromEntries(
    Object.entries(api.stores).map(([key, api2]) => [key, api2.getState()])
  );
};
const extractConnectionInformation = (store, extensionConnector, options) => {
  if (store === void 0) {
    return {
      type: "untracked",
      connection: extensionConnector.connect(options)
    };
  }
  const existingConnection = trackedConnections.get(options.name);
  if (existingConnection) {
    return { type: "tracked", store, ...existingConnection };
  }
  const newConnection = {
    connection: extensionConnector.connect(options),
    stores: {}
  };
  trackedConnections.set(options.name, newConnection);
  return { type: "tracked", store, ...newConnection };
};
const devtoolsImpl = (fn, devtoolsOptions = {}) => (set, get, api) => {
  const { enabled, anonymousActionType, store, ...options } = devtoolsOptions;
  let extensionConnector;
  try {
    extensionConnector = (enabled != null ? enabled : ( false ? 0 : void 0) !== "production") && window.__REDUX_DEVTOOLS_EXTENSION__;
  } catch (e) {
  }
  if (!extensionConnector) {
    return fn(set, get, api);
  }
  const { connection, ...connectionInformation } = extractConnectionInformation(store, extensionConnector, options);
  let isRecording = true;
  api.setState = (state, replace, nameOrAction) => {
    const r = set(state, replace);
    if (!isRecording) return r;
    const action = nameOrAction === void 0 ? { type: anonymousActionType || "anonymous" } : typeof nameOrAction === "string" ? { type: nameOrAction } : nameOrAction;
    if (store === void 0) {
      connection == null ? void 0 : connection.send(action, get());
      return r;
    }
    connection == null ? void 0 : connection.send(
      {
        ...action,
        type: `${store}/${action.type}`
      },
      {
        ...getTrackedConnectionState(options.name),
        [store]: api.getState()
      }
    );
    return r;
  };
  const setStateFromDevtools = (...a) => {
    const originalIsRecording = isRecording;
    isRecording = false;
    set(...a);
    isRecording = originalIsRecording;
  };
  const initialState = fn(api.setState, get, api);
  if (connectionInformation.type === "untracked") {
    connection == null ? void 0 : connection.init(initialState);
  } else {
    connectionInformation.stores[connectionInformation.store] = api;
    connection == null ? void 0 : connection.init(
      Object.fromEntries(
        Object.entries(connectionInformation.stores).map(([key, store2]) => [
          key,
          key === connectionInformation.store ? initialState : store2.getState()
        ])
      )
    );
  }
  if (api.dispatchFromDevtools && typeof api.dispatch === "function") {
    let didWarnAboutReservedActionType = false;
    const originalDispatch = api.dispatch;
    api.dispatch = (...a) => {
      if (( false ? 0 : void 0) !== "production" && a[0].type === "__setState" && !didWarnAboutReservedActionType) {
        console.warn(
          '[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.'
        );
        didWarnAboutReservedActionType = true;
      }
      originalDispatch(...a);
    };
  }
  connection.subscribe((message) => {
    var _a;
    switch (message.type) {
      case "ACTION":
        if (typeof message.payload !== "string") {
          console.error(
            "[zustand devtools middleware] Unsupported action format"
          );
          return;
        }
        return parseJsonThen(
          message.payload,
          (action) => {
            if (action.type === "__setState") {
              if (store === void 0) {
                setStateFromDevtools(action.state);
                return;
              }
              if (Object.keys(action.state).length !== 1) {
                console.error(
                  `
                    [zustand devtools middleware] Unsupported __setState action format.
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `
                );
              }
              const stateFromDevtools = action.state[store];
              if (stateFromDevtools === void 0 || stateFromDevtools === null) {
                return;
              }
              if (JSON.stringify(api.getState()) !== JSON.stringify(stateFromDevtools)) {
                setStateFromDevtools(stateFromDevtools);
              }
              return;
            }
            if (!api.dispatchFromDevtools) return;
            if (typeof api.dispatch !== "function") return;
            api.dispatch(action);
          }
        );
      case "DISPATCH":
        switch (message.payload.type) {
          case "RESET":
            setStateFromDevtools(initialState);
            if (store === void 0) {
              return connection == null ? void 0 : connection.init(api.getState());
            }
            return connection == null ? void 0 : connection.init(getTrackedConnectionState(options.name));
          case "COMMIT":
            if (store === void 0) {
              connection == null ? void 0 : connection.init(api.getState());
              return;
            }
            return connection == null ? void 0 : connection.init(getTrackedConnectionState(options.name));
          case "ROLLBACK":
            return parseJsonThen(message.state, (state) => {
              if (store === void 0) {
                setStateFromDevtools(state);
                connection == null ? void 0 : connection.init(api.getState());
                return;
              }
              setStateFromDevtools(state[store]);
              connection == null ? void 0 : connection.init(getTrackedConnectionState(options.name));
            });
          case "JUMP_TO_STATE":
          case "JUMP_TO_ACTION":
            return parseJsonThen(message.state, (state) => {
              if (store === void 0) {
                setStateFromDevtools(state);
                return;
              }
              if (JSON.stringify(api.getState()) !== JSON.stringify(state[store])) {
                setStateFromDevtools(state[store]);
              }
            });
          case "IMPORT_STATE": {
            const { nextLiftedState } = message.payload;
            const lastComputedState = (_a = nextLiftedState.computedStates.slice(-1)[0]) == null ? void 0 : _a.state;
            if (!lastComputedState) return;
            if (store === void 0) {
              setStateFromDevtools(lastComputedState);
            } else {
              setStateFromDevtools(lastComputedState[store]);
            }
            connection == null ? void 0 : connection.send(
              null,
              // FIXME no-any
              nextLiftedState
            );
            return;
          }
          case "PAUSE_RECORDING":
            return isRecording = !isRecording;
        }
        return;
    }
  });
  return initialState;
};
const devtools = devtoolsImpl;
const parseJsonThen = (stringified, f) => {
  let parsed;
  try {
    parsed = JSON.parse(stringified);
  } catch (e) {
    console.error(
      "[zustand devtools middleware] Could not parse the received json",
      e
    );
  }
  if (parsed !== void 0) f(parsed);
};

const subscribeWithSelectorImpl = (fn) => (set, get, api) => {
  const origSubscribe = api.subscribe;
  api.subscribe = (selector, optListener, options) => {
    let listener = selector;
    if (optListener) {
      const equalityFn = (options == null ? void 0 : options.equalityFn) || Object.is;
      let currentSlice = selector(api.getState());
      listener = (state) => {
        const nextSlice = selector(state);
        if (!equalityFn(currentSlice, nextSlice)) {
          const previousSlice = currentSlice;
          optListener(currentSlice = nextSlice, previousSlice);
        }
      };
      if (options == null ? void 0 : options.fireImmediately) {
        optListener(currentSlice, currentSlice);
      }
    }
    return origSubscribe(listener);
  };
  const initialState = fn(set, get, api);
  return initialState;
};
const subscribeWithSelector = subscribeWithSelectorImpl;

const combine = (initialState, create) => (...a) => Object.assign({}, initialState, create(...a));

function createJSONStorage(getStorage, options) {
  let storage;
  try {
    storage = getStorage();
  } catch (e) {
    return;
  }
  const persistStorage = {
    getItem: (name) => {
      var _a;
      const parse = (str2) => {
        if (str2 === null) {
          return null;
        }
        return JSON.parse(str2, options == null ? void 0 : options.reviver);
      };
      const str = (_a = storage.getItem(name)) != null ? _a : null;
      if (str instanceof Promise) {
        return str.then(parse);
      }
      return parse(str);
    },
    setItem: (name, newValue) => storage.setItem(
      name,
      JSON.stringify(newValue, options == null ? void 0 : options.replacer)
    ),
    removeItem: (name) => storage.removeItem(name)
  };
  return persistStorage;
}
const toThenable = (fn) => (input) => {
  try {
    const result = fn(input);
    if (result instanceof Promise) {
      return result;
    }
    return {
      then(onFulfilled) {
        return toThenable(onFulfilled)(result);
      },
      catch(_onRejected) {
        return this;
      }
    };
  } catch (e) {
    return {
      then(_onFulfilled) {
        return this;
      },
      catch(onRejected) {
        return toThenable(onRejected)(e);
      }
    };
  }
};
const persistImpl = (config, baseOptions) => (set, get, api) => {
  let options = {
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => state,
    version: 0,
    merge: (persistedState, currentState) => ({
      ...currentState,
      ...persistedState
    }),
    ...baseOptions
  };
  let hasHydrated = false;
  const hydrationListeners = /* @__PURE__ */ new Set();
  const finishHydrationListeners = /* @__PURE__ */ new Set();
  let storage = options.storage;
  if (!storage) {
    return config(
      (...args) => {
        console.warn(
          `[zustand persist middleware] Unable to update item '${options.name}', the given storage is currently unavailable.`
        );
        set(...args);
      },
      get,
      api
    );
  }
  const setItem = () => {
    const state = options.partialize({ ...get() });
    return storage.setItem(options.name, {
      state,
      version: options.version
    });
  };
  const savedSetState = api.setState;
  api.setState = (state, replace) => {
    savedSetState(state, replace);
    void setItem();
  };
  const configResult = config(
    (...args) => {
      set(...args);
      void setItem();
    },
    get,
    api
  );
  api.getInitialState = () => configResult;
  let stateFromStorage;
  const hydrate = () => {
    var _a, _b;
    if (!storage) return;
    hasHydrated = false;
    hydrationListeners.forEach((cb) => {
      var _a2;
      return cb((_a2 = get()) != null ? _a2 : configResult);
    });
    const postRehydrationCallback = ((_b = options.onRehydrateStorage) == null ? void 0 : _b.call(options, (_a = get()) != null ? _a : configResult)) || void 0;
    return toThenable(storage.getItem.bind(storage))(options.name).then((deserializedStorageValue) => {
      if (deserializedStorageValue) {
        if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options.version) {
          if (options.migrate) {
            const migration = options.migrate(
              deserializedStorageValue.state,
              deserializedStorageValue.version
            );
            if (migration instanceof Promise) {
              return migration.then((result) => [true, result]);
            }
            return [true, migration];
          }
          console.error(
            `State loaded from storage couldn't be migrated since no migrate function was provided`
          );
        } else {
          return [false, deserializedStorageValue.state];
        }
      }
      return [false, void 0];
    }).then((migrationResult) => {
      var _a2;
      const [migrated, migratedState] = migrationResult;
      stateFromStorage = options.merge(
        migratedState,
        (_a2 = get()) != null ? _a2 : configResult
      );
      set(stateFromStorage, true);
      if (migrated) {
        return setItem();
      }
    }).then(() => {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(stateFromStorage, void 0);
      stateFromStorage = get();
      hasHydrated = true;
      finishHydrationListeners.forEach((cb) => cb(stateFromStorage));
    }).catch((e) => {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e);
    });
  };
  api.persist = {
    setOptions: (newOptions) => {
      options = {
        ...options,
        ...newOptions
      };
      if (newOptions.storage) {
        storage = newOptions.storage;
      }
    },
    clearStorage: () => {
      storage == null ? void 0 : storage.removeItem(options.name);
    },
    getOptions: () => options,
    rehydrate: () => hydrate(),
    hasHydrated: () => hasHydrated,
    onHydrate: (cb) => {
      hydrationListeners.add(cb);
      return () => {
        hydrationListeners.delete(cb);
      };
    },
    onFinishHydration: (cb) => {
      finishHydrationListeners.add(cb);
      return () => {
        finishHydrationListeners.delete(cb);
      };
    }
  };
  if (!options.skipHydration) {
    hydrate();
  }
  return stateFromStorage || configResult;
};
const persist = persistImpl;




/***/ }),

/***/ "./node_modules/zustand/esm/vanilla.mjs":
/*!**********************************************!*\
  !*** ./node_modules/zustand/esm/vanilla.mjs ***!
  \**********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createStore: function() { return /* binding */ createStore; }
/* harmony export */ });
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const api = { setState, getState, getInitialState, subscribe };
  const initialState = state = createState(setState, getState, api);
  return api;
};
const createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;




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
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _global_header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global/header */ "./src/js/global/header/index.js");
/* harmony import */ var _global_header__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_global_header__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _clock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clock */ "./src/js/clock/index.js");
/* harmony import */ var _clock__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_clock__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _sass_main_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sass/main.scss */ "./src/sass/main.scss");
/* harmony import */ var _img_250x80_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../img/250x80.png */ "./src/img/250x80.png");
/* harmony import */ var _img_patterns_cover_jpg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../img/patterns/cover.jpg */ "./src/img/patterns/cover.jpg");
/* harmony import */ var _img_patterns_david_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../img/patterns/david.png */ "./src/img/patterns/david.png");
/* harmony import */ var _img_patterns_misa_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../img/patterns/misa.png */ "./src/img/patterns/misa.png");
/* harmony import */ var _img_patterns_ruman_jpg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../img/patterns/ruman.jpg */ "./src/img/patterns/ruman.jpg");
/* harmony import */ var _search_result_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./search-result/index */ "./src/js/search-result/index.js");
/* harmony import */ var _search_result_index__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_search_result_index__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _posts_loadmore__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./posts/loadmore */ "./src/js/posts/loadmore.js");
/* harmony import */ var _posts_loadmore__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_posts_loadmore__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _author_follow__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./author/follow */ "./src/js/author/follow.js");
/* harmony import */ var _author_follow__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_author_follow__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _carousel__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./carousel */ "./src/js/carousel/index.js");
/* harmony import */ var _carousel__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_carousel__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _zustand__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./zustand */ "./src/js/zustand.js");
/* harmony import */ var _homePage__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./homePage */ "./src/js/homePage/index.js");
/* harmony import */ var _homePage__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_homePage__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _gutenberg_blocks_according_scripts__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./gutenberg/blocks/according/scripts */ "./src/js/gutenberg/blocks/according/scripts.js");
/* harmony import */ var _gutenberg_blocks_according_scripts__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_gutenberg_blocks_according_scripts__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _gutenberg_blocks_image_slider_scripts__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./gutenberg/blocks/image-slider/scripts */ "./src/js/gutenberg/blocks/image-slider/scripts.js");
/* harmony import */ var _gutenberg_blocks_image_slider_scripts__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_gutenberg_blocks_image_slider_scripts__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _gutenberg_blocks_download_button_scripts__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./gutenberg/blocks/download-button/scripts */ "./src/js/gutenberg/blocks/download-button/scripts.js");
/* harmony import */ var _gutenberg_blocks_download_button_scripts__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_gutenberg_blocks_download_button_scripts__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _aboutPage__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./aboutPage */ "./src/js/aboutPage/index.js");
/* harmony import */ var _aboutPage__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_aboutPage__WEBPACK_IMPORTED_MODULE_17__);
//Header jS


//Import JS


//styles


//Import Image






//search result JS


//Post load more


//Author Follow Button


//styles


//carousel js


//Zustand


// Home page JS


// According Blocks JS Frontend


// Image Slider Blocks JS Frontend


// Image Slider Blocks JS Frontend


// About Page JS

}();
/******/ })()
;
//# sourceMappingURL=main.js.map