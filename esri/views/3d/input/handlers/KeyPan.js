// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../input/InputHandler","../../navigation/NavigationConstants"],function(f,h,k,l,m){var e=m.Pan.Direction;f=function(f){function b(a,c,g){var b=this;f.call(this,"esri.views.3d.input.handlers.KeyPan",!0);this.view=a;this.keys=c;this._keyToDirection=(d={},d[c.left]=e.LEFT,d[c.right]=e.RIGHT,d[c.forward]=e.FORWARD,d[c.backward]=e.BACKWARD,d[c.up]=e.UP,d[c.down]=e.DOWN,d);this.registerIncoming("key-down",g,function(a){return b._handleKeyDown(a)});
this.registerIncoming("key-up",g,function(a){return b._handleKeyUp(a)});var d}k(b,f);b.prototype._handleKeyDown=function(a){a.data.repeat||this._handleKey(a,!0)};b.prototype._handleKeyUp=function(a){this._handleKey(a,!1)};b.prototype._handleKey=function(a,c){var b=this._keyToDirection[a.data.key];null!=b&&(c?this.view.navigation.pan.beginContinuous(b):this.view.navigation.pan.endContinuous(b),a.stopPropagation())};return b}(l.InputHandler);h.KeyPan=f});