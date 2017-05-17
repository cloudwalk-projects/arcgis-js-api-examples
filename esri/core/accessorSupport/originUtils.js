// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["require","exports","../MultiOriginJSONSupport"],function(e,c,d){c.updateOrigins=function(a){a&&a.writtenProperties&&a.writtenProperties.forEach(function(b){var a=b.target;b.newOrigin&&(b.oldOrigin!==b.newOrigin&&a.isInstanceOf(d))&&a.updateOrigin(b.propName,b.newOrigin)})}});