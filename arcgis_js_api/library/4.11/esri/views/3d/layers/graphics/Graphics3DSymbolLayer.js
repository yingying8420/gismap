// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/extendsHelper ../../../../Color ../../../../core/compilerUtils ../../../../core/Logger ../../../../core/mathUtils ../../../../core/scheduling ../../../../core/libs/gl-matrix-2/vec4f64 ./ElevationContext ./featureExpressionInfoUtils ./graphicUtils ./symbolComplexity ../../support/PromiseLightweight".split(" "),function(k,g,r,t,u,v,n,w,x,p,l,q,y,z){function h(e,b){e=null!=e?b.attributes[e]:0;return null!=e&&isFinite(e)?e:0}Object.defineProperty(g,"__esModule",
{value:!0});var e=new p,A=v.getLogger("esri.views.3d.layers.graphics.Graphics3DSymbolLayer");k=function(g){function b(a,d,b,m){var c=g.call(this)||this;c.complexity=null;c._elevationOptions={supportsOffsetAdjustment:!1,supportsOnTheGround:!0};c.symbol=a;c.symbolLayer=d;c._context=b;c._symbolLayerOrder=b.layerOrder;c._symbolLayerOrderDelta=b.layerOrderDelta;c._elevationContext=new p;c._material=null;c.complexity=c.computeComplexity();c._geometryCreationWarningHandle=null;c._updateDrivenProperties(m);
c._updateElevationContext();return c}r(b,g);b.prototype.getCachedSize=function(){return null};b.prototype._logWarning=function(a){A.warn(a)};b.prototype._logGeometryCreationWarnings=function(a,d,c,b){var m=this;if(null==this._geometryCreationWarningHandle){var e=a.geometryData&&a.geometryData.polygons;b+=" geometry failed to be created";var f=null;a.projectionSuccess?!d.length||1===d.length&&!d[0].length?f=b+" (no "+c+" were defined)":Array.isArray(d)&&Array.isArray(d[0])?d.some(function(a){return 1===
a.length})?f=b+" ("+c+" should contain at least 2 vertices)":e&&0===e.length&&"rings"===c&&(f=b+" (filled "+c+" should use clockwise winding - try reversing the order of vertices)"):f=b+" ("+c+" should be defined as a 2D array)":f=b+" (failed to project geometry to view spatial reference)";f&&(this._geometryCreationWarningHandle=w.schedule(function(){return m._onNextTick()}),this._logWarning(f))}};b.prototype._onNextTick=function(){this._geometryCreationWarningHandle=null};b.prototype._validateGeometry=
function(a){return"point"!==a.type||n.isFinite(a.x)&&n.isFinite(a.y)?!0:(this._logWarning("point coordinate is not a valid number, graphic skipped"),!1)};b.prototype._defaultElevationInfoNoZ=function(){return B};b.prototype._defaultElevationInfoZ=function(){return C};b.prototype._updateElevationContext=function(){this._elevationContext.setDefaults();var a=this._context.layer.elevationInfo;a&&this._elevationContext.mixinApi(a);(a=this.symbolLayer&&this.symbolLayer.elevationInfo)&&this._elevationContext.mixinApi(a);
this._elevationContext.featureExpressionInfoContext=this._context.featureExpressionInfoContext};b.prototype.getDefaultElevationInfo=function(a){return a.hasZ?this._defaultElevationInfoZ():this._defaultElevationInfoNoZ()};b.prototype.getGeometryElevationMode=function(a,d){void 0===d&&(d=this.getDefaultElevationInfo(a));return this._elevationContext.mode||d.mode};b.prototype.getGraphicElevationContext=function(a){var d=a.geometry,c=this.getDefaultElevationInfo(d);e.setUnit(null!=this._elevationContext.unit?
this._elevationContext.unit:c.unit);e.mode=this.getGeometryElevationMode(d,c);e.setOffsetMeters(null!=this._elevationContext.meterUnitOffset?this._elevationContext.meterUnitOffset:c.offset);e.featureExpressionInfoContext=this._elevationContext.featureExpressionInfoContext;this._elevationOptions.supportsOnTheGround||"on-the-ground"!==e.mode||(e.mode="relative-to-ground",e.setOffsetMeters(0),e.featureExpressionInfoContext=l.zeroContext);a=l.createFeature(a,this._context.layer);l.setContextFeature(e.featureExpressionInfoContext,
a);return e};b.prototype.prepareSymbolLayerPatch=function(a){};b.prototype.updateGeometry=function(a,d){return!1};b.prototype._getDrapedZ=function(){return-2};b.prototype._updateDrivenProperties=function(a){var d={color:!1,opacity:!1,size:!1};a||(a=this._context.renderer)&&"visualVariables"in a&&a.visualVariables&&a.visualVariables.forEach(function(a){switch(a.type){case "color":d.color=!0;if(a.stops)for(var b=0;b<a.stops.length;b++){var c=a.stops[b].color;c&&(Array.isArray(c)&&3<c.length&&255!==
c[3]||void 0!==c.a&&255!==c.a)&&(d.opacity=!0)}break;case "opacity":d.opacity=!0;break;case "size":d.size=!0}});this._drivenProperties=d};b.prototype._isPropertyDriven=function(a){return this._drivenProperties[a]};b.prototype._getLayerOpacity=function(){if(this._context.layerView&&"fullOpacity"in this._context.layerView)return this._context.layerView.fullOpacity;var a=this._context.layer.opacity;return null==a?1:a};b.prototype._getMaterialOpacity=function(){var a;a=1*this._getLayerOpacity();var b=
this.symbolLayer&&this.symbolLayer.material;b&&!this._isPropertyDriven("opacity")&&b.color&&(a*=b.color.a);return a};b.prototype._getMaterialOpacityAndColor=function(){var a=this.symbolLayer&&this.symbolLayer.material,b=this._getMaterialOpacity(),a=!this._isPropertyDriven("color")&&a&&a.color?t.toUnitRGB(a.color):null;return q.mixinColorAndOpacity(a,b)};b.prototype._getVertexOpacityAndColor=function(a,b,c){var d=this._isPropertyDriven("color")?a.color:null;a=this._isPropertyDriven("opacity")?a.opacity:
null;d=q.mixinColorAndOpacity(d,a);c&&(d[0]*=c,d[1]*=c,d[2]*=c,d[3]*=c);return b?new b(d):d};b.prototype._getStageIdHint=function(){return this._context.layer.id+"_symbol"};b.prototype.isFastUpdatesEnabled=function(){return this._fastUpdates&&this._fastUpdates.enabled};b.prototype.updateSymbolLayerOrder=function(a,b){this._symbolLayerOrder=a;this._symbolLayerOrderDelta=b};b.prototype.computeComplexity=function(){return y.defaultSymbolLayerComplexity(this.symbol,this.symbolLayer)};b.prototype.setDrawOrder=
function(a,b,c){this.updateSymbolLayerOrder(a,b);this._material&&(this._material.renderPriority=a,c.add(this._material.id))};b.prototype.destroy=function(){this._geometryCreationWarningHandle&&(this._geometryCreationWarningHandle.remove(),this._geometryCreationWarningHandle=null)};b.prototype.globalPropertyChanged=function(a,b,c){switch(a){case "opacity":return this.layerOpacityChanged();case "elevationInfo":return a=this._elevationContext.mode,this._updateElevationContext(),this.layerElevationInfoChanged(b,
c,a);case "slicePlaneEnabled":return this.slicePlaneEnabledChanged(b,c);case "pixelRatio":return this.pixelRatioChanged(b,c);default:return u.neverReachedSilent(a),!1}};b.prototype.updateGraphics3DGraphicElevationInfo=function(a,b,c){var d=this,e=!0;a.forEach(function(a){var f=b(a);f?(a=d.getGraphicElevationContext(a.graphic),f.needsElevationUpdates=c(a.mode),f.elevationContext.set(a)):e=!1});return e};b.prototype.applyRendererDiff=function(a,b){return!1};b.prototype.getFastUpdateAttrValues=function(a){if(!this._fastUpdates.enabled)return null;
var b=this._fastUpdates.visualVariables,c=b.size?h(b.size.field,a):0,e=b.color?h(b.color.field,a):0;a=b.opacity?h(b.opacity.field,a):0;return x.vec4f64.fromValues(c,e,a,0)};return b}(z.default);g.Graphics3DSymbolLayer=k;g.getAttributeValue=h;var B={mode:"on-the-ground",offset:0,unit:"meters"},C={mode:"absolute-height",offset:0,unit:"meters"};g.default=k});