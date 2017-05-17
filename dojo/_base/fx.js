//>>built
define("./kernel ./config ./lang ../Evented ./Color ../aspect ../sniff ../dom ../dom-style".split(" "),function(r,w,e,x,k,m,y,s,n){var l=e.mixin,f={},t=f._Line=function(a,b){this.start=a;this.end=b};t.prototype.getValue=function(a){return(this.end-this.start)*a+this.start};var h=f.Animation=function(a){l(this,a);e.isArray(this.curve)&&(this.curve=new t(this.curve[0],this.curve[1]))};h.prototype=new x;e.extend(h,{duration:350,repeat:0,rate:20,_percent:0,_startRepeatCount:0,_getStep:function(){var a=
this._percent,b=this.easing;return b?b(a):a},_fire:function(a,b){var g=b||[];if(this[a])if(w.debugAtAllCosts)this[a].apply(this,g);else try{this[a].apply(this,g)}catch(d){console.error("exception in animation handler for:",a),console.error(d)}return this},play:function(a,b){this._delayTimer&&this._clearTimer();if(b)this._stopTimer(),this._active=this._paused=!1,this._percent=0;else if(this._active&&!this._paused)return this;this._fire("beforeBegin",[this.node]);var g=a||this.delay,d=e.hitch(this,
"_play",b);if(0<g)return this._delayTimer=setTimeout(d,g),this;d();return this},_play:function(a){this._delayTimer&&this._clearTimer();this._startTime=(new Date).valueOf();this._paused&&(this._startTime-=this.duration*this._percent);this._active=!0;this._paused=!1;a=this.curve.getValue(this._getStep());this._percent||(this._startRepeatCount||(this._startRepeatCount=this.repeat),this._fire("onBegin",[a]));this._fire("onPlay",[a]);this._cycle();return this},pause:function(){this._delayTimer&&this._clearTimer();
this._stopTimer();if(!this._active)return this;this._paused=!0;this._fire("onPause",[this.curve.getValue(this._getStep())]);return this},gotoPercent:function(a,b){this._stopTimer();this._active=this._paused=!0;this._percent=a;b&&this.play();return this},stop:function(a){this._delayTimer&&this._clearTimer();if(!this._timer)return this;this._stopTimer();a&&(this._percent=1);this._fire("onStop",[this.curve.getValue(this._getStep())]);this._active=this._paused=!1;return this},destroy:function(){this.stop()},
status:function(){return this._active?this._paused?"paused":"playing":"stopped"},_cycle:function(){if(this._active){var a=(new Date).valueOf(),a=0===this.duration?1:(a-this._startTime)/this.duration;1<=a&&(a=1);this._percent=a;this.easing&&(a=this.easing(a));this._fire("onAnimate",[this.curve.getValue(a)]);1>this._percent?this._startTimer():(this._active=!1,0<this.repeat?(this.repeat--,this.play(null,!0)):-1==this.repeat?this.play(null,!0):this._startRepeatCount&&(this.repeat=this._startRepeatCount,
this._startRepeatCount=0),this._percent=0,this._fire("onEnd",[this.node]),!this.repeat&&this._stopTimer())}return this},_clearTimer:function(){clearTimeout(this._delayTimer);delete this._delayTimer}});var p=0,q=null,u={run:function(){}};e.extend(h,{_startTimer:function(){this._timer||(this._timer=m.after(u,"run",e.hitch(this,"_cycle"),!0),p++);q||(q=setInterval(e.hitch(u,"run"),this.rate))},_stopTimer:function(){this._timer&&(this._timer.remove(),this._timer=null,p--);0>=p&&(clearInterval(q),q=null,
p=0)}});var z=y("ie")?function(a){var b=a.style;!b.width.length&&"auto"==n.get(a,"width")&&(b.width="auto")}:function(){};f._fade=function(a){a.node=s.byId(a.node);var b=l({properties:{}},a);a=b.properties.opacity={};a.start=!("start"in b)?function(){return+n.get(b.node,"opacity")||0}:b.start;a.end=b.end;a=f.animateProperty(b);m.after(a,"beforeBegin",e.partial(z,b.node),!0);return a};f.fadeIn=function(a){return f._fade(l({end:1},a))};f.fadeOut=function(a){return f._fade(l({end:0},a))};f._defaultEasing=
function(a){return 0.5+Math.sin((a+1.5)*Math.PI)/2};var v=function(a){this._properties=a;for(var b in a){var g=a[b];g.start instanceof k&&(g.tempColor=new k)}};v.prototype.getValue=function(a){var b={},g;for(g in this._properties){var d=this._properties[g],c=d.start;c instanceof k?b[g]=k.blendColors(c,d.end,a,d.tempColor).toCss():e.isArray(c)||(b[g]=(d.end-c)*a+c+("opacity"!=g?d.units||"px":0))}return b};f.animateProperty=function(a){var b=a.node=s.byId(a.node);a.easing||(a.easing=r._defaultEasing);
a=new h(a);m.after(a,"beforeBegin",e.hitch(a,function(){var a={},d;for(d in this.properties){if("width"==d||"height"==d)this.node.display="block";var c=this.properties[d];e.isFunction(c)&&(c=c(b));c=a[d]=l({},e.isObject(c)?c:{end:c});e.isFunction(c.start)&&(c.start=c.start(b));e.isFunction(c.end)&&(c.end=c.end(b));var f=0<=d.toLowerCase().indexOf("color"),h=function(a,b){var c={height:a.offsetHeight,width:a.offsetWidth}[b];if(void 0!==c)return c;c=n.get(a,b);return"opacity"==b?+c:f?c:parseFloat(c)};
"end"in c?"start"in c||(c.start=h(b,d)):c.end=h(b,d);f?(c.start=new k(c.start),c.end=new k(c.end)):c.start="opacity"==d?+c.start:parseFloat(c.start)}this.curve=new v(a)}),!0);m.after(a,"onAnimate",e.hitch(n,"set",a.node),!0);return a};f.anim=function(a,b,g,d,c,e){return f.animateProperty({node:a,duration:g||h.prototype.duration,properties:b,easing:d,onEnd:c}).play(e||0)};l(r,f);r._Animation=h;return f});