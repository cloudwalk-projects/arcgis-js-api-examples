// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define(["../../core/Accessoire","../../core/declare","../../core/kebabDictionary","../../core/lang","../../geometry/support/graphicsUtils"],function(e,f,c,g,d){var h=c({esriNAUCentimeters:"centimeters",esriNAUDecimalDegrees:"decimal-degrees",esriNAUDecimeters:"decimeters",esriNAUFeet:"feet",esriNAUInches:"inches",esriNAUKilometers:"kilometers",esriNAUMeters:"meters",esriNAUMiles:"miles",esriNAUMillimeters:"millimeters",esriNAUNauticalMiles:"nautical-miles",esriNAUPoints:"points",esriNAUYards:"yards"}),
k=c({esriNAOutputLineNone:"none",esriNAOutputLineStraight:"straight",esriNAOutputLineTrueShape:"true-shape",esriNAOutputLineTrueShapeWithMeasure:"true-shape-with-measure"}),l=c({esriCentimeters:"centimeters",esriDecimalDegrees:"decimal-degrees",esriDecimeters:"decimeters",esriFeet:"feet",esriInches:"inches",esriKilometers:"kilometers",esriMeters:"meters",esriMiles:"miles",esriMillimeters:"millimeters",esriNauticalMiles:"nautical-miles",esriPoints:"points",esriYards:"yards"}),m=c({esriNFSBAllowBacktrack:"allow-backtrack",
esriNFSBAtDeadEndsOnly:"at-dead-ends-only",esriNFSBNoBacktrack:"no-backtrack",esriNFSBAtDeadEndsAndIntersections:"at-dead-ends-and-intersections"});return f(e,{declaredClass:"esri.tasks.support.RouteParameters",accumulateAttributes:null,attributeParameterValues:null,barriers:null,directionsLanguage:null,directionsLengthUnits:null,directionsOutputType:null,directionsStyleName:null,directionsTimeAttribute:null,doNotLocateOnRestrictedElements:!0,findBestSequence:null,ignoreInvalidLocations:null,impedanceAttribute:null,
outputLines:"true-shape",outputGeometryPrecision:null,outputGeometryPrecisionUnits:null,outSpatialReference:null,polygonBarriers:null,polylineBarriers:null,preserveFirstStop:null,preserveLastStop:null,restrictionAttributes:null,restrictUTurns:null,returnBarriers:!1,returnDirections:!1,returnPolygonBarriers:!1,returnPolylineBarriers:!1,returnRoutes:!0,returnStops:!1,returnZ:!0,startTime:null,startTimeIsUTC:null,stops:null,useHierarchy:null,useTimeWindows:null,travelMode:null,toJSON:function(c){var a=
{returnDirections:this.returnDirections,returnRoutes:this.returnRoutes,returnZ:this.returnZ,returnStops:this.returnStops,returnBarriers:this.returnBarriers,returnPolygonBarriers:this.returnPolygonBarriers,returnPolylineBarriers:this.returnPolylineBarriers,attributeParameterValues:this.attributeParameterValues&&JSON.stringify(this.attributeParameterValues),outSR:this.outSpatialReference?this.outSpatialReference.wkid||JSON.stringify(this.outSpatialReference.toJSON()):null,outputLines:k.toJSON(this.outputLines),
findBestSequence:this.findBestSequence,preserveFirstStop:this.preserveFirstStop,preserveLastStop:this.preserveLastStop,useTimeWindows:this.useTimeWindows,startTime:this.startTime?this.startTime.getTime():null,startTimeIsUTC:this.startTimeIsUTC,accumulateAttributeNames:this.accumulateAttributes?this.accumulateAttributes.join(","):null,ignoreInvalidLocations:this.ignoreInvalidLocations,impedanceAttributeName:this.impedanceAttribute,restrictionAttributeNames:this.restrictionAttributes?this.restrictionAttributes.join(","):
null,restrictUTurns:m.toJSON(this.restrictUTurns),useHierarchy:this.useHierarchy,directionsLanguage:this.directionsLanguage,outputGeometryPrecision:this.outputGeometryPrecision,outputGeometryPrecisionUnits:l.toJSON(this.outputGeometryPrecisionUnits),directionsLengthUnits:h.toJSON(this.directionsLengthUnits),directionsTimeAttributeName:this.directionsTimeAttribute,directionsStyleName:this.directionsStyleName,travelMode:this.travelMode},b=this.stops;"esri.tasks.support.FeatureSet"===b.declaredClass&&
0<b.features.length?a.stops=JSON.stringify({type:"features",features:d._encodeGraphics(b.features,c&&c["stops.features"]),doNotLocateOnRestrictedElements:this.doNotLocateOnRestrictedElements}):"esri.tasks.support.DataLayer"===b.declaredClass?a.stops=b:"esri.tasks.support.DataFile"===b.declaredClass&&(a.stops=JSON.stringify({type:"features",url:b.url,doNotLocateOnRestrictedElements:this.doNotLocateOnRestrictedElements}));if(this.directionsOutputType)switch(this.directionsOutputType.toLowerCase()){case "complete":a.directionsOutputType=
"esriDOTComplete";break;case "complete-no-events":a.directionsOutputType="esriDOTCompleteNoEvents";break;case "instructions-only":a.directionsOutputType="esriDOTInstructionsOnly";break;case "standard":a.directionsOutputType="esriDOTStandard";break;case "summary-only":a.directionsOutputType="esriDOTSummaryOnly";break;default:a.directionsOutputType=this.directionsOutputType}b=function(a,b){return!a?null:"esri.tasks.support.FeatureSet"===a.declaredClass?0<a.features.length?JSON.stringify({type:"features",
features:d._encodeGraphics(a.features,c&&c[b])}):null:"esri.tasks.support.DataLayer"===a.declaredClass?a:"esri.tasks.support.DataFile"===a.declaredClass?JSON.stringify({type:"features",url:a.url}):JSON.stringify(a)};this.barriers&&(a.barriers=b(this.barriers,"barriers.features"));this.polygonBarriers&&(a.polygonBarriers=b(this.polygonBarriers,"polygonBarriers.features"));this.polylineBarriers&&(a.polylineBarriers=b(this.polylineBarriers,"polylineBarriers.features"));return g.filter(a,function(a){if(null!==
a)return!0})}})});