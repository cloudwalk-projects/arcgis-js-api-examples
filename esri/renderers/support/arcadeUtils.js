// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define("require exports dojo/_base/lang ../../arcade/arcade ../../arcade/Dictionary ../../geometry/SpatialReference".split(" "),function(p,c,k,d,l,m){function e(a){var b;try{b=a?d.parseScript(a):null}catch(f){b=null}return b}var g=/^\$feature\./i,h=new m,n={vars:{$feature:"any",$view:"any"}};c.createSyntaxTree=e;c.createFunction=function(a,b){b=b||k.clone(n);var f="string"===typeof a?e(a):a,c;try{c=f?d.compileScript(f,b):null}catch(g){c=null}return c};c.createExecContext=function(a,b){return{vars:{$feature:d.constructFeature(a),
$view:b}}};c.evalSyntaxTree=function(a,b){return d.executeScript(a,b,h)};c.executeFunction=function(a,b){return a?a(b,h):null};c.extractFieldNames=function(a){if(!a)return[];a="string"===typeof a?e(a):a;var b=[];d.extractFieldLiterals(a).forEach(function(a){g.test(a)&&(a=a.replace(g,""),b.push(a))});b.sort();return b.filter(function(a,c){return 0===c||b[c-1]!==a})};c.dependsOnView=function(a){return d.referencesMember(a,"$view")};c.getView=function(a){return a&&a.viewingMode&&null!=a.scale?new l({viewingMode:a.viewingMode,
scale:a.scale}):"any"}});