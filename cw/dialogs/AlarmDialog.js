define([
  "x", "cw/config", "cw/markers",
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
    x, config,
    markers,
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

    // 更多抓拍
    var moreCaptrue = {
      maxNum: 3,
      obj: $(".img-div"),
      status: false,
      data: new Map(),
      videoId: "",
      createData: function (markerId, captrues) {
        // if (!$.isEmptyObject(moreCaptrue.data.get(marker.video.id))) {
        //  return;
        // }
        var caps = captrues;
        // moreCaptrue.videoId = marker.video.id;
        moreCaptrue.videoId = markerId;
        var data = [];
        if ($.isEmptyObject(caps)) {
          return;
        }
        for (var int = 0; int < caps.length; int++) {
          if (moreCaptrue.maxNum < (int + 1)) {
            break;
          }
          data.push(caps[int].captureUrl);
        }
        moreCaptrue.data.put(moreCaptrue.videoId, data);
        moreCaptrue.createImg(moreCaptrue.videoId);
      },
      createImg: function (videoId) {
        $.each(moreCaptrue.data.get(videoId), function (n, value) {
          var html = moreCaptrue.createHtml(n, value);
          $(".img-div").after(html);
        })
      },
      createHtml: function (id, url) {
        var html = '<div id="' + id + '" class="popCaptrueImage">' +
          '<img class="captrueImg" src="' + url + '" onerror="this.src=' + "'lib/style/img/follow.png'" + '">' +
          '</div>';
        return html;
      },
      click: function () {
        if (moreCaptrue.status) {
          moreCaptrue.close();
        } else {
          moreCaptrue.open();
        }
      },
      open: function () {
        if ($.isEmptyObject(moreCaptrue.data.get(moreCaptrue.videoId))) {
          return;
        }
        $.each(moreCaptrue.data.get(moreCaptrue.videoId), function (n, value) {
          //弹出动画
          if (n == 0) {
            $("#0").animate({ left: '75px' });
          } else if (n == 1) {
            $("#1").animate({ left: '143px' });
          } else if (n == 2) {
            $("#2").animate({ left: '212px' });
          }
        });
        moreCaptrue.status = true;
      },
      close: function () {
        for (var int = moreCaptrue.data.get(moreCaptrue.videoId).length; int >= 0; int--) {
          //弹出动画
          if (int == 0) {
            $("#0").animate({ left: '6px' });
          } else if (int == 1) {
            $("#1").animate({ left: '6px' });
          } else if (int == 2) {
            $("#2").animate({ left: '6px' });
          }
        }
        moreCaptrue.status = false;
      },
      clearData: function () {
        moreCaptrue.data = new Map();
      }
    }

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

          this.xoffset = this.xoffset || 0;
          this.yoffset = this.yoffset || -10;

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
          // timer.start();

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
        binding: function () {
          if (this.markerId) {
            var that = this;
            var layer = markers.getLayer({ map: this.map, markerType: 'camera' });

            if (layer) {
              this.content = this.templateContent;
              // 设置图形信息的数据
              array.forEach(layer.graphics, function (graphic, index) {
                if (graphic.attributes.id == that.markerId) {
                  for (name in graphic.attributes) {
                    that.content = that.content.replace(new RegExp('{{' + name + '}}', 'g'), graphic.attributes[name]);
                  }
                }
              });

              this.content = this.content.replace(/{{staticFileServer}}/g, config.staticFileServer);

              // 获取最新一张抓拍图
              $afaps_api.ajax({
                url: "extService/capture/recentCapture",
                data: {
                  "cameraId": this.markerId,
                  "count": 3
                },
                success: function (result) {
                  var data = JSON.parse(result).data;
                  if (data.length > 0) {
                    var imgUrl = data[0].fullFaceUrl;
                    $("#captureImg").attr("src", imgUrl);

                    captures = [];
                    for (var i = 0; i < data.length; i++) {
                      var capture = {};
                      capture.captureUrl = data[i].fullFaceUrl;
                      captures.push(capture);
                    }
                  }
                }
              });

              // 获取抓拍数
              $afaps_api.ajax({
                url: "extService/captureStatistics/cameraCaptureCount",
                data: { cameraId: this.markerId },
                success: function (result) {
                  var data = JSON.parse(result).data;
                  $("#cameraCaptureCount").text(data);
                  $("#cameraCaptureCount").attr("title", data);
                }
              });

              // 获取报警数
              $afaps_api.ajax({
                url: "extService/alarmStatistics/cameraAlarmCount",
                data: { cameraId: this.markerId },
                success: function (result) {
                  var data = JSON.parse(result).data;
                  $("#cameraAlarmCount").text(data);
                  $("#cameraAlarmCount").attr("title", data);
                }
              });
            }
          }

          this.place(this.content, this.contentNode);

          if ($("#captureImg").attr("src") != 'lib/style/img/follow.png') {
            moreCaptrue.createData(that.markerId, captures);
            // moreCaptrue.click();
          }

          // 绑定事件
          //设置图片more移入移除与点击
          $(".img-div .more").on('mouseover', function () {
            $(this).attr("style", "opacity: 1;cursor: pointer;");
          });
          $(".img-div .more").on('mouseout', function () {
            $(this).attr("style", "opacity: 0.7;cursor: pointer;");
          });
          $(".img-div .more").on('click', function () {
            if ($("#captureImg").attr("src") != 'lib/style/img/follow.png') {
              // moreCaptrue.createData(that.markerId, captures);
              moreCaptrue.click();
            }
          });
        },

        _showInfoWindow: function (pointX, pointY) {
          // 第一次显示时 处理宽度和高度的数据
          if (isNaN(Number(infoHeight)) && isNaN(Number(infoWidth))) {

            domUtils.show(this.domNode);

            var computedStyle = domStyle.getComputedStyle(this.domNode);

            infoHeight = computedStyle.height.replace('px', '');
            infoWidth = computedStyle.width.replace('px', '');
          }

          // Position 10x10 pixels away from the specified location
          domStyle.set(this.domNode, {
            "left": pointX - infoWidth / 2 + this.xoffset + "px",
            "top": pointY - infoHeight + this.yoffset + "px"
          });

          console.log('left:' + (pointX - infoWidth / 2 + this.xoffset) + "px");
          console.log('top:' + (pointY - infoHeight + this.yoffset) + "px");

          //display the info window
          domUtils.show(this.domNode);
        },

				/**
				 * 显示
				 */
        show: function (location, graphic) {
          var location = graphic.geometry;

          if (graphic.attributes.id) {
            this.markerId = graphic.attributes.id;
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
