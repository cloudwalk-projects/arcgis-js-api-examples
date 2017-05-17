//>>built
define("dojo/_base/declare dojo/Deferred dojo/when dojo/store/util/QueryResults dojo/_base/lang dojo/promise/all".split(" "),function(s,t,l,u,q,m){function r(a){return a&&q.mixin(a,JSON.parse(a.__extra))}var v=/(.*)\*$/;return s([],{constructor:function(a){var d=a.dbConfig;this.database=openDatabase(a.dbName||"dojo-db","1.0","dojo-db",4194304);var f=this.indexPrefix=a.indexPrefix||"idx_",e=a.table||a.storeName;this.table=(a.table||a.storeName).replace(/[^\w]/g,"_");a=[];this.indices=d.stores[e];this.repeatingIndices=
{};for(var b in this.indices)this.indices[b].multiEntry&&(this.repeatingIndices[b]=!0);if(!d.available){for(e in d.stores){var g=d.stores[e],h=e.replace(/[^\w]/g,"_"),k=g[this.idProperty],c=["__extra",this.idProperty+" "+(k&&k.autoIncrement?"INTEGER PRIMARY KEY AUTOINCREMENT":"PRIMARY KEY")],k=[this.idProperty];for(b in g)b!=this.idProperty&&c.push(b);a.push(this.executeSql("CREATE TABLE IF NOT EXISTS "+h+" ("+c.join(",")+")"));for(b in g)b!=this.idProperty&&(g[b].multiEntry?(k.push(b),c=h+"_repeating_"+
b,a.push(this.executeSql("CREATE TABLE IF NOT EXISTS "+c+" (id,value)")),a.push(this.executeSql("CREATE INDEX IF NOT EXISTS idx_"+c+"_id ON "+c+"(id)")),a.push(this.executeSql("CREATE INDEX IF NOT EXISTS idx_"+c+"_value ON "+c+"(value)"))):(a.push(this.executeSql("ALTER TABLE "+h+" ADD "+b).then(null,function(){})),!1!==g[b].indexed&&a.push(this.executeSql("CREATE INDEX IF NOT EXISTS "+f+h+"_"+b+" ON "+h+"("+b+")"))))}d.available=m(a)}this.available=d.available},idProperty:"id",selectColumns:["*"],
get:function(a){return l(this.executeSql("SELECT "+this.selectColumns.join(",")+" FROM "+this.table+" WHERE "+this.idProperty+"\x3d?",[a]),function(a){return 0<a.rows.length?r(a.rows.item(0)):void 0})},getIdentity:function(a){return a[this.idProperty]},remove:function(a){return this.executeSql("DELETE FROM "+this.table+" WHERE "+this.idProperty+"\x3d?",[a])},identifyGeneratedKey:!0,add:function(a,d){var f=[],e=[],b=[],g={},h=[],k=this,c;for(c in a)a.hasOwnProperty(c)&&(c in this.indices||c==this.idProperty?
this.repeatingIndices[c]?h.push(function(b){return m(a[c].map(function(a){return k.executeSql("INSERT INTO "+k.table+"_repeating_"+c+" (value, id) VALUES (?, ?)",[a,b])}))}):(b.push(c),e.push("?"),f.push(a[c])):g[c]=a[c]);b.push("__extra");e.push("?");f.push(JSON.stringify(g));var n=this.idProperty;this.identifyGeneratedKey&&(f.idColumn=n);e="INSERT INTO "+this.table+" ("+b.join(",")+") VALUES ("+e.join(",")+")";return l(this.executeSql(e,f),function(c){var b=c.insertId;a[n]=b;return m(h.map(function(a){return a(b)})).then(function(){return b})})},
put:function(a,d){d=d||{};var f=d.id||a[this.idProperty],e=d.overwrite;if(void 0===e){var b=this;return this.get(f).then(function(c){return(d.overwrite=!!c)?(d.overwrite=!0,b.put(a,d)):b.add(a,d)})}if(!e)return b.add(a,d);var e="UPDATE "+this.table+" SET ",g=[],h=[],k={},c;for(c in a)if(a.hasOwnProperty(c))if(c in this.indices||c==this.idProperty)if(this.repeatingIndices[c]){this.executeSql("DELETE FROM "+this.table+"_repeating_"+c+" WHERE id\x3d?",[f]);for(var n=a[c],p=0;p<n.length;p++)this.executeSql("INSERT INTO "+
this.table+"_repeating_"+c+" (value, id) VALUES (?, ?)",[n[p],f])}else h.push(c+"\x3d?"),g.push(a[c]);else k[c]=a[c];h.push("__extra\x3d?");g.push(JSON.stringify(k));e+=h.join(",")+" WHERE "+this.idProperty+"\x3d?";g.push(a[this.idProperty]);return l(this.executeSql(e,g),function(a){return f})},query:function(a,d){function f(a){var c=[],b;for(b in a){var d=a[b],e=function(a){var b=a&&a.match&&a.match(v);if(b)return k.push(b[1]+"%")," LIKE ?";k.push(a);return"\x3d?"};if(d)if(d.contains){var f=g.table+
"_repeating_"+b;c.push(d.contains.map(function(a){return g.idProperty+" IN (SELECT id FROM "+f+" WHERE value"+e(a)+")"}).join(" AND "));continue}else if("object"==typeof d&&("from"in d||"to"in d)){var l=d.excludeFrom?"\x3e":"\x3e\x3d",m=d.excludeTo?"\x3c":"\x3c\x3d";"from"in d?(k.push(d.from),"to"in d?(k.push(d.to),c.push("("+h+"."+b+l+"? AND "+h+"."+b+m+"?)")):c.push(h+"."+b+l+"?")):(k.push(d.to),c.push(h+"."+b+m+"?"));continue}c.push(h+"."+b+e(d))}return c.join(" AND ")}d=d||{};var e="FROM "+this.table,
b,g=this,h=this.table,k=[];a.forEach?(b=a.map(f).join(") OR ("))&&(b="("+b+")"):b=f(a);b&&(b=" WHERE "+b);d.sort&&(b+=" ORDER BY "+d.sort.map(function(a){return h+"."+a.attribute+" "+(a.descending?"desc":"asc")}));var c=b;d.count&&(c+=" LIMIT "+d.count);d.start&&(c+=" OFFSET "+d.start);c=q.delegate(this.executeSql("SELECT * "+e+c,k).then(function(a){for(var b=[],c=0;c<a.rows.length;c++)b.push(r(a.rows.item(c)));return b}));g=this;c.total={then:function(a,c){return g.executeSql("SELECT COUNT(*) "+
e+b,k).then(function(a){return a.rows.item(0)["COUNT(*)"]}).then(a,c)}};return new u(c)},executeSql:function(a,d){var f=new t,e,b;this.database.transaction(function(g){g.executeSql(a,d,function(a,b){f.resolve(e=b)},function(a,d){f.reject(b=d)})});if(e)return e;if(b)throw b;return f.promise}})});