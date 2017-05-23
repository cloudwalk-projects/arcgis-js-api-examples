define([
  "cw/clusterLayer/clusterLayer",
  "dojo/_base/array",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/SimpleFillSymbol",
  "esri/symbols/PictureMarkerSymbol",
  "esri/renderers/ClassBreaksRenderer",
  "esri/geometry/Point",
  "esri/geometry/Extent",
  "esri/Color",
  "esri/dijit/PopupTemplate",
  "esri/layers/GraphicsLayer"
], function (
  ClusterLayer,
  array,
  SimpleMarkerSymbol, SimpleFillSymbol, PictureMarkerSymbol, ClassBreaksRenderer,
  Point,Extent, Color, PopupTemplate, GraphicsLayer
) {
  var clusterLayer,map;

  function cleanUp() {
    map.infoWindow.hide();
    clusterLayer.clearSingles();
  }
  function error(err) {
    console.log("something failed: ", err);
  }

  var self ={
    addClusters: function(options) {
      var resp = options.resp;
      map = options.map;
      var photoInfo = {};

      photoInfo.data = array.map(resp, function(p) {
        var latlng = new  Point(parseFloat(p.geometry.x), parseFloat(p.geometry.y));

        var attributes = {
          "Caption": p.attributes.NAME,
          "Name": p.attributes.NAME,
          "Image": p.image,
          "Link": p.link
        };
        return {
          "x": latlng.x,
          "y": latlng.y,
          "attributes": attributes
        };
      });

      var popupTemplate = new PopupTemplate({
        "title": "",
        "fieldInfos": [{
          "fieldName": "Caption",
          visible: true
        }, {
          "fieldName": "Name",
          "label": "By",
          visible: true
        }, {
          "fieldName": "Link",
          "label": "On Instagram",
          visible: true
        }]
      });

      clusterLayer = new ClusterLayer({
        "data": photoInfo.data,
        "distance": 100,
        "id": "clusters",
        "labelColor": "#fff",
        "labelOffset": 10,
        "resolution": map.extent.getWidth() / map.width,
        "singleColor": "#888"
        //"singleTemplate": popupTemplate
      });
      var defaultSym = new SimpleMarkerSymbol().setSize(4);
      var renderer = new ClassBreaksRenderer(defaultSym, "clusterCount");
      var picBaseUrl = "https://static.arcgis.com/images/Symbols/Shapes/";
      var blue = new PictureMarkerSymbol(picBaseUrl + "BluePin1LargeB.png", 32, 32).setOffset(0, 15);
      var green = new PictureMarkerSymbol(picBaseUrl + "GreenPin1LargeB.png", 64, 64).setOffset(0, 15);
      var red = new PictureMarkerSymbol(picBaseUrl + "RedPin1LargeB.png", 72, 72).setOffset(0, 15);
      renderer.addBreak(0, 5, blue);
      renderer.addBreak(6, 20, green);
      renderer.addBreak(21, 100, red);
      clusterLayer.setRenderer(renderer);
      map.addLayer(clusterLayer);
      map.on("click", cleanUp);
      map.on("key-down", function(e) {
        if (e.keyCode === 27) {
          cleanUp();
        }
      });

    },

    showExtent: function(options) {
      var map = options.map;
      var clusterLayer = options.clusterLayer;
      var extents = map.getLayer("clusterExtents");
      if ( extents ) {
        map.removeLayer(extents);
      }
      extents = new GraphicsLayer({ id: "clusterExtents" });
      var sym = new SimpleFillSymbol().setColor(new Color([205, 193, 197, 0.5]));
      array.forEach(clusterLayer._clusters, function(c, idx) {
        var e = c.attributes.extent;
        extents.add(new Graphic(new Extent(e[0], e[1], e[2], e[3], map.spatialReference), sym));
      }, this);
      map.addLayer(extents, 0);
    }
  }
  return self;

});
