// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define("require exports ./core/tsSupport/declareExtendsHelper ./core/tsSupport/decorateHelper ./core/accessorSupport/decorators dojo/_base/lang ./core/lang ./core/JSONSupport ./PopupTemplate ./geometry/support/jsonUtils ./symbols/support/jsonUtils".split(" "),function(r,s,f,d,c,g,h,k,l,m,n){var p=0;return function(e){function a(b,q,a,c){e.call(this,b,q,a,c);this.popupTemplate=this.layer=null;Object.defineProperty(this,"uid",{value:p++})}f(a,e);a.prototype.normalizeCtorArgs=function(b,a,c,d){return b&&
!b.declaredClass?b:{geometry:b,symbol:a,attributes:c,popupTemplate:d}};Object.defineProperty(a.prototype,"attributes",{set:function(b){var a=this._get("attributes");a!==b&&(this._set("attributes",b),this._notifyLayer("attributes",a,b))},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"geometry",{set:function(b){var a=this._get("geometry");a!==b&&(this._set("geometry",b),this._notifyLayer("geometry",a,b))},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"symbol",
{set:function(b){var a=this._get("symbol");a!==b&&(this._set("symbol",b),this._notifyLayer("symbol",a,b))},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"visible",{set:function(b){var a=this._get("visible");a!==b&&(this._set("visible",b),this._notifyLayer("visible",a,b))},enumerable:!0,configurable:!0});a.prototype.getAttribute=function(a){return this.attributes&&this.attributes[a]};a.prototype.setAttribute=function(a,c){if(this.attributes){var d=this.getAttribute(a);this.attributes[a]=
c;this._notifyLayer("attributes",d,c,a)}else this.attributes=(d={},d[a]=c,d),this._notifyLayer("attributes",void 0,c,a)};a.prototype.getEffectivePopupTemplate=function(){return this.popupTemplate||this.layer&&this.layer.popupTemplate};a.prototype.toJSON=function(){return{geometry:this.geometry&&this.geometry.toJSON(),symbol:this.symbol&&this.symbol.toJSON(),attributes:g.mixin({},this.attributes),popupTemplate:this.popupTemplate&&this.popupTemplate.toJSON()}};a.prototype.clone=function(){return new a({attributes:h.clone(this.attributes),
geometry:this.geometry&&this.geometry.clone()||null,popupTemplate:this.popupTemplate&&this.popupTemplate.clone(),symbol:this.symbol&&this.symbol.clone()||null,visible:this.visible})};a.prototype._notifyLayer=function(a,c,d,e){this.layer&&(a={graphic:this,property:a,oldValue:c,newValue:d},e&&(a.attributeName=e),this.layer.graphicChanged(a))};d([c.property({value:null})],a.prototype,"attributes",null);d([c.property({value:null,json:{read:m.fromJSON}})],a.prototype,"geometry",null);d([c.property()],
a.prototype,"layer",void 0);d([c.property({type:l})],a.prototype,"popupTemplate",void 0);d([c.property({value:null,json:{read:n.read}})],a.prototype,"symbol",null);d([c.property({value:!0,set:function(a){}})],a.prototype,"visible",null);return a=d([c.subclass("esri.Graphic")],a)}(c.declared(k))});