define([
	"dojo/Evented",
	"dojo/parser",
	"dojo/on",
	"dojo/_base/declare",
	"dojo/_base/array",
	"dojo/_base/lang",
	"dojo/dom",
	"dojo/dom-construct",
	"dojo/dom-style",
	"dojo/dom-geometry",
	"dojo/dom-class",
	"dojo/fx",
	"dojo/Deferred",
	"esri/domUtils",
	"esri/InfoWindowBase",
	"xstyle/css!./InfoWindow.css"
],
	function (
		Evented,
		parser,
		on,
		declare,
		array,
		lang,
		dom,
		domConstruct,
		domStyle,
		domGeom,
		domClass,
		coreFx,
		Deferred,
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
		var defaultWindowClassName = 'cw-dialogs-info-window';

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

					this.xoffset = this.xoffset || -15;
					this.yoffset = this.yoffset || 55;

					domClass.add(this.domNode, defaultWindowClassName);

					this._closeButton = domConstruct.create("div", { "class": "close", "title": "关闭" }, this.domNode);
					this._title = domConstruct.create("div", { "class": "title" }, this.domNode);
					this._content = domConstruct.create("div", { "class": "content" }, this.domNode);
					this._arrow = domConstruct.create("div", { "class": "arrow" }, this.domNode);

					on(this._closeButton, "click", lang.hitch(this, function () {
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
					this.place(title, this._title);
				},
				setContent: function (content) {
					this.place(content, this._content);
				},
				_showInfoWindow: function (x, y) {
					// Position 10x10 pixels away from the specified location
					domStyle.set(this.domNode, {
						"left": x - infoWidth / 2 + this.xoffset + "px",
						"top": y - infoHeight + this.yoffset + "px"
					});

					console.log('left:' + (x - infoWidth / 2 + this.xoffset) + "px");
					console.log('top:' + (y - infoHeight + this.yoffset) + "px");

					//display the info window
					domUtils.show(this.domNode);
				},
				show: function (location) {
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

					var left = location.x - infoWidth / 2 + this.xoffset;
					var top = location.y - infoHeight + this.yoffset;
					// var top = location.y ;
					showScreenPoint = location;
					this._showInfoWindow(showScreenPoint.x, showScreenPoint.y);

					if (top < 5) {
						initScreenCenter.y = initScreenCenter.y + top - 5;
					}
					if (left < 5) {
						initScreenCenter.x = initScreenCenter.x + left - 5;
					}

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
					domStyle.set(this._content, {
						"width": width + "px",
						"height": (height - 60) + "px"
					});
					domStyle.set(this._title, {
						"width": width + "px"
					});
				},
				destroy: function () {
					domConstruct.destroy(this.domNode);
					this._closeButton = this._title = this._content = null;
				}
			});
	});