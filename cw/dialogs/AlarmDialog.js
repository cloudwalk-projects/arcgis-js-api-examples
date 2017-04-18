define([
	"x", "cw/cameras",
	"dojo/_base/declare",
	"dojo/_base/array",
	"dojo/_base/lang",
	"dojo/text!./AlarmDialog.html",
	"dojo/parser",
	"dojo/dom",
	"dojo/dom-construct",
	"dojo/dom-style",
	"dojo/dom-geometry",
	"dojo/dom-class",
	"dojo/fx",
	"dojo/on",
	"dojo/Deferred",
	"dojo/Evented",
	"esri/domUtils",
	"esri/InfoWindowBase",
	"xstyle/css!./AlarmDialog.css"
],
	function (
		x,
		cameras,
		declare,
		array,
		lang,
		template,
		parser,
		dom,
		domConstruct,
		domStyle,
		domGeom,
		domClass,
		coreFx,
		on,
		Deferred,
		Evented,
		domUtils,
		InfoWindowBase
	) {
		var infoWidth,
			infoHeight,
			initMapCenter,
			initScreenCenter,
			showMapPoint,
			showScreenPoint = null;

		// 默认窗口样式
		var defaultWindowClassName = 'cw-dialogs-alarm-dialog';

		return declare([InfoWindowBase, Evented],
			{
				/**
				 * 构造函数
				 */
				constructor: function (parameters) {
					lang.mixin(this, parameters);

					// 如果元素节点不存在, 则自动创建 DOM 元素
					if (!this.domNode) {
						this.domNode = domConstruct.create("div", null, dom.byId(this.divId));
					}

					domClass.add(this.domNode, defaultWindowClassName);

					this.closeButtonNode = domConstruct.create("div", { "class": "close", "title": "关闭" }, this.domNode);
					this.titleNode = domConstruct.create("div", { "class": "title" }, this.domNode);
					this.contentNode = domConstruct.create("div", { "class": "content" }, this.domNode);
					this.arrowNode = domConstruct.create("div", { "class": "arrow" }, this.domNode);

					// 设置内容模板
					this.templateContent = this.templateContent || template;

					var that = this;

					// 设置一个定时器
					var timer = x.newTimer(this.interval || 2, function () {
						that.binding();
					});

					// 启动定时器
					timer.start();

					on(this.closeButtonNode, "click", lang.hitch(this, function () {
						//hide the content when the info window is toggled close.
						this.hide();
					}));
					//hide initial display 
					domUtils.hide(this.domNode);
					this.isShowing = false;
				},
				setMap: function (map) {
					this.inherited(arguments);
					map.on("pan", lang.hitch(this, function (pan) {
						var movePoint = pan.delta;
						if (this.isShowing) {
							if (showScreenPoint != null) {
								this._showInfoWindow(showScreenPoint.x + movePoint.x, showScreenPoint.y + movePoint.y);
							}
						}
					}));

					map.on("pan-end", lang.hitch(this, function (panend) {
						var movedelta = panend.delta;
						if (this.isShowing) {
							showScreenPoint.x = showScreenPoint.x + movedelta.x;
							showScreenPoint.y = showScreenPoint.y + movedelta.y;
						}
					}));

					map.on("zoom-start", lang.hitch(this, function () {
						domUtils.hide(this.domNode);
						this.onHide();
					}));

					map.on("zoom-end", lang.hitch(this, function () {
						if (this.isShowing) {
							showScreenPoint = this.map.toScreen(showMapPoint);
							this._showInfoWindow(showScreenPoint.x, showScreenPoint.y);
						}
					}));
				},
				setTitle: function (title) {
					this.place(title, this.titleNode);
				},
				setContent: function (content) {
					this.templateContent = content;
					this.binding();
					// this.place(rawContent, this.contentNode);
				},
				/**
				 * 将摄像头数据绑定到内容上
				 */
				binding() {
					if (this.cameraId) {
						var layer = cameras.getLayer({ map: this.map });

						if (layer) {
							this.content = this.templateContent;
							var that = this;
							// 设置图形信息的数据
							array.forEach(layer.graphics, function (graphic, index) {
								if (graphic.attributes.id == that.cameraId) {
									for (name in graphic.attributes) {
										that.content = that.content.replace('{{' + name + '}}', graphic.attributes[name]);
									}
								}
							});
						}
					}
					console.log(this.content);
					this.place(this.content, this.contentNode);
				},

				_showInfoWindow: function (x, y) {
					//Position 10x10 pixels away from the specified location
					domStyle.set(this.domNode, {
						"left": x - infoWidth / 2 + 15 + "px",
						"top": y - infoHeight - 55 + "px"
					});
					//display the info window
					domUtils.show(this.domNode);
				},

				/**
				 * 显示
				 */
				show: function (location, graphic) {
					var location = graphic.geometry;

					if (graphic.attributes.id) {
						this.cameraId = graphic.attributes.id;
					}

					this.binding();

					showMapPoint = location;

					initMapCenter = this.map.extent.getCenter();
					initScreenCenter = this.map.toScreen(initMapCenter);

					var domNode = dojo.query("." + defaultWindowClassName)[0];
					// Get the content-box size of a node
					var contentBox = domGeom.getContentBox(this.domNode);
					var computedStyle = domStyle.getComputedStyle(this.domNode);
					// computedStyle.width
					// infoHeight = dojo.query(".myInfoWindow").height();
					infoHeight = computedStyle.height.replace('px', '');
					infoWidth = computedStyle.width.replace('px', '');

					if (location.spatialReference) {
						location = this.map.toScreen(location);
					}

					var left = location.x - infoWidth / 2 - 5;
					var top = location.y - infoHeight - 55;
					// var top = location.y ;
					showScreenPoint = location;

					if (top < 5) {
						initScreenCenter.y = initScreenCenter.y + top - 5;
					}
					if (left < 5) {
						initScreenCenter.x = initScreenCenter.x + left - 5;
					}
					this._showInfoWindow(showScreenPoint.x, showScreenPoint.y);
					initMapCenter = this.map.toMap(initScreenCenter);
					this.map.centerAt(initMapCenter);
					this.isShowing = true;
					this.onShow();
				},
				hide: function () {
					domUtils.hide(this.domNode);
					this.isShowing = false;
					this.onHide();
				},
				resize: function (width, height) {
					domStyle.set(this.contentNode, {
						"width": width + "px",
						"height": (height - 60) + "px"
					});
					domStyle.set(this.titleNode, {
						"width": width + "px"
					});
				},
				destroy: function () {
					domConstruct.destroy(this.domNode);
					this.closeButtonNode = this.titleNode = this.contentNode = null;
				}
			});

		// return InfoWindow;
	});