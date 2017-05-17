// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/views/vectorTiles/renderers/shaders/lineShader.vs.glsl":"/* The implementation of the renderer is based on the article and implementation of MB described here:\r\n* https://www.mapbox.com/blog/drawing-antialiased-lines/\r\n*/\r\n\r\nattribute vec2 a_pos;\r\nattribute vec2 a_offset;\r\nattribute float a_accumulatedDistance;\r\n\r\n// the relative transformation of a vertex given in tile coordinates to a relative normalized coordinate\r\n// relative to the tile's upper left corner\r\n// the extrusion vector.\r\nuniform highp mat4 u_transformMatrix;\r\n// the extrude matrix which is responsible for the 'anti-zoom' as well as the rotation\r\nuniform highp mat4 u_extrudeMatrix;\r\n// u_normalized_origin is the tile's upper left corner given in normalized coordinates\r\nuniform highp vec2 u_normalized_origin;\r\n// the z of the layer. Given by the order of the layers in the style\r\nuniform mediump float u_depth;\r\n// the inset and outset of the line\r\nuniform mediump float u_lineHalfWidth;\r\n// the interpolated normal to the line. the information is packed into the LSB of the vertex coordinate\r\nvarying mediump vec2 v_normal;\r\n// the accumulated distance along the line. We need this information in order to render the dashes.\r\nvarying highp float v_accumulatedDistance;\r\n\r\nconst float scale \x3d 1.0 / 31.0;\r\n\r\nvoid main()\r\n{\r\n  // extract the normal from the list significat bit. It has a value of 0 or 1, but we need it to be either -1 or 1 therefore\r\n  // we need to change 0 to -1.\r\n  lowp vec2 normal \x3d mod(a_pos, 2.0);\r\n  normal.y \x3d normal.y \x3d\x3d 0.0 ? -1.0 : 1.0;\r\n  v_normal \x3d normal;\r\n\r\n  // calculate the relative distance from the centerline to the edge of the line. Since offset is given in integers (for the\r\n  // sake of using less attribute memory, we need to scale it back to the original range of ~ 0: 1)\r\n  mediump vec2 dist \x3d u_lineHalfWidth * a_offset * scale;\r\n\r\n  // transform the vertex\r\n  gl_Position \x3d vec4(u_normalized_origin, u_depth, 0.0) + u_transformMatrix * vec4(floor(a_pos * 0.5), 0.0, 1.0) + u_extrudeMatrix * vec4(dist, 0.0, 0.0);\r\n\r\n  // the accumulated distance will be used to calculate the dashes (or the no-data...)\r\n  v_accumulatedDistance \x3d a_accumulatedDistance;\r\n}\r\n",
"url:esri/views/vectorTiles/renderers/shaders/lineShader.fs.glsl":"/* The implementation of the renderer is based on the article and implementation of MB described here:\r\n* https://www.mapbox.com/blog/drawing-antialiased-lines/\r\n*/\r\n\r\nuniform mediump float u_lineHalfWidth;\r\nuniform lowp vec4 u_color;\r\nuniform mediump vec2 u_dasharray;\r\nuniform lowp float u_blur;\r\n\r\nvarying mediump vec2 v_normal;\r\nvarying highp float v_accumulatedDistance;\r\n\r\nvoid main()\r\n{\r\n  // dist represent the distance of the fragment from the line. 1.0 or -1.0 will be the values on the edge of the line,\r\n  // and any value in between will be inside the line (the sign represent the direction - right or left).\r\n  // since u_linewidth.s (half line width) is represented in pixels, dist is also given in pixels\r\n  mediump float fragDist \x3d length(v_normal) * u_lineHalfWidth;\r\n\r\n  // calculate the alpha given the difference between the line-width and the distance of the fragment from the center-line.\r\n  // We need to count for both sides of the line.\r\n  lowp float alpha \x3d clamp( min(fragDist + u_blur + 1.0, u_lineHalfWidth - fragDist) / u_blur, 0.0, 1.0);\r\n\r\n  // now calculate the dashes given the accumulated distance of the line:\r\n  // start with calculating a normalized position along the line\r\n  lowp float dashPos \x3d  mod(v_accumulatedDistance, u_dasharray.x + u_dasharray.y);\r\n\r\n  // calculate the contribution to the alpha of the dash part. It is provided by the shortest portion of the position along the dash.\r\n  // we must clamp since the value might be bigger than 1 or smaller than zero (when over a dash).\r\n  //   | \x3c--- pos along the dash part\r\n  // -------_______-------_______\r\n  // when the dashPos is over the 'gap' part of the dash u_dasharray.x - dashPos is negative and therefore the alpha will\r\n  // get clamped to zero.\r\n  // when u_dasharray.x - dashPos is positive, or when dashPos is smaller than 1.0, it gives us a soft edge to each dash part.\r\n  // along the direction of the line.\r\n  lowp float dashAlpha \x3d clamp( min(dashPos, u_dasharray.x - dashPos), 0.0, 1.0);\r\n\r\n  // if we don't have a no-data part to the dash then it is a solid line\r\n  dashAlpha \x3d max(sign(-u_dasharray.y), dashAlpha); //sign(-u_dasharray.y) \x3e 0.0 ? 1.0 : dashAlpha;\r\n  // finally multiply the fragment's alpha by the calculated dash-alpha\r\n  alpha *\x3d dashAlpha;\r\n\r\n  // output the fragment color\r\n gl_FragColor \x3d alpha * u_color;\r\n}\r\n",
"url:esri/views/vectorTiles/renderers/shaders/patternLineShader.vs.glsl":"attribute vec2 a_pos;\r\nattribute vec2 a_offset;\r\nattribute float a_accumulatedDistance;\r\n\r\n// the relative transformation of a vertex given in tile coordinates to a relative normalized coordinate\r\n// relative to the tile's upper left corner\r\n// the extrusion vector.\r\nuniform highp mat4 u_transformMatrix;\r\n// the extrude matrix which is responsible for the 'anti-zoom' as well as the rotation\r\nuniform highp mat4 u_extrudeMatrix;\r\n// u_normalized_origin is the tile's upper left corner given in normalized coordinates\r\nuniform highp vec2 u_normalized_origin;\r\n// the z of the layer. Given by the order of the layers in the style\r\nuniform mediump float u_depth;\r\n// the inset and outset of the line\r\nuniform mediump float u_lineHalfWidth;\r\n// the interpolated normal to the line. the information is packed into the LSB of the vertex coordinate\r\nvarying mediump vec2 v_normal;\r\n// the accumulated distance along the line. We need this information in order to render the dashes.\r\nvarying highp float v_accumulatedDistance;\r\n\r\nconst float scale \x3d 1.0 / 31.0;\r\n\r\nvoid main()\r\n{\r\n  // extract the normal from the list significat bit. It has a value of 0 or 1, but we need it to be either -1 or 1 therefore\r\n  // we need to change 0 to -1.\r\n  lowp vec2 normal \x3d mod(a_pos, 2.0);\r\n  normal.y \x3d normal.y \x3d\x3d 0.0 ? -1.0 : 1.0;\r\n  v_normal \x3d normal;\r\n\r\n  // calculate the relative distance from the centerline to the edge of the line. Since offset is given in integers (for the\r\n  // sake of using less attribute memory, we need to scale it back to the original range of ~ 0: 1)\r\n  mediump vec2 dist \x3d u_lineHalfWidth * a_offset * scale;\r\n\r\n  // transform the vertex\r\n  gl_Position \x3d vec4(u_normalized_origin, u_depth, 0.0) + u_transformMatrix * vec4(floor(a_pos * 0.5), 0.0, 1.0) + u_extrudeMatrix * vec4(dist, 0.0, 0.0);\r\n\r\n  // the accumulated distance will be used to calculate the dashes (or the no-data...)\r\n  v_accumulatedDistance \x3d a_accumulatedDistance;\r\n}\r\n",
"url:esri/views/vectorTiles/renderers/shaders/patternLineShader.fs.glsl":"uniform mediump float u_lineHalfWidth;\r\nuniform lowp float u_blur;\r\nuniform lowp float u_opacity;\r\nuniform mediump vec2 u_pattern_tl;\r\nuniform mediump vec2 u_pattern_br;\r\nuniform mediump vec2 u_spriteSize;\r\nuniform sampler2D u_texture;\r\n\r\nvarying mediump vec2 v_normal;\r\nvarying highp float v_accumulatedDistance;\r\n\r\nvoid main()\r\n{\r\n  // dist represent the distance of the fragment from the line. 1.0 or -1.0 will be the values on the edge of the line,\r\n  // and any value in between will be inside the line (the sign represent the direction - right or left).\r\n  // since u_linewidth.s (half line width) is represented in pixels, dist is also given in pixels\r\n  mediump float fragDist \x3d length(v_normal) * u_lineHalfWidth;\r\n\r\n  // calculate the alpha given the difference between the line-width and the distance of the fragment from the center-line.\r\n  // We need to count for both sides of the line.\r\n  lowp float alpha \x3d clamp( min(fragDist + u_blur + 1.0, u_lineHalfWidth - fragDist) / u_blur, 0.0, 1.0);\r\n  // add the line's opacity to the alpha\r\n  alpha *\x3d u_opacity;\r\n\r\n  // we need to calculate the relative portion of the line texture along the line given the accumulated distance aliong the line\r\n  // The computed value should is anumber btween 0 and 1 which will later be used to interpolate btween the BR and TL values\r\n  mediump float relativeTexX \x3d mod(v_accumulatedDistance / u_spriteSize.x, 1.0);\r\n\r\n  // in order to calculate the texture coordinates prependicular to the line (Y axis), we use the interpolated normal values\r\n  // which range from -1.0 to 1.0. On the line's centerline, the value of the interpolated normal is 0.0, however the relative\r\n  // texture value shpould be 0.5 (given that at the bottom of the line, the texture coordinate must be equal to 0.0)\r\n  // (TL) ---------------------------      --\x3e left edge of line. Interpolatedf normal is 1.0\r\n  //              | -\x3e linwe-width / 2\r\n  //      - - - - - - - - - - - - - -\r\n  //              | -\x3e linwe-width / 2\r\n  //      ---------------------------- (BR)--\x3e right edge of line. Interpolatedf normal is -1.0\r\n\r\n  mediump float relativeTexY \x3d 0.5 + (v_normal.y * u_lineHalfWidth / u_spriteSize.y);\r\n\r\n  // claculate the actual texture coordinates by interpolating between the TL/BR pattern coordinates\r\n  mediump vec2 texCoord \x3d mix(u_pattern_tl, u_pattern_br, vec2(relativeTexX, relativeTexY));\r\n\r\n  // get the color from the texture\r\n  lowp vec4 color \x3d texture2D(u_texture, texCoord);\r\n\r\n  // 'un-premultiply' the color\r\n  lowp float inv_alpha \x3d (1.0 / clamp(color.a, 0.00390625, 1.0));\r\n  // finally write the fragment value\r\n  gl_FragColor \x3d alpha * color;\r\n}\r\n",
"url:esri/views/vectorTiles/renderers/shaders/lineJoinShader.vs.glsl":"attribute vec2 a_pos;\r\n\r\nuniform highp mat4 u_transformMatrix;\r\nuniform highp vec2 u_normalized_origin;\r\nuniform highp float u_depth;\r\nuniform highp vec2 u_screen;\r\nuniform mediump float u_size;\r\nuniform mediump float u_pixelRatio;\r\n\r\nvarying mediump vec2 v_vertexPosition;\r\n\r\nvoid main()\r\n{\r\n  gl_PointSize \x3d u_pixelRatio * u_size;\r\n  gl_Position \x3d vec4(u_normalized_origin, u_depth, 0.0) + u_transformMatrix * vec4(a_pos, 0.0, 1.0);\r\n\r\n  // calculate the vertex position in pixels (we need to add one in order to shift the origin from the center of the viewport)\r\n  v_vertexPosition \x3d (gl_Position.xy + 1.0) * u_screen;\r\n}\r\n",
"url:esri/views/vectorTiles/renderers/shaders/lineJoinShader.fs.glsl":"uniform lowp vec4 u_color;\r\nuniform mediump float u_lineHalfWidth;\r\nuniform mediump float u_oneOverPixelRatio;\r\n\r\nvarying mediump vec2 v_vertexPosition;\r\n\r\nvoid main()\r\n{\r\n  // get the distance of the current fragment from the actual vertex\r\n  mediump float fragDist \x3d length(v_vertexPosition - u_oneOverPixelRatio * gl_FragCoord.xy);\r\n\r\n  // rounding the quare: calculate the alpha given the difference between the line-width and the distance of the fragment\r\n  // from the center-line. We will end up with a nice round circle with a soft edge.\r\n  lowp float alpha \x3d clamp(u_lineHalfWidth - fragDist, 0.0, 1.0);\r\n\r\n  // finally output the fragment color\r\n  gl_FragColor \x3d alpha * u_color;\r\n}\r\n"}});
define("require exports ../../../core/libs/gl-matrix/mat4 ../../../core/libs/gl-matrix/vec4 ../../../core/libs/gl-matrix/vec3 ../../../core/libs/gl-matrix/vec2 dojo/text!./shaders/lineShader.vs.glsl dojo/text!./shaders/lineShader.fs.glsl dojo/text!./shaders/patternLineShader.vs.glsl dojo/text!./shaders/patternLineShader.fs.glsl dojo/text!./shaders/lineJoinShader.vs.glsl dojo/text!./shaders/lineJoinShader.fs.glsl ../../webgl/Program ../../webgl/VertexArrayObject ../GeometryUtils".split(" "),function(J,
K,w,B,C,y,D,E,F,G,H,I,x,z,A){return function(){function e(){this._joinAttributeLocations={a_pos:0,a_vertexOffset:1};this._triangleAttributeLocations={a_pos:0,a_offset:1,a_accumulatedDistance:2};this._initialized=!1;this._viewProjMat=w.create();this._offsetVector=C.create();this._screenSize=y.create();this._color=B.create();this._dashArray=y.create()}e.prototype.render=function(b,c,a,s,k,f,n,e,p,v){if(0!==c.triangleElementCount){this._initialized||this._initialize(b);var l=k.tileTransform.transform,
q=k.coordRange/512,g=f.getPaintValue("line-translate",a);if(0!==g[0]||0!==g[1]){w.copy(this._viewProjMat,k.tileTransform.transform);var l=g[0],g=g[1],d=0,h=0,h=(1<<k.key.level)/Math.pow(2,a)*q,d=s.rotation;if(1===f.getPaintValue("line-translate-anchor",a))var t=Math.sin(A.C_DEG_TO_RAD*-d),u=Math.cos(A.C_DEG_TO_RAD*-d),d=h*(l*u-g*t),h=h*(l*t+g*u);else d=h*l,h*=g;this._offsetVector[0]=d;this._offsetVector[1]=h;this._offsetVector[2]=0;w.translate(this._viewProjMat,this._viewProjMat,this._offsetVector);
l=this._viewProjMat}t=f.getPaintValue("line-pattern",a);u=void 0!==t;d=1/p;g=f.getPaintValue("line-blur",a)+d;h=f.getPaintValue("line-width",a);d=0.5*(h+d);v*=f.getPaintValue("line-opacity",a);var r=f.getPaintValue("line-color",a),m=r[3]*v;this._color[0]=m*r[0];this._color[1]=m*r[1];this._color[2]=m*r[2];this._color[3]=m;if(1<d&&0<c.joinCount&&!u&&(this._screenSize[0]=0.5*s.width,this._screenSize[1]=0.5*s.height,s=Math.ceil(2*d),r=d-0.25,m=this._getJoinsVAO(b,k)))b.bindVAO(m),b.bindProgram(this._joinProgram),
m=1/(0<p?p:1),this._joinProgram.setUniformMatrix4fv("u_transformMatrix",l),this._joinProgram.setUniform2fv("u_normalized_origin",k.tileTransform.displayCoord),this._joinProgram.setUniform1f("u_depth",f.z),this._joinProgram.setUniform2fv("u_screen",this._screenSize),this._joinProgram.setUniform1f("u_size",s),this._joinProgram.setUniform4fv("u_color",this._color),this._joinProgram.setUniform1f("u_lineHalfWidth",r),this._joinProgram.setUniform1f("u_pixelRatio",p),this._joinProgram.setUniform1f("u_oneOverPixelRatio",
m),b.drawArrays(0,c.joinStart,c.joinCount),b.bindVAO();if(p=this._getTrianglesVAO(b,k)){b.bindVAO(p);if(u){if(a=n.getMosaicItemPosition(t,!0))n.bind(b,9729,0),b.bindProgram(this._patternLineProgram),this._patternLineProgram.setUniformMatrix4fv("u_transformMatrix",l),this._patternLineProgram.setUniformMatrix4fv("u_extrudeMatrix",e),this._patternLineProgram.setUniform2fv("u_normalized_origin",k.tileTransform.displayCoord),this._patternLineProgram.setUniform1f("u_depth",f.z),this._patternLineProgram.setUniform1f("u_lineHalfWidth",
d),this._patternLineProgram.setUniform1f("u_blur",g),this._patternLineProgram.setUniform1f("u_opacity",v),this._patternLineProgram.setUniform2f("u_pattern_tl",a.tl[0],a.tl[1]),this._patternLineProgram.setUniform2f("u_pattern_br",a.br[0],a.br[1]),this._patternLineProgram.setUniform2f("u_spriteSize",q*a.size[0],a.size[1]),this._patternLineProgram.setUniform1i("u_texture",0)}else n=f.getPaintValue("line-dasharray",a),2>n.length&&(n=[1,-1]),q*=h,this._dashArray[0]=q*n[0],this._dashArray[1]=q*n[1],b.bindProgram(this._triangleslProgram),
this._triangleslProgram.setUniformMatrix4fv("u_transformMatrix",l),this._triangleslProgram.setUniformMatrix4fv("u_extrudeMatrix",e),this._triangleslProgram.setUniform2fv("u_normalized_origin",k.tileTransform.displayCoord),this._triangleslProgram.setUniform1f("u_depth",f.z),this._triangleslProgram.setUniform4fv("u_color",this._color),this._triangleslProgram.setUniform1f("u_lineHalfWidth",d),this._triangleslProgram.setUniform2fv("u_dasharray",this._dashArray),this._triangleslProgram.setUniform1f("u_blur",
g);b.drawElements(4,c.triangleElementCount,5125,12*c.triangleElementStart);b.bindVAO()}}};e.prototype._initialize=function(b){if(this._initialized)return!0;var c=new x(b,D,E,this._triangleAttributeLocations),a=new x(b,F,G,this._triangleAttributeLocations);b=new x(b,H,I,this._joinAttributeLocations);this._triangleslProgram=c;this._patternLineProgram=a;this._trianglesVertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:12,normalized:!1,divisor:0},{name:"a_offset",count:2,type:5122,
offset:4,stride:12,normalized:!1,divisor:0},{name:"a_accumulatedDistance",count:2,type:5122,offset:8,stride:12,normalized:!1,divisor:0}]};this._joinProgram=b;this._joinVertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:4,normalized:!1,divisor:0}]};return this._initialized=!0};e.prototype._getTrianglesVAO=function(b,c){if(c.lineTrianglesVertexArrayObject)return c.lineTrianglesVertexArrayObject;var a=c.lineVertexBuffer,e=c.lineTrianglesIndexBuffer;if(!a||!e)return null;c.lineTrianglesVertexArrayObject=
new z(b,this._triangleAttributeLocations,this._trianglesVertexAttributes,{geometry:a},e);return c.lineTrianglesVertexArrayObject};e.prototype._getJoinsVAO=function(b,c){if(c.lineJoinsVertexArrayObject)return c.lineJoinsVertexArrayObject;var a=c.lineJoinVertexBuffer;if(!a)return null;c.lineJoinsVertexArrayObject=new z(b,this._joinAttributeLocations,this._joinVertexAttributes,{geometry:a});return c.lineJoinsVertexArrayObject};return e}()});