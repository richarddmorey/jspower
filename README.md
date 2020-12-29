# jspower
A javascript power interface

![Interface](https://richarddmorey.github.io/jspower/img/jspower.gif)

This project implements power analyses in javscript. Eventually, this will also be wrapped in an R package using {[V8](https://cran.r-project.org/web/packages/V8/index.html)}.

The underlying philosophy is:

* To encourage thinking about power *curves* rather than power *values*, 
* To encourage thinking about power as a function of the *design* and *test*,
* To encourage *interactive* power/design thinking, and
* To build functions that will be useful for deploying design analyses on the web (see https://richarddmorey.github.io/jspower-site/).

See ["Power and precision"](https://medium.com/@richarddmorey/power-and-precision-47f644ddea5e?source=friends_link&sk=20a7fd66048b5ead68050b791ebbf79b) and ["Why you shouldn't say 'this study is underpowered'"](https://towardsdatascience.com/why-you-shouldnt-say-this-study-is-underpowered-627f002ddf35?source=friends_link&sk=8f150607a87bd81b879434a02b92c7e4) for more on the philosophy of power analysis underlying the development.

To this end, the functions will be based around methods of a design/test pairing. A design/test object can be changed and queried to perform a power analysis.

This is in a very early stage of development. Here's how to try it:

1. Install [node.js](https://nodejs.org/en/) on your system (if you're running MacOS or Linux you may already have it)
2. Make a new folder in which to work, and open a new terminal
3. Install the package:
```
npm i git+https://github.com/richarddmorey/jspower.git
```
4. Start `node` in that folder
4. Type the following:

```
// Grab the constructor for ttest power objects
const ttest2_pwr = require('jspower').ttest2_pwr;
var t = new ttest2_pwr();
```

The object `t` is now a design/test object with some default values. To query it, use `design_report()`:
```
t.design_report();
```
which should output:

```
{
  test: { es0: 0, side: 1, alpha: 0.025, criterion: 1.9615076174957067 },
  design: { n1: 770, n2: 770, ntotal: 1540, ratio: 1 },
  curve: {
    point: { es: 0.1999029246788231, power: 0.975 },
    es50: 0.0999514293350958,
    es1mAlpha: 0.1999029246788231,
    typeS: 2.052704117794239e-9
  },
  precision_2alpha: 0.1999029246788231
}
```

For a description of all the elements of the design report, see the section below.

Now, we can change the design to see how the sensitivity changes:

```
t.n1 = 150
```
The `nratio` is set to 1 by default, so this will also set `n2`. Note how the design report changes (`t.design_report()`):
```
{
  test: { es0: 0, side: 1, alpha: 0.025, criterion: 1.96795650649682 },
  design: { n1: 150, n2: 150, ntotal: 300, ratio: 1 },
  curve: {
    point: { es: 0.1999029246788231, power: 0.4073631282731639 },
    es50: 0.2270490751101992,
    es1mAlpha: 0.4541012927113137,
    typeS: 0.00011407515462524834
  },
  precision_2alpha: 0.4541012927113137
}
```
The new point on the power curve under `curve.point` is the one with the same effect size as was set before. The power at that effect size has dropped from .975 to about .41. By default, the new `curve.point` will have the same power. To fix the power instead (and let the effect size change) set the option `fix_es` to `false`:

```
t.options.fix_es = false
```

Now changing the design will power fixed and the effect size will change.

## Other functions

### `t.find_n()`

Finds sample sizes for an array of curve values (given by objects), given the defined test:

```
t.find_n([{es: 1, power: .9}]);
// Returns [ 22 ]
```

### `t.find_es()`

Finds effect sizes for an array of power values, given the defined test and design:

```
t.find_es([.6,.9]);
// Returns [ 0.2563979197369567, 0.3755101746821198 ]
```

### `t.find_power()`

Finds power for an array of effect sizes, given the defined test and design:


```
t.find_power([.2,.4]);
// Returns [ 0.40768841290143554, 0.9322751597343004 ]
```

### `t.density()`

Yields the density (or cumulative density) of the sampling distribution for either the test statistic (t) or observed effect size (d) for a given true effect size:

```
t.density([0,.5], 1)
// Returns [ 1.7866245026413097e-16, 0.0003904513212928331 ]
```

### `t.quantile()`

Yields the quantile function of the sampling distribution for either the test statistic (t) or observed effect size (d) for a given true effect size:

```
t.quantile([.25,.5,.75], .1)
// Returns [ 0.19167561817629775, 0.8667525446561228, 1.5431551328239692 ]
```




## Elements of the design report

| Element | Description | Example for how to change | Note |
|---------|-------------|--------------|-----|
| id      | A name for the object  |  `t.id = "Analysis 1"`    | |
| test    | Parameters of the (one-sided) test | `t.test = {}` | |
| test.es0| Null effect size |  `t.test = {es0: .2}` | |
| test.side| Side of alternative (-1: "less", 1: greater) | `t.test = {side: -1}` | |
| test.alpha| alpha level for test  | `t.test = {alpha: .05}` | |
| test.criterion | Criterion on t statistic for significance | NA | |
| test.es_type | The parameter indexing true effect size | NA | |
| test.criterion_on | The test statistic | NA | |
| design   | Design parameters | NA | |
| design.n1 | Sample size for reference group | `t.n1 = 150` | |
| design.n2 | Sample size for second group| `t.n2 = 100` | If you change this directly, `n2` will be fixed as `n1` changes until you change `nratio` explicitly |
| design.ratio| Sample size ratio `n2/n1` | `t.nratio = 2` | If you change this directly, `n2` will change as `n1` changes, until you change `n2` explicitly |
| curve | Values on the power curve | `t.curve = {es: .5, power: .8}` | If you change this, the design parameters (sample sizes) will change. 
| curve.point | A given point on the power curve | `t.es = .5` or `t.power = .75` | If you change only one of these, the design will not change. Instead, a new point on the same curve will be reported. |
| curve.es50 | The effect size where power is 50% | `t.es50 = .5` | Changing this will change the design parameters (sample sizes). |
| curve.es1mAlpha | The "counternull" where power is 1-alpha. | `t.es1mAlpha = 1` |Changing this will change the design parameters (sample sizes). |
| curve.typeS | The probability of a sign error at level alpha (that is, s "significant" effect going in the wrong direction) given the effect size and design. | NA | |
| precision_2alpha | The width of the 1-2alpha confidence interval when p=alpha| `t.precision_2alpha = .8` | Changing this will change the design parameters (sample sizes). |

## Elements of the options object

| Element | Description | Example for how to change | Note |
|---------|-------------|--------------|-----|
| fix_es  | (`true`/`false`) Whether to fix the effect size when the design changes | `t.options.fix_es = false` | `true` by default. |
| fix_n2  | (`true`/`false`) Whether to fix `n2` as `n1` changes |  `t.options.fix_n2 = false` | By default, the ratio of `n2/n1` is fixed by `nratio`, so `n2` will change with `n1`. Setting this option to `true` will fix `n2` instead. Changing `n2` explicitly automatically sets this to `true`; changing `nratio` explicitly automatically sets this to `false`.|

The other options mostly govern the precision/speed of optimization and should not be changed by users.


