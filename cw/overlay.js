/**
 * 覆盖物操作类
 */
define(["cw/config",
    "cw/util",
    "esri/graphic",
    "esri/geometry/Point",
    "esri/layers/FeatureLayer",
    "esri/symbols/PictureMarkerSymbol",
	"esri/Color",
    "esri/toolbars/draw",
    "esri/toolbars/edit",
    "esri/symbols/SimpleFillSymbol",
    "dojo/_base/array",
    "dojo/_base/event",
	"dojo/parser",
	"dojo/dom-style",
	"dojo/dom-construct",
	"dojo/query",
	"dojo/dom",
    "dojox/widget/ColorPicker",
	"dijit/Menu","dijit/MenuItem", "dijit/MenuSeparator",
	"xstyle/css!./css/ColorPicker.css"
	
], function (
    config,
    util,
    Graphic,
    Point,
    FeatureLayer,
    PictureMarkerSymbol,
	Color,
    Draw,
    Edit,
    SimpleFillSymbol,
    array,
    event,
	parser,
	domStyle,
	domConstruct,
	query,
	dom,
    ColorPicker,
	Menu,MenuItem,MenuSeparator
    ) {

        // 默认设置
        var defaults = {
            layerId: 'map-polygon-layer',
            layerAddr: '',
            layerIndex: 10,
            cameraName: '',
            cameraStatus: 'unkown',
            symbol: {
                defaultName: 'camera-unkown',
                yoffset: 10
            },
            editEnabled : 0
        };

        var draw = null;

        // 由于 layer-add-result 事件会执行多次，所以设置标识符号只加载一次
        var initialized = false;
        
        var drawToolbar;
        var editToolbar;
        var colorPicker;
		var editingEnabled = false;
		var polygonEditEnabled = null;
		var	polygonEditUnabled = null;
		var ctxMenuForMap;
		var ctxMenuForGraphics;
        
        // 根据ID查找覆盖物
        function findOverlay(overlays,id) {
        	var res;
        	array.forEach(overlays,function(node,index){
                    		if(node.id == id){
                    			res = node;
                    		}
                   });
            return res;
        };
		
		// 根据ID查找Graphic
        function findGraphic(graphic,id) {
        	var res;
        	array.forEach(graphic,function(node,index){
                    		if(node.attributes.ID == id){
                    			res = node;
                    		}
                   });
            return res;
        };
         
		// 覆盖物开启编辑状态
		function polygonEditEnable(evt) {
                        event.stop(evt);
                        if (editingEnabled === false) {
                            editingEnabled = true;
                            editToolbar.activate(Edit.EDIT_VERTICES, evt.graphic);
                        } else {
                            editToolbar.deactivate();
                            editingEnabled = false;
                        }
			}
			
		// 覆盖物关闭编辑状态
		function polygonEditUnable(evt) {
                        event.stop(evt);
                        if (editingEnabled == true) {  
                            //layer.applyEdits(null, null, [evt.graphic]);
							editToolbar.deactivate();
							ColorPickerOff();
                            editingEnabled = false;
                        }
			}

            // 初始化右键菜单
            function InitCtxMenu(layer,map) {
				ctxMenuForMap = new Menu({});
                ctxMenuForMap.addChild(new MenuItem({
                    label: "新建",
                    onClick: function () {
                        drawToolbar.activate(Draw.POLYGON);
                    }
                }));
				
                ctxMenuForGraphics = new Menu({});
                ctxMenuForGraphics.addChild(new MenuItem({
                    label: "编辑",
                    onClick: function () {
                        if (selected.geometry.type !== "point") {
							editingEnabled = true;
                            editToolbar.activate(Edit.EDIT_VERTICES, selected);
                        } else {
                            alert("Not implemented");
                        }
                    }
                }));
                ctxMenuForGraphics.addChild(new MenuItem({
                    label: "移动",
                    onClick: function () {
						editingEnabled = true;
                        editToolbar.activate(Edit.MOVE, selected);
                    }
                }));
                ctxMenuForGraphics.addChild(new MenuItem({
                    label: "旋转/缩放",
                    onClick: function () {
                        if (selected.geometry.type !== "point") {
							editingEnabled = true;
                            editToolbar.activate(Edit.ROTATE | Edit.SCALE, selected);
                        } else {
                            alert("Not implemented");
                        }
                    }
                }));
                ctxMenuForGraphics.addChild(new MenuItem({
                    label: "颜色",
                    onClick: function () {
						editingEnabled = true;
                        ColorPickerOn(selected);
                    }
                }));
                ctxMenuForGraphics.addChild(new MenuSeparator());
                ctxMenuForGraphics.addChild(new MenuItem({
                    label: "保存",
                    onClick: function () {
						editingEnabled = false;
                        editToolbar.deactivate();
                        ColorPickerOff();
                        layer.applyEdits(null, [selected], null);
                    }
                }));
                ctxMenuForGraphics.addChild(new MenuItem({
                    label: "删除",
                    onClick: function () {
						editingEnabled = false;
                        editToolbar.deactivate();
                        ColorPickerOff();
                        layer.applyEdits(null, null, [selected]);
                    }
                }));
				
                ctxMenuForGraphics.startup();
				ctxMenuForMap.startup();
				
				//ctxMenuForMap.bindDomNode(map.container);
                //layer.on("mouse-over", function(evt) {
                    //selected = evt.graphic;
                    //ctxMenuForGraphics.bindDomNode(evt.graphic.getDojoShape().getNode());
                //});
                //layer.on("mouse-out", function(evt) {
                    //ctxMenuForGraphics.unBindDomNode(evt.graphic.getDojoShape().getNode());
                //});
            }
           
		// 开启右键菜单
		function ctxmenuEnable(layer,map){
			if(typeof(ctxMenuForMap) != "undefined"){
				ctxMenuForMap.bindDomNode(map.container);
			}
			if(typeof(ctxMenuForGraphics) != "undefined"){
				layer.on("mouse-over", function(evt) {
                    selected = evt.graphic;
                    ctxMenuForGraphics.bindDomNode(evt.graphic.getDojoShape().getNode());
                });

                layer.on("mouse-out", function(evt) {
                    ctxMenuForGraphics.unBindDomNode(evt.graphic.getDojoShape().getNode());
                });
			}
		}
		
		// 关闭右键菜单
		function ctxmenuUnable(layer,map){
			if(typeof(ctxMenuForMap) != "undefined"){
				ctxMenuForMap.unBindDomNode(map.container);
			}
			if(typeof(ctxMenuForGraphics) != "undefined"){
				layer.on("mouse-over", function(evt) {
                    selected = evt.graphic;
                    ctxMenuForGraphics.unBindDomNode(evt.graphic.getDojoShape().getNode());
                });

                layer.on("mouse-out", function(evt) {
                    ctxMenuForGraphics.unBindDomNode(evt.graphic.getDojoShape().getNode());
                });
			}
		}
			
            // 开启调色板
            function ColorPickerOn(graphic) {
                if(typeof(colorPicker)=='undefined') {
                    var initColor = "#ce641d";
                    colorPicker = new ColorPicker({}, "cPicker");
                    colorPicker.setColor(initColor);
                    domStyle.set(colorPicker, "left", "500px");
                }
                
                dojo.query(".dojoxColorPicker").style("display", "block");
                colorPicker_change = colorPicker.on("change", function () {
                    var R = this.Rval.value;
                    var G = this.Gval.value;
                    var B = this.Bval.value;
                    var newSymbol = new SimpleFillSymbol();
                    newSymbol.setColor(new Color([R, G, B, 0.2]));
                    graphic.setSymbol(newSymbol) ;
					graphic.attributes.PATHCOLOR=this.value;
                });
            }
            // 关闭调色板
            function ColorPickerOff(){
                dojo.query(".dojoxColorPicker").style("display", "none");
                if(typeof(colorPicker_change)!='undefined') {
                    colorPicker_change.remove();
                }
            }
			
        var self = {
			 map,
            /**
             * 初始化覆盖物要素层
             */
            initLayer: function (options) {
                map = options.map;
                var overlay = options.overlay;
				defaults.editEnabled = options.editEnable;

				drawToolbar = new Draw(map);
				editToolbar = new Edit(map);
                
                var layer = map.getLayer(defaults.layerId);

                if (layer == null || typeof(layer) == "undefined") {
                    layer = new FeatureLayer(config.featureServers.polygonServer, {
                    mode: FeatureLayer.MODE_SNAPSHOT,
                    outFields: ["*"],
                    id: defaults.layerId
                });

                    map.on("layer-add-result", function (results) {
                        if (!initialized && results.layer.id == defaults.layerId) {
                            initialized = true;
                            console.log('init polygons:layer-add-result');
                            self.initPolygons({ layer: layer, overlay: overlay });
                        }
                    });

                    map.addLayer(layer, defaults.layerIndex);
                }
                else {
                    console.log('init cameras:initialized');
                    self.initPolygons({ layer: layer, overlay: overlay });
                }

                return layer;
            },

            /**
             * 初始化覆盖物
             */
            initPolygons: function (options) {
                var layer = options.layer;
                var overlays = options.overlay;

                layer.on("update-end", function () {
                    //初始化效果渲染
                    array.forEach(layer.graphics, function (node, index) {
                    	var overlay = findOverlay(overlays,node.attributes.ID);
                    	
						if(typeof(overlay) != "undefined"){
							// 显示控制
							if(overlay.visible == 1){
								node.hide();
							}
							// 业务数据
							node.attributes.NAME = overlay.name;
							node.attributes.LOCATION = overlay.location;
							
						}
						else{
							node.hide();
						}
                    	// 样式
                        array.forEach(layer.graphics, function (node, index) {
                        if (typeof(node.symbol) == "undefined") {
                            var newSymbol = new SimpleFillSymbol();
                            var newColor=new Color(node.attributes.PATHCOLOR);
                            newColor.a=0.5;
                            newSymbol.setColor(newColor);
                            node.setSymbol(newSymbol) ;
                        }
                        
                    });
                    layer.redraw();
					});
				});
				
				if(dom.byId("cPicker") == null)
					{
						//初始化调色板
						var n = domConstruct.create("div", { id: "cPicker",class: "dojoxColorPicker" },document.body);
					}
					
					// 初始化编辑失效事件
					editToolbar.on("deactivate", function (evt) {
						if(typeof(evt.graphic.attributes) != "undefined")
						{
							layer.applyEdits(null, [evt.graphic], null);
						}
					});
					// 初始化画图完成事件
					if(typeof(drawToolbar.onDrawEnd.target) == "undefined"){
						drawToolbar.on("draw-end", function (evt) {
						
							drawToolbar.deactivate();
							editToolbar.deactivate();

							//获取要素个数
							var currentGraphciNo = layer.graphics.length;
							//获取最后一个要素的OBJECTID，并转为数值类型
							var currentObj;
							if(typeof(layer.graphics[currentGraphciNo - 1])!="undefined")
							{
								currentObj = Number(layer.graphics[currentGraphciNo - 1].attributes['OBJECTID']);
							}

							//设置新增Graphic的属性，OBJECTID必须设置，其余可以设为NULL
							var attr = {
                            "OBJECTID": currentObj + 1
							};
							//产生新的Graphic
							var newGraphic = new Graphic(evt.geometry, null, attr);
							layer.applyEdits([newGraphic], null, null);
							
						});
						
						InitCtxMenu(layer,map);
						
						// 设置编辑状态
						if(defaults.editEnabled == 0)
						{
							ctxmenuEnable(layer,map);
						}
						else{
							ctxmenuUnable(layer,map);
						}
					}
			},
			
			// 编辑覆盖物
			edit: function (options) {
				var layer = options.layer;
				var id = options.id;
				var visible = options.visible;
				defaults.editEnabled = options.editble;
				var name = options.name;
				var location = options.location;
				
				// 设置编辑状态
				if(defaults.editEnabled == 0)
				{
					ctxmenuEnable(layer,map);
				}
				else{
					ctxmenuUnable(layer,map);
				}
				
				// 设置数据
				var overlay = findGraphic(layer.graphics,id);
                    	
				if(typeof(overlay) != "undefined"){
					// 显示
					if(visible == 1){
						overlay.hide();
					}
					// 业务数据
					overlay.attributes.NAME = name;
					overlay.attributes.LOCATION = location;
				}
               
                layer.redraw();
			
        },
		
		// 绑定事件
		on: function (options) {
			var layer = options.layer;
			var event = options.event;
			var handler = options.handler;
			
			//var layerHandler = dojo.connect(layer, event, handler);
			var layerHandler = layer.on(event,handler)
			return layerHandler;
		}
		}
		return self;
    });
