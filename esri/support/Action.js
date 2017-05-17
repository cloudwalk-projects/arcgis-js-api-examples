// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["../core/Accessor","../core/Identifiable"],function(b,c){var a=b.createSubclass(c,{properties:{className:{value:""},temporary:{value:!1},image:{value:""},id:{value:""},title:{value:""},visible:{value:!0}},clone:function(){return new a({className:this.className,image:this.image,id:this.id,title:this.title,visible:this.visible})}});return a});