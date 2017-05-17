// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/extendsHelper ../core/tsSupport/decorateHelper ../core/typescript ./core/ExtensionConfigurationBase".split(" "),function(g,h,e,b,c,f){return function(d){function a(){d.apply(this,arguments)}e(a,d);a.prototype._initializeResponseReceived=function(a){var b=this;this.inherited(arguments).then(function(){return b.getMapWidgetProxy(b.config.mapWidgetId).then(function(a){this.mapWidgetProxy=a})})};b([c.shared("esri.opsdashboard.MapToolConfigurationProxy")],a.prototype,
"declaredClass",void 0);return a=b([c.subclass()],a)}(f)});