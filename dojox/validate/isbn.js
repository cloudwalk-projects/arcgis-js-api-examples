//>>built
define(["dojo/_base/lang","./_base"],function(g,f){f.isValidIsbn=function(a){var e,b=0,c;g.isString(a)||(a=String(a));a=a.replace(/[- ]/g,"");e=a.length;switch(e){case 10:c=e;for(var d=0;9>d;d++)b+=parseInt(a.charAt(d))*c,c--;a=a.charAt(9).toUpperCase();b+="X"==a?10:parseInt(a);return 0==b%11;case 13:c=-1;for(d=0;d<e;d++)b+=parseInt(a.charAt(d))*(2+c),c*=-1;return 0==b%10}return!1};return f.isValidIsbn});