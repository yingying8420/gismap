// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define(["require","exports"],function(d,a){Object.defineProperty(a,"__esModule",{value:!0});var b="blur change click dblclick focus input keydown keypress keyup load mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup mousewheel scroll submit touchcancel touchend touchmove touchstart".split(" ");a.domEvents=function(c){var a={};b.forEach(function(b){a["on"+b]=function(a){c.emit.call(c,b,a)}});return a};a.isVNodeEvent=function(a){return!!b[a]}});