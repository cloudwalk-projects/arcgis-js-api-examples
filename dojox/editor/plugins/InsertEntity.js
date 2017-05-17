//>>built
define("dojo dijit dojox dijit/_editor/_Plugin dijit/TooltipDialog dijit/form/DropDownButton dojo/_base/connect dojo/_base/declare dojo/i18n dojox/html/entities dojox/editor/plugins/EntityPalette dojo/i18n!dojox/editor/plugins/nls/InsertEntity".split(" "),function(c,d,b,f){var e=c.declare("dojox.editor.plugins.InsertEntity",f,{iconClassPrefix:"dijitAdditionalEditorIcon",_initButton:function(){this.dropDown=new b.editor.plugins.EntityPalette({showCode:this.showCode,showEntityName:this.showEntityName});
this.connect(this.dropDown,"onChange",function(a){this.button.closeDropDown();this.editor.focus();this.editor.execCommand("inserthtml",a)});var a=c.i18n.getLocalization("dojox.editor.plugins","InsertEntity");this.button=new d.form.DropDownButton({label:a.insertEntity,showLabel:!1,iconClass:this.iconClassPrefix+" "+this.iconClassPrefix+"InsertEntity",tabIndex:"-1",dropDown:this.dropDown})},updateState:function(){this.button.set("disabled",this.get("disabled"))},setEditor:function(a){this.editor=a;
this._initButton();this.editor.addKeyHandler("s",!0,!0,c.hitch(this,function(){this.button.openDropDown();this.dropDown.focus()}));a.contentPreFilters.push(this._preFilterEntities);a.contentPostFilters.push(this._postFilterEntities)},_preFilterEntities:function(a){return b.html.entities.decode(a,b.html.entities.latin)},_postFilterEntities:function(a){return b.html.entities.encode(a,b.html.entities.latin)}});c.subscribe(d._scopeName+".Editor.getPlugin",null,function(a){if(!a.plugin&&"insertentity"===
(a.args.name?a.args.name.toLowerCase():""))a.plugin=new e({showCode:"showCode"in a.args?a.args.showCode:!1,showEntityName:"showEntityName"in a.args?a.args.showEntityName:!1})});return e});