//>>built
define("dojo/_base/lang dojo/_base/declare dojo/_base/Color ../utils ../../CircularGauge ../../LinearScaler ../../CircularScale ../../CircularValueIndicator ../../CircularRangeIndicator ../DefaultPropertiesMixin".split(" "),function(d,e,f,g,h,k,l,m,p,n){return e("dojox.dgauges.components.green.SemiCircularLinearGauge",[h,n],{borderColor:[50,50,50],fillColor:[109,183,19],indicatorColor:[0,0,0],constructor:function(){var b=new k({majorTickInterval:25,minorTickInterval:5});this.addElement("background",
d.hitch(this,this.drawBackground));var a=new l;a.set("scaler",b);a.set("originX",131);a.set("originY",149.5);a.set("radius",108.66756);a.set("startAngle",-136);a.set("endAngle",-43);a.set("orientation","clockwise");a.set("labelGap",2);a.set("font",{family:"Helvetica",weight:"bold",size:"10pt"});this.addElement("scale",a);var c=new m;c.set("interactionArea","gauge");c.set("value",b.minimum);c.set("indicatorShapeFunc",d.hitch(this,function(a,b){var c=b.scale.radius-2;a.createPath().moveTo(-20,0).lineTo(-20,
-5).lineTo(c,0).lineTo(-20,5).closePath().setFill(this.indicatorColor);return a}));a.addIndicator("indicator",c);this.addElement("foreground",d.hitch(this,this.drawForeground))},drawBackground:function(b){var a=g.brightness(new f(this.fillColor),100);b.createPath({path:"M260.7431 100.826 C260.7431 172.7911 202.3367 200.1975 130.3716 200.1975 C58.4065 200.1975 -0 172.7911 -0 100.826 C-0 28.8609 58.4065 0.4545 130.3716 0.4545 C202.3367 0.4545 260.7431 28.8609 260.7431 100.826 Z"}).setFill(this.borderColor);
b.createPath({path:"M258.2581 100.819 C258.2581 171.0137 200.9626 197.7459 130.3662 197.7459 C59.7698 197.7459 2.4742 171.0137 2.4742 100.819 C2.4742 30.6244 59.7698 2.9168 130.3662 2.9168 C200.9626 2.9168 258.2581 30.6244 258.2581 100.819 Z"}).setFill({type:"linear",x1:2.47421,y1:2.91677,x2:181.52295,y2:197.74595,colors:[{offset:0,color:[226,226,221]},{offset:0.5,color:[239,239,236]},{offset:1,color:"white"}]});b.createPath({path:"M130.3762 2.9168 C59.9006 2.9168 2.4742 30.3335 2.4742 100.8214 C2.4742 171.3093 59.9006 197.7459 130.3762 197.7459 C200.8516 197.7459 258.2581 171.3093 258.2581 100.8214 C258.2581 30.3335 200.8516 2.9168 130.3762 2.9168 ZM130.3762 25.2846 C188.7428 25.2846 235.8942 42.4445 235.8942 100.8214 C235.8942 159.1984 188.7428 175.3581 130.3762 175.3581 C72.0095 175.3581 24.858 159.1984 24.858 100.8214 C24.858 42.4445 72.0095 25.2846 130.3762 25.2846 Z"}).setFill({type:"linear",
x1:2.47417,y1:2.91681,x2:2.47417,y2:197.74593,colors:[{offset:0,color:a},{offset:0.25,color:this.fillColor},{offset:0.5,color:this.fillColor},{offset:0.75,color:this.fillColor},{offset:1,color:a}]});b.createPath({path:"M128.9903 34.9775 C177.3318 33.7519 217.6275 49.1301 218.936 97.6431 C220.2445 146.1562 182.0729 160.5238 133.7314 161.7494 C85.39 162.975 45.0943 150.5968 43.7858 102.0838 C42.4772 53.5708 80.6489 36.2031 128.9903 34.9775 Z"}).setStroke({color:"white",width:1.42712,style:"Solid",cap:"butt",
join:4})},drawForeground:function(b){var a=b.createGroup();a.createEllipse({cx:131,cy:149.5,rx:18,ry:18}).setFill(this.fillColor);a.createEllipse({cx:131,cy:149.5,rx:17,ry:17}).setFill({type:"linear",x1:114.63479,y1:133.63361,x2:114.63479,y2:164.82557,colors:[{offset:0,color:[255,255,246]},{offset:0.17857,color:[252,251,236]},{offset:0.25755,color:[250,247,230]},{offset:0.77747,color:[246,243,224]},{offset:1,color:[227,209,184]}]});b.createPath({path:"M244.8093 59.9472 C244.8093 82.7317 193.7605 47.2998 130.8612 47.2998 C67.9619 47.2998 16.9132 81.7317 16.9132 58.9472 C16.9132 36.1628 67.9619 0 130.8612 0 C193.7605 0 244.8093 37.1628 244.8093 59.9472 Z"}).setFill([255,
255,255,0.19608])}})});