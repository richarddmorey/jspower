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

import Validator = require('validatorjs');

/* Some validation rules */
const prob_inclusive_vrule: string = 'between:0,1';
const prob_exclusive_vrule: string = `between:${Number.EPSILON},${1 - Number.EPSILON}`;
const n_vrule = ["min:2", "integer"];
const positive_vrule: string = `min:${Number.EPSILON}`
const side_vrule = "in:-1,1"

const fmin = require('./fmin.js').fmin0

const {
  StudentT,
  Normal,
  Logistic
} = require('node_modules/lib-r-math.js/dist/lib/libR.js');
 
const { pt, qt }  = StudentT();
const { pnorm, qnorm } = Normal();
const { plogis, qlogis } = Logistic();

type bool = true | false;
type pwr_side = -1 | 1;

interface pwr_curve {
  es: number,
  power: number
}

const pwr_curve_vrule:Object = {
  es: "numeric",
  power: prob_exclusive_vrule
};

interface ttest2_pwr_options {
    fix_es: bool,
    fix_n2: bool,
    df_normal_cutoff: number,
    es : ttest2_pwr_options_es,
    n  : ttest2_pwr_options_n,
    criterion : ttest2_pwr_options_criterion
};  

interface ttest2_pwr_options_es {
  tol: number,
  s_up: number,
  s_dn: number,
  shift_up: number,
  shift_dn: number
}

interface ttest2_pwr_options_n {
  tol: number,
  s_up: number,
  s_dn: number,
  shift_up: number,
  shift_dn: number,
  n1_max_pow: number,
  n1_max_min: number
}

interface ttest2_pwr_options_criterion {
  tol: number,
  cache: bool,
  s_up: number,
  t_shift: number,
  i_limit: number,
  t_up_tol: number
}

interface ttest2_design {
  n1: number,
  n2: number,
  nratio: number
}

const ttest2_design_vrule = {
  n1: n_vrule,
  n2: n_vrule,
  nratio: positive_vrule
}

interface ttest2_test {
  alpha: number,
  es0: number,
  side: pwr_side
}

const ttest2_test_vrule = {
  alpha: prob_exclusive_vrule,
  es0: "numeric",
  side: side_vrule
}

interface ttest2_cache {
  criterion: object
}

class ttest2_pwr {
       
  constructor(precision_2alpha: number = 0.2, nratio: number = 1, test = {}, options = {}){  
    
    this.#design.nratio = nratio;
    this.#stamp()
    this.id = Math.random().toString(36).substring(2)

    Object.assign(this.#test, test);
        
    var options0: ttest2_pwr_options = {
      fix_es: true,
      fix_n2: false,
      df_normal_cutoff: 25000,
      es : { tol: 0.0000001, s_up: 1, s_dn: 1, shift_up: 2, shift_dn: 2 },
      n  : { tol: 0.25,      s_up: 2, s_dn: 1, shift_up: 1.5, shift_dn: .67, n1_max_pow: 2.5/2, n1_max_min: 1000 },
      criterion : { cache: true, s_up: 1, t_shift: 5, i_limit: 10, t_up_tol: 0.0001, tol: 0.0000001 }
    }  
    
    Object.assign(options0, options);
    
    this.options = options0;
    const fix_n2: bool = this.options.fix_n2;
    this.options.fix_n2 = false;
      
    this.precision_2alpha = precision_2alpha;
    this.curve = { es: this.es1mAlpha, power: 1 - this.test.alpha }
    
    this.options.fix_n2 = fix_n2;
  }
  
  options: ttest2_pwr_options;
  timestamp: number;
  randstamp: string;
  id: string;
  names = { es: "𝛿", test_stat: "t" };

  #cache = {
    criterion : {}
  }
  
  #design: ttest2_design = {
    n1 : 50,
    n2 : 50, 
    nratio : 1
  }
  
  #test: ttest2_test = {
    es0 : 0,
    side   : 1,
    alpha  : 0.025
  }
  
  #curve: pwr_curve = {
    es: 0.1,
    power  : 0.9    
  }
  
  #stamp = () => {
    this.randstamp = Math.random().toString(36).substring(2)
    this.timestamp = Date.now()
  }

  // Note that this returns log-odds of power!
  #power1 = ( n1: number, n2: number, delta: number, alpha: number, criterion: number, delta0:number ): number => {
     
    const neff: number = n1 * n2 / (n1 + n2);
    const df: number   = n1 + n2 - 2;
    if( typeof criterion === 'undefined' )
      criterion = this.#compute_criterion(n1, n2, alpha, delta0);
    
    const ncp: number = delta * Math.sqrt( neff );
    
    var logpow: number;
    if (df > this.options.df_normal_cutoff){
      logpow = pnorm(criterion, ncp, 1, false, true);  
    }else{
      logpow = pt(criterion, df, ncp, false, true);   
    }
    
    const qpow = qlogis( logpow, 0, 1, true, true );

    return qpow
  }

  #compute_criterion = ( n1: number, n2: number, alpha: number, delta0: number ): number => {
  
    n1 = Math.ceil(n1);
  
    var ns0: number[] = (n1 > n2) ? [n2, n1] : [n1, n2];
    var ns: string = ns0.toString();

    const key: string = `${delta0},${alpha},${ns}`;
  
    var f0: number,
      criterion: number, i: number = 0;

    if( (key in this.#cache.criterion) && (this.options.criterion.cache) ){
      criterion = this.#cache.criterion[ key ];    
    }else{
    
      const neff: number = n1 * n2 / (n1 + n2);
      const df: number   = n1 + n2 - 2;
    
      if(delta0==0){
        criterion = -qt(alpha, df);
      }else{
        const ncp: number = delta0 * Math.sqrt(neff); 
        
        criterion = qt(alpha, df, ncp, false);
      }
    
      if(this.options.criterion.cache)
        this.#cache.criterion[key] = criterion;    
    
    }
 
    return criterion;
      
  }

  #es_power = ( pow: number, criterion: number ): number => {

    const n1: number     = this.#design.n1;
    const n2: number     = this.n2;
    const delta0: number = this.#test.side<0 ? -this.#test.es0 : this.#test.es0;
    const s_dn: number   = this.options.es.s_dn;
    const s_up: number   = this.options.es.s_up;
    const shift_dn: number = this.options.es.shift_dn;
    const shift_up: number = this.options.es.shift_up;
    const fix_n2: boolean = this.options.fix_n2;
    
    if(pow == this.#test.alpha)
      return this.#test.es0;
      
    if(this.#test.side<0)
      criterion = -criterion;

    var es_up, es_lo, pow_up, pow_lo;
    
    const qpow = qlogis(pow);
  
    const neff = n1 * n2/ ( n2 + n2 );
    const df   = n1 + n2 - 2;

    const tmp = criterion - qnorm(pow, 0, 1, false);     
    es_up = (tmp + s_up)/Math.sqrt(neff) 
    es_lo = (tmp - s_dn)/Math.sqrt(neff)

    pow_up = this.#power1(n1, n2, es_up, undefined, criterion, delta0);
    pow_lo = this.#power1(n1, n2, es_lo, undefined, criterion, delta0);

    while(pow_up < qpow){
      es_lo = es_up;
      es_up = es_up + shift_up / Math.sqrt(neff);
      pow_up = this.#power1(n1, n2, es_up, undefined, criterion, delta0);    
    }
    while(pow_lo > qpow){
      es_up = es_lo;
      es_lo = es_lo - shift_dn / Math.sqrt(neff);
      pow_lo = this.#power1(n1, n2, es_lo, undefined, criterion, delta0);
    }
    
    if (fix_n2) {
      es_lo = this.#test.es0 - qnorm(this.#test.alpha)/Math.sqrt(n2) + qnorm(pow)/Math.sqrt(n1)
    }

    var this0 = this;
    
    let opt_fun = function(delta){
      var obj = this0.#power1(n1, n2, delta, undefined, criterion, delta0) - qpow;
      return obj * obj;
    }
    
    return fmin(es_lo, es_up, opt_fun, this.options.es.tol).x;
    
  }
  
  #n_power = ( pow: number, delta: number ): number => {

    const alpha: number  = this.#test.alpha;
    const nratio: number = this.#design.nratio;
    const s_dn: number   = this.options.n.s_dn;
    const s_up: number   = this.options.n.s_up;
    const shift_dn: number = this.options.n.shift_dn;
    const shift_up: number = this.options.n.shift_up; 
    const n1_max_pow: number = this.options.n.n1_max_pow;    
    const n1_max_min: number = this.options.n.n1_max_min;
    const delta0: number = this.#test.side<0 ? -this.#test.es0 : this.#test.es0;
    const fix_n2: bool = this.options.fix_n2;

    if(fix_n2){
      let ncp = -Math.abs(delta - delta0) * Math.sqrt(this.n2)
      if(pow >= pnorm(qnorm(alpha), ncp)){
        return Infinity
      }
    }

    if(this.#test.side<0)
      delta = -delta;
    
    if(delta < delta0 && pow > alpha){
      throw 'The specified effect size specified cannot be in the null region if power > alpha.';      
    }else if(delta>delta0 && pow < alpha){
      throw 'The specified effect size specified cannot be in the null region if power > alpha.';          
    }else if(pow == alpha){
      throw 'Power cannot be equal to alpha if computing sample size.';
    }else if(delta == delta0){
      throw 'Effect size cannot be equal to the null effect size if computing sample size.';      
    }
    
    const n2: number = this.n2;

    var neff_up: number,
      neff_lo: number,
      n_up: number,
      n2_up: number = n2,
      n_lo: number,
      n2_lo: number = n2,
      pow_up: number,
      pow_lo: number;
  
    const qpow: number = qlogis(pow);
    const delta_tmp: number = Math.abs(delta - delta0);
    const criterion0: number = -qnorm(alpha);
    const tmp: number        =  qnorm(pow) + criterion0;

    neff_lo = Math.pow( (tmp - s_dn) / delta_tmp, 2 ); 
    
    if(fix_n2){
      let es0: number = -Math.abs(delta-delta0) * Math.sqrt(n2);
      let max_pow: number = pnorm(qnorm(this.test.alpha) - es0);
      if(pow>=max_pow) throw `Power for es ${delta} requested was ${pow}. This is greater than the maximum power of ${max_pow} when n2 is fixed at ${n2} and alpha is ${alpha}.`
      neff_up = Math.pow( tmp / delta_tmp, 2 );
      n_up = Math.max(2, 1 / (1/neff_up - 1/n2) );
      n_up = n_up + Math.sqrt(Math.abs(n2 - n_up));
      n_lo = Math.max(2, 1 / (1/neff_lo - 1/n2) );
    
    }else{
      neff_up = Math.pow( (tmp + s_up) / delta_tmp, 2 );
      n_up = Math.max(2, neff_up * (1/nratio + 1));
      n_lo = Math.max(2, neff_lo * (1/nratio + 1));
      n2_up = Math.max(2, n_up * nratio);
      n2_lo = Math.max(2, n_lo * nratio);  
    }

    pow_up = this.#power1(n_up, n2_up, delta, alpha, undefined, delta0 );
    pow_lo = this.#power1(n_lo, n2_lo, delta, alpha, undefined, delta0 );

  if( n_up == 2 ) return 2; 
        
    while(pow_up < qpow){
      n_lo = n_up;
      n_up = n_up * shift_up;
      if(!fix_n2){
        n2_lo = n2_up;
        n2_up = n2_up * shift_up;
      }
      pow_up = this.#power1(n_up, n2_up, delta, alpha, undefined, delta0);    
    }
    while( ( pow_lo > qpow ) && (n_lo >= 2) ){
      n_up = n_lo;
      n_lo = n_lo * shift_dn;
      if(!fix_n2){
        n2_up = n2_lo;
        n2_lo = n2_lo * shift_dn;        
      }
      pow_lo = this.#power1(n_lo, n2_lo, delta, alpha, undefined, delta0);
    }
   
    // Ensure group 2 has at least two samples in it
    if(!fix_n2 && (n_lo * nratio < 2) )
      n_lo = 2 / nratio;
    
    var this0 = this;   

    let opt_fun = function(n1: number): number{
      var obj: number = this0.#power1(n1, fix_n2 ? n2 : Math.ceil(n1 * nratio), delta, alpha, undefined, delta0) - qpow;
      return obj * obj;
    }
    
    const n_opt: fmin_result = fmin(n_lo, n_up, opt_fun, this.options.n.tol);

    return Math.ceil( n_opt.x );
  
  }
  
  find_power( es: number[], typeS: bool = false, limit: bool = false ): number[] {   
    
    const design: ttest2_design = this.#design;
    const test: ttest2_test   = this.#test;
    const curve: pwr_curve  = this.#curve;
    const n2: number     = this.n2;
    const side: pwr_side = test.side;
    
    var criterion: number;
    
    if( typeof es === 'undefined' )
      es = [ curve.es ];
         
    if(typeS){
      criterion = -Math.sign(side) * this.#compute_criterion(design.n1, this.n2, test.alpha, -Math.sign(side) * test.es0);
    }else{
      criterion = Math.sign(side) * this.#compute_criterion(design.n1, this.n2, test.alpha, Math.sign(side) * test.es0);      
    }
    
    var this0 = this;

    return es.map(function(delta){
      var delta0 = test.es0;
      var criterion0 = criterion;
      if(delta == delta0){
        return test.alpha;
      }
      if(limit){
        if(!this0.options.fix_n2) {
          return typeS ? 0 : 1 
        }
        let ncp = Math.abs(delta - delta0) * Math.sqrt(this0.n2)
        ncp = typeS ? ncp : -ncp
        return pnorm(qnorm(test.alpha), ncp)
      }
      if(side<0){
        delta = -delta;
        delta0 = -delta0;
        criterion0 = -criterion0;
      }
      if(typeS){
        return plogis(-this0.#power1(design.n1, n2, delta, test.alpha, criterion0, delta0));
      }else{
        return plogis(this0.#power1(design.n1, n2, delta, test.alpha, criterion0, delta0));        
      }  
    });
  }
  
  find_es( power: number[], typeS: bool = false, limit: bool = false ): number[]{
  
    const design: ttest2_design  = this.#design;
    const test: ttest2_test      = this.#test;
    const curve: pwr_curve       = this.#curve;
    
    if( typeof power === 'undefined' )
      power = [ curve.power ];
    
    const criterion = 
      Math.sign(test.side) * 
      this.#compute_criterion(
        design.n1,
        this.n2,
        typeS ? 1-test.alpha : test.alpha,
        Math.sign(test.side) * test.es0
      );

    const this0 = this;
    
    return power.map(function(power){
      if(power == test.alpha){ return test.es0 }
      if(limit){
        if(!this0.options.fix_n2) {
          return test.es0 
        }
        let es_diff = (qnorm(power) - qnorm(test.alpha))/Math.sqrt(this0.n2)
        return Math.sign(test.side)*Math.abs(es_diff) + test.es0
      }
      return Math.sign(test.side) * 
        this0.#es_power(
        typeS ? 1-power : power,
        criterion ); 
    });  
  }

  find_n( curve: pwr_curve[] ): number[]{
    
    const design: ttest2_design = this.#design;
    const test: ttest2_test     = this.#test;

    if( typeof curve === 'undefined' )
      curve = [ this.#curve ];
       
    const this0 = this;
       
    return curve.map(function(curve){
      return this0.#n_power(curve.power, curve.es);      
    });
   
  }

  clear_cache(){
    
    var this0 = this;
       
    Object.keys(this.#cache).map(function(key){
      this0.#cache[ key ] = {};
    })
    
  }

  design_report(){
    var test = {};
    Object.assign(test, this.test,
      {
        es_type: this.names.es,
        criterion_on: this.names.test_stat,
        criterion: this.criterion
      });
    var curve = 
        { 
            point: this.curve,
            es50: this.es50,
            es1mAlpha : this.es1mAlpha, 
            typeS: this.find_power(undefined, true)[0] 
        };
    if(this.options.fix_n2){
      Object.assign(curve, { powerLimit: this.powerLimit })
    }
    return {
      id        : this.id,
      test      : test,
      design    : { n1 : this.n1, n2: this.n2, ntotal: this.ntotal, ratio: this.nratio },
      curve     : curve,
      precision_2alpha : this.precision_2alpha
    };
  }

  get cache(){
    return this.#cache;
  }
  
  get test(): ttest2_test{
    return this.#test;
  }
  
  set test(test: ttest2_test){
   
    const val = new Validator(test, ttest2_test_vrule)
    if (val.fails()) {
      throw 'Invalid test setup.';
    }

    var reset: bool = false,
      i: number, which_change: string[] = [];
    
    const keys: string[] = Object.keys(this.#test); 
       
    for(i=0;i<keys.length;i++){
      let key: string = keys[i];
      if(key in test)
        if(test[ key ] != this.#test[ key ]){
          which_change.push(key);
        }
    }
    
   if(which_change.length > 0){
     Object.assign(this.#test, test);
        
      if(which_change[0] == "alpha" && which_change.length == 1){ 
       if(this.options.fix_es){
         this.#curve.power = this.find_power([this.curve.es])[0];  
        }else{
         this.#curve.es = this.find_es([this.curve.power])[0];
        }
      }else{
        this.#curve.es = this.find_es([this.curve.power])[0];
      }
   }
   
   this.#stamp()

  }
  
  get n1(): number{
    return this.#design.n1;
  }
  
  set n1(n1: number){
    if(this.#design.n1 == n1) return;
    
    const val = new Validator({ n: n1}, { n: n_vrule })
    if (val.fails()) {
      throw 'Invalid sample size.';
    }

    this.#design.n1 = n1;

    if(this.options.fix_n2){
      this.#design.nratio = n1 / this.n2;
    }else{
      this.#design.n2 = Math.ceil(n1 * this.nratio);
    }
    
    if(this.options.fix_es){
      this.#curve.power = this.find_power([this.curve.es])[0]  
    }else{
      this.#curve.es = this.find_es([this.curve.power])[0]
    }

    this.#stamp()

  }
 
  get nratio(): number{
    return this.#design.nratio;
  }
  
  set nratio(nratio: number){ // attempts to preserve total n
    
    const val = new Validator({ nr: nratio}, { nr: positive_vrule })
    if (val.fails()) {
      throw 'Invalid sample size ratio.';
    }

    const ntotal: number = this.ntotal;
    const n2: number = Math.ceil(ntotal * nratio / (1 + nratio)); 
    
    this.options.fix_n2 = false;

    this.#design.nratio = nratio;     
    this.n1 = ntotal - n2;
 }
  
  get n2(): number{
    return this.#design.n2;
  }
  
  set n2(n2: number){
    n2 = Math.ceil(n2);
    
    const val = new Validator({ n: n2}, { n2: n_vrule })
    if (val.fails()) {
      throw 'Invalid sample size.';
    }
    
    this.#design.n2 = n2;
    this.#design.nratio = n2 / this.n1;
  
    if(this.options.fix_es){
      this.#curve.power = this.find_power([this.curve.es])[0]  
    }else{
      this.#curve.es = this.find_es([this.curve.power])[0]
    }

    this.options.fix_n2 = true;
    this.#stamp()
  }
  
  get ntotal(): number{
    return this.n1 + this.n2;
  }
  
  set es(es: number){
    if (this.#curve.es == es) return;
    
    const val = new Validator({ es: es}, { es: 'number' })
    if (val.fails()) {
      throw 'Invalid effect size.';
    }

    this.#curve.es = es;
    this.#curve.power = this.find_power([es])[0];
    this.#stamp()
  }
  
  set power(power: number){
    if(this.#curve.power == power) return;     
    
    const val = new Validator({ power: power}, { n: prob_exclusive_vrule })
    if (val.fails()) {
      throw 'Invalid power.';
    }

    this.#curve.power = power;
    this.#curve.es = this.find_es([power])[0];
    this.#stamp()   
  }
  
  get precision_2alpha(): number{
    
    const es: number = this.find_es([1 - this.#test.alpha])[0];
    // add cache?
    return Math.abs( this.#test.es0 - es );
  }
  
  set precision_2alpha(p: number){
    
    const val = new Validator({ p: p}, { p: positive_vrule })
    if (val.fails()) {
      throw 'Invalid precision.';
    }
    
    const fix_n2: bool = this.options.fix_n2;
    const es: number = this.#test.es0 + Math.sign(this.#test.side)*Math.abs(p); 
    const n1: number = this.find_n( [ { es: es, power: 1 - this.#test.alpha } ] )[0];
    if(fix_n2){
      this.#design.nratio = n1 / this.n2;  
    }else{
      this.#design.n2 = Math.ceil(n1 * this.nratio);
    }
    this.n1 = n1;

    // add cache?
  }
  
  get es50(): number{
    // add cache?
    return this.find_es( [ 0.5 ] )[0];
  }
  
  get powerLimit(): number{
    return this.find_power( [ this.#curve.es ], null, true )[0];
  }

  set es50(es: number) {

    const min_max: string = this.#test.side > 0 ? "min" : "max";
    
    const val = new Validator({ es: es}, { es: `${min_max}:${this.#test.es0 + Number.EPSILON}` })
    if (val.fails()) {
      throw 'Invalid effect size.';
    }

    const n1 = this.find_n( [ { power: 0.5, es: es } ] )[0];
    const fix_n2: bool = this.options.fix_n2;
    if (fix_n2) {
      this.#design.nratio = n1 / this.n2;  
    }else{
      this.#design.n2 = Math.ceil(n1 * this.nratio);
    }
    this.n1 = n1;
    // add cache?
  }
  
  get es1mAlpha(): number{
    return this.#test.es0 + Math.sign(this.#test.side) * this.precision_2alpha; 
  }
  
  set es1mAlpha(es: number){
    
    const min_max: string = this.#test.side > 0 ? "min" : "max";

    const val = new Validator({ es: es}, { es: `${min_max}:${this.#test.es0 + Number.EPSILON}` })
    if (val.fails()) {
      throw 'Invalid effect size.';
    }

    this.precision_2alpha = Math.abs(es - this.#test.es0);
  }
  
  get curve(): pwr_curve{
    return this.#curve;
  }
  
  set curve(curve: pwr_curve){
        
    const val = new Validator({ curve: curve}, { curve: pwr_curve_vrule })
    if (val.fails()) {
      throw 'Invalid power curve values.';
    }

    var reset = false, i;
    const fix_n2 = this.options.fix_n2;

    const keys = Object.keys(this.#curve); 
       
    for(i=0;i<keys.length;i++){
      let key = keys[i];
      if(key in curve)
        if(curve[ key ] != this.#curve[ key ]){
          reset = true;
          break;
        }
    }
    
    Object.assign(this.#curve, curve);
    if(reset){
      const n1 = this.find_n( [ { power: this.#curve.power, es: this.#curve.es } ] )[0];
      if(fix_n2){
        this.#design.nratio = n1 / this.n2;  
      }else{
        this.#design.n2 = Math.ceil(n1 * this.nratio);
      }
      this.n1 = n1;
    }
  }
  
  get criterion(): number{
    const delta0 = this.#test.es0;
    return Math.sign(this.#test.side) * this.#compute_criterion(this.#design.n1, this.n2, this.#test.alpha, this.#test.side<0 ? -delta0 : delta0);
  }
 
  /*
  set criterion(c){ // Do we really want this?
    // add in reset logic, etc
  } 
  */
  
}

module.exports = {
  ttest2_pwr : ttest2_pwr
};

