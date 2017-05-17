// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["./webgl-debug"],function(d){return{checkError:function(c,a){var b=a.getError();b!=a.NO_ERROR&&alert(c+": gl error "+b)},checkFramebufferStatus:function(c,a){var b=a.checkFramebufferStatus(c);b!=a.FRAMEBUFFER_COMPLETE&&console.log("Framebuffer error 0x"+b)},handleError:function(c,a,b){alert(d.glEnumToString(c)+" was caused by call to: "+a+"("+d.glFunctionArgsToString(a,b)+")")},validateNoneOfTheArgsAreUndefined:function(c,a){for(var b=0;b<a.length;++b)void 0===a[b]&&console.error("undefined passed to gl."+
c+"("+d.glFunctionArgsToString(c,a)+")")}}});