// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["dojo/_base/lang","../request","./Task","./support/FindResult"],function(c,e,f,g){return f.createSubclass({declaredClass:"esri.tasks.FindTask",properties:{parsedUrl:{get:function(){var a=this._parseUrl(this.url);a.path+="/find";return a}},gdbVersion:{value:null,type:String},url:{}},execute:function(a,d){var b=this._encode(c.mixin({},this.parsedUrl.query,{f:"json"},a.toJSON()));this.gdbVersion&&(b.gdbVersion=this.gdbVersion);b={query:b,callbackParamName:"callback"};if(this.requestOptions||
d)b=c.mixin({},this.requestOptions,d,b);return e(this.parsedUrl.path,b).then(this._handleExecuteResponse)},_handleExecuteResponse:function(a){a=a.data;a.results=(a.results||[]).map(function(a){return g.fromJSON(a)});return a}})});