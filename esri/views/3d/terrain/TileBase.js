// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define("./terrainUtils ./TileUtils ./TerrainConst ./TileGeometryFactory ./UpsampleInfo ./ElevationData ./TilePerLayerInfo ../support/mathUtils ../lib/glMatrix ../../../core/arrayUtils".split(" "),function(A,x,f,E,F,G,B,y,d,C){var h=d.vec3d,q=d.vec2d,u=d.vec4d,H=d.mat4d,D=A.weakAssert,v=h.create(),k=u.create(),r=u.create(),I=h.create(),m={},t=f.LayerClass.LAYER_CLASS_COUNT,z=f.LayerClass.MAP,n=f.LayerClass.ELEVATION,p=f.TileUpdateTypes;d=function(a,b,c){this.lij=[0,0,0];this.extent=u.create();this.extentWGS84Rad=
u.create();this.centerAtSeaLevel=h.create();this.center=h.create();this.tileUp=I;this.elevationBounds=q.create();this.children=[null,null,null,null];this.layerInfo=Array(t);this.intersectsClippingArea=this.isWithinClippingArea=!0;this.clippingArea=null;this._maxTesselation=0};d.prototype.init=function(a,b,c,e){this.lij[0]=a[0];this.lij[1]=a[1];this.lij[2]=a[2];e.getExtent(a[0],a[1],a[2],this.extent,this.extentWGS84Rad);this.intersectsClippingArea=this.isWithinClippingArea=!0;this.clippingArea=null;
this.radius=this.edgeLen=0;this.vlevel=a?a[0]:0;b&&b.elevationBounds?q.set(b.elevationBounds,this.elevationBounds):q.set2(0,0,this.elevationBounds);this.parent=b;for(a=0;4>a;a++)this.children[a]=null;this.pendingUpdates=0;this.renderData=null;this.renderOrder=this.screenDepth=0;this.visible=!1;this.parentSurface=c;for(a=0;a<t;a++)if(c){b=c.numLayers(a);var s;this.layerInfo[a]?(s=this.layerInfo[a],s.length=b):(s=Array(b),this.layerInfo[a]=s);for(var d=0;d<b;d++)s[d]=B.makeEmptyLayerInfo(a,s[d]),a==
n&&this.findElevationBoundsForLayer(d,-1)}else this.layerInfo[a]=null;this.computeElevationBounds();this._maxTesselation=Math.min(e.pixelSize[0],f.MAX_TILE_TESSELATION)};d.prototype.dispose=function(){for(var a=0;a<t;a++)for(var b=this.layerInfo[a],c=0;c<b.length;c++){var e=b[c];e.upsampleFromTile&&(F.Pool.release(e.upsampleFromTile),e.upsampleFromTile=null)}};d.prototype.releaseLayerResources=function(){for(var a=this.layerInfo[f.LayerClass.MAP],b=0;b<a.length;b++)a[b].releaseResources()};d.prototype.updateScreenDepth=
function(a){h.set(this.center,r);r[3]=1;H.multiplyVec4(a,r,r);this.screenDepth=r[2]/r[3]};d.prototype.shouldSplit=function(a,b){var c=this.lij[0];if(1>c)return p.SPLIT;h.subtract(this.center,b,v);var e=h.length(v),d=this.edgeLen/(2*a[0]*e),e=this.edgeLen/(2*a[2]*e),l=a[1],f=a[3],g=a[4],J=a[5];return d<l?this.vlevel!==this.lij[0]?(this.vlevel=this.lij[0],p.VSPLITMERGE):p.NONE:c>=g?(c+=Math.ceil(-y.log2(l/d)),c!==this.vlevel?(this.vlevel=c,p.VSPLITMERGE):p.NONE):6<c&&(h.scale(this.tileUp,h.dot(this.tileUp,
v),k),h.subtract(k,v),h.length2(k)>this.radius*this.radius&&(h.scale(k,this.radius/h.length(k)),h.add(k,this.center),h.subtract(b,k,k),c=this.elevationBounds[1]-this.elevationBounds[0],Math.min(1,(Math.abs(h.dot(k,this.tileUp))+0.5*c+this.curvatureHeight)/h.length(k))*e<0.1/J*f))?p.NONE:p.SPLIT};d.prototype.createElevationDataFromLERC=function(a){var b;try{b=G.createFromLERC(this.lij,this.extent,a,{noDataValue:f.ELEVATION_NODATA_VALUE})}catch(c){console.warn("Error decoding %s: %s",a.url,c.message)}return b};
d.prototype.getWGS84Extent=function(){return this.extentWGS84Rad.map(y.rad2deg)};d.prototype.load=function(a){for(var b=0;b<t;b++)this.layerInfo[b]&&this._createOrUpdateAgents(0,b);a.loadTile(this)};d.prototype.unload=function(a){this.renderData&&a.unloadTile(this);for(a=0;a<t;a++)for(var b=this.layerInfo[a],c=0;c<b.length;c++){var e=b[c];e.loadingAgent&&e.loadingAgent!==m&&(e.loadingAgent.dispose(),this.parentSurface.agentTypeByLayerIndex(c,a).Pool.release(e.loadingAgent),e.loadingAgent=null);e.pendingUpdates=
0}this.pendingUpdates&=~f.TileUpdateTypes.UPDATE_GEOMETRY;this.pendingUpdates&=~f.TileUpdateTypes.UPDATE_TEXTURE};d.prototype.updateClippingStatus=function(a){C.equals(a,this.clippingArea)||(a?(this.intersectsClippingArea=this.intersectsExtent(a),this.isWithinClippingArea=this.isWithinExtent(a)):this.isWithinClippingArea=this.intersectsClippingArea=!0,this.clippingArea=a,this.renderData&&this.updateGeometry())};d.prototype.updateVisibility=function(a,b,c){a=c||this.isVisible(a,b)&&this.intersectsClippingArea;
if(a!==this.visible){this.visible=a;b=this.layerInfo[0];for(c=0;c<b.length;c++){var e=b[c];e.loadingAgent&&e.loadingAgent!==m&&e.loadingAgent.setSuspension(!a)}}return a};d.prototype.getLayerInfo=function(a,b){return this.layerInfo[b][a]};d.prototype.hasLayerData=function(a,b){var c=this.layerInfo[b][a];return c&&c.data};d.prototype.tileDataAvailable=function(a,b,c){return(b=this.layerInfo[c][b].tilemap)?"unavailable"!==b.getAvailability(a.lij[1],a.lij[2]):!0};d.prototype.requestLayerData=function(a,
b,c){f.TILE_LOADING_DEBUGLOG&&console.log("tile %s layer %d/%d requested by tile %s",this.lij.toString(),b,a,c.tile.lij.toString());var e=this.layerInfo[b][a];if(-1<e.waitingAgents.indexOf(c))return console.warn("agent already requested this piece of map data (tile %s, agent tile %s, layer: %d/%d)",this.lij.toString(),c.tile.lij.toString(),b,a),!0;if(e.data)return console.warn("agent requested existing data (tile %s, agent tile %s, layer: %d/%d)",this.lij.toString(),c.tile.lij.toString(),b,a),e.waitingAgents.push(c),
setTimeout(c.dataArrived.bind(c,this),0),!0;if(e.pendingUpdates&p.DECODE_LERC)return e.waitingAgents.push(c),!0;e.waitingAgents.push(c);if(!e.requestPromise){var d=this.parentSurface.requestTileData(this,a,b);a=function(){e.requestPromise===d&&(e.requestPromise=null)};e.requestPromise=d;d.then(a,a)}return e.requestPromise?!0:!1};d.prototype.descendants=function(a){a||(a=[]);for(var b=0;4>b;b++){var c=this.children[b];c&&(c.descendants(a),a.unshift(this.children[b]))}return a};d.prototype.isLij=function(a){return this.lij[0]===
a[0]&&this.lij[1]===a[1]&&this.lij[2]==a[2]};d.prototype.findByLij=function(a){if(this.isLij(a))return this;for(var b=0;4>b;b++){var c=this.children[b];if(c&&(c=c.findByLij(a)))return c}return null};d.prototype.unrequestLayerData=function(a,b,c,e){f.TILE_LOADING_DEBUGLOG&&console.log("tile %s layer %d/%d canceled by tile %s",this.lij.toString(),b,a,c.tile.lij.toString());var d=this.layerInfo[b][a],l=d.waitingAgents;c=l.indexOf(c);D(-1<c,"agent has not requested this piece of map data");l[c]=l[l.length-
1];l.length--;if(1>l.length){if(b===z&&(e=e?e[a]:this.parentSurface.layerViewByIndex(a,z),A.isVectorTileLayerView(e))){d.requestPromise&&d.requestPromise.cancel("cancel");return}D(d.requestPromise||d.rawData,"no pending operations on layerInfo that agents were waiting for");d.requestPromise&&(this.parentSurface.cancelRequest(d.requestPromise),d.requestPromise=null);f.TILE_LOADING_DEBUGLOG&&console.log("tile %s layer %d/%d request/loading canceled",this.lij.toString(),b,a)}};d.prototype.dataArrived=
function(a,b,c){a=this.layerInfo[b][a];a.data=c;for(c=0;c<a.waitingAgents.length;c++)a.waitingAgents[c].dataArrived(this);a.waitingAgents.length=0};d.prototype.dataMissing=function(a,b,c){c.notInTilemap||console.error("Tile %s layer %d/%d error",this.lij.toString(),b,a);a=this.layerInfo[b][a];for(b=0;b<a.waitingAgents.length;b++)a.waitingAgents[b].dataMissing(this);a.waitingAgents.length=0};d.prototype.updateTexture=function(a){this.renderData&&(a?this.parentSurface._renderer.updateTileTexture(this):
(this.pendingUpdates|=f.TileUpdateTypes.UPDATE_TEXTURE,this.parentSurface._pendingUpdates=!0))};d.prototype.computeElevationBounds=function(){q.set2(Number.MAX_VALUE,-Number.MAX_VALUE,this.elevationBounds);for(var a=this.layerInfo[n],b=!1,c=0;c<a.length;c++){var e=a[c];e.elevationBounds&&(this.elevationBounds[0]=Math.min(this.elevationBounds[0],e.elevationBounds[0]),this.elevationBounds[1]=Math.max(this.elevationBounds[1],e.elevationBounds[1]),b=!0)}b||q.set2(0,0,this.elevationBounds);this.updateRadiusAndCenter()};
d.prototype.updateRadiusAndCenter=function(){h.scale(this.tileUp,0.5*(this.elevationBounds[0]+this.elevationBounds[1]),k);h.add(this.centerAtSeaLevel,k,this.center)};d.prototype.findElevationBoundsForLayer=function(a,b){var c=this.layerInfo[n][a];if(!c.elevationBounds||c.elevationBounds[2]<b){var e=this.parentSurface.layerViewByIndex(a,n);if(x.fallsWithinLayer(this,e,!1)){e=!1;if(c.data)q.set(c.data.bounds,k),k[2]=this.lij[0],e=!0;else{for(var d=this.parent,l=0,w=null,g=c.data;d&&(!g||l<f.ELEVATION_DESIRED_RESOLUTION_LEVEL);){l=
this.vlevel-d.lij[0];w=g||w;g=d.layerInfo[n][a].data;if(!g&&w&&l>=f.ELEVATION_DESIRED_RESOLUTION_LEVEL)break;d=d.parent}if(g=g||w)g.computeMinMaxValue(this.lij[0],this.lij[1],this.lij[2],k),Infinity!==k[0]&&(k[2]=g.level,e=!0)}e&&(c.elevationBounds?h.set(k,c.elevationBounds):c.elevationBounds=[k[0],k[1],k[2]])}}};d.prototype.updateGeometry=function(){this.pendingUpdates|=f.TileUpdateTypes.UPDATE_GEOMETRY;this.parentSurface._pendingUpdates=!0};d.prototype.modifyLayers=function(a,b,c,e){for(var d=b.length,
l=this.layerInfo[c],k=Array(d),g=0;g<l.length;g++){var f=l[g];f.loadingAgent&&f.loadingAgent!==m&&(f.loadingAgent.dispose(e),this.parentSurface.agentTypeByLayerIndex(g,c).Pool.release(f.loadingAgent),f.loadingAgent=null);f.waitingAgents.length=0}if(c===z)for(g=0;g<l.length;g++)void 0===a[g]&&l[g].releaseResources();for(g=0;g<d;g++)a=b[g],k[g]=-1<a?l[a]:B.makeEmptyLayerInfo(c);this.layerInfo[c]=k};d.prototype.restartAgents=function(a){if(this.renderData)if(this._createOrUpdateAgents(0,a),a===n){this.updateGeometry();
a=this.layerInfo[a];for(var b=0;b<a.length;b++)a[b].pendingUpdates|=f.TileUpdateTypes.UPDATE_GEOMETRY;this.parentSurface._pendingUpdates=!0}else this.updateTexture(!0)};d.prototype.updateAgents=function(a){if(this.renderData){for(var b=this.layerInfo[a],c=0;c<b.length;c++){var e=b[c];e.loadingAgent===m&&(e.loadingAgent=null)}this._createOrUpdateAgents(0,a)}};d.prototype.agentDone=function(a,b){var c=this.layerInfo[b],e=c[a];e.loadingAgent=m;!e.data&&!e.upsampleFromTile&&a<c.length-1&&this._createOrUpdateAgents(a+
1,b)};d.prototype._createOrUpdateAgents=function(a,b){var c;c=b===n?!1:!this.visible;for(var e=a,d=this.layerInfo[b];e<d.length;){var l=d[e],f=!1,g=this.parentSurface.layerViewByIndex(e,b);if(null!==l.loadingAgent&&l.loadingAgent!==m)f=l.loadingAgent.update();else if(l.loadingAgent!==m&&x.fallsWithinLayer(this,g,!1)){var k=this.parentSurface.agentTypeByLayerIndex(e,b),h=k.Pool.acquire();(f=h.init(this,e,b,c))?l.loadingAgent=h:(k.Pool.release(h),l.loadingAgent=m)}if(f&&!g.isTransparent)break;e++}};
d.prototype.geometryState=function(a){var b,c=this._getElevationInfo(a?a.samplerData:null),e=this.lij[0],d=!1;c.samplerData?(b=this.vlevel-e,b=Math.max(e-c.maxTileLevel,f.ELEVATION_DESIRED_RESOLUTION_LEVEL-b),e=this._maxTesselation,b=y.clamp((e>>b)+1,2,e+1)):b=8>e?this._numSubdivisionsAtLevel[e]+1:2;b=E.supportedNumVertsPerRow(b);e=this.clippingArea;if(!this.intersectsClippingArea||this.isWithinClippingArea)e=null;a?(a.numVertsPerRow!==b&&(a.numVertsPerRow=b,d=!0),c.changed&&(a.samplerData=c.samplerData,
d=!0),C.equals(a.clippingArea,e)||(a.clippingArea=e,d=!0),a.needsUpdate=d):a={numVertsPerRow:b,samplerData:c.samplerData,needsUpdate:!0,clippingArea:e};return a};d.prototype._getElevationInfo=function(a){for(var b=this.layerInfo[n],c=b.length,e=Array(c),d=0,f=0,k=!1,g=0;g<c;g++){var h=b[g];if(h.upsampleFromTile){var h=h.upsampleFromTile.tile,m=h.layerInfo[n][g].data;if(!a||a[d]!==m.samplerData)k=!0;e[d++]=m.samplerData;f=Math.max(f,h.lij[0])}else if(h.data&&(m=this.parentSurface.layerViewByIndex(g,
n),x.fallsWithinLayer(this,m,!1))){if(!a||a[d]!==h.data.samplerData)k=!0;e[d++]=h.data.samplerData;f=this.lij[0]}}a&&a.length!==d&&(k=!0);0<d?e.length=d:e=null;return{changed:k,samplerData:e,maxTileLevel:f}};d.prototype.isWithinExtent=function(a){var b=this.extent;return b[0]>=a[0]&&a[2]>=b[2]&&b[1]>=a[1]&&a[3]>=b[3]};d.prototype.intersectsExtent=function(a){var b=this.extent;return b[2]>=a[0]&&a[2]>=b[0]&&b[3]>=a[1]&&a[3]>=b[1]};return d});