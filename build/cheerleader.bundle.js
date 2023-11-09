var cheerYourTitle =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.create = create;

	var _slide2 = __webpack_require__(1);

	var _slide3 = _interopRequireDefault(_slide2);

	var _blink2 = __webpack_require__(2);

	var _blink3 = _interopRequireDefault(_blink2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function play(fx, speed) {
	  fx();
	  return setInterval(fx, speed);
	}

	function create(title) {
	  var interval = 0;

	  return {
	    slide: function slide(speed, sliceLength) {
	      interval = play(_slide3.default.bind({ frame: 0 }, title, sliceLength), speed);
	      return this;
	    },
	    blink: function blink(speed) {
	      interval = play(_blink3.default.bind({ visible: true }, title), speed);
	      return this;
	    },
	    stop: function stop() {
	      clearInterval(interval);
	      window.document.title = title;
	      return this;
	    }
	  };
	}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (title, sliceLength) {
	  var titleSlice = calculateSlideWindow(this.frame, title, sliceLength);
	  console.log(titleSlice);
	  window.document.title = titleSlice;
	  this.frame += 1;

	  if (this.frame >= title.length) {
	    this.frame = -1;
	  }
	};

	exports.calculateSlideWindow = calculateSlideWindow;
	function calculateSlideWindow(frame, title, sliceLength) {
	  var titleLength = title.length;

	  if (sliceLength >= titleLength) {
	    return title;
	  }

	  var startIndex = frame % titleLength;
	  var titleSlice = title.slice(startIndex, startIndex + sliceLength);

	  // Make it "rotate"
	  if (startIndex + sliceLength > titleLength) {
	    return titleSlice + title.slice(0, startIndex + sliceLength - titleLength);
	  }

	  return titleSlice;
	}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (title) {
	  window.document.title = this.visible ? title : '\u200E';
	  this.visible = !this.visible;
	};

/***/ })
/******/ ]);