// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["../views/PopupManager"],function(c){return{add:function(a,b){a.popupManager||(a.popupManager=new c(b),a.popupManager.view=a)},remove:function(a){var b=a.popupManager;b&&(b.destroy(),a.popupManager=null)}}});