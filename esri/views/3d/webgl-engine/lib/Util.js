// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["./gl-matrix"],function(q){function A(a){this.message=a}var I=q.vec2d,g=q.vec3d,r=q.vec4d,n=q.mat4d,B=n.create(),J=[r.createFrom(-1,-1,-1,1),r.createFrom(1,-1,-1,1),r.createFrom(1,1,-1,1),r.createFrom(-1,1,-1,1),r.createFrom(-1,-1,1,1),r.createFrom(1,-1,1,1),r.createFrom(1,1,1,1),r.createFrom(-1,1,1,1)],h=r.create(),D=Array(8);for(q=0;8>q;++q)D[q]=g.create();var E=g.create(),F=g.create(),G=g.create(),p=g.create(),k=g.create(),l=g.create(),v=g.create(),w=g.create(),C=g.create(),H=g.create(),
x=g.create(),s=g.create(),y=g.create(),z=g.create();A.prototype.toString=function(){return"AssertException: "+this.message};var f={EARTH_RADIUS:6378137,METER2FEET:3.28084,ECCENTRICITY_SQUARED:0.0066943799901414,AssertException:A,VertexAttrConstants:{POSITION:"position",NORMAL:"normal",UV0:"uv0",AUXPOS1:"auxpos1",AUXPOS2:"auxpos2",COLOR:"color",SIZE:"size",REGION:"region"},assert:function(a,c){if(!a){var b=Error("dummy");b.stack&&console.log(b.stack);throw new A(c);}},verify:function(a,c){a||(console.log("Verify failed: "+
c),console.log(Error("dummy").stack))},createQuadVertexUvBuffer:function(a){a=a||Float32Array;a=new a(20);a[0]=-1;a[1]=-1;a[2]=0;a[3]=0;a[4]=0;a[5]=1;a[6]=-1;a[7]=0;a[8]=1;a[9]=0;a[10]=-1;a[11]=1;a[12]=0;a[13]=0;a[14]=1;a[15]=1;a[16]=1;a[17]=0;a[18]=1;a[19]=1;return a},isPowerOfTwo:function(a){return 0===(a&a-1)},lerp:function(a,c,b){return a+(c-a)*b},clamp:function(a,c,b){return a<c?c:a>b?b:a},fallbackIfUndefined:function(a,c){return void 0===a?c:a},hex2rgb:function(a){a=Math.floor(a);return[(a>>
16&255)/255,(a>>8&255)/255,(a&255)/255]},rgb2hex:function(a){var c=f.clamp(Math.round(255*a[0]),0,255),b=f.clamp(Math.round(255*a[1]),0,255);a=f.clamp(Math.round(255*a[2]),0,255);return"0x"+((c<<16)+(b<<8)+a).toString(16)},dec2hex:function(a){a=a.toString(16);return"00000000".substr(0,8-a.length)+a},deg2rad:function(a){return a/180*Math.PI},rad2deg:function(a){return 180*a/Math.PI},azimuthElevationAngle2Direction:function(a,c){var b=1.5*Math.PI-a,d=0.5*Math.PI-c,e=Math.cos(b)*Math.sin(d),m=Math.cos(d),
b=Math.sin(b)*Math.sin(d);return[e,m,b]},rayPlane:function(a,c,b,d){var e=g.dot(b,c);if(0===e)return!1;b=-(g.dot(b,a)+b[3])/e;g.add(a,g.scale(c,b,d),d);return!0},raySphereClosestPositive:function(a,c,b,d){var e=g.dot(c,c),m=2*g.dot(c,a);b=g.dot(a,a)-b*b;b=m*m-4*e*b;if(0>b)return!1;var f=Math.sqrt(b);b=(-m-f)/(2*e);e=(-m+f)/(2*e);if(0>b||e<b&&0<e)b=e;return 0<b?(g.add(a,g.scale(c,b,d),d),!0):!1},rayTriangle3D:function(a,c,b,d,e,m,f,t,u){u||(u=g.create());var h=d[f]-b[m],k=d[f+1]-b[m+1],l=d[f+2]-b[m+
2];d=e[t]-b[m];f=e[t+1]-b[m+1];e=e[t+2]-b[m+2];var n=c[1]*e-f*c[2],r=c[2]*d-e*c[0],p=c[0]*f-d*c[1];t=h*n+k*r+l*p;if(-1E-5<t&&1E-5>t)return!1;t=1/t;var q=a[0]-b[m],s=a[1]-b[m+1];a=a[2]-b[m+2];u[1]=t*(q*n+s*r+a*p);if(0>u[1]||1<u[1])return!1;b=s*l-k*a;a=a*h-l*q;h=q*k-h*s;u[2]=t*(c[0]*b+c[1]*a+c[2]*h);if(0>u[2]||1<u[1]+u[2])return!1;u[0]=t*(d*b+f*a+e*h);return!0},rayBoxTest:function(a,c,b,d){var e,m=(b[0]-a[0])/c[0],f=(d[0]-a[0])/c[0];m>f&&(e=m,m=f,f=e);var g=(b[1]-a[1])/c[1],h=(d[1]-a[1])/c[1];g>h&&
(e=g,g=h,h=e);if(m>h||g>f)return!1;g>m&&(m=g);h<f&&(f=h);b=(b[2]-a[2])/c[2];a=(d[2]-a[2])/c[2];b>a&&(e=b,b=a,a=e);if(m>a||b>f)return!1;a<f&&(f=a);return 0>f?!1:!0},rayRay2D:function(a,c,b,d,e,f){f||(f=I.create());var g=(d[e]-b[e])*(c[0]-a[0])-(d[0]-b[0])*(c[e]-a[e]);if(0===g)return!1;b=((d[0]-b[0])*(a[e]-b[e])-(d[e]-b[e])*(a[0]-b[0]))/g;f[0]=a[0]+b*(c[0]-a[0]);f[1]=a[e]+b*(c[e]-a[e]);return!0},matrix2frustum:function(a,c,b){n.multiply(c,a,B);n.inverse(B);for(a=0;8>a;++a)n.multiplyVec4(B,J[a],h),g.set3(h[0]/
h[3],h[1]/h[3],h[2]/h[3],b[a])},matrix2frustumPlanes:function(a,c,b,d){void 0===d&&(d=b,b=D);f.matrix2frustum(a,c,b);f.point2plane(b[4],b[0],b[3],d[0]);f.point2plane(b[1],b[5],b[6],d[1]);f.point2plane(b[4],b[5],b[1],d[2]);f.point2plane(b[3],b[2],b[6],d[3]);f.point2plane(b[0],b[1],b[2],d[4]);f.point2plane(b[5],b[4],b[7],d[5])},point2plane:function(a,c,b,d){g.subtract(a,c,E);g.subtract(b,c,F);g.cross(F,E,d);g.normalize(d);d[3]=-g.dot(d,a)},project:function(a,c,b,d,e){e||(e=a);h[0]=a[0];h[1]=a[1];h[2]=
a[2];h[3]=1;n.multiplyVec4(c,h);2<e.length&&(e[2]=-h[2]);n.multiplyVec4(b,h);f.assert(0!==h[3]);e[0]=h[0]/h[3];e[1]=h[1]/h[3];e[2]=h[2]/h[3];e[0]=(0.5*e[0]+0.5)*d[2]+d[0];e[1]=(0.5*e[1]+0.5)*d[3]+d[1]},geodeticToGeocentricLatidude:function(a){return Math.atan((1-f.ECCENTRICITY_SQUARED)*Math.tan(a))},latLon2positionWGS84Ellipsoid:function(a,c,b,d){var e=6378137/Math.sqrt(1-f.ECCENTRICITY_SQUARED*Math.pow(Math.sin(a),2)),g=Math.cos(a);d[0]=(e+b)*Math.cos(c)*g;d[1]=(e*(1-f.ECCENTRICITY_SQUARED)+b)*Math.sin(a);
d[2]=-(e+b)*Math.sin(c)*g},pos2latLon:function(a,c){var b=g.length(a);c[0]=Math.asin(f.clamp(a[1]/b,-1,1));var d=Math.cos(c[0]);c[1]=(0>a[2]?1:-1)*Math.acos(f.clamp(a[0]/(d*b),-1,1));c[0]=f.rad2deg(c[0]);c[1]=f.rad2deg(c[1]);c[2]=b},pos2latLonWGS84Ellipsoid:function(a,c){var b=a[0],d=-a[2],e=a[1],g=Math.sqrt(Math.pow(6378137,2)*(1-f.ECCENTRICITY_SQUARED)),h=Math.sqrt((Math.pow(6378137,2)-Math.pow(g,2))/Math.pow(g,2)),k=Math.sqrt(Math.pow(b,2)+Math.pow(d,2)),l=Math.atan2(6378137*e,g*k),b=Math.atan2(d,
b),e=Math.atan2(e+Math.pow(h,2)*g*Math.pow(Math.sin(l),3),k-6378137*f.ECCENTRICITY_SQUARED*Math.pow(Math.cos(l),3)),g=6378137/Math.sqrt(1-f.ECCENTRICITY_SQUARED*Math.pow(Math.sin(e),2)),k=k/Math.cos(e)-g+f.EARTH_RADIUS;c[0]=e;c[1]=b;c[2]=k},computeGlobeTransformation:function(a,c,b){var d=f.deg2rad(a[0]);a=f.deg2rad(a[1]);f.latLon2position(d,a,G,c);n.translate(b,G);n.rotateY(b,0.5*Math.PI+a);n.rotateX(b,0.5*Math.PI-d);return b},readUInt16:function(a,c){return a[c]+(a[c+1]<<8)},readUInt32:function(a,
c){return a[c]+(a[c+1]<<8)+(a[c+2]<<16)+(a[c+3]<<24)},setIfDefined:function(a,c,b){void 0!==c[a]&&(b[a]=c[a])},array2object:function(a,c){var b={},d,e;if(void 0!==c){d=0;for(e=a.length;d<e;++d)b[c(a[d])]=a[d]}else{d=0;for(e=a.length;d<e;++d)b[a[d]]=a[d]}return b},object2array:function(a){var c=[],b;for(b in a)c.push(a[b]);return c},mergeObjects:function(a,c,b){void 0===b&&(b={});var d;if(b!==a)for(d in a)b[d]=a[d];if(b!==c)for(d in c)b[d]=c[d];return b},subtractObjects:function(a,c){var b={},d;for(d in a)void 0===
c[d]&&(b[d]=a[d]);return b},intersectObjects:function(a,c){var b={},d;for(d in a)void 0!==c[d]&&(b[d]=a[d]);return b},getFirstObjectKey:function(a){for(var c in a)return c},getFirstObjectValue:function(a){return a[f.getFirstObjectKey(a)]},objectEmpty:function(a){for(var c in a)return!1;return!0},arraysEqual:function(a,c){if(a.length!==c.length)return!1;for(var b=0,d=a.length;b<d;++b)if(a[b]!==c[b])return!1;return!0},arrayRemove:function(a,c){var b=a.indexOf(c);return-1!==b?(a[b]=a[a.length-1],a.pop(),
c):null},byteBuffer2base64image:function(a,c,b,d,e){var g=4*c;f.assert(a.length===g*b,"buffer length must match image resolution");var h=document.createElement("canvas");h.width=c;h.height=b;var k=h.getContext("2d");c=k.getImageData(0,0,c,b);for(var l=c.data,n=0;n<b;++n)for(var q=n*g,r=(b-1-n)*g,p=0;p<g;++p)l[q++]=a[r++];k.putImageData(c,0,0);return h.toDataURL(d,e)},cround:function(a){return Math.round(100*a)/100},logWithBase:function(a,c){return Math.log(a)/Math.log(c)},setMatrixTranslation:function(a,
c){a[12]=c[0];a[13]=c[1];a[14]=c[2]},setMatrixTranslation3:function(a,c,b,d){a[12]=c;a[13]=b;a[14]=d},getMatrixTranslation:function(a,c){c=c||g.create();c[0]=a[12];c[1]=a[13];c[2]=a[14];return c},createTranslationMatrix:function(a,c){a=n.identity(a);f.setMatrixTranslation(a,c);return a},fovx2fovy:function(a,c,b){return 2*Math.atan(b*Math.tan(0.5*a)/c)},fovy2fovx:function(a,c,b){return 2*Math.atan(c*Math.tan(0.5*a)/b)},fovx2fovd:function(a,c,b){return 2*Math.atan(Math.sqrt(c*c+b*b)*Math.tan(0.5*a)/
c)},fovy2fovd:function(a,c,b){return 2*Math.atan(Math.sqrt(c*c+b*b)*Math.tan(0.5*a)/b)},fovd2fovx:function(a,c,b){return 2*Math.atan(c*Math.tan(0.5*a)/Math.sqrt(c*c+b*b))},fovd2fovy:function(a,c,b){return 2*Math.atan(b*Math.tan(0.5*a)/Math.sqrt(c*c+b*b))},nextHighestPowerOfTwo:function(a){--a;for(var c=1;32>c;c<<=1)a|=a>>c;return a+1},linelineDistance3D:function(a,c,b,d){var e,f,h;p[0]=a[0]-b[0];p[1]=a[1]-b[1];p[2]=a[2]-b[2];k[0]=d[0]-b[0];k[1]=d[1]-b[1];k[2]=d[2]-b[2];if(1E-4>Math.abs(k.x)&&1E-4>
Math.abs(k.y)&&1E-4>Math.abs(k.z))return[!1];l[0]=c[0]-a[0];l[1]=c[1]-a[1];l[2]=c[2]-a[2];if(1E-4>Math.abs(l.x)&&1E-4>Math.abs(l.y)&&1E-4>Math.abs(l.z))return[!1];c=p[0]*k[0]+p[1]*k[1]+p[2]*k[2];d=k[0]*l[0]+k[1]*l[1]+k[2]*l[2];e=p[0]*l[0]+p[1]*l[1]+p[2]*l[2];f=k[0]*k[0]+k[1]*k[1]+k[2]*k[2];h=(l[0]*l[0]+l[1]*l[1]+l[2]*l[2])*f-d*d;if(1E-4>Math.abs(h))return[!1];e=(c*d-e*f)/h;c=(c+d*e)/f;v[0]=a[0]+e*l[0];v[1]=a[1]+e*l[1];v[2]=a[2]+e*l[2];w[0]=b[0]+c*k[0];w[1]=b[1]+c*k[1];w[2]=b[2]+c*k[2];return[!0,g.dist(v,
w),v,w]},projectVectorVector2D:function(a,c,b){s[0]=c[0]-a[0];s[1]=c[1]-a[1];s[2]=0;y[0]=b[0]-a[0];y[1]=b[1]-a[1];y[2]=0;z[0]=b[0];z[1]=b[1];z[2]=0;c=g.dot(y,s);b=g.length(s);c/=b*b;x[0]=s[0]*c;x[1]=s[1]*c;C[0]=a[0]+x[0];C[1]=a[1]+x[1];g.subtract(z,C,H);a=g.length(H);c=g.length(y);b=g.length(s);var d=g.length(x);if(d>c||d>b)a=Number.MAX_VALUE;return a}};f.performance=window.performance||{};f.performance.now=f.performance.now||f.performance.mozNow||f.performance.msNow||f.performance.oNow||f.performance.webkitNow||
function(){return(new Date).getTime()};return f});