// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["../../core/declare","dojo/date/locale","../../core/JSONSupporter"],function(a,c,b){return a(b,{declaredClass:"esri.tasks.support.Date",date:new Date,format:"EEE MMM dd HH:mm:ss zzz yyyy",_dateReader:function(a,b){return c.parse(a,{selector:"date",datePattern:b.format||this.format})},toJSON:function(){return{date:c.format(this.date,{selector:"date",datePattern:this.format}),format:this.format}}})});