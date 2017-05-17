//>>built
define(["dojo/_base/lang","dojo/_base/declare","./Base","../scaler/linear","dojox/lang/utils"],function(h,k,l,f,d){return k("dojox.charting.axis2d.Invisible",l,{defaultParams:{vertical:!1,fixUpper:"none",fixLower:"none",natural:!1,leftBottom:!0,includeZero:!1,fixed:!0},optionalParams:{min:0,max:1,from:0,to:1,majorTickStep:4,minorTickStep:2,microTickStep:1},constructor:function(e,c){this.opt=h.clone(this.defaultParams);d.updateWithObject(this.opt,c);d.updateWithPattern(this.opt,c,this.optionalParams)},
dependOnData:function(){return!("min"in this.opt)||!("max"in this.opt)},clear:function(){delete this.scaler;delete this.ticks;this.dirty=!0;return this},initialized:function(){return"scaler"in this&&!(this.dirty&&this.dependOnData())},setWindow:function(e,c){this.scale=e;this.offset=c;return this.clear()},getWindowScale:function(){return"scale"in this?this.scale:1},getWindowOffset:function(){return"offset"in this?this.offset:0},calculate:function(e,c,d,g){if(this.initialized())return this;var a=this.opt;
this.labels=a.labels;this.scaler=(g||f).buildScaler(e,c,d,a);var b=this.scaler.bounds;"scale"in this&&(a.from=b.lower+this.offset,a.to=(b.upper-b.lower)/this.scale+a.from,!isFinite(a.from)||isNaN(a.from)||!isFinite(a.to)||isNaN(a.to)||a.to-a.from>=b.upper-b.lower?(delete a.from,delete a.to,delete this.scale,delete this.offset):(a.from<b.lower?(a.to+=b.lower-a.from,a.from=b.lower):a.to>b.upper&&(a.from+=b.upper-a.to,a.to=b.upper),this.offset=a.from-b.lower),this.scaler=(g||f).buildScaler(e,c,d,a),
1==this.scale&&0==this.offset&&(delete this.scale,delete this.offset));return this},getScaler:function(){return this.scaler},getTicks:function(){return this.ticks}})});