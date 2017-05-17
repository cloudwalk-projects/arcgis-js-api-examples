//>>built
define("dojo ./defaults ./manager/_registry ./manager/keys ./manager/Mouse ./manager/Canvas ./manager/Undo ./manager/Anchors ./manager/Stencil ./manager/StencilUI ./util/common".split(" "),function(d,k,h,g,l,m,n,p,q,r,f){return d.declare("dojox.drawing.Drawing",[],{ready:!1,mode:"",width:0,height:0,constructor:function(a,c){var b=d.attr(c,"defaults");this.defaults=b?"string"===typeof b?d.getObject(b):b:k;this.id=c.id||dijit.getUniqueId("dojox_drawing_Drawing");h.register(this,"drawing");this.mode=
(a.mode||d.attr(c,"mode")||"").toLowerCase();b=d.contentBox(c);this.width=a.width||b.w;this.height=a.height||b.h;f.register(this);this.mouse=new l({util:f,keys:g,id:"ui"==this.mode?"MUI":"mse"});this.mouse.setEventMode(this.mode);this.tools={};this.stencilTypes={};this.stencilTypeMap={};this.domNode=this.srcRefNode=c;this.plugins=a.plugins?eval(a.plugins):[];this.widgetId=this.id;d.attr(this.domNode,"widgetId",this.widgetId);dijit&&dijit.registry?(dijit.registry.add(this),console.log("using dijit")):
(dijit.registry={objs:{},add:function(a){this.objs[a.id]=a}},dijit.byId=function(a){return dijit.registry.objs[a]},dijit.registry.add(this));var b=h.getRegistered("stencil"),e;for(e in b)this.registerTool(b[e].name);b=h.getRegistered("tool");for(e in b)this.registerTool(b[e].name);b=h.getRegistered("plugin");for(e in b)this.registerTool(b[e].name);this._createCanvas()},_createCanvas:function(){console.info("drawing create canvas...");this.canvas=new m({srcRefNode:this.domNode,util:f,mouse:this.mouse,
width:this.width,height:this.height,callback:d.hitch(this,"onSurfaceReady")});this.initPlugins()},resize:function(a){a&&d.style(this.domNode,{width:a.w+"px",height:a.h+"px"});this.canvas?a&&this.canvas.resize(a.w,a.h):this._createCanvas()},startup:function(){},getShapeProps:function(a,c){var b=a.stencilType,e="ui"==this.mode||"ui"==c;return d.mixin({container:e&&!b?this.canvas.overlay.createGroup():this.canvas.surface.createGroup(),util:f,keys:g,mouse:this.mouse,drawing:this,drawingType:e&&!b?"ui":
"stencil",style:this.defaults.copy()},a||{})},addPlugin:function(a){this.plugins.push(a);this.canvas.surfaceReady&&this.initPlugins()},initPlugins:function(){if(!this.canvas||!this.canvas.surfaceReady)var a=d.connect(this,"onSurfaceReady",this,function(){d.disconnect(a);this.initPlugins()});else d.forEach(this.plugins,function(a,b){var e=d.mixin({util:f,keys:g,mouse:this.mouse,drawing:this,stencils:this.stencils,anchors:this.anchors,canvas:this.canvas},a.options||{});this.registerTool(a.name,d.getObject(a.name));
try{this.plugins[b]=new this.tools[a.name](e)}catch(h){console.error("Failed to initilaize plugin:\t"+a.name+". Did you require it?")}},this),this.plugins=[],this.mouse.setCanvas()},onSurfaceReady:function(){this.ready=!0;this.mouse.init(this.canvas.domNode);this.undo=new n({keys:g});this.anchors=new p({drawing:this,mouse:this.mouse,undo:this.undo,util:f});"ui"!=this.mode&&(this.stencils=new q({canvas:this.canvas,surface:this.canvas.surface,mouse:this.mouse,undo:this.undo,keys:g,anchors:this.anchors}));
this.uiStencils=new r({canvas:this.canvas,surface:this.canvas.surface,mouse:this.mouse,keys:g});if("silverlight"==dojox.gfx.renderer)try{new dojox.drawing.plugins.drawing.Silverlight({util:f,mouse:this.mouse,stencils:this.stencils,anchors:this.anchors,canvas:this.canvas})}catch(a){throw Error("Attempted to install the Silverlight plugin, but it was not found.");}d.forEach(this.plugins,function(a){a.onSurfaceReady&&a.onSurfaceReady()})},addUI:function(a,c){if(!this.ready){var b=d.connect(this,"onSurfaceReady",
this,function(){d.disconnect(b);this.addUI(a,c)});return!1}c&&(!c.data&&!c.points)&&(c={data:c});return!this.stencilTypes[a]?("tooltip"!=a&&console.warn("Not registered:",a),null):this.uiStencils.register(new this.stencilTypes[a](this.getShapeProps(c,"ui")))},addStencil:function(a,c){if(!this.ready){var b=d.connect(this,"onSurfaceReady",this,function(){d.disconnect(b);this.addStencil(a,c)});return!1}c&&(!c.data&&!c.points)&&(c={data:c});var e=this.stencils.register(new this.stencilTypes[a](this.getShapeProps(c)));
this.currentStencil&&this.currentStencil.moveToFront();return e},removeStencil:function(a){this.stencils.unregister(a);a.destroy()},removeAll:function(){this.stencils.removeAll()},selectAll:function(){this.stencils.selectAll()},toSelected:function(a){this.stencils.toSelected.apply(this.stencils,arguments)},exporter:function(){console.log("this.stencils",this.stencils);return this.stencils.exporter()},importer:function(a){d.forEach(a,function(a){this.addStencil(a.type,a)},this)},changeDefaults:function(a,
c){if(void 0!=c&&c)for(var b in a)this.defaults[b]=a[b];else for(b in a)for(var d in a[b])this.defaults[b][d]=a[b][d];if(void 0!=this.currentStencil&&(!this.currentStencil.created||this.defaults.clickMode))this.unSetTool(),this.setTool(this.currentType)},onRenderStencil:function(a){this.stencils.register(a);this.unSetTool();this.defaults.clickMode?this.defaults.clickable=!0:this.setTool(this.currentType)},onDeleteStencil:function(a){this.stencils.unregister(a)},registerTool:function(a){if(!this.tools[a]){var c=
d.getObject(a);this.tools[a]=c;var b=f.abbr(a);this.stencilTypes[b]=c;this.stencilTypeMap[b]=a}},getConstructor:function(a){return this.stencilTypes[a]},setTool:function(a){if("ui"!=this.mode)if(!this.canvas||!this.canvas.surface)var c=d.connect(this,"onSurfaceReady",this,function(){d.disconnect(c);this.setTool(a)});else{this.currentStencil&&this.unSetTool();this.currentType=this.tools[a]?a:this.stencilTypeMap[a];try{this.currentStencil=new this.tools[this.currentType]({container:this.canvas.surface.createGroup(),
util:f,mouse:this.mouse,keys:g}),console.log("new tool is:",this.currentStencil.id,this.currentStencil),this.defaults.clickMode&&(this.defaults.clickable=!1),this.currentStencil.connect(this.currentStencil,"onRender",this,"onRenderStencil"),this.currentStencil.connect(this.currentStencil,"destroy",this,"onDeleteStencil")}catch(b){console.error("dojox.drawing.setTool Error:",b),console.error(this.currentType+" is not a constructor: ",this.tools[this.currentType])}}},set:function(a,c){console.info("Attempting to set ",
a," to: ",c,". Set currently not fully supported in Drawing")},get:function(a){},unSetTool:function(){this.currentStencil.created||this.currentStencil.destroy()}})});