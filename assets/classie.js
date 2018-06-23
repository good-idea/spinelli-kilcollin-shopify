(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/joseph/Sites/spinelli-kilcollin/shopify/src/js/classie.js":[function(require,module,exports){
'use strict';

/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 *
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

;(function (window) {
	'use strict';

	// class helper functions from bonzo https://github.com/ded/bonzo

	function classReg(className) {
		return new RegExp('(^|\\s+)' + className + '(\\s+|$)');
	}

	// classList support for class management
	// altho to be fair, the api sucks because it won't accept multiple classes at once
	var hasClass, addClass, removeClass;

	if ('classList' in document.documentElement) {
		hasClass = function hasClass(elem, c) {
			return elem.classList.contains(c);
		};
		addClass = function addClass(elem, c) {
			elem.classList.add(c);
		};
		removeClass = function removeClass(elem, c) {
			elem.classList.remove(c);
		};
	} else {
		hasClass = function hasClass(elem, c) {
			return classReg(c).test(elem.className);
		};
		addClass = function addClass(elem, c) {
			if (!hasClass(elem, c)) {
				elem.className = elem.className + ' ' + c;
			}
		};
		removeClass = function removeClass(elem, c) {
			elem.className = elem.className.replace(classReg(c), ' ');
		};
	}

	function toggleClass(elem, c) {
		var fn = hasClass(elem, c) ? removeClass : addClass;
		fn(elem, c);
	}

	var classie = {
		// full names
		hasClass: hasClass,
		addClass: addClass,
		removeClass: removeClass,
		toggleClass: toggleClass,
		// short names
		has: hasClass,
		add: addClass,
		remove: removeClass,
		toggle: toggleClass

		// transport
	};if (typeof define === 'function' && define.amd) {
		// AMD
		define(classie);
	} else {
		// browser global
		window.classie = classie;
	}
})(window);

},{}]},{},["/Users/joseph/Sites/spinelli-kilcollin/shopify/src/js/classie.js"])

//# sourceMappingURL=classie.js.map
