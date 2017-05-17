// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["require","exports"],function(m,n){return function(){function k(b,d){this.layerViewRequiredFunctions=b;this.layerViewOptionalFunctions=d;this._lodSwapNodeIndex={};this._lodSwapFeatureLookup={};this._lodSwapRootFeatureLookup={}}k.prototype.startNodeLoading=function(b,d,a,c,e,g){this._lodGlobalDirty=!1;this._lodMode=a;this._lodSwapNodeIndex={};this._lodSwapFeatureLookup={};this._lodSwapRootFeatureLookup={};this._nodeIndex=c;this._rootId=g;this._nodeTraversalState=d;this._nodeIsVisible=b;if("swap"===
this._lodMode){for(var h in e)b=e[h],this._nodeTraversalState(b.id).nodeHasLOD&&!this._nodeTraversalState(b.id).isChosenLOD&&(this._lodSwapNodeIndex[h]=b);this._lodSwapBuildUnmatchingFeatureLookups()}};k.prototype.cancelNodeLoading=function(){this._lodSwapNodeIndex={}};k.prototype.shouldLoadNode=function(b,d){var a=this._nodeTraversalState(b.id),c=a.nodeHasLOD,a=a.isChosenLOD;return"perLevel"!==this._lodMode?a||!c:a||!c?!0:this.layerViewOptionalFunctions.traversalOptions.allowPartialOverlaps?this._someSubtreesIncomplete(b):
this._allSubtreesIncomplete(b)};k.prototype.shouldSetPolygonOffset=function(b){return"perLevel"===this._lodMode?!this._nodeTraversalState(b.id).isChosenLOD:!1};k.prototype._allSubtreesIncomplete=function(b){if(this.layerViewRequiredFunctions.areAllBundlesLoaded(b))return!1;var d=!0;if(null!=b.children)for(var a=0;a<b.children.length;++a){var c=b.children[a];this._nodeIsVisible(c)&&(c=this._nodeIndex[c.id],d=d&&(null==c||this._allSubtreesIncomplete(c)))}return d};k.prototype._someSubtreesIncomplete=
function(b){if(this.layerViewRequiredFunctions.areAllBundlesLoaded(b))return!1;var d=!1;if(null!=b.children)for(var a=0;a<b.children.length;++a){var c=b.children[a];this._nodeIsVisible(c)&&(c=this._nodeIndex[c.id],d=d||null==c||this._allSubtreesIncomplete(c))}return d};k.prototype.setLodGlobalDirty=function(){this._lodGlobalDirty=!0};k.prototype.finishedLevel=function(b){"perLevel"===this._lodMode&&this._deleteUpToLevelRecurse(b-1,0,this._nodeIndex[this._rootId])};k.prototype._deleteUpToLevelRecurse=
function(b,d,a){if(null!=a&&!(d>b)&&(this._nodeTraversalState(a.id).isChosenLOD||this.layerViewRequiredFunctions.removeNodeData(a),null!=a.children))for(var c=0;c<a.children.length;++c)this._deleteUpToLevelRecurse(b,d+1,this._nodeIndex[a.children[c].id])};k.prototype.lodSwapBundleLoaded=function(b,d,a){if(null!=a)if(null!=a.swapPairs&&0<Object.keys(a.swapPairs).length){if(null!=d){b=a.swapPairs;a={};for(var c=0;c<d.length;c++)for(var e=d[c].features,g=0;g<e.length;g++)a[e[g].id]=!0;for(var h in b){d=
b[h];c=[];e=d.features;for(g=0;g<e.length;g++)null!=a[e[g]]&&c.push(e[g]);this.layerViewRequiredFunctions.removeFeatures(d.node,d.features)}}}else{for(c in a.nodesHigherInTree)this.layerViewRequiredFunctions.removeNodeData(a.nodesHigherInTree[c]);for(c in a.nodesDeeperInTree)this.layerViewRequiredFunctions.removeNodeData(a.nodesDeeperInTree[c])}this._lodGlobalDirty=!0};k.prototype.lodGlobalHandling=function(){if("global"===this._lodMode&&(!0===this._lodGlobalDirty||this.layerViewRequiredFunctions.isOverMemory())){var b=
this._rootId;null!=b&&(this._lodGlobalHandlingRecursion({id:b,mbs:null},this._nodeIndex,!1,!1,0),this._lodGlobalHandlingRecursionRemoveIntermediate(b,this._nodeIndex,!1,0),this._lodGlobalDirty=!1)}};k.prototype.lodSwapBuildInfoForNode=function(b){if(!this._nodeTraversalState(b.id).nodeHasLOD)return null;if("swap"===this._lodMode){var d={},a={},c=!1,e=!1,g=b.id+"",h;for(h in this._lodSwapNodeIndex){var f=this._lodSwapNodeIndex[h];null!=this.layerViewRequiredFunctions.getAddedFeatures(f.id)&&(c=null===
b.parentNode||0===(f.id+"").indexOf(g),e=null==f.parentNode||0===g.indexOf(f.id+""),!0===e&&(a[f.id]=f),!0===c&&(d[f.id]=f))}return{nodesHigherInTree:a,nodesDeeperInTree:d}}if("perLevel"===this._lodMode&&this._nodeTraversalState(b.id).isChosenLOD)return d={},this._getNodesRecurse(b,d),{nodesHigherInTree:null,nodesDeeperInTree:d}};k.prototype._getNodesRecurse=function(b,d){if(null!=b.children)for(var a=0;a<b.children.length;++a){var c=b.children[a],e=this._nodeIndex[c.id];null!=e&&(d[c.id]=e,this._getNodesRecurse(e,
d))}};k.prototype._lodSwapBuildUnmatchingFeatureLookups=function(){this._lodSwapFeatureLookup={};this._lodSwapRootFeatureLookup={};for(var b in this._lodSwapNodeIndex){var d=this._lodSwapNodeIndex[b],a=this.layerViewRequiredFunctions.getAddedFeatures(d.id);if(null!=a)for(var c=0;c<a.length;c++){var e=a[c];this._lodSwapFeatureLookup[e.id]=d;null!=e.rootFeature&&(null==this._lodSwapRootFeatureLookup[e.rootFeature]&&(this._lodSwapRootFeatureLookup[e.rootFeature]=[]),this._lodSwapRootFeatureLookup[e.rootFeature].push({node:d,
featureId:e.id}))}}};k.prototype._validateLodTreeVisibilities=function(){if(null!=this.layerViewOptionalFunctions.getAllAddedFeatures){var b=this.layerViewOptionalFunctions.getAllAddedFeatures();console.debug("validating lod tree: ");var d={},a={},c=!0,e;for(e in b)for(var g=b[e],h=0;h<g.length;h++){var f=g[h];null!=d[f.id]&&d[f.id]!==e&&(console.debug("node "+e+" !! encountered feature "+f.id+" already in node "+d[f.id]),c=!1);null!=a[f.id]&&a[f.id]!==e&&(console.debug("node "+e+" !! encountered feature "+
f.id+" already as rootFeature in node "+a[f.id]),c=!1);d[f.id]=e;null!=f.rootFeature&&a[f.rootFeature]!==e&&(null!=a[f.rootFeature]&&(console.debug("node "+e+" !! encountered rootFeature "+f.rootFeature+" already in node "+a[f.rootFeature]),c=!1),null!=d[f.rootFeature]&&(console.debug("node "+e+" !! encountered rootFeature "+f.rootFeature+" already as feature"),c=!1),a[f.rootFeature]=e)}return c}};k.prototype._lodGlobalHandlingRecursion=function(b,d,a,c,e){var g=b.id,h=d[g];if(null==h)return a=null!=
b.mbs?this._nodeIsVisible(b):!1,c||!a;g=this._nodeTraversalState(g);b=this._nodeIsVisible(h);var g=g.isChosenLOD,f=this.layerViewRequiredFunctions.isBundleAlreadyAddedToStage(h,0).alreadyLoaded,k=!0;if(null!=h.children)for(var l=0;l<h.children.length;++l)this._lodGlobalHandlingRecursion(h.children[l],d,f&&g||a,g||c,e+1)||(k=!1);d=this.layerViewRequiredFunctions.isOverMemory();if(f&&!g&&((c?a:k)||d))this.setLodGlobalDirty(),this.layerViewRequiredFunctions.removeNodeData(h),f=!1;f&&this.layerViewOptionalFunctions.setPolygonOffset&&
this.layerViewOptionalFunctions.setPolygonOffset(h,!(g&&!c));a=k||f;if(g&&f||!b||c)a=!0;g&&(!f&&b)&&(a=!1);return a};k.prototype._lodGlobalHandlingRecursionRemoveIntermediate=function(b,d,a,c){var e=d[b];if(null!=e){var g=this.layerViewRequiredFunctions.isBundleAlreadyAddedToStage(e,0).alreadyLoaded;b=this._nodeTraversalState(b).isChosenLOD;if(null!=e.children)for(var h=0;h<e.children.length;++h)this._lodGlobalHandlingRecursionRemoveIntermediate(e.children[h].id,d,g||a,c+1);a&&(!b&&g)&&(this.layerViewRequiredFunctions.removeNodeData(e),
this.setLodGlobalDirty())}};return k}()});