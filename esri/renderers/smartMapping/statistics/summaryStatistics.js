// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define("require exports dojo/_base/lang ../../../tasks/support/StatisticDefinition ./classBreaks ../../../core/promiseUtils ./support/utils ../support/utils".split(" "),function(C,D,p,r,s,g,d,l){function t(a){if(!a||!a.layer||!a.field&&!a.valueExpression&&!a.sqlExpression)return g.reject(d.createError("summary-statistics:missing-parameters","'layer' and 'field', 'valueExpression' or 'sqlExpression' parameters are required"));var b=p.mixin({},a);b.normalizationType=d.getNormalizationType(b);b.layer=
l.createLayerAdapter(b.layer);return!b.layer?g.reject(d.createError("summary-statistics:invalid-parameters","'layer' must be one of these types: "+u)):b.layer.load().then(function(){var a=b.layer,e=b.field,q=b.normalizationType,k="function"===typeof e,f=b.valueExpression||b.sqlExpression,h=e?a.getField(e):null,e=h?h.type===m:!1,n=l.getFieldsList({field:b.field,normalizationField:b.normalizationField,valueExpression:b.valueExpression});if(n=d.verifyBasicFieldValidity(a,n,"summary-statistics:invalid-parameters"))return g.reject(n);
if(h){if(h=d.verifyFieldType(a,h,"summary-statistics:invalid-parameters",v))return g.reject(h);if(e&&q)return g.reject(d.createError("summary-statistics:invalid-parameters","Normalization is not allowed for date fields"))}else if(f&&q)return g.reject(d.createError("summary-statistics:invalid-parameters","Normalization is not allowed when 'valueExpression' or 'sqlExpression' is specified"));return a.hasLocalSource||b.features||k?g.reject(d.createError("summary-statistics:not-implemented","Client-side calculation is not implemented yet")):
!a.supportsSQLExpression&&(e||f)?g.reject(d.createError("summary-statistics:not-supported","Layer does not support standardized SQL expression for queries")):b})}function w(a){var b=a.normalizationType,c=a.normalizationField;return s({layer:a.layer,field:a.field,classificationMethod:"standard-deviation",standardDeviationInterval:0.25,normalizationType:b,normalizationField:"field"===b?c:void 0,minValue:a.minValue,maxValue:a.maxValue}).then(function(a){var b,k,f;a.classBreakInfos.some(function(a){a.hasAvg&&
(b=a);return!!b});b&&(f=b.maxValue-b.minValue,k=b.minValue+f/2,f*=4);return{min:a.minValue,max:a.maxValue,avg:k,stddev:f}})}function x(a){var b=a.layer,c=a.field,e=a.sqlExpression||c,c=e?d.getRangeExpr(e,a.minValue,a.maxValue):null;a={sqlFormat:a.sqlExpression?"standard":null,where:d.mergeWhereClauses(a.sqlWhere,c),outStatistics:y.map(function(a){var b=new r;b.statisticType=a;b.onStatisticField=e;b.outStatisticFieldName=("var"===a?"variance":a)+z;return b})};return b.queryStatistics(a).then(function(a){a=
(a=a&&a.features)&&a[0]&&a[0].attributes;var b={},f;for(f in a)b[f.replace(A,"").toLowerCase()]=a[f];b.min===b.max&&(null!=b.min&&null==b.stddev)&&(b.stddev=b.variance=0);return b})}function B(a,b){var c,e=a.field,g=a.layer;g.supportsSQLExpression&&b&&(c=p.mixin({},a),delete c.field,c.sqlExpression=d.msSinceUnixEpochSQL(g,e));return x(c||a).then(function(a){b&&("min max avg stddev sum variance".split(" ").forEach(function(b){null!=a[b]&&(a[b]=Math.ceil(a[b]))}),a.min===a.max&&null!=a.min&&(a.avg=
a.min,a.stddev=a.variance=0));return a})}var m="date",v=[].concat(["integer","small-integer","single","double"]).concat(m),z="_value",A=/_value$/i,y="min max avg stddev count sum var".split(" "),u=l.supportedLayerTypes.join(", ");return function(a){return t(a).then(function(a){var c=a.field?a.layer.getField(a.field):null,c=c?c.type===m:!1;return a.normalizationType?w(a):B(a,c)})}});