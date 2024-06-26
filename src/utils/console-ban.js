(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ConsoleBan = {}));
})(this, (function (exports) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    var defaultOptions = {
      clear: true,
      debug: true,
      debugTime: 3000,
      bfcache: true
    };

    var EBrowser = {
      Chrome: 0,
      Firefox: 1,
      Safari: 2
    };

    var completion = function completion(url) {
      if (!url) {
        return '/';
      }
      return url[0] !== '/' ? "/".concat(url) : url;
    };
    var isUserAgentContains = function isUserAgentContains(text) {
      return ~navigator.userAgent.toLowerCase().indexOf(text);
    };
    var isString = function isString(v) {
      return typeof v === 'string';
    };
    var locationChange = function locationChange(target, env) {
      if (env === EBrowser.Safari) {
        location.replace(target);
        return;
      }
      location.href = target;
    };

    var counts = 0;
    var triggered = 0;
    var getChromeRerenderTestFunc = function getChromeRerenderTestFunc(fire) {
      var mark = 0;
      var seq = 1 << counts++;
      return function () {
        if (triggered && !(triggered & seq)) {
          return;
        }
        mark++;
        if (mark === 2) {
          triggered |= seq;
          fire();
          mark = 1;
        }
      };
    };
    var errorDetector = function errorDetector(trigger) {
      var e = new Error();
      Object.defineProperty(e, 'message', {
        get: function get() {
          trigger();
        }
      });
      console.log(e);
    };
    var getChromeTest = function getChromeTest(fire) {
      var re = /./;
      re.toString = getChromeRerenderTestFunc(fire);
      var func = function func() {
        return re;
      };
      func.toString = getChromeRerenderTestFunc(fire);
      var date = new Date();
      date.toString = getChromeRerenderTestFunc(fire);
      console.log('%c', func, func(), date);
      var errorFire = getChromeRerenderTestFunc(fire);
      errorDetector(errorFire);
    };

    var getFirefoxTest = function getFirefoxTest(fire) {
      var re = /./;
      re.toString = fire;
      console.log(re);
    };

    var getSafariTest = function getSafariTest(fire) {
      var img = new Image();
      Object.defineProperty(img, 'id', {
        get: function get() {
          fire(EBrowser.Safari);
        }
      });
      console.log(img);
    };

    var ConsoleBan = function () {
      function ConsoleBan(option) {
        var _a = __assign(__assign({}, defaultOptions), option),
          clear = _a.clear,
          debug = _a.debug,
          debugTime = _a.debugTime,
          callback = _a.callback,
          redirect = _a.redirect,
          write = _a.write,
          bfcache = _a.bfcache;
        this._debug = debug;
        this._debugTime = debugTime;
        this._clear = clear;
        this._bfcache = bfcache;
        this._callback = callback;
        this._redirect = redirect;
        this._write = write;
      }
      ConsoleBan.prototype.clear = function () {
        if (this._clear) {
          console.clear = function () {};
        }
      };
      ConsoleBan.prototype.bfcache = function () {
        if (this._bfcache) {
          window.addEventListener('unload', function () {});
          window.addEventListener('beforeunload', function () {});
        }
      };
      ConsoleBan.prototype.debug = function () {
        if (this._debug) {
          var db = new Function('debugger');
          setInterval(db, this._debugTime);
        }
      };
      ConsoleBan.prototype.redirect = function (env) {
        var target = this._redirect;
        if (!target) {
          return;
        }
        if (target.indexOf('http') === 0) {
          location.href !== target && locationChange(target, env);
          return;
        }
        var path = location.pathname + location.search;
        if (completion(target) === path) {
          return;
        }
        locationChange(target, env);
      };
      ConsoleBan.prototype.callback = function () {
        if (!this._callback && !this._redirect && !this._write) {
          return;
        }
        if (!window) {
          return;
        }
        var fireCallback = this.fire.bind(this);
        var isChrome = window.chrome || isUserAgentContains('chrome');
        var isFirefox = isUserAgentContains('firefox');
        if (isChrome) {
          getChromeTest(fireCallback);
          return;
        }
        if (isFirefox) {
          getFirefoxTest(fireCallback);
          return;
        }
        getSafariTest(fireCallback);
      };
      ConsoleBan.prototype.write = function () {
        var content = this._write;
        if (content) {
          document.body.innerHTML = isString(content) ? content : content.innerHTML;
        }
      };
      ConsoleBan.prototype.fire = function (env) {
        if (this._callback) {
          this._callback.call(null);
          return;
        }
        this.redirect(env);
        if (this._redirect) {
          return;
        }
        this.write();
      };
      ConsoleBan.prototype.prepare = function () {
        this.clear();
        this.bfcache();
        this.debug();
      };
      ConsoleBan.prototype.ban = function () {
        this.prepare();
        this.callback();
      };
      return ConsoleBan;
    }();

    var init = function init(option) {
      var instance = new ConsoleBan(option);
      instance.ban();
    };

    exports.init = init;

}));
