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
    if (!isFinite(ax) || !isFinite(bx))
        throw `Bounds ax, bx must be finite: ${ax}, ${bx}`;
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
        if (Math.abs(x - xm) <= (tol2 - 0.5 * (b - a))) {
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
                if ((u - a) < tol2) {
                    d = sign(tol1, xm - x);
                }
                if ((b - u) < tol2) {
                    d = sign(tol1, xm - x);
                }
            }
            else {
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
        }
        else {
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
    return { x: x, fx: fx, i: i };
}
module.exports = {
    fmin0: fmin0
};
//# sourceMappingURL=fmin.js.map