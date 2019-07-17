// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../../core/compilerUtils ../../core/Error ../HeightModelInfo ../../layers/support/arcgisLayerUrl".split(" "),function(v,f,l,g,k,r){function t(a,c,b){if(!h(a)||!h(c))return 4;if(null==a||null==c)return 0;if(!b&&a.heightUnit!==c.heightUnit)return 1;if(a.heightModel!==c.heightModel)return 2;switch(a.heightModel){case "gravity-related-height":return 0;case "ellipsoidal":return a.vertCRS===c.vertCRS?0:3;default:return 4}}function h(a){return null==a||null!=a.heightModel&&null!=
a.heightUnit}function m(a){var c=a.url&&r.parse(a.url);return(null!=(a.spatialReference&&a.spatialReference.vcsWkid)||!c||"ImageServer"!==c.serverType)&&"heightModelInfo"in a&&a.heightModelInfo?a.heightModelInfo:n(a)?k.deriveUnitFromSR(u,a.spatialReference):null}function p(a){if(!("capabilities"in a))return!1;switch(a.type){case "feature":case "csv":case "stream":case "geojson":return!0;case "map-image":case "imagery":case "tile":case "vector-tile":case null:return!1;default:return l.neverReached(a),
!1}}function n(a){return p(a)?!!(a.capabilities&&a.capabilities.data&&a.capabilities.data.supportsZ):q(a)}function q(a){switch(a.type){case "building-scene":case "elevation":case "integrated-mesh":case "point-cloud":case "scene":return!0;case "base-dynamic":case "base-elevation":case "base-tile":case "bing-maps":case "csv":case "geojson":case "feature":case "geo-rss":case "graphics":case "group":case "imagery":case "kml":case "map-image":case "map-notes":case "open-street-map":case "stream":case "tile":case "unknown":case "unsupported":case "vector-tile":case "web-tile":case "wms":case "wmts":case null:break;
default:l.neverReached(a)}return!1}Object.defineProperty(f,"__esModule",{value:!0});f.validateWebSceneError=function(a,c){if(!a)return null;if(!h(a))return new g("webscene:unsupported-height-model-info","The vertical coordinate system of the scene is not supported",{heightModelInfo:a});var b=a.heightUnit;a=k.deriveUnitFromSR(a,c).heightUnit;return b!==a?new g("webscene:incompatible-height-unit","The vertical units of the scene ("+b+") must match the horizontal units of the scene ("+a+")",{verticalUnit:b,
horizontalUnit:a}):null};f.rejectLayerError=function(a,c,b){var d=m(a),f=t(d,c,b),e=null;if(d){var h=k.deriveUnitFromSR(d,a.spatialReference).heightUnit;b||h===d.heightUnit||(e=new g("layerview:unmatched-height-unit","The vertical units of the layer must match the horizontal units ("+h+")",{horizontalUnit:h}))}if(!("heightModelInfo"in a&&null!=a.heightModelInfo||null!=a.spatialReference)&&n(a)||4===f||e)return new g("layerview:unsupported-height-model-info","The vertical coordinate system of the layer is not supported",
{heightModelInfo:d,error:e});e=null;switch(f){case 1:a=d.heightUnit||"unknown";b=c.heightUnit||"unknown";e=new g("layerview:incompatible-height-unit","The vertical units of the layer ("+a+") must match the vertical units of the scene ("+b+")",{layerUnit:a,sceneUnit:b});break;case 2:a=d.heightModel||"unknown";b=c.heightModel||"unknown";e=new g("layerview:incompatible-height-model","The height model of the layer ("+a+") must match the height model of the scene ("+b+")",{layerHeightModel:a,sceneHeightModel:b});
break;case 3:a=d.vertCRS||"unknown",b=c.vertCRS||"unknown",e=new g("layerview:incompatible-vertical-datum","The vertical datum of the layer ("+a+") must match the vertical datum of the scene ("+b+")",{layerDatum:a,sceneDatum:b})}return e?new g("layerview:incompatible-height-model-info","The vertical coordinate system of the layer is incompatible with the scene",{layerHeightModelInfo:d,sceneHeightModelInfo:c,error:e}):null};f.deriveHeightModelInfoFromLayer=m;f.mayHaveHeightModelInfo=function(a){return null!=
a.layers||q(a)||p(a)||"heightModelInfo"in a};var u=new k({heightModel:"gravity-related-height"})});