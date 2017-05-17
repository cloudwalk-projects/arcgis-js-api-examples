// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define("../../core/Accessor ../../core/Collection ../../core/Error ../../core/Evented ../../core/HandleRegistry ../../core/lang ../../core/promiseList ../../core/watchUtils ../../geometry/Extent ../../geometry/Point ../../geometry/SpatialReference ../../geometry/support/scaleUtils ../../Graphic ../../PopupTemplate ../../styles/basic ../../symbols/PictureMarkerSymbol ../../symbols/SimpleFillSymbol ../../symbols/SimpleLineSymbol ../../symbols/SimpleMarkerSymbol ../../symbols/TextSymbol ../../tasks/Locator ../../tasks/support/Query dojo/_base/array dojo/_base/lang dojo/Deferred dojo/has dojo/i18n!./nls/Search require".split(" "),
function(t,E,u,F,G,w,A,v,B,x,H,C,y,I,J,K,L,M,N,T,O,U,P,s,p,Q,r,R){var z={locator:new O({url:"//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"}),singleLineFieldName:"SingleLine",outFields:["Addr_type","Match_addr","StAddr","City"],name:r.esriLocatorName,localSearchOptions:{minScale:3E5,distance:5E4},placeholder:r.placeholder,resultSymbol:new K({url:R.toUrl(Q("trident")?"../../themes/base/images/search-symbol-32.png":"../../themes/base/images/search-symbol-32.svg"),size:24,width:24,height:24,
xoffset:0,yoffset:0})},S=/https?:\/\/services.*\.arcgis\.com/i;t=t.createSubclass([F],{properties:{activeSource:{},activeSourceIndex:{},allPlaceholder:{},autoNavigate:{},autoSelect:{},currentSuggestion:{},defaultSource:{readOnly:!0},resultGraphicEnabled:{},resultGraphic:{},locationToAddressDistance:{},maxInputLength:{},maxResults:{},maxSuggestions:{},minSuggestCharacters:{},placeholder:{},popup:{dependsOn:["view.popup"],readOnly:!0},popupEnabled:{},popupTemplate:{type:I},results:{},scale:{dependsOn:["view.scale"],
readOnly:!0},searchAllEnabled:{},selectedResult:{},popupOpenOnSelect:{},searchTerm:{},sources:{type:E},suggestionDelay:{},suggestions:{},suggestionsEnabled:{},view:{},zoomScale:{}},declaredClass:"esri.widgets.Search.SearchViewModel",constructor:function(){this._deferredSuggestions=[];this._handles=new G;this._manageSuggest=this._manageSuggest.bind(this)},getDefaults:function(){return s.mixin(this.inherited(arguments),{defaultSource:z,popupTemplate:{},sources:[z]})},initialize:function(){this._handles.add([v.init(this,
"activeSourceIndex",function(a){this._updateActiveSource();this._setPlaceholder(a)}.bind(this)),v.init(this,"allPlaceholder",function(){this._setPlaceholder(this.activeSourceIndex)}.bind(this)),v.init(this,"sources",function(){this._setDefaultActiveSourceIndex();this._setPlaceholder(this.activeSourceIndex)}.bind(this)),v.init(this,"searchTerm",function(a){this.currentSuggestion&&this.currentSuggestion.text!==a&&(this.currentSuggestion=null)}.bind(this)),v.init(this,"searchAllEnabled",this._setDefaultActiveSourceIndex.bind(this))])},
destroy:function(){this.clearGraphics();this._viewReadyPromise&&this._viewReadyPromise.cancel();this._handles.destroy();this._handles=null},_i18n:r,_defaultSR:H.WGS84,activeSource:null,activeSourceIndex:0,allPlaceholder:r.allPlaceholder,autoNavigate:!0,autoSelect:!0,resultGraphicEnabled:!0,popupEnabled:!0,currentSuggestion:null,defaultSource:null,resultGraphic:null,locationToAddressDistance:1500,maxInputLength:128,maxResults:6,maxSuggestions:6,minSuggestCharacters:1,placeholder:"",popup:null,_popupGetter:function(){return this.get("view.popup")||
null},popupTemplate:null,results:null,scale:null,_scaleGetter:function(){return this.get("view.scale")||null},searchAllEnabled:!0,selectedResult:null,popupOpenOnSelect:!0,searchTerm:"",sources:null,_sourcesSetter:function(a){a.forEach(function(a){a.name||(a.name=this._getSourceName(a))},this);this._set("sources",a)},suggestionDelay:150,suggestions:null,suggestionsEnabled:!0,view:null,zoomScale:1E3,clear:function(){this.set({searchTerm:"",results:null,suggestions:null,selectedResult:null,currentSuggestion:null});
this.clearGraphics();this.emit("search-clear")},search:function(a){this.emit("search-start");return this._viewReady().then(function(){return this._searchDeferred(a)}.bind(this)).then(function(a){var d=a.results;this.results=d;this.emit("search-complete",a);this._selectFirstResult(d,a.activeSourceIndex);return d}.bind(this))},suggest:function(a){a||(a=this.searchTerm);this.emit("suggest-start",{searchTerm:a});this.cancelSuggest();this._suggestionQueryTimer=setTimeout(function(){this._manageSuggest(a)}.bind(this),
this.suggestionDelay)},cancelSuggest:function(){this._cancelDeferreds();this._suggestionQueryTimer&&clearTimeout(this._suggestionQueryTimer)},select:function(a){var c=this._getDefaultSymbol(a),d,b=this.sources,e=this.activeSourceIndex,f=this.resultGraphicEnabled,h=this.autoNavigate,l=this.popupOpenOnSelect,k=this.popupEnabled,g=this.popupTemplate,m=a.feature.clone();this.selectedResult=a;if(-1===e){var q=this._getSourceIndexOfResult(a);null!==q&&(d=b.getItemAt(q),e=q)}else d=b.getItemAt(e);d&&(b=
d.featureLayer,d.hasOwnProperty("resultSymbol")&&(c=d.resultSymbol),d.hasOwnProperty("resultGraphicEnabled")&&(f=d.resultGraphicEnabled),d.hasOwnProperty("autoNavigate")&&(h=d.autoNavigate),d.hasOwnProperty("popupOpenOnSelect")&&(l=d.popupOpenOnSelect),d.hasOwnProperty("popupEnabled")&&(k=d.popupEnabled),d.hasOwnProperty("popupTemplate")?g=d.popupTemplate:b&&b.popupTemplate&&(g=b.popupTemplate));if(m){var n=this.resultGraphic,b=s.mixin({},m.attributes,this.getExtraSearchResultAttributes(a)),q=null;
k&&(q=g);this._removeFromGraphics(n);n=new y({geometry:m.geometry,symbol:c,attributes:b,popupTemplate:q});"text-symbol"===n.get("symbol.type")&&(n.symbol.text=a.name);var D=this.popup,c=this.view,g=new p;c&&h&&a&&a.hasOwnProperty("extent")?(h=a.extent,"3d"===c.type&&(h={target:a.extent,tilt:0}),c.goTo(h).always(g.resolve)):g.resolve();g.then(function(){f&&this._addToGraphics(n);D&&(k&&l)&&D.open({features:[n],location:n.geometry})}.bind(this));this.resultGraphic=n}this.emit("select-result",{result:a,
source:d,sourceIndex:e})},clearGraphics:function(){this.view&&this.view.graphics.remove(this.resultGraphic);this.resultGraphic=null},getExtraSearchResultAttributes:function(a){},_manageSuggest:function(a){return this._viewReady().then(function(){return this._suggestDeferred(a)}.bind(this)).then(function(a){var d=null;a&&(d=a.results);this.suggestions=d;this.emit("suggest-complete",a);return d}.bind(this))},_addToGraphics:function(a){this.view&&this.view.graphics.push(a)},_removeFromGraphics:function(a){this.view&&
this.view.graphics.remove(a)},_error:function(a){return new u(this.declaredClass,a)},_searchDeferred:function(a){var c=new p,d=this.searchTerm,b=this.activeSourceIndex;a&&a.hasOwnProperty("index")&&(b=a.index);this.clearGraphics();var e={magicKey:this.currentSuggestion?this.currentSuggestion.magicKey:null,text:d};a?"string"===typeof a?(e.text=a,a=this._searchQueries(e)):a="object"===typeof a&&a.hasOwnProperty("magicKey")?this._searchQueries(a):"object"===typeof a&&a.hasOwnProperty("geometry")?this._searchQueries({geometry:a}):
"object"===typeof a&&a.hasOwnProperty("_objectId")?this._searchQueries(a):"object"===typeof a&&"point"===a.type?this._searchQueries({point:a}):a instanceof Array&&2===a.length?this._searchQueries({latlon:a}):this._searchQueries(e):a=this._searchQueries(e);a.always(function(a){a=this._formatResults(a,b,d);c.resolve(a)}.bind(this));return c.promise},_viewReady:function(){var a=new p;this._viewReadyPromise&&this._viewReadyPromise.cancel();var c=this.view;c?this._viewReadyPromise=c.always(function(){a.resolve()}):
a.resolve();return a.promise},_suggestDeferred:function(a){var c=new p;this._deferredSuggestions.push(c);var d=this.activeSourceIndex;this._suggestQueries({text:a}).always(function(b){var e;if(b)for(var f=0;f<b.length;f++)b[f]&&(e=!0);e?(b=this._formatResults(b,d,a),c.resolve(b)):c.resolve()}.bind(this));return c.promise},_getDefaultSymbol:function(a){var c=z.resultSymbol,d,b,e=this.get("view.map.basemap.id");e||(e="topo");a&&(a.feature&&a.feature.geometry)&&(b=a.feature.geometry.type);if(b){if(a=
J.getSchemes({theme:"default",basemap:e,geometryType:b}))d=a.primaryScheme;d&&(d.color&&d.hasOwnProperty("opacity")&&(d.color.a=d.opacity),c=d,a=d.color,d=d.size,c="point"===b?new N({color:a,size:null!==d?d:c.size,outline:{color:c.outline.color,width:c.outline.width}}):"polyline"===b?new M({color:a,width:null!==d?d:c.width}):"polygon"===b?new L({color:a,outline:{color:c.outline.color,width:c.outline.width}}):void 0)}return c},_selectFirstResult:function(a,c){var d;this.autoSelect&&a&&(d=this._getFirstResult(a))&&
this.select(d)},_getSourceResults:function(a,c){return a&&a[c]&&a[c].results},_getSourceIndexOfResult:function(a){var c=this.results;if(c)for(var d=0;d<c.length;d++){var b=c[d].sourceIndex,e=this._getSourceResults(c,d);if(e)for(var f=0;f<e.length;f++)if(e[f]===a)return parseInt(b,10)}return null},_getFirstResult:function(a){if(a)for(var c=0;c<a.length;c++){var d=this._getSourceResults(a,c);if(d=d&&d[0])return d}return!1},_validField:function(a,c){return a.getField(c)},_validFields:function(a,c){return!a||
!c?!1:c.every(function(d){return this._validField(a,d)},this)},_getCodedName:function(a,c){if(a&&a.length)for(var d=0,b=a.length;d<b;d++){var e=a[d];if(e.code===c)return e.name}},_getCodedValue:function(a,c,d){if(a&&a.length)for(var b=0,e=a.length;b<e;b++){var f=a[b],h=f.name,l=c;d||(h=h.toLowerCase(),l=l.toLowerCase());if(h===l)return f.code}return!1},_whereClause:function(a,c,d,b){var e=null;if(a){var f="";S.test(c.url)&&this._containsNonLatinCharacter(a)&&(f="N");if(d&&d.length)for(var h=0,l=d.length;h<
l;h++){var k="",g=a.replace(/\'/g,"''"),k=d[h],m=c.getField(k),q=m.domain;q&&"codedValue"===q.type&&(g=this._getCodedValue(q.codedValues,g,b));!1!==g&&(m=m.type,"string"===m||"date"===m?k=b?k+" \x3d "+f+"'"+g+"'":"UPPER("+k+") LIKE "+f+"'%"+g.toUpperCase()+"%'":"oid"===m||"small-integer"===m||"integer"===m||"single"===m||"double"===m?(g=parseFloat(g),k=isNaN(g)?!1:k+" \x3d "+g):k=k+" \x3d "+g,k&&(e=e?e+" or ":"",e+=k))}}return e},_suggest:function(a){a||(a={index:this.activeSourceIndex,text:this.searchTerm});
var c=new p,d=a.index,b=this.sources.getItemAt(d),e=b.featureLayer,f=this.suggestionsEnabled;b.hasOwnProperty("suggestionsEnabled")&&(f=b.suggestionsEnabled);var h=0,l;a.hasOwnProperty("text")&&a.text&&(l=s.trim(a.text),h=a.text.length);a=b.minSuggestCharacters||this.minSuggestCharacters;if(f&&l&&h>=a){var k="";b.prefix&&(k+=b.prefix);k+=l;b.suffix&&(k+=b.suffix);var g=this._defaultSR,g=this.get("view.spatialReference"),f={};if(b.locator){b.categories&&(f.categories=b.categories);b.locator.outSpatialReference=
g;if(this.view&&(b.localSearchOptions&&b.localSearchOptions.hasOwnProperty("distance")&&b.localSearchOptions.hasOwnProperty("minScale"))&&(h=this.scale,!b.localSearchOptions.minScale||h&&h<=parseFloat(b.localSearchOptions.minScale)))f.location=this.view.extent.center,f.distance=b.localSearchOptions.distance;f.text=k;b.withinViewEnabled&&this.get("view.extent")&&(f.searchExtent=this.view.extent);b.searchExtent&&(f.searchExtent=b.searchExtent);f.maxSuggestions=b.maxSuggestions||this.maxSuggestions;
b.sourceCountry&&(f.countryCode=b.sourceCountry);b.countryCode&&(f.countryCode=b.countryCode);b.locator.suggestLocations(f).then(function(a){c.resolve(a)},function(a){a||(a=this._error("Locator suggestLocations could not be performed."));c.reject(a)}.bind(this))}else e?this._loadLayer(e).then(function(){if(this._supportsPagination(e)){var a=this._getDisplayField(b),f=b.searchFields||[a],h=[];b.suggestionTemplate?b.suggestionTemplate.replace(/(?:\{([^}]+)\})/g,function(a,b){h.push(b)}):h.push(a);-1===
P.indexOf(h,e.objectIdField)&&h.push(e.objectIdField);var a=this._validField(e,a),l=this._validFields(e,h),p=this._validFields(e,f);!a||!l||!p?c.reject(this._error("Invalid FeatureLayer field")):(a=e.createQuery(),b.hasOwnProperty("suggestQueryParams")&&s.mixin(a,b.suggestQueryParams),a.outSpatialReference=g,a.returnGeometry=!1,a.num=b.maxSuggestions||this.maxSuggestions,a.outFields=h,b.withinViewEnabled&&this.get("view.extent")&&(a.geometry=this.view.extent),b.searchExtent&&(a.geometry=b.searchExtent),
(f=this._whereClause(k,e,f,!1))?(a.where=f,e.queryFeatures(a).then(function(a){var b;(a=a.features)&&(b=this._hydrateResults(a,d,!0));c.resolve(b)}.bind(this),function(a){a||(a=this._error("FeatureLayer queryFeatures errored with suggestions"));c.reject(a)}.bind(this))):c.resolve())}else c.resolve()}.bind(this)):c.reject(this._error("Invalid source"))}else c.resolve();return c.promise},_loadLayer:function(a){var c=new p;a&&"not-loaded"===a.loadStatus?a.load().then(c.resolve,c.reject):c.resolve(a);
return c.promise},_supportsPagination:function(a){return a&&a.get("advancedQueryCapabilities.supportsPagination")},_suggestQueries:function(a){var c=this.sources,d=this.activeSourceIndex,b=[];if(-1===d)for(d=0;d<c.length;d++)a.index=d,b.push(this._suggest(a));else a.index=d,b.push(this._suggest(a));return A(b)},_searchQueries:function(a){a.hasOwnProperty("index")||(a.index=this.activeSourceIndex);var c=this.sources,d=[];if(-1===a.index)for(var b=0;b<c.length;b++)a.index=b,d.push(this._search(a));
else d.push(this._search(a));return A(d)},_getPointFromGeometry:function(a){if(a&&a.type){var c=a.type;return"point"===c?a:"extent"===c?a.center:"polygon"===c?a.centroid:"multipoint"===c?a.getPoint(0):"polyline"===c?a.getPoint(0,0):a.extent.center}},_search:function(a){a||(a={text:this.searchTerm,magicKey:null,geometry:null,point:null,index:this.activeSourceIndex,latlon:null});var c,d=new p,b=a.index,e=this.sources.getItemAt(b),f;a.hasOwnProperty("text")&&a.text&&(f=s.trim(a.text));if(e){var h=e.featureLayer,
l="";e.prefix&&!a.magicKey&&(l+=e.prefix);l+=f;e.suffix&&!a.magicKey&&(l+=e.suffix);var k=this._defaultSR,k=this.get("view.spatialReference");if(e.locator)if(a.hasOwnProperty("text")&&f){var g={};e.categories&&(g.categories=e.categories);k&&(e.locator.outSpatialReference=k);if(this.view&&e.localSearchOptions&&e.localSearchOptions.hasOwnProperty("distance")&&e.localSearchOptions.hasOwnProperty("minScale")){var m=this.scale;if(!e.localSearchOptions.minScale||m&&m<=parseFloat(e.localSearchOptions.minScale))g.location=
this.view.extent.center,g.distance=e.localSearchOptions.distance}g.address={};g.maxLocations=e.maxResults||this.maxResults;e.withinViewEnabled&&this.get("view.extent")&&(g.searchExtent=this.view.extent);e.searchExtent&&(g.searchExtent=e.searchExtent);e.sourceCountry&&(g.countryCode=e.sourceCountry);e.countryCode&&(g.countryCode=e.countryCode);a.magicKey&&(g.magicKey=a.magicKey);e.singleLineFieldName?g.address[e.singleLineFieldName]=l:g.address["Single Line Input"]=l;e.outFields&&(g.outFields=e.outFields);
e.locator.addressToLocations(g).then(function(a){a=this._hydrateResults(a,b,!1);d.resolve(a)}.bind(this),function(a){a||(a=this._error("Locator addressToLocations could not be performed"));d.reject(a)}.bind(this))}else a.geometry?(c=this._getPointFromGeometry(a.geometry.geometry))?this._reverseGeocodePoint(b,c).then(function(a){d.resolve(a)},function(a){d.reject(a)}):d.reject(this._error("Invalid point to reverse geocode")):a.point?this._reverseGeocodePoint(b,a.point).then(function(a){d.resolve(a)},
function(a){d.reject(a)}):a.latlon?(g=new x({longitude:a.latlon[0],latitude:a.latlon[1]}),this._reverseGeocodePoint(b,g).then(function(a){d.resolve(a)},function(a){d.reject(a)})):a.hasOwnProperty("text")&&!f?d.resolve([]):d.reject(this._error("Invalid query type for Locator"));else h?this._loadLayer(h).then(function(){var g=this._getDisplayField(e),n=e.searchFields||[g],g=this._validField(h,g),m=this._validFields(h,n);if(!g||!m)d.reject(this._error("Invalid FeatureLayer field"));else{g=h.createQuery();
e.hasOwnProperty("searchQueryParams")&&s.mixin(g,e.searchQueryParams);if(k&&(g.outSpatialReference=k,m=C.getUnitValueForSR(k)))g.maxAllowableOffset=m;g.returnGeometry=!0;e.outFields&&(g.outFields=e.outFields);var p;a.hasOwnProperty("_objectId")||(this._supportsPagination(h)&&(g.num=e.maxResults||this.maxResults),e.withinViewEnabled&&this.get("view.extent")&&(g.geometry=this.view.extent),e.searchExtent&&(g.geometry=e.searchExtent),p=e.exactMatch);a.hasOwnProperty("text")&&f?(n=this._whereClause(l,
h,n,p))?(g.where=n,n=!0):n=!1:a.hasOwnProperty("_objectId")?(g.objectIds=[a._objectId],n=!0):a.geometry?(g.geometry=a.geometry,n=!0):a.point?(g.geometry=a.point,n=!0):a.latlon?(c=new x({longitude:a.latlon[0],latitude:a.latlon[1]}),g.geometry=c,n=!0):(a.hasOwnProperty("text")&&!f?d.resolve([]):d.reject(this._error("Invalid query type for FeatureLayer")),n=!1);n?h.queryFeatures(g).then(function(a){a=a.features;var c;a&&(c=this._hydrateResults(a,b,!1));d.resolve(c)}.bind(this),function(a){a||(a=this._error("FeatureLayer queryFeatures could not be performed"));
d.reject(a)}.bind(this)):d.resolve()}}.bind(this)):d.reject(this._error("Invalid source"))}else d.reject(this._error("Source is undefined"));return d.promise},_isError:function(a){return a instanceof Error||a.hasOwnProperty("code")||a.hasOwnProperty("message")?!0:!1},_formatResults:function(a,c,d){d={activeSourceIndex:c,searchTerm:d,numResults:0,numErrors:0,errors:null,results:null};var b=this.sources,e=[],f=[],h;if(a)if(-1===c)for(c=0;c<a.length;c++)a[c]||(a[c]=[]),h=b.getItemAt(c),this._isError(a[c])&&
(a[c]=new u(a[c])),a[c]instanceof u?(e.push({sourceIndex:c,source:h,error:a[c]}),d.numErrors++):(f.push({sourceIndex:c,source:h,results:a[c]}),d.numResults+=a[c].length);else a[0]||(a[0]=[]),h=b.getItemAt(c),this._isError(a[0])&&(a[0]=new u(a[0])),a[0]instanceof u?(e.push({sourceIndex:c,source:h,error:a[0]}),d.numErrors++):(f.push({sourceIndex:c,source:h,results:a[0]}),d.numResults+=a[0].length);d.numErrors&&(d.errors=e);d.numResults&&(d.results=f);return d},_reverseGeocodePoint:function(a,c){var d=
new p,b=this.sources.getItemAt(a);if(c&&b){var e=b.locationToAddressDistance||this.locationToAddressDistance;b.locator.outSpatialReference=this._defaultSR;b.locator.outSpatialReference=this.get("view.spatialReference");b.locator.locationToAddress(c,e).then(function(b){b=this._hydrateResults([b],a,!1);d.resolve(b)}.bind(this),function(a){a||(a=this._error("Locator locationToAddress could not be performed"));d.reject(a)}.bind(this))}else d.reject(this._error("No point or source defined for reverse geocoding"));
return d.promise},_cancelDeferreds:function(){this._deferredSuggestions.forEach(function(a){a.cancel(this.declaredClass+" cancelling request")},this);this._deferredSuggestions.length=0},_getFeatureLayerName:function(a){var c=a.featureLayer;if(c){var d=c.title;(a.searchFields||[this._getDisplayField(a)]).forEach(function(a,e){d=0===e?d+": ":d+", ";var f=c.getField(a);d+=f&&f.alias||a});return d}},_getSourceName:function(a){return this._getName(a)||this._getFeatureLayerName(a)||r.untitledSource},_getName:function(a){return a&&
a.name},_getFirstStringField:function(a){if(a&&(a=a.fields)&&a.length)for(var c=0;c<a.length;c++){var d=a[c];if("string"===d.type)return d.name}return""},_getDisplayField:function(a){return a.displayField||a.featureLayer.displayField||this._getFirstStringField(a.featureLayer)},_validExtent:function(a){return a&&a.xmin&&"NaN"!==a.xmin&&a.ymin&&"NaN"!==a.ymin&&a.xmax&&"NaN"!==a.xmax&&a.ymax&&"NaN"!==a.ymax},_hydrateResult:function(a,c,d){var b={},e=this._defaultSR,f;c=this.sources.getItemAt(c);var h=
this.get("view.map"),e=this.get("view.spatialReference");if(a.hasOwnProperty("text")&&a.hasOwnProperty("magicKey"))return a;if(a instanceof y){if(b.feature=a.clone(),f=b.feature.geometry)f.spatialReference=e}else if(a.hasOwnProperty("location")){var l=new x({x:a.location.x,y:a.location.y,spatialReference:e});f={};a.hasOwnProperty("attributes")&&(f=a.attributes);a.hasOwnProperty("score")&&(f.score=a.score);b.feature=new y({geometry:l,attributes:f})}else b.feature=null;if(a.hasOwnProperty("extent")&&
this._validExtent(a.extent))b.extent=new B(a.extent),b.extent.spatialReference=e;else if(b.feature&&b.feature.geometry)switch(b.feature.geometry.type){case "extent":b.extent=b.feature.geometry;break;case "multipoint":b.extent=b.feature.geometry.extent;break;case "polygon":b.extent=b.feature.geometry.extent;break;case "polyline":b.extent=b.feature.geometry.extent;break;case "point":h?(e=this.zoomScale,c&&c.zoomScale&&(e=c.zoomScale),b.extent=this.scale>e?C.getExtentForScale(this.view,e).clone().centerAt(b.feature.geometry):
this.view.extent.clone().centerAt(b.feature.geometry)):b.extent=new B({xmin:b.feature.geometry.x-0.25,ymin:b.feature.geometry.y-0.25,xmax:b.feature.geometry.x+0.25,ymax:b.feature.geometry.y+0.25})}else b.extent=null;c.featureLayer?c.suggestionTemplate&&d?b.name=w.substitute(a.attributes,c.suggestionTemplate):c.searchTemplate?b.name=w.substitute(a.attributes,c.searchTemplate):(d=this._getDisplayField(c),c=c.featureLayer.getField(d).domain,d&&(a.hasOwnProperty("attributes")&&a.attributes.hasOwnProperty(d))&&
(a=a.attributes[d],b.name=c&&"codedValue"===c.type?this._getCodedName(c.codedValues,a):a)):a.address&&c.searchTemplate?b.name=w.substitute(a.address,c.searchTemplate):a.hasOwnProperty("name")?b.name=a.name:a.hasOwnProperty("attributes")&&"object"===typeof a.attributes&&a.attributes.Match_addr?(b.name=a.attributes.Match_addr,a.attributes.Addr_type&&("POI"===a.attributes.Addr_type&&a.attributes.StAddr&&a.attributes.City)&&(b.name+=" - "+a.attributes.StAddr+", "+a.attributes.City)):a.hasOwnProperty("address")&&
"string"===typeof a.address?b.name=a.address:a.hasOwnProperty("address")&&"object"===typeof a.address&&a.address.hasOwnProperty("Address")?b.name=a.address.Address:b.feature&&b.feature.geometry&&(b.name=b.feature.geometry.x+","+b.feature.geometry.y);b.name||(b.name=r.untitledResult);return b},_hydrateResults:function(a,c,d){var b=[],e=a&&a.length;if(e)for(var f=0;f<e;f++){var h=this._hydrateResult(a[f],c,d);b.push(h)}return b},_containsNonLatinCharacter:function(a){for(var c=0;c<a.length;c++)if(255<
a.charCodeAt(c))return!0;return!1},_setPlaceholder:function(a){var c="",d=this.sources.getItemAt(a);-1===a?c=this.allPlaceholder||r.allPlaceholder:d&&d.placeholder&&(c=d.placeholder);this.placeholder=c},_updateActiveSource:function(){var a=this.sources,c=this.activeSourceIndex;this.activeSource=a&&a.getItemAt(c)||null},_setDefaultActiveSourceIndex:function(){var a=this.sources;this.activeSourceIndex=a&&1===a.length||!this.searchAllEnabled?0:-1}});t.ALL_INDEX=-1;t.OBJECT_ID_FIELD="_objectId";return t});