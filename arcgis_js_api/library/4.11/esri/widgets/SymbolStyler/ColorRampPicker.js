// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/widgets/SymbolStyler/templates/ColorRampPicker.html":'\x3cdiv\x3e\r\n  \x3cdiv class\x3d"${css.container}"\x3e\r\n    \x3cdiv class\x3d"${css.preview} ${css.item}"\r\n         data-dojo-attach-point\x3d"dap_previewRamp"\x3e\x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"dap_colorFlipper" tabindex\x3d"0"\r\n         class\x3d"${css.flipper}"\x3e\r\n      \x3cspan aria-hidden\x3d"true" class\x3d"${css.flipIcon}" title\x3d"${labels.flipColorsTooltip}"\x3e\x3c/span\x3e\r\n      \x3cspan class\x3d"${css.text}"\x3e${labels.flipColorsTooltip}\x3c/span\x3e\r\n      \x3cspan\x3e\x3c/span\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv class\x3d"${css.container}"\x3e\r\n    \x3cdiv class\x3d"${css.viewport}"\x3e\r\n      \x3cdiv data-dojo-attach-point\x3d"dap_colorRampPicker"\r\n           class\x3d"${css.list}"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e\r\n\r\n'}});
define("./_DelayedUpdate ./support/colorRampUtils ./support/schemeUtils @dojo/framework/shim/array dijit/_TemplatedMixin dijit/_WidgetBase dijit/_WidgetsInTemplateMixin dijit/a11yclick dojo/dom-construct dojo/dom-style dojo/on dojo/i18n!./nls/SymbolStyler dojo/text!./templates/ColorRampPicker.html dojo/NodeList-dom dijit/form/Button".split(" "),function(n,e,h,p,q,r,t,l,m,g,k,u,v){var d={root:"esri-color-ramp-picker",item:"esri-item",text:"esri-icon-font-fallback-text",selected:"esri-selected",container:"esri-container",
list:"esri-list",preview:"esri-preview",flipper:"esri-flipper",flipIcon:"esri-icon-up-down-arrows",viewport:"esri-viewport"};return r.createSubclass([q,t,n],{baseClass:d.root,declaredClass:"esri.widgets.SymbolStyler.ColorRampPicker",templateString:v,labels:u,css:d,constructor:function(){this._colorRampSurfaces=[];this._commitPropsTrigger=this.createUpdateTrigger(this._commitProperties,this)},postCreate:function(){this.inherited(arguments);this._addHandlers()},destroy:function(){this.inherited(arguments);
this._colorRampSurfaces.forEach(function(a){a.destroy()});this._previewRampSurface&&this._previewRampSurface.destroy()},_schemesChanged:!1,_selectedChanged:!1,_numStopsChanged:!1,_orientationChanged:!1,_commitPropsTrigger:null,_colorRampSurfaces:null,_previewRampSurface:null,_rampsAndSchemes:null,numStops:0,_setNumStopsAttr:function(a){this._numStopsChanged=!0;this._set("numStops",0<a?a:0);this._buildRampsAndSchemes();this._commitPropsTrigger()},schemes:null,_setSchemesAttr:function(a){this._schemesChanged=
!0;this._set("schemes",a);this._buildRampsAndSchemes();this._commitPropsTrigger()},selected:null,_getSelectedAttr:function(){return{colors:h.createColors(this.selected.colors)}},_setSelectedAttr:function(a){Array.isArray(a)&&(a={colors:a});a.colors||(a.colors=this._rampsAndSchemes[0].colors);this._selectedChanged=!0;this._set("selected",a);this._commitPropsTrigger();this.emit("color-ramp-change",this.get("selected"))},flipColors:function(){var a=this._rampsAndSchemes,b=this.selected;-1===this._getSuggestions().indexOf(b.colors)&&
b.colors.reverse();a.forEach(function(a){h.flipColors(a.scheme)});this._orientationChanged=!0;this.set("selected",b);this._commitPropsTrigger()},_buildRampsAndSchemes:function(){this.schemes&&(this._rampsAndSchemes=h.getColorRampsWithSchemes(this.schemes,this.numStops))},_commitProperties:function(){var a,b;if(this._schemesChanged||this._numStopsChanged)this._numStopsChanged=this._schemesChanged=!1,a=this._rampsAndSchemes,b=this._hasStops(),m.empty(this.dap_colorRampPicker),this._colorRampSurfaces=
[],a.forEach(function(a){this._createColorRampItem({colors:a.colors,hasStops:b})},this),this._renderSuggestions();this._selectedChanged&&(this._selectedChanged=!1,this._renderSelected());this._orientationChanged&&(this._orientationChanged=!1,this._renderSelected(),this._renderSuggestions());this.selected||this.set("selected",this._rampsAndSchemes[0])},_hasStops:function(){return 0<this.numStops},_createColorRampItem:function(a){var b=a.colors;a=a.numClasses;var c=m.create("div",{className:d.item,
tabIndex:0},this.dap_colorRampPicker),w=g.get(c,"height")||70,f=g.get(c,"width")||20,b=e.createColorRamp({node:c,width:f,height:w,colors:b,numClasses:a});this._colorRampSurfaces.push(b)},_renderSuggestions:function(){var a=this._colorRampSurfaces,b=this._rampsAndSchemes,c=this._hasStops();a.forEach(function(a,f){e.updateColorRamp({ramp:a,colors:b[f].colors,hasStops:c})})},_renderSelected:function(){var a=this.selected.colors,b=this.dap_previewRamp,c=g.get(b,"height")||180,d=g.get(b,"width")||20,f=
this._hasStops();this._previewRampSurface?e.updateColorRamp({ramp:this._previewRampSurface,colors:a,hasStops:f}):this._previewRampSurface=e.createColorRamp({node:b,height:c,width:d,colors:a,hasStops:f})},_getSuggestions:function(){return this._rampsAndSchemes.map(function(a){return a.colors})},_addHandlers:function(){var a=this;this.own(k(this.dap_colorRampPicker,k.selector("."+d.item,l),function(){a._rampClickHandler.call(this,a)}));this.own(k(this.dap_colorFlipper,l,function(){this.flipColors()}.bind(this)))},
_rampClickHandler:function(a){var b=d.selected,c=p.from(a.dap_colorRampPicker.getElementsByClassName(d.item)),e=c.indexOf(this);c.forEach(function(a){a.classList.remove(b)});this.classList.add(b);a.set("selected",a._rampsAndSchemes[e])}})});