//>>built
define(["./_base","dojo/_base/lang","./matrix"],function(w,y,b){function n(b){var f=Math.cos(b);b=Math.sin(b);var c={x:f+4/3*(1-f),y:b-4/3*f*(1-f)/b};return{s:{x:f,y:-b},c1:{x:c.x,y:-c.y},c2:c,e:{x:f,y:b}}}var p=2*Math.PI,s=Math.PI/4,q=Math.PI/8,x=s+q,t=n(q);return w.arc={unitArcAsBezier:n,curvePI4:t,arcAsBezier:function(g,f,c,a,h,l,k,e){h=Boolean(h);l=Boolean(l);var m=b._degToRad(a);a=f*f;var r=c*c,d=b.multiplyPoint(b.rotate(-m),{x:(g.x-k)/2,y:(g.y-e)/2}),u=d.x*d.x,v=d.y*d.y;a=Math.sqrt((a*r-a*v-
r*u)/(a*v+r*u));isNaN(a)&&(a=0);a={x:a*f*d.y/c,y:-a*c*d.x/f};h==l&&(a={x:-a.x,y:-a.y});a=b.multiplyPoint([b.translate((g.x+k)/2,(g.y+e)/2),b.rotate(m)],a);f=b.normalize([b.translate(a.x,a.y),b.rotate(m),b.scale(f,c)]);a=b.invert(f);g=b.multiplyPoint(a,g);e=b.multiplyPoint(a,k,e);k=Math.atan2(g.y,g.x);e=Math.atan2(e.y,e.x);a=k-e;l&&(a=-a);0>a?a+=p:a>p&&(a-=p);c=q;e=t;c=l?c:-c;g=[];for(h=a;0<h;h-=s)h<x&&(c=h/2,e=n(c),c=l?c:-c,h=0),d=b.normalize([f,b.rotate(k+c)]),l?(a=b.multiplyPoint(d,e.c1),m=b.multiplyPoint(d,
e.c2),d=b.multiplyPoint(d,e.e)):(a=b.multiplyPoint(d,e.c2),m=b.multiplyPoint(d,e.c1),d=b.multiplyPoint(d,e.s)),g.push([a.x,a.y,m.x,m.y,d.x,d.y]),k+=2*c;return g}}});