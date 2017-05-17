// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["require","exports"],function(e,f){return function(){function d(){this.id2count={}}d.prototype.gen=function(a){null==a&&(a="a");var b=this.id2count[a];if(null==b)return this.id2count[a]=0,a;for(;;){var c=a+"_"+b++;if(null==this.id2count[c])return this.id2count[a]=b,this.id2count[c]=0,c}};return d}()});