// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define("../../config ../../core/Accessor ../../core/Evented ../../core/promiseUtils ../../core/colorUtils ../../core/watchUtils dojo/_base/lang dojo/Deferred require dojo/store/Memory dojo/_base/array ../../layers/support/RasterFunction ../../geometry/Point dojo/i18n!./nls/RasterSymbologyEditor".split(" "),function(v,r,s,w,l,x,n,t,y,z,h,k,A,u){return r.createSubclass([s],{properties:{layer:{},layerView:{},stretchTypes:{}},bandComboPresets:[{bandDefinitionKeyword:"LandsatTM",presets:[{NaturalColor:[3,
2,1]},{ColorInfrared:[4,3,2]},{Landuse:[4,3,1]},{LandWater:[7,5,4]},{Vegetation:[5,4,3]}]},{bandDefinitionKeyword:"Landsat 8",presets:[{NaturalColor:[4,3,2]},{ColorInfrared:[5,4,3]},{Landuse:[5,4,2]},{LandWater:[7,6,5]},{Vegetation:[6,5,4]},{ShallowBathymetric:[3,2,1]}]},{bandDefinitionKeyword:"IKONOS",presets:[{NaturalColor:[3,2,1]},{ColorInfrared:[4,3,2]},{Landuse:[4,3,1]}]},{bandDefinitionKeyword:"QuickBird",presets:[{NaturalColor:[3,2,1]},{ColorInfrared:[4,3,2]},{Landuse:[4,3,1]}]},{bandDefinitionKeyword:"Pleiades",
presets:[{NaturalColor:[1,2,3]},{ColorInfrared:[4,1,2]},{Landuse:[4,1,3]}]},{bandDefinitionKeyword:"GeoEye",presets:[{NaturalColor:[3,2,1]},{ColorInfrared:[4,3,2]},{Landuse:[4,3,1]}]},{bandDefinitionKeyword:"OrbView",presets:[{NaturalColor:[3,2,1]},{ColorInfrared:[4,3,2]},{Landuse:[4,3,1]}]},{bandDefinitionKeyword:"LandsatMSS",presets:[{ColorInfrared:[4,3,2]}]},{bandDefinitionKeyword:"SPOT6",presets:[{NaturalColor:[1,2,3]},{ColorInfrared:[4,1,2]},{Landuse:[4,1,3]}]},{bandDefinitionKeyword:"FORMOSTAT",
presets:[{NaturalColor:[1,2,3]},{ColorInfrared:[4,1,2]},{Landuse:[4,1,3]}]},{bandDefinitionKeyword:"SPOT1",presets:[{ColorInfrared:[1,2,3]},{Vegetation:[2,3,4]}]},{bandDefinitionKeyword:"WorldView",presets:[{NaturalColor:[5,3,2]},{ColorInfrared:[7,5,3]},{Landuse:[7,5,2]},{LandWater:[8,7,6]},{Vegetation:[7,6,5]},{ShallowBathymetric:[3,2,1]}]},{bandDefinitionKeyword:"RapidEye",presets:[{NaturalColor:[3,2,1]},{ColorInfrared:[5,3,2]},{Landuse:[5,3,1]},{Vegetation:[5,4,3]}]},{bandDefinitionKeyword:"DMCii",
presets:[{ColorInfrared:[1,2,3]}]}],_cachedKeyProperties:[],stretchTypes:[{name:"none",filterType:0,id:1},{name:"minMax",filterType:5,id:2},{name:"percentClip",filterType:6,id:3},{name:"standardDeviation",filterType:3,id:4}],declaredClass:"esri.widgets.RasterSymbologyEditor.RasterSymbologyEditorViewModel",constructor:function(a){n.mixin(this,a)},getSymbologyTypes:function(){var a=["none","stretch"];3<=this.layer.bandCount&&a.push("rgb");("esriImageServiceDataTypeVector-UV"===this.layer.serviceDataType||
"esriImageServiceDataTypeVector-MagDir"===this.layer.serviceDataType)&&a.push("vectorField");this.layer.hasRasterAttributeTable&&1===this.layer.bandCount&&a.push("uniqueValue");return a},isStretchColorRampApplicable:function(a){if(0!==a||this.layer.pixelType&&"u8"===this.layer.pixelType.toLowerCase())return!0},_validateRRule:function(){},_getDefaultSymbologyType:function(){if(!this.layer||!this.layer.renderingRule||!this.layer.renderingRule.functionName)return"none";var a=this.layer.renderingRule,
b=a.functionName,a=a.functionArguments;return"extractband"===b.toLowerCase()||"stretch"===b.toLowerCase()&&this.layer.bandCount&&1===this.layer.bandCount||"colormap"===b.toLowerCase()&&a&&a.colorRamp&&this.layer.bandCount&&1===this.layer.bandCount?"stretch":3<=this.layer.bandCount&&"stretch"===b.toLowerCase()?"rgb":"none"},_getRenderingRuleArguments:function(a){if(this.layer&&this.layer.renderingRule&&a){var b=this.layer.renderingRule;return b.functionName&&b.functionName.toLowerCase()===a?b.functionArguments:
b.functionArguments&&b.functionArguments.Raster&&b.functionArguments.Raster.functionName&&b.functionArguments.Raster.functionName===a?b.functionArguments.Raster.functionArguments:null}},getDefaultRenderParameters:function(){var a={},b=this.layer;if(this.layer){var c=this._getRenderingRuleArguments("stretch")||{},d=this._getRenderingRuleArguments("colormap")||{},e={},f;a.symbologyType=this._getDefaultSymbologyType();a.stretchType=c.stretchType||(this.layer.pixelType&&"u8"!==this.layer.pixelType.toLowerCase()?
2:1);a.minPercent=c.MinPercent||2;a.maxPercent=c.MaxPercent||2;a.numberOfStandardDeviations=c.NumberOfStandardDeviations||2;a.gamma=c.Gamma||1.1;a.dra=c.DRA||!0;a.colorRamp=d.colorRamp||"none";b.bandIds&&(a.bandIds=b.bandIds);b.hasRasterAttributeTable&&(b.rasterAttributeTable&&b.rasterAttributeTable.features&&b.rasterAttributeTable.features.length&&b.rasterAttributeTable.features[0].attributes.Red&&b.rasterAttributeTable.features[0].attributes.Green&&b.rasterAttributeTable.features[0].attributes.Blue)&&
(e.id="uniqueValueColorRamp_default",e.type="multipart",e.colorRamps=[],h.forEach(b.rasterAttributeTable.features,function(a){f=a.attributes;e.colorRamps.push({fromColor:[f.Red,f.Green,f.Blue],toColor:[f.Red,f.Green,f.Blue]})}),a.uniqueValuesColorRamp=e,a.uniqueValuesField=b.rasterAttributeTable.features[0].attributes.Value?"Value":null);a.selectedBand=0;return a}},getUniqueValueFields:function(){if(this.layer.hasRasterAttributeTable&&this.layer.rasterAttributeTable&&this.layer.rasterAttributeTable.fields&&
this.layer.rasterAttributeTable.fields.length){var a=[];h.forEach(this.layer.rasterAttributeTable.fields,function(b){"esriFieldTypeOID"!==b.type&&a.push(b)},this);return a}},layer:null,destroy:function(){},_emitError:function(a){this.emit("rendering-rule-error",{error:a})},getBandData:function(){if(this.layer){var a=new t,b=this.layer.bandCount,c,d,e=this.layer.id;!this._cachedKeyProperties[e]&&1<b?this.layer.fetchKeyProperties().then(n.hitch(this,function(b){this._cachedKeyProperties[e]=b;c=this._createBandLists();
d=this._getBandCombinationPresets();a.resolve({presets:d,lists:c})})):(c=this._createBandLists(),d=this._getBandCombinationPresets(),a.resolve({lists:c,presets:d}));return a}},_getBandCombinationPresets:function(){var a=this._cachedKeyProperties[this.layer.id];if(a){var b;h.some(this.bandComboPresets,function(c){if(c.bandDefinitionKeyword===a.BandDefinitionKeyword)return b=c.presets,!0});if(b)return b}},_validateProps:function(a){if(null===a.stretchType||void 0===a.stretchType||6===a.stretchType&&
(isNaN(a.minPercent)||isNaN(a.maxPercent))||3===a.stretchType&&isNaN(a.numberOfStandardDeviations))return!1;if(!a.noData||isNaN(a.noData))a.noData=0;this.props=a;return!0},_clearRendering:function(){this.layer.bandIds=null;this.layer.noData=null;this.layer.renderingRule=null},_applyStretchSingleBand:function(a){if(this._validateProps(a)){this.layer.noData=a.noData;this.layer.bandIds=null;var b=this._getStretchRasterFunctionArguments(a,1);if(1<this.layer.bandCount){var c={BandIDs:[a.selectedBand]},
d=new k;d.functionArguments=c;d.functionName="ExtractBand";b.Raster=d}c=new k;c.functionName="Stretch";c.functionArguments=b;a.colorRampName&&"none"!==a.colorRampName?(b=new k,b.functionName="Colormap",b.functionArguments={colorRamp:a.colorRampName,Raster:c},this.layer.renderingRule=b):this.layer.renderingRule=c}},_applyStretchRgb:function(a){if(this._validateProps(a)){this.layer.noData=a.noData;this.layer.bandIds=a.bandIds;a=this._getStretchRasterFunctionArguments(a,3);var b=new k;b.functionName=
"Stretch";b.functionArguments=a;this.layer.renderingRule=b}},_getStretchRasterFunctionArguments:function(a,b){var c={DRA:a.dra,StretchType:a.stretchType,useGamma:!0};0!==a.stretchType&&(c.MinPercent=a.minPercent,c.MaxPercent=a.maxPercent,1===b?c.Gamma=[a.gamma]:3===b&&(c.Gamma=[a.gamma,a.gamma,a.gamma]),c.NumberOfStandardDeviations=a.numberOfStandardDeviations);return c},_applyUniqueValueColormap:function(a){var b=new k;b.functionName="Colormap";b.functionArguments={};b.functionArguments.Colormap=
this._getColormap(a.uniqueValuesSymbolData);b.variableName="Raster";this.layer.noData=a.noData;this.layer.renderingRule=b},getUniqueValueGridData:function(a,b){if(this.layer.hasRasterAttributeTable&&this.layer.rasterAttributeTable&&a&&b){var c=a.colorRamps?a.colorRamps.length:1,d=Array(c),e=0,f,p,g,m,q,k=[],l=this._sortFeatures(this.layer.rasterAttributeTable.features,b);h.forEach(d,function(a,b){d[b]={};d[b].start=e;d[b].end=e+1/c;e=d[b].end});h.forEach(l,function(b,c){m=(c+0.5)/l.length;h.forEach(d,
function(c,e){m>=c.start&&m<c.end&&(q=(m-c.start)/(c.end-c.start),1<d.length?(f=a.colorRamps[e].fromColor,p=a.colorRamps[e].toColor):(f=a.fromColor,p=a.toColor),g=this._interpolateLab(f,p,q),k.push({esriRasterSymbologyEditorUniqueValueSymbol:this._validateRgbLimits(g),esriRasterSymbologyEditorUniqueValueValue:b.value,pixelValues:b.pixelValues,id:e+1}))},this)},this);return k}},_sortFeatures:function(a,b){if(a&&b){a=n.clone(a);var c=[];a.sort(function(a,c){return"string"===typeof a.attributes[b]?a.attributes[b]<
c.attributes[b]?-1:1:a.attributes[b]-c.attributes[b]});h.forEach(a,function(d,e){0<e&&d.attributes[b]===a[e-1].attributes[b]?c[c.length-1].pixelValues.push(d.attributes.Value):c.push({value:d.attributes[b],pixelValues:[d.attributes.Value]})});return c}},_getColormap:function(a){var b=[];h.forEach(a,function(a){h.forEach(a.pixelValues,function(d){b.push([d,a.esriRasterSymbologyEditorUniqueValueSymbol.r,a.esriRasterSymbologyEditorUniqueValueSymbol.g,a.esriRasterSymbologyEditorUniqueValueSymbol.b])})});
return b},updateRendering:function(a){a.symbologyType&&("none"===a.symbologyType?this._clearRendering():"stretch"===a.symbologyType?this._applyStretchSingleBand(a):"rgb"===a.symbologyType?this._applyStretchRgb(a):"uniqueValue"===a.symbologyType&&this._applyUniqueValueColormap(a))},_createBandLists:function(){if(this.layer){var a=this.layer.id,b=this.layer.bandCount,c=this._cachedKeyProperties[a],d,e=this.layer.bandIds||[0,1,2],f=[],k=["red","green","blue"],g;c&&(c.BandProperties&&0<c.BandProperties.length)&&
(d=c.BandProperties);h.forEach(e,function(a,c){3===a&&(g=!0);d&&d[0].hasOwnProperty("BandName")?f.push(this._getBandIdList(b,d,this._getBandIndex(d,k[c]),g)):f.push(this._getBandIdList(b,d,a,g))},this);this._cachedKeyProperties[a]=c;return f}},_getBandIndex:function(a,b){if(!this.layer||!a)return 0;var c;for(c=0;c<a.length;c++)if(a[c]&&a[c].hasOwnProperty("BandName")&&a[c].BandName.toLowerCase()===b)return c;return 0},_getBandIdList:function(a,b,c,d){if(this.layer){var e=[],f={},h=!1;b&&a===b.length&&
(h=!0);d&&(f.selected=!0,f.name="None",f.index=100,e.push(f));var g;for(g=0;g<a;g++){var k=g,l=g,k=h&&b[g]&&b[g].BandName?b[g].BandName:u.bandPrefix+"_"+(g+1),f={};c===g&&!d&&(f.selected=!0);f.name=k+"";f.index=l;e.push(f)}return e}},_interpolateLab:function(a,b,c){a={r:a[0],g:a[1],b:a[2]};b={r:b[0],g:b[1],b:b[2]};a=l.toLAB(a);b=l.toLAB(b);return l.toRGB({l:a.l*(1-c)+c*b.l,a:a.a*(1-c)+c*b.a,b:a.b*(1-c)+c*b.b})},_validateRgbLimits:function(a){var b=[a.r,a.g,a.b];h.forEach(b,function(a,d){0>b[d]?b[d]=
0:255<b[d]&&(b[d]=255);b[d]=Math.floor(b[d])});return{r:b[0],g:b[1],b:b[2]}}})});