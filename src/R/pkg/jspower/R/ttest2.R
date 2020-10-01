

#' Title
#'
#' @param ctx 
#' @param obj_name 
#'
#' @return
#' @export
#'
#' @examples
ttest_pwr = function(ctx, obj_name = "t"){
  ctx$eval(glue::glue("{obj_name} = new jspower.ttest2_pwr();"))
  return(ctx)
}

#' Title
#'
#' @param ctx 
#' @param n1 
#' @param obj_name 
#'
#' @return
#' @export
#'
#' @examples
n1 = function(ctx, n1 = NULL, obj_name = "t"){
  s = glue::glue("{obj_name}.n1")
  if(is.null(n1)){
    return(ctx$get(s))
  }else{
    glue::glue("{s} = {n1};") %>%
      ctx$eval() 
    return(ctx)
  }
}

#' Title
#'
#' @param ctx 
#' @param alpha 
#' @param side 
#' @param es0 
#' @param obj_name 
#' @param stringify 
#'
#' @return
#' @export
#'
#' @examples
test = function(ctx, alpha = NULL, side = NULL, es0 = NULL, obj_name = "t", stringify = TRUE){
  s = glue::glue("{obj_name}.test")
  
  if(is.null(alpha) & is.null(side) & is.null(es0)){
    if(stringify){
      glue::glue("JSON.stringify({s})") %>%
        ctx$get() %>%
        jsonlite::prettify() -> x
      return(x)
    }
    return(ctx$get(s))
  }
  
  alpha_s = ""
  side_s  = ""
  es0_s   = ""
  if(!is.null(alpha)){
    alpha_s = glue::glue("alpha: {alpha},")
  }
  if(!is.null(side)){
    side_s = glue::glue("side: {side},")
  }
  if(!is.null(es0)){
    es0_s = glue::glue("es0: {es0},")
  }
  glue::glue("{s} = {{ {alpha_s} {side_s} {es0_s} }}") %>% 
    ctx$eval() 
  return(ctx)
}



#' Title
#'
#' @param ctx 
#' @param es 
#' @param power 
#' @param obj_name 
#'
#' @return
#' @export
#'
#' @examples
find_n = function(ctx, es, power, obj_name = "t"){
  if(any(power>=1) | any(power<=0))
    stop("Power must by greater than 0 and less than 1.")
  if( (length(power)==length(es)) | (length(es)==1) | (length(power)==1)){
    glue::glue("{{ power: {power}, es: {es} }}") %>%
      paste(collapse=", ") %>%
      paste("[", ., "]") -> arg
  }else{
    stop("Invalid lengths of power and es; must match or be 1.")
  }
  glue::glue("{obj_name}.find_n({arg});") %>%
    ctx$get()
}

#' Title
#'
#' @param ctx 
#' @param obj_name 
#' @param stringify 
#'
#' @return
#' @export
#'
#' @examples
design_report = function(ctx, obj_name = "t", stringify = TRUE){
  s = glue::glue("{obj_name}.design_report()")
  if(stringify){
    glue::glue("JSON.stringify({s});") %>%
      ctx$get() %>%
      jsonlite::prettify() -> x
    return(x)
  }
  return(ctx$get(s))
}
