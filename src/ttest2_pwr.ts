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

interface ttest2_pwr_options {
    fix_es: bool,
    fix_n2: bool,
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
  shift_dn: number
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

interface ttest2_test {
  alpha: number,
  es0: number,
  side: pwr_side
}

interface ttest2_cache {
  criterion: object
}

class ttest2_pwr {
       
  constructor(precision_2alpha: number = 0.2, nratio: number = 1, test = {}, options = {}){  
    
    this.#design.nratio = nratio;
    
    Object.assign(this.#test, test);
        
    var options0: ttest2_pwr_options = {
      fix_es: true,
      fix_n2: false,
      es : { tol: 0.0000001, s_up: 1, s_dn: 1, shift_up: 2, shift_dn: 2 },
      n  : { tol: 0.25,      s_up: 3, s_dn: 1, shift_up: 1.5, shift_dn: .67 },
      criterion : { cache: true, s_up: 1, t_shift: 5, i_limit: 10, t_up_tol: 0.0001, tol: 0.0000001 }
    }  
    
    Object.assign(options0, options);
    
    this.options = options0;
    
    this.precision_2alpha = precision_2alpha;
    this.curve = { es: this.es1mAlpha, power: 1 - this.test.alpha }
    
  }
  
  options: ttest2_pwr_options;

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

  
  // Note that this returns log-odds of power!
  #power1 = ( n1: number, n2: number, delta: number, alpha: number, criterion: number, delta0:number ): number => {
    
    if(delta == delta0) return alpha;   
 
    const neff: number = n1 * n2 / (n1 + n2);
    const df: number   = n1 + n2 - 2;
    if( typeof criterion === 'undefined' )
      criterion = this.#compute_criterion(n1, n2, alpha, delta0);
    
    const ncp: number = delta * Math.sqrt( neff );
       
    const logpow: number = pt(criterion, df, ncp, false, true);

   return qlogis( logpow, 0, 1, true, true );
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
    const s_dn: number   = this.options.n.s_dn;
    const s_up: number   = this.options.n.s_up;
    const shift_dn: number = this.options.n.shift_dn;
    const shift_up: number = this.options.n.shift_up;
    
    if(pow == this.#test.alpha)
      return this.#test.es0;
      
    if(this.#test.side<0)
      criterion = -criterion;

    var es_up, es_lo, pow_up, pow_lo;
    
    const qpow = qlogis(pow);
  
    const neff = n1 * n2/ ( n2 + n2 );
    const df   = n1 + n2 - 2;

    const tmp = criterion - qnorm(pow, 0, 1, false);     
    es_up = (tmp + s_up)/Math.sqrt(neff);
    es_lo = (tmp - s_dn)/Math.sqrt(neff);

    pow_up = this.#power1(n1, n2, es_up, undefined, criterion, delta0);
    pow_lo = this.#power1(n1, n2, es_lo, undefined, criterion, delta0);

    while(pow_up < qpow){
      es_lo = es_up;
      es_up = es_up + shift_up;
      pow_up = this.#power1(n1, n2, es_up, undefined, criterion, delta0);    
    }
    while(pow_lo > qpow){
      es_up = es_lo;
      es_lo = es_lo - shift_dn;
      pow_lo = this.#power1(n1, n2, es_lo, undefined, criterion, delta0);
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
    const delta0: number = this.#test.side<0 ? -this.#test.es0 : this.#test.es0;
    const fix_n2: bool = this.options.fix_n2;

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
      let es0: number = Math.abs(delta-delta0) * Math.sqrt(n2);
      let max_pow: number = pnorm(criterion0, es0, 1, false);
      neff_up = n2 - 1;
      if(pow>=max_pow) throw `Power for es ${delta} requested was ${pow}. This is greater than the maximum power of ${max_pow} when n2 is fixed at ${n2} and alpha is ${alpha}.`
      
      n_up = Math.max(2, 1 / (1/neff_up - 1/n2) );
      n_lo = Math.max(2, 1 / (1/neff_lo - 1/n2) );
    
    }else{
      neff_up = Math.pow( (tmp + s_up) / delta_tmp, 2 );
      n_up = Math.max(2, neff_up * (1/nratio + 1));
      n_lo = Math.max(2, neff_lo * (1/nratio + 1));
      n2_up = Math.max(2, n_up * nratio);
      n2_lo = Math.max(2, n_lo * nratio);  
    }
    
    if( n_up == 2 ) return 2; 
    
    pow_up = this.#power1(n_up, n2_up, delta, alpha, undefined, delta0 );
    pow_lo = this.#power1(n_lo, n2_lo, delta, alpha, undefined, delta0 );

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
  
  find_power( es: number[], typeS: bool = false ): number[] {   
    
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
  
  find_es( power: number[] ): number[]{
  
    const design: ttest2_design  = this.#design;
    const test: ttest2_test      = this.#test;
    const curve: pwr_curve       = this.#curve;
    
    if( typeof power === 'undefined' )
      power = [ curve.power ];
      
    const criterion = Math.sign(test.side) * this.#compute_criterion(design.n1, this.n2, test.alpha, Math.sign(test.side) * test.es0);
   
    const this0 = this;
    
    return power.map(function(power){
      return Math.sign(test.side) * this0.#es_power(power, criterion );  
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
    Object.assign(test, this.test, {criterion: this.criterion});
    const curve = 
        { 
            point: this.curve,
            es50: this.es50,
            es1mAlpha : this.es1mAlpha, 
            typeS: this.find_power(undefined, true)[0] 
        };
    return {
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
   
  }
  
  get n1(): number{
    return this.#design.n1;
  }
  
  set n1(n1: number){
    if(this.#design.n1 == n1) return;
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
  }
 
  get nratio(): number{
    return this.#design.nratio;
  }
  
  set nratio(nratio: number){ // attempts to preserve total n
    
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
    this.#design.n2 = n2;
    this.#design.nratio = n2 / this.n1;
  
    if(this.options.fix_es){
      this.#curve.power = this.find_power([this.curve.es])[0]  
    }else{
      this.#curve.es = this.find_es([this.curve.power])[0]
    }

    this.options.fix_n2 = true;
  }
  
  get ntotal(): number{
    return this.n1 + this.n2;
  }
  
  set es(es: number){
    if(this.#curve.es == es) return;
    this.#curve.es = es;
    this.#curve.power = this.find_power([es])[0];
  }
  
  set power(power: number){
    if(this.#curve.power == power) return;     
    this.#curve.power = power;
    this.#curve.es = this.find_es([power])[0];    
  }
  
  get precision_2alpha(): number{
    const es: number = this.find_es( [ 1 - this.#test.alpha ] )[0];
    // add cache?
    return Math.abs( this.#test.es0 - es );
  }
  
  set precision_2alpha(p: number){
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
  
  set es50(es: number){
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
    this.precision_2alpha = Math.abs( es - this.#test.es0 );
  }
  
  get curve(): pwr_curve{
    return this.#curve;
  }
  
  set curve(curve: pwr_curve){
    
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

