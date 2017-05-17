// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define("dojo/_base/lang dojo/dom-construct ../../core/Accessor ../../core/HandleRegistry ../../core/requestAnimationFrame ../../views/2d/input/handlers/DragZoom".split(" "),function(k,l,m,n,g,h){var e={container:"esri-zoom-box__container",overlay:"esri-zoom-box__overlay",background:"esri-zoom-box__overlay-background",box:"esri-zoom-box__outline"};return m.createSubclass({declaredClass:"esri.views.ui.ZoomBox",constructor:function(){this._event={x:0,y:0,width:0,height:0};this._handles=new n;this._redraw=
this._redraw.bind(this)},initialize:function(){this.inputManager.installHandlers("zoombox",[new h(this.view,"primary",["Shift"]),new h(this.view,"primary",["Shift","Ctrl"])])},destroy:function(){this.view=null},_container:null,_overlay:null,_backgroundShape:null,_boxShape:null,_handles:null,_event:null,properties:{view:{set:function(a){var b=this._get("view");this._handles.removeAll();this._destroyOverlay(b);this._set("view",a)}},inputManager:null,css:e,interacting:{readOnly:!0,value:!1}},start:function(a){this._createContainer();
this._createOverlay();this._set("interacting",!0)},update:function(a){k.mixin(this._event,a);this._rafId||(this._rafId=g(this._redraw))},end:function(a){var b=this.view,c=b.toMap(a.x+0.5*a.width,a.y+0.5*a.height),d=Math.min(a.width/b.width,a.height/b.height);-1===a.direction&&(d=1/d);this._destroyOverlay();this._set("interacting",!1);b.goTo({center:c,scale:b.scale*d})},_updateBox:function(a,b,c,d){var f=this._boxShape;f.setAttributeNS(null,"x",a);f.setAttributeNS(null,"y",b);f.setAttributeNS(null,
"width",c);f.setAttributeNS(null,"height",d);f.setAttributeNS(null,"class",e.box)},_updateBackground:function(a,b,c,d){this._backgroundShape.setAttributeNS(null,"d",this._toSVGPath(a,b,c,d,this.view.width,this.view.height))},_createContainer:function(){var a=l.create("div",{className:e.container});this.view.root.appendChild(a);this._container=a},_createOverlay:function(){var a=this.view.width,b=this.view.height,c=document.createElementNS("http://www.w3.org/2000/svg","path");c.setAttributeNS(null,
"d","M 0 0 L "+a+" 0 L "+a+" "+b+" L 0 "+b+" Z");c.setAttributeNS(null,"class",e.background);a=document.createElementNS("http://www.w3.org/2000/svg","rect");b=document.createElementNS("http://www.w3.org/2000/svg","svg");b.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink");b.setAttributeNS(null,"class",e.overlay);b.appendChild(c);b.appendChild(a);this._container.appendChild(b);this._backgroundShape=c;this._boxShape=a;this._overlay=b},_destroyOverlay:function(a){this._container&&
this._container.parentNode&&this._container.parentNode.removeChild(this._container);this._container=this._backgroundShape=this._boxShape=this._overlay=null},_toSVGPath:function(a,b,c,d,f,e){c=a+c;d=b+d;return"M 0 0 L "+f+" 0 L "+f+" "+e+" L 0 "+e+" ZM "+a+" "+b+" L "+a+" "+d+" L "+c+" "+d+" L "+c+" "+b+" Z"},_redraw:function(){this._rafId=null;if(this._overlay){var a=this._event;this._updateBox(a.x,a.y,a.width,a.height);this._updateBackground(a.x,a.y,a.width,a.height);this._rafId=g(this._redraw)}}})});