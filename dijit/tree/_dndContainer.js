//>>built
define("dojo/aspect dojo/_base/declare dojo/dom-class dojo/_base/lang dojo/on dojo/touch".split(" "),function(f,h,d,b,c,g){return h("dijit.tree._dndContainer",null,{constructor:function(a,e){this.tree=a;this.node=a.domNode;b.mixin(this,e);this.containerState="";d.add(this.node,"dojoDndContainer");this.events=[c(this.node,g.enter,b.hitch(this,"onOverEvent")),c(this.node,g.leave,b.hitch(this,"onOutEvent")),f.after(this.tree,"_onNodeMouseEnter",b.hitch(this,"onMouseOver"),!0),f.after(this.tree,"_onNodeMouseLeave",
b.hitch(this,"onMouseOut"),!0),c(this.node,"dragstart, selectstart",function(a){a.preventDefault()})]},destroy:function(){for(var a;a=this.events.pop();)a.remove();this.node=this.parent=null},onMouseOver:function(a){this.current=a},onMouseOut:function(){this.current=null},_changeState:function(a,e){var b="dojoDnd"+a,c=a.toLowerCase()+"State";d.replace(this.node,b+e,b+this[c]);this[c]=e},_addItemClass:function(a,b){d.add(a,"dojoDndItem"+b)},_removeItemClass:function(a,b){d.remove(a,"dojoDndItem"+b)},
onOverEvent:function(){this._changeState("Container","Over")},onOutEvent:function(){this._changeState("Container","")}})});