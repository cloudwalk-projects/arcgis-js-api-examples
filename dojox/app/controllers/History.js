//>>built
define("dojo/_base/lang dojo/_base/declare dojo/on ../Controller ../utils/hash dojo/topic".split(" "),function(d,f,l,k,g,h){return f("dojox.app.controllers.History",k,{_currentPosition:0,currentState:{},constructor:function(){this.events={"app-domNode":this.onDomNodeChange};if(this.app.domNode)this.onDomNodeChange({oldNode:null,newNode:this.app.domNode});this.bind(window,"popstate",d.hitch(this,this.onPopState))},onDomNodeChange:function(a){null!=a.oldNode&&this.unbind(a.oldNode,"startTransition");
this.bind(a.newNode,"startTransition",d.hitch(this,this.onStartTransition))},onStartTransition:function(a){var b=window.location.hash,e=g.getTarget(b,this.app.defaultView),f=g.getParams(b),c=d.clone(a.detail);c.target=c.title=e;c.url=b;c.params=f;c.id=this._currentPosition;1==history.length&&history.pushState(c,c.href,b);c.bwdTransition=c.transition;d.mixin(this.currentState,c);history.replaceState(this.currentState,this.currentState.href,b);this._currentPosition+=1;a.detail.id=this._currentPosition;
b=a.detail.url||"#"+a.detail.target;a.detail.params&&(b=g.buildWithParams(b,a.detail.params));a.detail.fwdTransition=a.detail.transition;history.pushState(a.detail,a.detail.href,b);this.currentState=d.clone(a.detail);h.publish("/app/history/pushState",a.detail.target)},onPopState:function(a){if(this.app.getStatus()===this.app.lifecycle.STARTED&&a.state){var b=a.state.id<this._currentPosition;b?this._currentPosition-=1:this._currentPosition+=1;var e=d.mixin({reverse:b?!0:!1},a.state);e.transition=
b?e.bwdTransition:e.fwdTransition;this.app.emit("app-transition",{viewId:a.state.target,opts:e});h.publish("/app/history/popState",a.state.target)}}})});