// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define("require exports ../../../../geometry/SpatialReference ../../../../geometry/Point ../../../../geometry/support/webMercatorUtils ../../lib/glMatrix".split(" "),function(u,g,n,s,p,t){function q(a,c){var b=a.spatialReference;b.equals(c)||(b.isWebMercator&&c.wkid===n.WGS84.wkid?p.webMercatorToGeographic(a,!1,a):c.isWebMercator&&b.wkid===n.WGS84.wkid&&p.geographicToWebMercator(a,!1,a))}var r=t.vec4d;g.computeCentroid=function(a,c){if("extent"===a.type)return a.center;for(var b=a["polygon"===a.type?
"rings":"paths"],d=0,f=0,e=0,g=a.hasZ,h=0,m=0;m<b.length;m++){for(var k=b[m],l=0;l<k.length;l++)d+=k[l][0],f+=k[l][1],g&&(e+=k[l][2]);h+=k.length}b=new s({x:d/h,y:f/h,z:g?e/h:void 0,spatialReference:a.spatialReference});c&&q(b,c);return b};g.convertToSR=q;g.enlargeExtent=function(a,c,b){if(a){c||(c=r.create());var d=0.5*a.width*(b-1);b=0.5*a.height*(b-1);a.width<1E-7*a.height?d+=b/20:a.height<1E-7*a.width&&(b+=d/20);r.set4(a.xmin-d,a.ymin-b,a.xmax+d,a.ymax+b,c);return c}return null};g.updateVertexAttributeAuxpos1w=
function(a,c){for(var b=0;b<a.geometries.length;++b){var d=a.geometries[b].data.vertexAttributes.auxpos1;d&&d.data[3]!==c&&(d.data[3]=c,a.geometryVertexAttrsUpdated(b))}};g.mixinColorAndOpacity=function(a,c){var b=[1,1,1,1];null!=a&&(b[0]=a[0],b[1]=a[1],b[2]=a[2]);null!==c&&void 0!==c?b[3]=c:null!=a&&3<a.length&&(b[3]=a[3]);return b};g.overrideColor=function(a,c,b,d,f){f=f.slice();for(var e=0;3>e;++e)a&&null!=a[e]?f[e]=a[e]:b&&null!=b[e]&&(f[e]=b[e]);null!=c?f[3]=c:null!=d&&(f[3]=d);return f}});