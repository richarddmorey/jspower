
function fix_delta(){
  return $("#opts_fixdelta").prop("checked");
}

function n_points(){
  return parseFloat( $("#opts_npoints").val() );
}

function alpha_val(){
  return parseFloat( $("#alpha_out").val() );
}

function n_val(){
  return Math.ceil(parseFloat($("#N1_out").val()));
}

function power_val(){
  return parseFloat( $("#power_out").val() );
}

function delta_val(){
  return parseFloat( $("#delta_out").val() );
}

function n_ratio_val(){
  return parseFloat($("#Nratio").val());
}

function null_d_val(){
  return parseFloat($("#opts_nulld").val());
}

function smallest_d_increment_val(){
  return parseFloat($("#opts_delta_inc").val());
}

function smallest_alpha_val(){ 
  return parseFloat($("#opts_sm_alpha").val());
}

function largest_alpha_val(){ 
  return parseFloat($("#opts_lg_alpha").val());
}

function smallest_power_val(){
  return parseFloat($("#opts_sm_power").val());
}

function largest_power_val(){ 
  return parseFloat($("#opts_lg_power").val());
}

function sided_val(){
  return ($("#side_out").val() == "1") ? 1 : -1;
}

function report_N(N1){
  var N2 = Math.ceil(N1 * n_ratio_val());
  var Ntotal = N1 + N2;
  $("#N1_out").val(N1);
  $("#N2_out").val(N2);
  $("#Ntotal_out").val(Ntotal);
}

function swap_sided(){
  if(sided_val()>0){
    $("#opts_sided")
      .text("less than")
      .removeClass("pwr_pickside_gt")
      .addClass("pwr_pickside_lt");
    $("#side_out").val("-1");
  }else{
    $("#opts_sided")
      .text("greater than")
      .removeClass("pwr_pickside_lt")
      .addClass("pwr_pickside_gt");
    $("#side_out").val("1");
  }

  update_power_plot()

}


function reset_n(){
  var N1 = parseFloat($("#N1").val());
  report_N(N1);
  update_power_plot();
}

function reset_alpha(){
  var alpha = parseFloat($("#opts_setalpha").val());
  $("#alpha_out").val(alpha);
  update_power_plot();
}

function reset_n_ratio(){
  var N1 = n_val();
  var N2 = parseFloat($("#N2_out").val());
  var Ntotal = N1 + N2;
  var Nratio = n_ratio_val();


  var newN1 = Math.ceil(Ntotal/(1 + Nratio));
  var newN2 = Ntotal - newN1;

  report_N(newN1);
  update_power_plot();
}

function reset_null(){
  if(!isNaN(null_d_val()))  
    update_power_plot();
}

function reset_power_handle(new_power=0.5){
  var middle_handle_delta = t_find_es_power(new_power, alpha_val(), n_val(), n_ratio_val(), null_d_val(), sided_val()).argmin;
  $("#power_out").val(new_power);
  $("#delta_out").val(middle_handle_delta);
  d3.select(".handle2")
          .attr('cy', y(new_power))
          .attr('cx', x(middle_handle_delta)); 
  format_output()
}


function fixedRound(x,d=3){
  var t = Math.pow(10, d);
  return parseFloat((Math.round(x*t)/t).toFixed(d));
}

function compute_criterion(alpha, N1, Nratio, null_d, sided, normal=false, tol = 0.00001, maxIterations = 100){
  
  var N2 = Math.ceil(N1 * Nratio);
  var Neff = N1 * N2 / (N1 + N2);
  var df = N1 + N2 - 2;
  
  var criterion;

  if(sided>0){
    criterion = noncentralt_inv(1 - alpha, df, null_d*Math.sqrt(Neff), normal, tol, maxIterations);
  }else{
    criterion = noncentralt_inv(alpha, df, null_d*Math.sqrt(Neff), normal, tol, maxIterations);
  }

  return criterion;
}

function format_output(criterion){
  
  var N1 = n_val();
  var N2 = Math.ceil(N1 * n_ratio_val());
  var Neff = N1 * N2 / (N1 + N2);
  var df = N1 + N2 - 2;

  var rel_report;
  var relr2_report;
  var relr_oppo_report;
  var relr2_oppo_report;
  var d50_report;

  var upper_handle_delta = x.invert(d3.select(".handle3").attr("cx")); 

  if($("#opts_sided").text()=="greater than"){
    rel_report = "large"
    relr2_report = "at least"
    relr_oppo_report = "smaller than"
    relr2_oppo_report = "at most"
  }else{
    rel_report = "small"
    relr2_report = "at most"
    relr_oppo_report = "larger than"
    relr2_oppo_report = "at least"
  }


  $(".N1_report").text(n_val);
  $(".N2_report").text(N2);
  $(".Ntotal_report").text(N1 + N2);
  
  $(".criterion_report").text();
  $(".power_report").text(fixedRound(power_val()*100, 1));
  $(".delta_report").text(fixedRound(delta_val()));
  $(".alpha_report").text(fixedRound(alpha_val()*100, 1));

  $(".hypo_report").text($("#opts_sided").text());
  $(".rel_report").text(rel_report);
  $(".relr_report").text($("#opts_sided").text());
  $(".relr2_report").text( relr2_report );
  $(".relr_oppo_report").text( relr_oppo_report );
  $(".relr2_oppo_report").text( relr2_oppo_report );

  $(".upper_d_report").text(fixedRound(upper_handle_delta));
  $(".nulld_report").text(null_d_val());
  
  $(".cilevel_report").text(fixedRound(((1 - 2*alpha_val())*100),1));
  $(".ciwidth_report").text(fixedRound(Math.abs(upper_handle_delta - null_d_val())));
  
  if(typeof criterion !== 'undefined'){
    d50_report = t_find_es_power(0.5, alpha_val(), n_val(), n_ratio_val(), null_d_val(), sided_val(), criterion).argmin;
    $(".d50_report").text(fixedRound(d50_report));
    $(".criterion_report").text( fixedRound(criterion) );
  }
    

}

function power_curve(alpha, N1, Nratio, null_d=0, criterion, sided, smallest_alpha, largest_power, n_points, max_d, normal = false, tol = 0.00001, maxIterations = 100 ){

  var N2 = Math.ceil(N1 * Nratio);
  var Neff = N1 * N2 / (N1 + N2);
  var df = N1 + N2 - 2;

  if(criterion === null)
    criterion = compute_criterion(alpha, N1, Nratio, null_d, sided, normal, tol, maxIterations);

  var x = 
       [
        t_find_es_power(0.5, alpha, N1, Nratio, null_d, sided, criterion, normal, tol, maxIterations).argmin,
        t_find_es_power(0.975, alpha, N1, Nratio, null_d, sided, criterion, normal, tol, maxIterations).argmin,
        t_find_es_power(largest_power, alpha, N1, Nratio, null_d, sided, criterion, normal, tol, maxIterations).argmin,
        null_d
       ];

  var y = 
       [
         0.5,
         0.975,
         largest_power,
         alpha
       ];

  if(typeof max_d !== 'undefined')  {
    if(!isNaN(max_d)){
      var max_y = t_power(max_d, Neff, df, criterion, sided)
      if(!isNaN(max_y)){
        x.push(max_d);
        y.push(max_y);
      }
    }
  }

  var p = Array(n_points);
  var q = Array(n_points);

  for(var i=0;i<n_points;i++){
    p[i] = i * (largest_power - alpha)/(n_points - 1) + alpha;
    q[i] = jStat.normal.inv(p[i], x[0], (x[1] - x[0])/2 );
    p[i] = t_power(q[i], Neff, df, criterion, sided);
  }

  var all_x = q.concat(x);
  var all_y = p.concat(y);

  var data = all_x.map(function(e, i) {
    return {x: e, y:all_y[i]};
  }).sort(function(x, y){
     return d3.ascending(x.x, y.x);
  });

  return data;
}


function power_handles(power, alpha, N1, Nratio, null_d=0, sided=1, normal = false, tol = 0.00001, maxIterations = 100 ){

  var N2 = Math.ceil(N1 * Nratio);
  var Neff = N1 * N2 / (N1 + N2);
  var df = N1 + N2 - 2;

  var criterion = compute_criterion(alpha, N1, Nratio, null_d, sided, normal, tol, maxIterations);

  var x_handles = [
    null_d,
    t_find_es_power(power, alpha, N1, Nratio, null_d, sided, criterion, normal, tol, maxIterations).argmin,
    t_find_es_power(1 - alpha, alpha, N1, Nratio, null_d, sided, criterion, normal, tol, maxIterations).argmin
  ];

  var y_handles = [
    alpha,
    power,
    1 - alpha
  ];

  classes = [
    "handle handle1",
    "handle handle2",
    "handle handle3"
  ];

  var data_handles = x_handles.map(function(e, i) {
      return [
        e, 
        y_handles[i], 
        i, 
        classes[i]
        ];
  })

  return data_handles;
}


// https://github.com/scijs/minimize-golden-section-1d
function goldenSectionMinimize (f, xL, xU, tol, maxIterations, status) {
  
  var PHI_RATIO = 2 / (1 + Math.sqrt(5));

  var xF, fF;
  var iteration = 0;
  var x1 = xU - PHI_RATIO * (xU - xL);
  var x2 = xL + PHI_RATIO * (xU - xL);
  // Initial bounds:
  var f1 = f(x1);
  var f2 = f(x2);

  // Store these values so that we can return these if they're better.
  // This happens when the minimization falls *approaches* but never
  // actually reaches one of the bounds
  var f10 = f(xL);
  var f20 = f(xU);
  var xL0 = xL;
  var xU0 = xU;

  if (status) {
    status.bounds  = [xL,xU];
    status.initial = [f10,f1,f2,f20];
  }

  // Simple, robust golden section minimization:
  while (++iteration < maxIterations && Math.abs(xU - xL) > tol) {
    if (f2 > f1) {
      xU = x2;
      x2 = x1;
      f2 = f1;
      x1 = xU - PHI_RATIO * (xU - xL);
      f1 = f(x1);
    } else {
      xL = x1;
      x1 = x2;
      f1 = f2;
      x2 = xL + PHI_RATIO * (xU - xL);
      f2 = f(x2);
    }
  }

  xF = 0.5 * (xU + xL);
  fF = 0.5 * (f1 + f2);

  if (status) {
    status.iterations = iteration;
    status.argmin = xF;
    status.minimum = fF;
    status.converged = true;
  }

  if (isNaN(f2) || isNaN(f1) || iteration === maxIterations) {
    if (status) {
      status.converged = false;
    }
    //console.log("goldenSectionMinimize did not converge: ")
    //console.log(status)
    return NaN;
  }

  if (f10 < fF) {
    return xL0;
  } else if (f20 < fF) {
    return xU0;
  } else {
    return xF;
  }
}

function noncentralt_inv_normal(p, df, ncp){
  var x1 = 1 / (1 - 3 / (4*df - 1));
  var expv = ncp * x1;
  var variance = df * (1 + ncp*ncp)/(df-2) - expv * expv;
  return jStat.normal.inv(p, expv, Math.sqrt(variance));
}

function noncentralt_inv(p, df, ncp, normal = false, tol = 0.00001, maxIterations = 100){

  if(Math.abs(ncp)<0.01)
    return jStat.studentt.inv(p, df);

  if(normal & df > 2)
    return noncentralt_inv_normal(p, df, ncp);

  var xL = jStat.normal.inv(p, ncp, 1) - 1;
  var xU = jStat.normal.inv(p, ncp, 1) + 1;

  var status_obj = { what: "noncentralt_inv" };
  var delta = goldenSectionMinimize(
    function obj_fun(t_val){
    var objective = jStat.noncentralt.cdf(t_val, df, ncp) - p;
    return objective*objective;
  }, xL, xU, tol, maxIterations, status_obj);
  return status_obj.argmin;
}

t_power = function(delta, Neff, df, criterion, sided=1){
	if(sided>0){
    return 1 - jStat.noncentralt.cdf(criterion, df, delta * Math.sqrt(Neff) );
  }else{
    return jStat.noncentralt.cdf(criterion, df, delta * Math.sqrt(Neff) );
  }
}

function t_find_es(delta, power, Neff, df, criterion, sided=1)
{
	var objective =  t_power(delta, Neff, df, criterion, sided) - power;
	return objective * objective;
}

function t_find_N(N1, Nratio, delta, power, alpha, null_d=0, sided=1,normal=false,tol = 0.00001, maxIterations = 100)
{
	var N2        = Math.ceil(Nratio * N1);
	var Neff      = (N1 * N2) / (N1 + N2);
	var df        = N1 + N2 - 2;

  var criterion = compute_criterion(alpha, N1, Nratio, null_d, sided, normal, tol, maxIterations);

	var objective =  t_power(delta, Neff, df, criterion, sided) - power;
	
  return objective * objective;
}


function t_find_es_power(power, alpha, N1, Nratio = 1, null_d=0, sided=1,criterion,normal=false,tol = 0.00001, maxIterations = 100){

  var N2        = Math.ceil(Nratio * N1);
  var Neff      = (N1 * N2) / (N1 + N2);
  var df        = N1 + N2 - 2;

  if(typeof criterion === 'undefined')
    criterion = compute_criterion(alpha, N1, Nratio, null_d, sided, normal, tol, maxIterations);


  var xL, xU;
  if(sided > 0){
    xU = (criterion - jStat.normal.inv(1-power, 0, 1 ) + 1)/Math.sqrt(Neff);
    xL = null_d;
  }else{
    xL = (criterion - jStat.normal.inv(power, 0, 1 ) - 1)/Math.sqrt(Neff);
    xU = null_d;
  }

	var status_obj = { what: "t_find_es_power" };
	var delta = goldenSectionMinimize(
		function(delta){ return t_find_es(delta, power, Neff, df, criterion, sided); },
		xL, xU, tol, maxIterations, status_obj);
	return status_obj;
}

function t_find_N_power(power, alpha, delta, Nratio = 1, null_d=0, sided=1,normal=false,tol = 0.00001, maxIterations = 100){

  var delta0 = Math.abs(delta - null_d);
  var criterion0, xL, xU;
  var criterion0 = jStat.normal.inv(1 - alpha,0,1);
  var xU = Math.pow( ( jStat.normal.inv(power, 0, 1 ) + criterion0 + 2 ) / delta0 , 2);
 
	var status_obj = { what: "t_find_N_power" };
	var N = goldenSectionMinimize(
		function(N1){ return t_find_N(N1, Nratio, delta, power, alpha, null_d, sided, normal, tol, maxIterations) },
		2, xU, tol, maxIterations, status_obj);
	return status_obj;
}
