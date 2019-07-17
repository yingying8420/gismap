// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define(["require","exports","./Graphics3DHighlightSet"],function(h,k,g){return function(){function a(){this.graphicsCore=null;this.highlights=[]}a.prototype.destroy=function(){this.highlights.forEach(function(b){return b.highlightSet.removeAll()});this.highlights=null};a.prototype.setup=function(b){this.graphicsCore=b};a.prototype.acquireSet=function(b,e){var c=this,a=new g(b,e);this.highlights.push(a);return{set:a,handle:{remove:function(){return c.releaseSet(a)},pause:function(){a.highlightSet.removeAll();
a.paused=!0},resume:function(){a.paused=!1;c.initializeSet(a)}}}};a.prototype.releaseSet=function(b){b.highlightSet.removeAll();b=this.highlights?this.highlights.indexOf(b):-1;-1!==b&&this.highlights.splice(b,1)};a.prototype.setUids=function(b,a){for(var e=this.graphicsCore.graphics3DGraphics,f=0;f<a.length;f++){var d=a[f];b.ids.add(d);(d=e.get(d))&&d.addHighlight(b.highlightSet,b.options)}};a.prototype.setObjectIds=function(b,a){a.forEach(function(a){return b.ids.add(a)});this.initializeSet(b)};
a.prototype.addGraphic=function(b){this.highlights.forEach(function(a){!a.paused&&a.hasGraphic(b)&&b.addHighlight(a.highlightSet,a.options)})};a.prototype.removeGraphic=function(b){this.highlights.forEach(function(a){a.hasGraphic(b)&&b.removeHighlight(a.highlightSet)})};a.prototype.allGraphicsDeleted=function(){this.highlights.forEach(function(a){return a.highlightSet.removeAll()})};a.prototype.initializeSet=function(a){var b=this.graphicsCore.graphics3DGraphics;a.objectIdField?b.forEach(function(b){b&&
a.hasGraphic(b)&&b.addHighlight(a.highlightSet,a.options)}):a.ids.forEach(function(c){(c=b.get(c))&&c.addHighlight(a.highlightSet,a.options)})};return a}()});