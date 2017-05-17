// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define("require exports ../lib/Renderer ../lib/SSAOHelperObscurance ../lib/ShadowMap ../lib/NearFarCalc ../lib/Util ../lib/gl-matrix ../lib/RenderPass ../lib/HighlightHelper ../lib/OffscreenRenderingHelper".split(" "),function(w,x,m,n,p,q,k,l,r,s,t){var g=l.vec3d,h=l.mat4d,u=k.assert;return function(){function b(a,v,b,c){this._drawSSAOMapDebugQuad=this._drawShadowMapDebugQuad=!1;this._needsRender=!0;this._content={};this._rctx=c;this._renderer=new m(a,v,b,this._rctx,!1);this._programRep=a;this._shadowMap=
new p(a,this._rctx);this._ssaoHelper=new n(a,b,this._rctx,this.setNeedsRender.bind(this));this._nearFarCalc=new q;this._highlightHelper=new s(a,b,this._rctx);this._offscreenRenderingHelper=new t(a,this._rctx)}b.prototype.getCombinedStats=function(){return this._renderer.getCombinedStats()};b.prototype.dispose=function(){this._renderer.dispose();this._shadowMap.getEnableState()&&this._shadowMap.setEnableState(!1);this._shadowMap.dispose();this._ssaoHelper.getEnableState()&&this._ssaoHelper.setEnableState(!1);
this._ssaoHelper.dispose();this._highlightHelper.getEnableState()&&this._highlightHelper.setEnableState(!1);this._offscreenRenderingHelper.getEnableState()&&this._offscreenRenderingHelper.setEnableState(!1)};b.prototype.setLightingData=function(a){this._renderer.setLightingData(a)};b.prototype.getLightingData=function(){return this._renderer.getLightingData()};b.prototype.getViewParams=function(a){var b=a||{};if(!a||a.pixelRatio)b.pixelRatio=this._renderer.getPixelRatio();return b};b.prototype.setViewParams=
function(a){null!=a.pixelRatio&&this._renderer.setPixelRatio(a.pixelRatio)};b.prototype.setRenderParams=function(a){void 0!==a.shadowMapResolution&&!1===this._shadowMap.getEnableState()&&this._shadowMap.setTextureResolution(a.shadowMapResolution);void 0!==a.shadowMap&&a.shadowMap!==this._shadowMap.getEnableState()&&this._shadowMap.setEnableState(a.shadowMap);void 0!==a.shadowMapMaxCascades&&this._shadowMap.setMaxNumCascades(a.shadowMapMaxCascades);!0!==this._highlightHelper.getEnableState()&&this._highlightHelper.setEnableState(!0);
void 0!==a.ssao&&a.ssao!==this._ssaoHelper.getEnableState()&&this._ssaoHelper.setEnableState(a.ssao);void 0!==a.ssaoAttenuation&&this._ssaoHelper.setAttenuation(a.ssaoAttenuation);void 0!==a.ssaoRadius&&this._ssaoHelper.setRadius(a.ssaoRadius);void 0!==a.ssaoFilterRadius&&console.error("The property ssaoFilterRadius is no longer supported as a render parameter.");void 0!==a.ssaoSamples&&this._ssaoHelper.setSamples(a.ssaoSamples);void 0!==a.drawShadowMapDebugQuad&&(this._drawShadowMapDebugQuad=a.drawShadowMapDebugQuad);
void 0!==a.drawSSAODebugQuad&&(this._drawSSAOMapDebugQuad=a.drawSSAODebugQuad);this._ssaoHelper.getEnableState()?this._renderer.ssaoEnabled=!0:this._renderer.ssaoEnabled=!1;void 0!==a.offscreenRendering&&a.offscreenRendering!==this._offscreenRenderingHelper.getEnableState()&&this._offscreenRenderingHelper.setEnableState(a.offscreenRendering);void 0!==a.antialiasingEnabled&&(this._renderer.renderOptions.antialiasing=a.antialiasingEnabled?"smaa":"none");void 0!==a.earlyOcclusionPixelDraw&&(this._renderer.renderOptions.earlyOcclusionPixelDraw=
a.earlyOcclusionPixelDraw);this._needsRender=!0};b.prototype.getRenderParams=function(){var a={};this._shadowMap.getIsSupported()&&(a.shadowMap=this._shadowMap.getEnableState(),a.shadowMapResolution=this._shadowMap.getTextureResolution(),a.shadowMapMaxCascades=this._shadowMap.getMaxNumCascades());this._ssaoHelper.getIsSupported()&&(a.ssao=this._ssaoHelper.getEnableState(),a.ssaoAttenuation=this._ssaoHelper.getAttenuation(),a.ssaoRadius=this._ssaoHelper.getRadius(),a.ssaoFilterRadius=this._ssaoHelper.getFilterRadius(),
a.ssaoSamples=this._ssaoHelper.getSamples());return a};b.prototype.modify=function(a,b,d,c){this._renderer.modify(a,b,d,c);c=0;for(var e=b.length;c<e;++c)delete this._content[b[c].uniqueName];c=0;for(b=a.length;c<b;++c)this._content[a[c].uniqueName]=a[c];c=0;for(a=d.length;c<a;++c)u(this._content[d[c].renderGeometry.uniqueName]===d[c].renderGeometry)};b.prototype.getContent=function(){return this._content};b.prototype.getPickRay=function(a,b,d,c,e,f){g.unproject(g.createFrom(a[0],a[1],0),c,d.projectionMatrix,
d.fullViewport,e);g.unproject(g.createFrom(a[0],a[1],1),c,d.projectionMatrix,d.fullViewport,f)};b.prototype.getProjectionMatrix=function(a,b,d,c,e){b=k.fovx2fovy(b,a[2],a[3]);h.perspective(180*b/Math.PI,a[2]/a[3],d,c,e)};b.prototype.setSelectionObject=function(a,b){this._renderer.setSelectionObject(a,b)};b.prototype.addExternalRenderer=function(a,b){return this._renderer.addExternalRenderer(a,b)};b.prototype.removeExternalRenderer=function(a){return this._renderer.removeExternalRenderer(a)};b.prototype.getExternalRenderers=
function(){return this._renderer.getExternalRenderers()};b.prototype.resetNeedsRender=function(){this._needsRender=!1;this._renderer.resetNeedsRender()};b.prototype.needsRender=function(){return this._needsRender||this._renderer.needsRender()};b.prototype.setNeedsRender=function(){this._needsRender=!0};b.prototype.render=function(a,b,d,c){var e=a.viewport,f;if(this._shadowMap.getEnableState()){f=this._nearFarCalc.calculateSceneNearFar(a,this._content,d);this._shadowMap.prepare(a,b,this._content,d,
f);b=this._shadowMap.getCascades();for(f=0;f<b.length;++f){var g=b[f];g.camera.setGLViewport(this._rctx);this._renderer.renderGeometryPass(r.MATERIAL_DEPTH_SHADOWMAP,g.camera,d)}this._shadowMap.finish(c);a.setGLViewport(this._rctx)}this._shadowMap.bindAll(this._programRep);this._renderer.renderAuxiliaryBuffers(a,d,this._shadowMap,this._ssaoHelper,c,this._offscreenRenderingHelper);this._renderer.render(a,d,this._shadowMap,this._ssaoHelper,c,this._highlightHelper,this._offscreenRenderingHelper);this._drawShadowMapDebugQuad&&
this._shadowMap.getEnableState()&&(a=h.ortho(e[0],e[2],e[1],e[3],-1,1),this._shadowMap.drawDebugQuad(a));this._drawSSAOMapDebugQuad&&this._ssaoHelper.getEnableState()&&(a=h.ortho(e[0],e[2],e[1],e[3],-1,1),this._ssaoHelper.drawQuad(a))};return b}()});