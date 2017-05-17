// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["require","exports","./Util","./gl-matrix"],function(r,w,s,m){r=m.vec3d;var l=m.vec4d,h=m.mat4d;m=function(){function f(){this._context={content:[],near:[],far:[],nearSpecial:[],farSpecial:[],bestNear:0,bestFar:0,bestNear2:0,bestFar2:0};this._boundingInfoHelper=new u}f.prototype._resetContext=function(){var c=this._context;c.content.length=0;c.near.length=0;c.far.length=0;c.nearSpecial.length=0;c.farSpecial.length=0;c.bestNear=Number.MAX_VALUE;c.bestFar=-Number.MAX_VALUE;return this._context};
f.prototype.calculateSceneNearFar=function(c,a,d){var b=this._resetContext(),e=c.viewMatrix,n=e[2],f=e[6],t=e[10],l=e[14],h=0,g;for(g in a)if(e=a[g],!(null!=e.displayedIndexRange&&0===e.displayedIndexRange.length)&&e.castShadow&&d.get(e.idx)){var m=e.bsRadius,q=e.center,p=n*q[0]+f*q[1]+t*q[2]+l,q=p-m,m=p+m;b.content[h]=e;b.near[h]=-m;b.far[h]=-q;++h}if(0===h)return[b.bestNear,b.bestFar];for(a=0;a<h;++a)b.near[a]>b.bestFar&&(b.bestFar=b.near[a]),2<b.near[a]&&b.far[a]<b.bestNear&&(b.bestNear=b.far[a]);
b.bestNear2=Math.max(0.5*b.bestNear,2);b.bestFar2=2*b.bestFar;for(a=n=d=0;a<h;++a)b.near[a]<b.bestNear&&(b.near[a]>=b.bestNear2?b.bestNear=b.near[a]:b.nearSpecial[d++]=a),b.far[a]>b.bestFar&&(b.far[a]<=b.bestFar2?b.bestFar=b.far[a]:b.farSpecial[n++]=a);if(0===d&&0===n)return[b.bestNear,b.bestFar];b.nearSpecial.length=d;b.farSpecial.length=n;b.nearSpecial.sort(function(a,c){return b.near[a]<b.near[c]?-1:b.near[a]>b.near[c]?1:0});b.farSpecial.sort(function(a,c){return b.far[a]<b.far[c]?1:b.far[a]>b.far[c]?
-1:0});this._boundingInfoHelper.init(c,b);for(a=0;a<d;++a)b.near[b.nearSpecial[a]]<b.bestNear&&(e=b.content[b.nearSpecial[a]],c=e.boundingInfo,this._boundingInfoHelper.includeNearBoundingInfoRec(c,e.transformation));for(a=0;a<n;++a)b.far[b.farSpecial[a]]>b.bestFar&&(e=b.content[b.farSpecial[a]],c=e.boundingInfo,this._boundingInfoHelper.includeFarBoundingInfoRec(c,e.transformation));return[b.bestNear,b.bestFar]};return f}();var u=function(){function f(){this._clippingHelper=new v;this._planes=[l.create(),
l.create(),l.create(),l.create(),l.create(),l.create()];this._viewProj=h.create();this._view=h.create()}f.prototype.init=function(c,a){this._context=a;h.set(c.viewMatrix,this._view);h.multiply(c.projectionMatrix,this._view,this._viewProj);c.copyFrustumPlanes(this._planes);this._clippingHelper.init(a)};f.prototype.includeNearBoundingInfoRec=function(c,a){var d=c.getBSRadius(),b=c.getCenter();h.multiplyVec3(a,b,g);var b=a[2]*a[2]+a[6]*a[6]+a[10]*a[10],b=Math.sqrt(Math.max(Math.max(a[0]*a[0]+a[4]*a[4]+
a[8]*a[8],a[1]*a[1]+a[5]*a[5]+a[9]*a[9]),b)),e=g[0],f=g[1],k=g[2],d=d*b;if(!(this._planes[0][0]*e+this._planes[0][1]*f+this._planes[0][2]*k+this._planes[0][3]>d)&&(!(this._planes[1][0]*e+this._planes[1][1]*f+this._planes[1][2]*k+this._planes[1][3]>d)&&!(this._planes[2][0]*e+this._planes[2][1]*f+this._planes[2][2]*k+this._planes[2][3]>d)&&!(this._planes[3][0]*e+this._planes[3][1]*f+this._planes[3][2]*k+this._planes[3][3]>d))&&(b=this._view[2]*e+this._view[6]*f+this._view[10]*k+this._view[14],e=b+d,
!(2>-(b-d))&&!(-e>=this._context.bestNear)))if(-e>this._context.bestNear2)this._context.bestNear=-e;else{if(100<d&&(d=c.getChildren(),void 0!==d)){for(b=0;8>b;++b)void 0!==d[b]&&this.includeNearBoundingInfoRec(d[b],a);return}this._clippingHelper.intersectFrustumAABB(this._viewProj,a,c.getBBMin(),c.getBBMax())}};f.prototype.includeFarBoundingInfoRec=function(c,a){var d=c.getBSRadius(),b=c.getCenter();h.multiplyVec3(a,b,g);var b=a[2]*a[2]+a[6]*a[6]+a[10]*a[10],b=Math.sqrt(Math.max(Math.max(a[0]*a[0]+
a[4]*a[4]+a[8]*a[8],a[1]*a[1]+a[5]*a[5]+a[9]*a[9]),b)),e=g[0],f=g[1],k=g[2],d=d*b;if(!(this._planes[0][0]*e+this._planes[0][1]*f+this._planes[0][2]*k+this._planes[0][3]>d)&&(!(this._planes[1][0]*e+this._planes[1][1]*f+this._planes[1][2]*k+this._planes[1][3]>d)&&!(this._planes[2][0]*e+this._planes[2][1]*f+this._planes[2][2]*k+this._planes[2][3]>d)&&!(this._planes[3][0]*e+this._planes[3][1]*f+this._planes[3][2]*k+this._planes[3][3]>d))&&(b=this._view[2]*e+this._view[6]*f+this._view[10]*k+this._view[14]-
d,!(-b<=this._context.bestFar)))if(-b<this._context.bestFar2)this._context.bestFar=-b;else{if(100<d&&(d=c.getChildren(),void 0!==d)){for(b=0;8>b;++b)void 0!==d[b]&&this.includeFarBoundingInfoRec(d[b],a);return}this._clippingHelper.intersectFrustumAABB(this._viewProj,a,c.getBBMin(),c.getBBMax())}};return f}(),v=function(){function g(){this._clipP=Array(8);for(var c=0;8>c;++c)this._clipP[c]=l.create()}g.prototype.init=function(c){this._context=c};g.prototype.intersectFrustumAABB=function(c,a,d,b){h.multiply(c,
a,f);for(c=0;8>c;++c){a=this._clipP[c];var e=0===c||3===c||4===c||7===c?d[0]:b[0],g=0===c||1===c||4===c||5===c?d[1]:b[1],k=4>c?d[2]:b[2];a[0]=f[0]*e+f[4]*g+f[8]*k+f[12];a[1]=f[1]*e+f[5]*g+f[9]*k+f[13];a[2]=f[2]*e+f[6]*g+f[10]*k+f[14];a[3]=f[3]*e+f[7]*g+f[11]*k+f[15]}for(c=0;12>c;++c){d=this._clipTriangle(this._clipP[p[c][0]],this._clipP[p[c][1]],this._clipP[p[c][2]]);b=!0;for(a=0;a<d.length;++a)if(e=d[a][3],2<=e){b=!1;break}if(!b)for(a=0;a<d.length;++a)e=d[a][3],e<this._context.bestNear&&(this._context.bestNear=
e),e>this._context.bestFar&&(this._context.bestFar=e)}};g.prototype._inside=function(c,a){if(0===a)return c[0]>=-c[3];if(1===a)return c[1]>=-c[3];if(2===a)return c[0]<=c[3];if(3===a)return c[1]<=c[3];s.assert(!1)};g.prototype._intersect=function(c,a,d){var b=0;0===d?b=(-c[3]-c[0])/(a[0]-c[0]+a[3]-c[3]):1===d?b=(-c[3]-c[1])/(a[1]-c[1]+a[3]-c[3]):2===d?b=(c[3]-c[0])/(a[0]-c[0]-a[3]+c[3]):3===d&&(b=(c[3]-c[1])/(a[1]-c[1]-a[3]+c[3]));return l.lerp(c,a,b,l.create())};g.prototype._clipTriangle=function(c,
a,d){c=[c,a,d];for(a=0;4>a;++a){d=c;c=[];for(var b=0;b<d.length;++b){var e=d[b],f=d[(b+1)%d.length];this._inside(f,a)?(this._inside(e,a)||c.push(this._intersect(e,f,a)),c.push(f)):this._inside(e,a)&&c.push(this._intersect(e,f,a))}}return c};return g}(),p=[[0,1,3],[2,3,1],[1,5,2],[6,2,5],[5,4,6],[7,6,4],[4,0,7],[3,7,0],[3,2,7],[6,7,2],[4,5,0],[1,0,5]],g=r.create(),f=h.create();return m});