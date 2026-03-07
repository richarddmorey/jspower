(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["jspower"] = factory();
	else
		root["jspower"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var ttest2_pwr = (__webpack_require__(1).ttest2_pwr);
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


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var __classPrivateFieldGet = this && this.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ttest2_pwr_cache, _ttest2_pwr_design, _ttest2_pwr_test, _ttest2_pwr_curve, _ttest2_pwr_stamp, _ttest2_pwr_power1, _ttest2_pwr_compute_criterion, _ttest2_pwr_es_power, _ttest2_pwr_n_power;
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var Validator = __webpack_require__(2);
/* Some validation rules */
var prob_inclusive_vrule = 'between:0,1';
var prob_exclusive_vrule = "between:".concat(Number.EPSILON, ",").concat(1 - Number.EPSILON);
var n_vrule = ["min:2", "integer"];
var positive_vrule = "min:".concat(Number.EPSILON);
var side_vrule = "in:-1,1";
var fmin = (__webpack_require__(58).fmin0);
var libR = __webpack_require__(59);
var StudentT = libR.StudentT,
  Normal = libR.Normal,
  Logistic = libR.Logistic;
var _StudentT = StudentT(),
  pt = _StudentT.pt,
  qt = _StudentT.qt,
  dt = _StudentT.dt;
var _Normal = Normal(),
  pnorm = _Normal.pnorm,
  qnorm = _Normal.qnorm;
var _Logistic = Logistic(),
  plogis = _Logistic.plogis,
  qlogis = _Logistic.qlogis;
var pwr_curve_vrule = {
  es: "numeric",
  power: prob_exclusive_vrule
};
;
var ttest2_design_vrule = {
  n1: n_vrule,
  n2: n_vrule,
  nratio: positive_vrule
};
var ttest2_test_vrule = {
  alpha: prob_exclusive_vrule,
  es0: "numeric",
  side: side_vrule
};
var ttest2_pwr = /*#__PURE__*/function () {
  function ttest2_pwr() {
    var _this = this;
    var precision_2alpha = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.2;
    var nratio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var test = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    _classCallCheck(this, ttest2_pwr);
    this.names = {
      es: "𝛿",
      test_stat: "t"
    };
    _ttest2_pwr_cache.set(this, {
      criterion: {}
    });
    _ttest2_pwr_design.set(this, {
      n1: 50,
      n2: 50,
      nratio: 1
    });
    _ttest2_pwr_test.set(this, {
      es0: 0,
      side: 1,
      alpha: 0.025
    });
    _ttest2_pwr_curve.set(this, {
      es: 0.1,
      power: 0.9
    });
    _ttest2_pwr_stamp.set(this, function () {
      _this.randstamp = Math.random().toString(36).substring(2);
      _this.timestamp = Date.now();
    }
    // Note that this returns log-odds of power!
    );
    // Note that this returns log-odds of power!
    _ttest2_pwr_power1.set(this, function (n1, n2, delta, alpha, criterion, delta0) {
      var neff = n1 * n2 / (n1 + n2);
      var df = n1 + n2 - 2;
      if (typeof criterion === 'undefined') criterion = __classPrivateFieldGet(_this, _ttest2_pwr_compute_criterion, "f").call(_this, n1, n2, alpha, delta0);
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
    _ttest2_pwr_compute_criterion.set(this, function (n1, n2, alpha, delta0) {
      n1 = Math.ceil(n1);
      var ns0 = n1 > n2 ? [n2, n1] : [n1, n2];
      var ns = ns0.toString();
      var key = "".concat(delta0, ",").concat(alpha, ",").concat(ns);
      var f0,
        criterion,
        i = 0;
      if (key in __classPrivateFieldGet(_this, _ttest2_pwr_cache, "f").criterion && _this.options.criterion.cache) {
        criterion = __classPrivateFieldGet(_this, _ttest2_pwr_cache, "f").criterion[key];
      } else {
        var neff = n1 * n2 / (n1 + n2);
        var df = n1 + n2 - 2;
        if (delta0 == 0) {
          criterion = -qt(alpha, df);
        } else {
          var ncp = delta0 * Math.sqrt(neff);
          criterion = qt(alpha, df, ncp, false);
        }
        if (_this.options.criterion.cache) __classPrivateFieldGet(_this, _ttest2_pwr_cache, "f").criterion[key] = criterion;
      }
      return criterion;
    });
    _ttest2_pwr_es_power.set(this, function (pow, criterion) {
      var n1 = __classPrivateFieldGet(_this, _ttest2_pwr_design, "f").n1;
      var n2 = _this.n2;
      var delta0 = __classPrivateFieldGet(_this, _ttest2_pwr_test, "f").side < 0 ? -__classPrivateFieldGet(_this, _ttest2_pwr_test, "f").es0 : __classPrivateFieldGet(_this, _ttest2_pwr_test, "f").es0;
      var s_dn = _this.options.es.s_dn;
      var s_up = _this.options.es.s_up;
      var shift_dn = _this.options.es.shift_dn;
      var shift_up = _this.options.es.shift_up;
      var fix_n2 = _this.options.fix_n2;
      if (pow == __classPrivateFieldGet(_this, _ttest2_pwr_test, "f").alpha) return __classPrivateFieldGet(_this, _ttest2_pwr_test, "f").es0;
      if (__classPrivateFieldGet(_this, _ttest2_pwr_test, "f").side < 0) criterion = -criterion;
      var es_up, es_lo, pow_up, pow_lo;
      var qpow = qlogis(pow);
      var neff = n1 * n2 / (n2 + n2);
      var df = n1 + n2 - 2;
      var tmp = criterion - qnorm(pow, 0, 1, false);
      es_up = (tmp + s_up) / Math.sqrt(neff);
      es_lo = (tmp - s_dn) / Math.sqrt(neff);
      pow_up = __classPrivateFieldGet(_this, _ttest2_pwr_power1, "f").call(_this, n1, n2, es_up, undefined, criterion, delta0);
      pow_lo = __classPrivateFieldGet(_this, _ttest2_pwr_power1, "f").call(_this, n1, n2, es_lo, undefined, criterion, delta0);
      while (pow_up < qpow) {
        es_lo = es_up;
        es_up = es_up + shift_up / Math.sqrt(neff);
        pow_up = __classPrivateFieldGet(_this, _ttest2_pwr_power1, "f").call(_this, n1, n2, es_up, undefined, criterion, delta0);
      }
      while (pow_lo > qpow) {
        es_up = es_lo;
        es_lo = es_lo - shift_dn / Math.sqrt(neff);
        pow_lo = __classPrivateFieldGet(_this, _ttest2_pwr_power1, "f").call(_this, n1, n2, es_lo, undefined, criterion, delta0);
      }
      if (fix_n2) {
        es_lo = __classPrivateFieldGet(_this, _ttest2_pwr_test, "f").es0 - qnorm(__classPrivateFieldGet(_this, _ttest2_pwr_test, "f").alpha) / Math.sqrt(n2) + qnorm(pow) / Math.sqrt(n1);
      }
      var this0 = _this;
      var opt_fun = function opt_fun(delta) {
        var obj = __classPrivateFieldGet(this0, _ttest2_pwr_power1, "f").call(this0, n1, n2, delta, undefined, criterion, delta0) - qpow;
        return obj * obj;
      };
      return fmin(es_lo, es_up, opt_fun, _this.options.es.tol).x;
    });
    _ttest2_pwr_n_power.set(this, function (pow, delta) {
      var alpha = __classPrivateFieldGet(_this, _ttest2_pwr_test, "f").alpha;
      var nratio = __classPrivateFieldGet(_this, _ttest2_pwr_design, "f").nratio;
      var s_dn = _this.options.n.s_dn;
      var s_up = _this.options.n.s_up;
      var shift_dn = _this.options.n.shift_dn;
      var shift_up = _this.options.n.shift_up;
      var n1_max_pow = _this.options.n.n1_max_pow;
      var n1_max_min = _this.options.n.n1_max_min;
      var delta0 = __classPrivateFieldGet(_this, _ttest2_pwr_test, "f").side < 0 ? -__classPrivateFieldGet(_this, _ttest2_pwr_test, "f").es0 : __classPrivateFieldGet(_this, _ttest2_pwr_test, "f").es0;
      var fix_n2 = _this.options.fix_n2;
      if (fix_n2) {
        var ncp = -Math.abs(delta - delta0) * Math.sqrt(_this.n2);
        if (pow >= pnorm(qnorm(alpha), ncp)) {
          return Infinity;
        }
      }
      if (__classPrivateFieldGet(_this, _ttest2_pwr_test, "f").side < 0) delta = -delta;
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
      pow_up = __classPrivateFieldGet(_this, _ttest2_pwr_power1, "f").call(_this, n_up, n2_up, delta, alpha, undefined, delta0);
      pow_lo = __classPrivateFieldGet(_this, _ttest2_pwr_power1, "f").call(_this, n_lo, n2_lo, delta, alpha, undefined, delta0);
      if (n_up == 2) return 2;
      while (pow_up < qpow) {
        n_lo = n_up;
        n_up = n_up * shift_up;
        if (!fix_n2) {
          n2_lo = n2_up;
          n2_up = n2_up * shift_up;
        }
        pow_up = __classPrivateFieldGet(_this, _ttest2_pwr_power1, "f").call(_this, n_up, n2_up, delta, alpha, undefined, delta0);
      }
      while (pow_lo > qpow && n_lo >= 2) {
        n_up = n_lo;
        n_lo = n_lo * shift_dn;
        if (!fix_n2) {
          n2_up = n2_lo;
          n2_lo = n2_lo * shift_dn;
        }
        pow_lo = __classPrivateFieldGet(_this, _ttest2_pwr_power1, "f").call(_this, n_lo, n2_lo, delta, alpha, undefined, delta0);
      }
      // Ensure group 2 has at least two samples in it
      if (!fix_n2 && n_lo * nratio < 2) n_lo = 2 / nratio;
      var this0 = _this;
      var opt_fun = function opt_fun(n1) {
        var obj = __classPrivateFieldGet(this0, _ttest2_pwr_power1, "f").call(this0, n1, fix_n2 ? n2 : Math.ceil(n1 * nratio), delta, alpha, undefined, delta0) - qpow;
        return obj * obj;
      };
      var n_opt = fmin(n_lo, n_up, opt_fun, _this.options.n.tol);
      return Math.ceil(n_opt.x);
    });
    __classPrivateFieldGet(this, _ttest2_pwr_design, "f").nratio = nratio;
    __classPrivateFieldGet(this, _ttest2_pwr_stamp, "f").call(this);
    this.id = Math.random().toString(36).substring(2);
    Object.assign(__classPrivateFieldGet(this, _ttest2_pwr_test, "f"), test);
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
    var fix_n2 = this.options.fix_n2;
    this.options.fix_n2 = false;
    this.precision_2alpha = precision_2alpha;
    this.curve = {
      es: this.es1mAlpha,
      power: 1 - this.test.alpha
    };
    this.options.fix_n2 = fix_n2;
  }
  return _createClass(ttest2_pwr, [{
    key: "find_power",
    value: function find_power(es) {
      var typeS = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var design = __classPrivateFieldGet(this, _ttest2_pwr_design, "f");
      var test = __classPrivateFieldGet(this, _ttest2_pwr_test, "f");
      var curve = __classPrivateFieldGet(this, _ttest2_pwr_curve, "f");
      var n2 = this.n2;
      var side = test.side;
      var criterion;
      if (typeof es === 'undefined') es = [curve.es];
      if (typeS) {
        criterion = -Math.sign(side) * __classPrivateFieldGet(this, _ttest2_pwr_compute_criterion, "f").call(this, design.n1, this.n2, test.alpha, -Math.sign(side) * test.es0);
      } else {
        criterion = Math.sign(side) * __classPrivateFieldGet(this, _ttest2_pwr_compute_criterion, "f").call(this, design.n1, this.n2, test.alpha, Math.sign(side) * test.es0);
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
          return plogis(-__classPrivateFieldGet(this0, _ttest2_pwr_power1, "f").call(this0, design.n1, n2, delta, test.alpha, criterion0, delta0));
        } else {
          return plogis(__classPrivateFieldGet(this0, _ttest2_pwr_power1, "f").call(this0, design.n1, n2, delta, test.alpha, criterion0, delta0));
        }
      });
    }
  }, {
    key: "find_es",
    value: function find_es(power) {
      var typeS = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var design = __classPrivateFieldGet(this, _ttest2_pwr_design, "f");
      var test = __classPrivateFieldGet(this, _ttest2_pwr_test, "f");
      var curve = __classPrivateFieldGet(this, _ttest2_pwr_curve, "f");
      if (typeof power === 'undefined') power = [curve.power];
      var criterion = Math.sign(test.side) * __classPrivateFieldGet(this, _ttest2_pwr_compute_criterion, "f").call(this, design.n1, this.n2, typeS ? 1 - test.alpha : test.alpha, Math.sign(test.side) * test.es0);
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
        return Math.sign(test.side) * __classPrivateFieldGet(this0, _ttest2_pwr_es_power, "f").call(this0, typeS ? 1 - power : power, criterion);
      });
    }
  }, {
    key: "find_n",
    value: function find_n(curve) {
      var design = __classPrivateFieldGet(this, _ttest2_pwr_design, "f");
      var test = __classPrivateFieldGet(this, _ttest2_pwr_test, "f");
      if (typeof curve === 'undefined') curve = [__classPrivateFieldGet(this, _ttest2_pwr_curve, "f")];
      var this0 = this;
      return curve.map(function (curve) {
        return __classPrivateFieldGet(this0, _ttest2_pwr_n_power, "f").call(this0, curve.power, curve.es);
      });
    }
  }, {
    key: "density",
    value: function density(x, es) {
      var cumulative = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var t = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var logp = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var sqrt_neff = Math.sqrt(this.n1 * this.n2 / (this.n1 + this.n2));
      var df = this.n1 + this.n2 - 2;
      var ncp = es * sqrt_neff;
      var s = t ? 1 : sqrt_neff;
      var lower_tail = true;
      return x.map(function (x) {
        if (cumulative) {
          var p = pt(x * s, df, ncp, lower_tail, true);
          return logp ? p : Math.exp(p);
        } else {
          var d = dt(x * s, df, ncp, true) + Math.log(s);
          return logp ? d : Math.exp(d);
        }
      });
    }
  }, {
    key: "quantile",
    value: function quantile(p, es) {
      var t = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var logp = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var sqrt_neff = Math.sqrt(this.n1 * this.n2 / (this.n1 + this.n2));
      var df = this.n1 + this.n2 - 2;
      var ncp = es * sqrt_neff;
      var s = t ? 1 : sqrt_neff;
      var lower_tail = true;
      return p.map(function (p) {
        return qt(p, df, ncp, lower_tail, logp) / s;
      });
    }
  }, {
    key: "clear_cache",
    value: function clear_cache() {
      var this0 = this;
      Object.keys(__classPrivateFieldGet(this, _ttest2_pwr_cache, "f")).map(function (key) {
        __classPrivateFieldGet(this0, _ttest2_pwr_cache, "f")[key] = {};
      });
    }
  }, {
    key: "design_report",
    value: function design_report() {
      var test = {};
      Object.assign(test, this.test, {
        es_type: this.names.es,
        criterion_on: this.names.test_stat,
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
        id: this.id,
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
      return __classPrivateFieldGet(this, _ttest2_pwr_cache, "f");
    }
  }, {
    key: "test",
    get: function get() {
      return __classPrivateFieldGet(this, _ttest2_pwr_test, "f");
    },
    set: function set(test) {
      var val = new Validator(test, ttest2_test_vrule);
      if (val.fails()) {
        throw 'Invalid test setup.';
      }
      var reset = false,
        i,
        which_change = [];
      var keys = Object.keys(__classPrivateFieldGet(this, _ttest2_pwr_test, "f"));
      for (i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (key in test) if (test[key] != __classPrivateFieldGet(this, _ttest2_pwr_test, "f")[key]) {
          which_change.push(key);
        }
      }
      if (which_change.length > 0) {
        Object.assign(__classPrivateFieldGet(this, _ttest2_pwr_test, "f"), test);
        if (which_change[0] == "alpha" && which_change.length == 1) {
          if (this.options.fix_es) {
            __classPrivateFieldGet(this, _ttest2_pwr_curve, "f").power = this.find_power([this.curve.es])[0];
          } else {
            __classPrivateFieldGet(this, _ttest2_pwr_curve, "f").es = this.find_es([this.curve.power])[0];
          }
        } else {
          __classPrivateFieldGet(this, _ttest2_pwr_curve, "f").es = this.find_es([this.curve.power])[0];
        }
      }
      __classPrivateFieldGet(this, _ttest2_pwr_stamp, "f").call(this);
    }
  }, {
    key: "n1",
    get: function get() {
      return __classPrivateFieldGet(this, _ttest2_pwr_design, "f").n1;
    },
    set: function set(n1) {
      if (__classPrivateFieldGet(this, _ttest2_pwr_design, "f").n1 == n1) return;
      var val = new Validator({
        n: n1
      }, {
        n: n_vrule
      });
      if (val.fails()) {
        throw 'Invalid sample size.';
      }
      __classPrivateFieldGet(this, _ttest2_pwr_design, "f").n1 = n1;
      if (this.options.fix_n2) {
        __classPrivateFieldGet(this, _ttest2_pwr_design, "f").nratio = n1 / this.n2;
      } else {
        __classPrivateFieldGet(this, _ttest2_pwr_design, "f").n2 = Math.ceil(n1 * this.nratio);
      }
      if (this.options.fix_es) {
        __classPrivateFieldGet(this, _ttest2_pwr_curve, "f").power = this.find_power([this.curve.es])[0];
      } else {
        __classPrivateFieldGet(this, _ttest2_pwr_curve, "f").es = this.find_es([this.curve.power])[0];
      }
      __classPrivateFieldGet(this, _ttest2_pwr_stamp, "f").call(this);
    }
  }, {
    key: "nratio",
    get: function get() {
      return __classPrivateFieldGet(this, _ttest2_pwr_design, "f").nratio;
    },
    set: function set(nratio) {
      var val = new Validator({
        nr: nratio
      }, {
        nr: positive_vrule
      });
      if (val.fails()) {
        throw 'Invalid sample size ratio.';
      }
      var ntotal = this.ntotal;
      var n2 = Math.ceil(ntotal * nratio / (1 + nratio));
      this.options.fix_n2 = false;
      __classPrivateFieldGet(this, _ttest2_pwr_design, "f").nratio = nratio;
      this.n1 = ntotal - n2;
    }
  }, {
    key: "n2",
    get: function get() {
      return __classPrivateFieldGet(this, _ttest2_pwr_design, "f").n2;
    },
    set: function set(n2) {
      n2 = Math.ceil(n2);
      var val = new Validator({
        n: n2
      }, {
        n2: n_vrule
      });
      if (val.fails()) {
        throw 'Invalid sample size.';
      }
      __classPrivateFieldGet(this, _ttest2_pwr_design, "f").n2 = n2;
      __classPrivateFieldGet(this, _ttest2_pwr_design, "f").nratio = n2 / this.n1;
      if (this.options.fix_es) {
        __classPrivateFieldGet(this, _ttest2_pwr_curve, "f").power = this.find_power([this.curve.es])[0];
      } else {
        __classPrivateFieldGet(this, _ttest2_pwr_curve, "f").es = this.find_es([this.curve.power])[0];
      }
      this.options.fix_n2 = true;
      __classPrivateFieldGet(this, _ttest2_pwr_stamp, "f").call(this);
    }
  }, {
    key: "ntotal",
    get: function get() {
      return this.n1 + this.n2;
    }
  }, {
    key: "es",
    set: function set(es) {
      if (__classPrivateFieldGet(this, _ttest2_pwr_curve, "f").es == es) return;
      var val = new Validator({
        es: es
      }, {
        es: 'number'
      });
      if (val.fails()) {
        throw 'Invalid effect size.';
      }
      __classPrivateFieldGet(this, _ttest2_pwr_curve, "f").es = es;
      __classPrivateFieldGet(this, _ttest2_pwr_curve, "f").power = this.find_power([es])[0];
      __classPrivateFieldGet(this, _ttest2_pwr_stamp, "f").call(this);
    }
  }, {
    key: "power",
    set: function set(power) {
      if (__classPrivateFieldGet(this, _ttest2_pwr_curve, "f").power == power) return;
      var val = new Validator({
        power: power
      }, {
        n: prob_exclusive_vrule
      });
      if (val.fails()) {
        throw 'Invalid power.';
      }
      __classPrivateFieldGet(this, _ttest2_pwr_curve, "f").power = power;
      __classPrivateFieldGet(this, _ttest2_pwr_curve, "f").es = this.find_es([power])[0];
      __classPrivateFieldGet(this, _ttest2_pwr_stamp, "f").call(this);
    }
  }, {
    key: "precision_2alpha",
    get: function get() {
      var es = this.find_es([1 - __classPrivateFieldGet(this, _ttest2_pwr_test, "f").alpha])[0];
      // add cache?
      return Math.abs(__classPrivateFieldGet(this, _ttest2_pwr_test, "f").es0 - es);
    },
    set: function set(p) {
      var val = new Validator({
        p: p
      }, {
        p: positive_vrule
      });
      if (val.fails()) {
        throw 'Invalid precision.';
      }
      var fix_n2 = this.options.fix_n2;
      var es = __classPrivateFieldGet(this, _ttest2_pwr_test, "f").es0 + Math.sign(__classPrivateFieldGet(this, _ttest2_pwr_test, "f").side) * Math.abs(p);
      var n1 = this.find_n([{
        es: es,
        power: 1 - __classPrivateFieldGet(this, _ttest2_pwr_test, "f").alpha
      }])[0];
      if (fix_n2) {
        __classPrivateFieldGet(this, _ttest2_pwr_design, "f").nratio = n1 / this.n2;
      } else {
        __classPrivateFieldGet(this, _ttest2_pwr_design, "f").n2 = Math.ceil(n1 * this.nratio);
      }
      this.n1 = n1;
      // add cache?
    }
  }, {
    key: "es50",
    get: function get() {
      // add cache?
      return this.find_es([0.5])[0];
    },
    set: function set(es) {
      var min_max = __classPrivateFieldGet(this, _ttest2_pwr_test, "f").side > 0 ? "min" : "max";
      var val = new Validator({
        es: es
      }, {
        es: "".concat(min_max, ":").concat(__classPrivateFieldGet(this, _ttest2_pwr_test, "f").es0 + Number.EPSILON)
      });
      if (val.fails()) {
        throw 'Invalid effect size.';
      }
      var n1 = this.find_n([{
        power: 0.5,
        es: es
      }])[0];
      var fix_n2 = this.options.fix_n2;
      if (fix_n2) {
        __classPrivateFieldGet(this, _ttest2_pwr_design, "f").nratio = n1 / this.n2;
      } else {
        __classPrivateFieldGet(this, _ttest2_pwr_design, "f").n2 = Math.ceil(n1 * this.nratio);
      }
      this.n1 = n1;
      // add cache?
    }
  }, {
    key: "powerLimit",
    get: function get() {
      return this.find_power([__classPrivateFieldGet(this, _ttest2_pwr_curve, "f").es], null, true)[0];
    }
  }, {
    key: "es1mAlpha",
    get: function get() {
      return __classPrivateFieldGet(this, _ttest2_pwr_test, "f").es0 + Math.sign(__classPrivateFieldGet(this, _ttest2_pwr_test, "f").side) * this.precision_2alpha;
    },
    set: function set(es) {
      var min_max = __classPrivateFieldGet(this, _ttest2_pwr_test, "f").side > 0 ? "min" : "max";
      var val = new Validator({
        es: es
      }, {
        es: "".concat(min_max, ":").concat(__classPrivateFieldGet(this, _ttest2_pwr_test, "f").es0 + Number.EPSILON)
      });
      if (val.fails()) {
        throw 'Invalid effect size.';
      }
      this.precision_2alpha = Math.abs(es - __classPrivateFieldGet(this, _ttest2_pwr_test, "f").es0);
    }
  }, {
    key: "curve",
    get: function get() {
      return __classPrivateFieldGet(this, _ttest2_pwr_curve, "f");
    },
    set: function set(curve) {
      var val = new Validator({
        curve: curve
      }, {
        curve: pwr_curve_vrule
      });
      if (val.fails()) {
        throw 'Invalid power curve values.';
      }
      var reset = false,
        i;
      var fix_n2 = this.options.fix_n2;
      var keys = Object.keys(__classPrivateFieldGet(this, _ttest2_pwr_curve, "f"));
      for (i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (key in curve) if (curve[key] != __classPrivateFieldGet(this, _ttest2_pwr_curve, "f")[key]) {
          reset = true;
          break;
        }
      }
      Object.assign(__classPrivateFieldGet(this, _ttest2_pwr_curve, "f"), curve);
      if (reset) {
        var n1 = this.find_n([{
          power: __classPrivateFieldGet(this, _ttest2_pwr_curve, "f").power,
          es: __classPrivateFieldGet(this, _ttest2_pwr_curve, "f").es
        }])[0];
        if (fix_n2) {
          __classPrivateFieldGet(this, _ttest2_pwr_design, "f").nratio = n1 / this.n2;
        } else {
          __classPrivateFieldGet(this, _ttest2_pwr_design, "f").n2 = Math.ceil(n1 * this.nratio);
        }
        this.n1 = n1;
      }
    }
  }, {
    key: "criterion",
    get: function get() {
      var delta0 = __classPrivateFieldGet(this, _ttest2_pwr_test, "f").es0;
      return Math.sign(__classPrivateFieldGet(this, _ttest2_pwr_test, "f").side) * __classPrivateFieldGet(this, _ttest2_pwr_compute_criterion, "f").call(this, __classPrivateFieldGet(this, _ttest2_pwr_design, "f").n1, this.n2, __classPrivateFieldGet(this, _ttest2_pwr_test, "f").alpha, __classPrivateFieldGet(this, _ttest2_pwr_test, "f").side < 0 ? -delta0 : delta0);
    }
  }]);
}();
_ttest2_pwr_cache = new WeakMap(), _ttest2_pwr_design = new WeakMap(), _ttest2_pwr_test = new WeakMap(), _ttest2_pwr_curve = new WeakMap(), _ttest2_pwr_stamp = new WeakMap(), _ttest2_pwr_power1 = new WeakMap(), _ttest2_pwr_compute_criterion = new WeakMap(), _ttest2_pwr_es_power = new WeakMap(), _ttest2_pwr_n_power = new WeakMap();
module.exports = {
  ttest2_pwr: ttest2_pwr
};

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Rules = __webpack_require__(3);
var Lang = __webpack_require__(4);
var Errors = __webpack_require__(56);
var Attributes = __webpack_require__(6);
var AsyncResolvers = __webpack_require__(57);

var Validator = function (input, rules, customMessages) {
  var lang = Validator.getDefaultLang();
  this.input = input || {};

  this.messages = Lang._make(lang);
  this.messages._setCustom(customMessages);
  this.setAttributeFormatter(Validator.prototype.attributeFormatter);

  this.errors = new Errors();
  this.errorCount = 0;

  this.hasAsync = false;
  this.rules = this._parseRules(rules);
};

Validator.prototype = {

  constructor: Validator,

  /**
   * Default language
   *
   * @type {string}
   */
  lang: 'en',

  /**
   * Numeric based rules
   *
   * @type {array}
   */
  numericRules: ['integer', 'numeric'],

  /**
   * Attribute formatter.
   *
   * @type {function}
   */
  attributeFormatter: Attributes.formatter,

  /**
   * Run validator
   *
   * @return {boolean} Whether it passes; true = passes, false = fails
   */
  check: function () {
    var self = this;

    for (var attribute in this.rules) {
      var attributeRules = this.rules[attribute];
      var inputValue = this._objectPath(this.input, attribute);

      if (this._hasRule(attribute, ['sometimes']) && !this._suppliedWithData(attribute)) {
        continue;
      }

      for (var i = 0, len = attributeRules.length, rule, ruleOptions, rulePassed; i < len; i++) {
        ruleOptions = attributeRules[i];
        rule = this.getRule(ruleOptions.name);

        if (!this._isValidatable(rule, inputValue)) {
          continue;
        }

        rulePassed = rule.validate(inputValue, ruleOptions.value, attribute);
        if (!rulePassed) {
          this._addFailure(rule);
        }

        if (this._shouldStopValidating(attribute, rulePassed)) {
          break;
        }
      }
    }

    return this.errorCount === 0;
  },

  /**
   * Run async validator
   *
   * @param {function} passes
   * @param {function} fails
   * @return {void}
   */
  checkAsync: function (passes, fails) {
    var _this = this;
    passes = passes || function () {};
    fails = fails || function () {};

    var failsOne = function (rule, message) {
      _this._addFailure(rule, message);
    };

    var resolvedAll = function (allPassed) {
      if (allPassed) {
        passes();
      } else {
        fails();
      }
    };

    var asyncResolvers = new AsyncResolvers(failsOne, resolvedAll);

    var validateRule = function (inputValue, ruleOptions, attribute, rule) {
      return function () {
        var resolverIndex = asyncResolvers.add(rule);
        rule.validate(inputValue, ruleOptions.value, attribute, function () {
          asyncResolvers.resolve(resolverIndex);
        });
      };
    };

    for (var attribute in this.rules) {
      var attributeRules = this.rules[attribute];
      var inputValue = this._objectPath(this.input, attribute);

      if (this._hasRule(attribute, ['sometimes']) && !this._suppliedWithData(attribute)) {
        continue;
      }

      for (var i = 0, len = attributeRules.length, rule, ruleOptions; i < len; i++) {
        ruleOptions = attributeRules[i];

        rule = this.getRule(ruleOptions.name);

        if (!this._isValidatable(rule, inputValue)) {
          continue;
        }

        validateRule(inputValue, ruleOptions, attribute, rule)();
      }
    }

    asyncResolvers.enableFiring();
    asyncResolvers.fire();
  },

  /**
   * Add failure and error message for given rule
   *
   * @param {Rule} rule
   */
  _addFailure: function (rule) {
    var msg = this.messages.render(rule);
    this.errors.add(rule.attribute, msg);
    this.errorCount++;
  },

  /**
   * Flatten nested object, normalizing { foo: { bar: 1 } } into: { 'foo.bar': 1 }
   *
   * @param  {object} nested object
   * @return {object} flattened object
   */
  _flattenObject: function (obj) {
    var flattened = {};

    function recurse(current, property) {
      if (!property && Object.getOwnPropertyNames(current).length === 0) {
        return;
      }
      if (Object(current) !== current || Array.isArray(current)) {
        flattened[property] = current;
      } else {
        var isEmpty = true;
        for (var p in current) {
          isEmpty = false;
          recurse(current[p], property ? property + '.' + p : p);
        }
        if (isEmpty) {
          flattened[property] = {};
        }
      }
    }
    if (obj) {
      recurse(obj);
    }
    return flattened;
  },

  /**
   * Extract value from nested object using string path with dot notation
   *
   * @param  {object} object to search in
   * @param  {string} path inside object
   * @return {any|void} value under the path
   */
  _objectPath: function (obj, path) {
    if (Object.prototype.hasOwnProperty.call(obj, path)) {
      return obj[path];
    }

    var keys = path.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '').split('.');
    var copy = {};
    for (var attr in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, attr)) {
        copy[attr] = obj[attr];
      }
    }

    for (var i = 0, l = keys.length; i < l; i++) {
      if (typeof copy === 'object' && copy !== null && Object.hasOwnProperty.call(copy, keys[i])) {
        copy = copy[keys[i]];
      } else {
        return;
      }
    }
    return copy;
  },

  /**
   * Parse rules, normalizing format into: { attribute: [{ name: 'age', value: 3 }] }
   *
   * @param  {object} rules
   * @return {object}
   */
  _parseRules: function (rules) {

    var parsedRules = {};
    rules = this._flattenObject(rules);

    for (var attribute in rules) {

      var rulesArray = rules[attribute];

      this._parseRulesCheck(attribute, rulesArray, parsedRules);
    }
    return parsedRules;


  },

  _parseRulesCheck: function (attribute, rulesArray, parsedRules, wildCardValues) {
    if (attribute.indexOf('*') > -1) {
      this._parsedRulesRecurse(attribute, rulesArray, parsedRules, wildCardValues);
    } else {
      this._parseRulesDefault(attribute, rulesArray, parsedRules, wildCardValues);
    }
  },

  _parsedRulesRecurse: function (attribute, rulesArray, parsedRules, wildCardValues) {
    var parentPath = attribute.substr(0, attribute.indexOf('*') - 1);
    var propertyValue = this._objectPath(this.input, parentPath);

    if (propertyValue) {
      for (var propertyNumber = 0; propertyNumber < propertyValue.length; propertyNumber++) {
        var workingValues = wildCardValues ? wildCardValues.slice() : [];
        workingValues.push(propertyNumber);
        this._parseRulesCheck(attribute.replace('*', propertyNumber), rulesArray, parsedRules, workingValues);
      }
    }
  },

  _parseRulesDefault: function (attribute, rulesArray, parsedRules, wildCardValues) {
    var attributeRules = [];

    if (rulesArray instanceof Array) {
      rulesArray = this._prepareRulesArray(rulesArray);
    }

    if (typeof rulesArray === 'string') {
      rulesArray = rulesArray.split('|');
    }

    for (var i = 0, len = rulesArray.length, rule; i < len; i++) {
      rule = typeof rulesArray[i] === 'string' ? this._extractRuleAndRuleValue(rulesArray[i]) : rulesArray[i];
      if (rule.value) {
        rule.value = this._replaceWildCards(rule.value, wildCardValues);
        this._replaceWildCardsMessages(wildCardValues);
      }

      if (Rules.isAsync(rule.name)) {
        this.hasAsync = true;
      }
      attributeRules.push(rule);
    }

    parsedRules[attribute] = attributeRules;
  },

  _replaceWildCards: function (path, nums) {

    if (!nums) {
      return path;
    }

    var path2 = path;
    nums.forEach(function (value) {
      if(Array.isArray(path2)){
        path2 = path2[0];
      }
      const pos = path2.indexOf('*');
      if (pos === -1) {
        return path2;
      }
      path2 = path2.substr(0, pos) + value + path2.substr(pos + 1);
    });
    if(Array.isArray(path)){
      path[0] = path2;
      path2 = path;
    }
    return path2;
  },

  _replaceWildCardsMessages: function (nums) {
    var customMessages = this.messages.customMessages;
    var self = this;
    Object.keys(customMessages).forEach(function (key) {
      if (nums) {
        var newKey = self._replaceWildCards(key, nums);
        customMessages[newKey] = customMessages[key];
      }
    });

    this.messages._setCustom(customMessages);
  },
  /**
   * Prepare rules if it comes in Array. Check for objects. Need for type validation.
   *
   * @param  {array} rulesArray
   * @return {array}
   */
  _prepareRulesArray: function (rulesArray) {
    var rules = [];

    for (var i = 0, len = rulesArray.length; i < len; i++) {
      if (typeof rulesArray[i] === 'object') {
        for (var rule in rulesArray[i]) {
          rules.push({
            name: rule,
            value: rulesArray[i][rule]
          });
        }
      } else {
        rules.push(rulesArray[i]);
      }
    }

    return rules;
  },

  /**
   * Determines if the attribute is supplied with the original data object.
   *
   * @param  {array} attribute
   * @return {boolean}
   */
  _suppliedWithData: function (attribute) {
    return this.input.hasOwnProperty(attribute);
  },

  /**
   * Extract a rule and a value from a ruleString (i.e. min:3), rule = min, value = 3
   *
   * @param  {string} ruleString min:3
   * @return {object} object containing the name of the rule and value
   */
  _extractRuleAndRuleValue: function (ruleString) {
    var rule = {},
      ruleArray;

    rule.name = ruleString;

    if (ruleString.indexOf(':') >= 0) {
      ruleArray = ruleString.split(':');
      rule.name = ruleArray[0];
      rule.value = ruleArray.slice(1).join(':');
    }

    return rule;
  },

  /**
   * Determine if attribute has any of the given rules
   *
   * @param  {string}  attribute
   * @param  {array}   findRules
   * @return {boolean}
   */
  _hasRule: function (attribute, findRules) {
    var rules = this.rules[attribute] || [];
    for (var i = 0, len = rules.length; i < len; i++) {
      if (findRules.indexOf(rules[i].name) > -1) {
        return true;
      }
    }
    return false;
  },

  /**
   * Determine if attribute has any numeric-based rules.
   *
   * @param  {string}  attribute
   * @return {Boolean}
   */
  _hasNumericRule: function (attribute) {
    return this._hasRule(attribute, this.numericRules);
  },

  /**
   * Determine if rule is validatable
   *
   * @param  {Rule}   rule
   * @param  {mixed}  value
   * @return {boolean}
   */
  _isValidatable: function (rule, value) {
    if (Array.isArray(value)) {
      return true;
    }
    if (Rules.isImplicit(rule.name)) {
      return true;
    }

    return this.getRule('required').validate(value);
  },

  /**
   * Determine if we should stop validating.
   *
   * @param  {string} attribute
   * @param  {boolean} rulePassed
   * @return {boolean}
   */
  _shouldStopValidating: function (attribute, rulePassed) {

    var stopOnAttributes = this.stopOnAttributes;
    if (typeof stopOnAttributes === 'undefined' || stopOnAttributes === false || rulePassed === true) {
      return false;
    }

    if (stopOnAttributes instanceof Array) {
      return stopOnAttributes.indexOf(attribute) > -1;
    }

    return true;
  },

  /**
   * Set custom attribute names.
   *
   * @param {object} attributes
   * @return {void}
   */
  setAttributeNames: function (attributes) {
    this.messages._setAttributeNames(attributes);
  },

  /**
   * Set the attribute formatter.
   *
   * @param {fuction} func
   * @return {void}
   */
  setAttributeFormatter: function (func) {
    this.messages._setAttributeFormatter(func);
  },

  /**
   * Get validation rule
   *
   * @param  {string} name
   * @return {Rule}
   */
  getRule: function (name) {
    return Rules.make(name, this);
  },

  /**
   * Stop on first error.
   *
   * @param  {boolean|array} An array of attributes or boolean true/false for all attributes.
   * @return {void}
   */
  stopOnError: function (attributes) {
    this.stopOnAttributes = attributes;
  },

  /**
   * Determine if validation passes
   *
   * @param {function} passes
   * @return {boolean|undefined}
   */
  passes: function (passes) {
    var async = this._checkAsync('passes', passes);
    if (async) {
      return this.checkAsync(passes);
    }
    return this.check();
  },

  /**
   * Determine if validation fails
   *
   * @param {function} fails
   * @return {boolean|undefined}
   */
  fails: function (fails) {
    var async = this._checkAsync('fails', fails);
    if (async) {
      return this.checkAsync(function () {}, fails);
    }
    return !this.check();
  },

  /**
   * Check if validation should be called asynchronously
   *
   * @param  {string}   funcName Name of the caller
   * @param  {function} callback
   * @return {boolean}
   */
  _checkAsync: function (funcName, callback) {
    var hasCallback = typeof callback === 'function';
    if (this.hasAsync && !hasCallback) {
      throw funcName + ' expects a callback when async rules are being tested.';
    }

    return this.hasAsync || hasCallback;
  }

};

/**
 * Set messages for language
 *
 * @param {string} lang
 * @param {object} messages
 * @return {this}
 */
Validator.setMessages = function (lang, messages) {
  Lang._set(lang, messages);
  return this;
};

/**
 * Get messages for given language
 *
 * @param  {string} lang
 * @return {Messages}
 */
Validator.getMessages = function (lang) {
  return Lang._get(lang);
};

/**
 * Set default language to use
 *
 * @param {string} lang
 * @return {void}
 */
Validator.useLang = function (lang) {
  this.prototype.lang = lang;
};

/**
 * Get default language
 *
 * @return {string}
 */
Validator.getDefaultLang = function () {
  return this.prototype.lang;
};

/**
 * Set the attribute formatter.
 *
 * @param {fuction} func
 * @return {void}
 */
Validator.setAttributeFormatter = function (func) {
  this.prototype.attributeFormatter = func;
};

/**
 * Stop on first error.
 *
 * @param  {boolean|array} An array of attributes or boolean true/false for all attributes.
 * @return {void}
 */
Validator.stopOnError = function (attributes) {
  this.prototype.stopOnAttributes = attributes;
};

/**
 * Register custom validation rule
 *
 * @param  {string}   name
 * @param  {function} fn
 * @param  {string}   message
 * @return {void}
 */
Validator.register = function (name, fn, message, fnReplacement) {
  var lang = Validator.getDefaultLang();
  Rules.register(name, fn);
  Lang._setRuleMessage(lang, name, message);
};

/**
 * Register custom validation rule
 *
 * @param  {string}   name
 * @param  {function} fn
 * @param  {string}   message
 * @param  {function} fnReplacement
 * @return {void}
 */
Validator.registerImplicit = function (name, fn, message, fnReplacement) {
  var lang = Validator.getDefaultLang();
  Rules.registerImplicit(name, fn);
  Lang._setRuleMessage(lang, name, message);
};

/**
 * Register asynchronous validation rule
 *
 * @param  {string}   name
 * @param  {function} fn
 * @param  {string}   message
 * @return {void}
 */
Validator.registerAsync = function (name, fn, message, fnReplacement) {
  var lang = Validator.getDefaultLang();
  Rules.registerAsync(name, fn);
  Lang._setRuleMessage(lang, name, message);
};

/**
 * Register asynchronous validation rule
 *
 * @param  {string}   name
 * @param  {function} fn
 * @param  {string}   message
 * @return {void}
 */
Validator.registerAsyncImplicit = function (name, fn, message) {
  var lang = Validator.getDefaultLang();
  Rules.registerAsyncImplicit(name, fn);
  Lang._setRuleMessage(lang, name, message);
};

/**
 * Register validator for missed validation rule
 *
 * @param  {string}   name
 * @param  {function} fn
 * @param  {string}   message
 * @return {void}
 */
Validator.registerMissedRuleValidator = function(fn, message) {
  Rules.registerMissedRuleValidator(fn, message);
};

module.exports = Validator;


/***/ }),
/* 3 */
/***/ ((module) => {


// https://docs.microsoft.com/en-us/office/troubleshoot/excel/determine-a-leap-year
function leapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function checkFalsePositiveDates(dateString = '') {

  if (dateString.length === 10) {

    // massage input to use yyyy-mm-dd format
    // we support yyyy/mm/dd or yyyy.mm.dd
    let normalizedDate = dateString.replace('.', '-').replace('/', '-');
    let parts = normalizedDate.split('-');
    if (parts.length === 3) {
      if (parts[0].length === 4) {
        // yyyy-mm-dd format
        let y = parseInt(parts[0]);
        let m = parseInt(parts[1]);
        let d = parseInt(parts[2]);
        if (m === 2) {
          // return leapYear(y) ? d <= 29 : d <= 28;
          if (leapYear(y)) {
            if (d > 29) {
              return false;
            }
          } else {
            if (d > 28) {
              return false;
            }
          }
        }
        if (m === 4 || m === 6 || m === 9 || m === 11) {
          if (d > 30) {
            return false;
          }
        }
      }
    }
    return true; // we are not in feburary, proceed
  }
  return true; // we are not testing formatted date, proceed to rest of validation
}

function isValidDate(dateString) {
  let testDate;
  if (typeof dateString === 'number') {
    testDate = new Date(dateString);
    if (typeof testDate === 'object') {
      return true;
    }
  }
  // first convert incoming string to date object and see if it correct date and format
  testDate = new Date(dateString);
  if (typeof testDate === 'object') {
    if (testDate.toString() === 'Invalid Date') {
      return false;
    }

    /**
     * Check for false positive dates
     * perform special check on february as JS `new Date` incorrectly returns valid date
     * Eg.  let newDate = new Date('2020-02-29')  // returns as March 02 2020
     * Eg.  let newDate = new Date('2019-02-29')  // returns as March 01 2020
     * Eg.  let newDate = new Date('2019-04-31')  // returns as April 30 2020
     */
    if (!checkFalsePositiveDates(dateString)) {
      return false;
    }

    // valid date object and not a february date
    return true;
  }

  // First check for the pattern
  var regex_date = /^\d{4}\-\d{1,2}\-\d{1,2}$/;

  if (!regex_date.test(dateString)) {
    return false;
  }

  // Parse the date parts to integers
  var parts = dateString.split("-");
  var day = parseInt(parts[2], 10);
  var month = parseInt(parts[1], 10);
  var year = parseInt(parts[0], 10);

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month == 0 || month > 12) {
    return false;
  }

  var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
    monthLength[1] = 29;
  }

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
}

var rules = {
  required: function (val) {
    var str;

    if (val === undefined || val === null) {
      return false;
    }

    str = String(val).replace(/\s/g, "");
    return str.length > 0 ? true : false;
  },

  required_if: function (val, req, attribute) {
    req = this.getParameters();
    if (this.validator._objectPath(this.validator.input, req[0]) === req[1]) {
      return this.validator.getRule("required").validate(val);
    }

    return true;
  },

  required_unless: function (val, req, attribute) {
    req = this.getParameters();
    if (this.validator._objectPath(this.validator.input, req[0]) !== req[1]) {
      return this.validator.getRule("required").validate(val);
    }

    return true;
  },

  required_with: function (val, req, attribute) {
    if (this.validator._objectPath(this.validator.input, req)) {
      return this.validator.getRule("required").validate(val);
    }

    return true;
  },

  required_with_all: function (val, req, attribute) {
    req = this.getParameters();

    for (var i = 0; i < req.length; i++) {
      if (!this.validator._objectPath(this.validator.input, req[i])) {
        return true;
      }
    }

    return this.validator.getRule("required").validate(val);
  },

  required_without: function (val, req, attribute) {
    if (this.validator._objectPath(this.validator.input, req)) {
      return true;
    }

    return this.validator.getRule("required").validate(val);
  },

  required_without_all: function (val, req, attribute) {
    req = this.getParameters();

    for (var i = 0; i < req.length; i++) {
      if (this.validator._objectPath(this.validator.input, req[i])) {
        return true;
      }
    }

    return this.validator.getRule("required").validate(val);
  },

  boolean: function (val) {
    return (
      val === true ||
      val === false ||
      val === 0 ||
      val === 1 ||
      val === "0" ||
      val === "1" ||
      val === "true" ||
      val === "false"
    );
  },

  // compares the size of strings
  // with numbers, compares the value
  size: function (val, req, attribute) {
    if (val) {
      req = parseFloat(req);

      var size = this.getSize();

      return size === req;
    }

    return true;
  },

  string: function (val, req, attribute) {
    return typeof val === "string";
  },

  sometimes: function (val) {
    return true;
  },

  /**
   * Compares the size of strings or the value of numbers if there is a truthy value
   */
  min: function (val, req, attribute) {
    var size = this.getSize();
    return size >= req;
  },

  /**
   * Compares the size of strings or the value of numbers if there is a truthy value
   */
  max: function (val, req, attribute) {
    var size = this.getSize();
    return size <= req;
  },

  between: function (val, req, attribute) {
    req = this.getParameters();
    var size = this.getSize();
    var min = parseFloat(req[0], 10);
    var max = parseFloat(req[1], 10);
    return size >= min && size <= max;
  },

  email: function (val) {
    // Added umlaut support https://github.com/skaterdav85/validatorjs/issues/308
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(val)) {
      // added support domain 3-n level https://github.com/skaterdav85/validatorjs/issues/384
      re = /^((?:[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]|[^\u0000-\u007F])+@(?:[a-zA-Z0-9]|[^\u0000-\u007F])(?:(?:[a-zA-Z0-9-]|[^\u0000-\u007F]){0,61}(?:[a-zA-Z0-9]|[^\u0000-\u007F]))?(?:\.(?:[a-zA-Z0-9]|[^\u0000-\u007F])(?:(?:[a-zA-Z0-9-]|[^\u0000-\u007F]){0,61}(?:[a-zA-Z0-9]|[^\u0000-\u007F]))?)+)*$/;
    }
    return re.test(val);
  },

  numeric: function (val) {
    var num;

    num = Number(val); // tries to convert value to a number. useful if value is coming from form element

    if (typeof num === "number" && !isNaN(num) && typeof val !== "boolean") {
      return true;
    } else {
      return false;
    }
  },

  array: function (val) {
    return val instanceof Array;
  },

  url: function (url) {
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_\+.~#?&/=]*)/i.test(url);
  },

  alpha: function (val) {
    return /^[a-zA-Z]+$/.test(val);
  },

  alpha_dash: function (val) {
    return /^[a-zA-Z0-9_\-]+$/.test(val);
  },

  alpha_num: function (val) {
    return /^[a-zA-Z0-9]+$/.test(val);
  },

  same: function (val, req) {
    var val1 = this.validator._flattenObject(this.validator.input)[req];
    var val2 = val;

    if (val1 === val2) {
      return true;
    }

    return false;
  },

  different: function (val, req) {
    var val1 = this.validator._flattenObject(this.validator.input)[req];
    var val2 = val;

    if (val1 !== val2) {
      return true;
    }

    return false;
  },

  in: function (val, req) {
    var list, i;

    if (val) {
      list = this.getParameters();
    }

    if (val && !(val instanceof Array)) {
      var localValue = val;

      for (i = 0; i < list.length; i++) {
        if (typeof list[i] === "string") {
          localValue = String(val);
        }

        if (localValue === list[i]) {
          return true;
        }
      }

      return false;
    }

    if (val && val instanceof Array) {
      for (i = 0; i < val.length; i++) {
        if (list.indexOf(val[i]) < 0) {
          return false;
        }
      }
    }

    return true;
  },

  not_in: function (val, req) {
    var list = this.getParameters();
    var len = list.length;
    var returnVal = true;

    for (var i = 0; i < len; i++) {
      var localValue = val;

      if (typeof list[i] === "string") {
        localValue = String(val);
      }

      if (localValue === list[i]) {
        returnVal = false;
        break;
      }
    }

    return returnVal;
  },

  accepted: function (val) {
    if (val === "on" || val === "yes" || val === 1 || val === "1" || val === true) {
      return true;
    }

    return false;
  },

  confirmed: function (val, req, key) {
    var confirmedKey = key + "_confirmation";

    if (this.validator.input[confirmedKey] === val) {
      return true;
    }

    return false;
  },

  integer: function (val) {
    return String(parseInt(val, 10)) === String(val);
  },

  digits: function (val, req) {
    var numericRule = this.validator.getRule('numeric');
    if (numericRule.validate(val) && String(val.trim()).length === parseInt(req)) {
      return true;
    }

    return false;
  },

  digits_between: function (val) {
    var numericRule = this.validator.getRule("numeric");
    var req = this.getParameters();
    var valueDigitsCount = String(val).length;
    var min = parseFloat(req[0], 10);
    var max = parseFloat(req[1], 10);

    if (numericRule.validate(val) && valueDigitsCount >= min && valueDigitsCount <= max) {
      return true;
    }

    return false;
  },

  regex: function (val, req) {
    let reqPattern = req;
    var mod = /[g|i|m]{1,3}$/;
    var flag = req.match(mod);
    flag = flag ? flag[0] : "";

    req = req.replace(mod, "").slice(1, -1);
    req = new RegExp(req, flag);
    return !!req.test(val);
  },

  date: function (val, format) {
    return isValidDate(val);
  },

  present: function (val) {
    return typeof val !== "undefined";
  },

  after: function (val, req) {
    var val1 = this.validator.input[req];
    var val2 = val;

    if (!isValidDate(val1)) {
      return false;
    }
    if (!isValidDate(val2)) {
      return false;
    }

    if (new Date(val1).getTime() < new Date(val2).getTime()) {
      return true;
    }

    return false;
  },

  after_or_equal: function (val, req) {
    var val1 = this.validator.input[req];
    var val2 = val;

    if (!isValidDate(val1)) {
      return false;
    }
    if (!isValidDate(val2)) {
      return false;
    }

    if (new Date(val1).getTime() <= new Date(val2).getTime()) {
      return true;
    }

    return false;
  },

  before: function (val, req) {
    var val1 = this.validator.input[req];
    var val2 = val;

    if (!isValidDate(val1)) {
      return false;
    }
    if (!isValidDate(val2)) {
      return false;
    }

    if (new Date(val1).getTime() > new Date(val2).getTime()) {
      return true;
    }

    return false;
  },

  before_or_equal: function (val, req) {
    var val1 = this.validator.input[req];
    var val2 = val;

    if (!isValidDate(val1)) {
      return false;
    }
    if (!isValidDate(val2)) {
      return false;
    }

    if (new Date(val1).getTime() >= new Date(val2).getTime()) {
      return true;
    }

    return false;
  },

  hex: function (val) {
    return /^[0-9a-f]+$/i.test(val);
  },

  ipv4: function (val, req, attribute) {
    if (typeof val != 'string')
      return false;

    // regex to check that each octet is valid
    var er = /^[0-9]+$/;
    // ipv4 octets are delimited by dot
    octets = val.split('.');
    // check 1: ipv4 address should contains 4 octets
    if (octets.length != 4)
      return false;

    for (let i = 0; i < octets.length; i++) {
      const element = octets[i];
      // check 2: each octet should be integer bigger than 0
      if (!er.test(element))
        return false;

      // check 3: each octet value should be less than 256
      var octetValue = parseInt(element);
      if (octetValue >= 256)
        return false;
    }

    // if all checks passed, we know it's valid IPv4 address!
    return true;
  },

  ipv6: function (val, req, attribute) {
    if (typeof val != 'string')
      return false;

    // regex to check that each hextet is valid
    var er = /^[0-9a-f]+$/;
    // ipv6 hextets are delimited by colon
    hextets = val.split(':');

    // check 1: ipv6 should contain only one consecutive colons
    colons = val.match(/::/);
    if (colons != null && val.match(/::/g).length > 1)
      return false;

    // check 2: ipv6 should not be ending or starting with colon
    //          edge case: not with consecutive colons
    if (val[0] == ':' && (colons == null || (colons != null && colons.index != 0)))
      return false;
    if (val[val.length - 1] == ':' && (colons == null || (colons != null && colons.index != val.length - 2)))
      return false;

    // check 3: ipv6 should contain no less than 3 sector
    //         minimum ipv6 addres - ::1
    if (3 > hextets.length)
      return false;

    // check 4: ipv6 should contain no more than 8 sectors
    //         only 1 edge case: when first or last sector is ommited
    var isEdgeCase = (hextets.length == 9 && colons != null && (colons.index == 0 || colons.index == val.length - 2));
    if (hextets.length > 8 && !isEdgeCase)
      return false;

    // check 5: ipv6 should contain exactly one consecutive colons if it has less than 8 sectors
    if (hextets.length != 8 && colons == null)
      return false;

    for (let i = 0; i < hextets.length; i++) {
      const element = hextets[i];

      if (element.length == 0)
        continue;

      // check 6: all of hextets should contain numbers from 0 to f (in hexadecimal)
      if (!er.test(element))
        return false;

      // check 7: all of hextet values should be less then ffff (in hexadeimal)
      //          checking using length of hextet. lowest invalid value's length is 5.
      //          so all valid hextets are length of 4 or less
      if (element.length > 4)
        return false;
    }
    return true;
  },

  ip: function (val, req, attribute) {
    return rules['ipv4'](val, req, attribute) || rules['ipv6'](val, req, attribute);
  }

};

var missedRuleValidator = function () {
  throw new Error("Validator `" + this.name + "` is not defined!");
};
var missedRuleMessage;

function Rule(name, fn, async) {
  this.name = name;
  this.fn = fn;
  this.passes = null;
  this._customMessage = undefined;
  this.async = async;
}

Rule.prototype = {
  /**
   * Validate rule
   *
   * @param  {mixed} inputValue
   * @param  {mixed} ruleValue
   * @param  {string} attribute
   * @param  {function} callback
   * @return {boolean|undefined}
   */
  validate: function (inputValue, ruleValue, attribute, callback) {
    var _this = this;
    this._setValidatingData(attribute, inputValue, ruleValue);
    if (typeof callback === "function") {
      this.callback = callback;
      var handleResponse = function (passes, message) {
        _this.response(passes, message);
      };

      if (this.async) {
        return this._apply(inputValue, ruleValue, attribute, handleResponse);
      } else {
        return handleResponse(this._apply(inputValue, ruleValue, attribute));
      }
    }
    return this._apply(inputValue, ruleValue, attribute);
  },

  /**
   * Apply validation function
   *
   * @param  {mixed} inputValue
   * @param  {mixed} ruleValue
   * @param  {string} attribute
   * @param  {function} callback
   * @return {boolean|undefined}
   */
  _apply: function (inputValue, ruleValue, attribute, callback) {
    var fn = this.isMissed() ? missedRuleValidator : this.fn;

    return fn.apply(this, [inputValue, ruleValue, attribute, callback]);
  },

  /**
   * Set validating data
   *
   * @param {string} attribute
   * @param {mixed} inputValue
   * @param {mixed} ruleValue
   * @return {void}
   */
  _setValidatingData: function (attribute, inputValue, ruleValue) {
    this.attribute = attribute;
    this.inputValue = inputValue;
    this.ruleValue = ruleValue;
  },

  /**
   * Get parameters
   *
   * @return {array}
   */
  getParameters: function () {
    var value = [];

    if (typeof this.ruleValue === "string") {
      value = this.ruleValue.split(",");
    }

    if (typeof this.ruleValue === "number") {
      value.push(this.ruleValue);
    }

    if (this.ruleValue instanceof Array) {
      value = this.ruleValue;
    }

    return value;
  },

  /**
   * Get true size of value
   *
   * @return {integer|float}
   */
  getSize: function () {
    var value = this.inputValue;

    if (value instanceof Array) {
      return value.length;
    }

    if (typeof value === "number") {
      return value;
    }

    if (this.validator._hasNumericRule(this.attribute)) {
      return parseFloat(value, 10);
    }

    return value.length;
  },

  /**
   * Get the type of value being checked; numeric or string.
   *
   * @return {string}
   */
  _getValueType: function () {
    if (typeof this.inputValue === "number" || this.validator._hasNumericRule(this.attribute)) {
      return "numeric";
    }

    return "string";
  },

  /**
   * Set the async callback response
   *
   * @param  {boolean|undefined} passes  Whether validation passed
   * @param  {string|undefined} message Custom error message
   * @return {void}
   */
  response: function (passes, message) {
    this.passes = passes === undefined || passes === true;
    this._customMessage = message;
    this.callback(this.passes, message);
  },

  /**
   * Set validator instance
   *
   * @param {Validator} validator
   * @return {void}
   */
  setValidator: function (validator) {
    this.validator = validator;
  },

  /**
   * Check if rule is missed
   *
   * @return {boolean}
   */
  isMissed: function () {
    return typeof this.fn !== "function";
  },

  get customMessage() {
    return this.isMissed() ? missedRuleMessage : this._customMessage;
  }
};

var manager = {
  /**
   * List of async rule names
   *
   * @type {Array}
   */
  asyncRules: [],

  /**
   * Implicit rules (rules to always validate)
   *
   * @type {Array}
   */
  implicitRules: [
    "required",
    "required_if",
    "required_unless",
    "required_with",
    "required_with_all",
    "required_without",
    "required_without_all",
    "accepted",
    "present"
  ],

  /**
   * Get rule by name
   *
   * @param  {string} name
   * @param {Validator}
   * @return {Rule}
   */
  make: function (name, validator) {
    var async = this.isAsync(name);
    var rule = new Rule(name, rules[name], async);
    rule.setValidator(validator);
    return rule;
  },

  /**
   * Determine if given rule is async
   *
   * @param  {string}  name
   * @return {boolean}
   */
  isAsync: function (name) {
    for (var i = 0, len = this.asyncRules.length; i < len; i++) {
      if (this.asyncRules[i] === name) {
        return true;
      }
    }
    return false;
  },

  /**
   * Determine if rule is implicit (should always validate)
   *
   * @param {string} name
   * @return {boolean}
   */
  isImplicit: function (name) {
    return this.implicitRules.indexOf(name) > -1;
  },

  /**
   * Register new rule
   *
   * @param  {string}   name
   * @param  {function} fn
   * @return {void}
   */
  register: function (name, fn) {
    rules[name] = fn;
  },

  /**
   * Register new implicit rule
   *
   * @param  {string}   name
   * @param  {function} fn
   * @return {void}
   */
  registerImplicit: function (name, fn) {
    this.register(name, fn);
    this.implicitRules.push(name);
  },

  /**
   * Register async rule
   *
   * @param  {string}   name
   * @param  {function} fn
   * @return {void}
   */
  registerAsync: function (name, fn) {
    this.register(name, fn);
    this.asyncRules.push(name);
  },

  /**
   * Register implicit async rule
   *
   * @param  {string}   name
   * @param  {function} fn
   * @return {void}
   */
  registerAsyncImplicit: function (name, fn) {
    this.registerImplicit(name, fn);
    this.asyncRules.push(name);
  },

  registerMissedRuleValidator: function (fn, message) {
    missedRuleValidator = fn;
    missedRuleMessage = message;
  }
};

module.exports = manager;


/***/ }),
/* 4 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Messages = __webpack_require__(5);

__webpack_require__(7);

var require_method = undefined;

var container = {

  messages: {},

  /**
   * Set messages for language
   *
   * @param {string} lang
   * @param {object} rawMessages
   * @return {void}
   */
  _set: function(lang, rawMessages) {
    this.messages[lang] = rawMessages;
  },

  /**
   * Set message for given language's rule.
   *
   * @param {string} lang
   * @param {string} attribute
   * @param {string|object} message
   * @return {void}
   */
  _setRuleMessage: function(lang, attribute, message) {
    this._load(lang);
    if (message === undefined) {
      message = this.messages[lang].def;
    }

    this.messages[lang][attribute] = message;
  },

  /**
   * Load messages (if not already loaded)
   *
   * @param  {string} lang
   * @return {void}
   */
  _load: function(lang) {
    if (!this.messages[lang]) {
      try {
        var rawMessages = __webpack_require__(8)("./" + lang);
        this._set(lang, rawMessages);
      } catch (e) {}
    }
  },

  /**
   * Get raw messages for language
   *
   * @param  {string} lang
   * @return {object}
   */
  _get: function(lang) {
    this._load(lang);
    return this.messages[lang];
  },

  /**
   * Make messages for given language
   *
   * @param  {string} lang
   * @return {Messages}
   */
  _make: function(lang) {
    this._load(lang);
    return new Messages(lang, this.messages[lang]);
  }

};

module.exports = container;


/***/ }),
/* 5 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Attributes = __webpack_require__(6);

var Messages = function(lang, messages) {
  this.lang = lang;
  this.messages = messages;
  this.customMessages = {};
  this.attributeNames = {};
};

Messages.prototype = {
  constructor: Messages,

  /**
   * Set custom messages
   *
   * @param {object} customMessages
   * @return {void}
   */
  _setCustom: function(customMessages) {
    this.customMessages = customMessages || {};
  },

  /**
   * Set custom attribute names.
   *
   * @param {object} attributes
   */
  _setAttributeNames: function(attributes) {
    this.attributeNames = attributes;
  },

  /**
   * Set the attribute formatter.
   *
   * @param {fuction} func
   * @return {void}
   */
  _setAttributeFormatter: function(func) {
    this.attributeFormatter = func;
  },

  /**
   * Get attribute name to display.
   *
   * @param  {string} attribute
   * @return {string}
   */
  _getAttributeName: function(attribute) {
    var name = attribute;
    if (this.attributeNames.hasOwnProperty(attribute)) {
      return this.attributeNames[attribute];
    } else if (this.messages.attributes.hasOwnProperty(attribute)) {
      name = this.messages.attributes[attribute];
    }

    if (this.attributeFormatter) {
      name = this.attributeFormatter(name);
    }

    return name;
  },

  /**
   * Get all messages
   *
   * @return {object}
   */
  all: function() {
    return this.messages;
  },

  /**
   * Render message
   *
   * @param  {Rule} rule
   * @return {string}
   */
  render: function(rule) {
    if (rule.customMessage) {
      return rule.customMessage;
    }
    var template = this._getTemplate(rule);

    var message;
    if (Attributes.replacements[rule.name]) {
      message = Attributes.replacements[rule.name].apply(this, [template, rule]);
    } else {
      message = this._replacePlaceholders(rule, template, {});
    }

    return message;
  },

  /**
   * Get the template to use for given rule
   *
   * @param  {Rule} rule
   * @return {string}
   */
  _getTemplate: function(rule) {

    var messages = this.messages;
    var template = messages.def;
    var customMessages = this.customMessages;
    var formats = [rule.name + '.' + rule.attribute, rule.name];

    for (var i = 0, format; i < formats.length; i++) {
      format = formats[i];
      if (customMessages.hasOwnProperty(format)) {
        template = customMessages[format];
        break;
      } else if (messages.hasOwnProperty(format)) {
        template = messages[format];
        break;
      }
    }

    if (typeof template === 'object') {
      template = template[rule._getValueType()];
    }

    return template;
  },

  /**
   * Replace placeholders in the template using the data object
   *
   * @param  {Rule} rule
   * @param  {string} template
   * @param  {object} data
   * @return {string}
   */
  _replacePlaceholders: function(rule, template, data) {
    var message, attribute;

    data.attribute = this._getAttributeName(rule.attribute);
    data[rule.name] = data[rule.name] || rule.getParameters().join(',');

    if (typeof template === 'string' && typeof data === 'object') {
      message = template;

      for (attribute in data) {
        message = message.replace(new RegExp(':' + attribute, 'g'), data[attribute]);
      }
    }

    return message;
  }

};

module.exports = Messages;


/***/ }),
/* 6 */
/***/ ((module) => {

var replacements = {

  /**
   * Between replacement (replaces :min and :max)
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  between: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      min: parameters[0],
      max: parameters[1]
    });
  },

  /**
   * Digits-Between replacement (replaces :min and :max)
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  digits_between: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      min: parameters[0],
      max: parameters[1]
    });
  },

  /**
   * Required_if replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  required_if: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      other: this._getAttributeName(parameters[0]),
      value: parameters[1]
    });
  },

  /**
   * Required_unless replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  required_unless: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      other: this._getAttributeName(parameters[0]),
      value: parameters[1]
    });
  },

  /**
   * Required_with replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  required_with: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      field: this._getAttributeName(parameters[0])
    });
  },

  /**
   * Required_with_all replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  required_with_all: function(template, rule) {
    var parameters = rule.getParameters();
    var getAttributeName = this._getAttributeName.bind(this);
    return this._replacePlaceholders(rule, template, {
      fields: parameters.map(getAttributeName).join(', ')
    });
  },

  /**
   * Required_without replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  required_without: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      field: this._getAttributeName(parameters[0])
    });
  },

  /**
   * Required_without_all replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  required_without_all: function(template, rule) {
    var parameters = rule.getParameters();
    var getAttributeName = this._getAttributeName.bind(this);
    return this._replacePlaceholders(rule, template, {
      fields: parameters.map(getAttributeName).join(', ')
    });
  },

  /**
   * After replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  after: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      after: this._getAttributeName(parameters[0])
    });
  },

  /**
   * Before replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  before: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      before: this._getAttributeName(parameters[0])
    });
  },

  /**
   * After_or_equal replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  after_or_equal: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      after_or_equal: this._getAttributeName(parameters[0])
    });
  },

  /**
   * Before_or_equal replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  before_or_equal: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      before_or_equal: this._getAttributeName(parameters[0])
    });
  },

  /**
   * Same replacement.
   *
   * @param  {string} template
   * @param  {Rule} rule
   * @return {string}
   */
  same: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      same: this._getAttributeName(parameters[0])
    });
  },
};

function formatter(attribute) {
  return attribute.replace(/[_\[]/g, ' ').replace(/]/g, '');
}

module.exports = {
  replacements: replacements,
  formatter: formatter
};


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = {
  accepted: 'The :attribute must be accepted.',
  after: 'The :attribute must be after :after.',
  after_or_equal: 'The :attribute must be equal or after :after_or_equal.',
  alpha: 'The :attribute field must contain only alphabetic characters.',
  alpha_dash: 'The :attribute field may only contain alpha-numeric characters, as well as dashes and underscores.',
  alpha_num: 'The :attribute field must be alphanumeric.',
  before: 'The :attribute must be before :before.',
  before_or_equal: 'The :attribute must be equal or before :before_or_equal.',
  between: {
    numeric: 'The :attribute field must be between :min and :max.',
    string: 'The :attribute field must be between :min and :max characters.',
  },
  confirmed: 'The :attribute confirmation does not match.',
  email: 'The :attribute format is invalid.',
  date: 'The :attribute is not a valid date format.',
  def: 'The :attribute attribute has errors.',
  digits: 'The :attribute must be :digits digits.',
  digits_between: 'The :attribute field must be between :min and :max digits.',
  different: 'The :attribute and :different must be different.',
  in: 'The selected :attribute is invalid.',
  integer: 'The :attribute must be an integer.',
  hex: 'The :attribute field should have hexadecimal format',
  min: {
    numeric: 'The :attribute must be at least :min.',
    string: 'The :attribute must be at least :min characters.'
  },
  max: {
    numeric: 'The :attribute may not be greater than :max.',
    string: 'The :attribute may not be greater than :max characters.'
  },
  not_in: 'The selected :attribute is invalid.',
  numeric: 'The :attribute must be a number.',
  present: 'The :attribute field must be present (but can be empty).',
  required: 'The :attribute field is required.',
  required_if: 'The :attribute field is required when :other is :value.',
  required_unless: 'The :attribute field is required when :other is not :value.',
  required_with: 'The :attribute field is required when :field is not empty.',
  required_with_all: 'The :attribute field is required when :fields are not empty.',
  required_without: 'The :attribute field is required when :field is empty.',
  required_without_all: 'The :attribute field is required when :fields are empty.',
  same: 'The :attribute and :same fields must match.',
  size: {
    numeric: 'The :attribute must be :size.',
    string: 'The :attribute must be :size characters.'
  },
  string: 'The :attribute must be a string.',
  url: 'The :attribute format is invalid.',
  regex: 'The :attribute format is invalid.',
  attributes: {}
};


/***/ }),
/* 8 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./ar": 9,
	"./ar.js": 9,
	"./az": 10,
	"./az.js": 10,
	"./be": 11,
	"./be.js": 11,
	"./bg": 12,
	"./bg.js": 12,
	"./bs": 13,
	"./bs.js": 13,
	"./ca": 14,
	"./ca.js": 14,
	"./cs": 15,
	"./cs.js": 15,
	"./cy": 16,
	"./cy.js": 16,
	"./da": 17,
	"./da.js": 17,
	"./de": 18,
	"./de.js": 18,
	"./el": 19,
	"./el.js": 19,
	"./en": 7,
	"./en.js": 7,
	"./es": 20,
	"./es.js": 20,
	"./et": 21,
	"./et.js": 21,
	"./eu": 22,
	"./eu.js": 22,
	"./fa": 23,
	"./fa.js": 23,
	"./fi": 24,
	"./fi.js": 24,
	"./fr": 25,
	"./fr.js": 25,
	"./hr": 26,
	"./hr.js": 26,
	"./hu": 27,
	"./hu.js": 27,
	"./id": 28,
	"./id.js": 28,
	"./it": 29,
	"./it.js": 29,
	"./ja": 30,
	"./ja.js": 30,
	"./ka": 31,
	"./ka.js": 31,
	"./ko": 32,
	"./ko.js": 32,
	"./lt": 33,
	"./lt.js": 33,
	"./lv": 34,
	"./lv.js": 34,
	"./mk": 35,
	"./mk.js": 35,
	"./mn": 36,
	"./mn.js": 36,
	"./ms": 37,
	"./ms.js": 37,
	"./nb_NO": 38,
	"./nb_NO.js": 38,
	"./nl": 39,
	"./nl.js": 39,
	"./pl": 40,
	"./pl.js": 40,
	"./pt": 41,
	"./pt.js": 41,
	"./pt_BR": 42,
	"./pt_BR.js": 42,
	"./ro": 43,
	"./ro.js": 43,
	"./ru": 44,
	"./ru.js": 44,
	"./se": 45,
	"./se.js": 45,
	"./sl": 46,
	"./sl.js": 46,
	"./sq": 47,
	"./sq.js": 47,
	"./sr": 48,
	"./sr.js": 48,
	"./sv": 49,
	"./sv.js": 49,
	"./tr": 50,
	"./tr.js": 50,
	"./ua": 51,
	"./ua.js": 51,
	"./uk": 52,
	"./uk.js": 52,
	"./vi": 53,
	"./vi.js": 53,
	"./zh": 54,
	"./zh.js": 54,
	"./zh_TW": 55,
	"./zh_TW.js": 55
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 8;

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = {
  accepted: "الصفة :attribute يجب أن تكون مقبولة",
  after: "الصفة :attribute يجب أن تكون بعد الصفة :after.",
  after_or_equal: "الصفة :attribute يجب أن تكون مساوية أو بعد الصفة :after_or_equal.",
  alpha: "حقل الصفة  :attribute يجب أن تحتوي على أحرف فقط",
  alpha_dash: "حقل الصفة :attribute مسموح بأن يحتوي على حروف و أرقام و شرطة و شرطة منخفضة",
  alpha_num: "حقل الصفة :attribute يجب أن يحتوي على أحرف و أرقام",
  before: "الصفة :attribute يجب أن تكون قبل :before.",
  before_or_equal: "الصفة :attribute يجب أن تكون مساوية أو قبل الصفة :before_or_equal.",
  between: "حقل الصفة :attribute يجب أن يكون بين :min و :max.",
  confirmed: "تأكيد الصفة :attribute غير متطابق.",
  email: "الصفة :attribute صيغتها غير صحيحة",
  date: "الصفة :attribute صيغتها ليست تاريخ صحيح",
  def: "الصفة :attribute تحتوي على أخطاء",
  digits: "الصفة :attribute يجب أن تكون :digits أرقام.",
  digits_between: "يجب أن يحتوي :attribute بين :min و :max رقمًا/أرقام .",
  different: "الصفة :attribute و الصفة :different يجب أن تكونا مختلفتين",
  in: "الصفة :attribute المختارة، غير صحيحة.",
  integer: "الصفة :attribute يجب أن تكون عدد صحيح",
  hex: "حقل الصفة :attribute يجب أن يحتوي على صيغة هكسيديسمل",
  min: {
    numeric: "الصفة :attribute يجب أن تكون :min على الأقل",
    string: "الصفة :attribute يجب أن تكون :min حرف على الأقل."
  },
  max: {
    numeric: "الصفة :attribute لا يمكن أن تكون أكبر من  :max.",
    string: "الصفة :attribute يجب أن لا تكون أكثر من :max حرف."
  },
  not_in: "الصفة :attribute المختارة غير صحيحة.",
  numeric: "الصفة :attribute يجب أن تكون رقما.",
  present: "حقل الصفة :attribute يجب أن يكون معرفا ، يمكن أن يكون فارغا.",
  required: "حقل الصفة :attribute مطلوب.",
  required_if: "حقل الصفة :attribute مطلوب حين تكون قيمة الحقل :other تساوي :value.",
  required_unless: "حقل الصفة :attribute مطلوب حين تكون قيم الحقل :other لا تساوي :value.",
  required_with: "حقل الصفة :attribute مطلوب حين يكون الحقا :field غير فارغ.",
  required_with_all: "حقل الصفة :attribute مطلوب حين تكون الحقول :fields غير فارغة.",
  required_without: "حقل الصفة :attribute مطلوب حين يكون الحقل :field فارغا.",
  required_without_all: "حقل الصفة :attribute مطلوب حين تكون الحقول :fields فارغة.",
  same: "حقل الصفة :attribute و حقل الصفة :same يجب أن يتطابقا.",
  size: {
    numeric: "الصفة :attribute يجب أن تكون :size.",
    string: "الصفة :attribute يجب أن تكون :size حرفا."
  },
  string: "الصفة :attribute يجب أن تكون نص.",
  url: "الصفة :attribute صياغتها غير صحيحة.",
  regex: "الصفة :attribute صياغتها غير صحيحة.",
  attributes: {
    username: "اسم المستخدم",
    password: "كلمة المرور",
    email: "البريد الالكتروني",
    website: "الموقع الالكتروني",
    firstname: "الاسم الاول",
    lastname: "الاسم الاخير",
    subject: "الموضوع",
    city: "المدينة",
    region: "المنطقة",
    country: "الدولة",
    street: "الشارع",
    zipcode: "الرمز البريدي",
    phone: "رقم الهاتف",
    mobile: "رقم الجوال"
  }
};


/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = {
  accepted: ":attribute qəbul edilməlidir",
  active_url: ":attribute doğru URL deyil",
  after: ":attribute :date tarixindən sonra olmalıdır",
  after_or_equal: ":attribute :date tarixi ilə eyni və ya sonra olmalıdır",
  alpha: ":attribute yalnız hərflərdən ibarət ola bilər",
  alpha_dash: ":attribute yalnız hərf, rəqəm və tire simvolundan ibarət ola bilər",
  alpha_num: ":attribute yalnız hərf və rəqəmlərdən ibarət ola bilər",
  array: ":attribute massiv formatında olmalıdır",
  before: ":attribute :date tarixindən əvvəl olmalıdır",
  before_or_equal: ":attribute :date tarixindən əvvəl və ya bərabər olmalıdır",
  between: {
    numeric: ":attribute :min ilə :max arasında olmalıdır",
    file: ":attribute :min ilə :max KB ölçüsü intervalında olmalıdır",
    string: ":attribute :min ilə :max simvolu intervalında olmalıdır",
    array: ":attribute :min ilə :max intervalında hissədən ibarət olmalıdır"
  },
  boolean: " :attribute doğru və ya yanlış ola bilər",
  confirmed: " :attribute doğrulanması yanlışdır",
  date: " :attribute tarix formatında olmalıdır",
  date_format: " :attribute :format formatında olmalıdır",
  different: " :attribute və :other fərqli olmalıdır",
  digits: " :attribute :digits rəqəmli olmalıdır",
  digits_between: " :attribute :min ilə :max rəqəmləri intervalında olmalıdır",
  dimensions: " :attribute doğru şəkil ölçülərində deyil",
  distinct: " :attribute dublikat qiymətlidir",
  email: " :attribute doğru email formatında deyil",
  exists: " seçilmiş :attribute yanlışdır",
  file: " :attribute fayl formatında olmalıdır",
  filled: " :attribute qiyməti olmalıdır",
  gt: {
    numeric: "The :attribute must be greater than :value.",
    file: "The :attribute must be greater than :value kilobytes.",
    string: "The :attribute must be greater than :value characters.",
    array: "The :attribute must have more than :value items."
  },
  gte: {
    numeric: "The :attribute must be greater than or equal :value.",
    file: "The :attribute must be greater than or equal :value kilobytes.",
    string: "The :attribute must be greater than or equal :value characters.",
    array: "The :attribute must have :value items or more."
  },
  image: " :attribute şəkil formatında olmalıdır",
  in: " seçilmiş :attribute yanlışdır",
  in_array: " :attribute :other qiymətləri arasında olmalıdır",
  integer: " :attribute tam ədəd olmalıdır",
  hex: "The :attribute field should have hexadecimal format",
  ip: " :attribute İP adres formatında olmalıdır",
  ipv4: " :attribute İPv4 adres formatında olmalıdır",
  ipv6: " :attribute İPv6 adres formatında olmalıdır",
  json: " :attribute JSON formatında olmalıdır",
  lt: {
    numeric: "The :attribute must be less than :value.",
    file: "The :attribute must be less than :value kilobytes.",
    string: "The :attribute must be less than :value characters.",
    array: "The :attribute must have less than :value items."
  },
  lte: {
    numeric: "The :attribute must be less than or equal :value.",
    file: "The :attribute must be less than or equal :value kilobytes.",
    string: "The :attribute must be less than or equal :value characters.",
    array: "The :attribute must not have more than :value items."
  },
  max: {
    numeric: " :attribute maksiumum :max rəqəmdən ibarət ola bilər",
    file: " :attribute maksimum :max KB ölçüsündə ola bilər",
    string: " :attribute maksimum :max simvoldan ibarət ola bilər",
    array: " :attribute maksimum :max hədd'dən ibarət ola bilər"
  },
  mimes: " :attribute :values tipində fayl olmalıdır",
  mimetypes: " :attribute :values tipində fayl olmalıdır",
  min: {
    numeric: " :attribute minimum :min rəqəmdən ibarət ola bilər",
    file: " :attribute minimum :min KB ölçüsündə ola bilər",
    string: " :attribute minimum :min simvoldan ibarət ola bilər",
    array: " :attribute minimum :min hədd'dən ibarət ola bilər"
  },
  not_in: " seçilmiş :attribute yanlışdır",
  numeric: " :attribute rəqəmlərdən ibarət olmalıdır",
  present: " :attribute iştirak etməlidir",
  regex: " :attribute formatı yanlışdır",
  required: " :attribute mütləqdir",
  required_if: " :attribute (:other :value ikən) mütləqdir",
  required_unless: " :attribute (:other :values 'ə daxil ikən) mütləqdir",
  required_with: " :attribute (:values var ikən) mütləqdir",
  required_with_all: " :attribute (:values var ikən) mütləqdir",
  required_without: " :attribute (:values yox ikən) mütləqdir",
  required_without_all: " :attribute (:values yox ikən) mütləqdir",
  same: " :attribute və :other eyni olmalıdır",
  size: {
    numeric: " :attribute :size ölçüsündə olmalıdır",
    file: " :attribute :size KB ölçüsündə olmalıdır",
    string: " :attribute :size simvoldan ibarət olmalıdır",
    array: " :attribute :size hədd'dən ibarət olmalıdır"
  },
  string: " :attribute hərf formatında olmalıdır",
  timezone: " :attribute ərazi formatında olmalıdır",
  unique: " :attribute artıq iştirak edib",
  uploaded: " :attribute yüklənməsi mümkün olmadı",
  url: " :attribute formatı yanlışdır"
};


/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = {
  accepted: "Вы павінны прыняць :attribute.",
  active_url: "Поле :attribute утрымлівае несапраўдны URL.",
  after: "У полі :attribute павінна быць дата пасля :date.",
  after_or_equal: "The :attribute must be a date after or equal to :date.",
  alpha: "Поле :attribute можа мець толькі літары.",
  alpha_dash: "Поле :attribute можа мець толькі літары, лічбы і злучок.",
  alpha_num: "Поле :attribute можа мець толькі літары і лічбы.",
  array: "Поле :attribute павінна быць масівам.",
  before: "У полі :attribute павінна быць дата да :date.",
  before_or_equal: "The :attribute must be a date before or equal to :date.",
  between: {
    numeric: "Поле :attribute павінна быць паміж :min і :max.",
    file: "Памер файла ў поле :attribute павінен быць паміж :min і :max кілабайт.",
    string: "Колькасць сiмвалаў у поле :attribute павінна быць паміж :min і :max.",
    array: "Колькасць элементаў у поле :attribute павінна быць паміж :min і :max."
  },
  boolean: "Поле :attribute павінна мець значэнне лагічнага тыпу.",
  confirmed: "Поле :attribute не супадае з пацвярджэннем.",
  date: "Поле :attribute не з'яўляецца датай.",
  date_format: "Поле :attribute не адпавядае фармату :format.",
  different: "Палі :attribute і :other павінны адрознівацца.",
  digits: "Даўжыня лічбавага поля :attribute павінна быць :digits.",
  digits_between: "Даўжыня лічбавага поля :attribute павінна быць паміж :min і :max.",
  dimensions: "The :attribute has invalid image dimensions.",
  distinct: "The :attribute field has a duplicate value.",
  email: "Поле :attribute павінна быць сапраўдным электронным адрасам.",
  file: "The :attribute must be a file.",
  filled: "Поле :attribute абавязкова для запаўнення.",
  exists: "Выбранае значэнне для :attribute некарэктна.",
  gt: {
    numeric: "The :attribute must be greater than :value.",
    file: "The :attribute must be greater than :value kilobytes.",
    string: "The :attribute must be greater than :value characters.",
    array: "The :attribute must have more than :value items."
  },
  gte: {
    numeric: "The :attribute must be greater than or equal :value.",
    file: "The :attribute must be greater than or equal :value kilobytes.",
    string: "The :attribute must be greater than or equal :value characters.",
    array: "The :attribute must have :value items or more."
  },
  hex: "The :attribute field should have hexadecimal format",
  image: "Поле :attribute павінна быць малюнкам.",
  in: "Выбранае значэнне для :attribute памылкова.",
  in_array: "The :attribute field does not exist in :other.",
  integer: "Поле :attribute павінна быць цэлым лікам.",
  ip: "Поле :attribute дпавінна быць сапраўдным IP-адрасам.",
  ipv4: "The :attribute must be a valid IPv4 address.",
  ipv6: "The :attribute must be a valid IPv6 address.",
  json: "Поле :attribute павінна быць JSON радком.",
  lt: {
    numeric: "The :attribute must be less than :value.",
    file: "The :attribute must be less than :value kilobytes.",
    string: "The :attribute must be less than :value characters.",
    array: "The :attribute must have less than :value items."
  },
  lte: {
    numeric: "The :attribute must be less than or equal :value.",
    file: "The :attribute must be less than or equal :value kilobytes.",
    string: "The :attribute must be less than or equal :value characters.",
    array: "The :attribute must not have more than :value items."
  },
  max: {
    numeric: "Поле :attribute не можа быць больш :max.",
    file: "Памер файла ў поле :attribute не можа быць больш :max кілабайт).",
    string: "Колькасць сiмвалаў у поле :attribute не можа перавышаць :max.",
    array: "Колькасць элементаў у поле :attribute не можа перавышаць :max."
  },
  mimes: "Поле :attribute павінна быць файлам аднаго з наступных тыпаў: :values.",
  mimetypes: "Поле :attribute павінна быць файлам аднаго з наступных тыпаў: :values.",
  min: {
    numeric: "Поле :attribute павінна быць не менш :min.",
    file: "Памер файла ў полее :attribute павінен быць не менш :min кілабайт.",
    string: "Колькасць сiмвалаў у поле :attribute павінна быць не менш :min.",
    array: "Колькасць элементаў у поле :attribute павінна быць не менш :min."
  },
  not_in: "Выбранае значэнне для :attribute памылкова.",
  not_regex: "The :attribute format is invalid.",
  numeric: "Поле :attribute павінна быць лікам.",
  present: "The :attribute field must be present.",
  regex: "Поле :attribute мае памылковы фармат.",
  required: "Поле :attribute абавязкова для запаўнення.",
  required_if: "Поле :attribute абавязкова для запаўнення, калі :other раўняецца :value.",
  required_unless: "Поле :attribute абавязкова для запаўнення, калі :other не раўняецца :values.",
  required_with: "Поле :attribute абавязкова для запаўнення, калі :values ўказана.",
  required_with_all: "Поле :attribute абавязкова для запаўнення, калі :values ўказана.",
  required_without: "Поле :attribute абавязкова для запаўнення, калі :values не ўказана.",
  required_without_all: "Поле :attribute абавязкова для запаўнення, калі ні адно з :values не ўказана.",
  same: "Значэнне :attribute павінна супадаць з :other.",
  size: {
    numeric: "Поле :attribute павінна быць :size.",
    file: "Размер файла в поле :attribute павінен быць :size кілабайт.",
    string: "Колькасць сiмвалаў у поле :attribute павінна быць :size.",
    array: "Колькасць элементаў у поле :attribute павінна быць :size."
  },
  string: "Поле :attribute павінна быць радком.",
  timezone: "Поле :attribute павінна быць сапраўдным гадзінным поясам.",
  unique: "Такое значэнне поля :attribute ўжо існуе.",
  uploaded: "The :attribute failed to upload.",
  url: "Поле :attribute мае памылковы фармат."
};


/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = {
  accepted: "Трябва да приемете :attribute.",
  active_url: "Полето :attribute не е валиден URL адрес.",
  after: "Полето :attribute трябва да бъде дата след :date.",
  after_or_equal: "Полето :attribute трябва да бъде дата след или равна на :date.",
  alpha: "Полето :attribute трябва да съдържа само букви.",
  alpha_dash: "Полето :attribute трябва да съдържа само букви, цифри, долна черта и тире.",
  alpha_num: "Полето :attribute трябва да съдържа само букви и цифри.",
  array: "Полето :attribute трябва да бъде масив.",
  before: "Полето :attribute трябва да бъде дата преди :date.",
  before_or_equal: "Полето :attribute трябва да бъде дата преди или равна на :date.",
  between: {
    numeric: "Полето :attribute трябва да бъде между :min и :max.",
    file: "Полето :attribute трябва да бъде между :min и :max килобайта.",
    string: "Полето :attribute трябва да бъде между :min и :max знака.",
    array: "Полето :attribute трябва да има между :min - :max елемента."
  },
  boolean: "Полето :attribute трябва да съдържа Да или Не",
  confirmed: "Полето :attribute не е потвърдено.",
  date: "Полето :attribute не е валидна дата.",
  date_format: "Полето :attribute не е във формат :format.",
  different: "Полетата :attribute и :other трябва да са различни.",
  digits: "Полето :attribute трябва да има :digits цифри.",
  digits_between: "Полето :attribute трябва да има между :min и :max цифри.",
  dimensions: "Невалидни размери за снимка :attribute.",
  distinct: "Данните в полето :attribute се дублират.",
  email: "Полето :attribute е в невалиден формат.",
  exists: "Избранато поле :attribute вече съществува.",
  file: "Полето :attribute трябва да бъде файл.",
  filled: "Полето :attribute е задължително.",
  gt: {
    numeric: "The :attribute must be greater than :value.",
    file: "The :attribute must be greater than :value kilobytes.",
    string: "The :attribute must be greater than :value characters.",
    array: "The :attribute must have more than :value items."
  },
  gte: {
    numeric: "The :attribute must be greater than or equal :value.",
    file: "The :attribute must be greater than or equal :value kilobytes.",
    string: "The :attribute must be greater than or equal :value characters.",
    array: "The :attribute must have :value items or more."
  },
  hex: "The :attribute field should have hexadecimal format",
  image: "Полето :attribute трябва да бъде изображение.",
  in: "Избраното поле :attribute е невалидно.",
  in_array: "Полето :attribute не съществува в :other.",
  integer: "Полето :attribute трябва да бъде цяло число.",
  ip: "Полето :attribute трябва да бъде IP адрес.",
  ipv4: "Полето :attribute трябва да бъде IPv4 адрес.",
  ipv6: "Полето :attribute трябва да бъде IPv6 адрес.",
  json: "Полето :attribute трябва да бъде JSON низ.",
  lt: {
    numeric: "The :attribute must be less than :value.",
    file: "The :attribute must be less than :value kilobytes.",
    string: "The :attribute must be less than :value characters.",
    array: "The :attribute must have less than :value items."
  },
  lte: {
    numeric: "The :attribute must be less than or equal :value.",
    file: "The :attribute must be less than or equal :value kilobytes.",
    string: "The :attribute must be less than or equal :value characters.",
    array: "The :attribute must not have more than :value items."
  },
  max: {
    numeric: "Полето :attribute трябва да бъде по-малко от :max.",
    file: "Полето :attribute трябва да бъде по-малко от :max килобайта.",
    string: "Полето :attribute трябва да бъде по-малко от :max знака.",
    array: "Полето :attribute трябва да има по-малко от :max елемента."
  },
  mimes: "Полето :attribute трябва да бъде файл от тип: :values.",
  mimetypes: "Полето :attribute трябва да бъде файл от тип: :values.",
  min: {
    numeric: "Полето :attribute трябва да бъде минимум :min.",
    file: "Полето :attribute трябва да бъде минимум :min килобайта.",
    string: "Полето :attribute трябва да бъде минимум :min знака.",
    array: "Полето :attribute трябва има минимум :min елемента."
  },
  not_in: "Избраното поле :attribute е невалидно.",
  not_regex: "The :attribute format is invalid.",
  numeric: "Полето :attribute трябва да бъде число.",
  present: "Полето :attribute трябва да съествува.",
  regex: "Полето :attribute е в невалиден формат.",
  required: "Полето :attribute е задължително.",
  required_if: "Полето :attribute се изисква, когато :other е :value.",
  required_unless: "Полето :attribute се изисква, освен ако :other не е в :values.",
  required_with: "Полето :attribute се изисква, когато :values има стойност.",
  required_with_all: "Полето :attribute е задължително, когато :values имат стойност.",
  required_without: "Полето :attribute се изисква, когато :values няма стойност.",
  required_without_all: "Полето :attribute се изисква, когато никое от полетата :values няма стойност.",
  same: "Полетата :attribute и :other трябва да съвпадат.",
  size: {
    numeric: "Полето :attribute трябва да бъде :size.",
    file: "Полето :attribute трябва да бъде :size килобайта.",
    string: "Полето :attribute трябва да бъде :size знака.",
    array: "Полето :attribute трябва да има :size елемента."
  },
  string: "Полето :attribute трябва да бъде знаков низ.",
  timezone: "Полето :attribute трябва да съдържа валидна часова зона.",
  unique: "Полето :attribute вече съществува.",
  uploaded: "Неуспешно качване на :attribute.",
  url: "Полето :attribute е в невалиден формат."
};


/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = {
  accepted: "Polje :attribute mora biti prihvaćeno.",
  active_url: "Polje :attribute nije validan URL.",
  after: "Polje :attribute mora biti datum poslije :date.",
  after_or_equal: "The :attribute must be a date after or equal to :date.",
  alpha: "Polje :attribute može sadržati samo slova.",
  alpha_dash: "Polje :attribute može sadržati samo slova, brojeve i povlake.",
  alpha_num: "Polje :attribute može sadržati samo slova i brojeve.",
  attributes: {},
  array: "Polje :attribute mora biti niz.",
  before: "Polje :attribute mora biti datum prije :date.",
  before_or_equal: "The :attribute must be a date before or equal to :date.",
  between: {
    numeric: "Polje :attribute mora biti izmedju :min - :max.",
    file: "Fajl :attribute mora biti izmedju :min - :max kilobajta.",
    string: "Polje :attribute mora biti izmedju :min - :max karaktera.",
    array: "Polje :attribute mora biti između :min - :max karaktera."
  },
  boolean: "Polje :attribute mora biti tačno ili netačno",
  confirmed: "Potvrda polja :attribute se ne poklapa.",
  date: "Polje :attribute nema ispravan datum.",
  date_format: "Polje :attribute nema odgovarajući format :format.",
  different: "Polja :attribute i :other moraju biti različita.",
  digits: "Polje :attribute mora da sadži :digits brojeve.",
  digits_between: "Polje :attribute mora biti između :min i :max broja.",
  dimensions: "The :attribute has invalid image dimensions.",
  distinct: "The :attribute field has a duplicate value.",
  email: "Format polja :attribute mora biti validan email.",
  exists: "Odabrano polje :attribute nije validno.",
  file: "The :attribute must be a file.",
  filled: "Polje :attribute je obavezno.",
  gt: {
    numeric: "The :attribute must be greater than :value.",
    file: "The :attribute must be greater than :value kilobytes.",
    string: "The :attribute must be greater than :value characters.",
    array: "The :attribute must have more than :value items."
  },
  gte: {
    numeric: "The :attribute must be greater than or equal :value.",
    file: "The :attribute must be greater than or equal :value kilobytes.",
    string: "The :attribute must be greater than or equal :value characters.",
    array: "The :attribute must have :value items or more."
  },
  hex: "The :attribute field should have hexadecimal format",
  image: "Polje :attribute mora biti slika.",
  in: "Odabrano polje :attribute nije validno.",
  in_array: "The :attribute field does not exist in :other.",
  integer: "Polje :attribute mora biti broj.",
  ip: "Polje :attribute mora biti validna IP adresa.",
  ipv4: "The :attribute must be a valid IPv4 address.",
  ipv6: "The :attribute must be a valid IPv6 address.",
  json: "The :attribute must be a valid JSON string.",
  lt: {
    numeric: "The :attribute must be less than :value.",
    file: "The :attribute must be less than :value kilobytes.",
    string: "The :attribute must be less than :value characters.",
    array: "The :attribute must have less than :value items."
  },
  lte: {
    numeric: "The :attribute must be less than or equal :value.",
    file: "The :attribute must be less than or equal :value kilobytes.",
    string: "The :attribute must be less than or equal :value characters.",
    array: "The :attribute must not have more than :value items."
  },
  max: {
    numeric: "Polje :attribute mora biti manje od :max.",
    file: "Polje :attribute mora biti manje od :max kilobajta.",
    string: "Polje :attribute mora sadržati manje od :max karaktera.",
    array: "Polje :attribute mora sadržati manje od :max karaktera."
  },
  mimes: "Polje :attribute mora biti fajl tipa: :values.",
  mimetypes: "Polje :attribute mora biti fajl tipa: :values.",
  min: {
    numeric: "Polje :attribute mora biti najmanje :min.",
    file: "Fajl :attribute mora biti najmanje :min kilobajta.",
    string: "Polje :attribute mora sadržati najmanje :min karaktera.",
    array: "Polje :attribute mora sadržati najmanje :min karaktera."
  },
  not_in: "Odabrani element polja :attribute nije validan.",
  not_regex: "The :attribute format is invalid.",
  numeric: "Polje :attribute mora biti broj.",
  present: "The :attribute field must be present.",
  regex: "Polje :attribute ima neispravan format.",
  required: "Polje :attribute je obavezno.",
  required_if: "Polje :attribute je obavezno kada :other je :value.",
  required_unless: "The :attribute field is required unless :other is in :values.",
  required_with: "Polje :attribute je obavezno kada je :values prikazano.",
  required_with_all: "Polje :attribute je obavezno kada je :values prikazano.",
  required_without: "Polje :attribute je obavezno kada :values nije prikazano.",
  required_without_all: "Polje :attribute je obavezno kada nijedno :values nije prikazano.",
  same: "Polja :attribute i :other se moraju poklapati.",
  size: {
    numeric: "Polje :attribute mora biti :size.",
    file: "Fajl :attribute mora biti :size kilobajta.",
    string: "Polje :attribute mora biti :size karaktera.",
    array: "Polje :attribute mora biti :size karaktera."
  },
  string: "Polje :attribute mora sadrzavati slova.",
  timezone: "Polje :attribute mora biti ispravna vremenska zona.",
  unique: "Polje :attribute već postoji.",
  uploaded: "The :attribute failed to upload.",
  url: "Format polja :attribute nije validan."
};


/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = {
  accepted: 'El camp :attribute pot ser aceptat.',
  after: 'El camp :attribute pot ser una data posterior a :after.',
  alpha: 'El camp :attribute només pot contenir lletras.',
  alpha_dash: 'El camp :attribute només pot contenir lletras, nombres y guions.',
  alpha_num: 'El camp :attribute només pot contenir lletras y nombres.',
  attributes: {},
  between: 'El camp :attribute té que estar entre :min - :max.',
  confirmed: 'La confirmació de :attribute no coincideix.',
  different: 'El camp :attribute y :other poden ser diferents.',
  digits: 'El camp :attribute pot tindre :digits dígitos.',
  digits_between: 'El camp  :attribute ha de tenir entre :min i :max dígits.',
  email: 'El camp :attribute no es un correu válido.',
  'in': 'El camp :attribute es invàlid.',
  integer: 'El camp :attribute pot ser un nombre enter.',
  hex: 'El camp :attribute hauria de tenir format hexadecimal',
  max: {
    numeric: 'El camp :attribute no pot ser mayor a :max.',
    string: 'El camp :attribute no pot ser mayor que :max caràcters.'
  },
  min: {
    numeric: 'La mida del camp :attribute pot ser de al menys :min.',
    string: 'El camp :attribute pot contenir al menys :min caràcters.'
  },
  not_in: 'El camp :attribute es invàlid.',
  numeric: 'El camp :attribute pot ser numéric.',
  present: 'El camp de :attribute pot estar present (però pot estar buit).',
  regex: 'El format del camp :attribute es invàlid.',
  required: 'El camp :attribute es obligatori.',
  required_if: 'El camp :attribute es obligatori quan :other es :value.',
  same: 'El camp :attribute y :other poden coincidir.',
  size: {
    numeric: 'La mida del camp :attribute pot ser :size.',
    string: 'El camp :attribute pot contenir :size caràcters.'
  },
  url: 'El format de :attribute es invàlid.'
};


/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = {
  accepted: ":attribute musí být přijat.",
  active_url: ":attribute není platnou URL adresou.",
  after: ":attribute musí být datum po :date.",
  after_or_equal: "The :attribute must be a date after or equal to :date.",
  alpha: ":attribute může obsahovat pouze písmena.",
  alpha_dash:
    ":attribute může obsahovat pouze písmena, číslice, pomlčky a podtržítka. České znaky (á, é, í, ó, ú, ů, ž, š, č, ř, ď, ť, ň) nejsou podporovány.",
  alpha_num: ":attribute může obsahovat pouze písmena a číslice.",
  attributes: {},
  array: ":attribute musí být pole.",
  before: ":attribute musí být datum před :date.",
  before_or_equal: "The :attribute must be a date before or equal to :date.",
  between: {
    numeric: ":attribute musí být hodnota mezi :min a :max.",
    file: ":attribute musí být větší než :min a menší než :max Kilobytů.",
    string: ":attribute musí být delší než :min a kratší než :max znaků.",
    array: ":attribute musí obsahovat nejméně :min a nesmí obsahovat více než :max prvků."
  },
  boolean: ":attribute musí být true nebo false",
  confirmed: ":attribute nebylo odsouhlaseno.",
  date: ":attribute musí být platné datum.",
  date_format: ":attribute není platný formát data podle :format.",
  different: ":attribute a :other se musí lišit.",
  digits: ":attribute musí být :digits pozic dlouhé.",
  digits_between: ":attribute musí být dlouhé nejméně :min a nejvíce :max pozic.",
  dimensions: ":attribute má neplatné rozměry.",
  distinct: ":attribute má duplicitní hodnotu.",
  email: ":attribute není platný formát.",
  exists: "Zvolená hodnota pro :attribute není platná.",
  file: ":attribute musí být soubor.",
  filled: ":attribute musí být vyplněno.",
  gt: {
    numeric: "The :attribute must be greater than :value.",
    file: "The :attribute must be greater than :value kilobytes.",
    string: "The :attribute must be greater than :value characters.",
    array: "The :attribute must have more than :value items."
  },
  gte: {
    numeric: "The :attribute must be greater than or equal :value.",
    file: "The :attribute must be greater than or equal :value kilobytes.",
    string: "The :attribute must be greater than or equal :value characters.",
    array: "The :attribute must have :value items or more."
  },
  hex: "The :attribute field should have hexadecimal format",
  image: ":attribute musí být obrázek.",
  in: "Zvolená hodnota pro :attribute je neplatná.",
  in_array: ":attribute není obsažen v :other.",
  integer: ":attribute musí být celé číslo.",
  ip: ":attribute musí být platnou IP adresou.",
  ipv4: "The :attribute must be a valid IPv4 address.",
  ipv6: "The :attribute must be a valid IPv6 address.",
  json: ":attribute musí být platný JSON řetězec.",
  lt: {
    numeric: "The :attribute must be less than :value.",
    file: "The :attribute must be less than :value kilobytes.",
    string: "The :attribute must be less than :value characters.",
    array: "The :attribute must have less than :value items."
  },
  lte: {
    numeric: "The :attribute must be less than or equal :value.",
    file: "The :attribute must be less than or equal :value kilobytes.",
    string: "The :attribute must be less than or equal :value characters.",
    array: "The :attribute must not have more than :value items."
  },
  max: {
    numeric: ":attribute musí být nižší než :max.",
    file: ":attribute musí být menší než :max Kilobytů.",
    string: ":attribute musí být kratší než :max znaků.",
    array: ":attribute nesmí obsahovat více než :max prvků."
  },
  mimes: ":attribute musí být jeden z následujících datových typů :values.",
  mimetypes: ":attribute musí být jeden z následujících datových typů :values.",
  min: {
    numeric: ":attribute musí být větší než :min.",
    file: ":attribute musí být větší než :min Kilobytů.",
    string: ":attribute musí být delší než :min znaků.",
    array: ":attribute musí obsahovat více než :min prvků."
  },
  not_in: "Zvolená hodnota pro :attribute je neplatná.",
  not_regex: "The :attribute format is invalid.",
  numeric: ":attribute musí být číslo.",
  present: ":attribute musí být vyplněno.",
  regex: ":attribute nemá správný formát.",
  required: ":attribute musí být vyplněno.",
  required_if: ":attribute musí být vyplněno pokud :other je :value.",
  required_unless: ":attribute musí být vyplněno dokud :other je v :value.",
  required_with: ":attribute musí být vyplněno pokud :field je vyplněno.",
  required_with_all: ":attribute musí být vyplněno pokud :fields je zvoleno.",
  required_without: ":attribute musí být vyplněno pokud :field není vyplněno.",
  required_without_all: ":attribute musí být vyplněno pokud není žádné z :fields zvoleno.",
  same: ":attribute a :other se musí shodovat.",
  size: {
    numeric: ":attribute musí být přesně :size.",
    file: ":attribute musí mít přesně :size Kilobytů.",
    string: ":attribute musí být přesně :size znaků dlouhý.",
    array: ":attribute musí obsahovat právě :size prvků."
  },
  string: ":attribute musí být řetězec znaků.",
  timezone: ":attribute musí být platná časová zóna.",
  unique: ":attribute musí být unikátní.",
  uploaded: "Nahrávání :attribute se nezdařilo.",
  url: "Formát :attribute je neplatný."
};


/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = {
  accepted: "Rhaid derbyn :attribute.",
  active_url: "Nid yw :attribute yn URL dilys.",
  after: "Rhaid i :attribute fod yn ddyddiad sydd ar ôl :date.",
  after_or_equal: "The :attribute must be a date after or equal to :date.",
  alpha: "Dim ond llythrennau'n unig gall :attribute gynnwys.",
  alpha_dash: "Dim ond llythrennau, rhifau a dash yn unig gall :attribute gynnwys.",
  alpha_num: "Dim ond llythrennau a rhifau yn unig gall :attribute gynnwys.",
  attributes: {},
  array: "Rhaid i :attribute fod yn array.",
  before: "Rhaid i :attribute fod yn ddyddiad sydd cyn :date.",
  before_or_equal: "The :attribute must be a date before or equal to :date.",
  between: {
    numeric: "Rhaid i :attribute fod rhwng :min a :max.",
    file: "Rhaid i :attribute fod rhwng :min a :max kilobytes.",
    string: "Rhaid i :attribute fod rhwng :min a :max nodyn.",
    array: "Rhaid i :attribute fod rhwng :min a :max eitem."
  },
  boolean: "Rhaid i'r maes :attribute fod yn wir neu gau.",
  confirmed: "Nid yw'r cadarnhad :attribute yn gyfwerth.",
  date: "Nid yw :attribute yn ddyddiad dilys.",
  date_format: "Nid yw :attribute yn y fformat :format.",
  different: "Rhaid i :attribute a :other fod yn wahanol.",
  digits: "Rhaid i :attribute fod yn :digits digid.",
  digits_between: "Rhaid i :attribute fod rhwng :min a :max digid.",
  dimensions: "The :attribute has invalid image dimensions.",
  distinct: "The :attribute field has a duplicate value.",
  email: "Rhaid i :attribute fod yn gyfeiriad ebost dilys.",
  file: "The :attribute must be a file.",
  filled: "Rhaid cynnwys :attribute.",
  exists: "Nid yw :attribute yn ddilys.",
  gt: {
    numeric: "The :attribute must be greater than :value.",
    file: "The :attribute must be greater than :value kilobytes.",
    string: "The :attribute must be greater than :value characters.",
    array: "The :attribute must have more than :value items."
  },
  gte: {
    numeric: "The :attribute must be greater than or equal :value.",
    file: "The :attribute must be greater than or equal :value kilobytes.",
    string: "The :attribute must be greater than or equal :value characters.",
    array: "The :attribute must have :value items or more."
  },
  hex: "The :attribute field should have hexadecimal format",
  image: "Rhaid i :attribute fod yn lun.",
  in: "Nid yw :attribute yn ddilys.",
  in_array: "The :attribute field does not exist in :other.",
  integer: "Rhaid i :attribute fod yn integer.",
  ip: "Rhaid i :attribute fod yn gyfeiriad IP dilys.",
  ipv4: "The :attribute must be a valid IPv4 address.",
  ipv6: "The :attribute must be a valid IPv6 address.",
  json: "The :attribute must be a valid JSON string.",
  lt: {
    numeric: "The :attribute must be less than :value.",
    file: "The :attribute must be less than :value kilobytes.",
    string: "The :attribute must be less than :value characters.",
    array: "The :attribute must have less than :value items."
  },
  lte: {
    numeric: "The :attribute must be less than or equal :value.",
    file: "The :attribute must be less than or equal :value kilobytes.",
    string: "The :attribute must be less than or equal :value characters.",
    array: "The :attribute must not have more than :value items."
  },
  max: {
    numeric: "Ni chai :attribute fod yn fwy na :max.",
    file: "Ni chai :attribute fod yn fwy na :max kilobytes.",
    string: "Ni chai :attribute fod yn fwy na :max nodyn.",
    array: "Ni chai :attribute fod yn fwy na :max eitem."
  },
  mimes: "Rhaid i :attribute fod yn ffeil o'r math: :values.",
  mimetypes: "Rhaid i :attribute fod yn ffeil o'r math: :values.",
  min: {
    numeric: "Rhaid i :attribute fod o leiaf :min.",
    file: "Rhaid i :attribute fod o leiaf :min kilobytes.",
    string: "Rhaid i :attribute fod o leiaf :min nodyn.",
    array: "Rhaid i :attribute fod o leiaf :min eitem."
  },
  not_in: "Nid yw :attribute yn ddilys.",
  not_regex: "The :attribute format is invalid.",
  numeric: "Rhaid i :attribute fod yn rif.",
  present: "The :attribute field must be present.",
  regex: "Nid yw fformat :attribute yn ddilys.",
  required: "Rhaid cynnwys :attribute.",
  required_if: "Rhaid cynnwys :attribute pan mae :other yn :value.",
  required_unless: "The :attribute field is required unless :other is in :values.",
  required_with: "Rhaid cynnwys :attribute pan mae :values yn bresennol.",
  required_with_all: "Rhaid cynnwys :attribute pan mae :values yn bresennol.",
  required_without: "Rhaid cynnwys :attribute pan nad oes :values yn bresennol.",
  required_without_all: "Rhaid cynnwys :attribute pan nad oes :values yn bresennol.",
  same: "Rhaid i :attribute a :other fod yn gyfwerth.",
  size: {
    numeric: "Rhaid i :attribute fod yn :size.",
    file: "Rhaid i :attribute fod yn :size kilobytes.",
    string: "Rhaid i :attribute fod yn :size nodyn.",
    array: "Rhaid i :attribute fod yn :size eitem."
  },
  string: "The :attribute must be a string.",
  timezone: "Rhaid i :attribute fod yn timezone dilys.",
  unique: "Mae :attribute eisoes yn bodoli.",
  uploaded: "The :attribute failed to upload.",
  url: "Nid yw fformat :attribute yn ddilys."
};


/***/ }),
/* 17 */
/***/ ((module) => {

module.exports = {
  accepted: ':attribute skal accepteres.',
  after: ':attribute skal være en dato efter :after.',
  after_or_equal: ':attribute skal være en dato efter eller lig med :after_or_equal.',
  alpha: ':attribute må kun bestå af bogstaver.',
  alpha_dash: ':attribute må kun bestå af bogstaver, tal og bindestreger.',
  alpha_num: ':attribute må kun bestå af bogstaver og tal.',
  before: ':attribute skal være en dato før :before.',
  before_or_equal: ':attribute skal være en dato før eller lig med :before_or_equal.',
  between: ':attribute skal være mellem :min og :max.',
  confirmed: ':attribute er ikke det samme som bekræftelsesfeltet.',
  email: ':attribute skal være en gyldig email.',
  date: ':attribute er ikke en gyldig dato.',
  def: ':attribute attributen har fejl.',
  digits: ':attribute skal have :digits cifre.',
  digits_between: ':attribute skal have mellem :min og :max cifre.',
  different: ':attribute og :different skal være forskellige.',
  in: 'Det valgte :attribute er ugyldigt.',
  integer: ':attribute skal være et heltal.',
  hex: ':attribute skal have hexadecimalt format',
  min: {
    numeric: ':attribute skal være mindst :min.',
    string: ':attribute skal være mindst :min tegn.'
  },
  max: {
    numeric: ':attribute skal være højest :max.',
    string: ':attribute skal være højest :max tegn.'
  },
  not_in: 'Den valgte :attribute er ugyldig',
  numeric: ':attribute skal være et tal.',
  present: ':attribute skal være tilstede.',
  required: ':attribute skal udfyldes.',
  required_if: ':attribute skal udfyldes når :other er :value.',
  required_unless: ':attribute er påkrævet medmindre :other findes i :values.',
  required_with: ':attribute skal udfyldes når :field er udfyldt.',
  required_with_all: ':attribute skal udfyldes når :fields er udfyldt.',
  required_without: ':attribute skal udfyldes når :field ikke er udfyldt.',
  required_without_all: ':attribute skal udfyldes når ingen af :fields er udfyldt.',
  same: ':attribute og :same skal være ens.',
  size: {
    numeric: ':attribute skal være :size.',
    string: ':attribute skal være :size tegn lang.'
  },
  string: ':attribute skal være en streng.',
  url: ':attribute formatet er ugyldigt.',
  regex: ':attribute formatet er ugyldigt.',
  attributes: {}
};


/***/ }),
/* 18 */
/***/ ((module) => {

module.exports = {
  accepted: 'Das :attribute Feld muss akzeptiert werden.',
  after: 'Das :attribute muss ein Datum nach dem :after sein.',
  after_or_equal: 'Das :attribute Datum muss kleiner oder gleich dem :after_or_equal sein.',
  alpha: 'Das :attribute Feld darf nur aus Buchstaben bestehen.',
  alpha_dash: 'Das :attribute Feld darf nur aus Buchstaben, Zahlen, Binde- und Unterstrichen bestehen.',
  alpha_num: 'Das :attribute Feld darf nur aus Buchstaben und Zahlen bestehen.',
  before: 'Das :attribute muss ein Datum vor dem :before sein.',
  before_or_equal: 'Das :attribute Datum muss größer oder gleich dem :before_or_equal sein.',
  between: 'Das :attribute Feld muss zwischen :min und :max liegen.',
  confirmed: 'Das :attribute Feld stimmt nicht mit der Bestätigung überein.',
  email: 'Das :attribute Format ist ungültig.',
  date: 'Das :attribute Feld muss ein gültiges Datum sein.',
  def: 'Das :attribute Feld hat Fehler.',
  digits: 'Das :attribute Feld muss :digits Stellen haben.',
  digits_between: 'Das :attribute Feld muss zwischen :min und :max Stellen haben.',
  different: 'Die Felder :attribute und :different müssen sich unterscheiden.',
  in: 'Der gewählte Wert für :attribute ist ungültig.',
  integer: 'Das :attribute Feld muss eine ganze Zahl sein.',
  hex: 'Das :attribute Feld sollte hexadezimal sein',
  min: {
    numeric: 'Das :attribute Feld muss mindestens :min sein.',
    string: 'Das :attribute Feld muss mindestens :min Zeichen lang sein.'
  },
  max: {
    numeric: 'Das :attribute Feld darf maximal :max sein.',
    string: 'Das :attribute Feld darf maximal :max Zeichen haben.'
  },
  not_in: 'Der gewählte Wert für :attribute ist ungültig.',
  numeric: 'Das :attribute Feld muss eine Zahl sein.',
  present: 'Das Feld :attribute muss vorhanden sein (kann aber leer sein).',
  required: 'Das :attribute Feld muss ausgefüllt sein.',
  required_if: 'Das :attribute Feld muss ausgefüllt sein, wenn :other :value ist.',
  same: 'Die Felder :attribute und :same müssen übereinstimmen.',
  size: {
    numeric: 'Das :attribute Feld muss gleich :size sein.',
    string: 'Das :attribute Feld muss :size Zeichen lang sein.'
  },
  string: 'Das :attribute Feld muss ein Satz sein.',
  url: 'Das Format von :attribute ist ungültig.',
  regex: 'Das :attribute Format ist ungültig.',
  attributes: {}
};


/***/ }),
/* 19 */
/***/ ((module) => {

module.exports = {
  accepted: 'Το πεδίο :attribute πρέπει να γίνει αποδεκτό.',
  after: 'Το πεδίο :attribute πρέπει να είναι μία ημερομηνία μετά από :after.',
  alpha: 'Το πεδίο :attribute μπορεί να περιέχει μόνο γράμματα.',
  alpha_dash: 'Το πεδίο :attribute μπορεί να περιέχει μόνο γράμματα, αριθμούς, και παύλες.',
  alpha_num: 'Το πεδίο :attribute μπορεί να περιέχει μόνο γράμματα και αριθμούς.',
  between: 'Το πεδίο :attribute πρέπει να είναι μεταξύ :min και :max.',
  confirmed: 'Η επιβεβαίωση του :attribute δεν ταιριάζει.',
  email: 'Το πεδίο :attribute πρέπει να είναι μία έγκυρη διεύθυνση email.',
  date: 'Το πεδίο :attribute δεν είναι έγκυρη ημερομηνία.',
  def: 'Το πεδίο :attribute περιέχει σφάλματα.',
  digits: 'Το πεδίο :attribute πρέπει να είναι :digits ψηφία.',
  digits_between: 'Το πεδίο :attribute πρέπει να είναι μεταξύ :min και :max ψηφία.',
  different: 'Το πεδίο :attribute  και :different πρέπει να είναι διαφορετικά.',
  in: 'Το επιλεγμένο :attribute δεν είναι έγκυρο.',
  integer: 'Το πεδίο :attribute πρέπει να είναι ακέραιος.',
  hex: 'Το πεδίο :attribute πρέπει να είναι σε δεκαεξαδική μορφή.',
  min: {
    numeric: 'Το πεδίο :attribute πρέπει να είναι τουλάχιστον :min.',
    string: 'Το πεδίο :attribute πρέπει να έχει τουλάχιστον :min χαρακτήρες.'
  },
  max: {
    numeric: 'Το πεδίο :attribute δεν μπορεί να είναι μεγαλύτερο από :max.',
    string: 'Το πεδίο :attribute δεν μπορεί να έχει περισσότερους από :max χαρακτήρες.'
  },
  not_in: 'Το επιλεγμένο :attribute δεν είναι αποδεκτό.',
  numeric: 'Το πεδίο :attribute πρέπει να είναι αριθμός.',
  present: 'The :attribute field must be present (but can be empty).',
  required: 'Το πεδίο :attribute είναι απαραίτητο.',
  required_if: 'Το πεδίο :attribute είναι απαραίτητο όταν το πεδίο :other είναι :value.',
  same: 'Τα πεδία :attribute και :same πρέπει να είναι ίδια.',
  size: {
    numeric: 'Το πεδίο :attribute πρέπει να είναι :size.',
    string: 'Το πεδίο :attribute πρέπει να είναι :size χαρακτήρες.'
  },
  string: 'Το πεδίο :attribute πρέπει να είναι αλφαριθμητικό.',
  url: 'Το πεδίο :attribute δεν είναι έγκυρη διεύθυνση URL.',
  regex: 'Η μορφή του :attribute δεν είναι αποδεκτή.',
  attributes: {}
};


/***/ }),
/* 20 */
/***/ ((module) => {

module.exports = {
  accepted: 'El campo :attribute debe ser aceptado.',
  after: 'El campo :attribute debe ser una fecha posterior a :after.',
  alpha: 'El campo :attribute solo debe contener letras.',
  alpha_dash: 'El campo :attribute solo debe contener letras, números y guiones.',
  alpha_num: 'El campo :attribute solo debe contener letras y números.',
  attributes: {},
  between: 'El campo :attribute tiene que estar entre :min - :max.',
  confirmed: 'La confirmación de :attribute no coincide.',
  different: 'El campo :attribute y :other deben ser diferentes.',
  digits: 'El campo :attribute debe tener :digits dígitos.',
  digits_between: 'El campo :attribute debe tener entre :min y :max dígitos.',
  email: 'El campo :attribute no es un correo válido.',
  in: 'El campo :attribute es inválido.',
  integer: 'El campo :attribute debe ser un número entero.',
  hex: 'El campo :attribute debe tener formato hexadecimal.',
  max: {
    numeric: 'El campo :attribute no debe ser mayor a :max.',
    string: 'El campo :attribute no debe ser mayor que :max caracteres.'
  },
  min: {
    numeric: 'El tamaño del campo :attribute debe ser de al menos :min.',
    string: 'El campo :attribute debe contener al menos :min caracteres.'
  },
  not_in: 'El campo :attribute es inválido.',
  numeric: 'El campo :attribute debe ser numérico.',
  present: 'El campo de :attribute debe estar presente (pero puede estar vacío).',
  regex: 'El formato del campo :attribute es inválido.',
  required: 'El campo :attribute es obligatorio.',
  required_if: 'El campo :attribute es obligatorio cuando :other es :value.',
  same: 'El campo :attribute y :other deben coincidir.',
  size: {
    numeric: 'El tamaño del campo :attribute debe ser :size.',
    string: 'El campo :attribute debe contener :size caracteres.'
  },
  url: 'El formato de :attribute es inválido.'
};


/***/ }),
/* 21 */
/***/ ((module) => {

module.exports = {
  accepted: ":attribute tuleb aktsepteerida.",
  active_url: ":attribute ei ole kehtiv URL.",
  after: ":attribute peab olema kuupäev pärast :date.",
  after_or_equal: ":attribute peab olema kuupäev pärast või samastuma :date.",
  alpha: ":attribute võib sisaldada vaid tähemärke.",
  alpha_dash: ":attribute võib sisaldada vaid tähti, numbreid ja kriipse.",
  alpha_num: ":attribute võib sisaldada vaid tähti ja numbreid.",
  attributes: {},
  array: ":attribute peab olema massiiv.",
  before: ":attribute peab olema kuupäev enne :date.",
  before_or_equal: ":attribute peab olema kuupäev enne või samastuma :date.",
  between: {
    numeric: ":attribute peab olema :min ja :max vahel.",
    file: ":attribute peab olema :min ja :max kilobaidi vahel.",
    string: ":attribute peab olema :min ja :max tähemärgi vahel.",
    array: ":attribute peab olema :min ja :max kirje vahel."
  },
  boolean: ":attribute väli peab olema tõene või väär.",
  confirmed: ":attribute kinnitus ei vasta.",
  date: ":attribute pole kehtiv kuupäev.",
  date_format: ":attribute ei vasta formaadile :format.",
  different: ":attribute ja :other peavad olema erinevad.",
  digits: ":attribute peab olema :digits numbrit.",
  digits_between: ":attribute peab olema :min ja :max numbri vahel.",
  dimensions: ":attribute on valed pildi suurused.",
  distinct: ":attribute väljal on topeltväärtus.",
  email: ":attribute peab olema kehtiv e-posti aadress.",
  exists: "Valitud :attribute on vigane.",
  file: ":attribute peab olema fail.",
  filled: ":attribute väli on nõutav.",
  gt: {
    numeric: "The :attribute must be greater than :value.",
    file: "The :attribute must be greater than :value kilobytes.",
    string: "The :attribute must be greater than :value characters.",
    array: "The :attribute must have more than :value items."
  },
  gte: {
    numeric: "The :attribute must be greater than or equal :value.",
    file: "The :attribute must be greater than or equal :value kilobytes.",
    string: "The :attribute must be greater than or equal :value characters.",
    array: "The :attribute must have :value items or more."
  },
  hex: "The :attribute field should have hexadecimal format",
  image: ":attribute peab olema pilt.",
  in: "Valitud :attribute on vigane.",
  in_array: ":attribute väli ei eksisteeri :other sees.",
  integer: ":attribute peab olema täisarv.",
  ip: ":attribute peab olema kehtiv IP aadress.",
  ipv4: ":attribute peab olema kehtiv IPv4 aadress.",
  ipv6: ":attribute peab olema kehtiv IPv6 aadress.",
  json: ":attribute peab olema kehtiv JSON string.",
  lt: {
    numeric: "The :attribute must be less than :value.",
    file: "The :attribute must be less than :value kilobytes.",
    string: "The :attribute must be less than :value characters.",
    array: "The :attribute must have less than :value items."
  },
  lte: {
    numeric: "The :attribute must be less than or equal :value.",
    file: "The :attribute must be less than or equal :value kilobytes.",
    string: "The :attribute must be less than or equal :value characters.",
    array: "The :attribute must not have more than :value items."
  },
  max: {
    numeric: ":attribute ei tohi olla suurem kui :max.",
    file: ":attribute ei tohi olla suurem kui :max kilobaiti.",
    string: ":attribute ei tohi olla suurem kui :max tähemärki.",
    array: ":attribute ei tohi sisaldada rohkem kui :max kirjet."
  },
  mimes: ":attribute peab olema :values tüüpi.",
  mimetypes: ":attribute peab olema :values tüüpi.",
  min: {
    numeric: ":attribute peab olema vähemalt :min.",
    file: ":attribute peab olema vähemalt :min kilobaiti.",
    string: ":attribute peab olema vähemalt :min tähemärki.",
    array: ":attribute peab olema vähemalt :min kirjet."
  },
  not_in: "Valitud :attribute on vigane.",
  not_regex: "The :attribute format is invalid.",
  numeric: ":attribute peab olema number.",
  present: ":attribute väli peab olema esindatud.",
  regex: ":attribute vorming on vigane.",
  required: ":attribute väli on nõutud.",
  required_if: ":attribute väli on nõutud, kui :other on :value.",
  required_unless: ":attribute väli on nõutud, välja arvatud, kui :other on :values.",
  required_with: ":attribute väli on nõutud, kui :values on esindatud.",
  required_with_all: ":attribute väli on nõutud, kui :values on esindatud.",
  required_without: ":attribute väli on nõutud, kui :values ei ole esindatud.",
  required_without_all: ":attribute väli on nõutud, kui ükski :values pole esindatud.",
  same: ":attribute ja :other peavad sobima.",
  size: {
    numeric: ":attribute peab olema :size.",
    file: ":attribute peab olema :size kilobaiti.",
    string: ":attribute peab olema :size tähemärki.",
    array: ":attribute peab sisaldama :size kirjet."
  },
  string: ":attribute peab olema string.",
  timezone: ":attribute peab olema kehtiv tsoon.",
  unique: ":attribute on juba hõivatud.",
  uploaded: ":attribute ei õnnestunud laadida.",
  url: ":attribute vorming on vigane."
};


/***/ }),
/* 22 */
/***/ ((module) => {

module.exports = {
  accepted: ":attribute onartua izan behar da.",
  active_url: ":attribute ez da baliozko URL bat.",
  after: ":attribute :date osteko data izan behar da.",
  after_or_equal: ":attribute :date osteko data edo data berdina izan behar da.",
  alpha: ":attribute hizkiak besterik ezin ditu izan.",
  alpha_dash: ":attribute hizkiak, zenbakiak eta marrak besterik ezin ditu izan.",
  alpha_num: ":attribute hizkiak eta zenbakiak besterik ezin ditu izan.",
  attributes: {},
  array: ":attribute bilduma izan behar da.",
  before: ":attribute :date aurreko data izan behar da.",
  before_or_equal: ":attribute :date aurreko data edo data berdina izan behar da.",
  between: {
    numeric: ":attribute :min eta :max artean egon behar da.",
    file: ":attribute-k :min eta :max kilobyte arteko pisua izan behar du.",
    string: ":attribute :min eta :max karaktere artean egon behar da.",
    array: ":attribute-k :min eta :max arteko ale kantitatea euki behar du."
  },
  boolean: ":attribute-ren balioa egia edo gezurra izan behar da.",
  confirmed: ":attribute-ren konfirmazioa ez dator bat.",
  date: ":attribute ez da baliozko data.",
  date_format: ":attribute datak ez du :format formatua.",
  different: ":attribute eta :other ezberdinak izan behar dira.",
  digits: ":attribute-k :digits digitu euki behar ditu.",
  digits_between: ":attribute-k :min eta :max arteko digitu kantitatea euki behar du.",
  dimensions: ":attribute-k ez ditu irudi neurri aproposak.",
  distinct: ":attribute-k balio bikoiztua dauka.",
  email: ":attribute-k baliozko posta helbidea euki behar du.",
  exists: "Hautatutako :attribute baliogabea da.",
  file: ":attribute fitxategi bat izan behar da.",
  filled: ":attribute-k balioren bat euki behar du.",
  gt: {
    numeric: "The :attribute must be greater than :value.",
    file: "The :attribute must be greater than :value kilobytes.",
    string: "The :attribute must be greater than :value characters.",
    array: "The :attribute must have more than :value items."
  },
  gte: {
    numeric: "The :attribute must be greater than or equal :value.",
    file: "The :attribute must be greater than or equal :value kilobytes.",
    string: "The :attribute must be greater than or equal :value characters.",
    array: "The :attribute must have :value items or more."
  },
  hex: "The :attribute field should have hexadecimal format",
  image: ":attribute irudi bat izan behar da.",
  in: "Hautatutako :attribute baliogabea da.",
  in_array: ":attribute ez da :other-en existizen.",
  integer: ":attribute zenbaki osoa izan behar da.",
  ip: ":attribute baliozko IP helbidea izan behar da.",
  ipv4: ":attribute baliozko IPv4 helbidea izan behar da.",
  ipv6: ":attribute baliozko IPv6 helbidea izan behar da.",
  json: ":attribute-k baliozko JSON karaktere-katea euki behar du.",
  lt: {
    numeric: "The :attribute must be less than :value.",
    file: "The :attribute must be less than :value kilobytes.",
    string: "The :attribute must be less than :value characters.",
    array: "The :attribute must have less than :value items."
  },
  lte: {
    numeric: "The :attribute must be less than or equal :value.",
    file: "The :attribute must be less than or equal :value kilobytes.",
    string: "The :attribute must be less than or equal :value characters.",
    array: "The :attribute must not have more than :value items."
  },
  max: {
    numeric: ":attribute ezin da :max baino handiagoa izan.",
    file: ":attribute-k ezin du :max kilobyte baino gehiagoko pisua euki.",
    string: ":attribute-k ezin du :max karaktere baino gehiago euki.",
    array: ":attribute-k ezin du :max ale baino gehiago euki."
  },
  mimes: ":attribute :values motatako fitxategia izan behar da.",
  mimetypes: ":attribute :values motatako fitxategia izan behar da.",
  min: {
    numeric: ":attribute-k gutxienez :min-eko tamaina izan behar du.",
    file: ":attribute-k gutxienez :min kilobyteko pisua euki behar du.",
    string: ":attribute-k gutxienez :min karaktere euki behar ditu.",
    array: ":attribute-k gutxienez :min ale euki behar ditu."
  },
  not_in: "Hautatutako :attribute baliogabea da.",
  not_regex: "The :attribute format is invalid.",
  numeric: ":attribute zenbaki bat izan behar da.",
  present: ":attribute bertan egon behar da.",
  regex: ":attribute-k ez dauka formatu egokirik.",
  required: ":attribute derrigorrezkoa da.",
  required_if: ":attribute derrigorrezkoa da :other :value denean.",
  required_unless: ":attribute derrigorrezkoa da :other :values-en egon ezean.",
  required_with: ":attribute derrigorrezkoa da :values bertan dagoenean.",
  required_with_all: ":attribute derrigorrezkoa da :values bertan dagoenean.",
  required_without: ":attribute derrigorrezkoa da :values bertan ez dagoenean.",
  required_without_all: ":attribute derrigorrezkoa da :values bertan ez dagoenean.",
  same: ":attribute eta :other bat etorri behar dira.",
  size: {
    numeric: ":attribute-k :size-eko tamaina izan behar du.",
    file: ":attribute-k :size kilobyteko pisua euki behar du.",
    string: ":attribute-k :size karaktere euki beha ditu.",
    array: ":attribute-k :size ale euki behar ditu."
  },
  string: ":attribute karaktere-katea izan behar da.",
  timezone: ":attribute baliozko gunea izan behar da.",
  unique: ":attribute jadanik erregistratua izan da.",
  uploaded: ":attribute igotzerakoan huts egin du.",
  url: ":attribute-k ez dauka formatu egokirik."
};


/***/ }),
/* 23 */
/***/ ((module) => {

module.exports = {
  accepted: 'فیلد :attribute می بایست تایید شود',
  alpha: 'فیلد :attribute می بایست فقط شامل حروف انگلیسی باشد',
  alpha_dash: 'فیلد :attribute می بایست فقط شامل حروف انگلیسی و خط تیره و زیرخط باشد',
  alpha_num: 'فیلد :attribute می بایست فقط شامل حروف و اعداد باشد',
  between: 'فیلد :attribute می بایست بزرگتر از :min و کوچکتر از :max باشد',
  confirmed: 'تطبیق فیلد :attribute صحیح نمی باشد',
  email: 'فرمت ایمیل وارد شده در :attribute صحیح نمی‌باشد',
  date: 'تاریخ درج شده در فیلد :attribute صحیح نیست',
  def: 'فیلد :attribute اشکال دارد',
  digits: 'فیلد :attribute می بایست شامل :digits رقم باشد',
  digits_between: ':attribute باید بین :min و :max رقم باشد.',
  different: 'فیلد :attribute می بایست مقداری غیر از :different داشته باشد',
  in: 'فیلد :attribute انتخاب شده صحیح نمی باشد',
  integer: 'فیلد :attribute می بایست عددی باشد',
  hex: 'فیلد :attribute باید در فرمت مبنای ۱۶ باشد',
  min: {
    numeric: 'فیلد :attribute می بایست از :min بزرگتر باشد',
    string: 'فیلد :attribute بایستی حداقل :min کاراکتر طول داشته باشد'
  },
  max: {
    numeric: 'فیلد :attribute می بایست از :max کوچکتر باشد',
    string: 'فیلد :attribute نباید بیشتر از :max کاراکتر طول داشته باشد'
  },
  not_in: 'فیلد :attribute انتخاب شده صحیح نمی باشد',
  numeric: 'فیلد :attribute می بایست عددی باشد',
  present: 'The :attribute field must be present (but can be empty).',
  required: 'فیلد :attribute الزامی است',
  required_if: 'در صورت دادن :value به :other تکمیل فیلد :attribute الزامی است',
  same: 'فیلد :attribute می بایست با فیلد :same یکی باشد',
  size: {
    numeric: 'فیلد :attribute می بایست :size باشد',
    string: 'فیلد :attribute می بایست :size کاراکتر طول داشته باشد'
  },
  string: 'فیلد :attribute می بایست متنی باشد',
  url: 'آدرس فیلد :attribute صحیح نمی باشد',
  regex: 'فرمت آدرس :attribute صحیح نمی باشد',
  attributes: {}
};


/***/ }),
/* 24 */
/***/ ((module) => {

module.exports = {
  accepted: ':attribute on oltava hyväksytty.',
  after: ':attribute on oltava :after jälkeen.',
  after_or_equal: ':attribute täytyy olla sama kuin :after_or_equal tai sen jälkeen.',
  alpha: ':attribute kenttä saa sisältää ainoastaan kirjaimia.',
  alpha_dash: ':attribute kenttä saa sisältää ainoastaan kirjaimia tai numeroita, sekä pisteitä ja alaviivoja.',
  alpha_num: ':attribute kenttä saa sisältää ainoastaan kirjaimia tai numeroita.',
  before: ':attribute on oltava ennen kuin :before.',
  before_or_equal: ':attribute on oltava sama tai ennen kuin :before_or_equal.',
  between: ':attribute on oltava :min ja :max väliltä.',
  confirmed: ':attribute vahvistus ei täsmää.',
  email: ':attribute on väärässä muodossa.',
  date: ':attribute ei ole päivämäärä.',
  def: ':attribute sisältää virheitä.',
  digits: ':attribute on oltava :digits numeroa pitkä.',
  digits_between: 'Kentän :attribute arvon tulee olla :min - :max numeroa.',
  different: ':attribute ei saa olla yhtä kuin :different.',
  in: 'Valittu :attribute ei kelpaa.',
  integer: ':attribute ei ole numero.',
  hex: ':attribute on oltava heksadesimaali.',
  min: {
    numeric: ':attribute on oltava vähintään :min.',
    string: ':attribute on oltava vähintään :min merkkiä pitkä.'
  },
  max: {
    numeric: ':attribute on oltava enintään :max.',
    string: ':attribute on oltava enintään :max merkkiä pitkä.'
  },
  not_in: 'Valittu :attribute ei kelpaa.',
  numeric: ':attribute on oltava numero.',
  present: ':attribute kenttä on oltava (mutta saa olla tyhjä).',
  required: ':attribute kenttä on pakollinen.',
  required_if: ':attribute kenttä on pakollinen, jos kenttä :other on :value.',
  required_unless: ':attribute kenttä on pakollinen, jos kenttä :other ei ole :value.',
  required_with: ':attribute kenttä on pakollinen, jos kenttä :field ei ole tyhjä.',
  required_with_all: ':attribute kenttä on pakollinen, jos kentät :fields eivät ole tyhjiä.',
  required_without: ':attribute kenttä on pakollinen, jos kenttä :field on tyhjä.',
  required_without_all: ':attribute kenttä on pakollinen, jos kentät :fields ovat tyhjiä.',
  same: ':attribute ja :same on oltava samat.',
  size: {
    numeric: ':attribute on oltava :size.',
    string: ':attribute on oltava :size merkkiä pitkä.'
  },
  string: ':attribute on oltava merkkijono.',
  url: ':attribute on väärässä muodossa.',
  regex: ':attribute on väärässä muodossa.',
  attributes: {}
};


/***/ }),
/* 25 */
/***/ ((module) => {

module.exports = {
  accepted: 'Le champ :attribute doit être accepté.',
  alpha: 'Le champ :attribute ne peut contenir que des caractères alphabétiques.',
  alpha_dash: 'Le champ :attribute ne peut contenir que des caractères alphanumériques, des tirets et des underscores.',
  alpha_num: 'Le champ :attribute ne peut contenir que des caractères alphanumériques.',
  between: 'La longueur du champ :attribute doit être comprise entre :min and :max.',
  confirmed: 'Le champ :attribute n\'est pas confirmé.',
  email: 'Le champ :attribute contient un format invalide.',
  def: 'Le champ :attribute contient un attribut erroné.',
  digits: 'Le champ :attribute doit être composé de :digits chiffres.',
  digits_between: 'Le champ :attribute doit contenir entre :min et :max chiffres.',
  different: 'Les champs :attribute et :different doivent être différents.',
  in: 'Le champ :attribute est invalide.',
  integer: 'Le champ :attribute doit être un entier.',
  hex: 'Le champ :attribute doit être au format hexadécimal.',
  min: {
    numeric: 'Le champ :attribute doit être supérieur à :min.',
    string: 'Le champ :attribute doit contenir plus de :min caractères.'
  },
  max: {
    numeric: 'Le champ :attribute doit être inférieur à :max.',
    string: 'Le champ :attribute doit contenir moins de :max caractères.'
  },
  not_in: 'Le champ :attribute est invalide.',
  numeric: 'Le champ :attribute doit être un chiffre.',
  present: 'Le champ :attribute doit être présent (mais peut être vide).',
  required: 'Le champ :attribute est requis.',
  required_if: 'Le champ :attribute est requis quand :other est :value.',
  same: 'Les champs :attribute et :same doivent correspondre.',
  size: {
    numeric: 'Le champ :attribute doit être égal à :size.',
    string: 'Le champ :attribute doit contenir :size caractères.'
  },
  url: 'Le format du champ :attribute est invalide.',
  regex: 'Le format du champ :attribute est invalide.',
  attributes: {}
};


/***/ }),
/* 26 */
/***/ ((module) => {

module.exports = {
  accepted: "Polje :attribute mora biti prihvaćeno.",
  active_url: "Polje :attribute nije ispravan URL.",
  after: "Polje :attribute mora biti datum nakon :date.",
  after_or_equal: "Polje :attribute mora biti datum veći ili jednak :date.",
  alpha: "Polje :attribute smije sadržavati samo slova.",
  alpha_dash: "Polje :attribute smije sadržavati samo slova, brojeve i crtice.",
  alpha_num: "Polje :attribute smije sadržavati samo slova i brojeve.",
  attributes: {},
  array: "Polje :attribute mora biti niz.",
  before: "Polje :attribute mora biti datum prije :date.",
  before_or_equal: "Polje :attribute mora biti datum manji ili jednak :date.",
  between: {
    numeric: "Polje :attribute mora biti između :min - :max.",
    file: "Polje :attribute mora biti između :min - :max kilobajta.",
    string: "Polje :attribute mora biti između :min - :max znakova.",
    array: "Polje :attribute mora imati između :min - :max stavki."
  },
  boolean: "Polje :attribute mora biti false ili true.",
  confirmed: "Potvrda polja :attribute se ne podudara.",
  date: "Polje :attribute nije ispravan datum.",
  date_format: "Polje :attribute ne podudara s formatom :format.",
  different: "Polja :attribute i :other moraju biti različita.",
  digits: "Polje :attribute mora sadržavati :digits znamenki.",
  digits_between: "Polje :attribute mora imati između :min i :max znamenki.",
  dimensions: "Polje :attribute ima neispravne dimenzije slike.",
  distinct: "Polje :attribute ima dupliciranu vrijednost.",
  email: "Polje :attribute mora biti ispravna e-mail adresa.",
  exists: "Odabrano polje :attribute nije ispravno.",
  file: "Polje :attribute mora biti datoteka.",
  filled: "Polje :attribute je obavezno.",
  gt: {
    numeric: "Polje :attribute mora biti veće od :value.",
    file: "Polje :attribute mora biti veće od :value kilobajta.",
    string: "Polje :attribute mora biti veće od :value karaktera.",
    array: "Polje :attribute mora biti veće od :value stavki."
  },
  gte: {
    numeric: "Polje :attribute mora biti veće ili jednako :value.",
    file: "Polje :attribute mora biti veće ili jednako :value kilobajta.",
    string: "Polje :attribute mora biti veće ili jednako :value znakova.",
    array: "Polje :attribute mora imati :value stavki ili više."
  },
  hex: "The :attribute field should have hexadecimal format",
  image: "Polje :attribute mora biti slika.",
  in: "Odabrano polje :attribute nije ispravno.",
  in_array: "Polje :attribute ne postoji u :other.",
  integer: "Polje :attribute mora biti broj.",
  ip: "Polje :attribute mora biti ispravna IP adresa.",
  ipv4: "Polje :attribute mora biti ispravna IPv4 adresa.",
  ipv6: "Polje :attribute mora biti ispravna IPv6 adresa.",
  json: "Polje :attribute mora biti ispravan JSON string.",
  lt: {
    numeric: "Polje :attribute mora biti manje od :value.",
    file: "Polje :attribute mora biti manje od :value kilobajta.",
    string: "Polje :attribute mora biti manje od :value znakova.",
    array: "Polje :attribute mora biti manje od :value stavki."
  },
  lte: {
    numeric: "Polje :attribute mora biti manje ili jednako :value.",
    file: "Polje :attribute mora biti manje ili jednako :value kilobajta.",
    string: "Polje :attribute mora biti manje ili jednako :value znakova.",
    array: "Polje :attribute ne smije imati više od :value stavki."
  },
  max: {
    numeric: "Polje :attribute mora biti manje od :max.",
    file: "Polje :attribute mora biti manje od :max kilobajta.",
    string: "Polje :attribute mora sadržavati manje od :max znakova.",
    array: "Polje :attribute ne smije imati više od :max stavki."
  },
  mimes: "Polje :attribute mora biti datoteka tipa: :values.",
  mimetypes: "Polje :attribute mora biti datoteka tipa: :values.",
  min: {
    numeric: "Polje :attribute mora biti najmanje :min.",
    file: "Polje :attribute mora biti najmanje :min kilobajta.",
    string: "Polje :attribute mora sadržavati najmanje :min znakova.",
    array: "Polje :attribute mora sadržavati najmanje :min stavki."
  },
  not_in: "Odabrano polje :attribute nije ispravno.",
  not_regex: "Format polja :attribute je neispravan.",
  numeric: "Polje :attribute mora biti broj.",
  present: "Polje :attribute mora biti prisutno.",
  regex: "Polje :attribute se ne podudara s formatom.",
  required: "Polje :attribute je obavezno.",
  required_if: "Polje :attribute je obavezno kada polje :other sadrži :value.",
  required_unless: "Polje :attribute je obavezno osim :other je u :values.",
  required_with: "Polje :attribute je obavezno kada postoji polje :values.",
  required_with_all: "Polje :attribute je obavezno kada postje polja :values.",
  required_without: "Polje :attribute je obavezno kada ne postoji polje :values.",
  required_without_all: "Polje :attribute je obavezno kada nijedno od polja :values ne postoji.",
  same: "Polja :attribute i :other se moraju podudarati.",
  size: {
    numeric: "Polje :attribute mora biti :size.",
    file: "Polje :attribute mora biti :size kilobajta.",
    string: "Polje :attribute mora biti :size znakova.",
    array: "Polje :attribute mora sadržavati :size stavki."
  },
  string: "Polje :attribute mora biti string.",
  timezone: "Polje :attribute mora biti ispravna vremenska zona.",
  unique: "Polje :attribute već postoji.",
  uploaded: "Polje :attribute nije uspešno učitano.",
  url: "Polje :attribute nije ispravnog formata."
};


/***/ }),
/* 27 */
/***/ ((module) => {

module.exports = {
  accepted: "A(z) :attribute el kell legyen fogadva!",
  active_url: "A(z) :attribute nem érvényes url!",
  after: "A(z) :attribute :date utáni dátum kell, hogy legyen!",
  after_or_equal: "A(z) :attribute nem lehet korábbi dátum, mint :date!",
  alpha: "A(z) :attribute kizárólag betűket tartalmazhat!",
  alpha_dash: "A(z) :attribute kizárólag betűket, számokat és kötőjeleket tartalmazhat!",
  alpha_num: "A(z) :attribute kizárólag betűket és számokat tartalmazhat!",
  attributes: {},
  array: "A(z) :attribute egy tömb kell, hogy legyen!",
  before: "A(z) :attribute :date előtti dátum kell, hogy legyen!",
  before_or_equal: "A(z) :attribute nem lehet későbbi dátum, mint :date!",
  between: {
    numeric: "A(z) :attribute :min és :max közötti szám kell, hogy legyen!",
    file: "A(z) :attribute mérete :min és :max kilobájt között kell, hogy legyen!",
    string: "A(z) :attribute hossza :min és :max karakter között kell, hogy legyen!",
    array: "A(z) :attribute :min - :max közötti elemet kell, hogy tartalmazzon!"
  },
  boolean: "A(z) :attribute mező csak true vagy false értéket kaphat!",
  confirmed: "A(z) :attribute nem egyezik a megerősítéssel.",
  date: "A(z) :attribute nem érvényes dátum.",
  date_format: "A(z) :attribute nem egyezik az alábbi dátum formátummal :format!",
  different: "A(z) :attribute és :other értékei különbözőek kell, hogy legyenek!",
  digits: "A(z) :attribute :digits számjegyű kell, hogy legyen!",
  digits_between: "A(z) :attribute értéke :min és :max közötti számjegy lehet!",
  dimensions: "A(z) :attribute felbontása nem megfelelő.",
  distinct: "A(z) :attribute értékének egyedinek kell lennie!",
  email: "A(z) :attribute nem érvényes email formátum.",
  exists: "A(z) :attribute már létezik.",
  file: "A(z) :attribute fájl kell, hogy legyen!",
  filled: "A(z) :attribute megadása kötelező!",
  gt: {
    numeric: "A(z) :attribute nagyobb kell, hogy legyen, mint :value!",
    file: "A(z) :attribute mérete nagyobb kell, hogy legyen, mint :value kilobájt.",
    string: "A(z) :attribute hosszabb kell, hogy legyen, mint :value karakter.",
    array: "A(z) :attribute több, mint :value elemet kell, hogy tartalmazzon."
  },
  gte: {
    numeric: "A(z) :attribute nagyobb vagy egyenlő kell, hogy legyen, mint :value!",
    file: "A(z) :attribute mérete nem lehet kevesebb, mint :value kilobájt.",
    string: "A(z) :attribute hossza nem lehet kevesebb, mint :value karakter.",
    array: "A(z) :attribute legalább :value elemet kell, hogy tartalmazzon."
  },
  hex: "The :attribute field should have hexadecimal format",
  image: "A(z) :attribute képfájl kell, hogy legyen!",
  in: "A kiválasztott :attribute érvénytelen.",
  in_array: "A(z) :attribute értéke nem található a(z) :other értékek között.",
  integer: "A(z) :attribute értéke szám kell, hogy legyen!",
  ip: "A(z) :attribute érvényes IP cím kell, hogy legyen!",
  ipv4: "A(z) :attribute érvényes IPv4 cím kell, hogy legyen!",
  ipv6: "A(z) :attribute érvényes IPv6 cím kell, hogy legyen!",
  json: "A(z) :attribute érvényes JSON szöveg kell, hogy legyen!",
  lt: {
    numeric: "A(z) :attribute kisebb kell, hogy legyen, mint :value!",
    file: "A(z) :attribute mérete kisebb kell, hogy legyen, mint :value kilobájt.",
    string: "A(z) :attribute rövidebb kell, hogy legyen, mint :value karakter.",
    array: "A(z) :attribute kevesebb, mint :value elemet kell, hogy tartalmazzon."
  },
  lte: {
    numeric: "A(z) :attribute kisebb vagy egyenlő kell, hogy legyen, mint :value!",
    file: "A(z) :attribute mérete nem lehet több, mint :value kilobájt.",
    string: "A(z) :attribute hossza nem lehet több, mint :value karakter.",
    array: "A(z) :attribute legfeljebb :value elemet kell, hogy tartalmazzon."
  },
  max: {
    numeric: "A(z) :attribute értéke nem lehet nagyobb, mint :max!",
    file: "A(z) :attribute mérete nem lehet több, mint :max kilobájt.",
    string: "A(z) :attribute hossza nem lehet több, mint :max karakter.",
    array: "A(z) :attribute legfeljebb :max elemet kell, hogy tartalmazzon."
  },
  mimes: "A(z) :attribute kizárólag az alábbi fájlformátumok egyike lehet: :values.",
  mimetypes: "A(z) :attribute kizárólag az alábbi fájlformátumok egyike lehet: :values.",
  min: {
    numeric: "A(z) :attribute értéke nem lehet kisebb, mint :min!",
    file: "A(z) :attribute mérete nem lehet kevesebb, mint :min kilobájt.",
    string: "A(z) :attribute hossza nem lehet kevesebb, mint :min karakter.",
    array: "A(z) :attribute legalább :min elemet kell, hogy tartalmazzon."
  },
  not_in: "A(z) :attribute értéke érvénytelen.",
  not_regex: "A(z) :attribute formátuma érvénytelen.",
  numeric: "A(z) :attribute szám kell, hogy legyen!",
  present: "A(z) :attribute mező nem található!",
  regex: "A(z) :attribute formátuma érvénytelen.",
  required: "A(z) :attribute megadása kötelező!",
  required_if: "A(z) :attribute megadása kötelező, ha a(z) :other értéke :value!",
  required_unless: "A(z) :attribute megadása kötelező, ha a(z) :other értéke nem :values!",
  required_with: "A(z) :attribute megadása kötelező, ha a(z) :values érték létezik.",
  required_with_all: "A(z) :attribute megadása kötelező, ha a(z) :values értékek léteznek.",
  required_without: "A(z) :attribute megadása kötelező, ha a(z) :values érték nem létezik.",
  required_without_all: "A(z) :attribute megadása kötelező, ha egyik :values érték sem létezik.",
  same: "A(z) :attribute és :other mezőknek egyezniük kell!",
  size: {
    numeric: "A(z) :attribute értéke :size kell, hogy legyen!",
    file: "A(z) :attribute mérete :size kilobájt kell, hogy legyen!",
    string: "A(z) :attribute hossza :size karakter kell, hogy legyen!",
    array: "A(z) :attribute :size elemet kell tartalmazzon!"
  },
  string: "A(z) :attribute szöveg kell, hogy legyen.",
  timezone: "A(z) :attribute nem létező időzona.",
  unique: "A(z) :attribute már foglalt.",
  uploaded: "A(z) :attribute feltöltése sikertelen.",
  url: "A(z) :attribute érvénytelen link."
};


/***/ }),
/* 28 */
/***/ ((module) => {

module.exports = {
  accepted: ':attribute harus disetujui.',
  after: ':attribute harus setelah :after.',
  after_or_equal: ':attribute harus sama dengan atau setelah :after_or_equal.',
  alpha: ':attribute hanya boleh berisi huruf.',
  alpha_dash: ':attribute hanya boleh berisi huruf, - atau _.',
  alpha_num: ':attribute hanya boleh berisi huruf dan angka.',
  before: ':attribute harus sebelum :before.',
  before_or_equal: ':attribute harus sama dengan atau sebelum :before_or_equal.',
  between: ':attribute harus berisi antara :min dan :max.',
  confirmed: ':attribute konfirmasi tidak sama.',
  email: ':attribute harus berupa email.',
  date: ':attribute format tanggal tidak benar.',
  def: ':attribute attribute has errors.',
  digits: ':attribute harus :digits digit.',
  digits_between: 'Isian :attribute harus antara angka :min dan :max.',
  different: ':attribute dan :different harus berbeda.',
  in: ':attribute tidak benar.',
  integer: ':attribute harus berupa angka.',
  hex: ':attribute harus berformat heksadesimal',
  min: {
    numeric: ':attribute minimal :min.',
    string: ':attribute minimal :min karakter.'
  },
  max: {
    numeric: ':attribute harus lebih kecil :max.',
    string: ':attribute maksimal :max karakter.'
  },
  not_in: ':attribute tidak benar.',
  numeric: ':attribute harus berupa angka.',
  present: ':attribute harus ada (tapi boleh kosong).',
  required: ':attribute tidak boleh kosong.',
  required_if: ':attribute harus di isi jika :other berisi :value.',
  required_unless: ':attribute harus di isi jika :other tidak berisi :value.',
  required_with: ':attribute harus di isi jika :field tidak kosong.',
  required_with_all: ':attribute harus di isi jika :fields tidak kosong.',
  required_without: ':attribute harus di isi jika :field kosong.',
  required_without_all: ':attribute harus di isi jika :fields kosong.',
  same: ':attribute dan :same harus sama.',
  size: {
    numeric: ':attribute harus berisi :size.',
    string: ':attribute harus berisi :size karakter.'
  },
  string: ':attribute harus berupa string.',
  url: ':attribute harus berupa format url.',
  regex: ':attribute format tidak benar.',
  attributes: {}
};


/***/ }),
/* 29 */
/***/ ((module) => {

module.exports = {
  accepted: 'Il campo :attribute deve essere accettato.',
  alpha: 'Il campo :attribute deve contenere sono caratteri alfabetici.',
  alpha_dash: 'Il campo :attribute può contenere solo caratteri alfanumerici oltre a trattini e trattini bassi.',
  alpha_num: 'Il campo :attribute deve essere alfanumerico.',
  between: 'Il campo :attribute deve essere compreso tra :min e :max.',
  confirmed: 'Il campo conferma :attribute non è uguale.',
  email: 'Il formato dell\'attributo :attribute non è valido.',
  def: 'Gli attributi del campo :attribute contengono degli errori.',
  digits: 'Il campo :attribute deve essere di :digits cifre.',
  digits_between: 'Il campo :attribute deve essere tra :min e :max cifre.',
  different: 'Il campo :attribute e :different devo essere diversi.',
  in: 'Il valore del campo :attribute non è valido.',
  integer: 'Il campo :attribute deve essere un valore intero.',
  hex: 'Il campo :attribute deve essere in formato esadecimale',
  min: {
    numeric: 'Il campo :attribute deve essere maggiore o uguale di :min.',
    string: 'Il campo :attribute deve essere composto da almeno :min caratteri.'
  },
  max: {
    numeric: 'Il campo :attribute deve essere minore o uguale di :max.',
    string: 'Il campo :attribute deve essere composto da massimo :max caratteri.'
  },
  not_in: 'Il campo :attribute non è valido.',
  numeric: 'Il campo :attribute deve essere un numero.',
  present: 'Il campo :attribute deve essere presente (ma può essere vuoto).',
  required: 'Il campo :attribute è richiesto.',
  required_if: 'Il campo :attribute è richiesto quando il campo :other è uguale a :value.',
  same: 'I campi :attribute e :same devono essere uguali.',
  size: {
    numeric: 'La dimensione del campo :attribute deve essere uguale a :size.',
    string: 'Il campo :attribute deve essere di :size caratteri.'
  },
  string: 'Il campo :attribute deve essere una stringa.',
  url: 'Il formato del campo :attribute non è valido.',
  regex: 'Il formato del campo :attribute non è valido.',
  attributes: {}
};


/***/ }),
/* 30 */
/***/ ((module) => {

module.exports = {
  accepted: ':attributeを確認してください。',
  after: ':attributeは:afterより後の日付を入力してください。',
  after_or_equal: ':attributeは:after_or_equal以降の日付を入力してください。',
  alpha: ':attributeは英字のみで入力してください。',
  alpha_dash: ':attributeは英字とダッシュと下線のみで入力してください。',
  alpha_num: ':attributeは英数字のみで入力してください。',
  before: ':attributeは:beforeより前の日付を入力してください。',
  before_or_equal: ':attributeは:before_or_equal以前の日付を入力してください。',
  between: {
    numeric: ':attributeは:min〜:maxの間で指定してください',
    string: ':attributeは:min〜:max文字を入力してください'
  },
  confirmed: ':attributeは確認が一致しません。',
  email: ':attributeは正しいメールアドレスを入力してください。',
  date: ':attributeは正しい日付形式を入力してください',
  def: ':attributeは検証エラーが含まれています。',
  digits: ':attributeは:digitsの数字のみで入力してください。',
  digits_between: ':attributeは、:min桁から:max桁にしてください。',
  different: ':attributeと:differentは同じであってはなりません。',
  in: '選択された:attributeは無効です。',
  integer: ':attributeは整数で入力してください。',
  hex: ':attributeは16進数で入力してください。',
  min: {
    numeric: ':attributeは:min以上で入力してください。',
    string: ':attributeは:min文字以上で入力してください。'
  },
  max: {
    numeric: ':attributeは:max以下で入力してください。',
    string: ':attributeは:max文字以下で入力してください。'
  },
  not_in: '選択された:attributeは無効です。',
  numeric: ':attributeは数値で入力してください。',
  present: ':attributeを入力してください（空欄も可能です）。',
  required: ':attributeは必須です。',
  required_if: ':otherは:valueになったら:attributeは必須です。',
  required_unless: ':otherが:valueでなければ:attributeは必須です。',
  required_with: ':fieldが空欄でなければ:attributeは必須です。',
  required_with_all: ':fieldsが空欄でなければ:attributeは必須です。',
  required_without: ':fieldが空欄なら:attributeは必須です。',
  required_without_all: ':fieldsが空欄なら:attributeは必須です。',
  same: ':attributeと:sameは同じでなければなりません。',
  size: {
    numeric: ':attributeは:sizeを入力してください。',
    string: ':attributeは:size文字で入力してください。'
  },
  string: ':attributeは文字のみで入力してください。',
  url: ':attributeは正しいURIを入力してください。',
  regex: ':attributeの値はパターンにマッチする必要があります。',
  attributes: {}
};


/***/ }),
/* 31 */
/***/ ((module) => {

module.exports = {
  accepted: ":attribute უნდა იყოს მონიშნული.",
  active_url: ":attribute უნდა იყოს URL მისამართი.",
  after: ":attribute უნდა იყოს :date-ის შემდეგ.",
  after_or_equal: ":attribute უნდა იყოს :date-ის შემდეგ ან მისი ტოლი.",
  alpha: ":attribute უნდა შეიცავდეს მხოლოდ ასოებს.",
  alpha_dash: ":attribute უნდა შეიცავდეს მხოლოდ ასოებს, რიცხვებს და ტირეებს.",
  alpha_num: ":attribute უნდა შეიცავდეს მხოლოდ ასოებს და რიცხვებს.",
  attributes: {},
  array: ":attribute უნდა იყოს მასივი.",
  before: ":attribute უნდა იყოს :date-მდე.",
  before_or_equal: ":attribute უნდა იყოს :date-მდე ან მისი ტოლი.",
  between: {
    numeric: ":attribute უნდა იყოს :min-სა და :max-ს შორის.",
    file: ":attribute უნდა იყოს :min-სა და :max კილობაიტს შორის.",
    string: ":attribute უნდა იყოს :min-სა და :max სიმბოლოს შორის.",
    array: ":attribute-ის რაოდენობა უნდა იყოს :min-დან :max-მდე."
  },
  boolean: ":attribute უნდა იყოს true, false, 0 ან 1.",
  confirmed: ":attribute არ ემთხვევა დადასტურებას.",
  date: ":attribute შეიცავს თარიღის არასწორ ფორმატს.",
  date_format: ":attribute არ ემთხვევა თარიღის ფორმატს: :format.",
  different: ":attribute და :other არ უნდა ემთხვეოდეს ერთმანეთს.",
  digits: ":attribute უნდა შედგებოდეს :digits ციფრისგან.",
  digits_between: ":attribute უნდა შედგებოდეს :min-დან :max ციფრამბდე.",
  dimensions: ":attribute შეიცავს სურათის არასწორ ზომებს.",
  distinct: ":attribute უნდა იყოს უნიკალური.",
  email: ":attribute უნდა იყოს სწორი ელ.ფოსტა.",
  exists: "ასეთი :attribute არ არსებობს.",
  file: ":attribute უნდა იყოს ფაილი.",
  filled: ":attribute აუცილებელია.",
  gt: {
    numeric: ":attribute უნდა იყოს :value-ზე მეტი.",
    file: ":attribute უნდა იყოს :value კილობაიტზე მეტი.",
    string: ":attribute უნდა შეიცავდეს :value სიმბოლოზე მეტს.",
    array: ":attribute უნდა შეიცავლდეს :value ელემენტზე მეტს."
  },
  gte: {
    numeric: ":attribute უნდა იყოს მინიმუმ :value.",
    file: ":attribute უნდა იყოს მინიმუმ :value კილობაიტი.",
    string: ":attribute უნდა შეიცავდეს მინიმუმ :value სიმბოლოს.",
    array: ":attribute უნდა შეიცავდეს მინიმუმ :value ელემენტს."
  },
  hex: "The :attribute field should have hexadecimal format",
  image: ":attribute უნდა იყოს სურათი.",
  in: "მითითებული :attribute არასწორია.",
  in_array: ":attribute უნდა არსებობდეს :other-ში.",
  integer: ":attribute უნდა იყოს მთელი რიცხვი.",
  ip: ":attribute უნდა იყოს IP მისამართი.",
  ipv4: ":attribute უნდა იყოს IPv4 მისამართი.",
  ipv6: ":attribute უნდა იყოს IPv6 მისამართი.",
  json: ":attribute უნდა იყოს JSON ტიპის.",
  lt: {
    numeric: ":attribute უნდა იყოს :value-ზე ნაკლები.",
    file: ":attribute უნდა იყოს :value კილობაიტზე ნაკლები.",
    string: ":attribute უნდა შეიცავდეს :value სიმბოლოზე ნაკლებს.",
    array: ":attribute უნდა შეიცავლდეს :value ელემენტზე ნაკლებს."
  },
  lte: {
    numeric: ":attribute უნდა იყოს მაქსიმუმ :value.",
    file: ":attribute უნდა იყოს მაქსიმუმ :value კილობაიტი.",
    string: ":attribute უნდა შეიცავდეს მაქსიმუმ :value სიმბოლოს.",
    array: ":attribute უნდა შეიცავდეს მაქსიმუმ :value ელემენტს."
  },
  max: {
    numeric: ":attribute არ უნდა აღემატებოდეს :max-ს.",
    file: ":attribute არ უნდა აღემატებოდეს :max კილობაიტს.",
    string: ":attribute არ უნდა აღემატებოდეს :max სიმბოლოს.",
    array: ":attribute-ის რაოდენობა არ უნდა აღემატებოდეს :max-ს."
  },
  mimes: ":attribute უნდა იყოს შემდეგი ტიპის: :values.",
  mimetypes: ":attribute უნდა იყოს შემდეგი ტიპის: :values.",
  min: {
    numeric: ":attribute უნდა იყოს მინიმუმ :min.",
    file: ":attribute უნდა იყოს მინიმუმ :min კილობაიტი.",
    string: ":attribute უნდა შეიცავდეს მინიმუმ :min სიმბოლოს.",
    array: ":attribute უნდა იყოს მინიმუმ :min."
  },
  not_in: "მითითებული :attribute არასწორია.",
  not_regex: ":attribute არასწორ ფორმატშია.",
  numeric: ":attribute უნდა იყოს რიცხვი.",
  present: ":attribute უნდა არსებობდეს, თუნდაც ცარიელი.",
  regex: ":attribute არ ემთხვევა ფორმატს.",
  required: ":attribute აუცილებელია.",
  required_if: ":attribute აუცილებელია, თუ :other-ის მნიშვნელობა ემთხვევა :value-ს.",
  required_unless: ":attribute აუცილებელია, თუ :values არ შეიცავს :other-ს.",
  required_with: ":attribute აუცილებელია, თუ :values მითითებულია.",
  required_with_all: ":attribute აუცილებელია, თუ :values მითითებულია.",
  required_without: ":attribute აუცილებელია, თუ :values არ არის მითითებული.",
  required_without_all: ":attribute აუცილებელია, თუ :values არ არის მითითებული.",
  same: ":attribute და :other უნდა ემთხვეოდეს ერთმანეთს.",
  size: {
    numeric: ":attribute უნდა იყოს :size-ის ტოლი.",
    file: ":attribute უნდა იყოს :size კილობაიტი.",
    string: ":attribute უნდა შედგებოდეს :size სიმბოლოსგან.",
    array: ":attribute უნდა შეიცავდეს :size ელემენტს."
  },
  string: ":attribute უნდა იყოს ტექსტი.",
  timezone: ":attribute უნდა იყოს სასაათო სარტყელი.",
  unique: "ასეთი :attribute უკვე არსებობს.",
  uploaded: ":attribute-ის ატვირთვა ვერ მოხერხდა.",
  url: ":attribute უნდა იყოს URL მისამართი."
};


/***/ }),
/* 32 */
/***/ ((module) => {

module.exports = {
  accepted: ":attribute을(를) 동의해야 합니다.",
  active_url: ":attribute은(는) 유효한 URL이 아닙니다.",
  after: ":attribute은(는) :date 이후 날짜여야 합니다.",
  after_or_equal: ":attribute은(는) :date 이후 날짜이거나 같은 날짜여야 합니다.",
  alpha: ":attribute은(는) 문자만 포함할 수 있습니다.",
  alpha_dash: ":attribute은(는) 문자, 숫자, 대쉬(-)만 포함할 수 있습니다.",
  alpha_num: ":attribute은(는) 문자와 숫자만 포함할 수 있습니다.",
  attributes: {},
  array: ":attribute은(는) 배열이어야 합니다.",
  before: ":attribute은(는) :date 이전 날짜여야 합니다.",
  before_or_equal: ":attribute은(는) :date 이전 날짜이거나 같은 날짜여야 합니다.",
  between: {
    numeric: ":attribute은(는) :min에서 :max 사이여야 합니다.",
    file: ":attribute은(는) :min에서 :max 킬로바이트 사이여야 합니다.",
    string: ":attribute은(는) :min에서 :max 문자 사이여야 합니다.",
    array: ":attribute은(는) :min에서 :max 개의 항목이 있어야 합니다."
  },
  boolean: ":attribute은(는) true 또는 false 이어야 합니다.",
  confirmed: ":attribute 확인 항목이 일치하지 않습니다.",
  date: ":attribute은(는) 유효한 날짜가 아닙니다.",
  date_format: ":attribute이(가) :format 형식과 일치하지 않습니다.",
  different: ":attribute와(과) :other은(는) 서로 달라야 합니다.",
  digits: ":attribute은(는) :digits 자리 숫자여야 합니다.",
  digits_between: ":attribute)은(는) :min에서 :max 자리 사이여야 합니다.",
  dimensions: ":attribute은(는) 유효하지 않는 이미지 크기입니다.",
  distinct: ":attribute 필드에 중복된 값이 있습니다.",
  email: ":attribute은(는) 유효한 이메일 주소여야 합니다.",
  exists: "선택된 :attribute은(는) 유효하지 않습니다.",
  file: ":attribute은(는) 파일이어야 합니다.",
  filled: ":attribute 필드는 값이 있어야 합니다.",
  gt: {
    numeric: ":attribute의 값은 :value보다 커야 합니다.",
    file: ":attribute의 용량은 :value킬로바이트보다 커야 합니다.",
    string: ":attribute의 길이는 :value보다 길어야 합니다.",
    array: ":attribute의 항목수는 :value개 보다 많아야 합니다."
  },
  gte: {
    numeric: ":attribute의 값은 :value보다 같거나 커야 합니다.",
    file: ":attribute의 용량은 :value킬로바이트보다 같거나 커야 합니다.",
    string: ":attribute의 길이는 :value보다 같거나 길어야 합니다.",
    array: ":attribute의 항목수는 :value개 보다 같거나 많아야 합니다."
  },
  hex: "The :attribute field should have hexadecimal format",
  image: ":attribute은(는) 이미지여야 합니다.",
  in: "선택된 :attribute은(는) 유효하지 않습니다.",
  in_array: ":attribute 필드는 :other에 존재하지 않습니다.",
  integer: ":attribute은(는) 정수여야 합니다.",
  ip: ":attribute은(는) 유효한 IP 주소여야 합니다.",
  ipv4: ":attribute은(는) 유효한 IPv4 주소여야 합니다.",
  ipv6: ":attribute은(는) 유효한 IPv6 주소여야 합니다.",
  json: ":attribute은(는) JSON 문자열이어야 합니다.",
  lt: {
    numeric: ":attribute의 값은 :value보다 작아야 합니다.",
    file: ":attribute의 용량은 :value킬로바이트보다 작아야 합니다.",
    string: ":attribute의 길이는 :value보다 짧아야 합니다.",
    array: ":attribute의 항목수는 :value개 보다 작아야 합니다."
  },
  lte: {
    numeric: ":attribute의 값은 :value보다 같거나 작아야 합니다.",
    file: ":attribute의 용량은 :value킬로바이트보다 같거나 작아야 합니다.",
    string: ":attribute의 길이는 :value보다 같거나 짧아야 합니다.",
    array: ":attribute의 항목수는 :value개 보다 같거나 작아야 합니다."
  },
  max: {
    numeric: ":attribute은(는) :max보다 클 수 없습니다.",
    file: ":attribute은(는) :max킬로바이트보다 클 수 없습니다.",
    string: ":attribute은(는) :max자보다 클 수 없습니다.",
    array: ":attribute은(는) :max개보다 많을 수 없습니다."
  },
  mimes: ":attribute은(는) 다음의 파일 형식이어야 합니다: :values.",
  mimetypes: ":attribute은(는) 다음의 파일 형식이어야 합니다: :values.",
  min: {
    numeric: ":attribute은(는) 최소한 :min이어야 합니다.",
    file: ":attribute은(는) 최소한 :min킬로바이트이어야 합니다.",
    string: ":attribute은(는) 최소한 :min자이어야 합니다.",
    array: ":attribute은(는) 최소한 :min개의 항목이 있어야 합니다."
  },
  not_in: "선택된 :attribute이(가) 유효하지 않습니다.",
  not_regex: ":attribute의 형식이 올바르지 않습니다.",
  numeric: ":attribute은(는) 숫자여야 합니다.",
  present: ":attribute 필드가 있어야 합니다.",
  regex: ":attribute 형식이 유효하지 않습니다.",
  required: ":attribute 필드는 필수입니다.",
  required_if: ":other이(가) :value 일 때 :attribute 필드는 필수입니다.",
  required_unless: ":other이(가) :value에 없다면 :attribute 필드는 필수입니다.",
  required_with: ":values이(가) 있는 경우 :attribute 필드는 필수입니다.",
  required_with_all: ":values이(가) 모두 있는 경우 :attribute 필드는 필수입니다.",
  required_without: ":values이(가) 없는 경우 :attribute 필드는 필수입니다.",
  required_without_all: ":values이(가) 모두 없는 경우 :attribute 필드는 필수입니다.",
  same: ":attribute와(과) :other은(는) 일치해야 합니다.",
  size: {
    numeric: ":attribute은(는) :size (이)여야 합니다.",
    file: ":attribute은(는) :size킬로바이트여야 합니다.",
    string: ":attribute은(는) :size자여야 합니다.",
    array: ":attribute은(는) :size개의 항목을 포함해야 합니다."
  },
  string: ":attribute은(는) 문자열이어야 합니다.",
  timezone: ":attribute은(는) 올바른 시간대 이어야 합니다.",
  unique: ":attribute은(는) 이미 사용 중입니다.",
  uploaded: ":attribute을(를) 업로드하지 못했습니다.",
  url: ":attribute 형식은 유효하지 않습니다."
};


/***/ }),
/* 33 */
/***/ ((module) => {

module.exports = {
  accepted: "Laukas :attribute turi būti priimtas.",
  active_url: "Laukas :attribute nėra galiojantis internetinis adresas.",
  after: "Lauko :attribute reikšmė turi būti po :date datos.",
  after_or_equal: "The :attribute must be a date after or equal to :date.",
  alpha: "Laukas :attribute gali turėti tik raides.",
  alpha_dash: "Laukas :attribute gali turėti tik raides, skaičius ir brūkšnelius.",
  alpha_num: "Laukas :attribute gali turėti tik raides ir skaičius.",
  attributes: {},
  array: "Laukas :attribute turi būti masyvas.",
  before: "Laukas :attribute turi būti data prieš :date.",
  before_or_equal: "The :attribute must be a date before or equal to :date.",
  between: {
    numeric: "Lauko :attribute reikšmė turi būti tarp :min ir :max.",
    file: "Failo dydis lauke :attribute turi būti tarp :min ir :max kilobaitų.",
    string: "Simbolių skaičius lauke :attribute turi būti tarp :min ir :max.",
    array: "Elementų skaičius lauke :attribute turi turėti nuo :min iki :max."
  },
  boolean: "Lauko reikšmė :attribute turi būti 'taip' arba 'ne'.",
  confirmed: "Lauko :attribute patvirtinimas nesutampa.",
  date: "Lauko :attribute reikšmė nėra galiojanti data.",
  date_format: "Lauko :attribute reikšmė neatitinka formato :format.",
  different: "Laukų :attribute ir :other reikšmės turi skirtis.",
  digits: "Laukas :attribute turi būti sudarytas iš :digits skaitmenų.",
  digits_between: "Laukas :attribute tuti turėti nuo :min iki :max skaitmenų.",
  dimensions: "Lauke :attribute įkeltas paveiksliukas neatitinka išmatavimų reikalavimo.",
  distinct: "Laukas :attribute pasikartoja.",
  email: "Lauko :attribute reikšmė turi būti galiojantis el. pašto adresas.",
  file: "The :attribute must be a file.",
  filled: "Laukas :attribute turi būti užpildytas.",
  exists: "Pasirinkta negaliojanti :attribute reikšmė.",
  gt: {
    numeric: "The :attribute must be greater than :value.",
    file: "The :attribute must be greater than :value kilobytes.",
    string: "The :attribute must be greater than :value characters.",
    array: "The :attribute must have more than :value items."
  },
  gte: {
    numeric: "The :attribute must be greater than or equal :value.",
    file: "The :attribute must be greater than or equal :value kilobytes.",
    string: "The :attribute must be greater than or equal :value characters.",
    array: "The :attribute must have :value items or more."
  },
  hex: "The :attribute field should have hexadecimal format",
  image: "Lauko :attribute reikšmė turi būti paveikslėlis.",
  in: "Pasirinkta negaliojanti :attribute reikšmė.",
  in_array: "Laukas :attribute neegzistuoja :other lauke.",
  integer: "Lauko :attribute reikšmė turi būti sveikasis skaičius.",
  ip: "Lauko :attribute reikšmė turi būti galiojantis IP adresas.",
  ipv4: "The :attribute must be a valid IPv4 address.",
  ipv6: "The :attribute must be a valid IPv6 address.",
  json: "Lauko :attribute reikšmė turi būti JSON tekstas.",
  lt: {
    numeric: "The :attribute must be less than :value.",
    file: "The :attribute must be less than :value kilobytes.",
    string: "The :attribute must be less than :value characters.",
    array: "The :attribute must have less than :value items."
  },
  lte: {
    numeric: "The :attribute must be less than or equal :value.",
    file: "The :attribute must be less than or equal :value kilobytes.",
    string: "The :attribute must be less than or equal :value characters.",
    array: "The :attribute must not have more than :value items."
  },
  max: {
    numeric: "Lauko :attribute reikšmė negali būti didesnė nei :max.",
    file: "Failo dydis lauke :attribute reikšmė negali būti didesnė nei :max kilobaitų.",
    string: "Simbolių kiekis lauke :attribute reikšmė negali būti didesnė nei :max simbolių.",
    array: "Elementų kiekis lauke :attribute negali turėti daugiau nei :max elementų."
  },
  mimes: "Lauko reikšmė :attribute turi būti failas vieno iš sekančių tipų: :values.",
  mimetypes: "Lauko reikšmė :attribute turi būti failas vieno iš sekančių tipų: :values.",
  min: {
    numeric: "Lauko :attribute reikšmė turi būti ne mažesnė nei :min.",
    file: "Failo dydis lauke :attribute turi būti ne mažesnis nei :min kilobaitų.",
    string: "Simbolių kiekis lauke :attribute turi būti ne mažiau nei :min.",
    array: "Elementų kiekis lauke :attribute turi būti ne mažiau nei :min."
  },
  not_in: "Pasirinkta negaliojanti reikšmė :attribute.",
  not_regex: "The :attribute format is invalid.",
  numeric: "Lauko :attribute reikšmė turi būti skaičius.",
  present: "Laukas :attribute turi egzistuoti.",
  regex: "Negaliojantis lauko :attribute formatas.",
  required: "Privaloma užpildyti lauką :attribute.",
  required_if: "Privaloma užpildyti lauką :attribute kai :other yra :value.",
  required_unless: "Laukas :attribute yra privalomas, nebent :other yra tarp :values reikšmių.",
  required_with: "Privaloma užpildyti lauką :attribute kai pateikta :values.",
  required_with_all: "Privaloma užpildyti lauką :attribute kai pateikta :values.",
  required_without: "Privaloma užpildyti lauką :attribute kai nepateikta :values.",
  required_without_all: "Privaloma užpildyti lauką :attribute kai nepateikta nei viena iš reikšmių :values.",
  same: "Laukai :attribute ir :other turi sutapti.",
  size: {
    numeric: "Lauko :attribute reikšmė turi būti :size.",
    file: "Failo dydis lauke :attribute turi būti :size kilobaitai.",
    string: "Simbolių skaičius lauke :attribute turi būti :size.",
    array: "Elementų kiekis lauke :attribute turi būti :size."
  },
  string: "Laukas :attribute turi būti tekstinis.",
  timezone: "Lauko :attribute reikšmė turi būti galiojanti laiko zona.",
  unique: "Tokia :attribute reikšmė jau pasirinkta.",
  uploaded: "The :attribute failed to upload.",
  url: "Negaliojantis lauko :attribute formatas."
};


/***/ }),
/* 34 */
/***/ ((module) => {

module.exports = {
  accepted: " :attribute ir jābūt pieņemtam.",
  active_url: " :attribute ir ar nederīgu linku.",
  after: " :attribute ir jābūt ar datumu pēc :datums.",
  after_or_equal: " :attribute ir jābūt ar datumu pēc vai vienādu ar :datums.",
  alpha: " :attribute var saturēt tikai burtus.",
  alpha_dash: " :attribute var saturēt tikai burtus, nummurus un atstarpes.",
  alpha_num: " :attribute var tikai saturēt burtus un nummurus.",
  attributes: {},
  array: " :attribute ir jābūt sakārtotam.",
  before: " :attribute ir jābūt ar datumu pirms :datums.",
  before_or_equal: " :attribute ir jābūt ar datumu pirms vai vienādu ar :datums.",
  between: {
    numeric: " :attribute jābūt starp :min un :max.",
    file: " :attribute jābūt starp :min un :max kilobaiti.",
    string: " :attribute jābūt no :min līdz :max zīmēm.",
    array: " :attribute jābūt no :min līdz :max vienībām."
  },
  boolean: " :attribute laiciņam jābūt atbilstošam vai neatbilstošam.",
  confirmed: " :attribute apstiprinājums neatbilst.",
  date: " :attribute nav derīgs.",
  date_format: " :attribute neatbilst formātam :format.",
  different: " :attribute un :other ir jābūt citiem.",
  digits: " :attribute ir jābūt :digits ciparam.",
  digits_between: " :attribute ir jābūt :min un :max ciparam.",
  dimensions: " :attribute ir nederīgs attēla izmērs.",
  distinct: " :attribute laikam ir dubulta vērtība.",
  email: " :attribute derīgam e-pastam.",
  exists: "Izvēlētais :attribute ir nederīgs.",
  file: " :attribute jābūt failam.",
  filled: ":attribute lauks ir nepieciešams.",
  gt: {
    numeric: "The :attribute must be greater than :value.",
    file: "The :attribute must be greater than :value kilobytes.",
    string: "The :attribute must be greater than :value characters.",
    array: "The :attribute must have more than :value items."
  },
  gte: {
    numeric: "The :attribute must be greater than or equal :value.",
    file: "The :attribute must be greater than or equal :value kilobytes.",
    string: "The :attribute must be greater than or equal :value characters.",
    array: "The :attribute must have :value items or more."
  },
  hex: "The :attribute field should have hexadecimal format",
  image: " :attribute jābūt attēlam.",
  in: "Izvēlētais :attribute ir nederīgs.",
  in_array: " :attribute laiks neeksistē :cits.",
  integer: " :attribute ir jabūt skaitim.",
  ip: " :attribute jābūt derīgai IP adresei.",
  ipv4: "The :attribute must be a valid IPv4 address.",
  ipv6: "The :attribute must be a valid IPv6 address.",
  json: " :attribute jābūt derīgai JSON virknei.",
  lt: {
    numeric: "The :attribute must be less than :value.",
    file: "The :attribute must be less than :value kilobytes.",
    string: "The :attribute must be less than :value characters.",
    array: "The :attribute must have less than :value items."
  },
  lte: {
    numeric: "The :attribute must be less than or equal :value.",
    file: "The :attribute must be less than or equal :value kilobytes.",
    string: "The :attribute must be less than or equal :value characters.",
    array: "The :attribute must not have more than :value items."
  },
  max: {
    numeric: " :attribute nedrīkst pārsniegt :max.",
    file: " :attribute nedrīkst pārsniegt :max kilobaiti.",
    string: " :attribute nedrīkst pārsniegt :max zīmes.",
    array: " :attribute nedrīkst pārsniegt :max vienības."
  },
  mimes: " :attribute jābūt faila tipam: :values",
  mimetypes: " :attribute jābūt faile tipam: :values.",
  min: {
    numeric: " :attribute jābūt vismaz :min.",
    file: " :attribute jābūt vismaz :min kilobaiti.",
    string: " :attribute jābūt vismaz :min zīmes.",
    array: " :attribute jāsatur vismaz :min vienības."
  },
  not_in: " izvēlieties :attribute ir nederīgs.",
  not_regex: "The :attribute format is invalid.",
  numeric: " :attribute jābūt skaitlim.",
  present: " :attribute laikums ir nepieciešams.",
  regex: " :attribute formāts ir nederīgs.",
  required: " :attribute laukums ir nepieciešams.",
  required_if: " :attribute laukums ir nepieciešams, ja vien :other ir :values.",
  required_unless: " :attribute laukums ir nepieciešams, ja vien :other ir :values.",
  required_with: " :attribute laukums ir nepieciešams, kad :values ir pieejama.",
  required_with_all: " :attribute laukums ir nepieciešams, kad :values ir pieejama.",
  required_without: " :attribute laukums ir nepieciešams, kad :values nav pieejama.",
  required_without_all: " :attribute laukums ir nepieciešams, kad neviena no :values nav pieejama.",
  same: " :attribute un :citiem ir jāsakrīt.",
  size: {
    numeric: " :attribute jābūt :size.",
    file: " :attribute jābūt :size kilobaiti.",
    string: " :attribute jābūt :size zīmes.",
    array: " :attribute jāsatur :size vienības."
  },
  string: " :attribute jābūt virknē.",
  timezone: " :attribute jābūt derīgā zonā.",
  unique: " :attribute jau ir aizņemts.",
  uploaded: " :attribute netika augšuplādēts.",
  url: " :attribute formāts ir nederīgs."
};


/***/ }),
/* 35 */
/***/ ((module) => {

module.exports = {
  accepted: "Полето :attribute мора да биде прифатено.",
  active_url: "Полето :attribute не е валиден URL.",
  after: "Полето :attribute мора да биде датум после :date.",
  after_or_equal: "The :attribute must be a date after or equal to :date.",
  alpha: "Полето :attribute може да содржи само букви.",
  alpha_dash: "Полето :attribute може да содржи само букви, цифри, долна црта и тире.",
  alpha_num: "Полето :attribute може да содржи само букви и цифри.",
  attributes: {},
  array: "Полето :attribute мора да биде низа.",
  before: "Полето :attribute мора да биде датум пред :date.",
  before_or_equal: "The :attribute must be a date before or equal to :date.",
  between: {
    numeric: "Полето :attribute мора да биде помеѓу :min и :max.",
    file: "Полето :attribute мора да биде помеѓу :min и :max килобајти.",
    string: "Полето :attribute мора да биде помеѓу :min и :max карактери.",
    array: "Полето :attribute мора да има помеѓу :min - :max карактери."
  },
  boolean: "The :attribute field must be true or false",
  confirmed: "Полето :attribute не е потврдено.",
  date: "Полето :attribute не е валиден датум.",
  date_format: "Полето :attribute не е во формат :format.",
  different: "Полињата :attribute и :other треба да се различни.",
  digits: "Полето :attribute треба да има :digits цифри.",
  digits_between: "Полето :attribute треба да има помеѓу :min и :max цифри.",
  dimensions: "The :attribute has invalid image dimensions.",
  distinct: "The :attribute field has a duplicate value.",
  email: "Полето :attribute не е во валиден формат.",
  exists: "Избранато поле :attribute веќе постои.",
  file: "The :attribute must be a file.",
  filled: "Полето :attribute е задолжително.",
  gt: {
    numeric: "The :attribute must be greater than :value.",
    file: "The :attribute must be greater than :value kilobytes.",
    string: "The :attribute must be greater than :value characters.",
    array: "The :attribute must have more than :value items."
  },
  gte: {
    numeric: "The :attribute must be greater than or equal :value.",
    file: "The :attribute must be greater than or equal :value kilobytes.",
    string: "The :attribute must be greater than or equal :value characters.",
    array: "The :attribute must have :value items or more."
  },
  hex: "The :attribute field should have hexadecimal format",
  image: "Полето :attribute мора да биде слика.",
  in: "Избраното поле :attribute е невалидно.",
  in_array: "The :attribute field does not exist in :other.",
  integer: "Полето :attribute мора да биде цел број.",
  ip: "Полето :attribute мора да биде IP адреса.",
  ipv4: "The :attribute must be a valid IPv4 address.",
  ipv6: "The :attribute must be a valid IPv6 address.",
  json: "The :attribute must be a valid JSON string.",
  lt: {
    numeric: "The :attribute must be less than :value.",
    file: "The :attribute must be less than :value kilobytes.",
    string: "The :attribute must be less than :value characters.",
    array: "The :attribute must have less than :value items."
  },
  lte: {
    numeric: "The :attribute must be less than or equal :value.",
    file: "The :attribute must be less than or equal :value kilobytes.",
    string: "The :attribute must be less than or equal :value characters.",
    array: "The :attribute must not have more than :value items."
  },
  max: {
    numeric: "Полето :attribute мора да биде помало од :max.",
    file: "Полето :attribute мора да биде помало од :max килобајти.",
    string: "Полето :attribute мора да има помалку од :max карактери.",
    array: "Полето :attribute не може да има повеќе од :max карактери."
  },
  mimes: "Полето :attribute мора да биде фајл од типот: :values.",
  mimetypes: "Полето :attribute мора да биде фајл од типот: :values.",
  min: {
    numeric: "Полето :attribute мора да биде минимум :min.",
    file: "Полето :attribute мора да биде минимум :min килобајти.",
    string: "Полето :attribute мора да има минимум :min карактери.",
    array: "Полето :attribute мора да има минимум :min карактери."
  },
  not_in: "Избраното поле :attribute е невалидно.",
  not_regex: "The :attribute format is invalid.",
  numeric: "Полето :attribute мора да биде број.",
  present: "The :attribute field must be present.",
  regex: "Полето :attribute е во невалиден формат.",
  required: "Полето :attribute е задолжително.",
  required_if: "Полето :attribute е задолжително, кога :other е :value.",
  required_unless: "The :attribute field is required unless :other is in :values.",
  required_with: "Полето :attribute е задолжително, кога е внесено :values.",
  required_with_all: "The :attribute field is required when :values is present.",
  required_without: "Полето :attribute е задолжително, кога не е внесено :values.",
  required_without_all: "The :attribute field is required when none of :values are present.",
  same: "Полињата :attribute и :other треба да совпаѓаат.",
  size: {
    numeric: "Полето :attribute мора да биде :size.",
    file: "Полето :attribute мора да биде :size килобајти.",
    string: "Полето :attribute мора да има :size карактери.",
    array: "Полето :attribute мора да има :size карактери."
  },
  string: "The :attribute must be a string.",
  timezone: "The :attribute must be a valid zone.",
  unique: "Полето :attribute веќе постои.",
  uploaded: "The :attribute failed to upload.",
  url: "Полето :attribute не е во валиден формат."
};


/***/ }),
/* 36 */
/***/ ((module) => {

module.exports = {
  accepted: ":Attribute баталсан байх шаардлагатай.",
  active_url: ":Attribute талбарт зөв URL хаяг оруулна уу.",
  after: ":Attribute талбарт :date-с хойш огноо оруулна уу.",
  after_or_equal: ":Attribute талбарт :date эсвэл түүнээс хойш огноо оруулна уу.",
  alpha: ":Attribute талбарт латин үсэг оруулна уу.",
  alpha_dash: ":Attribute талбарт латин үсэг, тоо болон зураас оруулах боломжтой.",
  alpha_num: ":Attribute талбарт латин үсэг болон тоо оруулах боломжтой.",
  attributes: {},
  array: ":Attribute талбар массив байх шаардлагатай.",
  before: ":Attribute талбарт :date-с өмнөх огноо оруулна уу.",
  before_or_equal: ":attribute талбарт :date эсвэл түүнээс өмнөх огноо оруулна уу.",
  between: {
    numeric: ":Attribute талбарт :min-:max хооронд тоо оруулна уу.",
    file: ":Attribute талбарт :min-:max килобайт хэмжээтэй файл оруулна уу.",
    string: ":Attribute талбарт :min-:max урттай текст оруулна уу.",
    array: ":Attribute массивт :min-:max элемэнт байх шаардлагатай."
  },
  boolean: ":Attribute талбарын утга үнэн эсвэл худал байх шаардлагатай.",
  confirmed: ":Attribute талбарын баталагажуулалт тохирохгүй байна.",
  date: ":Attribute талбарт оруулсан огноо буруу байна.",
  date_format: ":Attribute талбарт :format хэлбэртэй огноо оруулна уу.",
  different: ":Attribute талбарт :other -с өөр утга оруулах шаардлагатай.",
  digits: ":Attribute талбарт дараах цифрүүдээс оруулах боломжтой. :digits.",
  digits_between: ":Attribute талбарт :min-:max хоорондох цифр оруулах боломжтой.",
  dimensions: ":Attribute талбарийн зургийн хэмжээс буруу байна.",
  distinct: ":Attribute талбарт ялгаатай утга оруулах шаардлагатай.",
  email: ":Attribute талбарт зөв и-мэйл хаяг оруулах шаардлагатай.",
  exists: "Сонгогдсон :attribute буруу байна.",
  file: ":Attribute талбарт файл оруулах шаардлагатай.",
  filled: ":Attribute талбар шаардлагатай.",
  gt: {
    numeric: "The :attribute must be greater than :value.",
    file: "The :attribute must be greater than :value kilobytes.",
    string: "The :attribute must be greater than :value characters.",
    array: "The :attribute must have more than :value items."
  },
  gte: {
    numeric: "The :attribute must be greater than or equal :value.",
    file: "The :attribute must be greater than or equal :value kilobytes.",
    string: "The :attribute must be greater than or equal :value characters.",
    array: "The :attribute must have :value items or more."
  },
  hex: "The :attribute field should have hexadecimal format",
  image: ":Attribute талбарт зураг оруулна уу.",
  in: "Сонгогдсон :attribute буруу байна.",
  in_array: ":Attribute талбарт оруулсан утга :other -д байхгүй байна.",
  integer: ":Attribute талбарт бүхэл тоо оруулах шаардлагатай.",
  ip: ":Attribute талбарт зөв IP хаяг оруулах шаардлагатай.",
  ipv4: "The :attribute must be a valid IPv4 address.",
  ipv6: "The :attribute must be a valid IPv6 address.",
  json: ":Attribute талбарт зөв JSON тэмдэгт мөр оруулах шаардлагатай.",
  lt: {
    numeric: "The :attribute must be less than :value.",
    file: "The :attribute must be less than :value kilobytes.",
    string: "The :attribute must be less than :value characters.",
    array: "The :attribute must have less than :value items."
  },
  lte: {
    numeric: "The :attribute must be less than or equal :value.",
    file: "The :attribute must be less than or equal :value kilobytes.",
    string: "The :attribute must be less than or equal :value characters.",
    array: "The :attribute must not have more than :value items."
  },
  max: {
    numeric: ":Attribute талбарт :max буюу түүнээс бага утга оруулна уу.",
    file: ":Attribute талбарт :max килобайтаас бага хэмжээтэй файл оруулна уу.",
    string: ":Attribute талбарт :max-с бага урттай текст оруулна уу.",
    array: ":Attribute талбарт хамгийн ихдээ :max элемэнт оруулах боломжтой."
  },
  mimes: ":Attribute талбарт дараах төрлийн файл оруулах боломжтой: :values.",
  mimetypes: ":Attribute талбарт дараах төрлийн файл оруулах боломжтой: :values.",
  min: {
    numeric: ":Attribute талбарт :min буюу түүнээс их тоо оруулна уу.",
    file: ":Attribute талбарт :min килобайтаас их хэмжээтэй файл оруулна уу.",
    string: ":Attribute талбарт :min буюу түүнээс их үсэг бүхий текст оруулна уу.",
    array: ":Attribute талбарт хамгийн багадаа :min элемэнт оруулах боломжтой."
  },
  not_in: "Буруу :attribute сонгогдсон байна.",
  not_regex: "The :attribute format is invalid.",
  numeric: ":Attribute талбарт тоон утга оруулна уу.",
  present: ":Attribute талбар байх шаардлагатай.",
  regex: ":Attribute талбарт оруулсан утга буруу байна.",
  required: ":Attribute талбар шаардлагатай.",
  required_if: "Хэрэв :other :value бол :attribute табларт утга оруулах шаардлагатай.",
  required_unless: ":other :values дотор байхгүй бол :attribute талбарт утга оруулах шаардлагатай.",
  required_with: ":values утгуудийн аль нэг байвал :attribute талбар шаардлагатай.",
  required_with_all: ":values утгууд байвал :attribute талбар шаардлагатай.",
  required_without: "The :attribute field is required when :values is not present.",
  required_without_all: "The :attribute field is required when none of :values are present.",
  same: "The :attribute and :other must match.",
  size: {
    numeric: ":Attribute :size хэмжээтэй байх шаардлагатай.",
    file: ":Attribute :size килобайт хэмжээтэй байх шаардлагатай.",
    string: ":Attribute :size тэмдэгтийн урттай байх шаардлагатай.",
    array: ":Attribute :size элемэнттэй байх шаардлагатай."
  },
  string: ":Attribute талбарт текст оруулна уу.",
  timezone: ":Attribute талбарт зөв цагийн бүс оруулна уу.",
  unique: "Оруулсан :attribute аль хэдий нь бүртгэгдсэн байна.",
  uploaded: ":Attribute талбарт оруулсан файлыг хуулхад алдаа гарлаа.",
  url: ":Attribute зөв url хаяг оруулна уу."
};


/***/ }),
/* 37 */
/***/ ((module) => {

module.exports = {
  accepted: ":attribute mesti diterima pakai.",
  active_url: ":attribute bukan URL yang sah.",
  after: ":attribute mesti tarikh selepas :date.",
  after_or_equal: ":attribute mesti tarikh selepas atau sama dengan :date.",
  alpha: ":attribute hanya boleh mengandungi huruf.",
  alpha_dash: ":attribute boleh mengandungi huruf, nombor, dan sengkang.",
  alpha_num: ":attribute boleh mengandungi huruf dan nombor.",
  attributes: {},
  array: ":attribute mesti jujukan.",
  before: ":attribute mesti tarikh sebelum :date.",
  before_or_equal: ":attribute mesti tarikh sebelum atau sama dengan :date.",
  between: {
    numeric: ":attribute mesti mengandungi antara :min dan :max.",
    file: ":attribute mesti mengandungi antara :min dan :max kilobait.",
    string: ":attribute mesti mengandungi antara :min dan :max aksara.",
    array: ":attribute mesti mengandungi antara :min dan :max perkara."
  },
  boolean: ":attribute mesti benar atau salah.",
  confirmed: ":attribute pengesahan yang tidak sepadan.",
  date: ":attribute bukan tarikh yang sah.",
  date_format: ":attribute tidak mengikut format :format.",
  different: ":attribute dan :other mesti berlainan.",
  dimensions: ":attribute tidak sah",
  digits: ":attribute mesti :digits.",
  digits_between: ":attribute mesti mengandungi antara :min dan :max digits.",
  distinct: ":attribute adalah nilai yang berulang",
  email: ":attribute tidak sah.",
  exists: ":attribute tidak sah.",
  file: ":attribute mesti fail yang sah.",
  filled: ":attribute diperlukan.",
  gt: {
    numeric: ":attribute mesti melebihi :value.",
    file: ":attribute mesti melebihi :value kilobait.",
    string: ":attribute mesti melebihi :value aksara.",
    array: ":attribute mesti mengandungi lebih daripada :value perkara."
  },
  gte: {
    numeric: ":attribute mesti melebihi atau bersamaan :value.",
    file: ":attribute mesti melebihi atau bersamaan :value kilobait.",
    string: ":attribute mesti melebihi atau bersamaan :value aksara.",
    array: ":attribute mesti mengandungi :value perkara atau lebih."
  },
  hex: "The :attribute field should have hexadecimal format",
  image: ":attribute mesti imej.",
  in: ":attribute tidak sah.",
  in_array: ":attribute tidak wujud dalam :other.",
  integer: ":attribute mesti integer.",
  ip: ":attribute mesti alamat IP yang sah.",
  ipv4: ":attribute mesti alamat IPv4 yang sah.",
  ipv6: ":attribute mesti alamat IPv6 yang sah",
  json: ":attribute mesti JSON yang sah.",
  lt: {
    numeric: ":attribute mesti kurang daripada :value.",
    file: ":attribute mesti kurang daripada :value kilobait.",
    string: ":attribute mesti kurang daripada :value aksara.",
    array: ":attribute mesti mengandungi kurang daripada :value perkara."
  },
  lte: {
    numeric: ":attribute mesti kurang daripada atau bersamaan dengan :value.",
    file: ":attribute mesti kurang daripada atau bersamaan dengan :value kilobait.",
    string: ":attribute mesti kurang daripada atau bersamaan dengan :value aksara.",
    array: ":attribute mesti mengandungi kurang daripada atau bersamaan dengan :value perkara."
  },
  max: {
    numeric: "Jumlah :attribute mesti tidak melebihi :max.",
    file: "Jumlah :attribute mesti tidak melebihi :max kilobait.",
    string: "Jumlah :attribute mesti tidak melebihi :max aksara.",
    array: "Jumlah :attribute mesti tidak melebihi :max perkara."
  },
  mimes: ":attribute mesti fail type: :values.",
  mimetypes: ":attribute mesti fail type: :values.",
  min: {
    numeric: "Jumlah :attribute mesti sekurang-kurangnya :min.",
    file: "Jumlah :attribute mesti sekurang-kurangnya :min kilobait.",
    string: "Jumlah :attribute mesti sekurang-kurangnya :min aksara.",
    array: "Jumlah :attribute mesti sekurang-kurangnya :min perkara."
  },
  not_in: ":attribute tidak sah.",
  not_regex: "Format :attribute adalah tidak sah.",
  numeric: ":attribute mesti nombor.",
  present: ":attribute mesti wujud.",
  regex: "Format :attribute tidak sah.",
  required: "Ruangan :attribute diperlukan.",
  required_if: "Ruangan :attribute diperlukan bila :other sama dengan :value.",
  required_unless: "Ruangan :attribute diperlukan sekiranya :other ada dalam :values.",
  required_with: "Ruangan :attribute diperlukan bila :values wujud.",
  required_with_all: "Ruangan :attribute diperlukan bila :values wujud.",
  required_without: "Ruangan :attribute diperlukan bila :values tidak wujud.",
  required_without_all: "Ruangan :attribute diperlukan bila kesemua :values wujud.",
  same: "Ruangan :attribute dan :other mesti sepadan.",
  size: {
    numeric: "Saiz :attribute mesti :size.",
    file: "Saiz :attribute mesti :size kilobait.",
    string: "Saiz :attribute mesti :size aksara.",
    array: "Saiz :attribute mesti mengandungi :size perkara."
  },
  string: ":attribute mesti aksara.",
  timezone: ":attribute mesti zon masa yang sah.",
  unique: ":attribute telah wujud.",
  uploaded: ":attribute gagal dimuat naik.",
  url: ":attribute format tidak sah."
};


/***/ }),
/* 38 */
/***/ ((module) => {

module.exports = {
  accepted: ':attribute må være akseptert.',
  alpha: ':attribute feltet kan kun inneholde alfabetiske tegn.',
  alpha_dash: ':attribute feltet kan kun inneholde alfanumeriske tegn, i tillegg til bindestreker og understreker.',
  alpha_num: ':attribute feltet må være alfanumerisk.',
  between: ':attribute feltet må være mellom :min og :max.',
  confirmed: ':attribute feltet stemmer ikke overens med bekreftelsen.',
  email: ':attribute formatet er ugyldig.',
  date: ':attribute er et ugyldig datoformat.',
  def: ':attribute attributtet har feil.',
  digits: ':attribute må være på :digits siffer.',
  digits_between: ':attribute må være mellom :min og :max siffer.',
  different: ':attribute og :different må være forskjellige.',
  in: 'Den oppgitte verdien for :attribute er ugyldig.',
  integer: ':attribute må være et heltall.',
  hex: 'The :attribute should have hexadecimal format',
  min: {
    numeric: ':attribute må minst være :min.',
    string: ':attribute må være på minst :min tegn.'
  },
  max: {
    numeric: ':attribute kan ikke være større enn :max.',
    string: ':attribute kan maks ha :max tegn.'
  },
  not_in: 'Den oppgitte verdien for :attribute er ugyldig.',
  numeric: ':attribute må være et tall.',
  present: 'The :attribute field must be present (but can be empty).',
  required: ':attribute feltet er påkrevd.',
  required_if: ':attribute er påkrevd når :other er :value.',
  same: ':attribute og :same må være like.',
  size: {
    numeric: ':attribute må ha størrelsen :size.',
    string: ':attribute må ha :size tegn.'
  },
  string: ':attribute må være tekst.',
  url: ':attribute formatet er ugyldig.',
  regex: ':attribute formatet er ugyldig.',
  attributes: {}
};


/***/ }),
/* 39 */
/***/ ((module) => {

module.exports = {
  accepted: 'Het :attribute veld moet geaccepteerd worden.',
  after: ':attribute moet een datum na :after zijn.',
  after_or_equal: 'De :attribute datum moet op of na :after_or_equal zijn.',
  alpha: 'Het :attribute veld mag alleen maar letters bevatten.',
  alpha_dash: 'Het :attribute veld mag alleen maar letters, cijfers en (liggende) streepjes bevatten.',
  alpha_num: 'Het :attribute veld mag alleen maar letters en cijfers bevatten.',
  before: ':attribute moet vòòr :before zijn.',
  before_or_equal: ':attribute moet vòòr of op :before_or_equal zijn.',
  between: 'Het :attribute veld moet tussen :min en :max liggen.',
  confirmed: 'Het :attribute veld komt niet met de bevestiging overeen.',
  email: 'Het :attribute formaat is ongeldig.',
  date: 'Het :attribute veld moet een geldige datum zijn.',
  def: 'Het :attribute veld bevat fouten.',
  digits: 'Het :attribute veld moet :digits cijfers hebben.',
  digits_between: ':attribute moet bestaan uit minimaal :min en maximaal :max cijfers.',
  different: 'Het :attribute en :different veld moeten verschillend zijn.',
  in: 'De gekozen waarde voor :attribute is ongeldig.',
  integer: 'Het :attribute veld moet een geheel getal zijn.',
  hex: 'Het :attribute veld moet hexadecimaal zijn',
  min: {
    numeric: 'Het :attribute veld moet minstens :min zijn.',
    string: 'Het :attribute veld moet minstens :min karakters bevatten.'
  },
  max: {
    numeric: 'Het :attribute veld mag maximaal :max zijn.',
    string: 'Het :attribute veld mag niet meer dan :max karakters bevatten.'
  },
  not_in: 'De gekozen waarde voor :attribute is ongeldig.',
  numeric: 'Het :attribute veld moet een getal zijn.',
  present: 'Het :attribute veld moet aanwezig zijn (maar mag leeg zijn).',
  required: 'Het :attribute veld moet ingevuld zijn.',
  required_if: 'Het :attribute veld moet ingevuld zijn, wanneer :other :value is.',
  required_unless: 'Het :attribute veld moet ingevuld zijn, wanneer :other niet :value is.',
  required_with: 'Het :attribute veld moet ingevuld zijn, wanneer :field niet leeg is.',
  required_with_all: 'Het :attribute veld moet ingevuld zijn, wanneer :fields niet leeg zijn.',
  required_without: 'Het :attribute veld moet ingevuld zijn, wanneer :field leeg is.',
  required_without_all: 'Het :attribute veld moet ingevuld zijn, wanneer :fields leeg zijn.',
  same: 'De :attribute en :same velden moeten overeenkomen.',
  size: {
    numeric: 'Het :attribute veld moet :size zijn.',
    string: 'Het :attribute veld moet :size karakters bevatten.'
  },
  string: 'Het :attribute veld moet een woord of zin zijn.',
  url: 'Het :attribute veld heeft een ongeldig formaat.',
  regex: 'Het :attribute veld heeft een ongeldig formaat.',
  attributes: {}
};


/***/ }),
/* 40 */
/***/ ((module) => {

module.exports = {
  accepted: 'Pole :attribute musi być zaakceptowane.',
  alpha: 'Pole :attribute może zawierać tylko litery.',
  alpha_dash: 'Pole :attribute moze zawierać tylko litery, myślnik i podrkeślenie.',
  alpha_num: 'Pole :attribute moze zawierac tylko znaki alfanumeryczne.',
  between: 'Pole :attribute musi mieć długość od :min do :max.',
  confirmed: 'Pole :attribute nie spełnia warunku potwierdzenia.',
  email: 'Pole :attribute ma niepoprawny format adresu email.',
  date: 'Pole :attribute musi mieć poprawny format daty.',
  def: 'Pole :attribute zawiera błędy.',
  digits: 'Pole :attribute może zawierać tylko cyfry ze zbioru :digits.',
  digits_between: 'Pole :attribute musi mieć od :min do :max cyfr.',
  different: 'Pola :attribute i :different muszą się różnić.',
  in: 'Pole :attribute musi należeć do zbioru :in.',
  integer: 'Pole :attribute musi być liczbą całkowitą.',
  hex: 'The :attribute should have hexadecimal format',
  min: {
    numeric: 'Pole :attribute musi być równe conajmniej :min.',
    string: 'Pole :attribute musi zawierać conajmniej :min znaków.'
  },
  max: {
    numeric: 'Pole :attribute nie moze być większe :max.',
    string: 'Pole :attribute nie moze być dłuższe niż :max znaków.'
  },
  not_in: 'Pole :attribute nie może należeć do zbioru :not_in.',
  numeric: 'Pole :attribute musi być liczbą.',
  present: 'Polu :attribute musi być obecny (ale może być pusta).',
  required: 'Pole :attribute jest wymagane.',
  required_if: 'Pole :attribute jest wymagane jeśli pole :other jest równe :value.',
  same: 'Pola :attribute i :same muszą być takie same.',
  size: {
    numeric: 'Pole :attribute musi być równe :size.',
    string: 'Pole :attribute musi zawierać :size znaków.'
  },
  string: 'Pole :attribute musi być ciągiem znaków.',
  url: 'Pole :attribute musi być poprawnym adresem URL.',
  regex: 'Pole :attribute nie spełnia warunku.',
  attributes: {}
};


/***/ }),
/* 41 */
/***/ ((module) => {

module.exports = {
  accepted: "O campo :attribute deverá ser aceite.",
  active_url: "O campo :attribute não contém um URL válido.",
  after: "O campo :attribute deverá conter uma data posterior a :date.",
  after_or_equal: "O campo :attribute deverá conter uma data posterior ou igual a :date.",
  alpha: "O campo :attribute deverá conter apenas letras.",
  alpha_dash: "O campo :attribute deverá conter apenas letras, números e traços.",
  alpha_num: "O campo :attribute deverá conter apenas letras e números .",
  attributes: {},
  array: "O campo :attribute deverá conter uma coleção de elementos.",
  before: "O campo :attribute deverá conter uma data anterior a :date.",
  before_or_equal: "O Campo :attribute deverá conter uma data anterior ou igual a :date.",
  between: {
    numeric: "O campo :attribute deverá ter um valor entre :min - :max.",
    file: "O campo :attribute deverá ter um tamanho entre :min - :max kilobytes.",
    string: "O campo :attribute deverá conter entre :min - :max caracteres.",
    array: "O campo :attribute deverá conter entre :min - :max elementos."
  },
  boolean: "O campo :attribute deverá conter o valor verdadeiro ou falso.",
  confirmed: "A confirmação para o campo :attribute não coincide.",
  date: "O campo :attribute não contém uma data válida.",
  date_format: "A data indicada para o campo :attribute não respeita o formato :format.",
  different: "Os campos :attribute e :other deverão conter valores diferentes.",
  digits: "O campo :attribute deverá conter :digits caracteres.",
  digits_between: "O campo :attribute deverá conter entre :min a :max caracteres.",
  dimensions: "O campo :attribute deverá conter uma dimensão de imagem válida.",
  distinct: "O campo :attribute contém um valor duplicado.",
  email: "O campo :attribute não contém um endereço de correio eletrónico válido.",
  exists: "O valor selecionado para o campo :attribute é inválido.",
  file: "O campo :attribute deverá conter um ficheiro.",
  filled: "É obrigatória a indicação de um valor para o campo :attribute.",
  gt: {
    numeric: "The :attribute must be greater than :value.",
    file: "The :attribute must be greater than :value kilobytes.",
    string: "The :attribute must be greater than :value characters.",
    array: "The :attribute must have more than :value items."
  },
  gte: {
    numeric: "The :attribute must be greater than or equal :value.",
    file: "The :attribute must be greater than or equal :value kilobytes.",
    string: "The :attribute must be greater than or equal :value characters.",
    array: "The :attribute must have :value items or more."
  },
  hex: "The :attribute field should have hexadecimal format",
  image: "O campo :attribute deverá conter uma imagem.",
  in: "O campo :attribute não contém um valor válido.",
  in_array: "O campo :attribute não existe em :other.",
  integer: "O campo :attribute deverá conter um número inteiro.",
  ip: "O campo :attribute deverá conter um IP válido.",
  ipv4: "O campo :attribute deverá conter um IPv4 válido.",
  ipv6: "O campo :attribute deverá conter um IPv6 válido.",
  json: "O campo :attribute deverá conter um texto JSON válido.",
  lt: {
    numeric: "The :attribute must be less than :value.",
    file: "The :attribute must be less than :value kilobytes.",
    string: "The :attribute must be less than :value characters.",
    array: "The :attribute must have less than :value items."
  },
  lte: {
    numeric: "The :attribute must be less than or equal :value.",
    file: "The :attribute must be less than or equal :value kilobytes.",
    string: "The :attribute must be less than or equal :value characters.",
    array: "The :attribute must not have more than :value items."
  },
  max: {
    numeric: "O campo :attribute não deverá conter um valor superior a :max.",
    file: "O campo :attribute não deverá ter um tamanho superior a :max kilobytes.",
    string: "O campo :attribute não deverá conter mais de :max caracteres.",
    array: "O campo :attribute não deverá conter mais de :max elementos."
  },
  mimes: "O campo :attribute deverá conter um ficheiro do tipo: :values.",
  mimetypes: "O campo :attribute deverá conter um ficheiro do tipo: :values.",
  min: {
    numeric: "O campo :attribute deverá ter um valor superior ou igual a :min.",
    file: "O campo :attribute deverá ter no mínimo :min kilobytes.",
    string: "O campo :attribute deverá conter no mínimo :min caracteres.",
    array: "O campo :attribute deverá conter no mínimo :min elementos."
  },
  not_in: "O campo :attribute contém um valor inválido.",
  not_regex: "The :attribute format is invalid.",
  numeric: "O campo :attribute deverá conter um valor numérico.",
  present: "O campo :attribute deverá estar presente.",
  regex: "O formato do valor para o campo :attribute é inválido.",
  required: "É obrigatória a indicação de um valor para o campo :attribute.",
  required_if:
    "É obrigatória a indicação de um valor para o campo :attribute quando o valor do campo :other é igual a :value.",
  required_unless:
    "É obrigatória a indicação de um valor para o campo :attribute a menos que :other esteja presente em :values.",
  required_with: "É obrigatória a indicação de um valor para o campo :attribute quando :values está presente.",
  required_with_all:
    "É obrigatória a indicação de um valor para o campo :attribute quando um dos :values está presente.",
  required_without: "É obrigatória a indicação de um valor para o campo :attribute quando :values não está presente.",
  required_without_all:
    "É obrigatória a indicação de um valor para o campo :attribute quando nenhum dos :values está presente.",
  same: "Os campos :attribute e :other deverão conter valores iguais.",
  size: {
    numeric: "O campo :attribute deverá conter o valor :size.",
    file: "O campo :attribute deverá ter o tamanho de :size kilobytes.",
    string: "O campo :attribute deverá conter :size caracteres.",
    array: "O campo :attribute deverá conter :size elementos."
  },
  string: "O campo :attribute deverá conter texto.",
  timezone: "O campo :attribute deverá ter um fuso horário válido.",
  unique: "O valor indicado para o campo :attribute já se encontra registado.",
  uploaded: "O upload do ficheiro :attribute falhou.",
  url: "O formato do URL indicado para o campo :attribute é inválido."
};


/***/ }),
/* 42 */
/***/ ((module) => {

module.exports = {
  accepted: "O campo :attribute deve ser aceito.",
  active_url: "O campo :attribute deve conter uma URL válida.",
  after: "O campo :attribute deve conter uma data posterior a :date.",
  after_or_equal: "O campo :attribute deve conter uma data superior ou igual a :date.",
  alpha: "O campo :attribute deve conter apenas letras.",
  alpha_dash: "O campo :attribute deve conter apenas letras, números e traços.",
  alpha_num: "O campo :attribute deve conter apenas letras e números .",
  array: "O campo :attribute deve conter um array.",
  before: "O campo :attribute deve conter uma data anterior a :date.",
  before_or_equal: "O campo :attribute deve conter uma data inferior ou igual a :date.",
  between: {
    numeric: "O campo :attribute deve conter um número entre :min e :max.",
    file: "O campo :attribute deve conter um arquivo de :min a :max kilobytes.",
    string: "O campo :attribute deve conter entre :min a :max caracteres.",
    array: "O campo :attribute deve conter de :min a :max itens."
  },
  boolean: "O campo :attribute deve conter o valor verdadeiro ou falso.",
  confirmed: "A confirmação para o campo :attribute não coincide.",
  date: "O campo :attribute não contém uma data válida.",
  date_format: "A data informada para o campo :attribute não respeita o formato :format.",
  different: "Os campos :attribute e :other devem conter valores diferentes.",
  digits: "O campo :attribute deve conter :digits dígitos.",
  digits_between: "O campo :attribute deve conter entre :min a :max dígitos.",
  dimensions: "O valor informado para o campo :attribute não é uma dimensão de imagem válida.",
  distinct: "O campo :attribute contém um valor duplicado.",
  email: "O campo :attribute não contém um endereço de email válido.",
  exists: "O valor selecionado para o campo :attribute é inválido.",
  file: "O campo :attribute deve conter um arquivo.",
  filled: "O campo :attribute é obrigatório.",
  gt: {
    numeric: "O campo :attribute deve ser maior que :value.",
    file: "O arquivo :attribute deve ser maior que :value kilobytes.",
    string: "O campo :attribute deve ser maior que :value caracteres.",
    array: "O campo :attribute deve ter mais que :value itens."
  },
  gte: {
    numeric: "O campo :attribute deve ser maior ou igual a :value.",
    file: "O arquivo :attribute deve ser maior ou igual a :value kilobytes.",
    string: "O campo :attribute deve ser maior ou igual a :value caracteres.",
    array: "O campo :attribute deve ter :value itens ou mais."
  },
  hex: "The :attribute field should have hexadecimal format",
  image: "O campo :attribute deve conter uma imagem.",
  in: "O campo :attribute não contém um valor válido.",
  in_array: "O campo :attribute não existe em :other.",
  integer: "O campo :attribute deve conter um número inteiro.",
  ip: "O campo :attribute deve conter um IP válido.",
  ipv4: "O campo :attribute deve conter um IPv4 válido.",
  ipv6: "O campo :attribute deve conter um IPv6 válido.",
  json: "O campo :attribute deve conter uma string JSON válida.",
  lt: {
    numeric: "O campo :attribute deve ser menor que :value.",
    file: "O arquivo :attribute ser menor que :value kilobytes.",
    string: "O campo :attribute deve ser menor que :value caracteres.",
    array: "O campo :attribute deve ter menos que :value itens."
  },
  lte: {
    numeric: "O campo :attribute deve ser menor ou igual a :value.",
    file: "O arquivo :attribute ser menor ou igual a :value kilobytes.",
    string: "O campo :attribute deve ser menor ou igual a :value caracteres.",
    array: "O campo :attribute não deve ter mais que :value itens."
  },
  max: {
    numeric: "O campo :attribute não pode conter um valor superior a :max.",
    file: "O campo :attribute não pode conter um arquivo com mais de :max kilobytes.",
    string: "O campo :attribute não pode conter mais de :max caracteres.",
    array: "O campo :attribute deve conter no máximo :max itens."
  },
  mimes: "O campo :attribute deve conter um arquivo do tipo: :values.",
  mimetypes: "O campo :attribute deve conter um arquivo do tipo: :values.",
  min: {
    numeric: "O campo :attribute deve conter um número superior ou igual a :min.",
    file: "O campo :attribute deve conter um arquivo com no mínimo :min kilobytes.",
    string: "O campo :attribute deve conter no mínimo :min caracteres.",
    array: "O campo :attribute deve conter no mínimo :min itens."
  },
  not_in: "O campo :attribute contém um valor inválido.",
  not_regex: "O formato do valor :attribute é inválido.",
  numeric: "O campo :attribute deve conter um valor numérico.",
  present: "O campo :attribute deve estar presente.",
  regex: "O formato do valor informado no campo :attribute é inválido.",
  required: "O campo :attribute é obrigatório.",
  required_if: "O campo :attribute é obrigatório quando o valor do campo :other é igual a :value.",
  required_unless: "O campo :attribute é obrigatório a menos que :other esteja presente em :values.",
  required_with: "O campo :attribute é obrigatório quando :values está presente.",
  required_with_all: "O campo :attribute é obrigatório quando um dos :values está presente.",
  required_without: "O campo :attribute é obrigatório quando :values não está presente.",
  required_without_all: "O campo :attribute é obrigatório quando nenhum dos :values está presente.",
  same: "Os campos :attribute e :other devem conter valores iguais.",
  size: {
    numeric: "O campo :attribute deve conter o número :size.",
    file: "O campo :attribute deve conter um arquivo com o tamanho de :size kilobytes.",
    string: "O campo :attribute deve conter :size caracteres.",
    array: "O campo :attribute deve conter :size itens."
  },
  string: "O campo :attribute deve ser uma string.",
  timezone: "O campo :attribute deve conter um fuso horário válido.",
  unique: "O valor informado para o campo :attribute já está em uso.",
  uploaded: "Falha no Upload do arquivo :attribute.",
  url: "O formato da URL informada para o campo :attribute é inválido."
};


/***/ }),
/* 43 */
/***/ ((module) => {

module.exports = {
  accepted: ':attribute trebuie acceptat.',
  after: ':attribute trebuie să fie după :after.',
  after_or_equal: ':attribute trebuie să fie egal sau după :after_or_equal.',
  alpha: 'Câmpul :attribute rebuie să conțină numai caractere alfabetice.',
  alpha_dash: 'Câmpul:attribute poate conține numai caractere alfanumerice, precum și liniuțe și subliniere.',
  alpha_num: 'Câmpul :attribute trebuie să fie alfanumeric.',
  before: ':attribute trebuie să fie înainte :before.',
  before_or_equal: ':attribute trebuie să fie egal sau înainte :before_or_equal.',
  between: ':attribute trebuie să fie între :min și :max.',
  confirmed: 'Confirmarea :attribute nu se potrivește.',
  email: 'Formatul :attribute nu este valid.',
  date: ':attribute nu este un format de dată valid.',
  def: 'Atributul :attribute are erori.',
  digits: ':attribute trebuie să aibă  :digits cifre.',
  digits_between: 'Câmpul :attribute trebuie să aibă între :min și :max cifre.',
  different: ':attribute și :different trebuie sa fie diferite.',
  in: 'Atributul selectat :attribute nu este valid.',
  integer: ':attribute trebuie să fie un număr întreg.',
  hex: 'Câmpul :attribute trebuie să aibă format hexazecimal.',
  min: {
    numeric: ':attribute trebuie să fie mai mare de :min.',
    string: ':attribute trebuie să contină cel puțin :min caractere.'
  },
  max: {
    numeric: ':attribute nu trebuie să fie mai mare de :max.',
    string: ':attribute poate să contină maxim :max caractere.'
  },
  not_in: ':attribute selectat nu este valid.',
  numeric: ':attribute trebuie sa fie un număr.',
  present: ':attribute trebuie sa fie prezent(dar poate fi gol).',
  required: ' Câmpul :attribute este obligatoriu.',
  required_if: 'Câmpul :attribute este obligatoriu cănd :other este :value.',
  required_unless: 'Câmpul :attribute este obligatoriu cănd :other nu este :value.',
  required_with: 'Câmpul :attribute este obligatoriu cănd :field este completat.',
  required_with_all: 'Câmpul :attribute este obligatoriu cănd :fields sunt completate.',
  required_without: 'Câmpul :attribute este obligatoriu cănd :field nu este completat.',
  required_without_all: 'Câmpul :attribute este obligatoriu cănd :fields nu sunt completate.',
  same: 'Câmpurile :attribute și :same trebuie să fie egale.',
  size: {
    numeric: ':attribute trebuie să fie :size.',
    string: ':attribute trebuie să contina :size caractere.'
  },
  string: ':attribute trebuie să fie un contina doar caractere alfabetice.',
  url: 'Formatul :attribute nu este valid.',
  regex: 'Formatul :attribute nu este valid.',
  attributes: {}
};


/***/ }),
/* 44 */
/***/ ((module) => {

module.exports = {
  accepted: 'Вы должны принять :attribute.',
  alpha: 'Поле :attribute может содержать только буквы.',
  alpha_dash: 'Поле :attribute может содержать только буквы, цифры, дефисы и символы подчёркивания.',
  alpha_num: 'Поле :attribute может содержать только буквы и цифры.',
  between: 'Поле :attribute должно быть между :min и :max.',
  confirmed: 'Поле :attribute не совпадает с подтверждением.',
  email: 'Поле :attribute должно быть действительным электронным адресом.',
  def: 'Поле :attribute содержит ошибки.',
  digits: 'Длина цифрового поля :attribute должна быть :digits.',
  digits_between: 'Длинна цифрового поля :attribute должна быть от :min до :max знаков.',
  different: 'Поля :attribute и :different должны различаться.',
  in: 'Выбранное значение для :attribute ошибочно.',
  integer: 'Поле :attribute должно быть целым числом.',
  hex: 'Поле :attribute должно иметь шестнадцатеричный формат',
  min: {
    numeric: 'Значение поля :attribute должно быть больше или равно :min.',
    string: 'Количество символов в поле :attribute должно быть не менее :min.'
  },
  max: {
    numeric: 'Значение поля :attribute должно быть меньше или равно :max.',
    string: 'Количество символов в поле :attribute не может превышать :max.'
  },
  not_in: 'Выбранное значение для :attribute ошибочно.',
  numeric: 'Поле :attribute должно быть числом.',
  present: 'Поле :attribute должно присутствовать (но может быть пустым).',
  required: 'Поле :attribute обязательно для заполнения.',
  required_if: 'Поле :attribute требуется когда значения поля :other равно :value.',
  same: 'Значение :attribute должно совпадать с :same.',
  size: {
    numeric: 'Значение поля :attribute должно быть равным :size.',
    string: 'Количество символов в поле :attribute должно быть равно :size.'
  },
  url: 'Поле :attribute должно содержать валидный URL.',
  regex: 'Неверный формат поля :attribute.',
  attributes: {}
};


/***/ }),
/* 45 */
/***/ ((module) => {

module.exports = {
  accepted: ':attribute måste vara accepterat.',
  after: ':attribute måste vara efter :after.',
  after_or_equal: ':attribute måste vara samtidigt eller efter :after_or_equal.',
  alpha: ':attribute får bara bestå av bokstäver.',
  alpha_dash: ':attribute får bara bestå av alfanumeriska tecken, bindestreck och understreck.',
  alpha_num: ':attribute får bara bestå av alfanumeriska tecken',
  before: ':attribute måste vara före :before.',
  before_or_equal: ':attribute måste vara samtidigt eller före :before_or_equal.',
  between: ':attribute måste vara mellan :min och :max.',
  confirmed: ':attribute stämmer inte överens med bekräftelsefältet.',
  email: 'Felaktigt format för :attribute.',
  date: ':attribute är inte ett giltigt datum.',
  def: 'Attributet :attribute innehåller fel.',
  digits: ':attribute ska innehålla :digits siffror.',
  different: ':attribute och :different måste vara olika.',
  in: 'Det valda :attribute är ogiltigt.',
  integer: ':attribute måste vara ett heltal.',
  hex: ':attribute måste vara i hexadecimalt format',
  min: {
    numeric: ':attribute måste vara minst :min.',
    string: ':attribute måste vara minst :min tecken.'
  },
  max: {
    numeric: ':attribute får inte vara högre än :max.',
    string: ':attribute får inte innehålla fler än :max tecken.'
  },
  not_in: 'Det valda attributet :attribute är ogiltigt',
  numeric: ':attribute måste vara en siffra.',
  present: ':attribute måste vara tillgängligt.',
  required: ':attribute måste vara ifyllt.',
  required_if: ':attribute måste vara ifyllt när :other är :value.',
  required_unless: ':attribute måste vara ifyllt när :other inte är :value.',
  required_with: ':attribute måste vara ifyllt när :field är ifyllt.',
  required_with_all: ':attribute måste vara ifyllt när :fields är ifyllda.',
  required_without: ':attribute måste vara ifyllt när :field inte är ifyllt.',
  required_without_all: ':attribute måste vara ifyllt när ingen av :fields är ifyllda.',
  same: ':attribute och :same måste matcha.',
  size: {
    numeric: ':attribute måste vara :size.',
    string: ':attribute måste vara :size tecken lång.'
  },
  string: ':attribute måste vara en sträng.',
  url: ':attribute formatet är ogiltigt.',
  regex: ':attribute formatet är ogiltigt.',
  attributes: {}
};


/***/ }),
/* 46 */
/***/ ((module) => {

module.exports = {
  accepted: ":attribute mora biti sprejet.",
  active_url: ":attribute ni pravilen.",
  after: ":attribute mora biti za datumom :date.",
  after_or_equal: ":attribute mora biti za ali enak :date.",
  alpha: ":attribute lahko vsebuje samo črke.",
  alpha_dash: ":attribute lahko vsebuje samo črke, številke in črtice.",
  alpha_num: ":attribute lahko vsebuje samo črke in številke.",
  attributes: {},
  array: ":attribute mora biti polje.",
  before: ":attribute mora biti pred datumom :date.",
  before_or_equal: ":attribute mora biti pred ali enak :date.",
  between: {
    numeric: ":attribute mora biti med :min in :max.",
    file: ":attribute mora biti med :min in :max kilobajti.",
    string: ":attribute mora biti med :min in :max znaki.",
    array: ":attribute mora imeti med :min in :max elementov."
  },
  boolean: ":attribute polje mora biti 1 ali 0",
  confirmed: ":attribute potrditev se ne ujema.",
  date: ":attribute ni veljaven datum.",
  date_format: ":attribute se ne ujema z obliko :format.",
  different: ":attribute in :other mora biti drugačen.",
  digits: ":attribute mora imeti :digits cifer.",
  digits_between: ":attribute mora biti med :min in :max ciframi.",
  dimensions: ":attribute ima napačne dimenzije slike.",
  distinct: ":attribute je duplikat.",
  email: ":attribute mora biti veljaven e-poštni naslov.",
  exists: "izbran :attribute je neveljaven.",
  file: ":attribute mora biti datoteka.",
  filled: ":attribute mora biti izpolnjen.",
  gt: {
    numeric: "The :attribute must be greater than :value.",
    file: "The :attribute must be greater than :value kilobytes.",
    string: "The :attribute must be greater than :value characters.",
    array: "The :attribute must have more than :value items."
  },
  gte: {
    numeric: "The :attribute must be greater than or equal :value.",
    file: "The :attribute must be greater than or equal :value kilobytes.",
    string: "The :attribute must be greater than or equal :value characters.",
    array: "The :attribute must have :value items or more."
  },
  hex: "The :attribute field should have hexadecimal format",
  image: ":attribute mora biti slika.",
  in: "izbran :attribute je neveljaven.",
  in_array: ":attribute ne obstaja v :other.",
  integer: ":attribute mora biti število.",
  ip: ":attribute mora biti veljaven IP naslov.",
  ipv4: ":attribute mora biti veljaven IPv4 naslov.",
  ipv6: ":attribute mora biti veljaven IPv6 naslov.",
  json: ":attribute mora biti veljaven JSON tekst.",
  lt: {
    numeric: "The :attribute must be less than :value.",
    file: "The :attribute must be less than :value kilobytes.",
    string: "The :attribute must be less than :value characters.",
    array: "The :attribute must have less than :value items."
  },
  lte: {
    numeric: "The :attribute must be less than or equal :value.",
    file: "The :attribute must be less than or equal :value kilobytes.",
    string: "The :attribute must be less than or equal :value characters.",
    array: "The :attribute must not have more than :value items."
  },
  max: {
    numeric: ":attribute ne sme biti večje od :max.",
    file: ":attribute ne sme biti večje :max kilobajtov.",
    string: ":attribute ne sme biti večje :max znakov.",
    array: ":attribute ne smejo imeti več kot :max elementov."
  },
  mimes: ":attribute mora biti datoteka tipa: :values.",
  mimetypes: ":attribute mora biti datoteka tipa: :values.",
  min: {
    numeric: ":attribute mora biti vsaj dolžine :min.",
    file: ":attribute mora imeti vsaj :min kilobajtov.",
    string: ":attribute mora imeti vsaj :min znakov.",
    array: ":attribute mora imeti vsaj :min elementov."
  },
  not_in: "izbran :attribute je neveljaven.",
  not_regex: "The :attribute format is invalid.",
  numeric: ":attribute mora biti število.",
  present: "Polje :attribute mora biti prisotno.",
  regex: "Format polja :attribute je neveljaven.",
  required: "Polje :attribute je obvezno.",
  required_if: "Polje :attribute je obvezno, če je :other enak :value.",
  required_unless: "Polje :attribute je obvezno, razen če je :other v :values.",
  required_with: "Polje :attribute je obvezno, če je :values prisoten.",
  required_with_all: "Polje :attribute je obvezno, če so :values prisoten.",
  required_without: "Polje :attribute je obvezno, če :values ni prisoten.",
  required_without_all: "Polje :attribute je obvezno, če :values niso prisotni.",
  same: "Polje :attribute in :other se morata ujemati.",
  size: {
    numeric: ":attribute mora biti :size.",
    file: ":attribute mora biti :size kilobajtov.",
    string: ":attribute mora biti :size znakov.",
    array: ":attribute mora vsebovati :size elementov."
  },
  string: ":attribute mora biti tekst.",
  timezone: ":attribute mora biti časovna cona.",
  unique: ":attribute je že zaseden.",
  uploaded: "Nalaganje :attribute ni uspelo.",
  url: ":attribute format je neveljaven."
};


/***/ }),
/* 47 */
/***/ ((module) => {

module.exports = {
  accepted: ":attribute duhet të pranohet.",
  active_url: ":attribute nuk është adresë e saktë.",
  after: ":attribute duhet të jetë datë pas :date.",
  after_or_equal: "The :attribute must be a date after or equal to :date.",
  alpha: ":attribute mund të përmbajë vetëm shkronja.",
  alpha_dash: ":attribute mund të përmbajë vetëm shkronja, numra, dhe viza.",
  alpha_num: ":attribute mund të përmbajë vetëm shkronja dhe numra.",
  attributes: {},
  array: ":attribute duhet të jetë një bashkësi (array).",
  before: ":attribute duhet të jetë datë para :date.",
  before_or_equal: "The :attribute must be a date before or equal to :date.",
  between: {
    numeric: ":attribute duhet të jetë midis :min - :max.",
    file: ":attribute duhet të jetë midis :min - :max kilobajtëve.",
    string: ":attribute duhet të jetë midis :min - :max karaktereve.",
    array: ":attribute duhet të jetë midis :min - :max elementëve."
  },
  boolean: "Fusha :attribute duhet të jetë e vërtetë ose e gabuar",
  confirmed: ":attribute konfirmimi nuk përputhet.",
  date: ":attribute nuk është një datë e saktë.",
  date_format: ":attribute nuk i përshtatet formatit :format.",
  different: ":attribute dhe :other duhet të jenë të ndryshme.",
  digits: ":attribute duhet të jetë :digits shifra.",
  digits_between: ":attribute duhet të jetë midis :min dhe :max shifra.",
  dimensions: "The :attribute has invalid image dimensions.",
  distinct: "The :attribute field has a duplicate value.",
  email: ":attribute formati është i pasaktë.",
  exists: ":attribute përzgjedhur është i/e pasaktë.",
  file: "The :attribute must be a file.",
  filled: "Fusha :attribute është e kërkuar.",
  gt: {
    numeric: "The :attribute must be greater than :value.",
    file: "The :attribute must be greater than :value kilobytes.",
    string: "The :attribute must be greater than :value characters.",
    array: "The :attribute must have more than :value items."
  },
  gte: {
    numeric: "The :attribute must be greater than or equal :value.",
    file: "The :attribute must be greater than or equal :value kilobytes.",
    string: "The :attribute must be greater than or equal :value characters.",
    array: "The :attribute must have :value items or more."
  },
  hex: "The :attribute field should have hexadecimal format",
  image: ":attribute duhet të jetë imazh.",
  in: ":attribute përzgjedhur është i/e pasaktë.",
  in_array: "The :attribute field does not exist in :other.",
  integer: ":attribute duhet të jetë numër i plotë.",
  ip: ":attribute duhet të jetë një IP adresë e saktë.",
  ipv4: "The :attribute must be a valid IPv4 address.",
  ipv6: "The :attribute must be a valid IPv6 address.",
  json: "The :attribute must be a valid JSON string.",
  lt: {
    numeric: "The :attribute must be less than :value.",
    file: "The :attribute must be less than :value kilobytes.",
    string: "The :attribute must be less than :value characters.",
    array: "The :attribute must have less than :value items."
  },
  lte: {
    numeric: "The :attribute must be less than or equal :value.",
    file: "The :attribute must be less than or equal :value kilobytes.",
    string: "The :attribute must be less than or equal :value characters.",
    array: "The :attribute must not have more than :value items."
  },
  max: {
    numeric: ":attribute nuk mund të jetë më tepër se :max.",
    file: ":attribute nuk mund të jetë më tepër se :max kilobajtë.",
    string: ":attribute nuk mund të jetë më tepër se :max karaktere.",
    array: ":attribute nuk mund të ketë më tepër se :max elemente."
  },
  mimes: ":attribute duhet të jetë një dokument i tipit: :values.",
  mimetypes: ":attribute duhet të jetë një dokument i tipit: :values.",
  min: {
    numeric: ":attribute nuk mund të jetë më pak se :min.",
    file: ":attribute nuk mund të jetë më pak se :min kilobajtë.",
    string: ":attribute nuk mund të jetë më pak se :min karaktere.",
    array: ":attribute nuk mund të ketë më pak se :min elemente."
  },
  not_in: ":attribute përzgjedhur është i/e pasaktë.",
  not_regex: "The :attribute format is invalid.",
  numeric: ":attribute duhet të jetë një numër.",
  present: "The :attribute field must be present.",
  regex: "Formati i :attribute është i pasaktë.",
  required: "Fusha :attribute është e kërkuar.",
  required_if: "Fusha :attribute është e kërkuar kur :other është :value.",
  required_unless: "The :attribute field is required unless :other is in :values.",
  required_with: "Fusha :attribute është e kërkuar kur :values ekziston.",
  required_with_all: "Fusha :attribute është e kërkuar kur :values ekziston.",
  required_without: "Fusha :attribute është e kërkuar kur :values nuk ekziston.",
  required_without_all: "Fusha :attribute është e kërkuar kur nuk ekziston asnjë nga :values.",
  same: ":attribute dhe :other duhet të përputhen.",
  size: {
    numeric: ":attribute duhet të jetë :size.",
    file: ":attribute duhet të jetë :size kilobajtë.",
    string: ":attribute duhet të jetë :size karaktere.",
    array: ":attribute duhet të ketë :size elemente."
  },
  string: ":attribute duhet të jetë varg.",
  timezone: ":attribute duhet të jetë zonë e saktë.",
  unique: ":attribute është marrë tashmë.",
  uploaded: "The :attribute failed to upload.",
  url: "Formati i :attribute është i pasaktë."
};


/***/ }),
/* 48 */
/***/ ((module) => {

module.exports = {
  accepted: "Polje :attribute mora biti prihvaćeno.",
  active_url: "Polje :attribute nije validan URL.",
  after: "Polje :attribute mora biti datum posle :date.",
  after_or_equal: "The :attribute must be a date after or equal to :date.",
  alpha: "Polje :attribute može sadržati samo slova.",
  alpha_dash: "Polje :attribute može sadržati samo slova, brojeve i povlake.",
  alpha_num: "Polje :attribute može sadržati samo slova i brojeve.",
  attributes: {},
  array: "Polje :attribute mora sadržati nekih niz stavki.",
  before: "Polje :attribute mora biti datum pre :date.",
  before_or_equal: "The :attribute must be a date before or equal to :date.",
  between: {
    numeric: "Polje :attribute mora biti između :min - :max.",
    file: "Fajl :attribute mora biti između :min - :max kilobajta.",
    string: "Polje :attribute mora biti između :min - :max karaktera.",
    array: "Polje :attribute mora biti između :min - :max stavki."
  },
  boolean: "Polje :attribute mora biti tačno ili netačno",
  confirmed: "Potvrda polja :attribute se ne poklapa.",
  date: "Polje :attribute nije važeći datum.",
  date_format: "Polje :attribute ne odgovora prema formatu :format.",
  different: "Polja :attribute i :other moraju biti različita.",
  digits: "Polje :attribute mora sadržati :digits šifri.",
  digits_between: "Polje :attribute mora biti izemđu :min i :max šifri.",
  dimensions: "The :attribute has invalid image dimensions.",
  distinct: "The :attribute field has a duplicate value.",
  email: "Format polja :attribute nije validan.",
  exists: "Odabrano polje :attribute nije validno.",
  file: "The :attribute must be a file.",
  filled: "Polje :attribute je obavezno.",
  gt: {
    numeric: "The :attribute must be greater than :value.",
    file: "The :attribute must be greater than :value kilobytes.",
    string: "The :attribute must be greater than :value characters.",
    array: "The :attribute must have more than :value items."
  },
  gte: {
    numeric: "The :attribute must be greater than or equal :value.",
    file: "The :attribute must be greater than or equal :value kilobytes.",
    string: "The :attribute must be greater than or equal :value characters.",
    array: "The :attribute must have :value items or more."
  },
  hex: "The :attribute field should have hexadecimal format",
  image: "Polje :attribute mora biti slika.",
  in: "Odabrano polje :attribute nije validno.",
  in_array: "The :attribute field does not exist in :other.",
  integer: "Polje :attribute mora biti broj.",
  ip: "Polje :attribute mora biti validna IP adresa.",
  ipv4: "The :attribute must be a valid IPv4 address.",
  ipv6: "The :attribute must be a valid IPv6 address.",
  json: "The :attribute must be a valid JSON string.",
  lt: {
    numeric: "The :attribute must be less than :value.",
    file: "The :attribute must be less than :value kilobytes.",
    string: "The :attribute must be less than :value characters.",
    array: "The :attribute must have less than :value items."
  },
  lte: {
    numeric: "The :attribute must be less than or equal :value.",
    file: "The :attribute must be less than or equal :value kilobytes.",
    string: "The :attribute must be less than or equal :value characters.",
    array: "The :attribute must not have more than :value items."
  },
  max: {
    numeric: "Polje :attribute mora biti manje od :max.",
    file: "Polje :attribute mora biti manje od :max kilobajta.",
    string: "Polje :attribute mora sadržati manje od :max karaktera.",
    array: "Polje :attribute ne smije da image više od :max stavki."
  },
  mimes: "Polje :attribute mora biti fajl tipa: :values.",
  mimetypes: "Polje :attribute mora biti fajl tipa: :values.",
  min: {
    numeric: "Polje :attribute mora biti najmanje :min.",
    file: "Fajl :attribute mora biti najmanje :min kilobajta.",
    string: "Polje :attribute mora sadržati najmanje :min karaktera.",
    array: "Polje :attribute mora sadrzati najmanje :min stavku."
  },
  not_in: "Odabrani element polja :attribute nije validan.",
  not_regex: "The :attribute format is invalid.",
  numeric: "Polje :attribute mora biti broj.",
  present: "The :attribute field must be present.",
  regex: "Format polja :attribute nije validan.",
  required: "Polje :attribute je obavezno.",
  required_if: "Polje :attribute je potrebno kada polje :other sadrži :value.",
  required_unless: "The :attribute field is required unless :other is in :values.",
  required_with: "Polje :attribute je potrebno kada polje :values je prisutan.",
  required_with_all: "Polje :attribute je obavezno kada je :values prikazano.",
  required_without: "Polje :attribute je potrebno kada polje :values nije prisutan.",
  required_without_all: "Polje :attribute je potrebno kada nijedan od sledeći polja :values nisu prisutni.",
  same: "Polja :attribute i :other se moraju poklapati.",
  size: {
    numeric: "Polje :attribute mora biti :size.",
    file: "Fajl :attribute mora biti :size kilobajta.",
    string: "Polje :attribute mora biti :size karaktera.",
    array: "Polje :attribute mora sadržati :size stavki."
  },
  string: "Polje :attribute mora sadržati slova.",
  timezone: "Polje :attribute mora biti ispravna vremenska zona.",
  unique: "Polje :attribute već postoji.",
  uploaded: "The :attribute failed to upload.",
  url: "Format polja :attribute ne važi."
};


/***/ }),
/* 49 */
/***/ ((module) => {

module.exports = {
  accepted: ":attribute måste accepteras.",
  active_url: ":attribute är inte en giltig webbadress.",
  after: ":attribute måste vara ett datum efter den :date.",
  after_or_equal: ":attribute måste vara ett datum senare eller samma dag som :date.",
  alpha: ":attribute får endast innehålla bokstäver.",
  alpha_dash: ":attribute får endast innehålla bokstäver, siffror och bindestreck.",
  alpha_num: ":attribute får endast innehålla bokstäver och siffror.",
  array: ":attribute måste vara en array.",
  before: ":attribute måste vara ett datum innan den :date.",
  before_or_equal: ":attribute måste vara ett datum före eller samma dag som :date.",
  between: {
    numeric: ":attribute måste vara en siffra mellan :min och :max.",
    file: ":attribute måste vara mellan :min till :max kilobyte stor.",
    string: ":attribute måste innehålla :min till :max tecken.",
    array: ":attribute måste innehålla mellan :min - :max objekt."
  },
  boolean: ":attribute måste vara sant eller falskt.",
  confirmed: ":attribute bekräftelsen matchar inte.",
  date: ":attribute är inte ett giltigt datum.",
  date_format: ":attribute matchar inte formatet :format.",
  different: ":attribute och :other får inte vara lika.",
  digits: ":attribute måste vara :digits tecken.",
  digits_between: ":attribute måste vara mellan :min och :max tecken.",
  dimensions: ":attribute har felaktiga bilddimensioner.",
  distinct: ":attribute innehåller fler än en repetition av samma element.",
  email: ":attribute måste innehålla en korrekt e-postadress.",
  exists: ":attribute är ogiltigt.",
  file: ":attribute måste vara en fil.",
  filled: ":attribute är obligatoriskt.",
  gt: {
    numeric: ":attribute måste vara större än :value.",
    file: ":attribute måste vara större än :value kilobyte stor.",
    string: ":attribute måste vara längre än :value tecken.",
    array: ":attribute måste innehålla fler än :value objekt."
  },
  gte: {
    numeric: ":attribute måste vara lika med eller större än :value.",
    file: ":attribute måste vara lika med eller större än :value kilobyte stor.",
    string: ":attribute måste vara lika med eller längre än :value tecken.",
    array: ":attribute måste innehålla lika många eller fler än :value objekt."
  },
  hex: "The :attribute field should have hexadecimal format",
  image: ":attribute måste vara en bild.",
  in: ":attribute är ogiltigt.",
  in_array: ":attribute finns inte i :other.",
  integer: ":attribute måste vara en siffra.",
  ip: ":attribute måste vara en giltig IP-adress.",
  ipv4: ":attribute måste vara en giltig IPv4-adress.",
  ipv6: ":attribute måste vara en giltig IPv6-adress.",
  json: ":attribute måste vara en giltig JSON-sträng.",
  lt: {
    numeric: ":attribute måste vara mindre än :value.",
    file: ":attribute måste vara mindre än :value kilobyte stor.",
    string: ":attribute måste vara kortare än :value tecken.",
    array: ":attribute måste innehålla färre än :value objekt."
  },
  lte: {
    numeric: ":attribute måste vara lika med eller mindre än :value.",
    file: ":attribute måste vara lika med eller mindre än :value kilobyte stor.",
    string: ":attribute måste vara lika med eller kortare än :value tecken.",
    array: ":attribute måste innehålla lika många eller färre än :value objekt."
  },
  max: {
    numeric: ":attribute får inte vara större än :max.",
    file: ":attribute får max vara :max kilobyte stor.",
    string: ":attribute får max innehålla :max tecken.",
    array: ":attribute får inte innehålla mer än :max objekt."
  },
  mimes: ":attribute måste vara en fil av typen: :values.",
  mimetypes: ":attribute måste vara en fil av typen: :values.",
  min: {
    numeric: ":attribute måste vara större än :min.",
    file: ":attribute måste vara minst :min kilobyte stor.",
    string: ":attribute måste innehålla minst :min tecken.",
    array: ":attribute måste innehålla minst :min objekt."
  },
  not_in: ":attribute är ogiltigt.",
  not_regex: "Formatet för :attribute är ogiltigt.",
  numeric: ":attribute måste vara en siffra.",
  present: ":attribute måste finnas med.",
  regex: ":attribute har ogiltigt format.",
  required: ":attribute är obligatoriskt.",
  required_if: ":attribute är obligatoriskt när :other är :value.",
  required_unless: ":attribute är obligatoriskt när inte :other finns bland :values.",
  required_with: ":attribute är obligatoriskt när :values är ifyllt.",
  required_with_all: ":attribute är obligatoriskt när :values är ifyllt.",
  required_without: ":attribute är obligatoriskt när :values ej är ifyllt.",
  required_without_all: ":attribute är obligatoriskt när ingen av :values är ifyllt.",
  same: ":attribute och :other måste vara lika.",
  size: {
    numeric: ":attribute måste vara :size.",
    file: ":attribute får endast vara :size kilobyte stor.",
    string: ":attribute måste innehålla :size tecken.",
    array: ":attribute måste innehålla :size objekt."
  },
  string: ":attribute måste vara en sträng.",
  timezone: ":attribute måste vara en giltig tidszon.",
  unique: ":attribute används redan.",
  uploaded: ":attribute kunde inte laddas upp.",
  url: ":attribute har ett ogiltigt format."
};


/***/ }),
/* 50 */
/***/ ((module) => {

module.exports = {
  accepted: ':attribute kabul edilmeli.',
  after: ':attribute alanı :after alanından sonra olmalıdır.',
  after_or_equal: ':attribute alanı :after_or_equal alanına eşit veya sonra olmalıdır.',
  alpha: ':attribute alanı sadece harflerden oluşabilir.',
  alpha_dash: ':attribute alanı sadece alfa-nümerik, tire ve alt çizgi karakterlerden oluşabilir.',
  alpha_num: ':attribute alanı alfa-nümerik olmalıdır.',
  before: ':attribute alanı :before alanından önce olmalıdır.',
  before_or_equal: ':attribute alanı :before_or_equal alanına eşit veya önce olmalıdır.',
  between: ':attribute alanı :min ile :max arasında olabilir.',
  confirmed: ':attribute uyuşmuyor.',
  email: ':attribute formatı geçersiz.',
  date: ':attribute geöerli bir tarih alanı değil.',
  def: ':attribute hatalar içeriyor.',
  digits: ':attribute sadece rakamlardan oluşabilir.',
  digits_between: ':attribute :min ile :max arasında rakam olmalıdır.',
  different: ':attribute ve :different farklı olmalı.',
  in: 'Seçilen :attribute geçerli değil.',
  integer: ':attribute tam sayı olmalı.',
  hex: ':attribute onaltılık formatta olmalı.',
  min: {
    numeric: ':attribute en az :min olmalı.',
    string: ':attribute en az :min karakter uzunluğunda olmalı.'
  },
  max: {
    numeric: ':attribute en çok :max olabilir.',
    string: ':attribute uzunluğu en çok :max karakter uzunluğunda olabilir.'
  },
  not_in: 'Seçilen :attribute geçerli değil.',
  numeric: ':attribute sayı olmalı.',
  present: ':attribute alanı bulunmalıdır (ancak boş olabilir).',
  required: ':attribute alanı gerekli.',
  required_if: ':attribute alanı :other alanı :value olduğunda gerekli.',
  required_unless: ':attribute alanı :other alanı :value değilse gereklidir.',
  required_with: ':attribute alanı :field boş değilse gereklidir.',
  required_with_all: ':attribute alanı :fields alanları boş değilse gereklidir.',
  required_without: ':attribute alanı :field alanı boşsa gereklidir.',
  required_without_all: ':attribute alanı :fields alanları boşsa gereklidir.',
  same: ':attribute ve :same aynı olmalı.',
  size: {
    numeric: ':attribute :size olmalı.',
    string: ':attribute :size karakter uzunluğunda olmalı.'
  },
  string: ':attribute alfa-numerik olmalı.',
  url: ':attribute formatı geçersiz.',
  regex: ':attribute formatı geçersiz.',
  attributes: {}
};


/***/ }),
/* 51 */
/***/ ((module) => {

module.exports = {
  accepted: ':attribute повиннен бути прийнятий.',
  alpha: 'Поле :attribute може складатись тільки з літер.',
  alpha_dash: 'Поле :attribute може складатись тільки з літер, чисел, дефісів та символів підкреслення.',
  alpha_num: 'Поле :attribute може складатись тільки з літер та чисел.',
  between: 'Значення поля :attribute повинно знаходитись між :min і :max.',
  confirmed: 'Поле :attribute не співпадає з підтвердженням.',
  email: 'Значення поля :attribute повинно бути існуючою електронною адресою.',
  def: 'Поле :attribute містить помилки.',
  digits: 'Довжина числового поля :attribute повинна бути :digits.',
  digits_between: 'Довжина цифрового поля :attribute повинна бути від :min до :max.',
  different: 'Поля :attribute і :different повинні відрізнятись.',
  in: 'Обране значення для :attribute помилкове.',
  integer: 'Значення поля :attribute повинно бути цілим числом.',
  hex: 'Значення поля :attribute повинно бути шістнадцяткового формату',
  min: {
    numeric: 'Значення поля :attribute повинно бути більшим або рівним :min.',
    string: 'Кількість символів в полі :attribute повинна бути не менше :min.'
  },
  max: {
    numeric: 'Значення поля :attribute повинно бути менше або рівне :max.',
    string: 'Кількість символів в полі :attribute не може превищувати :max.'
  },
  not_in: 'Обране значення для :attribute помилкове.',
  numeric: 'Значення поля :attribute повинно бути числом.',
  present: 'Поле :attribute повинно бути присутнім (але може бути пустим).',
  required: 'Поле :attribute обов\'язкове для заповнення.',
  required_if: 'Поле :attribute потрібне у випадку коли значення поля :other рівне :value.',
  same: 'Значеня поля :attribute повинно співпадати з :same.',
  size: {
    numeric: 'Значення поля :attribute повинно бути рівним :size.',
    string: 'Кількість символів в полі :attribute повинна бути рівною :size.'
  },
  url: 'Поле :attribute повинне містити валідний URL.',
  regex: 'Неправильний формат значення :attribute.',
  attributes: {}
};


/***/ }),
/* 52 */
/***/ ((module) => {

module.exports = {
  accepted: "Ви повинні прийняти :attribute.",
  active_url: "Поле :attribute не є правильним URL.",
  after: "Поле :attribute має містити дату не раніше :date.",
  after_or_equal: "Поле :attribute має містити дату не раніше або дорівнюватися :date.",
  alpha: "Поле :attribute має містити лише літери.",
  alpha_dash: "Поле :attribute має містити лише літери, цифри та підкреслення.",
  alpha_num: "Поле :attribute має містити лише літери та цифри.",
  attributes: {},
  array: "Поле :attribute має бути масивом.",
  before: "Поле :attribute має містити дату не пізніше :date.",
  before_or_equal: "Поле :attribute має містити дату не пізніше або дорівнюватися :date.",
  between: {
    numeric: "Поле :attribute має бути між :min та :max.",
    file: "Розмір файлу в полі :attribute має бути не менше :min та не більше :max кілобайт.",
    string: "Текст в полі :attribute має бути не менше :min та не більше :max символів.",
    array: "Поле :attribute має містити від :min до :max елементів."
  },
  boolean: "Поле :attribute повинне містити логічний тип.",
  confirmed: "Поле :attribute не збігається з підтвердженням.",
  date: "Поле :attribute не є датою.",
  date_format: "Поле :attribute не відповідає формату :format.",
  different: "Поля :attribute та :other повинні бути різними.",
  digits: "Довжина цифрового поля :attribute повинна дорівнювати :digits.",
  digits_between: "Довжина цифрового поля :attribute повинна бути від :min до :max.",
  dimensions: "Поле :attribute містіть неприпустимі розміри зображення.",
  distinct: "Поле :attribute містить значення, яке дублюється.",
  email: "Поле :attribute повинне містити коректну електронну адресу.",
  file: "Поле :attribute має містити файл.",
  filled: "Поле :attribute є обов'язковим для заповнення.",
  exists: "Вибране для :attribute значення не коректне.",
  gt: {
    numeric: "The :attribute must be greater than :value.",
    file: "The :attribute must be greater than :value kilobytes.",
    string: "The :attribute must be greater than :value characters.",
    array: "The :attribute must have more than :value items."
  },
  gte: {
    numeric: "The :attribute must be greater than or equal :value.",
    file: "The :attribute must be greater than or equal :value kilobytes.",
    string: "The :attribute must be greater than or equal :value characters.",
    array: "The :attribute must have :value items or more."
  },
  hex: "The :attribute field should have hexadecimal format",
  image: "Поле :attribute має містити зображення.",
  in: "Вибране для :attribute значення не коректне.",
  in_array: "Значення поля :attribute не міститься в :other.",
  integer: "Поле :attribute має містити ціле число.",
  ip: "Поле :attribute має містити IP адресу.",
  ipv4: "Поле :attribute має містити IPv4 адресу.",
  ipv6: "Поле :attribute має містити IPv6 адресу.",
  json: "Дані поля :attribute мають бути в форматі JSON.",
  lt: {
    numeric: "The :attribute must be less than :value.",
    file: "The :attribute must be less than :value kilobytes.",
    string: "The :attribute must be less than :value characters.",
    array: "The :attribute must have less than :value items."
  },
  lte: {
    numeric: "The :attribute must be less than or equal :value.",
    file: "The :attribute must be less than or equal :value kilobytes.",
    string: "The :attribute must be less than or equal :value characters.",
    array: "The :attribute must not have more than :value items."
  },
  max: {
    numeric: "Поле :attribute має бути не більше :max.",
    file: "Файл в полі :attribute має бути не більше :max кілобайт.",
    string: "Текст в полі :attribute повинен мати довжину не більшу за :max.",
    array: "Поле :attribute повинне містити не більше :max елементів."
  },
  mimes: "Поле :attribute повинне містити файл одного з типів: :values.",
  mimetypes: "Поле :attribute повинне містити файл одного з типів: :values.",
  min: {
    numeric: "Поле :attribute повинне бути не менше :min.",
    file: "Розмір файлу в полі :attribute має бути не меншим :min кілобайт.",
    string: "Текст в полі :attribute повинен містити не менше :min символів.",
    array: "Поле :attribute повинне містити не менше :min елементів."
  },
  not_in: "Вибране для :attribute значення не коректне.",
  not_regex: "The :attribute format is invalid.",
  numeric: "Поле :attribute повинно містити число.",
  present: "Поле :attribute повинне бути присутнє.",
  regex: "Поле :attribute має хибний формат.",
  required: "Поле :attribute є обов'язковим для заповнення.",
  required_if: "Поле :attribute є обов'язковим для заповнення, коли :other є рівним :value.",
  required_unless: "Поле :attribute є обов'язковим для заповнення, коли :other відрізняється від :values",
  required_with: "Поле :attribute є обов'язковим для заповнення, коли :values вказано.",
  required_with_all: "Поле :attribute є обов'язковим для заповнення, коли :values вказано.",
  required_without: "Поле :attribute є обов'язковим для заповнення, коли :values не вказано.",
  required_without_all: "Поле :attribute є обов'язковим для заповнення, коли :values не вказано.",
  same: "Поля :attribute та :other мають співпадати.",
  size: {
    numeric: "Поле :attribute має бути довжини :size.",
    file: "Файл в полі :attribute має бути розміром :size кілобайт.",
    string: "Текст в полі :attribute повинен містити :size символів.",
    array: "Поле :attribute повинне містити :size елементів."
  },
  string: "Поле :attribute повинне містити текст.",
  timezone: "Поле :attribute повинне містити коректну часову зону.",
  unique: "Таке значення поля :attribute вже існує.",
  uploaded: "Завантаження поля :attribute не вдалося.",
  url: "Формат поля :attribute неправильний."
};


/***/ }),
/* 53 */
/***/ ((module) => {

module.exports = {
  accepted: ':attribute phải được chấp nhận.',
  alpha: 'Trường :attribute phải là ký tự',
  alpha_dash: ':attribute chỉ chấp nhận ký tự chữ cái, số, dấu gạch chéo và gạch dưới.',
  alpha_num: ':attribute phải là ký tự chữ cái hoặc chữ số.',
  between: ':attribute phải nằm trong khoảng :min và :max.',
  confirmed: ':attribute xác nhận không trùng khớp.',
  email: ':attribute không phải là email.',
  date: ':attribute không phải là ngày hợp lệ',
  def: 'Thuộc tính :attribute có lỗi.',
  digits: ':attribute phải là số và có chiều dài bằng :digits.',
  digits_between: 'Độ dài của trường :attribute phải nằm trong khoảng :min and :max chữ số.',
  different: 'Giá trị của hai trường :attribute và :different phải khác nhau.',
  in: 'Giá trị được chọn của :attribute không hợp lệ.',
  integer: ':attribute phải là số nguyên.',
  hex: 'The :attribute should have hexadecimal format',
  min: {
    numeric: ':attribute phải lớn hơn hoặc bằng :min.',
    string: ':attribute phải có ít nhất :min ký tự.'
  },
  max: {
    numeric: ':attribute phải nhỏ hơn hoặc bằng :max.',
    string: ':attribute phải có ít hơn :max ký tự.'
  },
  not_in: 'Giá trị được chọn của trường :attribute không hợp lệ.',
  numeric: ':attribute phải là số.',
  present: 'Trường :attribute phải có mặt (nhưng có thể để trống).',
  required: ':attribute bắt buộc nhập.',
  required_if: ':attribute là bắt buộc khi :other có giá trị :value.',
  same: 'Giá trị của :attribute và :same phải như nhau.',
  size: {
    numeric: ':attribute phải có chiều dài của bằng :size.',
    string: 'Số ký tự của :attribute phải là :size ký tự.'
  },
  string: ':attribute không phải là một chuỗi',
  url: ':attribute không phải là một Url hợp lệ.',
  regex: ':attribute không đúng định dạng',
  attributes: {}
};


/***/ }),
/* 54 */
/***/ ((module) => {

module.exports = {
  accepted: ':attribute必须是可接受的.',
  alpha: ':attribute只能包含字母.',
  alpha_dash: ':attribute只能包含字母,连字符和下划线.',
  alpha_num: ':attribute只能包含字母和数字.',
  between: ':attribute的(大小,长度等)只能在:min和:max之间.',
  confirmed: ':attribute确认不一致.',
  email: ':attribute格式不正确.',
  date: ':attribute日期格式错误.',
  def: ':attribute属性错误.',
  digits: ':attribute必须是:digits位小数.',
  digits_between: ':attribute 必须是介于 :min 和 :max 位的数字。',
  different: ':attribute和:different必须不同.',
  in: '选择的:attribute无效',
  integer: ':attribute必须是一个整数.',
  hex: 'The :attribute should have hexadecimal format',
  min: {
    numeric: ':attribute不能小于:min.',
    string: ':attribute长度不能小于:min.'
  },
  max: {
    numeric: ':attribute不能大于:max.',
    string: ':attribute长度不能大于:max.'
  },
  not_in: '所选的:attribute无效.',
  numeric: ':attribute必须是一个数字.',
  present: 'The :attribute field must be present (but can be empty).',
  required: ':attribute不能为空.',
  required_if: '当:other是:value时,:attribute不能为空.',
  same: ':attribute和:same必须一致.',
  size: {
    numeric: ':attribute必须等于:size.',
    string: ':attribute的长度必须等于:size.'
  },
  string: ':attribute必须是一个字符串.',
  url: ':attribute格式不正确.',
  regex: ':attribute格式不正确.',
  attributes: {}
};


/***/ }),
/* 55 */
/***/ ((module) => {

module.exports = {
  accepted: ':attribute必須接受。',
  alpha: ':attribute只能包含字母。',
  alpha_dash: ':attribute只能包含字母，連字符和下划線。',
  alpha_num: ':attribute只能包含字母和數字。',
  between: ':attribute的值只能在:min和:max之間。',
  confirmed: ':attribute與確認輸入不一致。',
  email: ':attribute的格式錯誤。',
  date: ':attribute的日期格式錯誤。',
  def: ':attribute屬性錯誤。',
  digits: ':attribute必須是:digits位小數。',
  digits_between: ':attribute 必須介於 :min 至 :max 位數字。',
  different: ':attribute和:different必須不同。',
  in: '選擇的:attribute無效',
  integer: ':attribute必須是一個整數。',
  hex: ':attribute 必須是十六進位格式',
  min: {
    numeric: ':attribute不能小於:min。',
    string: ':attribute的長度不能小於:min.'
  },
  max: {
    numeric: ':attribute不能大於:max。',
    string: ':attribute的長度不能大於:max.'
  },
  not_in: '所選的:attribute無效。',
  numeric: ':attribute必須是一個數字。',
  present: ':attribute 一定要有值 (可以是空值)。',
  required: ':attribute不能空白。',
  required_if: '當:other是:value時,:attribute不能空白。',
  same: ':attribute和:same必須一致。',
  size: {
    numeric: ':attribute必須等於:size。',
    string: ':attribute的長度必須等於:size.'
  },
  string: ':attribute必須是一個字串。',
  url: ':attribute格式不正確。',
  regex: ':attribute格式不正確。',
  attributes: {}
};


/***/ }),
/* 56 */
/***/ ((module) => {

var Errors = function() {
  this.errors = {};
};

Errors.prototype = {
  constructor: Errors,

  /**
   * Add new error message for given attribute
   *
   * @param  {string} attribute
   * @param  {string} message
   * @return {void}
   */
  add: function(attribute, message) {
    if (!this.has(attribute)) {
      this.errors[attribute] = [];
    }

    if (this.errors[attribute].indexOf(message) === -1) {
      this.errors[attribute].push(message);
    }
  },

  /**
   * Returns an array of error messages for an attribute, or an empty array
   *
   * @param  {string} attribute A key in the data object being validated
   * @return {array} An array of error messages
   */
  get: function(attribute) {
    if (this.has(attribute)) {
      return this.errors[attribute];
    }

    return [];
  },

  /**
   * Returns the first error message for an attribute, false otherwise
   *
   * @param  {string} attribute A key in the data object being validated
   * @return {string|false} First error message or false
   */
  first: function(attribute) {
    if (this.has(attribute)) {
      return this.errors[attribute][0];
    }

    return false;
  },

  /**
   * Get all error messages from all failing attributes
   *
   * @return {Object} Failed attribute names for keys and an array of messages for values
   */
  all: function() {
    return this.errors;
  },

  /**
   * Determine if there are any error messages for an attribute
   *
   * @param  {string}  attribute A key in the data object being validated
   * @return {boolean}
   */
  has: function(attribute) {
    if (this.errors.hasOwnProperty(attribute)) {
      return true;
    }

    return false;
  }
};

module.exports = Errors;


/***/ }),
/* 57 */
/***/ ((module) => {

function AsyncResolvers(onFailedOne, onResolvedAll) {
  this.onResolvedAll = onResolvedAll;
  this.onFailedOne = onFailedOne;
  this.resolvers = {};
  this.resolversCount = 0;
  this.passed = [];
  this.failed = [];
  this.firing = false;
}

AsyncResolvers.prototype = {

  /**
   * Add resolver
   *
   * @param {Rule} rule
   * @return {integer}
   */
  add: function(rule) {
    var index = this.resolversCount;
    this.resolvers[index] = rule;
    this.resolversCount++;
    return index;
  },

  /**
   * Resolve given index
   *
   * @param  {integer} index
   * @return {void}
   */
  resolve: function(index) {
    var rule = this.resolvers[index];
    if (rule.passes === true) {
      this.passed.push(rule);
    } else if (rule.passes === false) {
      this.failed.push(rule);
      this.onFailedOne(rule);
    }

    this.fire();
  },

  /**
   * Determine if all have been resolved
   *
   * @return {boolean}
   */
  isAllResolved: function() {
    return (this.passed.length + this.failed.length) === this.resolversCount;
  },

  /**
   * Attempt to fire final all resolved callback if completed
   *
   * @return {void}
   */
  fire: function() {

    if (!this.firing) {
      return;
    }

    if (this.isAllResolved()) {
      this.onResolvedAll(this.failed.length === 0);
    }

  },

  /**
   * Enable firing
   *
   * @return {void}
   */
  enableFiring: function() {
    this.firing = true;
  }

};

module.exports = AsyncResolvers;


/***/ }),
/* 58 */
/***/ ((module) => {

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

  tol = tol || 1E-8;
  //var ax,bx,f,tol;
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
  }
  //
  //  c is the squared inverse of the golden ratio
  //
  c = 0.5 * (3.0 - Math.sqrt(5.0));
  //
  //  eps is approximately the square root of the relative machine
  //  precision.
  //
  eps = Math.sqrt(2.220446049250313e-16);
  //
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
  fw = fx;
  //
  //  main loop starts here
  //
  for (;;) {
    i++;
    xm = 0.5 * (a + b);
    tol1 = eps * Math.abs(x) + tol / 3.0;
    tol2 = 2.0 * tol1;
    //
    // check stopping criterion
    //
    if (Math.abs(x - xm) <= tol2 - 0.5 * (b - a)) {
      break;
    }
    //
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
      e = d;
      //
      //  is parabola acceptable
      //
      if (Math.abs(p) < Math.abs(0.5 * q * r) && p > q * (a - x) && p < q * (b - x)) {
        //
        //  a parabolic interpolation step
        //
        d = p / q;
        u = x + d;
        //
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
    }
    //
    //  f must not be evaluated too close to x
    //
    if (Math.abs(d) >= tol1) {
      u = x + d;
    }
    if (Math.abs(d) < tol1) {
      u = x + sign(tol1, d);
    }
    fu = f(u);
    //
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
/* 59 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory(__webpack_require__(60), __webpack_require__(61), (function webpackLoadOptionalExternalModule() { try { return __webpack_require__(117); } catch(e) {} }()));
	else // removed by dead control flow
{}
})(this, function(__WEBPACK_EXTERNAL_MODULE_186__, __WEBPACK_EXTERNAL_MODULE_187__, __WEBPACK_EXTERNAL_MODULE_185__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __nested_webpack_require_1187__(moduleId) {
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __nested_webpack_require_1187__);
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
/******/ 	__nested_webpack_require_1187__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__nested_webpack_require_1187__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__nested_webpack_require_1187__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__nested_webpack_require_1187__.d = function(exports, name, getter) {
/******/ 		if(!__nested_webpack_require_1187__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__nested_webpack_require_1187__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__nested_webpack_require_1187__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__nested_webpack_require_1187__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__nested_webpack_require_1187__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __nested_webpack_require_1187__(__nested_webpack_require_1187__.s = 136);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __nested_webpack_require_3628__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_3628__(1);
const debug_R_Q_P01_boundaries = debug('R_Q_P01_boundaries');
const debug_R_Q_P01_check = debug('R_Q_P01_check');
exports.M_SQRT2 = 1.41421356237309504880168872421;
exports.frac = (x) => x - Math.trunc(x);
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
exports.R_D__1 = (logP) => {
    return logP ? 0 : 1.0;
};
exports.R_D__0 = (logP) => {
    return logP ? Number.NEGATIVE_INFINITY : 0.0;
};
exports.R_DT_0 = (lower_tail, log_p) => {
    return lower_tail ? exports.R_D__0(log_p) : exports.R_D__1(log_p);
};
exports.R_DT_1 = (lower_tail, log_p) => {
    return lower_tail ? exports.R_D__1(log_p) : exports.R_D__0(log_p);
};
exports.R_D_val = (log_p, x) => {
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
    if (x <= x_min)
        return exports.R_DT_0(lower_tail, log_p);
    if (x >= x_max)
        return exports.R_DT_1(lower_tail, log_p);
    return undefined;
}
exports.R_P_bounds_01 = R_P_bounds_01;
exports.R_D_exp = (log_p, x) => {
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
exports.mapErr = new Map([
    [ME.ME_NONE, 'No error'],
    [ME.ME_DOMAIN, "argument out of domain in '%s'"],
    [ME.ME_RANGE, "argument out of domain in '%s'"],
    [ME.ME_NOCONV, "convergence failed in '%s'"],
    [ME.ME_PRECISION, "full precision may not have been achieved in '%s'"],
    [ME.ME_UNDERFLOW, "underflow occurred in '%s'"]
]);
exports.ML_ERROR = (x, s, printer) => {
    const str = exports.mapErr.get(x);
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
    if (Number.isNaN(x))
        return x;
    if (!isFinite(x))
        return x;
    if (Number.isNaN(target))
        return x;
    if (!isFinite(target))
        return x;
    let diff = x - target;
    if (diff > Number.EPSILON || diff < -Number.EPSILON) {
        return x;
    }
    return target;
}
exports.epsilonNear = epsilonNear;
function isEpsilonNear(x, target) {
    if (isFinite(x) && isFinite(target))
        return epsilonNear(x, target) === target;
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
    let pow = 1.0;
    if (Number.isNaN(x))
        return x;
    if (n !== 0) {
        if (!Number.isFinite(x))
            return R_pow(x, n);
        if (n < 0) {
            n = -n;
            x = 1 / x;
        }
        while (true) {
            if (n & 1)
                pow *= x;
            if ((n >>= 1))
                x *= x;
            else
                break;
        }
    }
    return pow;
}
exports.R_pow_di = R_pow_di;
function R_pow(x, y) {
    if (y === 2.0)
        return x * x;
    if (x === 1 || y === 0)
        return 1;
    if (x === 0) {
        if (y > 0)
            return 0;
        else if (y < 0)
            return Number.POSITIVE_INFINITY;
        else
            return y;
    }
    if (Number.isFinite(x) && Number.isFinite(y)) {
        return Math.pow(x, y);
    }
    if (Number.isNaN(x) || Number.isNaN(y))
        return x + y;
    if (!Number.isFinite(x)) {
        if (x > 0)
            return y < 0 ? 0 : Number.POSITIVE_INFINITY;
        else {
            if (Number.isFinite(y) && y === Math.floor(y))
                return y < 0 ? 0 : myfmod(y, 2) ? x : -x;
        }
    }
    if (!Number.isFinite(y)) {
        if (x >= 0) {
            if (y > 0)
                return x >= 1 ? Number.POSITIVE_INFINITY : 0;
            else
                return x < 1 ? Number.POSITIVE_INFINITY : 0;
        }
    }
    return NaN;
}
exports.R_pow = R_pow;
exports.R_finite = (x) => !Number.isFinite(x);
exports.R_isnancpp = (x) => Number.isNaN(x);
function myfmod(x1, x2) {
    let q = x1 / x2;
    return x1 - Math.floor(q) * x2;
}
exports.myfmod = myfmod;
function R_powV(x, y) {
    if (x === 1 || y === 0)
        return 1;
    if (x === 0) {
        if (y > 0)
            return 0;
        return Number.POSITIVE_INFINITY;
    }
    if (Number.isFinite(x) && Number.isFinite(y))
        return Math.pow(x, y);
    if (Number.isNaN(x) || Number.isNaN(y)) {
        return x + y;
    }
    if (!Number.isFinite(x)) {
        if (x > 0)
            return y < 0 ? 0 : Number.POSITIVE_INFINITY;
        else {
            if (Number.isFinite(y) && y === Math.floor(y))
                return y < 0 ? 0 : myfmod(y, 2) ? x : -x;
        }
    }
    if (!Number.isFinite(y)) {
        if (x >= 0) {
            if (y > 0)
                return x >= 1 ? Number.POSITIVE_INFINITY : 0;
            else
                return x < 1 ? Number.POSITIVE_INFINITY : 0;
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
        if (p === 0)
            return lower_tail ? _RIGHT_ : _LEFT_;
        if (p === Number.NEGATIVE_INFINITY)
            return lower_tail ? _LEFT_ : _RIGHT_;
    }
    else {
        if (p < 0 || p > 1) {
            return ML_ERR_return_NAN(debug_R_Q_P01_boundaries);
        }
        if (p === 0)
            return lower_tail ? _LEFT_ : _RIGHT_;
        if (p === 1)
            return lower_tail ? _RIGHT_ : _LEFT_;
    }
    return undefined;
}
exports.R_Q_P01_boundaries = R_Q_P01_boundaries;
function R_Q_P01_check(logP, p) {
    if ((logP && p > 0) || (!logP && (p < 0 || p > 1))) {
        return ML_ERR_return_NAN(debug_R_Q_P01_check);
    }
    return undefined;
}
exports.R_Q_P01_check = R_Q_P01_check;
function R_D_qIv(logP, p) {
    return logP ? Math.exp(p) : p;
}
exports.R_D_qIv = R_D_qIv;


/***/ }),
/* 1 */
/***/ (function(module, exports, __nested_webpack_require_12992__) {

/**
 * Detect Electron renderer process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer') {
  module.exports = __nested_webpack_require_12992__(182);
} else {
  module.exports = __nested_webpack_require_12992__(183);
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __nested_webpack_require_13337__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const { abs, sign, floor, trunc, max } = Math;
const { isNaN } = Number;
const { isArray } = Array;
const debug = __nested_webpack_require_13337__(1);
const printer_seq = debug('seq');
const precision9 = numberPrecision(9);
function isOdd(n) {
    if (isFinite(n)) {
        return floor(n / 2) * 2 < n;
    }
    throw new Error(`Not a finite Number: ${n}`);
}
exports.isOdd = isOdd;
exports.seq = (adjust = 0) => (adjustMin = adjust) => (start, end, step = 1) => {
    if (end === undefined) {
        if (start <= 0 || start === undefined) {
            return [];
        }
        end = 1;
    }
    let s = start + adjust;
    let e = end + adjust;
    let cursor = s;
    if (end < start) {
        e = start + adjustMin;
        s = end + adjustMin;
        cursor = e;
    }
    step = abs(step) * sign(end - start);
    printer_seq('step:%d', step);
    const rc = [];
    do {
        rc.push(cursor);
        cursor += step;
    } while (precision9(cursor) >= s && precision9(cursor) <= e && step !== 0);
    return precision9(rc);
};
function selector(...rest) {
    const flat = flatten(rest);
    return (val, idx) => {
        return flat.indexOf(idx) >= 0;
    };
}
exports.selector = selector;
function flatten(...rest) {
    let rc = [];
    for (const itm of rest) {
        if (isArray(itm)) {
            let rc2 = flatten(...itm);
            rc.push(...rc2);
            continue;
        }
        rc.push(itm);
    }
    return rc;
}
exports.flatten = flatten;
function arrayrify(fn) {
    return function (x, ...rest) {
        const fp = Array.isArray(x) ? x : [x];
        const result = fp.map(p => fn(p, ...rest));
        return result.length === 1 ? result[0] : result;
    };
}
exports.arrayrify = arrayrify;
function multiplex(fn) {
    return function (...rest) {
        return multiplexer(...rest)(fn);
    };
}
exports.multiplex = multiplex;
function asArray(fn) {
    return function (...rest) {
        const ans = fn(...rest);
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
    if (typeof o === 'number') {
        return [{ key: 0, val: o }];
    }
    if (isArray(o)) {
        return o.map((x, idx) => ({ key: idx, val: x }));
    }
    if (typeof o === 'string') {
        return o.split('').map((x, idx) => ({ key: idx, val: x }));
    }
    if (typeof o === 'object') {
        const names = Object.getOwnPropertyNames(o);
        if (names.length === 0) {
            throw new Error('Input argument is an Object with no properties');
        }
        return names.map(name => ({ key: name, val: o[name] }));
    }
    throw new Error('unreachable code');
}
function multiplexer(...rest) {
    const analyzed = [];
    for (let k = 0; k < rest.length; k++) {
        const arg = rest[k];
        if (arg === null) {
            analyzed.push([arg]);
            continue;
        }
        if (['undefined', 'boolean', 'number'].indexOf(typeof arg) >= 0) {
            analyzed.push([arg]);
            continue;
        }
        if (typeof arg === 'string') {
            analyzed.push(arg.split(''));
            continue;
        }
        if (Array.isArray(arg)) {
            analyzed.push(arg);
            continue;
        }
        if (arg instanceof Object) {
            throw new Error('Sorry, looping over properties not yet supported');
        }
        if (arg instanceof Function) {
            throw new Error('Sorry function arguments are not yet supported');
        }
    }
    const _max = max(...analyzed.map(a => a.length));
    return function (fn) {
        const rc = [];
        for (let k = 0; k < _max; k++) {
            const result = [];
            for (let j = 0; j < analyzed.length; j++) {
                const arr = analyzed[j];
                const idx = k % arr.length;
                result.push(arr[idx]);
            }
            rc.push(fn(...result));
        }
        return possibleScalar(rc);
    };
}
exports.multiplexer = multiplexer;
function iter(wantMap = true) {
    return function (xx) {
        const fx = coerceToArray(xx);
        return function (fn) {
            return wantMap
                ? possibleScalar(fx.map(o => fn(o.val, o.key)))
                : fx.forEach(o => fn(o.val, o.key));
        };
    };
}
exports.map = iter();
exports.each = iter(false);
function numberPrecision(prec = 6) {
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
        return x.find(d => d === fn) !== undefined;
    };
}
exports.any = any;
function sum(x) {
    let rc = 0;
    for (let i = 0; i < x.length; i++) {
        if (isArray(x[i])) {
            rc += sum(x[i]);
            continue;
        }
        if (typeof x[i] === 'string') {
            const trial = Number.parseFloat(x[i]);
            if (Number.isFinite(trial)) {
                rc += trial;
                continue;
            }
            throw Error(`${x[i]} is not a number or can be coerced to a number`);
        }
        if (typeof x[i] === 'number' && Number.isFinite(x[i])) {
            rc += x[i];
            continue;
        }
        throw new Error(`${x[i]} is not a number`);
    }
    return rc;
}
exports.sum = sum;
exports.div = multiplex((a, b) => a / b);
exports.mult = multiplex((a, b) => a * b);
function summary(x) {
    if (!Array.isArray(x)) {
        throw new Error(`Illigal argument, not an array`);
    }
    if (x.length === 0) {
        throw new Error(`argument Array is empty`);
    }
    if (x.findIndex(v => isNaN(v)) >= 0) {
        throw new Error(`argument Array has NaNs`);
    }
    const N = x.length;
    const mu = sum(x) / N;
    let relX2 = 0;
    for (let i = 0; i < x.length; i++) {
        relX2 += (x[i] - mu) * (x[i] - mu);
    }
    const sampleVariance = relX2 / (N - 1);
    const populationVariance = (sampleVariance * (N - 1)) / N;
    const sampleSD = Math.sqrt(sampleVariance);
    const populationSD = Math.sqrt(populationVariance);
    const o = x.sort((a, b) => a - b);
    const min = o[0];
    const max = o[N - 1];
    const { q1, median, q3 } = (function () {
        const i = [4, 2, 4 / 3].map(v => (N - 1) / v);
        const q = i.map(index => {
            const f1 = 1 - (index - floor(index));
            const f2 = 1 - f1;
            return o[trunc(index)] * f1 + o[trunc(index) + 1] * f2;
        });
        return {
            q1: q[0],
            median: q[1],
            q3: q[2]
        };
    })();
    return {
        N,
        mu,
        population: {
            variance: populationVariance,
            sd: populationSD
        },
        sample: {
            variance: sampleVariance,
            sd: sampleSD
        },
        relX: 'depricated',
        relX2: 'depricated',
        stats: {
            min,
            '1st Qu.': q1,
            median,
            '3rd Qu.': q3,
            max
        }
    };
}
exports.summary = summary;
function Welch_Satterthwaite(s, n) {
    const elts = flatten(exports.map(s)((_s, i) => {
        return (_s * _s) / n[i];
    }));
    const dom = elts.map((e, i) => (e * e) / (n[i] - 1));
    return Math.pow(sum(elts), 2) / sum(dom);
}
exports.Welch_Satterthwaite = Welch_Satterthwaite;


/***/ }),
/* 3 */
/***/ (function(module, exports, __nested_webpack_require_21237__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _general_1 = __nested_webpack_require_21237__(0);
const { exp, expm1, log, log1p } = Math;
function R_DT_qIv(lower_tail, log_p, p) {
    return log_p ? (lower_tail ? exp(p) : -expm1(p)) : _general_1.R_D_Lval(lower_tail, p);
}
exports.R_DT_qIv = R_DT_qIv;
function R_DT_CIv(lower_tail, log_p, p) {
    return log_p ? (lower_tail ? -expm1(p) : exp(p)) : _general_1.R_D_Cval(lower_tail, p);
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
    return lower_tail
        ? R_D_LExp(log_p, p)
        : _general_1.R_D_log(log_p, p);
}
exports.R_DT_Clog = R_DT_Clog;
function R_DT_log(lower_tail, log_p, p) {
    return lower_tail ? _general_1.R_D_log(log_p, p) : R_D_LExp(log_p, p);
}
exports.R_DT_log = R_DT_log;


/***/ }),
/* 4 */
/***/ (function(module, exports, __nested_webpack_require_22383__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const r_func_1 = __nested_webpack_require_22383__(2);
const lgammafn_sign_1 = __nested_webpack_require_22383__(67);
function lgammafn(x) {
    return r_func_1.map(x)(fx => {
        return lgammafn_sign_1.lgammafn_sign(fx);
    });
}
exports.lgammafn = lgammafn;


/***/ }),
/* 5 */
/***/ (function(module, exports, __nested_webpack_require_22775__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const N = 624;
const M = 397;
const MATRIX_A = 0x9908b0df;
const UPPER_MASK = 0x80000000;
const LOWER_MASK = 0x7fffffff;
const TEMPERING_MASK_B = 0x9d2c5680;
const TEMPERING_MASK_C = 0xefc60000;
const fixup_1 = __nested_webpack_require_22775__(20);
const irng_1 = __nested_webpack_require_22775__(7);
const irng_type_1 = __nested_webpack_require_22775__(14);
const timeseed_1 = __nested_webpack_require_22775__(10);
const SEED_LEN = 625;
class MersenneTwister extends irng_1.IRNG {
    MT_sgenrand(seed) {
        for (let i = 0; i < N; i++) {
            this.mt[i] = seed & 0xffff0000;
            seed = 69069 * seed + 1;
            this.mt[i] |= (seed & 0xffff0000) >>> 16;
            seed = 69069 * seed + 1;
        }
        this.mti = N;
    }
    MT_genrand() {
        let y = new Int32Array(1);
        let mag01 = new Int32Array([0x0, MATRIX_A]);
        const dummy = this.m_seed;
        this.mti = dummy[0];
        if (this.mti >= N) {
            let kk;
            if (this.mti === N + 1)
                this.MT_sgenrand(4357);
            for (kk = 0; kk < N - M; kk++) {
                y[0] = (this.mt[kk] & UPPER_MASK) | (this.mt[kk + 1] & LOWER_MASK);
                this.mt[kk] = this.mt[kk + M] ^ (y[0] >>> 1) ^ mag01[y[0] & 0x1];
            }
            for (; kk < N - 1; kk++) {
                y[0] = (this.mt[kk] & UPPER_MASK) | (this.mt[kk + 1] & LOWER_MASK);
                this.mt[kk] = this.mt[kk + (M - N)] ^ (y[0] >>> 1) ^ mag01[y[0] & 0x1];
            }
            y[0] = (this.mt[N - 1] & UPPER_MASK) | (this.mt[0] & LOWER_MASK);
            this.mt[N - 1] = this.mt[M - 1] ^ (y[0] >>> 1) ^ mag01[y[0] & 0x1];
            this.mti = 0;
        }
        y[0] = this.mt[this.mti++];
        y[0] ^= y[0] >>> 11;
        y[0] ^= (y[0] << 7) & TEMPERING_MASK_B;
        y[0] ^= (y[0] << 15) & TEMPERING_MASK_C;
        y[0] ^= y[0] >>> 18;
        dummy[0] = this.mti;
        return (new Uint32Array(y.buffer)[0] * 2.3283064365386963e-10);
    }
    fixupSeeds() {
        const s = this.m_seed;
        s[0] = 624;
        if (s[0] <= 0)
            s[0] = 624;
        if (this.mt.find(v => !!v) === undefined) {
            this.init(timeseed_1.timeseed());
        }
        return;
    }
    constructor(_seed = timeseed_1.timeseed()) {
        super(_seed);
    }
    _setup() {
        const buf = new ArrayBuffer(SEED_LEN * 4);
        this._kind = irng_type_1.IRNGType.MERSENNE_TWISTER;
        this._name = 'Mersenne-Twister';
        this.m_seed = new Int32Array(buf).fill(0);
        this.mt = new Int32Array(buf, 4);
        this.mti = N + 1;
    }
    init(_seed = timeseed_1.timeseed()) {
        const s = new Uint32Array([0]);
        s[0] = _seed;
        for (let j = 0; j < 50; j++) {
            s[0] = 69069 * s[0] + 1;
        }
        for (let j = 0; j < this.m_seed.length; j++) {
            s[0] = 69069 * s[0] + 1;
            this.m_seed[j] = s[0];
        }
        this.fixupSeeds();
        super.init(_seed);
    }
    internal_unif_rand() {
        let rc = this.MT_genrand();
        return fixup_1.fixup(rc);
    }
    set seed(_seed) {
        if (_seed.length > this.m_seed.length || _seed.length === 0) {
            this.init(timeseed_1.timeseed());
            return;
        }
        this.m_seed.set(_seed);
    }
    get seed() {
        return Array.from(this.m_seed);
    }
}
exports.MersenneTwister = MersenneTwister;


/***/ }),
/* 6 */
/***/ (function(module, exports, __nested_webpack_require_26291__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_26291__(1);
const _general_1 = __nested_webpack_require_26291__(0);
const expm1_1 = __nested_webpack_require_26291__(3);
const r_func_1 = __nested_webpack_require_26291__(2);
const printer = debug('qnorm');
const { isNaN: ISNAN } = Number;
const { log, sqrt, abs: fabs } = Math;
const ML_NEGINF = -Infinity;
const ML_POSINF = Infinity;
function qnorm(p, mu = 0, sigma = 1, lower_tail = true, log_p = false) {
    let q;
    let p_;
    let r;
    let val;
    return r_func_1.map(p)(fx => {
        if (ISNAN(fx) || ISNAN(mu) || ISNAN(sigma))
            return fx + mu + sigma;
        let rc = _general_1.R_Q_P01_boundaries(lower_tail, log_p, fx, ML_NEGINF, ML_POSINF);
        if (rc !== undefined) {
            return rc;
        }
        if (sigma < 0)
            return _general_1.ML_ERR_return_NAN(printer);
        if (sigma === 0)
            return mu;
        p_ = expm1_1.R_DT_qIv(lower_tail, log_p, fx);
        q = p_ - 0.5;
        printer('qnorm(p=%d, m=%d, s=%d, l.t.= %s, log= %s): q = %d', p, mu, sigma, lower_tail, log_p, q);
        if (fabs(q) <= 0.425) {
            r = 0.180625 - q * q;
            val =
                q *
                    (((((((r * 2509.0809287301226727 + 33430.575583588128105) * r +
                        67265.770927008700853) *
                        r +
                        45921.953931549871457) *
                        r +
                        13731.693765509461125) *
                        r +
                        1971.5909503065514427) *
                        r +
                        133.14166789178437745) *
                        r +
                        3.387132872796366608) /
                    (((((((r * 5226.495278852854561 + 28729.085735721942674) * r +
                        39307.89580009271061) *
                        r +
                        21213.794301586595867) *
                        r +
                        5394.1960214247511077) *
                        r +
                        687.1870074920579083) *
                        r +
                        42.313330701600911252) *
                        r +
                        1);
        }
        else {
            if (q > 0)
                r = expm1_1.R_DT_CIv(lower_tail, log_p, fx);
            else
                r = p_;
            r = sqrt(-(log_p && ((lower_tail && q <= 0) || (!lower_tail && q > 0))
                ? p
                : log(r)));
            printer('close to 0 or 1: r = %7d', r);
            if (r <= 5) {
                r += -1.6;
                val =
                    (((((((r * 7.7454501427834140764e-4 + 0.0227238449892691845833) * r +
                        0.24178072517745061177) *
                        r +
                        1.27045825245236838258) *
                        r +
                        3.64784832476320460504) *
                        r +
                        5.7694972214606914055) *
                        r +
                        4.6303378461565452959) *
                        r +
                        1.42343711074968357734) /
                        (((((((r * 1.05075007164441684324e-9 + 5.475938084995344946e-4) * r +
                            0.0151986665636164571966) *
                            r +
                            0.14810397642748007459) *
                            r +
                            0.68976733498510000455) *
                            r +
                            1.6763848301838038494) *
                            r +
                            2.05319162663775882187) *
                            r +
                            1);
            }
            else {
                r += -5;
                val =
                    (((((((r * 2.01033439929228813265e-7 + 2.71155556874348757815e-5) *
                        r +
                        0.0012426609473880784386) *
                        r +
                        0.026532189526576123093) *
                        r +
                        0.29656057182850489123) *
                        r +
                        1.7848265399172913358) *
                        r +
                        5.4637849111641143699) *
                        r +
                        6.6579046435011037772) /
                        (((((((r * 2.04426310338993978564e-15 + 1.4215117583164458887e-7) *
                            r +
                            1.8463183175100546818e-5) *
                            r +
                            7.868691311456132591e-4) *
                            r +
                            0.0148753612908506148525) *
                            r +
                            0.13692988092273580531) *
                            r +
                            0.59983220655588793769) *
                            r +
                            1);
            }
            if (q < 0.0)
                val = -val;
        }
        return mu + sigma * val;
    });
}
exports.qnorm = qnorm;


/***/ }),
/* 7 */
/***/ (function(module, exports, __nested_webpack_require_31460__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const r_func_1 = __nested_webpack_require_31460__(2);
exports.segFnCache = r_func_1.seq();
class IRNG {
    constructor(_seed) {
        this.notify = new Set();
        this.emit = this.emit.bind(this);
        this.register = this.register.bind(this);
        this.unif_rand = this.unif_rand.bind(this);
        this.internal_unif_rand = this.internal_unif_rand.bind(this);
        this.init = this.init.bind(this);
        this._setup();
        this.init(_seed);
    }
    get name() {
        return this._name;
    }
    get kind() {
        return this._kind;
    }
    init(_seed) {
        this.emit('INIT');
    }
    unif_rand(n = 1) {
        n = (!n || n < 0) ? 1 : n;
        return r_func_1.map(exports.segFnCache()(n))(() => this.internal_unif_rand());
    }
    register(event, handler) {
        this.notify.add({ event, handler });
    }
    emit(event) {
        this.notify.forEach(r => {
            if (r.event === event) {
                r.handler();
            }
        });
    }
}
exports.IRNG = IRNG;


/***/ }),
/* 8 */
/***/ (function(module, exports, __nested_webpack_require_32633__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var buggy_kinderman_ramage_1 = __nested_webpack_require_32633__(155);
exports.BuggyKindermanRamage = buggy_kinderman_ramage_1.BuggyKindermanRamage;
var box_muller_1 = __nested_webpack_require_32633__(154);
exports.BoxMuller = box_muller_1.BoxMuller;
var ahrens_dieter_1 = __nested_webpack_require_32633__(153);
exports.AhrensDieter = ahrens_dieter_1.AhrensDieter;
var inversion_1 = __nested_webpack_require_32633__(72);
exports.Inversion = inversion_1.Inversion;
var kinderman_ramage_1 = __nested_webpack_require_32633__(156);
exports.KindermanRamage = kinderman_ramage_1.KindermanRamage;
var inormal_rng_1 = __nested_webpack_require_32633__(15);
exports.IRNGNormal = inormal_rng_1.IRNGNormal;


/***/ }),
/* 9 */
/***/ (function(module, exports, __nested_webpack_require_33404__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var toms708_1 = __nested_webpack_require_33404__(115);
exports.Toms708 = toms708_1.Toms708;
var NumberW_1 = __nested_webpack_require_33404__(63);
exports.NumberW = NumberW_1.NumberW;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const { trunc, ceil, min, log2, pow } = Math;
const { now } = Date;
function timeseed() {
    const n = now();
    do {
        now();
    } while (now() - n < 500);
    const nBits = min(32, ceil(log2(n)));
    const lowBits = trunc(nBits / 2);
    const hi = trunc(n / pow(2, lowBits));
    const lo = n - hi * pow(2, lowBits);
    const buf = new ArrayBuffer(4);
    const reverser = new Uint8Array(buf);
    const uint32 = new Uint32Array(buf);
    uint32[0] = lo ^ hi;
    reverser.reverse();
    return uint32[0];
}
exports.timeseed = timeseed;


/***/ }),
/* 11 */
/***/ (function(module, exports, __nested_webpack_require_34424__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_34424__(1);
const _general_1 = __nested_webpack_require_34424__(0);
const gamma_fn_1 = __nested_webpack_require_34424__(29);
const lgamma_fn_1 = __nested_webpack_require_34424__(4);
const lgammacor_1 = __nested_webpack_require_34424__(42);
const r_func_1 = __nested_webpack_require_34424__(2);
const { log, log1p } = Math;
const { isNaN: ISNAN, isFinite: R_FINITE, POSITIVE_INFINITY: ML_POSINF, NEGATIVE_INFINITY: ML_NEGINF } = Number;
const printer = debug('lbeta');
function lbeta(_a, _b) {
    return r_func_1.multiplexer(_a, _b)((a, b) => internal_lbeta(a, b));
}
exports.lbeta = lbeta;
function internal_lbeta(a, b) {
    let corr;
    let p;
    let q;
    if (ISNAN(a) || ISNAN(b))
        return a + b;
    p = q = a;
    if (b < p)
        p = b;
    if (b > q)
        q = b;
    if (p < 0)
        return _general_1.ML_ERR_return_NAN(printer);
    else if (p === 0) {
        return ML_POSINF;
    }
    else if (!R_FINITE(q)) {
        return ML_NEGINF;
    }
    if (p >= 10) {
        corr = lgammacor_1.lgammacor(p) + lgammacor_1.lgammacor(q) - lgammacor_1.lgammacor(p + q);
        return (log(q) * -0.5 +
            _general_1.M_LN_SQRT_2PI +
            corr +
            (p - 0.5) * log(p / (p + q)) +
            q * log1p(-p / (p + q)));
    }
    else if (q >= 10) {
        corr = lgammacor_1.lgammacor(q) - lgammacor_1.lgammacor(p + q);
        return (lgamma_fn_1.lgammafn(p) +
            corr +
            p -
            p * log(p + q) +
            (q - 0.5) * log1p(-p / (p + q)));
    }
    else {
        return log(gamma_fn_1.gammafn(p) * (gamma_fn_1.gammafn(q) / gamma_fn_1.gammafn(p + q)));
    }
}
exports.internal_lbeta = internal_lbeta;


/***/ }),
/* 12 */
/***/ (function(module, exports, __nested_webpack_require_36219__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_36219__(1);
const _general_1 = __nested_webpack_require_36219__(0);
const toms708_1 = __nested_webpack_require_36219__(9);
const r_func_1 = __nested_webpack_require_36219__(2);
const { isNaN: ISNAN, isFinite: R_FINITE } = Number;
const { LN2: M_LN2, log } = Math;
const printer_pbeta_raw = debug('pbeta_raw');
function pbeta_raw(x, a, b, lower_tail, log_p) {
    if (a === 0 || b === 0 || !R_FINITE(a) || !R_FINITE(b)) {
        if (a === 0 && b === 0)
            return log_p ? -M_LN2 : 0.5;
        if (a === 0 || a / b === 0)
            return _general_1.R_DT_1(lower_tail, log_p);
        if (b === 0 || b / a === 0)
            return _general_1.R_DT_0(lower_tail, log_p);
        if (x < 0.5)
            return _general_1.R_DT_0(lower_tail, log_p);
        else
            return _general_1.R_DT_1(lower_tail, log_p);
    }
    let x1 = 0.5 - x + 0.5;
    let w = new toms708_1.NumberW(0);
    let wc = new toms708_1.NumberW(0);
    let ierr = new toms708_1.NumberW(0);
    printer_pbeta_raw('before Toms708.bratio, a=%d, b=%d, x=%d, w=%d,wc=%d, ierr=%d', a, b, x, w.val, wc.val, ierr.val);
    toms708_1.Toms708.bratio(a, b, x, x1, w, wc, ierr);
    printer_pbeta_raw('after Toms708.bratio, a=%d, b=%d, x=%d, w=%d,wc=%d, ierr=%d', a, b, x, w.val, wc.val, ierr.val);
    if (ierr.val && ierr.val !== 11 && ierr.val !== 14)
        printer_pbeta_raw('pbeta_raw(%d, a=%d, b=%d, ..) -> bratio() gave error code %d', x, a, b, ierr);
    if (log_p) {
        w.val = log(w.val);
        wc.val = log(wc.val);
    }
    return lower_tail ? w.val : wc.val;
}
exports.pbeta_raw = pbeta_raw;
const printer_pbeta = debug('pbeta');
function pbeta(q, a, b, lowerTail = true, logP = false) {
    return r_func_1.map(q)(x => {
        printer_pbeta('pbeta(q=%d, a=%d, b=%d, l.t=%s, ln=%s)', x, a, b, lowerTail, logP);
        if (ISNAN(x) || ISNAN(a) || ISNAN(b))
            return NaN;
        if (a < 0 || b < 0)
            return _general_1.ML_ERR_return_NAN(printer_pbeta);
        if (x <= 0)
            return _general_1.R_DT_0(lowerTail, logP);
        if (x >= 1)
            return _general_1.R_DT_1(lowerTail, logP);
        return pbeta_raw(x, a, b, lowerTail, logP);
    });
}
exports.pbeta = pbeta;


/***/ }),
/* 13 */
/***/ (function(module, exports, __nested_webpack_require_38573__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_38573__(1);
const _general_1 = __nested_webpack_require_38573__(0);
const rgamma_1 = __nested_webpack_require_38573__(30);
const r_func_1 = __nested_webpack_require_38573__(2);
const { isFinite: R_FINITE } = Number;
const printer = debug('rchisq');
const sequence = r_func_1.seq()();
function rchisq(n, df, rng) {
    return r_func_1.map(sequence(n))(() => {
        if (!R_FINITE(df) || df < 0.0) {
            return _general_1.ML_ERR_return_NAN(printer);
        }
        return rgamma_1.rgamma(1, df / 2.0, 2.0, rng);
    });
}
exports.rchisq = rchisq;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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


/***/ }),
/* 15 */
/***/ (function(module, exports, __nested_webpack_require_39982__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const r_func_1 = __nested_webpack_require_39982__(2);
const irng_1 = __nested_webpack_require_39982__(7);
class IRNGNormal {
    constructor(_rng) {
        this.rng = _rng;
        this.unif_rand = this.unif_rand.bind(this);
        this.norm_rand = this.norm_rand.bind(this);
        this.internal_norm_rand = this.internal_norm_rand.bind(this);
    }
    norm_rand(n = 1) {
        n = !n || n < 0 ? 1 : n;
        return r_func_1.map(irng_1.segFnCache()(n))(() => this.internal_norm_rand());
    }
    unif_rand(n = 1) {
        return this.rng.unif_rand(n);
    }
}
exports.IRNGNormal = IRNGNormal;


/***/ }),
/* 16 */
/***/ (function(module, exports, __nested_webpack_require_40716__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const irng_1 = __nested_webpack_require_40716__(7);
exports.IRNG = irng_1.IRNG;
const knuth_taocp_1 = __nested_webpack_require_40716__(149);
const knuth_taocp_2002_1 = __nested_webpack_require_40716__(148);
const lecuyer_cmrg_1 = __nested_webpack_require_40716__(151);
const marsaglia_multicarry_1 = __nested_webpack_require_40716__(152);
const mersenne_twister_1 = __nested_webpack_require_40716__(5);
const normal_1 = __nested_webpack_require_40716__(8);
const inormal_rng_1 = __nested_webpack_require_40716__(15);
exports.IRNGNormal = inormal_rng_1.IRNGNormal;
const super_duper_1 = __nested_webpack_require_40716__(157);
const timeseed_1 = __nested_webpack_require_40716__(10);
const wichmann_hill_1 = __nested_webpack_require_40716__(158);
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
    WichmannHill: wichmann_hill_1.WichmannHill,
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __nested_webpack_require_42141__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_42141__(1);
const _general_1 = __nested_webpack_require_42141__(0);
const deviance_1 = __nested_webpack_require_42141__(65);
const r_func_1 = __nested_webpack_require_42141__(2);
const stirling_1 = __nested_webpack_require_42141__(44);
const { log, log1p, round: R_forceint } = Math;
const { isNaN: ISNAN, isFinite: R_FINITE } = Number;
const printer = debug('dbinom');
function dbinom_raw(x, n, p, q, give_log) {
    let lf;
    let lc;
    if (p === 0)
        return x === 0 ? _general_1.R_D__1(give_log) : _general_1.R_D__0(give_log);
    if (q === 0)
        return x === n ? _general_1.R_D__1(give_log) : _general_1.R_D__0(give_log);
    if (x === 0) {
        if (n === 0)
            return _general_1.R_D__1(give_log);
        let lc = p < 0.1 ? -deviance_1.bd0(n, n * q) - n * p : n * log(q);
        return _general_1.R_D_exp(give_log, lc);
    }
    if (x === n) {
        lc = q < 0.1 ? -deviance_1.bd0(n, n * p) - n * q : n * log(p);
        return _general_1.R_D_exp(give_log, lc);
    }
    if (x < 0 || x > n)
        return _general_1.R_D__0(give_log);
    lc =
        stirling_1.stirlerr(n) -
            stirling_1.stirlerr(x) -
            stirling_1.stirlerr(n - x) -
            deviance_1.bd0(x, n * p) -
            deviance_1.bd0(n - x, n * q);
    lf = _general_1.M_LN_2PI + log(x) + log1p(-x / n);
    return _general_1.R_D_exp(give_log, lc - 0.5 * lf);
}
exports.dbinom_raw = dbinom_raw;
function dbinom(xx, n, p, logX = false) {
    return r_func_1.map(xx)(x => {
        if (ISNAN(x) || ISNAN(n) || ISNAN(p))
            return x + n + p;
        if (p < 0 || p > 1 || _general_1.R_D_negInonint(n))
            return _general_1.ML_ERR_return_NAN(printer);
        _general_1.R_D_nonint_check(logX, x, printer);
        if (x < 0 || !R_FINITE(x))
            return _general_1.R_D__0(logX);
        n = R_forceint(n);
        x = R_forceint(x);
        return dbinom_raw(x, n, p, 1 - p, logX);
    });
}
exports.dbinom = dbinom;


/***/ }),
/* 18 */
/***/ (function(module, exports, __nested_webpack_require_44232__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_44232__(1);
const _general_1 = __nested_webpack_require_44232__(0);
const expm1_1 = __nested_webpack_require_44232__(3);
const dnorm_1 = __nested_webpack_require_44232__(31);
const pnorm_1 = __nested_webpack_require_44232__(19);
const dpois_1 = __nested_webpack_require_44232__(22);
const lgamma_fn_1 = __nested_webpack_require_44232__(4);
const { LN2: M_LN2, log1p, expm1, sqrt, floor, pow, log, exp, max: fmax2, abs: fabs } = Math;
const { isNaN: ISNAN, MIN_VALUE: DBL_MIN, EPSILON: DBL_EPSILON, isFinite: R_FINITE, POSITIVE_INFINITY: ML_POSINF } = Number;
const { isArray } = Array;
const sqr = (x) => x * x;
const scalefactor = sqr(sqr(sqr(4294967296.0)));
const M_cutoff = M_LN2 * _general_1.DBL_MAX_EXP / DBL_EPSILON;
function logcf(x, i, d, eps) {
    let c1 = 2 * d;
    let c2 = i + d;
    let c4 = c2 + d;
    let a1 = c2;
    let b1 = i * (c2 - i * x);
    let b2 = d * d * x;
    let a2 = c4 * c2 - b2;
    b2 = c4 * b1 - i * b2;
    while (fabs(a2 * b1 - a1 * b2) > fabs(eps * b1 * b2)) {
        let c3 = c2 * c2 * x;
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
        }
        else if (fabs(b2) < 1 / scalefactor) {
            a1 *= scalefactor;
            b1 *= scalefactor;
            a2 *= scalefactor;
            b2 *= scalefactor;
        }
    }
    return a2 / b2;
}
function log1pmx(x) {
    const minLog1Value = -0.79149064;
    if (x > 1 || x < minLog1Value)
        return log1p(x) - x;
    else {
        let r = x / (2 + x);
        let y = r * r;
        if (fabs(x) < 1e-2) {
            let two = 2;
            return (r * ((((two / 9 * y + two / 7) * y + two / 5) * y + two / 3) * y - x));
        }
        else {
            let tol_logcf = 1e-14;
            return r * (2 * y * logcf(y, 3, 2, tol_logcf) - x);
        }
    }
}
function lgamma1p(a) {
    const eulers_const = 0.5772156649015328606065120900824024;
    const N = 40;
    const coeffs = [
        0.3224670334241132182362075833230126,
        0.6735230105319809513324605383715e-1,
        0.2058080842778454787900092413529198e-1,
        0.7385551028673985266273097291406834e-2,
        0.2890510330741523285752988298486755e-2,
        0.1192753911703260977113935692828109e-2,
        0.5096695247430424223356548135815582e-3,
        0.2231547584535793797614188036013401e-3,
        0.994575127818085337145958900319017e-4,
        0.4492623673813314170020750240635786e-4,
        0.2050721277567069155316650397830591e-4,
        0.9439488275268395903987425104415055e-5,
        0.4374866789907487804181793223952411e-5,
        0.2039215753801366236781900709670839e-5,
        0.9551412130407419832857179772951265e-6,
        0.4492469198764566043294290331193655e-6,
        0.2120718480555466586923135901077628e-6,
        0.1004322482396809960872083050053344e-6,
        0.476981016936398056576019341724673e-7,
        0.2271109460894316491031998116062124e-7,
        0.1083865921489695409107491757968159e-7,
        0.5183475041970046655121248647057669e-8,
        0.2483674543802478317185008663991718e-8,
        0.119214014058609120744254820277464e-8,
        0.5731367241678862013330194857961011e-9,
        0.2759522885124233145178149692816341e-9,
        0.1330476437424448948149715720858008e-9,
        0.6422964563838100022082448087644648e-10,
        0.3104424774732227276239215783404066e-10,
        0.1502138408075414217093301048780668e-10,
        0.7275974480239079662504549924814047e-11,
        0.3527742476575915083615072228655483e-11,
        0.1711991790559617908601084114443031e-11,
        0.8315385841420284819798357793954418e-12,
        0.4042200525289440065536008957032895e-12,
        0.1966475631096616490411045679010286e-12,
        0.9573630387838555763782200936508615e-13,
        0.4664076026428374224576492565974577e-13,
        0.2273736960065972320633279596737272e-13,
        0.1109139947083452201658320007192334e-13
    ];
    const c = 0.2273736845824652515226821577978691e-12;
    const tol_logcf = 1e-14;
    let lgam;
    let i;
    if (fabs(a) >= 0.5)
        return lgamma_fn_1.lgammafn(a + 1);
    lgam = c * logcf(-a / 2, N + 2, 1, tol_logcf);
    for (i = N - 1; i >= 0; i--)
        lgam = coeffs[i] - a * lgam;
    return (a * lgam - eulers_const) * a - log1pmx(a);
}
exports.lgamma1p = lgamma1p;
const pr_dpois_wrap = debug('dpois_wrap');
function dpois_wrap(x_plus_1, lambda, give_log) {
    pr_dpois_wrap('dpois_wrap(x+1=%d, lambda=%d, log=%s)', x_plus_1, lambda, give_log);
    if (!R_FINITE(lambda)) {
        return _general_1.R_D__0(give_log);
    }
    if (x_plus_1 > 1)
        return dpois_1.dpois_raw(x_plus_1 - 1, lambda, give_log);
    if (lambda > fabs(x_plus_1 - 1) * M_cutoff)
        return _general_1.R_D_exp(give_log, -lambda - lgamma_fn_1.lgammafn(x_plus_1));
    else {
        let d = dpois_1.dpois_raw(x_plus_1, lambda, give_log);
        pr_dpois_wrap('  -> d=dpois_raw(..)=%d', d);
        return give_log ? d + log(x_plus_1 / lambda) : d * (x_plus_1 / lambda);
    }
}
const pr_pgamma_smallx = debug('pgamma_smallx');
function pgamma_smallx(x, alph, lowerTail, logP) {
    let sum = 0;
    let c = alph;
    let n = 0;
    let term;
    pr_pgamma_smallx(' pg_smallx(x=%d, alph=%d): ', x, alph);
    do {
        n++;
        c *= -x / n;
        term = c / (alph + n);
        sum += term;
    } while (fabs(term) > DBL_EPSILON * fabs(sum));
    pr_pgamma_smallx('%d terms --> conv.sum=%d;', n, sum);
    if (lowerTail) {
        let f1 = logP ? log1p(sum) : 1 + sum;
        let f2;
        if (alph > 1) {
            f2 = dpois_1.dpois_raw(alph, x, logP);
            f2 = logP ? f2 + x : f2 * exp(x);
        }
        else if (logP)
            f2 = alph * log(x) - lgamma1p(alph);
        else
            f2 = pow(x, alph) / exp(lgamma1p(alph));
        pr_pgamma_smallx(' (f1,f2)= (%d,%d)', f1, f2);
        return logP ? f1 + f2 : f1 * f2;
    }
    else {
        let lf2 = alph * log(x) - lgamma1p(alph);
        pr_pgamma_smallx(' 1:%d  2:%d', alph * log(x), lgamma1p(alph));
        pr_pgamma_smallx(' sum=%d  log(1+sum)=%d	 lf2=%d', sum, log1p(sum), lf2);
        if (logP)
            return expm1_1.R_Log1_Exp(log1p(sum) + lf2);
        else {
            let f1m1 = sum;
            let f2m1 = expm1(lf2);
            return -(f1m1 + f2m1 + f1m1 * f2m1);
        }
    }
}
function pd_upper_series(x, y, logP) {
    let term = x / y;
    let sum = term;
    do {
        y++;
        term *= x / y;
        sum += term;
    } while (term > sum * DBL_EPSILON);
    return logP ? log(sum) : sum;
}
const pr_pd_lower_cf = debug('pd_lower_cf');
function pd_lower_cf(y, d) {
    let f = 0.0;
    let of;
    let f0;
    let i;
    let c2;
    let c3;
    let c4;
    let a1;
    let b1;
    let a2;
    let b2;
    const max_it = 200000;
    pr_pd_lower_cf('pd_lower_cf(y=%d, d=%d)', y, d);
    if (y === 0)
        return 0;
    f0 = y / d;
    if (fabs(y - 1) < fabs(d) * DBL_EPSILON) {
        pr_pd_lower_cf(' very small "y" -> returning (y/d)');
        return f0;
    }
    if (f0 > 1)
        f0 = 1;
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
const pr_pd_lower_series = debug('pd_lower_series');
function pd_lower_series(lambda, y) {
    let term = 1;
    let sum = 0;
    pr_pd_lower_series('pd_lower_series(lam=%d, y=%d) ...', lambda, y);
    while (y >= 1 && term > sum * DBL_EPSILON) {
        term *= y / lambda;
        sum += term;
        y--;
    }
    pr_pd_lower_series(' done: term=%d, sum=%d, y= %d', term, sum, y);
    if (y !== floor(y)) {
        let f;
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
        let term = 1 / x;
        let sum = term;
        let x2 = x * x;
        let i = 1;
        do {
            term *= -i / x2;
            sum += term;
            i += 2;
        } while (fabs(term) > DBL_EPSILON * sum);
        return 1 / sum;
    }
    else {
        let d = dnorm_1.dnorm4(x, 0, 1, false);
        return d / exp(lp);
    }
}
const pr_ppois_asymp = debug('ppois_asymp');
function ppois_asymp(x, lambda, lowerTail, logP) {
    const coefs_a = [
        -1e99,
        2 / 3,
        -4 / 135,
        8 / 2835,
        16 / 8505,
        -8992 / 12629925,
        -334144 / 492567075,
        698752 / 1477701225
    ];
    const coefs_b = [
        -1e99,
        1 / 12,
        1 / 288,
        -139 / 51840,
        -571 / 2488320,
        163879 / 209018880,
        5246819 / 75246796800,
        -534703531 / 902961561600
    ];
    let elfb;
    let elfb_term;
    let res12;
    let res1_term;
    let res1_ig;
    let res2_term;
    let res2_ig;
    let dfm;
    let pt_;
    let s2pt;
    let f;
    let np;
    let i;
    dfm = lambda - x;
    pt_ = -log1pmx(dfm / x);
    s2pt = sqrt(2 * x * pt_);
    if (dfm < 0)
        s2pt = -s2pt;
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
    if (!lowerTail)
        elfb = -elfb;
    pr_ppois_asymp('res12 = %d   elfb=%d', elfb, res12);
    f = res12 / elfb;
    np = pnorm_1.pnorm5(s2pt, 0.0, 1.0, !lowerTail, logP);
    if (logP) {
        let n_d_over_p = dpnorm(s2pt, !lowerTail, np);
        pr_ppois_asymp('pp*_asymp(): f=%d	 np=e^%d  nd/np=%d  f*nd/np=%d', f, np, n_d_over_p, f * n_d_over_p);
        return np + log1p(f * n_d_over_p);
    }
    else {
        let nd = dnorm_1.dnorm4(s2pt, 0, 1, logP);
        pr_ppois_asymp('pp*_asymp(): f=%d	 np=%d  nd=%d  f*nd=%d', f, np, nd, f * nd);
        return np + f * nd;
    }
}
const pr_pgamma_raw = debug('pgamma_raw');
function pgamma_raw(x, alph, lowerTail = true, logP = false) {
    let res;
    pr_pgamma_raw('pgamma_raw(x=%d, alph=%d, low=%s, log=%s)', x, alph, lowerTail, logP);
    let rc = _general_1.R_P_bounds_01(lowerTail, logP, x, 0, ML_POSINF);
    if (rc !== undefined) {
        return rc;
    }
    if (x < 1) {
        res = pgamma_smallx(x, alph, lowerTail, logP);
    }
    else if (x <= alph - 1 && x < 0.8 * (alph + 50)) {
        let sum = pd_upper_series(x, alph, logP);
        let d = dpois_wrap(alph, x, logP);
        pr_pgamma_raw(' alph "large": sum=pd_upper*()= %d, d=dpois_w(*)= %d', sum, d);
        if (!lowerTail)
            res = logP ? expm1_1.R_Log1_Exp(d + sum) : 1 - d * sum;
        else
            res = logP ? sum + d : sum * d;
    }
    else if (alph - 1 < x && alph < 0.8 * (x + 50)) {
        let sum;
        let d = dpois_wrap(alph, x, logP);
        pr_pgamma_raw('  x "large": d=dpois_w(*)= %d ', d);
        if (alph < 1) {
            if (x * DBL_EPSILON > 1 - alph)
                sum = _general_1.R_D__1(logP);
            else {
                let f = pd_lower_cf(alph, x - (alph - 1)) * x / alph;
                sum = logP ? log(f) : f;
            }
        }
        else {
            sum = pd_lower_series(x, alph - 1);
            sum = logP ? log1p(sum) : 1 + sum;
        }
        pr_pgamma_raw(', sum= %d', sum);
        if (!lowerTail)
            res = logP ? sum + d : sum * d;
        else
            res = logP ? expm1_1.R_Log1_Exp(d + sum) : 1 - d * sum;
    }
    else {
        pr_pgamma_raw(' using ppois_asymp()');
        res = ppois_asymp(alph - 1, x, !lowerTail, logP);
    }
    if (!logP && res < DBL_MIN / DBL_EPSILON) {
        pr_pgamma_raw(' very small res=%.14g; -> recompute via log\n', res);
        return exp(pgamma_raw(x, alph, lowerTail, true));
    }
    else
        return res;
}
exports.pgamma_raw = pgamma_raw;
const printer_pgamma = debug('pgamma');
function pgamma(q, shape, scale, lowerTail, logP) {
    const fa = isArray(q) ? q : [q];
    const result = fa.map(x => {
        if (ISNAN(x) || ISNAN(shape) || ISNAN(scale)) {
            return x + shape + scale;
        }
        if (shape < 0 || scale <= 0)
            return _general_1.ML_ERR_return_NAN(printer_pgamma);
        x /= scale;
        if (ISNAN(x))
            return x;
        if (shape === 0)
            return x <= 0
                ? _general_1.R_DT_0(lowerTail, logP)
                : _general_1.R_DT_1(lowerTail, logP);
        return pgamma_raw(x, shape, lowerTail, logP);
    });
    return result.length === 1 ? result[0] : result;
}
exports.pgamma = pgamma;


/***/ }),
/* 19 */
/***/ (function(module, exports, __nested_webpack_require_58272__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_58272__(1);
const _general_1 = __nested_webpack_require_58272__(0);
const r_func_1 = __nested_webpack_require_58272__(2);
const { isNaN: ISNAN, isFinite: R_FINITE, EPSILON: DBL_EPSILON, NaN: ML_NAN, MIN_VALUE: DBL_MIN } = Number;
const { trunc, log, exp, abs: fabs, log1p } = Math;
const toms708_1 = __nested_webpack_require_58272__(9);
const SIXTEN = 16;
const printer = debug('pnorm5');
function do_del(ccum, cum, log_p, X, temp, upper, lower, x) {
    let xsq = trunc(X * SIXTEN) / SIXTEN;
    let del = (X - xsq) * (X + xsq);
    if (log_p) {
        cum.val = -xsq * xsq * 0.5 + -del * 0.5 + log(temp);
        if ((lower && x > 0) || (upper && x <= 0))
            ccum.val = log1p(-exp(-xsq * xsq * 0.5) * exp(-del * 0.5) * temp);
    }
    else {
        cum.val = exp(-xsq * xsq * 0.5) * exp(-del * 0.5) * temp;
        ccum.val = 1.0 - cum.val;
    }
}
function pnorm5(q, mu = 0, sigma = 1, lowerTail = true, logP = false) {
    return r_func_1.map(q)(fx => {
        let p = new toms708_1.NumberW(0);
        let cp = new toms708_1.NumberW(0);
        if (ISNAN(fx) || ISNAN(mu) || ISNAN(sigma))
            return fx + mu + sigma;
        if (!R_FINITE(fx) && mu === fx)
            return ML_NAN;
        if (sigma <= 0) {
            if (sigma < 0)
                return _general_1.ML_ERR_return_NAN(printer);
            return fx < mu ? _general_1.R_DT_0(lowerTail, logP) : _general_1.R_DT_1(lowerTail, logP);
        }
        p.val = (fx - mu) / sigma;
        if (!R_FINITE(p.val))
            return fx < mu ? _general_1.R_DT_0(lowerTail, logP) : _general_1.R_DT_1(lowerTail, logP);
        fx = p.val;
        pnorm_both(fx, p, cp, !lowerTail, logP);
        return lowerTail ? p.val : cp.val;
    });
}
exports.pnorm5 = pnorm5;
function pnorm_both(x, cum, ccum, i_tail, log_p) {
    const a = [
        2.2352520354606839287,
        161.02823106855587881,
        1067.6894854603709582,
        18154.981253343561249,
        0.065682337918207449113
    ];
    const b = [
        47.20258190468824187,
        976.09855173777669322,
        10260.932208618978205,
        45507.789335026729956
    ];
    const c = [
        0.39894151208813466764,
        8.8831497943883759412,
        93.506656132177855979,
        597.27027639480026226,
        2494.5375852903726711,
        6848.1904505362823326,
        11602.651437647350124,
        9842.7148383839780218,
        1.0765576773720192317e-8
    ];
    const d = [
        22.266688044328115691,
        235.38790178262499861,
        1519.377599407554805,
        6485.558298266760755,
        18615.571640885098091,
        34900.952721145977266,
        38912.003286093271411,
        19685.429676859990727
    ];
    const p = [
        0.21589853405795699,
        0.1274011611602473639,
        0.022235277870649807,
        0.001421619193227893466,
        2.9112874951168792e-5,
        0.02307344176494017303
    ];
    const q = [
        1.28426009614491121,
        0.468238212480865118,
        0.0659881378689285515,
        0.00378239633202758244,
        7.29751555083966205e-5
    ];
    let xden;
    let xnum;
    let temp;
    let eps;
    let xsq;
    let y;
    let min = DBL_MIN;
    let i = new Int32Array([0]);
    let lower;
    let upper;
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
        }
        else
            xnum = xden = 0.0;
        temp = x * (xnum + a[3]) / (xden + b[3]);
        if (lower)
            cum.val = 0.5 + temp;
        if (upper)
            ccum.val = 0.5 - temp;
        if (log_p) {
            if (lower)
                cum.val = log(cum.val);
            if (upper)
                ccum.val = log(ccum.val);
        }
    }
    else if (y <= _general_1.M_SQRT_32) {
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
    }
    else if ((log_p && y < 1e170) ||
        (lower && -37.5193 < x && x < 8.2924) ||
        (upper && -8.2924 < x && x < 37.5193)) {
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
    }
    else {
        if (x > 0) {
            cum.val = _general_1.R_D__1(log_p);
            ccum.val = _general_1.R_D__0(log_p);
        }
        else {
            cum.val = _general_1.R_D__0(log_p);
            ccum.val = _general_1.R_D__1(log_p);
        }
    }
    if (log_p) {
        if (cum.val > -min)
            cum.val = -0;
        if (ccum.val > -min) {
            ccum.val = -0;
        }
    }
    else {
        if (cum.val < min)
            cum.val = 0;
        if (ccum.val < min)
            ccum.val = 0;
    }
    return;
}
exports.pnorm_both = pnorm_both;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.i2_32m1 = 2.328306437080797e-10;
function fixup(x) {
    if (x <= 0.0)
        return 0.5 * exports.i2_32m1;
    if (1.0 - x <= 0.0)
        return 1.0 - 0.5 * exports.i2_32m1;
    return x;
}
exports.fixup = fixup;


/***/ }),
/* 21 */
/***/ (function(module, exports, __nested_webpack_require_64644__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_64644__(1);
const _general_1 = __nested_webpack_require_64644__(0);
const dpois_1 = __nested_webpack_require_64644__(22);
const r_func_1 = __nested_webpack_require_64644__(2);
const { log } = Math;
const { isNaN: ISNAN } = Number;
const ML_POSINF = Infinity;
const printer = debug('dgamma');
function dgamma(xx, shape, scale, aslog = false) {
    return r_func_1.map(xx)(x => {
        let pr;
        if (ISNAN(x) || ISNAN(shape) || ISNAN(scale))
            return x + shape + scale;
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
            if (shape < 1)
                return ML_POSINF;
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


/***/ }),
/* 22 */
/***/ (function(module, exports, __nested_webpack_require_66108__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_66108__(1);
const _general_1 = __nested_webpack_require_66108__(0);
const deviance_1 = __nested_webpack_require_66108__(65);
const lgamma_fn_1 = __nested_webpack_require_66108__(4);
const r_func_1 = __nested_webpack_require_66108__(2);
const stirling_1 = __nested_webpack_require_66108__(44);
const { round: R_forceint, log, PI } = Math;
const { isNaN: ISNAN, isFinite: R_FINITE, MIN_VALUE: DBL_MIN } = Number;
const M_2PI = 2 * PI;
const printer = debug('dpois');
function dpois_raw(x, lambda, give_log) {
    if (lambda === 0)
        return x === 0 ? _general_1.R_D__1(give_log) : _general_1.R_D__0(give_log);
    if (!R_FINITE(lambda))
        return _general_1.R_D__0(give_log);
    if (x < 0)
        return _general_1.R_D__0(give_log);
    if (x <= lambda * DBL_MIN)
        return _general_1.R_D_exp(give_log, -lambda);
    if (lambda < x * DBL_MIN)
        return _general_1.R_D_exp(give_log, -lambda + x * log(lambda) - lgamma_fn_1.lgammafn(x + 1));
    return _general_1.R_D_fexp(give_log, M_2PI * x, -stirling_1.stirlerr(x) - deviance_1.bd0(x, lambda));
}
exports.dpois_raw = dpois_raw;
function dpois(_x, lambda, give_log = false) {
    return r_func_1.map(_x)(x => {
        if (ISNAN(x) || ISNAN(lambda)) {
            return x + lambda;
        }
        if (lambda < 0) {
            return _general_1.ML_ERR_return_NAN(printer);
        }
        let rc = _general_1.R_D_nonint_check(give_log, x, printer);
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


/***/ }),
/* 23 */
/***/ (function(module, exports, __nested_webpack_require_67917__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_67917__(1);
const _general_1 = __nested_webpack_require_67917__(0);
const { abs: fabs, PI: M_PI } = Math;
const { NaN: ML_NAN, isNaN: ISNAN, isFinite: R_FINITE } = Number;
const printer_cospi = debug('cospi');
function cospi(x) {
    if (ISNAN(x))
        return x;
    if (!R_FINITE(x)) {
        _general_1.ML_ERROR(_general_1.ME.ME_DOMAIN, '', printer_cospi);
        return ML_NAN;
    }
    x = _general_1.fmod(fabs(x), 2);
    if (_general_1.fmod(x, 1) === 0.5)
        return 0;
    if (x === 1)
        return -1;
    if (x === 0)
        return 1;
    return Math.cos(M_PI * x);
}
exports.cospi = cospi;
const printer_tanpi = debug('tanpi');
function tanpi(x) {
    if (ISNAN(x))
        return x;
    if (!R_FINITE(x)) {
        _general_1.ML_ERROR(_general_1.ME.ME_DOMAIN, '', printer_tanpi);
        return ML_NAN;
    }
    x = _general_1.fmod(x, 1);
    if (x <= -0.5) {
        x++;
    }
    else if (x > 0.5) {
        x--;
    }
    return x === 0 ? 0 : x === 0.5 ? ML_NAN : Math.tan(M_PI * x);
}
exports.tanpi = tanpi;
function atanpi(x) {
    return Math.atan(x) / Math.PI;
}
exports.atanpi = atanpi;


/***/ }),
/* 24 */
/***/ (function(module, exports, __nested_webpack_require_69207__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_69207__(1);
const _general_1 = __nested_webpack_require_69207__(0);
const { PI: M_PI } = Math;
const { NaN: ML_NAN, isNaN: ISNAN, isFinite: R_FINITE } = Number;
const printer_sinpi = debug('sinpi');
function sinpi(x) {
    if (ISNAN(x))
        return x;
    if (!R_FINITE(x)) {
        _general_1.ML_ERROR(_general_1.ME.ME_DOMAIN, 'sinpi not finite', printer_sinpi);
        return ML_NAN;
    }
    x = _general_1.fmod(x, 2);
    if (x <= -1)
        x += 2;
    else if (x > 1)
        x -= 2;
    if (x === 0 || x === 1)
        return 0;
    if (x === 0.5)
        return 1;
    if (x === -0.5)
        return -1;
    return Math.sin(M_PI * x);
}
exports.sinpi = sinpi;


/***/ }),
/* 25 */
/***/ (function(module, exports, __nested_webpack_require_70051__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_70051__(1);
const dgamma_1 = __nested_webpack_require_70051__(21);
const pgamma_1 = __nested_webpack_require_70051__(18);
const qgamma_1 = __nested_webpack_require_70051__(68);
const rgamma_1 = __nested_webpack_require_70051__(30);
const normal_1 = __nested_webpack_require_70051__(8);
const r_func_1 = __nested_webpack_require_70051__(2);
const gamma_fn_1 = __nested_webpack_require_70051__(29);
const lgamma_fn_1 = __nested_webpack_require_70051__(4);
const polygamma_1 = __nested_webpack_require_70051__(128);
exports.special = {
    digamma: polygamma_1.digamma,
    gamma: gamma_fn_1.gammafn,
    lgamma: lgamma_fn_1.lgammafn,
    pentagamma: polygamma_1.pentagamma,
    psigamma: polygamma_1.psigamma,
    tetragamma: polygamma_1.tetragamma,
    trigamma: polygamma_1.trigamma
};
const { abs } = Math;
function Gamma(norm = new normal_1.Inversion()) {
    const printer_n = debug('gamma_normalize_params');
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
    const printer_d = debug('dgamma');
    function dgamma(x, shape, rate, scale, asLog = false) {
        let _scale = gammaNormalizeParams(rate, scale);
        if (_scale !== undefined) {
            return dgamma_1.dgamma(x, shape, _scale, asLog);
        }
        printer_d('Cannot normalize to [scale]');
        return r_func_1.multiplexer(x)(() => NaN);
    }
    const printer_p = debug('pgamma');
    function pgamma(q, shape, rate, scale, lowerTail = true, logP = false) {
        let _scale = gammaNormalizeParams(rate, scale);
        if (_scale !== undefined) {
            return pgamma_1.pgamma(q, shape, _scale, lowerTail, logP);
        }
        printer_p('Cannot normalize to [scale]');
        return r_func_1.multiplexer(q)(() => NaN);
    }
    const printer_q = debug('qgamma');
    function qgamma(q, shape, rate, scale, lowerTail = true, logP = false) {
        let _scale = gammaNormalizeParams(rate, scale);
        if (_scale !== undefined) {
            return qgamma_1.qgamma(q, shape, _scale, lowerTail, logP);
        }
        printer_q('Cannot normalize to [scale]');
        return r_func_1.multiplexer(q)(() => NaN);
    }
    const printer_r = debug('rgamma');
    function rgamma(n, shape, rate, scale) {
        let _scale = gammaNormalizeParams(rate, scale);
        if (_scale !== undefined) {
            return rgamma_1.rgamma(n, shape, _scale, norm);
        }
        printer_r('Cannot normalize to [scale]');
    }
    return Object.freeze({
        dgamma,
        pgamma,
        qgamma,
        rgamma
    });
}
exports.Gamma = Gamma;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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


/***/ }),
/* 27 */
/***/ (function(module, exports, __nested_webpack_require_73795__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_73795__(1);
const _general_1 = __nested_webpack_require_73795__(0);
const { abs: fabs, log, exp, round } = Math;
const { isInteger, NEGATIVE_INFINITY: ML_NEGINF, isNaN: ISNAN } = Number;
const lbeta_1 = __nested_webpack_require_73795__(11);
const lgamma_fn_1 = __nested_webpack_require_73795__(4);
const lgammafn_sign_1 = __nested_webpack_require_73795__(67);
const r_func_1 = __nested_webpack_require_73795__(2);
function lfastchoose(n, k) {
    return -log(n + 1) - lbeta_1.internal_lbeta(n - k + 1, k + 1);
}
function lfastchoose2(n, k, sChoose) {
    let r;
    r = lgammafn_sign_1.lgammafn_sign(n - k + 1, sChoose);
    return lgamma_fn_1.lgammafn(n + 1) - lgamma_fn_1.lgammafn(k + 1) - r;
}
function choose(_n, _k) {
    return r_func_1.multiplexer(_n, _k)((n, k) => internal_choose(n, k));
}
exports.choose = choose;
function lchoose(_n, _k) {
    return r_func_1.multiplexer(_n, _k)((n, k) => internal_lchoose(n, k));
}
exports.lchoose = lchoose;
const printer_lchoose = debug('lchoose');
function internal_lchoose(n, k) {
    let k0 = k;
    k = Math.round(k);
    if (ISNAN(n) || ISNAN(k))
        return n + k;
    if (fabs(k - k0) > 1e-7)
        printer_lchoose('"k" (%d) must be integer, rounded to %d', k0, k);
    if (k < 2) {
        if (k < 0)
            return ML_NEGINF;
        if (k === 0)
            return 0;
        return log(fabs(n));
    }
    if (n < 0) {
        return internal_lchoose(-n + k - 1, k);
    }
    else if (isInteger(n)) {
        n = round(n);
        if (n < k)
            return ML_NEGINF;
        if (n - k < 2)
            return internal_lchoose(n, n - k);
        return lfastchoose(n, k);
    }
    if (n < k - 1) {
        return lfastchoose2(n, k);
    }
    return lfastchoose(n, k);
}
exports.internal_lchoose = internal_lchoose;
const k_small_max = 30;
const printer_choose = debug('choose');
function internal_choose(n, k) {
    let r;
    let k0 = k;
    k = round(k);
    if (ISNAN(n) || ISNAN(k))
        return n + k;
    if (fabs(k - k0) > 1e-7)
        printer_choose('k (%d) must be integer, rounded to %d', k0, k);
    if (k < k_small_max) {
        let j;
        if (n - k < k && n >= 0 && isInteger(n))
            k = n - k;
        if (k < 0)
            return 0;
        if (k === 0)
            return 1;
        r = n;
        for (j = 2; j <= k; j++)
            r *= (n - j + 1) / j;
        return isInteger(n) ? round(r) : r;
    }
    if (n < 0) {
        r = internal_choose(-n + k - 1, k);
        if (_general_1.isOdd(k))
            r = -r;
        return r;
    }
    else if (isInteger(n)) {
        n = round(n);
        if (n < k)
            return 0;
        if (n - k < k_small_max)
            return internal_choose(n, n - k);
        return round(exp(lfastchoose(n, k)));
    }
    if (n < k - 1) {
        let schoose = [0];
        r = lfastchoose2(n, k, schoose);
        return schoose[0] * exp(r);
    }
    return exp(lfastchoose(n, k));
}
exports.internal_choose = internal_choose;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function exp_rand(unif_rand) {
    const q = [
        0.6931471805599453,
        0.9333736875190459,
        0.9888777961838675,
        0.9984959252914960,
        0.9998292811061389,
        0.9999833164100727,
        0.9999985691438767,
        0.9999998906925558,
        0.9999999924734159,
        0.9999999995283275,
        0.9999999999728814,
        0.9999999999985598,
        0.9999999999999289,
        0.9999999999999968,
        0.9999999999999999,
        1.0000000000000000
    ];
    let a = 0.;
    let u = unif_rand();
    while (u <= 0. || u >= 1.)
        u = unif_rand();
    while (true) {
        u += u;
        if (u > 1.)
            break;
        a += q[0];
    }
    u -= 1.;
    if (u <= q[0])
        return a + u;
    let i = 0;
    let ustar = unif_rand();
    let umin = ustar;
    do {
        ustar = unif_rand();
        if (umin > ustar)
            umin = ustar;
        i++;
    } while (u > q[i]);
    return a + umin * q[0];
}
exports.exp_rand = exp_rand;


/***/ }),
/* 29 */
/***/ (function(module, exports, __nested_webpack_require_78058__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const chebyshev_1 = __nested_webpack_require_78058__(37);
const _general_1 = __nested_webpack_require_78058__(0);
const stirling_1 = __nested_webpack_require_78058__(44);
const trigonometry_1 = __nested_webpack_require_78058__(33);
const lgammacor_1 = __nested_webpack_require_78058__(42);
const debug = __nested_webpack_require_78058__(1);
const printer = debug('gammafn');
const { isNaN: ISNAN, NaN: ML_NAN, POSITIVE_INFINITY: ML_POSINF, NEGATIVE_INFINITY: ML_NEGINF } = Number;
const { PI: M_PI, abs: fabs, round, trunc, exp, log } = Math;
const M_LN_SQRT_2PI = Math.log(Math.sqrt(2 * Math.PI));
const gamcs = [
    +0.8571195590989331421920062399942e-2,
    +0.4415381324841006757191315771652e-2,
    +0.5685043681599363378632664588789e-1,
    -0.4219835396418560501012500186624e-2,
    +0.1326808181212460220584006796352e-2,
    -0.1893024529798880432523947023886e-3,
    +0.3606925327441245256578082217225e-4,
    -0.6056761904460864218485548290365e-5,
    +0.1055829546302283344731823509093e-5,
    -0.1811967365542384048291855891166e-6,
    +0.3117724964715322277790254593169e-7,
    -0.5354219639019687140874081024347e-8,
    +0.919327551985958894688778682594e-9,
    -0.1577941280288339761767423273953e-9,
    +0.2707980622934954543266540433089e-10,
    -0.4646818653825730144081661058933e-11,
    +0.7973350192007419656460767175359e-12,
    -0.1368078209830916025799499172309e-12,
    +0.2347319486563800657233471771688e-13,
    -0.4027432614949066932766570534699e-14,
    +0.6910051747372100912138336975257e-15,
    -0.1185584500221992907052387126192e-15,
    +0.2034148542496373955201026051932e-16,
    -0.3490054341717405849274012949108e-17,
    +0.5987993856485305567135051066026e-18,
    -0.1027378057872228074490069778431e-18,
    +0.1762702816060529824942759660748e-19,
    -0.3024320653735306260958772112042e-20,
    +0.5188914660218397839717833550506e-21,
    -0.8902770842456576692449251601066e-22,
    +0.1527474068493342602274596891306e-22,
    -0.2620731256187362900257328332799e-23,
    +0.4496464047830538670331046570666e-24,
    -0.7714712731336877911703901525333e-25,
    +0.1323635453126044036486572714666e-25,
    -0.2270999412942928816702313813333e-26,
    +0.3896418998003991449320816639999e-27,
    -0.6685198115125953327792127999999e-28,
    +0.1146998663140024384347613866666e-28,
    -0.1967938586345134677295103999999e-29,
    +0.3376448816585338090334890666666e-30,
    -0.5793070335782135784625493333333e-31
];
const { isArray } = Array;
function gammafn(x) {
    const fx = isArray(x) ? x : [x];
    const result = fx.map(fx => {
        return _gammafn(fx);
    });
    return result.length === 1 ? result[0] : result;
}
exports.gammafn = gammafn;
function _gammafn(x) {
    let i;
    let n;
    let y;
    let sinpiy;
    let value;
    const ngam = 22;
    const xmin = -170.5674972726612;
    const xmax = 171.61447887182298;
    const xsml = 2.2474362225598545e-308;
    const dxrel = 1.490116119384765696e-8;
    if (ISNAN(x))
        return x;
    if (x === 0 || (x < 0 && x === round(x))) {
        _general_1.ML_ERROR(_general_1.ME.ME_DOMAIN, 'gammafn', printer);
        return ML_NAN;
    }
    y = fabs(x);
    if (y <= 10) {
        n = x >> 0;
        if (x < 0)
            --n;
        y = x - n;
        --n;
        value = chebyshev_1.chebyshev_eval(y * 2 - 1, gamcs, ngam) + 0.9375;
        if (n === 0)
            return value;
        if (n < 0) {
            if (x < -0.5 && fabs(x - trunc(x - 0.5) / x) < dxrel) {
                _general_1.ML_ERROR(_general_1.ME.ME_PRECISION, 'gammafn', printer);
            }
            if (y < xsml) {
                _general_1.ML_ERROR(_general_1.ME.ME_RANGE, 'gammafn', printer);
                if (x > 0)
                    return ML_POSINF;
                else
                    return ML_NEGINF;
            }
            n = -n;
            for (i = 0; i < n; i++) {
                value /= x + i;
            }
            return value;
        }
        else {
            for (i = 1; i <= n; i++) {
                value *= y + i;
            }
            return value;
        }
    }
    else {
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
            for (i = 2; i < y; i++)
                value *= i;
        }
        else {
            value = exp((y - 0.5) * log(y) -
                y +
                M_LN_SQRT_2PI +
                (2 * y === trunc(2) * y ? stirling_1.stirlerr(y) : lgammacor_1.lgammacor(y)));
        }
        if (x > 0)
            return value;
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


/***/ }),
/* 30 */
/***/ (function(module, exports, __nested_webpack_require_83318__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_83318__(1);
const _general_1 = __nested_webpack_require_83318__(0);
const sexp_1 = __nested_webpack_require_83318__(28);
const { expm1, abs: fabs, sqrt, log, exp } = Math;
const { isFinite: R_FINITE } = Number;
function rgamma(n = 1, a = 1, scale = 1, rng) {
    const result = new Array(n).fill(0).map(() => _rgamma(a, scale, rng));
    return result.length === 1 ? result[0] : result;
}
exports.rgamma = rgamma;
const printer_rgamma = debug('_rgamma');
function _rgamma(a = 1, scale = 1, rng) {
    const sqrt32 = 5.656854;
    const exp_m1 = 0.36787944117144232159;
    const q1 = 0.04166669;
    const q2 = 0.02083148;
    const q3 = 0.00801191;
    const q4 = 0.00144121;
    const q5 = -7.388e-5;
    const q6 = 2.4511e-4;
    const q7 = 2.424e-4;
    const a1 = 0.3333333;
    const a2 = -0.250003;
    const a3 = 0.2000062;
    const a4 = -0.1662921;
    const a5 = 0.1423657;
    const a6 = -0.1367177;
    const a7 = 0.1233795;
    let aa = 0;
    let aaa = 0;
    let s = 0;
    let s2 = 0;
    let d = 0;
    let q0 = 0;
    let b = 0;
    let si = 0;
    let c = 0;
    let e = 0;
    let p = 0;
    let q = 0;
    let r = 0;
    let t = 0;
    let u = 0;
    let v = 0;
    let w = 0;
    let x = 0;
    let ret_val = 0;
    if (!R_FINITE(a) || !R_FINITE(scale) || a < 0.0 || scale <= 0.0) {
        if (scale === 0)
            return 0;
        return _general_1.ML_ERR_return_NAN(printer_rgamma);
    }
    if (a < 1) {
        if (a === 0)
            return 0;
        e = 1.0 + exp_m1 * a;
        while (true) {
            p = e * rng.unif_rand();
            if (p >= 1.0) {
                x = -log((e - p) / a);
                if (sexp_1.exp_rand(rng.unif_rand) >= (1.0 - a) * log(x))
                    break;
            }
            else {
                x = exp(log(p) / a);
                if (sexp_1.exp_rand(rng.unif_rand) >= x)
                    break;
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
    if (t >= 0.0)
        return scale * ret_val;
    u = rng.unif_rand();
    if (d * u <= t * t * t)
        return scale * ret_val;
    if (a !== aaa) {
        aaa = a;
        r = 1.0 / a;
        q0 =
            ((((((q7 * r + q6) * r + q5) * r + q4) * r + q3) * r + q2) * r + q1) * r;
        if (a <= 3.686) {
            b = 0.463 + s + 0.178 * s2;
            si = 1.235;
            c = 0.195 / s - 0.079 + 0.16 * s;
        }
        else if (a <= 13.022) {
            b = 1.654 + 0.0076 * s2;
            si = 1.68 / s + 0.275;
            c = 0.062 / s + 0.024;
        }
        else {
            b = 1.77;
            si = 0.75;
            c = 0.1515 / s;
        }
    }
    if (x > 0.0) {
        v = t / (s + s);
        if (fabs(v) <= 0.25)
            q =
                q0 +
                    0.5 *
                        t *
                        t *
                        ((((((a7 * v + a6) * v + a5) * v + a4) * v + a3) * v + a2) * v + a1) *
                        v;
        else
            q = q0 - s * t + 0.25 * t * t + (s2 + s2) * log(1.0 + v);
        if (log(1.0 - u) <= q)
            return scale * ret_val;
    }
    while (true) {
        e = sexp_1.exp_rand(rng.unif_rand);
        u = rng.unif_rand();
        u = u + u - 1.0;
        if (u < 0.0)
            t = b - si * e;
        else
            t = b + si * e;
        if (t >= -0.71874483771719) {
            v = t / (s + s);
            if (fabs(v) <= 0.25)
                q =
                    q0 +
                        0.5 *
                            t *
                            t *
                            ((((((a7 * v + a6) * v + a5) * v + a4) * v + a3) * v + a2) * v +
                                a1) *
                            v;
            else
                q = q0 - s * t + 0.25 * t * t + (s2 + s2) * log(1.0 + v);
            if (q > 0.0) {
                w = expm1(q);
                if (c * fabs(u) <= w * exp(e - 0.5 * t * t))
                    break;
            }
        }
    }
    x = s + 0.5 * t;
    return scale * x * x;
}
exports._rgamma = _rgamma;


/***/ }),
/* 31 */
/***/ (function(module, exports, __nested_webpack_require_87718__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_87718__(1);
const _general_1 = __nested_webpack_require_87718__(0);
const { isNaN: ISNAN, isFinite: R_FINITE, MAX_VALUE: DBL_MAX, POSITIVE_INFINITY: ML_POSINF, NaN: ML_NAN } = Number;
const { sqrt, exp, abs: fabs, round: R_forceint, log } = Math;
const printer = debug('dnorm4');
const { isArray } = Array;
function dnorm4(x, mu = 0, sigma = 1, give_log = false) {
    let fa = (() => (isArray(x) && x) || [x])();
    let result = fa.map(fx => {
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
        if (!R_FINITE(fx))
            return _general_1.R_D__0(give_log);
        fx = fabs(fx);
        if (fx >= 2 * sqrt(DBL_MAX))
            return _general_1.R_D__0(give_log);
        if (give_log) {
            return -(_general_1.M_LN_SQRT_2PI + 0.5 * fx * fx + log(sigma));
        }
        if (fx < 5)
            return _general_1.M_1_SQRT_2PI * exp(-0.5 * fx * fx) / sigma;
        if (fx > sqrt(-2 * _general_1.M_LN2 * (_general_1.DBL_MIN_EXP + 1 - _general_1.DBL_MANT_DIG))) {
            return 0;
        }
        let x1 = _general_1.ldexp(R_forceint(_general_1.ldexp(fx, 16)), -16);
        let x2 = fx - x1;
        return (_general_1.M_1_SQRT_2PI / sigma * (exp(-0.5 * x1 * x1) * exp((-0.5 * x2 - x1) * x2)));
    });
    return (result.length === 1 ? result[0] : result);
}
exports.dnorm4 = dnorm4;


/***/ }),
/* 32 */
/***/ (function(module, exports, __nested_webpack_require_89669__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_89669__(1);
const _general_1 = __nested_webpack_require_89669__(0);
const sexp_1 = __nested_webpack_require_89669__(28);
const r_func_1 = __nested_webpack_require_89669__(2);
const fsign_1 = __nested_webpack_require_89669__(161);
const { trunc, log, abs: fabs, pow, exp, floor, sqrt } = Math;
const { isFinite: R_FINITE } = Number;
const sequence = r_func_1.seq()();
const a0 = -0.5;
const a1 = 0.3333333;
const a2 = -0.2500068;
const a3 = 0.2000118;
const a4 = -0.1661269;
const a5 = 0.1421878;
const a6 = -0.1384794;
const a7 = 0.125006;
const one_7 = 0.1428571428571428571;
const one_12 = 0.0833333333333333333;
const one_24 = 0.0416666666666666667;
function rpois(N, mu, rng) {
    return r_func_1.map(sequence(N))(() => _rpois(mu, rng));
}
exports.rpois = rpois;
const printer_rpois = debug('_rpois');
function _rpois(mu, rng) {
    const fact = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880];
    let l = 0;
    let m = 0;
    let pp = new Array(36);
    let b1 = 0;
    let b2 = 0;
    let c = 0;
    let c0 = 0;
    let c1 = 0;
    let c2 = 0;
    let c3 = 0;
    let p0 = 0;
    let p = 0;
    let q = 0;
    let s = 0;
    let d = 0;
    let omega = 0;
    let big_l = 0;
    let muprev = 0;
    let muprev2 = 0;
    let del;
    let difmuk = 0;
    let E = 0;
    let fk = 0;
    let fx;
    let fy;
    let g;
    let px;
    let py;
    let t = 0;
    let u = 0;
    let v;
    let x;
    let pois = -1;
    let k;
    let kflag = 0;
    let big_mu;
    let new_big_mu = false;
    if (!R_FINITE(mu) || mu < 0) {
        return _general_1.ML_ERR_return_NAN(printer_rpois);
    }
    if (mu <= 0)
        return 0;
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
        }
        else {
            if (mu !== muprev) {
                muprev = mu;
                m = _general_1.imax2(1, trunc(mu));
                l = 0;
                q = p0 = p = exp(-mu);
            }
            while (true) {
                u = rng.unif_rand();
                if (u <= p0)
                    return 0;
                if (l !== 0) {
                    for (k = u <= 0.458 ? 1 : _general_1.imin2(l, m); k <= l; k++)
                        if (u <= pp[k])
                            return k;
                    if (l === 35)
                        continue;
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
    g =
        mu + s * rng.norm_rand();
    if (g >= 0) {
        pois = floor(g);
        if (pois >= big_l)
            return pois;
        fk = pois;
        difmuk = mu - fk;
        u = rng.unif_rand();
        if (d * u >= difmuk * difmuk * difmuk)
            return pois;
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
    let gotoStepF = false;
    let once = true;
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
            }
            else {
                del = one_12 / fk;
                del = del * (1 - 4.8 * del * del);
                v = difmuk / fk;
                if (fabs(v) <= 0.25)
                    px =
                        fk *
                            v *
                            v *
                            (((((((a7 * v + a6) * v + a5) * v + a4) * v + a3) * v + a2) * v +
                                a1) *
                                v +
                                a0) -
                            del;
                else
                    px = fk * log(1 + v) - difmuk - del;
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
            }
            else if (fy - u * fy <= py * exp(px - fx)) {
                break;
            }
        }
    }
    return pois;
}


/***/ }),
/* 33 */
/***/ (function(module, exports, __nested_webpack_require_95177__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cospi_1 = __nested_webpack_require_95177__(23);
exports.cospi = cospi_1.cospi;
var sinpi_1 = __nested_webpack_require_95177__(24);
exports.sinpi = sinpi_1.sinpi;
var tanpi_1 = __nested_webpack_require_95177__(76);
exports.tanpi = tanpi_1.tanpi;
exports.atanpi = tanpi_1.atanpi;


/***/ }),
/* 34 */
/***/ (function(module, exports, __nested_webpack_require_95576__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const beta_1 = __nested_webpack_require_95576__(106);
const lbeta_1 = __nested_webpack_require_95576__(11);
const dbeta_1 = __nested_webpack_require_95576__(53);
const dnbeta_1 = __nested_webpack_require_95576__(54);
const pbeta_1 = __nested_webpack_require_95576__(12);
const pnbeta_1 = __nested_webpack_require_95576__(35);
const qbeta_1 = __nested_webpack_require_95576__(55);
const qnbeta_1 = __nested_webpack_require_95576__(56);
const rchisq_1 = __nested_webpack_require_95576__(13);
const rnchisq_1 = __nested_webpack_require_95576__(41);
const r_func_1 = __nested_webpack_require_95576__(2);
const normal_1 = __nested_webpack_require_95576__(8);
const rbeta_1 = __nested_webpack_require_95576__(107);
exports.special = {
    beta: beta_1.beta,
    lbeta: lbeta_1.lbeta
};
function Beta(rng = new normal_1.Inversion()) {
    function dbeta(x, shape1, shape2, ncp, log) {
        if (ncp === undefined || ncp === 0) {
            return dbeta_1.dbeta(x, shape1, shape2, log || false);
        }
        else {
            return dnbeta_1.dnbeta(x, shape1, shape2, ncp || 0, log || false);
        }
    }
    function pbeta(q, shape1, shape2, ncp, lowerTail = true, logP = false) {
        if (ncp === undefined || ncp === 0) {
            return pbeta_1.pbeta(q, shape1, shape2, lowerTail, logP);
        }
        else {
            return pnbeta_1.pnbeta(q, shape1, shape2, ncp, lowerTail, logP);
        }
    }
    function qbeta(p, shape1, shape2, ncp, lowerTail = true, logP = false) {
        if (ncp === undefined) {
            return qbeta_1.qbeta(p, shape1, shape2, lowerTail, logP);
        }
        else {
            return qnbeta_1.qnbeta(p, shape1, shape2, ncp, lowerTail, logP);
        }
    }
    function rbeta(n, shape1, shape2, ncp = 0) {
        if (ncp === 0) {
            return rbeta_1.rbeta(n, shape1, shape2, rng);
        }
        else {
            let ax = rnchisq_1.rnchisq(n, 2 * shape1, ncp, rng);
            let bx = rchisq_1.rchisq(n, 2 * shape2, rng);
            let result = r_func_1.multiplexer(ax, bx)((a, b) => a / (a + b));
            return result.length === 1 ? result[0] : result;
        }
    }
    return Object.freeze({
        dbeta,
        pbeta,
        qbeta,
        rbeta
    });
}
exports.Beta = Beta;


/***/ }),
/* 35 */
/***/ (function(module, exports, __nested_webpack_require_97835__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_97835__(1);
const _general_1 = __nested_webpack_require_97835__(0);
const lgamma_fn_1 = __nested_webpack_require_97835__(4);
const toms708_1 = __nested_webpack_require_97835__(9);
const { log1p, floor, max: fmax2, sqrt, log, exp } = Math;
const { isNaN: ISNAN } = Number;
const printer = debug('pnbeta_raw');
function pnbeta_raw(x, o_x, a, b, ncp) {
    const errmax = 1.0e-9;
    const itrmax = 10000;
    let a0;
    let lbeta;
    let c;
    let errbd;
    let x0;
    let temp = new toms708_1.NumberW(0);
    let tmp_c = new toms708_1.NumberW(0);
    let ierr = new toms708_1.NumberW(0);
    let ans;
    let ax;
    let gx;
    let q;
    let sumq;
    if (ncp < 0 || a <= 0 || b <= 0) {
        return _general_1.ML_ERR_return_NAN(printer);
    }
    if (x < 0 || o_x > 1 || (x === 0 && o_x === 1))
        return 0;
    if (x > 1 || o_x < 0 || (x === 1 && o_x === 0))
        return 1;
    c = ncp / 2;
    x0 = floor(fmax2(c - 7 * sqrt(c), 0));
    a0 = a + x0;
    lbeta = lgamma_fn_1.lgammafn(a0) + lgamma_fn_1.lgammafn(b) - lgamma_fn_1.lgammafn(a0 + b);
    toms708_1.Toms708.bratio(a0, b, x, o_x, temp, tmp_c, ierr);
    gx = exp(a0 * log(x) + b * (x < 0.5 ? log1p(-x) : log(o_x)) - lbeta - log(a0));
    if (a0 > a)
        q = exp(-c + x0 * log(c) - lgamma_fn_1.lgammafn(x0 + 1));
    else
        q = exp(-c);
    sumq = 1 - q;
    ans = ax = q * temp.val;
    let j = floor(x0);
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
    if (errbd > errmax)
        _general_1.ML_ERROR(_general_1.ME.ME_PRECISION, 'pnbeta', printer);
    if (j >= itrmax + x0)
        _general_1.ML_ERROR(_general_1.ME.ME_NOCONV, 'pnbeta', printer);
    return ans;
}
const printer_pnbeta2 = debug('pnbeta2');
function pnbeta2(x, o_x, a, b, ncp, lower_tail, log_p) {
    let ans = pnbeta_raw(x, o_x, a, b, ncp);
    if (lower_tail) {
        return log_p ? log(ans) : ans;
    }
    else {
        if (ans > 1 - 1e-10)
            _general_1.ML_ERROR(_general_1.ME.ME_PRECISION, 'pnbeta', printer_pnbeta2);
        if (ans > 1.0)
            ans = 1.0;
        return log_p ? log1p(-ans) : 1 - ans;
    }
}
exports.pnbeta2 = pnbeta2;
function pnbeta(_x, a, b, ncp, lower_tail, log_p) {
    const fa = Array.isArray(_x) ? _x : [_x];
    const result = fa.map(x => {
        if (ISNAN(x) || ISNAN(a) || ISNAN(b) || ISNAN(ncp))
            return x + a + b + ncp;
        let rc = _general_1.R_P_bounds_01(lower_tail, log_p, x, 0, 1);
        if (rc !== undefined) {
            return rc;
        }
        return pnbeta2(x, 1 - x, a, b, ncp, lower_tail, log_p);
    });
    return result.length === 1 ? result[0] : result;
}
exports.pnbeta = pnbeta;


/***/ }),
/* 36 */
/***/ (function(module, exports, __nested_webpack_require_100836__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_100836__(1);
const _general_1 = __nested_webpack_require_100836__(0);
const r_func_1 = __nested_webpack_require_100836__(2);
const qbinom_1 = __nested_webpack_require_100836__(59);
const { log, abs: fabs, abs, sqrt, min: fmin2, trunc, round } = Math;
const { MAX_SAFE_INTEGER: INT_MAX, isFinite: R_FINITE } = Number;
const sequence = r_func_1.seq()();
const printer_rbinom = debug('_rbinom');
function rbinom(N, nin, pp, rng) {
    return r_func_1.map(sequence(N))(() => _rbinom(nin, pp, rng));
}
exports.rbinom = rbinom;
function _rbinom(nin, pp, rng) {
    let c = 0;
    let fm = 0;
    let npq = 0;
    let p1 = 0;
    let p2 = 0;
    let p3 = 0;
    let p4 = 0;
    let qn = 0;
    let xl = 0;
    let xll = 0;
    let xlr = 0;
    let xm = 0;
    let xr = 0;
    let psave = -1.0;
    let nsave = -1;
    let m = 0;
    let f;
    let f1;
    let f2;
    let u;
    let v;
    let w;
    let w2;
    let x;
    let x1;
    let x2;
    let z;
    let z2;
    let p;
    let q;
    let np;
    let g;
    let r;
    let al;
    let alv;
    let amaxp;
    let ffm;
    let ynorm;
    let i;
    let ix = 0;
    let k;
    let n;
    if (!R_FINITE(nin))
        return _general_1.ML_ERR_return_NAN(printer_rbinom);
    r = round(nin);
    if (r !== nin)
        return _general_1.ML_ERR_return_NAN(printer_rbinom);
    if (!R_FINITE(pp) ||
        r < 0 ||
        pp < 0 ||
        pp > 1) {
        return _general_1.ML_ERR_return_NAN(printer_rbinom);
    }
    if (r === 0 || pp === 0)
        return 0;
    if (pp === 1)
        return r;
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
    let gotoL_np_small = false;
    if (pp !== psave || n !== nsave) {
        psave = pp;
        nsave = n;
        if (np < 30.0) {
            qn = _general_1.R_pow_di(q, n);
            gotoL_np_small = true;
        }
        else {
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
    }
    else if (n === nsave) {
        if (np < 30.0)
            gotoL_np_small = true;
    }
    let gotoFinis = false;
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
            if (v > 1.0 || v <= 0)
                continue;
            ix = trunc(x);
        }
        else {
            if (u > p3) {
                ix = trunc(xr - log(v) / xlr);
                if (ix > n)
                    continue;
                v = v * (u - p3) * xlr;
            }
            else {
                ix = trunc(xl + log(v) / xll);
                if (ix < 0)
                    continue;
                v = v * (u - p2) * xll;
            }
        }
        k = abs(ix - m);
        if (k <= 20 || k >= npq / 2 - 1) {
            f = 1.0;
            if (m < ix) {
                for (i = m + 1; i <= ix; i++)
                    f *= g / i - r;
            }
            else if (m !== ix) {
                for (i = ix + 1; i <= m; i++)
                    f /= g / i - r;
            }
            if (v <= f) {
                gotoFinis = true;
                break;
            }
        }
        else {
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
                if (alv <=
                    xm * log(f1 / x1) +
                        (n - m + 0.5) * log(z / w) +
                        (ix - m) * log(w * p / (x1 * q)) +
                        (13860.0 - (462.0 - (132.0 - (99.0 - 140.0 / f2) / f2) / f2) / f2) /
                            f1 /
                            166320.0 +
                        (13860.0 - (462.0 - (132.0 - (99.0 - 140.0 / z2) / z2) / z2) / z2) /
                            z /
                            166320.0 +
                        (13860.0 - (462.0 - (132.0 - (99.0 - 140.0 / x2) / x2) / x2) / x2) /
                            x1 /
                            166320.0 +
                        (13860.0 - (462.0 - (132.0 - (99.0 - 140.0 / w2) / w2) / w2) / w2) /
                            w /
                            166320) {
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
                if (ix > 110)
                    break;
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


/***/ }),
/* 37 */
/***/ (function(module, exports, __nested_webpack_require_107052__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_107052__(1);
const _general_1 = __nested_webpack_require_107052__(0);
const { abs: fabs } = Math;
const printer = debug('chebyshev_eval');
function chebyshev_init(dos, nos, eta) {
    let retCode = 0;
    let err;
    if (nos < 1)
        return 0;
    err = 0.0;
    for (let ii = 1; ii <= nos; ii++) {
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
    let b0;
    let b1;
    let b2;
    let twox;
    let i;
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


/***/ }),
/* 38 */
/***/ (function(module, exports, __nested_webpack_require_108223__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const pgamma_1 = __nested_webpack_require_108223__(18);
function pchisq(x, df, lowerTail = true, logP = false) {
    return pgamma_1.pgamma(x, df / 2., 2., lowerTail, logP);
}
exports.pchisq = pchisq;


/***/ }),
/* 39 */
/***/ (function(module, exports, __nested_webpack_require_108566__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_108566__(1);
const _general_1 = __nested_webpack_require_108566__(0);
const expm1_1 = __nested_webpack_require_108566__(3);
const lgamma_fn_1 = __nested_webpack_require_108566__(4);
const logspace_add_1 = __nested_webpack_require_108566__(127);
const r_func_1 = __nested_webpack_require_108566__(2);
const pchisq_1 = __nested_webpack_require_108566__(38);
const { sqrt, abs: fabs, exp, log, min: fmin2, max: fmax2, LN2: M_LN2, LN10: M_LN10 } = Math;
const { isNaN: ISNAN, isFinite: R_FINITE, EPSILON: DBL_EPSILON, NEGATIVE_INFINITY: ML_NEGINF } = Number;
exports.DBL_MAX_EXP = Math.log2(Number.MAX_VALUE);
exports.DBL_MIN_EXP = Math.log2(Number.MIN_VALUE);
const _dbl_min_exp = M_LN2 * exports.DBL_MIN_EXP;
const { expm1, log1p } = Math;
const printer = debug('pnchisq');
function pnchisq(xx, df, ncp = 0, lower_tail = true, log_p = false) {
    return r_func_1.map(xx)(x => {
        let ans;
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
            }
            else {
                if (ans < (log_p ? -10 * M_LN10 : 1e-10))
                    _general_1.ML_ERROR(_general_1.ME.ME_PRECISION, 'pnchisq', printer);
                if (!log_p)
                    ans = fmax2(ans, 0.0);
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
    let lam;
    let x2;
    let f2;
    let term;
    let bound;
    let f_x_2n;
    let f_2n;
    let l_lam = -1;
    let l_x = -1;
    let lamSml;
    let tSml;
    let is_r;
    let is_b;
    let is_it;
    let ans;
    let u;
    let v;
    let t;
    let lt;
    let lu = -1;
    if (x <= 0) {
        if (x === 0 && f === 0) {
            const _L = -0.5 * theta;
            const result = lower_tail ?
                _general_1.R_D_exp(log_p, _L)
                : (log_p ? expm1_1.R_Log1_Exp(_L)
                    : -expm1(_L));
            printer('result1:%d', result);
            return result;
        }
        return _general_1.R_DT_0(lower_tail, log_p);
    }
    if (!R_FINITE(x))
        return _general_1.R_DT_1(lower_tail, log_p);
    if (theta < 80) {
        let ans;
        let i;
        if (lower_tail &&
            f > 0 &&
            log(x) < M_LN2 + 2 / f * (lgamma_fn_1.lgammafn(f / 2 + 1) + _dbl_min_exp)) {
            let lambda = 0.5 * theta;
            let sum = ML_NEGINF;
            let sum2 = ML_NEGINF;
            let pr = -lambda;
            for (i = 0; i < 110; pr += log(lambda) - log(++i)) {
                sum2 = logspace_add_1.logspace_add(sum2, pr);
                sum = logspace_add_1.logspace_add(sum, pr + pchisq_1.pchisq(x, f + 2 * i, lower_tail, true));
                if (sum2 >= -1e-15) {
                    break;
                }
            }
            ans = sum - sum2;
            printer('pnchisq(x=%d, f=%d, th.=%d); th. < 80, logspace: i=%d, ans=(sum=%d)-(sum2=%d)', x, f, theta, i, sum, sum2);
            return log_p ? ans : exp(ans);
        }
        else {
            let lambda = 0.5 * theta;
            let sum = 0;
            let sum2 = 0;
            let pr = exp(-lambda);
            for (i = 0; i < 110; pr *= lambda / ++i) {
                sum2 += pr;
                sum += pr * pchisq_1.pchisq(x, f + 2 * i, lower_tail, false);
                if (sum2 >= 1 - 1e-15)
                    break;
            }
            ans = sum / sum2;
            printer('pnchisq(x=%d, f=%d, theta=%d); theta < 80: i=%d, sum=%d, sum2=%d', x, f, theta, i, sum, sum2);
            return log_p ? log(ans) : ans;
        }
    }
    printer('pnchisq(x=%d, f=%d, theta=%d >= 80): ', x, f, theta);
    lam = 0.5 * theta;
    lamSml = -lam < _dbl_min_exp;
    if (lamSml) {
        u = 0;
        lu = -lam;
        l_lam = log(lam);
    }
    else {
        u = exp(-lam);
    }
    v = u;
    x2 = 0.5 * x;
    f2 = 0.5 * f;
    f_x_2n = f - x;
    printer('-- v=exp(-th/2)=%d, x/2= %d, f/2= %d', v, x2, f2);
    if (f2 * DBL_EPSILON > 0.125 &&
        fabs((t = x2 - f2)) <
            sqrt(DBL_EPSILON) * f2) {
        lt = (1 - t) * (2 - t / (f2 + 1)) - _general_1.M_LN_SQRT_2PI - 0.5 * log(f2 + 1);
        printer(' (case I) === > ');
    }
    else {
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
    }
    else {
        t = exp(lt);
        printer(', t=exp(lt)= %d', t);
        term = v * t;
        ans = term;
    }
    let n;
    for (n = 1, f_2n = f + 2, f_x_2n += 2;; n++, f_2n += 2, f_x_2n += 2) {
        printer(' _OL_: n=%d', n);
        if (f_x_2n > 0) {
            bound = t * x / f_x_2n;
            printer(' L10: n=%d; term= %d; bound= %d', n, term, bound);
            is_r = is_it = false;
            if (((is_b = bound <= errmax) && (is_r = term <= reltol * ans)) ||
                (is_it = n > itrmax)) {
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
        }
        else {
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
        }
        else {
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


/***/ }),
/* 40 */
/***/ (function(module, exports, __nested_webpack_require_115693__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const qgamma_1 = __nested_webpack_require_115693__(68);
function qchisq(p, df, lowerTail = true, logP = false) {
    return qgamma_1.qgamma(p, 0.5 * df, 2.0, lowerTail, logP);
}
exports.qchisq = qchisq;


/***/ }),
/* 41 */
/***/ (function(module, exports, __nested_webpack_require_116038__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_116038__(1);
const _general_1 = __nested_webpack_require_116038__(0);
const rgamma_1 = __nested_webpack_require_116038__(30);
const rpois_1 = __nested_webpack_require_116038__(32);
const rchisq_1 = __nested_webpack_require_116038__(13);
const printer = debug('rnchisq');
const { isFinite: R_FINITE } = Number;
function rnchisq(n, df, lambda, rng) {
    const result = new Array(n).fill(0).map(() => {
        if (!R_FINITE(df) || !R_FINITE(lambda) || df < 0 || lambda < 0) {
            return _general_1.ML_ERR_return_NAN(printer);
        }
        if (lambda === 0) {
            return df === 0 ? 0 : rgamma_1.rgamma(1, df / 2, 2, rng);
        }
        else {
            let r = rpois_1.rpois(1, lambda / 2, rng);
            if (r > 0)
                r = rchisq_1.rchisq(1, 2 * r, rng);
            if (df > 0)
                r += rgamma_1.rgamma(1, df / 2, 2, rng);
            return r;
        }
    });
    return result.length === 1 ? result[0] : result;
}
exports.rnchisq = rnchisq;


/***/ }),
/* 42 */
/***/ (function(module, exports, __nested_webpack_require_117162__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_117162__(1);
const chebyshev_1 = __nested_webpack_require_117162__(37);
const _general_1 = __nested_webpack_require_117162__(0);
const printer = debug('lgammacor');
const algmcs = [
    +.1666389480451863247205729650822e+0,
    -.1384948176067563840732986059135e-4,
    +.9810825646924729426157171547487e-8,
    -.1809129475572494194263306266719e-10,
    +.6221098041892605227126015543416e-13,
    -.3399615005417721944303330599666e-15,
    +.2683181998482698748957538846666e-17,
    -.2868042435334643284144622399999e-19,
    +.3962837061046434803679306666666e-21,
    -.6831888753985766870111999999999e-23,
    +.1429227355942498147573333333333e-24,
    -.3547598158101070547199999999999e-26,
    +.1025680058010470912000000000000e-27,
    -.3401102254316748799999999999999e-29,
    +.1276642195630062933333333333333e-30
];
const nalgm = 5;
const xbig = 94906265.62425156;
const xmax = 3.745194030963158e306;
function lgammacor(x) {
    let tmp;
    if (x < 10)
        return _general_1.ML_ERR_return_NAN(printer);
    else if (x >= xmax) {
        _general_1.ML_ERROR(_general_1.ME.ME_UNDERFLOW, 'lgammacor', printer);
    }
    else if (x < xbig) {
        tmp = 10 / x;
        return chebyshev_1.chebyshev_eval(tmp * tmp * 2 - 1, algmcs, nalgm) / x;
    }
    return 1 / (x * 12);
}
exports.lgammacor = lgammacor;


/***/ }),
/* 43 */
/***/ (function(module, exports, __nested_webpack_require_118636__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_118636__(1);
const _general_1 = __nested_webpack_require_118636__(0);
const r_func_1 = __nested_webpack_require_118636__(2);
const { isNaN: ISNAN, isFinite: R_FINITE } = Number;
const printer = debug('rnorm');
const seq = r_func_1.seq()();
function rnorm(n = 1, mu = 0, sigma = 1, rng) {
    let result = r_func_1.multiplexer(seq(n))(() => {
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


/***/ }),
/* 44 */
/***/ (function(module, exports, __nested_webpack_require_119465__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var stirlerror_1 = __nested_webpack_require_119465__(74);
exports.stirlerr = stirlerror_1.stirlerr;


/***/ }),
/* 45 */
/***/ (function(module, exports, __nested_webpack_require_119707__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_119707__(1);
const _general_1 = __nested_webpack_require_119707__(0);
const bd0_1 = __nested_webpack_require_119707__(64);
const dnorm_1 = __nested_webpack_require_119707__(31);
const r_func_1 = __nested_webpack_require_119707__(2);
const stirlerror_1 = __nested_webpack_require_119707__(74);
const { log1p, abs: fabs, exp, log, sqrt } = Math;
const { isNaN: ISNAN, EPSILON: DBL_EPSILON, isFinite: R_FINITE } = Number;
const printer_dt = debug('dt');
function dt(xx, n, giveLog = false) {
    return r_func_1.map(xx)(x => {
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
        let u;
        let t = -bd0_1.bd0(n / 2, (n + 1) / 2) + stirlerror_1.stirlerr((n + 1) / 2) - stirlerror_1.stirlerr(n / 2);
        let x2n = x * x / n;
        let ax = 0;
        let l_x2n;
        let lrg_x2n = x2n > 1 / DBL_EPSILON;
        if (lrg_x2n) {
            ax = fabs(x);
            l_x2n = log(ax) - log(n) / 2;
            u =
                n * l_x2n;
        }
        else if (x2n > 0.2) {
            l_x2n = log(1 + x2n) / 2;
            u = n * l_x2n;
        }
        else {
            l_x2n = log1p(x2n) / 2;
            u = -bd0_1.bd0(n / 2, (n + x * x) / 2) + x * x / 2;
        }
        if (giveLog)
            return t - u - (_general_1.M_LN_SQRT_2PI + l_x2n);
        let I_sqrt_ = lrg_x2n ? sqrt(n) / ax : exp(-l_x2n);
        return exp(t - u) * _general_1.M_1_SQRT_2PI * I_sqrt_;
    });
}
exports.dt = dt;


/***/ }),
/* 46 */
/***/ (function(module, exports, __nested_webpack_require_121535__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_121535__(1);
const pbeta_1 = __nested_webpack_require_121535__(12);
const _general_1 = __nested_webpack_require_121535__(0);
const lgamma_fn_1 = __nested_webpack_require_121535__(4);
const pnorm_1 = __nested_webpack_require_121535__(19);
const r_func_1 = __nested_webpack_require_121535__(2);
const pt_1 = __nested_webpack_require_121535__(47);
const { isFinite: R_FINITE, EPSILON: DBL_EPSILON } = Number;
const { sqrt, exp, pow, log, expm1, abs: fabs, min: fmin2 } = Math;
const printer_pnt = debug('pnt');
const DBL_MIN_EXP = -1021;
const M_LN2 = 0.693147180559945309417;
function pnt(tt, df, ncp, lowerTail = true, logP = false) {
    return r_func_1.map(tt)(t => _pnt(t, df, ncp, lowerTail, logP));
}
exports.pnt = pnt;
function _pnt(_t, df, ncp, lower_tail = true, log_p = false) {
    let errbd;
    let rxb;
    let x;
    let geven;
    let godd;
    let p;
    let q;
    let s;
    let tnc = 0;
    let xeven;
    let xodd;
    const itrmax = 1000;
    const errmax = 1e-12;
    if (df <= 0.0) {
        return _general_1.ML_ERR_return_NAN(printer_pnt);
    }
    if (ncp === 0.0) {
        return pt_1.pt(_t, df, lower_tail, log_p);
    }
    if (!R_FINITE(_t)) {
        return _t < 0 ? _general_1.R_DT_0(lower_tail, log_p) : _general_1.R_DT_1(lower_tail, log_p);
    }
    const negdel = _t < 0;
    const tt = fabs(_t);
    const del = _t >= 0 ? ncp : -ncp;
    if (_t < 0 && ncp > 40 && (!log_p || !lower_tail)) {
        printer_pnt('if x <=0 and solution for edge ncp > 40');
        return _general_1.R_DT_0(lower_tail, log_p);
    }
    if (df > 4e5 || del * del > 2 * M_LN2 * -DBL_MIN_EXP) {
        printer_pnt('Abramowitz & Stegun 26.7.10 ncp:%d, del:%d, ncp2:%d, del2:%d, D:%d', ncp, del, ncp * ncp, del * del, 2 * M_LN2 * -DBL_MIN_EXP);
        const _s = 1 / (4 * df);
        return pnorm_1.pnorm5(tt * (1 - _s), del, sqrt(1 + tt * tt * 2 * _s), lower_tail !== negdel, log_p);
    }
    x = _t * _t;
    rxb = df / (x + df);
    x = x / (x + df);
    printer_pnt('pnt(t=%d, df=%d, ncp=%d, rxb=%d) ==> x= %d', _t, df, ncp, rxb, x);
    if (x > 0) {
        printer_pnt('x > 0 branch');
        const lambda = del * del;
        p = 0.5 * exp(-0.5 * lambda);
        printer_pnt('p=%d', p);
        if (p === 0) {
            printer_pnt('p=%d, underflow protection', p);
            _general_1.ML_ERROR(_general_1.ME.ME_UNDERFLOW, 'pnt', printer_pnt);
            _general_1.ML_ERROR(_general_1.ME.ME_RANGE, 'pnt', printer_pnt);
            return _general_1.R_DT_0(lower_tail, log_p);
        }
        printer_pnt('it  1e5*(godd,   geven)|          p           q           s' +
            '        pnt(*)     errbd');
        q = _general_1.M_SQRT_2dPI * p * del;
        s = 0.5 - p;
        if (s < 1e-7)
            s = -0.5 * expm1(-0.5 * lambda);
        let a = 0.5;
        let b = 0.5 * df;
        rxb = pow(rxb, b);
        const albeta = _general_1.M_LN_SQRT_PI + lgamma_fn_1.lgammafn(b) - lgamma_fn_1.lgammafn(0.5 + b);
        xodd = pbeta_1.pbeta(x, a, b, true, false);
        printer_pnt('return from pbeta:%d', xodd);
        godd = 2 * rxb * exp(a * log(x) - albeta);
        tnc = b * x;
        xeven = tnc < DBL_EPSILON ? tnc : 1 - rxb;
        geven = tnc * rxb;
        tnc = p * xodd + q * xeven;
        let gotoFinis = false;
        for (let it = 1; it <= itrmax; it++) {
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
    const rc = _general_1.R_DT_val(lower_tail, log_p, fmin2(tnc, 1));
    printer_pnt('rc:%d, tnc:%d, log_p:%s, lower_tail:%s', rc, tnc, log_p, lower_tail);
    return rc;
}


/***/ }),
/* 47 */
/***/ (function(module, exports, __nested_webpack_require_126593__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_126593__(1);
const lbeta_1 = __nested_webpack_require_126593__(11);
const pbeta_1 = __nested_webpack_require_126593__(12);
const _general_1 = __nested_webpack_require_126593__(0);
const pnorm_1 = __nested_webpack_require_126593__(19);
const r_func_1 = __nested_webpack_require_126593__(2);
const { log1p, sqrt, log, abs: fabs, exp } = Math;
const { isNaN: ISNAN, isFinite: R_FINITE } = Number;
const printer = debug('pt');
function pt(xx, n, lowerTail = true, log_p = false) {
    return r_func_1.map(xx)(x => {
        let val;
        let nx;
        let lower_tail = lowerTail;
        if (ISNAN(x) || ISNAN(n))
            return x + n;
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
            let lval;
            lval =
                -0.5 * n * (2 * log(fabs(x)) - log(n)) -
                    lbeta_1.internal_lbeta(0.5 * n, 0.5) -
                    log(0.5 * n);
            val = log_p ? lval : exp(lval);
        }
        else {
            val =
                n > x * x
                    ? pbeta_1.pbeta(x * x / (n + x * x), 0.5, n / 2, false, log_p)
                    : pbeta_1.pbeta(1 / nx, n / 2, 0.5, true, log_p);
        }
        if (x <= 0) {
            lower_tail = !lower_tail;
        }
        if (log_p) {
            if (lower_tail) {
                return log1p(-0.5 * exp(val));
            }
            else {
                return val - _general_1.M_LN2;
            }
        }
        else {
            val /= 2;
            return _general_1.R_D_Cval(lower_tail, val);
        }
    });
}
exports.pt = pt;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class WilcoxonCache {
    constructor() {
        this._map2 = {};
    }
    get(i, j, k) {
        const jstruct = this._map2[i];
        if (jstruct !== undefined) {
            const kstruct = jstruct[j];
            if (kstruct !== undefined) {
                return kstruct[k];
            }
        }
        return undefined;
    }
    set(i, j, k, value) {
        let jstruct = this._map2[i];
        if (jstruct === undefined) {
            jstruct = {};
            this._map2[i] = jstruct;
        }
        let kstruct = jstruct[j];
        if (kstruct === undefined) {
            kstruct = {};
            jstruct[j] = kstruct;
        }
        kstruct[k] = value;
    }
}
exports.WilcoxonCache = WilcoxonCache;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const { trunc } = Math;
function cwilcox(k, m, n, w) {
    let i;
    let j;
    const u = m * n;
    const c = trunc(u / 2);
    if (k < 0 || k > u) {
        return 0;
    }
    if (k > c) {
        k = u - k;
    }
    if (m < n) {
        i = m;
        j = n;
    }
    else {
        i = n;
        j = m;
    }
    if (j > 0 && k < j) {
        return cwilcox(k, i, k, w);
    }
    if (w.get(i, j, k) === undefined) {
        if (j === 0) {
            w.set(i, j, k, k === 0 ? 1 : 0);
        }
        else {
            const c1 = cwilcox(k - j, i - 1, j, w);
            const c2 = cwilcox(k, i, j - 1, w);
            w.set(i, j, k, c1 + c2);
        }
    }
    const result = w.get(i, j, k);
    if (result === undefined) {
        throw new Error('WilcoxonCache not set');
    }
    return result;
}
exports.cwilcox = cwilcox;


/***/ }),
/* 50 */
/***/ (function(module, exports, __nested_webpack_require_130663__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_130663__(1);
const _general_1 = __nested_webpack_require_130663__(0);
const r_func_1 = __nested_webpack_require_130663__(2);
const cospi_1 = __nested_webpack_require_130663__(23);
const sinpi_1 = __nested_webpack_require_130663__(24);
const besselY_1 = __nested_webpack_require_130663__(52);
const Jbessel_1 = __nested_webpack_require_130663__(103);
const { isNaN: ISNAN } = Number;
const { floor, trunc } = Math;
const printer = debug('bessel_j');
function bessel_j(_x, _alpha) {
    return r_func_1.multiplexer(_x, _alpha)((x, alpha) => internal_bessel_j(x, alpha));
}
exports.bessel_j = bessel_j;
function internal_bessel_j(x, alpha) {
    let nb;
    let na;
    if (ISNAN(x) || ISNAN(alpha))
        return x + alpha;
    if (x < 0) {
        _general_1.ML_ERROR(_general_1.ME.ME_RANGE, 'bessel_j', printer);
        return NaN;
    }
    na = floor(alpha);
    if (alpha < 0) {
        return (((alpha - na === 0.5) ? 0 : internal_bessel_j(x, -alpha) * cospi_1.cospi(alpha)) +
            ((alpha === na) ? 0 : besselY_1.internal_bessel_y(x, -alpha) * sinpi_1.sinpi(alpha)));
    }
    else if (alpha > 1e7) {
        printer('besselJ(x, nu): nu=%d too large for bessel_j() algorithm', alpha);
        return NaN;
    }
    nb = 1 + trunc(na);
    alpha -= (nb - 1);
    const rc = Jbessel_1.J_bessel(x, alpha, nb);
    if (rc.ncalc !== nb) {
        if (rc.ncalc < 0)
            printer('bessel_j(%d): ncalc (=%d) != nb (=%d); alpha=%d. Arg. out of range?', x, rc.ncalc, rc.nb, alpha);
        else
            printer('bessel_j(%d,nu=%d): precision lost in result', x, alpha + nb - 1);
    }
    x = rc.x;
    return x;
}
exports.internal_bessel_j = internal_bessel_j;


/***/ }),
/* 51 */
/***/ (function(module, exports, __nested_webpack_require_132438__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_132438__(1);
const _general_1 = __nested_webpack_require_132438__(0);
const r_func_1 = __nested_webpack_require_132438__(2);
const Kbessel_1 = __nested_webpack_require_132438__(104);
const { isNaN: ISNAN } = Number;
const { floor } = Math;
const printer = debug('bessel_k');
function bessel_k(_x, _alpha, _expo) {
    return r_func_1.multiplexer(_x, _alpha, _expo)((x, alpha, expo) => internal_bessel_k(x, alpha, expo));
}
exports.bessel_k = bessel_k;
function internal_bessel_k(x, alpha, expo = false) {
    let nb;
    let ize;
    if (ISNAN(x) || ISNAN(alpha))
        return x + alpha;
    if (x < 0) {
        _general_1.ML_ERROR(_general_1.ME.ME_RANGE, 'bessel_k', printer);
        return NaN;
    }
    ize = expo ? 2 : 1;
    if (alpha < 0)
        alpha = -alpha;
    nb = 1 + floor(alpha);
    alpha -= (nb - 1);
    const rc = Kbessel_1.K_bessel(x, alpha, nb, ize);
    if (rc.ncalc !== rc.nb) {
        if (rc.ncalc < 0)
            printer('bessel_k(%d): ncalc (=%d) != nb (=%d); alpha=%d. Arg. out of range?\n', rc.x, rc.ncalc, rc.nb, alpha);
        else
            printer('bessel_k(%d,nu=%d): precision lost in result\n', rc.x, alpha + rc.nb - 1);
    }
    x = rc.x;
    return x;
}
exports.internal_bessel_k = internal_bessel_k;


/***/ }),
/* 52 */
/***/ (function(module, exports, __nested_webpack_require_133827__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_133827__(1);
const _general_1 = __nested_webpack_require_133827__(0);
const r_func_1 = __nested_webpack_require_133827__(2);
const cospi_1 = __nested_webpack_require_133827__(23);
const sinpi_1 = __nested_webpack_require_133827__(24);
const besselJ_1 = __nested_webpack_require_133827__(50);
const Ybessel_1 = __nested_webpack_require_133827__(105);
const { floor } = Math;
const { isNaN: ISNAN, POSITIVE_INFINITY: ML_POSINF } = Number;
const printer = debug('bessel_y');
function bessel_y(_x, _alpha) {
    return r_func_1.multiplexer(_x, _alpha)((x, alpha) => internal_bessel_y(x, alpha));
}
exports.bessel_y = bessel_y;
function internal_bessel_y(x, alpha) {
    if (ISNAN(x) || ISNAN(alpha))
        return x + alpha;
    if (x < 0) {
        _general_1.ML_ERROR(_general_1.ME.ME_RANGE, 'bessel_y', printer);
        return NaN;
    }
    const na = floor(alpha);
    if (alpha < 0) {
        return (((alpha - na === 0.5) ? 0 : internal_bessel_y(x, -alpha) * cospi_1.cospi(alpha)) -
            ((alpha === na) ? 0 : besselJ_1.internal_bessel_j(x, -alpha) * sinpi_1.sinpi(alpha)));
    }
    else if (alpha > 1e7) {
        printer('besselY(x, nu): nu=%d too large for bessel_y() algorithm', alpha);
        return NaN;
    }
    const nb = 1 + na;
    alpha -= (nb - 1);
    const rc = Ybessel_1.Y_bessel(x, alpha, nb);
    if (rc.ncalc !== nb) {
        if (rc.ncalc === -1) {
            return ML_POSINF;
        }
        else if (rc.ncalc < -1)
            printer('bessel_y(%d): ncalc (=%d) != nb (=%d); alpha=%d. Arg. out of range?\n', rc.x, rc.ncalc, nb, alpha);
        else
            printer('bessel_y(%d,nu=%d): precision lost in result\n', rc.x, alpha + nb - 1);
    }
    x = rc.x;
    return x;
}
exports.internal_bessel_y = internal_bessel_y;


/***/ }),
/* 53 */
/***/ (function(module, exports, __nested_webpack_require_135690__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_135690__(1);
const _general_1 = __nested_webpack_require_135690__(0);
const dbinom_1 = __nested_webpack_require_135690__(17);
const r_func_1 = __nested_webpack_require_135690__(2);
const lbeta_1 = __nested_webpack_require_135690__(11);
const { log, log1p } = Math;
const { isNaN: ISNAN, isFinite: R_FINITE, POSITIVE_INFINITY: ML_POSINF } = Number;
const printer = debug('dbeta');
function dbeta(_x, _a, _b, _asLog) {
    return r_func_1.multiplexer(_x, _a, _b, _asLog)((x, a, b, asLog) => {
        if (ISNAN(x) || ISNAN(a) || ISNAN(b))
            return x + a + b;
        if (a < 0 || b < 0)
            return _general_1.ML_ERR_return_NAN(printer);
        if (x < 0 || x > 1)
            return _general_1.R_D__0(asLog);
        if (a === 0 || b === 0 || !R_FINITE(a) || !R_FINITE(b)) {
            if (a === 0 && b === 0) {
                if (x === 0 || x === 1)
                    return ML_POSINF;
                else
                    return _general_1.R_D__0(asLog);
            }
            if (a === 0 || a / b === 0) {
                if (x === 0)
                    return ML_POSINF;
                else
                    return _general_1.R_D__0(asLog);
            }
            if (b === 0 || b / a === 0) {
                if (x === 1)
                    return ML_POSINF;
                else
                    return _general_1.R_D__0(asLog);
            }
            if (x === 0.5)
                return ML_POSINF;
            else
                return _general_1.R_D__0(asLog);
        }
        if (x === 0) {
            if (a > 1)
                return _general_1.R_D__0(asLog);
            if (a < 1)
                return ML_POSINF;
            return _general_1.R_D_val(asLog, b);
        }
        if (x === 1) {
            if (b > 1)
                return _general_1.R_D__0(asLog);
            if (b < 1)
                return ML_POSINF;
            return _general_1.R_D_val(asLog, a);
        }
        let lval;
        if (a <= 2 || b <= 2)
            lval = (a - 1) * log(x) + (b - 1) * log1p(-x) - lbeta_1.internal_lbeta(a, b);
        else {
            lval = log(a + b - 1) + dbinom_1.dbinom_raw(a - 1, a + b - 2, x, 1 - x, true);
        }
        return _general_1.R_D_exp(asLog, lval);
    });
}
exports.dbeta = dbeta;


/***/ }),
/* 54 */
/***/ (function(module, exports, __nested_webpack_require_138099__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_138099__(1);
const _general_1 = __nested_webpack_require_138099__(0);
const dpois_1 = __nested_webpack_require_138099__(22);
const r_func_1 = __nested_webpack_require_138099__(2);
const dbeta_1 = __nested_webpack_require_138099__(53);
const { log: ln, sqrt, ceil } = Math;
const { isNaN: ISNAN, isFinite: R_FINITE } = Number;
const printer = debug('dnbeta');
function dnbeta(_x, _shape1, _shape2, _ncp, _asLog) {
    return r_func_1.multiplexer(_x, _shape1, _shape2, _ncp, _asLog)(function (x, shape1, shape2, ncp, asLog) {
        return _dnbeta(x, shape1, shape2, ncp, asLog);
    });
}
exports.dnbeta = dnbeta;
function _dnbeta(x, a, b, ncp, give_log) {
    const eps = 1e-15;
    let kMax;
    let k;
    let ncp2;
    let dx2;
    let d;
    let D;
    let term;
    let sum;
    let p_k;
    let q;
    if (ISNAN(x) || ISNAN(a) || ISNAN(b) || ISNAN(ncp))
        return x + a + b + ncp;
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
    }
    else {
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


/***/ }),
/* 55 */
/***/ (function(module, exports, __nested_webpack_require_140356__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_140356__(1);
const _general_1 = __nested_webpack_require_140356__(0);
const expm1_1 = __nested_webpack_require_140356__(3);
const lbeta_1 = __nested_webpack_require_140356__(11);
const pbeta_1 = __nested_webpack_require_140356__(12);
const { expm1, log1p, sqrt, min: fmin2, exp, abs: fabs, log, pow, max: fmax2 } = Math;
const { isNaN: ISNAN, MIN_VALUE: DBL_MIN, EPSILON: DBL_EPSILON, POSITIVE_INFINITY: ML_POSINF, NEGATIVE_INFINITY: ML_NEGINF, isFinite: R_FINITE, NaN: ML_NAN } = Number;
const USE_LOG_X_CUTOFF = -5;
const n_NEWTON_FREE = 4;
const MLOGICAL_NA = -1;
const printer_qbeta = debug('qbeta');
function qbeta(pp, shape1, shape2, lower_tail, log_p) {
    const fa = Array.isArray(pp) ? pp : [pp];
    const result = fa.map(p => {
        if (ISNAN(shape1) || ISNAN(shape2) || ISNAN(p))
            return shape1 + shape2 + p;
        if (shape1 < 0 || shape2 < 0) {
            return _general_1.ML_ERR_return_NAN(printer_qbeta);
        }
        let qbet = [0, 0];
        qbeta_raw(p, shape1, shape2, lower_tail, log_p, MLOGICAL_NA, USE_LOG_X_CUTOFF, n_NEWTON_FREE, qbet);
        return qbet[0];
    });
    return result.length === 1 ? result[0] : result;
}
exports.qbeta = qbeta;
const DBL_very_MIN = DBL_MIN / 4;
const DBL_log_v_MIN = _general_1.M_LN2 * (_general_1.DBL_MIN_EXP - 2);
const DBL_1__eps = 1 - DBL_EPSILON;
const fpu = 3e-308;
const acu_min = 1e-300;
const p_lo = fpu;
const p_hi = 1 - 2.22e-16;
const const1 = 2.30753;
const const2 = 0.27061;
const const3 = 0.99229;
const const4 = 0.04481;
function return_q_0(give_log_q, qb) {
    if (give_log_q) {
        qb[0] = ML_NEGINF;
        qb[1] = 0;
    }
    else {
        qb[0] = 0;
        qb[1] = 1;
    }
    return;
}
function return_q_1(give_log_q, qb) {
    if (give_log_q) {
        qb[0] = 0;
        qb[1] = ML_NEGINF;
    }
    else {
        qb[0] = 1;
        qb[1] = 0;
    }
    return;
}
function return_q_half(give_log_q, qb) {
    if (give_log_q) {
        qb[0] = qb[1] = -_general_1.M_LN2;
    }
    else {
        qb[0] = qb[1] = 0.5;
    }
    return;
}
const printer_qbeta_raw = debug('qbeta_raw');
const R_ifDEBUG_printf = printer_qbeta_raw;
function qbeta_raw(alpha, p, q, lower_tail, log_p, swap_01, log_q_cut, n_N, qb) {
    let swap_choose = swap_01 === MLOGICAL_NA;
    let swap_tail;
    let log_;
    let give_log_q = log_q_cut === ML_POSINF;
    let use_log_x = give_log_q;
    let warned = false;
    let add_N_step = true;
    let i_pb;
    let i_inn;
    let a;
    let la;
    let logbeta;
    let g;
    let h;
    let pp;
    let p_;
    let qq;
    let r;
    let s;
    let t;
    let w;
    let y = -1;
    let u = 0;
    let xinbta = 0;
    let u_n = 0;
    if (alpha === _general_1.R_DT_0(lower_tail, log_p)) {
        return return_q_0(give_log_q, qb);
    }
    if (alpha === _general_1.R_DT_1(lower_tail, log_p)) {
        return return_q_1(give_log_q, qb);
    }
    if ((log_p && alpha > 0) || (!log_p && (alpha < 0 || alpha > 1))) {
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
        }
        else if (p === 0 || p / q === 0) {
            return_q_0;
        }
        else if (q === 0 || q / p === 0) {
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
    }
    else {
        a = p_;
        la = expm1_1.R_DT_log(lower_tail, log_p, alpha);
        pp = p;
        qq = q;
    }
    let acu = fmax2(acu_min, pow(10, -13 - 2.5 / (pp * pp) - 0.5 / (a * a)));
    let tx = 0;
    let u0 = (la + log(pp) + logbeta) / pp;
    let log_eps_c = _general_1.M_LN2 * (1 - _general_1.DBL_MANT_DIG);
    r = pp * (1 - qq) / (pp + 1);
    t = 0.2;
    printer_qbeta_raw('qbeta(%d, %d, %d, lower_t=%d, log_p=%d):%s   swap_tail=%d, la=%d, u0=%d (bnd: %d (%d)) ', alpha, p, q, lower_tail, log_p, log_p && (p_ === 0 || p_ === 1) ? (p_ === 0 ? ' p_=0' : ' p_=1') : '', swap_tail, la, u0, (t * log_eps_c - log(fabs(pp * (1 - qq) * (2 - qq) / (2 * (pp + 2))))) / 2, t * log_eps_c - log(fabs(r)));
    let goto_L_Newton = false;
    let goto_L_return = false;
    let goto_L_converged = false;
    if (_general_1.M_LN2 * _general_1.DBL_MIN_EXP < u0 &&
        u0 < -0.01 &&
        u0 <
            (t * log_eps_c - log(fabs(pp * (1 - qq) * (2 - qq) / (2 * (pp + 2))))) / 2) {
        r = r * exp(u0);
        if (r > -1) {
            u = u0 - log1p(r) / pp;
            printer_qbeta_raw('u1-u0=%d --> choosing u = u1', u - u0);
        }
        else {
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
                u =
                    t <= 18 ? -log1p(exp(t)) : -t - exp(-t);
                xinbta = exp(u);
            }
            else {
                xinbta = pp / (pp + qq * exp(w + w));
                u = -log1p(qq / pp * exp(w + w));
            }
        }
        else {
            r = qq + qq;
            t = 1 / (3 * sqrt(qq));
            t = r * _general_1.R_pow_di(1 + t * (-t + y), 3);
            s = 4 * pp + r - 2;
            R_ifDEBUG_printf('min(p,q) <= 1: t=%g', t);
            if (t === 0 || (t < 0 && s >= t)) {
                let l1ma;
                if (swap_tail)
                    l1ma = expm1_1.R_DT_log(lower_tail, log_p, alpha);
                else
                    l1ma = expm1_1.R_DT_Clog(lower_tail, log_p, alpha);
                R_ifDEBUG_printf(' t <= 0 : log1p(-a)=%.15g, better l1ma=%.15g\n', log1p(-a), l1ma);
                let xx = (l1ma + log(qq) + logbeta) / qq;
                if (xx <= 0) {
                    xinbta = -expm1(xx);
                    u = expm1_1.R_Log1_Exp(xx);
                }
                else {
                    R_ifDEBUG_printf(' xx=%g > 0: xinbta:= 1-e^xx < 0\n', xx);
                    xinbta = 0;
                    u = ML_NEGINF;
                }
            }
            else {
                t = s / t;
                R_ifDEBUG_printf(' t > 0 or s < t < 0:  new t = %g ( > 1 ?)\n', t);
                if (t <= 1) {
                    u = (la + log(pp) + logbeta) / pp;
                    xinbta = exp(u);
                }
                else {
                    xinbta = 1 - 2 / (t + 1);
                    u = log1p(-2 / (t + 1));
                }
            }
        }
        if (swap_choose &&
            ((swap_tail && u >= -exp(log_q_cut)) ||
                (!swap_tail && u >= -exp(4 * log_q_cut) && pp / qq < 1000))) {
            swap_tail = !swap_tail;
            R_ifDEBUG_printf(' u = %g (e^u = xinbta = %.16g) ==> ', u, xinbta);
            if (swap_tail) {
                a = expm1_1.R_DT_CIv(lower_tail, log_p, alpha);
                la = expm1_1.R_DT_Clog(lower_tail, log_p, alpha);
                pp = q;
                qq = p;
            }
            else {
                a = p_;
                la = expm1_1.R_DT_log(lower_tail, log_p, alpha);
                pp = p;
                qq = q;
            }
            R_ifDEBUG_printf('"%s\'; la = %g\n', swap_tail ? 'swap now' : 'swap back', la);
            u = expm1_1.R_Log1_Exp(u);
            xinbta = exp(u);
        }
        if (!use_log_x)
            use_log_x = u < log_q_cut;
        let bad_u = !R_FINITE(u);
        let bad_init = bad_u || xinbta > p_hi;
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
                }
                else {
                    tx = 0;
                    u_n = ML_NEGINF;
                }
                use_log_x = log_p;
                add_N_step = false;
                goto_L_return = true;
            }
            else {
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
            }
            else {
                R_ifDEBUG_printf(' bad_init: u=%g, xinbta=%g;', u, xinbta);
                xinbta =
                    xinbta > 1.1
                        ? 0.5
                        : xinbta < p_lo ? exp(u) : p_hi;
                if (bad_u)
                    u = log(xinbta);
            }
            R_ifDEBUG_printf(' -> (partly)new u=%g, xinbta=%g\n', u, xinbta);
        }
    }
    if (!goto_L_return) {
        r = 1 - pp;
        t = 1 - qq;
        let wprev = 0;
        let prev = 1;
        let adj = 1;
        if (use_log_x) {
            for (i_pb = 0; i_pb < 1000; i_pb++) {
                y = pbeta_1.pbeta_raw(xinbta, pp, qq, true, true);
                w =
                    y === ML_NEGINF
                        ? 0
                        : (y - la) * exp(y - u + logbeta + r * u + t * expm1_1.R_Log1_Exp(u));
                if (!R_FINITE(w))
                    break;
                if (i_pb >= n_N && w * wprev <= 0)
                    prev = fmax2(fabs(adj), fpu);
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
                let D = fmin2(fabs(adj), fabs(u_n - u));
                R_ifDEBUG_printf(' it{in}=%d, delta(u)=%9.3g, D/|.|=%.3g\n', i_inn, u_n - u, D / fabs(u_n + u));
                if (D <= 4e-16 * fabs(u_n + u)) {
                    goto_L_converged = true;
                    break;
                }
                u = u_n;
                xinbta = exp(u);
                wprev = w;
            }
        }
        else {
            for (i_pb = 0; i_pb < 1000; i_pb++) {
                y = pbeta_1.pbeta_raw(xinbta, pp, qq, true, log_p);
                if (!R_FINITE(y) && !(log_p && y === ML_NEGINF)) {
                    _general_1.ML_ERROR(_general_1.ME.ME_DOMAIN, '', printer_qbeta_raw);
                    qb[0] = qb[1] = ML_NAN;
                    return;
                }
                w = log_p
                    ? (y - la) * exp(y + logbeta + r * log(xinbta) + t * log1p(-xinbta))
                    : (y - a) * exp(logbeta + r * log(xinbta) + t * log1p(-xinbta));
                if (i_pb >= n_N && w * wprev <= 0)
                    prev = fmax2(fabs(adj), fpu);
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
                            if (tx !== 0 && tx !== 1)
                                break;
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
                if (tx === 0)
                    break;
                wprev = w;
            }
        }
        if (!goto_L_converged) {
            warned = true;
            _general_1.ML_ERROR(_general_1.ME.ME_PRECISION, 'qbeta', printer_qbeta_raw);
        }
        log_ = log_p || use_log_x;
        R_ifDEBUG_printf(' %s: Final delta(y) = %g%s\n', warned ? '_NO_ convergence' : 'converged', y - (log_ ? la : a), log_ ? ' (log_)' : '');
        if ((log_ && y === ML_NEGINF) || (!log_ && y === 0)) {
            w = pbeta_1.pbeta_raw(DBL_very_MIN, pp, qq, true, log_);
            if (log_ || fabs(w - a) <= fabs(y - a)) {
                tx = DBL_very_MIN;
                u_n = DBL_log_v_MIN;
            }
            add_N_step = false;
        }
        else if (!warned && (log_ ? fabs(y - la) > 3 : fabs(y - a) > 1e-4)) {
            if (!(log_ &&
                y === ML_NEGINF &&
                pbeta_1.pbeta_raw(DBL_1__eps, pp, qq, true, true) >
                    la + 2))
                printer_qbeta_raw('qbeta(a, *) =: x0 with |pbeta(x0,* %s) - alpha| = %d is not accurate', log_ ? ', log_' : '', fabs(y - (log_ ? la : a)));
        }
    }
    if (give_log_q) {
        if (!use_log_x)
            printer_qbeta_raw('qbeta() L_return, u_n=%d;  give_log_q=TRUE but use_log_x=FALSE -- please report!', u_n);
        let r = expm1_1.R_Log1_Exp(u_n);
        if (swap_tail) {
            qb[0] = r;
            qb[1] = u_n;
        }
        else {
            qb[0] = u_n;
            qb[1] = r;
        }
    }
    else {
        if (use_log_x) {
            if (add_N_step) {
                xinbta = exp(u_n);
                y = pbeta_1.pbeta_raw(xinbta, pp, qq, true, log_p);
                w = log_p
                    ? (y - la) * exp(y + logbeta + r * log(xinbta) + t * log1p(-xinbta))
                    : (y - a) * exp(logbeta + r * log(xinbta) + t * log1p(-xinbta));
                tx = xinbta - w;
                R_ifDEBUG_printf('Final Newton correction(non-log scale): xinbta=%.16g, y=%g, w=%g. => new tx=%.16g\n', xinbta, y, w, tx);
            }
            else {
                if (swap_tail) {
                    qb[0] = -expm1(u_n);
                    qb[1] = exp(u_n);
                }
                else {
                    qb[0] = exp(u_n);
                    qb[1] = -expm1(u_n);
                }
                return;
            }
        }
        if (swap_tail) {
            qb[0] = 1 - tx;
            qb[1] = tx;
        }
        else {
            qb[0] = tx;
            qb[1] = 1 - tx;
        }
    }
    return;
}
exports.qbeta_raw = qbeta_raw;


/***/ }),
/* 56 */
/***/ (function(module, exports, __nested_webpack_require_157606__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_157606__(1);
const _general_1 = __nested_webpack_require_157606__(0);
const expm1_1 = __nested_webpack_require_157606__(3);
const r_func_1 = __nested_webpack_require_157606__(2);
const pnbeta_1 = __nested_webpack_require_157606__(35);
const { isNaN: ISNAN, isFinite: R_FINITE, MIN_VALUE: DBL_MIN, EPSILON: DBL_EPSILON } = Number;
const { min: fmin2 } = Math;
const printer_qnbeta = debug('qnbeta');
function qnbeta(_p, a, b, ncp, lower_tail, log_p) {
    const accu = 1e-15;
    const Eps = 1e-14;
    return r_func_1.map(_p)(p => {
        let ux;
        let lx;
        let nx;
        let pp;
        if (ISNAN(p) || ISNAN(a) || ISNAN(b) || ISNAN(ncp))
            return p + a + b + ncp;
        if (!R_FINITE(a))
            return _general_1.ML_ERR_return_NAN(printer_qnbeta);
        if (ncp < 0 || a <= 0 || b <= 0)
            return _general_1.ML_ERR_return_NAN(printer_qnbeta);
        let rc = _general_1.R_Q_P01_boundaries(lower_tail, log_p, p, 0, 1);
        if (rc !== undefined) {
            return rc;
        }
        p = expm1_1.R_DT_qIv(lower_tail, log_p, p);
        if (p > 1 - DBL_EPSILON)
            return 1.0;
        pp = fmin2(1 - DBL_EPSILON, p * (1 + Eps));
        for (ux = 0.5; ux < 1 - DBL_EPSILON && pnbeta_1.pnbeta(ux, a, b, ncp, true, false) < pp; ux = 0.5 * (1 + ux))
            ;
        pp = p * (1 - Eps);
        for (lx = 0.5; lx > DBL_MIN && pnbeta_1.pnbeta(lx, a, b, ncp, true, false) > pp; lx *= 0.5)
            ;
        do {
            nx = 0.5 * (lx + ux);
            if (pnbeta_1.pnbeta(nx, a, b, ncp, true, false) > p)
                ux = nx;
            else
                lx = nx;
        } while ((ux - lx) / nx > accu);
        return 0.5 * (ux + lx);
    });
}
exports.qnbeta = qnbeta;


/***/ }),
/* 57 */
/***/ (function(module, exports, __nested_webpack_require_159484__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_159484__(1);
const _general_1 = __nested_webpack_require_159484__(0);
const { isNaN: ISNAN, isFinite: R_FINITE } = Number;
const { floor, log } = Math;
const pbeta_1 = __nested_webpack_require_159484__(12);
const toms708_1 = __nested_webpack_require_159484__(9);
const printer = debug('pnbinom');
function pnbinom(xx, size, prob, lowerTail, logP) {
    const fx = Array.isArray(xx) ? xx : [xx];
    const result = fx.map(x => {
        if (ISNAN(x) || ISNAN(size) || ISNAN(prob))
            return x + size + prob;
        if (!R_FINITE(size) || !R_FINITE(prob)) {
            return _general_1.ML_ERR_return_NAN(printer);
        }
        if (size < 0 || prob <= 0 || prob > 1) {
            return _general_1.ML_ERR_return_NAN(printer);
        }
        if (size === 0)
            return x >= 0 ? _general_1.R_DT_1(lowerTail, logP) : _general_1.R_DT_0(lowerTail, logP);
        if (x < 0)
            return _general_1.R_DT_0(lowerTail, logP);
        if (!R_FINITE(x))
            return _general_1.R_DT_1(lowerTail, logP);
        x = floor(x + 1e-7);
        return pbeta_1.pbeta(prob, size, x + 1, lowerTail, logP);
    });
    return result.length === 1 ? result[0] : result;
}
exports.pnbinom = pnbinom;
const printer_pnbinom_mu = debug('printer_pnbinom_mu');
function pnbinom_mu(xx, size, mu, lowerTail, logP) {
    const fx = Array.isArray(xx) ? xx : [xx];
    const result = fx.map(x => {
        if (ISNAN(x) || ISNAN(size) || ISNAN(mu))
            return x + size + mu;
        if (!R_FINITE(size) || !R_FINITE(mu))
            return _general_1.ML_ERR_return_NAN(printer_pnbinom_mu);
        if (size < 0 || mu < 0)
            return _general_1.ML_ERR_return_NAN(printer_pnbinom_mu);
        if (size === 0)
            return x >= 0 ? _general_1.R_DT_1(lowerTail, logP) : _general_1.R_DT_0(lowerTail, logP);
        if (x < 0)
            return _general_1.R_DT_0(lowerTail, logP);
        if (!R_FINITE(x))
            return _general_1.R_DT_1(lowerTail, logP);
        x = floor(x + 1e-7);
        {
            let ierr = new toms708_1.NumberW(0);
            let w = new toms708_1.NumberW(0);
            let wc = new toms708_1.NumberW(0);
            toms708_1.Toms708.bratio(size, x + 1, size / (size + mu), mu / (size + mu), w, wc, ierr);
            if (ierr)
                printer('pnbinom_mu() -> bratio() gave error code %d', ierr.val);
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


/***/ }),
/* 58 */
/***/ (function(module, exports, __nested_webpack_require_162259__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_162259__(1);
const pbeta_1 = __nested_webpack_require_162259__(12);
const _general_1 = __nested_webpack_require_162259__(0);
const r_func_1 = __nested_webpack_require_162259__(2);
const printer = debug('pbinom');
const { floor, round: R_forceint } = Math;
const { isNaN: ISNAN, isFinite: R_FINITE } = Number;
function pbinom(xx, n, p, lowerTail = true, logP = false) {
    return r_func_1.map(xx)(x => {
        if (ISNAN(x) || ISNAN(n) || ISNAN(p))
            return NaN;
        if (!R_FINITE(n) || !R_FINITE(p)) {
            return _general_1.ML_ERR_return_NAN(printer);
        }
        let lower_tail = lowerTail;
        let log_p = logP;
        if (_general_1.R_nonint(n)) {
            printer('non-integer n = %d', n);
            return _general_1.ML_ERR_return_NAN(printer);
        }
        n = R_forceint(n);
        if (n < 0 || p < 0 || p > 1)
            return _general_1.ML_ERR_return_NAN(printer);
        if (x < 0)
            return _general_1.R_DT_0(lower_tail, log_p);
        x = floor(x + 1e-7);
        if (n <= x)
            return _general_1.R_DT_1(lower_tail, log_p);
        printer('calling pbeta:(q=%d,a=%d,b=%d, l.t=%s, log=%s', p, x + 1, n - x, !lower_tail, log_p);
        return pbeta_1.pbeta(p, x + 1, n - x, !lower_tail, log_p);
    });
}
exports.pbinom = pbinom;


/***/ }),
/* 59 */
/***/ (function(module, exports, __nested_webpack_require_163707__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_163707__(1);
const _general_1 = __nested_webpack_require_163707__(0);
const { max: fmax2, min: fmin2, floor, sqrt } = Math;
const { isNaN: ISNAN, isFinite: R_FINITE, EPSILON: DBL_EPSILON } = Number;
const toms708_1 = __nested_webpack_require_163707__(9);
const expm1_1 = __nested_webpack_require_163707__(3);
const qnorm_1 = __nested_webpack_require_163707__(6);
const r_func_1 = __nested_webpack_require_163707__(2);
const pbinom_1 = __nested_webpack_require_163707__(58);
const printer_do_search = debug('do_search');
function do_search(y, z, p, n, pr, incr) {
    if (z.val >= p) {
        printer_do_search('new z=%o >= p = %d  --> search to left (y--) ..', z, p);
        while (true) {
            let newz;
            if (y === 0 ||
                (newz = pbinom_1.pbinom(y - incr, n, pr, true, false)) < p)
                return y;
            y = fmax2(0, y - incr);
            z.val = newz;
        }
    }
    else {
        printer_do_search('new z=%d < p = %d  --> search to right (y++) ..', z.val, p);
        while (true) {
            y = fmin2(y + incr, n);
            if (y === n ||
                (z.val = pbinom_1.pbinom(y, n, pr, true, false)) >= p)
                return y;
        }
    }
}
function qbinom(pp, n, pr, lowerTail = true, logP = false) {
    return r_func_1.map(pp)(p => _qbinom(p, n, pr, lowerTail, logP));
}
exports.qbinom = qbinom;
const printer_qbinom = debug('_qbinom');
function _qbinom(p, size, pr, lower_tail, log_p) {
    let q;
    let mu;
    let sigma;
    let gamma;
    const z = new toms708_1.NumberW(0);
    let y;
    if (ISNAN(p) || ISNAN(size) || ISNAN(pr))
        return NaN;
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
    let rc = _general_1.R_Q_P01_boundaries(lower_tail, log_p, p, 0, size);
    if (rc !== undefined) {
        return rc;
    }
    if (pr === 0 || size === 0)
        return 0;
    q = 1 - pr;
    if (q === 0)
        return size;
    mu = size * pr;
    sigma = sqrt(size * pr * q);
    gamma = (q - pr) / sigma;
    printer_qbinom('qbinom(p=%d, n=%d, pr=%d, l.t.=%s, log=%s): sigm=%d, gam=%d', p, size, pr, lower_tail, log_p, sigma, gamma);
    if (!lower_tail || log_p) {
        p = expm1_1.R_DT_qIv(lower_tail, log_p, p);
        if (p === 0)
            return 0;
        if (p === 1)
            return size;
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
    let incr = floor(size * 0.001);
    let oldincr;
    do {
        console.log('loopdieloop');
        oldincr = incr;
        y = do_search(y, z, p, size, pr, incr);
        incr = fmax2(1, floor(incr / 100));
    } while (oldincr > 1 && incr > size * 1e-15);
    return y;
}


/***/ }),
/* 60 */
/***/ (function(module, exports, __nested_webpack_require_167271__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const dgamma_1 = __nested_webpack_require_167271__(21);
function dchisq(x, df, log = false) {
    return dgamma_1.dgamma(x, df / 2, 2, log);
}
exports.dchisq = dchisq;


/***/ }),
/* 61 */
/***/ (function(module, exports, __nested_webpack_require_167581__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_167581__(1);
const _general_1 = __nested_webpack_require_167581__(0);
const dchisq_1 = __nested_webpack_require_167581__(60);
const dpois_1 = __nested_webpack_require_167581__(22);
const { ceil, sqrt } = Math;
const { isNaN: ISNAN, isFinite: R_FINITE, POSITIVE_INFINITY: ML_POSINF } = Number;
const printer_dnchisq = debug('dnchisq');
function dnchisq(xx, df, ncp, give_log) {
    const eps = 5e-15;
    const fa = Array.isArray(xx) ? xx : [xx];
    const result = fa.map(x => {
        let i;
        let ncp2;
        let q;
        let mid;
        let dfmid;
        let imax;
        let sum;
        let term;
        if (ISNAN(x) || ISNAN(df) || ISNAN(ncp)) {
            return x + df + ncp;
        }
        if (!R_FINITE(df) || !R_FINITE(ncp) || ncp < 0 || df < 0) {
            return _general_1.ML_ERR_return_NAN(printer_dnchisq);
        }
        if (x < 0) {
            return _general_1.R_D__0(give_log);
        }
        if (x === 0 && df < 2)
            return ML_POSINF;
        if (ncp === 0)
            return df > 0 ? dchisq_1.dchisq(x, df, give_log) : _general_1.R_D__0(give_log);
        if (x === ML_POSINF)
            return _general_1.R_D__0(give_log);
        ncp2 = 0.5 * ncp;
        imax = ceil((-(2 + df) + sqrt((2 - df) * (2 - df) + 4 * ncp * x)) / 4);
        if (imax < 0)
            imax = 0;
        if (R_FINITE(imax)) {
            dfmid = df + 2 * imax;
            mid = dpois_1.dpois_raw(imax, ncp2, false) * dchisq_1.dchisq(x, dfmid, false);
        }
        else {
            if (give_log || ncp > 1000) {
                let nl = df + ncp;
                let ic = nl / (nl + ncp);
                return dchisq_1.dchisq(x * ic, nl * ic, give_log);
            }
            else
                return _general_1.R_D__0(give_log);
        }
        sum = mid;
        term = mid;
        df = dfmid;
        i = imax;
        let x2 = x * ncp2;
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
            if (q < 1 && term * q <= (1 - q) * eps)
                break;
        }
        return _general_1.R_D_val(give_log, sum);
    });
    return result.length === 1 ? result[0] : result;
}
exports.dnchisq = dnchisq;


/***/ }),
/* 62 */
/***/ (function(module, exports, __nested_webpack_require_170248__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_170248__(1);
const _general_1 = __nested_webpack_require_170248__(0);
const qchisq_1 = __nested_webpack_require_170248__(40);
const r_func_1 = __nested_webpack_require_170248__(2);
const pnchisq_1 = __nested_webpack_require_170248__(39);
const { expm1, min: fmin2 } = Math;
const { MAX_VALUE: DBL_MAX, MIN_VALUE: DBL_MIN, EPSILON: DBL_EPSILON, isNaN: ISNAN, isFinite: R_FINITE, POSITIVE_INFINITY: ML_POSINF } = Number;
const printer = debug('_qnchisq');
function qnchisq(pp, df, ncp = 0, lowerTail = true, logP = false) {
    return r_func_1.map(pp)(p => _qnchisq(p, df, ncp, lowerTail, logP));
}
exports.qnchisq = qnchisq;
function _qnchisq(p, df, ncp, lower_tail = true, log_p = false) {
    printer('start');
    const accu = 1e-13;
    const racc = 4 * DBL_EPSILON;
    const Eps = 1e-11;
    const rEps = 1e-10;
    let ux;
    let lx;
    let ux0;
    let nx;
    let pp;
    if (ISNAN(p) || ISNAN(df) || ISNAN(ncp)) {
        return NaN;
    }
    if (!R_FINITE(df)) {
        return _general_1.ML_ERR_return_NAN(printer);
    }
    if (df < 0 || ncp < 0) {
        return _general_1.ML_ERR_return_NAN(printer);
    }
    let rc = _general_1.R_Q_P01_boundaries(lower_tail, log_p, p, 0, ML_POSINF);
    if (rc !== undefined) {
        return rc;
    }
    pp = _general_1.R_D_qIv(log_p, p);
    if (pp > 1 - DBL_EPSILON) {
        return lower_tail ? ML_POSINF : 0.0;
    }
    {
        let b;
        let c;
        let ff;
        b = ncp * ncp / (df + 3 * ncp);
        c = (df + 3 * ncp) / (df + 2 * ncp);
        ff = (df + 2 * ncp) / (c * c);
        ux = b + c * qchisq_1.qchisq(p, ff, lower_tail, log_p);
        if (ux < 0)
            ux = 1;
        ux0 = ux;
    }
    if (!lower_tail && ncp >= 80) {
        if (pp < 1e-10)
            _general_1.ML_ERROR(_general_1.ME.ME_PRECISION, 'qnchisq', printer);
        p = log_p ? -expm1(p) : 0.5 - p + 0.5;
        lower_tail = true;
    }
    else {
        p = pp;
    }
    pp = fmin2(1 - DBL_EPSILON, p * (1 + Eps));
    if (lower_tail) {
        for (; ux < DBL_MAX &&
            pnchisq_1.pnchisq_raw(ux, df, ncp, Eps, rEps, 10000, true, false) < pp; ux *= 2)
            ;
        pp = p * (1 - Eps);
        for (lx = fmin2(ux0, DBL_MAX); lx > DBL_MIN &&
            pnchisq_1.pnchisq_raw(lx, df, ncp, Eps, rEps, 10000, true, false) > pp; lx *= 0.5)
            ;
    }
    else {
        for (; ux < DBL_MAX &&
            pnchisq_1.pnchisq_raw(ux, df, ncp, Eps, rEps, 10000, false, false) > pp; ux *= 2)
            ;
        pp = p * (1 - Eps);
        for (lx = fmin2(ux0, DBL_MAX); lx > DBL_MIN &&
            pnchisq_1.pnchisq_raw(lx, df, ncp, Eps, rEps, 10000, false, false) < pp; lx *= 0.5)
            ;
    }
    if (lower_tail) {
        do {
            nx = 0.5 * (lx + ux);
            if (pnchisq_1.pnchisq_raw(nx, df, ncp, accu, racc, 100000, true, false) > p)
                ux = nx;
            else
                lx = nx;
        } while ((ux - lx) / nx > accu);
    }
    else {
        do {
            nx = 0.5 * (lx + ux);
            if (pnchisq_1.pnchisq_raw(nx, df, ncp, accu, racc, 100000, false, false) < p)
                ux = nx;
            else
                lx = nx;
        } while ((ux - lx) / nx > accu);
    }
    return 0.5 * (ux + lx);
}


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class NumberW {
    constructor(v = 0) {
        this._val = v;
    }
    get val() {
        return this._val;
    }
    set val(a) {
        if (Number.isNaN(a)) {
            throw new Error(`trying to set NaN, old value:${this._val}`);
        }
        this._val = a;
    }
}
exports.NumberW = NumberW;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const { isFinite: R_FINITE, MIN_VALUE: DBL_MIN, NaN } = Number;
const { abs: fabs, log } = Math;
function bd0(x, np) {
    let ej;
    let s;
    let s1;
    let v;
    let j;
    if (!R_FINITE(x) || !R_FINITE(np) || np === 0.0) {
        return NaN;
    }
    if (fabs(x - np) < 0.1 * (x + np)) {
        v = (x - np) / (x + np);
        s = (x - np) * v;
        if (fabs(s) < DBL_MIN)
            return s;
        ej = 2 * x * v;
        v = v * v;
        for (j = 1; j < 1000; j++) {
            ej *= v;
            s1 = s + ej / ((j << 1) + 1);
            if (s1 === s)
                return s1;
            s = s1;
        }
    }
    return x * log(x / np) + np - x;
}
exports.bd0 = bd0;


/***/ }),
/* 65 */
/***/ (function(module, exports, __nested_webpack_require_174950__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__nested_webpack_require_174950__(64));


/***/ }),
/* 66 */
/***/ (function(module, exports, __nested_webpack_require_175238__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const trigonometry_1 = __nested_webpack_require_175238__(33);
const { PI: M_PI, log, exp, trunc } = Math;
const { EPSILON: DBL_EPSILON, MIN_VALUE: DBL_MIN, POSITIVE_INFINITY: ML_POSINF } = Number;
function Rf_gamma_cody(x) {
    const sqrtpi = 0.9189385332046727417803297;
    const xbig = 171.624;
    const p = [
        -1.71618513886549492533811,
        24.7656508055759199108314,
        -379.804256470945635097577,
        629.331155312818442661052,
        866.966202790413211295064,
        -31451.2729688483675254357,
        -36144.4134186911729807069,
        66456.1438202405440627855
    ];
    const q = [
        -30.8402300119738975254353,
        315.350626979604161529144,
        -1015.15636749021914166146,
        -3107.77167157231109440444,
        22538.1184209801510330112,
        4755.84627752788110767815,
        -134659.959864969306392456,
        -115132.259675553483497211
    ];
    const c = [
        -0.001910444077728,
        8.4171387781295e-4,
        -5.952379913043012e-4,
        7.93650793500350248e-4,
        -0.002777777777777681622553,
        0.08333333333333333331554247,
        0.0057083835261
    ];
    let i;
    let n;
    let parity;
    let fact;
    let xden;
    let xnum;
    let y;
    let z;
    let yi;
    let res;
    let sum;
    let ysq;
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
        }
        else {
            return ML_POSINF;
        }
    }
    if (y < DBL_EPSILON) {
        if (y >= DBL_MIN) {
            res = 1 / y;
        }
        else {
            return ML_POSINF;
        }
    }
    else if (y < 12) {
        yi = y;
        if (y < 1) {
            z = y;
            y += 1;
        }
        else {
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
        }
        else if (yi > y) {
            for (i = 0; i < n; ++i) {
                res *= y;
                y += 1;
            }
        }
    }
    else {
        if (y <= xbig) {
            ysq = y * y;
            sum = c[6];
            for (i = 0; i < 6; ++i) {
                sum = sum / ysq + c[i];
            }
            sum = sum / y - y + sqrtpi;
            sum += (y - 0.5) * log(y);
            res = exp(sum);
        }
        else {
            return ML_POSINF;
        }
    }
    if (parity)
        res = -res;
    if (fact !== 1)
        res = fact / res;
    return res;
}
exports.Rf_gamma_cody = Rf_gamma_cody;


/***/ }),
/* 67 */
/***/ (function(module, exports, __nested_webpack_require_178312__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_178312__(1);
const _general_1 = __nested_webpack_require_178312__(0);
const trigonometry_1 = __nested_webpack_require_178312__(33);
const gamma_fn_1 = __nested_webpack_require_178312__(29);
const lgammacor_1 = __nested_webpack_require_178312__(42);
const { isNaN: ISNAN, POSITIVE_INFINITY: ML_POSINF } = Number;
const { log, abs: fabs, floor, trunc } = Math;
const printer_sign = debug('lgammafn_sign');
const xmax = 2.5327372760800758e305;
const dxrel = 1.490116119384765625e-8;
function lgammafn_sign(x, sgn) {
    let ans;
    let y;
    let sinpiy;
    if (sgn)
        sgn[0] = 1;
    if (ISNAN(x))
        return x;
    if (sgn && x < 0 && _general_1.fmod(floor(-x), 2) === 0) {
        sgn[0] = -1;
    }
    if (x <= 0 && x === trunc(x)) {
        _general_1.ML_ERROR(_general_1.ME.ME_RANGE, 'lgamma', printer_sign);
        return ML_POSINF;
    }
    y = fabs(x);
    if (y < 1e-306)
        return -log(y);
    if (y <= 10)
        return log(fabs(gamma_fn_1.gammafn(x)));
    if (y > xmax) {
        _general_1.ML_ERROR(_general_1.ME.ME_RANGE, 'lgamma', printer_sign);
        return ML_POSINF;
    }
    if (x > 0) {
        if (x > 1e17)
            return x * (log(x) - 1);
        else if (x > 4934720)
            return _general_1.M_LN_SQRT_2PI + (x - 0.5) * log(x) - x;
        else
            return _general_1.M_LN_SQRT_2PI + (x - 0.5) * log(x) - x + lgammacor_1.lgammacor(x);
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


/***/ }),
/* 68 */
/***/ (function(module, exports, __nested_webpack_require_180366__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_180366__(1);
const _general_1 = __nested_webpack_require_180366__(0);
const expm1_1 = __nested_webpack_require_180366__(3);
const dgamma_1 = __nested_webpack_require_180366__(21);
const lgamma_fn_1 = __nested_webpack_require_180366__(4);
const pgamma_1 = __nested_webpack_require_180366__(18);
const pgamma_2 = __nested_webpack_require_180366__(18);
const pgamma_3 = __nested_webpack_require_180366__(18);
const qnorm_1 = __nested_webpack_require_180366__(6);
const { isArray } = Array;
const { abs: fabs, sqrt, pow, exp, log } = Math;
const { isNaN: ISNAN, POSITIVE_INFINITY: ML_POSINF, NEGATIVE_INFINITY: ML_NEGINF, MIN_VALUE: DBL_MIN, isFinite: R_FINITE } = Number;
const printer_qchisq_appr = debug('qchisq_appr');
function qchisq_appr(p, nu, g, lower_tail, log_p, tol) {
    const C7 = 4.67;
    const C8 = 6.66;
    const C9 = 6.73;
    const C10 = 13.32;
    let alpha;
    let a;
    let c;
    let ch;
    let p1;
    let p2;
    let q;
    let t;
    let x;
    if (ISNAN(p) || ISNAN(nu))
        return p + nu;
    let rc = _general_1.R_Q_P01_check(log_p, p);
    if (rc !== undefined) {
        return rc;
    }
    if (nu <= 0) {
        return _general_1.ML_ERR_return_NAN(printer_qchisq_appr);
    }
    alpha = 0.5 * nu;
    c = alpha - 1;
    if (nu < -1.24 * (p1 = expm1_1.R_DT_log(lower_tail, log_p, p))) {
        let lgam1pa = alpha < 0.5 ? pgamma_3.lgamma1p(alpha) : log(alpha) + g;
        ch = exp((lgam1pa + p1) / alpha + _general_1.M_LN2);
        printer_qchisq_appr(' small chi-sq., ch0 = %d', ch);
    }
    else if (nu > 0.32) {
        x = qnorm_1.qnorm(p, 0, 1, lower_tail, log_p);
        p1 = 2 / (9 * nu);
        ch = nu * pow(x * sqrt(p1) + 1 - p1, 3);
        printer_qchisq_appr(' nu > .32: Wilson-Hilferty; x = %d', x);
        if (ch > 2.2 * nu + 6)
            ch = -2 * (expm1_1.R_DT_Clog(lower_tail, log_p, p) - c * log(0.5 * ch) + g);
    }
    else {
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
function qgamma(p, alpha = 1, scale = 1, lowerTail = true, logP = false) {
    const fa = isArray(p) ? p : [p];
    const result = fa.map(pp => _qgamma(pp, alpha, scale, lowerTail, logP));
    return result.length === 1 ? result[0] : result;
}
exports.qgamma = qgamma;
const printer_qgamma = debug('_qgamma');
function _qgamma(p, alpha = 1, scale = 1 / alpha, lower_tail = true, log_p = false) {
    const EPS1 = 1e-2;
    const EPS2 = 5e-7;
    const EPS_N = 1e-15;
    const MAXIT = 1000;
    const pMIN = 1e-100;
    const pMAX = 1 - 1e-14;
    const i420 = 1 / 420;
    const i2520 = 1 / 2520;
    const i5040 = 1 / 5040;
    let p_;
    let a;
    let b;
    let c;
    let g;
    let ch;
    let ch0;
    let p1;
    let p2;
    let s1;
    let s2;
    let s3;
    let s4;
    let s5;
    let s6;
    let t;
    let x;
    let i;
    let max_it_Newton = 1;
    let q = 0;
    let goto_END = false;
    if (ISNAN(p) || ISNAN(alpha) || ISNAN(scale))
        return p + alpha + scale;
    let rc = _general_1.R_Q_P01_boundaries(lower_tail, log_p, p, 0, ML_POSINF);
    if (rc !== undefined) {
        return rc;
    }
    if (alpha < 0 || scale <= 0)
        return _general_1.ML_ERR_return_NAN(printer_qgamma);
    if (alpha === 0)
        return 0;
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
            p2 =
                p_ -
                    pgamma_2.pgamma_raw(p1, alpha, true, false);
            if (i === 1)
                printer_qgamma(' Ph.II iter; ch=%d, p2=%d', ch, p2);
            if (i >= 2)
                printer_qgamma('     it=%d,  ch=%d, p2=%d', i, ch, p2);
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
            s4 =
                (252 + a * (672 + 1182 * a) + c * (294 + a * (889 + 1740 * a))) * i5040;
            s5 = (84 + 2264 * a + c * (1175 + 606 * a)) * i2520;
            ch +=
                t *
                    (1 +
                        0.5 * t * s1 -
                        b * c * (s1 - b * (s2 - b * (s3 - b * (s4 - b * (s5 - b * s6))))));
            if (fabs(q - ch) < EPS2 * ch) {
                goto_END = true;
                break;
            }
            if (fabs(q - ch) > 0.1 * ch) {
                if (ch < q)
                    ch = 0.9 * q;
                else
                    ch = 1.1 * q;
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
            const _1_p = 1 + 1e-7;
            const _1_m = 1 - 1e-7;
            x = DBL_MIN;
            p_ = pgamma_1.pgamma(x, alpha, scale, lower_tail, log_p);
            if ((lower_tail && p_ > p * _1_p) || (!lower_tail && p_ < p * _1_m))
                return 0;
        }
        else
            p_ = pgamma_1.pgamma(x, alpha, scale, lower_tail, log_p);
        if (p_ === ML_NEGINF)
            return 0;
        for (i = 1; i <= max_it_Newton; i++) {
            p1 = p_ - p;
            if (i === 1)
                printer_qgamma(' it=%d: p=%d, x = %d, p.=%d; p1=d{p}=%d', i, p, x, p_, p1);
            if (i >= 2)
                printer_qgamma('          x{it= %d} = %d, p.=%d, p1=d{p}=%d', i, x, p_, p1);
            if (fabs(p1) < fabs(EPS_N * p))
                break;
            g = dgamma_1.dgamma(x, alpha, scale, log_p);
            if (g === _general_1.R_D__0(log_p)) {
                if (i === 1)
                    printer_qgamma('no final Newton step because dgamma(*)== 0!');
                break;
            }
            t = log_p ? p1 * exp(p_ - g) : p1 / g;
            t = lower_tail ? x - t : x + t;
            p_ = pgamma_1.pgamma(t, alpha, scale, lower_tail, log_p);
            if (fabs(p_ - p) > fabs(p1) ||
                (i > 1 && fabs(p_ - p) === fabs(p1))) {
                if (i === 1 && max_it_Newton > 1)
                    printer_qgamma('no Newton step done since delta{p} >= last delta');
                break;
            }
            if (t > 1.1 * x)
                t = 1.1 * x;
            else if (t < 0.9 * x)
                t = 0.9 * x;
            x = t;
        }
    }
    return x;
}
exports._qgamma = _qgamma;


/***/ }),
/* 69 */
/***/ (function(module, exports, __nested_webpack_require_188585__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_188585__(1);
const r_func_1 = __nested_webpack_require_188585__(2);
const _general_1 = __nested_webpack_require_188585__(0);
const dbinom_1 = __nested_webpack_require_188585__(17);
const printer = debug('dhyper');
const { round: R_forceint } = Math;
const { isNaN: ISNAN } = Number;
function dhyper(xx, r, b, n, give_log = false) {
    return r_func_1.map(xx)(x => {
        let p;
        let q;
        let p1;
        let p2;
        let p3;
        if (ISNAN(x) || ISNAN(r) || ISNAN(b) || ISNAN(n))
            return x + r + b + n;
        if (_general_1.R_D_negInonint(r) ||
            _general_1.R_D_negInonint(b) ||
            _general_1.R_D_negInonint(n) ||
            n > r + b)
            return _general_1.ML_ERR_return_NAN(printer);
        if (x < 0)
            return _general_1.R_D__0(give_log);
        let rc = _general_1.R_D_nonint_check(give_log, x, printer);
        if (rc !== undefined) {
            return rc;
        }
        x = R_forceint(x);
        r = R_forceint(r);
        b = R_forceint(b);
        n = R_forceint(n);
        if (n < x || r < x || n - x > b)
            return _general_1.R_D__0(give_log);
        if (n === 0)
            return x === 0 ? _general_1.R_D__1(give_log) : _general_1.R_D__0(give_log);
        p = n / (r + b);
        q = (r + b - n) / (r + b);
        p1 = dbinom_1.dbinom_raw(x, r, p, q, give_log);
        p2 = dbinom_1.dbinom_raw(n - x, b, p, q, give_log);
        p3 = dbinom_1.dbinom_raw(n, r + b, p, q, give_log);
        return give_log ? p1 + p2 - p3 : p1 * p2 / p3;
    });
}
exports.dhyper = dhyper;


/***/ }),
/* 70 */
/***/ (function(module, exports, __nested_webpack_require_190306__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_190306__(1);
const _general_1 = __nested_webpack_require_190306__(0);
const expm1_1 = __nested_webpack_require_190306__(3);
const r_func_1 = __nested_webpack_require_190306__(2);
const lfastchoose_1 = __nested_webpack_require_190306__(133);
const { log, exp, min: fmin2, max: fmax2, round: R_forceint } = Math;
const { isNaN: ISNAN, isFinite: R_FINITE, EPSILON: DBL_EPSILON } = Number;
const printer_qhyper = debug('qhyper');
function qhyper(pp, nr, nb, n, lowerTail = true, logP = false) {
    return r_func_1.map(pp)(p => {
        let N;
        let xstart;
        let xend;
        let xr;
        let xb;
        let sum;
        let term;
        let small_N;
        if (ISNAN(p) || ISNAN(nr) || ISNAN(nb) || ISNAN(n))
            return NaN;
        if (!R_FINITE(nr) || !R_FINITE(nb) || !R_FINITE(n))
            return _general_1.ML_ERR_return_NAN(printer_qhyper);
        let NR = R_forceint(nr);
        let NB = R_forceint(nb);
        N = NR + NB;
        n = R_forceint(n);
        if (NR < 0 || NB < 0 || n < 0 || n > N)
            return _general_1.ML_ERR_return_NAN(printer_qhyper);
        xstart = fmax2(0, n - NB);
        xend = fmin2(n, NR);
        let rc = _general_1.R_Q_P01_boundaries(lowerTail, logP, p, xstart, xend);
        if (rc !== undefined) {
            return rc;
        }
        xr = xstart;
        xb = n - xr;
        small_N = N < 1000;
        term = lfastchoose_1.lfastchoose(NR, xr) + lfastchoose_1.lfastchoose(NB, xb) - lfastchoose_1.lfastchoose(N, n);
        if (small_N)
            term = exp(term);
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
            if (small_N)
                term *= NR / xr * (xb / NB);
            else
                term += log(NR / xr * (xb / NB));
            sum += small_N ? term : exp(term);
            xb--;
            NR--;
        }
        return xr;
    });
}
exports.qhyper = qhyper;


/***/ }),
/* 71 */
/***/ (function(module, exports, __nested_webpack_require_192558__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _general_1 = __nested_webpack_require_192558__(0);
const { isNaN: ISNAN, isFinite: R_FINITE } = Number;
const { floor, max: fmax2 } = Math;
const debug = __nested_webpack_require_192558__(1);
const pgamma_1 = __nested_webpack_require_192558__(18);
const r_func_1 = __nested_webpack_require_192558__(2);
const printer = debug('ppois');
function ppois(_x, lambda, lowerTail = true, logP = false) {
    return r_func_1.map(_x)(x => {
        if (ISNAN(x) || ISNAN(lambda))
            return x + lambda;
        if (lambda < 0) {
            return _general_1.ML_ERR_return_NAN(printer);
        }
        if (x < 0)
            return _general_1.R_DT_0(lowerTail, logP);
        if (lambda === 0)
            return _general_1.R_DT_1(lowerTail, logP);
        if (!R_FINITE(x))
            return _general_1.R_DT_1(lowerTail, logP);
        x = floor(x + 1e-7);
        return pgamma_1.pgamma(lambda, x + 1, 1, !lowerTail, logP);
    });
}
exports.ppois = ppois;
function do_search(y, z, p, lambda, incr) {
    if (z.val >= p) {
        while (true) {
            if (y === 0 ||
                (z.val = ppois(y - incr, lambda, true, false)) < p)
                return y;
            y = fmax2(0, y - incr);
        }
    }
    else {
        while (true) {
            y = y + incr;
            if ((z.val = ppois(y, lambda, true, false)) >= p)
                return y;
        }
    }
}
exports.do_search = do_search;


/***/ }),
/* 72 */
/***/ (function(module, exports, __nested_webpack_require_194084__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const qnorm_1 = __nested_webpack_require_194084__(6);
const mersenne_twister_1 = __nested_webpack_require_194084__(5);
const inormal_rng_1 = __nested_webpack_require_194084__(15);
const BIG = 134217728;
const { isArray } = Array;
class Inversion extends inormal_rng_1.IRNGNormal {
    constructor(_rng = new mersenne_twister_1.MersenneTwister(0)) {
        super(_rng);
    }
    internal_norm_rand() {
        let u1 = this.rng.unif_rand();
        let t = this.rng.unif_rand();
        u1 = new Int32Array([BIG * u1])[0] + t;
        const result = qnorm_1.qnorm(u1 / BIG, 0.0, 1.0, !!1, !!0);
        return isArray(result) ? result[0] : result;
    }
}
exports.Inversion = Inversion;


/***/ }),
/* 73 */
/***/ (function(module, exports, __nested_webpack_require_194886__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_194886__(1);
const _general_1 = __nested_webpack_require_194886__(0);
const expm1_1 = __nested_webpack_require_194886__(3);
const { isFinite: R_FINITE, EPSILON: DBL_EPSILON, isNaN: ISNAN } = Number;
const { LN2: M_LN2, abs: fabs, trunc, log, exp, floor, round } = Math;
const printer_dsignrank = debug('dsignrank');
const printer_psignrank = debug('psignrank');
const printer_qsignrank = debug('qsignrank');
const printer_rsignrank = debug('rsignrank');
function csignrank(k, n, u, c, w) {
    if (k < 0 || k > u)
        return 0;
    if (k > c)
        k = u - k;
    if (n === 1)
        return 1;
    if (w[0] === 1)
        return w[k];
    w[0] = w[1] = 1;
    for (let j = 2; j < n + 1; ++j) {
        let i;
        let end = _general_1.imin2(j * (j + 1) / 2, c);
        for (i = end; i >= j; --i)
            w[i] += w[i - j];
    }
    return w[k];
}
exports.csignrank = csignrank;
function dsignrank(xx, n, logX = false) {
    const rn = round(n);
    const u = rn * (rn + 1) / 2;
    const c = trunc(u / 2);
    const w = new Array(c + 1).fill(0);
    const fx = (Array.isArray(xx) ? xx : [xx]);
    const result = fx.map(x => {
        if (ISNAN(x) || ISNAN(n))
            return x + n;
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
        let d = _general_1.R_D_exp(logX, log(csignrank(trunc(x), n, u, c, w)) - n * M_LN2);
        return d;
    });
    return (result.length === 1 ? result[0] : result);
}
exports.dsignrank = dsignrank;
function psignrank(xx, n, lowerTail = true, logP = false) {
    const roundN = round(n);
    const u = roundN * (roundN + 1) / 2;
    const c = trunc(u / 2);
    const w = new Array(c + 1).fill(0);
    const fx = (Array.isArray(xx) ? xx : [xx]);
    const result = fx.map(x => round(x + 1e-7)).map(x => {
        let lowerT = lowerTail;
        if (ISNAN(x) || ISNAN(n))
            return x + n;
        if (!R_FINITE(n))
            return _general_1.ML_ERR_return_NAN(printer_psignrank);
        if (n <= 0)
            return _general_1.ML_ERR_return_NAN(printer_psignrank);
        if (x < 0.0) {
            return _general_1.R_DT_0(lowerTail, logP);
        }
        if (x >= u) {
            return _general_1.R_DT_1(lowerTail, logP);
        }
        let f = exp(-roundN * M_LN2);
        let p = 0;
        if (x <= u / 2) {
            for (let i = 0; i <= x; i++) {
                p += csignrank(i, roundN, u, c, w) * f;
            }
        }
        else {
            x = n * (n + 1) / 2 - x;
            for (let i = 0; i < x; i++) {
                p += csignrank(i, roundN, u, c, w) * f;
            }
            lowerT = !lowerT;
        }
        return _general_1.R_DT_val(lowerT, logP, p);
    });
    return (result.length === 1 ? result[0] : result);
}
exports.psignrank = psignrank;
function qsignrank(xx, n, lowerTail = true, logP = false) {
    const roundN = round(n);
    const u = roundN * (roundN + 1) / 2;
    const c = trunc(u / 2);
    const w = new Array(c + 1).fill(0);
    const fx = (Array.isArray(xx) ? xx : [xx]);
    const result = fx.map(x => {
        if (ISNAN(x) || ISNAN(n)) {
            return x + n;
        }
        if (!R_FINITE(x) || !R_FINITE(n)) {
            return _general_1.ML_ERR_return_NAN(printer_qsignrank);
        }
        let rc = _general_1.R_Q_P01_check(logP, x);
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
        if (logP || !lowerTail)
            x = expm1_1.R_DT_qIv(lowerTail, logP, x);
        let f = exp(-n * M_LN2);
        let p = 0;
        let q = 0;
        if (x <= 0.5) {
            x = x - 10 * DBL_EPSILON;
            while (true) {
                p += csignrank(q, roundN, u, c, w) * f;
                if (p >= x)
                    break;
                q++;
            }
        }
        else {
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
    return (result.length === 1 ? result[0] : result);
}
exports.qsignrank = qsignrank;
function rsignrank(nn, n, rng) {
    const result = new Array(nn).fill(0).map(() => {
        if (ISNAN(n))
            return n;
        const nRound = round(n);
        if (nRound < 0)
            return _general_1.ML_ERR_return_NAN(printer_rsignrank);
        if (nRound === 0)
            return 0;
        let r = 0.0;
        let k = floor(nRound);
        for (let i = 0; i < k;) {
            r += ++i * floor(rng.unif_rand() + 0.5);
        }
        return r;
    });
    return result.length === 1 ? result[0] : result;
}
exports.rsignrank = rsignrank;


/***/ }),
/* 74 */
/***/ (function(module, exports, __nested_webpack_require_200323__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _general_1 = __nested_webpack_require_200323__(0);
const lgamma_fn_1 = __nested_webpack_require_200323__(4);
const { trunc, log } = Math;
const sferr_halves = [
    0.0,
    0.1534264097200273452913848,
    0.0810614667953272582196702,
    0.0548141210519176538961390,
    0.0413406959554092940938221,
    0.03316287351993628748511048,
    0.02767792568499833914878929,
    0.02374616365629749597132920,
    0.02079067210376509311152277,
    0.01848845053267318523077934,
    0.01664469118982119216319487,
    0.01513497322191737887351255,
    0.01387612882307074799874573,
    0.01281046524292022692424986,
    0.01189670994589177009505572,
    0.01110455975820691732662991,
    0.010411265261972096497478567,
    0.009799416126158803298389475,
    0.009255462182712732917728637,
    0.008768700134139385462952823,
    0.008330563433362871256469318,
    0.007934114564314020547248100,
    0.007573675487951840794972024,
    0.007244554301320383179543912,
    0.006942840107209529865664152,
    0.006665247032707682442354394,
    0.006408994188004207068439631,
    0.006171712263039457647532867,
    0.005951370112758847735624416,
    0.005746216513010115682023589,
    0.005554733551962801371038690
];
const S0 = 0.083333333333333333333;
const S1 = 0.00277777777777777777778;
const S2 = 0.00079365079365079365079365;
const S3 = 0.000595238095238095238095238;
const S4 = 0.0008417508417508417508417508;
function stirlerr(n) {
    let nn;
    if (n <= 15.0) {
        nn = n + n;
        if (nn === trunc(nn))
            return (sferr_halves[trunc(nn)]);
        return (lgamma_fn_1.lgammafn(n + 1.) - (n + 0.5) * log(n) + n - _general_1.M_LN_SQRT_2PI);
    }
    nn = n * n;
    if (n > 500)
        return ((S0 - S1 / nn) / n);
    if (n > 80)
        return ((S0 - (S1 - S2 / nn) / nn) / n);
    if (n > 35)
        return ((S0 - (S1 - (S2 - S3 / nn) / nn) / nn) / n);
    return ((S0 - (S1 - (S2 - (S3 - S4 / nn) / nn) / nn) / nn) / n);
}
exports.stirlerr = stirlerr;


/***/ }),
/* 75 */
/***/ (function(module, exports, __nested_webpack_require_202429__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_202429__(1);
const _general_1 = __nested_webpack_require_202429__(0);
const expm1_1 = __nested_webpack_require_202429__(3);
const qnorm_1 = __nested_webpack_require_202429__(6);
const r_func_1 = __nested_webpack_require_202429__(2);
const cospi_1 = __nested_webpack_require_202429__(23);
const dt_1 = __nested_webpack_require_202429__(45);
const pt_1 = __nested_webpack_require_202429__(47);
const { LN2: M_LN2, PI: M_PI, SQRT2: M_SQRT2, sqrt, pow, log, exp, min: fmin2, abs: fabs, expm1 } = Math;
const { isNaN: ISNAN, EPSILON: DBL_EPSILON, MAX_VALUE: DBL_MAX, MIN_VALUE: DBL_MIN, POSITIVE_INFINITY: ML_POSINF, NEGATIVE_INFINITY: ML_NEGINF, isFinite: R_FINITE } = Number;
const printer_qt = debug('qt');
function qt(pp, ndf, lowerTail, logP) {
    return r_func_1.map(pp)(p => _qt(p, ndf, lowerTail, logP));
}
exports.qt = qt;
function _qt(p, ndf, lower_tail, log_p) {
    const eps = 1e-12;
    let P;
    let q;
    const accu = 1e-13;
    const Eps = 1e-11;
    if (ISNAN(p) || ISNAN(ndf))
        return p + ndf;
    let rc = _general_1.R_Q_P01_boundaries(lower_tail, log_p, p, ML_NEGINF, ML_POSINF);
    if (rc !== undefined) {
        return rc;
    }
    if (ndf <= 0)
        return _general_1.ML_ERR_return_NAN(printer_qt);
    if (ndf < 1) {
        let ux;
        let lx;
        let nx;
        let pp;
        let iter = 0;
        p = expm1_1.R_DT_qIv(lower_tail, log_p, p);
        if (p > 1 - DBL_EPSILON)
            return ML_POSINF;
        pp = fmin2(1 - DBL_EPSILON, p * (1 + Eps));
        for (ux = 1; ux < DBL_MAX && pt_1.pt(ux, ndf, true, false) < pp; ux *= 2)
            ;
        pp = p * (1 - Eps);
        for (lx = -1; lx > -DBL_MAX && pt_1.pt(lx, ndf, true, false) > pp; lx *= 2)
            ;
        do {
            nx = 0.5 * (lx + ux);
            if (pt_1.pt(nx, ndf, true, false) > p)
                ux = nx;
            else
                lx = nx;
        } while ((ux - lx) / fabs(nx) > accu && ++iter < 1000);
        if (iter >= 1000) {
            _general_1.ML_ERROR(_general_1.ME.ME_PRECISION, 'qt', printer_qt);
        }
        return 0.5 * (lx + ux);
    }
    if (ndf > 1e20)
        return qnorm_1.qnorm(p, 0, 1, lower_tail, log_p);
    P = _general_1.R_D_qIv(log_p, p);
    let neg = (!lower_tail || P < 0.5) && (lower_tail || P > 0.5);
    let is_neg_lower = lower_tail === neg;
    if (neg)
        P = 2 * (log_p ? (lower_tail ? P : -expm1(p)) : _general_1.R_D_Lval(lower_tail, p));
    else
        P = 2 * (log_p ? (lower_tail ? -expm1(p) : P) : _general_1.R_D_Cval(lower_tail, p));
    if (fabs(ndf - 2) < eps) {
        if (P > DBL_MIN) {
            if (3 * P < DBL_EPSILON)
                q = 1 / sqrt(P);
            else if (P > 0.9)
                q = (1 - P) * sqrt(2 / (P * (2 - P)));
            else
                q = sqrt(2 / (P * (2 - P)) - 2);
        }
        else {
            if (log_p)
                q = is_neg_lower ? exp(-p / 2) / M_SQRT2 : 1 / sqrt(-expm1(p));
            else
                q = ML_POSINF;
        }
    }
    else if (ndf < 1 + eps) {
        if (P === 1)
            q = 0;
        else if (P > 0)
            q = 1 / cospi_1.tanpi(P / 2);
        else {
            if (log_p)
                q = is_neg_lower ? _general_1.M_1_PI * exp(-p) : -1 / (M_PI * expm1(p));
            else
                q = ML_POSINF;
        }
    }
    else {
        let x = 0;
        let y = 0;
        let log_P2 = 0;
        let a = 1 / (ndf - 0.5);
        let b = 48 / (a * a);
        let c = ((20700 * a / b - 98) * a - 16) * a + 96.36;
        let d = ((94.5 / (b + c) - 3) / b + 1) * sqrt(a * _general_1.M_PI_2) * ndf;
        let P_ok1 = P > DBL_MIN || !log_p;
        let P_ok = P_ok1;
        if (P_ok1) {
            y = pow(d * P, 2.0 / ndf);
            P_ok = y >= DBL_EPSILON;
        }
        if (!P_ok) {
            log_P2 = is_neg_lower
                ? _general_1.R_D_log(log_p, p)
                : expm1_1.R_D_LExp(log_p, p);
            x = (log(d) + M_LN2 + log_P2) / ndf;
            y = exp(2 * x);
        }
        if ((ndf < 2.1 && P > 0.5) || y > 0.05 + a) {
            if (P_ok)
                x = qnorm_1.qnorm(0.5 * P, 0, 1, false, false);
            else
                x = qnorm_1.qnorm(log_P2, 0, 1, lower_tail, true);
            y = x * x;
            if (ndf < 5)
                c += 0.3 * (ndf - 4.5) * (x + 0.6);
            c = (((0.05 * d * x - 5) * x - 7) * x - 2) * x + b + c;
            y = (((((0.4 * y + 6.3) * y + 36) * y + 94.5) / c - y - 3) / b + 1) * x;
            y = expm1(a * y * y);
            q = sqrt(ndf * y);
        }
        else if (!P_ok && x < -M_LN2 * _general_1.DBL_MANT_DIG) {
            q = sqrt(ndf) * exp(-x);
        }
        else {
            y =
                ((1 / (((ndf + 6) / (ndf * y) - 0.089 * d - 0.822) * (ndf + 2) * 3) +
                    0.5 / (ndf + 4)) *
                    y -
                    1) *
                    (ndf + 1) /
                    (ndf + 2) +
                    1 / y;
            q = sqrt(ndf * y);
        }
        if (P_ok1) {
            let it = 0;
            while (it++ < 10 &&
                (y = dt_1.dt(q, ndf, false)) > 0 &&
                R_FINITE((x = (pt_1.pt(q, ndf, false, false) - P / 2) / y)) &&
                fabs(x) > 1e-14 * fabs(q))
                q += x * (1 + x * q * (ndf + 1) / (2 * (q * q + ndf)));
        }
    }
    if (neg)
        q = -q;
    return q;
}


/***/ }),
/* 76 */
/***/ (function(module, exports, __nested_webpack_require_207934__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_207934__(1);
const _general_1 = __nested_webpack_require_207934__(0);
const { NaN: ML_NAN, isNaN: ISNAN, isFinite: R_FINITE } = Number;
const { PI: M_PI } = Math;
const printer_tanpi = debug('tanpi');
function tanpi(x) {
    if (ISNAN(x))
        return x;
    if (!R_FINITE(x)) {
        _general_1.ML_ERROR(_general_1.ME.ME_DOMAIN, '', printer_tanpi);
        return ML_NAN;
    }
    x = _general_1.fmod(x, 1);
    if (x <= -0.5) {
        x++;
    }
    else if (x > 0.5) {
        x--;
    }
    return x === 0 ? 0 : x === 0.5 ? ML_NAN : Math.tan(M_PI * x);
}
exports.tanpi = tanpi;
function atanpi(x) {
    return Math.atan(x) / Math.PI;
}
exports.atanpi = atanpi;


/***/ }),
/* 77 */
/***/ (function(module, exports, __nested_webpack_require_208772__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_208772__(1);
const wprob_1 = __nested_webpack_require_208772__(169);
const _general_1 = __nested_webpack_require_208772__(0);
const _general_2 = __nested_webpack_require_208772__(0);
const lgamma_fn_1 = __nested_webpack_require_208772__(4);
const r_func_1 = __nested_webpack_require_208772__(2);
const { isNaN: ISNAN, isFinite: R_FINITE } = Number;
const { exp, sqrt, log, LN2: M_LN2 } = Math;
const printer_ptukey = debug('_ptukey');
function ptukey(qq, rr, cc, df, lower_tail = true, log_p = false) {
    return r_func_1.map(qq)(q => _ptukey(q, rr, cc, df, lower_tail, log_p));
}
exports.ptukey = ptukey;
function _ptukey(q, rr, cc, df, lower_tail, log_p) {
    const nlegq = 16;
    const ihalfq = 8;
    const eps1 = -30.0;
    const eps2 = 1.0e-14;
    const dhaf = 100.0;
    const dquar = 800.0;
    const deigh = 5000.0;
    const dlarg = 25000.0;
    const ulen1 = 1.0;
    const ulen2 = 0.5;
    const ulen3 = 0.25;
    const ulen4 = 0.125;
    const xlegq = [
        0.98940093499164993259615417345,
        0.944575023073232576077988415535,
        0.865631202387831743880467897712,
        0.755404408355003033895101194847,
        0.617876244402643748446671764049,
        0.458016777657227386342419442984,
        0.28160355077925891323046050146,
        0.95012509837637440185319335425e-1
    ];
    const alegq = [
        0.27152459411754094851780572456e-1,
        0.622535239386478928628438369944e-1,
        0.951585116824927848099251076022e-1,
        0.124628971255533872052476282192,
        0.149595988816576732081501730547,
        0.16915651939500253818931207903,
        0.182603415044923588866763667969,
        0.189450610455068496285396723208
    ];
    let ans;
    let f2;
    let f21;
    let f2lf;
    let ff4;
    let otsum;
    let qsqz;
    let rotsum;
    let twa1;
    let ulen;
    let wprb;
    if (ISNAN(q) || ISNAN(rr) || ISNAN(cc) || ISNAN(df)) {
        return _general_1.ML_ERR_return_NAN(printer_ptukey);
    }
    if (q <= 0) {
        return _general_1.R_DT_0(lower_tail, log_p);
    }
    if (df < 2 || rr < 1 || cc < 2)
        return _general_1.ML_ERR_return_NAN(printer_ptukey);
    if (!R_FINITE(q))
        return _general_1.R_DT_1(lower_tail, log_p);
    if (df > dlarg)
        return _general_2.R_DT_val(lower_tail, log_p, wprob_1.wprob(q, rr, cc));
    f2 = df * 0.5;
    f2lf = f2 * log(df) - df * M_LN2 - lgamma_fn_1.lgammafn(f2);
    f21 = f2 - 1.0;
    ff4 = df * 0.25;
    if (df <= dhaf)
        ulen = ulen1;
    else if (df <= dquar)
        ulen = ulen2;
    else if (df <= deigh)
        ulen = ulen3;
    else
        ulen = ulen4;
    f2lf += log(ulen);
    ans = 0.0;
    otsum = 0.0;
    for (let i = 1; i <= 50; i++) {
        otsum = 0.0;
        twa1 = (2 * i - 1) * ulen;
        for (let jj = 1; jj <= nlegq; jj++) {
            const j = ihalfq < jj ? jj - ihalfq - 1 : jj - 1;
            const t1 = ihalfq < jj
                ? f2lf +
                    f21 * log(twa1 + xlegq[j] * ulen) -
                    (xlegq[j] * ulen + twa1) * ff4
                : f2lf +
                    f21 * log(twa1 - xlegq[j] * ulen) +
                    (xlegq[j] * ulen - twa1) * ff4;
            if (t1 >= eps1) {
                if (ihalfq < jj) {
                    qsqz = q * sqrt((xlegq[j] * ulen + twa1) * 0.5);
                }
                else {
                    qsqz = q * sqrt((-(xlegq[j] * ulen) + twa1) * 0.5);
                }
                wprb = wprob_1.wprob(qsqz, rr, cc);
                rotsum = wprb * alegq[j] * exp(t1);
                otsum += rotsum;
            }
        }
        if (i * ulen >= 1.0 && otsum <= eps2)
            break;
        ans += otsum;
    }
    if (otsum > eps2) {
        _general_1.ML_ERROR(_general_1.ME.ME_PRECISION, 'ptukey', printer_ptukey);
    }
    if (ans > 1)
        ans = 1;
    return _general_2.R_DT_val(lower_tail, log_p, ans);
}
exports._ptukey = _ptukey;


/***/ }),
/* 78 */
/***/ (function(module, exports, __nested_webpack_require_212793__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __nested_webpack_require_212793__(184);

/**
 * Active `debug` instances.
 */
exports.instances = [];

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

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
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy;

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);

  return debug;
}

function destroy () {
  var index = exports.instances.indexOf(this);
  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
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
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
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
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),
/* 79 */
/***/ (function(module, exports, __nested_webpack_require_217771__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const besselI_1 = __nested_webpack_require_217771__(102);
const besselJ_1 = __nested_webpack_require_217771__(50);
const besselK_1 = __nested_webpack_require_217771__(51);
const besselY_1 = __nested_webpack_require_217771__(52);
exports.special = Object.freeze({
    besselJ: besselJ_1.bessel_j,
    besselY: besselY_1.bessel_y,
    besselK: besselK_1.bessel_k,
    besselI: besselI_1.bessel_i
});


/***/ }),
/* 80 */
/***/ (function(module, exports, __nested_webpack_require_218269__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const normal_1 = __nested_webpack_require_218269__(8);
const dnbinom_1 = __nested_webpack_require_218269__(108);
const pnbinom_1 = __nested_webpack_require_218269__(57);
const qnbinom_1 = __nested_webpack_require_218269__(109);
const rnbinom_1 = __nested_webpack_require_218269__(110);
const errText = Object.freeze([
    'at most specify either argument "mu" or  "prob", but not both at the same time!',
    'both arguments "mu" and "prob" are undefined'
]);
function select(fs, mu, prob) {
    const selector = {
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
    const s = prob === undefined ? 'mu' : 'p';
    return selector[s][fs];
}
function NegativeBinomial(rng = new normal_1.Inversion()) {
    function dnbinom(x, size, prob, mu, giveLog = false) {
        const val = mu || prob;
        return select('d', mu, prob)(x, size, val, giveLog);
    }
    function pnbinom(q, size, prob, mu, lowerTail = true, logP = false) {
        const val = mu || prob;
        return select('p', mu, prob)(q, size, val, lowerTail, logP);
    }
    function qnbinom(q, size, prob, mu, lowerTail = true, logP = false) {
        const val = mu || prob;
        return select('q', mu, prob)(q, size, val, lowerTail, logP);
    }
    function rnbinom(n, size, prob, mu) {
        const val = mu || prob;
        return select('r', mu, prob)(n, size, val, rng);
    }
    return {
        dnbinom,
        pnbinom,
        qnbinom,
        rnbinom
    };
}
exports.NegativeBinomial = NegativeBinomial;


/***/ }),
/* 81 */
/***/ (function(module, exports, __nested_webpack_require_220321__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mersenne_twister_1 = __nested_webpack_require_220321__(5);
const dbinom_1 = __nested_webpack_require_220321__(17);
const pbinom_1 = __nested_webpack_require_220321__(58);
const qbinom_1 = __nested_webpack_require_220321__(59);
const rbinom_1 = __nested_webpack_require_220321__(36);
function Binomial(rng = new mersenne_twister_1.MersenneTwister()) {
    return {
        dbinom: dbinom_1.dbinom,
        pbinom: pbinom_1.pbinom,
        qbinom: qbinom_1.qbinom,
        rbinom: (N, nin, pp) => rbinom_1.rbinom(N, nin, pp, rng)
    };
}
exports.Binomial = Binomial;


/***/ }),
/* 82 */
/***/ (function(module, exports, __nested_webpack_require_220979__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const dcauchy_1 = __nested_webpack_require_220979__(111);
const pcauchy_1 = __nested_webpack_require_220979__(112);
const qcauchy_1 = __nested_webpack_require_220979__(113);
const rcauchy_1 = __nested_webpack_require_220979__(114);
const mersenne_twister_1 = __nested_webpack_require_220979__(5);
function Cauchy(rng = new mersenne_twister_1.MersenneTwister(0)) {
    return {
        rcauchy: (n, location = 0, scale = 1) => rcauchy_1.rcauchy(n, location, scale, rng),
        dcauchy: dcauchy_1.dcauchy,
        pcauchy: pcauchy_1.pcauchy,
        qcauchy: qcauchy_1.qcauchy
    };
}
exports.Cauchy = Cauchy;


/***/ }),
/* 83 */
/***/ (function(module, exports, __nested_webpack_require_221676__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const chebyshev_1 = __nested_webpack_require_221676__(37);
exports.ChebyshevSeries = {
    chebyshev_eval: chebyshev_1.chebyshev_eval,
    chebyshev_init: chebyshev_1.chebyshev_init
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __nested_webpack_require_222003__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const normal_1 = __nested_webpack_require_222003__(8);
const dchisq_1 = __nested_webpack_require_222003__(60);
const dnchisq_1 = __nested_webpack_require_222003__(61);
const pchisq_1 = __nested_webpack_require_222003__(38);
const pnchisq_1 = __nested_webpack_require_222003__(39);
const qchisq_1 = __nested_webpack_require_222003__(40);
const qnchisq_1 = __nested_webpack_require_222003__(62);
const rchisq_1 = __nested_webpack_require_222003__(13);
const rnchisq_1 = __nested_webpack_require_222003__(41);
function ChiSquared(rng = new normal_1.Inversion()) {
    function rchisq(n = 1, df, ncp) {
        return ncp === undefined
            ? rchisq_1.rchisq(n, df, rng)
            : rnchisq_1.rnchisq(n, df, ncp, rng);
    }
    function qchisq(p, df, ncp, lowerTail = true, logP = false) {
        return ncp === undefined
            ? qchisq_1.qchisq(p, df, lowerTail, logP)
            : qnchisq_1.qnchisq(p, df, ncp, lowerTail, logP);
    }
    function pchisq(p, df, ncp, lowerTail = true, logP = false) {
        return ncp === undefined
            ? pchisq_1.pchisq(p, df, lowerTail, logP)
            : pnchisq_1.pnchisq(p, df, ncp, lowerTail, logP);
    }
    function dchisq(x, df, ncp, log = false) {
        return ncp === undefined ? dchisq_1.dchisq(x, df, log) : dnchisq_1.dnchisq(x, df, ncp, log);
    }
    return {
        dchisq,
        pchisq,
        qchisq,
        rchisq
    };
}
exports.ChiSquared = ChiSquared;


/***/ }),
/* 85 */
/***/ (function(module, exports, __nested_webpack_require_223477__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const choose_1 = __nested_webpack_require_223477__(27);
exports.special = {
    choose: choose_1.choose,
    lchoose: choose_1.lchoose
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __nested_webpack_require_223757__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const dexp_1 = __nested_webpack_require_223757__(116);
const pexp_1 = __nested_webpack_require_223757__(117);
const qexp_1 = __nested_webpack_require_223757__(118);
const rexp_1 = __nested_webpack_require_223757__(119);
const rng_1 = __nested_webpack_require_223757__(16);
const { MersenneTwister } = rng_1.rng;
function Exponential(rng = new MersenneTwister(0)) {
    return {
        dexp: (x, rate = 1, asLog = false) => dexp_1.dexp(x, 1 / rate, asLog),
        pexp: (q, rate = 1, lowerTail = true, logP = false) => pexp_1.pexp(q, 1 / rate, lowerTail, logP),
        qexp: (p, rate = 1, lowerTail = true, logP = false) => qexp_1.qexp(p, 1 / rate, lowerTail, logP),
        rexp: (n, rate = 1) => rexp_1.rexp(n, 1 / rate, rng)
    };
}
exports.Exponential = Exponential;


/***/ }),
/* 87 */
/***/ (function(module, exports, __nested_webpack_require_224617__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const rchisq_1 = __nested_webpack_require_224617__(13);
const rnchisq_1 = __nested_webpack_require_224617__(41);
const r_func_1 = __nested_webpack_require_224617__(2);
const r_func_2 = __nested_webpack_require_224617__(2);
const normal_1 = __nested_webpack_require_224617__(8);
const df_1 = __nested_webpack_require_224617__(120);
const dnf_1 = __nested_webpack_require_224617__(121);
const pf_1 = __nested_webpack_require_224617__(122);
const pnf_1 = __nested_webpack_require_224617__(123);
const qf_1 = __nested_webpack_require_224617__(124);
const qnf_1 = __nested_webpack_require_224617__(125);
const rf_1 = __nested_webpack_require_224617__(126);
const sequence = r_func_1.seq()();
function FDist(rng = new normal_1.Inversion()) {
    function df(x, df1, df2, ncp, log = false) {
        if (ncp === undefined) {
            return df_1.df(x, df1, df2, log);
        }
        return dnf_1.dnf(x, df1, df2, ncp, log);
    }
    function pf(q, df1, df2, ncp, lowerTail = true, logP = false) {
        if (ncp === undefined) {
            return pf_1.pf(q, df1, df2, lowerTail, logP);
        }
        return pnf_1.pnf(q, df1, df2, ncp, lowerTail, logP);
    }
    function qf(p, df1, df2, ncp, lowerTail = true, logP = false) {
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
        const div = r_func_2.arrayrify((a, b) => a / b);
        const numerator = div(rnchisq_1.rnchisq(n, df1, ncp, rng), df1);
        const denominator = div(rchisq_1.rchisq(n, df2, rng), df2);
        return r_func_2.multiplexer(numerator, denominator)((x1, d) => x1 / d);
    }
    return {
        df,
        pf,
        qf,
        rf
    };
}
exports.FDist = FDist;


/***/ }),
/* 88 */
/***/ (function(module, exports, __nested_webpack_require_226617__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const normal_1 = __nested_webpack_require_226617__(8);
const dgeom_1 = __nested_webpack_require_226617__(129);
const pgeom_1 = __nested_webpack_require_226617__(130);
const qgeom_1 = __nested_webpack_require_226617__(131);
const rgeom_1 = __nested_webpack_require_226617__(132);
function Geometric(rng = new normal_1.Inversion()) {
    return {
        dgeom: dgeom_1.dgeom,
        pgeom: pgeom_1.pgeom,
        qgeom: qgeom_1.qgeom,
        rgeom: (N, prob) => rgeom_1.rgeom(N, prob, rng)
    };
}
exports.Geometric = Geometric;


/***/ }),
/* 89 */
/***/ (function(module, exports, __nested_webpack_require_227234__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const dhyper_1 = __nested_webpack_require_227234__(69);
const phyper_1 = __nested_webpack_require_227234__(134);
const qhyper_1 = __nested_webpack_require_227234__(70);
const rhyper_1 = __nested_webpack_require_227234__(135);
const mersenne_twister_1 = __nested_webpack_require_227234__(5);
function HyperGeometric(rng = new mersenne_twister_1.MersenneTwister()) {
    function rhyper(N, nn1in, nn2in, kkin) {
        return rhyper_1.rhyper(N, nn1in, nn2in, kkin, rng);
    }
    return {
        dhyper: dhyper_1.dhyper,
        phyper: phyper_1.phyper,
        qhyper: qhyper_1.qhyper,
        rhyper
    };
}
exports.HyperGeometric = HyperGeometric;


/***/ }),
/* 90 */
/***/ (function(module, exports, __nested_webpack_require_227973__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mersenne_twister_1 = __nested_webpack_require_227973__(5);
const dlogis_1 = __nested_webpack_require_227973__(137);
const plogis_1 = __nested_webpack_require_227973__(138);
const qlogis_1 = __nested_webpack_require_227973__(139);
const rlogis_1 = __nested_webpack_require_227973__(140);
function Logistic(rng = new mersenne_twister_1.MersenneTwister(0)) {
    function rlogis(N, location = 0, scale = 1) {
        return rlogis_1.rlogis(N, location, scale, rng);
    }
    return {
        dlogis: dlogis_1.dlogis,
        plogis: plogis_1.plogis,
        qlogis: qlogis_1.qlogis,
        rlogis
    };
}
exports.Logistic = Logistic;


/***/ }),
/* 91 */
/***/ (function(module, exports, __nested_webpack_require_228699__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const dlnorm_1 = __nested_webpack_require_228699__(141);
const plnorm_1 = __nested_webpack_require_228699__(142);
const qlnorm_1 = __nested_webpack_require_228699__(143);
const rlnorm_1 = __nested_webpack_require_228699__(144);
const normal_1 = __nested_webpack_require_228699__(8);
function LogNormal(rng = new normal_1.Inversion()) {
    return {
        dlnorm: dlnorm_1.dlnorm,
        plnorm: plnorm_1.plnorm,
        qlnorm: qlnorm_1.qlnorm,
        rlnorm: (n, meanlog = 0, sdlog = 1) => rlnorm_1.rlnorm(n, meanlog, sdlog, rng)
    };
}
exports.LogNormal = LogNormal;


/***/ }),
/* 92 */
/***/ (function(module, exports, __nested_webpack_require_229360__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const dmultinom_1 = __nested_webpack_require_229360__(145);
const rmultinom_1 = __nested_webpack_require_229360__(146);
const mersenne_twister_1 = __nested_webpack_require_229360__(5);
function Multinomial(rng = new mersenne_twister_1.MersenneTwister(0)) {
    function rmultinom(n, size, prob) {
        return rmultinom_1.rmultinom(n, size, prob, rng);
    }
    return {
        rmultinom,
        dmultinom: dmultinom_1.dmultinom
    };
}
exports.Multinomial = Multinomial;


/***/ }),
/* 93 */
/***/ (function(module, exports, __nested_webpack_require_229952__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const dnorm_1 = __nested_webpack_require_229952__(31);
const pnorm_1 = __nested_webpack_require_229952__(19);
const qnorm_1 = __nested_webpack_require_229952__(6);
const rnorm_1 = __nested_webpack_require_229952__(43);
const rng_1 = __nested_webpack_require_229952__(16);
const { normal: { Inversion } } = rng_1.rng;
function Normal(prng = new Inversion()) {
    return {
        rnorm: (n = 1, mu = 0, sigma = 1) => rnorm_1.rnorm(n, mu, sigma, prng),
        dnorm: dnorm_1.dnorm4,
        pnorm: pnorm_1.pnorm5,
        qnorm: qnorm_1.qnorm,
        rng: prng,
    };
}
exports.Normal = Normal;


/***/ }),
/* 94 */
/***/ (function(module, exports, __nested_webpack_require_230635__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const dpois_1 = __nested_webpack_require_230635__(22);
const ppois_1 = __nested_webpack_require_230635__(71);
const qpois_1 = __nested_webpack_require_230635__(147);
const rpois_1 = __nested_webpack_require_230635__(32);
const normal_1 = __nested_webpack_require_230635__(8);
function Poisson(rng = new normal_1.Inversion()) {
    return {
        dpois: dpois_1.dpois,
        ppois: ppois_1.ppois,
        qpois: qpois_1.qpois,
        rpois: (n, lambda) => rpois_1.rpois(n, lambda, rng)
    };
}
exports.Poisson = Poisson;


/***/ }),
/* 95 */
/***/ (function(module, exports, __nested_webpack_require_231247__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const rng_1 = __nested_webpack_require_231247__(16);
const dsign_1 = __nested_webpack_require_231247__(160);
const psign_1 = __nested_webpack_require_231247__(162);
const qsign_1 = __nested_webpack_require_231247__(163);
const rsign_1 = __nested_webpack_require_231247__(164);
const { MersenneTwister } = rng_1.rng;
function SignRank(rng = new MersenneTwister(0)) {
    function rsignrank(N, n) {
        return rsign_1.rsignrank(N, n, rng);
    }
    return {
        dsignrank: dsign_1.dsignrank,
        psignrank: psign_1.psignrank,
        qsignrank: qsign_1.qsignrank,
        rsignrank
    };
}
exports.SignRank = SignRank;


/***/ }),
/* 96 */
/***/ (function(module, exports, __nested_webpack_require_231964__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const rchisq_1 = __nested_webpack_require_231964__(13);
const rnorm_1 = __nested_webpack_require_231964__(43);
const r_func_1 = __nested_webpack_require_231964__(2);
const inversion_1 = __nested_webpack_require_231964__(72);
const dnt_1 = __nested_webpack_require_231964__(165);
const dt_1 = __nested_webpack_require_231964__(45);
const pnt_1 = __nested_webpack_require_231964__(46);
const pt_1 = __nested_webpack_require_231964__(47);
const qnt_1 = __nested_webpack_require_231964__(166);
const qt_1 = __nested_webpack_require_231964__(75);
const rt_1 = __nested_webpack_require_231964__(167);
function StudentT(rng = new inversion_1.Inversion()) {
    function dt(x, df, ncp, asLog = false) {
        if (ncp === undefined) {
            return dt_1.dt(x, df, asLog);
        }
        return dnt_1.dnt(x, df, ncp, asLog);
    }
    function pt(q, df, ncp, lowerTail = true, logP = false) {
        if (ncp === undefined) {
            return pt_1.pt(q, df, lowerTail, logP);
        }
        return pnt_1.pnt(q, df, ncp, lowerTail, logP);
    }
    function qt(pp, df, ncp, lowerTail = true, logP = false) {
        if (ncp === undefined) {
            return qt_1.qt(pp, df, lowerTail, logP);
        }
        return qnt_1.qnt(pp, df, ncp, lowerTail, logP);
    }
    function rt(n, df, ncp) {
        if (ncp === undefined) {
            return rt_1.rt(n, df, rng);
        }
        else if (Number.isNaN(ncp)) {
            return new Array(n).fill(NaN);
        }
        else {
            const div = r_func_1.arrayrify((a, b) => a / b);
            const sqrt = r_func_1.arrayrify(Math.sqrt);
            const norm = r_func_1.flatten(rnorm_1.rnorm(n, ncp, 1, rng));
            const chisq = r_func_1.flatten(sqrt(div(rchisq_1.rchisq(n, df, rng), df)));
            const result = norm.map((n, i) => n / chisq[i]);
            return result.length === 1 ? result[0] : result;
        }
    }
    return {
        dt,
        pt,
        qt,
        rt
    };
}
exports.StudentT = StudentT;


/***/ }),
/* 97 */
/***/ (function(module, exports, __nested_webpack_require_233970__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ptukey_1 = __nested_webpack_require_233970__(77);
const qtukey_1 = __nested_webpack_require_233970__(168);
function Tukey() {
    function ptukey(q, nmeans, df, nranges = 1, lowerTail = true, logP = false) {
        return ptukey_1.ptukey(q, nranges, nmeans, df, lowerTail, logP);
    }
    function qtukey(q, nmeans, df, nranges = 1, lowerTail = true, logP = false) {
        return qtukey_1.qtukey(q, nranges, nmeans, df, lowerTail, logP);
    }
    return {
        ptukey,
        qtukey
    };
}
exports.Tukey = Tukey;


/***/ }),
/* 98 */
/***/ (function(module, exports, __nested_webpack_require_234628__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const dunif_1 = __nested_webpack_require_234628__(170);
const punif_1 = __nested_webpack_require_234628__(171);
const qunif_1 = __nested_webpack_require_234628__(172);
const runif_1 = __nested_webpack_require_234628__(173);
const rng_1 = __nested_webpack_require_234628__(16);
const { MersenneTwister } = rng_1.rng;
function Uniform(rng = new MersenneTwister(0)) {
    return {
        dunif: dunif_1.dunif,
        punif: punif_1.punif,
        qunif: qunif_1.qunif,
        rng,
        runif: (n = 1, min = 0, max = 1) => runif_1.runif(n, min, max, rng)
    };
}
exports.Uniform = Uniform;


/***/ }),
/* 99 */
/***/ (function(module, exports, __nested_webpack_require_235307__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const dweibull_1 = __nested_webpack_require_235307__(174);
const pweibull_1 = __nested_webpack_require_235307__(175);
const qweibull_1 = __nested_webpack_require_235307__(176);
const rweibull_1 = __nested_webpack_require_235307__(177);
const rng_1 = __nested_webpack_require_235307__(16);
function Weibull(rng = new rng_1.rng.MersenneTwister(0)) {
    function rweibull(n, shape, scale = 1) {
        return rweibull_1.rweibull(n, shape, scale, rng);
    }
    return {
        dweibull: dweibull_1.dweibull,
        pweibull: pweibull_1.pweibull,
        qweibull: qweibull_1.qweibull,
        rweibull
    };
}
exports.Weibull = Weibull;


/***/ }),
/* 100 */
/***/ (function(module, exports, __nested_webpack_require_236034__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const dwilcox_1 = __nested_webpack_require_236034__(178);
const pwilcox_1 = __nested_webpack_require_236034__(179);
const qwilcox_1 = __nested_webpack_require_236034__(180);
const rwilcox_1 = __nested_webpack_require_236034__(181);
const mersenne_twister_1 = __nested_webpack_require_236034__(5);
function Wilcoxon(rng = new mersenne_twister_1.MersenneTwister(0)) {
    function rwilcox(nn, m, n) {
        return rwilcox_1.rwilcox(nn, m, n, rng);
    }
    return {
        dwilcox: dwilcox_1.dwilcox,
        pwilcox: pwilcox_1.pwilcox,
        qwilcox: qwilcox_1.qwilcox,
        rwilcox
    };
}
exports.Wilcoxon = Wilcoxon;


/***/ }),
/* 101 */
/***/ (function(module, exports, __nested_webpack_require_236750__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_236750__(1);
const gamma_cody_1 = __nested_webpack_require_236750__(66);
const bessel_constants_1 = __nested_webpack_require_236750__(26);
const { sqrt, pow, min, max: fmax, exp, trunc } = Math;
const { POSITIVE_INFINITY: ML_POSINF } = Number;
const printer = debug('I_bessel');
function I_bessel(x, alpha, nb, ize) {
    const const__ = 1.585;
    let nend;
    let intx;
    let nbmx;
    let k;
    let l;
    let n;
    let nstart;
    let pold;
    let test;
    let p;
    let em;
    let en;
    let empal;
    let emp2al;
    let halfx;
    let aa;
    let bb;
    let cc;
    let psave;
    let plast;
    let tover;
    let psavel;
    let sum;
    let nu;
    let twonu;
    let ncalc = nb;
    let bi2 = new Array(nb).fill(0);
    nu = alpha;
    twonu = nu + nu;
    if (nb > 0 && x >= 0. && (0. <= nu && nu < 1.) &&
        (1 <= ize && ize <= 2)) {
        ncalc = nb;
        if (ize === 1 && x > bessel_constants_1.exparg_BESS) {
            return { x: ML_POSINF, nb, ncalc };
        }
        if (ize === 2 && x > bessel_constants_1.xlrg_BESS_IJ) {
            return { x: 0., nb, ncalc };
        }
        intx = trunc(x);
        if (x >= bessel_constants_1.rtnsig_BESS) {
            nbmx = nb - intx;
            n = intx + 1;
            en = (n + n) + twonu;
            plast = 1.;
            p = en / x;
            test = bessel_constants_1.ensig_BESS + bessel_constants_1.ensig_BESS;
            if (intx * 2 > bessel_constants_1.nsig_BESS * 5) {
                test = sqrt(test * p);
            }
            else {
                test /= pow(const__, intx);
            }
            let gotoL120 = false;
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
                    en = (n + n) + twonu;
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
            let gotoL230 = false;
            for (let cnt = 0; cnt < 1; cnt++) {
                if (nend < 0) {
                    bi2[n - 1] = aa;
                    nend = -nend;
                    for (l = 1; l <= nend; ++l) {
                        bi2[n + l - 1] = 0.;
                    }
                }
                else {
                    if (nend > 0) {
                        for (l = 1; l <= nend; ++l) {
                            --n;
                            en -= 2.;
                            cc = bb;
                            bb = aa;
                            if (nend > 100 && aa > 1e200) {
                                let pow05_to_900 = pow(2, -900);
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
                    if (n === 2)
                        emp2al = 1.;
                    else
                        emp2al -= 1.;
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
                        if (n === 2)
                            emp2al = 1.;
                        else
                            emp2al -= 1.;
                        empal -= 1.;
                        sum = (sum + bi2[n - 1] * empal) * emp2al / em;
                    }
                }
                bi2[0] = 2. * empal * bi2[1] / x + bi2[2];
            }
            if (gotoL230 === false) {
                sum = sum + sum + bi2[0];
            }
            if (nu !== 0.)
                sum *= (gamma_cody_1.Rf_gamma_cody(1. + nu) * pow(x * .5, -nu));
            if (ize === 1)
                sum *= exp(-(x));
            aa = bessel_constants_1.enmten_BESS;
            if (sum > 1.)
                aa *= sum;
            for (n = 1; n <= nb; ++n) {
                if (bi2[n - 1] < aa)
                    bi2[n - 1] = 0.;
                else
                    bi2[n - 1] /= sum;
            }
            const rc = { x: bi2[nb - 1], nb, ncalc };
            printer('normalize, devide all  Bi[N] by sum, result:%o', rc);
            return rc;
        }
        else {
            aa = 1.;
            empal = 1. + nu;
            halfx = .5 * x;
            if (nu !== 0.)
                aa = pow(halfx, nu) / gamma_cody_1.Rf_gamma_cody(empal);
            if (ize === 2)
                aa *= exp(-(x));
            bb = halfx * halfx;
            bi2[0] = aa + aa * bb / empal;
            if (x !== 0. && bi2[0] === 0.)
                ncalc = 0;
            if (nb > 1) {
                if (x === 0.) {
                    for (n = 2; n <= nb; ++n)
                        bi2[n - 1] = 0.;
                }
                else {
                    cc = halfx;
                    tover = (bessel_constants_1.enmten_BESS + bessel_constants_1.enmten_BESS) / x;
                    if (bb !== 0.)
                        tover = bessel_constants_1.enmten_BESS / bb;
                    for (n = 2; n <= nb; ++n) {
                        aa /= empal;
                        empal += 1.;
                        aa *= cc;
                        if (aa <= tover * empal)
                            bi2[n - 1] = aa = 0.;
                        else
                            bi2[n - 1] = aa + aa * bb / empal;
                        if (bi2[n - 1] === 0. && ncalc > n)
                            ncalc = n - 1;
                    }
                }
            }
        }
    }
    else {
        ncalc = min(nb, 0) - 1;
    }
    const rc = { x: bi2[nb - 1], nb, ncalc };
    printer('drop off, result:%o', rc);
    return rc;
}
exports.I_bessel = I_bessel;


/***/ }),
/* 102 */
/***/ (function(module, exports, __nested_webpack_require_246149__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_246149__(1);
const _general_1 = __nested_webpack_require_246149__(0);
const r_func_1 = __nested_webpack_require_246149__(2);
const sinpi_1 = __nested_webpack_require_246149__(24);
const besselK_1 = __nested_webpack_require_246149__(51);
const IBessel_1 = __nested_webpack_require_246149__(101);
const { isNaN: ISNAN } = Number;
const { exp, trunc, floor, PI: M_PI } = Math;
const printer = debug('bessel_i');
function bessel_i(_x, _alpha, _expo) {
    return r_func_1.multiplexer(_x, _alpha, _expo)((x, alpha, expo) => internal_bessel_i(x, alpha, expo));
}
exports.bessel_i = bessel_i;
function internal_bessel_i(x, alpha, expo = false) {
    let nb;
    let ize;
    let na;
    if (ISNAN(x) || ISNAN(alpha))
        return x + alpha;
    if (x < 0) {
        _general_1.ML_ERROR(_general_1.ME.ME_RANGE, 'bessel_i', printer);
        return NaN;
    }
    ize = expo ? 2 : 1;
    na = floor(alpha);
    if (alpha < 0) {
        return (internal_bessel_i(x, -alpha, expo) +
            ((alpha === na) ? 0 :
                besselK_1.internal_bessel_k(x, -alpha, expo) *
                    ((ize === 1) ? 2. : 2. * exp(-2. * x)) / M_PI * sinpi_1.sinpi(-alpha)));
    }
    nb = 1 + trunc(na);
    alpha -= (nb - 1);
    const rc = IBessel_1.I_bessel(x, alpha, nb, ize);
    if (rc.ncalc !== rc.nb) {
        if (rc.ncalc < 0)
            printer('bessel_i(%d): ncalc (=%d) != nb (=%d); alpha=%d. Arg. out of range?', x, rc.ncalc, rc.nb, alpha);
        else
            printer('bessel_i(%d,nu=%d): precision lost in result\n', rc.x, alpha + rc.nb - 1);
    }
    x = rc.x;
    return x;
}
exports.internal_bessel_i = internal_bessel_i;


/***/ }),
/* 103 */
/***/ (function(module, exports, __nested_webpack_require_247899__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_247899__(1);
const _general_1 = __nested_webpack_require_247899__(0);
const gamma_cody_1 = __nested_webpack_require_247899__(66);
const bessel_constants_1 = __nested_webpack_require_247899__(26);
const { min, trunc, pow, sqrt, sin, cos, max, abs } = Math;
const printer = debug('J_bessel');
function J_bessel(x, alpha, nb) {
    const pi2 = .636619772367581343075535;
    const twopi1 = 6.28125;
    const twopi2 = .001935307179586476925286767;
    const fact = [1., 1., 2., 6., 24., 120., 720., 5040., 40320.,
        362880., 3628800., 39916800., 479001600., 6227020800., 87178291200.,
        1.307674368e12, 2.0922789888e13, 3.55687428096e14, 6.402373705728e15,
        1.21645100408832e17, 2.43290200817664e18, 5.109094217170944e19,
        1.12400072777760768e21, 2.585201673888497664e22,
        6.2044840173323943936e23];
    let b2 = new Array(nb).fill(0);
    let i_nend;
    let nbmx;
    let i;
    let j;
    let l;
    let i_m;
    let n;
    let nstart;
    let capp;
    let capq;
    let pold;
    let vcos;
    let test;
    let vsin;
    let p;
    let s;
    let t;
    let z;
    let alpem;
    let halfx;
    let aa;
    let bb;
    let cc;
    let psave;
    let plast;
    let tover;
    let t1;
    let alp2em;
    let em;
    let en;
    let xc;
    let xk;
    let xm;
    let psavel;
    let gnu;
    let xin;
    let sum;
    let ncalc;
    let gotoL190 = false;
    let nu = alpha;
    let twonu = nu + nu;
    if (!(nb > 0 && x >= 0. && 0. <= nu && nu < 1.)) {
        b2[0] = 0.;
        ncalc = min(nb, 0) - 1;
        return { x, nb, ncalc };
    }
    ncalc = nb;
    if (x > bessel_constants_1.xlrg_BESS_IJ) {
        _general_1.ML_ERROR(_general_1.ME.ME_RANGE, 'J_bessel', printer);
        return { x: 0, nb, ncalc };
    }
    let intxj = trunc(x);
    if (x < 1 / 10000) {
        printer('x < 0.0001 , x=%d, nb=%d', x, nb);
        alpem = 1. + nu;
        halfx = (x > bessel_constants_1.enmten_BESS) ? .5 * x : 0.;
        aa = (nu !== 0.) ? pow(halfx, nu) / (nu * gamma_cody_1.Rf_gamma_cody(nu)) : 1.;
        bb = (x + 1. > 1.) ? -halfx * halfx : 0.;
        b2[0] = aa + aa * bb / alpem;
        if (x !== 0. && b2[0] === 0.)
            ncalc = 0;
        if (nb !== 1) {
            if (x <= 0.) {
                for (n = 2; n <= nb; ++n)
                    b2[n - 1] = 0.;
            }
            else {
                if (bb === 0.)
                    tover = (bessel_constants_1.enmten_BESS + bessel_constants_1.enmten_BESS) / x;
                else
                    tover = bessel_constants_1.enmten_BESS / bb;
                cc = halfx;
                for (n = 2; n <= nb; ++n) {
                    aa /= alpem;
                    alpem += 1.;
                    aa *= cc;
                    if (aa <= tover * alpem)
                        aa = 0.;
                    b2[n - 1] = aa + aa * bb / alpem;
                    if (b2[n - 1] === 0. && ncalc > n)
                        ncalc = n - 1;
                }
            }
        }
    }
    else if (x > 25. && nb <= intxj + 1) {
        printer('x > 25 and nb < int(x+1) :x=%d, nb=%d', x, nb);
        xc = sqrt(pi2 / x);
        xin = 1 / (64 * x * x);
        if (x >= 130.)
            i_m = 4;
        else if (x >= 35.)
            i_m = 8;
        else
            i_m = 11;
        xm = 4. * i_m;
        t = trunc(x / (twopi1 + twopi2) + .5);
        z = (x - t * twopi1) - t * twopi2 - (nu + .5) / pi2;
        vsin = sin(z);
        vcos = cos(z);
        gnu = twonu;
        for (i = 1; i <= 2; ++i) {
            s = (xm - 1. - gnu) * (xm - 1. + gnu) * xin * .5;
            t = (gnu - (xm - 3.)) * (gnu + (xm - 3.));
            t1 = (gnu - (xm + 1.)) * (gnu + (xm + 1.));
            let k = i_m + i_m;
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
                return { x: b2[nb - 1], nb, ncalc };
            }
            t = vsin;
            vsin = -vcos;
            vcos = t;
            gnu += 2.;
        }
        if (nb > 2)
            for (gnu = twonu + 2., j = 3; j <= nb; j++, gnu += 2.)
                b2[j - 1] = gnu * b2[j - 1 - 1] / x - b2[j - 2 - 1];
    }
    else {
        printer('rest: x=%d, nb=%d\t', x, nb);
        nbmx = nb - intxj;
        n = intxj + 1;
        en = (n + n) + twonu;
        plast = 1.;
        p = en / x;
        test = bessel_constants_1.ensig_BESS + bessel_constants_1.ensig_BESS;
        if (nbmx >= 3) {
            tover = bessel_constants_1.enten_BESS / bessel_constants_1.ensig_BESS;
            nstart = intxj + 2;
            i_nend = nb - 1;
            en = (nstart + nstart) - 2. + twonu;
            for (let k = nstart; k <= i_nend; ++k) {
                n = k;
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
            en = (n + n) + twonu;
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
        if (i_m === 0)
            sum = 0.;
        else {
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
                if (n === 1)
                    break;
                alpem = em - 1. + nu;
                if (alpem === 0.)
                    alpem = 1.;
                sum = (sum + aa * alp2em) * alpem / em;
            }
        }
        b2[n - 1] = aa;
        let gotoL240 = false;
        let gotoL250 = false;
        for (let cnt = 1; cnt > 0; cnt--) {
            if (i_nend >= 0) {
                if (nb <= 1) {
                    if (nu + 1. === 1.)
                        alp2em = 1.;
                    else
                        alp2em = nu;
                    sum += b2[0] * alp2em;
                    gotoL250 = true;
                    break;
                }
                else {
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
                        if (alpem === 0.)
                            alpem = 1.;
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
                    if (alpem === 0.)
                        alpem = 1.;
                    sum = (sum + b2[n - 1] * alp2em) * alpem / em;
                }
            }
            b2[0] = 2. * (nu + 1.) * b2[1] / x - b2[2];
        }
        if (gotoL250 === false) {
            em -= 1.;
            alp2em = em + em + nu;
            if (alp2em === 0.)
                alp2em = 1.;
            sum += b2[0] * alp2em;
        }
        if (abs(nu) > 1e-15)
            sum *= (gamma_cody_1.Rf_gamma_cody(nu) * pow(.5 * x, -nu));
        aa = bessel_constants_1.enmten_BESS;
        if (sum > 1.)
            aa *= sum;
        for (n = 1; n <= nb; ++n) {
            if (abs(b2[n - 1]) < aa)
                b2[n - 1] = 0.;
            else
                b2[n - 1] /= sum;
        }
    }
    return { x: b2[nb - 1], nb, ncalc };
}
exports.J_bessel = J_bessel;


/***/ }),
/* 104 */
/***/ (function(module, exports, __nested_webpack_require_258345__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_258345__(1);
const _general_1 = __nested_webpack_require_258345__(0);
const bessel_constants_1 = __nested_webpack_require_258345__(26);
const M_SQRT_2dPI = 0.797884560802865355879892119869;
const { min, log, exp, abs: fabs, sinh, trunc, sqrt, max } = Math;
const { MAX_VALUE: DBL_MAX, EPSILON: DBL_EPSILON, MIN_VALUE: DBL_MIN } = Number;
const printer = debug('K_bessel');
const ML_POSINF = Infinity;
function K_bessel(x, alpha, nb, ize) {
    const a = .11593151565841244881;
    const p = [.805629875690432845, 20.4045500205365151,
        157.705605106676174, 536.671116469207504, 900.382759291288778,
        730.923886650660393, 229.299301509425145, .822467033424113231];
    const q = [29.4601986247850434, 277.577868510221208,
        1206.70325591027438, 2762.91444159791519, 3443.74050506564618,
        2210.63190113378647, 572.267338359892221];
    const r = [-.48672575865218401848, 13.079485869097804016,
        -101.96490580880537526, 347.65409106507813131,
        3.495898124521934782e-4];
    const s = [-25.579105509976461286, 212.57260432226544008,
        -610.69018684944109624, 422.69668805777760407];
    const t = [1.6125990452916363814e-10,
        2.5051878502858255354e-8, 2.7557319615147964774e-6,
        1.9841269840928373686e-4, .0083333333333334751799,
        .16666666666666666446];
    const estm = [52.0583, 5.7607, 2.7782, 14.4303, 185.3004, 9.3715];
    const estf = [41.8341, 7.1075, 6.4306, 42.511, 1.35633, 84.5096, 20.];
    let iend;
    let i;
    let j;
    let k;
    let m;
    let ii;
    let mplus1;
    let x2by4;
    let twox;
    let c;
    let blpha;
    let ratio;
    let wminf;
    let d1;
    let d2;
    let d3;
    let f0;
    let f1;
    let f2;
    let p0;
    let q0;
    let t1;
    let t2;
    let twonu;
    let dm;
    let ex;
    let bk1;
    let bk2;
    let nu;
    let bk = new Array(nb).fill(0);
    ii = 0;
    ex = x;
    nu = alpha;
    let ncalc = min(nb, 0) - 2;
    if (nb > 0 && (0. <= nu && nu < 1.) && (1 <= ize && ize <= 2)) {
        for (let cnt = 0; cnt < 1; cnt++) {
            if (ex <= 0 || (ize === 1 && ex > bessel_constants_1.xmax_BESS_K)) {
                if (ex <= 0) {
                    if (ex < 0)
                        _general_1.ML_ERROR(_general_1.ME.ME_RANGE, 'K_bessel', printer);
                    bk[0] = ML_POSINF;
                }
                else
                    bk[0] = 0.;
                ncalc = nb;
                return { x: bk[0], nb, ncalc };
            }
            k = 0;
            if (nu < bessel_constants_1.sqxmin_BESS_K) {
                nu = 0.;
            }
            else if (nu > .5) {
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
                }
                else {
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
                            return { x: bk[nb - 1], nb, ncalc };
                        }
                        bk[0] = ratio * bk[0] / ex;
                        twonu += 2.;
                        ratio = twonu;
                    }
                    ncalc = 1;
                    if (nb === 1)
                        return { x: bk[nb - 1], nb, ncalc };
                    ncalc = -1;
                    for (i = 1; i < nb; ++i) {
                        if (ratio >= c)
                            return { x: bk[nb - 1], nb, ncalc };
                        bk[i] = ratio / ex;
                        twonu += 2.;
                        ratio = twonu;
                    }
                    ncalc = 1;
                    break;
                }
                else {
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
                    } while (fabs(t1 / (f1 + bk1)) > DBL_EPSILON ||
                        fabs(t2 / (f2 + bk2)) > DBL_EPSILON);
                    bk1 = f1 + bk1;
                    bk2 = 2. * (f2 + bk2) / ex;
                    if (ize === 2) {
                        d1 = exp(ex);
                        bk1 *= d1;
                        bk2 *= d1;
                    }
                    wminf = estf[0] * ex + estf[1];
                }
            }
            else if (DBL_EPSILON * ex > 1.) {
                ncalc = nb;
                bk1 = 1. / (M_SQRT_2dPI * sqrt(ex));
                return { x: bk1, nb, ncalc };
            }
            else {
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
                }
                else {
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
                    if (ize === 1)
                        bk1 *= exp(-ex);
                    wminf = estf[4] * (ex - fabs(ex - estf[6])) + estf[5];
                }
                bk2 = bk1 + bk1 * (nu + .5 - ratio) / ex;
            }
            ncalc = nb;
            bk[0] = bk1;
            if (iend === 0)
                return { x: bk[nb - 1], nb, ncalc };
            j = 1 - k;
            if (j >= 0)
                bk[j] = bk2;
            if (iend === 1)
                return { x: bk[nb - 1], nb, ncalc };
            m = min(trunc(wminf - nu), iend);
            for (i = 2; i <= m; ++i) {
                t1 = bk1;
                bk1 = bk2;
                twonu += 2.;
                if (ex < 1.) {
                    if (bk1 >= DBL_MAX / twonu * ex)
                        break;
                }
                else {
                    if (bk1 / ex >= DBL_MAX / twonu)
                        break;
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
                return { x: bk[nb - 1], nb, ncalc };
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
                }
                else {
                    if (bk2 >= DBL_MAX / ratio)
                        return { x: bk[nb - 1], nb, ncalc };
                    bk2 *= ratio;
                }
            }
            ncalc = max(1, mplus1 - k);
            if (ncalc === 1)
                bk[0] = bk2;
            if (nb === 1) {
                return { x: bk2, nb, ncalc };
            }
        }
        for (i = ncalc; i < nb; ++i) {
            bk[i] *= bk[i - 1];
            (ncalc)++;
        }
    }
    return { x: bk[nb - 1], nb, ncalc };
}
exports.K_bessel = K_bessel;


/***/ }),
/* 105 */
/***/ (function(module, exports, __nested_webpack_require_269718__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_269718__(1);
const cospi_1 = __nested_webpack_require_269718__(23);
const sinpi_1 = __nested_webpack_require_269718__(24);
const bessel_constants_1 = __nested_webpack_require_269718__(26);
const M_SQRT_2dPI = 0.797884560802865355879892119869;
const M_1_PI = 0.3183098861837907;
const M_PI_2 = 1.5707963267948966;
const { min, trunc, sqrt, sin, cos, log, abs, pow, PI: M_PI } = Math;
const { MIN_VALUE: DBL_MIN, EPSILON: DBL_EPSILON, NEGATIVE_INFINITY: ML_NEGINF, MAX_VALUE: DBL_MAX } = Number;
const printer = debug('Y_bessel');
function Y_bessel(x, alpha, nb) {
    const fivpi = 15.707963267948966192;
    const pim5 = .70796326794896619231;
    const ch = [-6.7735241822398840964e-24,
        -6.1455180116049879894e-23, 2.9017595056104745456e-21,
        1.3639417919073099464e-19, 2.3826220476859635824e-18,
        -9.0642907957550702534e-18, -1.4943667065169001769e-15,
        -3.3919078305362211264e-14, -1.7023776642512729175e-13,
        9.1609750938768647911e-12, 2.4230957900482704055e-10,
        1.7451364971382984243e-9, -3.3126119768180852711e-8,
        -8.6592079961391259661e-7, -4.9717367041957398581e-6,
        7.6309597585908126618e-5, .0012719271366545622927,
        .0017063050710955562222, -.07685284084478667369,
        -.28387654227602353814, .92187029365045265648];
    let i;
    let k;
    let na;
    let ncalc;
    let alfa;
    let div;
    let ddiv;
    let even;
    let gamma;
    let term;
    let cosmu;
    let sinmu;
    let b;
    let c;
    let d;
    let e;
    let f;
    let g;
    let h;
    let p;
    let q;
    let r;
    let s;
    let d1;
    let d2;
    let q0;
    let pa;
    let pa1;
    let qa;
    let qa1;
    let en;
    let ya;
    let ya1;
    let twobyx;
    let den;
    let odd;
    let aye;
    let dmu;
    let x2;
    let xna;
    let en1 = ya = ya1 = 0;
    let ex = x;
    let nu = alpha;
    let by = new Array(nb).fill(0);
    if (!(nb > 0 && 0. <= nu && nu < 1.)) {
        printer('violaton: abort nb=%d, nu=%d', nb, nu);
        by[0] = 0.;
        ncalc = min(nb, 0) - 1;
        return { x: 0, nb, ncalc };
    }
    if (ex < DBL_MIN || ex > bessel_constants_1.xlrg_BESS_Y) {
        printer('range issue: x < DBL_MIN but still bigger then 1e8 x=(%d)', ex);
        ncalc = nb;
        if (ex > bessel_constants_1.xlrg_BESS_Y)
            by[0] = 0.;
        else if (ex < DBL_MIN)
            by[0] = ML_NEGINF;
        return { x: by[0], nb, ncalc };
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
    }
    else if (ex < 3.) {
        b = ex * .5;
        d = -log(b);
        f = nu * d;
        e = pow(b, -nu);
        if (abs(nu) < bessel_constants_1.M_eps_sinc)
            c = M_1_PI;
        else
            c = nu / sinpi_1.sinpi(nu);
        if (abs(f) < 1.) {
            x2 = f * f;
            en = 19.;
            s = 1.;
            for (i = 1; i <= 9; ++i) {
                s = s * x2 / en / (en - 1.) + 1.;
                en -= 2.;
            }
        }
        else {
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
        if (abs(c) < bessel_constants_1.M_eps_sinc)
            r = 1.;
        else
            r = sinpi_1.sinpi(nu / 2) / c;
        r = M_PI * c * r * r;
        c = 1.;
        d = -b * b;
        h = 0.;
        ya = f + r * q;
        ya1 = p;
        en = 1.;
        while (abs(g / (1. + abs(ya))) +
            abs(h / (1. + abs(ya1))) > DBL_EPSILON) {
            f = (f * en + p + q) / (en * en - e);
            c *= (d / en);
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
    }
    else if (ex < bessel_constants_1.thresh_BESS_Y) {
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
    }
    else {
        na = 0;
        d1 = trunc(ex / fivpi);
        i = trunc(d1);
        dmu = ex - 15. * d1 - d1 * pim5 - (alpha + .5) * M_PI_2;
        if (i - (i / 2 << 1) === 0) {
            cosmu = cos(dmu);
            sinmu = sin(dmu);
        }
        else {
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
                term *= (d1 / div);
                q += term;
                if (abs(term) <= DBL_EPSILON) {
                    break;
                }
            }
            p += 1.;
            q += q0;
            if (k === 1)
                ya = M_SQRT_2dPI * (p * cosmu - q * sinmu) / den;
            else
                ya1 = M_SQRT_2dPI * (p * cosmu - q * sinmu) / den;
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
                    if (abs(by[i - 1]) * twobyx >= DBL_MAX / aye)
                        break;
                }
                else {
                    if (abs(by[i - 1]) >= DBL_MAX / aye / twobyx)
                        break;
                }
                by[i] = twobyx * aye * by[i - 1] - by[i - 2];
                aye += 1.;
                ++(ncalc);
            }
        }
    }
    return { x: by[ncalc - 1], nb, ncalc };
}
exports.Y_bessel = Y_bessel;


/***/ }),
/* 106 */
/***/ (function(module, exports, __nested_webpack_require_278203__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_278203__(1);
const _general_1 = __nested_webpack_require_278203__(0);
const gamma_fn_1 = __nested_webpack_require_278203__(29);
const r_func_1 = __nested_webpack_require_278203__(2);
const lbeta_1 = __nested_webpack_require_278203__(11);
const xmax = 171.61447887182298;
const lnsml = -708.39641853226412;
const { isNaN: ISNAN, isFinite: R_FINITE, POSITIVE_INFINITY: ML_POSINF } = Number;
const printer_beta = debug('beta');
function beta(_a, _b) {
    return r_func_1.multiplexer(_a, _b)((a, b) => internal_beta(a, b));
}
exports.beta = beta;
function internal_beta(a, b) {
    if (ISNAN(a) || ISNAN(b))
        return a + b;
    if (a < 0 || b < 0)
        return _general_1.ML_ERR_return_NAN(printer_beta);
    else if (a === 0 || b === 0)
        return ML_POSINF;
    else if (!R_FINITE(a) || !R_FINITE(b))
        return 0;
    if (a + b < xmax) {
        return 1 / gamma_fn_1.gammafn(a + b) * gamma_fn_1.gammafn(a) * gamma_fn_1.gammafn(b);
    }
    else {
        let val = lbeta_1.internal_lbeta(a, b);
        if (val < lnsml) {
            _general_1.ML_ERROR(_general_1.ME.ME_UNDERFLOW, 'beta', printer_beta);
        }
        return Math.exp(val);
    }
}
exports.internal_beta = internal_beta;


/***/ }),
/* 107 */
/***/ (function(module, exports, __nested_webpack_require_279539__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_279539__(1);
const _general_1 = __nested_webpack_require_279539__(0);
const { LN2: M_LN2, log, min: fmin2, max: fmax2, exp, sqrt } = Math;
const { MAX_VALUE: DBL_MAX, isFinite: R_FINITE } = Number;
const printer = debug('rbeta');
exports.expmax = _general_1.DBL_MAX_EXP * M_LN2;
function rbeta(n, aa, bb, rng) {
    const result = new Array(n).fill(0).map(() => {
        if (aa < 0 || bb < 0) {
            return _general_1.ML_ERR_return_NAN(printer);
        }
        if (!R_FINITE(aa) && !R_FINITE(bb))
            return 0.5;
        if (aa === 0 && bb === 0)
            return rng.unif_rand() < 0.5 ? 0 : 1;
        if (!R_FINITE(aa) || bb === 0)
            return 1.0;
        if (!R_FINITE(bb) || aa === 0)
            return 0.0;
        let a;
        let b;
        let alpha;
        let r;
        let s;
        let t;
        let u1 = 0;
        let u2;
        let v = 0;
        let w = 0;
        let y;
        let z;
        let qsame;
        let beta = 0;
        let gamma = 0;
        let delta;
        let k1 = 0;
        let k2 = 0;
        let olda = -1.0;
        let oldb = -1.0;
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
            }
            else {
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
                    if (0.25 * u2 + z - y >= k1)
                        continue;
                }
                else {
                    z = u1 * u1 * u2;
                    if (z <= 0.25) {
                        v_w_from__u1_bet(b);
                        break;
                    }
                    if (z >= k2)
                        continue;
                }
                v_w_from__u1_bet(b);
                if (alpha * (log(alpha / (a + w)) + v) - 1.3862944 >= log(z))
                    break;
            }
            return aa === a ? a / (a + w) : w / (a + w);
        }
        else {
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
                if (s + 2.609438 >= 5.0 * z)
                    break;
                t = log(z);
                if (s > t)
                    break;
            } while (r + alpha * log(alpha / (b + w)) < t);
            return aa !== a ? b / (b + w) : w / (b + w);
        }
    });
    return result.length === 1 ? result[0] : result;
}
exports.rbeta = rbeta;


/***/ }),
/* 108 */
/***/ (function(module, exports, __nested_webpack_require_283187__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_283187__(1);
const _general_1 = __nested_webpack_require_283187__(0);
const dbinom_1 = __nested_webpack_require_283187__(17);
const lgamma_fn_1 = __nested_webpack_require_283187__(4);
const printer = debug('dnbinom');
const { log, round: R_forceint, log1p } = Math;
const { isFinite: R_FINITE, isNaN: ISNAN } = Number;
function dnbinom(xx, size, prob, give_log) {
    const fx = Array.isArray(xx) ? xx : [xx];
    const result = fx.map(x => {
        let ans;
        let p;
        if (ISNAN(x) || ISNAN(size) || ISNAN(prob)) {
            return x + size + prob;
        }
        if (prob <= 0 || prob > 1 || size < 0) {
            return _general_1.ML_ERR_return_NAN(printer);
        }
        let rc = _general_1.R_D_nonint_check(give_log, x, printer);
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
const printer_dnbinom_mu = debug('dnbinom_mu');
function dnbinom_mu(xx, size, mu, give_log) {
    const fx = Array.isArray(xx) ? xx : [xx];
    const result = fx.map(x => {
        let ans;
        let p;
        if (ISNAN(x) || ISNAN(size) || ISNAN(mu)) {
            return x + size + mu;
        }
        if (mu < 0 || size < 0) {
            return _general_1.ML_ERR_return_NAN(printer_dnbinom_mu);
        }
        let rc = _general_1.R_D_nonint_check(give_log, x, printer_dnbinom_mu);
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
            let llogx;
            if (size < mu) {
                llogx = log(size / (size + mu));
            }
            else {
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


/***/ }),
/* 109 */
/***/ (function(module, exports, __nested_webpack_require_286214__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_286214__(1);
const _general_1 = __nested_webpack_require_286214__(0);
const toms708_1 = __nested_webpack_require_286214__(9);
const expm1_1 = __nested_webpack_require_286214__(3);
const qnorm_1 = __nested_webpack_require_286214__(6);
const r_func_1 = __nested_webpack_require_286214__(2);
const pnbinom_1 = __nested_webpack_require_286214__(57);
const { isNaN: ISNAN, POSITIVE_INFINITY: ML_POSINF, EPSILON: DBL_EPSILON } = Number;
const { max: fmax2, sqrt, floor, round: R_forceint } = Math;
const printer_do_search = debug('do_search');
function do_search(y, z, p, n, pr, incr) {
    printer_do_search('start: y:%d, z:%o, p:%d, n:%d, pr:%d, incr:%d', y, z, p, n, pr, incr);
    if (z.val >= p) {
        while (true) {
            if (y === 0 ||
                (z.val = pnbinom_1.pnbinom(y - incr, n, pr, true, false)) < p) {
                printer_do_search('exit1');
                return y;
            }
            y = fmax2(0, y - incr);
        }
    }
    else {
        while (true) {
            y = y + incr;
            if ((z.val = pnbinom_1.pnbinom(y, n, pr, true, false)) >= p) {
                printer_do_search('exit2');
                return y;
            }
        }
    }
}
const printer_qnbinom = debug('qnbinom');
function qnbinom(pp, size, prob, lower_tail, log_p) {
    return r_func_1.map(pp)(p => {
        let P;
        let Q;
        let mu;
        let sigma;
        let gamma;
        let y;
        const z = new toms708_1.NumberW(0);
        if (ISNAN(p) || ISNAN(size) || ISNAN(prob)) {
            return NaN;
        }
        if (prob === 0 && size === 0)
            return 0;
        if (prob <= 0 || prob > 1 || size < 0) {
            return _general_1.ML_ERR_return_NAN(printer_qnbinom);
        }
        if (prob === 1 || size === 0)
            return 0;
        let rc = _general_1.R_Q_P01_boundaries(lower_tail, log_p, p, 0, ML_POSINF);
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
            if (p === _general_1.R_DT_0(lower_tail, log_p))
                return 0;
            if (p === _general_1.R_DT_1(lower_tail, log_p))
                return ML_POSINF;
        }
        if (p + 1.01 * DBL_EPSILON >= 1)
            return ML_POSINF;
        z.val = qnorm_1.qnorm(p, 0, 1, true, false);
        y = R_forceint(mu + sigma * (z.val + gamma * (z.val * z.val - 1) / 6));
        z.val = pnbinom_1.pnbinom(y, size, prob, true, false);
        p *= 1 - 64 * DBL_EPSILON;
        if (y < 1e5)
            return do_search(y, z, p, size, prob, 1);
        {
            let incr = floor(y * 0.001);
            let oldincr;
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


/***/ }),
/* 110 */
/***/ (function(module, exports, __nested_webpack_require_289592__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_289592__(1);
const _general_1 = __nested_webpack_require_289592__(0);
const rgamma_1 = __nested_webpack_require_289592__(30);
const rpois_1 = __nested_webpack_require_289592__(32);
const { isFinite: R_FINITE } = Number;
const printer_rnbinom = debug('rnbinom');
function rnbinom(n, size, prob, rng) {
    printer_rnbinom('n:%d, size:%d, prob:%d', n, size, prob);
    const result = new Array(n).fill(0).map(() => {
        if (!R_FINITE(size) ||
            !R_FINITE(prob) ||
            size <= 0 ||
            prob <= 0 ||
            prob > 1) {
            return _general_1.ML_ERR_return_NAN(printer_rnbinom);
        }
        return prob === 1
            ? 0
            : rpois_1.rpois(1, rgamma_1.rgamma(1, size, (1 - prob) / prob, rng), rng);
    });
    return result.length === 1 ? result[0] : result;
}
exports.rnbinom = rnbinom;
const printer_rnbinom_mu = debug('rnbinom_mu');
function rnbinom_mu(n = 1, size, mu, rng) {
    const result = new Array(n).fill(0).map(() => {
        if (!R_FINITE(size) || !R_FINITE(mu) || size <= 0 || mu < 0) {
            return _general_1.ML_ERR_return_NAN(printer_rnbinom_mu);
        }
        return mu === 0
            ? 0
            : rpois_1.rpois(1, rgamma_1.rgamma(1, size, mu / size, rng), rng);
    });
    return result.length === 1 ? result[0] : result;
}
exports.rnbinom_mu = rnbinom_mu;


/***/ }),
/* 111 */
/***/ (function(module, exports, __nested_webpack_require_291087__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_291087__(1);
const _general_1 = __nested_webpack_require_291087__(0);
const r_func_1 = __nested_webpack_require_291087__(2);
const { isNaN: ISNAN } = Number;
const { PI: M_PI, log } = Math;
const printer = debug('dcauchy');
function dcauchy(xx, location = 0, scale = 1, giveLog = false) {
    return r_func_1.map(xx)(x => {
        let y;
        if (ISNAN(x) || ISNAN(location) || ISNAN(scale)) {
            return x + location + scale;
        }
        if (scale <= 0) {
            return _general_1.ML_ERR_return_NAN(printer);
        }
        y = (x - location) / scale;
        return giveLog
            ? -log(M_PI * scale * (1 + y * y))
            : 1 / (M_PI * scale * (1 + y * y));
    });
}
exports.dcauchy = dcauchy;


/***/ }),
/* 112 */
/***/ (function(module, exports, __nested_webpack_require_291975__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_291975__(1);
const _general_1 = __nested_webpack_require_291975__(0);
const _general_2 = __nested_webpack_require_291975__(0);
const r_func_1 = __nested_webpack_require_291975__(2);
const trigonometry_1 = __nested_webpack_require_291975__(33);
const { isNaN: ISNAN, isFinite: R_FINITE } = Number;
const { abs: fabs } = Math;
const printer = debug('pcauchy');
function pcauchy(xx, location = 0, scale = 1, lowerTail = true, logP = false) {
    return r_func_1.map(xx)(x => {
        if (ISNAN(x) || ISNAN(location) || ISNAN(scale))
            return x + location + scale;
        if (scale <= 0) {
            return _general_1.ML_ERR_return_NAN(printer);
        }
        x = (x - location) / scale;
        if (ISNAN(x)) {
            return _general_1.ML_ERR_return_NAN(printer);
        }
        if (!R_FINITE(x)) {
            if (x < 0)
                return _general_1.R_DT_0(lowerTail, logP);
            else
                return _general_1.R_DT_1(lowerTail, logP);
        }
        if (!lowerTail)
            x = -x;
        if (fabs(x) > 1) {
            let y = trigonometry_1.atanpi(1 / x);
            return x > 0 ? _general_2.R_D_Clog(logP, y) : _general_1.R_D_val(logP, -y);
        }
        else {
            return _general_1.R_D_val(logP, 0.5 + trigonometry_1.atanpi(x));
        }
    });
}
exports.pcauchy = pcauchy;


/***/ }),
/* 113 */
/***/ (function(module, exports, __nested_webpack_require_293449__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_293449__(1);
const _general_1 = __nested_webpack_require_293449__(0);
const r_func_1 = __nested_webpack_require_293449__(2);
const tanpi_1 = __nested_webpack_require_293449__(76);
const { expm1, exp } = Math;
const { isNaN: ISNAN, isFinite: R_FINITE } = Number;
const { ML_POSINF, ML_NEGINF } = {
    ML_POSINF: Infinity,
    ML_NEGINF: -Infinity
};
const printer = debug('qcauchy');
function qcauchy(pp, location = 0, scale = 1, lowerTail = true, logP = false) {
    return r_func_1.map(pp)(p => {
        if (ISNAN(p) || ISNAN(location) || ISNAN(scale))
            return NaN;
        let lower_tail = lowerTail;
        let rc = _general_1.R_Q_P01_check(logP, p);
        if (rc !== undefined) {
            return rc;
        }
        if (scale <= 0 || !R_FINITE(scale)) {
            if (scale === 0)
                return location;
            return _general_1.ML_ERR_return_NAN(printer);
        }
        const my_INF = location + (lower_tail ? scale : -scale) * ML_POSINF;
        if (logP) {
            if (p > -1) {
                if (p === 0)
                    return my_INF;
                lower_tail = !lower_tail;
                p = -expm1(p);
            }
            else
                p = exp(p);
        }
        else {
            if (p > 0.5) {
                if (p === 1)
                    return my_INF;
                p = 1 - p;
                lower_tail = !lower_tail;
            }
        }
        if (p === 0.5)
            return location;
        if (p === 0)
            return location + (lower_tail ? scale : -scale) * ML_NEGINF;
        return location + (lower_tail ? -scale : scale) / tanpi_1.tanpi(p);
    });
}
exports.qcauchy = qcauchy;


/***/ }),
/* 114 */
/***/ (function(module, exports, __nested_webpack_require_295285__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_295285__(1);
const _general_1 = __nested_webpack_require_295285__(0);
const { isNaN: ISNAN, isFinite: R_FINITE } = Number;
const { PI: M_PI } = Math;
const printer = debug('rcauchy');
function rcauchy(n, location = 0, scale = 1, rng) {
    const result = new Array(n).fill(0).map(() => {
        if (ISNAN(location) || !R_FINITE(scale) || scale < 0) {
            return _general_1.ML_ERR_return_NAN(printer);
        }
        if (scale === 0 || !R_FINITE(location))
            return location;
        else
            return location + scale * Math.tan(M_PI * rng.unif_rand());
    });
    return result.length === 1 ? result[0] : result;
}
exports.rcauchy = rcauchy;


/***/ }),
/* 115 */
/***/ (function(module, exports, __nested_webpack_require_296125__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_296125__(1);
const NumberW_1 = __nested_webpack_require_296125__(63);
const { trunc, log, abs, min, pow } = Math;
const printer_bratio = debug('Toms708.bratio');
class Toms708 {
    static alnrel(a) {
        const p3 = -0.178874546012214e-1;
        const p2 = 0.405303492862024;
        const p1 = -0.129418923021993e1;
        const q3 = -0.845104217945565e-1;
        const q2 = 0.747811014037616;
        const q1 = -0.162752256355323e1;
        let t = 0.0;
        let w = 0.0;
        let x = 0.0;
        let t2 = 0.0;
        if (Math.abs(a) > 0.375) {
            x = 1 + a;
            return log(x);
        }
        t = a / (a + 2.0);
        t2 = t * t;
        w =
            (((p3 * t2 + p2) * t2 + p1) * t2 + 1.0) /
                (((q3 * t2 + q2) * t2 + q1) * t2 + 1.0);
        return 2.0 * t * w;
    }
    static algdiv(a, b) {
        const c5 = -0.165322962780713e-2;
        const c4 = 0.837308034031215e-3;
        const c3 = -0.59520293135187e-3;
        const c2 = 0.79365066682539e-3;
        const c1 = -0.277777777760991e-2;
        const c0 = 0.833333333333333e-1;
        let s11 = 0.0;
        let c = 0.0;
        let d = 0.0;
        let h = 0.0;
        let t = 0.0;
        let u = 0.0;
        let v = 0.0;
        let w = 0.0;
        let x = 0.0;
        let s3 = 0.0;
        let s5 = 0.0;
        let s7 = 0.0;
        let x2 = 0.0;
        let s9 = 0.0;
        if (a <= b) {
            h = a / b;
            c = h / (1.0 + h);
            x = 1.0 / (1.0 + h);
            d = b + (a - 0.5);
        }
        else {
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
        w =
            ((((c5 * s11 * t + c4 * s9) * t + c3 * s7) * t + c2 * s5) * t + c1 * s3) *
                t +
                c0;
        w *= c / b;
        u = d * Toms708.alnrel(a / b);
        v = a * (log(b) - 1.0);
        if (u <= v)
            return w - u - v;
        return w - v - u;
    }
    static apser(a, b, x, eps) {
        const g = 0.577215664901533;
        let j = 0.0;
        let bx = 0.0;
        let c = 0.0;
        let s = 0.0;
        let t = 0.0;
        let tol = 0.0;
        let aj = 0.0;
        bx = b * x;
        t = x - bx;
        if (b * eps > 2e-2) {
            c = log(bx) + g + t;
        }
        else {
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
    static basym(a, b, lambda, eps) {
        let a0 = new Array(21).fill(0);
        let b0 = new Array(21).fill(0);
        let c = new Array(21).fill(0);
        let d = new Array(21).fill(0);
        let num = 20;
        const e0 = 1.12837916709551;
        const e1 = 0.353553390593274;
        let h;
        let r0;
        let r1;
        let w0;
        if (a <= b) {
            h = a / b;
            r0 = 1.0 / (1.0 + h);
            r1 = (b - a) / b;
            w0 = 1.0 / Math.sqrt(a * (1.0 + h));
        }
        else {
            h = b / a;
            r0 = 1.0 / (1.0 + h);
            r1 = (b - a) / a;
            w0 = 1.0 / Math.sqrt(b * (1.0 + h));
        }
        let f = a * Toms708.rlog1(-lambda / a) + b * Toms708.rlog1(lambda / b);
        let t = Math.exp(-f);
        if (t === 0.0)
            return 0;
        let z0 = Math.sqrt(f);
        let z = 0.5 * (z0 / e1);
        let z2 = f + f;
        a0[0] = 2.0 / 3.0 * r1;
        c[0] = -0.5 * a0[0];
        d[0] = -c[0];
        let j0 = 0.5 / e0 * Toms708.erfc1(1, z0);
        let j1 = e1;
        let sum = j0 + d[0] * w0 * j1;
        let s = 1.0;
        let h2 = h * h;
        let hn = 1.0;
        let w = w0;
        let znm1 = z;
        let zn = z2;
        for (let n = 2; n <= num; n += 2) {
            hn = h2 * hn;
            a0[n] = 2.0 * r0 * (1.0 + h * hn) / (n + 2.0);
            let np1 = n + 1;
            s = s + hn;
            a0[np1] = 2.0 * r1 * s / (n + 3.0);
            for (let i = n; i <= np1; i++) {
                let r = -0.5 * (i + 1.0);
                b0[1] = r * a0[1];
                for (let m = 2; m <= i; m++) {
                    let bsum = 0.0;
                    let mm1 = m - 1;
                    for (let j = 1; j <= mm1; j++) {
                        let mmj = m - j;
                        bsum = bsum + (j * r - mmj) * a0[j] * b0[mmj];
                    }
                    b0[m] = r * a0[m] + bsum / m;
                }
                c[i] = b0[i] / (i + 1.0);
                let dsum = 0.0;
                let im1 = i - 1;
                for (let j = 1; j <= im1; j++) {
                    let imj = i - j;
                    dsum = dsum + d[imj] * c[j];
                }
                d[i] = -(dsum + c[i]);
            }
            j0 = e1 * znm1 + (n - 1.0) * j0;
            j1 = e1 * zn + n * j1;
            znm1 = z2 * znm1;
            zn = z2 * zn;
            w = w0 * w;
            let t0 = d[n] * w * j0;
            w = w0 * w;
            let t1 = d[np1] * w * j1;
            sum = sum + (t0 + t1);
            if (Math.abs(t0) + Math.abs(t1) <= eps * sum)
                break;
        }
        let u = Math.exp(-Toms708.bcorr(a, b));
        return e0 * t * u * sum;
    }
    static bcorr(a0, b0) {
        const c5 = -0.165322962780713e-2;
        const c4 = 0.837308034031215e-3;
        const c3 = -0.59520293135187e-3;
        const c2 = 0.79365066682539e-3;
        const c1 = -0.277777777760991e-2;
        const c0 = 0.833333333333333e-1;
        let s11 = 0.0;
        let a = 0.0;
        let b = 0.0;
        let c = 0.0;
        let h = 0.0;
        let t = 0.0;
        let w = 0.0;
        let x = 0.0;
        let s3 = 0.0;
        let s5 = 0.0;
        let s7 = 0.0;
        let x2 = 0.0;
        let s9 = 0.0;
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
        w =
            ((((c5 * s11 * t + c4 * s9) * t + c3 * s7) * t + c2 * s5) * t + c1 * s3) *
                t +
                c0;
        w = w * (c / b);
        t = Math.pow(1.0 / a, 2);
        return (((((c5 * t + c4) * t + c3) * t + c2) * t + c1) * t + c0) / a + w;
    }
    static beta_cdf_values(nData, a, b, x, fx) {
        const nMax = 42;
        const aVec = [
            0.5,
            0.5,
            0.5,
            1.0,
            1.0,
            1.0,
            1.0,
            1.0,
            2.0,
            2.0,
            2.0,
            2.0,
            2.0,
            2.0,
            2.0,
            2.0,
            2.0,
            5.5,
            10.0,
            10.0,
            10.0,
            10.0,
            20.0,
            20.0,
            20.0,
            20.0,
            20.0,
            30.0,
            30.0,
            40.0,
            0.1e1,
            0.1e1,
            0.1e1,
            0.1e1,
            0.1e1,
            0.1e1,
            0.1e1,
            0.1e1,
            0.2e1,
            0.3e1,
            0.4e1,
            0.5e1
        ];
        const bVec = [
            0.5,
            0.5,
            0.5,
            0.5,
            0.5,
            0.5,
            0.5,
            1.0,
            2.0,
            2.0,
            2.0,
            2.0,
            2.0,
            2.0,
            2.0,
            2.0,
            2.0,
            5.0,
            0.5,
            5.0,
            5.0,
            10.0,
            5.0,
            10.0,
            10.0,
            20.0,
            20.0,
            10.0,
            10.0,
            20.0,
            0.5,
            0.5,
            0.5,
            0.5,
            0.2e1,
            0.3e1,
            0.4e1,
            0.5e1,
            0.2e1,
            0.2e1,
            0.2e1,
            0.2e1
        ];
        const fxVec = [
            0.6376856085851985e-1,
            0.2048327646991335,
            0.1e1,
            0.0,
            0.5012562893380045e-2,
            0.513167019494862e-1,
            0.2928932188134525,
            0.5,
            0.28e-1,
            0.104,
            0.216,
            0.352,
            0.5,
            0.648,
            0.784,
            0.896,
            0.972,
            0.4361908850559777,
            0.1516409096347099,
            0.8978271484375e-1,
            0.1e1,
            0.5,
            0.4598773297575791,
            0.2146816102371739,
            0.9507364826957875,
            0.5,
            0.8979413687105918,
            0.2241297491808366,
            0.7586405487192086,
            0.7001783247477069,
            0.513167019494862e-1,
            0.1055728090000841,
            0.1633399734659245,
            0.2254033307585166,
            0.36,
            0.488,
            0.5904,
            0.67232,
            0.216,
            0.837e-1,
            0.3078e-1,
            0.10935e-1
        ];
        const xVec = [
            0.01,
            0.1,
            1.0,
            0.0,
            0.01,
            0.1,
            0.5,
            0.5,
            0.1,
            0.2,
            0.3,
            0.4,
            0.5,
            0.6,
            0.7,
            0.8,
            0.9,
            0.5,
            0.9,
            0.5,
            1.0,
            0.5,
            0.8,
            0.6,
            0.8,
            0.5,
            0.6,
            0.7,
            0.8,
            0.7,
            0.1,
            0.2,
            0.3,
            0.4,
            0.2,
            0.2,
            0.2,
            0.2,
            0.3,
            0.3,
            0.3,
            0.3
        ];
        if (nData.val < 0)
            nData.val = 0;
        nData.val++;
        if (nData.val > nMax) {
            nData.val = 0;
            a.val = b.val = x.val = fx.val = 0.0;
        }
        else {
            a.val = aVec[nData.val - 1];
            b.val = bVec[nData.val - 1];
            x.val = xVec[nData.val - 1];
            fx.val = fxVec[nData.val - 1];
        }
    }
    static betaln(a0, b0) {
        const e = 0.918938533204673;
        let a = 0.0;
        let b = 0.0;
        let c = 0.0;
        let h = 0.0;
        let i = 0;
        let n = 0;
        let u = 0.0;
        let v = 0.0;
        let w = 0.0;
        let z = 0.0;
        a = Math.min(a0, b0);
        b = Math.max(a0, b0);
        if (a < 1) {
            if (b < 8.0)
                return Toms708.gamln(a) + Toms708.algdiv(a, b);
            else
                return Toms708.gamln(a) + Toms708.gamln(b) - Toms708.gamln(a + b);
        }
        else if (a >= 1 && a < 8) {
            if (a < 2 && b < 2) {
                return Toms708.gamln(a) + Toms708.gamln(b) - Toms708.gsumln(a, b);
            }
            else if (b > 2) {
                w = 0.0;
                if (b < 8.0) {
                    n = trunc(b - 1.0);
                    z = 1.0;
                    for (i = 1; i <= n; i++) {
                        b--;
                        z *= b / (a + b);
                    }
                    return (w +
                        log(z) +
                        (Toms708.gamln(a) + Toms708.gamln(b) - Toms708.gsumln(a, b)));
                }
                else
                    return Toms708.gamln(a) + Toms708.algdiv(a, b);
            }
            else if (a > 2) {
                if (b > 1000.0) {
                    n = trunc(a - 1.0);
                    w = 1.0;
                    for (i = 1; i <= n; i++) {
                        a--;
                        w = w * (a / (1.0 + a / b));
                    }
                    return (log(w) - n * log(b) + (Toms708.gamln(a) + Toms708.algdiv(a, b)));
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
                    return (w +
                        log(z) +
                        (Toms708.gamln(a) + Toms708.gamln(b) - Toms708.gsumln(a, b)));
                }
                else
                    return w + Toms708.gamln(a) + Toms708.algdiv(a, b);
            }
        }
        w = Toms708.bcorr(a, b);
        h = a / b;
        c = h / (1.0 + h);
        u = -((a - 0.5) * log(c));
        v = b * Toms708.alnrel(h);
        if (u > v)
            return -0.5 * log(b) + e + w - u - v;
        else
            return -0.5 * log(b) + e + w - v - u;
    }
    static bfrac(a, b, x, y, lambda, eps) {
        let n = 0.0;
        let yp1 = 0.0;
        let alpha = 0.0;
        let c = 0.0;
        let e = 0.0;
        let p = 0.0;
        let r = 0.0;
        let s = 0.0;
        let t = 0.0;
        let w = 0.0;
        let c0 = 0.0;
        let c1 = 0.0;
        let anp1 = 0.0;
        let bnp1 = 0.0;
        let r0 = 0.0;
        let beta = 0.0;
        let an = 0.0;
        let bn = 0.0;
        let dResult = Toms708.brcomp(a, b, x, y);
        if (dResult === 0.0)
            return 0;
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
            if (Math.abs(r - r0) <= eps * r)
                break;
            an = an / bnp1;
            bn = bn / bnp1;
            anp1 = r;
            bnp1 = 1.0;
        }
        dResult *= r;
        return dResult;
    }
    static bgrat(a, b, x, y, w, eps, ierr) {
        let j = 0.0;
        let l = 0.0;
        let lnx = 0.0;
        let nu = 0.0;
        let n2 = 0.0;
        let c = new Array(30);
        let d = new Array(30);
        let bm1 = 0.0;
        let nm1 = 0;
        let i = 0;
        let n = 0;
        let q = 0.0;
        let r = 0.0;
        let s = 0.0;
        let t = 0.0;
        let u = 0.0;
        let v = 0.0;
        let z = 0.0;
        let sum = 0.0;
        let bp2n = 0.0;
        let t2 = 0.0;
        let coef = 0.0;
        let dj = 0.0;
        let cn = 0.0;
        bm1 = b - 0.5 - 0.5;
        nu = a + 0.5 * bm1;
        if (y <= 0.375) {
            lnx = Toms708.alnrel(-y);
        }
        else {
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
            let p1 = new NumberW_1.NumberW(0);
            let q1 = new NumberW_1.NumberW(0);
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
        }
        else {
            ierr.val = 1;
            return;
        }
    }
    static brcomp(a, b, x, y) {
        const Const = 0.398942280401433;
        if (x === 0.0 || y === 0.0)
            return 0;
        let b0;
        let a0 = Math.min(a, b);
        let lnx;
        let lny;
        let c;
        if (a0 < 8.0) {
            if (x <= 0.375) {
                lnx = log(x);
                lny = Toms708.alnrel(-x);
            }
            else {
                if (y <= 0.375) {
                    lnx = Toms708.alnrel(-y);
                    lny = log(y);
                }
                else {
                    lnx = log(x);
                    lny = log(y);
                }
                let z = a * lnx + b * lny;
                if (a0 >= 1.0) {
                    z -= Toms708.betaln(a, b);
                    return Math.exp(z);
                }
                b0 = Math.max(a, b);
                if (b0 < 8.0) {
                    if (b0 <= 1.0) {
                        let dResult = Math.exp(z);
                        if (dResult === 0.0)
                            return 0;
                        let apb = a + b;
                        if (apb <= 1.0) {
                            z = 1.0 + Toms708.gam1(apb);
                        }
                        else {
                            let u = a + b - 1.0;
                            z = (1.0 + Toms708.gam1(u)) / apb;
                        }
                        c = (1.0 + Toms708.gam1(a)) * (1.0 + Toms708.gam1(b)) / z;
                        dResult *= a0 * c / (1.0 + a0 / b0);
                        return dResult;
                    }
                }
                else {
                    let u = Toms708.gamln1(a0);
                    let n = b0 - 1.0;
                    if (n >= 1) {
                        c = 1.0;
                        for (let i = 1; i <= n; i++) {
                            b0--;
                            c *= b0 / (a0 + b0);
                        }
                        u = log(c) + u;
                    }
                    z -= u;
                    b0--;
                    let apb = a0 + b0;
                    let t;
                    if (apb <= 1.0) {
                        t = 1.0 + Toms708.gam1(apb);
                    }
                    else {
                        u = a0 + b0 - 1.0;
                        t = (1.0 + Toms708.gam1(u)) / apb;
                    }
                    return a0 * Math.exp(z) * (1.0 + Toms708.gam1(b0)) / t;
                }
                let u = Toms708.gamln1(a0) + Toms708.algdiv(a0, b0);
                return a0 * Math.exp(z - u);
            }
        }
        let x0;
        let y0;
        let lambda;
        let e;
        let h;
        let u;
        let v;
        if (a <= b) {
            h = a / b;
            x0 = h / (1.0 + h);
            y0 = 1.0 / (1.0 + h);
            lambda = a - (a + b) * x;
        }
        else {
            h = b / a;
            x0 = 1.0 / (1.0 + h);
            y0 = h / (1.0 + h);
            lambda = (a + b) * y - b;
        }
        e = -lambda / a;
        if (Math.abs(e) <= 0.6) {
            u = Toms708.rlog1(e);
        }
        else {
            u = e - log(x / x0);
        }
        e = lambda / b;
        if (Math.abs(e) > 0.6) {
            v = Toms708.rlog1(e);
        }
        else {
            v = e - log(y / y0);
        }
        let z = Math.exp(-(a * u + b * v));
        return Const * Math.sqrt(b * x0) * z * Math.exp(-Toms708.bcorr(a, b));
    }
    static brcmp1(mu, a, b, x, y) {
        const invSqrtPi = 0.398942280401433;
        let c;
        let u;
        let apb;
        let a0 = Math.min(a, b);
        if (a0 < 8.0) {
            let lnx;
            let lny;
            if (x <= 0.375) {
                lnx = log(x);
                lny = Toms708.alnrel(-x);
            }
            else {
                if (y <= 0.375) {
                    lnx = Toms708.alnrel(-y);
                    lny = log(y);
                }
                else {
                    lnx = log(x);
                    lny = log(y);
                }
            }
            let z = a * lnx + b * lny;
            if (a0 >= 1.0) {
                z -= Toms708.betaln(a, b);
                return Toms708.esum(mu, z);
            }
            let b0 = Math.max(a, b);
            if (b0 >= 8.0) {
                u = Toms708.gamln1(a0) + Toms708.algdiv(a0, b0);
                return a0 * Toms708.esum(mu, z - u);
            }
            if (b0 <= 1.0) {
                let dResult = Toms708.esum(mu, z);
                if (dResult === 0.0)
                    return 0;
                apb = a + b;
                if (apb <= 1.0) {
                    z = 1.0 + Toms708.gam1(apb);
                }
                else {
                    u = a + b - 1.0;
                    z = (1.0 + Toms708.gam1(u)) / apb;
                }
                c = (1.0 + Toms708.gam1(a)) * (1.0 + Toms708.gam1(b)) / z;
                dResult *= a0 * c / (1.0 + a0 / b0);
                return dResult;
            }
            u = Toms708.gamln1(a0);
            let n = trunc(b0 - 1.0);
            if (n >= 1) {
                c = 1.0;
                for (let i = 1; i <= n; i++) {
                    b0 -= 1.0;
                    c = c * (b0 / (a0 + b0));
                }
                u = log(c) + u;
            }
            z -= u;
            b0 -= 1.0;
            apb = a0 + b0;
            let t;
            if (apb <= 1.0) {
                t = 1.0 + Toms708.gam1(apb);
            }
            else {
                u = a0 + b0 - 1.0;
                t = (1.0 + Toms708.gam1(u)) / apb;
            }
            return a0 * Toms708.esum(mu, z) * (1.0 + Toms708.gam1(b0)) / t;
        }
        let h;
        let x0;
        let y0;
        let lambda;
        if (a <= b) {
            h = a / b;
            x0 = h / (1.0 + h);
            y0 = 1.0 / (1.0 + h);
            lambda = a - (a + b) * x;
        }
        else {
            h = b / a;
            x0 = 1.0 / (1.0 + h);
            y0 = h / (1.0 + h);
            lambda = (a + b) * y - b;
        }
        let e = -lambda / a;
        if (Math.abs(e) <= 0.6) {
            u = Toms708.rlog1(e);
        }
        else {
            u = e - log(x / x0);
        }
        e = lambda / b;
        let v;
        if (Math.abs(e) <= 0.6) {
            v = Toms708.rlog1(e);
        }
        else {
            v = e - log(y / y0);
        }
        let z = Toms708.esum(mu, -(a * u + b * v));
        return invSqrtPi * Math.sqrt(b * x0) * z * Math.exp(-Toms708.bcorr(a, b));
    }
    static bpser(a, b, x, eps) {
        let n = 0.0;
        let apb = 0.0;
        let c = 0.0;
        let i = 0;
        let m = 0;
        let t = 0.0;
        let u = 0.0;
        let w = 0.0;
        let z = 0.0;
        let tol = 0.0;
        let sum = 0.0;
        let a0 = 0.0;
        let b0 = 0.0;
        let dResult = 0;
        if (x === 0.0) {
            return 0;
        }
        a0 = Math.min(a, b);
        if (a0 >= 1.0) {
            z = a * log(x) - Toms708.betaln(a, b);
            dResult = Math.exp(z) / a;
        }
        else {
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
                    }
                    else {
                        u = a + b - 1.0;
                        z = (1.0 + Toms708.gam1(u)) / apb;
                    }
                    c = (1.0 + Toms708.gam1(a)) * (1.0 + Toms708.gam1(b)) / z;
                    dResult *= c * (b / apb);
                }
                else {
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
                    }
                    else {
                        u = a0 + b0 - 1.0;
                        t = (1.0 + Toms708.gam1(u)) / apb;
                    }
                    dResult = Math.exp(z) * (a0 / a) * (1.0 + Toms708.gam1(b0)) / t;
                }
            }
            else {
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
    static bratio(a, b, x, y, w, w1, ierr) {
        let lambda = 0.0;
        let ind = 0;
        let n = 0;
        let t = 0.0;
        let eps = 0.0;
        let z = 0.0;
        let a0 = 0.0;
        let b0 = 0.0;
        let x0 = 0.0;
        let y0 = 0.0;
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
            }
            else {
                w.val = 0.0;
                w1.val = 1.0;
                return;
            }
        }
        if (y === 0.0) {
            if (b === 0.0) {
                ierr.val = 7;
                return;
            }
            else {
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
                }
                else {
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
                }
                else {
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
                    }
                    else {
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
                    }
                    else {
                        t = w.val;
                        w.val = w1.val;
                        w1.val = t;
                        return;
                    }
                }
                n = 20;
                w1.val = Toms708.bup(b0, a0, y0, x0, n, eps);
                b0 += n;
                let ierr1 = new NumberW_1.NumberW(0);
                Toms708.bgrat(b0, a0, y0, x0, w1, 15.0 * eps, ierr1);
                w.val = 0.5 + (0.5 - w1.val);
                if (ind === 0) {
                    return;
                }
                else {
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
                }
                else {
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
                }
                else {
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
                    }
                    else {
                        t = w.val;
                        w.val = w1.val;
                        w1.val = t;
                        return;
                    }
                }
            }
            if (b0 > 15.0) {
                let ierr1 = new NumberW_1.NumberW(0);
                Toms708.bgrat(b0, a0, y0, x0, w1, 15.0 * eps, ierr1);
                w.val = 0.5 + (0.5 - w1.val);
                if (ind === 0) {
                    return;
                }
                else {
                    t = w.val;
                    w.val = w1.val;
                    w1.val = t;
                    return;
                }
            }
            n = 20;
            w1.val = Toms708.bup(b0, a0, y0, x0, n, eps);
            b0 += n;
            let ierr1 = new NumberW_1.NumberW(0);
            Toms708.bgrat(b0, a0, y0, x0, w1, 15.0 * eps, ierr1);
            w.val = 0.5 + (0.5 - w1.val);
            if (ind === 0) {
                return;
            }
            else {
                t = w.val;
                w.val = w1.val;
                w1.val = t;
                return;
            }
        }
        if (a <= b) {
            lambda = a - (a + b) * x;
        }
        else {
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
            }
            else {
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
                }
                else {
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
            let ierr1 = new NumberW_1.NumberW(0);
            Toms708.bgrat(a0, b0, x0, y0, w, 15.0 * eps, ierr1);
            w1.val = 0.5 + (0.5 - w.val);
            if (ind === 0) {
                return;
            }
            else {
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
                }
                else {
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
                }
                else {
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
            }
            else {
                t = w.val;
                w.val = w1.val;
                w1.val = t;
                return;
            }
        }
        else {
            if (b0 <= 100.0 || lambda > 0.03 * b0) {
                w.val = Toms708.bfrac(a0, b0, x0, y0, lambda, 15.0 * eps);
                w1.val = 0.5 + (0.5 - w.val);
                if (ind === 0) {
                    return;
                }
                else {
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
            }
            else {
                t = w.val;
                w.val = w1.val;
                w1.val = t;
                return;
            }
        }
    }
    static bup(a, b, x, y, n, eps) {
        let dResult;
        let mu = 0;
        let d = 1.0;
        let t = 0;
        let r = 0;
        let w = 0;
        let k;
        let l;
        let apb = a + b;
        let ap1 = a + 1.0;
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
        let nm1 = n - 1;
        w = d;
        k = 0;
        if (b <= 1.0) {
            let kp1 = k + 1;
            for (let i = kp1; i <= nm1; i++) {
                l = i - 1;
                d = (apb + l) / (ap1 + l) * x * d;
                w += d;
                if (d <= eps * w)
                    break;
            }
            return dResult * w;
        }
        if (y > 1.0e-4) {
            r = (b - 1.0) * x / y - a;
            if (r < 1.0) {
                let kp1 = k + 1;
                for (let i = kp1; i <= nm1; i++) {
                    l = i - 1;
                    d = (apb + l) / (ap1 + l) * x * d;
                    w += d;
                    if (d <= eps * w)
                        break;
                }
                return dResult * w;
            }
            k = nm1;
            t = nm1;
            if (r < t) {
                k = trunc(r);
            }
        }
        else {
            k = nm1;
        }
        for (let i = 1; i <= k; i++) {
            l = i - 1;
            d = (apb + l) / (ap1 + l) * x * d;
            w += d;
        }
        if (k === nm1) {
            return dResult * w;
        }
        let kp1 = k + 1;
        for (let i = kp1; i <= nm1; i++) {
            l = i - 1;
            d = (apb + l) / (ap1 + l) * x * d;
            w += d;
            if (d <= eps * w)
                break;
        }
        return dResult * w;
    }
    static erf(x) {
        const c = 0.564189583547756;
        const a = [
            0.77105849500132e-4,
            -0.133733772997339e-2,
            0.323076579225834e-1,
            0.479137145607681e-1,
            0.128379167095513
        ];
        const b = [0.301048631703895e-2, 0.538971687740286e-1, 0.375795757275549];
        const p = [
            -1.36864857382717e-7,
            5.64195517478974e-1,
            7.21175825088309,
            4.31622272220567e1,
            1.5298928504694e2,
            3.39320816734344e2,
            4.51918953711873e2,
            3.00459261020162e2
        ];
        const q = [
            1.0,
            1.27827273196294e1,
            7.70001529352295e1,
            2.77585444743988e2,
            6.38980264465631e2,
            9.3135409485061e2,
            7.90950925327898e2,
            3.00459260956983e2
        ];
        const r = [
            2.10144126479064,
            2.62370141675169e1,
            2.13688200555087e1,
            4.6580782871847,
            2.82094791773523e-1
        ];
        const s = [
            9.4153775055546e1,
            1.8711481179959e2,
            9.90191814623914e1,
            1.80124575948747e1
        ];
        let ax = 0.0;
        let bot = 0.0;
        let t = 0.0;
        let top = 0.0;
        let x2 = 0.0;
        ax = Math.abs(x);
        if (ax <= 0.5) {
            t = x * x;
            top = (((a[0] * t + a[1]) * t + a[2]) * t + a[3]) * t + a[4] + 1.0;
            bot = ((b[0] * t + b[1]) * t + b[2]) * t + 1.0;
            return x * (top / bot);
        }
        else {
            if (ax <= 4.0) {
                top =
                    ((((((p[0] * ax + p[1]) * ax + p[2]) * ax + p[3]) * ax + p[4]) * ax +
                        p[5]) *
                        ax +
                        p[6]) *
                        ax +
                        p[7];
                bot =
                    ((((((q[0] * ax + q[1]) * ax + q[2]) * ax + q[3]) * ax + q[4]) * ax +
                        q[5]) *
                        ax +
                        q[6]) *
                        ax +
                        q[7];
                return x < 0
                    ? -(0.5 + (0.5 - Math.exp(-x * x) * top / bot))
                    : 0.5 + (0.5 - Math.exp(-x * x) * top / bot);
            }
            else {
                if (ax < 5.8) {
                    x2 = x * x;
                    t = 1.0 / x2;
                    top = (((r[0] * t + r[1]) * t + r[2]) * t + r[3]) * t + r[4];
                    bot = (((s[0] * t + s[2]) * t + s[3]) * t + s[3]) * t + 1.0;
                    let dResult = (c - top / (x2 * bot)) / ax;
                    dResult = 0.5 + (0.5 - Math.exp(-x2) * dResult);
                    return x < 0 ? -dResult : dResult;
                }
                else {
                    return Toms708.sign(1.0, x);
                }
            }
        }
    }
    static erfc1(ind, x) {
        const c = 0.564189583547756;
        const a = [
            0.77105849500132e-4,
            -0.133733772997339e-2,
            0.323076579225834e-1,
            0.479137145607681e-1,
            0.128379167095513
        ];
        const b = [0.301048631703895e-2, 0.538971687740286e-1, 0.375795757275549];
        const p = [
            -1.36864857382717e-7,
            5.64195517478974e-1,
            7.21175825088309,
            4.31622272220567e1,
            1.5298928504694e2,
            3.39320816734344e2,
            4.51918953711873e2,
            3.00459261020162e2
        ];
        const q = [
            1.0,
            1.27827273196294e1,
            7.70001529352295e1,
            2.77585444743988e2,
            6.38980264465631e2,
            9.3135409485061e2,
            7.90950925327898e2,
            3.00459260956983e2
        ];
        const r = [
            2.10144126479064,
            2.62370141675169e1,
            2.13688200555087e1,
            4.6580782871847,
            2.82094791773523e-1
        ];
        const s = [
            9.4153775055546e1,
            1.8711481179959e2,
            9.90191814623914e1,
            1.80124575948747e1
        ];
        let dResult = 0.0;
        let w = 0.0;
        let ax = 0.0;
        let e = 0.0;
        let bot = 0.0;
        let t = 0.0;
        let top = 0.0;
        ax = Math.abs(x);
        if (ax < 0.5) {
            t = x * x;
            top = (((a[0] * t + a[1]) * t + a[2]) * t + a[3]) * t + a[4] + 1.0;
            bot = ((b[0] * t + b[1]) * t + b[2]) * t + 1.0;
            dResult = 0.5 + (0.5 - x * (top / bot));
            if (ind !== 0)
                dResult *= Math.exp(t);
            return dResult;
        }
        else if (ax <= 4 && ax >= 0.5) {
            top =
                ((((((p[0] * ax + p[1]) * ax + p[2]) * ax + p[3]) * ax + p[4]) * ax +
                    p[5]) *
                    ax +
                    p[6]) *
                    ax +
                    p[7];
            bot =
                ((((((q[0] * ax + q[1]) * ax + q[2]) * ax + q[3]) * ax + q[4]) * ax +
                    q[5]) *
                    ax +
                    q[6]) *
                    ax +
                    q[7];
            dResult = top / bot;
        }
        else {
            if (x <= -5.6) {
                if (ind !== 0)
                    return 2.0 * Math.exp(x * x);
                else
                    return 2.0;
            }
            if (ind !== 0) {
                t = Math.pow(1.0 / x, 2);
                top = (((r[0] * t + r[1]) * t + r[2]) * t + r[3]) * t + r[4];
                bot = (((s[0] * t + s[2]) * t + s[3]) * t + s[3]) * t + 1.0;
                dResult = (c - t * top / bot) / ax;
            }
            else {
                if (x > 100.0 || x * x > -Toms708.exparg(1)) {
                    return 0;
                }
            }
        }
        if (ind !== 0) {
            if (x < 0.0)
                dResult = 2.0 * Math.exp(x * x) - dResult;
            return dResult;
        }
        w = x * x;
        t = w;
        e = w - t;
        dResult *= (0.5 + (0.5 - e)) * Math.exp(-t);
        if (x < 0.0)
            dResult = 2.0 - dResult;
        return dResult;
    }
    static esum(mu, x) {
        let w = 0.0;
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
    static erf_values(nData, x, fx) {
        const nmax = 21;
        const bvec = [
            0.0,
            0.112462916,
            0.2227025892,
            0.3286267595,
            0.428392355,
            0.5204998778,
            0.6038560908,
            0.6778011938,
            0.7421009647,
            0.7969082124,
            0.8427007929,
            0.8802050696,
            0.9103139782,
            0.9340079449,
            0.9522851198,
            0.9661051465,
            0.9763483833,
            0.9837904586,
            0.9890905016,
            0.9927904292,
            0.995322265
        ];
        let xvec = [
            0.0,
            0.1,
            0.2,
            0.3,
            0.4,
            0.5,
            0.6,
            0.7,
            0.8,
            0.9,
            1.0,
            1.1,
            1.2,
            1.3,
            1.4,
            1.5,
            1.6,
            1.7,
            1.8,
            1.9,
            2.0
        ];
        if (nData.val < 0)
            nData.val = 0;
        nData.val++;
        if (nmax < nData.val) {
            nData.val = 0;
            x.val = 0.0;
            fx.val = 0.0;
        }
        else {
            x.val = xvec[nData.val - 1];
            fx.val = bvec[nData.val - 1];
        }
    }
    static exparg(l) {
        let lnb = 0.0;
        let m = 0;
        let b = Toms708.ipmpar(4);
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
        }
        else {
            m = Toms708.ipmpar(7);
            return 0.99999 * m * lnb;
        }
    }
    static fpser(a, b, x, eps) {
        let c = 0.0;
        let s = 0.0;
        let t = 0.0;
        let tol = 0.0;
        let an = 0.0;
        let dResult = 1.0;
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
    static gam1(a) {
        const p = [
            0.577215664901533,
            -0.409078193005776,
            -0.230975380857675,
            0.597275330452234e-1,
            0.76696818164949e-2,
            -0.514889771323592e-2,
            0.589597428611429e-3
        ];
        const q = [
            0.1e1,
            0.427569613095214,
            0.158451672430138,
            0.261132021441447e-1,
            0.423244297896961e-2
        ];
        const r = [
            -0.422784335098468,
            -0.771330383816272,
            -0.244757765222226,
            0.118378989872749,
            0.930357293360349e-3,
            -0.118290993445146e-1,
            0.223047661158249e-2,
            0.266505979058923e-3,
            -0.132674909766242e-3
        ];
        const s2 = 0.559398236957378e-1;
        const s1 = 0.273076135303957;
        let d = 0.0;
        let bot = 0.0;
        let t = 0.0;
        let w = 0.0;
        let top = 0.0;
        t = a;
        d = a - 0.5;
        if (d > 0.0) {
            t = d - 0.5;
        }
        if (t === 0) {
            return 0;
        }
        else if (t > 0) {
            top =
                (((((p[6] * t + p[5]) * t + p[4]) * t + p[3]) * t + p[2]) * t + p[1]) *
                    t +
                    p[0];
            bot = (((q[4] * t + q[3]) * t + q[2]) * t + q[1]) * t + 1.0;
            w = top / bot;
            if (d <= 0.0) {
                return a * w;
            }
            else {
                return t / a * (w - 0.5 - 0.5);
            }
        }
        else {
            top =
                (((((((r[8] * t + r[7]) * t + r[6]) * t + r[5]) * t + r[4]) * t +
                    r[3]) *
                    t +
                    r[2]) *
                    t +
                    r[1]) *
                    t +
                    r[0];
            bot = (s2 * t + s1) * t + 1.0;
            w = top / bot;
            if (d <= 0.0) {
                return a * (w + 0.5 + 0.5);
            }
            else {
                return t * w / a;
            }
        }
    }
    static grat1(a, x, r, p, q, eps) {
        let j = 0.0;
        let l = 0.0;
        let am0 = 0.0;
        let an0 = 0.0;
        let a2n = 0.0;
        let b2n = 0.0;
        let cma = 0.0;
        let c = 0.0;
        let g = 0.0;
        let h = 0.0;
        let t = 0.0;
        let w = 0.0;
        let z = 0.0;
        let tol = 0.0;
        let sum = 0.0;
        let a2nm1 = 0.0;
        let b2nm1 = 0.0;
        let an = 0.0;
        if (a * x === 0.0) {
            if (x <= a) {
                p.val = 0.0;
                q.val = 1.0;
                return;
            }
            else {
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
            }
            else {
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
                }
                else {
                    w = Math.exp(z);
                    p.val = w * g * (0.5 + (0.5 - j));
                    q.val = 0.5 + (0.5 - p.val);
                    return;
                }
            }
            else {
                w = Math.exp(z);
                p.val = w * g * (0.5 + (0.5 - j));
                q.val = 0.5 + (0.5 - p.val);
                return;
            }
        }
        else {
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
    static ipmpar(i) {
        const imach = [2, 31, 2147483647, 2, 24, -125, 128, 53, -1021, 1024];
        return imach[i - 1];
    }
    static gamma_inc_values(nData, a, x, fx) {
        let nMax = 20;
        const aVec = [
            0.1,
            0.1,
            0.1,
            0.5,
            0.5,
            0.5,
            0.1e1,
            0.1e1,
            0.1e1,
            0.11e1,
            0.11e1,
            0.11e1,
            0.2e1,
            0.2e1,
            0.2e1,
            0.6e1,
            0.6e1,
            0.11e2,
            0.26e2,
            0.41e2
        ];
        const fxVec = [
            0.7382350532339351,
            0.9083579897300343,
            0.9886559833621947,
            0.3014646416966613,
            0.7793286380801532,
            0.9918490284064973,
            0.9516258196404043e-1,
            0.6321205588285577,
            0.9932620530009145,
            0.7205974576054322e-1,
            0.5891809618706485,
            0.9915368159845525,
            0.01018582711118352,
            0.4421745996289254,
            0.9927049442755639,
            0.4202103819530612e-1,
            0.9796589705830716,
            0.9226039842296429,
            0.4470785799755852,
            0.7444549220718699
        ];
        const xVec = [
            0.3e-1,
            0.3,
            0.15e1,
            0.75e-1,
            0.75,
            0.35e1,
            0.1,
            0.1e1,
            0.5e1,
            0.1,
            0.1e1,
            0.5e1,
            0.15,
            0.15e1,
            0.7e1,
            0.25e1,
            0.12e2,
            0.16e2,
            0.25e2,
            0.45e2
        ];
        if (nData.val < 0)
            nData.val = 0;
        nData.val++;
        if (nMax < nData.val) {
            nData.val = 0;
            a.val = 0.0;
            x.val = 0.0;
            fx.val = 0.0;
        }
        else {
            a.val = aVec[nData.val - 1];
            x.val = xVec[nData.val - 1];
            fx.val = fxVec[nData.val - 1];
        }
    }
    static gamma_log_values(nData, x, fx) {
        const nmax = 18;
        const bvec = [
            1.524064183,
            0.7966780066,
            0.3982337117,
            0.1520599127,
            0.0,
            -0.04987246543,
            -0.08537410945,
            -0.1081747934,
            -0.119612895,
            -0.120782204,
            -0.1125917658,
            -0.09580771625,
            -0.07108385116,
            -0.0389842838,
            0.0,
            12.80182743,
            39.33988571,
            71.25704193
        ];
        const xvec = [
            0.2,
            0.4,
            0.6,
            0.8,
            1.0,
            1.1,
            1.2,
            1.3,
            1.4,
            1.5,
            1.6,
            1.7,
            1.8,
            1.9,
            2.0,
            10.0,
            20.0,
            30.0
        ];
        if (nData.val < 0)
            nData.val = 0;
        nData.val++;
        if (nmax < nData.val) {
            nData.val = 0;
            x.val = 0.0;
            fx.val = 0.0;
        }
        else {
            x.val = xvec[nData.val - 1];
            fx.val = bvec[nData.val - 1];
        }
    }
    static gamln(a) {
        const d = 0.418938533204673;
        const c5 = -0.165322962780713e-2;
        const c4 = 0.837308034031215e-3;
        const c3 = -0.59520293135187e-3;
        const c2 = 0.79365066682539e-3;
        const c1 = -0.277777777760991e-2;
        const c0 = 0.833333333333333e-1;
        let i = 0;
        let n = 0;
        let t = 0.0;
        let w = 0.0;
        if (a <= 0.8)
            return Toms708.gamln1(a) - log(a);
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
    static gamln1(a) {
        const p6 = -0.271935708322958e-2;
        const p5 = -0.673562214325671e-1;
        const p4 = -0.402055799310489;
        const p3 = -0.780427615533591;
        const p2 = -0.168860593646662;
        const p1 = 0.844203922187225;
        const p0 = 0.577215664901533;
        const q6 = 0.667465618796164e-3;
        const q5 = 0.325038868253937e-1;
        const q4 = 0.361951990101499;
        const q3 = 0.156875193295039e1;
        const q2 = 0.312755088914843e1;
        const q1 = 0.288743195473681e1;
        const r5 = 0.497958207639485e-3;
        const r4 = 0.17050248402265e-1;
        const r3 = 0.156513060486551;
        const r2 = 0.565221050691933;
        const r1 = 0.848044614534529;
        const r0 = 0.422784335098467;
        const s5 = 0.116165475989616e-3;
        const s4 = 0.713309612391e-2;
        const s3 = 0.10155218743983;
        const s2 = 0.548042109832463;
        const s1 = 0.124313399877507e1;
        let w = 0.0;
        let x = 0.0;
        if (a < 0.6) {
            w =
                ((((((p6 * a + p5) * a + p4) * a + p3) * a + p2) * a + p1) * a + p0) /
                    ((((((q6 * a + q5) * a + q4) * a + q3) * a + q2) * a + q1) * a + 1.0);
            return -a * w;
        }
        x = a - 0.5 - 0.5;
        w =
            (((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x + r0) /
                (((((s5 * x + s4) * x + s3) * x + s2) * x + s1) * x + 1.0);
        return x * w;
    }
    static gsumln(a, b) {
        let x = a + b - 2;
        if (x <= 0.25)
            return Toms708.gamln1(1.0 + x);
        if (x <= 1.25)
            return Toms708.gamln1(x) + Toms708.alnrel(x);
        return Toms708.gamln1(x - 1.0) + log(x * (1.0 + x));
    }
    static psi(xx) {
        const piov4 = 0.785398163397448;
        const dx0 = 1.461632144968362341262659542325721325;
        const p1 = [
            0.89538502298197e-2,
            0.477762828042627e1,
            0.142441585084029e3,
            0.118645200713425e4,
            0.363351846806499e4,
            0.413810161269013e4,
            0.130560269827897e4
        ];
        const q1 = [
            0.448452573429826e2,
            0.520752771467162e3,
            0.22100079924783e4,
            0.364127349079381e4,
            0.1908310765963e4,
            0.691091682714533e-5
        ];
        const p2 = [
            -0.212940445131011e1,
            -0.701677227766759e1,
            -0.448616543918019e1,
            -0.648157123766197
        ];
        const q2 = [
            0.322703493791143e2,
            0.892920700481861e2,
            0.546117738103215e2,
            0.777788548522962e1
        ];
        let nq = 0;
        let xsmall = 0.0;
        let xmax1 = 0.0;
        let den = 0.0;
        let i = 0;
        let aug = 0.0;
        let m = 0;
        let n = 0;
        let sgn = 0.0;
        let w = 0.0;
        let x = 0.0;
        let z = 0.0;
        let upper = 0.0;
        let xmx0 = 0.0;
        xmax1 = Toms708.ipmpar(3);
        xmax1 = Math.min(xmax1, 1.0 / Toms708.spmpar(1));
        xsmall = 1e-9;
        x = xx;
        aug = 0.0;
        if (x < 0.5) {
            if (Math.abs(x) <= xsmall) {
                if (x === 0.0)
                    return 0;
                aug = -1 / x;
            }
            else {
                w = -x;
                sgn = piov4;
                if (w <= 0.0) {
                    w = -w;
                    sgn = -sgn;
                }
                if (w >= xmax1)
                    return 0;
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
                    if (z === 0.0)
                        return 0;
                    aug = sgn * (Math.cos(z) / Math.sin(z) * 4.0);
                }
                else {
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
    static psi_values(n, x, fx) {
        const nmax = 11;
        const fxvec = [
            -0.5772156649,
            -0.4237549404,
            -0.2890398966,
            -0.1691908889,
            -0.0613845446,
            -0.036489974,
            0.1260474528,
            0.2085478749,
            0.2849914333,
            0.3561841612,
            0.4227843351
        ];
        const xvec = [1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0];
        if (n.val < 0)
            n.val = 0;
        n.val++;
        if (nmax < n.val) {
            n.val = 0;
            x.val = 0.0;
            fx.val = 0.0;
        }
        else {
            x.val = xvec[n.val - 1];
            fx.val = fxvec[n.val - 1];
        }
    }
    static r4_epsilon() {
        let r = 1.0;
        let rTest = 1.0 + r / 2.0;
        while (1.0 < rTest) {
            r = r / 2.0;
            rTest = 1.0 + r / 2.0;
        }
        return r;
    }
    static rexp(x) {
        const q4 = 0.595130811860248e-3;
        const q3 = -0.119041179760821e-1;
        const q2 = 0.107141568980644;
        const q1 = -0.499999999085958;
        const p2 = 0.238082361044469e-1;
        const p1 = 0.914041914819518e-9;
        let w = 0.0;
        if (Math.abs(x) <= 0.15) {
            return (x *
                (((p2 * x + p1) * x + 1.0) / (((q4 * x + q3) * x + q2) * x + q1) * x +
                    1.0));
        }
        else {
            w = Math.exp(x);
            if (x <= 0.0) {
                return w - 0.5 - 0.5;
            }
            else {
                return w * (0.5 + (0.5 - 1.0 / w));
            }
        }
    }
    static rlog1(x) {
        const a = 0.566749439387324e-1;
        const b = 0.456512608815524e-1;
        const p2 = 0.620886815375787e-2;
        const p1 = -0.224696413112536;
        const p0 = 0.333333333333333;
        const q2 = 0.354508718369557;
        const q1 = -0.127408923933623e1;
        let h = 0.0;
        let r = 0.0;
        let t = 0.0;
        let w = 0.0;
        let w1 = 0.0;
        if (x < -0.39 || x > 0.57) {
            w = x + 0.5 + 0.5;
            return x - log(w);
        }
        if (x < -0.18) {
            h = x + 0.3;
            h = h / 0.7;
            w1 = a - h * 0.3;
        }
        else if (x > 0.18) {
            h = 0.75 * x - 0.25;
            w1 = b + h / 3.0;
        }
        else {
            h = x;
            w1 = 0.0;
        }
        r = h / (h + 2.0);
        t = r * r;
        w = ((p2 * t + p1) * t + p0) / ((q2 * t + q1) * t + 1.0);
        return 2.0 * t * (1.0 / (1.0 - r) - r * w) + w1;
    }
    static sign(a1, a2) {
        return a2 >= 0 ? Math.abs(a1) : -Math.abs(a1);
    }
    static spmpar(i) {
        let emin = 0;
        let emax = 0;
        let binv = 0.0;
        let bm1 = 0.0;
        let ibeta = 0;
        let b = 0.0;
        let m = 0;
        let one = 0.0;
        let w = 0.0;
        let z = 0.0;
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
            }
            else {
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
}
exports.Toms708 = Toms708;


/***/ }),
/* 116 */
/***/ (function(module, exports, __nested_webpack_require_363614__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _general_1 = __nested_webpack_require_363614__(0);
const debug = __nested_webpack_require_363614__(1);
const r_func_1 = __nested_webpack_require_363614__(2);
const { log, exp } = Math;
const { isNaN: ISNAN } = Number;
const printer = debug('dexp');
function dexp(x, scale, give_log = false) {
    return r_func_1.map(x)(fx => {
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


/***/ }),
/* 117 */
/***/ (function(module, exports, __nested_webpack_require_364424__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _general_1 = __nested_webpack_require_364424__(0);
const r_func_1 = __nested_webpack_require_364424__(2);
const debug = __nested_webpack_require_364424__(1);
const expm1_1 = __nested_webpack_require_364424__(3);
const { expm1 } = Math;
const { isNaN: ISNAN } = Number;
const printer = debug('pexp');
function pexp(q, scale, lower_tail, log_p) {
    return r_func_1.map(q)(fx => {
        if (ISNAN(fx) || ISNAN(scale))
            return fx + scale;
        if (scale < 0) {
            return _general_1.ML_ERR_return_NAN(printer);
        }
        if (fx <= 0)
            return _general_1.R_DT_0(lower_tail, log_p);
        fx = -(fx / scale);
        return lower_tail
            ? log_p ? expm1_1.R_Log1_Exp(fx) : -expm1(fx)
            : _general_1.R_D_exp(log_p, fx);
    });
}
exports.pexp = pexp;


/***/ }),
/* 118 */
/***/ (function(module, exports, __nested_webpack_require_365340__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_365340__(1);
const _general_1 = __nested_webpack_require_365340__(0);
const r_func_1 = __nested_webpack_require_365340__(2);
const expm1_1 = __nested_webpack_require_365340__(3);
const { isNaN: ISNAN } = Number;
const printer = debug('qexp');
function qexp(_p, scale, lower_tail, log_p) {
    return r_func_1.map(_p)(p => {
        if (ISNAN(p) || ISNAN(scale))
            return p + scale;
        if (scale < 0)
            return _general_1.ML_ERR_return_NAN(printer);
        let rc = _general_1.R_Q_P01_check(log_p, p);
        if (rc !== undefined) {
            return rc;
        }
        if (p === _general_1.R_DT_0(lower_tail, log_p))
            return 0;
        return -scale * expm1_1.R_DT_Clog(lower_tail, log_p, p);
    });
}
exports.qexp = qexp;


/***/ }),
/* 119 */
/***/ (function(module, exports, __nested_webpack_require_366245__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _general_1 = __nested_webpack_require_366245__(0);
const debug = __nested_webpack_require_366245__(1);
const sexp_1 = __nested_webpack_require_366245__(28);
const { isFinite: R_FINITE } = Number;
const printer = debug('rexp');
function rexp(n = 1, scale = 1, rng) {
    const result = new Array(n).fill(0).map(m => {
        if (!R_FINITE(scale) || scale <= 0.0) {
            if (scale === 0)
                return 0;
            return _general_1.ML_ERR_return_NAN(printer);
        }
        return scale * sexp_1.exp_rand(rng.unif_rand);
    });
    return result.length === 1 ? result[0] : result;
}
exports.rexp = rexp;


/***/ }),
/* 120 */
/***/ (function(module, exports, __nested_webpack_require_366993__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_366993__(1);
const _general_1 = __nested_webpack_require_366993__(0);
const dbinom_1 = __nested_webpack_require_366993__(17);
const dgamma_1 = __nested_webpack_require_366993__(21);
const { log } = Math;
const { isNaN: ISNAN, isFinite: R_FINITE, POSITIVE_INFINITY: ML_POSINF } = Number;
const printer_df = debug('df');
function df(xx, m, n, giveLog = false) {
    const fx = Array.isArray(xx) ? xx : [xx];
    const result = fx.map(x => {
        let p;
        let q;
        let f;
        let dens;
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
            }
            else {
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
        }
        else {
            f = m * m * q / (2 * p * (m + n));
            dens = dbinom_1.dbinom_raw(m / 2, (m + n) / 2, p, q, giveLog);
        }
        return giveLog ? log(f) + dens : f * dens;
    });
    return result.length === 1 ? result[0] : result;
}
exports.df = df;


/***/ }),
/* 121 */
/***/ (function(module, exports, __nested_webpack_require_369014__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_369014__(1);
const _general_1 = __nested_webpack_require_369014__(0);
const dnbeta_1 = __nested_webpack_require_369014__(54);
const dnchisq_1 = __nested_webpack_require_369014__(61);
const dgamma_1 = __nested_webpack_require_369014__(21);
const { log1p, log } = Math;
const { isFinite: R_FINITE, isNaN: ISNAN, POSITIVE_INFINITY: ML_POSINF } = Number;
const printer = debug('dnf');
function dnf(xx, df1, df2, ncp, giveLog) {
    const fx = Array.isArray(xx) ? xx : [xx];
    const result = fx.map(x => {
        let y;
        let z;
        let f;
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
            if (x === 1)
                return ML_POSINF;
            else
                return _general_1.R_D__0(giveLog);
        }
        if (!R_FINITE(df2))
            return df1 * dnchisq_1.dnchisq(x * df1, df1, ncp, giveLog);
        if (df1 > 1e14 && ncp < 1e7) {
            f =
                1 +
                    ncp / df1;
            z = dgamma_1.dgamma(1 / x / f, df2 / 2, 2 / df2, giveLog);
            return giveLog ? z - 2 * log(x) - log(f) : z / (x * x) / f;
        }
        y = df1 / df2 * x;
        z = dnbeta_1.dnbeta(y / (1 + y), df1 / 2, df2 / 2, ncp, giveLog);
        return giveLog
            ? z + log(df1) - log(df2) - 2 * log1p(y)
            : z * (df1 / df2) / (1 + y) / (1 + y);
    });
    return result.length === 1 ? result[0] : result;
}
exports.dnf = dnf;


/***/ }),
/* 122 */
/***/ (function(module, exports, __nested_webpack_require_370949__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_370949__(1);
const _general_1 = __nested_webpack_require_370949__(0);
const pbeta_1 = __nested_webpack_require_370949__(12);
const pchisq_1 = __nested_webpack_require_370949__(38);
const { isNaN: ISNAN, POSITIVE_INFINITY: ML_POSINF, NaN: ML_NAN, isFinite: ML_VALID } = Number;
const { LN2: M_LN2 } = Math;
const printer_pf = debug('pf');
function pf(q, df1, df2, lowerTail = true, logP = false) {
    const fx = Array.isArray(q) ? q : [q];
    const result = fx.map(x => {
        if (ISNAN(x) || ISNAN(df1) || ISNAN(df2))
            return x + df2 + df1;
        if (df1 <= 0 || df2 <= 0) {
            return _general_1.ML_ERR_return_NAN(printer_pf);
        }
        let rc = _general_1.R_P_bounds_01(lowerTail, logP, x, 0, ML_POSINF);
        if (rc !== undefined) {
            return rc;
        }
        if (df2 === ML_POSINF) {
            if (df1 === ML_POSINF) {
                if (x < 1)
                    return _general_1.R_DT_0(lowerTail, logP);
                if (x === 1)
                    return logP ? -M_LN2 : 0.5;
                if (x > 1)
                    return _general_1.R_DT_1(lowerTail, logP);
            }
            return pchisq_1.pchisq(x * df1, df1, lowerTail, logP);
        }
        if (df1 === ML_POSINF)
            return pchisq_1.pchisq(df2 / x, df2, !lowerTail, logP);
        if (df1 * x > df2)
            x = pbeta_1.pbeta(df2 / (df2 + df1 * x), df2 / 2, df1 / 2, !lowerTail, logP);
        else
            x = pbeta_1.pbeta(df1 * x / (df2 + df1 * x), df1 / 2, df2 / 2, lowerTail, logP);
        return ML_VALID(x) ? x : ML_NAN;
    });
    return result.length === 1 ? result[0] : result;
}
exports.pf = pf;


/***/ }),
/* 123 */
/***/ (function(module, exports, __nested_webpack_require_372756__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_372756__(1);
const _general_1 = __nested_webpack_require_372756__(0);
const pnbeta_1 = __nested_webpack_require_372756__(35);
const pnchisq_1 = __nested_webpack_require_372756__(39);
const { isNaN: ISNAN, isFinite: R_FINITE, POSITIVE_INFINITY: ML_POSINF } = Number;
const printer_pnf = debug('pnf');
function pnf(xx, df1, df2, ncp, lowerTail = true, logP = false) {
    const fx = Array.isArray(xx) ? xx : [xx];
    const result = fx.map(x => {
        let y;
        if (ISNAN(x) || ISNAN(df1) || ISNAN(df2) || ISNAN(ncp))
            return x + df2 + df1 + ncp;
        if (df1 <= 0 || df2 <= 0 || ncp < 0)
            return _general_1.ML_ERR_return_NAN(printer_pnf);
        if (!R_FINITE(ncp))
            return _general_1.ML_ERR_return_NAN(printer_pnf);
        if (!R_FINITE(df1) && !R_FINITE(df2))
            return _general_1.ML_ERR_return_NAN(printer_pnf);
        let rc = _general_1.R_P_bounds_01(lowerTail, logP, x, 0, ML_POSINF);
        if (rc !== undefined) {
            return rc;
        }
        if (df2 > 1e8)
            return pnchisq_1.pnchisq(x * df1, df1, ncp, lowerTail, logP);
        y = df1 / df2 * x;
        return pnbeta_1.pnbeta2(y / (1 + y), 1 / (1 + y), df1 / 2, df2 / 2, ncp, lowerTail, logP);
    });
    return result.length === 1 ? result[0] : result;
}
exports.pnf = pnf;


/***/ }),
/* 124 */
/***/ (function(module, exports, __nested_webpack_require_374212__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_374212__(1);
const _general_1 = __nested_webpack_require_374212__(0);
const qbeta_1 = __nested_webpack_require_374212__(55);
const qchisq_1 = __nested_webpack_require_374212__(40);
const printer = debug('qf');
const { isNaN: ISNAN, isFinite: R_FINITE, NaN: ML_NAN, POSITIVE_INFINITY: ML_POSINF, isFinite: ML_VALID } = Number;
function qf(pp, df1, df2, lower_tail, log_p) {
    const fp = Array.isArray(pp) ? pp : [pp];
    const result = fp.map(p => {
        if (ISNAN(p) || ISNAN(df1) || ISNAN(df2))
            return p + df1 + df2;
        if (df1 <= 0 || df2 <= 0)
            return _general_1.ML_ERR_return_NAN(printer);
        let rc = _general_1.R_Q_P01_boundaries(lower_tail, log_p, p, 0, ML_POSINF);
        if (rc !== undefined) {
            return rc;
        }
        if (df1 <= df2 && df2 > 4e5) {
            if (!R_FINITE(df1))
                return 1;
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


/***/ }),
/* 125 */
/***/ (function(module, exports, __nested_webpack_require_375623__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_375623__(1);
const _general_1 = __nested_webpack_require_375623__(0);
const qnbeta_1 = __nested_webpack_require_375623__(56);
const qnchisq_1 = __nested_webpack_require_375623__(62);
const { isNaN: ISNAN, isFinite: R_FINITE, POSITIVE_INFINITY: ML_POSINF } = Number;
const printer = debug('qnf');
function qnf(pp, df1, df2, ncp, lowerTail = true, logP = false) {
    const fp = Array.isArray(pp) ? pp : [pp];
    const result = fp.map(p => {
        let y;
        if (ISNAN(p) || ISNAN(df1) || ISNAN(df2) || ISNAN(ncp))
            return p + df1 + df2 + ncp;
        switch (true) {
            case df1 <= 0 || df2 <= 0 || ncp < 0:
            case !R_FINITE(ncp):
            case !R_FINITE(df1) && !R_FINITE(df2):
                return _general_1.ML_ERR_return_NAN(printer);
            default:
                break;
        }
        let rc = _general_1.R_Q_P01_boundaries(lowerTail, logP, p, 0, ML_POSINF);
        if (rc !== undefined) {
            return rc;
        }
        if (df2 > 1e8)
            return qnchisq_1.qnchisq(p, df1, ncp, lowerTail, logP) / df1;
        y = qnbeta_1.qnbeta(p, df1 / 2, df2 / 2, ncp, lowerTail, logP);
        return y / (1 - y) * (df2 / df1);
    });
    return result.length === 1 ? result[0] : result;
}
exports.qnf = qnf;


/***/ }),
/* 126 */
/***/ (function(module, exports, __nested_webpack_require_377037__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_377037__(1);
const _general_1 = __nested_webpack_require_377037__(0);
const rchisq_1 = __nested_webpack_require_377037__(13);
const r_func_1 = __nested_webpack_require_377037__(2);
const printer = debug('rf');
const { isNaN: ISNAN, isFinite: R_FINITE } = Number;
const sequence = r_func_1.seq()();
function rf(n, n1, n2, rng) {
    return r_func_1.map(sequence(n))(() => {
        let v1;
        let v2;
        if (ISNAN(n1) || ISNAN(n2) || n1 <= 0 || n2 <= 0) {
            return _general_1.ML_ERR_return_NAN(printer);
        }
        v1 = R_FINITE(n1) ? rchisq_1.rchisq(1, n1, rng) / n1 : 1;
        v2 = R_FINITE(n2) ? rchisq_1.rchisq(1, n2, rng) / n2 : 1;
        return v1 / v2;
    });
}
exports.rf = rf;


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const { max: fmax2, log1p, exp, abs: fabs } = Math;
function logspace_add(logx, logy) {
    return fmax2(logx, logy) + log1p(exp(-fabs(logx - logy)));
}
exports.logspace_add = logspace_add;


/***/ }),
/* 128 */
/***/ (function(module, exports, __nested_webpack_require_378240__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_378240__(1);
const _general_1 = __nested_webpack_require_378240__(0);
const toms708_1 = __nested_webpack_require_378240__(9);
const r_func_1 = __nested_webpack_require_378240__(2);
const printer = debug('dpsifn');
const { NaN: ML_NAN, POSITIVE_INFINITY: ML_POSINF, isNaN: ISNAN, EPSILON: DBL_EPSILON } = Number;
const n_max = 100;
const { pow, abs: fabs, max: fmax2, min: fmin2, exp, log, sin, cos, PI: M_PI, round, round: R_forceint } = Math;
function dpsifn(x, n, kode, m, ans, nz, ierr) {
    const bvalues = [
        1.0,
        -5.0e-1,
        1.66666666666666667e-1,
        -3.33333333333333333e-2,
        2.38095238095238095e-2,
        -3.33333333333333333e-2,
        7.57575757575757576e-2,
        -2.53113553113553114e-1,
        1.16666666666666667,
        -7.09215686274509804,
        5.49711779448621554e1,
        -5.29124242424242424e2,
        6.1921231884057971e3,
        -8.65802531135531136e4,
        1.42551716666666667e6,
        -2.7298231067816092e7,
        6.01580873900642368e8,
        -1.51163157670921569e10,
        4.29614643061166667e11,
        -1.37116552050883328e13,
        4.88332318973593167e14,
        -1.92965793419400681e16
    ];
    let nx;
    let xinc = 0;
    let xdmln = 0;
    let i;
    let j;
    let k;
    let mm;
    let mx;
    let nn;
    let np;
    let fn;
    let arg;
    let den;
    let elim;
    let eps;
    let fln;
    let fx;
    let rln;
    let rxsq;
    let r1m4;
    let r1m5;
    let s;
    let slope;
    let t;
    let ta;
    let tk;
    let tol;
    let tols;
    let tss;
    let tst;
    let tt;
    let t1;
    let t2;
    let wdtol;
    let xdmy = 0;
    let xln = 0.0;
    let xm;
    let xmin;
    let xq;
    let yint;
    let trm = new Array(23).fill(0);
    let trmr = new Array(n_max + 1).fill(0);
    ierr.val = 0;
    if (n < 0 || kode < 1 || kode > 2 || m < 1) {
        ierr.val = 1;
        return;
    }
    if (x <= 0) {
        if (x === round(x)) {
            for (j = 0; j < m; j++)
                ans[j] = (j + n) % 2 ? ML_POSINF : ML_NAN;
            return;
        }
        dpsifn(1 - x, n, 1, m, ans, nz, ierr);
        if (m > 1 || n > 3) {
            ierr.val = 4;
            return;
        }
        x *= M_PI;
        if (n === 0)
            tt = cos(x) / sin(x);
        else if (n === 1)
            tt = -1 / _general_1.R_pow_di(sin(x), 2);
        else if (n === 2)
            tt = 2 * cos(x) / _general_1.R_pow_di(sin(x), 3);
        else if (n === 3)
            tt =
                -2 *
                    (2 * _general_1.R_pow_di(cos(x), 2) + 1) /
                    _general_1.R_pow_di(sin(x), 4);
        else
            tt = ML_NAN;
        s = n % 2 ? -1 : 1;
        t1 = t2 = s = 1;
        for (k = 0, j = k - n; j < m; k++, j++, s = -s) {
            t1 *= M_PI;
            if (k >= 2)
                t2 *= k;
            if (j >= 0)
                ans[j] = s * (ans[j] + t1 / t2 * tt);
        }
        if (n === 0 && kode === 2)
            ans[0] += xln;
        return;
    }
    nz.val = 0;
    xln = log(x);
    if (kode === 1 && m === 1) {
        let lrg = 1 / (2 * DBL_EPSILON);
        if (n === 0 && x * xln > lrg) {
            ans[0] = -xln;
            return;
        }
        else if (n >= 1 && x > n * lrg) {
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
    let L10 = false;
    let L20 = false;
    let L30 = false;
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
        }
        else {
            if (x < wdtol) {
                ans[0] = _general_1.R_pow_di(x, -n - 1);
                if (mm !== 1) {
                    for (k = 1; k < mm; k++)
                        ans[k] = ans[k - 1] / x;
                }
                if (n === 0 && kode === 2)
                    ans[0] += xln;
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
                if (fabs(arg) < 1.0e-3)
                    xm = -arg;
                fln = x * xm / eps;
                xm = xmin - x;
                if (xm > 7.0 && fln < 15.0)
                    break;
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
        if (n === 0 && kode === 2)
            ans[0] = s + xln;
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
                    if (trm[i] < tols)
                        break;
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
    if (nn !== 0)
        t1 = tt + 1.0 / fn;
    rxsq = 1.0 / (xdmy * xdmy);
    ta = 0.5 * rxsq;
    t = (fn + 1) * ta;
    s = t * bvalues[2];
    if (fabs(s) >= tst) {
        tk = 2.0;
        for (k = 4; k <= 22; k++) {
            t = t * ((tk + fn + 1) / (tk + 1.0)) * ((tk + fn) / (tk + 2.0)) * rxsq;
            trm[k] = t * bvalues[k - 1];
            if (fabs(trm[k]) < tst)
                break;
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
            }
            else {
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
            if (fn !== 0)
                t1 = tt + 1.0 / fn;
            t = (fn + 1) * ta;
            s = t * bvalues[2];
            if (fabs(s) >= tst) {
                tk = 4 + fn;
                for (k = 4; k <= 22; k++) {
                    trm[k] = trm[k] * (fn + 1) / tk;
                    if (fabs(trm[k]) < tst)
                        break;
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
    if (kode !== 2)
        ans[0] = s - xdmln;
    else if (xdmy !== x) {
        xq = xdmy / x;
        ans[0] = s - log(xq);
    }
    return;
}
const print_psigamma = debug('psigamma');
function psigamma(_x, _deriv = 0) {
    let ans = [0];
    let nz = new toms708_1.NumberW();
    let ierr = new toms708_1.NumberW();
    return r_func_1.multiplexer(_x, _deriv)((x, deriv) => {
        let k;
        let n;
        nz.val = 0;
        ierr.val = 0;
        ans[0] = 0;
        if (ISNAN(x))
            return x;
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
        for (k = 1; k <= n; k++)
            ans[0] *= -k;
        return ans[0];
    });
}
exports.psigamma = psigamma;
function digamma(_x) {
    let ans = [0];
    let nz = new toms708_1.NumberW();
    let ierr = new toms708_1.NumberW();
    return r_func_1.map(_x)(x => {
        ans[0] = 0;
        nz.val = 0;
        ierr.val = 0;
        if (ISNAN(x))
            return x;
        dpsifn(x, 0, 1, 1, ans, nz, ierr);
        if (ierr.val !== 0) {
            return ML_NAN;
        }
        return -ans[0];
    });
}
exports.digamma = digamma;
function trigamma(_x) {
    let ans = [0];
    let nz = new toms708_1.NumberW(0);
    let ierr = new toms708_1.NumberW(0);
    return r_func_1.map(_x)(x => {
        ans[0] = 0;
        nz.val = 0;
        ierr.val = 0;
        if (ISNAN(x))
            return x;
        dpsifn(x, 1, 1, 1, ans, nz, ierr);
        if (ierr.val !== 0) {
            return ML_NAN;
        }
        return ans[0];
    });
}
exports.trigamma = trigamma;
function tetragamma(_x) {
    let ans = [0];
    let nz = new toms708_1.NumberW();
    let ierr = new toms708_1.NumberW();
    return r_func_1.map(_x)(x => {
        ans[0] = 0;
        nz.val = 0;
        ierr.val = 0;
        if (ISNAN(x))
            return x;
        dpsifn(x, 2, 1, 1, ans, nz, ierr);
        if (ierr.val !== 0) {
            return ML_NAN;
        }
        return -2.0 * ans[0];
    });
}
exports.tetragamma = tetragamma;
function pentagamma(_x) {
    let ans = [0];
    let nz = new toms708_1.NumberW();
    let ierr = new toms708_1.NumberW();
    return r_func_1.map(_x)(x => {
        ans[0] = 0;
        nz.val = 0;
        ierr.val = 0;
        if (ISNAN(x))
            return x;
        dpsifn(x, 3, 1, 1, ans, nz, ierr);
        if (ierr.val !== 0) {
            return ML_NAN;
        }
        return 6.0 * ans[0];
    });
}
exports.pentagamma = pentagamma;


/***/ }),
/* 129 */
/***/ (function(module, exports, __nested_webpack_require_390232__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_390232__(1);
const dbinom_1 = __nested_webpack_require_390232__(17);
const _general_1 = __nested_webpack_require_390232__(0);
const { isNaN: ISNAN, isFinite: R_FINITE } = Number;
const { round: R_forceint, log } = Math;
const printer = debug('dgeom');
function dgeom(xx, p, giveLog = false) {
    const fx = Array.isArray(xx) ? xx : [xx];
    const result = fx.map(x => {
        let prob;
        if (ISNAN(x) || ISNAN(p))
            return x + p;
        if (p <= 0 || p > 1) {
            return _general_1.ML_ERR_return_NAN(printer);
        }
        let rc = _general_1.R_D_nonint_check(giveLog, x, printer);
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


/***/ }),
/* 130 */
/***/ (function(module, exports, __nested_webpack_require_391397__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_391397__(1);
const _general_1 = __nested_webpack_require_391397__(0);
const expm1_1 = __nested_webpack_require_391397__(3);
const { expm1, log1p, log, exp, floor } = Math;
const { isNaN: ISNAN, isFinite: R_FINITE } = Number;
const printer = debug('pgeom');
function pgeom(xx, p, lowerTail = true, logP = false) {
    const fx = Array.isArray(xx) ? xx : [xx];
    const result = fx.map(x => {
        if (ISNAN(x) || ISNAN(p))
            return x + p;
        if (p <= 0 || p > 1) {
            return _general_1.ML_ERR_return_NAN(printer);
        }
        if (x < 0)
            return _general_1.R_DT_0(lowerTail, logP);
        if (!R_FINITE(x))
            return _general_1.R_DT_1(lowerTail, logP);
        x = floor(x + 1e-7);
        if (p === 1) {
            x = lowerTail ? 1 : 0;
            return logP ? log(x) : x;
        }
        x = log1p(-p) * (x + 1);
        if (logP)
            return expm1_1.R_DT_Clog(lowerTail, logP, x);
        else
            return lowerTail ? -expm1(x) : exp(x);
    });
    return result.length === 1 ? result[0] : result;
}
exports.pgeom = pgeom;


/***/ }),
/* 131 */
/***/ (function(module, exports, __nested_webpack_require_392651__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_392651__(1);
const _general_1 = __nested_webpack_require_392651__(0);
const expm1_1 = __nested_webpack_require_392651__(3);
const { ceil, max: fmax2, log1p } = Math;
const { POSITIVE_INFINITY: ML_POSINF, isNaN: ISNAN } = Number;
const printer = debug('qgeom');
function qgeom(pp, prob, lower_tail = true, log_p = false) {
    const fp = Array.isArray(pp) ? pp : [pp];
    const result = fp.map(p => {
        if (prob <= 0 || prob > 1) {
            return _general_1.ML_ERR_return_NAN(printer);
        }
        let rc = _general_1.R_Q_P01_boundaries(lower_tail, log_p, p, 0, ML_POSINF);
        if (rc !== undefined) {
            return rc;
        }
        if (ISNAN(p) || ISNAN(prob))
            return p + prob;
        if (prob === 1)
            return 0;
        return fmax2(0, ceil(expm1_1.R_DT_Clog(lower_tail, log_p, p) / log1p(-prob) - 1 - 1e-12));
    });
    return result.length === 1 ? result[0] : result;
}
exports.qgeom = qgeom;


/***/ }),
/* 132 */
/***/ (function(module, exports, __nested_webpack_require_393757__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_393757__(1);
const _general_1 = __nested_webpack_require_393757__(0);
const sexp_1 = __nested_webpack_require_393757__(28);
const rpois_1 = __nested_webpack_require_393757__(32);
const { isFinite: R_FINITE } = Number;
const printer = debug('rgeom');
function rgeom(N, p, rng) {
    const result = new Array(N).fill(0).map(() => {
        if (!R_FINITE(p) || p <= 0 || p > 1)
            return _general_1.ML_ERR_return_NAN(printer);
        return rpois_1.rpois(1, sexp_1.exp_rand(rng.unif_rand) * ((1 - p) / p), rng);
    });
    return result.length === 1 ? result[0] : result;
}
exports.rgeom = rgeom;


/***/ }),
/* 133 */
/***/ (function(module, exports, __nested_webpack_require_394502__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const lbeta_1 = __nested_webpack_require_394502__(11);
const { log } = Math;
function lfastchoose(n, k) {
    return -log(n + 1) - lbeta_1.internal_lbeta(n - k + 1, k + 1);
}
exports.lfastchoose = lfastchoose;


/***/ }),
/* 134 */
/***/ (function(module, exports, __nested_webpack_require_394855__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_394855__(1);
const _general_1 = __nested_webpack_require_394855__(0);
const expm1_1 = __nested_webpack_require_394855__(3);
const r_func_1 = __nested_webpack_require_394855__(2);
const dhyper_1 = __nested_webpack_require_394855__(69);
const { floor, round: R_forceint, log1p } = Math;
const { EPSILON: DBL_EPSILON, isNaN: ISNAN, isFinite: R_FINITE } = Number;
function pdhyper(x, NR, NB, n, log_p) {
    let sum = 0;
    let term = 1;
    while (x > 0 && term >= DBL_EPSILON * sum) {
        term *= x * (NB - n + x) / (n + 1 - x) / (NR + 1 - x);
        sum += term;
        x--;
    }
    let ss = sum;
    return log_p ? log1p(ss) : 1 + ss;
}
const printer_phyper = debug('phyper');
function phyper(xx, nr, nb, nn, lowerTail = true, logP = false) {
    return r_func_1.map(xx)(x => {
        let d;
        let pd;
        let lower_tail = lowerTail;
        let log_p = logP;
        let NR = nr;
        let NB = nb;
        let n = nn;
        if (ISNAN(x) || ISNAN(NR) || ISNAN(NB) || ISNAN(n))
            return x + NR + NB + n;
        x = floor(x + 1e-7);
        NR = R_forceint(NR);
        NB = R_forceint(NB);
        n = R_forceint(n);
        if (NR < 0 || NB < 0 || !R_FINITE(NR + NB) || n < 0 || n > NR + NB) {
            return _general_1.ML_ERR_return_NAN(printer_phyper);
        }
        if (x * (NR + NB) > n * NR) {
            let oldNB = NB;
            NB = NR;
            NR = oldNB;
            x = n - x - 1;
            lower_tail = !lower_tail;
        }
        if (x < 0)
            return _general_1.R_DT_0(lower_tail, log_p);
        if (x >= NR || x >= n)
            return _general_1.R_DT_1(lower_tail, log_p);
        d = dhyper_1.dhyper(x, NR, NB, n, log_p);
        pd = pdhyper(x, NR, NB, n, log_p);
        return log_p
            ? expm1_1.R_DT_log(lower_tail, log_p, d + pd)
            : _general_1.R_D_Lval(lower_tail, d * pd);
    });
}
exports.phyper = phyper;


/***/ }),
/* 135 */
/***/ (function(module, exports, __nested_webpack_require_396898__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_396898__(1);
const rbinom_1 = __nested_webpack_require_396898__(36);
const _general_1 = __nested_webpack_require_396898__(0);
const qhyper_1 = __nested_webpack_require_396898__(70);
const { log, round: R_forceint, exp, sqrt } = Math;
const { isFinite: R_FINITE, MAX_SAFE_INTEGER: INT_MAX } = Number;
const printer_afc = debug('afc');
function afc(i) {
    const al = [
        0.0,
        0.0,
        0.69314718055994530941723212145817,
        1.7917594692280550008124773583807,
        3.17805383034794561964694160129705,
        4.78749174278204599424770093452324,
        6.57925121201010099506017829290394,
        8.52516136106541430016553103634712
    ];
    if (i < 0) {
        printer_afc('rhyper.c: afc(i), i=%d < 0 -- SHOULD NOT HAPPEN!', i);
        return -1;
    }
    if (i <= 7) {
        return al[i];
    }
    let di = i;
    let i2 = di * di;
    return ((di + 0.5) * log(di) -
        di +
        _general_1.M_LN_SQRT_2PI +
        (0.0833333333333333 - 0.00277777777777778 / i2) / di);
}
exports.afc = afc;
function rhyper(N, nn1in, nn2in, kkin, rng) {
    const result = new Array(N).fill(0).map(() => {
        return _rhyper(nn1in, nn2in, kkin, rng);
    });
    return result.length === 1 ? result[0] : result;
}
exports.rhyper = rhyper;
const printer_rhyper = debug('_rhyper');
function _rhyper(nn1in, nn2in, kkin, rng) {
    let nn1 = 0;
    let nn2 = 0;
    let kk = 0;
    let ix = 0;
    let setup1 = false;
    let setup2 = false;
    let ks = -1;
    let n1s = -1;
    let n2s = -1;
    let m = 0;
    let minjx = 0;
    let maxjx = 0;
    let k = 0;
    let n1 = 0;
    let n2 = 0;
    let tn = 0;
    let w = 0;
    let a = 0;
    let d = 0;
    let s = 0;
    let xl = 0;
    let xr = 0;
    let kl = 0;
    let kr = 0;
    let lamdl = 0;
    let lamdr = 0;
    let p1 = 0;
    let p2 = 0;
    let p3 = 0;
    if (!R_FINITE(nn1in) || !R_FINITE(nn2in) || !R_FINITE(kkin))
        return _general_1.ML_ERR_return_NAN(printer_rhyper);
    nn1in = R_forceint(nn1in);
    nn2in = R_forceint(nn2in);
    kkin = R_forceint(kkin);
    if (nn1in < 0 || nn2in < 0 || kkin < 0 || kkin > nn1in + nn2in)
        return _general_1.ML_ERR_return_NAN(printer_rhyper);
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
    }
    else if (kk !== ks) {
        setup1 = false;
        setup2 = true;
    }
    else {
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
        }
        else {
            n1 = nn2;
            n2 = nn1;
        }
    }
    if (setup2) {
        ks = kk;
        if (kk + kk >= tn) {
            k = tn - kk;
        }
        else {
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
    }
    else if (m - minjx < 10) {
        const scale = 1e25;
        const con = 57.5646273248511421;
        if (setup1 || setup2) {
            let lw;
            if (k < n2) {
                lw = afc(n2) + afc(n1 + n2 - k) - afc(n2 - k) - afc(n1 + n2);
            }
            else {
                lw = afc(n1) + afc(k) - afc(k - n2) - afc(n1 + n2);
            }
            w = exp(lw + con);
        }
        let p = 0;
        let u = 0;
        printer_rhyper('rhyper(), branch II; w = %d > 0', w);
        let goto_L10 = false;
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
    }
    else {
        if (setup1 || setup2) {
            s = sqrt((tn - k) * k * n1 * n2 / (tn - 1) / tn / tn);
            d = 1.5 * s + 0.5;
            xl = m - d + 0.5;
            xr = m + d + 0.5;
            a = afc(m) + afc(n1 - m) + afc(k - m) + afc(n2 - k + m);
            kl = exp(a - afc(xl) - afc(n1 - xl) - afc(k - xl) - afc(n2 - k + xl));
            kr = exp(a -
                afc(xr - 1) -
                afc(n1 - xr + 1) -
                afc(k - xr + 1) -
                afc(n2 - k + xr - 1));
            lamdl = -log(xl * (n2 - k + xl) / (n1 - xl + 1) / (k - xl + 1));
            lamdr = -log((n1 - xr + 1) * (k - xr + 1) / xr / (n2 - k + xr));
            p1 = d + d;
            p2 = p1 + kl / lamdl;
            p3 = p2 + kr / lamdr;
        }
        printer_rhyper('rhyper(), branch III {accept/reject}: (xl,xr)= (%d,%d); (lamdl,lamdr)= (%d,%d)\n', xl, xr, lamdl, lamdr);
        printer_rhyper('-------- p123= c(%d,%d,%d)\n', p1, p2, p3);
        let n_uv = 0;
        while (true) {
            let u = rng.unif_rand() * p3;
            let v = rng.unif_rand();
            n_uv++;
            if (n_uv >= 10000) {
                printer_rhyper('rhyper() branch III: giving up after %d rejections', n_uv);
                return _general_1.ML_ERR_return_NAN(printer_rhyper);
            }
            printer_rhyper(' ... L30: new (u=%d, v ~ U[0,1])[%d]\n', u, n_uv);
            if (u < p1) {
                ix = xl + u;
            }
            else if (u <= p2) {
                ix = xl + log(v) / lamdl;
                if (ix < minjx) {
                    continue;
                }
                v = v * (u - p1) * lamdl;
            }
            else {
                ix = xr - log(v) / lamdr;
                if (ix > maxjx) {
                    continue;
                }
                v = v * (u - p2) * lamdr;
            }
            let reject = true;
            if (m < 100 || ix <= 50) {
                let i;
                let f = 1.0;
                if (m < ix) {
                    for (i = m + 1; i <= ix; i++)
                        f = f * (n1 - i + 1) * (k - i + 1) / (n2 - k + i) / i;
                }
                else if (m > ix) {
                    for (i = ix + 1; i <= m; i++)
                        f = f * i * (n2 - k + i) / (n1 - i + 1) / (k - i + 1);
                }
                if (v <= f) {
                    reject = false;
                }
            }
            else {
                const deltal = 0.0078;
                const deltau = 0.0034;
                let e;
                let g;
                let r;
                let t;
                let y;
                let de;
                let dg;
                let dr;
                let ds;
                let dt;
                let gl;
                let gu;
                let nk;
                let nm;
                let ub;
                let xk;
                let xm;
                let xn;
                let y1;
                let ym;
                let yn;
                let yk;
                let alv;
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
                if (g < 0.0)
                    dg = 1.0 + g;
                gu = g * (1.0 + g * (-0.5 + g / 3.0));
                gl = gu - 0.25 * (g * g * g * g) / dg;
                xm = m + 0.5;
                xn = n1 - m + 0.5;
                xk = k - m + 0.5;
                nm = n2 - k + xm;
                ub =
                    y * gu -
                        m * gl +
                        deltau +
                        xm * r * (1 + r * (-0.5 + r / 3.0)) +
                        xn * s * (1 + s * (-0.5 + s / 3.0)) +
                        xk * t * (1 + t * (-0.5 + t / 3.0)) +
                        nm * e * (1 + e * (-0.5 + e / 3.0));
                alv = log(v);
                if (alv > ub) {
                    reject = true;
                }
                else {
                    dr = xm * (r * r * r * r);
                    if (r < 0.0)
                        dr /= 1.0 + r;
                    ds = xn * (s * s * s * s);
                    if (s < 0.0)
                        ds /= 1.0 + s;
                    dt = xk * (t * t * t * t);
                    if (t < 0.0)
                        dt /= 1.0 + t;
                    de = nm * (e * e * e * e);
                    if (e < 0.0)
                        de /= 1.0 + e;
                    if (alv <
                        ub - 0.25 * (dr + ds + dt + de) + (y + m) * (gl - gu) - deltal) {
                        reject = false;
                    }
                    else {
                        if (alv <=
                            a - afc(ix) - afc(n1 - ix) - afc(k - ix) - afc(n2 - k + ix)) {
                            reject = false;
                        }
                        else {
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
        }
        else {
            ix = nn1 - ix;
        }
    }
    else {
        if (nn1 > nn2)
            ix = kk - ix;
    }
    return ix;
}


/***/ }),
/* 136 */
/***/ (function(module, exports, __nested_webpack_require_407461__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var beta_1 = __nested_webpack_require_407461__(34);
exports.Beta = beta_1.Beta;
var binomial_1 = __nested_webpack_require_407461__(81);
exports.Binomial = binomial_1.Binomial;
var binomial_negative_1 = __nested_webpack_require_407461__(80);
exports.NegativeBinomial = binomial_negative_1.NegativeBinomial;
var cauchy_1 = __nested_webpack_require_407461__(82);
exports.Cauchy = cauchy_1.Cauchy;
var chebyshev_1 = __nested_webpack_require_407461__(83);
exports.ChebyshevSeries = chebyshev_1.ChebyshevSeries;
var chi_2_1 = __nested_webpack_require_407461__(84);
exports.ChiSquared = chi_2_1.ChiSquared;
var exp_1 = __nested_webpack_require_407461__(86);
exports.Exponential = exp_1.Exponential;
var f_distro_1 = __nested_webpack_require_407461__(87);
exports.FDist = f_distro_1.FDist;
var gamma_1 = __nested_webpack_require_407461__(25);
exports.Gamma = gamma_1.Gamma;
var geometric_1 = __nested_webpack_require_407461__(88);
exports.Geometric = geometric_1.Geometric;
var hypergeometric_1 = __nested_webpack_require_407461__(89);
exports.HyperGeometric = hypergeometric_1.HyperGeometric;
var logis_1 = __nested_webpack_require_407461__(90);
exports.Logistic = logis_1.Logistic;
var lognormal_1 = __nested_webpack_require_407461__(91);
exports.LogNormal = lognormal_1.LogNormal;
var multinom_1 = __nested_webpack_require_407461__(92);
exports.Multinomial = multinom_1.Multinomial;
var normal_1 = __nested_webpack_require_407461__(93);
exports.Normal = normal_1.Normal;
var poisson_1 = __nested_webpack_require_407461__(94);
exports.Poisson = poisson_1.Poisson;
var rng_1 = __nested_webpack_require_407461__(16);
exports.rng = rng_1.rng;
exports.IRNG = rng_1.IRNG;
exports.IRNGNormal = rng_1.IRNGNormal;
var signrank_1 = __nested_webpack_require_407461__(95);
exports.SignRank = signrank_1.SignRank;
var student_t_1 = __nested_webpack_require_407461__(96);
exports.StudentT = student_t_1.StudentT;
var tukey_1 = __nested_webpack_require_407461__(97);
exports.Tukey = tukey_1.Tukey;
var uniform_1 = __nested_webpack_require_407461__(98);
exports.Uniform = uniform_1.Uniform;
var weibull_1 = __nested_webpack_require_407461__(99);
exports.Weibull = weibull_1.Weibull;
var wilcoxon_1 = __nested_webpack_require_407461__(100);
exports.Wilcoxon = wilcoxon_1.Wilcoxon;
const bessel_1 = __nested_webpack_require_407461__(79);
const beta_2 = __nested_webpack_require_407461__(34);
const common_1 = __nested_webpack_require_407461__(85);
const gamma_2 = __nested_webpack_require_407461__(25);
exports.special = Object.freeze(Object.assign({}, gamma_2.special, beta_2.special, common_1.special, bessel_1.special));
const r_func_1 = __nested_webpack_require_407461__(2);
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


/***/ }),
/* 137 */
/***/ (function(module, exports, __nested_webpack_require_410452__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_410452__(1);
const _general_1 = __nested_webpack_require_410452__(0);
const r_func_1 = __nested_webpack_require_410452__(2);
const { log, exp, abs: fabs } = Math;
const { isNaN: ISNAN } = Number;
const printer_dlogis = debug('dlogis');
function dlogis(xx, location = 0, scale = 1, give_log = false) {
    return r_func_1.map(xx)(x => {
        let e;
        let f;
        if (ISNAN(x) || ISNAN(location) || ISNAN(scale))
            return NaN;
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


/***/ }),
/* 138 */
/***/ (function(module, exports, __nested_webpack_require_411350__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_411350__(1);
const _general_1 = __nested_webpack_require_411350__(0);
const r_func_1 = __nested_webpack_require_411350__(2);
const { exp, log1p } = Math;
const { isNaN: ISNAN } = Number;
function Rf_log1pexp(x) {
    if (x <= 18)
        return log1p(exp(x));
    if (x > 33.3)
        return x;
    return x + exp(-x);
}
exports.Rf_log1pexp = Rf_log1pexp;
const printer_plogis = debug('plogis');
function plogis(xx, location = 0, scale = 1, lower_tail = true, log_p = false) {
    return r_func_1.map(xx)(x => {
        if (ISNAN(x) || ISNAN(location) || ISNAN(scale))
            return x + location + scale;
        if (scale <= 0.0) {
            return _general_1.ML_ERR_return_NAN(printer_plogis);
        }
        x = (x - location) / scale;
        if (ISNAN(x)) {
            return _general_1.ML_ERR_return_NAN(printer_plogis);
        }
        let rc = _general_1.R_P_bounds_Inf_01(lower_tail, log_p, x);
        if (rc !== undefined) {
            return rc;
        }
        if (log_p) {
            return -Rf_log1pexp(lower_tail ? -x : x);
        }
        else {
            return 1 / (1 + exp(lower_tail ? -x : x));
        }
    });
}
exports.plogis = plogis;


/***/ }),
/* 139 */
/***/ (function(module, exports, __nested_webpack_require_412687__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_412687__(1);
const _general_1 = __nested_webpack_require_412687__(0);
const expm1_1 = __nested_webpack_require_412687__(3);
const r_func_1 = __nested_webpack_require_412687__(2);
const { isNaN: ISNAN, POSITIVE_INFINITY: ML_POSINF, NEGATIVE_INFINITY: ML_NEGINF } = Number;
const { log } = Math;
const printer_qlogis = debug('qlogis');
function qlogis(pp, location = 0, scale = 1, lower_tail = true, log_p = false) {
    return r_func_1.map(pp)(p => {
        if (ISNAN(p) || ISNAN(location) || ISNAN(scale))
            return p + location + scale;
        let rc = _general_1.R_Q_P01_boundaries(lower_tail, log_p, p, ML_NEGINF, ML_POSINF);
        if (rc !== undefined) {
            return rc;
        }
        if (scale < 0) {
            return _general_1.ML_ERR_return_NAN(printer_qlogis);
        }
        if (scale === 0)
            return location;
        if (log_p) {
            if (lower_tail)
                p = p - expm1_1.R_Log1_Exp(p);
            else
                p = expm1_1.R_Log1_Exp(p) - p;
        }
        else
            p = log(lower_tail ? p / (1 - p) : (1 - p) / p);
        return location + scale * p;
    });
}
exports.qlogis = qlogis;


/***/ }),
/* 140 */
/***/ (function(module, exports, __nested_webpack_require_414002__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_414002__(1);
const _general_1 = __nested_webpack_require_414002__(0);
const r_func_1 = __nested_webpack_require_414002__(2);
const { log } = Math;
const { isNaN: ISNAN, isFinite: R_FINITE } = Number;
const sequence = r_func_1.seq()();
const printer_rlogis = debug('rlogis');
function rlogis(N, location = 0, scale = 1, rng) {
    return r_func_1.map(sequence(N))(() => {
        if (ISNAN(location) || !R_FINITE(scale)) {
            return _general_1.ML_ERR_return_NAN(printer_rlogis);
        }
        if (scale === 0 || !R_FINITE(location))
            return location;
        else {
            let u = rng.unif_rand();
            return location + scale * log(u / (1 - u));
        }
    });
}
exports.rlogis = rlogis;


/***/ }),
/* 141 */
/***/ (function(module, exports, __nested_webpack_require_414883__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_414883__(1);
const _general_1 = __nested_webpack_require_414883__(0);
const r_func_1 = __nested_webpack_require_414883__(2);
const { isNaN: ISNAN, POSITIVE_INFINITY: ML_POSINF } = Number;
const { log, exp } = Math;
const printer = debug('dlnorm');
function dlnorm(x, meanlog, sdlog, give_log) {
    return r_func_1.map(x)(fx => {
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
        let y = (log(fx) - meanlog) / sdlog;
        return give_log
            ? -(_general_1.M_LN_SQRT_2PI + 0.5 * y * y + log(fx * sdlog))
            : _general_1.M_1_SQRT_2PI * exp(-0.5 * y * y) / (fx * sdlog);
    });
}
exports.dlnorm = dlnorm;


/***/ }),
/* 142 */
/***/ (function(module, exports, __nested_webpack_require_416033__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_416033__(1);
const _general_1 = __nested_webpack_require_416033__(0);
const pnorm_1 = __nested_webpack_require_416033__(19);
const r_func_1 = __nested_webpack_require_416033__(2);
const { isNaN: ISNAN } = Number;
const { log } = Math;
const printer = debug('plnorm');
function plnorm(x, meanlog = 0, sdlog = 1, lower_tail = true, log_p = false) {
    return r_func_1.map(x)(fx => {
        if (ISNAN(fx) || ISNAN(meanlog) || ISNAN(sdlog))
            return fx + meanlog + sdlog;
        if (sdlog < 0)
            return _general_1.ML_ERR_return_NAN(printer);
        if (fx > 0)
            return pnorm_1.pnorm5(log(fx), meanlog, sdlog, lower_tail, log_p);
        return _general_1.R_DT_0(lower_tail, log_p);
    });
}
exports.plnorm = plnorm;


/***/ }),
/* 143 */
/***/ (function(module, exports, __nested_webpack_require_416921__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _general_1 = __nested_webpack_require_416921__(0);
const qnorm_1 = __nested_webpack_require_416921__(6);
const r_func_1 = __nested_webpack_require_416921__(2);
const { exp } = Math;
const { isNaN: ISNAN, POSITIVE_INFINITY: ML_POSINF } = Number;
function qlnorm(pp, meanlog = 0, sdlog = 1, lower_tail = true, log_p = false) {
    return r_func_1.map(pp)(p => {
        if (ISNAN(p) || ISNAN(meanlog) || ISNAN(sdlog))
            return p + meanlog + sdlog;
        _general_1.R_Q_P01_boundaries(lower_tail, log_p, p, 0, ML_POSINF);
        return exp(qnorm_1.qnorm(p, meanlog, sdlog, lower_tail, log_p));
    });
}
exports.qlnorm = qlnorm;


/***/ }),
/* 144 */
/***/ (function(module, exports, __nested_webpack_require_417681__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_417681__(1);
const _general_1 = __nested_webpack_require_417681__(0);
const rnorm_1 = __nested_webpack_require_417681__(43);
const r_func_1 = __nested_webpack_require_417681__(2);
const exp = r_func_1.arrayrify(Math.exp);
const { isNaN: ISNAN, isFinite: R_FINITE } = Number;
const printer = debug('rlnorm');
const sequence = r_func_1.seq()();
function rlnorm(N, meanlog = 0, sdlog = 1, rng) {
    if (ISNAN(meanlog) || !R_FINITE(sdlog) || sdlog < 0) {
        return r_func_1.map(sequence(N))(() => _general_1.ML_ERR_return_NAN(printer));
    }
    return exp(rnorm_1.rnorm(N, meanlog, sdlog, rng));
}
exports.rlnorm = rlnorm;


/***/ }),
/* 145 */
/***/ (function(module, exports, __nested_webpack_require_418448__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const gamma_1 = __nested_webpack_require_418448__(25);
const r_func_1 = __nested_webpack_require_418448__(2);
const { isFinite } = Number;
const div = r_func_1.arrayrify((a, b) => a / b);
const { lgamma } = gamma_1.special;
const add = r_func_1.arrayrify((a, b) => a + b);
const log = r_func_1.arrayrify(Math.log);
function dmultinom(o) {
    o.asLog = !!o.asLog;
    let x = r_func_1.flatten(o.x).filter(f => !!f);
    let prob = r_func_1.flatten(o.prob);
    let badProb = !!prob.find(f => !isFinite(f) || f < 0);
    let s = r_func_1.sum(prob);
    if (badProb || s === 0) {
        throw new Error('probabilities must be finite, non-negative and not all 0');
    }
    prob = r_func_1.flatten(div(prob, s));
    x = x.map(Math.round);
    if (r_func_1.any(x)(v => v < 0)) {
        throw new Error('probabilities must be finite, non-negative and not all 0');
    }
    const N = r_func_1.sum(x);
    const size = !!o.size ? o.size : N;
    if (size !== N) {
        throw new Error(`size:${size} != sum(x):${N}, i.e. one is wrong`);
    }
    const i0 = prob.map(p => p === 0);
    if (r_func_1.any(i0)(v => !!v)) {
        if (i0.find((_v, i) => x[i] !== 0)) {
            return o.asLog ? -Infinity : 0;
        }
        x = x.filter((_v, i) => i0[i]);
        prob = prob.filter((_v, i) => i0[i]);
    }
    const errMsg = [];
    if (prob.length <= 1) {
        errMsg.push(`number of propabilities need to be at least 2, it is:${prob.length}`);
    }
    if (x.length <= 1) {
        errMsg.push(`number of quantiles need to be at least 2, it is :${x.length}`);
    }
    if (x.length !== prob.length) {
        errMsg.push(`number of effective quantiles:${x.length} is not equal to number of effective probabilities:${prob.length}.`);
    }
    if (errMsg.length) {
        throw new Error(errMsg.join('\n'));
    }
    const s1 = lgamma(add(x, 1));
    const s2 = log(prob);
    const s3 = x.map((v, i) => v * s2[i] - s1[i]);
    const r = lgamma(size + 1) + r_func_1.sum(s3);
    return o.asLog ? r : Math.exp(r);
}
exports.dmultinom = dmultinom;


/***/ }),
/* 146 */
/***/ (function(module, exports, __nested_webpack_require_420637__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_420637__(1);
const { isFinite: R_FINITE } = Number;
const { abs: fabs } = Math;
const rbinom_1 = __nested_webpack_require_420637__(36);
const r_func_1 = __nested_webpack_require_420637__(2);
const printer_rmultinom = debug('rmultinom');
function rmultinom(n, size, prob, rng) {
    const result = Array.from({ length: n }).map(() => _rmultinom(size, prob, rng));
    return r_func_1.possibleScalar(result);
}
exports.rmultinom = rmultinom;
function _rmultinom(size, prob, rng) {
    const rN = [];
    let p = r_func_1.flatten(prob);
    const K = p.length;
    if (p.length === 0) {
        printer_rmultinom('list of probabilities cannot be empty');
        return rN;
    }
    if (size < 0) {
        printer_rmultinom('Illegal Argument:size is negative');
        rN.splice(0);
        return rN;
    }
    if (p.find(pp => !R_FINITE(pp) || pp < 0)) {
        printer_rmultinom('some propbabilities are invalid or negative numbers');
        rN.splice(0);
        return rN;
    }
    rN.splice(0, rN.length, ...new Array(K).fill(0));
    if (size === 0) {
        return rN;
    }
    let _size = size;
    let p_tot = r_func_1.sum(p);
    printer_rmultinom('%o', { p, p_tot, _size, K, rN });
    for (let k = 0; k < K - 1; k++) {
        if (fabs(p_tot) < Number.EPSILON) {
            rN[k] = _size;
            _size = 0;
            p_tot = 0;
            continue;
        }
        const pp = p[k] / p_tot;
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
        printer_rmultinom('%o', { p_tot, _size, k, rN });
    }
    rN[K - 1] = _size;
    return rN;
}


/***/ }),
/* 147 */
/***/ (function(module, exports, __nested_webpack_require_422591__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_422591__(1);
const _general_1 = __nested_webpack_require_422591__(0);
const toms708_1 = __nested_webpack_require_422591__(9);
const ppois_1 = __nested_webpack_require_422591__(71);
const qnorm_1 = __nested_webpack_require_422591__(6);
const expm1_1 = __nested_webpack_require_422591__(3);
const r_func_1 = __nested_webpack_require_422591__(2);
const { max: fmax2, sqrt, floor, round: nearbyint } = Math;
const { isNaN: ISNAN, EPSILON: DBL_EPSILON, POSITIVE_INFINITY: ML_POSINF, isFinite: R_FINITE } = Number;
function do_search(y, z, p, lambda, incr) {
    if (z.val >= p) {
        while (true) {
            if (y === 0 || (z.val = ppois_1.ppois(y - incr, lambda, true, false)) < p)
                return y;
            y = fmax2(0, y - incr);
        }
    }
    else {
        while (true) {
            y = y + incr;
            if ((z.val = ppois_1.ppois(y, lambda, true, false)) >= p)
                return y;
        }
    }
}
function qpois(pp, lambda, lower_tail = true, log_p = false) {
    return r_func_1.map(pp)(p => {
        return _qpois(p, lambda, lower_tail, log_p);
    });
}
exports.qpois = qpois;
const printer_qpois = debug('_qpois');
function _qpois(p, lambda, lower_tail, log_p) {
    let mu;
    let sigma;
    let gamma;
    let y;
    let z = new toms708_1.NumberW(0);
    if (ISNAN(p) || ISNAN(lambda))
        return p + lambda;
    if (!R_FINITE(lambda)) {
        return _general_1.ML_ERR_return_NAN(printer_qpois);
    }
    if (lambda < 0)
        return _general_1.ML_ERR_return_NAN(printer_qpois);
    if (lambda === 0)
        return 0;
    let rc = _general_1.R_Q_P01_boundaries(lower_tail, log_p, p, 0, ML_POSINF);
    if (rc !== undefined) {
        return rc;
    }
    mu = lambda;
    sigma = sqrt(lambda);
    gamma = 1.0 / sigma;
    if (!lower_tail || log_p) {
        p = expm1_1.R_DT_qIv(lower_tail, log_p, p);
        if (p === 0)
            return 0;
        if (p === 1)
            return ML_POSINF;
    }
    if (p + 1.01 * DBL_EPSILON >= 1)
        return ML_POSINF;
    z.val = qnorm_1.qnorm(p, 0, 1, true, false);
    y = nearbyint(mu + sigma * (z.val + gamma * (z.val * z.val - 1) / 6));
    z.val = ppois_1.ppois(y, lambda, true, false);
    p *= 1 - 64 * DBL_EPSILON;
    if (lambda < 1e5)
        return do_search(y, z, p, lambda, 1);
    {
        let incr = floor(y * 0.001);
        let oldincr;
        do {
            oldincr = incr;
            y = do_search(y, z, p, lambda, incr);
            incr = fmax2(1, floor(incr / 100));
        } while (oldincr > 1 && incr > lambda * 1e-15);
        return y;
    }
}


/***/ }),
/* 148 */
/***/ (function(module, exports, __nested_webpack_require_425272__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fixup_1 = __nested_webpack_require_425272__(20);
const irng_1 = __nested_webpack_require_425272__(7);
const irng_type_1 = __nested_webpack_require_425272__(14);
const timeseed_1 = __nested_webpack_require_425272__(10);
const QUALITY = 1009;
const SEED_LEN = 101;
const LL = 37;
const KK = 100;
const TT = 70;
const MM = 1073741824;
function mod_diff(x, y) {
    const d = new Uint32Array(3);
    d[0] = x;
    d[1] = y;
    d[2] = (d[0] - d[1]) & (MM - 1);
    return d[2];
}
function is_odd(x) {
    return x % 2 === 1;
}
class KnuthTAOCP2002 extends irng_1.IRNG {
    get KT_pos() {
        return this.m_seed[100];
    }
    set KT_pos(v) {
        this.m_seed[100] = v;
    }
    ran_array(aa, n) {
        let i;
        let j;
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
    ran_arr_cycle() {
        this.ran_array(this.ran_arr_buf, QUALITY);
        this.ran_arr_buf[KK] = -1;
    }
    ran_start(_seed) {
        let t;
        let j;
        const x = new Uint32Array(KK + KK - 1);
        const ss = new Uint32Array(1);
        const se = new Uint32Array([_seed]);
        ss[0] = (se[0] + 2) & (MM - 2);
        for (j = 0; j < KK; j++) {
            x[j] = ss[0];
            ss[0] = ss[0] << 1;
            if (ss[0] >= MM) {
                ss[0] = ss[0] - (MM - 2);
            }
        }
        x[1]++;
        for (ss[0] = se[0] & (MM - 1), t = TT - 1; t;) {
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
            }
            else {
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
    RNG_Init_KT2(_seed) {
        this.ran_start(_seed % 1073741821);
        this.KT_pos = 100;
    }
    KT_next() {
        if (this.KT_pos >= 100) {
            this.ran_arr_cycle();
            this.KT_pos = 0;
        }
        return this.ran_x[this.KT_pos++];
    }
    constructor(_seed = timeseed_1.timeseed()) {
        super(_seed);
    }
    _setup() {
        this._kind = irng_type_1.IRNGType.KNUTH_TAOCP2002;
        this._name = 'Knuth-TAOCP-2002';
        this.qualityBuffer = new ArrayBuffer(QUALITY * 4);
        this.ran_arr_buf = new Uint32Array(this.qualityBuffer);
        const buf = new ArrayBuffer(SEED_LEN * 4);
        this.m_seed = new Uint32Array(buf).fill(0);
        this.ran_x = this.m_seed;
    }
    internal_unif_rand() {
        const KT = 9.31322574615479e-10;
        return fixup_1.fixup(this.KT_next() * KT);
    }
    init(_seed = timeseed_1.timeseed()) {
        const s = new Uint32Array([0]);
        s[0] = _seed;
        for (let j = 0; j < 50; j++) {
            s[0] = 69069 * s[0] + 1;
        }
        this.RNG_Init_KT2(s[0]);
        super.init(_seed);
    }
    set seed(_seed) {
        if (_seed.length > this.m_seed.length || _seed.length === 0) {
            this.init(timeseed_1.timeseed());
            return;
        }
        this.m_seed.set(_seed);
    }
    get seed() {
        return Array.from(this.m_seed);
    }
}
exports.KnuthTAOCP2002 = KnuthTAOCP2002;


/***/ }),
/* 149 */
/***/ (function(module, exports, __nested_webpack_require_429484__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fixup_1 = __nested_webpack_require_429484__(20);
const irng_1 = __nested_webpack_require_429484__(7);
const irng_type_1 = __nested_webpack_require_429484__(14);
const timeseed_1 = __nested_webpack_require_429484__(10);
const taocp_1997_init_1 = __nested_webpack_require_429484__(150);
const MM = 1 << 30;
const KK = 100;
const LL = 37;
const QUALITY = 1009;
const qualityBuffer = new ArrayBuffer(QUALITY * 4);
const ran_arr_buf = new Uint32Array(qualityBuffer);
const KT = 9.31322574615479e-10;
const mod_diff = (x, y) => (x - y) & (MM - 1);
const SEED_LEN = 101;
class KnuthTAOCP extends irng_1.IRNG {
    get KT_pos() {
        return this.m_seed[100];
    }
    set KT_pos(v) {
        this.m_seed[100] = v;
    }
    fixupSeeds() {
        if (this.KT_pos <= 0)
            this.KT_pos = 100;
        const s = this.m_seed.slice(0, 100);
        if (s.find(v => !!v) === undefined)
            this.init(timeseed_1.timeseed());
        return;
    }
    KT_next() {
        const s = this.m_seed;
        if (this.KT_pos >= 100) {
            this.ran_arr_cycle();
            this.KT_pos = 0;
        }
        return s[this.KT_pos++];
    }
    RNG_Init_R_KT(_seed) {
        this.m_seed.set(taocp_1997_init_1.TAOCP1997init(_seed % 1073741821));
        this.KT_pos = 100;
        this.fixupSeeds();
    }
    ran_arr_cycle() {
        this.ran_array(ran_arr_buf, QUALITY);
        ran_arr_buf[KK] = -1;
        return ran_arr_buf[0];
    }
    ran_array(aa, n) {
        let i;
        let j;
        const ran_x = this.m_seed;
        for (j = 0; j < KK; j++)
            aa[j] = ran_x[j];
        for (; j < n; j++)
            aa[j] = mod_diff(aa[j - KK], aa[j - LL]);
        for (i = 0; i < LL; i++, j++)
            ran_x[i] = mod_diff(aa[j - KK], aa[j - LL]);
        for (; i < KK; i++, j++)
            ran_x[i] = mod_diff(aa[j - KK], ran_x[i - LL]);
    }
    constructor(_seed = timeseed_1.timeseed()) {
        super(_seed);
    }
    _setup() {
        this.buf = new ArrayBuffer(SEED_LEN * 4);
        this._kind = irng_type_1.IRNGType.KNUTH_TAOCP;
        this._name = 'Knuth-TAOCP';
        this.m_seed = new Int32Array(this.buf).fill(0);
    }
    init(_seed = timeseed_1.timeseed()) {
        const s = new Uint32Array([0]);
        s[0] = _seed;
        for (let j = 0; j < 50; j++) {
            s[0] = 69069 * s[0] + 1;
        }
        this.RNG_Init_R_KT(s[0]);
        super.init(_seed);
    }
    set seed(_seed) {
        if (_seed.length > this.m_seed.length || _seed.length === 0) {
            this.init(timeseed_1.timeseed());
            return;
        }
        this.m_seed.set(_seed);
    }
    internal_unif_rand() {
        return fixup_1.fixup(this.KT_next() * KT);
    }
    get seed() {
        return Array.from(this.m_seed);
    }
}
exports.KnuthTAOCP = KnuthTAOCP;


/***/ }),
/* 150 */
/***/ (function(module, exports, __nested_webpack_require_432391__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const r_func_1 = __nested_webpack_require_432391__(2);
const { trunc } = Math;
function TAOCP1997init(seed) {
    const KK = 100;
    const LL = 37;
    const MM = 1073741824;
    const MMF = 1073741824 - 1;
    const KKK = 199;
    const KKL = 63;
    let ss = seed - seed % 2 + 2;
    const X = new Uint32Array(KKK);
    const arr = r_func_1.seq(-1)();
    for (let j of arr(1, KK)) {
        X[j] = ss;
        ss = ss + ss;
        if (ss >= MM)
            ss = ss - MM + 2;
    }
    X[1]++;
    ss = seed;
    let T = 69;
    while (T > 0) {
        for (let j of arr(KK, 2)) {
            X[j + j] = X[j];
        }
        for (let j of arr(KKK, KKL + 1, -2)) {
            X[KKK - j] = X[j] - X[j] % 2;
        }
        for (let j of arr(KKK, KK + 1)) {
            if (X[j] % 2 === 1) {
                X[j - KKL] = (X[j - KKL] - X[j]) & MMF;
                X[j - KK] = (X[j - KK] - X[j]) & MMF;
            }
        }
        if (ss & 1) {
            for (let j of arr(KK, 1)) {
                X[j + 1] = X[j];
            }
            X[1 - 1] = X[KK + 1 - 1];
            if (X[KK + 1 - 1] % 2 === 1) {
                X[LL + 1 - 1] = (X[LL + 1 - 1] - X[KK + 1 - 1]) & MMF;
            }
        }
        if (ss) {
            ss = trunc(ss / 2);
        }
        else {
            T = T - 1;
        }
    }
    const res = new Uint32Array(KK);
    res.set(X.slice(LL, KK));
    res.set(X.slice(0, LL), KK - LL);
    return res;
}
exports.TAOCP1997init = TAOCP1997init;


/***/ }),
/* 151 */
/***/ (function(module, exports, __nested_webpack_require_434028__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const irng_1 = __nested_webpack_require_434028__(7);
const irng_type_1 = __nested_webpack_require_434028__(14);
const timeseed_1 = __nested_webpack_require_434028__(10);
const SEED_LEN = 6;
const a12 = 1403580;
const a13n = 810728;
const m2 = 4294944443;
const m1 = 4294967087;
const normc = 2.328306549295727688e-10;
const a21 = 527612;
const a23n = 1370589;
class LecuyerCMRG extends irng_1.IRNG {
    constructor(_seed = timeseed_1.timeseed()) {
        super(_seed);
    }
    _setup() {
        this._kind = irng_type_1.IRNGType.LECUYER_CMRG;
        this._name = "L'Ecuyer-CMRG";
        this.m_seed = new Int32Array(SEED_LEN).fill(0);
    }
    init(se = timeseed_1.timeseed()) {
        const s = new Int32Array([0]);
        s[0] = se;
        for (let j = 0; j < 50; j++) {
            s[0] = 69069 * s[0] + 1;
        }
        for (let j = 0; j < this.m_seed.length; j++) {
            s[0] = 69069 * s[0] + 1;
            while (s[0] >= m2) {
                s[0] = 69069 * s[0] + 1;
            }
            this.m_seed[j] = s[0];
        }
        super.init(se);
    }
    internal_unif_rand() {
        const II = this.m_seed;
        let k;
        let p1;
        let p2;
        p1 = a12 * new Uint32Array([II[1]])[0] - a13n * new Uint32Array([II[0]])[0];
        k = new Int32Array([p1 / m1])[0];
        p1 -= k * m1;
        if (p1 < 0.0)
            p1 += m1;
        II[0] = II[1];
        II[1] = II[2];
        II[2] = new Int32Array([p1])[0];
        p2 = a21 * new Uint32Array([II[5]])[0] - a23n * new Uint32Array([II[3]])[0];
        k = new Int32Array([p2 / m2])[0];
        p2 -= k * m2;
        if (p2 < 0.0)
            p2 += m2;
        II[3] = II[4];
        II[4] = II[5];
        II[5] = new Int32Array([p2])[0];
        return (p1 > p2 ? p1 - p2 : p1 - p2 + m1) * normc;
    }
    set seed(_seed) {
        if (_seed.length > this.m_seed.length || _seed.length === 0) {
            this.init(timeseed_1.timeseed());
            return;
        }
        this.m_seed.set(_seed);
    }
    get seed() {
        return Array.from(this.m_seed);
    }
}
exports.LecuyerCMRG = LecuyerCMRG;


/***/ }),
/* 152 */
/***/ (function(module, exports, __nested_webpack_require_436267__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fixup_1 = __nested_webpack_require_436267__(20);
const irng_1 = __nested_webpack_require_436267__(7);
const irng_type_1 = __nested_webpack_require_436267__(14);
const timeseed_1 = __nested_webpack_require_436267__(10);
const SEED_LEN = 2;
class MarsagliaMultiCarry extends irng_1.IRNG {
    fixupSeeds() {
        const s = this.m_seed;
        if (s[0] === 0)
            s[0] = 1;
        if (s[1] === 0)
            s[1] = 1;
        return;
    }
    constructor(_seed = timeseed_1.timeseed()) {
        super(_seed);
    }
    init(_seed = timeseed_1.timeseed()) {
        const s = new Int32Array([_seed]);
        for (let j = 0; j < 50; j++) {
            s[0] = 69069 * s[0] + 1;
        }
        for (let j = 0; j < this.m_seed.length; j++) {
            s[0] = 69069 * s[0] + 1;
            this.m_seed[j] = s[0];
        }
        this.fixupSeeds();
        super.init(_seed);
    }
    _setup() {
        this._kind = irng_type_1.IRNGType.MARSAGLIA_MULTICARRY;
        this._name = 'Marsaglia-MultiCarry';
        this.m_seed = new Int32Array(new ArrayBuffer(SEED_LEN * 4)).fill(0);
    }
    internal_unif_rand() {
        const s = this.m_seed;
        s[0] = 36969 * (s[0] & 65535) + (s[0] >>> 16);
        s[1] = 18000 * (s[1] & 65535) + (s[1] >>> 16);
        const un = new Uint32Array(SEED_LEN);
        un[0] = s[0] << 16;
        un[1] = s[1] & 0xffff;
        un[0] = un[0] ^ un[1];
        return fixup_1.fixup(un[0] * fixup_1.i2_32m1);
    }
    set seed(_seed) {
        if (_seed.length > this.m_seed.length || _seed.length === 0) {
            this.init(timeseed_1.timeseed());
            return;
        }
        this.m_seed.set(_seed);
    }
    get seed() {
        return Array.from(this.m_seed);
    }
}
exports.MarsagliaMultiCarry = MarsagliaMultiCarry;


/***/ }),
/* 153 */
/***/ (function(module, exports, __nested_webpack_require_438165__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mersenne_twister_1 = __nested_webpack_require_438165__(5);
const inormal_rng_1 = __nested_webpack_require_438165__(15);
const a = [
    0.0,
    0.03917609,
    0.07841241,
    0.1177699,
    0.1573107,
    0.1970991,
    0.2372021,
    0.2776904,
    0.3186394,
    0.3601299,
    0.4022501,
    0.4450965,
    0.4887764,
    0.5334097,
    0.5791322,
    0.626099,
    0.6744898,
    0.7245144,
    0.7764218,
    0.8305109,
    0.8871466,
    0.9467818,
    1.00999,
    1.077516,
    1.150349,
    1.229859,
    1.318011,
    1.417797,
    1.534121,
    1.67594,
    1.862732,
    2.153875
];
const d = [
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.2636843,
    0.2425085,
    0.2255674,
    0.2116342,
    0.1999243,
    0.1899108,
    0.1812252,
    0.1736014,
    0.1668419,
    0.1607967,
    0.1553497,
    0.1504094,
    0.1459026,
    0.14177,
    0.1379632,
    0.1344418,
    0.1311722,
    0.128126,
    0.1252791,
    0.1226109,
    0.1201036,
    0.1177417,
    0.1155119,
    0.1134023,
    0.1114027,
    0.1095039
];
const t = [
    7.673828e-4,
    0.00230687,
    0.003860618,
    0.005438454,
    0.007050699,
    0.008708396,
    0.01042357,
    0.01220953,
    0.01408125,
    0.01605579,
    0.0181529,
    0.02039573,
    0.02281177,
    0.02543407,
    0.02830296,
    0.03146822,
    0.03499233,
    0.03895483,
    0.04345878,
    0.04864035,
    0.05468334,
    0.06184222,
    0.07047983,
    0.08113195,
    0.09462444,
    0.1123001,
    0.136498,
    0.1716886,
    0.2276241,
    0.330498,
    0.5847031
];
const h = [
    0.03920617,
    0.03932705,
    0.03950999,
    0.03975703,
    0.04007093,
    0.04045533,
    0.04091481,
    0.04145507,
    0.04208311,
    0.04280748,
    0.04363863,
    0.04458932,
    0.04567523,
    0.04691571,
    0.04833487,
    0.04996298,
    0.05183859,
    0.05401138,
    0.05654656,
    0.0595313,
    0.06308489,
    0.06737503,
    0.07264544,
    0.07926471,
    0.08781922,
    0.09930398,
    0.1155599,
    0.1404344,
    0.1836142,
    0.2790016,
    0.7010474
];
class AhrensDieter extends inormal_rng_1.IRNGNormal {
    constructor(_rng = new mersenne_twister_1.MersenneTwister(0)) {
        super(_rng);
    }
    internal_norm_rand() {
        let u1 = this.rng.unif_rand();
        let s = 0.0;
        let w;
        let aa;
        let tt;
        let u2;
        let y;
        if (u1 > 0.5) {
            s = 1.0;
        }
        u1 = u1 + u1 - s;
        u1 *= 32.0;
        const i = new Int32Array([u1]);
        if (i[0] === 32)
            i[0] = 31;
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
                    if (u2 < u1)
                        break;
                    tt = u1;
                    u2 = this.rng.unif_rand();
                }
                u2 = this.rng.unif_rand();
            }
            w = (u2 - t[i[0] - 1]) * h[i[0] - 1];
        }
        else {
            i[0] = 6;
            aa = a[31];
            for (;;) {
                u1 = u1 + u1;
                if (u1 >= 1.0)
                    break;
                aa = aa + d[i[0] - 1];
                i[0] = i[0] + 1;
            }
            u1 = (u1 - 1.0);
            jump: for (;;) {
                w = u1 * d[i[0] - 1];
                tt = (w * 0.5 + aa) * w;
                for (;;) {
                    u2 = this.rng.unif_rand();
                    if (u2 > tt)
                        break jump;
                    u1 = this.rng.unif_rand();
                    if (u2 < u1)
                        break;
                    tt = u1;
                }
                u1 = this.rng.unif_rand();
            }
        }
        y = aa + w;
        return s === 1.0 ? -y : y;
    }
}
exports.AhrensDieter = AhrensDieter;


/***/ }),
/* 154 */
/***/ (function(module, exports, __nested_webpack_require_442461__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mersenne_twister_1 = __nested_webpack_require_442461__(5);
const inormal_rng_1 = __nested_webpack_require_442461__(15);
const { log, sqrt, cos, sin } = Math;
const DBL_MIN = 2.22507e-308;
const M_PI = 3.14159265358979323846264338327950288;
class BoxMuller extends inormal_rng_1.IRNGNormal {
    reset() {
        this.BM_norm_keep = 0;
    }
    constructor(_rng = new mersenne_twister_1.MersenneTwister(0)) {
        super(_rng);
        this.BM_norm_keep = 0;
        _rng.register('INIT', this.reset.bind(this));
    }
    internal_norm_rand() {
        let s = 0.0;
        let theta = 0;
        if (this.BM_norm_keep !== 0.0) {
            s = this.BM_norm_keep;
            this.BM_norm_keep = 0.0;
            return s;
        }
        else {
            theta = 2 * M_PI * this.rng.unif_rand();
            let R = sqrt(-2 * log(this.rng.unif_rand())) +
                10 * DBL_MIN;
            this.BM_norm_keep = R * sin(theta);
            return R * cos(theta);
        }
    }
}
exports.BoxMuller = BoxMuller;


/***/ }),
/* 155 */
/***/ (function(module, exports, __nested_webpack_require_443623__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mersenne_twister_1 = __nested_webpack_require_443623__(5);
const inormal_rng_1 = __nested_webpack_require_443623__(15);
const { log, sqrt, min: fmin2, max: fmax2, abs: fabs, exp } = Math;
class BuggyKindermanRamage extends inormal_rng_1.IRNGNormal {
    constructor(_rng = new mersenne_twister_1.MersenneTwister(0)) {
        super(_rng);
    }
    internal_norm_rand() {
        const A = 2.216035867166471;
        const C1 = 0.398942280401433;
        const C2 = 0.180025191068563;
        const g = (x) => C1 * exp(-x * x / 2.0) - C2 * (A - x);
        const u1 = this.rng.unif_rand();
        let u2;
        let u3;
        let tt;
        if (u1 < 0.884070402298758) {
            let u2 = this.rng.unif_rand();
            return A * (1.1311316354418 * u1 + u2 - 1);
        }
        if (u1 >= 0.973310954173898) {
            for (;;) {
                u2 = this.rng.unif_rand();
                u3 = this.rng.unif_rand();
                tt = A * A - 2 * log(u3);
                if (u2 * u2 < A * A / tt)
                    return u1 < 0.986655477086949 ? sqrt(tt) : -sqrt(tt);
            }
        }
        if (u1 >= 0.958720824790463) {
            for (;;) {
                u2 = this.rng.unif_rand();
                u3 = this.rng.unif_rand();
                tt = A - 0.63083480192196 * fmin2(u2, u3);
                if (fmax2(u2, u3) <= 0.755591531667601)
                    return u2 < u3 ? tt : -tt;
                if (0.034240503750111 * fabs(u2 - u3) <= g(tt))
                    return u2 < u3 ? tt : -tt;
            }
        }
        if (u1 >= 0.911312780288703) {
            for (;;) {
                u2 = this.rng.unif_rand();
                u3 = this.rng.unif_rand();
                tt = 0.479727404222441 + 1.10547366102207 * fmin2(u2, u3);
                if (fmax2(u2, u3) <= 0.87283497667179)
                    return u2 < u3 ? tt : -tt;
                if (0.049264496373128 * fabs(u2 - u3) <= g(tt))
                    return u2 < u3 ? tt : -tt;
            }
        }
        for (;;) {
            u2 = this.rng.unif_rand();
            u3 = this.rng.unif_rand();
            tt = 0.479727404222441 - 0.59550713801594 * fmin2(u2, u3);
            if (fmax2(u2, u3) <= 0.805577924423817)
                return u2 < u3 ? tt : -tt;
        }
    }
}
exports.BuggyKindermanRamage = BuggyKindermanRamage;


/***/ }),
/* 156 */
/***/ (function(module, exports, __nested_webpack_require_446112__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mersenne_twister_1 = __nested_webpack_require_446112__(5);
const inormal_rng_1 = __nested_webpack_require_446112__(15);
const { exp, log, sqrt, max: fmax2, min: fmin2, abs: fabs } = Math;
const A = 2.216035867166471;
const C1 = 0.398942280401433;
const C2 = 0.180025191068563;
class KindermanRamage extends inormal_rng_1.IRNGNormal {
    constructor(_rng = new mersenne_twister_1.MersenneTwister(0)) {
        super(_rng);
    }
    internal_norm_rand() {
        let u1;
        let u2;
        let u3;
        let tt;
        const g = (x) => C1 * exp(-x * x / 2.0) - C2 * (A - x);
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
                if (u2 * u2 < A * A / tt)
                    return u1 < 0.986655477086949 ? sqrt(tt) : -sqrt(tt);
            }
        }
        if (u1 >= 0.958720824790463) {
            for (;;) {
                u2 = this.rng.unif_rand();
                u3 = this.rng.unif_rand();
                tt = A - 0.63083480192196 * fmin2(u2, u3);
                if (fmax2(u2, u3) <= 0.755591531667601)
                    return u2 < u3 ? tt : -tt;
                if (0.034240503750111 * fabs(u2 - u3) <= g(tt))
                    return u2 < u3 ? tt : -tt;
            }
        }
        if (u1 >= 0.911312780288703) {
            for (;;) {
                u2 = this.rng.unif_rand();
                u3 = this.rng.unif_rand();
                tt = 0.479727404222441 + 1.10547366102207 * fmin2(u2, u3);
                if (fmax2(u2, u3) <= 0.87283497667179)
                    return u2 < u3 ? tt : -tt;
                if (0.049264496373128 * fabs(u2 - u3) <= g(tt))
                    return u2 < u3 ? tt : -tt;
            }
        }
        for (;;) {
            u2 = this.rng.unif_rand();
            u3 = this.rng.unif_rand();
            tt = 0.479727404222441 - 0.59550713801594 * fmin2(u2, u3);
            if (tt < 0)
                continue;
            if (fmax2(u2, u3) <= 0.805577924423817)
                return u2 < u3 ? tt : -tt;
            if (0.053377549506886 * fabs(u2 - u3) <= g(tt))
                return u2 < u3 ? tt : -tt;
        }
    }
}
exports.KindermanRamage = KindermanRamage;


/***/ }),
/* 157 */
/***/ (function(module, exports, __nested_webpack_require_448722__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fixup_1 = __nested_webpack_require_448722__(20);
const irng_1 = __nested_webpack_require_448722__(7);
const irng_type_1 = __nested_webpack_require_448722__(14);
const timeseed_1 = __nested_webpack_require_448722__(10);
const SEED_LEN = 2;
const buf = new ArrayBuffer(SEED_LEN * 4);
class SuperDuper extends irng_1.IRNG {
    constructor(_seed = timeseed_1.timeseed()) {
        super(_seed);
    }
    _setup() {
        this._kind = irng_type_1.IRNGType.SUPER_DUPER;
        this._name = 'Super-Duper';
        this.m_seed = new Int32Array(buf).fill(0);
    }
    internal_unif_rand() {
        const s = this.m_seed;
        s[0] ^= (s[0] >>> 15) & 0x1ffff;
        s[0] ^= s[0] << 17;
        s[1] *= 69069;
        const un = new Uint32Array(SEED_LEN);
        un[0] = s[0];
        un[1] = s[1];
        un[0] = un[0] ^ un[1];
        return fixup_1.fixup(un[0] * fixup_1.i2_32m1);
    }
    fixupSeeds() {
        const s = this.m_seed;
        if (s[0] === 0)
            s[0] = 1;
        s[1] |= 1;
        return;
    }
    init(_seed = timeseed_1.timeseed()) {
        const s = new Uint32Array([_seed]);
        for (let j = 0; j < 50; j++) {
            s[0] = 69069 * s[0] + 1;
        }
        for (let j = 0; j < this.m_seed.length; j++) {
            s[0] = 69069 * s[0] + 1;
            this.m_seed[j] = s[0];
        }
        this.fixupSeeds();
        super.init(_seed);
    }
    set seed(_seed) {
        if (_seed.length > this.m_seed.length || _seed.length === 0) {
            this.init(timeseed_1.timeseed());
            return;
        }
        this.m_seed.set(_seed);
    }
    get seed() {
        return Array.from(this.m_seed);
    }
}
exports.SuperDuper = SuperDuper;


/***/ }),
/* 158 */
/***/ (function(module, exports, __nested_webpack_require_450533__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const { trunc } = Math;
const frac = (x) => x - trunc(x);
const fixup_1 = __nested_webpack_require_450533__(20);
const irng_1 = __nested_webpack_require_450533__(7);
const irng_type_1 = __nested_webpack_require_450533__(14);
const timeseed_1 = __nested_webpack_require_450533__(10);
const SEED_LEN = 3;
class WichmannHill extends irng_1.IRNG {
    constructor(_seed = timeseed_1.timeseed()) {
        super(_seed);
    }
    _setup() {
        this._kind = irng_type_1.IRNGType.WICHMANN_HILL;
        this._name = 'Wichmann-Hill';
        const buf = new ArrayBuffer(SEED_LEN * 4);
        this.m_seed = new Uint32Array(buf).fill(0);
    }
    internal_unif_rand() {
        const s = this.m_seed;
        s[0] = (s[0] * 171) % 30269;
        s[1] = (s[1] * 172) % 30307;
        s[2] = (s[2] * 170) % 30323;
        let value = s[0] / 30269.0 + s[1] / 30307.0 + s[2] / 30323.0;
        return fixup_1.fixup(frac(value));
    }
    fixupSeeds() {
        const s = this.m_seed;
        s[0] = s[0] % 30269;
        s[1] = s[1] % 30307;
        s[2] = s[2] % 30323;
        if (s[0] === 0)
            s[0] = 1;
        if (s[1] === 0)
            s[1] = 1;
        if (s[2] === 0)
            s[2] = 1;
        return;
    }
    init(seed = timeseed_1.timeseed()) {
        const s = new Uint32Array([seed]);
        for (let j = 0; j < 50; j++) {
            s[0] = 69069 * s[0] + 1;
        }
        for (let j = 0; j < this.m_seed.length; j++) {
            s[0] = 69069 * s[0] + 1;
            this.m_seed[j] = s[0];
        }
        this.fixupSeeds();
        super.init(seed);
    }
    set seed(_seed) {
        if (_seed.length > this.m_seed.length || _seed.length === 0) {
            this.init(timeseed_1.timeseed());
            return;
        }
        this.m_seed.set(_seed);
    }
    get seed() {
        return Array.from(this.m_seed);
    }
}
exports.WichmannHill = WichmannHill;


/***/ }),
/* 159 */
/***/ (function(module, exports, __nested_webpack_require_452534__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _general_1 = __nested_webpack_require_452534__(0);
function csignrank(k, n, u, c, w) {
    if (k < 0 || k > u)
        return 0;
    if (k > c)
        k = u - k;
    if (n === 1)
        return 1;
    if (w[0] === 1)
        return w[k];
    w[0] = w[1] = 1;
    for (let j = 2; j < n + 1; ++j) {
        let i;
        let end = _general_1.imin2(j * (j + 1) / 2, c);
        for (i = end; i >= j; --i)
            w[i] += w[i - j];
    }
    return w[k];
}
exports.csignrank = csignrank;


/***/ }),
/* 160 */
/***/ (function(module, exports, __nested_webpack_require_453173__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_453173__(1);
const _general_1 = __nested_webpack_require_453173__(0);
const csignrank_1 = __nested_webpack_require_453173__(159);
const { round, trunc, abs: fabs, log, LN2: M_LN2 } = Math;
const { isNaN: ISNAN } = Number;
const printer_dsignrank = debug('dsignrank');
function dsignrank(xx, n, logX = false) {
    const rn = round(n);
    const u = rn * (rn + 1) / 2;
    const c = trunc(u / 2);
    const w = new Array(c + 1).fill(0);
    const fx = (Array.isArray(xx) ? xx : [xx]);
    const result = fx.map(x => {
        if (ISNAN(x) || ISNAN(n))
            return x + n;
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
        let d = _general_1.R_D_exp(logX, log(csignrank_1.csignrank(trunc(x), n, u, c, w)) - n * M_LN2);
        return d;
    });
    return (result.length === 1 ? result[0] : result);
}
exports.dsignrank = dsignrank;


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const { abs: fabs } = Math;
const { isNaN: ISNAN } = Number;
function fsign(x, signal) {
    if (ISNAN(x))
        return x;
    return signal ? fabs(x) : -fabs(x);
}
exports.fsign = fsign;


/***/ }),
/* 162 */
/***/ (function(module, exports, __nested_webpack_require_454784__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_454784__(1);
const _general_1 = __nested_webpack_require_454784__(0);
const r_func_1 = __nested_webpack_require_454784__(2);
const signrank_1 = __nested_webpack_require_454784__(73);
const { round, trunc, LN2: M_LN2, exp } = Math;
const { isNaN: ISNAN, isFinite: R_FINITE } = Number;
const printer_psignrank = debug('psignrank');
function psignrank(xx, n, lowerTail = true, logP = false) {
    const roundN = round(n);
    const u = roundN * (roundN + 1) / 2;
    const c = trunc(u / 2);
    const w = new Array(c + 1).fill(0);
    return r_func_1.map(xx)(x => {
        x = round(x + 1e-7);
        let lowerT = lowerTail;
        if (ISNAN(x) || ISNAN(n))
            return NaN;
        if (!R_FINITE(n))
            return _general_1.ML_ERR_return_NAN(printer_psignrank);
        if (n <= 0)
            return _general_1.ML_ERR_return_NAN(printer_psignrank);
        if (x < 0.0) {
            return _general_1.R_DT_0(lowerTail, logP);
        }
        if (x >= u) {
            return _general_1.R_DT_1(lowerTail, logP);
        }
        let f = exp(-roundN * M_LN2);
        let p = 0;
        if (x <= u / 2) {
            for (let i = 0; i <= x; i++) {
                p += signrank_1.csignrank(i, roundN, u, c, w) * f;
            }
        }
        else {
            x = n * (n + 1) / 2 - x;
            for (let i = 0; i < x; i++) {
                p += signrank_1.csignrank(i, roundN, u, c, w) * f;
            }
            lowerT = !lowerT;
        }
        return _general_1.R_DT_val(lowerT, logP, p);
    });
}
exports.psignrank = psignrank;


/***/ }),
/* 163 */
/***/ (function(module, exports, __nested_webpack_require_456489__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_456489__(1);
const _general_1 = __nested_webpack_require_456489__(0);
const expm1_1 = __nested_webpack_require_456489__(3);
const r_func_1 = __nested_webpack_require_456489__(2);
const signrank_1 = __nested_webpack_require_456489__(73);
const { round, trunc, LN2: M_LN2, exp } = Math;
const { isNaN: ISNAN, isFinite: R_FINITE, EPSILON: DBL_EPSILON } = Number;
const printer_qsignrank = debug('qsignrank');
function qsignrank(xx, n, lowerTail = true, logP = false) {
    const roundN = round(n);
    const u = roundN * (roundN + 1) / 2;
    const c = trunc(u / 2);
    const w = new Array(c + 1).fill(0);
    return r_func_1.map(xx)(x => {
        if (ISNAN(x) || ISNAN(n)) {
            return NaN;
        }
        if (!R_FINITE(n)) {
            return _general_1.ML_ERR_return_NAN(printer_qsignrank);
        }
        let rc = _general_1.R_Q_P01_check(logP, x);
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
        let f = exp(-n * M_LN2);
        let p = 0;
        let q = 0;
        if (x <= 0.5) {
            x = x - 10 * DBL_EPSILON;
            while (true) {
                p += signrank_1.csignrank(q, roundN, u, c, w) * f;
                if (p >= x)
                    break;
                q++;
            }
        }
        else {
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


/***/ }),
/* 164 */
/***/ (function(module, exports, __nested_webpack_require_458620__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_458620__(1);
const _general_1 = __nested_webpack_require_458620__(0);
const r_func_1 = __nested_webpack_require_458620__(2);
const { isNaN: ISNAN } = Number;
const { floor, round } = Math;
const printer_rsignrank = debug('rsignrank');
const sequence = r_func_1.seq()();
function rsignrank(nn, n, rng) {
    return r_func_1.map(sequence(nn))(() => {
        if (ISNAN(n))
            return n;
        const nRound = round(n);
        if (nRound < 0)
            return _general_1.ML_ERR_return_NAN(printer_rsignrank);
        if (nRound === 0)
            return 0;
        let r = 0.0;
        let k = floor(nRound);
        for (let i = 0; i < k;) {
            r += ++i * floor(rng.unif_rand() + 0.5);
        }
        return r;
    });
}
exports.rsignrank = rsignrank;


/***/ }),
/* 165 */
/***/ (function(module, exports, __nested_webpack_require_459548__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_459548__(1);
const _general_1 = __nested_webpack_require_459548__(0);
const lgamma_fn_1 = __nested_webpack_require_459548__(4);
const dnorm_1 = __nested_webpack_require_459548__(31);
const r_func_1 = __nested_webpack_require_459548__(2);
const dt_1 = __nested_webpack_require_459548__(45);
const pnt_1 = __nested_webpack_require_459548__(46);
const { isNaN: ISNAN, isFinite: R_FINITE, EPSILON: DBL_EPSILON } = Number;
const { abs: fabs, sqrt, log, exp } = Math;
const printer_dnt = debug('dnt');
function dnt(xx, df, ncp = 0, giveLog = false) {
    return r_func_1.map(xx)(x => {
        if (ISNAN(x) || ISNAN(df))
            return x + df;
        if (df <= 0.0)
            return _general_1.ML_ERR_return_NAN(printer_dnt);
        if (ncp === 0.0)
            return dt_1.dt(x, df, giveLog);
        if (!R_FINITE(x))
            return _general_1.R_D__0(giveLog);
        if (!R_FINITE(df) || df > 1e8)
            return dnorm_1.dnorm4(x, ncp, 1, giveLog);
        const u = function () {
            if (fabs(x) > sqrt(df * DBL_EPSILON)) {
                printer_dnt('fabs(x:%d)>sqrt(df*espsilon):%d', fabs(x), sqrt(df * DBL_EPSILON));
                return (log(df) -
                    log(fabs(x)) +
                    log(fabs(pnt_1.pnt(x * sqrt((df + 2) / df), df + 2, ncp, true, false) -
                        pnt_1.pnt(x, df, ncp, true, false))));
            }
            else {
                printer_dnt('fabs(x:%d)<=sqrt(df*espsilon):%d', fabs(x), sqrt(df * DBL_EPSILON));
                return (lgamma_fn_1.lgammafn((df + 1) / 2) -
                    lgamma_fn_1.lgammafn(df / 2) -
                    (_general_1.M_LN_SQRT_PI + 0.5 * (log(df) + ncp * ncp)));
            }
        }();
        printer_dnt('u=%d, giveLog=%s', u, giveLog);
        return giveLog ? u : exp(u);
    });
}
exports.dnt = dnt;


/***/ }),
/* 166 */
/***/ (function(module, exports, __nested_webpack_require_461481__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_461481__(1);
const _general_1 = __nested_webpack_require_461481__(0);
const expm1_1 = __nested_webpack_require_461481__(3);
const qnorm_1 = __nested_webpack_require_461481__(6);
const r_func_1 = __nested_webpack_require_461481__(2);
const pnt_1 = __nested_webpack_require_461481__(46);
const qt_1 = __nested_webpack_require_461481__(75);
const { abs: fabs, max: fmax2, min: fmin2 } = Math;
const { MAX_VALUE: DBL_MAX, EPSILON: DBL_EPSILON, isFinite: R_FINITE, POSITIVE_INFINITY: ML_POSINF, NEGATIVE_INFINITY: ML_NEGINF, isNaN: ISNAN } = Number;
const printer = debug('qnt');
function qnt(pp, df, ncp, lowerTail, logP) {
    return r_func_1.map(pp)(p => _qnt(p, df, ncp, lowerTail, logP));
}
exports.qnt = qnt;
function _qnt(p, df, ncp, lower_tail, log_p) {
    const accu = 1e-13;
    const Eps = 1e-11;
    let ux;
    let lx;
    let nx;
    let pp;
    if (ISNAN(p) || ISNAN(df) || ISNAN(ncp))
        return p + df + ncp;
    if (df <= 0.0)
        return _general_1.ML_ERR_return_NAN(printer);
    if (ncp === 0.0 && df >= 1.0)
        return qt_1.qt(p, df, lower_tail, log_p);
    let rc = _general_1.R_Q_P01_boundaries(lower_tail, log_p, p, ML_NEGINF, ML_POSINF);
    if (rc !== undefined) {
        return rc;
    }
    if (!R_FINITE(df))
        return qnorm_1.qnorm(p, ncp, 1, lower_tail, log_p);
    p = expm1_1.R_DT_qIv(lower_tail, log_p, p);
    if (p > 1 - DBL_EPSILON)
        return ML_POSINF;
    pp = fmin2(1 - DBL_EPSILON, p * (1 + Eps));
    for (ux = fmax2(1, ncp); ux < DBL_MAX && pnt_1.pnt(ux, df, ncp, true, false) < pp; ux *= 2)
        ;
    pp = p * (1 - Eps);
    for (lx = fmin2(-1, -ncp); lx > -DBL_MAX && pnt_1.pnt(lx, df, ncp, true, false) > pp; lx *= 2)
        ;
    do {
        nx = 0.5 * (lx + ux);
        if (pnt_1.pnt(nx, df, ncp, true, false) > p)
            ux = nx;
        else
            lx = nx;
    } while (ux - lx > accu * fmax2(fabs(lx), fabs(ux)));
    return 0.5 * (lx + ux);
}


/***/ }),
/* 167 */
/***/ (function(module, exports, __nested_webpack_require_463511__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_463511__(1);
const rchisq_1 = __nested_webpack_require_463511__(13);
const _general_1 = __nested_webpack_require_463511__(0);
const r_func_1 = __nested_webpack_require_463511__(2);
const { sqrt } = Math;
const { isNaN: ISNAN, isFinite: R_FINITE } = Number;
const sequence = r_func_1.seq()();
const printer = debug('rt');
function rt(n, df, rng) {
    return r_func_1.map(sequence(n))(() => {
        if (ISNAN(df) || df <= 0.0) {
            return _general_1.ML_ERR_return_NAN(printer);
        }
        if (!R_FINITE(df))
            return rng.norm_rand();
        else {
            let num = rng.norm_rand();
            return num / sqrt(rchisq_1.rchisq(1, df, rng) / df);
        }
    });
}
exports.rt = rt;


/***/ }),
/* 168 */
/***/ (function(module, exports, __nested_webpack_require_464368__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const { sqrt, log } = Math;
function qinv(p, c, v) {
    const p0 = 0.322232421088;
    const q0 = 0.99348462606e-1;
    const p1 = -1.0;
    const q1 = 0.588581570495;
    const p2 = -0.342242088547;
    const q2 = 0.531103462366;
    const p3 = -0.204231210125;
    const q3 = 0.10353775285;
    const p4 = -0.453642210148e-4;
    const q4 = 0.38560700634e-2;
    const c1 = 0.8832;
    const c2 = 0.2368;
    const c3 = 1.214;
    const c4 = 1.208;
    const c5 = 1.4142;
    const vmax = 120.0;
    let ps;
    let q;
    let t;
    let yi;
    ps = 0.5 - 0.5 * p;
    yi = sqrt(log(1.0 / (ps * ps)));
    t =
        yi +
            ((((yi * p4 + p3) * yi + p2) * yi + p1) * yi + p0) /
                ((((yi * q4 + q3) * yi + q2) * yi + q1) * yi + q0);
    if (v < vmax)
        t += (t * t * t + t) / v / 4.0;
    q = c1 - c2 * t;
    if (v < vmax)
        q += -c3 / v + c4 * t / v;
    return t * (q * log(c - 1.0) + c5);
}
const debug = __nested_webpack_require_464368__(1);
const _general_1 = __nested_webpack_require_464368__(0);
const expm1_1 = __nested_webpack_require_464368__(3);
const r_func_1 = __nested_webpack_require_464368__(2);
const ptukey_1 = __nested_webpack_require_464368__(77);
const { isNaN: ISNAN, POSITIVE_INFINITY: ML_POSINF } = Number;
const { abs: fabs, max: fmax2 } = Math;
const printer = debug('qtukey');
function qtukey(pp, rr, cc, df, lower_tail = true, log_p = false) {
    return r_func_1.map(pp)(p => _qtukey(p, rr, cc, df, lower_tail, log_p));
}
exports.qtukey = qtukey;
function _qtukey(p, rr, cc, df, lower_tail, log_p) {
    const eps = 0.0001;
    const maxiter = 50;
    let ans = 0.0;
    let valx0;
    let valx1;
    let x0;
    let x1;
    let xabs;
    let iter;
    if (ISNAN(p) || ISNAN(rr) || ISNAN(cc) || ISNAN(df)) {
        _general_1.ML_ERROR(_general_1.ME.ME_DOMAIN, 'qtukey', printer);
        return NaN;
    }
    if (df < 2 || rr < 1 || cc < 2)
        return _general_1.ML_ERR_return_NAN(printer);
    let rc = _general_1.R_Q_P01_boundaries(lower_tail, log_p, p, 0, ML_POSINF);
    if (rc !== undefined) {
        return rc;
    }
    p = expm1_1.R_DT_qIv(lower_tail, log_p, p);
    x0 = qinv(p, cc, df);
    valx0 = ptukey_1._ptukey(x0, rr, cc, df, true, false) - p;
    if (valx0 > 0.0)
        x1 = fmax2(0.0, x0 - 1.0);
    else
        x1 = x0 + 1.0;
    valx1 = ptukey_1._ptukey(x1, rr, cc, df, true, false) - p;
    for (iter = 1; iter < maxiter; iter++) {
        ans = x1 - valx1 * (x1 - x0) / (valx1 - valx0);
        valx0 = valx1;
        x0 = x1;
        if (ans < 0.0) {
            ans = 0.0;
            valx1 = -p;
        }
        valx1 =
            ptukey_1._ptukey(ans, rr, cc, df, true, false) - p;
        x1 = ans;
        xabs = fabs(x1 - x0);
        if (xabs < eps)
            return ans;
    }
    _general_1.ML_ERROR(_general_1.ME.ME_NOCONV, 'qtukey', printer);
    return ans;
}


/***/ }),
/* 169 */
/***/ (function(module, exports, __nested_webpack_require_467334__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _general_1 = __nested_webpack_require_467334__(0);
const pnorm_1 = __nested_webpack_require_467334__(19);
const { exp, pow } = Math;
const bb = 8;
const C2 = -50;
const wlar = 3;
const wincr1 = 2;
const wincr2 = 3;
const nleg = 12;
const ihalf = 6;
const xleg = [
    0.981560634246719250690549090149,
    0.904117256370474856678465866119,
    0.769902674194304687036893833213,
    0.587317954286617447296702418941,
    0.367831498998180193752691536644,
    0.125233408511468915472441369464
];
const aleg = [
    0.047175336386511827194615961485,
    0.106939325995318430960254718194,
    0.160078328543346226334652529543,
    0.20316742672306592174906445581,
    0.233492536538354808760849898925,
    0.249147045813402785000562436043
];
const C3 = 60;
const C1 = -30;
function wprob(w, rr, cc) {
    let a;
    let ac;
    let pr_w;
    let b;
    let binc;
    let c;
    let cc1;
    let pminus;
    let pplus;
    let qexpo;
    let qsqz;
    let rinsum;
    let wi;
    let wincr;
    let xx;
    let blb;
    let bub;
    let einsum;
    let elsum;
    let j;
    qsqz = w * 0.5;
    if (qsqz >= bb) {
        return 1.0;
    }
    pr_w =
        2 * pnorm_1.pnorm5(qsqz, 0, 1, true, false) - 1;
    if (pr_w >= exp(C2 / cc))
        pr_w = pow(pr_w, cc);
    else
        pr_w = 0.0;
    if (w > wlar)
        wincr = wincr1;
    else
        wincr = wincr2;
    blb = qsqz;
    binc = (bb - qsqz) / wincr;
    bub = blb + binc;
    einsum = 0.0;
    cc1 = cc - 1.0;
    for (wi = 1; wi <= wincr; wi++) {
        elsum = 0.0;
        a = 0.5 * (bub + blb);
        b = 0.5 * (bub - blb);
        for (let jj = 1; jj <= nleg; jj++) {
            if (ihalf < jj) {
                j = nleg - jj + 1;
                xx = xleg[j - 1];
            }
            else {
                j = jj;
                xx = -xleg[j - 1];
            }
            c = b * xx;
            ac = a + c;
            qexpo = ac * ac;
            if (qexpo > C3)
                break;
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
    if (pr_w <= exp(C1 / rr))
        return 0;
    pr_w = pow(pr_w, rr);
    if (pr_w >= 1)
        return 1;
    return pr_w;
}
exports.wprob = wprob;


/***/ }),
/* 170 */
/***/ (function(module, exports, __nested_webpack_require_470098__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _general_1 = __nested_webpack_require_470098__(0);
const r_func_1 = __nested_webpack_require_470098__(2);
const { isNaN: ISNAN } = Number;
const { log } = Math;
function dunif(x, min = 0, max = 1, logP = false) {
    return r_func_1.map(x)(fx => {
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


/***/ }),
/* 171 */
/***/ (function(module, exports, __nested_webpack_require_470761__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_470761__(1);
const printer = debug('punif');
const _general_1 = __nested_webpack_require_470761__(0);
const r_func_1 = __nested_webpack_require_470761__(2);
const { isNaN: ISNAN, isFinite: R_FINITE } = Number;
function punif(q, min = 0, max = 1, lowerTail = true, logP = false) {
    return r_func_1.map(q)(fx => {
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


/***/ }),
/* 172 */
/***/ (function(module, exports, __nested_webpack_require_471923__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _general_1 = __nested_webpack_require_471923__(0);
const debug = __nested_webpack_require_471923__(1);
const expm1_1 = __nested_webpack_require_471923__(3);
const r_func_1 = __nested_webpack_require_471923__(2);
const { isNaN: ISNAN, isFinite: R_FINITE } = Number;
const printer = debug('qunif');
function qunif(p, min = 0, max = 1, lowerTail = true, logP = false) {
    return r_func_1.map(p)(fp => {
        if (ISNAN(fp) || ISNAN(min) || ISNAN(max))
            return NaN;
        let rc = _general_1.R_Q_P01_check(logP, fp);
        if (rc !== undefined) {
            return rc;
        }
        if (!R_FINITE(min) || !R_FINITE(max))
            return _general_1.ML_ERR_return_NAN(printer);
        if (max < min)
            return _general_1.ML_ERR_return_NAN(printer);
        if (max === min)
            return min;
        return min + expm1_1.R_DT_qIv(lowerTail, logP, fp) * (max - min);
    });
}
exports.qunif = qunif;


/***/ }),
/* 173 */
/***/ (function(module, exports, __nested_webpack_require_472966__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_472966__(1);
const _general_1 = __nested_webpack_require_472966__(0);
const { isFinite: R_FINITE } = Number;
const printer = debug('runif');
function runif(n = 1, min = 0, max = 1, u) {
    if (!(R_FINITE(min) && R_FINITE(max) && max > min)) {
        return _general_1.ML_ERR_return_NAN(printer);
    }
    let result = new Array(n).fill(0).map(() => {
        const s = u.unif_rand();
        return (max - min) * s + min;
    });
    return result.length === 1 ? result[0] : result;
}
exports.runif = runif;


/***/ }),
/* 174 */
/***/ (function(module, exports, __nested_webpack_require_473645__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_473645__(1);
const _general_1 = __nested_webpack_require_473645__(0);
const r_func_1 = __nested_webpack_require_473645__(2);
const { pow, log, exp } = Math;
const { isNaN: ISNAN, isFinite: R_FINITE, POSITIVE_INFINITY: ML_POSINF } = Number;
const printer = debug('dweilbull');
function dweibull(xx, shape, scale = 1, give_log = false) {
    return r_func_1.map(xx)(x => {
        if (ISNAN(x) || ISNAN(shape) || ISNAN(scale))
            return x + shape + scale;
        if (shape <= 0 || scale <= 0)
            return _general_1.ML_ERR_return_NAN(printer);
        if (x < 0)
            return _general_1.R_D__0(give_log);
        if (!R_FINITE(x))
            return _general_1.R_D__0(give_log);
        if (x === 0 && shape < 1)
            return ML_POSINF;
        let tmp1 = pow(x / scale, shape - 1);
        let tmp2 = tmp1 * (x / scale);
        return give_log
            ? -tmp2 + log(shape * tmp1 / scale)
            : shape * tmp1 * exp(-tmp2) / scale;
    });
}
exports.dweibull = dweibull;


/***/ }),
/* 175 */
/***/ (function(module, exports, __nested_webpack_require_474808__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_474808__(1);
const _general_1 = __nested_webpack_require_474808__(0);
const expm1_1 = __nested_webpack_require_474808__(3);
const r_func_1 = __nested_webpack_require_474808__(2);
const { expm1, pow } = Math;
const { isNaN: ISNAN } = Number;
const printer = debug('pweibull');
function pweibull(xx, shape, scale = 1, lower_tail = true, log_p = false) {
    return r_func_1.map(xx)(x => {
        if (ISNAN(x) || ISNAN(shape) || ISNAN(scale))
            return x + shape + scale;
        if (shape <= 0 || scale <= 0)
            return _general_1.ML_ERR_return_NAN(printer);
        if (x <= 0) {
            return _general_1.R_DT_0(lower_tail, log_p);
        }
        x = -pow(x / scale, shape);
        return lower_tail ? (log_p ? expm1_1.R_Log1_Exp(x) : -expm1(x)) : _general_1.R_D_exp(log_p, x);
    });
}
exports.pweibull = pweibull;


/***/ }),
/* 176 */
/***/ (function(module, exports, __nested_webpack_require_475791__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_475791__(1);
const _general_1 = __nested_webpack_require_475791__(0);
const expm1_1 = __nested_webpack_require_475791__(3);
const r_func_1 = __nested_webpack_require_475791__(2);
const { pow } = Math;
const { isNaN: ISNAN, POSITIVE_INFINITY: ML_POSINF } = Number;
const printer = debug('qweibull');
function qweibull(pp, shape, scale = 1, lowerTail = true, logP = false) {
    return r_func_1.map(pp)(p => {
        if (ISNAN(p) || ISNAN(shape) || ISNAN(scale))
            return p + shape + scale;
        if (shape <= 0 || scale <= 0)
            return _general_1.ML_ERR_return_NAN(printer);
        let rc = _general_1.R_Q_P01_boundaries(lowerTail, logP, p, 0, ML_POSINF);
        if (rc !== undefined) {
            return rc;
        }
        return scale * pow(-expm1_1.R_DT_Clog(lowerTail, logP, p), 1 / shape);
    });
}
exports.qweibull = qweibull;


/***/ }),
/* 177 */
/***/ (function(module, exports, __nested_webpack_require_476792__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_476792__(1);
const _general_1 = __nested_webpack_require_476792__(0);
const r_func_1 = __nested_webpack_require_476792__(2);
const { log, pow } = Math;
const { isFinite: R_FINITE } = Number;
const printer = debug('rweibull');
function rweibull(n, shape, scale = 1, rng) {
    const result = new Array(n).fill(0).map(() => {
        if (!R_FINITE(shape) || !R_FINITE(scale) || shape <= 0 || scale <= 0) {
            if (scale === 0)
                return 0;
            return _general_1.ML_ERR_return_NAN(printer);
        }
        return scale * pow(-log(rng.unif_rand()), 1.0 / shape);
    });
    return r_func_1.possibleScalar(result);
}
exports.rweibull = rweibull;


/***/ }),
/* 178 */
/***/ (function(module, exports, __nested_webpack_require_477620__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_477620__(1);
const _general_1 = __nested_webpack_require_477620__(0);
const choose_1 = __nested_webpack_require_477620__(27);
const r_func_1 = __nested_webpack_require_477620__(2);
const cwilcox_1 = __nested_webpack_require_477620__(49);
const WilcoxonCache_1 = __nested_webpack_require_477620__(48);
const { round: R_forceint, abs: fabs, log } = Math;
const { isNaN: ISNAN } = Number;
const printer_dwilcox = debug('dwilcox');
function dwilcox(xx, m, n, giveLog = false) {
    m = R_forceint(m);
    n = R_forceint(n);
    return r_func_1.map(xx)(x => {
        const w = new WilcoxonCache_1.WilcoxonCache();
        if (ISNAN(x) || ISNAN(m) || ISNAN(n)) {
            return (x + m + n);
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
        return giveLog
            ? log(cwilcox_1.cwilcox(x, m, n, w)) - choose_1.internal_lchoose(m + n, n)
            : cwilcox_1.cwilcox(x, m, n, w) / choose_1.internal_choose(m + n, n);
    });
}
exports.dwilcox = dwilcox;


/***/ }),
/* 179 */
/***/ (function(module, exports, __nested_webpack_require_478990__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_478990__(1);
const _general_1 = __nested_webpack_require_478990__(0);
const choose_1 = __nested_webpack_require_478990__(27);
const r_func_1 = __nested_webpack_require_478990__(2);
const WilcoxonCache_1 = __nested_webpack_require_478990__(48);
const cwilcox_1 = __nested_webpack_require_478990__(49);
const { round: R_forceint, floor } = Math;
const { isNaN: ISNAN, isFinite: R_FINITE } = Number;
const printer_pwilcox = debug('pwilcox');
function pwilcox(qq, m, n, lowerTail = true, logP = false) {
    m = R_forceint(m);
    n = R_forceint(n);
    return r_func_1.map(qq)(q => {
        const w = new WilcoxonCache_1.WilcoxonCache();
        let lower_tail = lowerTail;
        if (ISNAN(q) || ISNAN(m) || ISNAN(n))
            return q + m + n;
        if (!R_FINITE(m) || !R_FINITE(n))
            return _general_1.ML_ERR_return_NAN(printer_pwilcox);
        if (m <= 0 || n <= 0)
            return _general_1.ML_ERR_return_NAN(printer_pwilcox);
        q = floor(q + 1e-7);
        if (q < 0.0)
            return _general_1.R_DT_0(lower_tail, logP);
        if (q >= m * n)
            return _general_1.R_DT_1(lower_tail, logP);
        let c = choose_1.internal_choose(m + n, n);
        let p = 0;
        if (q <= m * n / 2) {
            for (let i = 0; i <= q; i++)
                p += cwilcox_1.cwilcox(i, m, n, w) / c;
        }
        else {
            q = m * n - q;
            for (let i = 0; i < q; i++)
                p += cwilcox_1.cwilcox(i, m, n, w) / c;
            lower_tail = !lower_tail;
        }
        return _general_1.R_DT_val(lower_tail, logP, p);
    });
}
exports.pwilcox = pwilcox;


/***/ }),
/* 180 */
/***/ (function(module, exports, __nested_webpack_require_480728__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_480728__(1);
const _general_1 = __nested_webpack_require_480728__(0);
const expm1_1 = __nested_webpack_require_480728__(3);
const r_func_1 = __nested_webpack_require_480728__(2);
const cwilcox_1 = __nested_webpack_require_480728__(49);
const WilcoxonCache_1 = __nested_webpack_require_480728__(48);
const choose_1 = __nested_webpack_require_480728__(27);
const { round: R_forceint, trunc } = Math;
const { isNaN: ISNAN, isFinite: R_FINITE, EPSILON: DBL_EPSILON } = Number;
const printer_qwilcox = debug('qwilcox');
function qwilcox(xx, m, n, lowerTail = true, logP = false) {
    m = R_forceint(m);
    n = R_forceint(n);
    const w = new WilcoxonCache_1.WilcoxonCache();
    return r_func_1.map(xx)(x => {
        if (ISNAN(x) || ISNAN(m) || ISNAN(n))
            return x + m + n;
        if (!R_FINITE(x) || !R_FINITE(m) || !R_FINITE(n))
            return _general_1.ML_ERR_return_NAN(printer_qwilcox);
        _general_1.R_Q_P01_check(logP, x);
        if (m <= 0 || n <= 0)
            return _general_1.ML_ERR_return_NAN(printer_qwilcox);
        if (x === _general_1.R_DT_0(lowerTail, logP))
            return 0;
        if (x === _general_1.R_DT_1(lowerTail, logP))
            return m * n;
        if (logP || !lowerTail)
            x = expm1_1.R_DT_qIv(lowerTail, logP, x);
        let c = choose_1.internal_choose(m + n, n);
        let p = 0;
        let q = 0;
        if (x <= 0.5) {
            x = x - 10 * DBL_EPSILON;
            while (true) {
                p += cwilcox_1.cwilcox(q, m, n, w) / c;
                if (p >= x)
                    break;
                q++;
            }
        }
        else {
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


/***/ }),
/* 181 */
/***/ (function(module, exports, __nested_webpack_require_482806__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug = __nested_webpack_require_482806__(1);
const _general_1 = __nested_webpack_require_482806__(0);
const r_func_1 = __nested_webpack_require_482806__(2);
const printer_rwilcox = debug('rwilcox');
const { round: R_forceint, trunc, floor } = Math;
const { isNaN: ISNAN } = Number;
function rwilcox(N, m, n, rng) {
    const result = new Array(N).fill(0).map(() => {
        if (ISNAN(m) || ISNAN(n))
            return m + n;
        m = R_forceint(m);
        n = R_forceint(n);
        if (m < 0 || n < 0)
            return _general_1.ML_ERR_return_NAN(printer_rwilcox);
        if (m === 0 || n === 0)
            return 0;
        let r = 0.0;
        let k = trunc(m + n);
        let x = r_func_1.seq()()(0, k - 1);
        printer_rwilcox(`------v`);
        for (let i = 0; i < n; i++) {
            let j = floor(k * rng.unif_rand());
            r += x[j];
            x[j] = x[--k];
            printer_rwilcox('i:%d,\tn:%d\tj:%d\tk:%d\tr:%d\tx:%o', i, n, j, k, x);
        }
        return r - n * (n - 1) / 2;
    });
    return r_func_1.possibleScalar(result);
}
exports.rwilcox = rwilcox;


/***/ }),
/* 182 */
/***/ (function(module, exports, __nested_webpack_require_484034__) {

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __nested_webpack_require_484034__(78);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
  '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
  '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
  '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
  '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
  '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
  '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
  '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
  '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
  '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
  '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
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
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
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
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

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
    return window.localStorage;
  } catch (e) {}
}


/***/ }),
/* 183 */
/***/ (function(module, exports, __nested_webpack_require_489825__) {

/**
 * Module dependencies.
 */

var tty = __nested_webpack_require_489825__(186);
var util = __nested_webpack_require_489825__(187);

/**
 * This is the Node.js implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __nested_webpack_require_489825__(78);
exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [ 6, 2, 3, 4, 5, 1 ];

try {
  var supportsColor = __nested_webpack_require_489825__(185);
  if (supportsColor && supportsColor.level >= 2) {
    exports.colors = [
      20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68,
      69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134,
      135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171,
      172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204,
      205, 206, 207, 208, 209, 214, 215, 220, 221
    ];
  }
} catch (err) {
  // swallow - we only care if `supports-color` is available; it doesn't have to be.
}

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(function (key) {
  return /^debug_/i.test(key);
}).reduce(function (obj, key) {
  // camel-case
  var prop = key
    .substring(6)
    .toLowerCase()
    .replace(/_([a-z])/g, function (_, k) { return k.toUpperCase() });

  // coerce string value into JS value
  var val = process.env[key];
  if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
  else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
  else if (val === 'null') val = null;
  else val = Number(val);

  obj[prop] = val;
  return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts
    ? Boolean(exports.inspectOpts.colors)
    : tty.isatty(process.stderr.fd);
}

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

exports.formatters.o = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts)
    .split('\n').map(function(str) {
      return str.trim()
    }).join(' ');
};

/**
 * Map %o to `util.inspect()`, allowing multiple lines if needed.
 */

exports.formatters.O = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var name = this.namespace;
  var useColors = this.useColors;

  if (useColors) {
    var c = this.color;
    var colorCode = '\u001b[3' + (c < 8 ? c : '8;5;' + c);
    var prefix = '  ' + colorCode + ';1m' + name + ' ' + '\u001b[0m';

    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push(colorCode + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
  } else {
    args[0] = getDate() + name + ' ' + args[0];
  }
}

function getDate() {
  if (exports.inspectOpts.hideDate) {
    return '';
  } else {
    return new Date().toISOString() + ' ';
  }
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
  if (null == namespaces) {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  } else {
    process.env.DEBUG = namespaces;
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

function init (debug) {
  debug.inspectOpts = {};

  var keys = Object.keys(exports.inspectOpts);
  for (var i = 0; i < keys.length; i++) {
    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }
}

/**
 * Enable namespaces listed in `process.env.DEBUG` initially.
 */

exports.enable(load());


/***/ }),
/* 184 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
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

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
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
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
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
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
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
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),
/* 185 */
/***/ (function(module, exports) {

module.exports = __webpack_require__(117);

/***/ }),
/* 186 */
/***/ (function(module, exports) {

module.exports = __webpack_require__(60);

/***/ }),
/* 187 */
/***/ (function(module, exports) {

module.exports = __webpack_require__(61);

/***/ })
/******/ ]);
});
//# sourceMappingURL=libR.min.js.map

/***/ }),
/* 60 */
/***/ ((__unused_webpack_module, exports) => {

exports.isatty = function () { return false; };

function ReadStream() {
  throw new Error('tty.ReadStream is not implemented');
}
exports.ReadStream = ReadStream;

function WriteStream() {
  throw new Error('tty.WriteStream is not implemented');
}
exports.WriteStream = WriteStream;


/***/ }),
/* 61 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// Copyright Joyent, Inc. and other Node contributors.
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
var debugEnvRegex = /^$/;

if (false) // removed by dead control flow
{ var debugEnv; }
exports.debuglog = function(set) {
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (debugEnvRegex.test(set)) {
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
          }).join('\n').slice(2);
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
      name = name.slice(1, -1);
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
exports.types = __webpack_require__(62);

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
exports.types.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;
exports.types.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;
exports.types.isNativeError = isError;

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

exports.isBuffer = __webpack_require__(115);

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
exports.inherits = __webpack_require__(116);

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
      .then(function(ret) { process.nextTick(cb.bind(null, null, ret)) },
            function(rej) { process.nextTick(callbackifyOnRejected.bind(null, rej, cb)) });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;


/***/ }),
/* 62 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/util/types.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9



var isArgumentsObject = __webpack_require__(63);
var isGeneratorFunction = __webpack_require__(100);
var whichTypedArray = __webpack_require__(104);
var isTypedArray = __webpack_require__(114);

function uncurryThis(f) {
  return f.call.bind(f);
}

var BigIntSupported = typeof BigInt !== 'undefined';
var SymbolSupported = typeof Symbol !== 'undefined';

var ObjectToString = uncurryThis(Object.prototype.toString);

var numberValue = uncurryThis(Number.prototype.valueOf);
var stringValue = uncurryThis(String.prototype.valueOf);
var booleanValue = uncurryThis(Boolean.prototype.valueOf);

if (BigIntSupported) {
  var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
}

if (SymbolSupported) {
  var symbolValue = uncurryThis(Symbol.prototype.valueOf);
}

function checkBoxedPrimitive(value, prototypeValueOf) {
  if (typeof value !== 'object') {
    return false;
  }
  try {
    prototypeValueOf(value);
    return true;
  } catch(e) {
    return false;
  }
}

exports.isArgumentsObject = isArgumentsObject;
exports.isGeneratorFunction = isGeneratorFunction;
exports.isTypedArray = isTypedArray;

// Taken from here and modified for better browser support
// https://github.com/sindresorhus/p-is-promise/blob/cda35a513bda03f977ad5cde3a079d237e82d7ef/index.js
function isPromise(input) {
	return (
		(
			typeof Promise !== 'undefined' &&
			input instanceof Promise
		) ||
		(
			input !== null &&
			typeof input === 'object' &&
			typeof input.then === 'function' &&
			typeof input.catch === 'function'
		)
	);
}
exports.isPromise = isPromise;

function isArrayBufferView(value) {
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    return ArrayBuffer.isView(value);
  }

  return (
    isTypedArray(value) ||
    isDataView(value)
  );
}
exports.isArrayBufferView = isArrayBufferView;


function isUint8Array(value) {
  return whichTypedArray(value) === 'Uint8Array';
}
exports.isUint8Array = isUint8Array;

function isUint8ClampedArray(value) {
  return whichTypedArray(value) === 'Uint8ClampedArray';
}
exports.isUint8ClampedArray = isUint8ClampedArray;

function isUint16Array(value) {
  return whichTypedArray(value) === 'Uint16Array';
}
exports.isUint16Array = isUint16Array;

function isUint32Array(value) {
  return whichTypedArray(value) === 'Uint32Array';
}
exports.isUint32Array = isUint32Array;

function isInt8Array(value) {
  return whichTypedArray(value) === 'Int8Array';
}
exports.isInt8Array = isInt8Array;

function isInt16Array(value) {
  return whichTypedArray(value) === 'Int16Array';
}
exports.isInt16Array = isInt16Array;

function isInt32Array(value) {
  return whichTypedArray(value) === 'Int32Array';
}
exports.isInt32Array = isInt32Array;

function isFloat32Array(value) {
  return whichTypedArray(value) === 'Float32Array';
}
exports.isFloat32Array = isFloat32Array;

function isFloat64Array(value) {
  return whichTypedArray(value) === 'Float64Array';
}
exports.isFloat64Array = isFloat64Array;

function isBigInt64Array(value) {
  return whichTypedArray(value) === 'BigInt64Array';
}
exports.isBigInt64Array = isBigInt64Array;

function isBigUint64Array(value) {
  return whichTypedArray(value) === 'BigUint64Array';
}
exports.isBigUint64Array = isBigUint64Array;

function isMapToString(value) {
  return ObjectToString(value) === '[object Map]';
}
isMapToString.working = (
  typeof Map !== 'undefined' &&
  isMapToString(new Map())
);

function isMap(value) {
  if (typeof Map === 'undefined') {
    return false;
  }

  return isMapToString.working
    ? isMapToString(value)
    : value instanceof Map;
}
exports.isMap = isMap;

function isSetToString(value) {
  return ObjectToString(value) === '[object Set]';
}
isSetToString.working = (
  typeof Set !== 'undefined' &&
  isSetToString(new Set())
);
function isSet(value) {
  if (typeof Set === 'undefined') {
    return false;
  }

  return isSetToString.working
    ? isSetToString(value)
    : value instanceof Set;
}
exports.isSet = isSet;

function isWeakMapToString(value) {
  return ObjectToString(value) === '[object WeakMap]';
}
isWeakMapToString.working = (
  typeof WeakMap !== 'undefined' &&
  isWeakMapToString(new WeakMap())
);
function isWeakMap(value) {
  if (typeof WeakMap === 'undefined') {
    return false;
  }

  return isWeakMapToString.working
    ? isWeakMapToString(value)
    : value instanceof WeakMap;
}
exports.isWeakMap = isWeakMap;

function isWeakSetToString(value) {
  return ObjectToString(value) === '[object WeakSet]';
}
isWeakSetToString.working = (
  typeof WeakSet !== 'undefined' &&
  isWeakSetToString(new WeakSet())
);
function isWeakSet(value) {
  return isWeakSetToString(value);
}
exports.isWeakSet = isWeakSet;

function isArrayBufferToString(value) {
  return ObjectToString(value) === '[object ArrayBuffer]';
}
isArrayBufferToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  isArrayBufferToString(new ArrayBuffer())
);
function isArrayBuffer(value) {
  if (typeof ArrayBuffer === 'undefined') {
    return false;
  }

  return isArrayBufferToString.working
    ? isArrayBufferToString(value)
    : value instanceof ArrayBuffer;
}
exports.isArrayBuffer = isArrayBuffer;

function isDataViewToString(value) {
  return ObjectToString(value) === '[object DataView]';
}
isDataViewToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  typeof DataView !== 'undefined' &&
  isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1))
);
function isDataView(value) {
  if (typeof DataView === 'undefined') {
    return false;
  }

  return isDataViewToString.working
    ? isDataViewToString(value)
    : value instanceof DataView;
}
exports.isDataView = isDataView;

// Store a copy of SharedArrayBuffer in case it's deleted elsewhere
var SharedArrayBufferCopy = typeof SharedArrayBuffer !== 'undefined' ? SharedArrayBuffer : undefined;
function isSharedArrayBufferToString(value) {
  return ObjectToString(value) === '[object SharedArrayBuffer]';
}
function isSharedArrayBuffer(value) {
  if (typeof SharedArrayBufferCopy === 'undefined') {
    return false;
  }

  if (typeof isSharedArrayBufferToString.working === 'undefined') {
    isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
  }

  return isSharedArrayBufferToString.working
    ? isSharedArrayBufferToString(value)
    : value instanceof SharedArrayBufferCopy;
}
exports.isSharedArrayBuffer = isSharedArrayBuffer;

function isAsyncFunction(value) {
  return ObjectToString(value) === '[object AsyncFunction]';
}
exports.isAsyncFunction = isAsyncFunction;

function isMapIterator(value) {
  return ObjectToString(value) === '[object Map Iterator]';
}
exports.isMapIterator = isMapIterator;

function isSetIterator(value) {
  return ObjectToString(value) === '[object Set Iterator]';
}
exports.isSetIterator = isSetIterator;

function isGeneratorObject(value) {
  return ObjectToString(value) === '[object Generator]';
}
exports.isGeneratorObject = isGeneratorObject;

function isWebAssemblyCompiledModule(value) {
  return ObjectToString(value) === '[object WebAssembly.Module]';
}
exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;

function isNumberObject(value) {
  return checkBoxedPrimitive(value, numberValue);
}
exports.isNumberObject = isNumberObject;

function isStringObject(value) {
  return checkBoxedPrimitive(value, stringValue);
}
exports.isStringObject = isStringObject;

function isBooleanObject(value) {
  return checkBoxedPrimitive(value, booleanValue);
}
exports.isBooleanObject = isBooleanObject;

function isBigIntObject(value) {
  return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
}
exports.isBigIntObject = isBigIntObject;

function isSymbolObject(value) {
  return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
}
exports.isSymbolObject = isSymbolObject;

function isBoxedPrimitive(value) {
  return (
    isNumberObject(value) ||
    isStringObject(value) ||
    isBooleanObject(value) ||
    isBigIntObject(value) ||
    isSymbolObject(value)
  );
}
exports.isBoxedPrimitive = isBoxedPrimitive;

function isAnyArrayBuffer(value) {
  return typeof Uint8Array !== 'undefined' && (
    isArrayBuffer(value) ||
    isSharedArrayBuffer(value)
  );
}
exports.isAnyArrayBuffer = isAnyArrayBuffer;

['isProxy', 'isExternal', 'isModuleNamespaceObject'].forEach(function(method) {
  Object.defineProperty(exports, method, {
    enumerable: false,
    value: function() {
      throw new Error(method + ' is not supported in userland');
    }
  });
});


/***/ }),
/* 63 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hasToStringTag = __webpack_require__(64)();
var callBound = __webpack_require__(66);

var $toString = callBound('Object.prototype.toString');

/** @type {import('.')} */
var isStandardArguments = function isArguments(value) {
	if (
		hasToStringTag
		&& value
		&& typeof value === 'object'
		&& Symbol.toStringTag in value
	) {
		return false;
	}
	return $toString(value) === '[object Arguments]';
};

/** @type {import('.')} */
var isLegacyArguments = function isArguments(value) {
	if (isStandardArguments(value)) {
		return true;
	}
	return value !== null
		&& typeof value === 'object'
		&& 'length' in value
		&& typeof value.length === 'number'
		&& value.length >= 0
		&& $toString(value) !== '[object Array]'
		&& 'callee' in value
		&& $toString(value.callee) === '[object Function]';
};

var supportsStandardArguments = (function () {
	return isStandardArguments(arguments);
}());

// @ts-expect-error TODO make this not error
isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

/** @type {import('.')} */
module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;


/***/ }),
/* 64 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hasSymbols = __webpack_require__(65);

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};


/***/ }),
/* 65 */
/***/ ((module) => {

"use strict";


/** @type {import('./shams')} */
/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	/** @type {{ [k in symbol]?: unknown }} */
	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (var _ in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		// eslint-disable-next-line no-extra-parens
		var descriptor = /** @type {PropertyDescriptor} */ (Object.getOwnPropertyDescriptor(obj, sym));
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


/***/ }),
/* 66 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(67);

var callBindBasic = __webpack_require__(92);

/** @type {(thisArg: string, searchString: string, position?: number) => number} */
var $indexOf = callBindBasic([GetIntrinsic('%String.prototype.indexOf%')]);

/** @type {import('.')} */
module.exports = function callBoundIntrinsic(name, allowMissing) {
	/* eslint no-extra-parens: 0 */

	var intrinsic = /** @type {(this: unknown, ...args: unknown[]) => unknown} */ (GetIntrinsic(name, !!allowMissing));
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBindBasic(/** @type {const} */ ([intrinsic]));
	}
	return intrinsic;
};


/***/ }),
/* 67 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var undefined;

var $Object = __webpack_require__(68);

var $Error = __webpack_require__(69);
var $EvalError = __webpack_require__(70);
var $RangeError = __webpack_require__(71);
var $ReferenceError = __webpack_require__(72);
var $SyntaxError = __webpack_require__(73);
var $TypeError = __webpack_require__(74);
var $URIError = __webpack_require__(75);

var abs = __webpack_require__(76);
var floor = __webpack_require__(77);
var max = __webpack_require__(78);
var min = __webpack_require__(79);
var pow = __webpack_require__(80);
var round = __webpack_require__(81);
var sign = __webpack_require__(82);

var $Function = Function;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = __webpack_require__(84);
var $defineProperty = __webpack_require__(86);

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = __webpack_require__(87)();

var getProto = __webpack_require__(88);
var $ObjectGPO = __webpack_require__(90);
var $ReflectGPO = __webpack_require__(89);

var $apply = __webpack_require__(97);
var $call = __webpack_require__(95);

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' || !getProto ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	__proto__: null,
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined : BigInt64Array,
	'%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined : BigUint64Array,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': $Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': $EvalError,
	'%Float16Array%': typeof Float16Array === 'undefined' ? undefined : Float16Array,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': $Object,
	'%Object.getOwnPropertyDescriptor%': $gOPD,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': $RangeError,
	'%ReferenceError%': $ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols && getProto ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': $URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,

	'%Function.prototype.call%': $call,
	'%Function.prototype.apply%': $apply,
	'%Object.defineProperty%': $defineProperty,
	'%Object.getPrototypeOf%': $ObjectGPO,
	'%Math.abs%': abs,
	'%Math.floor%': floor,
	'%Math.max%': max,
	'%Math.min%': min,
	'%Math.pow%': pow,
	'%Math.round%': round,
	'%Math.sign%': sign,
	'%Reflect.getPrototypeOf%': $ReflectGPO
};

if (getProto) {
	try {
		null.error; // eslint-disable-line no-unused-expressions
	} catch (e) {
		// https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
		var errorProto = getProto(getProto(e));
		INTRINSICS['%Error.prototype%'] = errorProto;
	}
}

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen && getProto) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	__proto__: null,
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = __webpack_require__(93);
var hasOwn = __webpack_require__(99);
var $concat = bind.call($call, Array.prototype.concat);
var $spliceApply = bind.call($apply, Array.prototype.splice);
var $replace = bind.call($call, String.prototype.replace);
var $strSlice = bind.call($call, String.prototype.slice);
var $exec = bind.call($call, RegExp.prototype.exec);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	if ($exec(/^%?[^%]*%?$/, name) === null) {
		throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
	}
	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};


/***/ }),
/* 68 */
/***/ ((module) => {

"use strict";


/** @type {import('.')} */
module.exports = Object;


/***/ }),
/* 69 */
/***/ ((module) => {

"use strict";


/** @type {import('.')} */
module.exports = Error;


/***/ }),
/* 70 */
/***/ ((module) => {

"use strict";


/** @type {import('./eval')} */
module.exports = EvalError;


/***/ }),
/* 71 */
/***/ ((module) => {

"use strict";


/** @type {import('./range')} */
module.exports = RangeError;


/***/ }),
/* 72 */
/***/ ((module) => {

"use strict";


/** @type {import('./ref')} */
module.exports = ReferenceError;


/***/ }),
/* 73 */
/***/ ((module) => {

"use strict";


/** @type {import('./syntax')} */
module.exports = SyntaxError;


/***/ }),
/* 74 */
/***/ ((module) => {

"use strict";


/** @type {import('./type')} */
module.exports = TypeError;


/***/ }),
/* 75 */
/***/ ((module) => {

"use strict";


/** @type {import('./uri')} */
module.exports = URIError;


/***/ }),
/* 76 */
/***/ ((module) => {

"use strict";


/** @type {import('./abs')} */
module.exports = Math.abs;


/***/ }),
/* 77 */
/***/ ((module) => {

"use strict";


/** @type {import('./floor')} */
module.exports = Math.floor;


/***/ }),
/* 78 */
/***/ ((module) => {

"use strict";


/** @type {import('./max')} */
module.exports = Math.max;


/***/ }),
/* 79 */
/***/ ((module) => {

"use strict";


/** @type {import('./min')} */
module.exports = Math.min;


/***/ }),
/* 80 */
/***/ ((module) => {

"use strict";


/** @type {import('./pow')} */
module.exports = Math.pow;


/***/ }),
/* 81 */
/***/ ((module) => {

"use strict";


/** @type {import('./round')} */
module.exports = Math.round;


/***/ }),
/* 82 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var $isNaN = __webpack_require__(83);

/** @type {import('./sign')} */
module.exports = function sign(number) {
	if ($isNaN(number) || number === 0) {
		return number;
	}
	return number < 0 ? -1 : +1;
};


/***/ }),
/* 83 */
/***/ ((module) => {

"use strict";


/** @type {import('./isNaN')} */
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};


/***/ }),
/* 84 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/** @type {import('.')} */
var $gOPD = __webpack_require__(85);

if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

module.exports = $gOPD;


/***/ }),
/* 85 */
/***/ ((module) => {

"use strict";


/** @type {import('./gOPD')} */
module.exports = Object.getOwnPropertyDescriptor;


/***/ }),
/* 86 */
/***/ ((module) => {

"use strict";


/** @type {import('.')} */
var $defineProperty = Object.defineProperty || false;
if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = false;
	}
}

module.exports = $defineProperty;


/***/ }),
/* 87 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = __webpack_require__(65);

/** @type {import('.')} */
module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};


/***/ }),
/* 88 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var reflectGetProto = __webpack_require__(89);
var originalGetProto = __webpack_require__(90);

var getDunderProto = __webpack_require__(91);

/** @type {import('.')} */
module.exports = reflectGetProto
	? function getProto(O) {
		// @ts-expect-error TS can't narrow inside a closure, for some reason
		return reflectGetProto(O);
	}
	: originalGetProto
		? function getProto(O) {
			if (!O || (typeof O !== 'object' && typeof O !== 'function')) {
				throw new TypeError('getProto: not an object');
			}
			// @ts-expect-error TS can't narrow inside a closure, for some reason
			return originalGetProto(O);
		}
		: getDunderProto
			? function getProto(O) {
				// @ts-expect-error TS can't narrow inside a closure, for some reason
				return getDunderProto(O);
			}
			: null;


/***/ }),
/* 89 */
/***/ ((module) => {

"use strict";


/** @type {import('./Reflect.getPrototypeOf')} */
module.exports = (typeof Reflect !== 'undefined' && Reflect.getPrototypeOf) || null;


/***/ }),
/* 90 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var $Object = __webpack_require__(68);

/** @type {import('./Object.getPrototypeOf')} */
module.exports = $Object.getPrototypeOf || null;


/***/ }),
/* 91 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var callBind = __webpack_require__(92);
var gOPD = __webpack_require__(84);

var hasProtoAccessor;
try {
	// eslint-disable-next-line no-extra-parens, no-proto
	hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */ ([]).__proto__ === Array.prototype;
} catch (e) {
	if (!e || typeof e !== 'object' || !('code' in e) || e.code !== 'ERR_PROTO_ACCESS') {
		throw e;
	}
}

// eslint-disable-next-line no-extra-parens
var desc = !!hasProtoAccessor && gOPD && gOPD(Object.prototype, /** @type {keyof typeof Object.prototype} */ ('__proto__'));

var $Object = Object;
var $getPrototypeOf = $Object.getPrototypeOf;

/** @type {import('./get')} */
module.exports = desc && typeof desc.get === 'function'
	? callBind([desc.get])
	: typeof $getPrototypeOf === 'function'
		? /** @type {import('./get')} */ function getDunder(value) {
			// eslint-disable-next-line eqeqeq
			return $getPrototypeOf(value == null ? value : $Object(value));
		}
		: false;


/***/ }),
/* 92 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(93);
var $TypeError = __webpack_require__(74);

var $call = __webpack_require__(95);
var $actualApply = __webpack_require__(96);

/** @type {(args: [Function, thisArg?: unknown, ...args: unknown[]]) => Function} TODO FIXME, find a way to use import('.') */
module.exports = function callBindBasic(args) {
	if (args.length < 1 || typeof args[0] !== 'function') {
		throw new $TypeError('a function is required');
	}
	return $actualApply(bind, $call, args);
};


/***/ }),
/* 93 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(94);

module.exports = Function.prototype.bind || implementation;


/***/ }),
/* 94 */
/***/ ((module) => {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var toStr = Object.prototype.toString;
var max = Math.max;
var funcType = '[object Function]';

var concatty = function concatty(a, b) {
    var arr = [];

    for (var i = 0; i < a.length; i += 1) {
        arr[i] = a[i];
    }
    for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
    }

    return arr;
};

var slicy = function slicy(arrLike, offset) {
    var arr = [];
    for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
        arr[j] = arrLike[i];
    }
    return arr;
};

var joiny = function (arr, joiner) {
    var str = '';
    for (var i = 0; i < arr.length; i += 1) {
        str += arr[i];
        if (i + 1 < arr.length) {
            str += joiner;
        }
    }
    return str;
};

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slicy(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                concatty(args, arguments)
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        }
        return target.apply(
            that,
            concatty(args, arguments)
        );

    };

    var boundLength = max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs[i] = '$' + i;
    }

    bound = Function('binder', 'return function (' + joiny(boundArgs, ',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),
/* 95 */
/***/ ((module) => {

"use strict";


/** @type {import('./functionCall')} */
module.exports = Function.prototype.call;


/***/ }),
/* 96 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(93);

var $apply = __webpack_require__(97);
var $call = __webpack_require__(95);
var $reflectApply = __webpack_require__(98);

/** @type {import('./actualApply')} */
module.exports = $reflectApply || bind.call($call, $apply);


/***/ }),
/* 97 */
/***/ ((module) => {

"use strict";


/** @type {import('./functionApply')} */
module.exports = Function.prototype.apply;


/***/ }),
/* 98 */
/***/ ((module) => {

"use strict";


/** @type {import('./reflectApply')} */
module.exports = typeof Reflect !== 'undefined' && Reflect && Reflect.apply;


/***/ }),
/* 99 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = __webpack_require__(93);

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);


/***/ }),
/* 100 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var callBound = __webpack_require__(66);
var safeRegexTest = __webpack_require__(101);
var isFnRegex = safeRegexTest(/^\s*(?:function)?\*/);
var hasToStringTag = __webpack_require__(64)();
var getProto = __webpack_require__(88);

var toStr = callBound('Object.prototype.toString');
var fnToStr = callBound('Function.prototype.toString');

var getGeneratorFunction = __webpack_require__(103);

/** @type {import('.')} */
module.exports = function isGeneratorFunction(fn) {
	if (typeof fn !== 'function') {
		return false;
	}
	if (isFnRegex(fnToStr(fn))) {
		return true;
	}
	if (!hasToStringTag) {
		var str = toStr(fn);
		return str === '[object GeneratorFunction]';
	}
	if (!getProto) {
		return false;
	}
	var GeneratorFunction = getGeneratorFunction();
	return GeneratorFunction && getProto(fn) === GeneratorFunction.prototype;
};


/***/ }),
/* 101 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var callBound = __webpack_require__(66);
var isRegex = __webpack_require__(102);

var $exec = callBound('RegExp.prototype.exec');
var $TypeError = __webpack_require__(74);

/** @type {import('.')} */
module.exports = function regexTester(regex) {
	if (!isRegex(regex)) {
		throw new $TypeError('`regex` must be a RegExp');
	}
	return function test(s) {
		return $exec(regex, s) !== null;
	};
};


/***/ }),
/* 102 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var callBound = __webpack_require__(66);
var hasToStringTag = __webpack_require__(64)();
var hasOwn = __webpack_require__(99);
var gOPD = __webpack_require__(84);

/** @type {import('.')} */
var fn;

if (hasToStringTag) {
	/** @type {(receiver: ThisParameterType<typeof RegExp.prototype.exec>, ...args: Parameters<typeof RegExp.prototype.exec>) => ReturnType<typeof RegExp.prototype.exec>} */
	var $exec = callBound('RegExp.prototype.exec');
	/** @type {object} */
	var isRegexMarker = {};

	var throwRegexMarker = function () {
		throw isRegexMarker;
	};
	/** @type {{ toString(): never, valueOf(): never, [Symbol.toPrimitive]?(): never }} */
	var badStringifier = {
		toString: throwRegexMarker,
		valueOf: throwRegexMarker
	};

	if (typeof Symbol.toPrimitive === 'symbol') {
		badStringifier[Symbol.toPrimitive] = throwRegexMarker;
	}

	/** @type {import('.')} */
	// @ts-expect-error TS can't figure out that the $exec call always throws
	// eslint-disable-next-line consistent-return
	fn = function isRegex(value) {
		if (!value || typeof value !== 'object') {
			return false;
		}

		// eslint-disable-next-line no-extra-parens
		var descriptor = /** @type {NonNullable<typeof gOPD>} */ (gOPD)(/** @type {{ lastIndex?: unknown }} */ (value), 'lastIndex');
		var hasLastIndexDataProperty = descriptor && hasOwn(descriptor, 'value');
		if (!hasLastIndexDataProperty) {
			return false;
		}

		try {
			// eslint-disable-next-line no-extra-parens
			$exec(value, /** @type {string} */ (/** @type {unknown} */ (badStringifier)));
		} catch (e) {
			return e === isRegexMarker;
		}
	};
} else {
	/** @type {(receiver: ThisParameterType<typeof Object.prototype.toString>, ...args: Parameters<typeof Object.prototype.toString>) => ReturnType<typeof Object.prototype.toString>} */
	var $toString = callBound('Object.prototype.toString');
	/** @const @type {'[object RegExp]'} */
	var regexClass = '[object RegExp]';

	/** @type {import('.')} */
	fn = function isRegex(value) {
		// In older browsers, typeof regex incorrectly returns 'function'
		if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
			return false;
		}

		return $toString(value) === regexClass;
	};
}

module.exports = fn;


/***/ }),
/* 103 */
/***/ ((module) => {

"use strict";


// eslint-disable-next-line no-extra-parens, no-empty-function
const cached = /** @type {GeneratorFunctionConstructor} */ (function* () {}.constructor);

/** @type {import('.')} */
module.exports = () => cached;



/***/ }),
/* 104 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var forEach = __webpack_require__(105);
var availableTypedArrays = __webpack_require__(107);
var callBind = __webpack_require__(109);
var callBound = __webpack_require__(66);
var gOPD = __webpack_require__(84);
var getProto = __webpack_require__(88);

var $toString = callBound('Object.prototype.toString');
var hasToStringTag = __webpack_require__(64)();

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;
var typedArrays = availableTypedArrays();

var $slice = callBound('String.prototype.slice');

/** @type {<T = unknown>(array: readonly T[], value: unknown) => number} */
var $indexOf = callBound('Array.prototype.indexOf', true) || function indexOf(array, value) {
	for (var i = 0; i < array.length; i += 1) {
		if (array[i] === value) {
			return i;
		}
	}
	return -1;
};

/** @typedef {import('./types').Getter} Getter */
/** @type {import('./types').Cache} */
var cache = { __proto__: null };
if (hasToStringTag && gOPD && getProto) {
	forEach(typedArrays, function (typedArray) {
		var arr = new g[typedArray]();
		if (Symbol.toStringTag in arr && getProto) {
			var proto = getProto(arr);
			// @ts-expect-error TS won't narrow inside a closure
			var descriptor = gOPD(proto, Symbol.toStringTag);
			if (!descriptor && proto) {
				var superProto = getProto(proto);
				// @ts-expect-error TS won't narrow inside a closure
				descriptor = gOPD(superProto, Symbol.toStringTag);
			}
			if (descriptor && descriptor.get) {
				var bound = callBind(descriptor.get);
				cache[
					/** @type {`$${import('.').TypedArrayName}`} */ ('$' + typedArray)
				] = bound;
			}
		}
	});
} else {
	forEach(typedArrays, function (typedArray) {
		var arr = new g[typedArray]();
		var fn = arr.slice || arr.set;
		if (fn) {
			var bound = /** @type {import('./types').BoundSlice | import('./types').BoundSet} */ (
				// @ts-expect-error TODO FIXME
				callBind(fn)
			);
			cache[
				/** @type {`$${import('.').TypedArrayName}`} */ ('$' + typedArray)
			] = bound;
		}
	});
}

/** @type {(value: object) => false | import('.').TypedArrayName} */
var tryTypedArrays = function tryAllTypedArrays(value) {
	/** @type {ReturnType<typeof tryAllTypedArrays>} */ var found = false;
	forEach(
		/** @type {Record<`\$${import('.').TypedArrayName}`, Getter>} */ (cache),
		/** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
		function (getter, typedArray) {
			if (!found) {
				try {
					// @ts-expect-error a throw is fine here
					if ('$' + getter(value) === typedArray) {
						found = /** @type {import('.').TypedArrayName} */ ($slice(typedArray, 1));
					}
				} catch (e) { /**/ }
			}
		}
	);
	return found;
};

/** @type {(value: object) => false | import('.').TypedArrayName} */
var trySlices = function tryAllSlices(value) {
	/** @type {ReturnType<typeof tryAllSlices>} */ var found = false;
	forEach(
		/** @type {Record<`\$${import('.').TypedArrayName}`, Getter>} */(cache),
		/** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */ function (getter, name) {
			if (!found) {
				try {
					// @ts-expect-error a throw is fine here
					getter(value);
					found = /** @type {import('.').TypedArrayName} */ ($slice(name, 1));
				} catch (e) { /**/ }
			}
		}
	);
	return found;
};

/** @type {import('.')} */
module.exports = function whichTypedArray(value) {
	if (!value || typeof value !== 'object') { return false; }
	if (!hasToStringTag) {
		/** @type {string} */
		var tag = $slice($toString(value), 8, -1);
		if ($indexOf(typedArrays, tag) > -1) {
			return tag;
		}
		if (tag !== 'Object') {
			return false;
		}
		// node < 0.6 hits here on real Typed Arrays
		return trySlices(value);
	}
	if (!gOPD) { return null; } // unknown engine
	return tryTypedArrays(value);
};


/***/ }),
/* 105 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isCallable = __webpack_require__(106);

var toStr = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

/** @type {<This, A extends readonly unknown[]>(arr: A, iterator: (this: This | void, value: A[number], index: number, arr: A) => void, receiver: This | undefined) => void} */
var forEachArray = function forEachArray(array, iterator, receiver) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            if (receiver == null) {
                iterator(array[i], i, array);
            } else {
                iterator.call(receiver, array[i], i, array);
            }
        }
    }
};

/** @type {<This, S extends string>(string: S, iterator: (this: This | void, value: S[number], index: number, string: S) => void, receiver: This | undefined) => void} */
var forEachString = function forEachString(string, iterator, receiver) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        if (receiver == null) {
            iterator(string.charAt(i), i, string);
        } else {
            iterator.call(receiver, string.charAt(i), i, string);
        }
    }
};

/** @type {<This, O>(obj: O, iterator: (this: This | void, value: O[keyof O], index: keyof O, obj: O) => void, receiver: This | undefined) => void} */
var forEachObject = function forEachObject(object, iterator, receiver) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            if (receiver == null) {
                iterator(object[k], k, object);
            } else {
                iterator.call(receiver, object[k], k, object);
            }
        }
    }
};

/** @type {(x: unknown) => x is readonly unknown[]} */
function isArray(x) {
    return toStr.call(x) === '[object Array]';
}

/** @type {import('.')._internal} */
module.exports = function forEach(list, iterator, thisArg) {
    if (!isCallable(iterator)) {
        throw new TypeError('iterator must be a function');
    }

    var receiver;
    if (arguments.length >= 3) {
        receiver = thisArg;
    }

    if (isArray(list)) {
        forEachArray(list, iterator, receiver);
    } else if (typeof list === 'string') {
        forEachString(list, iterator, receiver);
    } else {
        forEachObject(list, iterator, receiver);
    }
};


/***/ }),
/* 106 */
/***/ ((module) => {

"use strict";


var fnToStr = Function.prototype.toString;
var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
	try {
		badArrayLike = Object.defineProperty({}, 'length', {
			get: function () {
				throw isCallableMarker;
			}
		});
		isCallableMarker = {};
		// eslint-disable-next-line no-throw-literal
		reflectApply(function () { throw 42; }, null, badArrayLike);
	} catch (_) {
		if (_ !== isCallableMarker) {
			reflectApply = null;
		}
	}
} else {
	reflectApply = null;
}

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var objectClass = '[object Object]';
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var ddaClass = '[object HTMLAllCollection]'; // IE 11
var ddaClass2 = '[object HTML document.all class]';
var ddaClass3 = '[object HTMLCollection]'; // IE 9-10
var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`

var isIE68 = !(0 in [,]); // eslint-disable-line no-sparse-arrays, comma-spacing

var isDDA = function isDocumentDotAll() { return false; };
if (typeof document === 'object') {
	// Firefox 3 canonicalizes DDA to undefined when it's not accessed directly
	var all = document.all;
	if (toStr.call(all) === toStr.call(document.all)) {
		isDDA = function isDocumentDotAll(value) {
			/* globals document: false */
			// in IE 6-8, typeof document.all is "object" and it's truthy
			if ((isIE68 || !value) && (typeof value === 'undefined' || typeof value === 'object')) {
				try {
					var str = toStr.call(value);
					return (
						str === ddaClass
						|| str === ddaClass2
						|| str === ddaClass3 // opera 12.16
						|| str === objectClass // IE 6-8
					) && value('') == null; // eslint-disable-line eqeqeq
				} catch (e) { /**/ }
			}
			return false;
		};
	}
}

module.exports = reflectApply
	? function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) { return false; }
		}
		return !isES6ClassFn(value) && tryFunctionObject(value);
	}
	: function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		if (strClass !== fnClass && strClass !== genClass && !(/^\[object HTML/).test(strClass)) { return false; }
		return tryFunctionObject(value);
	};


/***/ }),
/* 107 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var possibleNames = __webpack_require__(108);

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;

/** @type {import('.')} */
module.exports = function availableTypedArrays() {
	var /** @type {ReturnType<typeof availableTypedArrays>} */ out = [];
	for (var i = 0; i < possibleNames.length; i++) {
		if (typeof g[possibleNames[i]] === 'function') {
			// @ts-expect-error
			out[out.length] = possibleNames[i];
		}
	}
	return out;
};


/***/ }),
/* 108 */
/***/ ((module) => {

"use strict";


/** @type {import('.')} */
module.exports = [
	'Float16Array',
	'Float32Array',
	'Float64Array',
	'Int8Array',
	'Int16Array',
	'Int32Array',
	'Uint8Array',
	'Uint8ClampedArray',
	'Uint16Array',
	'Uint32Array',
	'BigInt64Array',
	'BigUint64Array'
];


/***/ }),
/* 109 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var setFunctionLength = __webpack_require__(110);

var $defineProperty = __webpack_require__(86);

var callBindBasic = __webpack_require__(92);
var applyBind = __webpack_require__(113);

module.exports = function callBind(originalFunction) {
	var func = callBindBasic(arguments);
	var adjustedLength = originalFunction.length - (arguments.length - 1);
	return setFunctionLength(
		func,
		1 + (adjustedLength > 0 ? adjustedLength : 0),
		true
	);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}


/***/ }),
/* 110 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(67);
var define = __webpack_require__(111);
var hasDescriptors = __webpack_require__(112)();
var gOPD = __webpack_require__(84);

var $TypeError = __webpack_require__(74);
var $floor = GetIntrinsic('%Math.floor%');

/** @type {import('.')} */
module.exports = function setFunctionLength(fn, length) {
	if (typeof fn !== 'function') {
		throw new $TypeError('`fn` is not a function');
	}
	if (typeof length !== 'number' || length < 0 || length > 0xFFFFFFFF || $floor(length) !== length) {
		throw new $TypeError('`length` must be a positive 32-bit integer');
	}

	var loose = arguments.length > 2 && !!arguments[2];

	var functionLengthIsConfigurable = true;
	var functionLengthIsWritable = true;
	if ('length' in fn && gOPD) {
		var desc = gOPD(fn, 'length');
		if (desc && !desc.configurable) {
			functionLengthIsConfigurable = false;
		}
		if (desc && !desc.writable) {
			functionLengthIsWritable = false;
		}
	}

	if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
		if (hasDescriptors) {
			define(/** @type {Parameters<define>[0]} */ (fn), 'length', length, true, true);
		} else {
			define(/** @type {Parameters<define>[0]} */ (fn), 'length', length);
		}
	}
	return fn;
};


/***/ }),
/* 111 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var $defineProperty = __webpack_require__(86);

var $SyntaxError = __webpack_require__(73);
var $TypeError = __webpack_require__(74);

var gopd = __webpack_require__(84);

/** @type {import('.')} */
module.exports = function defineDataProperty(
	obj,
	property,
	value
) {
	if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) {
		throw new $TypeError('`obj` must be an object or a function`');
	}
	if (typeof property !== 'string' && typeof property !== 'symbol') {
		throw new $TypeError('`property` must be a string or a symbol`');
	}
	if (arguments.length > 3 && typeof arguments[3] !== 'boolean' && arguments[3] !== null) {
		throw new $TypeError('`nonEnumerable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 4 && typeof arguments[4] !== 'boolean' && arguments[4] !== null) {
		throw new $TypeError('`nonWritable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 5 && typeof arguments[5] !== 'boolean' && arguments[5] !== null) {
		throw new $TypeError('`nonConfigurable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 6 && typeof arguments[6] !== 'boolean') {
		throw new $TypeError('`loose`, if provided, must be a boolean');
	}

	var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
	var nonWritable = arguments.length > 4 ? arguments[4] : null;
	var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
	var loose = arguments.length > 6 ? arguments[6] : false;

	/* @type {false | TypedPropertyDescriptor<unknown>} */
	var desc = !!gopd && gopd(obj, property);

	if ($defineProperty) {
		$defineProperty(obj, property, {
			configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
			enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
			value: value,
			writable: nonWritable === null && desc ? desc.writable : !nonWritable
		});
	} else if (loose || (!nonEnumerable && !nonWritable && !nonConfigurable)) {
		// must fall back to [[Set]], and was not explicitly asked to make non-enumerable, non-writable, or non-configurable
		obj[property] = value; // eslint-disable-line no-param-reassign
	} else {
		throw new $SyntaxError('This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.');
	}
};


/***/ }),
/* 112 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var $defineProperty = __webpack_require__(86);

var hasPropertyDescriptors = function hasPropertyDescriptors() {
	return !!$defineProperty;
};

hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
	// node v0.6 has a bug where array lengths can be Set but not Defined
	if (!$defineProperty) {
		return null;
	}
	try {
		return $defineProperty([], 'length', { value: 1 }).length !== 1;
	} catch (e) {
		// In Firefox 4-22, defining length on an array throws an exception.
		return true;
	}
};

module.exports = hasPropertyDescriptors;


/***/ }),
/* 113 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(93);
var $apply = __webpack_require__(97);
var actualApply = __webpack_require__(96);

/** @type {import('./applyBind')} */
module.exports = function applyBind() {
	return actualApply(bind, $apply, arguments);
};


/***/ }),
/* 114 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var whichTypedArray = __webpack_require__(104);

/** @type {import('.')} */
module.exports = function isTypedArray(value) {
	return !!whichTypedArray(value);
};


/***/ }),
/* 115 */
/***/ ((module) => {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 116 */
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),
/* 117 */
/***/ ((module) => {

"use strict";
/* eslint-env browser */


function getChromeVersion() {
	const matches = /(Chrome|Chromium)\/(?<chromeVersion>\d+)\./.exec(navigator.userAgent);

	if (!matches) {
		return;
	}

	return Number.parseInt(matches.groups.chromeVersion, 10);
}

const colorSupport = getChromeVersion() >= 69 ? {
	level: 1,
	hasBasic: true,
	has256: false,
	has16m: false
} : false;

module.exports = {
	stdout: colorSupport,
	stderr: colorSupport
};


/***/ })
/******/ 	]);
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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});