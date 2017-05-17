// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define("dojo/_base/array dojo/_base/kernel dojo/_base/lang dojo/date dojo/number dojo/date/locale dojo/i18n!../nls/common".split(" "),function(l,r,f,s,t,u,v){function k(a){return void 0!==a&&null!==a}function m(a,c,b){var d=b.match(/([^\(]+)(\([^\)]+\))?/i),e=f.trim(d[1]);b=c[a];var d=JSON.parse((d[2]?f.trim(d[2]):"{}").replace(/^\(/,"{").replace(/\)$/,"}").replace(/([{,])\s*([0-9a-zA-Z\_]+)\s*:/gi,'$1"$2":').replace(/\"\s*:\s*\'/gi,'":"').replace(/\'\s*(,|\})/gi,'"$1')),g=d.utcOffset;if(-1===l.indexOf(w,
e))e=f.getObject(e),f.isFunction(e)&&(b=e(b,a,c,d));else if("number"===typeof b||"string"===typeof b&&b&&!isNaN(Number(b)))switch(b=Number(b),e){case "NumberFormat":a=f.mixin({},d);c=parseFloat(a.places);if(isNaN(c)||0>c)a.places=Infinity;return t.format(b,a);case "DateString":b=new Date(b);if(d.local||d.systemLocale)return d.systemLocale?b.toLocaleDateString()+(d.hideTime?"":" "+b.toLocaleTimeString()):b.toDateString()+(d.hideTime?"":" "+b.toTimeString());b=b.toUTCString();d.hideTime&&(b=b.replace(/\s+\d\d\:\d\d\:\d\d\s+(utc|gmt)/i,
""));return b;case "DateFormat":return b=new Date(b),k(g)&&(b=s.add(b,"minute",b.getTimezoneOffset()-g)),u.format(b,d)}return k(b)?b:""}function p(a,c){var b;if(c)for(b in a)a.hasOwnProperty(b)&&(void 0===a[b]?delete a[b]:a[b]instanceof Object&&p(a[b],!0));else for(b in a)a.hasOwnProperty(b)&&void 0===a[b]&&delete a[b];return a}function n(a){if(!a||"object"!=typeof a||f.isFunction(a))return a;if("function"===typeof a.clone)a=a.clone();else if("function"===typeof a.map&&"function"===typeof a.forEach)a=
a.map(n);else{var c={},b=n,d,e,g={};for(d in a){e=a[d];var h=!(d in g)||g[d]!==e;if(!(d in c)||c[d]!==e&&h)c[d]=b?b(e):e}a=c}return a}var w=["NumberFormat","DateString","DateFormat"],q=/<\/?[^>]+>/g;return{equals:function(a,c){return a===c||"number"===typeof a&&isNaN(a)&&"number"===typeof c&&isNaN(c)||f.isFunction((a||{}).getTime)&&f.isFunction((c||{}).getTime)&&a.getTime()==c.getTime()||f.isFunction((a||{}).equals)&&a.equals(c)||f.isFunction((c||{}).equals)&&c.equals(a)||!1},valueOf:function(a,c){for(var b in a)if(a[b]==
c)return b;return null},stripTags:function(a){if(a){var c=typeof a;if("string"===c)a=a.replace(q,"");else if("object"===c)for(var b in a)(c=a[b])&&"string"===typeof c&&(c=c.replace(q,"")),a[b]=c}return a},substitute:function(a,c,b){var d,e,g;k(b)&&(f.isObject(b)?(d=b.first,e=b.dateFormat,g=b.numberFormat):d=b);if(!c||"{*}"===c){c=[];var h;c.push('\x3ctable summary\x3d"'+v.fieldsSummary+'"\x3e\x3ctbody\x3e');for(h in a){b=a[h];if(e&&-1!==l.indexOf(e.properties||"",h))b=m(h,a,e.formatter||"DateString");
else if(g&&-1!==l.indexOf(g.properties||"",h))b=m(h,a,g.formatter||"NumberFormat");c.push("\x3ctr\x3e\x3cth\x3e"+h+"\x3c/th\x3e\x3ctd\x3e"+(k(b)?b:"")+"\x3c/td\x3e\x3c/tr\x3e");if(d)break}c.push("\x3c/tbody\x3e\x3c/table\x3e");return c.join("")}return f.replace(c,f.hitch({obj:a},function(b,a){var c=a.split(":");return 1<c.length?(a=c[0],c.shift(),m(a,this.obj,c.join(":"))):e&&-1!==l.indexOf(e.properties||"",a)?m(a,this.obj,e.formatter||"DateString"):g&&-1!==l.indexOf(g.properties||"",a)?m(a,this.obj,
g.formatter||"NumberFormat"):k(this.obj[a])?this.obj[a]:""}))},filter:function(a,c,b){c=[f.isString(a)?a.split(""):a,b||r.global,f.isString(c)?new Function("item","index","array",c):c];b={};var d;a=c[0];for(d in a)c[2].call(c[d],a[d],d,a)&&(b[d]=a[d]);return b},startsWith:function(a,c,b){b=b||0;return a.indexOf(c,b)===b},endsWith:function(a,c,b){if("number"!==typeof b||!isFinite(b)||Math.floor(b)!==b||b>a.length)b=a.length;b-=c.length;a=a.indexOf(c,b);return-1!==a&&a===b},isDefined:k,fixJson:p,clone:n}});