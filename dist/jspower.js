(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["jspower"] = factory();
	else
		root["jspower"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ttest2_pwr = __webpack_require__(1).ttest2_pwr;

module.exports = {
  ttest2_pwr: ttest2_pwr
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*********
*
* Code by Richard D. Morey,
* September 2020
*
*
* TO DO:
* 1. Add in caching for precision and es50? lib-r-math.js is so fast this might not be necessary
*
*********/


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __classPrivateFieldGet = this && this.__classPrivateFieldGet || function (receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  return privateMap.get(receiver);
};

var _cache, _design, _test, _curve, _stamp, _power1, _compute_criterion, _es_power, _n_power;

var fmin = __webpack_require__(2).fmin0;

var _require = __webpack_require__(3),
    StudentT = _require.StudentT,
    Normal = _require.Normal,
    Logistic = _require.Logistic;

var _StudentT = StudentT(),
    pt = _StudentT.pt,
    qt = _StudentT.qt;

var _Normal = Normal(),
    pnorm = _Normal.pnorm,
    qnorm = _Normal.qnorm;

var _Logistic = Logistic(),
    plogis = _Logistic.plogis,
    qlogis = _Logistic.qlogis;

;

var ttest2_pwr = /*#__PURE__*/function () {
  function ttest2_pwr() {
    var _this = this;

    var precision_2alpha = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.2;
    var nratio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var test = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck(this, ttest2_pwr);

    _cache.set(this, {
      criterion: {}
    });

    _design.set(this, {
      n1: 50,
      n2: 50,
      nratio: 1
    });

    _test.set(this, {
      es0: 0,
      side: 1,
      alpha: 0.025
    });

    _curve.set(this, {
      es: 0.1,
      power: 0.9
    });

    _stamp.set(this, function () {
      _this.randstamp = Math.random();
      _this.timestamp = Date.now();
    } // Note that this returns log-odds of power!
    ); // Note that this returns log-odds of power!


    _power1.set(this, function (n1, n2, delta, alpha, criterion, delta0) {
      var neff = n1 * n2 / (n1 + n2);
      var df = n1 + n2 - 2;
      if (typeof criterion === 'undefined') criterion = __classPrivateFieldGet(_this, _compute_criterion).call(_this, n1, n2, alpha, delta0);
      var ncp = delta * Math.sqrt(neff);
      var logpow;

      if (df > _this.options.df_normal_cutoff) {
        logpow = pnorm(criterion, ncp, 1, false, true);
      } else {
        logpow = pt(criterion, df, ncp, false, true);
      }

      var qpow = qlogis(logpow, 0, 1, true, true);
      return qpow;
    });

    _compute_criterion.set(this, function (n1, n2, alpha, delta0) {
      n1 = Math.ceil(n1);
      var ns0 = n1 > n2 ? [n2, n1] : [n1, n2];
      var ns = ns0.toString();
      var key = "".concat(delta0, ",").concat(alpha, ",").concat(ns);
      var f0,
          criterion,
          i = 0;

      if (key in __classPrivateFieldGet(_this, _cache).criterion && _this.options.criterion.cache) {
        criterion = __classPrivateFieldGet(_this, _cache).criterion[key];
      } else {
        var neff = n1 * n2 / (n1 + n2);
        var df = n1 + n2 - 2;

        if (delta0 == 0) {
          criterion = -qt(alpha, df);
        } else {
          var ncp = delta0 * Math.sqrt(neff);
          criterion = qt(alpha, df, ncp, false);
        }

        if (_this.options.criterion.cache) __classPrivateFieldGet(_this, _cache).criterion[key] = criterion;
      }

      return criterion;
    });

    _es_power.set(this, function (pow, criterion) {
      var n1 = __classPrivateFieldGet(_this, _design).n1;

      var n2 = _this.n2;
      var delta0 = __classPrivateFieldGet(_this, _test).side < 0 ? -__classPrivateFieldGet(_this, _test).es0 : __classPrivateFieldGet(_this, _test).es0;
      var s_dn = _this.options.es.s_dn;
      var s_up = _this.options.es.s_up;
      var shift_dn = _this.options.es.shift_dn;
      var shift_up = _this.options.es.shift_up;
      var fix_n2 = _this.options.fix_n2;
      if (pow == __classPrivateFieldGet(_this, _test).alpha) return __classPrivateFieldGet(_this, _test).es0;
      if (__classPrivateFieldGet(_this, _test).side < 0) criterion = -criterion;
      var es_up, es_lo, pow_up, pow_lo;
      var qpow = qlogis(pow);
      var neff = n1 * n2 / (n2 + n2);
      var df = n1 + n2 - 2;
      var tmp = criterion - qnorm(pow, 0, 1, false);
      es_up = (tmp + s_up) / Math.sqrt(neff);
      es_lo = (tmp - s_dn) / Math.sqrt(neff);
      pow_up = __classPrivateFieldGet(_this, _power1).call(_this, n1, n2, es_up, undefined, criterion, delta0);
      pow_lo = __classPrivateFieldGet(_this, _power1).call(_this, n1, n2, es_lo, undefined, criterion, delta0);

      while (pow_up < qpow) {
        es_lo = es_up;
        es_up = es_up + shift_up / Math.sqrt(neff);
        pow_up = __classPrivateFieldGet(_this, _power1).call(_this, n1, n2, es_up, undefined, criterion, delta0);
      }

      while (pow_lo > qpow) {
        es_up = es_lo;
        es_lo = es_lo - shift_dn / Math.sqrt(neff);
        pow_lo = __classPrivateFieldGet(_this, _power1).call(_this, n1, n2, es_lo, undefined, criterion, delta0);
      }

      if (fix_n2) {
        es_lo = (qnorm(pow) + criterion) / Math.sqrt(n2) - __classPrivateFieldGet(_this, _test).es0;
      }

      var this0 = _this;

      var opt_fun = function opt_fun(delta) {
        var obj = __classPrivateFieldGet(this0, _power1).call(this0, n1, n2, delta, undefined, criterion, delta0) - qpow;
        return obj * obj;
      };

      return fmin(es_lo, es_up, opt_fun, _this.options.es.tol).x;
    });

    _n_power.set(this, function (pow, delta) {
      var alpha = __classPrivateFieldGet(_this, _test).alpha;

      var nratio = __classPrivateFieldGet(_this, _design).nratio;

      var s_dn = _this.options.n.s_dn;
      var s_up = _this.options.n.s_up;
      var shift_dn = _this.options.n.shift_dn;
      var shift_up = _this.options.n.shift_up;
      var n1_max_pow = _this.options.n.n1_max_pow;
      var n1_max_min = _this.options.n.n1_max_min;
      var delta0 = __classPrivateFieldGet(_this, _test).side < 0 ? -__classPrivateFieldGet(_this, _test).es0 : __classPrivateFieldGet(_this, _test).es0;
      var fix_n2 = _this.options.fix_n2;

      if (fix_n2) {
        var ncp = -Math.abs(delta - delta0) * Math.sqrt(_this.n2);

        if (pow >= pnorm(qnorm(alpha), ncp)) {
          return Infinity;
        }
      }

      if (__classPrivateFieldGet(_this, _test).side < 0) delta = -delta;

      if (delta < delta0 && pow > alpha) {
        throw 'The specified effect size specified cannot be in the null region if power > alpha.';
      } else if (delta > delta0 && pow < alpha) {
        throw 'The specified effect size specified cannot be in the null region if power > alpha.';
      } else if (pow == alpha) {
        throw 'Power cannot be equal to alpha if computing sample size.';
      } else if (delta == delta0) {
        throw 'Effect size cannot be equal to the null effect size if computing sample size.';
      }

      var n2 = _this.n2;
      var neff_up,
          neff_lo,
          n_up,
          n2_up = n2,
          n_lo,
          n2_lo = n2,
          pow_up,
          pow_lo;
      var qpow = qlogis(pow);
      var delta_tmp = Math.abs(delta - delta0);
      var criterion0 = -qnorm(alpha);
      var tmp = qnorm(pow) + criterion0;
      neff_lo = Math.pow((tmp - s_dn) / delta_tmp, 2);

      if (fix_n2) {
        var es0 = -Math.abs(delta - delta0) * Math.sqrt(n2);
        var max_pow = pnorm(qnorm(_this.test.alpha) - es0);
        if (pow >= max_pow) throw "Power for es ".concat(delta, " requested was ").concat(pow, ". This is greater than the maximum power of ").concat(max_pow, " when n2 is fixed at ").concat(n2, " and alpha is ").concat(alpha, ".");
        neff_up = Math.pow(tmp / delta_tmp, 2);
        n_up = Math.max(2, 1 / (1 / neff_up - 1 / n2));
        n_up = n_up + Math.sqrt(Math.abs(n2 - n_up));
        n_lo = Math.max(2, 1 / (1 / neff_lo - 1 / n2));
      } else {
        neff_up = Math.pow((tmp + s_up) / delta_tmp, 2);
        n_up = Math.max(2, neff_up * (1 / nratio + 1));
        n_lo = Math.max(2, neff_lo * (1 / nratio + 1));
        n2_up = Math.max(2, n_up * nratio);
        n2_lo = Math.max(2, n_lo * nratio);
      }

      pow_up = __classPrivateFieldGet(_this, _power1).call(_this, n_up, n2_up, delta, alpha, undefined, delta0);
      pow_lo = __classPrivateFieldGet(_this, _power1).call(_this, n_lo, n2_lo, delta, alpha, undefined, delta0);
      if (n_up == 2) return 2;

      while (pow_up < qpow) {
        n_lo = n_up;
        n_up = n_up * shift_up;

        if (!fix_n2) {
          n2_lo = n2_up;
          n2_up = n2_up * shift_up;
        }

        pow_up = __classPrivateFieldGet(_this, _power1).call(_this, n_up, n2_up, delta, alpha, undefined, delta0);
      }

      while (pow_lo > qpow && n_lo >= 2) {
        n_up = n_lo;
        n_lo = n_lo * shift_dn;

        if (!fix_n2) {
          n2_up = n2_lo;
          n2_lo = n2_lo * shift_dn;
        }

        pow_lo = __classPrivateFieldGet(_this, _power1).call(_this, n_lo, n2_lo, delta, alpha, undefined, delta0);
      } // Ensure group 2 has at least two samples in it


      if (!fix_n2 && n_lo * nratio < 2) n_lo = 2 / nratio;
      var this0 = _this;

      var opt_fun = function opt_fun(n1) {
        var obj = __classPrivateFieldGet(this0, _power1).call(this0, n1, fix_n2 ? n2 : Math.ceil(n1 * nratio), delta, alpha, undefined, delta0) - qpow;
        return obj * obj;
      };

      var n_opt = fmin(n_lo, n_up, opt_fun, _this.options.n.tol);
      return Math.ceil(n_opt.x);
    });

    __classPrivateFieldGet(this, _design).nratio = nratio;

    __classPrivateFieldGet(this, _stamp).call(this);

    Object.assign(__classPrivateFieldGet(this, _test), test);
    var options0 = {
      fix_es: true,
      fix_n2: false,
      df_normal_cutoff: 25000,
      es: {
        tol: 0.0000001,
        s_up: 1,
        s_dn: 1,
        shift_up: 2,
        shift_dn: 2
      },
      n: {
        tol: 0.25,
        s_up: 2,
        s_dn: 1,
        shift_up: 1.5,
        shift_dn: .67,
        n1_max_pow: 2.5 / 2,
        n1_max_min: 1000
      },
      criterion: {
        cache: true,
        s_up: 1,
        t_shift: 5,
        i_limit: 10,
        t_up_tol: 0.0001,
        tol: 0.0000001
      }
    };
    Object.assign(options0, options);
    this.options = options0;
    this.precision_2alpha = precision_2alpha;
    this.curve = {
      es: this.es1mAlpha,
      power: 1 - this.test.alpha
    };
  }

  _createClass(ttest2_pwr, [{
    key: "find_power",
    value: function find_power(es) {
      var typeS = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var design = __classPrivateFieldGet(this, _design);

      var test = __classPrivateFieldGet(this, _test);

      var curve = __classPrivateFieldGet(this, _curve);

      var n2 = this.n2;
      var side = test.side;
      var criterion;
      if (typeof es === 'undefined') es = [curve.es];

      if (typeS) {
        criterion = -Math.sign(side) * __classPrivateFieldGet(this, _compute_criterion).call(this, design.n1, this.n2, test.alpha, -Math.sign(side) * test.es0);
      } else {
        criterion = Math.sign(side) * __classPrivateFieldGet(this, _compute_criterion).call(this, design.n1, this.n2, test.alpha, Math.sign(side) * test.es0);
      }

      var this0 = this;
      return es.map(function (delta) {
        var delta0 = test.es0;
        var criterion0 = criterion;

        if (delta == delta0) {
          return test.alpha;
        }

        if (limit) {
          if (!this0.options.fix_n2) {
            return typeS ? 0 : 1;
          }

          var ncp = Math.abs(delta - delta0) * Math.sqrt(this0.n2);
          ncp = typeS ? ncp : -ncp;
          return pnorm(qnorm(test.alpha), ncp);
        }

        if (side < 0) {
          delta = -delta;
          delta0 = -delta0;
          criterion0 = -criterion0;
        }

        if (typeS) {
          return plogis(-__classPrivateFieldGet(this0, _power1).call(this0, design.n1, n2, delta, test.alpha, criterion0, delta0));
        } else {
          return plogis(__classPrivateFieldGet(this0, _power1).call(this0, design.n1, n2, delta, test.alpha, criterion0, delta0));
        }
      });
    }
  }, {
    key: "find_es",
    value: function find_es(power) {
      var typeS = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var design = __classPrivateFieldGet(this, _design);

      var test = __classPrivateFieldGet(this, _test);

      var curve = __classPrivateFieldGet(this, _curve);

      if (typeof power === 'undefined') power = [curve.power];

      var criterion = Math.sign(test.side) * __classPrivateFieldGet(this, _compute_criterion).call(this, design.n1, this.n2, typeS ? 1 - test.alpha : test.alpha, Math.sign(test.side) * test.es0);

      var this0 = this;
      return power.map(function (power) {
        if (power == test.alpha) {
          return test.es0;
        }

        if (limit) {
          if (!this0.options.fix_n2) {
            return test.es0;
          }

          var es_diff = (qnorm(power) - qnorm(test.alpha)) / Math.sqrt(this0.n2);
          return Math.sign(test.side) * Math.abs(es_diff) + test.es0;
        }

        return Math.sign(test.side) * __classPrivateFieldGet(this0, _es_power).call(this0, typeS ? 1 - power : power, criterion);
      });
    }
  }, {
    key: "find_n",
    value: function find_n(curve) {
      var design = __classPrivateFieldGet(this, _design);

      var test = __classPrivateFieldGet(this, _test);

      if (typeof curve === 'undefined') curve = [__classPrivateFieldGet(this, _curve)];
      var this0 = this;
      return curve.map(function (curve) {
        return __classPrivateFieldGet(this0, _n_power).call(this0, curve.power, curve.es);
      });
    }
  }, {
    key: "clear_cache",
    value: function clear_cache() {
      var this0 = this;
      Object.keys(__classPrivateFieldGet(this, _cache)).map(function (key) {
        __classPrivateFieldGet(this0, _cache)[key] = {};
      });
    }
  }, {
    key: "design_report",
    value: function design_report() {
      var test = {};
      Object.assign(test, this.test, {
        criterion: this.criterion
      });
      var curve = {
        point: this.curve,
        es50: this.es50,
        es1mAlpha: this.es1mAlpha,
        typeS: this.find_power(undefined, true)[0]
      };

      if (this.options.fix_n2) {
        Object.assign(curve, {
          powerLimit: this.powerLimit
        });
      }

      return {
        test: test,
        design: {
          n1: this.n1,
          n2: this.n2,
          ntotal: this.ntotal,
          ratio: this.nratio
        },
        curve: curve,
        precision_2alpha: this.precision_2alpha
      };
    }
  }, {
    key: "cache",
    get: function get() {
      return __classPrivateFieldGet(this, _cache);
    }
  }, {
    key: "test",
    get: function get() {
      return __classPrivateFieldGet(this, _test);
    },
    set: function set(test) {
      var reset = false,
          i,
          which_change = [];
      var keys = Object.keys(__classPrivateFieldGet(this, _test));

      for (i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (key in test) if (test[key] != __classPrivateFieldGet(this, _test)[key]) {
          which_change.push(key);
        }
      }

      if (which_change.length > 0) {
        Object.assign(__classPrivateFieldGet(this, _test), test);

        if (which_change[0] == "alpha" && which_change.length == 1) {
          if (this.options.fix_es) {
            __classPrivateFieldGet(this, _curve).power = this.find_power([this.curve.es])[0];
          } else {
            __classPrivateFieldGet(this, _curve).es = this.find_es([this.curve.power])[0];
          }
        } else {
          __classPrivateFieldGet(this, _curve).es = this.find_es([this.curve.power])[0];
        }
      }

      __classPrivateFieldGet(this, _stamp).call(this);
    }
  }, {
    key: "n1",
    get: function get() {
      return __classPrivateFieldGet(this, _design).n1;
    },
    set: function set(n1) {
      if (__classPrivateFieldGet(this, _design).n1 == n1) return;
      __classPrivateFieldGet(this, _design).n1 = n1;

      if (this.options.fix_n2) {
        __classPrivateFieldGet(this, _design).nratio = n1 / this.n2;
      } else {
        __classPrivateFieldGet(this, _design).n2 = Math.ceil(n1 * this.nratio);
      }

      if (this.options.fix_es) {
        __classPrivateFieldGet(this, _curve).power = this.find_power([this.curve.es])[0];
      } else {
        __classPrivateFieldGet(this, _curve).es = this.find_es([this.curve.power])[0];
      }

      __classPrivateFieldGet(this, _stamp).call(this);
    }
  }, {
    key: "nratio",
    get: function get() {
      return __classPrivateFieldGet(this, _design).nratio;
    },
    set: function set(nratio) {
      var ntotal = this.ntotal;
      var n2 = Math.ceil(ntotal * nratio / (1 + nratio));
      this.options.fix_n2 = false;
      __classPrivateFieldGet(this, _design).nratio = nratio;
      this.n1 = ntotal - n2;
    }
  }, {
    key: "n2",
    get: function get() {
      return __classPrivateFieldGet(this, _design).n2;
    },
    set: function set(n2) {
      n2 = Math.ceil(n2);
      __classPrivateFieldGet(this, _design).n2 = n2;
      __classPrivateFieldGet(this, _design).nratio = n2 / this.n1;

      if (this.options.fix_es) {
        __classPrivateFieldGet(this, _curve).power = this.find_power([this.curve.es])[0];
      } else {
        __classPrivateFieldGet(this, _curve).es = this.find_es([this.curve.power])[0];
      }

      this.options.fix_n2 = true;

      __classPrivateFieldGet(this, _stamp).call(this);
    }
  }, {
    key: "ntotal",
    get: function get() {
      return this.n1 + this.n2;
    }
  }, {
    key: "es",
    set: function set(es) {
      if (__classPrivateFieldGet(this, _curve).es == es) return;
      __classPrivateFieldGet(this, _curve).es = es;
      __classPrivateFieldGet(this, _curve).power = this.find_power([es])[0];

      __classPrivateFieldGet(this, _stamp).call(this);
    }
  }, {
    key: "power",
    set: function set(power) {
      if (__classPrivateFieldGet(this, _curve).power == power) return;
      __classPrivateFieldGet(this, _curve).power = power;
      __classPrivateFieldGet(this, _curve).es = this.find_es([power])[0];

      __classPrivateFieldGet(this, _stamp).call(this);
    }
  }, {
    key: "precision_2alpha",
    get: function get() {
      var es = this.find_es([1 - __classPrivateFieldGet(this, _test).alpha])[0]; // add cache?

      return Math.abs(__classPrivateFieldGet(this, _test).es0 - es);
    },
    set: function set(p) {
      var fix_n2 = this.options.fix_n2;
      var es = __classPrivateFieldGet(this, _test).es0 + Math.sign(__classPrivateFieldGet(this, _test).side) * Math.abs(p);
      var n1 = this.find_n([{
        es: es,
        power: 1 - __classPrivateFieldGet(this, _test).alpha
      }])[0];

      if (fix_n2) {
        __classPrivateFieldGet(this, _design).nratio = n1 / this.n2;
      } else {
        __classPrivateFieldGet(this, _design).n2 = Math.ceil(n1 * this.nratio);
      }

      this.n1 = n1; // add cache?
    }
  }, {
    key: "es50",
    get: function get() {
      // add cache?
      return this.find_es([0.5])[0];
    },
    set: function set(es) {
      var n1 = this.find_n([{
        power: 0.5,
        es: es
      }])[0];
      var fix_n2 = this.options.fix_n2;

      if (fix_n2) {
        __classPrivateFieldGet(this, _design).nratio = n1 / this.n2;
      } else {
        __classPrivateFieldGet(this, _design).n2 = Math.ceil(n1 * this.nratio);
      }

      this.n1 = n1; // add cache?
    }
  }, {
    key: "powerLimit",
    get: function get() {
      return this.find_power([__classPrivateFieldGet(this, _curve).es], null, true)[0];
    }
  }, {
    key: "es1mAlpha",
    get: function get() {
      return __classPrivateFieldGet(this, _test).es0 + Math.sign(__classPrivateFieldGet(this, _test).side) * this.precision_2alpha;
    },
    set: function set(es) {
      this.precision_2alpha = Math.abs(es - __classPrivateFieldGet(this, _test).es0);
    }
  }, {
    key: "curve",
    get: function get() {
      return __classPrivateFieldGet(this, _curve);
    },
    set: function set(curve) {
      var reset = false,
          i;
      var fix_n2 = this.options.fix_n2;
      var keys = Object.keys(__classPrivateFieldGet(this, _curve));

      for (i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (key in curve) if (curve[key] != __classPrivateFieldGet(this, _curve)[key]) {
          reset = true;
          break;
        }
      }

      Object.assign(__classPrivateFieldGet(this, _curve), curve);

      if (reset) {
        var n1 = this.find_n([{
          power: __classPrivateFieldGet(this, _curve).power,
          es: __classPrivateFieldGet(this, _curve).es
        }])[0];

        if (fix_n2) {
          __classPrivateFieldGet(this, _design).nratio = n1 / this.n2;
        } else {
          __classPrivateFieldGet(this, _design).n2 = Math.ceil(n1 * this.nratio);
        }

        this.n1 = n1;
      }
    }
  }, {
    key: "criterion",
    get: function get() {
      var delta0 = __classPrivateFieldGet(this, _test).es0;

      return Math.sign(__classPrivateFieldGet(this, _test).side) * __classPrivateFieldGet(this, _compute_criterion).call(this, __classPrivateFieldGet(this, _design).n1, this.n2, __classPrivateFieldGet(this, _test).alpha, __classPrivateFieldGet(this, _test).side < 0 ? -delta0 : delta0);
    }
  }]);

  return ttest2_pwr;
}();

_cache = new WeakMap(), _design = new WeakMap(), _test = new WeakMap(), _curve = new WeakMap(), _stamp = new WeakMap(), _power1 = new WeakMap(), _compute_criterion = new WeakMap(), _es_power = new WeakMap(), _n_power = new WeakMap();
module.exports = {
  ttest2_pwr: ttest2_pwr
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/********
* This is adapted from:
* https://gist.github.com/awsnap/0dfed02ee15657df05aa
* from user https://github.com/awsnap
* It is almost line-for-line R's optimize() function in c
* See https://github.com/wch/r-source/blob/trunk/src/library/stats/src/optimize.c
*********/
;

function fmin0(ax, bx, f, tol) {
  "use strict";

  tol = tol || 1E-8; //var ax,bx,f,tol;
  //
  //     an approximation  x  to the point where  f  attains a minimum  on
  // the interval  (ax,bx)  is determined.
  //
  //
  // input..
  //
  // ax    left endpoint of initial interval
  // bx    right endpoint of initial interval
  // f     function subprogram which evaluates  f(x)  for any  x
  //       in the interval  (ax,bx)
  // tol   desired length of the interval of uncertainty of the final
  //       result ( >= 0.0)
  //
  //
  // output..
  //
  // fmin  abcissa approximating the point where  f  attains a minimum
  //
  //
  //     the method used is a combination of  golden  section  search  and
  // successive parabolic interpolation.  convergence is never much slower
  // than  that  for  a  fibonacci search.  if  f  has a continuous second
  // derivative which is positive at the minimum (which is not  at  ax  or
  // bx),  then  convergence  is  superlinear, and usually of the order of
  // about  1.324....
  //     the function  f  is never evaluated at two points closer together
  // than  eps*Math.abs(fmin) + (tol/3), where eps is  approximately the square
  // root  of  the  relative  machine  precision.   if   f   is a unimodal
  // function and the computed values of   f   are  always  unimodal  when
  // separated by at least  eps*Math.abs(x) + (tol/3), then  fmin  approximates
  // the abcissa of the global minimum of  f  on the interval  ax,bx  with
  // an error less than  3*eps*Math.abs(fmin) + tol.  if   f   is not unimodal,
  // then fmin may approximate a local, but perhaps non-global, minimum to
  // the same accuracy.
  //     this function subprogram is a slightly modified  version  of  the
  // algol  60 procedure  localmin  given in richard brent, algorithms for
  // minimization without derivatives, prentice - hall, inc. (1973).
  //
  //

  if (!isFinite(ax) || !isFinite(bx)) throw "Bounds ax, bx must be finite: ".concat(ax, ", ").concat(bx);
  var a, b, c, d, e, eps, xm, p, q, r, tol1, tol2, u, v, w, fu, fv, fw, fx, x;
  var i = 0;

  function sign(x, y) {
    // return value of x with the sign of y.
    return y >= 0 ? Math.abs(x) : -Math.abs(x);
  } //
  //  c is the squared inverse of the golden ratio
  //


  c = 0.5 * (3.0 - Math.sqrt(5.0)); //
  //  eps is approximately the square root of the relative machine
  //  precision.
  //

  eps = Math.sqrt(2.220446049250313e-16); //
  //  initialization
  //

  a = ax;
  b = bx;
  v = a + c * (b - a);
  w = v;
  x = v;
  e = 0.0;
  fx = f(x);
  fv = fx;
  fw = fx; //
  //  main loop starts here
  //

  for (;;) {
    i++;
    xm = 0.5 * (a + b);
    tol1 = eps * Math.abs(x) + tol / 3.0;
    tol2 = 2.0 * tol1; //
    // check stopping criterion
    //

    if (Math.abs(x - xm) <= tol2 - 0.5 * (b - a)) {
      break;
    } //
    // is golden-section necessary
    //


    if (Math.abs(e) > tol1) {
      //
      //  fit parabola
      //
      r = (x - w) * (fx - fv);
      q = (x - v) * (fx - fw);
      p = (x - v) * q - (x - w) * r;
      q = 2.00 * (q - r);

      if (q > 0.0) {
        p = -p;
      }

      q = Math.abs(q);
      r = e;
      e = d; //
      //  is parabola acceptable
      //

      if (Math.abs(p) < Math.abs(0.5 * q * r) && p > q * (a - x) && p < q * (b - x)) {
        //
        //  a parabolic interpolation step
        //
        d = p / q;
        u = x + d; //
        //  f must not be evaluated too close to ax or bx
        //

        if (u - a < tol2) {
          d = sign(tol1, xm - x);
        }

        if (b - u < tol2) {
          d = sign(tol1, xm - x);
        }
      } else {
        //
        //  a golden-section step
        //
        if (x >= xm) {
          e = a - x;
        }

        if (x < xm) {
          e = b - x;
        }

        d = c * e;
      }
    } else {
      //
      //  a golden-section step
      //
      if (x >= xm) {
        e = a - x;
      }

      if (x < xm) {
        e = b - x;
      }

      d = c * e;
    } //
    //  f must not be evaluated too close to x
    //


    if (Math.abs(d) >= tol1) {
      u = x + d;
    }

    if (Math.abs(d) < tol1) {
      u = x + sign(tol1, d);
    }

    fu = f(u); //
    //  update  a, b, v, w, and x
    //

    if (fu <= fx) {
      if (u >= x) {
        a = x;
      }

      if (u < x) {
        b = x;
      }

      v = w;
      fv = fw;
      w = x;
      fw = fx;
      x = u;
      fx = fu;
      continue;
    }

    if (u < x) {
      a = u;
    }

    if (u >= x) {
      b = u;
    }

    if (fu <= fw || w === x) {
      v = w;
      fv = fw;
      w = u;
      fw = fu;
    }

    if (fu <= fv || v === x || v === w) {
      v = u;
      fv = fu;
    }
  }

  return {
    x: x,
    fx: fx,
    i: i
  };
}

module.exports = {
  fmin0: fmin0
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, module) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof2(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof2(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

(function webpackUniversalModuleDefinition(root, factory) {
  if (( false ? undefined : _typeof2(exports)) === 'object' && ( false ? undefined : _typeof2(module)) === 'object') module.exports = factory(__webpack_require__(6), __webpack_require__(7), function webpackLoadOptionalExternalModule() {
    try {
      return __webpack_require__(10);
    } catch (e) {}
  }());else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = (function webpackLoadOptionalExternalModuleAmd(__WEBPACK_EXTERNAL_MODULE_186__, __WEBPACK_EXTERNAL_MODULE_187__) {
    return factory(__WEBPACK_EXTERNAL_MODULE_186__, __WEBPACK_EXTERNAL_MODULE_187__, root["supports-color"]);
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}
})(this, function (__WEBPACK_EXTERNAL_MODULE_186__, __WEBPACK_EXTERNAL_MODULE_187__, __WEBPACK_EXTERNAL_MODULE_185__) {
  return (
    /******/
    function (modules) {
      // webpackBootstrap

      /******/
      // The module cache

      /******/
      var installedModules = {};
      /******/

      /******/
      // The require function

      /******/

      function __webpack_require__(moduleId) {
        /******/

        /******/
        // Check if module is in cache

        /******/
        if (installedModules[moduleId]) {
          /******/
          return installedModules[moduleId].exports;
          /******/
        }
        /******/
        // Create a new module (and put it into the cache)

        /******/


        var module = installedModules[moduleId] = {
          /******/
          i: moduleId,

          /******/
          l: false,

          /******/
          exports: {}
          /******/

        };
        /******/

        /******/
        // Execute the module function

        /******/

        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/

        /******/
        // Flag the module as loaded

        /******/

        module.l = true;
        /******/

        /******/
        // Return the exports of the module

        /******/

        return module.exports;
        /******/
      }
      /******/

      /******/

      /******/
      // expose the modules object (__webpack_modules__)

      /******/


      __webpack_require__.m = modules;
      /******/

      /******/
      // expose the module cache

      /******/

      __webpack_require__.c = installedModules;
      /******/

      /******/
      // identity function for calling harmony imports with the correct context

      /******/

      __webpack_require__.i = function (value) {
        return value;
      };
      /******/

      /******/
      // define getter function for harmony exports

      /******/


      __webpack_require__.d = function (exports, name, getter) {
        /******/
        if (!__webpack_require__.o(exports, name)) {
          /******/
          Object.defineProperty(exports, name, {
            /******/
            configurable: false,

            /******/
            enumerable: true,

            /******/
            get: getter
            /******/

          });
          /******/
        }
        /******/

      };
      /******/

      /******/
      // getDefaultExport function for compatibility with non-harmony modules

      /******/


      __webpack_require__.n = function (module) {
        /******/
        var getter = module && module.__esModule ?
        /******/
        function getDefault() {
          return module['default'];
        } :
        /******/
        function getModuleExports() {
          return module;
        };
        /******/

        __webpack_require__.d(getter, 'a', getter);
        /******/


        return getter;
        /******/
      };
      /******/

      /******/
      // Object.prototype.hasOwnProperty.call

      /******/


      __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/

      /******/
      // __webpack_public_path__

      /******/


      __webpack_require__.p = "";
      /******/

      /******/
      // Load entry module and return exports

      /******/

      return __webpack_require__(__webpack_require__.s = 136);
      /******/
    }(
    /************************************************************************/

    /******/
    [
    /* 0 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var debug_R_Q_P01_boundaries = debug('R_Q_P01_boundaries');
      var debug_R_Q_P01_check = debug('R_Q_P01_check');
      exports.M_SQRT2 = 1.41421356237309504880168872421;

      exports.frac = function (x) {
        return x - Math.trunc(x);
      };

      exports.M_SQRT_32 = 5.656854249492380195206754896838;
      exports.DBL_MANT_DIG = 18;
      exports.M_LN2 = 0.693147180559945309417232121458;
      exports.M_1_SQRT_2PI = 0.398942280401432677939946059934;
      exports.M_2PI = 6.283185307179586476925286766559;
      exports.M_LN_2PI = 1.837877066409345483560659472811;
      exports.M_1_PI = 1.0 / Math.PI;
      exports.M_PI_2 = Math.PI / 2;
      exports.M_LN_SQRT_PI = 0.57236494292470008;
      exports.M_LN_SQRT_2PI = 0.918938533204672741780329736406;
      exports.M_LN_SQRT_PId2 = 0.225791352644727432363097614947;
      exports.M_SQRT_2dPI = 0.797884560802865355879892119869;
      exports.M_LOG10_2 = 0.301029995663981195213738894724;
      exports.DBL_MAX_EXP = Math.log2(Number.MAX_VALUE);
      exports.DBL_MIN_EXP = Math.log2(Number.MIN_VALUE);

      exports.R_D__1 = function (logP) {
        return logP ? 0 : 1.0;
      };

      exports.R_D__0 = function (logP) {
        return logP ? Number.NEGATIVE_INFINITY : 0.0;
      };

      exports.R_DT_0 = function (lower_tail, log_p) {
        return lower_tail ? exports.R_D__0(log_p) : exports.R_D__1(log_p);
      };

      exports.R_DT_1 = function (lower_tail, log_p) {
        return lower_tail ? exports.R_D__1(log_p) : exports.R_D__0(log_p);
      };

      exports.R_D_val = function (log_p, x) {
        return log_p ? Math.log(x) : x;
      };

      function R_D_Clog(log_p, p) {
        return log_p ? Math.log1p(-p) : 0.5 - p + 0.5;
      }

      exports.R_D_Clog = R_D_Clog;

      function R_DT_val(lower_tail, log_p, x) {
        return lower_tail ? exports.R_D_val(log_p, x) : R_D_Clog(log_p, x);
      }

      exports.R_DT_val = R_DT_val;

      function imin2(x, y) {
        return Math.trunc(Math.min(x, y));
      }

      exports.imin2 = imin2;

      function R_D_Lval(lowerTail, p) {
        return lowerTail ? p : 1 - p;
      }

      exports.R_D_Lval = R_D_Lval;

      function R_D_Cval(lowerTail, p) {
        return lowerTail ? 1 - p : p;
      }

      exports.R_D_Cval = R_D_Cval;

      function R_P_bounds_Inf_01(lowerTail, log_p, x) {
        if (!Number.isFinite(x)) {
          if (x > 0) {
            return exports.R_DT_1(lowerTail, log_p);
          }

          return exports.R_DT_0(lowerTail, log_p);
        }

        return undefined;
      }

      exports.R_P_bounds_Inf_01 = R_P_bounds_Inf_01;

      function R_D_half(log_p) {
        return log_p ? -exports.M_LN2 : 0.5;
      }

      exports.R_D_half = R_D_half;

      function R_P_bounds_01(lower_tail, log_p, x, x_min, x_max) {
        if (x <= x_min) return exports.R_DT_0(lower_tail, log_p);
        if (x >= x_max) return exports.R_DT_1(lower_tail, log_p);
        return undefined;
      }

      exports.R_P_bounds_01 = R_P_bounds_01;

      exports.R_D_exp = function (log_p, x) {
        return log_p ? x : Math.exp(x);
      };

      var ME;

      (function (ME) {
        ME[ME["ME_NONE"] = 0] = "ME_NONE";
        ME[ME["ME_DOMAIN"] = 1] = "ME_DOMAIN";
        ME[ME["ME_RANGE"] = 2] = "ME_RANGE";
        ME[ME["ME_NOCONV"] = 4] = "ME_NOCONV";
        ME[ME["ME_PRECISION"] = 8] = "ME_PRECISION";
        ME[ME["ME_UNDERFLOW"] = 16] = "ME_UNDERFLOW";
      })(ME = exports.ME || (exports.ME = {}));

      exports.mapErr = new Map([[ME.ME_NONE, 'No error'], [ME.ME_DOMAIN, "argument out of domain in '%s'"], [ME.ME_RANGE, "argument out of domain in '%s'"], [ME.ME_NOCONV, "convergence failed in '%s'"], [ME.ME_PRECISION, "full precision may not have been achieved in '%s'"], [ME.ME_UNDERFLOW, "underflow occurred in '%s'"]]);

      exports.ML_ERROR = function (x, s, printer) {
        var str = exports.mapErr.get(x);

        if (str) {
          printer(str, s);
        }
      };

      function ML_ERR_return_NAN(printer) {
        exports.ML_ERROR(ME.ME_DOMAIN, '', printer);
        return Number.NaN;
      }

      exports.ML_ERR_return_NAN = ML_ERR_return_NAN;

      function R_D_nonint_check(log, x, printer) {
        if (R_nonint(x)) {
          printer('non-integer x = %d', x);
          return exports.R_D__0(log);
        }

        return undefined;
      }

      exports.R_D_nonint_check = R_D_nonint_check;

      function fmod(x, y) {
        return x - Math.trunc(x / y) * y;
      }

      exports.fmod = fmod;

      function imax2(x, y) {
        return Math.trunc(Math.max(x, y));
      }

      exports.imax2 = imax2;

      function isOdd(k) {
        return Math.floor(k) % 2 === 1;
      }

      exports.isOdd = isOdd;

      function epsilonNear(x, target) {
        if (Number.isNaN(x)) return x;
        if (!isFinite(x)) return x;
        if (Number.isNaN(target)) return x;
        if (!isFinite(target)) return x;
        var diff = x - target;

        if (diff > Number.EPSILON || diff < -Number.EPSILON) {
          return x;
        }

        return target;
      }

      exports.epsilonNear = epsilonNear;

      function isEpsilonNear(x, target) {
        if (isFinite(x) && isFinite(target)) return epsilonNear(x, target) === target;
        return false;
      }

      exports.isEpsilonNear = isEpsilonNear;

      function R_D_negInonint(x) {
        return x < 0.0 || R_nonint(x);
      }

      exports.R_D_negInonint = R_D_negInonint;

      function R_nonint(x) {
        return !Number.isInteger(x);
      }

      exports.R_nonint = R_nonint;

      function R_D_fexp(give_log, f, x) {
        return give_log ? -0.5 * Math.log(f) + x : Math.exp(x) / Math.sqrt(f);
      }

      exports.R_D_fexp = R_D_fexp;
      exports.nsig_BESS = 16;
      exports.ensig_BESS = 1e16;
      exports.rtnsig_BESS = 1e-4;
      exports.enmten_BESS = 8.9e-308;
      exports.enten_BESS = 1e308;
      exports.exparg_BESS = 709;
      exports.xlrg_BESS_IJ = 1e5;
      exports.xlrg_BESS_Y = 1e8;
      exports.thresh_BESS_Y = 16;
      exports.xmax_BESS_K = 705.342;
      exports.sqxmin_BESS_K = 1.49e-154;
      exports.M_eps_sinc = 2.149e-8;

      function R_pow_di(x, n) {
        var pow = 1.0;
        if (Number.isNaN(x)) return x;

        if (n !== 0) {
          if (!Number.isFinite(x)) return R_pow(x, n);

          if (n < 0) {
            n = -n;
            x = 1 / x;
          }

          while (true) {
            if (n & 1) pow *= x;
            if (n >>= 1) x *= x;else break;
          }
        }

        return pow;
      }

      exports.R_pow_di = R_pow_di;

      function R_pow(x, y) {
        if (y === 2.0) return x * x;
        if (x === 1 || y === 0) return 1;

        if (x === 0) {
          if (y > 0) return 0;else if (y < 0) return Number.POSITIVE_INFINITY;else return y;
        }

        if (Number.isFinite(x) && Number.isFinite(y)) {
          return Math.pow(x, y);
        }

        if (Number.isNaN(x) || Number.isNaN(y)) return x + y;

        if (!Number.isFinite(x)) {
          if (x > 0) return y < 0 ? 0 : Number.POSITIVE_INFINITY;else {
            if (Number.isFinite(y) && y === Math.floor(y)) return y < 0 ? 0 : myfmod(y, 2) ? x : -x;
          }
        }

        if (!Number.isFinite(y)) {
          if (x >= 0) {
            if (y > 0) return x >= 1 ? Number.POSITIVE_INFINITY : 0;else return x < 1 ? Number.POSITIVE_INFINITY : 0;
          }
        }

        return NaN;
      }

      exports.R_pow = R_pow;

      exports.R_finite = function (x) {
        return !Number.isFinite(x);
      };

      exports.R_isnancpp = function (x) {
        return Number.isNaN(x);
      };

      function myfmod(x1, x2) {
        var q = x1 / x2;
        return x1 - Math.floor(q) * x2;
      }

      exports.myfmod = myfmod;

      function R_powV(x, y) {
        if (x === 1 || y === 0) return 1;

        if (x === 0) {
          if (y > 0) return 0;
          return Number.POSITIVE_INFINITY;
        }

        if (Number.isFinite(x) && Number.isFinite(y)) return Math.pow(x, y);

        if (Number.isNaN(x) || Number.isNaN(y)) {
          return x + y;
        }

        if (!Number.isFinite(x)) {
          if (x > 0) return y < 0 ? 0 : Number.POSITIVE_INFINITY;else {
            if (Number.isFinite(y) && y === Math.floor(y)) return y < 0 ? 0 : myfmod(y, 2) ? x : -x;
          }
        }

        if (!Number.isFinite(y)) {
          if (x >= 0) {
            if (y > 0) return x >= 1 ? Number.POSITIVE_INFINITY : 0;else return x < 1 ? Number.POSITIVE_INFINITY : 0;
          }
        }

        return NaN;
      }

      exports.R_powV = R_powV;

      function ldexp(x, y) {
        if (Number.isNaN(x) || Number.isNaN(y)) {
          return x + y;
        }

        if (!Number.isFinite(x) || !Number.isFinite(y)) {
          return Number.POSITIVE_INFINITY;
        }

        return x * Math.pow(2, y);
      }

      exports.ldexp = ldexp;

      function R_D_log(log_p, p) {
        return log_p ? p : Math.log(p);
      }

      exports.R_D_log = R_D_log;

      function R_Q_P01_boundaries(lower_tail, log_p, p, _LEFT_, _RIGHT_) {
        if (log_p) {
          if (p > 0) {
            return ML_ERR_return_NAN(debug_R_Q_P01_boundaries);
          }

          if (p === 0) return lower_tail ? _RIGHT_ : _LEFT_;
          if (p === Number.NEGATIVE_INFINITY) return lower_tail ? _LEFT_ : _RIGHT_;
        } else {
          if (p < 0 || p > 1) {
            return ML_ERR_return_NAN(debug_R_Q_P01_boundaries);
          }

          if (p === 0) return lower_tail ? _LEFT_ : _RIGHT_;
          if (p === 1) return lower_tail ? _RIGHT_ : _LEFT_;
        }

        return undefined;
      }

      exports.R_Q_P01_boundaries = R_Q_P01_boundaries;

      function R_Q_P01_check(logP, p) {
        if (logP && p > 0 || !logP && (p < 0 || p > 1)) {
          return ML_ERR_return_NAN(debug_R_Q_P01_check);
        }

        return undefined;
      }

      exports.R_Q_P01_check = R_Q_P01_check;

      function R_D_qIv(logP, p) {
        return logP ? Math.exp(p) : p;
      }

      exports.R_D_qIv = R_D_qIv;
      /***/
    },
    /* 1 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";
      /**
       * Detect Electron renderer / nwjs process, which is node, but we should
       * treat as a browser.
       */

      if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
        module.exports = __webpack_require__(182);
      } else {
        module.exports = __webpack_require__(183);
      }
      /***/

    },
    /* 2 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var abs = Math.abs,
          sign = Math.sign,
          floor = Math.floor,
          trunc = Math.trunc,
          max = Math.max;
      var isNaN = Number.isNaN;
      var isArray = Array.isArray;

      var debug = __webpack_require__(1);

      var printer_seq = debug("seq");
      var precision9 = numberPrecision(9);

      function isOdd(n) {
        if (isFinite(n)) {
          return floor(n / 2) * 2 < n;
        }

        throw new Error("Not a finite Number: ".concat(n));
      }

      exports.isOdd = isOdd;

      exports.seq = function () {
        var adjust = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        return function () {
          var adjustMin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : adjust;
          return function (start, end) {
            var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

            if (end === undefined) {
              if (start <= 0 || start === undefined) {
                return [];
              }

              end = 1;
            }

            var s = start + adjust;
            var e = end + adjust;
            var cursor = s;

            if (end < start) {
              e = start + adjustMin;
              s = end + adjustMin;
              cursor = e;
            }

            step = abs(step) * sign(end - start);
            printer_seq("step:%d", step);
            var rc = [];

            do {
              rc.push(cursor);
              cursor += step;
            } while (precision9(cursor) >= s && precision9(cursor) <= e && step !== 0);

            return precision9(rc);
          };
        };
      };

      function selector() {
        for (var _len2 = arguments.length, rest = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          rest[_key2] = arguments[_key2];
        }

        var flat = flatten(rest);
        return function (val, idx) {
          return flat.indexOf(idx) >= 0;
        };
      }

      exports.selector = selector;

      function flatten() {
        var rc = [];

        for (var _len3 = arguments.length, rest = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          rest[_key3] = arguments[_key3];
        }

        for (var _i = 0, _rest = rest; _i < _rest.length; _i++) {
          var itm = _rest[_i];

          if (isArray(itm)) {
            var rc2 = flatten.apply(void 0, _toConsumableArray(itm));
            rc.push.apply(rc, _toConsumableArray(rc2));
            continue;
          }

          rc.push(itm);
        }

        return rc;
      }

      exports.flatten = flatten;

      function arrayrify(fn) {
        return function (x) {
          for (var _len4 = arguments.length, rest = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
            rest[_key4 - 1] = arguments[_key4];
          }

          var fp = Array.isArray(x) ? x : [x];
          var result = fp.map(function (p) {
            return fn.apply(void 0, [p].concat(rest));
          });
          return result.length === 1 ? result[0] : result;
        };
      }

      exports.arrayrify = arrayrify;

      function multiplex(fn) {
        return function () {
          return multiplexer.apply(void 0, arguments)(fn);
        };
      }

      exports.multiplex = multiplex;

      function asArray(fn) {
        return function () {
          var ans = fn.apply(void 0, arguments);
          return Array.isArray(ans) ? ans : [ans];
        };
      }

      exports.asArray = asArray;

      function possibleScalar(x) {
        return x.length === 1 ? x[0] : x;
      }

      exports.possibleScalar = possibleScalar;

      function coerceToArray(o) {
        if (o === null || o === undefined) {
          throw new TypeError('Illegal argument excepton: input needs to NOT be "null" or "undefined".');
        }

        if (typeof o === "number") {
          return [{
            key: 0,
            val: o
          }];
        }

        if (isArray(o)) {
          return o.map(function (x, idx) {
            return {
              key: idx,
              val: x
            };
          });
        }

        if (typeof o === "string") {
          return o.split("").map(function (x, idx) {
            return {
              key: idx,
              val: x
            };
          });
        }

        if (_typeof2(o) === "object") {
          var names = Object.getOwnPropertyNames(o);

          if (names.length === 0) {
            throw new Error("Input argument is an Object with no properties");
          }

          return names.map(function (name) {
            return {
              key: name,
              val: o[name]
            };
          });
        }

        throw new Error("unreachable code");
      }

      function multiplexer() {
        var analyzed = [];

        for (var k = 0; k < arguments.length; k++) {
          var arg = k < 0 || arguments.length <= k ? undefined : arguments[k];

          if (arg === null) {
            analyzed.push([arg]);
            continue;
          }

          if (["undefined", "boolean", "number"].indexOf(_typeof2(arg)) >= 0) {
            analyzed.push([arg]);
            continue;
          }

          if (typeof arg === "string") {
            analyzed.push(arg.split(""));
            continue;
          }

          if (Array.isArray(arg)) {
            analyzed.push(arg);
            continue;
          }

          if (arg instanceof Object) {
            throw new Error("Sorry, looping over properties not yet supported");
          }

          if (arg instanceof Function) {
            throw new Error("Sorry function arguments are not yet supported");
          }
        }

        var _max = max.apply(void 0, _toConsumableArray(analyzed.map(function (a) {
          return a.length;
        })));

        return function (fn) {
          var rc = [];

          for (var _k2 = 0; _k2 < _max; _k2++) {
            var result = [];

            for (var j = 0; j < analyzed.length; j++) {
              var arr = analyzed[j];
              var idx = _k2 % arr.length;
              result.push(arr[idx]);
            }

            rc.push(fn.apply(void 0, result));
          }

          return possibleScalar(rc);
        };
      }

      exports.multiplexer = multiplexer;

      function iter() {
        var wantMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        return function (xx) {
          var fx = coerceToArray(xx);
          return function (fn) {
            return wantMap ? possibleScalar(fx.map(function (o) {
              return fn(o.val, o.key);
            })) : fx.forEach(function (o) {
              return fn(o.val, o.key);
            });
          };
        };
      }

      exports.map = iter();
      exports.each = iter(false);

      function numberPrecision() {
        var prec = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;

        function convert(x) {
          if (isNaN(x)) {
            return NaN;
          }

          return Number.parseFloat(x.toPrecision(prec));
        }

        return arrayrify(convert);
      }

      exports.numberPrecision = numberPrecision;

      function any(x) {
        return function (fn) {
          if (fn instanceof Function) {
            return x.find(fn) !== undefined;
          }

          return x.find(function (d) {
            return d === fn;
          }) !== undefined;
        };
      }

      exports.any = any;

      function sum(x) {
        var rc = 0;

        for (var i = 0; i < x.length; i++) {
          if (isArray(x[i])) {
            rc += sum(x[i]);
            continue;
          }

          if (typeof x[i] === "string") {
            var trial = Number.parseFloat(x[i]);

            if (Number.isFinite(trial)) {
              rc += trial;
              continue;
            }

            throw Error("".concat(x[i], " is not a number or can be coerced to a number"));
          }

          if (typeof x[i] === "number" && Number.isFinite(x[i])) {
            rc += x[i];
            continue;
          }

          throw new Error("".concat(x[i], " is not a number"));
        }

        return rc;
      }

      exports.sum = sum;
      exports.div = multiplex(function (a, b) {
        return a / b;
      });
      exports.mult = multiplex(function (a, b) {
        return a * b;
      });

      function summary(x) {
        if (!Array.isArray(x)) {
          throw new Error("Illigal argument, not an array");
        }

        if (x.length === 0) {
          throw new Error("argument Array is empty");
        }

        if (x.findIndex(function (v) {
          return isNaN(v);
        }) >= 0) {
          throw new Error("argument Array has NaNs");
        }

        var N = x.length;
        var mu = sum(x) / N;
        var relX2 = 0;

        for (var i = 0; i < x.length; i++) {
          relX2 += (x[i] - mu) * (x[i] - mu);
        }

        var sampleVariance = relX2 / (N - 1);
        var populationVariance = sampleVariance * (N - 1) / N;
        var sampleSD = Math.sqrt(sampleVariance);
        var populationSD = Math.sqrt(populationVariance);
        var o = x.sort(function (a, b) {
          return a - b;
        });
        var min = o[0];
        var max = o[N - 1];

        var _ref = function () {
          var i = [4, 2, 4 / 3].map(function (v) {
            return (N - 1) / v;
          });
          var q = i.map(function (index) {
            var f1 = 1 - (index - floor(index));
            var f2 = 1 - f1;
            return o[trunc(index)] * f1 + o[trunc(index) + 1] * f2;
          });
          return {
            q1: q[0],
            median: q[1],
            q3: q[2]
          };
        }(),
            q1 = _ref.q1,
            median = _ref.median,
            q3 = _ref.q3;

        return {
          N: N,
          mu: mu,
          population: {
            variance: populationVariance,
            sd: populationSD
          },
          sample: {
            variance: sampleVariance,
            sd: sampleSD
          },
          relX: "depricated",
          relX2: "depricated",
          stats: {
            min: min,
            "1st Qu.": q1,
            median: median,
            "3rd Qu.": q3,
            max: max
          }
        };
      }

      exports.summary = summary;

      function Welch_Satterthwaite(s, n) {
        var elts = flatten(exports.map(s)(function (_s, i) {
          return _s * _s / n[i];
        }));
        var dom = elts.map(function (e, i) {
          return e * e / (n[i] - 1);
        });
        return Math.pow(sum(elts), 2) / sum(dom);
      }

      exports.Welch_Satterthwaite = Welch_Satterthwaite;
      /***/
    },
    /* 3 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _general_1 = __webpack_require__(0);

      var exp = Math.exp,
          expm1 = Math.expm1,
          log = Math.log,
          log1p = Math.log1p;

      function R_DT_qIv(lower_tail, log_p, p) {
        return log_p ? lower_tail ? exp(p) : -expm1(p) : _general_1.R_D_Lval(lower_tail, p);
      }

      exports.R_DT_qIv = R_DT_qIv;

      function R_DT_CIv(lower_tail, log_p, p) {
        return log_p ? lower_tail ? -expm1(p) : exp(p) : _general_1.R_D_Cval(lower_tail, p);
      }

      exports.R_DT_CIv = R_DT_CIv;

      function R_D_LExp(log_p, x) {
        return log_p ? R_Log1_Exp(x) : log1p(-x);
      }

      exports.R_D_LExp = R_D_LExp;

      function R_Log1_Exp(x) {
        if (x > -_general_1.M_LN2) {
          return log(-expm1(x));
        }

        return log1p(-exp(x));
      }

      exports.R_Log1_Exp = R_Log1_Exp;

      function R_DT_Clog(lower_tail, log_p, p) {
        return lower_tail ? R_D_LExp(log_p, p) : _general_1.R_D_log(log_p, p);
      }

      exports.R_DT_Clog = R_DT_Clog;

      function R_DT_log(lower_tail, log_p, p) {
        return lower_tail ? _general_1.R_D_log(log_p, p) : R_D_LExp(log_p, p);
      }

      exports.R_DT_log = R_DT_log;
      /***/
    },
    /* 4 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var r_func_1 = __webpack_require__(2);

      var lgammafn_sign_1 = __webpack_require__(67);

      function lgammafn(x) {
        return r_func_1.map(x)(function (fx) {
          return lgammafn_sign_1.lgammafn_sign(fx);
        });
      }

      exports.lgammafn = lgammafn;
      /***/
    },
    /* 5 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var N = 624;
      var M = 397;
      var MATRIX_A = 0x9908b0df;
      var UPPER_MASK = 0x80000000;
      var LOWER_MASK = 0x7fffffff;
      var TEMPERING_MASK_B = 0x9d2c5680;
      var TEMPERING_MASK_C = 0xefc60000;

      var fixup_1 = __webpack_require__(20);

      var irng_1 = __webpack_require__(7);

      var irng_type_1 = __webpack_require__(14);

      var timeseed_1 = __webpack_require__(10);

      var SEED_LEN = 625;

      var MersenneTwister = /*#__PURE__*/function (_irng_1$IRNG) {
        _inherits(MersenneTwister, _irng_1$IRNG);

        var _super = _createSuper(MersenneTwister);

        _createClass(MersenneTwister, [{
          key: "MT_sgenrand",
          value: function MT_sgenrand(seed) {
            for (var i = 0; i < N; i++) {
              this.mt[i] = seed & 0xffff0000;
              seed = 69069 * seed + 1;
              this.mt[i] |= (seed & 0xffff0000) >>> 16;
              seed = 69069 * seed + 1;
            }

            this.mti = N;
          }
        }, {
          key: "MT_genrand",
          value: function MT_genrand() {
            var y = new Int32Array(1);
            var mag01 = new Int32Array([0x0, MATRIX_A]);
            var dummy = this.m_seed;
            this.mti = dummy[0];

            if (this.mti >= N) {
              var kk;
              if (this.mti === N + 1) this.MT_sgenrand(4357);

              for (kk = 0; kk < N - M; kk++) {
                y[0] = this.mt[kk] & UPPER_MASK | this.mt[kk + 1] & LOWER_MASK;
                this.mt[kk] = this.mt[kk + M] ^ y[0] >>> 1 ^ mag01[y[0] & 0x1];
              }

              for (; kk < N - 1; kk++) {
                y[0] = this.mt[kk] & UPPER_MASK | this.mt[kk + 1] & LOWER_MASK;
                this.mt[kk] = this.mt[kk + (M - N)] ^ y[0] >>> 1 ^ mag01[y[0] & 0x1];
              }

              y[0] = this.mt[N - 1] & UPPER_MASK | this.mt[0] & LOWER_MASK;
              this.mt[N - 1] = this.mt[M - 1] ^ y[0] >>> 1 ^ mag01[y[0] & 0x1];
              this.mti = 0;
            }

            y[0] = this.mt[this.mti++];
            y[0] ^= y[0] >>> 11;
            y[0] ^= y[0] << 7 & TEMPERING_MASK_B;
            y[0] ^= y[0] << 15 & TEMPERING_MASK_C;
            y[0] ^= y[0] >>> 18;
            dummy[0] = this.mti;
            return new Uint32Array(y.buffer)[0] * 2.3283064365386963e-10;
          }
        }, {
          key: "fixupSeeds",
          value: function fixupSeeds() {
            var s = this.m_seed;
            s[0] = 624;
            if (s[0] <= 0) s[0] = 624;

            if (this.mt.find(function (v) {
              return !!v;
            }) === undefined) {
              this.init(timeseed_1.timeseed());
            }

            return;
          }
        }]);

        function MersenneTwister() {
          var _seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : timeseed_1.timeseed();

          _classCallCheck(this, MersenneTwister);

          return _super.call(this, _seed);
        }

        _createClass(MersenneTwister, [{
          key: "_setup",
          value: function _setup() {
            var buf = new ArrayBuffer(SEED_LEN * 4);
            this._kind = irng_type_1.IRNGType.MERSENNE_TWISTER;
            this._name = 'Mersenne-Twister';
            this.m_seed = new Int32Array(buf).fill(0);
            this.mt = new Int32Array(buf, 4);
            this.mti = N + 1;
          }
        }, {
          key: "init",
          value: function init() {
            var _seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : timeseed_1.timeseed();

            var s = new Uint32Array([0]);
            s[0] = _seed;

            for (var j = 0; j < 50; j++) {
              s[0] = 69069 * s[0] + 1;
            }

            for (var _j = 0; _j < this.m_seed.length; _j++) {
              s[0] = 69069 * s[0] + 1;
              this.m_seed[_j] = s[0];
            }

            this.fixupSeeds();

            _get(_getPrototypeOf(MersenneTwister.prototype), "init", this).call(this, _seed);
          }
        }, {
          key: "internal_unif_rand",
          value: function internal_unif_rand() {
            var rc = this.MT_genrand();
            return fixup_1.fixup(rc);
          }
        }, {
          key: "seed",
          set: function set(_seed) {
            if (_seed.length > this.m_seed.length || _seed.length === 0) {
              this.init(timeseed_1.timeseed());
              return;
            }

            this.m_seed.set(_seed);
          },
          get: function get() {
            return Array.from(this.m_seed);
          }
        }]);

        return MersenneTwister;
      }(irng_1.IRNG);

      exports.MersenneTwister = MersenneTwister;
      /***/
    },
    /* 6 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var expm1_1 = __webpack_require__(3);

      var r_func_1 = __webpack_require__(2);

      var printer = debug('qnorm');
      var ISNAN = Number.isNaN;
      var log = Math.log,
          sqrt = Math.sqrt,
          fabs = Math.abs;
      var ML_NEGINF = -Infinity;
      var ML_POSINF = Infinity;

      function qnorm(p) {
        var mu = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var sigma = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var lower_tail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var log_p = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        var q;
        var p_;
        var r;
        var val;
        return r_func_1.map(p)(function (fx) {
          if (ISNAN(fx) || ISNAN(mu) || ISNAN(sigma)) return fx + mu + sigma;

          var rc = _general_1.R_Q_P01_boundaries(lower_tail, log_p, fx, ML_NEGINF, ML_POSINF);

          if (rc !== undefined) {
            return rc;
          }

          if (sigma < 0) return _general_1.ML_ERR_return_NAN(printer);
          if (sigma === 0) return mu;
          p_ = expm1_1.R_DT_qIv(lower_tail, log_p, fx);
          q = p_ - 0.5;
          printer('qnorm(p=%d, m=%d, s=%d, l.t.= %s, log= %s): q = %d', p, mu, sigma, lower_tail, log_p, q);

          if (fabs(q) <= 0.425) {
            r = 0.180625 - q * q;
            val = q * (((((((r * 2509.0809287301226727 + 33430.575583588128105) * r + 67265.770927008700853) * r + 45921.953931549871457) * r + 13731.693765509461125) * r + 1971.5909503065514427) * r + 133.14166789178437745) * r + 3.387132872796366608) / (((((((r * 5226.495278852854561 + 28729.085735721942674) * r + 39307.89580009271061) * r + 21213.794301586595867) * r + 5394.1960214247511077) * r + 687.1870074920579083) * r + 42.313330701600911252) * r + 1);
          } else {
            if (q > 0) r = expm1_1.R_DT_CIv(lower_tail, log_p, fx);else r = p_;
            r = sqrt(-(log_p && (lower_tail && q <= 0 || !lower_tail && q > 0) ? p : log(r)));
            printer('close to 0 or 1: r = %7d', r);

            if (r <= 5) {
              r += -1.6;
              val = (((((((r * 7.7454501427834140764e-4 + 0.0227238449892691845833) * r + 0.24178072517745061177) * r + 1.27045825245236838258) * r + 3.64784832476320460504) * r + 5.7694972214606914055) * r + 4.6303378461565452959) * r + 1.42343711074968357734) / (((((((r * 1.05075007164441684324e-9 + 5.475938084995344946e-4) * r + 0.0151986665636164571966) * r + 0.14810397642748007459) * r + 0.68976733498510000455) * r + 1.6763848301838038494) * r + 2.05319162663775882187) * r + 1);
            } else {
              r += -5;
              val = (((((((r * 2.01033439929228813265e-7 + 2.71155556874348757815e-5) * r + 0.0012426609473880784386) * r + 0.026532189526576123093) * r + 0.29656057182850489123) * r + 1.7848265399172913358) * r + 5.4637849111641143699) * r + 6.6579046435011037772) / (((((((r * 2.04426310338993978564e-15 + 1.4215117583164458887e-7) * r + 1.8463183175100546818e-5) * r + 7.868691311456132591e-4) * r + 0.0148753612908506148525) * r + 0.13692988092273580531) * r + 0.59983220655588793769) * r + 1);
            }

            if (q < 0.0) val = -val;
          }

          return mu + sigma * val;
        });
      }

      exports.qnorm = qnorm;
      /***/
    },
    /* 7 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var r_func_1 = __webpack_require__(2);

      exports.segFnCache = r_func_1.seq();

      var IRNG = /*#__PURE__*/function () {
        function IRNG(_seed) {
          _classCallCheck(this, IRNG);

          this.notify = new Set();
          this.emit = this.emit.bind(this);
          this.register = this.register.bind(this);
          this.unif_rand = this.unif_rand.bind(this);
          this.internal_unif_rand = this.internal_unif_rand.bind(this);
          this.init = this.init.bind(this);

          this._setup();

          this.init(_seed);
        }

        _createClass(IRNG, [{
          key: "init",
          value: function init(_seed) {
            this.emit('INIT');
          }
        }, {
          key: "unif_rand",
          value: function unif_rand() {
            var _this = this;

            var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            n = !n || n < 0 ? 1 : n;
            return r_func_1.map(exports.segFnCache()(n))(function () {
              return _this.internal_unif_rand();
            });
          }
        }, {
          key: "register",
          value: function register(event, handler) {
            this.notify.add({
              event: event,
              handler: handler
            });
          }
        }, {
          key: "emit",
          value: function emit(event) {
            this.notify.forEach(function (r) {
              if (r.event === event) {
                r.handler();
              }
            });
          }
        }, {
          key: "name",
          get: function get() {
            return this._name;
          }
        }, {
          key: "kind",
          get: function get() {
            return this._kind;
          }
        }]);

        return IRNG;
      }();

      exports.IRNG = IRNG;
      /***/
    },
    /* 8 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var buggy_kinderman_ramage_1 = __webpack_require__(155);

      exports.BuggyKindermanRamage = buggy_kinderman_ramage_1.BuggyKindermanRamage;

      var box_muller_1 = __webpack_require__(154);

      exports.BoxMuller = box_muller_1.BoxMuller;

      var ahrens_dieter_1 = __webpack_require__(153);

      exports.AhrensDieter = ahrens_dieter_1.AhrensDieter;

      var inversion_1 = __webpack_require__(72);

      exports.Inversion = inversion_1.Inversion;

      var kinderman_ramage_1 = __webpack_require__(156);

      exports.KindermanRamage = kinderman_ramage_1.KindermanRamage;

      var inormal_rng_1 = __webpack_require__(15);

      exports.IRNGNormal = inormal_rng_1.IRNGNormal;
      /***/
    },
    /* 9 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var toms708_1 = __webpack_require__(115);

      exports.Toms708 = toms708_1.Toms708;

      var NumberW_1 = __webpack_require__(63);

      exports.NumberW = NumberW_1.NumberW;
      /***/
    },
    /* 10 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var trunc = Math.trunc,
          ceil = Math.ceil,
          min = Math.min,
          log2 = Math.log2,
          pow = Math.pow;
      var now = Date.now;

      function timeseed() {
        var n = now();

        do {
          now();
        } while (now() - n < 500);

        var nBits = min(32, ceil(log2(n)));
        var lowBits = trunc(nBits / 2);
        var hi = trunc(n / pow(2, lowBits));
        var lo = n - hi * pow(2, lowBits);
        var buf = new ArrayBuffer(4);
        var reverser = new Uint8Array(buf);
        var uint32 = new Uint32Array(buf);
        uint32[0] = lo ^ hi;
        reverser.reverse();
        return uint32[0];
      }

      exports.timeseed = timeseed;
      /***/
    },
    /* 11 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var gamma_fn_1 = __webpack_require__(29);

      var lgamma_fn_1 = __webpack_require__(4);

      var lgammacor_1 = __webpack_require__(42);

      var r_func_1 = __webpack_require__(2);

      var log = Math.log,
          log1p = Math.log1p;
      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite,
          ML_POSINF = Number.POSITIVE_INFINITY,
          ML_NEGINF = Number.NEGATIVE_INFINITY;
      var printer = debug('lbeta');

      function lbeta(_a, _b) {
        return r_func_1.multiplexer(_a, _b)(function (a, b) {
          return internal_lbeta(a, b);
        });
      }

      exports.lbeta = lbeta;

      function internal_lbeta(a, b) {
        var corr;
        var p;
        var q;
        if (ISNAN(a) || ISNAN(b)) return a + b;
        p = q = a;
        if (b < p) p = b;
        if (b > q) q = b;
        if (p < 0) return _general_1.ML_ERR_return_NAN(printer);else if (p === 0) {
          return ML_POSINF;
        } else if (!R_FINITE(q)) {
          return ML_NEGINF;
        }

        if (p >= 10) {
          corr = lgammacor_1.lgammacor(p) + lgammacor_1.lgammacor(q) - lgammacor_1.lgammacor(p + q);
          return log(q) * -0.5 + _general_1.M_LN_SQRT_2PI + corr + (p - 0.5) * log(p / (p + q)) + q * log1p(-p / (p + q));
        } else if (q >= 10) {
          corr = lgammacor_1.lgammacor(q) - lgammacor_1.lgammacor(p + q);
          return lgamma_fn_1.lgammafn(p) + corr + p - p * log(p + q) + (q - 0.5) * log1p(-p / (p + q));
        } else {
          return log(gamma_fn_1.gammafn(p) * (gamma_fn_1.gammafn(q) / gamma_fn_1.gammafn(p + q)));
        }
      }

      exports.internal_lbeta = internal_lbeta;
      /***/
    },
    /* 12 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var toms708_1 = __webpack_require__(9);

      var r_func_1 = __webpack_require__(2);

      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite;
      var M_LN2 = Math.LN2,
          log = Math.log;
      var printer_pbeta_raw = debug('pbeta_raw');

      function pbeta_raw(x, a, b, lower_tail, log_p) {
        if (a === 0 || b === 0 || !R_FINITE(a) || !R_FINITE(b)) {
          if (a === 0 && b === 0) return log_p ? -M_LN2 : 0.5;
          if (a === 0 || a / b === 0) return _general_1.R_DT_1(lower_tail, log_p);
          if (b === 0 || b / a === 0) return _general_1.R_DT_0(lower_tail, log_p);
          if (x < 0.5) return _general_1.R_DT_0(lower_tail, log_p);else return _general_1.R_DT_1(lower_tail, log_p);
        }

        var x1 = 0.5 - x + 0.5;
        var w = new toms708_1.NumberW(0);
        var wc = new toms708_1.NumberW(0);
        var ierr = new toms708_1.NumberW(0);
        printer_pbeta_raw('before Toms708.bratio, a=%d, b=%d, x=%d, w=%d,wc=%d, ierr=%d', a, b, x, w.val, wc.val, ierr.val);
        toms708_1.Toms708.bratio(a, b, x, x1, w, wc, ierr);
        printer_pbeta_raw('after Toms708.bratio, a=%d, b=%d, x=%d, w=%d,wc=%d, ierr=%d', a, b, x, w.val, wc.val, ierr.val);
        if (ierr.val && ierr.val !== 11 && ierr.val !== 14) printer_pbeta_raw('pbeta_raw(%d, a=%d, b=%d, ..) -> bratio() gave error code %d', x, a, b, ierr);

        if (log_p) {
          w.val = log(w.val);
          wc.val = log(wc.val);
        }

        return lower_tail ? w.val : wc.val;
      }

      exports.pbeta_raw = pbeta_raw;
      var printer_pbeta = debug('pbeta');

      function pbeta(q, a, b) {
        var lowerTail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var logP = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        return r_func_1.map(q)(function (x) {
          printer_pbeta('pbeta(q=%d, a=%d, b=%d, l.t=%s, ln=%s)', x, a, b, lowerTail, logP);
          if (ISNAN(x) || ISNAN(a) || ISNAN(b)) return NaN;
          if (a < 0 || b < 0) return _general_1.ML_ERR_return_NAN(printer_pbeta);
          if (x <= 0) return _general_1.R_DT_0(lowerTail, logP);
          if (x >= 1) return _general_1.R_DT_1(lowerTail, logP);
          return pbeta_raw(x, a, b, lowerTail, logP);
        });
      }

      exports.pbeta = pbeta;
      /***/
    },
    /* 13 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var rgamma_1 = __webpack_require__(30);

      var r_func_1 = __webpack_require__(2);

      var R_FINITE = Number.isFinite;
      var printer = debug('rchisq');
      var sequence = r_func_1.seq()();

      function rchisq(n, df, rng) {
        return r_func_1.map(sequence(n))(function () {
          if (!R_FINITE(df) || df < 0.0) {
            return _general_1.ML_ERR_return_NAN(printer);
          }

          return rgamma_1.rgamma(1, df / 2.0, 2.0, rng);
        });
      }

      exports.rchisq = rchisq;
      /***/
    },
    /* 14 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var IRNGType;

      (function (IRNGType) {
        IRNGType[IRNGType["WICHMANN_HILL"] = 0] = "WICHMANN_HILL";
        IRNGType[IRNGType["MARSAGLIA_MULTICARRY"] = 1] = "MARSAGLIA_MULTICARRY";
        IRNGType[IRNGType["SUPER_DUPER"] = 2] = "SUPER_DUPER";
        IRNGType[IRNGType["MERSENNE_TWISTER"] = 3] = "MERSENNE_TWISTER";
        IRNGType[IRNGType["KNUTH_TAOCP"] = 4] = "KNUTH_TAOCP";
        IRNGType[IRNGType["KNUTH_TAOCP2002"] = 5] = "KNUTH_TAOCP2002";
        IRNGType[IRNGType["LECUYER_CMRG"] = 6] = "LECUYER_CMRG";
      })(IRNGType = exports.IRNGType || (exports.IRNGType = {}));
      /***/

    },
    /* 15 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var r_func_1 = __webpack_require__(2);

      var irng_1 = __webpack_require__(7);

      var IRNGNormal = /*#__PURE__*/function () {
        function IRNGNormal(_rng) {
          _classCallCheck(this, IRNGNormal);

          this.rng = _rng;
          this.unif_rand = this.unif_rand.bind(this);
          this.norm_rand = this.norm_rand.bind(this);
          this.internal_norm_rand = this.internal_norm_rand.bind(this);
        }

        _createClass(IRNGNormal, [{
          key: "norm_rand",
          value: function norm_rand() {
            var _this2 = this;

            var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            n = !n || n < 0 ? 1 : n;
            return r_func_1.map(irng_1.segFnCache()(n))(function () {
              return _this2.internal_norm_rand();
            });
          }
        }, {
          key: "unif_rand",
          value: function unif_rand() {
            var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            return this.rng.unif_rand(n);
          }
        }]);

        return IRNGNormal;
      }();

      exports.IRNGNormal = IRNGNormal;
      /***/
    },
    /* 16 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var irng_1 = __webpack_require__(7);

      exports.IRNG = irng_1.IRNG;

      var knuth_taocp_1 = __webpack_require__(149);

      var knuth_taocp_2002_1 = __webpack_require__(148);

      var lecuyer_cmrg_1 = __webpack_require__(151);

      var marsaglia_multicarry_1 = __webpack_require__(152);

      var mersenne_twister_1 = __webpack_require__(5);

      var normal_1 = __webpack_require__(8);

      var inormal_rng_1 = __webpack_require__(15);

      exports.IRNGNormal = inormal_rng_1.IRNGNormal;

      var super_duper_1 = __webpack_require__(157);

      var timeseed_1 = __webpack_require__(10);

      var wichmann_hill_1 = __webpack_require__(158);

      exports.rng = {
        KnuthTAOCP: knuth_taocp_1.KnuthTAOCP,
        KnuthTAOCP2002: knuth_taocp_2002_1.KnuthTAOCP2002,
        LecuyerCMRG: lecuyer_cmrg_1.LecuyerCMRG,
        MarsagliaMultiCarry: marsaglia_multicarry_1.MarsagliaMultiCarry,
        MersenneTwister: mersenne_twister_1.MersenneTwister,
        normal: {
          AhrensDieter: normal_1.AhrensDieter,
          BoxMuller: normal_1.BoxMuller,
          BuggyKindermanRamage: normal_1.BuggyKindermanRamage,
          Inversion: normal_1.Inversion,
          KindermanRamage: normal_1.KindermanRamage
        },
        SuperDuper: super_duper_1.SuperDuper,
        timeseed: timeseed_1.timeseed,
        WichmannHill: wichmann_hill_1.WichmannHill
      };
      /***/
    },
    /* 17 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var deviance_1 = __webpack_require__(65);

      var r_func_1 = __webpack_require__(2);

      var stirling_1 = __webpack_require__(44);

      var log = Math.log,
          log1p = Math.log1p,
          R_forceint = Math.round;
      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite;
      var printer = debug('dbinom');

      function dbinom_raw(x, n, p, q, give_log) {
        var lf;
        var lc;
        if (p === 0) return x === 0 ? _general_1.R_D__1(give_log) : _general_1.R_D__0(give_log);
        if (q === 0) return x === n ? _general_1.R_D__1(give_log) : _general_1.R_D__0(give_log);

        if (x === 0) {
          if (n === 0) return _general_1.R_D__1(give_log);

          var _lc = p < 0.1 ? -deviance_1.bd0(n, n * q) - n * p : n * log(q);

          return _general_1.R_D_exp(give_log, _lc);
        }

        if (x === n) {
          lc = q < 0.1 ? -deviance_1.bd0(n, n * p) - n * q : n * log(p);
          return _general_1.R_D_exp(give_log, lc);
        }

        if (x < 0 || x > n) return _general_1.R_D__0(give_log);
        lc = stirling_1.stirlerr(n) - stirling_1.stirlerr(x) - stirling_1.stirlerr(n - x) - deviance_1.bd0(x, n * p) - deviance_1.bd0(n - x, n * q);
        lf = _general_1.M_LN_2PI + log(x) + log1p(-x / n);
        return _general_1.R_D_exp(give_log, lc - 0.5 * lf);
      }

      exports.dbinom_raw = dbinom_raw;

      function dbinom(xx, n, p) {
        var logX = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        return r_func_1.map(xx)(function (x) {
          if (ISNAN(x) || ISNAN(n) || ISNAN(p)) return x + n + p;
          if (p < 0 || p > 1 || _general_1.R_D_negInonint(n)) return _general_1.ML_ERR_return_NAN(printer);

          _general_1.R_D_nonint_check(logX, x, printer);

          if (x < 0 || !R_FINITE(x)) return _general_1.R_D__0(logX);
          n = R_forceint(n);
          x = R_forceint(x);
          return dbinom_raw(x, n, p, 1 - p, logX);
        });
      }

      exports.dbinom = dbinom;
      /***/
    },
    /* 18 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var expm1_1 = __webpack_require__(3);

      var dnorm_1 = __webpack_require__(31);

      var pnorm_1 = __webpack_require__(19);

      var dpois_1 = __webpack_require__(22);

      var lgamma_fn_1 = __webpack_require__(4);

      var M_LN2 = Math.LN2,
          log1p = Math.log1p,
          expm1 = Math.expm1,
          sqrt = Math.sqrt,
          floor = Math.floor,
          pow = Math.pow,
          log = Math.log,
          exp = Math.exp,
          fmax2 = Math.max,
          fabs = Math.abs;
      var ISNAN = Number.isNaN,
          DBL_MIN = Number.MIN_VALUE,
          DBL_EPSILON = Number.EPSILON,
          R_FINITE = Number.isFinite,
          ML_POSINF = Number.POSITIVE_INFINITY;
      var isArray = Array.isArray;

      var sqr = function sqr(x) {
        return x * x;
      };

      var scalefactor = sqr(sqr(sqr(4294967296.0)));
      var M_cutoff = M_LN2 * _general_1.DBL_MAX_EXP / DBL_EPSILON;

      function logcf(x, i, d, eps) {
        var c1 = 2 * d;
        var c2 = i + d;
        var c4 = c2 + d;
        var a1 = c2;
        var b1 = i * (c2 - i * x);
        var b2 = d * d * x;
        var a2 = c4 * c2 - b2;
        b2 = c4 * b1 - i * b2;

        while (fabs(a2 * b1 - a1 * b2) > fabs(eps * b1 * b2)) {
          var c3 = c2 * c2 * x;
          c2 += d;
          c4 += d;
          a1 = c4 * a2 - c3 * a1;
          b1 = c4 * b2 - c3 * b1;
          c3 = c1 * c1 * x;
          c1 += d;
          c4 += d;
          a2 = c4 * a1 - c3 * a2;
          b2 = c4 * b1 - c3 * b2;

          if (fabs(b2) > scalefactor) {
            a1 /= scalefactor;
            b1 /= scalefactor;
            a2 /= scalefactor;
            b2 /= scalefactor;
          } else if (fabs(b2) < 1 / scalefactor) {
            a1 *= scalefactor;
            b1 *= scalefactor;
            a2 *= scalefactor;
            b2 *= scalefactor;
          }
        }

        return a2 / b2;
      }

      function log1pmx(x) {
        var minLog1Value = -0.79149064;
        if (x > 1 || x < minLog1Value) return log1p(x) - x;else {
          var r = x / (2 + x);
          var y = r * r;

          if (fabs(x) < 1e-2) {
            var two = 2;
            return r * ((((two / 9 * y + two / 7) * y + two / 5) * y + two / 3) * y - x);
          } else {
            var tol_logcf = 1e-14;
            return r * (2 * y * logcf(y, 3, 2, tol_logcf) - x);
          }
        }
      }

      function lgamma1p(a) {
        var eulers_const = 0.5772156649015328606065120900824024;
        var N = 40;
        var coeffs = [0.3224670334241132182362075833230126, 0.6735230105319809513324605383715e-1, 0.2058080842778454787900092413529198e-1, 0.7385551028673985266273097291406834e-2, 0.2890510330741523285752988298486755e-2, 0.1192753911703260977113935692828109e-2, 0.5096695247430424223356548135815582e-3, 0.2231547584535793797614188036013401e-3, 0.994575127818085337145958900319017e-4, 0.4492623673813314170020750240635786e-4, 0.2050721277567069155316650397830591e-4, 0.9439488275268395903987425104415055e-5, 0.4374866789907487804181793223952411e-5, 0.2039215753801366236781900709670839e-5, 0.9551412130407419832857179772951265e-6, 0.4492469198764566043294290331193655e-6, 0.2120718480555466586923135901077628e-6, 0.1004322482396809960872083050053344e-6, 0.476981016936398056576019341724673e-7, 0.2271109460894316491031998116062124e-7, 0.1083865921489695409107491757968159e-7, 0.5183475041970046655121248647057669e-8, 0.2483674543802478317185008663991718e-8, 0.119214014058609120744254820277464e-8, 0.5731367241678862013330194857961011e-9, 0.2759522885124233145178149692816341e-9, 0.1330476437424448948149715720858008e-9, 0.6422964563838100022082448087644648e-10, 0.3104424774732227276239215783404066e-10, 0.1502138408075414217093301048780668e-10, 0.7275974480239079662504549924814047e-11, 0.3527742476575915083615072228655483e-11, 0.1711991790559617908601084114443031e-11, 0.8315385841420284819798357793954418e-12, 0.4042200525289440065536008957032895e-12, 0.1966475631096616490411045679010286e-12, 0.9573630387838555763782200936508615e-13, 0.4664076026428374224576492565974577e-13, 0.2273736960065972320633279596737272e-13, 0.1109139947083452201658320007192334e-13];
        var c = 0.2273736845824652515226821577978691e-12;
        var tol_logcf = 1e-14;
        var lgam;
        var i;
        if (fabs(a) >= 0.5) return lgamma_fn_1.lgammafn(a + 1);
        lgam = c * logcf(-a / 2, N + 2, 1, tol_logcf);

        for (i = N - 1; i >= 0; i--) {
          lgam = coeffs[i] - a * lgam;
        }

        return (a * lgam - eulers_const) * a - log1pmx(a);
      }

      exports.lgamma1p = lgamma1p;
      var pr_dpois_wrap = debug('dpois_wrap');

      function dpois_wrap(x_plus_1, lambda, give_log) {
        pr_dpois_wrap('dpois_wrap(x+1=%d, lambda=%d, log=%s)', x_plus_1, lambda, give_log);

        if (!R_FINITE(lambda)) {
          return _general_1.R_D__0(give_log);
        }

        if (x_plus_1 > 1) return dpois_1.dpois_raw(x_plus_1 - 1, lambda, give_log);
        if (lambda > fabs(x_plus_1 - 1) * M_cutoff) return _general_1.R_D_exp(give_log, -lambda - lgamma_fn_1.lgammafn(x_plus_1));else {
          var d = dpois_1.dpois_raw(x_plus_1, lambda, give_log);
          pr_dpois_wrap('  -> d=dpois_raw(..)=%d', d);
          return give_log ? d + log(x_plus_1 / lambda) : d * (x_plus_1 / lambda);
        }
      }

      var pr_pgamma_smallx = debug('pgamma_smallx');

      function pgamma_smallx(x, alph, lowerTail, logP) {
        var sum = 0;
        var c = alph;
        var n = 0;
        var term;
        pr_pgamma_smallx(' pg_smallx(x=%d, alph=%d): ', x, alph);

        do {
          n++;
          c *= -x / n;
          term = c / (alph + n);
          sum += term;
        } while (fabs(term) > DBL_EPSILON * fabs(sum));

        pr_pgamma_smallx('%d terms --> conv.sum=%d;', n, sum);

        if (lowerTail) {
          var f1 = logP ? log1p(sum) : 1 + sum;
          var f2;

          if (alph > 1) {
            f2 = dpois_1.dpois_raw(alph, x, logP);
            f2 = logP ? f2 + x : f2 * exp(x);
          } else if (logP) f2 = alph * log(x) - lgamma1p(alph);else f2 = pow(x, alph) / exp(lgamma1p(alph));

          pr_pgamma_smallx(' (f1,f2)= (%d,%d)', f1, f2);
          return logP ? f1 + f2 : f1 * f2;
        } else {
          var lf2 = alph * log(x) - lgamma1p(alph);
          pr_pgamma_smallx(' 1:%d  2:%d', alph * log(x), lgamma1p(alph));
          pr_pgamma_smallx(' sum=%d  log(1+sum)=%d	 lf2=%d', sum, log1p(sum), lf2);
          if (logP) return expm1_1.R_Log1_Exp(log1p(sum) + lf2);else {
            var f1m1 = sum;
            var f2m1 = expm1(lf2);
            return -(f1m1 + f2m1 + f1m1 * f2m1);
          }
        }
      }

      function pd_upper_series(x, y, logP) {
        var term = x / y;
        var sum = term;

        do {
          y++;
          term *= x / y;
          sum += term;
        } while (term > sum * DBL_EPSILON);

        return logP ? log(sum) : sum;
      }

      var pr_pd_lower_cf = debug('pd_lower_cf');

      function pd_lower_cf(y, d) {
        var f = 0.0;
        var of;
        var f0;
        var i;
        var c2;
        var c3;
        var c4;
        var a1;
        var b1;
        var a2;
        var b2;
        var max_it = 200000;
        pr_pd_lower_cf('pd_lower_cf(y=%d, d=%d)', y, d);
        if (y === 0) return 0;
        f0 = y / d;

        if (fabs(y - 1) < fabs(d) * DBL_EPSILON) {
          pr_pd_lower_cf(' very small "y" -> returning (y/d)');
          return f0;
        }

        if (f0 > 1) f0 = 1;
        c2 = y;
        c4 = d;
        a1 = 0;
        b1 = 1;
        a2 = y;
        b2 = d;

        while (b2 > scalefactor) {
          a1 /= scalefactor;
          b1 /= scalefactor;
          a2 /= scalefactor;
          b2 /= scalefactor;
        }

        i = 0;
        of = -1;

        while (i < max_it) {
          i++;
          c2--;
          c3 = i * c2;
          c4 += 2;
          a1 = c4 * a2 + c3 * a1;
          b1 = c4 * b2 + c3 * b1;
          i++;
          c2--;
          c3 = i * c2;
          c4 += 2;
          a2 = c4 * a1 + c3 * a2;
          b2 = c4 * b1 + c3 * b2;

          if (b2 !== 0) {
            f = a2 / b2;

            if (fabs(f - of) <= DBL_EPSILON * fmax2(f0, fabs(f))) {
              pr_pd_lower_cf(' %d iter.\n', i);
              return f;
            }

            of = f;
          }
        }

        pr_pd_lower_cf(" ** NON-convergence in pgamma()'s pd_lower_cf() f= %d.", f);
        return f;
      }

      var pr_pd_lower_series = debug('pd_lower_series');

      function pd_lower_series(lambda, y) {
        var term = 1;
        var sum = 0;
        pr_pd_lower_series('pd_lower_series(lam=%d, y=%d) ...', lambda, y);

        while (y >= 1 && term > sum * DBL_EPSILON) {
          term *= y / lambda;
          sum += term;
          y--;
        }

        pr_pd_lower_series(' done: term=%d, sum=%d, y= %d', term, sum, y);

        if (y !== floor(y)) {
          var f;
          pr_pd_lower_series(' y not int: add another term ');
          f = pd_lower_cf(y, lambda + 1 - y);
          pr_pd_lower_series('  (= %d) * term = %d to sum %d', f, term * f, sum);
          sum += term * f;
        }

        return sum;
      }

      function dpnorm(x, lowerTail, lp) {
        if (x < 0) {
          x = -x;
          lowerTail = !lowerTail;
        }

        if (x > 10 && !lowerTail) {
          var term = 1 / x;
          var sum = term;
          var x2 = x * x;
          var i = 1;

          do {
            term *= -i / x2;
            sum += term;
            i += 2;
          } while (fabs(term) > DBL_EPSILON * sum);

          return 1 / sum;
        } else {
          var d = dnorm_1.dnorm4(x, 0, 1, false);
          return d / exp(lp);
        }
      }

      var pr_ppois_asymp = debug('ppois_asymp');

      function ppois_asymp(x, lambda, lowerTail, logP) {
        var coefs_a = [-1e99, 2 / 3, -4 / 135, 8 / 2835, 16 / 8505, -8992 / 12629925, -334144 / 492567075, 698752 / 1477701225];
        var coefs_b = [-1e99, 1 / 12, 1 / 288, -139 / 51840, -571 / 2488320, 163879 / 209018880, 5246819 / 75246796800, -534703531 / 902961561600];
        var elfb;
        var elfb_term;
        var res12;
        var res1_term;
        var res1_ig;
        var res2_term;
        var res2_ig;
        var dfm;
        var pt_;
        var s2pt;
        var f;
        var np;
        var i;
        dfm = lambda - x;
        pt_ = -log1pmx(dfm / x);
        s2pt = sqrt(2 * x * pt_);
        if (dfm < 0) s2pt = -s2pt;
        res12 = 0;
        res1_ig = res1_term = sqrt(x);
        res2_ig = res2_term = s2pt;

        for (i = 1; i < 8; i++) {
          res12 += res1_ig * coefs_a[i];
          res12 += res2_ig * coefs_b[i];
          res1_term *= pt_ / i;
          res2_term *= 2 * pt_ / (2 * i + 1);
          res1_ig = res1_ig / x + res1_term;
          res2_ig = res2_ig / x + res2_term;
        }

        elfb = x;
        elfb_term = 1;

        for (i = 1; i < 8; i++) {
          elfb += elfb_term * coefs_b[i];
          elfb_term /= x;
        }

        if (!lowerTail) elfb = -elfb;
        pr_ppois_asymp('res12 = %d   elfb=%d', elfb, res12);
        f = res12 / elfb;
        np = pnorm_1.pnorm5(s2pt, 0.0, 1.0, !lowerTail, logP);

        if (logP) {
          var n_d_over_p = dpnorm(s2pt, !lowerTail, np);
          pr_ppois_asymp('pp*_asymp(): f=%d	 np=e^%d  nd/np=%d  f*nd/np=%d', f, np, n_d_over_p, f * n_d_over_p);
          return np + log1p(f * n_d_over_p);
        } else {
          var nd = dnorm_1.dnorm4(s2pt, 0, 1, logP);
          pr_ppois_asymp('pp*_asymp(): f=%d	 np=%d  nd=%d  f*nd=%d', f, np, nd, f * nd);
          return np + f * nd;
        }
      }

      var pr_pgamma_raw = debug('pgamma_raw');

      function pgamma_raw(x, alph) {
        var lowerTail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var logP = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        var res;
        pr_pgamma_raw('pgamma_raw(x=%d, alph=%d, low=%s, log=%s)', x, alph, lowerTail, logP);

        var rc = _general_1.R_P_bounds_01(lowerTail, logP, x, 0, ML_POSINF);

        if (rc !== undefined) {
          return rc;
        }

        if (x < 1) {
          res = pgamma_smallx(x, alph, lowerTail, logP);
        } else if (x <= alph - 1 && x < 0.8 * (alph + 50)) {
          var sum = pd_upper_series(x, alph, logP);
          var d = dpois_wrap(alph, x, logP);
          pr_pgamma_raw(' alph "large": sum=pd_upper*()= %d, d=dpois_w(*)= %d', sum, d);
          if (!lowerTail) res = logP ? expm1_1.R_Log1_Exp(d + sum) : 1 - d * sum;else res = logP ? sum + d : sum * d;
        } else if (alph - 1 < x && alph < 0.8 * (x + 50)) {
          var _sum;

          var _d = dpois_wrap(alph, x, logP);

          pr_pgamma_raw('  x "large": d=dpois_w(*)= %d ', _d);

          if (alph < 1) {
            if (x * DBL_EPSILON > 1 - alph) _sum = _general_1.R_D__1(logP);else {
              var f = pd_lower_cf(alph, x - (alph - 1)) * x / alph;
              _sum = logP ? log(f) : f;
            }
          } else {
            _sum = pd_lower_series(x, alph - 1);
            _sum = logP ? log1p(_sum) : 1 + _sum;
          }

          pr_pgamma_raw(', sum= %d', _sum);
          if (!lowerTail) res = logP ? _sum + _d : _sum * _d;else res = logP ? expm1_1.R_Log1_Exp(_d + _sum) : 1 - _d * _sum;
        } else {
          pr_pgamma_raw(' using ppois_asymp()');
          res = ppois_asymp(alph - 1, x, !lowerTail, logP);
        }

        if (!logP && res < DBL_MIN / DBL_EPSILON) {
          pr_pgamma_raw(' very small res=%.14g; -> recompute via log\n', res);
          return exp(pgamma_raw(x, alph, lowerTail, true));
        } else return res;
      }

      exports.pgamma_raw = pgamma_raw;
      var printer_pgamma = debug('pgamma');

      function pgamma(q, shape, scale, lowerTail, logP) {
        var fa = isArray(q) ? q : [q];
        var result = fa.map(function (x) {
          if (ISNAN(x) || ISNAN(shape) || ISNAN(scale)) {
            return x + shape + scale;
          }

          if (shape < 0 || scale <= 0) return _general_1.ML_ERR_return_NAN(printer_pgamma);
          x /= scale;
          if (ISNAN(x)) return x;
          if (shape === 0) return x <= 0 ? _general_1.R_DT_0(lowerTail, logP) : _general_1.R_DT_1(lowerTail, logP);
          return pgamma_raw(x, shape, lowerTail, logP);
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.pgamma = pgamma;
      /***/
    },
    /* 19 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var r_func_1 = __webpack_require__(2);

      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite,
          DBL_EPSILON = Number.EPSILON,
          ML_NAN = Number.NaN,
          DBL_MIN = Number.MIN_VALUE;
      var trunc = Math.trunc,
          log = Math.log,
          exp = Math.exp,
          fabs = Math.abs,
          log1p = Math.log1p;

      var toms708_1 = __webpack_require__(9);

      var SIXTEN = 16;
      var printer = debug('pnorm5');

      function do_del(ccum, cum, log_p, X, temp, upper, lower, x) {
        var xsq = trunc(X * SIXTEN) / SIXTEN;
        var del = (X - xsq) * (X + xsq);

        if (log_p) {
          cum.val = -xsq * xsq * 0.5 + -del * 0.5 + log(temp);
          if (lower && x > 0 || upper && x <= 0) ccum.val = log1p(-exp(-xsq * xsq * 0.5) * exp(-del * 0.5) * temp);
        } else {
          cum.val = exp(-xsq * xsq * 0.5) * exp(-del * 0.5) * temp;
          ccum.val = 1.0 - cum.val;
        }
      }

      function pnorm5(q) {
        var mu = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var sigma = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var lowerTail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var logP = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        return r_func_1.map(q)(function (fx) {
          var p = new toms708_1.NumberW(0);
          var cp = new toms708_1.NumberW(0);
          if (ISNAN(fx) || ISNAN(mu) || ISNAN(sigma)) return fx + mu + sigma;
          if (!R_FINITE(fx) && mu === fx) return ML_NAN;

          if (sigma <= 0) {
            if (sigma < 0) return _general_1.ML_ERR_return_NAN(printer);
            return fx < mu ? _general_1.R_DT_0(lowerTail, logP) : _general_1.R_DT_1(lowerTail, logP);
          }

          p.val = (fx - mu) / sigma;
          if (!R_FINITE(p.val)) return fx < mu ? _general_1.R_DT_0(lowerTail, logP) : _general_1.R_DT_1(lowerTail, logP);
          fx = p.val;
          pnorm_both(fx, p, cp, !lowerTail, logP);
          return lowerTail ? p.val : cp.val;
        });
      }

      exports.pnorm5 = pnorm5;

      function pnorm_both(x, cum, ccum, i_tail, log_p) {
        var a = [2.2352520354606839287, 161.02823106855587881, 1067.6894854603709582, 18154.981253343561249, 0.065682337918207449113];
        var b = [47.20258190468824187, 976.09855173777669322, 10260.932208618978205, 45507.789335026729956];
        var c = [0.39894151208813466764, 8.8831497943883759412, 93.506656132177855979, 597.27027639480026226, 2494.5375852903726711, 6848.1904505362823326, 11602.651437647350124, 9842.7148383839780218, 1.0765576773720192317e-8];
        var d = [22.266688044328115691, 235.38790178262499861, 1519.377599407554805, 6485.558298266760755, 18615.571640885098091, 34900.952721145977266, 38912.003286093271411, 19685.429676859990727];
        var p = [0.21589853405795699, 0.1274011611602473639, 0.022235277870649807, 0.001421619193227893466, 2.9112874951168792e-5, 0.02307344176494017303];
        var q = [1.28426009614491121, 0.468238212480865118, 0.0659881378689285515, 0.00378239633202758244, 7.29751555083966205e-5];
        var xden;
        var xnum;
        var temp;
        var eps;
        var xsq;
        var y;
        var min = DBL_MIN;
        var i = new Int32Array([0]);
        var lower;
        var upper;

        if (ISNAN(x)) {
          cum.val = ccum.val = x;
          return;
        }

        eps = DBL_EPSILON * 0.5;
        lower = i_tail !== true;
        upper = i_tail !== false;
        y = fabs(x);

        if (y <= 0.67448975) {
          if (y > eps) {
            xsq = x * x;
            xnum = a[4] * xsq;
            xden = xsq;

            for (i[0] = 0; i[0] < 3; ++i[0]) {
              xnum = (xnum + a[i[0]]) * xsq;
              xden = (xden + b[i[0]]) * xsq;
            }
          } else xnum = xden = 0.0;

          temp = x * (xnum + a[3]) / (xden + b[3]);
          if (lower) cum.val = 0.5 + temp;
          if (upper) ccum.val = 0.5 - temp;

          if (log_p) {
            if (lower) cum.val = log(cum.val);
            if (upper) ccum.val = log(ccum.val);
          }
        } else if (y <= _general_1.M_SQRT_32) {
          xnum = c[8] * y;
          xden = y;

          for (i[0] = 0; i[0] < 7; ++i[0]) {
            xnum = (xnum + c[i[0]]) * y;
            xden = (xden + d[i[0]]) * y;
          }

          temp = (xnum + c[7]) / (xden + d[7]);
          do_del(ccum, cum, log_p, y, temp, upper, lower, x);

          if (x > 0) {
            temp = cum.val;

            if (lower) {
              cum.val = ccum.val;
            }

            ccum.val = temp;
          }
        } else if (log_p && y < 1e170 || lower && -37.5193 < x && x < 8.2924 || upper && -8.2924 < x && x < 37.5193) {
          xsq = 1.0 / (x * x);
          xnum = p[5] * xsq;
          xden = xsq;

          for (i[0] = 0; i[0] < 4; ++i[0]) {
            xnum = (xnum + p[i[0]]) * xsq;
            xden = (xden + q[i[0]]) * xsq;
          }

          temp = xsq * (xnum + p[4]) / (xden + q[4]);
          temp = (_general_1.M_1_SQRT_2PI - temp) / y;
          do_del(ccum, cum, log_p, x, temp, upper, lower, x);

          if (x > 0) {
            temp = cum.val;

            if (lower) {
              cum.val = ccum.val;
            }

            ccum.val = temp;
          }
        } else {
          if (x > 0) {
            cum.val = _general_1.R_D__1(log_p);
            ccum.val = _general_1.R_D__0(log_p);
          } else {
            cum.val = _general_1.R_D__0(log_p);
            ccum.val = _general_1.R_D__1(log_p);
          }
        }

        if (log_p) {
          if (cum.val > -min) cum.val = -0;

          if (ccum.val > -min) {
            ccum.val = -0;
          }
        } else {
          if (cum.val < min) cum.val = 0;
          if (ccum.val < min) ccum.val = 0;
        }

        return;
      }

      exports.pnorm_both = pnorm_both;
      /***/
    },
    /* 20 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.i2_32m1 = 2.328306437080797e-10;

      function fixup(x) {
        if (x <= 0.0) return 0.5 * exports.i2_32m1;
        if (1.0 - x <= 0.0) return 1.0 - 0.5 * exports.i2_32m1;
        return x;
      }

      exports.fixup = fixup;
      /***/
    },
    /* 21 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var dpois_1 = __webpack_require__(22);

      var r_func_1 = __webpack_require__(2);

      var log = Math.log;
      var ISNAN = Number.isNaN;
      var ML_POSINF = Infinity;
      var printer = debug('dgamma');

      function dgamma(xx, shape, scale) {
        var aslog = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        return r_func_1.map(xx)(function (x) {
          var pr;
          if (ISNAN(x) || ISNAN(shape) || ISNAN(scale)) return x + shape + scale;

          if (shape < 0 || scale <= 0) {
            return _general_1.ML_ERR_return_NAN(printer);
          }

          if (x < 0) {
            return _general_1.R_D__0(aslog);
          }

          if (shape === 0) {
            return x === 0 ? ML_POSINF : _general_1.R_D__0(aslog);
          }

          if (x === 0) {
            if (shape < 1) return ML_POSINF;

            if (shape > 1) {
              return _general_1.R_D__0(aslog);
            }

            return aslog ? -log(scale) : 1 / scale;
          }

          if (shape < 1) {
            pr = dpois_1.dpois_raw(shape, x / scale, aslog);
            return aslog ? pr + log(shape / x) : pr * shape / x;
          }

          pr = dpois_1.dpois_raw(shape - 1, x / scale, aslog);
          return aslog ? pr - log(scale) : pr / scale;
        });
      }

      exports.dgamma = dgamma;
      /***/
    },
    /* 22 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var deviance_1 = __webpack_require__(65);

      var lgamma_fn_1 = __webpack_require__(4);

      var r_func_1 = __webpack_require__(2);

      var stirling_1 = __webpack_require__(44);

      var R_forceint = Math.round,
          log = Math.log,
          PI = Math.PI;
      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite,
          DBL_MIN = Number.MIN_VALUE;
      var M_2PI = 2 * PI;
      var printer = debug('dpois');

      function dpois_raw(x, lambda, give_log) {
        if (lambda === 0) return x === 0 ? _general_1.R_D__1(give_log) : _general_1.R_D__0(give_log);
        if (!R_FINITE(lambda)) return _general_1.R_D__0(give_log);
        if (x < 0) return _general_1.R_D__0(give_log);
        if (x <= lambda * DBL_MIN) return _general_1.R_D_exp(give_log, -lambda);
        if (lambda < x * DBL_MIN) return _general_1.R_D_exp(give_log, -lambda + x * log(lambda) - lgamma_fn_1.lgammafn(x + 1));
        return _general_1.R_D_fexp(give_log, M_2PI * x, -stirling_1.stirlerr(x) - deviance_1.bd0(x, lambda));
      }

      exports.dpois_raw = dpois_raw;

      function dpois(_x, lambda) {
        var give_log = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        return r_func_1.map(_x)(function (x) {
          if (ISNAN(x) || ISNAN(lambda)) {
            return x + lambda;
          }

          if (lambda < 0) {
            return _general_1.ML_ERR_return_NAN(printer);
          }

          var rc = _general_1.R_D_nonint_check(give_log, x, printer);

          if (rc !== undefined) {
            return rc;
          }

          if (x < 0 || !R_FINITE(x)) {
            return _general_1.R_D__0(give_log);
          }

          x = R_forceint(x);
          return dpois_raw(x, lambda, give_log);
        });
      }

      exports.dpois = dpois;
      /***/
    },
    /* 23 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var fabs = Math.abs,
          M_PI = Math.PI;
      var ML_NAN = Number.NaN,
          ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite;
      var printer_cospi = debug('cospi');

      function cospi(x) {
        if (ISNAN(x)) return x;

        if (!R_FINITE(x)) {
          _general_1.ML_ERROR(_general_1.ME.ME_DOMAIN, '', printer_cospi);

          return ML_NAN;
        }

        x = _general_1.fmod(fabs(x), 2);
        if (_general_1.fmod(x, 1) === 0.5) return 0;
        if (x === 1) return -1;
        if (x === 0) return 1;
        return Math.cos(M_PI * x);
      }

      exports.cospi = cospi;
      var printer_tanpi = debug('tanpi');

      function tanpi(x) {
        if (ISNAN(x)) return x;

        if (!R_FINITE(x)) {
          _general_1.ML_ERROR(_general_1.ME.ME_DOMAIN, '', printer_tanpi);

          return ML_NAN;
        }

        x = _general_1.fmod(x, 1);

        if (x <= -0.5) {
          x++;
        } else if (x > 0.5) {
          x--;
        }

        return x === 0 ? 0 : x === 0.5 ? ML_NAN : Math.tan(M_PI * x);
      }

      exports.tanpi = tanpi;

      function atanpi(x) {
        return Math.atan(x) / Math.PI;
      }

      exports.atanpi = atanpi;
      /***/
    },
    /* 24 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var M_PI = Math.PI;
      var ML_NAN = Number.NaN,
          ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite;
      var printer_sinpi = debug('sinpi');

      function sinpi(x) {
        if (ISNAN(x)) return x;

        if (!R_FINITE(x)) {
          _general_1.ML_ERROR(_general_1.ME.ME_DOMAIN, 'sinpi not finite', printer_sinpi);

          return ML_NAN;
        }

        x = _general_1.fmod(x, 2);
        if (x <= -1) x += 2;else if (x > 1) x -= 2;
        if (x === 0 || x === 1) return 0;
        if (x === 0.5) return 1;
        if (x === -0.5) return -1;
        return Math.sin(M_PI * x);
      }

      exports.sinpi = sinpi;
      /***/
    },
    /* 25 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var dgamma_1 = __webpack_require__(21);

      var pgamma_1 = __webpack_require__(18);

      var qgamma_1 = __webpack_require__(68);

      var rgamma_1 = __webpack_require__(30);

      var normal_1 = __webpack_require__(8);

      var r_func_1 = __webpack_require__(2);

      var gamma_fn_1 = __webpack_require__(29);

      var lgamma_fn_1 = __webpack_require__(4);

      var polygamma_1 = __webpack_require__(128);

      exports.special = {
        digamma: polygamma_1.digamma,
        gamma: gamma_fn_1.gammafn,
        lgamma: lgamma_fn_1.lgammafn,
        pentagamma: polygamma_1.pentagamma,
        psigamma: polygamma_1.psigamma,
        tetragamma: polygamma_1.tetragamma,
        trigamma: polygamma_1.trigamma
      };
      var abs = Math.abs;

      function Gamma() {
        var norm = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new normal_1.Inversion();
        var printer_n = debug('gamma_normalize_params');

        function gammaNormalizeParams(rate, scale) {
          if (scale === undefined && rate === undefined) {
            return 1;
          }

          if (scale !== undefined && rate !== undefined) {
            if (abs(scale * rate - 1) >= 1e-16) {
              printer_n('Both scale:%d and rate:%d are defined but scale <> 1/rate');
              return undefined;
            }

            return scale;
          }

          if (scale !== undefined && rate === undefined) {
            return scale;
          }

          if (scale === undefined && rate !== undefined) {
            return 1 / rate;
          }

          throw new Error('unreachable code, you cant be here!');
        }

        var printer_d = debug('dgamma');

        function dgamma(x, shape, rate, scale) {
          var asLog = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

          var _scale = gammaNormalizeParams(rate, scale);

          if (_scale !== undefined) {
            return dgamma_1.dgamma(x, shape, _scale, asLog);
          }

          printer_d('Cannot normalize to [scale]');
          return r_func_1.multiplexer(x)(function () {
            return NaN;
          });
        }

        var printer_p = debug('pgamma');

        function pgamma(q, shape, rate, scale) {
          var lowerTail = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
          var logP = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

          var _scale = gammaNormalizeParams(rate, scale);

          if (_scale !== undefined) {
            return pgamma_1.pgamma(q, shape, _scale, lowerTail, logP);
          }

          printer_p('Cannot normalize to [scale]');
          return r_func_1.multiplexer(q)(function () {
            return NaN;
          });
        }

        var printer_q = debug('qgamma');

        function qgamma(q, shape, rate, scale) {
          var lowerTail = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
          var logP = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

          var _scale = gammaNormalizeParams(rate, scale);

          if (_scale !== undefined) {
            return qgamma_1.qgamma(q, shape, _scale, lowerTail, logP);
          }

          printer_q('Cannot normalize to [scale]');
          return r_func_1.multiplexer(q)(function () {
            return NaN;
          });
        }

        var printer_r = debug('rgamma');

        function rgamma(n, shape, rate, scale) {
          var _scale = gammaNormalizeParams(rate, scale);

          if (_scale !== undefined) {
            return rgamma_1.rgamma(n, shape, _scale, norm);
          }

          printer_r('Cannot normalize to [scale]');
        }

        return Object.freeze({
          dgamma: dgamma,
          pgamma: pgamma,
          qgamma: qgamma,
          rgamma: rgamma
        });
      }

      exports.Gamma = Gamma;
      /***/
    },
    /* 26 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.nsig_BESS = 16;
      exports.ensig_BESS = 1e16;
      exports.rtnsig_BESS = 1e-4;
      exports.enmten_BESS = 8.9e-308;
      exports.enten_BESS = 1e308;
      exports.exparg_BESS = 709.;
      exports.xlrg_BESS_IJ = 1e5;
      exports.xlrg_BESS_Y = 1e8;
      exports.thresh_BESS_Y = 16.;
      exports.xmax_BESS_K = 705.342;
      exports.sqxmin_BESS_K = 1.49e-154;
      exports.M_eps_sinc = 2.149e-8;
      /***/
    },
    /* 27 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var fabs = Math.abs,
          log = Math.log,
          exp = Math.exp,
          round = Math.round;
      var isInteger = Number.isInteger,
          ML_NEGINF = Number.NEGATIVE_INFINITY,
          ISNAN = Number.isNaN;

      var lbeta_1 = __webpack_require__(11);

      var lgamma_fn_1 = __webpack_require__(4);

      var lgammafn_sign_1 = __webpack_require__(67);

      var r_func_1 = __webpack_require__(2);

      function lfastchoose(n, k) {
        return -log(n + 1) - lbeta_1.internal_lbeta(n - k + 1, k + 1);
      }

      function lfastchoose2(n, k, sChoose) {
        var r;
        r = lgammafn_sign_1.lgammafn_sign(n - k + 1, sChoose);
        return lgamma_fn_1.lgammafn(n + 1) - lgamma_fn_1.lgammafn(k + 1) - r;
      }

      function choose(_n, _k) {
        return r_func_1.multiplexer(_n, _k)(function (n, k) {
          return internal_choose(n, k);
        });
      }

      exports.choose = choose;

      function lchoose(_n, _k) {
        return r_func_1.multiplexer(_n, _k)(function (n, k) {
          return internal_lchoose(n, k);
        });
      }

      exports.lchoose = lchoose;
      var printer_lchoose = debug('lchoose');

      function internal_lchoose(n, k) {
        var k0 = k;
        k = Math.round(k);
        if (ISNAN(n) || ISNAN(k)) return n + k;
        if (fabs(k - k0) > 1e-7) printer_lchoose('"k" (%d) must be integer, rounded to %d', k0, k);

        if (k < 2) {
          if (k < 0) return ML_NEGINF;
          if (k === 0) return 0;
          return log(fabs(n));
        }

        if (n < 0) {
          return internal_lchoose(-n + k - 1, k);
        } else if (isInteger(n)) {
          n = round(n);
          if (n < k) return ML_NEGINF;
          if (n - k < 2) return internal_lchoose(n, n - k);
          return lfastchoose(n, k);
        }

        if (n < k - 1) {
          return lfastchoose2(n, k);
        }

        return lfastchoose(n, k);
      }

      exports.internal_lchoose = internal_lchoose;
      var k_small_max = 30;
      var printer_choose = debug('choose');

      function internal_choose(n, k) {
        var r;
        var k0 = k;
        k = round(k);
        if (ISNAN(n) || ISNAN(k)) return n + k;
        if (fabs(k - k0) > 1e-7) printer_choose('k (%d) must be integer, rounded to %d', k0, k);

        if (k < k_small_max) {
          var j;
          if (n - k < k && n >= 0 && isInteger(n)) k = n - k;
          if (k < 0) return 0;
          if (k === 0) return 1;
          r = n;

          for (j = 2; j <= k; j++) {
            r *= (n - j + 1) / j;
          }

          return isInteger(n) ? round(r) : r;
        }

        if (n < 0) {
          r = internal_choose(-n + k - 1, k);
          if (_general_1.isOdd(k)) r = -r;
          return r;
        } else if (isInteger(n)) {
          n = round(n);
          if (n < k) return 0;
          if (n - k < k_small_max) return internal_choose(n, n - k);
          return round(exp(lfastchoose(n, k)));
        }

        if (n < k - 1) {
          var schoose = [0];
          r = lfastchoose2(n, k, schoose);
          return schoose[0] * exp(r);
        }

        return exp(lfastchoose(n, k));
      }

      exports.internal_choose = internal_choose;
      /***/
    },
    /* 28 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      function exp_rand(unif_rand) {
        var q = [0.6931471805599453, 0.9333736875190459, 0.9888777961838675, 0.9984959252914960, 0.9998292811061389, 0.9999833164100727, 0.9999985691438767, 0.9999998906925558, 0.9999999924734159, 0.9999999995283275, 0.9999999999728814, 0.9999999999985598, 0.9999999999999289, 0.9999999999999968, 0.9999999999999999, 1.0000000000000000];
        var a = 0.;
        var u = unif_rand();

        while (u <= 0. || u >= 1.) {
          u = unif_rand();
        }

        while (true) {
          u += u;
          if (u > 1.) break;
          a += q[0];
        }

        u -= 1.;
        if (u <= q[0]) return a + u;
        var i = 0;
        var ustar = unif_rand();
        var umin = ustar;

        do {
          ustar = unif_rand();
          if (umin > ustar) umin = ustar;
          i++;
        } while (u > q[i]);

        return a + umin * q[0];
      }

      exports.exp_rand = exp_rand;
      /***/
    },
    /* 29 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var chebyshev_1 = __webpack_require__(37);

      var _general_1 = __webpack_require__(0);

      var stirling_1 = __webpack_require__(44);

      var trigonometry_1 = __webpack_require__(33);

      var lgammacor_1 = __webpack_require__(42);

      var debug = __webpack_require__(1);

      var printer = debug('gammafn');
      var ISNAN = Number.isNaN,
          ML_NAN = Number.NaN,
          ML_POSINF = Number.POSITIVE_INFINITY,
          ML_NEGINF = Number.NEGATIVE_INFINITY;
      var M_PI = Math.PI,
          fabs = Math.abs,
          round = Math.round,
          trunc = Math.trunc,
          exp = Math.exp,
          log = Math.log;
      var M_LN_SQRT_2PI = Math.log(Math.sqrt(2 * Math.PI));
      var gamcs = [+0.8571195590989331421920062399942e-2, +0.4415381324841006757191315771652e-2, +0.5685043681599363378632664588789e-1, -0.4219835396418560501012500186624e-2, +0.1326808181212460220584006796352e-2, -0.1893024529798880432523947023886e-3, +0.3606925327441245256578082217225e-4, -0.6056761904460864218485548290365e-5, +0.1055829546302283344731823509093e-5, -0.1811967365542384048291855891166e-6, +0.3117724964715322277790254593169e-7, -0.5354219639019687140874081024347e-8, +0.919327551985958894688778682594e-9, -0.1577941280288339761767423273953e-9, +0.2707980622934954543266540433089e-10, -0.4646818653825730144081661058933e-11, +0.7973350192007419656460767175359e-12, -0.1368078209830916025799499172309e-12, +0.2347319486563800657233471771688e-13, -0.4027432614949066932766570534699e-14, +0.6910051747372100912138336975257e-15, -0.1185584500221992907052387126192e-15, +0.2034148542496373955201026051932e-16, -0.3490054341717405849274012949108e-17, +0.5987993856485305567135051066026e-18, -0.1027378057872228074490069778431e-18, +0.1762702816060529824942759660748e-19, -0.3024320653735306260958772112042e-20, +0.5188914660218397839717833550506e-21, -0.8902770842456576692449251601066e-22, +0.1527474068493342602274596891306e-22, -0.2620731256187362900257328332799e-23, +0.4496464047830538670331046570666e-24, -0.7714712731336877911703901525333e-25, +0.1323635453126044036486572714666e-25, -0.2270999412942928816702313813333e-26, +0.3896418998003991449320816639999e-27, -0.6685198115125953327792127999999e-28, +0.1146998663140024384347613866666e-28, -0.1967938586345134677295103999999e-29, +0.3376448816585338090334890666666e-30, -0.5793070335782135784625493333333e-31];
      var isArray = Array.isArray;

      function gammafn(x) {
        var fx = isArray(x) ? x : [x];
        var result = fx.map(function (fx) {
          return _gammafn(fx);
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.gammafn = gammafn;

      function _gammafn(x) {
        var i;
        var n;
        var y;
        var sinpiy;
        var value;
        var ngam = 22;
        var xmin = -170.5674972726612;
        var xmax = 171.61447887182298;
        var xsml = 2.2474362225598545e-308;
        var dxrel = 1.490116119384765696e-8;
        if (ISNAN(x)) return x;

        if (x === 0 || x < 0 && x === round(x)) {
          _general_1.ML_ERROR(_general_1.ME.ME_DOMAIN, 'gammafn', printer);

          return ML_NAN;
        }

        y = fabs(x);

        if (y <= 10) {
          n = x >> 0;
          if (x < 0) --n;
          y = x - n;
          --n;
          value = chebyshev_1.chebyshev_eval(y * 2 - 1, gamcs, ngam) + 0.9375;
          if (n === 0) return value;

          if (n < 0) {
            if (x < -0.5 && fabs(x - trunc(x - 0.5) / x) < dxrel) {
              _general_1.ML_ERROR(_general_1.ME.ME_PRECISION, 'gammafn', printer);
            }

            if (y < xsml) {
              _general_1.ML_ERROR(_general_1.ME.ME_RANGE, 'gammafn', printer);

              if (x > 0) return ML_POSINF;else return ML_NEGINF;
            }

            n = -n;

            for (i = 0; i < n; i++) {
              value /= x + i;
            }

            return value;
          } else {
            for (i = 1; i <= n; i++) {
              value *= y + i;
            }

            return value;
          }
        } else {
          if (x > xmax) {
            _general_1.ML_ERROR(_general_1.ME.ME_RANGE, 'gammafn', printer);

            return ML_POSINF;
          }

          if (x < xmin) {
            _general_1.ML_ERROR(_general_1.ME.ME_UNDERFLOW, 'gammafn', printer);

            return 0;
          }

          if (y <= 50 && y === trunc(y)) {
            value = 1;

            for (i = 2; i < y; i++) {
              value *= i;
            }
          } else {
            value = exp((y - 0.5) * log(y) - y + M_LN_SQRT_2PI + (2 * y === trunc(2) * y ? stirling_1.stirlerr(y) : lgammacor_1.lgammacor(y)));
          }

          if (x > 0) return value;

          if (fabs((x - trunc(x - 0.5)) / x) < dxrel) {
            _general_1.ML_ERROR(_general_1.ME.ME_PRECISION, 'gammafn', printer);
          }

          sinpiy = trigonometry_1.sinpi(y);

          if (sinpiy === 0) {
            _general_1.ML_ERROR(_general_1.ME.ME_RANGE, 'gammafn', printer);

            return ML_POSINF;
          }

          return -M_PI / (y * sinpiy * value);
        }
      }
      /***/

    },
    /* 30 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var sexp_1 = __webpack_require__(28);

      var expm1 = Math.expm1,
          fabs = Math.abs,
          sqrt = Math.sqrt,
          log = Math.log,
          exp = Math.exp;
      var R_FINITE = Number.isFinite;

      function rgamma() {
        var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var a = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var rng = arguments.length > 3 ? arguments[3] : undefined;
        var result = new Array(n).fill(0).map(function () {
          return _rgamma(a, scale, rng);
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.rgamma = rgamma;
      var printer_rgamma = debug('_rgamma');

      function _rgamma() {
        var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var rng = arguments.length > 2 ? arguments[2] : undefined;
        var sqrt32 = 5.656854;
        var exp_m1 = 0.36787944117144232159;
        var q1 = 0.04166669;
        var q2 = 0.02083148;
        var q3 = 0.00801191;
        var q4 = 0.00144121;
        var q5 = -7.388e-5;
        var q6 = 2.4511e-4;
        var q7 = 2.424e-4;
        var a1 = 0.3333333;
        var a2 = -0.250003;
        var a3 = 0.2000062;
        var a4 = -0.1662921;
        var a5 = 0.1423657;
        var a6 = -0.1367177;
        var a7 = 0.1233795;
        var aa = 0;
        var aaa = 0;
        var s = 0;
        var s2 = 0;
        var d = 0;
        var q0 = 0;
        var b = 0;
        var si = 0;
        var c = 0;
        var e = 0;
        var p = 0;
        var q = 0;
        var r = 0;
        var t = 0;
        var u = 0;
        var v = 0;
        var w = 0;
        var x = 0;
        var ret_val = 0;

        if (!R_FINITE(a) || !R_FINITE(scale) || a < 0.0 || scale <= 0.0) {
          if (scale === 0) return 0;
          return _general_1.ML_ERR_return_NAN(printer_rgamma);
        }

        if (a < 1) {
          if (a === 0) return 0;
          e = 1.0 + exp_m1 * a;

          while (true) {
            p = e * rng.unif_rand();

            if (p >= 1.0) {
              x = -log((e - p) / a);
              if (sexp_1.exp_rand(rng.unif_rand) >= (1.0 - a) * log(x)) break;
            } else {
              x = exp(log(p) / a);
              if (sexp_1.exp_rand(rng.unif_rand) >= x) break;
            }
          }

          return scale * x;
        }

        if (a !== aa) {
          aa = a;
          s2 = a - 0.5;
          s = sqrt(s2);
          d = sqrt32 - s * 12.0;
        }

        t = rng.norm_rand();
        x = s + 0.5 * t;
        ret_val = x * x;
        if (t >= 0.0) return scale * ret_val;
        u = rng.unif_rand();
        if (d * u <= t * t * t) return scale * ret_val;

        if (a !== aaa) {
          aaa = a;
          r = 1.0 / a;
          q0 = ((((((q7 * r + q6) * r + q5) * r + q4) * r + q3) * r + q2) * r + q1) * r;

          if (a <= 3.686) {
            b = 0.463 + s + 0.178 * s2;
            si = 1.235;
            c = 0.195 / s - 0.079 + 0.16 * s;
          } else if (a <= 13.022) {
            b = 1.654 + 0.0076 * s2;
            si = 1.68 / s + 0.275;
            c = 0.062 / s + 0.024;
          } else {
            b = 1.77;
            si = 0.75;
            c = 0.1515 / s;
          }
        }

        if (x > 0.0) {
          v = t / (s + s);
          if (fabs(v) <= 0.25) q = q0 + 0.5 * t * t * ((((((a7 * v + a6) * v + a5) * v + a4) * v + a3) * v + a2) * v + a1) * v;else q = q0 - s * t + 0.25 * t * t + (s2 + s2) * log(1.0 + v);
          if (log(1.0 - u) <= q) return scale * ret_val;
        }

        while (true) {
          e = sexp_1.exp_rand(rng.unif_rand);
          u = rng.unif_rand();
          u = u + u - 1.0;
          if (u < 0.0) t = b - si * e;else t = b + si * e;

          if (t >= -0.71874483771719) {
            v = t / (s + s);
            if (fabs(v) <= 0.25) q = q0 + 0.5 * t * t * ((((((a7 * v + a6) * v + a5) * v + a4) * v + a3) * v + a2) * v + a1) * v;else q = q0 - s * t + 0.25 * t * t + (s2 + s2) * log(1.0 + v);

            if (q > 0.0) {
              w = expm1(q);
              if (c * fabs(u) <= w * exp(e - 0.5 * t * t)) break;
            }
          }
        }

        x = s + 0.5 * t;
        return scale * x * x;
      }

      exports._rgamma = _rgamma;
      /***/
    },
    /* 31 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite,
          DBL_MAX = Number.MAX_VALUE,
          ML_POSINF = Number.POSITIVE_INFINITY,
          ML_NAN = Number.NaN;
      var sqrt = Math.sqrt,
          exp = Math.exp,
          fabs = Math.abs,
          R_forceint = Math.round,
          log = Math.log;
      var printer = debug('dnorm4');
      var isArray = Array.isArray;

      function dnorm4(x) {
        var mu = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var sigma = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var give_log = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        var fa = function () {
          return isArray(x) && x || [x];
        }();

        var result = fa.map(function (fx) {
          if (ISNAN(fx) || ISNAN(mu) || ISNAN(sigma)) {
            return fx + mu + sigma;
          }

          if (!R_FINITE(sigma)) {
            return _general_1.R_D__0(give_log);
          }

          if (!R_FINITE(fx) && mu === fx) {
            return ML_NAN;
          }

          if (sigma <= 0) {
            if (sigma < 0) {
              return _general_1.ML_ERR_return_NAN(printer);
            }

            return fx === mu ? ML_POSINF : _general_1.R_D__0(give_log);
          }

          fx = (fx - mu) / sigma;
          if (!R_FINITE(fx)) return _general_1.R_D__0(give_log);
          fx = fabs(fx);
          if (fx >= 2 * sqrt(DBL_MAX)) return _general_1.R_D__0(give_log);

          if (give_log) {
            return -(_general_1.M_LN_SQRT_2PI + 0.5 * fx * fx + log(sigma));
          }

          if (fx < 5) return _general_1.M_1_SQRT_2PI * exp(-0.5 * fx * fx) / sigma;

          if (fx > sqrt(-2 * _general_1.M_LN2 * (_general_1.DBL_MIN_EXP + 1 - _general_1.DBL_MANT_DIG))) {
            return 0;
          }

          var x1 = _general_1.ldexp(R_forceint(_general_1.ldexp(fx, 16)), -16);

          var x2 = fx - x1;
          return _general_1.M_1_SQRT_2PI / sigma * (exp(-0.5 * x1 * x1) * exp((-0.5 * x2 - x1) * x2));
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.dnorm4 = dnorm4;
      /***/
    },
    /* 32 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var sexp_1 = __webpack_require__(28);

      var r_func_1 = __webpack_require__(2);

      var fsign_1 = __webpack_require__(161);

      var trunc = Math.trunc,
          log = Math.log,
          fabs = Math.abs,
          pow = Math.pow,
          exp = Math.exp,
          floor = Math.floor,
          sqrt = Math.sqrt;
      var R_FINITE = Number.isFinite;
      var sequence = r_func_1.seq()();
      var a0 = -0.5;
      var a1 = 0.3333333;
      var a2 = -0.2500068;
      var a3 = 0.2000118;
      var a4 = -0.1661269;
      var a5 = 0.1421878;
      var a6 = -0.1384794;
      var a7 = 0.125006;
      var one_7 = 0.1428571428571428571;
      var one_12 = 0.0833333333333333333;
      var one_24 = 0.0416666666666666667;

      function rpois(N, mu, rng) {
        return r_func_1.map(sequence(N))(function () {
          return _rpois(mu, rng);
        });
      }

      exports.rpois = rpois;
      var printer_rpois = debug('_rpois');

      function _rpois(mu, rng) {
        var fact = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880];
        var l = 0;
        var m = 0;
        var pp = new Array(36);
        var b1 = 0;
        var b2 = 0;
        var c = 0;
        var c0 = 0;
        var c1 = 0;
        var c2 = 0;
        var c3 = 0;
        var p0 = 0;
        var p = 0;
        var q = 0;
        var s = 0;
        var d = 0;
        var omega = 0;
        var big_l = 0;
        var muprev = 0;
        var muprev2 = 0;
        var del;
        var difmuk = 0;
        var E = 0;
        var fk = 0;
        var fx;
        var fy;
        var g;
        var px;
        var py;
        var t = 0;
        var u = 0;
        var v;
        var x;
        var pois = -1;
        var k;
        var kflag = 0;
        var big_mu;
        var new_big_mu = false;

        if (!R_FINITE(mu) || mu < 0) {
          return _general_1.ML_ERR_return_NAN(printer_rpois);
        }

        if (mu <= 0) return 0;
        big_mu = mu >= 10;

        if (big_mu) {
          new_big_mu = false;
        }

        if (!(big_mu && mu === muprev)) {
          if (big_mu) {
            new_big_mu = true;
            muprev = mu;
            s = sqrt(mu);
            d = 6 * mu * mu;
            big_l = floor(mu - 1.1484);
          } else {
            if (mu !== muprev) {
              muprev = mu;
              m = _general_1.imax2(1, trunc(mu));
              l = 0;
              q = p0 = p = exp(-mu);
            }

            while (true) {
              u = rng.unif_rand();
              if (u <= p0) return 0;

              if (l !== 0) {
                for (k = u <= 0.458 ? 1 : _general_1.imin2(l, m); k <= l; k++) {
                  if (u <= pp[k]) return k;
                }

                if (l === 35) continue;
              }

              l++;

              for (k = l; k <= 35; k++) {
                p *= mu / k;
                q += p;
                pp[k] = q;

                if (u <= q) {
                  l = k;
                  return k;
                }
              }

              l = 35;
            }
          }
        }

        g = mu + s * rng.norm_rand();

        if (g >= 0) {
          pois = floor(g);
          if (pois >= big_l) return pois;
          fk = pois;
          difmuk = mu - fk;
          u = rng.unif_rand();
          if (d * u >= difmuk * difmuk * difmuk) return pois;
        }

        if (new_big_mu || mu !== muprev2) {
          muprev2 = mu;
          omega = _general_1.M_1_SQRT_2PI / s;
          b1 = one_24 / mu;
          b2 = 0.3 * b1 * b1;
          c3 = one_7 * b1 * b2;
          c2 = b2 - 15 * c3;
          c1 = b1 - 6 * b2 + 45 * c3;
          c0 = 1 - b1 + 3 * b2 - 15 * c3;
          c = 0.1069 / mu;
        }

        var gotoStepF = false;
        var once = true;

        while (true) {
          if (once) {
            once = false;

            if (g >= 0) {
              kflag = 0;
              gotoStepF = true;
            }
          }

          if (!gotoStepF) {
            E = sexp_1.exp_rand(rng.unif_rand);
            u = 2 * rng.unif_rand() - 1;
            t = 1.8 + fsign_1.fsign(E, u >= 0);
          }

          if (t > -0.6744 || gotoStepF) {
            if (!gotoStepF) {
              pois = floor(mu + s * t);
              fk = pois;
              difmuk = mu - fk;
              kflag = 1;
            }

            gotoStepF = false;

            if (pois < 10) {
              px = -mu;
              py = pow(mu, pois) / fact[trunc(pois)];
            } else {
              del = one_12 / fk;
              del = del * (1 - 4.8 * del * del);
              v = difmuk / fk;
              if (fabs(v) <= 0.25) px = fk * v * v * (((((((a7 * v + a6) * v + a5) * v + a4) * v + a3) * v + a2) * v + a1) * v + a0) - del;else px = fk * log(1 + v) - difmuk - del;
              py = _general_1.M_1_SQRT_2PI / sqrt(fk);
            }

            x = (0.5 - difmuk) / s;
            x *= x;
            fx = -0.5 * x;
            fy = omega * (((c3 * x + c2) * x + c1) * x + c0);

            if (kflag > 0) {
              if (c * fabs(u) <= py * exp(px + E) - fy * exp(fx + E)) {
                break;
              }
            } else if (fy - u * fy <= py * exp(px - fx)) {
              break;
            }
          }
        }

        return pois;
      }
      /***/

    },
    /* 33 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var cospi_1 = __webpack_require__(23);

      exports.cospi = cospi_1.cospi;

      var sinpi_1 = __webpack_require__(24);

      exports.sinpi = sinpi_1.sinpi;

      var tanpi_1 = __webpack_require__(76);

      exports.tanpi = tanpi_1.tanpi;
      exports.atanpi = tanpi_1.atanpi;
      /***/
    },
    /* 34 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var beta_1 = __webpack_require__(106);

      var lbeta_1 = __webpack_require__(11);

      var dbeta_1 = __webpack_require__(53);

      var dnbeta_1 = __webpack_require__(54);

      var pbeta_1 = __webpack_require__(12);

      var pnbeta_1 = __webpack_require__(35);

      var qbeta_1 = __webpack_require__(55);

      var qnbeta_1 = __webpack_require__(56);

      var rchisq_1 = __webpack_require__(13);

      var rnchisq_1 = __webpack_require__(41);

      var r_func_1 = __webpack_require__(2);

      var normal_1 = __webpack_require__(8);

      var rbeta_1 = __webpack_require__(107);

      exports.special = {
        beta: beta_1.beta,
        lbeta: lbeta_1.lbeta
      };

      function Beta() {
        var rng = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new normal_1.Inversion();

        function dbeta(x, shape1, shape2, ncp, log) {
          if (ncp === undefined || ncp === 0) {
            return dbeta_1.dbeta(x, shape1, shape2, log || false);
          } else {
            return dnbeta_1.dnbeta(x, shape1, shape2, ncp || 0, log || false);
          }
        }

        function pbeta(q, shape1, shape2, ncp) {
          var lowerTail = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
          var logP = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

          if (ncp === undefined || ncp === 0) {
            return pbeta_1.pbeta(q, shape1, shape2, lowerTail, logP);
          } else {
            return pnbeta_1.pnbeta(q, shape1, shape2, ncp, lowerTail, logP);
          }
        }

        function qbeta(p, shape1, shape2, ncp) {
          var lowerTail = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
          var logP = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

          if (ncp === undefined) {
            return qbeta_1.qbeta(p, shape1, shape2, lowerTail, logP);
          } else {
            return qnbeta_1.qnbeta(p, shape1, shape2, ncp, lowerTail, logP);
          }
        }

        function rbeta(n, shape1, shape2) {
          var ncp = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

          if (ncp === 0) {
            return rbeta_1.rbeta(n, shape1, shape2, rng);
          } else {
            var ax = rnchisq_1.rnchisq(n, 2 * shape1, ncp, rng);
            var bx = rchisq_1.rchisq(n, 2 * shape2, rng);
            var result = r_func_1.multiplexer(ax, bx)(function (a, b) {
              return a / (a + b);
            });
            return result.length === 1 ? result[0] : result;
          }
        }

        return Object.freeze({
          dbeta: dbeta,
          pbeta: pbeta,
          qbeta: qbeta,
          rbeta: rbeta
        });
      }

      exports.Beta = Beta;
      /***/
    },
    /* 35 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var lgamma_fn_1 = __webpack_require__(4);

      var toms708_1 = __webpack_require__(9);

      var log1p = Math.log1p,
          floor = Math.floor,
          fmax2 = Math.max,
          sqrt = Math.sqrt,
          log = Math.log,
          exp = Math.exp;
      var ISNAN = Number.isNaN;
      var printer = debug('pnbeta_raw');

      function pnbeta_raw(x, o_x, a, b, ncp) {
        var errmax = 1.0e-9;
        var itrmax = 10000;
        var a0;
        var lbeta;
        var c;
        var errbd;
        var x0;
        var temp = new toms708_1.NumberW(0);
        var tmp_c = new toms708_1.NumberW(0);
        var ierr = new toms708_1.NumberW(0);
        var ans;
        var ax;
        var gx;
        var q;
        var sumq;

        if (ncp < 0 || a <= 0 || b <= 0) {
          return _general_1.ML_ERR_return_NAN(printer);
        }

        if (x < 0 || o_x > 1 || x === 0 && o_x === 1) return 0;
        if (x > 1 || o_x < 0 || x === 1 && o_x === 0) return 1;
        c = ncp / 2;
        x0 = floor(fmax2(c - 7 * sqrt(c), 0));
        a0 = a + x0;
        lbeta = lgamma_fn_1.lgammafn(a0) + lgamma_fn_1.lgammafn(b) - lgamma_fn_1.lgammafn(a0 + b);
        toms708_1.Toms708.bratio(a0, b, x, o_x, temp, tmp_c, ierr);
        gx = exp(a0 * log(x) + b * (x < 0.5 ? log1p(-x) : log(o_x)) - lbeta - log(a0));
        if (a0 > a) q = exp(-c + x0 * log(c) - lgamma_fn_1.lgammafn(x0 + 1));else q = exp(-c);
        sumq = 1 - q;
        ans = ax = q * temp.val;
        var j = floor(x0);

        do {
          j++;
          temp.val -= gx;
          gx *= x * (a + b + j - 1) / (a + j);
          q *= c / j;
          sumq -= q;
          ax = temp.val * q;
          ans += ax;
          errbd = (temp.val - gx) * sumq;
        } while (errbd > errmax && j < itrmax + x0);

        if (errbd > errmax) _general_1.ML_ERROR(_general_1.ME.ME_PRECISION, 'pnbeta', printer);
        if (j >= itrmax + x0) _general_1.ML_ERROR(_general_1.ME.ME_NOCONV, 'pnbeta', printer);
        return ans;
      }

      var printer_pnbeta2 = debug('pnbeta2');

      function pnbeta2(x, o_x, a, b, ncp, lower_tail, log_p) {
        var ans = pnbeta_raw(x, o_x, a, b, ncp);

        if (lower_tail) {
          return log_p ? log(ans) : ans;
        } else {
          if (ans > 1 - 1e-10) _general_1.ML_ERROR(_general_1.ME.ME_PRECISION, 'pnbeta', printer_pnbeta2);
          if (ans > 1.0) ans = 1.0;
          return log_p ? log1p(-ans) : 1 - ans;
        }
      }

      exports.pnbeta2 = pnbeta2;

      function pnbeta(_x, a, b, ncp, lower_tail, log_p) {
        var fa = Array.isArray(_x) ? _x : [_x];
        var result = fa.map(function (x) {
          if (ISNAN(x) || ISNAN(a) || ISNAN(b) || ISNAN(ncp)) return x + a + b + ncp;

          var rc = _general_1.R_P_bounds_01(lower_tail, log_p, x, 0, 1);

          if (rc !== undefined) {
            return rc;
          }

          return pnbeta2(x, 1 - x, a, b, ncp, lower_tail, log_p);
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.pnbeta = pnbeta;
      /***/
    },
    /* 36 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var r_func_1 = __webpack_require__(2);

      var qbinom_1 = __webpack_require__(59);

      var log = Math.log,
          fabs = Math.abs,
          abs = Math.abs,
          sqrt = Math.sqrt,
          fmin2 = Math.min,
          trunc = Math.trunc,
          round = Math.round;
      var INT_MAX = Number.MAX_SAFE_INTEGER,
          R_FINITE = Number.isFinite;
      var sequence = r_func_1.seq()();
      var printer_rbinom = debug('_rbinom');

      function rbinom(N, nin, pp, rng) {
        return r_func_1.map(sequence(N))(function () {
          return _rbinom(nin, pp, rng);
        });
      }

      exports.rbinom = rbinom;

      function _rbinom(nin, pp, rng) {
        var c = 0;
        var fm = 0;
        var npq = 0;
        var p1 = 0;
        var p2 = 0;
        var p3 = 0;
        var p4 = 0;
        var qn = 0;
        var xl = 0;
        var xll = 0;
        var xlr = 0;
        var xm = 0;
        var xr = 0;
        var psave = -1.0;
        var nsave = -1;
        var m = 0;
        var f;
        var f1;
        var f2;
        var u;
        var v;
        var w;
        var w2;
        var x;
        var x1;
        var x2;
        var z;
        var z2;
        var p;
        var q;
        var np;
        var g;
        var r;
        var al;
        var alv;
        var amaxp;
        var ffm;
        var ynorm;
        var i;
        var ix = 0;
        var k;
        var n;
        if (!R_FINITE(nin)) return _general_1.ML_ERR_return_NAN(printer_rbinom);
        r = round(nin);
        if (r !== nin) return _general_1.ML_ERR_return_NAN(printer_rbinom);

        if (!R_FINITE(pp) || r < 0 || pp < 0 || pp > 1) {
          return _general_1.ML_ERR_return_NAN(printer_rbinom);
        }

        if (r === 0 || pp === 0) return 0;
        if (pp === 1) return r;

        if (r >= INT_MAX) {
          printer_rbinom('Evade overflow:%d > MAX_SAFE_INTEGER', r);
          return qbinom_1.qbinom(rng.unif_rand(), r, pp, false, false);
        }

        n = trunc(r);
        p = fmin2(pp, 1 - pp);
        q = 1 - p;
        np = n * p;
        r = p / q;
        g = r * (n + 1);
        var gotoL_np_small = false;

        if (pp !== psave || n !== nsave) {
          psave = pp;
          nsave = n;

          if (np < 30.0) {
            qn = _general_1.R_pow_di(q, n);
            gotoL_np_small = true;
          } else {
            ffm = np + p;
            m = trunc(ffm);
            fm = m;
            npq = np * q;
            p1 = trunc(2.195 * sqrt(npq) - 4.6 * q) + 0.5;
            xm = fm + 0.5;
            xl = xm - p1;
            xr = xm + p1;
            c = 0.134 + 20.5 / (15.3 + fm);
            al = (ffm - xl) / (ffm - xl * p);
            xll = al * (1.0 + 0.5 * al);
            al = (xr - ffm) / (xr * q);
            xlr = al * (1.0 + 0.5 * al);
            p2 = p1 * (1.0 + c + c);
            p3 = p2 + c / xll;
            p4 = p3 + c / xlr;
          }
        } else if (n === nsave) {
          if (np < 30.0) gotoL_np_small = true;
        }

        var gotoFinis = false;

        while ( true && !gotoL_np_small) {
          u = rng.unif_rand() * p4;
          v = rng.unif_rand();

          if (u <= p1) {
            ix = trunc(xm - p1 * v + u);
            gotoFinis = true;
            break;
          }

          if (u <= p2) {
            x = xl + (u - p1) / c;
            v = v * c + 1.0 - fabs(xm - x) / p1;
            if (v > 1.0 || v <= 0) continue;
            ix = trunc(x);
          } else {
            if (u > p3) {
              ix = trunc(xr - log(v) / xlr);
              if (ix > n) continue;
              v = v * (u - p3) * xlr;
            } else {
              ix = trunc(xl + log(v) / xll);
              if (ix < 0) continue;
              v = v * (u - p2) * xll;
            }
          }

          k = abs(ix - m);

          if (k <= 20 || k >= npq / 2 - 1) {
            f = 1.0;

            if (m < ix) {
              for (i = m + 1; i <= ix; i++) {
                f *= g / i - r;
              }
            } else if (m !== ix) {
              for (i = ix + 1; i <= m; i++) {
                f /= g / i - r;
              }
            }

            if (v <= f) {
              gotoFinis = true;
              break;
            }
          } else {
            amaxp = k / npq * ((k * (k / 3 + 0.625) + 0.1666666666666) / npq + 0.5);
            ynorm = -k * k / (2.0 * npq);
            alv = log(v);

            if (alv < ynorm - amaxp) {
              gotoFinis = true;
              break;
            }

            if (alv <= ynorm + amaxp) {
              x1 = ix + 1;
              f1 = fm + 1.0;
              z = n + 1 - fm;
              w = n - ix + 1.0;
              z2 = z * z;
              x2 = x1 * x1;
              f2 = f1 * f1;
              w2 = w * w;

              if (alv <= xm * log(f1 / x1) + (n - m + 0.5) * log(z / w) + (ix - m) * log(w * p / (x1 * q)) + (13860.0 - (462.0 - (132.0 - (99.0 - 140.0 / f2) / f2) / f2) / f2) / f1 / 166320.0 + (13860.0 - (462.0 - (132.0 - (99.0 - 140.0 / z2) / z2) / z2) / z2) / z / 166320.0 + (13860.0 - (462.0 - (132.0 - (99.0 - 140.0 / x2) / x2) / x2) / x2) / x1 / 166320.0 + (13860.0 - (462.0 - (132.0 - (99.0 - 140.0 / w2) / w2) / w2) / w2) / w / 166320) {
                gotoFinis = true;
                break;
              }
            }
          }
        }

        if (!gotoFinis) {
          while (true) {
            ix = 0;
            f = qn;
            u = rng.unif_rand();

            while (true) {
              if (u < f) {
                gotoFinis = true;
                break;
              }

              if (ix > 110) break;
              u -= f;
              ix++;
              f *= g / ix - r;
            }

            if (gotoFinis) {
              break;
            }
          }
        }

        if (psave > 0.5) {
          ix = n - ix;
        }

        return ix;
      }
      /***/

    },
    /* 37 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var fabs = Math.abs;
      var printer = debug('chebyshev_eval');

      function chebyshev_init(dos, nos, eta) {
        var retCode = 0;
        var err;
        if (nos < 1) return 0;
        err = 0.0;

        for (var ii = 1; ii <= nos; ii++) {
          retCode = nos - ii;
          err += fabs(dos[retCode]);

          if (err > eta) {
            return retCode;
          }
        }

        return retCode;
      }

      exports.chebyshev_init = chebyshev_init;

      function chebyshev_eval(x, a, n) {
        var b0;
        var b1;
        var b2;
        var twox;
        var i;

        if (n < 1 || n > 1000) {
          return _general_1.ML_ERR_return_NAN(printer);
        }

        if (x < -1.1 || x > 1.1) {
          return _general_1.ML_ERR_return_NAN(printer);
        }

        twox = x * 2;
        b2 = b1 = 0;
        b0 = 0;

        for (i = 1; i <= n; i++) {
          b2 = b1;
          b1 = b0;
          b0 = twox * b1 - b2 + a[n - i];
        }

        return (b0 - b2) * 0.5;
      }

      exports.chebyshev_eval = chebyshev_eval;
      /***/
    },
    /* 38 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var pgamma_1 = __webpack_require__(18);

      function pchisq(x, df) {
        var lowerTail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var logP = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        return pgamma_1.pgamma(x, df / 2., 2., lowerTail, logP);
      }

      exports.pchisq = pchisq;
      /***/
    },
    /* 39 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var expm1_1 = __webpack_require__(3);

      var lgamma_fn_1 = __webpack_require__(4);

      var logspace_add_1 = __webpack_require__(127);

      var r_func_1 = __webpack_require__(2);

      var pchisq_1 = __webpack_require__(38);

      var sqrt = Math.sqrt,
          fabs = Math.abs,
          exp = Math.exp,
          log = Math.log,
          fmin2 = Math.min,
          fmax2 = Math.max,
          M_LN2 = Math.LN2,
          M_LN10 = Math.LN10;
      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite,
          DBL_EPSILON = Number.EPSILON,
          ML_NEGINF = Number.NEGATIVE_INFINITY;
      exports.DBL_MAX_EXP = Math.log2(Number.MAX_VALUE);
      exports.DBL_MIN_EXP = Math.log2(Number.MIN_VALUE);

      var _dbl_min_exp = M_LN2 * exports.DBL_MIN_EXP;

      var expm1 = Math.expm1,
          log1p = Math.log1p;
      var printer = debug('pnchisq');

      function pnchisq(xx, df) {
        var ncp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var lower_tail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var log_p = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        return r_func_1.map(xx)(function (x) {
          var ans;

          if (ISNAN(x) || ISNAN(df) || ISNAN(ncp)) {
            return NaN;
          }

          if (!R_FINITE(df) || !R_FINITE(ncp)) {
            return _general_1.ML_ERR_return_NAN(printer);
          }

          if (df < 0 || ncp < 0) {
            return _general_1.ML_ERR_return_NAN(printer);
          }

          ans = pnchisq_raw(x, df, ncp, 1e-12, 8 * DBL_EPSILON, 1000000, lower_tail, log_p);

          if (ncp >= 80) {
            if (lower_tail) {
              ans = fmin2(ans, _general_1.R_D__1(log_p));
            } else {
              if (ans < (log_p ? -10 * M_LN10 : 1e-10)) _general_1.ML_ERROR(_general_1.ME.ME_PRECISION, 'pnchisq', printer);
              if (!log_p) ans = fmax2(ans, 0.0);
            }
          }

          if (!log_p || ans < -1e-8) {
            return ans;
          }

          printer('   pnchisq_raw(*, log_p): ans=%d => 2nd call, other tail', ans);
          ans = pnchisq_raw(x, df, ncp, 1e-12, 8 * DBL_EPSILON, 1000000, !lower_tail, false);
          return log1p(-ans);
        });
      }

      exports.pnchisq = pnchisq;

      function pnchisq_raw(x, f, theta, errmax, reltol, itrmax, lower_tail, log_p) {
        var lam;
        var x2;
        var f2;
        var term;
        var bound;
        var f_x_2n;
        var f_2n;
        var l_lam = -1;
        var l_x = -1;
        var lamSml;
        var tSml;
        var is_r;
        var is_b;
        var is_it;
        var ans;
        var u;
        var v;
        var t;
        var lt;
        var lu = -1;

        if (x <= 0) {
          if (x === 0 && f === 0) {
            var _L = -0.5 * theta;

            var result = lower_tail ? _general_1.R_D_exp(log_p, _L) : log_p ? expm1_1.R_Log1_Exp(_L) : -expm1(_L);
            printer('result1:%d', result);
            return result;
          }

          return _general_1.R_DT_0(lower_tail, log_p);
        }

        if (!R_FINITE(x)) return _general_1.R_DT_1(lower_tail, log_p);

        if (theta < 80) {
          var _ans;

          var i;

          if (lower_tail && f > 0 && log(x) < M_LN2 + 2 / f * (lgamma_fn_1.lgammafn(f / 2 + 1) + _dbl_min_exp)) {
            var lambda = 0.5 * theta;
            var sum = ML_NEGINF;
            var sum2 = ML_NEGINF;
            var pr = -lambda;

            for (i = 0; i < 110; pr += log(lambda) - log(++i)) {
              sum2 = logspace_add_1.logspace_add(sum2, pr);
              sum = logspace_add_1.logspace_add(sum, pr + pchisq_1.pchisq(x, f + 2 * i, lower_tail, true));

              if (sum2 >= -1e-15) {
                break;
              }
            }

            _ans = sum - sum2;
            printer('pnchisq(x=%d, f=%d, th.=%d); th. < 80, logspace: i=%d, ans=(sum=%d)-(sum2=%d)', x, f, theta, i, sum, sum2);
            return log_p ? _ans : exp(_ans);
          } else {
            var _lambda = 0.5 * theta;

            var _sum2 = 0;
            var _sum3 = 0;

            var _pr = exp(-_lambda);

            for (i = 0; i < 110; _pr *= _lambda / ++i) {
              _sum3 += _pr;
              _sum2 += _pr * pchisq_1.pchisq(x, f + 2 * i, lower_tail, false);
              if (_sum3 >= 1 - 1e-15) break;
            }

            _ans = _sum2 / _sum3;
            printer('pnchisq(x=%d, f=%d, theta=%d); theta < 80: i=%d, sum=%d, sum2=%d', x, f, theta, i, _sum2, _sum3);
            return log_p ? log(_ans) : _ans;
          }
        }

        printer('pnchisq(x=%d, f=%d, theta=%d >= 80): ', x, f, theta);
        lam = 0.5 * theta;
        lamSml = -lam < _dbl_min_exp;

        if (lamSml) {
          u = 0;
          lu = -lam;
          l_lam = log(lam);
        } else {
          u = exp(-lam);
        }

        v = u;
        x2 = 0.5 * x;
        f2 = 0.5 * f;
        f_x_2n = f - x;
        printer('-- v=exp(-th/2)=%d, x/2= %d, f/2= %d', v, x2, f2);

        if (f2 * DBL_EPSILON > 0.125 && fabs(t = x2 - f2) < sqrt(DBL_EPSILON) * f2) {
          lt = (1 - t) * (2 - t / (f2 + 1)) - _general_1.M_LN_SQRT_2PI - 0.5 * log(f2 + 1);
          printer(' (case I) === > ');
        } else {
          lt = f2 * log(x2) - x2 - lgamma_fn_1.lgammafn(f2 + 1);
        }

        printer(' lt= %d', lt);
        tSml = lt < _dbl_min_exp;

        if (tSml) {
          printer(' is very small');

          if (x > f + theta + 5 * sqrt(2 * (f + 2 * theta))) {
            return _general_1.R_DT_1(lower_tail, log_p);
          }

          l_x = log(x);
          ans = term = 0;
          t = 0;
        } else {
          t = exp(lt);
          printer(', t=exp(lt)= %d', t);
          term = v * t;
          ans = term;
        }

        var n;

        for (n = 1, f_2n = f + 2, f_x_2n += 2;; n++, f_2n += 2, f_x_2n += 2) {
          printer(' _OL_: n=%d', n);

          if (f_x_2n > 0) {
            bound = t * x / f_x_2n;
            printer(' L10: n=%d; term= %d; bound= %d', n, term, bound);
            is_r = is_it = false;

            if ((is_b = bound <= errmax) && (is_r = term <= reltol * ans) || (is_it = n > itrmax)) {
              printer('BREAK n=%d %s; bound= %d %s, rel.err= %d %s', n, is_it ? '> itrmax' : '', bound, is_b ? '<= errmax' : '', term / ans, is_r ? '<= reltol' : '');
              break;
            }
          }

          if (lamSml) {
            lu += l_lam - log(n);

            if (lu >= _dbl_min_exp) {
              printer(' n=%d; nomore underflow in u = exp(lu) === > change', n);
              v = u = exp(lu);
              lamSml = false;
            }
          } else {
            u *= lam / n;
            v += u;
          }

          if (tSml) {
            lt += l_x - log(f_2n);

            if (lt >= _dbl_min_exp) {
              printer('  n=%d; nomore underflow in t = exp(lt) === > change', n);
              t = exp(lt);
              tSml = false;
            }
          } else {
            t *= x / f_2n;
          }

          if (!lamSml && !tSml) {
            term = v * t;
            ans += term;
          }
        }

        if (is_it) {
          printer('pnchisq(x=%d, ..): not converged in %d iter.', x, itrmax);
        }

        printer(' ===  L_End: n=%d; term= %d; bound=%d', n, term, bound);
        return _general_1.R_DT_val(lower_tail, log_p, ans);
      }

      exports.pnchisq_raw = pnchisq_raw;
      /***/
    },
    /* 40 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var qgamma_1 = __webpack_require__(68);

      function qchisq(p, df) {
        var lowerTail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var logP = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        return qgamma_1.qgamma(p, 0.5 * df, 2.0, lowerTail, logP);
      }

      exports.qchisq = qchisq;
      /***/
    },
    /* 41 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var rgamma_1 = __webpack_require__(30);

      var rpois_1 = __webpack_require__(32);

      var rchisq_1 = __webpack_require__(13);

      var printer = debug('rnchisq');
      var R_FINITE = Number.isFinite;

      function rnchisq(n, df, lambda, rng) {
        var result = new Array(n).fill(0).map(function () {
          if (!R_FINITE(df) || !R_FINITE(lambda) || df < 0 || lambda < 0) {
            return _general_1.ML_ERR_return_NAN(printer);
          }

          if (lambda === 0) {
            return df === 0 ? 0 : rgamma_1.rgamma(1, df / 2, 2, rng);
          } else {
            var r = rpois_1.rpois(1, lambda / 2, rng);
            if (r > 0) r = rchisq_1.rchisq(1, 2 * r, rng);
            if (df > 0) r += rgamma_1.rgamma(1, df / 2, 2, rng);
            return r;
          }
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.rnchisq = rnchisq;
      /***/
    },
    /* 42 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var chebyshev_1 = __webpack_require__(37);

      var _general_1 = __webpack_require__(0);

      var printer = debug('lgammacor');
      var algmcs = [+.1666389480451863247205729650822e+0, -.1384948176067563840732986059135e-4, +.9810825646924729426157171547487e-8, -.1809129475572494194263306266719e-10, +.6221098041892605227126015543416e-13, -.3399615005417721944303330599666e-15, +.2683181998482698748957538846666e-17, -.2868042435334643284144622399999e-19, +.3962837061046434803679306666666e-21, -.6831888753985766870111999999999e-23, +.1429227355942498147573333333333e-24, -.3547598158101070547199999999999e-26, +.1025680058010470912000000000000e-27, -.3401102254316748799999999999999e-29, +.1276642195630062933333333333333e-30];
      var nalgm = 5;
      var xbig = 94906265.62425156;
      var xmax = 3.745194030963158e306;

      function lgammacor(x) {
        var tmp;
        if (x < 10) return _general_1.ML_ERR_return_NAN(printer);else if (x >= xmax) {
          _general_1.ML_ERROR(_general_1.ME.ME_UNDERFLOW, 'lgammacor', printer);
        } else if (x < xbig) {
          tmp = 10 / x;
          return chebyshev_1.chebyshev_eval(tmp * tmp * 2 - 1, algmcs, nalgm) / x;
        }
        return 1 / (x * 12);
      }

      exports.lgammacor = lgammacor;
      /***/
    },
    /* 43 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var r_func_1 = __webpack_require__(2);

      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite;
      var printer = debug('rnorm');
      var seq = r_func_1.seq()();

      function rnorm() {
        var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var mu = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var sigma = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var rng = arguments.length > 3 ? arguments[3] : undefined;
        var result = r_func_1.multiplexer(seq(n))(function () {
          if (ISNAN(mu) || !R_FINITE(sigma) || sigma < 0) {
            return _general_1.ML_ERR_return_NAN(printer);
          }

          if (sigma === 0 || !R_FINITE(mu)) {
            return mu;
          }

          return mu + sigma * rng.norm_rand();
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.rnorm = rnorm;
      /***/
    },
    /* 44 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var stirlerror_1 = __webpack_require__(74);

      exports.stirlerr = stirlerror_1.stirlerr;
      /***/
    },
    /* 45 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var bd0_1 = __webpack_require__(64);

      var dnorm_1 = __webpack_require__(31);

      var r_func_1 = __webpack_require__(2);

      var stirlerror_1 = __webpack_require__(74);

      var log1p = Math.log1p,
          fabs = Math.abs,
          exp = Math.exp,
          log = Math.log,
          sqrt = Math.sqrt;
      var ISNAN = Number.isNaN,
          DBL_EPSILON = Number.EPSILON,
          R_FINITE = Number.isFinite;
      var printer_dt = debug('dt');

      function dt(xx, n) {
        var giveLog = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        return r_func_1.map(xx)(function (x) {
          if (ISNAN(x) || ISNAN(n)) {
            return x + n;
          }

          if (n <= 0) {
            return _general_1.ML_ERR_return_NAN(printer_dt);
          }

          if (!R_FINITE(x)) {
            return _general_1.R_D__0(giveLog);
          }

          if (!R_FINITE(n)) {
            return dnorm_1.dnorm4(x, 0, 1, giveLog);
          }

          var u;
          var t = -bd0_1.bd0(n / 2, (n + 1) / 2) + stirlerror_1.stirlerr((n + 1) / 2) - stirlerror_1.stirlerr(n / 2);
          var x2n = x * x / n;
          var ax = 0;
          var l_x2n;
          var lrg_x2n = x2n > 1 / DBL_EPSILON;

          if (lrg_x2n) {
            ax = fabs(x);
            l_x2n = log(ax) - log(n) / 2;
            u = n * l_x2n;
          } else if (x2n > 0.2) {
            l_x2n = log(1 + x2n) / 2;
            u = n * l_x2n;
          } else {
            l_x2n = log1p(x2n) / 2;
            u = -bd0_1.bd0(n / 2, (n + x * x) / 2) + x * x / 2;
          }

          if (giveLog) return t - u - (_general_1.M_LN_SQRT_2PI + l_x2n);
          var I_sqrt_ = lrg_x2n ? sqrt(n) / ax : exp(-l_x2n);
          return exp(t - u) * _general_1.M_1_SQRT_2PI * I_sqrt_;
        });
      }

      exports.dt = dt;
      /***/
    },
    /* 46 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var pbeta_1 = __webpack_require__(12);

      var _general_1 = __webpack_require__(0);

      var lgamma_fn_1 = __webpack_require__(4);

      var pnorm_1 = __webpack_require__(19);

      var r_func_1 = __webpack_require__(2);

      var pt_1 = __webpack_require__(47);

      var R_FINITE = Number.isFinite,
          DBL_EPSILON = Number.EPSILON;
      var sqrt = Math.sqrt,
          exp = Math.exp,
          pow = Math.pow,
          log = Math.log,
          expm1 = Math.expm1,
          fabs = Math.abs,
          fmin2 = Math.min;
      var printer_pnt = debug('pnt');
      var DBL_MIN_EXP = -1021;
      var M_LN2 = 0.693147180559945309417;

      function pnt(tt, df, ncp) {
        var lowerTail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var logP = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        return r_func_1.map(tt)(function (t) {
          return _pnt(t, df, ncp, lowerTail, logP);
        });
      }

      exports.pnt = pnt;

      function _pnt(_t, df, ncp) {
        var lower_tail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var log_p = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        var errbd;
        var rxb;
        var x;
        var geven;
        var godd;
        var p;
        var q;
        var s;
        var tnc = 0;
        var xeven;
        var xodd;
        var itrmax = 1000;
        var errmax = 1e-12;

        if (df <= 0.0) {
          return _general_1.ML_ERR_return_NAN(printer_pnt);
        }

        if (ncp === 0.0) {
          return pt_1.pt(_t, df, lower_tail, log_p);
        }

        if (!R_FINITE(_t)) {
          return _t < 0 ? _general_1.R_DT_0(lower_tail, log_p) : _general_1.R_DT_1(lower_tail, log_p);
        }

        var negdel = _t < 0;
        var tt = fabs(_t);
        var del = _t >= 0 ? ncp : -ncp;

        if (_t < 0 && ncp > 40 && (!log_p || !lower_tail)) {
          printer_pnt('if x <=0 and solution for edge ncp > 40');
          return _general_1.R_DT_0(lower_tail, log_p);
        }

        if (df > 4e5 || del * del > 2 * M_LN2 * -DBL_MIN_EXP) {
          printer_pnt('Abramowitz & Stegun 26.7.10 ncp:%d, del:%d, ncp2:%d, del2:%d, D:%d', ncp, del, ncp * ncp, del * del, 2 * M_LN2 * -DBL_MIN_EXP);

          var _s = 1 / (4 * df);

          return pnorm_1.pnorm5(tt * (1 - _s), del, sqrt(1 + tt * tt * 2 * _s), lower_tail !== negdel, log_p);
        }

        x = _t * _t;
        rxb = df / (x + df);
        x = x / (x + df);
        printer_pnt('pnt(t=%d, df=%d, ncp=%d, rxb=%d) ==> x= %d', _t, df, ncp, rxb, x);

        if (x > 0) {
          printer_pnt('x > 0 branch');
          var lambda = del * del;
          p = 0.5 * exp(-0.5 * lambda);
          printer_pnt('p=%d', p);

          if (p === 0) {
            printer_pnt('p=%d, underflow protection', p);

            _general_1.ML_ERROR(_general_1.ME.ME_UNDERFLOW, 'pnt', printer_pnt);

            _general_1.ML_ERROR(_general_1.ME.ME_RANGE, 'pnt', printer_pnt);

            return _general_1.R_DT_0(lower_tail, log_p);
          }

          printer_pnt('it  1e5*(godd,   geven)|          p           q           s' + '        pnt(*)     errbd');
          q = _general_1.M_SQRT_2dPI * p * del;
          s = 0.5 - p;
          if (s < 1e-7) s = -0.5 * expm1(-0.5 * lambda);
          var a = 0.5;
          var b = 0.5 * df;
          rxb = pow(rxb, b);
          var albeta = _general_1.M_LN_SQRT_PI + lgamma_fn_1.lgammafn(b) - lgamma_fn_1.lgammafn(0.5 + b);
          xodd = pbeta_1.pbeta(x, a, b, true, false);
          printer_pnt('return from pbeta:%d', xodd);
          godd = 2 * rxb * exp(a * log(x) - albeta);
          tnc = b * x;
          xeven = tnc < DBL_EPSILON ? tnc : 1 - rxb;
          geven = tnc * rxb;
          tnc = p * xodd + q * xeven;
          var gotoFinis = false;

          for (var it = 1; it <= itrmax; it++) {
            a += 1;
            xodd -= godd;
            xeven -= geven;
            godd *= x * (a + b - 1) / a;
            geven *= x * (a + b - 0.5) / (a + 0.5);
            p *= lambda / (2 * it);
            q *= lambda / (2 * it + 1);
            tnc += p * xodd + q * xeven;
            s -= p;

            if (s < -1e-10) {
              _general_1.ML_ERROR(_general_1.ME.ME_PRECISION, 'pnt', printer_pnt);

              printer_pnt('goto:true, s = %d < 0 !!! ---> non-convergence!!', s);
              gotoFinis = true;
              break;
            }

            if (s <= 0) {
              printer_pnt('goto:true, s:%d < 0 && it:%d>1', s, it);
              gotoFinis = true;
              break;
            }

            errbd = 2 * s * (xodd - godd);
            printer_pnt('%d %d %d|%d %d %d %d %d', it, 1e5 * godd, 1e5 * geven, p, q, s, tnc, errbd);

            if (fabs(errbd) < errmax) {
              printer_pnt('goto:true, errbd:%d < errmax:%d', errbd, errmax);
              gotoFinis = true;
              break;
            }

            gotoFinis = false;
          }

          if (!gotoFinis) {
            _general_1.ML_ERROR(_general_1.ME.ME_NOCONV, 'pnt', printer_pnt);
          }
        }

        tnc += pnorm_1.pnorm5(-del, 0, 1, true, false);
        lower_tail = lower_tail !== negdel;

        if (tnc > 1 - 1e-10 && lower_tail) {
          _general_1.ML_ERROR(_general_1.ME.ME_PRECISION, 'pnt{final}', printer_pnt);
        }

        var rc = _general_1.R_DT_val(lower_tail, log_p, fmin2(tnc, 1));

        printer_pnt('rc:%d, tnc:%d, log_p:%s, lower_tail:%s', rc, tnc, log_p, lower_tail);
        return rc;
      }
      /***/

    },
    /* 47 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var lbeta_1 = __webpack_require__(11);

      var pbeta_1 = __webpack_require__(12);

      var _general_1 = __webpack_require__(0);

      var pnorm_1 = __webpack_require__(19);

      var r_func_1 = __webpack_require__(2);

      var log1p = Math.log1p,
          sqrt = Math.sqrt,
          log = Math.log,
          fabs = Math.abs,
          exp = Math.exp;
      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite;
      var printer = debug('pt');

      function pt(xx, n) {
        var lowerTail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var log_p = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        return r_func_1.map(xx)(function (x) {
          var val;
          var nx;
          var lower_tail = lowerTail;
          if (ISNAN(x) || ISNAN(n)) return x + n;

          if (n <= 0.0) {
            return _general_1.ML_ERR_return_NAN(printer);
          }

          if (!R_FINITE(x)) {
            return x < 0 ? _general_1.R_DT_0(lower_tail, log_p) : _general_1.R_DT_1(lower_tail, log_p);
          }

          if (!R_FINITE(n)) {
            return pnorm_1.pnorm5(x, 0.0, 1.0, lower_tail, log_p);
          }

          if (n > 4e5) {
            val = 1 / (4 * n);
            return pnorm_1.pnorm5(x * (1 - val) / sqrt(1 + x * x * 2 * val), 0.0, 1.0, lower_tail, log_p);
          }

          nx = 1 + x / n * x;

          if (nx > 1e100) {
            var lval;
            lval = -0.5 * n * (2 * log(fabs(x)) - log(n)) - lbeta_1.internal_lbeta(0.5 * n, 0.5) - log(0.5 * n);
            val = log_p ? lval : exp(lval);
          } else {
            val = n > x * x ? pbeta_1.pbeta(x * x / (n + x * x), 0.5, n / 2, false, log_p) : pbeta_1.pbeta(1 / nx, n / 2, 0.5, true, log_p);
          }

          if (x <= 0) {
            lower_tail = !lower_tail;
          }

          if (log_p) {
            if (lower_tail) {
              return log1p(-0.5 * exp(val));
            } else {
              return val - _general_1.M_LN2;
            }
          } else {
            val /= 2;
            return _general_1.R_D_Cval(lower_tail, val);
          }
        });
      }

      exports.pt = pt;
      /***/
    },
    /* 48 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var WilcoxonCache = /*#__PURE__*/function () {
        function WilcoxonCache() {
          _classCallCheck(this, WilcoxonCache);

          this._map2 = {};
        }

        _createClass(WilcoxonCache, [{
          key: "get",
          value: function get(i, j, k) {
            var jstruct = this._map2[i];

            if (jstruct !== undefined) {
              var kstruct = jstruct[j];

              if (kstruct !== undefined) {
                return kstruct[k];
              }
            }

            return undefined;
          }
        }, {
          key: "set",
          value: function set(i, j, k, value) {
            var jstruct = this._map2[i];

            if (jstruct === undefined) {
              jstruct = {};
              this._map2[i] = jstruct;
            }

            var kstruct = jstruct[j];

            if (kstruct === undefined) {
              kstruct = {};
              jstruct[j] = kstruct;
            }

            kstruct[k] = value;
          }
        }]);

        return WilcoxonCache;
      }();

      exports.WilcoxonCache = WilcoxonCache;
      /***/
    },
    /* 49 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var trunc = Math.trunc;

      function cwilcox(k, m, n, w) {
        var i;
        var j;
        var u = m * n;
        var c = trunc(u / 2);

        if (k < 0 || k > u) {
          return 0;
        }

        if (k > c) {
          k = u - k;
        }

        if (m < n) {
          i = m;
          j = n;
        } else {
          i = n;
          j = m;
        }

        if (j > 0 && k < j) {
          return cwilcox(k, i, k, w);
        }

        if (w.get(i, j, k) === undefined) {
          if (j === 0) {
            w.set(i, j, k, k === 0 ? 1 : 0);
          } else {
            var c1 = cwilcox(k - j, i - 1, j, w);
            var c2 = cwilcox(k, i, j - 1, w);
            w.set(i, j, k, c1 + c2);
          }
        }

        var result = w.get(i, j, k);

        if (result === undefined) {
          throw new Error('WilcoxonCache not set');
        }

        return result;
      }

      exports.cwilcox = cwilcox;
      /***/
    },
    /* 50 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var r_func_1 = __webpack_require__(2);

      var cospi_1 = __webpack_require__(23);

      var sinpi_1 = __webpack_require__(24);

      var besselY_1 = __webpack_require__(52);

      var Jbessel_1 = __webpack_require__(103);

      var ISNAN = Number.isNaN;
      var floor = Math.floor,
          trunc = Math.trunc;
      var printer = debug('bessel_j');

      function bessel_j(_x, _alpha) {
        return r_func_1.multiplexer(_x, _alpha)(function (x, alpha) {
          return internal_bessel_j(x, alpha);
        });
      }

      exports.bessel_j = bessel_j;

      function internal_bessel_j(x, alpha) {
        var nb;
        var na;
        if (ISNAN(x) || ISNAN(alpha)) return x + alpha;

        if (x < 0) {
          _general_1.ML_ERROR(_general_1.ME.ME_RANGE, 'bessel_j', printer);

          return NaN;
        }

        na = floor(alpha);

        if (alpha < 0) {
          return (alpha - na === 0.5 ? 0 : internal_bessel_j(x, -alpha) * cospi_1.cospi(alpha)) + (alpha === na ? 0 : besselY_1.internal_bessel_y(x, -alpha) * sinpi_1.sinpi(alpha));
        } else if (alpha > 1e7) {
          printer('besselJ(x, nu): nu=%d too large for bessel_j() algorithm', alpha);
          return NaN;
        }

        nb = 1 + trunc(na);
        alpha -= nb - 1;
        var rc = Jbessel_1.J_bessel(x, alpha, nb);

        if (rc.ncalc !== nb) {
          if (rc.ncalc < 0) printer('bessel_j(%d): ncalc (=%d) != nb (=%d); alpha=%d. Arg. out of range?', x, rc.ncalc, rc.nb, alpha);else printer('bessel_j(%d,nu=%d): precision lost in result', x, alpha + nb - 1);
        }

        x = rc.x;
        return x;
      }

      exports.internal_bessel_j = internal_bessel_j;
      /***/
    },
    /* 51 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var r_func_1 = __webpack_require__(2);

      var Kbessel_1 = __webpack_require__(104);

      var ISNAN = Number.isNaN;
      var floor = Math.floor;
      var printer = debug('bessel_k');

      function bessel_k(_x, _alpha, _expo) {
        return r_func_1.multiplexer(_x, _alpha, _expo)(function (x, alpha, expo) {
          return internal_bessel_k(x, alpha, expo);
        });
      }

      exports.bessel_k = bessel_k;

      function internal_bessel_k(x, alpha) {
        var expo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var nb;
        var ize;
        if (ISNAN(x) || ISNAN(alpha)) return x + alpha;

        if (x < 0) {
          _general_1.ML_ERROR(_general_1.ME.ME_RANGE, 'bessel_k', printer);

          return NaN;
        }

        ize = expo ? 2 : 1;
        if (alpha < 0) alpha = -alpha;
        nb = 1 + floor(alpha);
        alpha -= nb - 1;
        var rc = Kbessel_1.K_bessel(x, alpha, nb, ize);

        if (rc.ncalc !== rc.nb) {
          if (rc.ncalc < 0) printer('bessel_k(%d): ncalc (=%d) != nb (=%d); alpha=%d. Arg. out of range?\n', rc.x, rc.ncalc, rc.nb, alpha);else printer('bessel_k(%d,nu=%d): precision lost in result\n', rc.x, alpha + rc.nb - 1);
        }

        x = rc.x;
        return x;
      }

      exports.internal_bessel_k = internal_bessel_k;
      /***/
    },
    /* 52 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var r_func_1 = __webpack_require__(2);

      var cospi_1 = __webpack_require__(23);

      var sinpi_1 = __webpack_require__(24);

      var besselJ_1 = __webpack_require__(50);

      var Ybessel_1 = __webpack_require__(105);

      var floor = Math.floor;
      var ISNAN = Number.isNaN,
          ML_POSINF = Number.POSITIVE_INFINITY;
      var printer = debug('bessel_y');

      function bessel_y(_x, _alpha) {
        return r_func_1.multiplexer(_x, _alpha)(function (x, alpha) {
          return internal_bessel_y(x, alpha);
        });
      }

      exports.bessel_y = bessel_y;

      function internal_bessel_y(x, alpha) {
        if (ISNAN(x) || ISNAN(alpha)) return x + alpha;

        if (x < 0) {
          _general_1.ML_ERROR(_general_1.ME.ME_RANGE, 'bessel_y', printer);

          return NaN;
        }

        var na = floor(alpha);

        if (alpha < 0) {
          return (alpha - na === 0.5 ? 0 : internal_bessel_y(x, -alpha) * cospi_1.cospi(alpha)) - (alpha === na ? 0 : besselJ_1.internal_bessel_j(x, -alpha) * sinpi_1.sinpi(alpha));
        } else if (alpha > 1e7) {
          printer('besselY(x, nu): nu=%d too large for bessel_y() algorithm', alpha);
          return NaN;
        }

        var nb = 1 + na;
        alpha -= nb - 1;
        var rc = Ybessel_1.Y_bessel(x, alpha, nb);

        if (rc.ncalc !== nb) {
          if (rc.ncalc === -1) {
            return ML_POSINF;
          } else if (rc.ncalc < -1) printer('bessel_y(%d): ncalc (=%d) != nb (=%d); alpha=%d. Arg. out of range?\n', rc.x, rc.ncalc, nb, alpha);else printer('bessel_y(%d,nu=%d): precision lost in result\n', rc.x, alpha + nb - 1);
        }

        x = rc.x;
        return x;
      }

      exports.internal_bessel_y = internal_bessel_y;
      /***/
    },
    /* 53 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var dbinom_1 = __webpack_require__(17);

      var r_func_1 = __webpack_require__(2);

      var lbeta_1 = __webpack_require__(11);

      var log = Math.log,
          log1p = Math.log1p;
      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite,
          ML_POSINF = Number.POSITIVE_INFINITY;
      var printer = debug('dbeta');

      function dbeta(_x, _a, _b, _asLog) {
        return r_func_1.multiplexer(_x, _a, _b, _asLog)(function (x, a, b, asLog) {
          if (ISNAN(x) || ISNAN(a) || ISNAN(b)) return x + a + b;
          if (a < 0 || b < 0) return _general_1.ML_ERR_return_NAN(printer);
          if (x < 0 || x > 1) return _general_1.R_D__0(asLog);

          if (a === 0 || b === 0 || !R_FINITE(a) || !R_FINITE(b)) {
            if (a === 0 && b === 0) {
              if (x === 0 || x === 1) return ML_POSINF;else return _general_1.R_D__0(asLog);
            }

            if (a === 0 || a / b === 0) {
              if (x === 0) return ML_POSINF;else return _general_1.R_D__0(asLog);
            }

            if (b === 0 || b / a === 0) {
              if (x === 1) return ML_POSINF;else return _general_1.R_D__0(asLog);
            }

            if (x === 0.5) return ML_POSINF;else return _general_1.R_D__0(asLog);
          }

          if (x === 0) {
            if (a > 1) return _general_1.R_D__0(asLog);
            if (a < 1) return ML_POSINF;
            return _general_1.R_D_val(asLog, b);
          }

          if (x === 1) {
            if (b > 1) return _general_1.R_D__0(asLog);
            if (b < 1) return ML_POSINF;
            return _general_1.R_D_val(asLog, a);
          }

          var lval;
          if (a <= 2 || b <= 2) lval = (a - 1) * log(x) + (b - 1) * log1p(-x) - lbeta_1.internal_lbeta(a, b);else {
            lval = log(a + b - 1) + dbinom_1.dbinom_raw(a - 1, a + b - 2, x, 1 - x, true);
          }
          return _general_1.R_D_exp(asLog, lval);
        });
      }

      exports.dbeta = dbeta;
      /***/
    },
    /* 54 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var dpois_1 = __webpack_require__(22);

      var r_func_1 = __webpack_require__(2);

      var dbeta_1 = __webpack_require__(53);

      var ln = Math.log,
          sqrt = Math.sqrt,
          ceil = Math.ceil;
      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite;
      var printer = debug('dnbeta');

      function dnbeta(_x, _shape1, _shape2, _ncp, _asLog) {
        return r_func_1.multiplexer(_x, _shape1, _shape2, _ncp, _asLog)(function (x, shape1, shape2, ncp, asLog) {
          return _dnbeta(x, shape1, shape2, ncp, asLog);
        });
      }

      exports.dnbeta = dnbeta;

      function _dnbeta(x, a, b, ncp, give_log) {
        var eps = 1e-15;
        var kMax;
        var k;
        var ncp2;
        var dx2;
        var d;
        var D;
        var term;
        var sum;
        var p_k;
        var q;
        if (ISNAN(x) || ISNAN(a) || ISNAN(b) || ISNAN(ncp)) return x + a + b + ncp;

        if (ncp < 0 || a <= 0 || b <= 0) {
          return _general_1.ML_ERR_return_NAN(printer);
        }

        if (!R_FINITE(a) || !R_FINITE(b) || !R_FINITE(ncp)) {
          return _general_1.ML_ERR_return_NAN(printer);
        }

        if (x < 0 || x > 1) {
          return _general_1.R_D__0(give_log);
        }

        if (ncp === 0) {
          return dbeta_1.dbeta(x, a, b, give_log);
        }

        ncp2 = 0.5 * ncp;
        dx2 = ncp2 * x;
        d = (dx2 - a - 1) / 2;
        D = d * d + dx2 * (a + b) - a;

        if (D <= 0) {
          kMax = 0;
        } else {
          D = ceil(d + sqrt(D));
          kMax = D > 0 ? D : 0;
        }

        term = dbeta_1.dbeta(x, a + kMax, b, true);
        p_k = dpois_1.dpois_raw(kMax, ncp2, true);

        if (x === 0 || !R_FINITE(term) || !R_FINITE(p_k)) {
          return _general_1.R_D_exp(give_log, p_k + term);
        }

        p_k += term;
        sum = term = 1;
        k = kMax;

        while (k > 0 && term > sum * eps) {
          k--;
          q = (k + 1) * (k + a) / (k + a + b) / dx2;
          term *= q;
          sum += term;
        }

        term = 1;
        k = kMax;

        do {
          q = dx2 * (k + a + b) / (k + a) / (k + 1);
          k++;
          term *= q;
          sum += term;
        } while (term > sum * eps);

        return _general_1.R_D_exp(give_log, p_k + ln(sum));
      }
      /***/

    },
    /* 55 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var expm1_1 = __webpack_require__(3);

      var lbeta_1 = __webpack_require__(11);

      var pbeta_1 = __webpack_require__(12);

      var expm1 = Math.expm1,
          log1p = Math.log1p,
          sqrt = Math.sqrt,
          fmin2 = Math.min,
          exp = Math.exp,
          fabs = Math.abs,
          log = Math.log,
          pow = Math.pow,
          fmax2 = Math.max;
      var ISNAN = Number.isNaN,
          DBL_MIN = Number.MIN_VALUE,
          DBL_EPSILON = Number.EPSILON,
          ML_POSINF = Number.POSITIVE_INFINITY,
          ML_NEGINF = Number.NEGATIVE_INFINITY,
          R_FINITE = Number.isFinite,
          ML_NAN = Number.NaN;
      var USE_LOG_X_CUTOFF = -5;
      var n_NEWTON_FREE = 4;
      var MLOGICAL_NA = -1;
      var printer_qbeta = debug('qbeta');

      function qbeta(pp, shape1, shape2, lower_tail, log_p) {
        var fa = Array.isArray(pp) ? pp : [pp];
        var result = fa.map(function (p) {
          if (ISNAN(shape1) || ISNAN(shape2) || ISNAN(p)) return shape1 + shape2 + p;

          if (shape1 < 0 || shape2 < 0) {
            return _general_1.ML_ERR_return_NAN(printer_qbeta);
          }

          var qbet = [0, 0];
          qbeta_raw(p, shape1, shape2, lower_tail, log_p, MLOGICAL_NA, USE_LOG_X_CUTOFF, n_NEWTON_FREE, qbet);
          return qbet[0];
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.qbeta = qbeta;
      var DBL_very_MIN = DBL_MIN / 4;
      var DBL_log_v_MIN = _general_1.M_LN2 * (_general_1.DBL_MIN_EXP - 2);
      var DBL_1__eps = 1 - DBL_EPSILON;
      var fpu = 3e-308;
      var acu_min = 1e-300;
      var p_lo = fpu;
      var p_hi = 1 - 2.22e-16;
      var const1 = 2.30753;
      var const2 = 0.27061;
      var const3 = 0.99229;
      var const4 = 0.04481;

      function return_q_0(give_log_q, qb) {
        if (give_log_q) {
          qb[0] = ML_NEGINF;
          qb[1] = 0;
        } else {
          qb[0] = 0;
          qb[1] = 1;
        }

        return;
      }

      function return_q_1(give_log_q, qb) {
        if (give_log_q) {
          qb[0] = 0;
          qb[1] = ML_NEGINF;
        } else {
          qb[0] = 1;
          qb[1] = 0;
        }

        return;
      }

      function return_q_half(give_log_q, qb) {
        if (give_log_q) {
          qb[0] = qb[1] = -_general_1.M_LN2;
        } else {
          qb[0] = qb[1] = 0.5;
        }

        return;
      }

      var printer_qbeta_raw = debug('qbeta_raw');
      var R_ifDEBUG_printf = printer_qbeta_raw;

      function qbeta_raw(alpha, p, q, lower_tail, log_p, swap_01, log_q_cut, n_N, qb) {
        var swap_choose = swap_01 === MLOGICAL_NA;
        var swap_tail;
        var log_;
        var give_log_q = log_q_cut === ML_POSINF;
        var use_log_x = give_log_q;
        var warned = false;
        var add_N_step = true;
        var i_pb;
        var i_inn;
        var a;
        var la;
        var logbeta;
        var g;
        var h;
        var pp;
        var p_;
        var qq;
        var r;
        var s;
        var t;
        var w;
        var y = -1;
        var u = 0;
        var xinbta = 0;
        var u_n = 0;

        if (alpha === _general_1.R_DT_0(lower_tail, log_p)) {
          return return_q_0(give_log_q, qb);
        }

        if (alpha === _general_1.R_DT_1(lower_tail, log_p)) {
          return return_q_1(give_log_q, qb);
        }

        if (log_p && alpha > 0 || !log_p && (alpha < 0 || alpha > 1)) {
          printer_qbeta_raw('qbeta(alpha=%d, %d, %d, .., log_p=%d): %s%s', alpha, p, q, log_p, 'alpha not in ', log_p ? '[-Inf, 0]' : '[0,1]');

          _general_1.ML_ERROR(_general_1.ME.ME_DOMAIN, '', printer_qbeta_raw);

          qb[0] = qb[1] = ML_NAN;
          return;
        }

        if (p === 0 || q === 0 || !R_FINITE(p) || !R_FINITE(q)) {
          printer_qbeta_raw('qbeta(%d, %d, %d, lower_t=%d, log_p=%d): (p,q)-boundary: trivial', alpha, p, q, lower_tail, log_p);

          if (p === 0 && q === 0) {
            if (alpha < _general_1.R_D_half(log_p)) {
              return_q_0(give_log_q, qb);
            }

            if (alpha > _general_1.R_D_half(log_p)) {
              return_q_1(give_log_q, qb);
            }

            return_q_half(give_log_q, qb);
          } else if (p === 0 || p / q === 0) {
            return_q_0;
          } else if (q === 0 || q / p === 0) {
            return_q_1;
          }

          return_q_half;
        }

        p_ = expm1_1.R_DT_qIv(lower_tail, log_p, alpha);
        logbeta = lbeta_1.lbeta(p, q);
        swap_tail = swap_choose ? p_ > 0.5 : swap_01;

        if (swap_tail) {
          a = expm1_1.R_DT_CIv(lower_tail, log_p, alpha);
          la = expm1_1.R_DT_Clog(lower_tail, log_p, alpha);
          pp = q;
          qq = p;
        } else {
          a = p_;
          la = expm1_1.R_DT_log(lower_tail, log_p, alpha);
          pp = p;
          qq = q;
        }

        var acu = fmax2(acu_min, pow(10, -13 - 2.5 / (pp * pp) - 0.5 / (a * a)));
        var tx = 0;
        var u0 = (la + log(pp) + logbeta) / pp;
        var log_eps_c = _general_1.M_LN2 * (1 - _general_1.DBL_MANT_DIG);
        r = pp * (1 - qq) / (pp + 1);
        t = 0.2;
        printer_qbeta_raw('qbeta(%d, %d, %d, lower_t=%d, log_p=%d):%s   swap_tail=%d, la=%d, u0=%d (bnd: %d (%d)) ', alpha, p, q, lower_tail, log_p, log_p && (p_ === 0 || p_ === 1) ? p_ === 0 ? ' p_=0' : ' p_=1' : '', swap_tail, la, u0, (t * log_eps_c - log(fabs(pp * (1 - qq) * (2 - qq) / (2 * (pp + 2))))) / 2, t * log_eps_c - log(fabs(r)));
        var goto_L_Newton = false;
        var goto_L_return = false;
        var goto_L_converged = false;

        if (_general_1.M_LN2 * _general_1.DBL_MIN_EXP < u0 && u0 < -0.01 && u0 < (t * log_eps_c - log(fabs(pp * (1 - qq) * (2 - qq) / (2 * (pp + 2))))) / 2) {
          r = r * exp(u0);

          if (r > -1) {
            u = u0 - log1p(r) / pp;
            printer_qbeta_raw('u1-u0=%d --> choosing u = u1', u - u0);
          } else {
            u = u0;
            printer_qbeta_raw('cannot cheaply improve u0');
          }

          tx = xinbta = exp(u);
          use_log_x = true;
          goto_L_Newton = true;
        }

        if (!goto_L_Newton) {
          r = sqrt(-2 * la);
          y = r - (const1 + const2 * r) / (1 + (const3 + const4 * r) * r);

          if (pp > 1 && qq > 1) {
            r = (y * y - 3) / 6;
            s = 1 / (pp + pp - 1);
            t = 1 / (qq + qq - 1);
            h = 2 / (s + t);
            w = y * sqrt(h + r) / h - (t - s) * (r + 5.0 / 6.0 - 2.0 / (3 * h));
            printer_qbeta_raw('p,q > 1 => w=%d', w);

            if (w > 300) {
              t = w + w + log(qq) - log(pp);
              u = t <= 18 ? -log1p(exp(t)) : -t - exp(-t);
              xinbta = exp(u);
            } else {
              xinbta = pp / (pp + qq * exp(w + w));
              u = -log1p(qq / pp * exp(w + w));
            }
          } else {
            r = qq + qq;
            t = 1 / (3 * sqrt(qq));
            t = r * _general_1.R_pow_di(1 + t * (-t + y), 3);
            s = 4 * pp + r - 2;
            R_ifDEBUG_printf('min(p,q) <= 1: t=%g', t);

            if (t === 0 || t < 0 && s >= t) {
              var l1ma;
              if (swap_tail) l1ma = expm1_1.R_DT_log(lower_tail, log_p, alpha);else l1ma = expm1_1.R_DT_Clog(lower_tail, log_p, alpha);
              R_ifDEBUG_printf(' t <= 0 : log1p(-a)=%.15g, better l1ma=%.15g\n', log1p(-a), l1ma);
              var xx = (l1ma + log(qq) + logbeta) / qq;

              if (xx <= 0) {
                xinbta = -expm1(xx);
                u = expm1_1.R_Log1_Exp(xx);
              } else {
                R_ifDEBUG_printf(' xx=%g > 0: xinbta:= 1-e^xx < 0\n', xx);
                xinbta = 0;
                u = ML_NEGINF;
              }
            } else {
              t = s / t;
              R_ifDEBUG_printf(' t > 0 or s < t < 0:  new t = %g ( > 1 ?)\n', t);

              if (t <= 1) {
                u = (la + log(pp) + logbeta) / pp;
                xinbta = exp(u);
              } else {
                xinbta = 1 - 2 / (t + 1);
                u = log1p(-2 / (t + 1));
              }
            }
          }

          if (swap_choose && (swap_tail && u >= -exp(log_q_cut) || !swap_tail && u >= -exp(4 * log_q_cut) && pp / qq < 1000)) {
            swap_tail = !swap_tail;
            R_ifDEBUG_printf(' u = %g (e^u = xinbta = %.16g) ==> ', u, xinbta);

            if (swap_tail) {
              a = expm1_1.R_DT_CIv(lower_tail, log_p, alpha);
              la = expm1_1.R_DT_Clog(lower_tail, log_p, alpha);
              pp = q;
              qq = p;
            } else {
              a = p_;
              la = expm1_1.R_DT_log(lower_tail, log_p, alpha);
              pp = p;
              qq = q;
            }

            R_ifDEBUG_printf('"%s\'; la = %g\n', swap_tail ? 'swap now' : 'swap back', la);
            u = expm1_1.R_Log1_Exp(u);
            xinbta = exp(u);
          }

          if (!use_log_x) use_log_x = u < log_q_cut;
          var bad_u = !R_FINITE(u);
          var bad_init = bad_u || xinbta > p_hi;
          R_ifDEBUG_printf(' -> u = %g, e^u = xinbta = %.16g, (Newton acu=%g%s)\n', u, xinbta, acu, bad_u ? ', ** bad u **' : use_log_x ? ', on u = log(x) scale' : '');
          u_n = 1;
          tx = xinbta;

          if (bad_u || u < log_q_cut) {
            w = pbeta_1.pbeta_raw(DBL_very_MIN, pp, qq, true, log_p);

            if (w > (log_p ? la : a)) {
              R_ifDEBUG_printf(' quantile is left of smallest positive number; "convergence"\n');

              if (log_p || fabs(w - a) < fabs(0 - a)) {
                tx = DBL_very_MIN;
                u_n = DBL_log_v_MIN;
              } else {
                tx = 0;
                u_n = ML_NEGINF;
              }

              use_log_x = log_p;
              add_N_step = false;
              goto_L_return = true;
            } else {
              R_ifDEBUG_printf(' pbeta(smallest pos.) = %g <= %g  --> continuing\n', w, log_p ? la : a);

              if (u < DBL_log_v_MIN) {
                u = DBL_log_v_MIN;
                xinbta = DBL_very_MIN;
              }
            }
          }

          if (bad_init && !(use_log_x && tx > 0)) {
            if (u === ML_NEGINF) {
              R_ifDEBUG_printf('  u = -Inf;');
              u = _general_1.M_LN2 * _general_1.DBL_MIN_EXP;
              xinbta = DBL_MIN;
            } else {
              R_ifDEBUG_printf(' bad_init: u=%g, xinbta=%g;', u, xinbta);
              xinbta = xinbta > 1.1 ? 0.5 : xinbta < p_lo ? exp(u) : p_hi;
              if (bad_u) u = log(xinbta);
            }

            R_ifDEBUG_printf(' -> (partly)new u=%g, xinbta=%g\n', u, xinbta);
          }
        }

        if (!goto_L_return) {
          r = 1 - pp;
          t = 1 - qq;
          var wprev = 0;
          var prev = 1;
          var adj = 1;

          if (use_log_x) {
            for (i_pb = 0; i_pb < 1000; i_pb++) {
              y = pbeta_1.pbeta_raw(xinbta, pp, qq, true, true);
              w = y === ML_NEGINF ? 0 : (y - la) * exp(y - u + logbeta + r * u + t * expm1_1.R_Log1_Exp(u));
              if (!R_FINITE(w)) break;
              if (i_pb >= n_N && w * wprev <= 0) prev = fmax2(fabs(adj), fpu);
              R_ifDEBUG_printf('N(i=%2d): u=%#20.16g, pb(e^u)=%#12.6g, w=%#15.9g, %s prev=%11g,', i_pb, u, y, w, w * wprev <= 0 ? 'new' : 'old', prev);
              g = 1;

              for (i_inn = 0; i_inn < 1000; i_inn++) {
                adj = g * w;

                if (i_pb < n_N || fabs(adj) < prev) {
                  u_n = u - adj;

                  if (u_n <= 0) {
                    if (prev <= acu || fabs(w) <= acu) {
                      R_ifDEBUG_printf(' it{in}=%d, -adj=%g, %s <= acu  ==> convergence\n', i_inn, -adj, prev <= acu ? 'prev' : '|w|');
                      goto_L_converged = true;
                      break;
                    }

                    break;
                  }
                }

                g /= 3;
              }

              if (goto_L_converged) {
                break;
              }

              var D = fmin2(fabs(adj), fabs(u_n - u));
              R_ifDEBUG_printf(' it{in}=%d, delta(u)=%9.3g, D/|.|=%.3g\n', i_inn, u_n - u, D / fabs(u_n + u));

              if (D <= 4e-16 * fabs(u_n + u)) {
                goto_L_converged = true;
                break;
              }

              u = u_n;
              xinbta = exp(u);
              wprev = w;
            }
          } else {
            for (i_pb = 0; i_pb < 1000; i_pb++) {
              y = pbeta_1.pbeta_raw(xinbta, pp, qq, true, log_p);

              if (!R_FINITE(y) && !(log_p && y === ML_NEGINF)) {
                _general_1.ML_ERROR(_general_1.ME.ME_DOMAIN, '', printer_qbeta_raw);

                qb[0] = qb[1] = ML_NAN;
                return;
              }

              w = log_p ? (y - la) * exp(y + logbeta + r * log(xinbta) + t * log1p(-xinbta)) : (y - a) * exp(logbeta + r * log(xinbta) + t * log1p(-xinbta));
              if (i_pb >= n_N && w * wprev <= 0) prev = fmax2(fabs(adj), fpu);
              R_ifDEBUG_printf('N(i=%2d): x0=%d, pb(x0)=%d, w=%d, %s prev=%d,', i_pb, xinbta, y, w, w * wprev <= 0 ? 'new' : 'old', prev);
              g = 1;

              for (i_inn = 0; i_inn < 1000; i_inn++) {
                adj = g * w;

                if (i_pb < n_N || fabs(adj) < prev) {
                  tx = xinbta - adj;

                  if (0 <= tx && tx <= 1) {
                    if (prev <= acu || fabs(w) <= acu) {
                      R_ifDEBUG_printf(' it{in}=%d, delta(x)=%g, %s <= acu  ==> convergence\n', i_inn, -adj, prev <= acu ? 'prev' : '|w|');
                      goto_L_converged = true;
                      break;
                    }

                    if (tx !== 0 && tx !== 1) break;
                  }
                }

                g /= 3;
              }

              if (goto_L_converged) {
                break;
              }

              R_ifDEBUG_printf(' it{in}=%d, delta(x)=%g\n', i_inn, tx - xinbta);

              if (fabs(tx - xinbta) <= 4e-16 * (tx + xinbta)) {
                goto_L_converged = true;
                break;
              }

              xinbta = tx;
              if (tx === 0) break;
              wprev = w;
            }
          }

          if (!goto_L_converged) {
            warned = true;

            _general_1.ML_ERROR(_general_1.ME.ME_PRECISION, 'qbeta', printer_qbeta_raw);
          }

          log_ = log_p || use_log_x;
          R_ifDEBUG_printf(' %s: Final delta(y) = %g%s\n', warned ? '_NO_ convergence' : 'converged', y - (log_ ? la : a), log_ ? ' (log_)' : '');

          if (log_ && y === ML_NEGINF || !log_ && y === 0) {
            w = pbeta_1.pbeta_raw(DBL_very_MIN, pp, qq, true, log_);

            if (log_ || fabs(w - a) <= fabs(y - a)) {
              tx = DBL_very_MIN;
              u_n = DBL_log_v_MIN;
            }

            add_N_step = false;
          } else if (!warned && (log_ ? fabs(y - la) > 3 : fabs(y - a) > 1e-4)) {
            if (!(log_ && y === ML_NEGINF && pbeta_1.pbeta_raw(DBL_1__eps, pp, qq, true, true) > la + 2)) printer_qbeta_raw('qbeta(a, *) =: x0 with |pbeta(x0,* %s) - alpha| = %d is not accurate', log_ ? ', log_' : '', fabs(y - (log_ ? la : a)));
          }
        }

        if (give_log_q) {
          if (!use_log_x) printer_qbeta_raw('qbeta() L_return, u_n=%d;  give_log_q=TRUE but use_log_x=FALSE -- please report!', u_n);

          var _r = expm1_1.R_Log1_Exp(u_n);

          if (swap_tail) {
            qb[0] = _r;
            qb[1] = u_n;
          } else {
            qb[0] = u_n;
            qb[1] = _r;
          }
        } else {
          if (use_log_x) {
            if (add_N_step) {
              xinbta = exp(u_n);
              y = pbeta_1.pbeta_raw(xinbta, pp, qq, true, log_p);
              w = log_p ? (y - la) * exp(y + logbeta + r * log(xinbta) + t * log1p(-xinbta)) : (y - a) * exp(logbeta + r * log(xinbta) + t * log1p(-xinbta));
              tx = xinbta - w;
              R_ifDEBUG_printf('Final Newton correction(non-log scale): xinbta=%.16g, y=%g, w=%g. => new tx=%.16g\n', xinbta, y, w, tx);
            } else {
              if (swap_tail) {
                qb[0] = -expm1(u_n);
                qb[1] = exp(u_n);
              } else {
                qb[0] = exp(u_n);
                qb[1] = -expm1(u_n);
              }

              return;
            }
          }

          if (swap_tail) {
            qb[0] = 1 - tx;
            qb[1] = tx;
          } else {
            qb[0] = tx;
            qb[1] = 1 - tx;
          }
        }

        return;
      }

      exports.qbeta_raw = qbeta_raw;
      /***/
    },
    /* 56 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var expm1_1 = __webpack_require__(3);

      var r_func_1 = __webpack_require__(2);

      var pnbeta_1 = __webpack_require__(35);

      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite,
          DBL_MIN = Number.MIN_VALUE,
          DBL_EPSILON = Number.EPSILON;
      var fmin2 = Math.min;
      var printer_qnbeta = debug('qnbeta');

      function qnbeta(_p, a, b, ncp, lower_tail, log_p) {
        var accu = 1e-15;
        var Eps = 1e-14;
        return r_func_1.map(_p)(function (p) {
          var ux;
          var lx;
          var nx;
          var pp;
          if (ISNAN(p) || ISNAN(a) || ISNAN(b) || ISNAN(ncp)) return p + a + b + ncp;
          if (!R_FINITE(a)) return _general_1.ML_ERR_return_NAN(printer_qnbeta);
          if (ncp < 0 || a <= 0 || b <= 0) return _general_1.ML_ERR_return_NAN(printer_qnbeta);

          var rc = _general_1.R_Q_P01_boundaries(lower_tail, log_p, p, 0, 1);

          if (rc !== undefined) {
            return rc;
          }

          p = expm1_1.R_DT_qIv(lower_tail, log_p, p);
          if (p > 1 - DBL_EPSILON) return 1.0;
          pp = fmin2(1 - DBL_EPSILON, p * (1 + Eps));

          for (ux = 0.5; ux < 1 - DBL_EPSILON && pnbeta_1.pnbeta(ux, a, b, ncp, true, false) < pp; ux = 0.5 * (1 + ux)) {
            ;
          }

          pp = p * (1 - Eps);

          for (lx = 0.5; lx > DBL_MIN && pnbeta_1.pnbeta(lx, a, b, ncp, true, false) > pp; lx *= 0.5) {
            ;
          }

          do {
            nx = 0.5 * (lx + ux);
            if (pnbeta_1.pnbeta(nx, a, b, ncp, true, false) > p) ux = nx;else lx = nx;
          } while ((ux - lx) / nx > accu);

          return 0.5 * (ux + lx);
        });
      }

      exports.qnbeta = qnbeta;
      /***/
    },
    /* 57 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite;
      var floor = Math.floor,
          log = Math.log;

      var pbeta_1 = __webpack_require__(12);

      var toms708_1 = __webpack_require__(9);

      var printer = debug('pnbinom');

      function pnbinom(xx, size, prob, lowerTail, logP) {
        var fx = Array.isArray(xx) ? xx : [xx];
        var result = fx.map(function (x) {
          if (ISNAN(x) || ISNAN(size) || ISNAN(prob)) return x + size + prob;

          if (!R_FINITE(size) || !R_FINITE(prob)) {
            return _general_1.ML_ERR_return_NAN(printer);
          }

          if (size < 0 || prob <= 0 || prob > 1) {
            return _general_1.ML_ERR_return_NAN(printer);
          }

          if (size === 0) return x >= 0 ? _general_1.R_DT_1(lowerTail, logP) : _general_1.R_DT_0(lowerTail, logP);
          if (x < 0) return _general_1.R_DT_0(lowerTail, logP);
          if (!R_FINITE(x)) return _general_1.R_DT_1(lowerTail, logP);
          x = floor(x + 1e-7);
          return pbeta_1.pbeta(prob, size, x + 1, lowerTail, logP);
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.pnbinom = pnbinom;
      var printer_pnbinom_mu = debug('printer_pnbinom_mu');

      function pnbinom_mu(xx, size, mu, lowerTail, logP) {
        var fx = Array.isArray(xx) ? xx : [xx];
        var result = fx.map(function (x) {
          if (ISNAN(x) || ISNAN(size) || ISNAN(mu)) return x + size + mu;
          if (!R_FINITE(size) || !R_FINITE(mu)) return _general_1.ML_ERR_return_NAN(printer_pnbinom_mu);
          if (size < 0 || mu < 0) return _general_1.ML_ERR_return_NAN(printer_pnbinom_mu);
          if (size === 0) return x >= 0 ? _general_1.R_DT_1(lowerTail, logP) : _general_1.R_DT_0(lowerTail, logP);
          if (x < 0) return _general_1.R_DT_0(lowerTail, logP);
          if (!R_FINITE(x)) return _general_1.R_DT_1(lowerTail, logP);
          x = floor(x + 1e-7);
          {
            var ierr = new toms708_1.NumberW(0);
            var w = new toms708_1.NumberW(0);
            var wc = new toms708_1.NumberW(0);
            toms708_1.Toms708.bratio(size, x + 1, size / (size + mu), mu / (size + mu), w, wc, ierr);
            if (ierr) printer('pnbinom_mu() -> bratio() gave error code %d', ierr.val);

            if (logP) {
              w.val = log(w.val);
              wc.val = log(wc.val);
            }

            return lowerTail ? w.val : wc.val;
          }
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.pnbinom_mu = pnbinom_mu;
      /***/
    },
    /* 58 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var pbeta_1 = __webpack_require__(12);

      var _general_1 = __webpack_require__(0);

      var r_func_1 = __webpack_require__(2);

      var printer = debug('pbinom');
      var floor = Math.floor,
          R_forceint = Math.round;
      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite;

      function pbinom(xx, n, p) {
        var lowerTail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var logP = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        return r_func_1.map(xx)(function (x) {
          if (ISNAN(x) || ISNAN(n) || ISNAN(p)) return NaN;

          if (!R_FINITE(n) || !R_FINITE(p)) {
            return _general_1.ML_ERR_return_NAN(printer);
          }

          var lower_tail = lowerTail;
          var log_p = logP;

          if (_general_1.R_nonint(n)) {
            printer('non-integer n = %d', n);
            return _general_1.ML_ERR_return_NAN(printer);
          }

          n = R_forceint(n);
          if (n < 0 || p < 0 || p > 1) return _general_1.ML_ERR_return_NAN(printer);
          if (x < 0) return _general_1.R_DT_0(lower_tail, log_p);
          x = floor(x + 1e-7);
          if (n <= x) return _general_1.R_DT_1(lower_tail, log_p);
          printer('calling pbeta:(q=%d,a=%d,b=%d, l.t=%s, log=%s', p, x + 1, n - x, !lower_tail, log_p);
          return pbeta_1.pbeta(p, x + 1, n - x, !lower_tail, log_p);
        });
      }

      exports.pbinom = pbinom;
      /***/
    },
    /* 59 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var fmax2 = Math.max,
          fmin2 = Math.min,
          floor = Math.floor,
          sqrt = Math.sqrt;
      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite,
          DBL_EPSILON = Number.EPSILON;

      var toms708_1 = __webpack_require__(9);

      var expm1_1 = __webpack_require__(3);

      var qnorm_1 = __webpack_require__(6);

      var r_func_1 = __webpack_require__(2);

      var pbinom_1 = __webpack_require__(58);

      var printer_do_search = debug('do_search');

      function do_search(y, z, p, n, pr, incr) {
        if (z.val >= p) {
          printer_do_search('new z=%o >= p = %d  --> search to left (y--) ..', z, p);

          while (true) {
            var newz = void 0;
            if (y === 0 || (newz = pbinom_1.pbinom(y - incr, n, pr, true, false)) < p) return y;
            y = fmax2(0, y - incr);
            z.val = newz;
          }
        } else {
          printer_do_search('new z=%d < p = %d  --> search to right (y++) ..', z.val, p);

          while (true) {
            y = fmin2(y + incr, n);
            if (y === n || (z.val = pbinom_1.pbinom(y, n, pr, true, false)) >= p) return y;
          }
        }
      }

      function qbinom(pp, n, pr) {
        var lowerTail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var logP = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        return r_func_1.map(pp)(function (p) {
          return _qbinom(p, n, pr, lowerTail, logP);
        });
      }

      exports.qbinom = qbinom;
      var printer_qbinom = debug('_qbinom');

      function _qbinom(p, size, pr, lower_tail, log_p) {
        var q;
        var mu;
        var sigma;
        var gamma;
        var z = new toms708_1.NumberW(0);
        var y;
        if (ISNAN(p) || ISNAN(size) || ISNAN(pr)) return NaN;

        if (!R_FINITE(size) || !R_FINITE(pr)) {
          return _general_1.ML_ERR_return_NAN(printer_qbinom);
        }

        if (!R_FINITE(p) && !log_p) {
          return _general_1.ML_ERR_return_NAN(printer_qbinom);
        }

        if (!Number.isInteger(size)) {
          return _general_1.ML_ERR_return_NAN(printer_qbinom);
        }

        if (pr < 0 || pr > 1 || size < 0) {
          return _general_1.ML_ERR_return_NAN(printer_qbinom);
        }

        var rc = _general_1.R_Q_P01_boundaries(lower_tail, log_p, p, 0, size);

        if (rc !== undefined) {
          return rc;
        }

        if (pr === 0 || size === 0) return 0;
        q = 1 - pr;
        if (q === 0) return size;
        mu = size * pr;
        sigma = sqrt(size * pr * q);
        gamma = (q - pr) / sigma;
        printer_qbinom('qbinom(p=%d, n=%d, pr=%d, l.t.=%s, log=%s): sigm=%d, gam=%d', p, size, pr, lower_tail, log_p, sigma, gamma);

        if (!lower_tail || log_p) {
          p = expm1_1.R_DT_qIv(lower_tail, log_p, p);
          if (p === 0) return 0;
          if (p === 1) return size;
        }

        if (Math.abs(p - 1) < DBL_EPSILON) {
          return size;
        }

        z.val = qnorm_1.qnorm(p, 0, 1, true, false);
        y = floor(mu + sigma * (z.val + gamma * (z.val * z.val - 1) / 6) + 0.5);

        if (y > size) {
          y = size;
        }

        printer_qbinom('  new (p,1-p)=(%d,%d), z=qnorm(..)=%d, y=%d, size=%d', p, 1 - p, z.val, y, size);
        z.val = pbinom_1.pbinom(y, size, pr, true, false);
        p *= 1 - 64 * DBL_EPSILON;

        if (size < 1e5) {
          return do_search(y, z, p, size, pr, 1);
        }

        var incr = floor(size * 0.001);
        var oldincr;

        do {
          console.log('loopdieloop');
          oldincr = incr;
          y = do_search(y, z, p, size, pr, incr);
          incr = fmax2(1, floor(incr / 100));
        } while (oldincr > 1 && incr > size * 1e-15);

        return y;
      }
      /***/

    },
    /* 60 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var dgamma_1 = __webpack_require__(21);

      function dchisq(x, df) {
        var log = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        return dgamma_1.dgamma(x, df / 2, 2, log);
      }

      exports.dchisq = dchisq;
      /***/
    },
    /* 61 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var dchisq_1 = __webpack_require__(60);

      var dpois_1 = __webpack_require__(22);

      var ceil = Math.ceil,
          sqrt = Math.sqrt;
      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite,
          ML_POSINF = Number.POSITIVE_INFINITY;
      var printer_dnchisq = debug('dnchisq');

      function dnchisq(xx, df, ncp, give_log) {
        var eps = 5e-15;
        var fa = Array.isArray(xx) ? xx : [xx];
        var result = fa.map(function (x) {
          var i;
          var ncp2;
          var q;
          var mid;
          var dfmid;
          var imax;
          var sum;
          var term;

          if (ISNAN(x) || ISNAN(df) || ISNAN(ncp)) {
            return x + df + ncp;
          }

          if (!R_FINITE(df) || !R_FINITE(ncp) || ncp < 0 || df < 0) {
            return _general_1.ML_ERR_return_NAN(printer_dnchisq);
          }

          if (x < 0) {
            return _general_1.R_D__0(give_log);
          }

          if (x === 0 && df < 2) return ML_POSINF;
          if (ncp === 0) return df > 0 ? dchisq_1.dchisq(x, df, give_log) : _general_1.R_D__0(give_log);
          if (x === ML_POSINF) return _general_1.R_D__0(give_log);
          ncp2 = 0.5 * ncp;
          imax = ceil((-(2 + df) + sqrt((2 - df) * (2 - df) + 4 * ncp * x)) / 4);
          if (imax < 0) imax = 0;

          if (R_FINITE(imax)) {
            dfmid = df + 2 * imax;
            mid = dpois_1.dpois_raw(imax, ncp2, false) * dchisq_1.dchisq(x, dfmid, false);
          } else {
            if (give_log || ncp > 1000) {
              var nl = df + ncp;
              var ic = nl / (nl + ncp);
              return dchisq_1.dchisq(x * ic, nl * ic, give_log);
            } else return _general_1.R_D__0(give_log);
          }

          sum = mid;
          term = mid;
          df = dfmid;
          i = imax;
          var x2 = x * ncp2;

          do {
            i++;
            q = x2 / i / df;
            df += 2;
            term *= q;
            sum += term;
          } while (q >= 1 || term * q > (1 - q) * eps || term > 1e-10 * sum);

          term = mid;
          df = dfmid;
          i = imax;

          while (i !== 0) {
            df -= 2;
            q = i * df / x2;
            i--;
            term *= q;
            sum += term;
            if (q < 1 && term * q <= (1 - q) * eps) break;
          }

          return _general_1.R_D_val(give_log, sum);
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.dnchisq = dnchisq;
      /***/
    },
    /* 62 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var qchisq_1 = __webpack_require__(40);

      var r_func_1 = __webpack_require__(2);

      var pnchisq_1 = __webpack_require__(39);

      var expm1 = Math.expm1,
          fmin2 = Math.min;
      var DBL_MAX = Number.MAX_VALUE,
          DBL_MIN = Number.MIN_VALUE,
          DBL_EPSILON = Number.EPSILON,
          ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite,
          ML_POSINF = Number.POSITIVE_INFINITY;
      var printer = debug('_qnchisq');

      function qnchisq(pp, df) {
        var ncp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var lowerTail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var logP = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        return r_func_1.map(pp)(function (p) {
          return _qnchisq(p, df, ncp, lowerTail, logP);
        });
      }

      exports.qnchisq = qnchisq;

      function _qnchisq(p, df, ncp) {
        var lower_tail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var log_p = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        printer('start');
        var accu = 1e-13;
        var racc = 4 * DBL_EPSILON;
        var Eps = 1e-11;
        var rEps = 1e-10;
        var ux;
        var lx;
        var ux0;
        var nx;
        var pp;

        if (ISNAN(p) || ISNAN(df) || ISNAN(ncp)) {
          return NaN;
        }

        if (!R_FINITE(df)) {
          return _general_1.ML_ERR_return_NAN(printer);
        }

        if (df < 0 || ncp < 0) {
          return _general_1.ML_ERR_return_NAN(printer);
        }

        var rc = _general_1.R_Q_P01_boundaries(lower_tail, log_p, p, 0, ML_POSINF);

        if (rc !== undefined) {
          return rc;
        }

        pp = _general_1.R_D_qIv(log_p, p);

        if (pp > 1 - DBL_EPSILON) {
          return lower_tail ? ML_POSINF : 0.0;
        }

        {
          var b;
          var c;
          var ff;
          b = ncp * ncp / (df + 3 * ncp);
          c = (df + 3 * ncp) / (df + 2 * ncp);
          ff = (df + 2 * ncp) / (c * c);
          ux = b + c * qchisq_1.qchisq(p, ff, lower_tail, log_p);
          if (ux < 0) ux = 1;
          ux0 = ux;
        }

        if (!lower_tail && ncp >= 80) {
          if (pp < 1e-10) _general_1.ML_ERROR(_general_1.ME.ME_PRECISION, 'qnchisq', printer);
          p = log_p ? -expm1(p) : 0.5 - p + 0.5;
          lower_tail = true;
        } else {
          p = pp;
        }

        pp = fmin2(1 - DBL_EPSILON, p * (1 + Eps));

        if (lower_tail) {
          for (; ux < DBL_MAX && pnchisq_1.pnchisq_raw(ux, df, ncp, Eps, rEps, 10000, true, false) < pp; ux *= 2) {
            ;
          }

          pp = p * (1 - Eps);

          for (lx = fmin2(ux0, DBL_MAX); lx > DBL_MIN && pnchisq_1.pnchisq_raw(lx, df, ncp, Eps, rEps, 10000, true, false) > pp; lx *= 0.5) {
            ;
          }
        } else {
          for (; ux < DBL_MAX && pnchisq_1.pnchisq_raw(ux, df, ncp, Eps, rEps, 10000, false, false) > pp; ux *= 2) {
            ;
          }

          pp = p * (1 - Eps);

          for (lx = fmin2(ux0, DBL_MAX); lx > DBL_MIN && pnchisq_1.pnchisq_raw(lx, df, ncp, Eps, rEps, 10000, false, false) < pp; lx *= 0.5) {
            ;
          }
        }

        if (lower_tail) {
          do {
            nx = 0.5 * (lx + ux);
            if (pnchisq_1.pnchisq_raw(nx, df, ncp, accu, racc, 100000, true, false) > p) ux = nx;else lx = nx;
          } while ((ux - lx) / nx > accu);
        } else {
          do {
            nx = 0.5 * (lx + ux);
            if (pnchisq_1.pnchisq_raw(nx, df, ncp, accu, racc, 100000, false, false) < p) ux = nx;else lx = nx;
          } while ((ux - lx) / nx > accu);
        }

        return 0.5 * (ux + lx);
      }
      /***/

    },
    /* 63 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var NumberW = /*#__PURE__*/function () {
        function NumberW() {
          var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

          _classCallCheck(this, NumberW);

          this._val = v;
        }

        _createClass(NumberW, [{
          key: "val",
          get: function get() {
            return this._val;
          },
          set: function set(a) {
            if (Number.isNaN(a)) {
              throw new Error("trying to set NaN, old value:".concat(this._val));
            }

            this._val = a;
          }
        }]);

        return NumberW;
      }();

      exports.NumberW = NumberW;
      /***/
    },
    /* 64 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var R_FINITE = Number.isFinite,
          DBL_MIN = Number.MIN_VALUE,
          NaN = Number.NaN;
      var fabs = Math.abs,
          log = Math.log;

      function bd0(x, np) {
        var ej;
        var s;
        var s1;
        var v;
        var j;

        if (!R_FINITE(x) || !R_FINITE(np) || np === 0.0) {
          return NaN;
        }

        if (fabs(x - np) < 0.1 * (x + np)) {
          v = (x - np) / (x + np);
          s = (x - np) * v;
          if (fabs(s) < DBL_MIN) return s;
          ej = 2 * x * v;
          v = v * v;

          for (j = 1; j < 1000; j++) {
            ej *= v;
            s1 = s + ej / ((j << 1) + 1);
            if (s1 === s) return s1;
            s = s1;
          }
        }

        return x * log(x / np) + np - x;
      }

      exports.bd0 = bd0;
      /***/
    },
    /* 65 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      function __export(m) {
        for (var p in m) {
          if (!exports.hasOwnProperty(p)) exports[p] = m[p];
        }
      }

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      __export(__webpack_require__(64));
      /***/

    },
    /* 66 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var trigonometry_1 = __webpack_require__(33);

      var M_PI = Math.PI,
          log = Math.log,
          exp = Math.exp,
          trunc = Math.trunc;
      var DBL_EPSILON = Number.EPSILON,
          DBL_MIN = Number.MIN_VALUE,
          ML_POSINF = Number.POSITIVE_INFINITY;

      function Rf_gamma_cody(x) {
        var sqrtpi = 0.9189385332046727417803297;
        var xbig = 171.624;
        var p = [-1.71618513886549492533811, 24.7656508055759199108314, -379.804256470945635097577, 629.331155312818442661052, 866.966202790413211295064, -31451.2729688483675254357, -36144.4134186911729807069, 66456.1438202405440627855];
        var q = [-30.8402300119738975254353, 315.350626979604161529144, -1015.15636749021914166146, -3107.77167157231109440444, 22538.1184209801510330112, 4755.84627752788110767815, -134659.959864969306392456, -115132.259675553483497211];
        var c = [-0.001910444077728, 8.4171387781295e-4, -5.952379913043012e-4, 7.93650793500350248e-4, -0.002777777777777681622553, 0.08333333333333333331554247, 0.0057083835261];
        var i;
        var n;
        var parity;
        var fact;
        var xden;
        var xnum;
        var y;
        var z;
        var yi;
        var res;
        var sum;
        var ysq;
        parity = 0;
        fact = 1;
        n = 0;
        y = x;

        if (y <= 0) {
          y = -x;
          yi = trunc(y);
          res = y - yi;

          if (res !== 0) {
            if (yi !== trunc(yi * 0.5) * 2) {
              parity = 1;
            }

            fact = -M_PI / trigonometry_1.sinpi(res);
            y += 1;
          } else {
            return ML_POSINF;
          }
        }

        if (y < DBL_EPSILON) {
          if (y >= DBL_MIN) {
            res = 1 / y;
          } else {
            return ML_POSINF;
          }
        } else if (y < 12) {
          yi = y;

          if (y < 1) {
            z = y;
            y += 1;
          } else {
            n = trunc(y) - 1;
            y -= n;
            z = y - 1;
          }

          xnum = 0;
          xden = 1;

          for (i = 0; i < 8; ++i) {
            xnum = (xnum + p[i]) * z;
            xden = xden * z + q[i];
          }

          res = xnum / xden + 1;

          if (yi < y) {
            res /= yi;
          } else if (yi > y) {
            for (i = 0; i < n; ++i) {
              res *= y;
              y += 1;
            }
          }
        } else {
          if (y <= xbig) {
            ysq = y * y;
            sum = c[6];

            for (i = 0; i < 6; ++i) {
              sum = sum / ysq + c[i];
            }

            sum = sum / y - y + sqrtpi;
            sum += (y - 0.5) * log(y);
            res = exp(sum);
          } else {
            return ML_POSINF;
          }
        }

        if (parity) res = -res;
        if (fact !== 1) res = fact / res;
        return res;
      }

      exports.Rf_gamma_cody = Rf_gamma_cody;
      /***/
    },
    /* 67 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var trigonometry_1 = __webpack_require__(33);

      var gamma_fn_1 = __webpack_require__(29);

      var lgammacor_1 = __webpack_require__(42);

      var ISNAN = Number.isNaN,
          ML_POSINF = Number.POSITIVE_INFINITY;
      var log = Math.log,
          fabs = Math.abs,
          floor = Math.floor,
          trunc = Math.trunc;
      var printer_sign = debug('lgammafn_sign');
      var xmax = 2.5327372760800758e305;
      var dxrel = 1.490116119384765625e-8;

      function lgammafn_sign(x, sgn) {
        var ans;
        var y;
        var sinpiy;
        if (sgn) sgn[0] = 1;
        if (ISNAN(x)) return x;

        if (sgn && x < 0 && _general_1.fmod(floor(-x), 2) === 0) {
          sgn[0] = -1;
        }

        if (x <= 0 && x === trunc(x)) {
          _general_1.ML_ERROR(_general_1.ME.ME_RANGE, 'lgamma', printer_sign);

          return ML_POSINF;
        }

        y = fabs(x);
        if (y < 1e-306) return -log(y);
        if (y <= 10) return log(fabs(gamma_fn_1.gammafn(x)));

        if (y > xmax) {
          _general_1.ML_ERROR(_general_1.ME.ME_RANGE, 'lgamma', printer_sign);

          return ML_POSINF;
        }

        if (x > 0) {
          if (x > 1e17) return x * (log(x) - 1);else if (x > 4934720) return _general_1.M_LN_SQRT_2PI + (x - 0.5) * log(x) - x;else return _general_1.M_LN_SQRT_2PI + (x - 0.5) * log(x) - x + lgammacor_1.lgammacor(x);
        }

        sinpiy = fabs(trigonometry_1.sinpi(y));

        if (sinpiy === 0) {
          printer_sign(' ** should NEVER happen! *** [lgamma.c: Neg.int, y=%d]', y);
          return _general_1.ML_ERR_return_NAN(printer_sign);
        }

        ans = _general_1.M_LN_SQRT_PId2 + (x - 0.5) * log(y) - x - log(sinpiy) - lgammacor_1.lgammacor(y);

        if (fabs((x - Math.trunc(x - 0.5)) * ans / x) < dxrel) {
          _general_1.ML_ERROR(_general_1.ME.ME_PRECISION, 'lgamma', printer_sign);
        }

        return ans;
      }

      exports.lgammafn_sign = lgammafn_sign;
      /***/
    },
    /* 68 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var expm1_1 = __webpack_require__(3);

      var dgamma_1 = __webpack_require__(21);

      var lgamma_fn_1 = __webpack_require__(4);

      var pgamma_1 = __webpack_require__(18);

      var pgamma_2 = __webpack_require__(18);

      var pgamma_3 = __webpack_require__(18);

      var qnorm_1 = __webpack_require__(6);

      var isArray = Array.isArray;
      var fabs = Math.abs,
          sqrt = Math.sqrt,
          pow = Math.pow,
          exp = Math.exp,
          log = Math.log;
      var ISNAN = Number.isNaN,
          ML_POSINF = Number.POSITIVE_INFINITY,
          ML_NEGINF = Number.NEGATIVE_INFINITY,
          DBL_MIN = Number.MIN_VALUE,
          R_FINITE = Number.isFinite;
      var printer_qchisq_appr = debug('qchisq_appr');

      function qchisq_appr(p, nu, g, lower_tail, log_p, tol) {
        var C7 = 4.67;
        var C8 = 6.66;
        var C9 = 6.73;
        var C10 = 13.32;
        var alpha;
        var a;
        var c;
        var ch;
        var p1;
        var p2;
        var q;
        var t;
        var x;
        if (ISNAN(p) || ISNAN(nu)) return p + nu;

        var rc = _general_1.R_Q_P01_check(log_p, p);

        if (rc !== undefined) {
          return rc;
        }

        if (nu <= 0) {
          return _general_1.ML_ERR_return_NAN(printer_qchisq_appr);
        }

        alpha = 0.5 * nu;
        c = alpha - 1;

        if (nu < -1.24 * (p1 = expm1_1.R_DT_log(lower_tail, log_p, p))) {
          var lgam1pa = alpha < 0.5 ? pgamma_3.lgamma1p(alpha) : log(alpha) + g;
          ch = exp((lgam1pa + p1) / alpha + _general_1.M_LN2);
          printer_qchisq_appr(' small chi-sq., ch0 = %d', ch);
        } else if (nu > 0.32) {
          x = qnorm_1.qnorm(p, 0, 1, lower_tail, log_p);
          p1 = 2 / (9 * nu);
          ch = nu * pow(x * sqrt(p1) + 1 - p1, 3);
          printer_qchisq_appr(' nu > .32: Wilson-Hilferty; x = %d', x);
          if (ch > 2.2 * nu + 6) ch = -2 * (expm1_1.R_DT_Clog(lower_tail, log_p, p) - c * log(0.5 * ch) + g);
        } else {
          ch = 0.4;
          a = expm1_1.R_DT_Clog(lower_tail, log_p, p) + g + c * _general_1.M_LN2;
          printer_qchisq_appr(' nu <= .32: a = %d', a);

          do {
            q = ch;
            p1 = 1 / (1 + ch * (C7 + ch));
            p2 = ch * (C9 + ch * (C8 + ch));
            t = -0.5 + (C7 + 2 * ch) * p1 - (C9 + ch * (C10 + 3 * ch)) / p2;
            ch -= (1 - exp(a + 0.5 * ch) * p2 * p1) / t;
          } while (fabs(q - ch) > tol * fabs(ch));
        }

        return ch;
      }

      exports.qchisq_appr = qchisq_appr;

      function qgamma(p) {
        var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var lowerTail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var logP = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        var fa = isArray(p) ? p : [p];
        var result = fa.map(function (pp) {
          return _qgamma(pp, alpha, scale, lowerTail, logP);
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.qgamma = qgamma;
      var printer_qgamma = debug('_qgamma');

      function _qgamma(p) {
        var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1 / alpha;
        var lower_tail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var log_p = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        var EPS1 = 1e-2;
        var EPS2 = 5e-7;
        var EPS_N = 1e-15;
        var MAXIT = 1000;
        var pMIN = 1e-100;
        var pMAX = 1 - 1e-14;
        var i420 = 1 / 420;
        var i2520 = 1 / 2520;
        var i5040 = 1 / 5040;
        var p_;
        var a;
        var b;
        var c;
        var g;
        var ch;
        var ch0;
        var p1;
        var p2;
        var s1;
        var s2;
        var s3;
        var s4;
        var s5;
        var s6;
        var t;
        var x;
        var i;
        var max_it_Newton = 1;
        var q = 0;
        var goto_END = false;
        if (ISNAN(p) || ISNAN(alpha) || ISNAN(scale)) return p + alpha + scale;

        var rc = _general_1.R_Q_P01_boundaries(lower_tail, log_p, p, 0, ML_POSINF);

        if (rc !== undefined) {
          return rc;
        }

        if (alpha < 0 || scale <= 0) return _general_1.ML_ERR_return_NAN(printer_qgamma);
        if (alpha === 0) return 0;

        if (alpha < 1e-10) {
          printer_qgamma('value of shape (%d) is extremely small: results may be unreliable', alpha);
          max_it_Newton = 7;
        }

        p_ = expm1_1.R_DT_qIv(lower_tail, log_p, p);
        printer_qgamma('qgamma(p=%d, alpha=%d, scale=%d, l.t.=%s, log_p=%s): ', p, alpha, scale, lower_tail, log_p);
        g = lgamma_fn_1.lgammafn(alpha);
        ch = qchisq_appr(p, 2 * alpha, g, lower_tail, log_p, EPS1);

        if (!R_FINITE(ch)) {
          max_it_Newton = 0;
          goto_END = true;
        }

        if (goto_END === false) {
          if (ch < EPS2) {
            max_it_Newton = 20;
            goto_END = true;
          }
        }

        if (goto_END === false) {
          if (p_ > pMAX || p_ < pMIN) {
            max_it_Newton = 20;
            goto_END = true;
          }
        }

        if (goto_END === false) {
          printer_qgamma('\t==> ch = %d:', ch);
          c = alpha - 1;
          s6 = (120 + c * (346 + 127 * c)) * i5040;
          ch0 = ch;

          for (i = 1; i <= MAXIT; i++) {
            q = ch;
            p1 = 0.5 * ch;
            p2 = p_ - pgamma_2.pgamma_raw(p1, alpha, true, false);
            if (i === 1) printer_qgamma(' Ph.II iter; ch=%d, p2=%d', ch, p2);
            if (i >= 2) printer_qgamma('     it=%d,  ch=%d, p2=%d', i, ch, p2);

            if (!R_FINITE(p2) || ch <= 0) {
              ch = ch0;
              max_it_Newton = 27;
              goto_END = true;
              break;
            }

            t = p2 * exp(alpha * _general_1.M_LN2 + g + p1 - c * log(ch));
            b = t / ch;
            a = 0.5 * t - b * c;
            s1 = (210 + a * (140 + a * (105 + a * (84 + a * (70 + 60 * a))))) * i420;
            s2 = (420 + a * (735 + a * (966 + a * (1141 + 1278 * a)))) * i2520;
            s3 = (210 + a * (462 + a * (707 + 932 * a))) * i2520;
            s4 = (252 + a * (672 + 1182 * a) + c * (294 + a * (889 + 1740 * a))) * i5040;
            s5 = (84 + 2264 * a + c * (1175 + 606 * a)) * i2520;
            ch += t * (1 + 0.5 * t * s1 - b * c * (s1 - b * (s2 - b * (s3 - b * (s4 - b * (s5 - b * s6))))));

            if (fabs(q - ch) < EPS2 * ch) {
              goto_END = true;
              break;
            }

            if (fabs(q - ch) > 0.1 * ch) {
              if (ch < q) ch = 0.9 * q;else ch = 1.1 * q;
            }
          }

          printer_qgamma('qgamma(%d) not converged in %d iterations; rel.ch=%d', p, MAXIT, ch / fabs(q - ch));
        }

        x = 0.5 * scale * ch;

        if (max_it_Newton) {
          if (!log_p) {
            p = log(p);
            log_p = true;
          }

          if (x === 0) {
            var _1_p = 1 + 1e-7;

            var _1_m = 1 - 1e-7;

            x = DBL_MIN;
            p_ = pgamma_1.pgamma(x, alpha, scale, lower_tail, log_p);
            if (lower_tail && p_ > p * _1_p || !lower_tail && p_ < p * _1_m) return 0;
          } else p_ = pgamma_1.pgamma(x, alpha, scale, lower_tail, log_p);

          if (p_ === ML_NEGINF) return 0;

          for (i = 1; i <= max_it_Newton; i++) {
            p1 = p_ - p;
            if (i === 1) printer_qgamma(' it=%d: p=%d, x = %d, p.=%d; p1=d{p}=%d', i, p, x, p_, p1);
            if (i >= 2) printer_qgamma('          x{it= %d} = %d, p.=%d, p1=d{p}=%d', i, x, p_, p1);
            if (fabs(p1) < fabs(EPS_N * p)) break;
            g = dgamma_1.dgamma(x, alpha, scale, log_p);

            if (g === _general_1.R_D__0(log_p)) {
              if (i === 1) printer_qgamma('no final Newton step because dgamma(*)== 0!');
              break;
            }

            t = log_p ? p1 * exp(p_ - g) : p1 / g;
            t = lower_tail ? x - t : x + t;
            p_ = pgamma_1.pgamma(t, alpha, scale, lower_tail, log_p);

            if (fabs(p_ - p) > fabs(p1) || i > 1 && fabs(p_ - p) === fabs(p1)) {
              if (i === 1 && max_it_Newton > 1) printer_qgamma('no Newton step done since delta{p} >= last delta');
              break;
            }

            if (t > 1.1 * x) t = 1.1 * x;else if (t < 0.9 * x) t = 0.9 * x;
            x = t;
          }
        }

        return x;
      }

      exports._qgamma = _qgamma;
      /***/
    },
    /* 69 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var r_func_1 = __webpack_require__(2);

      var _general_1 = __webpack_require__(0);

      var dbinom_1 = __webpack_require__(17);

      var printer = debug('dhyper');
      var R_forceint = Math.round;
      var ISNAN = Number.isNaN;

      function dhyper(xx, r, b, n) {
        var give_log = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        return r_func_1.map(xx)(function (x) {
          var p;
          var q;
          var p1;
          var p2;
          var p3;
          if (ISNAN(x) || ISNAN(r) || ISNAN(b) || ISNAN(n)) return x + r + b + n;
          if (_general_1.R_D_negInonint(r) || _general_1.R_D_negInonint(b) || _general_1.R_D_negInonint(n) || n > r + b) return _general_1.ML_ERR_return_NAN(printer);
          if (x < 0) return _general_1.R_D__0(give_log);

          var rc = _general_1.R_D_nonint_check(give_log, x, printer);

          if (rc !== undefined) {
            return rc;
          }

          x = R_forceint(x);
          r = R_forceint(r);
          b = R_forceint(b);
          n = R_forceint(n);
          if (n < x || r < x || n - x > b) return _general_1.R_D__0(give_log);
          if (n === 0) return x === 0 ? _general_1.R_D__1(give_log) : _general_1.R_D__0(give_log);
          p = n / (r + b);
          q = (r + b - n) / (r + b);
          p1 = dbinom_1.dbinom_raw(x, r, p, q, give_log);
          p2 = dbinom_1.dbinom_raw(n - x, b, p, q, give_log);
          p3 = dbinom_1.dbinom_raw(n, r + b, p, q, give_log);
          return give_log ? p1 + p2 - p3 : p1 * p2 / p3;
        });
      }

      exports.dhyper = dhyper;
      /***/
    },
    /* 70 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var expm1_1 = __webpack_require__(3);

      var r_func_1 = __webpack_require__(2);

      var lfastchoose_1 = __webpack_require__(133);

      var log = Math.log,
          exp = Math.exp,
          fmin2 = Math.min,
          fmax2 = Math.max,
          R_forceint = Math.round;
      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite,
          DBL_EPSILON = Number.EPSILON;
      var printer_qhyper = debug('qhyper');

      function qhyper(pp, nr, nb, n) {
        var lowerTail = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
        var logP = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
        return r_func_1.map(pp)(function (p) {
          var N;
          var xstart;
          var xend;
          var xr;
          var xb;
          var sum;
          var term;
          var small_N;
          if (ISNAN(p) || ISNAN(nr) || ISNAN(nb) || ISNAN(n)) return NaN;
          if (!R_FINITE(nr) || !R_FINITE(nb) || !R_FINITE(n)) return _general_1.ML_ERR_return_NAN(printer_qhyper);
          var NR = R_forceint(nr);
          var NB = R_forceint(nb);
          N = NR + NB;
          n = R_forceint(n);
          if (NR < 0 || NB < 0 || n < 0 || n > N) return _general_1.ML_ERR_return_NAN(printer_qhyper);
          xstart = fmax2(0, n - NB);
          xend = fmin2(n, NR);

          var rc = _general_1.R_Q_P01_boundaries(lowerTail, logP, p, xstart, xend);

          if (rc !== undefined) {
            return rc;
          }

          xr = xstart;
          xb = n - xr;
          small_N = N < 1000;
          term = lfastchoose_1.lfastchoose(NR, xr) + lfastchoose_1.lfastchoose(NB, xb) - lfastchoose_1.lfastchoose(N, n);
          if (small_N) term = exp(term);
          NR -= xr;
          NB -= xb;

          if (!lowerTail || logP) {
            p = expm1_1.R_DT_qIv(lowerTail, logP, p);
          }

          p *= 1 - 1000 * DBL_EPSILON;
          sum = small_N ? term : exp(term);

          while (sum < p && xr < xend) {
            xr++;
            NB++;
            if (small_N) term *= NR / xr * (xb / NB);else term += log(NR / xr * (xb / NB));
            sum += small_N ? term : exp(term);
            xb--;
            NR--;
          }

          return xr;
        });
      }

      exports.qhyper = qhyper;
      /***/
    },
    /* 71 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _general_1 = __webpack_require__(0);

      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite;
      var floor = Math.floor,
          fmax2 = Math.max;

      var debug = __webpack_require__(1);

      var pgamma_1 = __webpack_require__(18);

      var r_func_1 = __webpack_require__(2);

      var printer = debug('ppois');

      function ppois(_x, lambda) {
        var lowerTail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var logP = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        return r_func_1.map(_x)(function (x) {
          if (ISNAN(x) || ISNAN(lambda)) return x + lambda;

          if (lambda < 0) {
            return _general_1.ML_ERR_return_NAN(printer);
          }

          if (x < 0) return _general_1.R_DT_0(lowerTail, logP);
          if (lambda === 0) return _general_1.R_DT_1(lowerTail, logP);
          if (!R_FINITE(x)) return _general_1.R_DT_1(lowerTail, logP);
          x = floor(x + 1e-7);
          return pgamma_1.pgamma(lambda, x + 1, 1, !lowerTail, logP);
        });
      }

      exports.ppois = ppois;

      function do_search(y, z, p, lambda, incr) {
        if (z.val >= p) {
          while (true) {
            if (y === 0 || (z.val = ppois(y - incr, lambda, true, false)) < p) return y;
            y = fmax2(0, y - incr);
          }
        } else {
          while (true) {
            y = y + incr;
            if ((z.val = ppois(y, lambda, true, false)) >= p) return y;
          }
        }
      }

      exports.do_search = do_search;
      /***/
    },
    /* 72 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var qnorm_1 = __webpack_require__(6);

      var mersenne_twister_1 = __webpack_require__(5);

      var inormal_rng_1 = __webpack_require__(15);

      var BIG = 134217728;
      var isArray = Array.isArray;

      var Inversion = /*#__PURE__*/function (_inormal_rng_1$IRNGNo) {
        _inherits(Inversion, _inormal_rng_1$IRNGNo);

        var _super2 = _createSuper(Inversion);

        function Inversion() {
          var _rng = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new mersenne_twister_1.MersenneTwister(0);

          _classCallCheck(this, Inversion);

          return _super2.call(this, _rng);
        }

        _createClass(Inversion, [{
          key: "internal_norm_rand",
          value: function internal_norm_rand() {
            var u1 = this.rng.unif_rand();
            var t = this.rng.unif_rand();
            u1 = new Int32Array([BIG * u1])[0] + t;
            var result = qnorm_1.qnorm(u1 / BIG, 0.0, 1.0, !!1, !!0);
            return isArray(result) ? result[0] : result;
          }
        }]);

        return Inversion;
      }(inormal_rng_1.IRNGNormal);

      exports.Inversion = Inversion;
      /***/
    },
    /* 73 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var expm1_1 = __webpack_require__(3);

      var R_FINITE = Number.isFinite,
          DBL_EPSILON = Number.EPSILON,
          ISNAN = Number.isNaN;
      var M_LN2 = Math.LN2,
          fabs = Math.abs,
          trunc = Math.trunc,
          log = Math.log,
          exp = Math.exp,
          floor = Math.floor,
          round = Math.round;
      var printer_dsignrank = debug('dsignrank');
      var printer_psignrank = debug('psignrank');
      var printer_qsignrank = debug('qsignrank');
      var printer_rsignrank = debug('rsignrank');

      function csignrank(k, n, u, c, w) {
        if (k < 0 || k > u) return 0;
        if (k > c) k = u - k;
        if (n === 1) return 1;
        if (w[0] === 1) return w[k];
        w[0] = w[1] = 1;

        for (var j = 2; j < n + 1; ++j) {
          var i = void 0;

          var end = _general_1.imin2(j * (j + 1) / 2, c);

          for (i = end; i >= j; --i) {
            w[i] += w[i - j];
          }
        }

        return w[k];
      }

      exports.csignrank = csignrank;

      function dsignrank(xx, n) {
        var logX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var rn = round(n);
        var u = rn * (rn + 1) / 2;
        var c = trunc(u / 2);
        var w = new Array(c + 1).fill(0);
        var fx = Array.isArray(xx) ? xx : [xx];
        var result = fx.map(function (x) {
          if (ISNAN(x) || ISNAN(n)) return x + n;

          if (n <= 0) {
            return _general_1.ML_ERR_return_NAN(printer_dsignrank);
          }

          if (fabs(x - round(x)) > 1e-7) {
            return _general_1.R_D__0(logX);
          }

          x = round(x);

          if (x < 0 || x > n * (n + 1) / 2) {
            return _general_1.R_D__0(logX);
          }

          var d = _general_1.R_D_exp(logX, log(csignrank(trunc(x), n, u, c, w)) - n * M_LN2);

          return d;
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.dsignrank = dsignrank;

      function psignrank(xx, n) {
        var lowerTail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var logP = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        var roundN = round(n);
        var u = roundN * (roundN + 1) / 2;
        var c = trunc(u / 2);
        var w = new Array(c + 1).fill(0);
        var fx = Array.isArray(xx) ? xx : [xx];
        var result = fx.map(function (x) {
          return round(x + 1e-7);
        }).map(function (x) {
          var lowerT = lowerTail;
          if (ISNAN(x) || ISNAN(n)) return x + n;
          if (!R_FINITE(n)) return _general_1.ML_ERR_return_NAN(printer_psignrank);
          if (n <= 0) return _general_1.ML_ERR_return_NAN(printer_psignrank);

          if (x < 0.0) {
            return _general_1.R_DT_0(lowerTail, logP);
          }

          if (x >= u) {
            return _general_1.R_DT_1(lowerTail, logP);
          }

          var f = exp(-roundN * M_LN2);
          var p = 0;

          if (x <= u / 2) {
            for (var i = 0; i <= x; i++) {
              p += csignrank(i, roundN, u, c, w) * f;
            }
          } else {
            x = n * (n + 1) / 2 - x;

            for (var _i2 = 0; _i2 < x; _i2++) {
              p += csignrank(_i2, roundN, u, c, w) * f;
            }

            lowerT = !lowerT;
          }

          return _general_1.R_DT_val(lowerT, logP, p);
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.psignrank = psignrank;

      function qsignrank(xx, n) {
        var lowerTail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var logP = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        var roundN = round(n);
        var u = roundN * (roundN + 1) / 2;
        var c = trunc(u / 2);
        var w = new Array(c + 1).fill(0);
        var fx = Array.isArray(xx) ? xx : [xx];
        var result = fx.map(function (x) {
          if (ISNAN(x) || ISNAN(n)) {
            return x + n;
          }

          if (!R_FINITE(x) || !R_FINITE(n)) {
            return _general_1.ML_ERR_return_NAN(printer_qsignrank);
          }

          var rc = _general_1.R_Q_P01_check(logP, x);

          if (rc !== undefined) {
            return rc;
          }

          if (roundN <= 0) {
            return _general_1.ML_ERR_return_NAN(printer_qsignrank);
          }

          if (x === _general_1.R_DT_0(lowerTail, logP)) {
            return 0;
          }

          if (x === _general_1.R_DT_1(lowerTail, logP)) {
            return u;
          }

          if (logP || !lowerTail) x = expm1_1.R_DT_qIv(lowerTail, logP, x);
          var f = exp(-n * M_LN2);
          var p = 0;
          var q = 0;

          if (x <= 0.5) {
            x = x - 10 * DBL_EPSILON;

            while (true) {
              p += csignrank(q, roundN, u, c, w) * f;
              if (p >= x) break;
              q++;
            }
          } else {
            x = 1 - x + 10 * DBL_EPSILON;

            while (true) {
              p += csignrank(q, roundN, u, c, w) * f;

              if (p > x) {
                q = trunc(u - q);
                break;
              }

              q++;
            }
          }

          return q;
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.qsignrank = qsignrank;

      function rsignrank(nn, n, rng) {
        var result = new Array(nn).fill(0).map(function () {
          if (ISNAN(n)) return n;
          var nRound = round(n);
          if (nRound < 0) return _general_1.ML_ERR_return_NAN(printer_rsignrank);
          if (nRound === 0) return 0;
          var r = 0.0;
          var k = floor(nRound);

          for (var i = 0; i < k;) {
            r += ++i * floor(rng.unif_rand() + 0.5);
          }

          return r;
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.rsignrank = rsignrank;
      /***/
    },
    /* 74 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _general_1 = __webpack_require__(0);

      var lgamma_fn_1 = __webpack_require__(4);

      var trunc = Math.trunc,
          log = Math.log;
      var sferr_halves = [0.0, 0.1534264097200273452913848, 0.0810614667953272582196702, 0.0548141210519176538961390, 0.0413406959554092940938221, 0.03316287351993628748511048, 0.02767792568499833914878929, 0.02374616365629749597132920, 0.02079067210376509311152277, 0.01848845053267318523077934, 0.01664469118982119216319487, 0.01513497322191737887351255, 0.01387612882307074799874573, 0.01281046524292022692424986, 0.01189670994589177009505572, 0.01110455975820691732662991, 0.010411265261972096497478567, 0.009799416126158803298389475, 0.009255462182712732917728637, 0.008768700134139385462952823, 0.008330563433362871256469318, 0.007934114564314020547248100, 0.007573675487951840794972024, 0.007244554301320383179543912, 0.006942840107209529865664152, 0.006665247032707682442354394, 0.006408994188004207068439631, 0.006171712263039457647532867, 0.005951370112758847735624416, 0.005746216513010115682023589, 0.005554733551962801371038690];
      var S0 = 0.083333333333333333333;
      var S1 = 0.00277777777777777777778;
      var S2 = 0.00079365079365079365079365;
      var S3 = 0.000595238095238095238095238;
      var S4 = 0.0008417508417508417508417508;

      function stirlerr(n) {
        var nn;

        if (n <= 15.0) {
          nn = n + n;
          if (nn === trunc(nn)) return sferr_halves[trunc(nn)];
          return lgamma_fn_1.lgammafn(n + 1.) - (n + 0.5) * log(n) + n - _general_1.M_LN_SQRT_2PI;
        }

        nn = n * n;
        if (n > 500) return (S0 - S1 / nn) / n;
        if (n > 80) return (S0 - (S1 - S2 / nn) / nn) / n;
        if (n > 35) return (S0 - (S1 - (S2 - S3 / nn) / nn) / nn) / n;
        return (S0 - (S1 - (S2 - (S3 - S4 / nn) / nn) / nn) / nn) / n;
      }

      exports.stirlerr = stirlerr;
      /***/
    },
    /* 75 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var expm1_1 = __webpack_require__(3);

      var qnorm_1 = __webpack_require__(6);

      var r_func_1 = __webpack_require__(2);

      var cospi_1 = __webpack_require__(23);

      var dt_1 = __webpack_require__(45);

      var pt_1 = __webpack_require__(47);

      var M_LN2 = Math.LN2,
          M_PI = Math.PI,
          M_SQRT2 = Math.SQRT2,
          sqrt = Math.sqrt,
          pow = Math.pow,
          log = Math.log,
          exp = Math.exp,
          fmin2 = Math.min,
          fabs = Math.abs,
          expm1 = Math.expm1;
      var ISNAN = Number.isNaN,
          DBL_EPSILON = Number.EPSILON,
          DBL_MAX = Number.MAX_VALUE,
          DBL_MIN = Number.MIN_VALUE,
          ML_POSINF = Number.POSITIVE_INFINITY,
          ML_NEGINF = Number.NEGATIVE_INFINITY,
          R_FINITE = Number.isFinite;
      var printer_qt = debug('qt');

      function qt(pp, ndf, lowerTail, logP) {
        return r_func_1.map(pp)(function (p) {
          return _qt(p, ndf, lowerTail, logP);
        });
      }

      exports.qt = qt;

      function _qt(p, ndf, lower_tail, log_p) {
        var eps = 1e-12;
        var P;
        var q;
        var accu = 1e-13;
        var Eps = 1e-11;
        if (ISNAN(p) || ISNAN(ndf)) return p + ndf;

        var rc = _general_1.R_Q_P01_boundaries(lower_tail, log_p, p, ML_NEGINF, ML_POSINF);

        if (rc !== undefined) {
          return rc;
        }

        if (ndf <= 0) return _general_1.ML_ERR_return_NAN(printer_qt);

        if (ndf < 1) {
          var ux;
          var lx;
          var nx;
          var pp;
          var iter = 0;
          p = expm1_1.R_DT_qIv(lower_tail, log_p, p);
          if (p > 1 - DBL_EPSILON) return ML_POSINF;
          pp = fmin2(1 - DBL_EPSILON, p * (1 + Eps));

          for (ux = 1; ux < DBL_MAX && pt_1.pt(ux, ndf, true, false) < pp; ux *= 2) {
            ;
          }

          pp = p * (1 - Eps);

          for (lx = -1; lx > -DBL_MAX && pt_1.pt(lx, ndf, true, false) > pp; lx *= 2) {
            ;
          }

          do {
            nx = 0.5 * (lx + ux);
            if (pt_1.pt(nx, ndf, true, false) > p) ux = nx;else lx = nx;
          } while ((ux - lx) / fabs(nx) > accu && ++iter < 1000);

          if (iter >= 1000) {
            _general_1.ML_ERROR(_general_1.ME.ME_PRECISION, 'qt', printer_qt);
          }

          return 0.5 * (lx + ux);
        }

        if (ndf > 1e20) return qnorm_1.qnorm(p, 0, 1, lower_tail, log_p);
        P = _general_1.R_D_qIv(log_p, p);
        var neg = (!lower_tail || P < 0.5) && (lower_tail || P > 0.5);
        var is_neg_lower = lower_tail === neg;
        if (neg) P = 2 * (log_p ? lower_tail ? P : -expm1(p) : _general_1.R_D_Lval(lower_tail, p));else P = 2 * (log_p ? lower_tail ? -expm1(p) : P : _general_1.R_D_Cval(lower_tail, p));

        if (fabs(ndf - 2) < eps) {
          if (P > DBL_MIN) {
            if (3 * P < DBL_EPSILON) q = 1 / sqrt(P);else if (P > 0.9) q = (1 - P) * sqrt(2 / (P * (2 - P)));else q = sqrt(2 / (P * (2 - P)) - 2);
          } else {
            if (log_p) q = is_neg_lower ? exp(-p / 2) / M_SQRT2 : 1 / sqrt(-expm1(p));else q = ML_POSINF;
          }
        } else if (ndf < 1 + eps) {
          if (P === 1) q = 0;else if (P > 0) q = 1 / cospi_1.tanpi(P / 2);else {
            if (log_p) q = is_neg_lower ? _general_1.M_1_PI * exp(-p) : -1 / (M_PI * expm1(p));else q = ML_POSINF;
          }
        } else {
          var x = 0;
          var y = 0;
          var log_P2 = 0;
          var a = 1 / (ndf - 0.5);
          var b = 48 / (a * a);
          var c = ((20700 * a / b - 98) * a - 16) * a + 96.36;
          var d = ((94.5 / (b + c) - 3) / b + 1) * sqrt(a * _general_1.M_PI_2) * ndf;
          var P_ok1 = P > DBL_MIN || !log_p;
          var P_ok = P_ok1;

          if (P_ok1) {
            y = pow(d * P, 2.0 / ndf);
            P_ok = y >= DBL_EPSILON;
          }

          if (!P_ok) {
            log_P2 = is_neg_lower ? _general_1.R_D_log(log_p, p) : expm1_1.R_D_LExp(log_p, p);
            x = (log(d) + M_LN2 + log_P2) / ndf;
            y = exp(2 * x);
          }

          if (ndf < 2.1 && P > 0.5 || y > 0.05 + a) {
            if (P_ok) x = qnorm_1.qnorm(0.5 * P, 0, 1, false, false);else x = qnorm_1.qnorm(log_P2, 0, 1, lower_tail, true);
            y = x * x;
            if (ndf < 5) c += 0.3 * (ndf - 4.5) * (x + 0.6);
            c = (((0.05 * d * x - 5) * x - 7) * x - 2) * x + b + c;
            y = (((((0.4 * y + 6.3) * y + 36) * y + 94.5) / c - y - 3) / b + 1) * x;
            y = expm1(a * y * y);
            q = sqrt(ndf * y);
          } else if (!P_ok && x < -M_LN2 * _general_1.DBL_MANT_DIG) {
            q = sqrt(ndf) * exp(-x);
          } else {
            y = ((1 / (((ndf + 6) / (ndf * y) - 0.089 * d - 0.822) * (ndf + 2) * 3) + 0.5 / (ndf + 4)) * y - 1) * (ndf + 1) / (ndf + 2) + 1 / y;
            q = sqrt(ndf * y);
          }

          if (P_ok1) {
            var it = 0;

            while (it++ < 10 && (y = dt_1.dt(q, ndf, false)) > 0 && R_FINITE(x = (pt_1.pt(q, ndf, false, false) - P / 2) / y) && fabs(x) > 1e-14 * fabs(q)) {
              q += x * (1 + x * q * (ndf + 1) / (2 * (q * q + ndf)));
            }
          }
        }

        if (neg) q = -q;
        return q;
      }
      /***/

    },
    /* 76 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var ML_NAN = Number.NaN,
          ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite;
      var M_PI = Math.PI;
      var printer_tanpi = debug('tanpi');

      function tanpi(x) {
        if (ISNAN(x)) return x;

        if (!R_FINITE(x)) {
          _general_1.ML_ERROR(_general_1.ME.ME_DOMAIN, '', printer_tanpi);

          return ML_NAN;
        }

        x = _general_1.fmod(x, 1);

        if (x <= -0.5) {
          x++;
        } else if (x > 0.5) {
          x--;
        }

        return x === 0 ? 0 : x === 0.5 ? ML_NAN : Math.tan(M_PI * x);
      }

      exports.tanpi = tanpi;

      function atanpi(x) {
        return Math.atan(x) / Math.PI;
      }

      exports.atanpi = atanpi;
      /***/
    },
    /* 77 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var wprob_1 = __webpack_require__(169);

      var _general_1 = __webpack_require__(0);

      var _general_2 = __webpack_require__(0);

      var lgamma_fn_1 = __webpack_require__(4);

      var r_func_1 = __webpack_require__(2);

      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite;
      var exp = Math.exp,
          sqrt = Math.sqrt,
          log = Math.log,
          M_LN2 = Math.LN2;
      var printer_ptukey = debug('_ptukey');

      function ptukey(qq, rr, cc, df) {
        var lower_tail = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
        var log_p = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
        return r_func_1.map(qq)(function (q) {
          return _ptukey(q, rr, cc, df, lower_tail, log_p);
        });
      }

      exports.ptukey = ptukey;

      function _ptukey(q, rr, cc, df, lower_tail, log_p) {
        var nlegq = 16;
        var ihalfq = 8;
        var eps1 = -30.0;
        var eps2 = 1.0e-14;
        var dhaf = 100.0;
        var dquar = 800.0;
        var deigh = 5000.0;
        var dlarg = 25000.0;
        var ulen1 = 1.0;
        var ulen2 = 0.5;
        var ulen3 = 0.25;
        var ulen4 = 0.125;
        var xlegq = [0.98940093499164993259615417345, 0.944575023073232576077988415535, 0.865631202387831743880467897712, 0.755404408355003033895101194847, 0.617876244402643748446671764049, 0.458016777657227386342419442984, 0.28160355077925891323046050146, 0.95012509837637440185319335425e-1];
        var alegq = [0.27152459411754094851780572456e-1, 0.622535239386478928628438369944e-1, 0.951585116824927848099251076022e-1, 0.124628971255533872052476282192, 0.149595988816576732081501730547, 0.16915651939500253818931207903, 0.182603415044923588866763667969, 0.189450610455068496285396723208];
        var ans;
        var f2;
        var f21;
        var f2lf;
        var ff4;
        var otsum;
        var qsqz;
        var rotsum;
        var twa1;
        var ulen;
        var wprb;

        if (ISNAN(q) || ISNAN(rr) || ISNAN(cc) || ISNAN(df)) {
          return _general_1.ML_ERR_return_NAN(printer_ptukey);
        }

        if (q <= 0) {
          return _general_1.R_DT_0(lower_tail, log_p);
        }

        if (df < 2 || rr < 1 || cc < 2) return _general_1.ML_ERR_return_NAN(printer_ptukey);
        if (!R_FINITE(q)) return _general_1.R_DT_1(lower_tail, log_p);
        if (df > dlarg) return _general_2.R_DT_val(lower_tail, log_p, wprob_1.wprob(q, rr, cc));
        f2 = df * 0.5;
        f2lf = f2 * log(df) - df * M_LN2 - lgamma_fn_1.lgammafn(f2);
        f21 = f2 - 1.0;
        ff4 = df * 0.25;
        if (df <= dhaf) ulen = ulen1;else if (df <= dquar) ulen = ulen2;else if (df <= deigh) ulen = ulen3;else ulen = ulen4;
        f2lf += log(ulen);
        ans = 0.0;
        otsum = 0.0;

        for (var i = 1; i <= 50; i++) {
          otsum = 0.0;
          twa1 = (2 * i - 1) * ulen;

          for (var jj = 1; jj <= nlegq; jj++) {
            var j = ihalfq < jj ? jj - ihalfq - 1 : jj - 1;
            var t1 = ihalfq < jj ? f2lf + f21 * log(twa1 + xlegq[j] * ulen) - (xlegq[j] * ulen + twa1) * ff4 : f2lf + f21 * log(twa1 - xlegq[j] * ulen) + (xlegq[j] * ulen - twa1) * ff4;

            if (t1 >= eps1) {
              if (ihalfq < jj) {
                qsqz = q * sqrt((xlegq[j] * ulen + twa1) * 0.5);
              } else {
                qsqz = q * sqrt((-(xlegq[j] * ulen) + twa1) * 0.5);
              }

              wprb = wprob_1.wprob(qsqz, rr, cc);
              rotsum = wprb * alegq[j] * exp(t1);
              otsum += rotsum;
            }
          }

          if (i * ulen >= 1.0 && otsum <= eps2) break;
          ans += otsum;
        }

        if (otsum > eps2) {
          _general_1.ML_ERROR(_general_1.ME.ME_PRECISION, 'ptukey', printer_ptukey);
        }

        if (ans > 1) ans = 1;
        return _general_2.R_DT_val(lower_tail, log_p, ans);
      }

      exports._ptukey = _ptukey;
      /***/
    },
    /* 78 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";
      /**
       * This is the common logic for both the Node.js and web browser
       * implementations of `debug()`.
       */

      function setup(env) {
        createDebug.debug = createDebug;
        createDebug["default"] = createDebug;
        createDebug.coerce = coerce;
        createDebug.disable = disable;
        createDebug.enable = enable;
        createDebug.enabled = enabled;
        createDebug.humanize = __webpack_require__(184);
        Object.keys(env).forEach(function (key) {
          createDebug[key] = env[key];
        });
        /**
        * Active `debug` instances.
        */

        createDebug.instances = [];
        /**
        * The currently active debug mode names, and names to skip.
        */

        createDebug.names = [];
        createDebug.skips = [];
        /**
        * Map of special "%n" handling functions, for the debug "format" argument.
        *
        * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
        */

        createDebug.formatters = {};
        /**
        * Selects a color for a debug namespace
        * @param {String} namespace The namespace string for the for the debug instance to be colored
        * @return {Number|String} An ANSI color code for the given namespace
        * @api private
        */

        function selectColor(namespace) {
          var hash = 0;

          for (var i = 0; i < namespace.length; i++) {
            hash = (hash << 5) - hash + namespace.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
          }

          return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
        }

        createDebug.selectColor = selectColor;
        /**
        * Create a debugger with the given `namespace`.
        *
        * @param {String} namespace
        * @return {Function}
        * @api public
        */

        function createDebug(namespace) {
          var prevTime;

          function debug() {
            // Disabled?
            if (!debug.enabled) {
              return;
            }

            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            var self = debug; // Set `diff` timestamp

            var curr = Number(new Date());
            var ms = curr - (prevTime || curr);
            self.diff = ms;
            self.prev = prevTime;
            self.curr = curr;
            prevTime = curr;
            args[0] = createDebug.coerce(args[0]);

            if (typeof args[0] !== 'string') {
              // Anything else let's inspect with %O
              args.unshift('%O');
            } // Apply any `formatters` transformations


            var index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
              // If we encounter an escaped % then don't increase the array index
              if (match === '%%') {
                return match;
              }

              index++;
              var formatter = createDebug.formatters[format];

              if (typeof formatter === 'function') {
                var val = args[index];
                match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

                args.splice(index, 1);
                index--;
              }

              return match;
            }); // Apply env-specific formatting (colors, etc.)

            createDebug.formatArgs.call(self, args);
            var logFn = self.log || createDebug.log;
            logFn.apply(self, args);
          }

          debug.namespace = namespace;
          debug.enabled = createDebug.enabled(namespace);
          debug.useColors = createDebug.useColors();
          debug.color = selectColor(namespace);
          debug.destroy = destroy;
          debug.extend = extend; // Debug.formatArgs = formatArgs;
          // debug.rawLog = rawLog;
          // env-specific initialization logic for debug instances

          if (typeof createDebug.init === 'function') {
            createDebug.init(debug);
          }

          createDebug.instances.push(debug);
          return debug;
        }

        function destroy() {
          var index = createDebug.instances.indexOf(this);

          if (index !== -1) {
            createDebug.instances.splice(index, 1);
            return true;
          }

          return false;
        }

        function extend(namespace, delimiter) {
          return createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
        }
        /**
        * Enables a debug mode by namespaces. This can include modes
        * separated by a colon and wildcards.
        *
        * @param {String} namespaces
        * @api public
        */


        function enable(namespaces) {
          createDebug.save(namespaces);
          createDebug.names = [];
          createDebug.skips = [];
          var i;
          var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
          var len = split.length;

          for (i = 0; i < len; i++) {
            if (!split[i]) {
              // ignore empty strings
              continue;
            }

            namespaces = split[i].replace(/\*/g, '.*?');

            if (namespaces[0] === '-') {
              createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
            } else {
              createDebug.names.push(new RegExp('^' + namespaces + '$'));
            }
          }

          for (i = 0; i < createDebug.instances.length; i++) {
            var instance = createDebug.instances[i];
            instance.enabled = createDebug.enabled(instance.namespace);
          }
        }
        /**
        * Disable debug output.
        *
        * @api public
        */


        function disable() {
          createDebug.enable('');
        }
        /**
        * Returns true if the given mode name is enabled, false otherwise.
        *
        * @param {String} name
        * @return {Boolean}
        * @api public
        */


        function enabled(name) {
          if (name[name.length - 1] === '*') {
            return true;
          }

          var i;
          var len;

          for (i = 0, len = createDebug.skips.length; i < len; i++) {
            if (createDebug.skips[i].test(name)) {
              return false;
            }
          }

          for (i = 0, len = createDebug.names.length; i < len; i++) {
            if (createDebug.names[i].test(name)) {
              return true;
            }
          }

          return false;
        }
        /**
        * Coerce `val`.
        *
        * @param {Mixed} val
        * @return {Mixed}
        * @api private
        */


        function coerce(val) {
          if (val instanceof Error) {
            return val.stack || val.message;
          }

          return val;
        }

        createDebug.enable(createDebug.load());
        return createDebug;
      }

      module.exports = setup;
      /***/
    },
    /* 79 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var besselI_1 = __webpack_require__(102);

      var besselJ_1 = __webpack_require__(50);

      var besselK_1 = __webpack_require__(51);

      var besselY_1 = __webpack_require__(52);

      exports.special = Object.freeze({
        besselJ: besselJ_1.bessel_j,
        besselY: besselY_1.bessel_y,
        besselK: besselK_1.bessel_k,
        besselI: besselI_1.bessel_i
      });
      /***/
    },
    /* 80 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var normal_1 = __webpack_require__(8);

      var dnbinom_1 = __webpack_require__(108);

      var pnbinom_1 = __webpack_require__(57);

      var qnbinom_1 = __webpack_require__(109);

      var rnbinom_1 = __webpack_require__(110);

      var errText = Object.freeze(['at most specify either argument "mu" or  "prob", but not both at the same time!', 'both arguments "mu" and "prob" are undefined']);

      function select(fs, mu, prob) {
        var selector = {
          mu: {
            d: dnbinom_1.dnbinom_mu,
            p: pnbinom_1.pnbinom_mu,
            q: qnbinom_1.qnbinom_mu,
            r: rnbinom_1.rnbinom_mu
          },
          p: {
            d: dnbinom_1.dnbinom,
            p: pnbinom_1.pnbinom,
            q: qnbinom_1.qnbinom,
            r: rnbinom_1.rnbinom
          }
        };

        if (prob !== undefined && mu !== undefined) {
          throw new Error(errText[0]);
        }

        if (prob === undefined && mu === undefined) {
          throw new Error(errText[1]);
        }

        var s = prob === undefined ? 'mu' : 'p';
        return selector[s][fs];
      }

      function NegativeBinomial() {
        var rng = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new normal_1.Inversion();

        function dnbinom(x, size, prob, mu) {
          var giveLog = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
          var val = mu || prob;
          return select('d', mu, prob)(x, size, val, giveLog);
        }

        function pnbinom(q, size, prob, mu) {
          var lowerTail = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
          var logP = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
          var val = mu || prob;
          return select('p', mu, prob)(q, size, val, lowerTail, logP);
        }

        function qnbinom(q, size, prob, mu) {
          var lowerTail = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
          var logP = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
          var val = mu || prob;
          return select('q', mu, prob)(q, size, val, lowerTail, logP);
        }

        function rnbinom(n, size, prob, mu) {
          var val = mu || prob;
          return select('r', mu, prob)(n, size, val, rng);
        }

        return {
          dnbinom: dnbinom,
          pnbinom: pnbinom,
          qnbinom: qnbinom,
          rnbinom: rnbinom
        };
      }

      exports.NegativeBinomial = NegativeBinomial;
      /***/
    },
    /* 81 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var mersenne_twister_1 = __webpack_require__(5);

      var dbinom_1 = __webpack_require__(17);

      var pbinom_1 = __webpack_require__(58);

      var qbinom_1 = __webpack_require__(59);

      var rbinom_1 = __webpack_require__(36);

      function Binomial() {
        var rng = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new mersenne_twister_1.MersenneTwister();
        return {
          dbinom: dbinom_1.dbinom,
          pbinom: pbinom_1.pbinom,
          qbinom: qbinom_1.qbinom,
          rbinom: function rbinom(N, nin, pp) {
            return rbinom_1.rbinom(N, nin, pp, rng);
          }
        };
      }

      exports.Binomial = Binomial;
      /***/
    },
    /* 82 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var dcauchy_1 = __webpack_require__(111);

      var pcauchy_1 = __webpack_require__(112);

      var qcauchy_1 = __webpack_require__(113);

      var rcauchy_1 = __webpack_require__(114);

      var mersenne_twister_1 = __webpack_require__(5);

      function Cauchy() {
        var rng = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new mersenne_twister_1.MersenneTwister(0);
        return {
          rcauchy: function rcauchy(n) {
            var location = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
            return rcauchy_1.rcauchy(n, location, scale, rng);
          },
          dcauchy: dcauchy_1.dcauchy,
          pcauchy: pcauchy_1.pcauchy,
          qcauchy: qcauchy_1.qcauchy
        };
      }

      exports.Cauchy = Cauchy;
      /***/
    },
    /* 83 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var chebyshev_1 = __webpack_require__(37);

      exports.ChebyshevSeries = {
        chebyshev_eval: chebyshev_1.chebyshev_eval,
        chebyshev_init: chebyshev_1.chebyshev_init
      };
      /***/
    },
    /* 84 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var normal_1 = __webpack_require__(8);

      var dchisq_1 = __webpack_require__(60);

      var dnchisq_1 = __webpack_require__(61);

      var pchisq_1 = __webpack_require__(38);

      var pnchisq_1 = __webpack_require__(39);

      var qchisq_1 = __webpack_require__(40);

      var qnchisq_1 = __webpack_require__(62);

      var rchisq_1 = __webpack_require__(13);

      var rnchisq_1 = __webpack_require__(41);

      function ChiSquared() {
        var rng = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new normal_1.Inversion();

        function rchisq() {
          var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
          var df = arguments.length > 1 ? arguments[1] : undefined;
          var ncp = arguments.length > 2 ? arguments[2] : undefined;
          return ncp === undefined ? rchisq_1.rchisq(n, df, rng) : rnchisq_1.rnchisq(n, df, ncp, rng);
        }

        function qchisq(p, df, ncp) {
          var lowerTail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
          var logP = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
          return ncp === undefined ? qchisq_1.qchisq(p, df, lowerTail, logP) : qnchisq_1.qnchisq(p, df, ncp, lowerTail, logP);
        }

        function pchisq(p, df, ncp) {
          var lowerTail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
          var logP = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
          return ncp === undefined ? pchisq_1.pchisq(p, df, lowerTail, logP) : pnchisq_1.pnchisq(p, df, ncp, lowerTail, logP);
        }

        function dchisq(x, df, ncp) {
          var log = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
          return ncp === undefined ? dchisq_1.dchisq(x, df, log) : dnchisq_1.dnchisq(x, df, ncp, log);
        }

        return {
          dchisq: dchisq,
          pchisq: pchisq,
          qchisq: qchisq,
          rchisq: rchisq
        };
      }

      exports.ChiSquared = ChiSquared;
      /***/
    },
    /* 85 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var choose_1 = __webpack_require__(27);

      exports.special = {
        choose: choose_1.choose,
        lchoose: choose_1.lchoose
      };
      /***/
    },
    /* 86 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var dexp_1 = __webpack_require__(116);

      var pexp_1 = __webpack_require__(117);

      var qexp_1 = __webpack_require__(118);

      var rexp_1 = __webpack_require__(119);

      var rng_1 = __webpack_require__(16);

      var MersenneTwister = rng_1.rng.MersenneTwister;

      function Exponential() {
        var rng = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new MersenneTwister(0);
        return {
          dexp: function dexp(x) {
            var rate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
            var asLog = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            return dexp_1.dexp(x, 1 / rate, asLog);
          },
          pexp: function pexp(q) {
            var rate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
            var lowerTail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
            var logP = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
            return pexp_1.pexp(q, 1 / rate, lowerTail, logP);
          },
          qexp: function qexp(p) {
            var rate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
            var lowerTail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
            var logP = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
            return qexp_1.qexp(p, 1 / rate, lowerTail, logP);
          },
          rexp: function rexp(n) {
            var rate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
            return rexp_1.rexp(n, 1 / rate, rng);
          }
        };
      }

      exports.Exponential = Exponential;
      /***/
    },
    /* 87 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var rchisq_1 = __webpack_require__(13);

      var rnchisq_1 = __webpack_require__(41);

      var r_func_1 = __webpack_require__(2);

      var r_func_2 = __webpack_require__(2);

      var normal_1 = __webpack_require__(8);

      var df_1 = __webpack_require__(120);

      var dnf_1 = __webpack_require__(121);

      var pf_1 = __webpack_require__(122);

      var pnf_1 = __webpack_require__(123);

      var qf_1 = __webpack_require__(124);

      var qnf_1 = __webpack_require__(125);

      var rf_1 = __webpack_require__(126);

      var sequence = r_func_1.seq()();

      function FDist() {
        var rng = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new normal_1.Inversion();

        function df(x, df1, df2, ncp) {
          var log = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

          if (ncp === undefined) {
            return df_1.df(x, df1, df2, log);
          }

          return dnf_1.dnf(x, df1, df2, ncp, log);
        }

        function pf(q, df1, df2, ncp) {
          var lowerTail = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
          var logP = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

          if (ncp === undefined) {
            return pf_1.pf(q, df1, df2, lowerTail, logP);
          }

          return pnf_1.pnf(q, df1, df2, ncp, lowerTail, logP);
        }

        function qf(p, df1, df2, ncp) {
          var lowerTail = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
          var logP = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

          if (ncp === undefined) {
            return qf_1.qf(p, df1, df2, lowerTail, logP);
          }

          return qnf_1.qnf(p, df1, df2, ncp, lowerTail, logP);
        }

        function rf(n, df1, df2, ncp) {
          if (ncp === undefined) {
            return rf_1.rf(n, df1, df2, rng);
          }

          if (Number.isNaN(ncp)) {
            return r_func_2.possibleScalar(sequence(n).fill(NaN));
          }

          var div = r_func_2.arrayrify(function (a, b) {
            return a / b;
          });
          var numerator = div(rnchisq_1.rnchisq(n, df1, ncp, rng), df1);
          var denominator = div(rchisq_1.rchisq(n, df2, rng), df2);
          return r_func_2.multiplexer(numerator, denominator)(function (x1, d) {
            return x1 / d;
          });
        }

        return {
          df: df,
          pf: pf,
          qf: qf,
          rf: rf
        };
      }

      exports.FDist = FDist;
      /***/
    },
    /* 88 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var normal_1 = __webpack_require__(8);

      var dgeom_1 = __webpack_require__(129);

      var pgeom_1 = __webpack_require__(130);

      var qgeom_1 = __webpack_require__(131);

      var rgeom_1 = __webpack_require__(132);

      function Geometric() {
        var rng = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new normal_1.Inversion();
        return {
          dgeom: dgeom_1.dgeom,
          pgeom: pgeom_1.pgeom,
          qgeom: qgeom_1.qgeom,
          rgeom: function rgeom(N, prob) {
            return rgeom_1.rgeom(N, prob, rng);
          }
        };
      }

      exports.Geometric = Geometric;
      /***/
    },
    /* 89 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var dhyper_1 = __webpack_require__(69);

      var phyper_1 = __webpack_require__(134);

      var qhyper_1 = __webpack_require__(70);

      var rhyper_1 = __webpack_require__(135);

      var mersenne_twister_1 = __webpack_require__(5);

      function HyperGeometric() {
        var rng = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new mersenne_twister_1.MersenneTwister();

        function rhyper(N, nn1in, nn2in, kkin) {
          return rhyper_1.rhyper(N, nn1in, nn2in, kkin, rng);
        }

        return {
          dhyper: dhyper_1.dhyper,
          phyper: phyper_1.phyper,
          qhyper: qhyper_1.qhyper,
          rhyper: rhyper
        };
      }

      exports.HyperGeometric = HyperGeometric;
      /***/
    },
    /* 90 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var mersenne_twister_1 = __webpack_require__(5);

      var dlogis_1 = __webpack_require__(137);

      var plogis_1 = __webpack_require__(138);

      var qlogis_1 = __webpack_require__(139);

      var rlogis_1 = __webpack_require__(140);

      function Logistic() {
        var rng = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new mersenne_twister_1.MersenneTwister(0);

        function rlogis(N) {
          var location = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
          return rlogis_1.rlogis(N, location, scale, rng);
        }

        return {
          dlogis: dlogis_1.dlogis,
          plogis: plogis_1.plogis,
          qlogis: qlogis_1.qlogis,
          rlogis: rlogis
        };
      }

      exports.Logistic = Logistic;
      /***/
    },
    /* 91 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var dlnorm_1 = __webpack_require__(141);

      var plnorm_1 = __webpack_require__(142);

      var qlnorm_1 = __webpack_require__(143);

      var rlnorm_1 = __webpack_require__(144);

      var normal_1 = __webpack_require__(8);

      function LogNormal() {
        var rng = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new normal_1.Inversion();
        return {
          dlnorm: dlnorm_1.dlnorm,
          plnorm: plnorm_1.plnorm,
          qlnorm: qlnorm_1.qlnorm,
          rlnorm: function rlnorm(n) {
            var meanlog = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var sdlog = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
            return rlnorm_1.rlnorm(n, meanlog, sdlog, rng);
          }
        };
      }

      exports.LogNormal = LogNormal;
      /***/
    },
    /* 92 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var dmultinom_1 = __webpack_require__(145);

      var rmultinom_1 = __webpack_require__(146);

      var mersenne_twister_1 = __webpack_require__(5);

      function Multinomial() {
        var rng = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new mersenne_twister_1.MersenneTwister(0);

        function rmultinom(n, size, prob) {
          return rmultinom_1.rmultinom(n, size, prob, rng);
        }

        return {
          rmultinom: rmultinom,
          dmultinom: dmultinom_1.dmultinom
        };
      }

      exports.Multinomial = Multinomial;
      /***/
    },
    /* 93 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var dnorm_1 = __webpack_require__(31);

      var pnorm_1 = __webpack_require__(19);

      var qnorm_1 = __webpack_require__(6);

      var rnorm_1 = __webpack_require__(43);

      var rng_1 = __webpack_require__(16);

      var Inversion = rng_1.rng.normal.Inversion;

      function Normal() {
        var prng = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Inversion();
        return {
          rnorm: function rnorm() {
            var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            var mu = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var sigma = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
            return rnorm_1.rnorm(n, mu, sigma, prng);
          },
          dnorm: dnorm_1.dnorm4,
          pnorm: pnorm_1.pnorm5,
          qnorm: qnorm_1.qnorm,
          rng: prng
        };
      }

      exports.Normal = Normal;
      /***/
    },
    /* 94 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var dpois_1 = __webpack_require__(22);

      var ppois_1 = __webpack_require__(71);

      var qpois_1 = __webpack_require__(147);

      var rpois_1 = __webpack_require__(32);

      var normal_1 = __webpack_require__(8);

      function Poisson() {
        var rng = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new normal_1.Inversion();
        return {
          dpois: dpois_1.dpois,
          ppois: ppois_1.ppois,
          qpois: qpois_1.qpois,
          rpois: function rpois(n, lambda) {
            return rpois_1.rpois(n, lambda, rng);
          }
        };
      }

      exports.Poisson = Poisson;
      /***/
    },
    /* 95 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var rng_1 = __webpack_require__(16);

      var dsign_1 = __webpack_require__(160);

      var psign_1 = __webpack_require__(162);

      var qsign_1 = __webpack_require__(163);

      var rsign_1 = __webpack_require__(164);

      var MersenneTwister = rng_1.rng.MersenneTwister;

      function SignRank() {
        var rng = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new MersenneTwister(0);

        function rsignrank(N, n) {
          return rsign_1.rsignrank(N, n, rng);
        }

        return {
          dsignrank: dsign_1.dsignrank,
          psignrank: psign_1.psignrank,
          qsignrank: qsign_1.qsignrank,
          rsignrank: rsignrank
        };
      }

      exports.SignRank = SignRank;
      /***/
    },
    /* 96 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var rchisq_1 = __webpack_require__(13);

      var rnorm_1 = __webpack_require__(43);

      var r_func_1 = __webpack_require__(2);

      var inversion_1 = __webpack_require__(72);

      var dnt_1 = __webpack_require__(165);

      var dt_1 = __webpack_require__(45);

      var pnt_1 = __webpack_require__(46);

      var pt_1 = __webpack_require__(47);

      var qnt_1 = __webpack_require__(166);

      var qt_1 = __webpack_require__(75);

      var rt_1 = __webpack_require__(167);

      function StudentT() {
        var rng = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new inversion_1.Inversion();

        function dt(x, df, ncp) {
          var asLog = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

          if (ncp === undefined) {
            return dt_1.dt(x, df, asLog);
          }

          return dnt_1.dnt(x, df, ncp, asLog);
        }

        function pt(q, df, ncp) {
          var lowerTail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
          var logP = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

          if (ncp === undefined) {
            return pt_1.pt(q, df, lowerTail, logP);
          }

          return pnt_1.pnt(q, df, ncp, lowerTail, logP);
        }

        function qt(pp, df, ncp) {
          var lowerTail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
          var logP = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

          if (ncp === undefined) {
            return qt_1.qt(pp, df, lowerTail, logP);
          }

          return qnt_1.qnt(pp, df, ncp, lowerTail, logP);
        }

        function rt(n, df, ncp) {
          if (ncp === undefined) {
            return rt_1.rt(n, df, rng);
          } else if (Number.isNaN(ncp)) {
            return new Array(n).fill(NaN);
          } else {
            var div = r_func_1.arrayrify(function (a, b) {
              return a / b;
            });
            var sqrt = r_func_1.arrayrify(Math.sqrt);
            var norm = r_func_1.flatten(rnorm_1.rnorm(n, ncp, 1, rng));
            var chisq = r_func_1.flatten(sqrt(div(rchisq_1.rchisq(n, df, rng), df)));
            var result = norm.map(function (n, i) {
              return n / chisq[i];
            });
            return result.length === 1 ? result[0] : result;
          }
        }

        return {
          dt: dt,
          pt: pt,
          qt: qt,
          rt: rt
        };
      }

      exports.StudentT = StudentT;
      /***/
    },
    /* 97 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var ptukey_1 = __webpack_require__(77);

      var qtukey_1 = __webpack_require__(168);

      function Tukey() {
        function ptukey(q, nmeans, df) {
          var nranges = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
          var lowerTail = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
          var logP = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
          return ptukey_1.ptukey(q, nranges, nmeans, df, lowerTail, logP);
        }

        function qtukey(q, nmeans, df) {
          var nranges = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
          var lowerTail = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
          var logP = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
          return qtukey_1.qtukey(q, nranges, nmeans, df, lowerTail, logP);
        }

        return {
          ptukey: ptukey,
          qtukey: qtukey
        };
      }

      exports.Tukey = Tukey;
      /***/
    },
    /* 98 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var dunif_1 = __webpack_require__(170);

      var punif_1 = __webpack_require__(171);

      var qunif_1 = __webpack_require__(172);

      var runif_1 = __webpack_require__(173);

      var rng_1 = __webpack_require__(16);

      var MersenneTwister = rng_1.rng.MersenneTwister;

      function Uniform() {
        var rng = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new MersenneTwister(0);
        return {
          dunif: dunif_1.dunif,
          punif: punif_1.punif,
          qunif: qunif_1.qunif,
          rng: rng,
          runif: function runif() {
            var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
            return runif_1.runif(n, min, max, rng);
          }
        };
      }

      exports.Uniform = Uniform;
      /***/
    },
    /* 99 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var dweibull_1 = __webpack_require__(174);

      var pweibull_1 = __webpack_require__(175);

      var qweibull_1 = __webpack_require__(176);

      var rweibull_1 = __webpack_require__(177);

      var rng_1 = __webpack_require__(16);

      function Weibull() {
        var rng = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new rng_1.rng.MersenneTwister(0);

        function rweibull(n, shape) {
          var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
          return rweibull_1.rweibull(n, shape, scale, rng);
        }

        return {
          dweibull: dweibull_1.dweibull,
          pweibull: pweibull_1.pweibull,
          qweibull: qweibull_1.qweibull,
          rweibull: rweibull
        };
      }

      exports.Weibull = Weibull;
      /***/
    },
    /* 100 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var dwilcox_1 = __webpack_require__(178);

      var pwilcox_1 = __webpack_require__(179);

      var qwilcox_1 = __webpack_require__(180);

      var rwilcox_1 = __webpack_require__(181);

      var mersenne_twister_1 = __webpack_require__(5);

      function Wilcoxon() {
        var rng = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new mersenne_twister_1.MersenneTwister(0);

        function rwilcox(nn, m, n) {
          return rwilcox_1.rwilcox(nn, m, n, rng);
        }

        return {
          dwilcox: dwilcox_1.dwilcox,
          pwilcox: pwilcox_1.pwilcox,
          qwilcox: qwilcox_1.qwilcox,
          rwilcox: rwilcox
        };
      }

      exports.Wilcoxon = Wilcoxon;
      /***/
    },
    /* 101 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var gamma_cody_1 = __webpack_require__(66);

      var bessel_constants_1 = __webpack_require__(26);

      var sqrt = Math.sqrt,
          pow = Math.pow,
          min = Math.min,
          fmax = Math.max,
          exp = Math.exp,
          trunc = Math.trunc;
      var ML_POSINF = Number.POSITIVE_INFINITY;
      var printer = debug('I_bessel');

      function I_bessel(x, alpha, nb, ize) {
        var const__ = 1.585;
        var nend;
        var intx;
        var nbmx;
        var k;
        var l;
        var n;
        var nstart;
        var pold;
        var test;
        var p;
        var em;
        var en;
        var empal;
        var emp2al;
        var halfx;
        var aa;
        var bb;
        var cc;
        var psave;
        var plast;
        var tover;
        var psavel;
        var sum;
        var nu;
        var twonu;
        var ncalc = nb;
        var bi2 = new Array(nb).fill(0);
        nu = alpha;
        twonu = nu + nu;

        if (nb > 0 && x >= 0. && 0. <= nu && nu < 1. && 1 <= ize && ize <= 2) {
          ncalc = nb;

          if (ize === 1 && x > bessel_constants_1.exparg_BESS) {
            return {
              x: ML_POSINF,
              nb: nb,
              ncalc: ncalc
            };
          }

          if (ize === 2 && x > bessel_constants_1.xlrg_BESS_IJ) {
            return {
              x: 0.,
              nb: nb,
              ncalc: ncalc
            };
          }

          intx = trunc(x);

          if (x >= bessel_constants_1.rtnsig_BESS) {
            nbmx = nb - intx;
            n = intx + 1;
            en = n + n + twonu;
            plast = 1.;
            p = en / x;
            test = bessel_constants_1.ensig_BESS + bessel_constants_1.ensig_BESS;

            if (intx * 2 > bessel_constants_1.nsig_BESS * 5) {
              test = sqrt(test * p);
            } else {
              test /= pow(const__, intx);
            }

            var gotoL120 = false;

            if (nbmx >= 3) {
              tover = bessel_constants_1.enten_BESS / bessel_constants_1.ensig_BESS;
              nstart = intx + 2;
              nend = nb - 1;

              for (k = nstart; k <= nend; ++k) {
                n = k;
                en += 2.;
                pold = plast;
                plast = p;
                p = en * plast / x + pold;

                if (p > tover) {
                  tover = bessel_constants_1.enten_BESS;
                  p /= tover;
                  plast /= tover;
                  psave = p;
                  psavel = plast;
                  nstart = n + 1;

                  do {
                    ++n;
                    en += 2.;
                    pold = plast;
                    plast = p;
                    p = en * plast / x + pold;
                  } while (p <= 1.);

                  bb = en / x;
                  test = pold * plast / bessel_constants_1.ensig_BESS;
                  test *= .5 - .5 / (bb * bb);
                  p = plast * tover;
                  --n;
                  en -= 2.;
                  nend = min(nb, n);

                  for (l = nstart; l <= nend; ++l) {
                    ncalc = l - 1;
                    pold = psavel;
                    psavel = psave;
                    psave = en * psavel / x + pold;

                    if (psave * psavel > test) {
                      break;
                    }

                    ncalc = nend;
                  }

                  gotoL120 = true;
                  break;
                }
              }

              if (gotoL120 === false) {
                n = nend;
                en = n + n + twonu;
                test = fmax(test, sqrt(plast * bessel_constants_1.ensig_BESS) * sqrt(p + p));
              }
            }

            if (gotoL120 === false) {
              do {
                ++n;
                en += 2.;
                pold = plast;
                plast = p;
                p = en * plast / x + pold;
              } while (p < test);
            }

            ++n;
            en += 2.;
            bb = 0.;
            aa = 1. / p;
            em = n - 1.;
            empal = em + nu;
            emp2al = em - 1. + twonu;
            sum = aa * empal * emp2al / em;
            nend = n - nb;
            var gotoL230 = false;

            for (var cnt = 0; cnt < 1; cnt++) {
              if (nend < 0) {
                bi2[n - 1] = aa;
                nend = -nend;

                for (l = 1; l <= nend; ++l) {
                  bi2[n + l - 1] = 0.;
                }
              } else {
                if (nend > 0) {
                  for (l = 1; l <= nend; ++l) {
                    --n;
                    en -= 2.;
                    cc = bb;
                    bb = aa;

                    if (nend > 100 && aa > 1e200) {
                      var pow05_to_900 = pow(2, -900);
                      cc = cc * pow05_to_900;
                      bb = bb * pow05_to_900;
                      sum = sum * pow05_to_900;
                    }

                    aa = en * bb / x + cc;
                    em -= 1.;
                    emp2al -= 1.;

                    if (n === 1) {
                      break;
                    }

                    if (n === 2) {
                      emp2al = 1.;
                    }

                    empal -= 1.;
                    sum = (sum + aa * empal) * emp2al / em;
                  }
                }

                bi2[n - 1] = aa;

                if (nb <= 1) {
                  sum = sum + sum + aa;
                  gotoL230 = true;
                  break;
                }

                --n;
                en -= 2.;
                bi2[n - 1] = en * aa / x + bb;

                if (n === 1) {
                  break;
                }

                em -= 1.;
                if (n === 2) emp2al = 1.;else emp2al -= 1.;
                empal -= 1.;
                sum = (sum + bi2[n - 1] * empal) * emp2al / em;
              }

              nend = n - 2;

              if (nend > 0) {
                for (l = 1; l <= nend; ++l) {
                  --n;
                  en -= 2.;
                  bi2[n - 1] = en * bi2[n] / x + bi2[n + 1];
                  em -= 1.;
                  if (n === 2) emp2al = 1.;else emp2al -= 1.;
                  empal -= 1.;
                  sum = (sum + bi2[n - 1] * empal) * emp2al / em;
                }
              }

              bi2[0] = 2. * empal * bi2[1] / x + bi2[2];
            }

            if (gotoL230 === false) {
              sum = sum + sum + bi2[0];
            }

            if (nu !== 0.) sum *= gamma_cody_1.Rf_gamma_cody(1. + nu) * pow(x * .5, -nu);
            if (ize === 1) sum *= exp(-x);
            aa = bessel_constants_1.enmten_BESS;
            if (sum > 1.) aa *= sum;

            for (n = 1; n <= nb; ++n) {
              if (bi2[n - 1] < aa) bi2[n - 1] = 0.;else bi2[n - 1] /= sum;
            }

            var _rc = {
              x: bi2[nb - 1],
              nb: nb,
              ncalc: ncalc
            };
            printer('normalize, devide all  Bi[N] by sum, result:%o', _rc);
            return _rc;
          } else {
            aa = 1.;
            empal = 1. + nu;
            halfx = .5 * x;
            if (nu !== 0.) aa = pow(halfx, nu) / gamma_cody_1.Rf_gamma_cody(empal);
            if (ize === 2) aa *= exp(-x);
            bb = halfx * halfx;
            bi2[0] = aa + aa * bb / empal;
            if (x !== 0. && bi2[0] === 0.) ncalc = 0;

            if (nb > 1) {
              if (x === 0.) {
                for (n = 2; n <= nb; ++n) {
                  bi2[n - 1] = 0.;
                }
              } else {
                cc = halfx;
                tover = (bessel_constants_1.enmten_BESS + bessel_constants_1.enmten_BESS) / x;
                if (bb !== 0.) tover = bessel_constants_1.enmten_BESS / bb;

                for (n = 2; n <= nb; ++n) {
                  aa /= empal;
                  empal += 1.;
                  aa *= cc;
                  if (aa <= tover * empal) bi2[n - 1] = aa = 0.;else bi2[n - 1] = aa + aa * bb / empal;
                  if (bi2[n - 1] === 0. && ncalc > n) ncalc = n - 1;
                }
              }
            }
          }
        } else {
          ncalc = min(nb, 0) - 1;
        }

        var rc = {
          x: bi2[nb - 1],
          nb: nb,
          ncalc: ncalc
        };
        printer('drop off, result:%o', rc);
        return rc;
      }

      exports.I_bessel = I_bessel;
      /***/
    },
    /* 102 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var r_func_1 = __webpack_require__(2);

      var sinpi_1 = __webpack_require__(24);

      var besselK_1 = __webpack_require__(51);

      var IBessel_1 = __webpack_require__(101);

      var ISNAN = Number.isNaN;
      var exp = Math.exp,
          trunc = Math.trunc,
          floor = Math.floor,
          M_PI = Math.PI;
      var printer = debug('bessel_i');

      function bessel_i(_x, _alpha, _expo) {
        return r_func_1.multiplexer(_x, _alpha, _expo)(function (x, alpha, expo) {
          return internal_bessel_i(x, alpha, expo);
        });
      }

      exports.bessel_i = bessel_i;

      function internal_bessel_i(x, alpha) {
        var expo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var nb;
        var ize;
        var na;
        if (ISNAN(x) || ISNAN(alpha)) return x + alpha;

        if (x < 0) {
          _general_1.ML_ERROR(_general_1.ME.ME_RANGE, 'bessel_i', printer);

          return NaN;
        }

        ize = expo ? 2 : 1;
        na = floor(alpha);

        if (alpha < 0) {
          return internal_bessel_i(x, -alpha, expo) + (alpha === na ? 0 : besselK_1.internal_bessel_k(x, -alpha, expo) * (ize === 1 ? 2. : 2. * exp(-2. * x)) / M_PI * sinpi_1.sinpi(-alpha));
        }

        nb = 1 + trunc(na);
        alpha -= nb - 1;
        var rc = IBessel_1.I_bessel(x, alpha, nb, ize);

        if (rc.ncalc !== rc.nb) {
          if (rc.ncalc < 0) printer('bessel_i(%d): ncalc (=%d) != nb (=%d); alpha=%d. Arg. out of range?', x, rc.ncalc, rc.nb, alpha);else printer('bessel_i(%d,nu=%d): precision lost in result\n', rc.x, alpha + rc.nb - 1);
        }

        x = rc.x;
        return x;
      }

      exports.internal_bessel_i = internal_bessel_i;
      /***/
    },
    /* 103 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var gamma_cody_1 = __webpack_require__(66);

      var bessel_constants_1 = __webpack_require__(26);

      var min = Math.min,
          trunc = Math.trunc,
          pow = Math.pow,
          sqrt = Math.sqrt,
          sin = Math.sin,
          cos = Math.cos,
          max = Math.max,
          abs = Math.abs;
      var printer = debug('J_bessel');

      function J_bessel(x, alpha, nb) {
        var pi2 = .636619772367581343075535;
        var twopi1 = 6.28125;
        var twopi2 = .001935307179586476925286767;
        var fact = [1., 1., 2., 6., 24., 120., 720., 5040., 40320., 362880., 3628800., 39916800., 479001600., 6227020800., 87178291200., 1.307674368e12, 2.0922789888e13, 3.55687428096e14, 6.402373705728e15, 1.21645100408832e17, 2.43290200817664e18, 5.109094217170944e19, 1.12400072777760768e21, 2.585201673888497664e22, 6.2044840173323943936e23];
        var b2 = new Array(nb).fill(0);
        var i_nend;
        var nbmx;
        var i;
        var j;
        var l;
        var i_m;
        var n;
        var nstart;
        var capp;
        var capq;
        var pold;
        var vcos;
        var test;
        var vsin;
        var p;
        var s;
        var t;
        var z;
        var alpem;
        var halfx;
        var aa;
        var bb;
        var cc;
        var psave;
        var plast;
        var tover;
        var t1;
        var alp2em;
        var em;
        var en;
        var xc;
        var xk;
        var xm;
        var psavel;
        var gnu;
        var xin;
        var sum;
        var ncalc;
        var gotoL190 = false;
        var nu = alpha;
        var twonu = nu + nu;

        if (!(nb > 0 && x >= 0. && 0. <= nu && nu < 1.)) {
          b2[0] = 0.;
          ncalc = min(nb, 0) - 1;
          return {
            x: x,
            nb: nb,
            ncalc: ncalc
          };
        }

        ncalc = nb;

        if (x > bessel_constants_1.xlrg_BESS_IJ) {
          _general_1.ML_ERROR(_general_1.ME.ME_RANGE, 'J_bessel', printer);

          return {
            x: 0,
            nb: nb,
            ncalc: ncalc
          };
        }

        var intxj = trunc(x);

        if (x < 1 / 10000) {
          printer('x < 0.0001 , x=%d, nb=%d', x, nb);
          alpem = 1. + nu;
          halfx = x > bessel_constants_1.enmten_BESS ? .5 * x : 0.;
          aa = nu !== 0. ? pow(halfx, nu) / (nu * gamma_cody_1.Rf_gamma_cody(nu)) : 1.;
          bb = x + 1. > 1. ? -halfx * halfx : 0.;
          b2[0] = aa + aa * bb / alpem;
          if (x !== 0. && b2[0] === 0.) ncalc = 0;

          if (nb !== 1) {
            if (x <= 0.) {
              for (n = 2; n <= nb; ++n) {
                b2[n - 1] = 0.;
              }
            } else {
              if (bb === 0.) tover = (bessel_constants_1.enmten_BESS + bessel_constants_1.enmten_BESS) / x;else tover = bessel_constants_1.enmten_BESS / bb;
              cc = halfx;

              for (n = 2; n <= nb; ++n) {
                aa /= alpem;
                alpem += 1.;
                aa *= cc;
                if (aa <= tover * alpem) aa = 0.;
                b2[n - 1] = aa + aa * bb / alpem;
                if (b2[n - 1] === 0. && ncalc > n) ncalc = n - 1;
              }
            }
          }
        } else if (x > 25. && nb <= intxj + 1) {
          printer('x > 25 and nb < int(x+1) :x=%d, nb=%d', x, nb);
          xc = sqrt(pi2 / x);
          xin = 1 / (64 * x * x);
          if (x >= 130.) i_m = 4;else if (x >= 35.) i_m = 8;else i_m = 11;
          xm = 4. * i_m;
          t = trunc(x / (twopi1 + twopi2) + .5);
          z = x - t * twopi1 - t * twopi2 - (nu + .5) / pi2;
          vsin = sin(z);
          vcos = cos(z);
          gnu = twonu;

          for (i = 1; i <= 2; ++i) {
            s = (xm - 1. - gnu) * (xm - 1. + gnu) * xin * .5;
            t = (gnu - (xm - 3.)) * (gnu + (xm - 3.));
            t1 = (gnu - (xm + 1.)) * (gnu + (xm + 1.));
            var k = i_m + i_m;
            capp = s * t / fact[k];
            capq = s * t1 / fact[k + 1];
            xk = xm;

            for (; k >= 4; k -= 2) {
              xk -= 4.;
              s = (xk - 1. - gnu) * (xk - 1. + gnu);
              t1 = t;
              t = (gnu - (xk - 3.)) * (gnu + (xk - 3.));
              capp = (capp + 1. / fact[k - 2]) * s * t * xin;
              capq = (capq + 1. / fact[k - 1]) * s * t1 * xin;
            }

            capp += 1.;
            capq = (capq + 1.) * (gnu * gnu - 1.) * (.125 / x);
            b2[i - 1] = xc * (capp * vcos - capq * vsin);

            if (nb === 1) {
              return {
                x: b2[nb - 1],
                nb: nb,
                ncalc: ncalc
              };
            }

            t = vsin;
            vsin = -vcos;
            vcos = t;
            gnu += 2.;
          }

          if (nb > 2) for (gnu = twonu + 2., j = 3; j <= nb; j++, gnu += 2.) {
            b2[j - 1] = gnu * b2[j - 1 - 1] / x - b2[j - 2 - 1];
          }
        } else {
          printer('rest: x=%d, nb=%d\t', x, nb);
          nbmx = nb - intxj;
          n = intxj + 1;
          en = n + n + twonu;
          plast = 1.;
          p = en / x;
          test = bessel_constants_1.ensig_BESS + bessel_constants_1.ensig_BESS;

          if (nbmx >= 3) {
            tover = bessel_constants_1.enten_BESS / bessel_constants_1.ensig_BESS;
            nstart = intxj + 2;
            i_nend = nb - 1;
            en = nstart + nstart - 2. + twonu;

            for (var _k3 = nstart; _k3 <= i_nend; ++_k3) {
              n = _k3;
              en += 2.;
              pold = plast;
              plast = p;
              p = en * plast / x - pold;

              if (p > tover) {
                tover = bessel_constants_1.enten_BESS;
                p /= tover;
                plast /= tover;
                psave = p;
                psavel = plast;
                nstart = n + 1;

                do {
                  ++n;
                  en += 2.;
                  pold = plast;
                  plast = p;
                  p = en * plast / x - pold;
                } while (p <= 1.);

                bb = en / x;
                test = pold * plast * (.5 - .5 / (bb * bb));
                test /= bessel_constants_1.ensig_BESS;
                p = plast * tover;
                --n;
                en -= 2.;
                i_nend = min(nb, n);

                for (l = nstart; l <= i_nend; ++l) {
                  pold = psavel;
                  psavel = psave;
                  psave = en * psavel / x - pold;

                  if (psave * psavel > test) {
                    ncalc = l - 1;
                    break;
                  }

                  ncalc = l;
                }

                gotoL190 = true;
                break;
              }
            }

            n = i_nend;
            en = n + n + twonu;
            test = max(test, sqrt(plast * bessel_constants_1.ensig_BESS) * sqrt(p + p));
          }

          if (!gotoL190) {
            do {
              ++n;
              en += 2.;
              pold = plast;
              plast = p;
              p = en * plast / x - pold;
            } while (p < test);
          }

          ++n;
          en += 2.;
          bb = 0.;
          aa = 1. / p;
          em = i_m = n >> 1;
          i_m = (n << 1) - (i_m << 2);
          if (i_m === 0) sum = 0.;else {
            alpem = em - 1. + nu;
            alp2em = em + em + nu;
            sum = aa * alpem * alp2em / em;
          }
          i_nend = n - nb;

          for (l = 1; l <= i_nend; ++l) {
            --n;
            en -= 2.;
            cc = bb;
            bb = aa;
            aa = en * bb / x - cc;
            i_m = i_m ? 0 : 2;

            if (i_m !== 0) {
              em -= 1.;
              alp2em = em + em + nu;
              if (n === 1) break;
              alpem = em - 1. + nu;
              if (alpem === 0.) alpem = 1.;
              sum = (sum + aa * alp2em) * alpem / em;
            }
          }

          b2[n - 1] = aa;
          var gotoL240 = false;
          var gotoL250 = false;

          for (var cnt = 1; cnt > 0; cnt--) {
            if (i_nend >= 0) {
              if (nb <= 1) {
                if (nu + 1. === 1.) alp2em = 1.;else alp2em = nu;
                sum += b2[0] * alp2em;
                gotoL250 = true;
                break;
              } else {
                --n;
                en -= 2.;
                b2[n - 1] = en * aa / x - bb;

                if (n === 1) {
                  gotoL240 = true;
                  break;
                }

                i_m = i_m ? 0 : 2;

                if (i_m !== 0) {
                  em -= 1.;
                  alp2em = em + em + nu;
                  alpem = em - 1. + nu;
                  if (alpem === 0.) alpem = 1.;
                  sum = (sum + b2[n - 1] * alp2em) * alpem / em;
                }
              }
            }
          }

          if (gotoL250 === false && gotoL240 === false) {
            for (n = n - 1; n >= 2; n--) {
              en -= 2.;
              b2[n - 1] = en * b2[n + 1 - 1] / x - b2[n + 2 - 1];
              i_m = i_m ? 0 : 2;

              if (i_m !== 0) {
                em -= 1.;
                alp2em = em + em + nu;
                alpem = em - 1. + nu;
                if (alpem === 0.) alpem = 1.;
                sum = (sum + b2[n - 1] * alp2em) * alpem / em;
              }
            }

            b2[0] = 2. * (nu + 1.) * b2[1] / x - b2[2];
          }

          if (gotoL250 === false) {
            em -= 1.;
            alp2em = em + em + nu;
            if (alp2em === 0.) alp2em = 1.;
            sum += b2[0] * alp2em;
          }

          if (abs(nu) > 1e-15) sum *= gamma_cody_1.Rf_gamma_cody(nu) * pow(.5 * x, -nu);
          aa = bessel_constants_1.enmten_BESS;
          if (sum > 1.) aa *= sum;

          for (n = 1; n <= nb; ++n) {
            if (abs(b2[n - 1]) < aa) b2[n - 1] = 0.;else b2[n - 1] /= sum;
          }
        }

        return {
          x: b2[nb - 1],
          nb: nb,
          ncalc: ncalc
        };
      }

      exports.J_bessel = J_bessel;
      /***/
    },
    /* 104 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var bessel_constants_1 = __webpack_require__(26);

      var M_SQRT_2dPI = 0.797884560802865355879892119869;
      var min = Math.min,
          log = Math.log,
          exp = Math.exp,
          fabs = Math.abs,
          sinh = Math.sinh,
          trunc = Math.trunc,
          sqrt = Math.sqrt,
          max = Math.max;
      var DBL_MAX = Number.MAX_VALUE,
          DBL_EPSILON = Number.EPSILON,
          DBL_MIN = Number.MIN_VALUE;
      var printer = debug('K_bessel');
      var ML_POSINF = Infinity;

      function K_bessel(x, alpha, nb, ize) {
        var a = .11593151565841244881;
        var p = [.805629875690432845, 20.4045500205365151, 157.705605106676174, 536.671116469207504, 900.382759291288778, 730.923886650660393, 229.299301509425145, .822467033424113231];
        var q = [29.4601986247850434, 277.577868510221208, 1206.70325591027438, 2762.91444159791519, 3443.74050506564618, 2210.63190113378647, 572.267338359892221];
        var r = [-.48672575865218401848, 13.079485869097804016, -101.96490580880537526, 347.65409106507813131, 3.495898124521934782e-4];
        var s = [-25.579105509976461286, 212.57260432226544008, -610.69018684944109624, 422.69668805777760407];
        var t = [1.6125990452916363814e-10, 2.5051878502858255354e-8, 2.7557319615147964774e-6, 1.9841269840928373686e-4, .0083333333333334751799, .16666666666666666446];
        var estm = [52.0583, 5.7607, 2.7782, 14.4303, 185.3004, 9.3715];
        var estf = [41.8341, 7.1075, 6.4306, 42.511, 1.35633, 84.5096, 20.];
        var iend;
        var i;
        var j;
        var k;
        var m;
        var ii;
        var mplus1;
        var x2by4;
        var twox;
        var c;
        var blpha;
        var ratio;
        var wminf;
        var d1;
        var d2;
        var d3;
        var f0;
        var f1;
        var f2;
        var p0;
        var q0;
        var t1;
        var t2;
        var twonu;
        var dm;
        var ex;
        var bk1;
        var bk2;
        var nu;
        var bk = new Array(nb).fill(0);
        ii = 0;
        ex = x;
        nu = alpha;
        var ncalc = min(nb, 0) - 2;

        if (nb > 0 && 0. <= nu && nu < 1. && 1 <= ize && ize <= 2) {
          for (var cnt = 0; cnt < 1; cnt++) {
            if (ex <= 0 || ize === 1 && ex > bessel_constants_1.xmax_BESS_K) {
              if (ex <= 0) {
                if (ex < 0) _general_1.ML_ERROR(_general_1.ME.ME_RANGE, 'K_bessel', printer);
                bk[0] = ML_POSINF;
              } else bk[0] = 0.;

              ncalc = nb;
              return {
                x: bk[0],
                nb: nb,
                ncalc: ncalc
              };
            }

            k = 0;

            if (nu < bessel_constants_1.sqxmin_BESS_K) {
              nu = 0.;
            } else if (nu > .5) {
              k = 1;
              nu -= 1.;
            }

            twonu = nu + nu;
            iend = nb + k - 1;
            c = nu * nu;
            d3 = -c;

            if (ex <= 1.) {
              d1 = 0.;
              d2 = p[0];
              t1 = 1.;
              t2 = q[0];

              for (i = 2; i <= 7; i += 2) {
                d1 = c * d1 + p[i - 1];
                d2 = c * d2 + p[i];
                t1 = c * t1 + q[i - 1];
                t2 = c * t2 + q[i];
              }

              d1 = nu * d1;
              t1 = nu * t1;
              f1 = log(ex);
              f0 = a + nu * (p[7] - nu * (d1 + d2) / (t1 + t2)) - f1;
              q0 = exp(-nu * (a - nu * (p[7] + nu * (d1 - d2) / (t1 - t2)) - f1));
              f1 = nu * f0;
              p0 = exp(f1);
              d1 = r[4];
              t1 = 1.;

              for (i = 0; i < 4; ++i) {
                d1 = c * d1 + r[i];
                t1 = c * t1 + s[i];
              }

              if (fabs(f1) <= .5) {
                f1 *= f1;
                d2 = 0.;

                for (i = 0; i < 6; ++i) {
                  d2 = f1 * d2 + t[i];
                }

                d2 = f0 + f0 * f1 * d2;
              } else {
                d2 = sinh(f1) / nu;
              }

              f0 = d2 - nu * d1 / (t1 * p0);

              if (ex <= 1e-10) {
                bk[0] = f0 + ex * f0;

                if (ize === 1) {
                  bk[0] -= ex * bk[0];
                }

                ratio = p0 / f0;
                c = ex * DBL_MAX;

                if (k !== 0) {
                  ncalc = -1;

                  if (bk[0] >= c / ratio) {
                    return {
                      x: bk[nb - 1],
                      nb: nb,
                      ncalc: ncalc
                    };
                  }

                  bk[0] = ratio * bk[0] / ex;
                  twonu += 2.;
                  ratio = twonu;
                }

                ncalc = 1;
                if (nb === 1) return {
                  x: bk[nb - 1],
                  nb: nb,
                  ncalc: ncalc
                };
                ncalc = -1;

                for (i = 1; i < nb; ++i) {
                  if (ratio >= c) return {
                    x: bk[nb - 1],
                    nb: nb,
                    ncalc: ncalc
                  };
                  bk[i] = ratio / ex;
                  twonu += 2.;
                  ratio = twonu;
                }

                ncalc = 1;
                break;
              } else {
                c = 1.;
                x2by4 = ex * ex / 4.;
                p0 = .5 * p0;
                q0 = .5 * q0;
                d1 = -1.;
                d2 = 0.;
                bk1 = 0.;
                bk2 = 0.;
                f1 = f0;
                f2 = p0;

                do {
                  d1 += 2.;
                  d2 += 1.;
                  d3 = d1 + d3;
                  c = x2by4 * c / d2;
                  f0 = (d2 * f0 + p0 + q0) / d3;
                  p0 /= d2 - nu;
                  q0 /= d2 + nu;
                  t1 = c * f0;
                  t2 = c * (p0 - d2 * f0);
                  bk1 += t1;
                  bk2 += t2;
                } while (fabs(t1 / (f1 + bk1)) > DBL_EPSILON || fabs(t2 / (f2 + bk2)) > DBL_EPSILON);

                bk1 = f1 + bk1;
                bk2 = 2. * (f2 + bk2) / ex;

                if (ize === 2) {
                  d1 = exp(ex);
                  bk1 *= d1;
                  bk2 *= d1;
                }

                wminf = estf[0] * ex + estf[1];
              }
            } else if (DBL_EPSILON * ex > 1.) {
              ncalc = nb;
              bk1 = 1. / (M_SQRT_2dPI * sqrt(ex));
              return {
                x: bk1,
                nb: nb,
                ncalc: ncalc
              };
            } else {
              twox = ex + ex;
              blpha = 0.;
              ratio = 0.;

              if (ex <= 4.) {
                d2 = trunc(estm[0] / ex + estm[1]);
                m = trunc(d2);
                d1 = d2 + d2;
                d2 -= .5;
                d2 *= d2;

                for (i = 2; i <= m; ++i) {
                  d1 -= 2.;
                  d2 -= d1;
                  ratio = (d3 + d2) / (twox + d1 - ratio);
                }

                d2 = trunc(estm[2] * ex + estm[3]);
                m = trunc(d2);
                c = fabs(nu);
                d3 = c + c;
                d1 = d3 - 1.;
                f1 = DBL_MIN;
                f0 = (2. * (c + d2) / ex + .5 * ex / (c + d2 + 1.)) * DBL_MIN;

                for (i = 3; i <= m; ++i) {
                  d2 -= 1.;
                  f2 = (d3 + d2 + d2) * f0;
                  blpha = (1. + d1 / d2) * (f2 + blpha);
                  f2 = f2 / ex + f1;
                  f1 = f0;
                  f0 = f2;
                }

                f1 = (d3 + 2.) * f0 / ex + f1;
                d1 = 0.;
                t1 = 1.;

                for (i = 1; i <= 7; ++i) {
                  d1 = c * d1 + p[i - 1];
                  t1 = c * t1 + q[i - 1];
                }

                p0 = exp(c * (a + c * (p[7] - c * d1 / t1) - log(ex))) / ex;
                f2 = (c + .5 - ratio) * f1 / ex;
                bk1 = p0 + (d3 * f0 - f2 + f0 + blpha) / (f2 + f1 + f0) * p0;

                if (ize === 1) {
                  bk1 *= exp(-ex);
                }

                wminf = estf[2] * ex + estf[3];
              } else {
                dm = trunc(estm[4] / ex + estm[5]);
                m = trunc(dm);
                d2 = dm - .5;
                d2 *= d2;
                d1 = dm + dm;

                for (i = 2; i <= m; ++i) {
                  dm -= 1.;
                  d1 -= 2.;
                  d2 -= d1;
                  ratio = (d3 + d2) / (twox + d1 - ratio);
                  blpha = (ratio + ratio * blpha) / dm;
                }

                bk1 = 1. / ((M_SQRT_2dPI + M_SQRT_2dPI * blpha) * sqrt(ex));
                if (ize === 1) bk1 *= exp(-ex);
                wminf = estf[4] * (ex - fabs(ex - estf[6])) + estf[5];
              }

              bk2 = bk1 + bk1 * (nu + .5 - ratio) / ex;
            }

            ncalc = nb;
            bk[0] = bk1;
            if (iend === 0) return {
              x: bk[nb - 1],
              nb: nb,
              ncalc: ncalc
            };
            j = 1 - k;
            if (j >= 0) bk[j] = bk2;
            if (iend === 1) return {
              x: bk[nb - 1],
              nb: nb,
              ncalc: ncalc
            };
            m = min(trunc(wminf - nu), iend);

            for (i = 2; i <= m; ++i) {
              t1 = bk1;
              bk1 = bk2;
              twonu += 2.;

              if (ex < 1.) {
                if (bk1 >= DBL_MAX / twonu * ex) break;
              } else {
                if (bk1 / ex >= DBL_MAX / twonu) break;
              }

              bk2 = twonu / ex * bk1 + t1;
              ii = i;
              ++j;

              if (j >= 0) {
                bk[j] = bk2;
              }
            }

            m = ii;

            if (m === iend) {
              return {
                x: bk[nb - 1],
                nb: nb,
                ncalc: ncalc
              };
            }

            ratio = bk2 / bk1;
            mplus1 = m + 1;
            ncalc = -1;

            for (i = mplus1; i <= iend; ++i) {
              twonu += 2.;
              ratio = twonu / ex + 1. / ratio;
              ++j;

              if (j >= 1) {
                bk[j] = ratio;
              } else {
                if (bk2 >= DBL_MAX / ratio) return {
                  x: bk[nb - 1],
                  nb: nb,
                  ncalc: ncalc
                };
                bk2 *= ratio;
              }
            }

            ncalc = max(1, mplus1 - k);
            if (ncalc === 1) bk[0] = bk2;

            if (nb === 1) {
              return {
                x: bk2,
                nb: nb,
                ncalc: ncalc
              };
            }
          }

          for (i = ncalc; i < nb; ++i) {
            bk[i] *= bk[i - 1];
            ncalc++;
          }
        }

        return {
          x: bk[nb - 1],
          nb: nb,
          ncalc: ncalc
        };
      }

      exports.K_bessel = K_bessel;
      /***/
    },
    /* 105 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var cospi_1 = __webpack_require__(23);

      var sinpi_1 = __webpack_require__(24);

      var bessel_constants_1 = __webpack_require__(26);

      var M_SQRT_2dPI = 0.797884560802865355879892119869;
      var M_1_PI = 0.3183098861837907;
      var M_PI_2 = 1.5707963267948966;
      var min = Math.min,
          trunc = Math.trunc,
          sqrt = Math.sqrt,
          sin = Math.sin,
          cos = Math.cos,
          log = Math.log,
          abs = Math.abs,
          pow = Math.pow,
          M_PI = Math.PI;
      var DBL_MIN = Number.MIN_VALUE,
          DBL_EPSILON = Number.EPSILON,
          ML_NEGINF = Number.NEGATIVE_INFINITY,
          DBL_MAX = Number.MAX_VALUE;
      var printer = debug('Y_bessel');

      function Y_bessel(x, alpha, nb) {
        var fivpi = 15.707963267948966192;
        var pim5 = .70796326794896619231;
        var ch = [-6.7735241822398840964e-24, -6.1455180116049879894e-23, 2.9017595056104745456e-21, 1.3639417919073099464e-19, 2.3826220476859635824e-18, -9.0642907957550702534e-18, -1.4943667065169001769e-15, -3.3919078305362211264e-14, -1.7023776642512729175e-13, 9.1609750938768647911e-12, 2.4230957900482704055e-10, 1.7451364971382984243e-9, -3.3126119768180852711e-8, -8.6592079961391259661e-7, -4.9717367041957398581e-6, 7.6309597585908126618e-5, .0012719271366545622927, .0017063050710955562222, -.07685284084478667369, -.28387654227602353814, .92187029365045265648];
        var i;
        var k;
        var na;
        var ncalc;
        var alfa;
        var div;
        var ddiv;
        var even;
        var gamma;
        var term;
        var cosmu;
        var sinmu;
        var b;
        var c;
        var d;
        var e;
        var f;
        var g;
        var h;
        var p;
        var q;
        var r;
        var s;
        var d1;
        var d2;
        var q0;
        var pa;
        var pa1;
        var qa;
        var qa1;
        var en;
        var ya;
        var ya1;
        var twobyx;
        var den;
        var odd;
        var aye;
        var dmu;
        var x2;
        var xna;
        var en1 = ya = ya1 = 0;
        var ex = x;
        var nu = alpha;
        var by = new Array(nb).fill(0);

        if (!(nb > 0 && 0. <= nu && nu < 1.)) {
          printer('violaton: abort nb=%d, nu=%d', nb, nu);
          by[0] = 0.;
          ncalc = min(nb, 0) - 1;
          return {
            x: 0,
            nb: nb,
            ncalc: ncalc
          };
        }

        if (ex < DBL_MIN || ex > bessel_constants_1.xlrg_BESS_Y) {
          printer('range issue: x < DBL_MIN but still bigger then 1e8 x=(%d)', ex);
          ncalc = nb;
          if (ex > bessel_constants_1.xlrg_BESS_Y) by[0] = 0.;else if (ex < DBL_MIN) by[0] = ML_NEGINF;
          return {
            x: by[0],
            nb: nb,
            ncalc: ncalc
          };
        }

        xna = trunc(nu + .5);
        na = trunc(xna);

        if (na === 1) {
          nu -= xna;
        }

        if (nu === -.5) {
          p = M_SQRT_2dPI / sqrt(ex);
          ya = p * sin(ex);
          ya1 = -p * cos(ex);
        } else if (ex < 3.) {
          b = ex * .5;
          d = -log(b);
          f = nu * d;
          e = pow(b, -nu);
          if (abs(nu) < bessel_constants_1.M_eps_sinc) c = M_1_PI;else c = nu / sinpi_1.sinpi(nu);

          if (abs(f) < 1.) {
            x2 = f * f;
            en = 19.;
            s = 1.;

            for (i = 1; i <= 9; ++i) {
              s = s * x2 / en / (en - 1.) + 1.;
              en -= 2.;
            }
          } else {
            s = (e - 1. / e) * .5 / f;
          }

          x2 = nu * nu * 8.;
          aye = ch[0];
          even = 0.;
          alfa = ch[1];
          odd = 0.;

          for (i = 3; i <= 19; i += 2) {
            even = -(aye + aye + even);
            aye = -even * x2 - aye + ch[i - 1];
            odd = -(alfa + alfa + odd);
            alfa = -odd * x2 - alfa + ch[i];
          }

          even = (even * .5 + aye) * x2 - aye + ch[20];
          odd = (odd + alfa) * 2.;
          gamma = odd * nu + even;
          g = e * gamma;
          e = (e + 1. / e) * .5;
          f = 2. * c * (odd * e + even * s * d);
          e = nu * nu;
          p = g * c;
          q = M_1_PI / g;
          c = nu * M_PI_2;
          if (abs(c) < bessel_constants_1.M_eps_sinc) r = 1.;else r = sinpi_1.sinpi(nu / 2) / c;
          r = M_PI * c * r * r;
          c = 1.;
          d = -b * b;
          h = 0.;
          ya = f + r * q;
          ya1 = p;
          en = 1.;

          while (abs(g / (1. + abs(ya))) + abs(h / (1. + abs(ya1))) > DBL_EPSILON) {
            f = (f * en + p + q) / (en * en - e);
            c *= d / en;
            p /= en - nu;
            q /= en + nu;
            g = c * (f + r * q);
            h = c * p - en * g;
            ya += g;
            ya1 += h;
            en += 1.;
          }

          ya = -ya;
          ya1 = -ya1 / b;
        } else if (ex < bessel_constants_1.thresh_BESS_Y) {
          c = (.5 - nu) * (.5 + nu);
          b = ex + ex;
          e = ex * M_1_PI * cospi_1.cospi(nu) / DBL_EPSILON;
          e *= e;
          p = 1.;
          q = -ex;
          r = 1. + ex * ex;
          s = r;
          en = 2.;

          while (r * en * en < e) {
            en1 = en + 1.;
            d = (en - 1. + c / en) / s;
            p = (en + en - p * d) / en1;
            q = (-b + q * d) / en1;
            s = p * p + q * q;
            r *= s;
            en = en1;
          }

          f = p / s;
          p = f;
          g = -q / s;
          q = g;

          for (;;) {
            en -= 1.;

            if (en > 0.) {
              r = en1 * (2. - p) - 2.;
              s = b + en1 * q;
              d = (en - 1. + c / en) / (r * r + s * s);
              p = d * r;
              q = d * s;
              e = f + 1.;
              f = p * e - g * q;
              g = q * e + p * g;
              en1 = en;
              continue;
            }

            break;
          }

          f = 1. + f;
          d = f * f + g * g;
          pa = f / d;
          qa = -g / d;
          d = nu + .5 - p;
          q += ex;
          pa1 = (pa * q - qa * d) / ex;
          qa1 = (qa * q + pa * d) / ex;
          b = ex - M_PI_2 * (nu + .5);
          c = cos(b);
          s = sin(b);
          d = M_SQRT_2dPI / sqrt(ex);
          ya = d * (pa * s + qa * c);
          ya1 = d * (qa1 * s - pa1 * c);
        } else {
          na = 0;
          d1 = trunc(ex / fivpi);
          i = trunc(d1);
          dmu = ex - 15. * d1 - d1 * pim5 - (alpha + .5) * M_PI_2;

          if (i - (i / 2 << 1) === 0) {
            cosmu = cos(dmu);
            sinmu = sin(dmu);
          } else {
            cosmu = -cos(dmu);
            sinmu = -sin(dmu);
          }

          ddiv = 8. * ex;
          dmu = alpha;
          den = sqrt(ex);

          for (k = 1; k <= 2; ++k) {
            p = cosmu;
            cosmu = sinmu;
            sinmu = -p;
            d1 = (2. * dmu - 1.) * (2. * dmu + 1.);
            d2 = 0.;
            div = ddiv;
            p = 0.;
            q = 0.;
            q0 = d1 / div;
            term = q0;

            for (i = 2; i <= 20; ++i) {
              d2 += 8.;
              d1 -= d2;
              div += ddiv;
              term = -term * d1 / div;
              p += term;
              d2 += 8.;
              d1 -= d2;
              div += ddiv;
              term *= d1 / div;
              q += term;

              if (abs(term) <= DBL_EPSILON) {
                break;
              }
            }

            p += 1.;
            q += q0;
            if (k === 1) ya = M_SQRT_2dPI * (p * cosmu - q * sinmu) / den;else ya1 = M_SQRT_2dPI * (p * cosmu - q * sinmu) / den;
            dmu += 1.;
          }
        }

        if (na === 1) {
          h = 2. * (nu + 1.) / ex;

          if (h > 1.) {
            if (abs(ya1) > DBL_MAX / h) {
              h = 0.;
              ya = 0.;
            }
          }

          h = h * ya1 - ya;
          ya = ya1;
          ya1 = h;
        }

        by[0] = ya;
        ncalc = 1;

        if (nb > 1) {
          by[1] = ya1;

          if (ya1 !== 0.) {
            aye = 1. + alpha;
            twobyx = 2. / ex;
            ncalc = 2;

            for (i = 2; i < nb; ++i) {
              if (twobyx < 1.) {
                if (abs(by[i - 1]) * twobyx >= DBL_MAX / aye) break;
              } else {
                if (abs(by[i - 1]) >= DBL_MAX / aye / twobyx) break;
              }

              by[i] = twobyx * aye * by[i - 1] - by[i - 2];
              aye += 1.;
              ++ncalc;
            }
          }
        }

        return {
          x: by[ncalc - 1],
          nb: nb,
          ncalc: ncalc
        };
      }

      exports.Y_bessel = Y_bessel;
      /***/
    },
    /* 106 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var gamma_fn_1 = __webpack_require__(29);

      var r_func_1 = __webpack_require__(2);

      var lbeta_1 = __webpack_require__(11);

      var xmax = 171.61447887182298;
      var lnsml = -708.39641853226412;
      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite,
          ML_POSINF = Number.POSITIVE_INFINITY;
      var printer_beta = debug('beta');

      function beta(_a, _b) {
        return r_func_1.multiplexer(_a, _b)(function (a, b) {
          return internal_beta(a, b);
        });
      }

      exports.beta = beta;

      function internal_beta(a, b) {
        if (ISNAN(a) || ISNAN(b)) return a + b;
        if (a < 0 || b < 0) return _general_1.ML_ERR_return_NAN(printer_beta);else if (a === 0 || b === 0) return ML_POSINF;else if (!R_FINITE(a) || !R_FINITE(b)) return 0;

        if (a + b < xmax) {
          return 1 / gamma_fn_1.gammafn(a + b) * gamma_fn_1.gammafn(a) * gamma_fn_1.gammafn(b);
        } else {
          var val = lbeta_1.internal_lbeta(a, b);

          if (val < lnsml) {
            _general_1.ML_ERROR(_general_1.ME.ME_UNDERFLOW, 'beta', printer_beta);
          }

          return Math.exp(val);
        }
      }

      exports.internal_beta = internal_beta;
      /***/
    },
    /* 107 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var M_LN2 = Math.LN2,
          log = Math.log,
          fmin2 = Math.min,
          fmax2 = Math.max,
          exp = Math.exp,
          sqrt = Math.sqrt;
      var DBL_MAX = Number.MAX_VALUE,
          R_FINITE = Number.isFinite;
      var printer = debug('rbeta');
      exports.expmax = _general_1.DBL_MAX_EXP * M_LN2;

      function rbeta(n, aa, bb, rng) {
        var result = new Array(n).fill(0).map(function () {
          if (aa < 0 || bb < 0) {
            return _general_1.ML_ERR_return_NAN(printer);
          }

          if (!R_FINITE(aa) && !R_FINITE(bb)) return 0.5;
          if (aa === 0 && bb === 0) return rng.unif_rand() < 0.5 ? 0 : 1;
          if (!R_FINITE(aa) || bb === 0) return 1.0;
          if (!R_FINITE(bb) || aa === 0) return 0.0;
          var a;
          var b;
          var alpha;
          var r;
          var s;
          var t;
          var u1 = 0;
          var u2;
          var v = 0;
          var w = 0;
          var y;
          var z;
          var qsame;
          var beta = 0;
          var gamma = 0;
          var delta;
          var k1 = 0;
          var k2 = 0;
          var olda = -1.0;
          var oldb = -1.0;
          qsame = olda === aa && oldb === bb;

          if (!qsame) {
            olda = aa;
            oldb = bb;
          }

          a = fmin2(aa, bb);
          b = fmax2(aa, bb);
          alpha = a + b;

          function v_w_from__u1_bet(AA) {
            v = beta * log(u1 / (1.0 - u1));

            if (v <= exports.expmax) {
              w = AA * exp(v);

              if (!R_FINITE(w)) {
                w = DBL_MAX;
              }
            } else {
              w = DBL_MAX;
            }
          }

          if (a <= 1.0) {
            if (!qsame) {
              beta = 1.0 / a;
              delta = 1.0 + b - a;
              k1 = delta * (0.0138889 + 0.0416667 * a) / (b * beta - 0.777778);
              k2 = 0.25 + (0.5 + 0.25 / delta) * a;
            }

            for (;;) {
              u1 = rng.unif_rand();
              u2 = rng.unif_rand();

              if (u1 < 0.5) {
                y = u1 * u2;
                z = u1 * y;
                if (0.25 * u2 + z - y >= k1) continue;
              } else {
                z = u1 * u1 * u2;

                if (z <= 0.25) {
                  v_w_from__u1_bet(b);
                  break;
                }

                if (z >= k2) continue;
              }

              v_w_from__u1_bet(b);
              if (alpha * (log(alpha / (a + w)) + v) - 1.3862944 >= log(z)) break;
            }

            return aa === a ? a / (a + w) : w / (a + w);
          } else {
            if (!qsame) {
              beta = sqrt((alpha - 2.0) / (2.0 * a * b - alpha));
              gamma = a + 1.0 / beta;
            }

            do {
              u1 = rng.unif_rand();
              u2 = rng.unif_rand();
              v_w_from__u1_bet(a);
              z = u1 * u1 * u2;
              r = gamma * v - 1.3862944;
              s = a + r - w;
              if (s + 2.609438 >= 5.0 * z) break;
              t = log(z);
              if (s > t) break;
            } while (r + alpha * log(alpha / (b + w)) < t);

            return aa !== a ? b / (b + w) : w / (b + w);
          }
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.rbeta = rbeta;
      /***/
    },
    /* 108 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var dbinom_1 = __webpack_require__(17);

      var lgamma_fn_1 = __webpack_require__(4);

      var printer = debug('dnbinom');
      var log = Math.log,
          R_forceint = Math.round,
          log1p = Math.log1p;
      var R_FINITE = Number.isFinite,
          ISNAN = Number.isNaN;

      function dnbinom(xx, size, prob, give_log) {
        var fx = Array.isArray(xx) ? xx : [xx];
        var result = fx.map(function (x) {
          var ans;
          var p;

          if (ISNAN(x) || ISNAN(size) || ISNAN(prob)) {
            return x + size + prob;
          }

          if (prob <= 0 || prob > 1 || size < 0) {
            return _general_1.ML_ERR_return_NAN(printer);
          }

          var rc = _general_1.R_D_nonint_check(give_log, x, printer);

          if (rc !== undefined) {
            return rc;
          }

          if (x < 0 || !R_FINITE(x)) {
            return _general_1.R_D__0(give_log);
          }

          if (x === 0 && size === 0) {
            return _general_1.R_D__1(give_log);
          }

          x = R_forceint(x);
          ans = dbinom_1.dbinom_raw(size, x + size, prob, 1 - prob, give_log);
          p = size / (size + x);
          return give_log ? log(p) + ans : p * ans;
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.dnbinom = dnbinom;
      var printer_dnbinom_mu = debug('dnbinom_mu');

      function dnbinom_mu(xx, size, mu, give_log) {
        var fx = Array.isArray(xx) ? xx : [xx];
        var result = fx.map(function (x) {
          var ans;
          var p;

          if (ISNAN(x) || ISNAN(size) || ISNAN(mu)) {
            return x + size + mu;
          }

          if (mu < 0 || size < 0) {
            return _general_1.ML_ERR_return_NAN(printer_dnbinom_mu);
          }

          var rc = _general_1.R_D_nonint_check(give_log, x, printer_dnbinom_mu);

          if (rc !== undefined) {
            return rc;
          }

          if (x < 0 || !R_FINITE(x)) {
            return _general_1.R_D__0(give_log);
          }

          if (x === 0 && size === 0) {
            return _general_1.R_D__1(give_log);
          }

          x = R_forceint(x);

          if (x === 0) {
            var llogx;

            if (size < mu) {
              llogx = log(size / (size + mu));
            } else {
              llogx = log1p(-mu / (size + mu));
            }

            return _general_1.R_D_exp(give_log, size * llogx);
          }

          if (x < 1e-10 * size) {
            p = size < mu ? log(size / (1 + size / mu)) : log(mu / (1 + mu / size));
            return _general_1.R_D_exp(give_log, x * p - mu - lgamma_fn_1.lgammafn(x + 1) + log1p(x * (x - 1) / (2 * size)));
          }

          ans = dbinom_1.dbinom_raw(size, x + size, size / (size + mu), mu / (size + mu), give_log);
          p = size / (size + x);
          return give_log ? log(p) + ans : p * ans;
        });
        return result.length === 0 ? result[0] : result;
      }

      exports.dnbinom_mu = dnbinom_mu;
      /***/
    },
    /* 109 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var toms708_1 = __webpack_require__(9);

      var expm1_1 = __webpack_require__(3);

      var qnorm_1 = __webpack_require__(6);

      var r_func_1 = __webpack_require__(2);

      var pnbinom_1 = __webpack_require__(57);

      var ISNAN = Number.isNaN,
          ML_POSINF = Number.POSITIVE_INFINITY,
          DBL_EPSILON = Number.EPSILON;
      var fmax2 = Math.max,
          sqrt = Math.sqrt,
          floor = Math.floor,
          R_forceint = Math.round;
      var printer_do_search = debug('do_search');

      function do_search(y, z, p, n, pr, incr) {
        printer_do_search('start: y:%d, z:%o, p:%d, n:%d, pr:%d, incr:%d', y, z, p, n, pr, incr);

        if (z.val >= p) {
          while (true) {
            if (y === 0 || (z.val = pnbinom_1.pnbinom(y - incr, n, pr, true, false)) < p) {
              printer_do_search('exit1');
              return y;
            }

            y = fmax2(0, y - incr);
          }
        } else {
          while (true) {
            y = y + incr;

            if ((z.val = pnbinom_1.pnbinom(y, n, pr, true, false)) >= p) {
              printer_do_search('exit2');
              return y;
            }
          }
        }
      }

      var printer_qnbinom = debug('qnbinom');

      function qnbinom(pp, size, prob, lower_tail, log_p) {
        return r_func_1.map(pp)(function (p) {
          var P;
          var Q;
          var mu;
          var sigma;
          var gamma;
          var y;
          var z = new toms708_1.NumberW(0);

          if (ISNAN(p) || ISNAN(size) || ISNAN(prob)) {
            return NaN;
          }

          if (prob === 0 && size === 0) return 0;

          if (prob <= 0 || prob > 1 || size < 0) {
            return _general_1.ML_ERR_return_NAN(printer_qnbinom);
          }

          if (prob === 1 || size === 0) return 0;

          var rc = _general_1.R_Q_P01_boundaries(lower_tail, log_p, p, 0, ML_POSINF);

          if (rc !== undefined) {
            return rc;
          }

          Q = 1.0 / prob;
          P = (1.0 - prob) * Q;
          mu = size * P;
          sigma = sqrt(size * P * Q);
          gamma = (Q + P) / sigma;

          if (!lower_tail || log_p) {
            p = expm1_1.R_DT_qIv(lower_tail, log_p, p);
            if (p === _general_1.R_DT_0(lower_tail, log_p)) return 0;
            if (p === _general_1.R_DT_1(lower_tail, log_p)) return ML_POSINF;
          }

          if (p + 1.01 * DBL_EPSILON >= 1) return ML_POSINF;
          z.val = qnorm_1.qnorm(p, 0, 1, true, false);
          y = R_forceint(mu + sigma * (z.val + gamma * (z.val * z.val - 1) / 6));
          z.val = pnbinom_1.pnbinom(y, size, prob, true, false);
          p *= 1 - 64 * DBL_EPSILON;
          if (y < 1e5) return do_search(y, z, p, size, prob, 1);
          {
            var incr = floor(y * 0.001);
            var oldincr;

            do {
              oldincr = incr;
              y = do_search(y, z, p, size, prob, incr);
              incr = fmax2(1, floor(incr / 100));
            } while (oldincr > 1 && incr > y * 1e-15);

            return y;
          }
        });
      }

      exports.qnbinom = qnbinom;

      function qnbinom_mu(pp, size, mu, lower_tail, log_p) {
        return qnbinom(pp, size, size / (size + mu), lower_tail, log_p);
      }

      exports.qnbinom_mu = qnbinom_mu;
      /***/
    },
    /* 110 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var rgamma_1 = __webpack_require__(30);

      var rpois_1 = __webpack_require__(32);

      var R_FINITE = Number.isFinite;
      var printer_rnbinom = debug('rnbinom');

      function rnbinom(n, size, prob, rng) {
        printer_rnbinom('n:%d, size:%d, prob:%d', n, size, prob);
        var result = new Array(n).fill(0).map(function () {
          if (!R_FINITE(size) || !R_FINITE(prob) || size <= 0 || prob <= 0 || prob > 1) {
            return _general_1.ML_ERR_return_NAN(printer_rnbinom);
          }

          return prob === 1 ? 0 : rpois_1.rpois(1, rgamma_1.rgamma(1, size, (1 - prob) / prob, rng), rng);
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.rnbinom = rnbinom;
      var printer_rnbinom_mu = debug('rnbinom_mu');

      function rnbinom_mu() {
        var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var size = arguments.length > 1 ? arguments[1] : undefined;
        var mu = arguments.length > 2 ? arguments[2] : undefined;
        var rng = arguments.length > 3 ? arguments[3] : undefined;
        var result = new Array(n).fill(0).map(function () {
          if (!R_FINITE(size) || !R_FINITE(mu) || size <= 0 || mu < 0) {
            return _general_1.ML_ERR_return_NAN(printer_rnbinom_mu);
          }

          return mu === 0 ? 0 : rpois_1.rpois(1, rgamma_1.rgamma(1, size, mu / size, rng), rng);
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.rnbinom_mu = rnbinom_mu;
      /***/
    },
    /* 111 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var r_func_1 = __webpack_require__(2);

      var ISNAN = Number.isNaN;
      var M_PI = Math.PI,
          log = Math.log;
      var printer = debug('dcauchy');

      function dcauchy(xx) {
        var location = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var giveLog = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        return r_func_1.map(xx)(function (x) {
          var y;

          if (ISNAN(x) || ISNAN(location) || ISNAN(scale)) {
            return x + location + scale;
          }

          if (scale <= 0) {
            return _general_1.ML_ERR_return_NAN(printer);
          }

          y = (x - location) / scale;
          return giveLog ? -log(M_PI * scale * (1 + y * y)) : 1 / (M_PI * scale * (1 + y * y));
        });
      }

      exports.dcauchy = dcauchy;
      /***/
    },
    /* 112 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var _general_2 = __webpack_require__(0);

      var r_func_1 = __webpack_require__(2);

      var trigonometry_1 = __webpack_require__(33);

      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite;
      var fabs = Math.abs;
      var printer = debug('pcauchy');

      function pcauchy(xx) {
        var location = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var lowerTail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var logP = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        return r_func_1.map(xx)(function (x) {
          if (ISNAN(x) || ISNAN(location) || ISNAN(scale)) return x + location + scale;

          if (scale <= 0) {
            return _general_1.ML_ERR_return_NAN(printer);
          }

          x = (x - location) / scale;

          if (ISNAN(x)) {
            return _general_1.ML_ERR_return_NAN(printer);
          }

          if (!R_FINITE(x)) {
            if (x < 0) return _general_1.R_DT_0(lowerTail, logP);else return _general_1.R_DT_1(lowerTail, logP);
          }

          if (!lowerTail) x = -x;

          if (fabs(x) > 1) {
            var y = trigonometry_1.atanpi(1 / x);
            return x > 0 ? _general_2.R_D_Clog(logP, y) : _general_1.R_D_val(logP, -y);
          } else {
            return _general_1.R_D_val(logP, 0.5 + trigonometry_1.atanpi(x));
          }
        });
      }

      exports.pcauchy = pcauchy;
      /***/
    },
    /* 113 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var r_func_1 = __webpack_require__(2);

      var tanpi_1 = __webpack_require__(76);

      var expm1 = Math.expm1,
          exp = Math.exp;
      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite;
      var _ML_POSINF$ML_NEGINF = {
        ML_POSINF: Infinity,
        ML_NEGINF: -Infinity
      },
          ML_POSINF = _ML_POSINF$ML_NEGINF.ML_POSINF,
          ML_NEGINF = _ML_POSINF$ML_NEGINF.ML_NEGINF;
      var printer = debug('qcauchy');

      function qcauchy(pp) {
        var location = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var lowerTail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var logP = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        return r_func_1.map(pp)(function (p) {
          if (ISNAN(p) || ISNAN(location) || ISNAN(scale)) return NaN;
          var lower_tail = lowerTail;

          var rc = _general_1.R_Q_P01_check(logP, p);

          if (rc !== undefined) {
            return rc;
          }

          if (scale <= 0 || !R_FINITE(scale)) {
            if (scale === 0) return location;
            return _general_1.ML_ERR_return_NAN(printer);
          }

          var my_INF = location + (lower_tail ? scale : -scale) * ML_POSINF;

          if (logP) {
            if (p > -1) {
              if (p === 0) return my_INF;
              lower_tail = !lower_tail;
              p = -expm1(p);
            } else p = exp(p);
          } else {
            if (p > 0.5) {
              if (p === 1) return my_INF;
              p = 1 - p;
              lower_tail = !lower_tail;
            }
          }

          if (p === 0.5) return location;
          if (p === 0) return location + (lower_tail ? scale : -scale) * ML_NEGINF;
          return location + (lower_tail ? -scale : scale) / tanpi_1.tanpi(p);
        });
      }

      exports.qcauchy = qcauchy;
      /***/
    },
    /* 114 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite;
      var M_PI = Math.PI;
      var printer = debug('rcauchy');

      function rcauchy(n) {
        var location = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var rng = arguments.length > 3 ? arguments[3] : undefined;
        var result = new Array(n).fill(0).map(function () {
          if (ISNAN(location) || !R_FINITE(scale) || scale < 0) {
            return _general_1.ML_ERR_return_NAN(printer);
          }

          if (scale === 0 || !R_FINITE(location)) return location;else return location + scale * Math.tan(M_PI * rng.unif_rand());
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.rcauchy = rcauchy;
      /***/
    },
    /* 115 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var NumberW_1 = __webpack_require__(63);

      var trunc = Math.trunc,
          log = Math.log,
          abs = Math.abs,
          min = Math.min,
          pow = Math.pow;
      var printer_bratio = debug('Toms708.bratio');

      var Toms708 = /*#__PURE__*/function () {
        function Toms708() {
          _classCallCheck(this, Toms708);
        }

        _createClass(Toms708, null, [{
          key: "alnrel",
          value: function alnrel(a) {
            var p3 = -0.178874546012214e-1;
            var p2 = 0.405303492862024;
            var p1 = -0.129418923021993e1;
            var q3 = -0.845104217945565e-1;
            var q2 = 0.747811014037616;
            var q1 = -0.162752256355323e1;
            var t = 0.0;
            var w = 0.0;
            var x = 0.0;
            var t2 = 0.0;

            if (Math.abs(a) > 0.375) {
              x = 1 + a;
              return log(x);
            }

            t = a / (a + 2.0);
            t2 = t * t;
            w = (((p3 * t2 + p2) * t2 + p1) * t2 + 1.0) / (((q3 * t2 + q2) * t2 + q1) * t2 + 1.0);
            return 2.0 * t * w;
          }
        }, {
          key: "algdiv",
          value: function algdiv(a, b) {
            var c5 = -0.165322962780713e-2;
            var c4 = 0.837308034031215e-3;
            var c3 = -0.59520293135187e-3;
            var c2 = 0.79365066682539e-3;
            var c1 = -0.277777777760991e-2;
            var c0 = 0.833333333333333e-1;
            var s11 = 0.0;
            var c = 0.0;
            var d = 0.0;
            var h = 0.0;
            var t = 0.0;
            var u = 0.0;
            var v = 0.0;
            var w = 0.0;
            var x = 0.0;
            var s3 = 0.0;
            var s5 = 0.0;
            var s7 = 0.0;
            var x2 = 0.0;
            var s9 = 0.0;

            if (a <= b) {
              h = a / b;
              c = h / (1.0 + h);
              x = 1.0 / (1.0 + h);
              d = b + (a - 0.5);
            } else {
              h = b / a;
              c = 1.0 / (1.0 + h);
              x = h / (1.0 + h);
              d = a + (b - 0.5);
            }

            x2 = x * x;
            s3 = 1.0 + x + x2;
            s5 = 1.0 + x + x2 * s3;
            s7 = 1.0 + x + x2 * s5;
            s9 = 1.0 + x + x2 * s7;
            s11 = 1.0 + x + x2 * s9;
            t = Math.pow(1.0 / b, 2);
            w = ((((c5 * s11 * t + c4 * s9) * t + c3 * s7) * t + c2 * s5) * t + c1 * s3) * t + c0;
            w *= c / b;
            u = d * Toms708.alnrel(a / b);
            v = a * (log(b) - 1.0);
            if (u <= v) return w - u - v;
            return w - v - u;
          }
        }, {
          key: "apser",
          value: function apser(a, b, x, eps) {
            var g = 0.577215664901533;
            var j = 0.0;
            var bx = 0.0;
            var c = 0.0;
            var s = 0.0;
            var t = 0.0;
            var tol = 0.0;
            var aj = 0.0;
            bx = b * x;
            t = x - bx;

            if (b * eps > 2e-2) {
              c = log(bx) + g + t;
            } else {
              c = log(x) + Toms708.psi(b) + g + t;
            }

            tol = 5.0 * eps * Math.abs(c);
            j = 1.0;
            s = 0.0;

            do {
              j++;
              t *= x - bx / j;
              aj = t / j;
              s += aj;
            } while (Math.abs(aj) > tol);

            return -(a * (c + s));
          }
        }, {
          key: "basym",
          value: function basym(a, b, lambda, eps) {
            var a0 = new Array(21).fill(0);
            var b0 = new Array(21).fill(0);
            var c = new Array(21).fill(0);
            var d = new Array(21).fill(0);
            var num = 20;
            var e0 = 1.12837916709551;
            var e1 = 0.353553390593274;
            var h;
            var r0;
            var r1;
            var w0;

            if (a <= b) {
              h = a / b;
              r0 = 1.0 / (1.0 + h);
              r1 = (b - a) / b;
              w0 = 1.0 / Math.sqrt(a * (1.0 + h));
            } else {
              h = b / a;
              r0 = 1.0 / (1.0 + h);
              r1 = (b - a) / a;
              w0 = 1.0 / Math.sqrt(b * (1.0 + h));
            }

            var f = a * Toms708.rlog1(-lambda / a) + b * Toms708.rlog1(lambda / b);
            var t = Math.exp(-f);
            if (t === 0.0) return 0;
            var z0 = Math.sqrt(f);
            var z = 0.5 * (z0 / e1);
            var z2 = f + f;
            a0[0] = 2.0 / 3.0 * r1;
            c[0] = -0.5 * a0[0];
            d[0] = -c[0];
            var j0 = 0.5 / e0 * Toms708.erfc1(1, z0);
            var j1 = e1;
            var sum = j0 + d[0] * w0 * j1;
            var s = 1.0;
            var h2 = h * h;
            var hn = 1.0;
            var w = w0;
            var znm1 = z;
            var zn = z2;

            for (var n = 2; n <= num; n += 2) {
              hn = h2 * hn;
              a0[n] = 2.0 * r0 * (1.0 + h * hn) / (n + 2.0);
              var np1 = n + 1;
              s = s + hn;
              a0[np1] = 2.0 * r1 * s / (n + 3.0);

              for (var i = n; i <= np1; i++) {
                var r = -0.5 * (i + 1.0);
                b0[1] = r * a0[1];

                for (var m = 2; m <= i; m++) {
                  var bsum = 0.0;
                  var mm1 = m - 1;

                  for (var j = 1; j <= mm1; j++) {
                    var mmj = m - j;
                    bsum = bsum + (j * r - mmj) * a0[j] * b0[mmj];
                  }

                  b0[m] = r * a0[m] + bsum / m;
                }

                c[i] = b0[i] / (i + 1.0);
                var dsum = 0.0;
                var im1 = i - 1;

                for (var _j2 = 1; _j2 <= im1; _j2++) {
                  var imj = i - _j2;
                  dsum = dsum + d[imj] * c[_j2];
                }

                d[i] = -(dsum + c[i]);
              }

              j0 = e1 * znm1 + (n - 1.0) * j0;
              j1 = e1 * zn + n * j1;
              znm1 = z2 * znm1;
              zn = z2 * zn;
              w = w0 * w;
              var t0 = d[n] * w * j0;
              w = w0 * w;
              var t1 = d[np1] * w * j1;
              sum = sum + (t0 + t1);
              if (Math.abs(t0) + Math.abs(t1) <= eps * sum) break;
            }

            var u = Math.exp(-Toms708.bcorr(a, b));
            return e0 * t * u * sum;
          }
        }, {
          key: "bcorr",
          value: function bcorr(a0, b0) {
            var c5 = -0.165322962780713e-2;
            var c4 = 0.837308034031215e-3;
            var c3 = -0.59520293135187e-3;
            var c2 = 0.79365066682539e-3;
            var c1 = -0.277777777760991e-2;
            var c0 = 0.833333333333333e-1;
            var s11 = 0.0;
            var a = 0.0;
            var b = 0.0;
            var c = 0.0;
            var h = 0.0;
            var t = 0.0;
            var w = 0.0;
            var x = 0.0;
            var s3 = 0.0;
            var s5 = 0.0;
            var s7 = 0.0;
            var x2 = 0.0;
            var s9 = 0.0;
            a = Math.min(a0, b0);
            b = Math.max(a0, b0);
            h = a / b;
            c = h / (1.0 + h);
            x = 1.0 / (1.0 + h);
            x2 = x * x;
            s3 = 1.0 + (x + x2);
            s5 = 1.0 + (x + x2 * s3);
            s7 = 1.0 + (x + x2 * s5);
            s9 = 1.0 + (x + x2 * s7);
            s11 = 1.0 + (x + x2 * s9);
            t = Math.pow(1.0 / b, 2);
            w = ((((c5 * s11 * t + c4 * s9) * t + c3 * s7) * t + c2 * s5) * t + c1 * s3) * t + c0;
            w = w * (c / b);
            t = Math.pow(1.0 / a, 2);
            return (((((c5 * t + c4) * t + c3) * t + c2) * t + c1) * t + c0) / a + w;
          }
        }, {
          key: "beta_cdf_values",
          value: function beta_cdf_values(nData, a, b, x, fx) {
            var nMax = 42;
            var aVec = [0.5, 0.5, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 5.5, 10.0, 10.0, 10.0, 10.0, 20.0, 20.0, 20.0, 20.0, 20.0, 30.0, 30.0, 40.0, 0.1e1, 0.1e1, 0.1e1, 0.1e1, 0.1e1, 0.1e1, 0.1e1, 0.1e1, 0.2e1, 0.3e1, 0.4e1, 0.5e1];
            var bVec = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 5.0, 0.5, 5.0, 5.0, 10.0, 5.0, 10.0, 10.0, 20.0, 20.0, 10.0, 10.0, 20.0, 0.5, 0.5, 0.5, 0.5, 0.2e1, 0.3e1, 0.4e1, 0.5e1, 0.2e1, 0.2e1, 0.2e1, 0.2e1];
            var fxVec = [0.6376856085851985e-1, 0.2048327646991335, 0.1e1, 0.0, 0.5012562893380045e-2, 0.513167019494862e-1, 0.2928932188134525, 0.5, 0.28e-1, 0.104, 0.216, 0.352, 0.5, 0.648, 0.784, 0.896, 0.972, 0.4361908850559777, 0.1516409096347099, 0.8978271484375e-1, 0.1e1, 0.5, 0.4598773297575791, 0.2146816102371739, 0.9507364826957875, 0.5, 0.8979413687105918, 0.2241297491808366, 0.7586405487192086, 0.7001783247477069, 0.513167019494862e-1, 0.1055728090000841, 0.1633399734659245, 0.2254033307585166, 0.36, 0.488, 0.5904, 0.67232, 0.216, 0.837e-1, 0.3078e-1, 0.10935e-1];
            var xVec = [0.01, 0.1, 1.0, 0.0, 0.01, 0.1, 0.5, 0.5, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.5, 0.9, 0.5, 1.0, 0.5, 0.8, 0.6, 0.8, 0.5, 0.6, 0.7, 0.8, 0.7, 0.1, 0.2, 0.3, 0.4, 0.2, 0.2, 0.2, 0.2, 0.3, 0.3, 0.3, 0.3];
            if (nData.val < 0) nData.val = 0;
            nData.val++;

            if (nData.val > nMax) {
              nData.val = 0;
              a.val = b.val = x.val = fx.val = 0.0;
            } else {
              a.val = aVec[nData.val - 1];
              b.val = bVec[nData.val - 1];
              x.val = xVec[nData.val - 1];
              fx.val = fxVec[nData.val - 1];
            }
          }
        }, {
          key: "betaln",
          value: function betaln(a0, b0) {
            var e = 0.918938533204673;
            var a = 0.0;
            var b = 0.0;
            var c = 0.0;
            var h = 0.0;
            var i = 0;
            var n = 0;
            var u = 0.0;
            var v = 0.0;
            var w = 0.0;
            var z = 0.0;
            a = Math.min(a0, b0);
            b = Math.max(a0, b0);

            if (a < 1) {
              if (b < 8.0) return Toms708.gamln(a) + Toms708.algdiv(a, b);else return Toms708.gamln(a) + Toms708.gamln(b) - Toms708.gamln(a + b);
            } else if (a >= 1 && a < 8) {
              if (a < 2 && b < 2) {
                return Toms708.gamln(a) + Toms708.gamln(b) - Toms708.gsumln(a, b);
              } else if (b > 2) {
                w = 0.0;

                if (b < 8.0) {
                  n = trunc(b - 1.0);
                  z = 1.0;

                  for (i = 1; i <= n; i++) {
                    b--;
                    z *= b / (a + b);
                  }

                  return w + log(z) + (Toms708.gamln(a) + Toms708.gamln(b) - Toms708.gsumln(a, b));
                } else return Toms708.gamln(a) + Toms708.algdiv(a, b);
              } else if (a > 2) {
                if (b > 1000.0) {
                  n = trunc(a - 1.0);
                  w = 1.0;

                  for (i = 1; i <= n; i++) {
                    a--;
                    w = w * (a / (1.0 + a / b));
                  }

                  return log(w) - n * log(b) + (Toms708.gamln(a) + Toms708.algdiv(a, b));
                }

                n = trunc(a - 1.0);
                w = 1.0;

                for (i = 1; i <= n; i++) {
                  a--;
                  h = a / b;
                  w *= h / (1.0 + h);
                }

                w = log(w);

                if (b < 8.0) {
                  n = trunc(b - 1.0);
                  z = 1.0;

                  for (i = 1; i <= n; i++) {
                    b--;
                    z *= b / (a + b);
                  }

                  return w + log(z) + (Toms708.gamln(a) + Toms708.gamln(b) - Toms708.gsumln(a, b));
                } else return w + Toms708.gamln(a) + Toms708.algdiv(a, b);
              }
            }

            w = Toms708.bcorr(a, b);
            h = a / b;
            c = h / (1.0 + h);
            u = -((a - 0.5) * log(c));
            v = b * Toms708.alnrel(h);
            if (u > v) return -0.5 * log(b) + e + w - u - v;else return -0.5 * log(b) + e + w - v - u;
          }
        }, {
          key: "bfrac",
          value: function bfrac(a, b, x, y, lambda, eps) {
            var n = 0.0;
            var yp1 = 0.0;
            var alpha = 0.0;
            var c = 0.0;
            var e = 0.0;
            var p = 0.0;
            var r = 0.0;
            var s = 0.0;
            var t = 0.0;
            var w = 0.0;
            var c0 = 0.0;
            var c1 = 0.0;
            var anp1 = 0.0;
            var bnp1 = 0.0;
            var r0 = 0.0;
            var beta = 0.0;
            var an = 0.0;
            var bn = 0.0;
            var dResult = Toms708.brcomp(a, b, x, y);
            if (dResult === 0.0) return 0;
            c = 1.0 + lambda;
            c0 = b / a;
            c1 = 1.0 + 1.0 / a;
            yp1 = y + 1.0;
            n = 0.0;
            p = 1.0;
            s = a + 1.0;
            an = 0.0;
            bn = 1.0;
            anp1 = 1.0;
            bnp1 = c / c1;
            r = c1 / c;

            while (true) {
              n++;
              t = n / a;
              w = n * (b - n) * x;
              e = a / s;
              alpha = p * (p + c0) * e * e * (w * x);
              e = (1.0 + t) / (c1 + t + t);
              beta = n + w / s + e * (c + n * yp1);
              p = 1.0 + t;
              s = s + 2.0;
              t = alpha * an + beta * anp1;
              an = anp1;
              anp1 = t;
              t = alpha * bn + beta * bnp1;
              bn = bnp1;
              bnp1 = t;
              r0 = r;
              r = anp1 / bnp1;
              if (Math.abs(r - r0) <= eps * r) break;
              an = an / bnp1;
              bn = bn / bnp1;
              anp1 = r;
              bnp1 = 1.0;
            }

            dResult *= r;
            return dResult;
          }
        }, {
          key: "bgrat",
          value: function bgrat(a, b, x, y, w, eps, ierr) {
            var j = 0.0;
            var l = 0.0;
            var lnx = 0.0;
            var nu = 0.0;
            var n2 = 0.0;
            var c = new Array(30);
            var d = new Array(30);
            var bm1 = 0.0;
            var nm1 = 0;
            var i = 0;
            var n = 0;
            var q = 0.0;
            var r = 0.0;
            var s = 0.0;
            var t = 0.0;
            var u = 0.0;
            var v = 0.0;
            var z = 0.0;
            var sum = 0.0;
            var bp2n = 0.0;
            var t2 = 0.0;
            var coef = 0.0;
            var dj = 0.0;
            var cn = 0.0;
            bm1 = b - 0.5 - 0.5;
            nu = a + 0.5 * bm1;

            if (y <= 0.375) {
              lnx = Toms708.alnrel(-y);
            } else {
              lnx = log(x);
            }

            z = -(nu * lnx);

            if (b * z !== 0.0) {
              r = b * (1.0 + Toms708.gam1(b)) * Math.exp(b * log(z));
              r *= Math.exp(a * lnx) * Math.exp(0.5 * bm1 * lnx);
              u = Toms708.algdiv(b, a) + b * log(nu);
              u = r * Math.exp(-u);

              if (u === 0.0) {
                ierr.val = 1;
                return;
              }

              var p1 = new NumberW_1.NumberW(0);
              var q1 = new NumberW_1.NumberW(0);
              Toms708.grat1(b, z, r, p1, q1, eps);
              q = q1.val;
              v = 0.25 * Math.pow(1.0 / nu, 2);
              t2 = 0.25 * lnx * lnx;
              l = w.val / u;
              j = q / r;
              sum = j;
              t = 1.0;
              cn = 1.0;
              n2 = 0.0;

              for (n = 1; n <= 30; n++) {
                bp2n = b + n2;
                j = (bp2n * (bp2n + 1.0) * j + (z + bp2n + 1.0) * t) * v;
                n2 = n2 + 2.0;
                t *= t2;
                cn /= n2 * (n2 + 1.0);
                c[n - 1] = cn;
                s = 0.0;

                if (n !== 1) {
                  nm1 = n - 1;
                  coef = b - n;

                  for (i = 1; i <= nm1; i++) {
                    s += coef * c[i - 1] * d[n - i - 1];
                    coef += b;
                  }
                }

                d[n - 1] = bm1 * cn + s / n;
                dj = d[n - 1] * j;
                sum += dj;

                if (sum <= 0.0) {
                  ierr.val = 1;
                  return;
                }

                if (Math.abs(dj) <= eps * (sum + l)) {
                  break;
                }
              }

              ierr.val = 0;
              w.val += u * sum;
              return;
            } else {
              ierr.val = 1;
              return;
            }
          }
        }, {
          key: "brcomp",
          value: function brcomp(a, b, x, y) {
            var Const = 0.398942280401433;
            if (x === 0.0 || y === 0.0) return 0;
            var b0;
            var a0 = Math.min(a, b);
            var lnx;
            var lny;
            var c;

            if (a0 < 8.0) {
              if (x <= 0.375) {
                lnx = log(x);
                lny = Toms708.alnrel(-x);
              } else {
                if (y <= 0.375) {
                  lnx = Toms708.alnrel(-y);
                  lny = log(y);
                } else {
                  lnx = log(x);
                  lny = log(y);
                }

                var _z = a * lnx + b * lny;

                if (a0 >= 1.0) {
                  _z -= Toms708.betaln(a, b);
                  return Math.exp(_z);
                }

                b0 = Math.max(a, b);

                if (b0 < 8.0) {
                  if (b0 <= 1.0) {
                    var dResult = Math.exp(_z);
                    if (dResult === 0.0) return 0;
                    var apb = a + b;

                    if (apb <= 1.0) {
                      _z = 1.0 + Toms708.gam1(apb);
                    } else {
                      var _u2 = a + b - 1.0;

                      _z = (1.0 + Toms708.gam1(_u2)) / apb;
                    }

                    c = (1.0 + Toms708.gam1(a)) * (1.0 + Toms708.gam1(b)) / _z;
                    dResult *= a0 * c / (1.0 + a0 / b0);
                    return dResult;
                  }
                } else {
                  var _u3 = Toms708.gamln1(a0);

                  var n = b0 - 1.0;

                  if (n >= 1) {
                    c = 1.0;

                    for (var i = 1; i <= n; i++) {
                      b0--;
                      c *= b0 / (a0 + b0);
                    }

                    _u3 = log(c) + _u3;
                  }

                  _z -= _u3;
                  b0--;

                  var _apb = a0 + b0;

                  var t;

                  if (_apb <= 1.0) {
                    t = 1.0 + Toms708.gam1(_apb);
                  } else {
                    _u3 = a0 + b0 - 1.0;
                    t = (1.0 + Toms708.gam1(_u3)) / _apb;
                  }

                  return a0 * Math.exp(_z) * (1.0 + Toms708.gam1(b0)) / t;
                }

                var _u = Toms708.gamln1(a0) + Toms708.algdiv(a0, b0);

                return a0 * Math.exp(_z - _u);
              }
            }

            var x0;
            var y0;
            var lambda;
            var e;
            var h;
            var u;
            var v;

            if (a <= b) {
              h = a / b;
              x0 = h / (1.0 + h);
              y0 = 1.0 / (1.0 + h);
              lambda = a - (a + b) * x;
            } else {
              h = b / a;
              x0 = 1.0 / (1.0 + h);
              y0 = h / (1.0 + h);
              lambda = (a + b) * y - b;
            }

            e = -lambda / a;

            if (Math.abs(e) <= 0.6) {
              u = Toms708.rlog1(e);
            } else {
              u = e - log(x / x0);
            }

            e = lambda / b;

            if (Math.abs(e) > 0.6) {
              v = Toms708.rlog1(e);
            } else {
              v = e - log(y / y0);
            }

            var z = Math.exp(-(a * u + b * v));
            return Const * Math.sqrt(b * x0) * z * Math.exp(-Toms708.bcorr(a, b));
          }
        }, {
          key: "brcmp1",
          value: function brcmp1(mu, a, b, x, y) {
            var invSqrtPi = 0.398942280401433;
            var c;
            var u;
            var apb;
            var a0 = Math.min(a, b);

            if (a0 < 8.0) {
              var lnx;
              var lny;

              if (x <= 0.375) {
                lnx = log(x);
                lny = Toms708.alnrel(-x);
              } else {
                if (y <= 0.375) {
                  lnx = Toms708.alnrel(-y);
                  lny = log(y);
                } else {
                  lnx = log(x);
                  lny = log(y);
                }
              }

              var _z2 = a * lnx + b * lny;

              if (a0 >= 1.0) {
                _z2 -= Toms708.betaln(a, b);
                return Toms708.esum(mu, _z2);
              }

              var b0 = Math.max(a, b);

              if (b0 >= 8.0) {
                u = Toms708.gamln1(a0) + Toms708.algdiv(a0, b0);
                return a0 * Toms708.esum(mu, _z2 - u);
              }

              if (b0 <= 1.0) {
                var dResult = Toms708.esum(mu, _z2);
                if (dResult === 0.0) return 0;
                apb = a + b;

                if (apb <= 1.0) {
                  _z2 = 1.0 + Toms708.gam1(apb);
                } else {
                  u = a + b - 1.0;
                  _z2 = (1.0 + Toms708.gam1(u)) / apb;
                }

                c = (1.0 + Toms708.gam1(a)) * (1.0 + Toms708.gam1(b)) / _z2;
                dResult *= a0 * c / (1.0 + a0 / b0);
                return dResult;
              }

              u = Toms708.gamln1(a0);
              var n = trunc(b0 - 1.0);

              if (n >= 1) {
                c = 1.0;

                for (var i = 1; i <= n; i++) {
                  b0 -= 1.0;
                  c = c * (b0 / (a0 + b0));
                }

                u = log(c) + u;
              }

              _z2 -= u;
              b0 -= 1.0;
              apb = a0 + b0;
              var t;

              if (apb <= 1.0) {
                t = 1.0 + Toms708.gam1(apb);
              } else {
                u = a0 + b0 - 1.0;
                t = (1.0 + Toms708.gam1(u)) / apb;
              }

              return a0 * Toms708.esum(mu, _z2) * (1.0 + Toms708.gam1(b0)) / t;
            }

            var h;
            var x0;
            var y0;
            var lambda;

            if (a <= b) {
              h = a / b;
              x0 = h / (1.0 + h);
              y0 = 1.0 / (1.0 + h);
              lambda = a - (a + b) * x;
            } else {
              h = b / a;
              x0 = 1.0 / (1.0 + h);
              y0 = h / (1.0 + h);
              lambda = (a + b) * y - b;
            }

            var e = -lambda / a;

            if (Math.abs(e) <= 0.6) {
              u = Toms708.rlog1(e);
            } else {
              u = e - log(x / x0);
            }

            e = lambda / b;
            var v;

            if (Math.abs(e) <= 0.6) {
              v = Toms708.rlog1(e);
            } else {
              v = e - log(y / y0);
            }

            var z = Toms708.esum(mu, -(a * u + b * v));
            return invSqrtPi * Math.sqrt(b * x0) * z * Math.exp(-Toms708.bcorr(a, b));
          }
        }, {
          key: "bpser",
          value: function bpser(a, b, x, eps) {
            var n = 0.0;
            var apb = 0.0;
            var c = 0.0;
            var i = 0;
            var m = 0;
            var t = 0.0;
            var u = 0.0;
            var w = 0.0;
            var z = 0.0;
            var tol = 0.0;
            var sum = 0.0;
            var a0 = 0.0;
            var b0 = 0.0;
            var dResult = 0;

            if (x === 0.0) {
              return 0;
            }

            a0 = Math.min(a, b);

            if (a0 >= 1.0) {
              z = a * log(x) - Toms708.betaln(a, b);
              dResult = Math.exp(z) / a;
            } else {
              b0 = Math.max(a, b);

              if (b0 < 8.0) {
                if (b0 <= 1.0) {
                  dResult = Math.pow(x, a);

                  if (dResult === 0.0) {
                    return 0;
                  }

                  apb = a + b;

                  if (apb <= 1.0) {
                    z = 1.0 + Toms708.gam1(apb);
                  } else {
                    u = a + b - 1.0;
                    z = (1.0 + Toms708.gam1(u)) / apb;
                  }

                  c = (1.0 + Toms708.gam1(a)) * (1.0 + Toms708.gam1(b)) / z;
                  dResult *= c * (b / apb);
                } else {
                  u = Toms708.gamln1(a0);
                  m = trunc(b0 - 1.0);

                  if (m >= 1) {
                    c = 1.0;

                    for (i = 1; i <= m; i++) {
                      b0--;
                      c *= b0 / (a0 + b0);
                    }

                    u = log(c) + u;
                  }

                  z = a * log(x) - u;
                  b0--;
                  apb = a0 + b0;

                  if (apb <= 1.0) {
                    t = 1.0 + Toms708.gam1(apb);
                  } else {
                    u = a0 + b0 - 1.0;
                    t = (1.0 + Toms708.gam1(u)) / apb;
                  }

                  dResult = Math.exp(z) * (a0 / a) * (1.0 + Toms708.gam1(b0)) / t;
                }
              } else {
                u = Toms708.gamln1(a0) + Toms708.algdiv(a0, b0);
                z = a * log(x) - u;
                dResult = a0 / a * Math.exp(z);
              }
            }

            if (dResult === 0.0 || a <= 0.1 * eps) {
              return dResult;
            }

            sum = 0.0;
            n = 0.0;
            c = 1.0;
            tol = eps / a;

            do {
              n++;
              c *= (0.5 + (0.5 - b / n)) * x;
              w = c / (a + n);
              sum += w;
            } while (Math.abs(w) > tol);

            dResult *= 1.0 + a * sum;
            return dResult;
          }
        }, {
          key: "bratio",
          value: function bratio(a, b, x, y, w, w1, ierr) {
            var lambda = 0.0;
            var ind = 0;
            var n = 0;
            var t = 0.0;
            var eps = 0.0;
            var z = 0.0;
            var a0 = 0.0;
            var b0 = 0.0;
            var x0 = 0.0;
            var y0 = 0.0;
            eps = Toms708.spmpar(1);
            printer_bratio('eps is: %d', eps);
            w.val = 0.0;
            w1.val = 0.0;

            if (a < 0.0 || b < 0.0) {
              ierr.val = 1;
              return;
            }

            if (a === 0.0 && b === 0.0) {
              ierr.val = 2;
              return;
            }

            if (x < 0.0 || x > 1.0) {
              ierr.val = 3;
              return;
            }

            if (y < 0.0 || y > 1.0) {
              ierr.val = 4;
              return;
            }

            z = x + y - 0.5 - 0.5;

            if (abs(z) > 3.0 * eps) {
              ierr.val = 5;
              return;
            }

            ierr.val = 0;

            if (x === 0.0) {
              if (a === 0.0) {
                ierr.val = 6;
                return;
              } else {
                w.val = 0.0;
                w1.val = 1.0;
                return;
              }
            }

            if (y === 0.0) {
              if (b === 0.0) {
                ierr.val = 7;
                return;
              } else {
                w.val = 1.0;
                w1.val = 0.0;
                return;
              }
            }

            if (a === 0.0) {
              w.val = 1.0;
              w1.val = 0.0;
              return;
            }

            if (b === 0.0) {
              w.val = 0.0;
              w1.val = 1.0;
              return;
            }

            eps = Math.max(eps, 1e-15);

            if (Math.max(a, b) < 1.0e-3 * eps) {
              w.val = b / (a + b);
              w1.val = a / (a + b);
              return;
            }

            ind = 0;
            a0 = a;
            b0 = b;
            x0 = x;
            y0 = y;

            if (min(a0, b0) <= 1.0) {
              if (x > 0.5) {
                ind = 1;
                a0 = b;
                b0 = a;
                x0 = y;
                y0 = x;
              }

              if (b0 < min(eps, eps * a0)) {
                w.val = Toms708.fpser(a0, b0, x0, eps);
                w1.val = 0.5 + (0.5 - w.val);

                if (ind === 0) {
                  return;
                } else {
                  t = w.val;
                  w.val = w1.val;
                  w1.val = t;
                  return;
                }
              }

              if (a0 < min(eps, eps * b0) && b0 * x0 <= 1.0) {
                w1.val = Toms708.apser(a0, b0, x0, eps);
                w.val = 0.5 + (0.5 - w1.val);

                if (ind === 0) {
                  return;
                } else {
                  t = w.val;
                  w.val = w1.val;
                  w1.val = t;
                  return;
                }
              }

              if (Math.max(a0, b0) <= 1.0) {
                if (a0 >= Math.min(0.2, b0) || Math.pow(x0, a0) <= 0.9) {
                  w.val = Toms708.bpser(a0, b0, x0, eps);
                  w1.val = 0.5 + (0.5 - w.val);

                  if (ind === 0) {
                    return;
                  } else {
                    t = w.val;
                    w.val = w1.val;
                    w1.val = t;
                    return;
                  }
                }

                if (x0 >= 0.3) {
                  w1.val = Toms708.bpser(b0, a0, y0, eps);
                  w.val = 0.5 + (0.5 - w1.val);

                  if (ind === 0) {
                    return;
                  } else {
                    t = w.val;
                    w.val = w1.val;
                    w1.val = t;
                    return;
                  }
                }

                n = 20;
                w1.val = Toms708.bup(b0, a0, y0, x0, n, eps);
                b0 += n;

                var _ierr = new NumberW_1.NumberW(0);

                Toms708.bgrat(b0, a0, y0, x0, w1, 15.0 * eps, _ierr);
                w.val = 0.5 + (0.5 - w1.val);

                if (ind === 0) {
                  return;
                } else {
                  t = w.val;
                  w.val = w1.val;
                  w1.val = t;
                  return;
                }
              }

              if (b0 <= 1.0) {
                w.val = Toms708.bpser(a0, b0, x0, eps);
                w1.val = 0.5 + (0.5 - w.val);

                if (ind === 0) {
                  return;
                } else {
                  t = w.val;
                  w.val = w1.val;
                  w1.val = t;
                  return;
                }
              }

              if (x0 >= 0.3) {
                w1.val = Toms708.bpser(b0, a0, y0, eps);
                w.val = 0.5 + (0.5 - w1.val);

                if (ind === 0) {
                  return;
                } else {
                  t = w.val;
                  w.val = w1.val;
                  w1.val = t;
                  return;
                }
              }

              if (x0 < 0.1) {
                if (pow(x0 * b0, a0) <= 0.7) {
                  w.val = Toms708.bpser(a0, b0, x0, eps);
                  w1.val = 0.5 + (0.5 - w.val);

                  if (ind === 0) {
                    return;
                  } else {
                    t = w.val;
                    w.val = w1.val;
                    w1.val = t;
                    return;
                  }
                }
              }

              if (b0 > 15.0) {
                var _ierr2 = new NumberW_1.NumberW(0);

                Toms708.bgrat(b0, a0, y0, x0, w1, 15.0 * eps, _ierr2);
                w.val = 0.5 + (0.5 - w1.val);

                if (ind === 0) {
                  return;
                } else {
                  t = w.val;
                  w.val = w1.val;
                  w1.val = t;
                  return;
                }
              }

              n = 20;
              w1.val = Toms708.bup(b0, a0, y0, x0, n, eps);
              b0 += n;
              var ierr1 = new NumberW_1.NumberW(0);
              Toms708.bgrat(b0, a0, y0, x0, w1, 15.0 * eps, ierr1);
              w.val = 0.5 + (0.5 - w1.val);

              if (ind === 0) {
                return;
              } else {
                t = w.val;
                w.val = w1.val;
                w1.val = t;
                return;
              }
            }

            if (a <= b) {
              lambda = a - (a + b) * x;
            } else {
              lambda = (a + b) * y - b;
            }

            if (lambda < 0.0) {
              ind = 1;
              a0 = b;
              b0 = a;
              x0 = y;
              y0 = x;
              lambda = abs(lambda);
            }

            if (b0 < 40.0 && b0 * x0 <= 0.7) {
              w.val = Toms708.bpser(a0, b0, x0, eps);
              w1.val = 0.5 + (0.5 - w.val);

              if (ind === 0) {
                return;
              } else {
                t = w.val;
                w.val = w1.val;
                w1.val = t;
                return;
              }
            }

            if (b0 < 40.0) {
              n = Math.trunc(b0);
              b0 -= n;

              if (b0 === 0.0) {
                n--;
                b0 = 1.0;
              }

              w.val = Toms708.bup(b0, a0, y0, x0, n, eps);

              if (x0 <= 0.7) {
                w.val += Toms708.bpser(a0, b0, x0, eps);
                w1.val = 0.5 + (0.5 - w.val);

                if (ind === 0) {
                  return;
                } else {
                  t = w.val;
                  w.val = w1.val;
                  w1.val = t;
                  return;
                }
              }

              if (a0 <= 15.0) {
                n = 20;
                w.val += Toms708.bup(a0, b0, x0, y0, n, eps);
                a0 += n;
              }

              var _ierr3 = new NumberW_1.NumberW(0);

              Toms708.bgrat(a0, b0, x0, y0, w, 15.0 * eps, _ierr3);
              w1.val = 0.5 + (0.5 - w.val);

              if (ind === 0) {
                return;
              } else {
                t = w.val;
                w.val = w1.val;
                w1.val = t;
                return;
              }
            }

            if (a0 <= b0) {
              if (a0 <= 100.0) {
                w.val = Toms708.bfrac(a0, b0, x0, y0, lambda, 15.0 * eps);
                w1.val = 0.5 + (0.5 - w.val);

                if (ind === 0) {
                  return;
                } else {
                  t = w.val;
                  w.val = w1.val;
                  w1.val = t;
                  return;
                }
              }

              if (lambda > 0.03 * a0) {
                w.val = Toms708.bfrac(a0, b0, x0, y0, lambda, 15.0 * eps);
                w1.val = 0.5 + (0.5 - w.val);

                if (ind === 0) {
                  return;
                } else {
                  t = w.val;
                  w.val = w1.val;
                  w1.val = t;
                  return;
                }
              }

              w.val = Toms708.basym(a0, b0, lambda, 100.0 * eps);
              w1.val = 0.5 + (0.5 - w.val);

              if (ind === 0) {
                return;
              } else {
                t = w.val;
                w.val = w1.val;
                w1.val = t;
                return;
              }
            } else {
              if (b0 <= 100.0 || lambda > 0.03 * b0) {
                w.val = Toms708.bfrac(a0, b0, x0, y0, lambda, 15.0 * eps);
                w1.val = 0.5 + (0.5 - w.val);

                if (ind === 0) {
                  return;
                } else {
                  t = w.val;
                  w.val = w1.val;
                  w1.val = t;
                  return;
                }
              }

              w.val = Toms708.basym(a0, b0, lambda, 100.0 * eps);
              w1.val = 0.5 + (0.5 - w.val);

              if (ind === 0) {
                return;
              } else {
                t = w.val;
                w.val = w1.val;
                w1.val = t;
                return;
              }
            }
          }
        }, {
          key: "bup",
          value: function bup(a, b, x, y, n, eps) {
            var dResult;
            var mu = 0;
            var d = 1.0;
            var t = 0;
            var r = 0;
            var w = 0;
            var k;
            var l;
            var apb = a + b;
            var ap1 = a + 1.0;

            if (n !== 1 && a > 1.0) {
              if (apb >= 1.1 * ap1) {
                mu = trunc(Math.abs(Toms708.exparg(1)));
                k = trunc(Toms708.exparg(0));

                if (k < mu) {
                  mu = k;
                }

                t = mu;
                d = Math.exp(-t);
              }
            }

            dResult = Toms708.brcmp1(mu, a, b, x, y) / a;

            if (n === 1 || dResult === 0.0) {
              return dResult;
            }

            var nm1 = n - 1;
            w = d;
            k = 0;

            if (b <= 1.0) {
              var _kp = k + 1;

              for (var i = _kp; i <= nm1; i++) {
                l = i - 1;
                d = (apb + l) / (ap1 + l) * x * d;
                w += d;
                if (d <= eps * w) break;
              }

              return dResult * w;
            }

            if (y > 1.0e-4) {
              r = (b - 1.0) * x / y - a;

              if (r < 1.0) {
                var _kp2 = k + 1;

                for (var _i3 = _kp2; _i3 <= nm1; _i3++) {
                  l = _i3 - 1;
                  d = (apb + l) / (ap1 + l) * x * d;
                  w += d;
                  if (d <= eps * w) break;
                }

                return dResult * w;
              }

              k = nm1;
              t = nm1;

              if (r < t) {
                k = trunc(r);
              }
            } else {
              k = nm1;
            }

            for (var _i4 = 1; _i4 <= k; _i4++) {
              l = _i4 - 1;
              d = (apb + l) / (ap1 + l) * x * d;
              w += d;
            }

            if (k === nm1) {
              return dResult * w;
            }

            var kp1 = k + 1;

            for (var _i5 = kp1; _i5 <= nm1; _i5++) {
              l = _i5 - 1;
              d = (apb + l) / (ap1 + l) * x * d;
              w += d;
              if (d <= eps * w) break;
            }

            return dResult * w;
          }
        }, {
          key: "erf",
          value: function erf(x) {
            var c = 0.564189583547756;
            var a = [0.77105849500132e-4, -0.133733772997339e-2, 0.323076579225834e-1, 0.479137145607681e-1, 0.128379167095513];
            var b = [0.301048631703895e-2, 0.538971687740286e-1, 0.375795757275549];
            var p = [-1.36864857382717e-7, 5.64195517478974e-1, 7.21175825088309, 4.31622272220567e1, 1.5298928504694e2, 3.39320816734344e2, 4.51918953711873e2, 3.00459261020162e2];
            var q = [1.0, 1.27827273196294e1, 7.70001529352295e1, 2.77585444743988e2, 6.38980264465631e2, 9.3135409485061e2, 7.90950925327898e2, 3.00459260956983e2];
            var r = [2.10144126479064, 2.62370141675169e1, 2.13688200555087e1, 4.6580782871847, 2.82094791773523e-1];
            var s = [9.4153775055546e1, 1.8711481179959e2, 9.90191814623914e1, 1.80124575948747e1];
            var ax = 0.0;
            var bot = 0.0;
            var t = 0.0;
            var top = 0.0;
            var x2 = 0.0;
            ax = Math.abs(x);

            if (ax <= 0.5) {
              t = x * x;
              top = (((a[0] * t + a[1]) * t + a[2]) * t + a[3]) * t + a[4] + 1.0;
              bot = ((b[0] * t + b[1]) * t + b[2]) * t + 1.0;
              return x * (top / bot);
            } else {
              if (ax <= 4.0) {
                top = ((((((p[0] * ax + p[1]) * ax + p[2]) * ax + p[3]) * ax + p[4]) * ax + p[5]) * ax + p[6]) * ax + p[7];
                bot = ((((((q[0] * ax + q[1]) * ax + q[2]) * ax + q[3]) * ax + q[4]) * ax + q[5]) * ax + q[6]) * ax + q[7];
                return x < 0 ? -(0.5 + (0.5 - Math.exp(-x * x) * top / bot)) : 0.5 + (0.5 - Math.exp(-x * x) * top / bot);
              } else {
                if (ax < 5.8) {
                  x2 = x * x;
                  t = 1.0 / x2;
                  top = (((r[0] * t + r[1]) * t + r[2]) * t + r[3]) * t + r[4];
                  bot = (((s[0] * t + s[2]) * t + s[3]) * t + s[3]) * t + 1.0;
                  var dResult = (c - top / (x2 * bot)) / ax;
                  dResult = 0.5 + (0.5 - Math.exp(-x2) * dResult);
                  return x < 0 ? -dResult : dResult;
                } else {
                  return Toms708.sign(1.0, x);
                }
              }
            }
          }
        }, {
          key: "erfc1",
          value: function erfc1(ind, x) {
            var c = 0.564189583547756;
            var a = [0.77105849500132e-4, -0.133733772997339e-2, 0.323076579225834e-1, 0.479137145607681e-1, 0.128379167095513];
            var b = [0.301048631703895e-2, 0.538971687740286e-1, 0.375795757275549];
            var p = [-1.36864857382717e-7, 5.64195517478974e-1, 7.21175825088309, 4.31622272220567e1, 1.5298928504694e2, 3.39320816734344e2, 4.51918953711873e2, 3.00459261020162e2];
            var q = [1.0, 1.27827273196294e1, 7.70001529352295e1, 2.77585444743988e2, 6.38980264465631e2, 9.3135409485061e2, 7.90950925327898e2, 3.00459260956983e2];
            var r = [2.10144126479064, 2.62370141675169e1, 2.13688200555087e1, 4.6580782871847, 2.82094791773523e-1];
            var s = [9.4153775055546e1, 1.8711481179959e2, 9.90191814623914e1, 1.80124575948747e1];
            var dResult = 0.0;
            var w = 0.0;
            var ax = 0.0;
            var e = 0.0;
            var bot = 0.0;
            var t = 0.0;
            var top = 0.0;
            ax = Math.abs(x);

            if (ax < 0.5) {
              t = x * x;
              top = (((a[0] * t + a[1]) * t + a[2]) * t + a[3]) * t + a[4] + 1.0;
              bot = ((b[0] * t + b[1]) * t + b[2]) * t + 1.0;
              dResult = 0.5 + (0.5 - x * (top / bot));
              if (ind !== 0) dResult *= Math.exp(t);
              return dResult;
            } else if (ax <= 4 && ax >= 0.5) {
              top = ((((((p[0] * ax + p[1]) * ax + p[2]) * ax + p[3]) * ax + p[4]) * ax + p[5]) * ax + p[6]) * ax + p[7];
              bot = ((((((q[0] * ax + q[1]) * ax + q[2]) * ax + q[3]) * ax + q[4]) * ax + q[5]) * ax + q[6]) * ax + q[7];
              dResult = top / bot;
            } else {
              if (x <= -5.6) {
                if (ind !== 0) return 2.0 * Math.exp(x * x);else return 2.0;
              }

              if (ind !== 0) {
                t = Math.pow(1.0 / x, 2);
                top = (((r[0] * t + r[1]) * t + r[2]) * t + r[3]) * t + r[4];
                bot = (((s[0] * t + s[2]) * t + s[3]) * t + s[3]) * t + 1.0;
                dResult = (c - t * top / bot) / ax;
              } else {
                if (x > 100.0 || x * x > -Toms708.exparg(1)) {
                  return 0;
                }
              }
            }

            if (ind !== 0) {
              if (x < 0.0) dResult = 2.0 * Math.exp(x * x) - dResult;
              return dResult;
            }

            w = x * x;
            t = w;
            e = w - t;
            dResult *= (0.5 + (0.5 - e)) * Math.exp(-t);
            if (x < 0.0) dResult = 2.0 - dResult;
            return dResult;
          }
        }, {
          key: "esum",
          value: function esum(mu, x) {
            var w = 0.0;

            if (x <= 0.0) {
              if (mu < 0) {
                w = mu;
                return Math.exp(w) * Math.exp(x);
              }

              w = mu + x;

              if (w > 0.0) {
                w = mu;
                return Math.exp(w) * Math.exp(x);
              }

              return Math.exp(w);
            }

            if (mu > 0) {
              w = mu;
              return Math.exp(w) * Math.exp(x);
            }

            w = mu + x;

            if (w < 0.0) {
              w = mu;
              return Math.exp(w) * Math.exp(x);
            }

            return Math.exp(w);
          }
        }, {
          key: "erf_values",
          value: function erf_values(nData, x, fx) {
            var nmax = 21;
            var bvec = [0.0, 0.112462916, 0.2227025892, 0.3286267595, 0.428392355, 0.5204998778, 0.6038560908, 0.6778011938, 0.7421009647, 0.7969082124, 0.8427007929, 0.8802050696, 0.9103139782, 0.9340079449, 0.9522851198, 0.9661051465, 0.9763483833, 0.9837904586, 0.9890905016, 0.9927904292, 0.995322265];
            var xvec = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0];
            if (nData.val < 0) nData.val = 0;
            nData.val++;

            if (nmax < nData.val) {
              nData.val = 0;
              x.val = 0.0;
              fx.val = 0.0;
            } else {
              x.val = xvec[nData.val - 1];
              fx.val = bvec[nData.val - 1];
            }
          }
        }, {
          key: "exparg",
          value: function exparg(l) {
            var lnb = 0.0;
            var m = 0;
            var b = Toms708.ipmpar(4);

            switch (b) {
              case 2:
                lnb = 0.69314718055995;
                break;

              case 8:
                lnb = 2.0794415416798;
                break;

              case 16:
                lnb = 2.7725887222398;
                break;

              default:
                lnb = log(b);
                break;
            }

            if (l !== 0) {
              m = Toms708.ipmpar(6);
              return 0.99999 * m * lnb;
            } else {
              m = Toms708.ipmpar(7);
              return 0.99999 * m * lnb;
            }
          }
        }, {
          key: "fpser",
          value: function fpser(a, b, x, eps) {
            var c = 0.0;
            var s = 0.0;
            var t = 0.0;
            var tol = 0.0;
            var an = 0.0;
            var dResult = 1.0;

            if (a > 1.0e-3 * eps) {
              dResult = 0.0;
              t = a * log(x);

              if (t < Toms708.exparg(1)) {
                return dResult;
              }

              dResult = Math.exp(t);
            }

            dResult = b / a * dResult;
            tol = eps / a;
            an = a + 1.0;
            t = x;
            s = t / an;

            do {
              an = an + 1.0;
              t = x * t;
              c = t / an;
              s = s + c;
            } while (Math.abs(c) > tol);

            return dResult * (1.0 + a * s);
          }
        }, {
          key: "gam1",
          value: function gam1(a) {
            var p = [0.577215664901533, -0.409078193005776, -0.230975380857675, 0.597275330452234e-1, 0.76696818164949e-2, -0.514889771323592e-2, 0.589597428611429e-3];
            var q = [0.1e1, 0.427569613095214, 0.158451672430138, 0.261132021441447e-1, 0.423244297896961e-2];
            var r = [-0.422784335098468, -0.771330383816272, -0.244757765222226, 0.118378989872749, 0.930357293360349e-3, -0.118290993445146e-1, 0.223047661158249e-2, 0.266505979058923e-3, -0.132674909766242e-3];
            var s2 = 0.559398236957378e-1;
            var s1 = 0.273076135303957;
            var d = 0.0;
            var bot = 0.0;
            var t = 0.0;
            var w = 0.0;
            var top = 0.0;
            t = a;
            d = a - 0.5;

            if (d > 0.0) {
              t = d - 0.5;
            }

            if (t === 0) {
              return 0;
            } else if (t > 0) {
              top = (((((p[6] * t + p[5]) * t + p[4]) * t + p[3]) * t + p[2]) * t + p[1]) * t + p[0];
              bot = (((q[4] * t + q[3]) * t + q[2]) * t + q[1]) * t + 1.0;
              w = top / bot;

              if (d <= 0.0) {
                return a * w;
              } else {
                return t / a * (w - 0.5 - 0.5);
              }
            } else {
              top = (((((((r[8] * t + r[7]) * t + r[6]) * t + r[5]) * t + r[4]) * t + r[3]) * t + r[2]) * t + r[1]) * t + r[0];
              bot = (s2 * t + s1) * t + 1.0;
              w = top / bot;

              if (d <= 0.0) {
                return a * (w + 0.5 + 0.5);
              } else {
                return t * w / a;
              }
            }
          }
        }, {
          key: "grat1",
          value: function grat1(a, x, r, p, q, eps) {
            var j = 0.0;
            var l = 0.0;
            var am0 = 0.0;
            var an0 = 0.0;
            var a2n = 0.0;
            var b2n = 0.0;
            var cma = 0.0;
            var c = 0.0;
            var g = 0.0;
            var h = 0.0;
            var t = 0.0;
            var w = 0.0;
            var z = 0.0;
            var tol = 0.0;
            var sum = 0.0;
            var a2nm1 = 0.0;
            var b2nm1 = 0.0;
            var an = 0.0;

            if (a * x === 0.0) {
              if (x <= a) {
                p.val = 0.0;
                q.val = 1.0;
                return;
              } else {
                p.val = 1.0;
                q.val = 0.0;
                return;
              }
            }

            if (a === 0.5) {
              if (x < 0.25) {
                p.val = Toms708.erf(Math.sqrt(x));
                q.val = 0.5 + (0.5 - p.val);
                return;
              } else {
                q.val = Toms708.erfc1(0, Math.sqrt(x));
                p.val = 0.5 + (0.5 - q.val);
                return;
              }
            }

            if (x < 1.1) {
              an = 3.0;
              c = x;
              sum = x / (a + 3.0);
              tol = 0.1 * eps / (a + 1.0);

              do {
                an++;
                c = -c * (x / an);
                t = c / (a + an);
                sum = sum + t;
              } while (Math.abs(t) > tol);

              j = a * x * ((sum / 6.0 - 0.5 / (a + 2.0)) * x + 1.0 / (a + 1.0));
              z = a * log(x);
              h = Toms708.gam1(a);
              g = 1.0 + h;

              if (x < 0.25) {
                if (z > -0.13394) {
                  l = Toms708.rexp(z);
                  w = 0.5 + (0.5 + l);
                  q.val = (w * j - l) * g - h;

                  if (q.val < 0.0) {
                    p.val = 1.0;
                    q.val = 0.0;
                    return;
                  }

                  p.val = 0.5 + (0.5 - q.val);
                  return;
                } else {
                  w = Math.exp(z);
                  p.val = w * g * (0.5 + (0.5 - j));
                  q.val = 0.5 + (0.5 - p.val);
                  return;
                }
              } else {
                w = Math.exp(z);
                p.val = w * g * (0.5 + (0.5 - j));
                q.val = 0.5 + (0.5 - p.val);
                return;
              }
            } else {
              a2nm1 = 1.0;
              a2n = 1.0;
              b2nm1 = x;
              b2n = x + (1.0 - a);
              c = 1.0;

              do {
                a2nm1 = x * a2n + c * a2nm1;
                b2nm1 = x * b2n + c * b2nm1;
                am0 = a2nm1 / b2nm1;
                c++;
                cma = c - a;
                a2n = a2nm1 + cma * a2n;
                b2n = b2nm1 + cma * b2n;
                an0 = a2n / b2n;
              } while (Math.abs(an0 - am0) >= eps * an0);

              q.val = r * an0;
              p.val = 0.5 + (0.5 - q.val);
              return;
            }
          }
        }, {
          key: "ipmpar",
          value: function ipmpar(i) {
            var imach = [2, 31, 2147483647, 2, 24, -125, 128, 53, -1021, 1024];
            return imach[i - 1];
          }
        }, {
          key: "gamma_inc_values",
          value: function gamma_inc_values(nData, a, x, fx) {
            var nMax = 20;
            var aVec = [0.1, 0.1, 0.1, 0.5, 0.5, 0.5, 0.1e1, 0.1e1, 0.1e1, 0.11e1, 0.11e1, 0.11e1, 0.2e1, 0.2e1, 0.2e1, 0.6e1, 0.6e1, 0.11e2, 0.26e2, 0.41e2];
            var fxVec = [0.7382350532339351, 0.9083579897300343, 0.9886559833621947, 0.3014646416966613, 0.7793286380801532, 0.9918490284064973, 0.9516258196404043e-1, 0.6321205588285577, 0.9932620530009145, 0.7205974576054322e-1, 0.5891809618706485, 0.9915368159845525, 0.01018582711118352, 0.4421745996289254, 0.9927049442755639, 0.4202103819530612e-1, 0.9796589705830716, 0.9226039842296429, 0.4470785799755852, 0.7444549220718699];
            var xVec = [0.3e-1, 0.3, 0.15e1, 0.75e-1, 0.75, 0.35e1, 0.1, 0.1e1, 0.5e1, 0.1, 0.1e1, 0.5e1, 0.15, 0.15e1, 0.7e1, 0.25e1, 0.12e2, 0.16e2, 0.25e2, 0.45e2];
            if (nData.val < 0) nData.val = 0;
            nData.val++;

            if (nMax < nData.val) {
              nData.val = 0;
              a.val = 0.0;
              x.val = 0.0;
              fx.val = 0.0;
            } else {
              a.val = aVec[nData.val - 1];
              x.val = xVec[nData.val - 1];
              fx.val = fxVec[nData.val - 1];
            }
          }
        }, {
          key: "gamma_log_values",
          value: function gamma_log_values(nData, x, fx) {
            var nmax = 18;
            var bvec = [1.524064183, 0.7966780066, 0.3982337117, 0.1520599127, 0.0, -0.04987246543, -0.08537410945, -0.1081747934, -0.119612895, -0.120782204, -0.1125917658, -0.09580771625, -0.07108385116, -0.0389842838, 0.0, 12.80182743, 39.33988571, 71.25704193];
            var xvec = [0.2, 0.4, 0.6, 0.8, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 10.0, 20.0, 30.0];
            if (nData.val < 0) nData.val = 0;
            nData.val++;

            if (nmax < nData.val) {
              nData.val = 0;
              x.val = 0.0;
              fx.val = 0.0;
            } else {
              x.val = xvec[nData.val - 1];
              fx.val = bvec[nData.val - 1];
            }
          }
        }, {
          key: "gamln",
          value: function gamln(a) {
            var d = 0.418938533204673;
            var c5 = -0.165322962780713e-2;
            var c4 = 0.837308034031215e-3;
            var c3 = -0.59520293135187e-3;
            var c2 = 0.79365066682539e-3;
            var c1 = -0.277777777760991e-2;
            var c0 = 0.833333333333333e-1;
            var i = 0;
            var n = 0;
            var t = 0.0;
            var w = 0.0;
            if (a <= 0.8) return Toms708.gamln1(a) - log(a);

            if (a <= 2.25) {
              t = a - 0.5 - 0.5;
              return Toms708.gamln1(t);
            }

            if (a < 10.0) {
              n = trunc(a - 1.25);
              t = a;
              w = 1.0;

              for (i = 1; i <= n; i++) {
                t--;
                w *= t;
              }

              return Toms708.gamln1(t - 1.0) + log(w);
            }

            t = Math.pow(1.0 / a, 2);
            w = (((((c5 * t + c4) * t + c3) * t + c2) * t + c1) * t + c0) / a;
            return d + w + (a - 0.5) * (log(a) - 1.0);
          }
        }, {
          key: "gamln1",
          value: function gamln1(a) {
            var p6 = -0.271935708322958e-2;
            var p5 = -0.673562214325671e-1;
            var p4 = -0.402055799310489;
            var p3 = -0.780427615533591;
            var p2 = -0.168860593646662;
            var p1 = 0.844203922187225;
            var p0 = 0.577215664901533;
            var q6 = 0.667465618796164e-3;
            var q5 = 0.325038868253937e-1;
            var q4 = 0.361951990101499;
            var q3 = 0.156875193295039e1;
            var q2 = 0.312755088914843e1;
            var q1 = 0.288743195473681e1;
            var r5 = 0.497958207639485e-3;
            var r4 = 0.17050248402265e-1;
            var r3 = 0.156513060486551;
            var r2 = 0.565221050691933;
            var r1 = 0.848044614534529;
            var r0 = 0.422784335098467;
            var s5 = 0.116165475989616e-3;
            var s4 = 0.713309612391e-2;
            var s3 = 0.10155218743983;
            var s2 = 0.548042109832463;
            var s1 = 0.124313399877507e1;
            var w = 0.0;
            var x = 0.0;

            if (a < 0.6) {
              w = ((((((p6 * a + p5) * a + p4) * a + p3) * a + p2) * a + p1) * a + p0) / ((((((q6 * a + q5) * a + q4) * a + q3) * a + q2) * a + q1) * a + 1.0);
              return -a * w;
            }

            x = a - 0.5 - 0.5;
            w = (((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x + r0) / (((((s5 * x + s4) * x + s3) * x + s2) * x + s1) * x + 1.0);
            return x * w;
          }
        }, {
          key: "gsumln",
          value: function gsumln(a, b) {
            var x = a + b - 2;
            if (x <= 0.25) return Toms708.gamln1(1.0 + x);
            if (x <= 1.25) return Toms708.gamln1(x) + Toms708.alnrel(x);
            return Toms708.gamln1(x - 1.0) + log(x * (1.0 + x));
          }
        }, {
          key: "psi",
          value: function psi(xx) {
            var piov4 = 0.785398163397448;
            var dx0 = 1.461632144968362341262659542325721325;
            var p1 = [0.89538502298197e-2, 0.477762828042627e1, 0.142441585084029e3, 0.118645200713425e4, 0.363351846806499e4, 0.413810161269013e4, 0.130560269827897e4];
            var q1 = [0.448452573429826e2, 0.520752771467162e3, 0.22100079924783e4, 0.364127349079381e4, 0.1908310765963e4, 0.691091682714533e-5];
            var p2 = [-0.212940445131011e1, -0.701677227766759e1, -0.448616543918019e1, -0.648157123766197];
            var q2 = [0.322703493791143e2, 0.892920700481861e2, 0.546117738103215e2, 0.777788548522962e1];
            var nq = 0;
            var xsmall = 0.0;
            var xmax1 = 0.0;
            var den = 0.0;
            var i = 0;
            var aug = 0.0;
            var m = 0;
            var n = 0;
            var sgn = 0.0;
            var w = 0.0;
            var x = 0.0;
            var z = 0.0;
            var upper = 0.0;
            var xmx0 = 0.0;
            xmax1 = Toms708.ipmpar(3);
            xmax1 = Math.min(xmax1, 1.0 / Toms708.spmpar(1));
            xsmall = 1e-9;
            x = xx;
            aug = 0.0;

            if (x < 0.5) {
              if (Math.abs(x) <= xsmall) {
                if (x === 0.0) return 0;
                aug = -1 / x;
              } else {
                w = -x;
                sgn = piov4;

                if (w <= 0.0) {
                  w = -w;
                  sgn = -sgn;
                }

                if (w >= xmax1) return 0;
                nq = trunc(w);
                w = w - nq;
                nq = trunc(w * 4.0);
                w = 4.0 * (w - nq * 0.25);
                n = nq / 2;

                if (n + n !== nq) {
                  w = 1.0 - w;
                }

                z = piov4 * w;
                m = n / 2;

                if (m + m !== n) {
                  sgn = -sgn;
                }

                n = (nq + 1) / 2;
                m = n / 2;
                m = m + m;

                if (m === n) {
                  if (z === 0.0) return 0;
                  aug = sgn * (Math.cos(z) / Math.sin(z) * 4.0);
                } else {
                  aug = sgn * (Math.sin(z) / Math.cos(z) * 4.0);
                }
              }

              x = 1 - x;
            }

            if (x <= 3.0) {
              den = x;
              upper = p1[1] * x;

              for (i = 0; i < 5; i++) {
                den = (den + q1[i]) * x;
                upper = (upper + p1[i + 1]) * x;
              }

              den = (upper + p1[6]) / (den + q1[5]);
              xmx0 = x - dx0;
              return den * xmx0 + aug;
            }

            if (x < xmax1) {
              w = 1.0 / (x * x);
              den = w;
              upper = p2[0] * w;

              for (i = 0; i < 3; i++) {
                den = (den + q2[i]) * w;
                upper = (upper + p2[i + 1]) * w;
              }

              aug = upper / (den + q2[3]) - 0.5 / x + aug;
            }

            return aug + log(x);
          }
        }, {
          key: "psi_values",
          value: function psi_values(n, x, fx) {
            var nmax = 11;
            var fxvec = [-0.5772156649, -0.4237549404, -0.2890398966, -0.1691908889, -0.0613845446, -0.036489974, 0.1260474528, 0.2085478749, 0.2849914333, 0.3561841612, 0.4227843351];
            var xvec = [1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0];
            if (n.val < 0) n.val = 0;
            n.val++;

            if (nmax < n.val) {
              n.val = 0;
              x.val = 0.0;
              fx.val = 0.0;
            } else {
              x.val = xvec[n.val - 1];
              fx.val = fxvec[n.val - 1];
            }
          }
        }, {
          key: "r4_epsilon",
          value: function r4_epsilon() {
            var r = 1.0;
            var rTest = 1.0 + r / 2.0;

            while (1.0 < rTest) {
              r = r / 2.0;
              rTest = 1.0 + r / 2.0;
            }

            return r;
          }
        }, {
          key: "rexp",
          value: function rexp(x) {
            var q4 = 0.595130811860248e-3;
            var q3 = -0.119041179760821e-1;
            var q2 = 0.107141568980644;
            var q1 = -0.499999999085958;
            var p2 = 0.238082361044469e-1;
            var p1 = 0.914041914819518e-9;
            var w = 0.0;

            if (Math.abs(x) <= 0.15) {
              return x * (((p2 * x + p1) * x + 1.0) / (((q4 * x + q3) * x + q2) * x + q1) * x + 1.0);
            } else {
              w = Math.exp(x);

              if (x <= 0.0) {
                return w - 0.5 - 0.5;
              } else {
                return w * (0.5 + (0.5 - 1.0 / w));
              }
            }
          }
        }, {
          key: "rlog1",
          value: function rlog1(x) {
            var a = 0.566749439387324e-1;
            var b = 0.456512608815524e-1;
            var p2 = 0.620886815375787e-2;
            var p1 = -0.224696413112536;
            var p0 = 0.333333333333333;
            var q2 = 0.354508718369557;
            var q1 = -0.127408923933623e1;
            var h = 0.0;
            var r = 0.0;
            var t = 0.0;
            var w = 0.0;
            var w1 = 0.0;

            if (x < -0.39 || x > 0.57) {
              w = x + 0.5 + 0.5;
              return x - log(w);
            }

            if (x < -0.18) {
              h = x + 0.3;
              h = h / 0.7;
              w1 = a - h * 0.3;
            } else if (x > 0.18) {
              h = 0.75 * x - 0.25;
              w1 = b + h / 3.0;
            } else {
              h = x;
              w1 = 0.0;
            }

            r = h / (h + 2.0);
            t = r * r;
            w = ((p2 * t + p1) * t + p0) / ((q2 * t + q1) * t + 1.0);
            return 2.0 * t * (1.0 / (1.0 - r) - r * w) + w1;
          }
        }, {
          key: "sign",
          value: function sign(a1, a2) {
            return a2 >= 0 ? Math.abs(a1) : -Math.abs(a1);
          }
        }, {
          key: "spmpar",
          value: function spmpar(i) {
            var emin = 0;
            var emax = 0;
            var binv = 0.0;
            var bm1 = 0.0;
            var ibeta = 0;
            var b = 0.0;
            var m = 0;
            var one = 0.0;
            var w = 0.0;
            var z = 0.0;

            if (i > 1) {
              if (i > 2) {
                ibeta = Toms708.ipmpar(4);
                m = Toms708.ipmpar(5);
                emax = Toms708.ipmpar(7);
                b = ibeta;
                bm1 = ibeta - 1;
                one = 1.0;
                z = Math.pow(b, m - 1);
                w = ((z - one) * b + bm1) / (b * z);
                z = Math.pow(b, emax - 2);
                return w * z * b * b;
              } else {
                b = Toms708.ipmpar(4);
                emin = Toms708.ipmpar(6);
                one = 1.0;
                binv = one / b;
                w = Math.pow(b, emin + 2);
                return w * binv * binv * binv;
              }
            }

            b = Toms708.ipmpar(4);
            m = Toms708.ipmpar(5);
            return Math.pow(b, 1 - m);
          }
        }]);

        return Toms708;
      }();

      exports.Toms708 = Toms708;
      /***/
    },
    /* 116 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _general_1 = __webpack_require__(0);

      var debug = __webpack_require__(1);

      var r_func_1 = __webpack_require__(2);

      var log = Math.log,
          exp = Math.exp;
      var ISNAN = Number.isNaN;
      var printer = debug('dexp');

      function dexp(x, scale) {
        var give_log = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        return r_func_1.map(x)(function (fx) {
          if (ISNAN(fx) || ISNAN(scale)) {
            return NaN;
          }

          if (scale <= 0.0) {
            return _general_1.ML_ERR_return_NAN(printer);
          }

          if (fx < 0) {
            return _general_1.R_D__0(give_log);
          }

          return give_log ? -fx / scale - log(scale) : exp(-fx / scale) / scale;
        });
      }

      exports.dexp = dexp;
      /***/
    },
    /* 117 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _general_1 = __webpack_require__(0);

      var r_func_1 = __webpack_require__(2);

      var debug = __webpack_require__(1);

      var expm1_1 = __webpack_require__(3);

      var expm1 = Math.expm1;
      var ISNAN = Number.isNaN;
      var printer = debug('pexp');

      function pexp(q, scale, lower_tail, log_p) {
        return r_func_1.map(q)(function (fx) {
          if (ISNAN(fx) || ISNAN(scale)) return fx + scale;

          if (scale < 0) {
            return _general_1.ML_ERR_return_NAN(printer);
          }

          if (fx <= 0) return _general_1.R_DT_0(lower_tail, log_p);
          fx = -(fx / scale);
          return lower_tail ? log_p ? expm1_1.R_Log1_Exp(fx) : -expm1(fx) : _general_1.R_D_exp(log_p, fx);
        });
      }

      exports.pexp = pexp;
      /***/
    },
    /* 118 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var r_func_1 = __webpack_require__(2);

      var expm1_1 = __webpack_require__(3);

      var ISNAN = Number.isNaN;
      var printer = debug('qexp');

      function qexp(_p, scale, lower_tail, log_p) {
        return r_func_1.map(_p)(function (p) {
          if (ISNAN(p) || ISNAN(scale)) return p + scale;
          if (scale < 0) return _general_1.ML_ERR_return_NAN(printer);

          var rc = _general_1.R_Q_P01_check(log_p, p);

          if (rc !== undefined) {
            return rc;
          }

          if (p === _general_1.R_DT_0(lower_tail, log_p)) return 0;
          return -scale * expm1_1.R_DT_Clog(lower_tail, log_p, p);
        });
      }

      exports.qexp = qexp;
      /***/
    },
    /* 119 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _general_1 = __webpack_require__(0);

      var debug = __webpack_require__(1);

      var sexp_1 = __webpack_require__(28);

      var R_FINITE = Number.isFinite;
      var printer = debug('rexp');

      function rexp() {
        var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var rng = arguments.length > 2 ? arguments[2] : undefined;
        var result = new Array(n).fill(0).map(function (m) {
          if (!R_FINITE(scale) || scale <= 0.0) {
            if (scale === 0) return 0;
            return _general_1.ML_ERR_return_NAN(printer);
          }

          return scale * sexp_1.exp_rand(rng.unif_rand);
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.rexp = rexp;
      /***/
    },
    /* 120 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var dbinom_1 = __webpack_require__(17);

      var dgamma_1 = __webpack_require__(21);

      var log = Math.log;
      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite,
          ML_POSINF = Number.POSITIVE_INFINITY;
      var printer_df = debug('df');

      function df(xx, m, n) {
        var giveLog = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        var fx = Array.isArray(xx) ? xx : [xx];
        var result = fx.map(function (x) {
          var p;
          var q;
          var f;
          var dens;

          if (ISNAN(x) || ISNAN(m) || ISNAN(n)) {
            return x + m + n;
          }

          if (m <= 0 || n <= 0) {
            return _general_1.ML_ERR_return_NAN(printer_df);
          }

          if (x < 0) {
            return _general_1.R_D__0(giveLog);
          }

          if (x === 0) {
            return m > 2 ? _general_1.R_D__0(giveLog) : m === 2 ? _general_1.R_D__1(giveLog) : ML_POSINF;
          }

          if (!R_FINITE(m) && !R_FINITE(n)) {
            if (x === 1) {
              return ML_POSINF;
            } else {
              return _general_1.R_D__0(giveLog);
            }
          }

          if (!R_FINITE(n)) {
            return dgamma_1.dgamma(x, m / 2, 2 / m, giveLog);
          }

          if (m > 1e14) {
            dens = dgamma_1.dgamma(1 / x, n / 2, 2 / n, giveLog);
            return giveLog ? dens - 2 * log(x) : dens / (x * x);
          }

          f = 1 / (n + x * m);
          q = n * f;
          p = x * m * f;

          if (m >= 2) {
            f = m * q / 2;
            dens = dbinom_1.dbinom_raw((m - 2) / 2, (m + n - 2) / 2, p, q, giveLog);
          } else {
            f = m * m * q / (2 * p * (m + n));
            dens = dbinom_1.dbinom_raw(m / 2, (m + n) / 2, p, q, giveLog);
          }

          return giveLog ? log(f) + dens : f * dens;
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.df = df;
      /***/
    },
    /* 121 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var dnbeta_1 = __webpack_require__(54);

      var dnchisq_1 = __webpack_require__(61);

      var dgamma_1 = __webpack_require__(21);

      var log1p = Math.log1p,
          log = Math.log;
      var R_FINITE = Number.isFinite,
          ISNAN = Number.isNaN,
          ML_POSINF = Number.POSITIVE_INFINITY;
      var printer = debug('dnf');

      function dnf(xx, df1, df2, ncp, giveLog) {
        var fx = Array.isArray(xx) ? xx : [xx];
        var result = fx.map(function (x) {
          var y;
          var z;
          var f;

          if (ISNAN(x) || ISNAN(df1) || ISNAN(df2) || ISNAN(ncp)) {
            return x + df2 + df1 + ncp;
          }

          if (df1 <= 0 || df2 <= 0 || ncp < 0) {
            return _general_1.ML_ERR_return_NAN(printer);
          }

          if (x < 0) {
            return _general_1.R_D__0(giveLog);
          }

          if (!R_FINITE(ncp)) {
            return _general_1.ML_ERR_return_NAN(printer);
          }

          if (!R_FINITE(df1) && !R_FINITE(df2)) {
            if (x === 1) return ML_POSINF;else return _general_1.R_D__0(giveLog);
          }

          if (!R_FINITE(df2)) return df1 * dnchisq_1.dnchisq(x * df1, df1, ncp, giveLog);

          if (df1 > 1e14 && ncp < 1e7) {
            f = 1 + ncp / df1;
            z = dgamma_1.dgamma(1 / x / f, df2 / 2, 2 / df2, giveLog);
            return giveLog ? z - 2 * log(x) - log(f) : z / (x * x) / f;
          }

          y = df1 / df2 * x;
          z = dnbeta_1.dnbeta(y / (1 + y), df1 / 2, df2 / 2, ncp, giveLog);
          return giveLog ? z + log(df1) - log(df2) - 2 * log1p(y) : z * (df1 / df2) / (1 + y) / (1 + y);
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.dnf = dnf;
      /***/
    },
    /* 122 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var pbeta_1 = __webpack_require__(12);

      var pchisq_1 = __webpack_require__(38);

      var ISNAN = Number.isNaN,
          ML_POSINF = Number.POSITIVE_INFINITY,
          ML_NAN = Number.NaN,
          ML_VALID = Number.isFinite;
      var M_LN2 = Math.LN2;
      var printer_pf = debug('pf');

      function pf(q, df1, df2) {
        var lowerTail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var logP = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        var fx = Array.isArray(q) ? q : [q];
        var result = fx.map(function (x) {
          if (ISNAN(x) || ISNAN(df1) || ISNAN(df2)) return x + df2 + df1;

          if (df1 <= 0 || df2 <= 0) {
            return _general_1.ML_ERR_return_NAN(printer_pf);
          }

          var rc = _general_1.R_P_bounds_01(lowerTail, logP, x, 0, ML_POSINF);

          if (rc !== undefined) {
            return rc;
          }

          if (df2 === ML_POSINF) {
            if (df1 === ML_POSINF) {
              if (x < 1) return _general_1.R_DT_0(lowerTail, logP);
              if (x === 1) return logP ? -M_LN2 : 0.5;
              if (x > 1) return _general_1.R_DT_1(lowerTail, logP);
            }

            return pchisq_1.pchisq(x * df1, df1, lowerTail, logP);
          }

          if (df1 === ML_POSINF) return pchisq_1.pchisq(df2 / x, df2, !lowerTail, logP);
          if (df1 * x > df2) x = pbeta_1.pbeta(df2 / (df2 + df1 * x), df2 / 2, df1 / 2, !lowerTail, logP);else x = pbeta_1.pbeta(df1 * x / (df2 + df1 * x), df1 / 2, df2 / 2, lowerTail, logP);
          return ML_VALID(x) ? x : ML_NAN;
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.pf = pf;
      /***/
    },
    /* 123 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var pnbeta_1 = __webpack_require__(35);

      var pnchisq_1 = __webpack_require__(39);

      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite,
          ML_POSINF = Number.POSITIVE_INFINITY;
      var printer_pnf = debug('pnf');

      function pnf(xx, df1, df2, ncp) {
        var lowerTail = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
        var logP = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
        var fx = Array.isArray(xx) ? xx : [xx];
        var result = fx.map(function (x) {
          var y;
          if (ISNAN(x) || ISNAN(df1) || ISNAN(df2) || ISNAN(ncp)) return x + df2 + df1 + ncp;
          if (df1 <= 0 || df2 <= 0 || ncp < 0) return _general_1.ML_ERR_return_NAN(printer_pnf);
          if (!R_FINITE(ncp)) return _general_1.ML_ERR_return_NAN(printer_pnf);
          if (!R_FINITE(df1) && !R_FINITE(df2)) return _general_1.ML_ERR_return_NAN(printer_pnf);

          var rc = _general_1.R_P_bounds_01(lowerTail, logP, x, 0, ML_POSINF);

          if (rc !== undefined) {
            return rc;
          }

          if (df2 > 1e8) return pnchisq_1.pnchisq(x * df1, df1, ncp, lowerTail, logP);
          y = df1 / df2 * x;
          return pnbeta_1.pnbeta2(y / (1 + y), 1 / (1 + y), df1 / 2, df2 / 2, ncp, lowerTail, logP);
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.pnf = pnf;
      /***/
    },
    /* 124 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var qbeta_1 = __webpack_require__(55);

      var qchisq_1 = __webpack_require__(40);

      var printer = debug('qf');
      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite,
          ML_NAN = Number.NaN,
          ML_POSINF = Number.POSITIVE_INFINITY,
          ML_VALID = Number.isFinite;

      function qf(pp, df1, df2, lower_tail, log_p) {
        var fp = Array.isArray(pp) ? pp : [pp];
        var result = fp.map(function (p) {
          if (ISNAN(p) || ISNAN(df1) || ISNAN(df2)) return p + df1 + df2;
          if (df1 <= 0 || df2 <= 0) return _general_1.ML_ERR_return_NAN(printer);

          var rc = _general_1.R_Q_P01_boundaries(lower_tail, log_p, p, 0, ML_POSINF);

          if (rc !== undefined) {
            return rc;
          }

          if (df1 <= df2 && df2 > 4e5) {
            if (!R_FINITE(df1)) return 1;
            return qchisq_1.qchisq(p, df1, lower_tail, log_p) / df1;
          }

          if (df1 > 4e5) {
            return df2 / qchisq_1.qchisq(p, df2, !lower_tail, log_p);
          }

          p = (1 / qbeta_1.qbeta(p, df2 / 2, df1 / 2, !lower_tail, log_p) - 1) * (df2 / df1);
          return ML_VALID(p) ? p : ML_NAN;
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.qf = qf;
      /***/
    },
    /* 125 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var qnbeta_1 = __webpack_require__(56);

      var qnchisq_1 = __webpack_require__(62);

      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite,
          ML_POSINF = Number.POSITIVE_INFINITY;
      var printer = debug('qnf');

      function qnf(pp, df1, df2, ncp) {
        var lowerTail = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
        var logP = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
        var fp = Array.isArray(pp) ? pp : [pp];
        var result = fp.map(function (p) {
          var y;
          if (ISNAN(p) || ISNAN(df1) || ISNAN(df2) || ISNAN(ncp)) return p + df1 + df2 + ncp;

          switch (true) {
            case df1 <= 0 || df2 <= 0 || ncp < 0:
            case !R_FINITE(ncp):
            case !R_FINITE(df1) && !R_FINITE(df2):
              return _general_1.ML_ERR_return_NAN(printer);

            default:
              break;
          }

          var rc = _general_1.R_Q_P01_boundaries(lowerTail, logP, p, 0, ML_POSINF);

          if (rc !== undefined) {
            return rc;
          }

          if (df2 > 1e8) return qnchisq_1.qnchisq(p, df1, ncp, lowerTail, logP) / df1;
          y = qnbeta_1.qnbeta(p, df1 / 2, df2 / 2, ncp, lowerTail, logP);
          return y / (1 - y) * (df2 / df1);
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.qnf = qnf;
      /***/
    },
    /* 126 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var rchisq_1 = __webpack_require__(13);

      var r_func_1 = __webpack_require__(2);

      var printer = debug('rf');
      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite;
      var sequence = r_func_1.seq()();

      function rf(n, n1, n2, rng) {
        return r_func_1.map(sequence(n))(function () {
          var v1;
          var v2;

          if (ISNAN(n1) || ISNAN(n2) || n1 <= 0 || n2 <= 0) {
            return _general_1.ML_ERR_return_NAN(printer);
          }

          v1 = R_FINITE(n1) ? rchisq_1.rchisq(1, n1, rng) / n1 : 1;
          v2 = R_FINITE(n2) ? rchisq_1.rchisq(1, n2, rng) / n2 : 1;
          return v1 / v2;
        });
      }

      exports.rf = rf;
      /***/
    },
    /* 127 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var fmax2 = Math.max,
          log1p = Math.log1p,
          exp = Math.exp,
          fabs = Math.abs;

      function logspace_add(logx, logy) {
        return fmax2(logx, logy) + log1p(exp(-fabs(logx - logy)));
      }

      exports.logspace_add = logspace_add;
      /***/
    },
    /* 128 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var toms708_1 = __webpack_require__(9);

      var r_func_1 = __webpack_require__(2);

      var printer = debug('dpsifn');
      var ML_NAN = Number.NaN,
          ML_POSINF = Number.POSITIVE_INFINITY,
          ISNAN = Number.isNaN,
          DBL_EPSILON = Number.EPSILON;
      var n_max = 100;
      var pow = Math.pow,
          fabs = Math.abs,
          fmax2 = Math.max,
          fmin2 = Math.min,
          exp = Math.exp,
          log = Math.log,
          sin = Math.sin,
          cos = Math.cos,
          M_PI = Math.PI,
          round = Math.round,
          R_forceint = Math.round;

      function dpsifn(x, n, kode, m, ans, nz, ierr) {
        var bvalues = [1.0, -5.0e-1, 1.66666666666666667e-1, -3.33333333333333333e-2, 2.38095238095238095e-2, -3.33333333333333333e-2, 7.57575757575757576e-2, -2.53113553113553114e-1, 1.16666666666666667, -7.09215686274509804, 5.49711779448621554e1, -5.29124242424242424e2, 6.1921231884057971e3, -8.65802531135531136e4, 1.42551716666666667e6, -2.7298231067816092e7, 6.01580873900642368e8, -1.51163157670921569e10, 4.29614643061166667e11, -1.37116552050883328e13, 4.88332318973593167e14, -1.92965793419400681e16];
        var nx;
        var xinc = 0;
        var xdmln = 0;
        var i;
        var j;
        var k;
        var mm;
        var mx;
        var nn;
        var np;
        var fn;
        var arg;
        var den;
        var elim;
        var eps;
        var fln;
        var fx;
        var rln;
        var rxsq;
        var r1m4;
        var r1m5;
        var s;
        var slope;
        var t;
        var ta;
        var tk;
        var tol;
        var tols;
        var tss;
        var tst;
        var tt;
        var t1;
        var t2;
        var wdtol;
        var xdmy = 0;
        var xln = 0.0;
        var xm;
        var xmin;
        var xq;
        var yint;
        var trm = new Array(23).fill(0);
        var trmr = new Array(n_max + 1).fill(0);
        ierr.val = 0;

        if (n < 0 || kode < 1 || kode > 2 || m < 1) {
          ierr.val = 1;
          return;
        }

        if (x <= 0) {
          if (x === round(x)) {
            for (j = 0; j < m; j++) {
              ans[j] = (j + n) % 2 ? ML_POSINF : ML_NAN;
            }

            return;
          }

          dpsifn(1 - x, n, 1, m, ans, nz, ierr);

          if (m > 1 || n > 3) {
            ierr.val = 4;
            return;
          }

          x *= M_PI;
          if (n === 0) tt = cos(x) / sin(x);else if (n === 1) tt = -1 / _general_1.R_pow_di(sin(x), 2);else if (n === 2) tt = 2 * cos(x) / _general_1.R_pow_di(sin(x), 3);else if (n === 3) tt = -2 * (2 * _general_1.R_pow_di(cos(x), 2) + 1) / _general_1.R_pow_di(sin(x), 4);else tt = ML_NAN;
          s = n % 2 ? -1 : 1;
          t1 = t2 = s = 1;

          for (k = 0, j = k - n; j < m; k++, j++, s = -s) {
            t1 *= M_PI;
            if (k >= 2) t2 *= k;
            if (j >= 0) ans[j] = s * (ans[j] + t1 / t2 * tt);
          }

          if (n === 0 && kode === 2) ans[0] += xln;
          return;
        }

        nz.val = 0;
        xln = log(x);

        if (kode === 1 && m === 1) {
          var lrg = 1 / (2 * DBL_EPSILON);

          if (n === 0 && x * xln > lrg) {
            ans[0] = -xln;
            return;
          } else if (n >= 1 && x > n * lrg) {
            ans[0] = exp(-n * xln) / n;
            return;
          }
        }

        mm = m;
        nx = _general_1.imin2(-_general_1.DBL_MIN_EXP, _general_1.DBL_MAX_EXP);
        r1m5 = _general_1.M_LOG10_2;
        r1m4 = Number.EPSILON * 0.5;
        wdtol = fmax2(r1m4, 0.5e-18);
        elim = 2.302 * (nx * r1m5 - 3.0);
        var L10 = false;
        var L20 = false;
        var L30 = false;

        while (true) {
          nn = n + mm - 1;
          fn = nn;
          t = (fn + 1) * xln;

          if (fabs(t) > elim) {
            if (t <= 0.0) {
              nz.val = 0;
              ierr.val = 2;
              return;
            }
          } else {
            if (x < wdtol) {
              ans[0] = _general_1.R_pow_di(x, -n - 1);

              if (mm !== 1) {
                for (k = 1; k < mm; k++) {
                  ans[k] = ans[k - 1] / x;
                }
              }

              if (n === 0 && kode === 2) ans[0] += xln;
              return;
            }

            rln = r1m5 * _general_1.DBL_MANT_DIG;
            rln = fmin2(rln, 18.06);
            fln = fmax2(rln, 3.0) - 3.0;
            yint = 3.5 + 0.4 * fln;
            slope = 0.21 + fln * (0.0006038 * fln + 0.008677);
            xm = yint + slope * fn;
            mx = (xm >> 0) + 1;
            xmin = mx;

            if (n !== 0) {
              xm = -2.302 * rln - fmin2(0.0, xln);
              arg = xm / n;
              arg = fmin2(0.0, arg);
              eps = exp(arg);
              xm = 1.0 - eps;
              if (fabs(arg) < 1.0e-3) xm = -arg;
              fln = x * xm / eps;
              xm = xmin - x;
              if (xm > 7.0 && fln < 15.0) break;
            }

            xdmy = x;
            xdmln = xln;
            xinc = 0.0;

            if (x < xmin) {
              nx = x >> 0;
              xinc = xmin - nx;
              xdmy = x + xinc;
              xdmln = log(xdmy);
            }

            t = fn * xdmln;
            t1 = xdmln + xdmln;
            t2 = t + xdmln;
            tk = fmax2(fabs(t), fmax2(fabs(t1), fabs(t2)));

            if (tk <= elim) {
              L10 = true;
              break;
            }
          }

          nz.val++;
          mm--;
          ans[mm] = 0;

          if (mm === 0) {
            return;
          }
        }

        if (!L10) {
          nn = (fln >> 0) + 1;
          np = n + 1;
          t1 = (n + 1) * xln;
          t = exp(-t1);
          s = t;
          den = x;

          for (i = 1; i <= nn; i++) {
            den += 1;
            trm[i] = pow(den, -np);
            s += trm[i];
          }

          ans[0] = s;
          if (n === 0 && kode === 2) ans[0] = s + xln;

          if (mm !== 1) {
            tol = wdtol / 5.0;

            for (j = 1; j < mm; j++) {
              t /= x;
              s = t;
              tols = t * tol;
              den = x;

              for (i = 1; i <= nn; i++) {
                den += 1;
                trm[i] /= den;
                s += trm[i];
                if (trm[i] < tols) break;
              }

              ans[j] = s;
            }
          }

          return;
        }

        tss = exp(-t);
        tt = 0.5 / xdmy;
        t1 = tt;
        tst = wdtol * tt;
        if (nn !== 0) t1 = tt + 1.0 / fn;
        rxsq = 1.0 / (xdmy * xdmy);
        ta = 0.5 * rxsq;
        t = (fn + 1) * ta;
        s = t * bvalues[2];

        if (fabs(s) >= tst) {
          tk = 2.0;

          for (k = 4; k <= 22; k++) {
            t = t * ((tk + fn + 1) / (tk + 1.0)) * ((tk + fn) / (tk + 2.0)) * rxsq;
            trm[k] = t * bvalues[k - 1];
            if (fabs(trm[k]) < tst) break;
            s += trm[k];
            tk += 2;
          }
        }

        s = (s + t1) * tss;

        while (true) {
          if (xinc !== 0.0) {
            nx = xinc >> 0;
            np = nn + 1;

            if (nx > n_max) {
              nz.val = 0;
              ierr.val = 3;
              return;
            } else {
              if (nn === 0) {
                L20 = true;
                break;
              }

              xm = xinc - 1.0;
              fx = x + xm;

              for (i = 1; i <= nx; i++) {
                trmr[i] = pow(fx, -np);
                s += trmr[i];
                xm -= 1;
                fx = x + xm;
              }
            }
          }

          ans[mm - 1] = s;

          if (fn === 0) {
            L30 = true;
            break;
          }

          for (j = 2; j <= mm; j++) {
            fn--;
            tss *= xdmy;
            t1 = tt;
            if (fn !== 0) t1 = tt + 1.0 / fn;
            t = (fn + 1) * ta;
            s = t * bvalues[2];

            if (fabs(s) >= tst) {
              tk = 4 + fn;

              for (k = 4; k <= 22; k++) {
                trm[k] = trm[k] * (fn + 1) / tk;
                if (fabs(trm[k]) < tst) break;
                s += trm[k];
                tk += 2;
              }
            }

            s = (s + t1) * tss;

            if (xinc !== 0.0) {
              if (fn === 0) {
                L20 = true;
                break;
              }

              xm = xinc - 1.0;
              fx = x + xm;

              for (i = 1; i <= nx; i++) {
                trmr[i] = trmr[i] * fx;
                s += trmr[i];
                xm -= 1;
                fx = x + xm;
              }
            }

            ans[mm - j] = s;

            if (fn === 0) {
              L30 = true;
              break;
            }
          }

          return;
        }

        printer(L20 ? 'goto L20 was set!' : 'goto L20 was not set');

        if (!L30) {
          for (i = 1; i <= nx; i++) {
            s += 1 / (x + (nx - i));
          }
        }

        if (kode !== 2) ans[0] = s - xdmln;else if (xdmy !== x) {
          xq = xdmy / x;
          ans[0] = s - log(xq);
        }
        return;
      }

      var print_psigamma = debug('psigamma');

      function psigamma(_x) {
        var _deriv = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        var ans = [0];
        var nz = new toms708_1.NumberW();
        var ierr = new toms708_1.NumberW();
        return r_func_1.multiplexer(_x, _deriv)(function (x, deriv) {
          var k;
          var n;
          nz.val = 0;
          ierr.val = 0;
          ans[0] = 0;
          if (ISNAN(x)) return x;
          deriv = R_forceint(deriv);
          n = deriv >> 0;

          if (n > n_max) {
            print_psigamma('"deriv = %d > %d (= n_max)', n, n_max);
            return ML_NAN;
          }

          dpsifn(x, n, 1, 1, ans, nz, ierr);

          if (ierr.val !== 0) {
            return ML_NAN;
          }

          ans[0] = -ans[0];

          for (k = 1; k <= n; k++) {
            ans[0] *= -k;
          }

          return ans[0];
        });
      }

      exports.psigamma = psigamma;

      function digamma(_x) {
        var ans = [0];
        var nz = new toms708_1.NumberW();
        var ierr = new toms708_1.NumberW();
        return r_func_1.map(_x)(function (x) {
          ans[0] = 0;
          nz.val = 0;
          ierr.val = 0;
          if (ISNAN(x)) return x;
          dpsifn(x, 0, 1, 1, ans, nz, ierr);

          if (ierr.val !== 0) {
            return ML_NAN;
          }

          return -ans[0];
        });
      }

      exports.digamma = digamma;

      function trigamma(_x) {
        var ans = [0];
        var nz = new toms708_1.NumberW(0);
        var ierr = new toms708_1.NumberW(0);
        return r_func_1.map(_x)(function (x) {
          ans[0] = 0;
          nz.val = 0;
          ierr.val = 0;
          if (ISNAN(x)) return x;
          dpsifn(x, 1, 1, 1, ans, nz, ierr);

          if (ierr.val !== 0) {
            return ML_NAN;
          }

          return ans[0];
        });
      }

      exports.trigamma = trigamma;

      function tetragamma(_x) {
        var ans = [0];
        var nz = new toms708_1.NumberW();
        var ierr = new toms708_1.NumberW();
        return r_func_1.map(_x)(function (x) {
          ans[0] = 0;
          nz.val = 0;
          ierr.val = 0;
          if (ISNAN(x)) return x;
          dpsifn(x, 2, 1, 1, ans, nz, ierr);

          if (ierr.val !== 0) {
            return ML_NAN;
          }

          return -2.0 * ans[0];
        });
      }

      exports.tetragamma = tetragamma;

      function pentagamma(_x) {
        var ans = [0];
        var nz = new toms708_1.NumberW();
        var ierr = new toms708_1.NumberW();
        return r_func_1.map(_x)(function (x) {
          ans[0] = 0;
          nz.val = 0;
          ierr.val = 0;
          if (ISNAN(x)) return x;
          dpsifn(x, 3, 1, 1, ans, nz, ierr);

          if (ierr.val !== 0) {
            return ML_NAN;
          }

          return 6.0 * ans[0];
        });
      }

      exports.pentagamma = pentagamma;
      /***/
    },
    /* 129 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var dbinom_1 = __webpack_require__(17);

      var _general_1 = __webpack_require__(0);

      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite;
      var R_forceint = Math.round,
          log = Math.log;
      var printer = debug('dgeom');

      function dgeom(xx, p) {
        var giveLog = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var fx = Array.isArray(xx) ? xx : [xx];
        var result = fx.map(function (x) {
          var prob;
          if (ISNAN(x) || ISNAN(p)) return x + p;

          if (p <= 0 || p > 1) {
            return _general_1.ML_ERR_return_NAN(printer);
          }

          var rc = _general_1.R_D_nonint_check(giveLog, x, printer);

          if (rc !== undefined) {
            return rc;
          }

          if (x < 0 || !R_FINITE(x) || p === 0) {
            return _general_1.R_D__0(giveLog);
          }

          x = R_forceint(x);
          prob = dbinom_1.dbinom_raw(0, x, p, 1 - p, giveLog);
          return giveLog ? log(p) + prob : p * prob;
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.dgeom = dgeom;
      /***/
    },
    /* 130 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var expm1_1 = __webpack_require__(3);

      var expm1 = Math.expm1,
          log1p = Math.log1p,
          log = Math.log,
          exp = Math.exp,
          floor = Math.floor;
      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite;
      var printer = debug('pgeom');

      function pgeom(xx, p) {
        var lowerTail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var logP = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        var fx = Array.isArray(xx) ? xx : [xx];
        var result = fx.map(function (x) {
          if (ISNAN(x) || ISNAN(p)) return x + p;

          if (p <= 0 || p > 1) {
            return _general_1.ML_ERR_return_NAN(printer);
          }

          if (x < 0) return _general_1.R_DT_0(lowerTail, logP);
          if (!R_FINITE(x)) return _general_1.R_DT_1(lowerTail, logP);
          x = floor(x + 1e-7);

          if (p === 1) {
            x = lowerTail ? 1 : 0;
            return logP ? log(x) : x;
          }

          x = log1p(-p) * (x + 1);
          if (logP) return expm1_1.R_DT_Clog(lowerTail, logP, x);else return lowerTail ? -expm1(x) : exp(x);
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.pgeom = pgeom;
      /***/
    },
    /* 131 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var expm1_1 = __webpack_require__(3);

      var ceil = Math.ceil,
          fmax2 = Math.max,
          log1p = Math.log1p;
      var ML_POSINF = Number.POSITIVE_INFINITY,
          ISNAN = Number.isNaN;
      var printer = debug('qgeom');

      function qgeom(pp, prob) {
        var lower_tail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var log_p = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        var fp = Array.isArray(pp) ? pp : [pp];
        var result = fp.map(function (p) {
          if (prob <= 0 || prob > 1) {
            return _general_1.ML_ERR_return_NAN(printer);
          }

          var rc = _general_1.R_Q_P01_boundaries(lower_tail, log_p, p, 0, ML_POSINF);

          if (rc !== undefined) {
            return rc;
          }

          if (ISNAN(p) || ISNAN(prob)) return p + prob;
          if (prob === 1) return 0;
          return fmax2(0, ceil(expm1_1.R_DT_Clog(lower_tail, log_p, p) / log1p(-prob) - 1 - 1e-12));
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.qgeom = qgeom;
      /***/
    },
    /* 132 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var sexp_1 = __webpack_require__(28);

      var rpois_1 = __webpack_require__(32);

      var R_FINITE = Number.isFinite;
      var printer = debug('rgeom');

      function rgeom(N, p, rng) {
        var result = new Array(N).fill(0).map(function () {
          if (!R_FINITE(p) || p <= 0 || p > 1) return _general_1.ML_ERR_return_NAN(printer);
          return rpois_1.rpois(1, sexp_1.exp_rand(rng.unif_rand) * ((1 - p) / p), rng);
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.rgeom = rgeom;
      /***/
    },
    /* 133 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var lbeta_1 = __webpack_require__(11);

      var log = Math.log;

      function lfastchoose(n, k) {
        return -log(n + 1) - lbeta_1.internal_lbeta(n - k + 1, k + 1);
      }

      exports.lfastchoose = lfastchoose;
      /***/
    },
    /* 134 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var expm1_1 = __webpack_require__(3);

      var r_func_1 = __webpack_require__(2);

      var dhyper_1 = __webpack_require__(69);

      var floor = Math.floor,
          R_forceint = Math.round,
          log1p = Math.log1p;
      var DBL_EPSILON = Number.EPSILON,
          ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite;

      function pdhyper(x, NR, NB, n, log_p) {
        var sum = 0;
        var term = 1;

        while (x > 0 && term >= DBL_EPSILON * sum) {
          term *= x * (NB - n + x) / (n + 1 - x) / (NR + 1 - x);
          sum += term;
          x--;
        }

        var ss = sum;
        return log_p ? log1p(ss) : 1 + ss;
      }

      var printer_phyper = debug('phyper');

      function phyper(xx, nr, nb, nn) {
        var lowerTail = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
        var logP = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
        return r_func_1.map(xx)(function (x) {
          var d;
          var pd;
          var lower_tail = lowerTail;
          var log_p = logP;
          var NR = nr;
          var NB = nb;
          var n = nn;
          if (ISNAN(x) || ISNAN(NR) || ISNAN(NB) || ISNAN(n)) return x + NR + NB + n;
          x = floor(x + 1e-7);
          NR = R_forceint(NR);
          NB = R_forceint(NB);
          n = R_forceint(n);

          if (NR < 0 || NB < 0 || !R_FINITE(NR + NB) || n < 0 || n > NR + NB) {
            return _general_1.ML_ERR_return_NAN(printer_phyper);
          }

          if (x * (NR + NB) > n * NR) {
            var oldNB = NB;
            NB = NR;
            NR = oldNB;
            x = n - x - 1;
            lower_tail = !lower_tail;
          }

          if (x < 0) return _general_1.R_DT_0(lower_tail, log_p);
          if (x >= NR || x >= n) return _general_1.R_DT_1(lower_tail, log_p);
          d = dhyper_1.dhyper(x, NR, NB, n, log_p);
          pd = pdhyper(x, NR, NB, n, log_p);
          return log_p ? expm1_1.R_DT_log(lower_tail, log_p, d + pd) : _general_1.R_D_Lval(lower_tail, d * pd);
        });
      }

      exports.phyper = phyper;
      /***/
    },
    /* 135 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var rbinom_1 = __webpack_require__(36);

      var _general_1 = __webpack_require__(0);

      var qhyper_1 = __webpack_require__(70);

      var log = Math.log,
          R_forceint = Math.round,
          exp = Math.exp,
          sqrt = Math.sqrt;
      var R_FINITE = Number.isFinite,
          INT_MAX = Number.MAX_SAFE_INTEGER;
      var printer_afc = debug('afc');

      function afc(i) {
        var al = [0.0, 0.0, 0.69314718055994530941723212145817, 1.7917594692280550008124773583807, 3.17805383034794561964694160129705, 4.78749174278204599424770093452324, 6.57925121201010099506017829290394, 8.52516136106541430016553103634712];

        if (i < 0) {
          printer_afc('rhyper.c: afc(i), i=%d < 0 -- SHOULD NOT HAPPEN!', i);
          return -1;
        }

        if (i <= 7) {
          return al[i];
        }

        var di = i;
        var i2 = di * di;
        return (di + 0.5) * log(di) - di + _general_1.M_LN_SQRT_2PI + (0.0833333333333333 - 0.00277777777777778 / i2) / di;
      }

      exports.afc = afc;

      function rhyper(N, nn1in, nn2in, kkin, rng) {
        var result = new Array(N).fill(0).map(function () {
          return _rhyper(nn1in, nn2in, kkin, rng);
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.rhyper = rhyper;
      var printer_rhyper = debug('_rhyper');

      function _rhyper(nn1in, nn2in, kkin, rng) {
        var nn1 = 0;
        var nn2 = 0;
        var kk = 0;
        var ix = 0;
        var setup1 = false;
        var setup2 = false;
        var ks = -1;
        var n1s = -1;
        var n2s = -1;
        var m = 0;
        var minjx = 0;
        var maxjx = 0;
        var k = 0;
        var n1 = 0;
        var n2 = 0;
        var tn = 0;
        var w = 0;
        var a = 0;
        var d = 0;
        var s = 0;
        var xl = 0;
        var xr = 0;
        var kl = 0;
        var kr = 0;
        var lamdl = 0;
        var lamdr = 0;
        var p1 = 0;
        var p2 = 0;
        var p3 = 0;
        if (!R_FINITE(nn1in) || !R_FINITE(nn2in) || !R_FINITE(kkin)) return _general_1.ML_ERR_return_NAN(printer_rhyper);
        nn1in = R_forceint(nn1in);
        nn2in = R_forceint(nn2in);
        kkin = R_forceint(kkin);
        if (nn1in < 0 || nn2in < 0 || kkin < 0 || kkin > nn1in + nn2in) return _general_1.ML_ERR_return_NAN(printer_rhyper);

        if (nn1in >= INT_MAX || nn2in >= INT_MAX || kkin >= INT_MAX) {
          if (kkin === 1) {
            return rbinom_1.rbinom(1, kkin, nn1in / (nn1in + nn2in), rng);
          }

          return qhyper_1.qhyper(rng.unif_rand(), nn1in, nn2in, kkin, false, false);
        }

        nn1 = nn1in;
        nn2 = nn2in;
        kk = kkin;

        if (nn1 !== n1s || nn2 !== n2s) {
          setup1 = true;
          setup2 = true;
        } else if (kk !== ks) {
          setup1 = false;
          setup2 = true;
        } else {
          setup1 = false;
          setup2 = false;
        }

        if (setup1) {
          n1s = nn1;
          n2s = nn2;
          tn = nn1 + nn2;

          if (nn1 <= nn2) {
            n1 = nn1;
            n2 = nn2;
          } else {
            n1 = nn2;
            n2 = nn1;
          }
        }

        if (setup2) {
          ks = kk;

          if (kk + kk >= tn) {
            k = tn - kk;
          } else {
            k = kk;
          }
        }

        if (setup1 || setup2) {
          m = (k + 1) * (n1 + 1) / (tn + 2);
          minjx = _general_1.imax2(0, k - n2);
          maxjx = _general_1.imin2(n1, k);
          printer_rhyper('rhyper(nn1=%d, nn2=%d, kk=%d), setup: floor(mean)= m=%d, jx in (%d..%d)', nn1, nn2, kk, m, minjx, maxjx);
        }

        if (minjx === maxjx) {
          printer_rhyper('rhyper(), branch I (degenerate)');
          ix = maxjx;
        } else if (m - minjx < 10) {
          var scale = 1e25;
          var con = 57.5646273248511421;

          if (setup1 || setup2) {
            var lw;

            if (k < n2) {
              lw = afc(n2) + afc(n1 + n2 - k) - afc(n2 - k) - afc(n1 + n2);
            } else {
              lw = afc(n1) + afc(k) - afc(k - n2) - afc(n1 + n2);
            }

            w = exp(lw + con);
          }

          var p = 0;
          var u = 0;
          printer_rhyper('rhyper(), branch II; w = %d > 0', w);
          var goto_L10 = false;

          while (true) {
            p = w;
            ix = minjx;
            u = rng.unif_rand() * scale;
            printer_rhyper('  _new_ u = %d', u);

            while (u > p) {
              u -= p;
              p *= (n1 - ix) * (k - ix);
              ix++;
              p = p / ix / (n2 - k + ix);
              printer_rhyper('       ix=%d, u=%d, p=%d (u-p=%d)\n', ix, u, p, u - p);

              if (ix > maxjx) {
                goto_L10 = true;
                break;
              }
            }

            if (!goto_L10) {
              break;
            }
          }
        } else {
          if (setup1 || setup2) {
            s = sqrt((tn - k) * k * n1 * n2 / (tn - 1) / tn / tn);
            d = 1.5 * s + 0.5;
            xl = m - d + 0.5;
            xr = m + d + 0.5;
            a = afc(m) + afc(n1 - m) + afc(k - m) + afc(n2 - k + m);
            kl = exp(a - afc(xl) - afc(n1 - xl) - afc(k - xl) - afc(n2 - k + xl));
            kr = exp(a - afc(xr - 1) - afc(n1 - xr + 1) - afc(k - xr + 1) - afc(n2 - k + xr - 1));
            lamdl = -log(xl * (n2 - k + xl) / (n1 - xl + 1) / (k - xl + 1));
            lamdr = -log((n1 - xr + 1) * (k - xr + 1) / xr / (n2 - k + xr));
            p1 = d + d;
            p2 = p1 + kl / lamdl;
            p3 = p2 + kr / lamdr;
          }

          printer_rhyper('rhyper(), branch III {accept/reject}: (xl,xr)= (%d,%d); (lamdl,lamdr)= (%d,%d)\n', xl, xr, lamdl, lamdr);
          printer_rhyper('-------- p123= c(%d,%d,%d)\n', p1, p2, p3);
          var n_uv = 0;

          while (true) {
            var _u4 = rng.unif_rand() * p3;

            var v = rng.unif_rand();
            n_uv++;

            if (n_uv >= 10000) {
              printer_rhyper('rhyper() branch III: giving up after %d rejections', n_uv);
              return _general_1.ML_ERR_return_NAN(printer_rhyper);
            }

            printer_rhyper(' ... L30: new (u=%d, v ~ U[0,1])[%d]\n', _u4, n_uv);

            if (_u4 < p1) {
              ix = xl + _u4;
            } else if (_u4 <= p2) {
              ix = xl + log(v) / lamdl;

              if (ix < minjx) {
                continue;
              }

              v = v * (_u4 - p1) * lamdl;
            } else {
              ix = xr - log(v) / lamdr;

              if (ix > maxjx) {
                continue;
              }

              v = v * (_u4 - p2) * lamdr;
            }

            var reject = true;

            if (m < 100 || ix <= 50) {
              var i = void 0;
              var f = 1.0;

              if (m < ix) {
                for (i = m + 1; i <= ix; i++) {
                  f = f * (n1 - i + 1) * (k - i + 1) / (n2 - k + i) / i;
                }
              } else if (m > ix) {
                for (i = ix + 1; i <= m; i++) {
                  f = f * i * (n2 - k + i) / (n1 - i + 1) / (k - i + 1);
                }
              }

              if (v <= f) {
                reject = false;
              }
            } else {
              var deltal = 0.0078;
              var deltau = 0.0034;
              var e = void 0;
              var g = void 0;
              var r = void 0;
              var t = void 0;
              var y = void 0;
              var de = void 0;
              var dg = void 0;
              var dr = void 0;
              var ds = void 0;
              var dt = void 0;
              var gl = void 0;
              var gu = void 0;
              var nk = void 0;
              var nm = void 0;
              var ub = void 0;
              var xk = void 0;
              var xm = void 0;
              var xn = void 0;
              var y1 = void 0;
              var ym = void 0;
              var yn = void 0;
              var yk = void 0;
              var alv = void 0;
              printer_rhyper(" ... accept/reject 'large' case v=%d", v);
              y = ix;
              y1 = y + 1.0;
              ym = y - m;
              yn = n1 - y + 1.0;
              yk = k - y + 1.0;
              nk = n2 - k + y1;
              r = -ym / y1;
              s = ym / yn;
              t = ym / yk;
              e = -ym / nk;
              g = yn * yk / (y1 * nk) - 1.0;
              dg = 1.0;
              if (g < 0.0) dg = 1.0 + g;
              gu = g * (1.0 + g * (-0.5 + g / 3.0));
              gl = gu - 0.25 * (g * g * g * g) / dg;
              xm = m + 0.5;
              xn = n1 - m + 0.5;
              xk = k - m + 0.5;
              nm = n2 - k + xm;
              ub = y * gu - m * gl + deltau + xm * r * (1 + r * (-0.5 + r / 3.0)) + xn * s * (1 + s * (-0.5 + s / 3.0)) + xk * t * (1 + t * (-0.5 + t / 3.0)) + nm * e * (1 + e * (-0.5 + e / 3.0));
              alv = log(v);

              if (alv > ub) {
                reject = true;
              } else {
                dr = xm * (r * r * r * r);
                if (r < 0.0) dr /= 1.0 + r;
                ds = xn * (s * s * s * s);
                if (s < 0.0) ds /= 1.0 + s;
                dt = xk * (t * t * t * t);
                if (t < 0.0) dt /= 1.0 + t;
                de = nm * (e * e * e * e);
                if (e < 0.0) de /= 1.0 + e;

                if (alv < ub - 0.25 * (dr + ds + dt + de) + (y + m) * (gl - gu) - deltal) {
                  reject = false;
                } else {
                  if (alv <= a - afc(ix) - afc(n1 - ix) - afc(k - ix) - afc(n2 - k + ix)) {
                    reject = false;
                  } else {
                    reject = true;
                  }
                }
              }
            }

            if (reject) {
              continue;
            }

            break;
          }
        }

        if (kk + kk >= tn) {
          if (nn1 > nn2) {
            ix = kk - nn2 + ix;
          } else {
            ix = nn1 - ix;
          }
        } else {
          if (nn1 > nn2) ix = kk - ix;
        }

        return ix;
      }
      /***/

    },
    /* 136 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var beta_1 = __webpack_require__(34);

      exports.Beta = beta_1.Beta;

      var binomial_1 = __webpack_require__(81);

      exports.Binomial = binomial_1.Binomial;

      var binomial_negative_1 = __webpack_require__(80);

      exports.NegativeBinomial = binomial_negative_1.NegativeBinomial;

      var cauchy_1 = __webpack_require__(82);

      exports.Cauchy = cauchy_1.Cauchy;

      var chebyshev_1 = __webpack_require__(83);

      exports.ChebyshevSeries = chebyshev_1.ChebyshevSeries;

      var chi_2_1 = __webpack_require__(84);

      exports.ChiSquared = chi_2_1.ChiSquared;

      var exp_1 = __webpack_require__(86);

      exports.Exponential = exp_1.Exponential;

      var f_distro_1 = __webpack_require__(87);

      exports.FDist = f_distro_1.FDist;

      var gamma_1 = __webpack_require__(25);

      exports.Gamma = gamma_1.Gamma;

      var geometric_1 = __webpack_require__(88);

      exports.Geometric = geometric_1.Geometric;

      var hypergeometric_1 = __webpack_require__(89);

      exports.HyperGeometric = hypergeometric_1.HyperGeometric;

      var logis_1 = __webpack_require__(90);

      exports.Logistic = logis_1.Logistic;

      var lognormal_1 = __webpack_require__(91);

      exports.LogNormal = lognormal_1.LogNormal;

      var multinom_1 = __webpack_require__(92);

      exports.Multinomial = multinom_1.Multinomial;

      var normal_1 = __webpack_require__(93);

      exports.Normal = normal_1.Normal;

      var poisson_1 = __webpack_require__(94);

      exports.Poisson = poisson_1.Poisson;

      var rng_1 = __webpack_require__(16);

      exports.rng = rng_1.rng;
      exports.IRNG = rng_1.IRNG;
      exports.IRNGNormal = rng_1.IRNGNormal;

      var signrank_1 = __webpack_require__(95);

      exports.SignRank = signrank_1.SignRank;

      var student_t_1 = __webpack_require__(96);

      exports.StudentT = student_t_1.StudentT;

      var tukey_1 = __webpack_require__(97);

      exports.Tukey = tukey_1.Tukey;

      var uniform_1 = __webpack_require__(98);

      exports.Uniform = uniform_1.Uniform;

      var weibull_1 = __webpack_require__(99);

      exports.Weibull = weibull_1.Weibull;

      var wilcoxon_1 = __webpack_require__(100);

      exports.Wilcoxon = wilcoxon_1.Wilcoxon;

      var bessel_1 = __webpack_require__(79);

      var beta_2 = __webpack_require__(34);

      var common_1 = __webpack_require__(85);

      var gamma_2 = __webpack_require__(25);

      exports.special = Object.freeze(Object.assign({}, gamma_2.special, beta_2.special, common_1.special, bessel_1.special));

      var r_func_1 = __webpack_require__(2);

      exports.R = {
        any: r_func_1.any,
        arrayrify: r_func_1.arrayrify,
        asArray: r_func_1.asArray,
        div: r_func_1.div,
        flatten: r_func_1.flatten,
        isOdd: r_func_1.isOdd,
        map: r_func_1.map,
        each: r_func_1.each,
        mult: r_func_1.mult,
        multiplex: r_func_1.multiplex,
        multiplexer: r_func_1.multiplexer,
        numberPrecision: r_func_1.numberPrecision,
        selector: r_func_1.selector,
        seq: r_func_1.seq,
        sum: r_func_1.sum,
        summary: r_func_1.summary,
        Welch_Satterthwaite: r_func_1.Welch_Satterthwaite,
        c: r_func_1.flatten
      };
      /***/
    },
    /* 137 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var r_func_1 = __webpack_require__(2);

      var log = Math.log,
          exp = Math.exp,
          fabs = Math.abs;
      var ISNAN = Number.isNaN;
      var printer_dlogis = debug('dlogis');

      function dlogis(xx) {
        var location = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var give_log = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        return r_func_1.map(xx)(function (x) {
          var e;
          var f;
          if (ISNAN(x) || ISNAN(location) || ISNAN(scale)) return NaN;

          if (scale <= 0.0) {
            return _general_1.ML_ERR_return_NAN(printer_dlogis);
          }

          x = fabs((x - location) / scale);
          e = exp(-x);
          f = 1.0 + e;
          return give_log ? -(x + log(scale * f * f)) : e / (scale * f * f);
        });
      }

      exports.dlogis = dlogis;
      /***/
    },
    /* 138 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var r_func_1 = __webpack_require__(2);

      var exp = Math.exp,
          log1p = Math.log1p;
      var ISNAN = Number.isNaN;

      function Rf_log1pexp(x) {
        if (x <= 18) return log1p(exp(x));
        if (x > 33.3) return x;
        return x + exp(-x);
      }

      exports.Rf_log1pexp = Rf_log1pexp;
      var printer_plogis = debug('plogis');

      function plogis(xx) {
        var location = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var lower_tail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var log_p = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        return r_func_1.map(xx)(function (x) {
          if (ISNAN(x) || ISNAN(location) || ISNAN(scale)) return x + location + scale;

          if (scale <= 0.0) {
            return _general_1.ML_ERR_return_NAN(printer_plogis);
          }

          x = (x - location) / scale;

          if (ISNAN(x)) {
            return _general_1.ML_ERR_return_NAN(printer_plogis);
          }

          var rc = _general_1.R_P_bounds_Inf_01(lower_tail, log_p, x);

          if (rc !== undefined) {
            return rc;
          }

          if (log_p) {
            return -Rf_log1pexp(lower_tail ? -x : x);
          } else {
            return 1 / (1 + exp(lower_tail ? -x : x));
          }
        });
      }

      exports.plogis = plogis;
      /***/
    },
    /* 139 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var expm1_1 = __webpack_require__(3);

      var r_func_1 = __webpack_require__(2);

      var ISNAN = Number.isNaN,
          ML_POSINF = Number.POSITIVE_INFINITY,
          ML_NEGINF = Number.NEGATIVE_INFINITY;
      var log = Math.log;
      var printer_qlogis = debug('qlogis');

      function qlogis(pp) {
        var location = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var lower_tail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var log_p = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        return r_func_1.map(pp)(function (p) {
          if (ISNAN(p) || ISNAN(location) || ISNAN(scale)) return p + location + scale;

          var rc = _general_1.R_Q_P01_boundaries(lower_tail, log_p, p, ML_NEGINF, ML_POSINF);

          if (rc !== undefined) {
            return rc;
          }

          if (scale < 0) {
            return _general_1.ML_ERR_return_NAN(printer_qlogis);
          }

          if (scale === 0) return location;

          if (log_p) {
            if (lower_tail) p = p - expm1_1.R_Log1_Exp(p);else p = expm1_1.R_Log1_Exp(p) - p;
          } else p = log(lower_tail ? p / (1 - p) : (1 - p) / p);

          return location + scale * p;
        });
      }

      exports.qlogis = qlogis;
      /***/
    },
    /* 140 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var r_func_1 = __webpack_require__(2);

      var log = Math.log;
      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite;
      var sequence = r_func_1.seq()();
      var printer_rlogis = debug('rlogis');

      function rlogis(N) {
        var location = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var rng = arguments.length > 3 ? arguments[3] : undefined;
        return r_func_1.map(sequence(N))(function () {
          if (ISNAN(location) || !R_FINITE(scale)) {
            return _general_1.ML_ERR_return_NAN(printer_rlogis);
          }

          if (scale === 0 || !R_FINITE(location)) return location;else {
            var u = rng.unif_rand();
            return location + scale * log(u / (1 - u));
          }
        });
      }

      exports.rlogis = rlogis;
      /***/
    },
    /* 141 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var r_func_1 = __webpack_require__(2);

      var ISNAN = Number.isNaN,
          ML_POSINF = Number.POSITIVE_INFINITY;
      var log = Math.log,
          exp = Math.exp;
      var printer = debug('dlnorm');

      function dlnorm(x, meanlog, sdlog, give_log) {
        return r_func_1.map(x)(function (fx) {
          if (ISNAN(fx) || ISNAN(meanlog) || ISNAN(sdlog)) {
            return fx + meanlog + sdlog;
          }

          if (sdlog <= 0) {
            if (sdlog < 0) {
              return _general_1.ML_ERR_return_NAN(printer);
            }

            return log(fx) === meanlog ? ML_POSINF : _general_1.R_D__0(give_log);
          }

          if (fx <= 0) {
            return _general_1.R_D__0(give_log);
          }

          var y = (log(fx) - meanlog) / sdlog;
          return give_log ? -(_general_1.M_LN_SQRT_2PI + 0.5 * y * y + log(fx * sdlog)) : _general_1.M_1_SQRT_2PI * exp(-0.5 * y * y) / (fx * sdlog);
        });
      }

      exports.dlnorm = dlnorm;
      /***/
    },
    /* 142 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var pnorm_1 = __webpack_require__(19);

      var r_func_1 = __webpack_require__(2);

      var ISNAN = Number.isNaN;
      var log = Math.log;
      var printer = debug('plnorm');

      function plnorm(x) {
        var meanlog = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var sdlog = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var lower_tail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var log_p = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        return r_func_1.map(x)(function (fx) {
          if (ISNAN(fx) || ISNAN(meanlog) || ISNAN(sdlog)) return fx + meanlog + sdlog;
          if (sdlog < 0) return _general_1.ML_ERR_return_NAN(printer);
          if (fx > 0) return pnorm_1.pnorm5(log(fx), meanlog, sdlog, lower_tail, log_p);
          return _general_1.R_DT_0(lower_tail, log_p);
        });
      }

      exports.plnorm = plnorm;
      /***/
    },
    /* 143 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _general_1 = __webpack_require__(0);

      var qnorm_1 = __webpack_require__(6);

      var r_func_1 = __webpack_require__(2);

      var exp = Math.exp;
      var ISNAN = Number.isNaN,
          ML_POSINF = Number.POSITIVE_INFINITY;

      function qlnorm(pp) {
        var meanlog = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var sdlog = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var lower_tail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var log_p = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        return r_func_1.map(pp)(function (p) {
          if (ISNAN(p) || ISNAN(meanlog) || ISNAN(sdlog)) return p + meanlog + sdlog;

          _general_1.R_Q_P01_boundaries(lower_tail, log_p, p, 0, ML_POSINF);

          return exp(qnorm_1.qnorm(p, meanlog, sdlog, lower_tail, log_p));
        });
      }

      exports.qlnorm = qlnorm;
      /***/
    },
    /* 144 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var rnorm_1 = __webpack_require__(43);

      var r_func_1 = __webpack_require__(2);

      var exp = r_func_1.arrayrify(Math.exp);
      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite;
      var printer = debug('rlnorm');
      var sequence = r_func_1.seq()();

      function rlnorm(N) {
        var meanlog = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var sdlog = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var rng = arguments.length > 3 ? arguments[3] : undefined;

        if (ISNAN(meanlog) || !R_FINITE(sdlog) || sdlog < 0) {
          return r_func_1.map(sequence(N))(function () {
            return _general_1.ML_ERR_return_NAN(printer);
          });
        }

        return exp(rnorm_1.rnorm(N, meanlog, sdlog, rng));
      }

      exports.rlnorm = rlnorm;
      /***/
    },
    /* 145 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var gamma_1 = __webpack_require__(25);

      var r_func_1 = __webpack_require__(2);

      var isFinite = Number.isFinite;
      var div = r_func_1.arrayrify(function (a, b) {
        return a / b;
      });
      var lgamma = gamma_1.special.lgamma;
      var add = r_func_1.arrayrify(function (a, b) {
        return a + b;
      });
      var log = r_func_1.arrayrify(Math.log);

      function dmultinom(o) {
        o.asLog = !!o.asLog;
        var x = r_func_1.flatten(o.x).filter(function (f) {
          return !!f;
        });
        var prob = r_func_1.flatten(o.prob);
        var badProb = !!prob.find(function (f) {
          return !isFinite(f) || f < 0;
        });
        var s = r_func_1.sum(prob);

        if (badProb || s === 0) {
          throw new Error('probabilities must be finite, non-negative and not all 0');
        }

        prob = r_func_1.flatten(div(prob, s));
        x = x.map(Math.round);

        if (r_func_1.any(x)(function (v) {
          return v < 0;
        })) {
          throw new Error('probabilities must be finite, non-negative and not all 0');
        }

        var N = r_func_1.sum(x);
        var size = !!o.size ? o.size : N;

        if (size !== N) {
          throw new Error("size:".concat(size, " != sum(x):").concat(N, ", i.e. one is wrong"));
        }

        var i0 = prob.map(function (p) {
          return p === 0;
        });

        if (r_func_1.any(i0)(function (v) {
          return !!v;
        })) {
          if (i0.find(function (_v, i) {
            return x[i] !== 0;
          })) {
            return o.asLog ? -Infinity : 0;
          }

          x = x.filter(function (_v, i) {
            return i0[i];
          });
          prob = prob.filter(function (_v, i) {
            return i0[i];
          });
        }

        var errMsg = [];

        if (prob.length <= 1) {
          errMsg.push("number of propabilities need to be at least 2, it is:".concat(prob.length));
        }

        if (x.length <= 1) {
          errMsg.push("number of quantiles need to be at least 2, it is :".concat(x.length));
        }

        if (x.length !== prob.length) {
          errMsg.push("number of effective quantiles:".concat(x.length, " is not equal to number of effective probabilities:").concat(prob.length, "."));
        }

        if (errMsg.length) {
          throw new Error(errMsg.join('\n'));
        }

        var s1 = lgamma(add(x, 1));
        var s2 = log(prob);
        var s3 = x.map(function (v, i) {
          return v * s2[i] - s1[i];
        });
        var r = lgamma(size + 1) + r_func_1.sum(s3);
        return o.asLog ? r : Math.exp(r);
      }

      exports.dmultinom = dmultinom;
      /***/
    },
    /* 146 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var R_FINITE = Number.isFinite;
      var fabs = Math.abs;

      var rbinom_1 = __webpack_require__(36);

      var r_func_1 = __webpack_require__(2);

      var printer_rmultinom = debug('rmultinom');

      function rmultinom(n, size, prob, rng) {
        var result = Array.from({
          length: n
        }).map(function () {
          return _rmultinom(size, prob, rng);
        });
        return r_func_1.possibleScalar(result);
      }

      exports.rmultinom = rmultinom;

      function _rmultinom(size, prob, rng) {
        var rN = [];
        var p = r_func_1.flatten(prob);
        var K = p.length;

        if (p.length === 0) {
          printer_rmultinom('list of probabilities cannot be empty');
          return rN;
        }

        if (size < 0) {
          printer_rmultinom('Illegal Argument:size is negative');
          rN.splice(0);
          return rN;
        }

        if (p.find(function (pp) {
          return !R_FINITE(pp) || pp < 0;
        })) {
          printer_rmultinom('some propbabilities are invalid or negative numbers');
          rN.splice(0);
          return rN;
        }

        rN.splice.apply(rN, [0, rN.length].concat(_toConsumableArray(new Array(K).fill(0))));

        if (size === 0) {
          return rN;
        }

        var _size = size;
        var p_tot = r_func_1.sum(p);
        printer_rmultinom('%o', {
          p: p,
          p_tot: p_tot,
          _size: _size,
          K: K,
          rN: rN
        });

        for (var k = 0; k < K - 1; k++) {
          if (fabs(p_tot) < Number.EPSILON) {
            rN[k] = _size;
            _size = 0;
            p_tot = 0;
            continue;
          }

          var pp = p[k] / p_tot;

          if (pp === 0) {
            rN[k] = 0;
            continue;
          }

          if (_size === 0) {
            rN[k] = 0;
            continue;
          }

          rN[k] = pp < 1 ? rbinom_1.rbinom(1, _size, pp, rng) : _size;
          _size -= rN[k];
          p_tot -= p[k];
          printer_rmultinom('%o', {
            p_tot: p_tot,
            _size: _size,
            k: k,
            rN: rN
          });
        }

        rN[K - 1] = _size;
        return rN;
      }
      /***/

    },
    /* 147 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var toms708_1 = __webpack_require__(9);

      var ppois_1 = __webpack_require__(71);

      var qnorm_1 = __webpack_require__(6);

      var expm1_1 = __webpack_require__(3);

      var r_func_1 = __webpack_require__(2);

      var fmax2 = Math.max,
          sqrt = Math.sqrt,
          floor = Math.floor,
          nearbyint = Math.round;
      var ISNAN = Number.isNaN,
          DBL_EPSILON = Number.EPSILON,
          ML_POSINF = Number.POSITIVE_INFINITY,
          R_FINITE = Number.isFinite;

      function do_search(y, z, p, lambda, incr) {
        if (z.val >= p) {
          while (true) {
            if (y === 0 || (z.val = ppois_1.ppois(y - incr, lambda, true, false)) < p) return y;
            y = fmax2(0, y - incr);
          }
        } else {
          while (true) {
            y = y + incr;
            if ((z.val = ppois_1.ppois(y, lambda, true, false)) >= p) return y;
          }
        }
      }

      function qpois(pp, lambda) {
        var lower_tail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var log_p = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        return r_func_1.map(pp)(function (p) {
          return _qpois(p, lambda, lower_tail, log_p);
        });
      }

      exports.qpois = qpois;
      var printer_qpois = debug('_qpois');

      function _qpois(p, lambda, lower_tail, log_p) {
        var mu;
        var sigma;
        var gamma;
        var y;
        var z = new toms708_1.NumberW(0);
        if (ISNAN(p) || ISNAN(lambda)) return p + lambda;

        if (!R_FINITE(lambda)) {
          return _general_1.ML_ERR_return_NAN(printer_qpois);
        }

        if (lambda < 0) return _general_1.ML_ERR_return_NAN(printer_qpois);
        if (lambda === 0) return 0;

        var rc = _general_1.R_Q_P01_boundaries(lower_tail, log_p, p, 0, ML_POSINF);

        if (rc !== undefined) {
          return rc;
        }

        mu = lambda;
        sigma = sqrt(lambda);
        gamma = 1.0 / sigma;

        if (!lower_tail || log_p) {
          p = expm1_1.R_DT_qIv(lower_tail, log_p, p);
          if (p === 0) return 0;
          if (p === 1) return ML_POSINF;
        }

        if (p + 1.01 * DBL_EPSILON >= 1) return ML_POSINF;
        z.val = qnorm_1.qnorm(p, 0, 1, true, false);
        y = nearbyint(mu + sigma * (z.val + gamma * (z.val * z.val - 1) / 6));
        z.val = ppois_1.ppois(y, lambda, true, false);
        p *= 1 - 64 * DBL_EPSILON;
        if (lambda < 1e5) return do_search(y, z, p, lambda, 1);
        {
          var incr = floor(y * 0.001);
          var oldincr;

          do {
            oldincr = incr;
            y = do_search(y, z, p, lambda, incr);
            incr = fmax2(1, floor(incr / 100));
          } while (oldincr > 1 && incr > lambda * 1e-15);

          return y;
        }
      }
      /***/

    },
    /* 148 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var fixup_1 = __webpack_require__(20);

      var irng_1 = __webpack_require__(7);

      var irng_type_1 = __webpack_require__(14);

      var timeseed_1 = __webpack_require__(10);

      var QUALITY = 1009;
      var SEED_LEN = 101;
      var LL = 37;
      var KK = 100;
      var TT = 70;
      var MM = 1073741824;

      function mod_diff(x, y) {
        var d = new Uint32Array(3);
        d[0] = x;
        d[1] = y;
        d[2] = d[0] - d[1] & MM - 1;
        return d[2];
      }

      function is_odd(x) {
        return x % 2 === 1;
      }

      var KnuthTAOCP2002 = /*#__PURE__*/function (_irng_1$IRNG2) {
        _inherits(KnuthTAOCP2002, _irng_1$IRNG2);

        var _super3 = _createSuper(KnuthTAOCP2002);

        _createClass(KnuthTAOCP2002, [{
          key: "ran_array",
          value: function ran_array(aa, n) {
            var i;
            var j;

            for (j = 0; j < KK; j++) {
              aa[j] = this.ran_x[j];
            }

            for (; j < n; j++) {
              aa[j] = mod_diff(aa[j - KK], aa[j - LL]);
            }

            for (i = 0; i < LL; i++, j++) {
              this.ran_x[i] = mod_diff(aa[j - KK], aa[j - LL]);
            }

            for (; i < KK; i++, j++) {
              this.ran_x[i] = mod_diff(aa[j - KK], this.ran_x[i - LL]);
            }
          }
        }, {
          key: "ran_arr_cycle",
          value: function ran_arr_cycle() {
            this.ran_array(this.ran_arr_buf, QUALITY);
            this.ran_arr_buf[KK] = -1;
          }
        }, {
          key: "ran_start",
          value: function ran_start(_seed) {
            var t;
            var j;
            var x = new Uint32Array(KK + KK - 1);
            var ss = new Uint32Array(1);
            var se = new Uint32Array([_seed]);
            ss[0] = se[0] + 2 & MM - 2;

            for (j = 0; j < KK; j++) {
              x[j] = ss[0];
              ss[0] = ss[0] << 1;

              if (ss[0] >= MM) {
                ss[0] = ss[0] - (MM - 2);
              }
            }

            x[1]++;

            for (ss[0] = se[0] & MM - 1, t = TT - 1; t;) {
              for (j = KK - 1; j > 0; j--) {
                x[j + j] = x[j];
                x[j + j - 1] = 0;
              }

              for (j = KK + KK - 2; j >= KK; j--) {
                x[j - (KK - LL)] = mod_diff(x[j - (KK - LL)], x[j]);
                x[j - KK] = mod_diff(x[j - KK], x[j]);
              }

              if (is_odd(ss[0])) {
                for (j = KK; j > 0; j--) {
                  x[j] = x[j - 1];
                }

                x[0] = x[KK];
                x[LL] = mod_diff(x[LL], x[KK]);
              }

              if (ss[0]) {
                ss[0] = ss[0] >>> 1;
              } else {
                t--;
              }
            }

            for (j = 0; j < LL; j++) {
              this.ran_x[j + KK - LL] = x[j];
            }

            for (; j < KK; j++) {
              this.ran_x[j - LL] = x[j];
            }

            for (j = 0; j < 10; j++) {
              this.ran_array(x, KK + KK - 1);
            }
          }
        }, {
          key: "RNG_Init_KT2",
          value: function RNG_Init_KT2(_seed) {
            this.ran_start(_seed % 1073741821);
            this.KT_pos = 100;
          }
        }, {
          key: "KT_next",
          value: function KT_next() {
            if (this.KT_pos >= 100) {
              this.ran_arr_cycle();
              this.KT_pos = 0;
            }

            return this.ran_x[this.KT_pos++];
          }
        }, {
          key: "KT_pos",
          get: function get() {
            return this.m_seed[100];
          },
          set: function set(v) {
            this.m_seed[100] = v;
          }
        }]);

        function KnuthTAOCP2002() {
          var _seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : timeseed_1.timeseed();

          _classCallCheck(this, KnuthTAOCP2002);

          return _super3.call(this, _seed);
        }

        _createClass(KnuthTAOCP2002, [{
          key: "_setup",
          value: function _setup() {
            this._kind = irng_type_1.IRNGType.KNUTH_TAOCP2002;
            this._name = 'Knuth-TAOCP-2002';
            this.qualityBuffer = new ArrayBuffer(QUALITY * 4);
            this.ran_arr_buf = new Uint32Array(this.qualityBuffer);
            var buf = new ArrayBuffer(SEED_LEN * 4);
            this.m_seed = new Uint32Array(buf).fill(0);
            this.ran_x = this.m_seed;
          }
        }, {
          key: "internal_unif_rand",
          value: function internal_unif_rand() {
            var KT = 9.31322574615479e-10;
            return fixup_1.fixup(this.KT_next() * KT);
          }
        }, {
          key: "init",
          value: function init() {
            var _seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : timeseed_1.timeseed();

            var s = new Uint32Array([0]);
            s[0] = _seed;

            for (var j = 0; j < 50; j++) {
              s[0] = 69069 * s[0] + 1;
            }

            this.RNG_Init_KT2(s[0]);

            _get(_getPrototypeOf(KnuthTAOCP2002.prototype), "init", this).call(this, _seed);
          }
        }, {
          key: "seed",
          set: function set(_seed) {
            if (_seed.length > this.m_seed.length || _seed.length === 0) {
              this.init(timeseed_1.timeseed());
              return;
            }

            this.m_seed.set(_seed);
          },
          get: function get() {
            return Array.from(this.m_seed);
          }
        }]);

        return KnuthTAOCP2002;
      }(irng_1.IRNG);

      exports.KnuthTAOCP2002 = KnuthTAOCP2002;
      /***/
    },
    /* 149 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var fixup_1 = __webpack_require__(20);

      var irng_1 = __webpack_require__(7);

      var irng_type_1 = __webpack_require__(14);

      var timeseed_1 = __webpack_require__(10);

      var taocp_1997_init_1 = __webpack_require__(150);

      var MM = 1 << 30;
      var KK = 100;
      var LL = 37;
      var QUALITY = 1009;
      var qualityBuffer = new ArrayBuffer(QUALITY * 4);
      var ran_arr_buf = new Uint32Array(qualityBuffer);
      var KT = 9.31322574615479e-10;

      var mod_diff = function mod_diff(x, y) {
        return x - y & MM - 1;
      };

      var SEED_LEN = 101;

      var KnuthTAOCP = /*#__PURE__*/function (_irng_1$IRNG3) {
        _inherits(KnuthTAOCP, _irng_1$IRNG3);

        var _super4 = _createSuper(KnuthTAOCP);

        _createClass(KnuthTAOCP, [{
          key: "fixupSeeds",
          value: function fixupSeeds() {
            if (this.KT_pos <= 0) this.KT_pos = 100;
            var s = this.m_seed.slice(0, 100);
            if (s.find(function (v) {
              return !!v;
            }) === undefined) this.init(timeseed_1.timeseed());
            return;
          }
        }, {
          key: "KT_next",
          value: function KT_next() {
            var s = this.m_seed;

            if (this.KT_pos >= 100) {
              this.ran_arr_cycle();
              this.KT_pos = 0;
            }

            return s[this.KT_pos++];
          }
        }, {
          key: "RNG_Init_R_KT",
          value: function RNG_Init_R_KT(_seed) {
            this.m_seed.set(taocp_1997_init_1.TAOCP1997init(_seed % 1073741821));
            this.KT_pos = 100;
            this.fixupSeeds();
          }
        }, {
          key: "ran_arr_cycle",
          value: function ran_arr_cycle() {
            this.ran_array(ran_arr_buf, QUALITY);
            ran_arr_buf[KK] = -1;
            return ran_arr_buf[0];
          }
        }, {
          key: "ran_array",
          value: function ran_array(aa, n) {
            var i;
            var j;
            var ran_x = this.m_seed;

            for (j = 0; j < KK; j++) {
              aa[j] = ran_x[j];
            }

            for (; j < n; j++) {
              aa[j] = mod_diff(aa[j - KK], aa[j - LL]);
            }

            for (i = 0; i < LL; i++, j++) {
              ran_x[i] = mod_diff(aa[j - KK], aa[j - LL]);
            }

            for (; i < KK; i++, j++) {
              ran_x[i] = mod_diff(aa[j - KK], ran_x[i - LL]);
            }
          }
        }, {
          key: "KT_pos",
          get: function get() {
            return this.m_seed[100];
          },
          set: function set(v) {
            this.m_seed[100] = v;
          }
        }]);

        function KnuthTAOCP() {
          var _seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : timeseed_1.timeseed();

          _classCallCheck(this, KnuthTAOCP);

          return _super4.call(this, _seed);
        }

        _createClass(KnuthTAOCP, [{
          key: "_setup",
          value: function _setup() {
            this.buf = new ArrayBuffer(SEED_LEN * 4);
            this._kind = irng_type_1.IRNGType.KNUTH_TAOCP;
            this._name = 'Knuth-TAOCP';
            this.m_seed = new Int32Array(this.buf).fill(0);
          }
        }, {
          key: "init",
          value: function init() {
            var _seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : timeseed_1.timeseed();

            var s = new Uint32Array([0]);
            s[0] = _seed;

            for (var j = 0; j < 50; j++) {
              s[0] = 69069 * s[0] + 1;
            }

            this.RNG_Init_R_KT(s[0]);

            _get(_getPrototypeOf(KnuthTAOCP.prototype), "init", this).call(this, _seed);
          }
        }, {
          key: "internal_unif_rand",
          value: function internal_unif_rand() {
            return fixup_1.fixup(this.KT_next() * KT);
          }
        }, {
          key: "seed",
          set: function set(_seed) {
            if (_seed.length > this.m_seed.length || _seed.length === 0) {
              this.init(timeseed_1.timeseed());
              return;
            }

            this.m_seed.set(_seed);
          },
          get: function get() {
            return Array.from(this.m_seed);
          }
        }]);

        return KnuthTAOCP;
      }(irng_1.IRNG);

      exports.KnuthTAOCP = KnuthTAOCP;
      /***/
    },
    /* 150 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var r_func_1 = __webpack_require__(2);

      var trunc = Math.trunc;

      function TAOCP1997init(seed) {
        var KK = 100;
        var LL = 37;
        var MM = 1073741824;
        var MMF = 1073741824 - 1;
        var KKK = 199;
        var KKL = 63;
        var ss = seed - seed % 2 + 2;
        var X = new Uint32Array(KKK);
        var arr = r_func_1.seq(-1)();

        var _iterator = _createForOfIteratorHelper(arr(1, KK)),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _j6 = _step.value;
            X[_j6] = ss;
            ss = ss + ss;
            if (ss >= MM) ss = ss - MM + 2;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        X[1]++;
        ss = seed;
        var T = 69;

        while (T > 0) {
          var _iterator2 = _createForOfIteratorHelper(arr(KK, 2)),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _j3 = _step2.value;
              X[_j3 + _j3] = X[_j3];
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          var _iterator3 = _createForOfIteratorHelper(arr(KKK, KKL + 1, -2)),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var _j4 = _step3.value;
              X[KKK - _j4] = X[_j4] - X[_j4] % 2;
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }

          var _iterator4 = _createForOfIteratorHelper(arr(KKK, KK + 1)),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var _j5 = _step4.value;

              if (X[_j5] % 2 === 1) {
                X[_j5 - KKL] = X[_j5 - KKL] - X[_j5] & MMF;
                X[_j5 - KK] = X[_j5 - KK] - X[_j5] & MMF;
              }
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }

          if (ss & 1) {
            var _iterator5 = _createForOfIteratorHelper(arr(KK, 1)),
                _step5;

            try {
              for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                var j = _step5.value;
                X[j + 1] = X[j];
              }
            } catch (err) {
              _iterator5.e(err);
            } finally {
              _iterator5.f();
            }

            X[1 - 1] = X[KK + 1 - 1];

            if (X[KK + 1 - 1] % 2 === 1) {
              X[LL + 1 - 1] = X[LL + 1 - 1] - X[KK + 1 - 1] & MMF;
            }
          }

          if (ss) {
            ss = trunc(ss / 2);
          } else {
            T = T - 1;
          }
        }

        var res = new Uint32Array(KK);
        res.set(X.slice(LL, KK));
        res.set(X.slice(0, LL), KK - LL);
        return res;
      }

      exports.TAOCP1997init = TAOCP1997init;
      /***/
    },
    /* 151 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var irng_1 = __webpack_require__(7);

      var irng_type_1 = __webpack_require__(14);

      var timeseed_1 = __webpack_require__(10);

      var SEED_LEN = 6;
      var a12 = 1403580;
      var a13n = 810728;
      var m2 = 4294944443;
      var m1 = 4294967087;
      var normc = 2.328306549295727688e-10;
      var a21 = 527612;
      var a23n = 1370589;

      var LecuyerCMRG = /*#__PURE__*/function (_irng_1$IRNG4) {
        _inherits(LecuyerCMRG, _irng_1$IRNG4);

        var _super5 = _createSuper(LecuyerCMRG);

        function LecuyerCMRG() {
          var _seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : timeseed_1.timeseed();

          _classCallCheck(this, LecuyerCMRG);

          return _super5.call(this, _seed);
        }

        _createClass(LecuyerCMRG, [{
          key: "_setup",
          value: function _setup() {
            this._kind = irng_type_1.IRNGType.LECUYER_CMRG;
            this._name = "L'Ecuyer-CMRG";
            this.m_seed = new Int32Array(SEED_LEN).fill(0);
          }
        }, {
          key: "init",
          value: function init() {
            var se = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : timeseed_1.timeseed();
            var s = new Int32Array([0]);
            s[0] = se;

            for (var j = 0; j < 50; j++) {
              s[0] = 69069 * s[0] + 1;
            }

            for (var _j7 = 0; _j7 < this.m_seed.length; _j7++) {
              s[0] = 69069 * s[0] + 1;

              while (s[0] >= m2) {
                s[0] = 69069 * s[0] + 1;
              }

              this.m_seed[_j7] = s[0];
            }

            _get(_getPrototypeOf(LecuyerCMRG.prototype), "init", this).call(this, se);
          }
        }, {
          key: "internal_unif_rand",
          value: function internal_unif_rand() {
            var II = this.m_seed;
            var k;
            var p1;
            var p2;
            p1 = a12 * new Uint32Array([II[1]])[0] - a13n * new Uint32Array([II[0]])[0];
            k = new Int32Array([p1 / m1])[0];
            p1 -= k * m1;
            if (p1 < 0.0) p1 += m1;
            II[0] = II[1];
            II[1] = II[2];
            II[2] = new Int32Array([p1])[0];
            p2 = a21 * new Uint32Array([II[5]])[0] - a23n * new Uint32Array([II[3]])[0];
            k = new Int32Array([p2 / m2])[0];
            p2 -= k * m2;
            if (p2 < 0.0) p2 += m2;
            II[3] = II[4];
            II[4] = II[5];
            II[5] = new Int32Array([p2])[0];
            return (p1 > p2 ? p1 - p2 : p1 - p2 + m1) * normc;
          }
        }, {
          key: "seed",
          set: function set(_seed) {
            if (_seed.length > this.m_seed.length || _seed.length === 0) {
              this.init(timeseed_1.timeseed());
              return;
            }

            this.m_seed.set(_seed);
          },
          get: function get() {
            return Array.from(this.m_seed);
          }
        }]);

        return LecuyerCMRG;
      }(irng_1.IRNG);

      exports.LecuyerCMRG = LecuyerCMRG;
      /***/
    },
    /* 152 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var fixup_1 = __webpack_require__(20);

      var irng_1 = __webpack_require__(7);

      var irng_type_1 = __webpack_require__(14);

      var timeseed_1 = __webpack_require__(10);

      var SEED_LEN = 2;

      var MarsagliaMultiCarry = /*#__PURE__*/function (_irng_1$IRNG5) {
        _inherits(MarsagliaMultiCarry, _irng_1$IRNG5);

        var _super6 = _createSuper(MarsagliaMultiCarry);

        _createClass(MarsagliaMultiCarry, [{
          key: "fixupSeeds",
          value: function fixupSeeds() {
            var s = this.m_seed;
            if (s[0] === 0) s[0] = 1;
            if (s[1] === 0) s[1] = 1;
            return;
          }
        }]);

        function MarsagliaMultiCarry() {
          var _seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : timeseed_1.timeseed();

          _classCallCheck(this, MarsagliaMultiCarry);

          return _super6.call(this, _seed);
        }

        _createClass(MarsagliaMultiCarry, [{
          key: "init",
          value: function init() {
            var _seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : timeseed_1.timeseed();

            var s = new Int32Array([_seed]);

            for (var j = 0; j < 50; j++) {
              s[0] = 69069 * s[0] + 1;
            }

            for (var _j8 = 0; _j8 < this.m_seed.length; _j8++) {
              s[0] = 69069 * s[0] + 1;
              this.m_seed[_j8] = s[0];
            }

            this.fixupSeeds();

            _get(_getPrototypeOf(MarsagliaMultiCarry.prototype), "init", this).call(this, _seed);
          }
        }, {
          key: "_setup",
          value: function _setup() {
            this._kind = irng_type_1.IRNGType.MARSAGLIA_MULTICARRY;
            this._name = 'Marsaglia-MultiCarry';
            this.m_seed = new Int32Array(new ArrayBuffer(SEED_LEN * 4)).fill(0);
          }
        }, {
          key: "internal_unif_rand",
          value: function internal_unif_rand() {
            var s = this.m_seed;
            s[0] = 36969 * (s[0] & 65535) + (s[0] >>> 16);
            s[1] = 18000 * (s[1] & 65535) + (s[1] >>> 16);
            var un = new Uint32Array(SEED_LEN);
            un[0] = s[0] << 16;
            un[1] = s[1] & 0xffff;
            un[0] = un[0] ^ un[1];
            return fixup_1.fixup(un[0] * fixup_1.i2_32m1);
          }
        }, {
          key: "seed",
          set: function set(_seed) {
            if (_seed.length > this.m_seed.length || _seed.length === 0) {
              this.init(timeseed_1.timeseed());
              return;
            }

            this.m_seed.set(_seed);
          },
          get: function get() {
            return Array.from(this.m_seed);
          }
        }]);

        return MarsagliaMultiCarry;
      }(irng_1.IRNG);

      exports.MarsagliaMultiCarry = MarsagliaMultiCarry;
      /***/
    },
    /* 153 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var mersenne_twister_1 = __webpack_require__(5);

      var inormal_rng_1 = __webpack_require__(15);

      var a = [0.0, 0.03917609, 0.07841241, 0.1177699, 0.1573107, 0.1970991, 0.2372021, 0.2776904, 0.3186394, 0.3601299, 0.4022501, 0.4450965, 0.4887764, 0.5334097, 0.5791322, 0.626099, 0.6744898, 0.7245144, 0.7764218, 0.8305109, 0.8871466, 0.9467818, 1.00999, 1.077516, 1.150349, 1.229859, 1.318011, 1.417797, 1.534121, 1.67594, 1.862732, 2.153875];
      var d = [0.0, 0.0, 0.0, 0.0, 0.0, 0.2636843, 0.2425085, 0.2255674, 0.2116342, 0.1999243, 0.1899108, 0.1812252, 0.1736014, 0.1668419, 0.1607967, 0.1553497, 0.1504094, 0.1459026, 0.14177, 0.1379632, 0.1344418, 0.1311722, 0.128126, 0.1252791, 0.1226109, 0.1201036, 0.1177417, 0.1155119, 0.1134023, 0.1114027, 0.1095039];
      var t = [7.673828e-4, 0.00230687, 0.003860618, 0.005438454, 0.007050699, 0.008708396, 0.01042357, 0.01220953, 0.01408125, 0.01605579, 0.0181529, 0.02039573, 0.02281177, 0.02543407, 0.02830296, 0.03146822, 0.03499233, 0.03895483, 0.04345878, 0.04864035, 0.05468334, 0.06184222, 0.07047983, 0.08113195, 0.09462444, 0.1123001, 0.136498, 0.1716886, 0.2276241, 0.330498, 0.5847031];
      var h = [0.03920617, 0.03932705, 0.03950999, 0.03975703, 0.04007093, 0.04045533, 0.04091481, 0.04145507, 0.04208311, 0.04280748, 0.04363863, 0.04458932, 0.04567523, 0.04691571, 0.04833487, 0.04996298, 0.05183859, 0.05401138, 0.05654656, 0.0595313, 0.06308489, 0.06737503, 0.07264544, 0.07926471, 0.08781922, 0.09930398, 0.1155599, 0.1404344, 0.1836142, 0.2790016, 0.7010474];

      var AhrensDieter = /*#__PURE__*/function (_inormal_rng_1$IRNGNo2) {
        _inherits(AhrensDieter, _inormal_rng_1$IRNGNo2);

        var _super7 = _createSuper(AhrensDieter);

        function AhrensDieter() {
          var _rng = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new mersenne_twister_1.MersenneTwister(0);

          _classCallCheck(this, AhrensDieter);

          return _super7.call(this, _rng);
        }

        _createClass(AhrensDieter, [{
          key: "internal_norm_rand",
          value: function internal_norm_rand() {
            var u1 = this.rng.unif_rand();
            var s = 0.0;
            var w;
            var aa;
            var tt;
            var u2;
            var y;

            if (u1 > 0.5) {
              s = 1.0;
            }

            u1 = u1 + u1 - s;
            u1 *= 32.0;
            var i = new Int32Array([u1]);
            if (i[0] === 32) i[0] = 31;

            if (i[0] !== 0) {
              u2 = u1 - i[0];
              aa = a[i[0] - 1];

              while (u2 <= t[i[0] - 1]) {
                u1 = this.rng.unif_rand();
                w = u1 * (a[i[0]] - aa);
                tt = (w * 0.5 + aa) * w;

                for (;;) {
                  if (u2 > tt) {
                    y = aa + w;
                    return s === 1.0 ? -y : y;
                  }

                  u1 = this.rng.unif_rand();
                  if (u2 < u1) break;
                  tt = u1;
                  u2 = this.rng.unif_rand();
                }

                u2 = this.rng.unif_rand();
              }

              w = (u2 - t[i[0] - 1]) * h[i[0] - 1];
            } else {
              i[0] = 6;
              aa = a[31];

              for (;;) {
                u1 = u1 + u1;
                if (u1 >= 1.0) break;
                aa = aa + d[i[0] - 1];
                i[0] = i[0] + 1;
              }

              u1 = u1 - 1.0;

              jump: for (;;) {
                w = u1 * d[i[0] - 1];
                tt = (w * 0.5 + aa) * w;

                for (;;) {
                  u2 = this.rng.unif_rand();
                  if (u2 > tt) break jump;
                  u1 = this.rng.unif_rand();
                  if (u2 < u1) break;
                  tt = u1;
                }

                u1 = this.rng.unif_rand();
              }
            }

            y = aa + w;
            return s === 1.0 ? -y : y;
          }
        }]);

        return AhrensDieter;
      }(inormal_rng_1.IRNGNormal);

      exports.AhrensDieter = AhrensDieter;
      /***/
    },
    /* 154 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var mersenne_twister_1 = __webpack_require__(5);

      var inormal_rng_1 = __webpack_require__(15);

      var log = Math.log,
          sqrt = Math.sqrt,
          cos = Math.cos,
          sin = Math.sin;
      var DBL_MIN = 2.22507e-308;
      var M_PI = 3.14159265358979323846264338327950288;

      var BoxMuller = /*#__PURE__*/function (_inormal_rng_1$IRNGNo3) {
        _inherits(BoxMuller, _inormal_rng_1$IRNGNo3);

        var _super8 = _createSuper(BoxMuller);

        _createClass(BoxMuller, [{
          key: "reset",
          value: function reset() {
            this.BM_norm_keep = 0;
          }
        }]);

        function BoxMuller() {
          var _this3;

          var _rng = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new mersenne_twister_1.MersenneTwister(0);

          _classCallCheck(this, BoxMuller);

          _this3 = _super8.call(this, _rng);
          _this3.BM_norm_keep = 0;

          _rng.register('INIT', _this3.reset.bind(_assertThisInitialized(_this3)));

          return _this3;
        }

        _createClass(BoxMuller, [{
          key: "internal_norm_rand",
          value: function internal_norm_rand() {
            var s = 0.0;
            var theta = 0;

            if (this.BM_norm_keep !== 0.0) {
              s = this.BM_norm_keep;
              this.BM_norm_keep = 0.0;
              return s;
            } else {
              theta = 2 * M_PI * this.rng.unif_rand();
              var R = sqrt(-2 * log(this.rng.unif_rand())) + 10 * DBL_MIN;
              this.BM_norm_keep = R * sin(theta);
              return R * cos(theta);
            }
          }
        }]);

        return BoxMuller;
      }(inormal_rng_1.IRNGNormal);

      exports.BoxMuller = BoxMuller;
      /***/
    },
    /* 155 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var mersenne_twister_1 = __webpack_require__(5);

      var inormal_rng_1 = __webpack_require__(15);

      var log = Math.log,
          sqrt = Math.sqrt,
          fmin2 = Math.min,
          fmax2 = Math.max,
          fabs = Math.abs,
          exp = Math.exp;

      var BuggyKindermanRamage = /*#__PURE__*/function (_inormal_rng_1$IRNGNo4) {
        _inherits(BuggyKindermanRamage, _inormal_rng_1$IRNGNo4);

        var _super9 = _createSuper(BuggyKindermanRamage);

        function BuggyKindermanRamage() {
          var _rng = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new mersenne_twister_1.MersenneTwister(0);

          _classCallCheck(this, BuggyKindermanRamage);

          return _super9.call(this, _rng);
        }

        _createClass(BuggyKindermanRamage, [{
          key: "internal_norm_rand",
          value: function internal_norm_rand() {
            var A = 2.216035867166471;
            var C1 = 0.398942280401433;
            var C2 = 0.180025191068563;

            var g = function g(x) {
              return C1 * exp(-x * x / 2.0) - C2 * (A - x);
            };

            var u1 = this.rng.unif_rand();
            var u2;
            var u3;
            var tt;

            if (u1 < 0.884070402298758) {
              var _u5 = this.rng.unif_rand();

              return A * (1.1311316354418 * u1 + _u5 - 1);
            }

            if (u1 >= 0.973310954173898) {
              for (;;) {
                u2 = this.rng.unif_rand();
                u3 = this.rng.unif_rand();
                tt = A * A - 2 * log(u3);
                if (u2 * u2 < A * A / tt) return u1 < 0.986655477086949 ? sqrt(tt) : -sqrt(tt);
              }
            }

            if (u1 >= 0.958720824790463) {
              for (;;) {
                u2 = this.rng.unif_rand();
                u3 = this.rng.unif_rand();
                tt = A - 0.63083480192196 * fmin2(u2, u3);
                if (fmax2(u2, u3) <= 0.755591531667601) return u2 < u3 ? tt : -tt;
                if (0.034240503750111 * fabs(u2 - u3) <= g(tt)) return u2 < u3 ? tt : -tt;
              }
            }

            if (u1 >= 0.911312780288703) {
              for (;;) {
                u2 = this.rng.unif_rand();
                u3 = this.rng.unif_rand();
                tt = 0.479727404222441 + 1.10547366102207 * fmin2(u2, u3);
                if (fmax2(u2, u3) <= 0.87283497667179) return u2 < u3 ? tt : -tt;
                if (0.049264496373128 * fabs(u2 - u3) <= g(tt)) return u2 < u3 ? tt : -tt;
              }
            }

            for (;;) {
              u2 = this.rng.unif_rand();
              u3 = this.rng.unif_rand();
              tt = 0.479727404222441 - 0.59550713801594 * fmin2(u2, u3);
              if (fmax2(u2, u3) <= 0.805577924423817) return u2 < u3 ? tt : -tt;
            }
          }
        }]);

        return BuggyKindermanRamage;
      }(inormal_rng_1.IRNGNormal);

      exports.BuggyKindermanRamage = BuggyKindermanRamage;
      /***/
    },
    /* 156 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var mersenne_twister_1 = __webpack_require__(5);

      var inormal_rng_1 = __webpack_require__(15);

      var exp = Math.exp,
          log = Math.log,
          sqrt = Math.sqrt,
          fmax2 = Math.max,
          fmin2 = Math.min,
          fabs = Math.abs;
      var A = 2.216035867166471;
      var C1 = 0.398942280401433;
      var C2 = 0.180025191068563;

      var KindermanRamage = /*#__PURE__*/function (_inormal_rng_1$IRNGNo5) {
        _inherits(KindermanRamage, _inormal_rng_1$IRNGNo5);

        var _super10 = _createSuper(KindermanRamage);

        function KindermanRamage() {
          var _rng = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new mersenne_twister_1.MersenneTwister(0);

          _classCallCheck(this, KindermanRamage);

          return _super10.call(this, _rng);
        }

        _createClass(KindermanRamage, [{
          key: "internal_norm_rand",
          value: function internal_norm_rand() {
            var u1;
            var u2;
            var u3;
            var tt;

            var g = function g(x) {
              return C1 * exp(-x * x / 2.0) - C2 * (A - x);
            };

            u1 = this.rng.unif_rand();

            if (u1 < 0.884070402298758) {
              u2 = this.rng.unif_rand();
              return A * (1.13113163544418 * u1 + u2 - 1);
            }

            if (u1 >= 0.973310954173898) {
              for (;;) {
                u2 = this.rng.unif_rand();
                u3 = this.rng.unif_rand();
                tt = A * A - 2 * log(u3);
                if (u2 * u2 < A * A / tt) return u1 < 0.986655477086949 ? sqrt(tt) : -sqrt(tt);
              }
            }

            if (u1 >= 0.958720824790463) {
              for (;;) {
                u2 = this.rng.unif_rand();
                u3 = this.rng.unif_rand();
                tt = A - 0.63083480192196 * fmin2(u2, u3);
                if (fmax2(u2, u3) <= 0.755591531667601) return u2 < u3 ? tt : -tt;
                if (0.034240503750111 * fabs(u2 - u3) <= g(tt)) return u2 < u3 ? tt : -tt;
              }
            }

            if (u1 >= 0.911312780288703) {
              for (;;) {
                u2 = this.rng.unif_rand();
                u3 = this.rng.unif_rand();
                tt = 0.479727404222441 + 1.10547366102207 * fmin2(u2, u3);
                if (fmax2(u2, u3) <= 0.87283497667179) return u2 < u3 ? tt : -tt;
                if (0.049264496373128 * fabs(u2 - u3) <= g(tt)) return u2 < u3 ? tt : -tt;
              }
            }

            for (;;) {
              u2 = this.rng.unif_rand();
              u3 = this.rng.unif_rand();
              tt = 0.479727404222441 - 0.59550713801594 * fmin2(u2, u3);
              if (tt < 0) continue;
              if (fmax2(u2, u3) <= 0.805577924423817) return u2 < u3 ? tt : -tt;
              if (0.053377549506886 * fabs(u2 - u3) <= g(tt)) return u2 < u3 ? tt : -tt;
            }
          }
        }]);

        return KindermanRamage;
      }(inormal_rng_1.IRNGNormal);

      exports.KindermanRamage = KindermanRamage;
      /***/
    },
    /* 157 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var fixup_1 = __webpack_require__(20);

      var irng_1 = __webpack_require__(7);

      var irng_type_1 = __webpack_require__(14);

      var timeseed_1 = __webpack_require__(10);

      var SEED_LEN = 2;
      var buf = new ArrayBuffer(SEED_LEN * 4);

      var SuperDuper = /*#__PURE__*/function (_irng_1$IRNG6) {
        _inherits(SuperDuper, _irng_1$IRNG6);

        var _super11 = _createSuper(SuperDuper);

        function SuperDuper() {
          var _seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : timeseed_1.timeseed();

          _classCallCheck(this, SuperDuper);

          return _super11.call(this, _seed);
        }

        _createClass(SuperDuper, [{
          key: "_setup",
          value: function _setup() {
            this._kind = irng_type_1.IRNGType.SUPER_DUPER;
            this._name = 'Super-Duper';
            this.m_seed = new Int32Array(buf).fill(0);
          }
        }, {
          key: "internal_unif_rand",
          value: function internal_unif_rand() {
            var s = this.m_seed;
            s[0] ^= s[0] >>> 15 & 0x1ffff;
            s[0] ^= s[0] << 17;
            s[1] *= 69069;
            var un = new Uint32Array(SEED_LEN);
            un[0] = s[0];
            un[1] = s[1];
            un[0] = un[0] ^ un[1];
            return fixup_1.fixup(un[0] * fixup_1.i2_32m1);
          }
        }, {
          key: "fixupSeeds",
          value: function fixupSeeds() {
            var s = this.m_seed;
            if (s[0] === 0) s[0] = 1;
            s[1] |= 1;
            return;
          }
        }, {
          key: "init",
          value: function init() {
            var _seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : timeseed_1.timeseed();

            var s = new Uint32Array([_seed]);

            for (var j = 0; j < 50; j++) {
              s[0] = 69069 * s[0] + 1;
            }

            for (var _j9 = 0; _j9 < this.m_seed.length; _j9++) {
              s[0] = 69069 * s[0] + 1;
              this.m_seed[_j9] = s[0];
            }

            this.fixupSeeds();

            _get(_getPrototypeOf(SuperDuper.prototype), "init", this).call(this, _seed);
          }
        }, {
          key: "seed",
          set: function set(_seed) {
            if (_seed.length > this.m_seed.length || _seed.length === 0) {
              this.init(timeseed_1.timeseed());
              return;
            }

            this.m_seed.set(_seed);
          },
          get: function get() {
            return Array.from(this.m_seed);
          }
        }]);

        return SuperDuper;
      }(irng_1.IRNG);

      exports.SuperDuper = SuperDuper;
      /***/
    },
    /* 158 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var trunc = Math.trunc;

      var frac = function frac(x) {
        return x - trunc(x);
      };

      var fixup_1 = __webpack_require__(20);

      var irng_1 = __webpack_require__(7);

      var irng_type_1 = __webpack_require__(14);

      var timeseed_1 = __webpack_require__(10);

      var SEED_LEN = 3;

      var WichmannHill = /*#__PURE__*/function (_irng_1$IRNG7) {
        _inherits(WichmannHill, _irng_1$IRNG7);

        var _super12 = _createSuper(WichmannHill);

        function WichmannHill() {
          var _seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : timeseed_1.timeseed();

          _classCallCheck(this, WichmannHill);

          return _super12.call(this, _seed);
        }

        _createClass(WichmannHill, [{
          key: "_setup",
          value: function _setup() {
            this._kind = irng_type_1.IRNGType.WICHMANN_HILL;
            this._name = 'Wichmann-Hill';
            var buf = new ArrayBuffer(SEED_LEN * 4);
            this.m_seed = new Uint32Array(buf).fill(0);
          }
        }, {
          key: "internal_unif_rand",
          value: function internal_unif_rand() {
            var s = this.m_seed;
            s[0] = s[0] * 171 % 30269;
            s[1] = s[1] * 172 % 30307;
            s[2] = s[2] * 170 % 30323;
            var value = s[0] / 30269.0 + s[1] / 30307.0 + s[2] / 30323.0;
            return fixup_1.fixup(frac(value));
          }
        }, {
          key: "fixupSeeds",
          value: function fixupSeeds() {
            var s = this.m_seed;
            s[0] = s[0] % 30269;
            s[1] = s[1] % 30307;
            s[2] = s[2] % 30323;
            if (s[0] === 0) s[0] = 1;
            if (s[1] === 0) s[1] = 1;
            if (s[2] === 0) s[2] = 1;
            return;
          }
        }, {
          key: "init",
          value: function init() {
            var seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : timeseed_1.timeseed();
            var s = new Uint32Array([seed]);

            for (var j = 0; j < 50; j++) {
              s[0] = 69069 * s[0] + 1;
            }

            for (var _j10 = 0; _j10 < this.m_seed.length; _j10++) {
              s[0] = 69069 * s[0] + 1;
              this.m_seed[_j10] = s[0];
            }

            this.fixupSeeds();

            _get(_getPrototypeOf(WichmannHill.prototype), "init", this).call(this, seed);
          }
        }, {
          key: "seed",
          set: function set(_seed) {
            if (_seed.length > this.m_seed.length || _seed.length === 0) {
              this.init(timeseed_1.timeseed());
              return;
            }

            this.m_seed.set(_seed);
          },
          get: function get() {
            return Array.from(this.m_seed);
          }
        }]);

        return WichmannHill;
      }(irng_1.IRNG);

      exports.WichmannHill = WichmannHill;
      /***/
    },
    /* 159 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _general_1 = __webpack_require__(0);

      function csignrank(k, n, u, c, w) {
        if (k < 0 || k > u) return 0;
        if (k > c) k = u - k;
        if (n === 1) return 1;
        if (w[0] === 1) return w[k];
        w[0] = w[1] = 1;

        for (var j = 2; j < n + 1; ++j) {
          var i = void 0;

          var end = _general_1.imin2(j * (j + 1) / 2, c);

          for (i = end; i >= j; --i) {
            w[i] += w[i - j];
          }
        }

        return w[k];
      }

      exports.csignrank = csignrank;
      /***/
    },
    /* 160 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var csignrank_1 = __webpack_require__(159);

      var round = Math.round,
          trunc = Math.trunc,
          fabs = Math.abs,
          log = Math.log,
          M_LN2 = Math.LN2;
      var ISNAN = Number.isNaN;
      var printer_dsignrank = debug('dsignrank');

      function dsignrank(xx, n) {
        var logX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var rn = round(n);
        var u = rn * (rn + 1) / 2;
        var c = trunc(u / 2);
        var w = new Array(c + 1).fill(0);
        var fx = Array.isArray(xx) ? xx : [xx];
        var result = fx.map(function (x) {
          if (ISNAN(x) || ISNAN(n)) return x + n;

          if (n <= 0) {
            return _general_1.ML_ERR_return_NAN(printer_dsignrank);
          }

          if (fabs(x - round(x)) > 1e-7) {
            return _general_1.R_D__0(logX);
          }

          x = round(x);

          if (x < 0 || x > n * (n + 1) / 2) {
            return _general_1.R_D__0(logX);
          }

          var d = _general_1.R_D_exp(logX, log(csignrank_1.csignrank(trunc(x), n, u, c, w)) - n * M_LN2);

          return d;
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.dsignrank = dsignrank;
      /***/
    },
    /* 161 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var fabs = Math.abs;
      var ISNAN = Number.isNaN;

      function fsign(x, signal) {
        if (ISNAN(x)) return x;
        return signal ? fabs(x) : -fabs(x);
      }

      exports.fsign = fsign;
      /***/
    },
    /* 162 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var r_func_1 = __webpack_require__(2);

      var signrank_1 = __webpack_require__(73);

      var round = Math.round,
          trunc = Math.trunc,
          M_LN2 = Math.LN2,
          exp = Math.exp;
      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite;
      var printer_psignrank = debug('psignrank');

      function psignrank(xx, n) {
        var lowerTail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var logP = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        var roundN = round(n);
        var u = roundN * (roundN + 1) / 2;
        var c = trunc(u / 2);
        var w = new Array(c + 1).fill(0);
        return r_func_1.map(xx)(function (x) {
          x = round(x + 1e-7);
          var lowerT = lowerTail;
          if (ISNAN(x) || ISNAN(n)) return NaN;
          if (!R_FINITE(n)) return _general_1.ML_ERR_return_NAN(printer_psignrank);
          if (n <= 0) return _general_1.ML_ERR_return_NAN(printer_psignrank);

          if (x < 0.0) {
            return _general_1.R_DT_0(lowerTail, logP);
          }

          if (x >= u) {
            return _general_1.R_DT_1(lowerTail, logP);
          }

          var f = exp(-roundN * M_LN2);
          var p = 0;

          if (x <= u / 2) {
            for (var i = 0; i <= x; i++) {
              p += signrank_1.csignrank(i, roundN, u, c, w) * f;
            }
          } else {
            x = n * (n + 1) / 2 - x;

            for (var _i6 = 0; _i6 < x; _i6++) {
              p += signrank_1.csignrank(_i6, roundN, u, c, w) * f;
            }

            lowerT = !lowerT;
          }

          return _general_1.R_DT_val(lowerT, logP, p);
        });
      }

      exports.psignrank = psignrank;
      /***/
    },
    /* 163 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var expm1_1 = __webpack_require__(3);

      var r_func_1 = __webpack_require__(2);

      var signrank_1 = __webpack_require__(73);

      var round = Math.round,
          trunc = Math.trunc,
          M_LN2 = Math.LN2,
          exp = Math.exp;
      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite,
          DBL_EPSILON = Number.EPSILON;
      var printer_qsignrank = debug('qsignrank');

      function qsignrank(xx, n) {
        var lowerTail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var logP = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        var roundN = round(n);
        var u = roundN * (roundN + 1) / 2;
        var c = trunc(u / 2);
        var w = new Array(c + 1).fill(0);
        return r_func_1.map(xx)(function (x) {
          if (ISNAN(x) || ISNAN(n)) {
            return NaN;
          }

          if (!R_FINITE(n)) {
            return _general_1.ML_ERR_return_NAN(printer_qsignrank);
          }

          var rc = _general_1.R_Q_P01_check(logP, x);

          if (rc !== undefined) {
            return rc;
          }

          if (roundN <= 0) {
            return _general_1.ML_ERR_return_NAN(printer_qsignrank);
          }

          if (x === _general_1.R_DT_0(lowerTail, logP)) {
            return 0;
          }

          if (x === _general_1.R_DT_1(lowerTail, logP)) {
            return u;
          }

          if (logP || !lowerTail) {
            x = expm1_1.R_DT_qIv(lowerTail, logP, x);
          }

          var f = exp(-n * M_LN2);
          var p = 0;
          var q = 0;

          if (x <= 0.5) {
            x = x - 10 * DBL_EPSILON;

            while (true) {
              p += signrank_1.csignrank(q, roundN, u, c, w) * f;
              if (p >= x) break;
              q++;
            }
          } else {
            x = 1 - x + 10 * DBL_EPSILON;

            while (true) {
              p += signrank_1.csignrank(q, roundN, u, c, w) * f;

              if (p > x) {
                q = trunc(u - q);
                break;
              }

              q++;
            }
          }

          return q;
        });
      }

      exports.qsignrank = qsignrank;
      /***/
    },
    /* 164 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var r_func_1 = __webpack_require__(2);

      var ISNAN = Number.isNaN;
      var floor = Math.floor,
          round = Math.round;
      var printer_rsignrank = debug('rsignrank');
      var sequence = r_func_1.seq()();

      function rsignrank(nn, n, rng) {
        return r_func_1.map(sequence(nn))(function () {
          if (ISNAN(n)) return n;
          var nRound = round(n);
          if (nRound < 0) return _general_1.ML_ERR_return_NAN(printer_rsignrank);
          if (nRound === 0) return 0;
          var r = 0.0;
          var k = floor(nRound);

          for (var i = 0; i < k;) {
            r += ++i * floor(rng.unif_rand() + 0.5);
          }

          return r;
        });
      }

      exports.rsignrank = rsignrank;
      /***/
    },
    /* 165 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var lgamma_fn_1 = __webpack_require__(4);

      var dnorm_1 = __webpack_require__(31);

      var r_func_1 = __webpack_require__(2);

      var dt_1 = __webpack_require__(45);

      var pnt_1 = __webpack_require__(46);

      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite,
          DBL_EPSILON = Number.EPSILON;
      var fabs = Math.abs,
          sqrt = Math.sqrt,
          log = Math.log,
          exp = Math.exp;
      var printer_dnt = debug('dnt');

      function dnt(xx, df) {
        var ncp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var giveLog = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        return r_func_1.map(xx)(function (x) {
          if (ISNAN(x) || ISNAN(df)) return x + df;
          if (df <= 0.0) return _general_1.ML_ERR_return_NAN(printer_dnt);
          if (ncp === 0.0) return dt_1.dt(x, df, giveLog);
          if (!R_FINITE(x)) return _general_1.R_D__0(giveLog);
          if (!R_FINITE(df) || df > 1e8) return dnorm_1.dnorm4(x, ncp, 1, giveLog);

          var u = function () {
            if (fabs(x) > sqrt(df * DBL_EPSILON)) {
              printer_dnt('fabs(x:%d)>sqrt(df*espsilon):%d', fabs(x), sqrt(df * DBL_EPSILON));
              return log(df) - log(fabs(x)) + log(fabs(pnt_1.pnt(x * sqrt((df + 2) / df), df + 2, ncp, true, false) - pnt_1.pnt(x, df, ncp, true, false)));
            } else {
              printer_dnt('fabs(x:%d)<=sqrt(df*espsilon):%d', fabs(x), sqrt(df * DBL_EPSILON));
              return lgamma_fn_1.lgammafn((df + 1) / 2) - lgamma_fn_1.lgammafn(df / 2) - (_general_1.M_LN_SQRT_PI + 0.5 * (log(df) + ncp * ncp));
            }
          }();

          printer_dnt('u=%d, giveLog=%s', u, giveLog);
          return giveLog ? u : exp(u);
        });
      }

      exports.dnt = dnt;
      /***/
    },
    /* 166 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var expm1_1 = __webpack_require__(3);

      var qnorm_1 = __webpack_require__(6);

      var r_func_1 = __webpack_require__(2);

      var pnt_1 = __webpack_require__(46);

      var qt_1 = __webpack_require__(75);

      var fabs = Math.abs,
          fmax2 = Math.max,
          fmin2 = Math.min;
      var DBL_MAX = Number.MAX_VALUE,
          DBL_EPSILON = Number.EPSILON,
          R_FINITE = Number.isFinite,
          ML_POSINF = Number.POSITIVE_INFINITY,
          ML_NEGINF = Number.NEGATIVE_INFINITY,
          ISNAN = Number.isNaN;
      var printer = debug('qnt');

      function qnt(pp, df, ncp, lowerTail, logP) {
        return r_func_1.map(pp)(function (p) {
          return _qnt(p, df, ncp, lowerTail, logP);
        });
      }

      exports.qnt = qnt;

      function _qnt(p, df, ncp, lower_tail, log_p) {
        var accu = 1e-13;
        var Eps = 1e-11;
        var ux;
        var lx;
        var nx;
        var pp;
        if (ISNAN(p) || ISNAN(df) || ISNAN(ncp)) return p + df + ncp;
        if (df <= 0.0) return _general_1.ML_ERR_return_NAN(printer);
        if (ncp === 0.0 && df >= 1.0) return qt_1.qt(p, df, lower_tail, log_p);

        var rc = _general_1.R_Q_P01_boundaries(lower_tail, log_p, p, ML_NEGINF, ML_POSINF);

        if (rc !== undefined) {
          return rc;
        }

        if (!R_FINITE(df)) return qnorm_1.qnorm(p, ncp, 1, lower_tail, log_p);
        p = expm1_1.R_DT_qIv(lower_tail, log_p, p);
        if (p > 1 - DBL_EPSILON) return ML_POSINF;
        pp = fmin2(1 - DBL_EPSILON, p * (1 + Eps));

        for (ux = fmax2(1, ncp); ux < DBL_MAX && pnt_1.pnt(ux, df, ncp, true, false) < pp; ux *= 2) {
          ;
        }

        pp = p * (1 - Eps);

        for (lx = fmin2(-1, -ncp); lx > -DBL_MAX && pnt_1.pnt(lx, df, ncp, true, false) > pp; lx *= 2) {
          ;
        }

        do {
          nx = 0.5 * (lx + ux);
          if (pnt_1.pnt(nx, df, ncp, true, false) > p) ux = nx;else lx = nx;
        } while (ux - lx > accu * fmax2(fabs(lx), fabs(ux)));

        return 0.5 * (lx + ux);
      }
      /***/

    },
    /* 167 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var rchisq_1 = __webpack_require__(13);

      var _general_1 = __webpack_require__(0);

      var r_func_1 = __webpack_require__(2);

      var sqrt = Math.sqrt;
      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite;
      var sequence = r_func_1.seq()();
      var printer = debug('rt');

      function rt(n, df, rng) {
        return r_func_1.map(sequence(n))(function () {
          if (ISNAN(df) || df <= 0.0) {
            return _general_1.ML_ERR_return_NAN(printer);
          }

          if (!R_FINITE(df)) return rng.norm_rand();else {
            var num = rng.norm_rand();
            return num / sqrt(rchisq_1.rchisq(1, df, rng) / df);
          }
        });
      }

      exports.rt = rt;
      /***/
    },
    /* 168 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var sqrt = Math.sqrt,
          log = Math.log;

      function qinv(p, c, v) {
        var p0 = 0.322232421088;
        var q0 = 0.99348462606e-1;
        var p1 = -1.0;
        var q1 = 0.588581570495;
        var p2 = -0.342242088547;
        var q2 = 0.531103462366;
        var p3 = -0.204231210125;
        var q3 = 0.10353775285;
        var p4 = -0.453642210148e-4;
        var q4 = 0.38560700634e-2;
        var c1 = 0.8832;
        var c2 = 0.2368;
        var c3 = 1.214;
        var c4 = 1.208;
        var c5 = 1.4142;
        var vmax = 120.0;
        var ps;
        var q;
        var t;
        var yi;
        ps = 0.5 - 0.5 * p;
        yi = sqrt(log(1.0 / (ps * ps)));
        t = yi + ((((yi * p4 + p3) * yi + p2) * yi + p1) * yi + p0) / ((((yi * q4 + q3) * yi + q2) * yi + q1) * yi + q0);
        if (v < vmax) t += (t * t * t + t) / v / 4.0;
        q = c1 - c2 * t;
        if (v < vmax) q += -c3 / v + c4 * t / v;
        return t * (q * log(c - 1.0) + c5);
      }

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var expm1_1 = __webpack_require__(3);

      var r_func_1 = __webpack_require__(2);

      var ptukey_1 = __webpack_require__(77);

      var ISNAN = Number.isNaN,
          ML_POSINF = Number.POSITIVE_INFINITY;
      var fabs = Math.abs,
          fmax2 = Math.max;
      var printer = debug('qtukey');

      function qtukey(pp, rr, cc, df) {
        var lower_tail = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
        var log_p = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
        return r_func_1.map(pp)(function (p) {
          return _qtukey(p, rr, cc, df, lower_tail, log_p);
        });
      }

      exports.qtukey = qtukey;

      function _qtukey(p, rr, cc, df, lower_tail, log_p) {
        var eps = 0.0001;
        var maxiter = 50;
        var ans = 0.0;
        var valx0;
        var valx1;
        var x0;
        var x1;
        var xabs;
        var iter;

        if (ISNAN(p) || ISNAN(rr) || ISNAN(cc) || ISNAN(df)) {
          _general_1.ML_ERROR(_general_1.ME.ME_DOMAIN, 'qtukey', printer);

          return NaN;
        }

        if (df < 2 || rr < 1 || cc < 2) return _general_1.ML_ERR_return_NAN(printer);

        var rc = _general_1.R_Q_P01_boundaries(lower_tail, log_p, p, 0, ML_POSINF);

        if (rc !== undefined) {
          return rc;
        }

        p = expm1_1.R_DT_qIv(lower_tail, log_p, p);
        x0 = qinv(p, cc, df);
        valx0 = ptukey_1._ptukey(x0, rr, cc, df, true, false) - p;
        if (valx0 > 0.0) x1 = fmax2(0.0, x0 - 1.0);else x1 = x0 + 1.0;
        valx1 = ptukey_1._ptukey(x1, rr, cc, df, true, false) - p;

        for (iter = 1; iter < maxiter; iter++) {
          ans = x1 - valx1 * (x1 - x0) / (valx1 - valx0);
          valx0 = valx1;
          x0 = x1;

          if (ans < 0.0) {
            ans = 0.0;
            valx1 = -p;
          }

          valx1 = ptukey_1._ptukey(ans, rr, cc, df, true, false) - p;
          x1 = ans;
          xabs = fabs(x1 - x0);
          if (xabs < eps) return ans;
        }

        _general_1.ML_ERROR(_general_1.ME.ME_NOCONV, 'qtukey', printer);

        return ans;
      }
      /***/

    },
    /* 169 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _general_1 = __webpack_require__(0);

      var pnorm_1 = __webpack_require__(19);

      var exp = Math.exp,
          pow = Math.pow;
      var bb = 8;
      var C2 = -50;
      var wlar = 3;
      var wincr1 = 2;
      var wincr2 = 3;
      var nleg = 12;
      var ihalf = 6;
      var xleg = [0.981560634246719250690549090149, 0.904117256370474856678465866119, 0.769902674194304687036893833213, 0.587317954286617447296702418941, 0.367831498998180193752691536644, 0.125233408511468915472441369464];
      var aleg = [0.047175336386511827194615961485, 0.106939325995318430960254718194, 0.160078328543346226334652529543, 0.20316742672306592174906445581, 0.233492536538354808760849898925, 0.249147045813402785000562436043];
      var C3 = 60;
      var C1 = -30;

      function wprob(w, rr, cc) {
        var a;
        var ac;
        var pr_w;
        var b;
        var binc;
        var c;
        var cc1;
        var pminus;
        var pplus;
        var qexpo;
        var qsqz;
        var rinsum;
        var wi;
        var wincr;
        var xx;
        var blb;
        var bub;
        var einsum;
        var elsum;
        var j;
        qsqz = w * 0.5;

        if (qsqz >= bb) {
          return 1.0;
        }

        pr_w = 2 * pnorm_1.pnorm5(qsqz, 0, 1, true, false) - 1;
        if (pr_w >= exp(C2 / cc)) pr_w = pow(pr_w, cc);else pr_w = 0.0;
        if (w > wlar) wincr = wincr1;else wincr = wincr2;
        blb = qsqz;
        binc = (bb - qsqz) / wincr;
        bub = blb + binc;
        einsum = 0.0;
        cc1 = cc - 1.0;

        for (wi = 1; wi <= wincr; wi++) {
          elsum = 0.0;
          a = 0.5 * (bub + blb);
          b = 0.5 * (bub - blb);

          for (var jj = 1; jj <= nleg; jj++) {
            if (ihalf < jj) {
              j = nleg - jj + 1;
              xx = xleg[j - 1];
            } else {
              j = jj;
              xx = -xleg[j - 1];
            }

            c = b * xx;
            ac = a + c;
            qexpo = ac * ac;
            if (qexpo > C3) break;
            pplus = 2 * pnorm_1.pnorm5(ac, 0, 1, true, false);
            pminus = 2 * pnorm_1.pnorm5(ac, w, 1, true, false);
            rinsum = pplus * 0.5 - pminus * 0.5;

            if (rinsum >= exp(C1 / cc1)) {
              rinsum = aleg[j - 1] * exp(-(0.5 * qexpo)) * pow(rinsum, cc1);
              elsum += rinsum;
            }
          }

          elsum *= 2.0 * b * cc * _general_1.M_1_SQRT_2PI;
          einsum += elsum;
          blb = bub;
          bub += binc;
        }

        pr_w += einsum;
        if (pr_w <= exp(C1 / rr)) return 0;
        pr_w = pow(pr_w, rr);
        if (pr_w >= 1) return 1;
        return pr_w;
      }

      exports.wprob = wprob;
      /***/
    },
    /* 170 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _general_1 = __webpack_require__(0);

      var r_func_1 = __webpack_require__(2);

      var ISNAN = Number.isNaN;
      var log = Math.log;

      function dunif(x) {
        var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var logP = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        return r_func_1.map(x)(function (fx) {
          if (ISNAN(fx) || ISNAN(min) || ISNAN(max)) {
            return fx + min + max;
          }

          if (min <= fx && fx <= max) {
            return logP ? -log(max - min) : 1 / (max - min);
          }

          return _general_1.R_D__0(logP);
        });
      }

      exports.dunif = dunif;
      /***/
    },
    /* 171 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var printer = debug('punif');

      var _general_1 = __webpack_require__(0);

      var r_func_1 = __webpack_require__(2);

      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite;

      function punif(q) {
        var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var lowerTail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var logP = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        return r_func_1.map(q)(function (fx) {
          if (ISNAN(fx) || ISNAN(min) || ISNAN(max)) {
            return fx + min + max;
          }

          if (max < min) {
            return _general_1.ML_ERR_return_NAN(printer);
          }

          if (!R_FINITE(min) || !R_FINITE(max)) {
            return _general_1.ML_ERR_return_NAN(printer);
          }

          if (fx >= max) {
            return _general_1.R_DT_1(lowerTail, logP);
          }

          if (fx <= min) {
            return _general_1.R_DT_0(lowerTail, logP);
          }

          if (lowerTail) {
            return _general_1.R_D_val(logP, (fx - min) / (max - min));
          }

          return _general_1.R_D_val(logP, (max - fx) / (max - min));
        });
      }

      exports.punif = punif;
      /***/
    },
    /* 172 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _general_1 = __webpack_require__(0);

      var debug = __webpack_require__(1);

      var expm1_1 = __webpack_require__(3);

      var r_func_1 = __webpack_require__(2);

      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite;
      var printer = debug('qunif');

      function qunif(p) {
        var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var lowerTail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var logP = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        return r_func_1.map(p)(function (fp) {
          if (ISNAN(fp) || ISNAN(min) || ISNAN(max)) return NaN;

          var rc = _general_1.R_Q_P01_check(logP, fp);

          if (rc !== undefined) {
            return rc;
          }

          if (!R_FINITE(min) || !R_FINITE(max)) return _general_1.ML_ERR_return_NAN(printer);
          if (max < min) return _general_1.ML_ERR_return_NAN(printer);
          if (max === min) return min;
          return min + expm1_1.R_DT_qIv(lowerTail, logP, fp) * (max - min);
        });
      }

      exports.qunif = qunif;
      /***/
    },
    /* 173 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var R_FINITE = Number.isFinite;
      var printer = debug('runif');

      function runif() {
        var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var u = arguments.length > 3 ? arguments[3] : undefined;

        if (!(R_FINITE(min) && R_FINITE(max) && max > min)) {
          return _general_1.ML_ERR_return_NAN(printer);
        }

        var result = new Array(n).fill(0).map(function () {
          var s = u.unif_rand();
          return (max - min) * s + min;
        });
        return result.length === 1 ? result[0] : result;
      }

      exports.runif = runif;
      /***/
    },
    /* 174 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var r_func_1 = __webpack_require__(2);

      var pow = Math.pow,
          log = Math.log,
          exp = Math.exp;
      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite,
          ML_POSINF = Number.POSITIVE_INFINITY;
      var printer = debug('dweilbull');

      function dweibull(xx, shape) {
        var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var give_log = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        return r_func_1.map(xx)(function (x) {
          if (ISNAN(x) || ISNAN(shape) || ISNAN(scale)) return x + shape + scale;
          if (shape <= 0 || scale <= 0) return _general_1.ML_ERR_return_NAN(printer);
          if (x < 0) return _general_1.R_D__0(give_log);
          if (!R_FINITE(x)) return _general_1.R_D__0(give_log);
          if (x === 0 && shape < 1) return ML_POSINF;
          var tmp1 = pow(x / scale, shape - 1);
          var tmp2 = tmp1 * (x / scale);
          return give_log ? -tmp2 + log(shape * tmp1 / scale) : shape * tmp1 * exp(-tmp2) / scale;
        });
      }

      exports.dweibull = dweibull;
      /***/
    },
    /* 175 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var expm1_1 = __webpack_require__(3);

      var r_func_1 = __webpack_require__(2);

      var expm1 = Math.expm1,
          pow = Math.pow;
      var ISNAN = Number.isNaN;
      var printer = debug('pweibull');

      function pweibull(xx, shape) {
        var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var lower_tail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var log_p = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        return r_func_1.map(xx)(function (x) {
          if (ISNAN(x) || ISNAN(shape) || ISNAN(scale)) return x + shape + scale;
          if (shape <= 0 || scale <= 0) return _general_1.ML_ERR_return_NAN(printer);

          if (x <= 0) {
            return _general_1.R_DT_0(lower_tail, log_p);
          }

          x = -pow(x / scale, shape);
          return lower_tail ? log_p ? expm1_1.R_Log1_Exp(x) : -expm1(x) : _general_1.R_D_exp(log_p, x);
        });
      }

      exports.pweibull = pweibull;
      /***/
    },
    /* 176 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var expm1_1 = __webpack_require__(3);

      var r_func_1 = __webpack_require__(2);

      var pow = Math.pow;
      var ISNAN = Number.isNaN,
          ML_POSINF = Number.POSITIVE_INFINITY;
      var printer = debug('qweibull');

      function qweibull(pp, shape) {
        var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var lowerTail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var logP = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        return r_func_1.map(pp)(function (p) {
          if (ISNAN(p) || ISNAN(shape) || ISNAN(scale)) return p + shape + scale;
          if (shape <= 0 || scale <= 0) return _general_1.ML_ERR_return_NAN(printer);

          var rc = _general_1.R_Q_P01_boundaries(lowerTail, logP, p, 0, ML_POSINF);

          if (rc !== undefined) {
            return rc;
          }

          return scale * pow(-expm1_1.R_DT_Clog(lowerTail, logP, p), 1 / shape);
        });
      }

      exports.qweibull = qweibull;
      /***/
    },
    /* 177 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var r_func_1 = __webpack_require__(2);

      var log = Math.log,
          pow = Math.pow;
      var R_FINITE = Number.isFinite;
      var printer = debug('rweibull');

      function rweibull(n, shape) {
        var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var rng = arguments.length > 3 ? arguments[3] : undefined;
        var result = new Array(n).fill(0).map(function () {
          if (!R_FINITE(shape) || !R_FINITE(scale) || shape <= 0 || scale <= 0) {
            if (scale === 0) return 0;
            return _general_1.ML_ERR_return_NAN(printer);
          }

          return scale * pow(-log(rng.unif_rand()), 1.0 / shape);
        });
        return r_func_1.possibleScalar(result);
      }

      exports.rweibull = rweibull;
      /***/
    },
    /* 178 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var choose_1 = __webpack_require__(27);

      var r_func_1 = __webpack_require__(2);

      var cwilcox_1 = __webpack_require__(49);

      var WilcoxonCache_1 = __webpack_require__(48);

      var R_forceint = Math.round,
          fabs = Math.abs,
          log = Math.log;
      var ISNAN = Number.isNaN;
      var printer_dwilcox = debug('dwilcox');

      function dwilcox(xx, m, n) {
        var giveLog = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        m = R_forceint(m);
        n = R_forceint(n);
        return r_func_1.map(xx)(function (x) {
          var w = new WilcoxonCache_1.WilcoxonCache();

          if (ISNAN(x) || ISNAN(m) || ISNAN(n)) {
            return x + m + n;
          }

          if (m <= 0 || n <= 0) {
            return _general_1.ML_ERR_return_NAN(printer_dwilcox);
          }

          if (fabs(x - R_forceint(x)) > 1e-7) {
            return _general_1.R_D__0(giveLog);
          }

          x = R_forceint(x);

          if (x < 0 || x > m * n) {
            return _general_1.R_D__0(giveLog);
          }

          return giveLog ? log(cwilcox_1.cwilcox(x, m, n, w)) - choose_1.internal_lchoose(m + n, n) : cwilcox_1.cwilcox(x, m, n, w) / choose_1.internal_choose(m + n, n);
        });
      }

      exports.dwilcox = dwilcox;
      /***/
    },
    /* 179 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var choose_1 = __webpack_require__(27);

      var r_func_1 = __webpack_require__(2);

      var WilcoxonCache_1 = __webpack_require__(48);

      var cwilcox_1 = __webpack_require__(49);

      var R_forceint = Math.round,
          floor = Math.floor;
      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite;
      var printer_pwilcox = debug('pwilcox');

      function pwilcox(qq, m, n) {
        var lowerTail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var logP = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        m = R_forceint(m);
        n = R_forceint(n);
        return r_func_1.map(qq)(function (q) {
          var w = new WilcoxonCache_1.WilcoxonCache();
          var lower_tail = lowerTail;
          if (ISNAN(q) || ISNAN(m) || ISNAN(n)) return q + m + n;
          if (!R_FINITE(m) || !R_FINITE(n)) return _general_1.ML_ERR_return_NAN(printer_pwilcox);
          if (m <= 0 || n <= 0) return _general_1.ML_ERR_return_NAN(printer_pwilcox);
          q = floor(q + 1e-7);
          if (q < 0.0) return _general_1.R_DT_0(lower_tail, logP);
          if (q >= m * n) return _general_1.R_DT_1(lower_tail, logP);
          var c = choose_1.internal_choose(m + n, n);
          var p = 0;

          if (q <= m * n / 2) {
            for (var i = 0; i <= q; i++) {
              p += cwilcox_1.cwilcox(i, m, n, w) / c;
            }
          } else {
            q = m * n - q;

            for (var _i7 = 0; _i7 < q; _i7++) {
              p += cwilcox_1.cwilcox(_i7, m, n, w) / c;
            }

            lower_tail = !lower_tail;
          }

          return _general_1.R_DT_val(lower_tail, logP, p);
        });
      }

      exports.pwilcox = pwilcox;
      /***/
    },
    /* 180 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var expm1_1 = __webpack_require__(3);

      var r_func_1 = __webpack_require__(2);

      var cwilcox_1 = __webpack_require__(49);

      var WilcoxonCache_1 = __webpack_require__(48);

      var choose_1 = __webpack_require__(27);

      var R_forceint = Math.round,
          trunc = Math.trunc;
      var ISNAN = Number.isNaN,
          R_FINITE = Number.isFinite,
          DBL_EPSILON = Number.EPSILON;
      var printer_qwilcox = debug('qwilcox');

      function qwilcox(xx, m, n) {
        var lowerTail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var logP = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        m = R_forceint(m);
        n = R_forceint(n);
        var w = new WilcoxonCache_1.WilcoxonCache();
        return r_func_1.map(xx)(function (x) {
          if (ISNAN(x) || ISNAN(m) || ISNAN(n)) return x + m + n;
          if (!R_FINITE(x) || !R_FINITE(m) || !R_FINITE(n)) return _general_1.ML_ERR_return_NAN(printer_qwilcox);

          _general_1.R_Q_P01_check(logP, x);

          if (m <= 0 || n <= 0) return _general_1.ML_ERR_return_NAN(printer_qwilcox);
          if (x === _general_1.R_DT_0(lowerTail, logP)) return 0;
          if (x === _general_1.R_DT_1(lowerTail, logP)) return m * n;
          if (logP || !lowerTail) x = expm1_1.R_DT_qIv(lowerTail, logP, x);
          var c = choose_1.internal_choose(m + n, n);
          var p = 0;
          var q = 0;

          if (x <= 0.5) {
            x = x - 10 * DBL_EPSILON;

            while (true) {
              p += cwilcox_1.cwilcox(q, m, n, w) / c;
              if (p >= x) break;
              q++;
            }
          } else {
            x = 1 - x + 10 * DBL_EPSILON;

            while (true) {
              p += cwilcox_1.cwilcox(q, m, n, w) / c;

              if (p > x) {
                q = trunc(m * n - q);
                break;
              }

              q++;
            }
          }

          return q;
        });
      }

      exports.qwilcox = qwilcox;
      /***/
    },
    /* 181 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var debug = __webpack_require__(1);

      var _general_1 = __webpack_require__(0);

      var r_func_1 = __webpack_require__(2);

      var printer_rwilcox = debug('rwilcox');
      var R_forceint = Math.round,
          trunc = Math.trunc,
          floor = Math.floor;
      var ISNAN = Number.isNaN;

      function rwilcox(N, m, n, rng) {
        var result = new Array(N).fill(0).map(function () {
          if (ISNAN(m) || ISNAN(n)) return m + n;
          m = R_forceint(m);
          n = R_forceint(n);
          if (m < 0 || n < 0) return _general_1.ML_ERR_return_NAN(printer_rwilcox);
          if (m === 0 || n === 0) return 0;
          var r = 0.0;
          var k = trunc(m + n);
          var x = r_func_1.seq()()(0, k - 1);
          printer_rwilcox("------v");

          for (var i = 0; i < n; i++) {
            var j = floor(k * rng.unif_rand());
            r += x[j];
            x[j] = x[--k];
            printer_rwilcox('i:%d,\tn:%d\tj:%d\tk:%d\tr:%d\tx:%o', i, n, j, k, x);
          }

          return r - n * (n - 1) / 2;
        });
        return r_func_1.possibleScalar(result);
      }

      exports.rwilcox = rwilcox;
      /***/
    },
    /* 182 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      function _typeof(obj) {
        if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
          _typeof = function _typeof(obj) {
            return _typeof2(obj);
          };
        } else {
          _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
          };
        }

        return _typeof(obj);
      }
      /* eslint-env browser */

      /**
       * This is the web browser implementation of `debug()`.
       */


      exports.log = log;
      exports.formatArgs = formatArgs;
      exports.save = save;
      exports.load = load;
      exports.useColors = useColors;
      exports.storage = localstorage();
      /**
       * Colors.
       */

      exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
      /**
       * Currently only WebKit-based Web Inspectors, Firefox >= v31,
       * and the Firebug extension (any Firefox version) are known
       * to support "%c" CSS customizations.
       *
       * TODO: add a `localStorage` variable to explicitly enable/disable colors
       */
      // eslint-disable-next-line complexity

      function useColors() {
        // NB: In an Electron preload script, document will be defined but not fully
        // initialized. Since we know we're in Chrome, we'll just detect this case
        // explicitly
        if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
          return true;
        } // Internet Explorer and Edge do not support colors.


        if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
          return false;
        } // Is webkit? http://stackoverflow.com/a/16459606/376773
        // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


        return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
        typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
        // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
        typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
        typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
      }
      /**
       * Colorize log arguments if enabled.
       *
       * @api public
       */


      function formatArgs(args) {
        args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

        if (!this.useColors) {
          return;
        }

        var c = 'color: ' + this.color;
        args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
        // arguments passed either before or after the %c, so we need to
        // figure out the correct index to insert the CSS into

        var index = 0;
        var lastC = 0;
        args[0].replace(/%[a-zA-Z%]/g, function (match) {
          if (match === '%%') {
            return;
          }

          index++;

          if (match === '%c') {
            // We only are interested in the *last* %c
            // (the user may have provided their own)
            lastC = index;
          }
        });
        args.splice(lastC, 0, c);
      }
      /**
       * Invokes `console.log()` when available.
       * No-op when `console.log` is not a "function".
       *
       * @api public
       */


      function log() {
        var _console; // This hackery is required for IE8/9, where
        // the `console.log` function doesn't have 'apply'


        return (typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object' && console.log && (_console = console).log.apply(_console, arguments);
      }
      /**
       * Save `namespaces`.
       *
       * @param {String} namespaces
       * @api private
       */


      function save(namespaces) {
        try {
          if (namespaces) {
            exports.storage.setItem('debug', namespaces);
          } else {
            exports.storage.removeItem('debug');
          }
        } catch (error) {// Swallow
          // XXX (@Qix-) should we be logging these?
        }
      }
      /**
       * Load `namespaces`.
       *
       * @return {String} returns the previously persisted debug modes
       * @api private
       */


      function load() {
        var r;

        try {
          r = exports.storage.getItem('debug');
        } catch (error) {} // Swallow
        // XXX (@Qix-) should we be logging these?
        // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


        if (!r && typeof process !== 'undefined' && 'env' in process) {
          r = process.env.DEBUG;
        }

        return r;
      }
      /**
       * Localstorage attempts to return the localstorage.
       *
       * This is necessary because safari throws
       * when a user disables cookies/localstorage
       * and you attempt to access it.
       *
       * @return {LocalStorage}
       * @api private
       */


      function localstorage() {
        try {
          // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
          // The Browser also has localStorage in the global context.
          return localStorage;
        } catch (error) {// Swallow
          // XXX (@Qix-) should we be logging these?
        }
      }

      module.exports = __webpack_require__(78)(exports);
      var formatters = module.exports.formatters;
      /**
       * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
       */

      formatters.j = function (v) {
        try {
          return JSON.stringify(v);
        } catch (error) {
          return '[UnexpectedJSONParseError]: ' + error.message;
        }
      };
      /***/

    },
    /* 183 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";
      /**
       * Module dependencies.
       */

      var tty = __webpack_require__(186);

      var util = __webpack_require__(187);
      /**
       * This is the Node.js implementation of `debug()`.
       */


      exports.init = init;
      exports.log = log;
      exports.formatArgs = formatArgs;
      exports.save = save;
      exports.load = load;
      exports.useColors = useColors;
      /**
       * Colors.
       */

      exports.colors = [6, 2, 3, 4, 5, 1];

      try {
        // Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
        // eslint-disable-next-line import/no-extraneous-dependencies
        var supportsColor = __webpack_require__(185);

        if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
          exports.colors = [20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221];
        }
      } catch (error) {} // Swallow - we only care if `supports-color` is available; it doesn't have to be.

      /**
       * Build up the default `inspectOpts` object from the environment variables.
       *
       *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
       */


      exports.inspectOpts = Object.keys(process.env).filter(function (key) {
        return /^debug_/i.test(key);
      }).reduce(function (obj, key) {
        // Camel-case
        var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function (_, k) {
          return k.toUpperCase();
        }); // Coerce string value into JS value

        var val = process.env[key];

        if (/^(yes|on|true|enabled)$/i.test(val)) {
          val = true;
        } else if (/^(no|off|false|disabled)$/i.test(val)) {
          val = false;
        } else if (val === 'null') {
          val = null;
        } else {
          val = Number(val);
        }

        obj[prop] = val;
        return obj;
      }, {});
      /**
       * Is stdout a TTY? Colored output is enabled when `true`.
       */

      function useColors() {
        return 'colors' in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
      }
      /**
       * Adds ANSI color escape codes if enabled.
       *
       * @api public
       */


      function formatArgs(args) {
        var name = this.namespace,
            useColors = this.useColors;

        if (useColors) {
          var c = this.color;
          var colorCode = "\x1B[3" + (c < 8 ? c : '8;5;' + c);
          var prefix = "  ".concat(colorCode, ";1m").concat(name, " \x1B[0m");
          args[0] = prefix + args[0].split('\n').join('\n' + prefix);
          args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + "\x1B[0m");
        } else {
          args[0] = getDate() + name + ' ' + args[0];
        }
      }

      function getDate() {
        if (exports.inspectOpts.hideDate) {
          return '';
        }

        return new Date().toISOString() + ' ';
      }
      /**
       * Invokes `util.format()` with the specified arguments and writes to stderr.
       */


      function log() {
        return process.stderr.write(util.format.apply(util, arguments) + '\n');
      }
      /**
       * Save `namespaces`.
       *
       * @param {String} namespaces
       * @api private
       */


      function save(namespaces) {
        if (namespaces) {
          process.env.DEBUG = namespaces;
        } else {
          // If you set a process.env field to null or undefined, it gets cast to the
          // string 'null' or 'undefined'. Just delete instead.
          delete process.env.DEBUG;
        }
      }
      /**
       * Load `namespaces`.
       *
       * @return {String} returns the previously persisted debug modes
       * @api private
       */


      function load() {
        return process.env.DEBUG;
      }
      /**
       * Init logic for `debug` instances.
       *
       * Create a new `inspectOpts` object in case `useColors` is set
       * differently for a particular `debug` instance.
       */


      function init(debug) {
        debug.inspectOpts = {};
        var keys = Object.keys(exports.inspectOpts);

        for (var i = 0; i < keys.length; i++) {
          debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
        }
      }

      module.exports = __webpack_require__(78)(exports);
      var formatters = module.exports.formatters;
      /**
       * Map %o to `util.inspect()`, all on a single line.
       */

      formatters.o = function (v) {
        this.inspectOpts.colors = this.useColors;
        return util.inspect(v, this.inspectOpts).replace(/\s*\n\s*/g, ' ');
      };
      /**
       * Map %O to `util.inspect()`, allowing multiple lines if needed.
       */


      formatters.O = function (v) {
        this.inspectOpts.colors = this.useColors;
        return util.inspect(v, this.inspectOpts);
      };
      /***/

    },
    /* 184 */

    /***/
    function (module, exports) {
      /**
       * Helpers.
       */
      var s = 1000;
      var m = s * 60;
      var h = m * 60;
      var d = h * 24;
      var w = d * 7;
      var y = d * 365.25;
      /**
       * Parse or format the given `val`.
       *
       * Options:
       *
       *  - `long` verbose formatting [false]
       *
       * @param {String|Number} val
       * @param {Object} [options]
       * @throws {Error} throw an error if val is not a non-empty string or a number
       * @return {String|Number}
       * @api public
       */

      module.exports = function (val, options) {
        options = options || {};

        var type = _typeof2(val);

        if (type === 'string' && val.length > 0) {
          return parse(val);
        } else if (type === 'number' && isNaN(val) === false) {
          return options["long"] ? fmtLong(val) : fmtShort(val);
        }

        throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
      };
      /**
       * Parse the given `str` and return milliseconds.
       *
       * @param {String} str
       * @return {Number}
       * @api private
       */


      function parse(str) {
        str = String(str);

        if (str.length > 100) {
          return;
        }

        var match = /^((?:\d+)?\-?\d?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);

        if (!match) {
          return;
        }

        var n = parseFloat(match[1]);
        var type = (match[2] || 'ms').toLowerCase();

        switch (type) {
          case 'years':
          case 'year':
          case 'yrs':
          case 'yr':
          case 'y':
            return n * y;

          case 'weeks':
          case 'week':
          case 'w':
            return n * w;

          case 'days':
          case 'day':
          case 'd':
            return n * d;

          case 'hours':
          case 'hour':
          case 'hrs':
          case 'hr':
          case 'h':
            return n * h;

          case 'minutes':
          case 'minute':
          case 'mins':
          case 'min':
          case 'm':
            return n * m;

          case 'seconds':
          case 'second':
          case 'secs':
          case 'sec':
          case 's':
            return n * s;

          case 'milliseconds':
          case 'millisecond':
          case 'msecs':
          case 'msec':
          case 'ms':
            return n;

          default:
            return undefined;
        }
      }
      /**
       * Short format for `ms`.
       *
       * @param {Number} ms
       * @return {String}
       * @api private
       */


      function fmtShort(ms) {
        var msAbs = Math.abs(ms);

        if (msAbs >= d) {
          return Math.round(ms / d) + 'd';
        }

        if (msAbs >= h) {
          return Math.round(ms / h) + 'h';
        }

        if (msAbs >= m) {
          return Math.round(ms / m) + 'm';
        }

        if (msAbs >= s) {
          return Math.round(ms / s) + 's';
        }

        return ms + 'ms';
      }
      /**
       * Long format for `ms`.
       *
       * @param {Number} ms
       * @return {String}
       * @api private
       */


      function fmtLong(ms) {
        var msAbs = Math.abs(ms);

        if (msAbs >= d) {
          return plural(ms, msAbs, d, 'day');
        }

        if (msAbs >= h) {
          return plural(ms, msAbs, h, 'hour');
        }

        if (msAbs >= m) {
          return plural(ms, msAbs, m, 'minute');
        }

        if (msAbs >= s) {
          return plural(ms, msAbs, s, 'second');
        }

        return ms + ' ms';
      }
      /**
       * Pluralization helper.
       */


      function plural(ms, msAbs, n, name) {
        var isPlural = msAbs >= n * 1.5;
        return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
      }
      /***/

    },
    /* 185 */

    /***/
    function (module, exports) {
      module.exports = __webpack_require__(10);
      /***/
    },
    /* 186 */

    /***/
    function (module, exports) {
      module.exports = __webpack_require__(6);
      /***/
    },
    /* 187 */

    /***/
    function (module, exports) {
      module.exports = __webpack_require__(7);
      /***/
    }
    /******/
    ])
  );
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(4), __webpack_require__(5)(module)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

exports.isatty = function () { return false; };

function ReadStream() {
  throw new Error('tty.ReadStream is not implemented');
}
exports.ReadStream = ReadStream;

function WriteStream() {
  throw new Error('tty.ReadStream is not implemented');
}
exports.WriteStream = WriteStream;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(8);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(9);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}

exports.promisify.custom = kCustomPromisifiedSymbol

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb, null, ret) },
            function(rej) { process.nextTick(callbackifyOnRejected, rej, cb) });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(4)))

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 9 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = {
	stdout: false,
	stderr: false
};


/***/ })
/******/ ]);
});