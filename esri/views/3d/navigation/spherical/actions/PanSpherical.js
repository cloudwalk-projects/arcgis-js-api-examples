// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.
//>>built
define("./ActionSpherical ../../mixins/PanMixin ../../../lib/glMatrix ../../../support/earthUtils ../../../support/mathUtils ../../../webgl-engine/lib/Util ../../ContinuousAction ../../NavigationConstants".split(" "),function(A,B,p,l,w,q,C,r){var k=p.vec2d,b=p.vec3d,x=p.vec4d,m=p.mat4d,g=b.create(),f=b.create(),s=b.create(),y=b.create(),t=b.create(),u=b.create(),n=m.create(),v=r.Pan.Mode,d=r.Pan.Direction,z=r.Pan.Vertical,h=r.Pan.Momentum;return A.createSubclass([B],{declaredClass:"esri.views.3d.navigation.spherical.actions.PanSpherical",
constructor:function(){this._lastPanActionPtr=this._panMode=0;this._lastPanActions=[];this._plane=x.create();this._isMomentumPanning=!1;this.continuous=new C;for(var a=0;a<h.BUFFER_SIZE;a++)this._lastPanActions[a]={point:b.create(),pointScreen:k.create(),time:0}},begin:function(a,c){this.inherited(arguments);this.pickPointInScreen(a,this._navPickPoint)?this._navSphereRadius=b.length(this._navPickPoint):(this._navSphereRadius=b.length(this.targetCamera.center),this._navSphereRadius<0.9*l.earthRadius&&
(this._navSphereRadius=l.earthRadius),this.createPickRay(a,a,this.currentCamera.viewMatrix,g,f),b.subtract(f,this.currentCamera.eye),this.intersectManifold(this.currentCamera.eye,f,this._navSphereRadius-l.earthRadius,this._navPickPoint)||this.closestPointOnSphereSilhouette(this.currentCamera.eye,g,this._navSphereRadius,this._navPickPoint));var e=!1;this.renderCoordsHelper.getAltitude(this.currentCamera.eye)<z.ELEVATION_THRESHOLD&&(this._navSphereRadius>b.length(this.currentCamera.eye)?e=!0:(b.normalize(b.subtract(this.targetCamera.eye,
this._navPickPoint,s)),e=Math.abs(0.5*Math.PI-Math.acos(b.dot(this._navPickPoint,s)/b.length(this._navPickPoint)))<z.ANGLE_THRESHOLD));e?(this._panMode=v.VERTICAL,b.normalize(b.subtract(this.targetCamera.eye,this.targetCamera.center,s)),this.updatePlane(this._navPickPoint,s)):(this._panMode=v.HORIZONTAL,this._addToLastPanActions(void 0===c?q.performance.now():c,this._navPickPoint,a));k.set(a,this._dragLastPoint);k.set(a,this._dragBeginPoint);this._mouseDownCamera.copyFrom(this.targetCamera)},update:function(a,
c){if(this._panMode===v.HORIZONTAL){if(0>=this._navSphereRadius)return;this.createPickRay(a,this._dragBeginPoint,this._mouseDownCamera.viewMatrix,g,f);b.subtract(f,this._mouseDownCamera.eye);this.intersectManifold(this._mouseDownCamera.eye,f,this._navSphereRadius-l.earthRadius,this._targetOnSphere)||this.closestPointOnSphereSilhouette(this._mouseDownCamera.eye,g,this._navSphereRadius,this._targetOnSphere);this.rotateCameraWithPointsOnSphere(this._navPickPoint,this._targetOnSphere,this._mouseDownCamera,
this.targetCamera,this._navSphereRadius);this._addToLastPanActions(void 0===c?q.performance.now():c,this._targetOnSphere,a)}else{this.createPickRay(this._dragLastPoint,this._dragBeginPoint,this.currentCamera.viewMatrix,g,f);b.subtract(f,g);if(!q.rayPlane(g,f,this._plane,y))return;this.createPickRay(a,this._dragBeginPoint,this.currentCamera.viewMatrix,g,f);b.subtract(f,g);if(!q.rayPlane(g,f,this._plane,t))return;b.subtract(t,y);b.subtract(this.targetCamera.eye,t);b.subtract(this.targetCamera.center,
t);k.set(a,this._dragLastPoint)}this.constrainTargetEyeByElevationAndMoveLookAt();k.set(a,this._dragLastPoint);this.fixTargetUpVector();this.targetAndCurrentChanged();this.inherited(arguments)},end:function(a,b){this._panMode===v.HORIZONTAL&&this._initiateMomentumPanning(a,b);this._navSphereRadius=0;this.inherited(arguments)},_initiateMomentumPanning:function(a,b){if(0>=this._navSphereRadius)return this.setPoiAuto(a,!0),!1;this.update(a,b);var e=this._lastPanActionPtr;do if(e=(e-1+h.BUFFER_SIZE)%
h.BUFFER_SIZE,this._lastPanActions[this._lastPanActionPtr].time-this._lastPanActions[e].time>1E3*h.INPUT_FILTER)break;while(this._lastPanActionPtr!==e);e++;e%=h.BUFFER_SIZE;e===this._lastPanActionPtr&&(e=(this._lastPanActionPtr-1+h.BUFFER_SIZE)%h.BUFFER_SIZE);var d=0.001*(this._lastPanActions[this._lastPanActionPtr].time-this._lastPanActions[e].time);if(0<d&&k.dist(this._lastPanActions[e].pointScreen,this._lastPanActions[this._lastPanActionPtr].pointScreen)/d>=h.MINIMUM_VELOCITY){var f=this.rotationFromPointsOnSphere(this._lastPanActions[e].point,
this._lastPanActions[this._lastPanActionPtr].point,this._navSphereRadius,this.continuous.direction);this.continuous.velocity=f/d;var f=k.create(),g=k.create();this.normalizeCoordinate(this._lastPanActions[e].pointScreen,f);this.normalizeCoordinate(this._lastPanActions[this._lastPanActionPtr].pointScreen,g);e=Math.min(k.dist(f,g)/d/h.DURATION_LONG_VEL,1);this.continuous.timer=h.DURATION_SHORT+e*(h.DURATION_LONG-h.DURATION_SHORT);this._isMomentumPanning=!0;this.animationStarted();return!0}this.currentReachedTarget();
return!1},beginContinuous:function(a){var c=0===this.continuous.status;c&&(this.navigation.begin(this),this.active=!0,this.emit("begin"));this.inherited(arguments);this.setCurrentToTarget();c&&b.set3(0,0,0,this.continuous.direction);this.continuous.status&a||(this.continuous.status|=a,a&(d.LEFT|d.RIGHT|d.FORWARD|d.BACKWARD)?(this._computePanAxis(a,u),b.add(this.continuous.direction,u)):(c=this.continuous.status&(d.UP|d.DOWN),this.continuous.radiusChange=c===d.UP?1:c===d.DOWN?-1:0),this.continuous.velocity=
this._computePanVelocity());this.continuous.timer=0},updateContinuous:function(a){if(this.continuous)if(this.continuous.active){a=this.continuous.step(a);var c=0.01<b.dot(this.continuous.direction,this.continuous.direction),e=this.targetCamera;if(0<Math.abs(this.continuous.radiusChange)){var d=1+a*this.continuous.radiusChange,g=e.viewForward,e=b.normalize(e.center,f);(-0.999<b.dot(g,e)||0>this.continuous.radiusChange)&&b.scale(this.targetCamera.center,d);b.scale(this.targetCamera.eye,d);this.continuous.velocity=
this._computePanVelocity();c||(this.applyConstraints(this.targetCamera),this.constrainTargetEyeByElevationAndMoveLookAt(),this.fixTargetUpVector(),this.targetAndCurrentChanged())}c&&(m.identity(n),m.rotate(n,a,this.continuous.direction),m.multiplyVec3(n,this.targetCamera.eye),m.multiplyVec3(n,this.targetCamera.center),m.multiplyVec3(n,this.targetCamera.up),this.applyConstraints(this.targetCamera),this.constrainTargetEyeByElevationAndMoveLookAt(),this.fixTargetUpVector(),this.targetAndCurrentChanged());
this.emit("update")}else this._isMomentumPanning&&(this._isMomentumPanning=!1,this.targetAndCurrentChanged(!0))},endContinuous:function(a){this.continuous.status&=~a;if(0===this.continuous.status)this.continuous.stop(),this.continuous.radiusChange=0,this.active=!1,this.emit("end"),this.navigation.end(this);else if(a&(d.LEFT|d.RIGHT|d.FORWARD|d.BACKWARD))this._computePanAxis(a,u),b.subtract(this.continuous.direction,u),0.01>b.length(this.continuous.direction)&&b.set3(0,0,0,this.continuous.direction);
else{var c=this.continuous.status&(d.UP|d.DOWN);this.continuous.radiusChange=c==d.UP?1:c==d.DOWN?-1:0}this.inherited(arguments)},_computePanAxis:function(a,c){b.subtract(this.targetCamera.center,this.targetCamera.eye,c);b.cross(c,this.targetCamera.up);if(a===d.LEFT||a===d.RIGHT)b.normalize(c),b.cross(c,this.targetCamera.center);(a===d.RIGHT||a===d.FORWARD)&&b.negate(c);b.normalize(c)},_computePanVelocity:function(){var a=0.5*Math.abs(b.length(this.targetCamera.eye)-l.earthRadius),a=w.clamp(a,1,2*
l.earthRadius);return w.acos(1-a*a/(2*l.earthRadius*l.earthRadius))},_addToLastPanActions:function(a,c,d){this._lastPanActionPtr=(this._lastPanActionPtr+1)%5;this._lastPanActions[this._lastPanActionPtr].time=a;b.set(c,this._lastPanActions[this._lastPanActionPtr].point);k.set(d,this._lastPanActions[this._lastPanActionPtr].pointScreen)},updatePlane:function(a,c){x.set4(c[0],c[1],c[2],-b.dot(c,a),this._plane)}})});