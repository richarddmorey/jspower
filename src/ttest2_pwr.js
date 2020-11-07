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
"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _cache, _design, _test, _curve, _stamp, _power1, _compute_criterion, _es_power, _n_power;
const fmin = require('./fmin.js').fmin0;
const { StudentT, Normal, Logistic } = require('node_modules/lib-r-math.js/dist/lib/libR.js');
const { pt, qt } = StudentT();
const { pnorm, qnorm } = Normal();
const { plogis, qlogis } = Logistic();
;
class ttest2_pwr {
    constructor(precision_2alpha = 0.2, nratio = 1, test = {}, options = {}) {
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
        _stamp.set(this, () => {
            this.randstamp = Math.random().toString(36).substring(2);
            this.timestamp = Date.now();
        }
        // Note that this returns log-odds of power!
        );
        // Note that this returns log-odds of power!
        _power1.set(this, (n1, n2, delta, alpha, criterion, delta0) => {
            const neff = n1 * n2 / (n1 + n2);
            const df = n1 + n2 - 2;
            if (typeof criterion === 'undefined')
                criterion = __classPrivateFieldGet(this, _compute_criterion).call(this, n1, n2, alpha, delta0);
            const ncp = delta * Math.sqrt(neff);
            var logpow;
            if (df > this.options.df_normal_cutoff) {
                logpow = pnorm(criterion, ncp, 1, false, true);
            }
            else {
                logpow = pt(criterion, df, ncp, false, true);
            }
            const qpow = qlogis(logpow, 0, 1, true, true);
            return qpow;
        });
        _compute_criterion.set(this, (n1, n2, alpha, delta0) => {
            n1 = Math.ceil(n1);
            var ns0 = (n1 > n2) ? [n2, n1] : [n1, n2];
            var ns = ns0.toString();
            const key = `${delta0},${alpha},${ns}`;
            var f0, criterion, i = 0;
            if ((key in __classPrivateFieldGet(this, _cache).criterion) && (this.options.criterion.cache)) {
                criterion = __classPrivateFieldGet(this, _cache).criterion[key];
            }
            else {
                const neff = n1 * n2 / (n1 + n2);
                const df = n1 + n2 - 2;
                if (delta0 == 0) {
                    criterion = -qt(alpha, df);
                }
                else {
                    const ncp = delta0 * Math.sqrt(neff);
                    criterion = qt(alpha, df, ncp, false);
                }
                if (this.options.criterion.cache)
                    __classPrivateFieldGet(this, _cache).criterion[key] = criterion;
            }
            return criterion;
        });
        _es_power.set(this, (pow, criterion) => {
            const n1 = __classPrivateFieldGet(this, _design).n1;
            const n2 = this.n2;
            const delta0 = __classPrivateFieldGet(this, _test).side < 0 ? -__classPrivateFieldGet(this, _test).es0 : __classPrivateFieldGet(this, _test).es0;
            const s_dn = this.options.es.s_dn;
            const s_up = this.options.es.s_up;
            const shift_dn = this.options.es.shift_dn;
            const shift_up = this.options.es.shift_up;
            const fix_n2 = this.options.fix_n2;
            if (pow == __classPrivateFieldGet(this, _test).alpha)
                return __classPrivateFieldGet(this, _test).es0;
            if (__classPrivateFieldGet(this, _test).side < 0)
                criterion = -criterion;
            var es_up, es_lo, pow_up, pow_lo;
            const qpow = qlogis(pow);
            const neff = n1 * n2 / (n2 + n2);
            const df = n1 + n2 - 2;
            const tmp = criterion - qnorm(pow, 0, 1, false);
            es_up = (tmp + s_up) / Math.sqrt(neff);
            es_lo = (tmp - s_dn) / Math.sqrt(neff);
            pow_up = __classPrivateFieldGet(this, _power1).call(this, n1, n2, es_up, undefined, criterion, delta0);
            pow_lo = __classPrivateFieldGet(this, _power1).call(this, n1, n2, es_lo, undefined, criterion, delta0);
            while (pow_up < qpow) {
                es_lo = es_up;
                es_up = es_up + shift_up / Math.sqrt(neff);
                pow_up = __classPrivateFieldGet(this, _power1).call(this, n1, n2, es_up, undefined, criterion, delta0);
            }
            while (pow_lo > qpow) {
                es_up = es_lo;
                es_lo = es_lo - shift_dn / Math.sqrt(neff);
                pow_lo = __classPrivateFieldGet(this, _power1).call(this, n1, n2, es_lo, undefined, criterion, delta0);
            }
            if (fix_n2) {
                es_lo = (qnorm(pow) + criterion) / Math.sqrt(n2) - __classPrivateFieldGet(this, _test).es0;
            }
            var this0 = this;
            let opt_fun = function (delta) {
                var obj = __classPrivateFieldGet(this0, _power1).call(this0, n1, n2, delta, undefined, criterion, delta0) - qpow;
                return obj * obj;
            };
            return fmin(es_lo, es_up, opt_fun, this.options.es.tol).x;
        });
        _n_power.set(this, (pow, delta) => {
            const alpha = __classPrivateFieldGet(this, _test).alpha;
            const nratio = __classPrivateFieldGet(this, _design).nratio;
            const s_dn = this.options.n.s_dn;
            const s_up = this.options.n.s_up;
            const shift_dn = this.options.n.shift_dn;
            const shift_up = this.options.n.shift_up;
            const n1_max_pow = this.options.n.n1_max_pow;
            const n1_max_min = this.options.n.n1_max_min;
            const delta0 = __classPrivateFieldGet(this, _test).side < 0 ? -__classPrivateFieldGet(this, _test).es0 : __classPrivateFieldGet(this, _test).es0;
            const fix_n2 = this.options.fix_n2;
            if (fix_n2) {
                let ncp = -Math.abs(delta - delta0) * Math.sqrt(this.n2);
                if (pow >= pnorm(qnorm(alpha), ncp)) {
                    return Infinity;
                }
            }
            if (__classPrivateFieldGet(this, _test).side < 0)
                delta = -delta;
            if (delta < delta0 && pow > alpha) {
                throw 'The specified effect size specified cannot be in the null region if power > alpha.';
            }
            else if (delta > delta0 && pow < alpha) {
                throw 'The specified effect size specified cannot be in the null region if power > alpha.';
            }
            else if (pow == alpha) {
                throw 'Power cannot be equal to alpha if computing sample size.';
            }
            else if (delta == delta0) {
                throw 'Effect size cannot be equal to the null effect size if computing sample size.';
            }
            const n2 = this.n2;
            var neff_up, neff_lo, n_up, n2_up = n2, n_lo, n2_lo = n2, pow_up, pow_lo;
            const qpow = qlogis(pow);
            const delta_tmp = Math.abs(delta - delta0);
            const criterion0 = -qnorm(alpha);
            const tmp = qnorm(pow) + criterion0;
            neff_lo = Math.pow((tmp - s_dn) / delta_tmp, 2);
            if (fix_n2) {
                let es0 = -Math.abs(delta - delta0) * Math.sqrt(n2);
                let max_pow = pnorm(qnorm(this.test.alpha) - es0);
                if (pow >= max_pow)
                    throw `Power for es ${delta} requested was ${pow}. This is greater than the maximum power of ${max_pow} when n2 is fixed at ${n2} and alpha is ${alpha}.`;
                neff_up = Math.pow(tmp / delta_tmp, 2);
                n_up = Math.max(2, 1 / (1 / neff_up - 1 / n2));
                n_up = n_up + Math.sqrt(Math.abs(n2 - n_up));
                n_lo = Math.max(2, 1 / (1 / neff_lo - 1 / n2));
            }
            else {
                neff_up = Math.pow((tmp + s_up) / delta_tmp, 2);
                n_up = Math.max(2, neff_up * (1 / nratio + 1));
                n_lo = Math.max(2, neff_lo * (1 / nratio + 1));
                n2_up = Math.max(2, n_up * nratio);
                n2_lo = Math.max(2, n_lo * nratio);
            }
            pow_up = __classPrivateFieldGet(this, _power1).call(this, n_up, n2_up, delta, alpha, undefined, delta0);
            pow_lo = __classPrivateFieldGet(this, _power1).call(this, n_lo, n2_lo, delta, alpha, undefined, delta0);
            if (n_up == 2)
                return 2;
            while (pow_up < qpow) {
                n_lo = n_up;
                n_up = n_up * shift_up;
                if (!fix_n2) {
                    n2_lo = n2_up;
                    n2_up = n2_up * shift_up;
                }
                pow_up = __classPrivateFieldGet(this, _power1).call(this, n_up, n2_up, delta, alpha, undefined, delta0);
            }
            while ((pow_lo > qpow) && (n_lo >= 2)) {
                n_up = n_lo;
                n_lo = n_lo * shift_dn;
                if (!fix_n2) {
                    n2_up = n2_lo;
                    n2_lo = n2_lo * shift_dn;
                }
                pow_lo = __classPrivateFieldGet(this, _power1).call(this, n_lo, n2_lo, delta, alpha, undefined, delta0);
            }
            // Ensure group 2 has at least two samples in it
            if (!fix_n2 && (n_lo * nratio < 2))
                n_lo = 2 / nratio;
            var this0 = this;
            let opt_fun = function (n1) {
                var obj = __classPrivateFieldGet(this0, _power1).call(this0, n1, fix_n2 ? n2 : Math.ceil(n1 * nratio), delta, alpha, undefined, delta0) - qpow;
                return obj * obj;
            };
            const n_opt = fmin(n_lo, n_up, opt_fun, this.options.n.tol);
            return Math.ceil(n_opt.x);
        });
        __classPrivateFieldGet(this, _design).nratio = nratio;
        __classPrivateFieldGet(this, _stamp).call(this);
        this.id = Math.random().toString(36).substring(2);
        Object.assign(__classPrivateFieldGet(this, _test), test);
        var options0 = {
            fix_es: true,
            fix_n2: false,
            df_normal_cutoff: 25000,
            es: { tol: 0.0000001, s_up: 1, s_dn: 1, shift_up: 2, shift_dn: 2 },
            n: { tol: 0.25, s_up: 2, s_dn: 1, shift_up: 1.5, shift_dn: .67, n1_max_pow: 2.5 / 2, n1_max_min: 1000 },
            criterion: { cache: true, s_up: 1, t_shift: 5, i_limit: 10, t_up_tol: 0.0001, tol: 0.0000001 }
        };
        Object.assign(options0, options);
        this.options = options0;
        this.precision_2alpha = precision_2alpha;
        this.curve = { es: this.es1mAlpha, power: 1 - this.test.alpha };
    }
    find_power(es, typeS = false, limit = false) {
        const design = __classPrivateFieldGet(this, _design);
        const test = __classPrivateFieldGet(this, _test);
        const curve = __classPrivateFieldGet(this, _curve);
        const n2 = this.n2;
        const side = test.side;
        var criterion;
        if (typeof es === 'undefined')
            es = [curve.es];
        if (typeS) {
            criterion = -Math.sign(side) * __classPrivateFieldGet(this, _compute_criterion).call(this, design.n1, this.n2, test.alpha, -Math.sign(side) * test.es0);
        }
        else {
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
                let ncp = Math.abs(delta - delta0) * Math.sqrt(this0.n2);
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
            }
            else {
                return plogis(__classPrivateFieldGet(this0, _power1).call(this0, design.n1, n2, delta, test.alpha, criterion0, delta0));
            }
        });
    }
    find_es(power, typeS = false, limit = false) {
        const design = __classPrivateFieldGet(this, _design);
        const test = __classPrivateFieldGet(this, _test);
        const curve = __classPrivateFieldGet(this, _curve);
        if (typeof power === 'undefined')
            power = [curve.power];
        const criterion = Math.sign(test.side) *
            __classPrivateFieldGet(this, _compute_criterion).call(this, design.n1, this.n2, typeS ? 1 - test.alpha : test.alpha, Math.sign(test.side) * test.es0);
        const this0 = this;
        return power.map(function (power) {
            if (power == test.alpha) {
                return test.es0;
            }
            if (limit) {
                if (!this0.options.fix_n2) {
                    return test.es0;
                }
                let es_diff = (qnorm(power) - qnorm(test.alpha)) / Math.sqrt(this0.n2);
                return Math.sign(test.side) * Math.abs(es_diff) + test.es0;
            }
            return Math.sign(test.side) *
                __classPrivateFieldGet(this0, _es_power).call(this0, typeS ? 1 - power : power, criterion);
        });
    }
    find_n(curve) {
        const design = __classPrivateFieldGet(this, _design);
        const test = __classPrivateFieldGet(this, _test);
        if (typeof curve === 'undefined')
            curve = [__classPrivateFieldGet(this, _curve)];
        const this0 = this;
        return curve.map(function (curve) {
            return __classPrivateFieldGet(this0, _n_power).call(this0, curve.power, curve.es);
        });
    }
    clear_cache() {
        var this0 = this;
        Object.keys(__classPrivateFieldGet(this, _cache)).map(function (key) {
            __classPrivateFieldGet(this0, _cache)[key] = {};
        });
    }
    design_report() {
        var test = {};
        Object.assign(test, this.test, { criterion: this.criterion });
        var curve = {
            point: this.curve,
            es50: this.es50,
            es1mAlpha: this.es1mAlpha,
            typeS: this.find_power(undefined, true)[0]
        };
        if (this.options.fix_n2) {
            Object.assign(curve, { powerLimit: this.powerLimit });
        }
        return {
            id: this.id,
            test: test,
            design: { n1: this.n1, n2: this.n2, ntotal: this.ntotal, ratio: this.nratio },
            curve: curve,
            precision_2alpha: this.precision_2alpha
        };
    }
    get cache() {
        return __classPrivateFieldGet(this, _cache);
    }
    get test() {
        return __classPrivateFieldGet(this, _test);
    }
    set test(test) {
        var reset = false, i, which_change = [];
        const keys = Object.keys(__classPrivateFieldGet(this, _test));
        for (i = 0; i < keys.length; i++) {
            let key = keys[i];
            if (key in test)
                if (test[key] != __classPrivateFieldGet(this, _test)[key]) {
                    which_change.push(key);
                }
        }
        if (which_change.length > 0) {
            Object.assign(__classPrivateFieldGet(this, _test), test);
            if (which_change[0] == "alpha" && which_change.length == 1) {
                if (this.options.fix_es) {
                    __classPrivateFieldGet(this, _curve).power = this.find_power([this.curve.es])[0];
                }
                else {
                    __classPrivateFieldGet(this, _curve).es = this.find_es([this.curve.power])[0];
                }
            }
            else {
                __classPrivateFieldGet(this, _curve).es = this.find_es([this.curve.power])[0];
            }
        }
        __classPrivateFieldGet(this, _stamp).call(this);
    }
    get n1() {
        return __classPrivateFieldGet(this, _design).n1;
    }
    set n1(n1) {
        if (__classPrivateFieldGet(this, _design).n1 == n1)
            return;
        __classPrivateFieldGet(this, _design).n1 = n1;
        if (this.options.fix_n2) {
            __classPrivateFieldGet(this, _design).nratio = n1 / this.n2;
        }
        else {
            __classPrivateFieldGet(this, _design).n2 = Math.ceil(n1 * this.nratio);
        }
        if (this.options.fix_es) {
            __classPrivateFieldGet(this, _curve).power = this.find_power([this.curve.es])[0];
        }
        else {
            __classPrivateFieldGet(this, _curve).es = this.find_es([this.curve.power])[0];
        }
        __classPrivateFieldGet(this, _stamp).call(this);
    }
    get nratio() {
        return __classPrivateFieldGet(this, _design).nratio;
    }
    set nratio(nratio) {
        const ntotal = this.ntotal;
        const n2 = Math.ceil(ntotal * nratio / (1 + nratio));
        this.options.fix_n2 = false;
        __classPrivateFieldGet(this, _design).nratio = nratio;
        this.n1 = ntotal - n2;
    }
    get n2() {
        return __classPrivateFieldGet(this, _design).n2;
    }
    set n2(n2) {
        n2 = Math.ceil(n2);
        __classPrivateFieldGet(this, _design).n2 = n2;
        __classPrivateFieldGet(this, _design).nratio = n2 / this.n1;
        if (this.options.fix_es) {
            __classPrivateFieldGet(this, _curve).power = this.find_power([this.curve.es])[0];
        }
        else {
            __classPrivateFieldGet(this, _curve).es = this.find_es([this.curve.power])[0];
        }
        this.options.fix_n2 = true;
        __classPrivateFieldGet(this, _stamp).call(this);
    }
    get ntotal() {
        return this.n1 + this.n2;
    }
    set es(es) {
        if (__classPrivateFieldGet(this, _curve).es == es)
            return;
        __classPrivateFieldGet(this, _curve).es = es;
        __classPrivateFieldGet(this, _curve).power = this.find_power([es])[0];
        __classPrivateFieldGet(this, _stamp).call(this);
    }
    set power(power) {
        if (__classPrivateFieldGet(this, _curve).power == power)
            return;
        __classPrivateFieldGet(this, _curve).power = power;
        __classPrivateFieldGet(this, _curve).es = this.find_es([power])[0];
        __classPrivateFieldGet(this, _stamp).call(this);
    }
    get precision_2alpha() {
        const es = this.find_es([1 - __classPrivateFieldGet(this, _test).alpha])[0];
        // add cache?
        return Math.abs(__classPrivateFieldGet(this, _test).es0 - es);
    }
    set precision_2alpha(p) {
        const fix_n2 = this.options.fix_n2;
        const es = __classPrivateFieldGet(this, _test).es0 + Math.sign(__classPrivateFieldGet(this, _test).side) * Math.abs(p);
        const n1 = this.find_n([{ es: es, power: 1 - __classPrivateFieldGet(this, _test).alpha }])[0];
        if (fix_n2) {
            __classPrivateFieldGet(this, _design).nratio = n1 / this.n2;
        }
        else {
            __classPrivateFieldGet(this, _design).n2 = Math.ceil(n1 * this.nratio);
        }
        this.n1 = n1;
        // add cache?
    }
    get es50() {
        // add cache?
        return this.find_es([0.5])[0];
    }
    get powerLimit() {
        return this.find_power([__classPrivateFieldGet(this, _curve).es], null, true)[0];
    }
    set es50(es) {
        const n1 = this.find_n([{ power: 0.5, es: es }])[0];
        const fix_n2 = this.options.fix_n2;
        if (fix_n2) {
            __classPrivateFieldGet(this, _design).nratio = n1 / this.n2;
        }
        else {
            __classPrivateFieldGet(this, _design).n2 = Math.ceil(n1 * this.nratio);
        }
        this.n1 = n1;
        // add cache?
    }
    get es1mAlpha() {
        return __classPrivateFieldGet(this, _test).es0 + Math.sign(__classPrivateFieldGet(this, _test).side) * this.precision_2alpha;
    }
    set es1mAlpha(es) {
        this.precision_2alpha = Math.abs(es - __classPrivateFieldGet(this, _test).es0);
    }
    get curve() {
        return __classPrivateFieldGet(this, _curve);
    }
    set curve(curve) {
        var reset = false, i;
        const fix_n2 = this.options.fix_n2;
        const keys = Object.keys(__classPrivateFieldGet(this, _curve));
        for (i = 0; i < keys.length; i++) {
            let key = keys[i];
            if (key in curve)
                if (curve[key] != __classPrivateFieldGet(this, _curve)[key]) {
                    reset = true;
                    break;
                }
        }
        Object.assign(__classPrivateFieldGet(this, _curve), curve);
        if (reset) {
            const n1 = this.find_n([{ power: __classPrivateFieldGet(this, _curve).power, es: __classPrivateFieldGet(this, _curve).es }])[0];
            if (fix_n2) {
                __classPrivateFieldGet(this, _design).nratio = n1 / this.n2;
            }
            else {
                __classPrivateFieldGet(this, _design).n2 = Math.ceil(n1 * this.nratio);
            }
            this.n1 = n1;
        }
    }
    get criterion() {
        const delta0 = __classPrivateFieldGet(this, _test).es0;
        return Math.sign(__classPrivateFieldGet(this, _test).side) * __classPrivateFieldGet(this, _compute_criterion).call(this, __classPrivateFieldGet(this, _design).n1, this.n2, __classPrivateFieldGet(this, _test).alpha, __classPrivateFieldGet(this, _test).side < 0 ? -delta0 : delta0);
    }
}
_cache = new WeakMap(), _design = new WeakMap(), _test = new WeakMap(), _curve = new WeakMap(), _stamp = new WeakMap(), _power1 = new WeakMap(), _compute_criterion = new WeakMap(), _es_power = new WeakMap(), _n_power = new WeakMap();
module.exports = {
    ttest2_pwr: ttest2_pwr
};
//# sourceMappingURL=ttest2_pwr.js.map