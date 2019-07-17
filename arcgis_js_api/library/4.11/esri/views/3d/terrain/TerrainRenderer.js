// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/extendsHelper ../../../core/tsSupport/assignHelper ../../../Color ../../../core/maybe ../../../core/ObjectPool ../../../core/PooledArray ../../../core/promiseUtils ../../../core/libs/gl-matrix-2/mat4f64 ../../../core/libs/gl-matrix-2/vec2f64 ../../../core/libs/gl-matrix-2/vec3 ../../../core/libs/gl-matrix-2/vec3f64 ../../../core/libs/gl-matrix-2/vec4 ../../../core/libs/gl-matrix-2/vec4f64 ../../../geometry/support/aaBoundingBox ../support/imageUtils ./ResourceCounter ./TerrainConst ./TileGeometryFactory ./TileRenderData ./TileRenderer ./tileUtils ../webgl-engine/lib/glUtil3D ../webgl-engine/lib/intersectorUtils ../webgl-engine/lib/screenSizePerspectiveUtils ../webgl-engine/lib/tracer ../webgl-engine/lib/Util ../webgl-engine/materials/internal/MaterialUtil ../webgl-engine/shaders/TerrainRendererPrograms ../../webgl/renderState ../../webgl/Util".split(" "),
function(N,qa,ra,V,W,X,O,D,H,Y,Z,t,l,P,E,I,aa,ba,z,ca,da,ea,p,fa,Q,ga,J,ha,A,q,m,R){var ia=ha.assert,S=Y.mat4f64.create(),T=l.vec3f64.create(),K=Z.vec2f64.create(),L=I.create(),w=E.vec4f64.create(),C=E.vec4f64.create(),U=E.vec4f64.create(),ja=function(){return function(){this.extent=E.vec4f64.create();this.maxLevel=this.minLevel=0;this.callback=null}}();N=function(){function c(a,b){this._memCache=b;this.tileSize=256;this.initialized=!1;this.rctx=null;this.renderDataPool=new O(da.TileRenderData);this.perOriginTileData=
new D({allocator:function(a){return a||{root:null,origin:null,tiles:new D}},deallocator:function(a){a.root=null;a.origin=null;a.tiles.clear();return a}});this.perOriginTileDataDirty=!0;this.perOriginTileDataMap=new Map;this.tileIterator=new p.IteratorPreorder;this._highestVisibleLODTile=null;this.visible=!0;this.debugScreenSizePerspective=!1;this.wireframe=A.copyParameters(ka);this._opaque=!0;this._skirtScale=1;this._cullBackFaces=this._disableRendering=this._drawBorders=!1;this._renderOrder=z.RenderOrder.FRONT_TO_BACK;
this._velvetOverground=!0;this._slicePlaneEnabled=this._hasOverlays=!1;this.castShadows=!0;this.receiveShadows=!1;this.backgroundPromise=this.tileRenderer=this.emptyTex=null;this.tileBackgroundInitialized=!1;this.stencilEnabledLayerExtents=[];this.numOriginsRendered=this.numTilesCulled=this.numTilesRendered=this.numTrianglesRendered=0;this.resourceCounter=new ba;this.loaded=this.clippingExtent=null;this._loaded=!1;this.needsRender=!0;this.needsHighlight=this.didRender=!1;this.visibleScaleRangeQueries=
new D({initialSize:10});this.visibleScaleRangeQueriesInvPtr=0;this.visibleScaleRangeQueryQueue=new D({initialSize:30});this.visibleScaleRangeQueryPool=new O(ja,!1);this.manifold=a}c.prototype.destroy=function(a){this.uninstall(a);this.backgroundPromise&&(this.backgroundPromise.cancel(),this.backgroundPromise=null);ca.clearCaches()};c.prototype.install=function(a){a.addRenderPlugin([3,8],this);this.drapedRenderer=a.getDrapedRenderer()};c.prototype.uninstall=function(a){a.removeRenderPlugin(this)};
Object.defineProperty(c.prototype,"disableRendering",{set:function(a){this._disableRendering=!!a;this.setNeedsRender()},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"opaque",{set:function(a){this._opaque=a;this.setNeedsRender()},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"skirtScale",{set:function(a){this._skirtScale=a;this.setNeedsRender()},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"drawBorders",{set:function(a){this._drawBorders!==
a&&(this._drawBorders=a,this._updatePrograms())},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"cullBackFaces",{set:function(a){this._cullBackFaces=a;this._updatePrograms();this.setNeedsRender()},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"renderOrder",{get:function(){return this._renderOrder},set:function(a){this._renderOrder=a;this.setNeedsRender()},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"velvetOverground",{set:function(a){this._velvetOverground!==
a&&(this._velvetOverground=a,this._updatePrograms())},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"intersectionHandlerId",{get:function(){return Q.TERRAIN_ID},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"slicePlaneEnabled",{get:function(){return this._slicePlaneEnabled},set:function(a){this._slicePlaneEnabled!==a&&(this._slicePlaneEnabled=a,this._updatePrograms())},enumerable:!0,configurable:!0});c.prototype.setRootTiles=function(a){this.rootTiles=a;this.setNeedsRender()};
c.prototype.setNeedsHighlight=function(a){this.needsHighlight=a;this.setNeedsRender()};c.prototype.setStencilEnabledLayerExtents=function(a){this.stencilEnabledLayerExtents=a;this.setNeedsRender()};c.prototype.setTileSize=function(a){this.tileSize=a;this.tileRenderer&&(this.tileRenderer.tileSize=a);this.setNeedsRender()};c.prototype.loadCachedElevationData=function(a){ia(null===a.renderData);var b=p.tile2str(a);if(b=this._memCache.pop(b)){a.renderData=b.renderData;a.renderData.tile=a;a.renderData.localOrigin=
this._getLocalOriginOfTile(a);for(var d in b.upsampleLIJs){var e=p.findParentByLIJ(a,b.upsampleLIJs[d]);a.layerInfo[z.LayerClass.ELEVATION][d].setUpsampleInfo(a,e)}}return null!=b};c.prototype.loadTile=function(a){a.renderData||(a.renderData=this.renderDataPool.acquire(),a.renderData.init(a),a.renderData.localOrigin=this._getLocalOriginOfTile(a),this.updateTileGeometry(a));this.tileBackgroundInitialized&&this.tileRenderer.updateTileTexture(a)};c.prototype.queryVisibleLevelRange=function(a,b,d,e){var f=
this.visibleScaleRangeQueryPool.acquire();P.vec4.copy(f.extent,a);f.minLevel=b?b:-Number.MAX_VALUE;f.maxLevel=null!=d?d:Number.MAX_VALUE;f.callback=e;this.visibleScaleRangeQueryQueue.push(f);this.setNeedsRender()};c.prototype.updateTileTexture=function(a){this.tileRenderer&&this.tileBackgroundInitialized&&this.tileRenderer.updateTileTexture(a)};c.prototype.updateTileGeometry=function(a){for(var b=0,d=a.layerInfo[z.LayerClass.ELEVATION];b<d.length;b++)d[b].pendingUpdates&=~z.TileUpdate.GEOMETRY;a.renderData.updateGeometry(this.rctx,
"debug"===this.wireframe.mode)&&this.setNeedsRender()};c.prototype.unloadTile=function(a,b){if(a.renderData){a.renderData.releaseTexture();if(b){b={renderData:a.renderData,upsampleLIJs:[]};for(var d=0,e=a.layerInfo[z.LayerClass.ELEVATION];d<e.length;d++){var f=e[d].upsampleFromTile.tile.lij;b.upsampleLIJs.push([f[0],f[1],f[2]])}this._memCache.put(p.tile2str(a),b,a.renderData.estimatedGeometryMemoryUsage)}else this.releaseTileGeometry(a.renderData);a.renderData=null;a.updateMemoryUsed()}};c.prototype._getLocalOriginOfTile=
function(a){var b=Math.max(0,7*Math.floor((a.lij[0]-3)/7));if("spherical"===this.manifold&&0===b)return T;for(;a.parent&&a.lij[0]>b;)a=a.parent;return a.centerAtSeaLevel};c.prototype.setVisibility=function(a){this.visible=a;this.setNeedsRender()};c.prototype.getStats=function(){return{numTilesRendered:this.numTilesRendered,numTilesCulled:this.numTilesCulled,numTrianglesRendered:this.numTrianglesRendered,numOriginsRendered:this.numOriginsRendered}};c.prototype.getWireframeEnabled=function(){return"shader"===
this.wireframe.mode};c.prototype.setDebugScreenSizePerspective=function(a){a!==this.debugScreenSizePerspective&&(this.debugScreenSizePerspective=a,this._updatePrograms())};c.prototype.setWireframe=function(a){var b=this;if(!1===a||!0===a)a={mode:a?"shader":"none"};var d=this.wireframe;if(void 0!==a.mode&&d.mode!==a.mode){var e="debug"===d.mode,f="debug"===a.mode;d.mode=a.mode;this._updatePrograms();e!==f&&this.rootTiles&&(p.traverseTilesPreorder(this.rootTiles,function(a){a.renderData&&a.renderData.updateGeometry(b.rctx,
f)}),this.setNeedsRender())}for(var c in a)d.hasOwnProperty(c)&&(d[c]=a[c]),this.setNeedsRender();d.resolution&&(d.resolution=Math.min(d.resolution,this.tileSize),d.resolution=1<<Math.round(Math.log(d.resolution)/Math.LN2))};c.prototype.setNeedsRender=function(){this.needsRender=!0;this.didRender=!1;this.perOriginTileDataDirty=!0};c.prototype.resetNeedsRender=function(){this.didRender&&(this.needsRender=0!==this.visibleScaleRangeQueryQueue.length,this.didRender=!1)};c.prototype.isOpaqueExcludingSlice=
function(){var a=this.wireframe,a="shader"===a.mode&&(1>a.wireOpacity||1>a.surfaceOpacity);return this._opaque&&!a};c.prototype.isOpaque=function(){return this.isOpaqueExcludingSlice()&&!this._slicePlaneEnabled};c.prototype.updateTileBackground=function(a){this.backgroundPromise&&this.backgroundPromise.cancel();this.backgroundPromise="string"===typeof a?aa.requestImage(a).catch(function(){return null}):null!=a?H.resolve(W.toUnitRGBA(a)):H.resolve(null);this._renderTileBackground()};c.prototype.initializeRenderContext=
function(a){var b=this,d=this.rctx=a.rctx;a=this.programRep=a.programRep;var e=function(a){H.when(a).then(function(){b.initialized=!0;b.setNeedsRender()}).catch(e)};e(this._renderTileBackground());this._updatePrograms();this.tileRenderer=new ea(d,this.tileSize,a,this.resourceCounter,function(){return b.setNeedsRender()});this._renderTileBackground();this.emptyTex=fa.createEmptyTexture(d)};c.prototype.uninitializeRenderContext=function(a){null!=this.emptyTex&&(this.emptyTex.dispose(),this.emptyTex=
null);this.tileRenderer&&(this.tileRenderer.dispose(),this.tileRenderer=null)};c.prototype.render=function(a){var b=a.rctx;if(!this.initialized||this._disableRendering||!this.visible||!this.rootTiles||!this.tileBackgroundInitialized)return!1;var d=this.isOpaque()?3:8;if(a.slot!==d)return!1;J.trace("# BEGIN RENDER TERRAIN");var d=a.pass,e=1===a.lightingData.helper.globalFactor;0===d?this._renderMaterialPass(a,this._updatePerOriginTileData()):3===d&&this.castShadows&&e?this._renderDepthPass(a,this.programs.depthShadowMap,
this._updatePerOriginTileData()):1===d?this._renderDepthPass(a,this.programs.depth,this._updatePerOriginTileData()):2===d?this._renderNormalPass(a,this._updatePerOriginTileData()):4===d&&this.needsHighlight&&(this._renderHighlightPass(a,this._updatePerOriginTileData()),b.clearSafe(256));J.trace("# END RENDER TERRAIN");return!0};c.prototype.intersect=function(a,b,d,e,f){if(this.rootTiles&&(!a.enable.selectOpaqueTerrainOnly||!a.enable.selectionMode||this.isOpaqueExcludingSlice())){var c=la,h=ma;t.vec3.subtract(c,
e,d);t.vec3.set(h,1/c[0],1/c[1],1/c[2]);var n=a.results.min,M=a.results.max,u=a.results.terrain,k=null,l=this.clippingExtent,v=this.tileIterator;v.reset(this.rootTiles);f=function(){var f=v.next();if(null===f.renderData)return"continue";if(a.enable.invisibleTerrain){if(!f.visible&&l&&!f.intersectsExtent(l))return"continue"}else if(!f.visible)return"continue";var g=f.renderData.geometryInfo,x=-r._skirtScale*g.skirtLength;if(0!==x){var y=f.tileUp;I.offset(g.boundingBox,x*y[0],x*y[1],x*y[2],L);I.expandWithBuffer(L,
g.boundingBox,0,2)}var y=0===x?g.boundingBox:L,B=f.renderData.localOrigin;t.vec3.subtract(F,d,B);if(!A.intersectAabbInvDir(y,F,h,a.tolerance))return"continue";var q=function(a,b,d,e){a.set(void 0,p.tile2str(b),d,e,S,void 0);a.intersector=na;a.target=oa},y=function(g,h,r){0<=g&&(a.enable.backfacesTerrain||0>t.vec3.dot(h,c))&&(a.enable.invisibleTerrain||!a.enable.selectionMode||null==b||b(d,e,g))&&((null==u.dist||g<u.dist)&&q(u,f,g,h),a.enable.storeTerrainResults&&(a.enable.storeAll&&(X.isNone(k)?(k=
new Q.IntersectorResult(a.ray),q(k,f,g,h),a.results.all.push(k)):g<k.dist&&q(k,f,g,h)),(null==n.dist||g<n.dist)&&q(n,f,g,h),(null==M.dist||g>M.dist)&&q(M,f,g,h)))},m=pa;t.vec3.subtract(m,e,B);var B=g.indices,w={data:g.vertexAttributes,size:3,offsetIdx:0,strideIdx:z.GEOMETRY_VERTEX_STRIDE},g=g.numWithoutSkirtIndices/3;A.intersectTriangles(F,m,0,g,B,w,null,y);0!==x&&p.intersectSkirts(F,m,g,B.length/3,B,w,null,"spherical"===r.manifold?function(a){return t.vec3.scale(a,a,x/t.vec3.length(a))}:function(a){return t.vec3.set(a,
0,0,x)},y)};for(var r=this;!v.done;)f()}};c.prototype._renderTileBackground=function(){var a=this;if(this.rctx&&this.backgroundPromise&&this.tileRenderer)return this.backgroundPromise.then(function(b){a.tileRenderer&&(a.tileBackgroundInitialized=!0,a.tileRenderer.setBackground(b),a.rootTiles&&p.traverseTilesPreorder(a.rootTiles,function(b){return a.tileRenderer.updateTileTexture(b)}))})};c.prototype._updatePrograms=function(){var a="shader"===this.wireframe.mode,b=this.programRep;this.programs={color:b.getProgram(q.colorPass,
{mode:a||this._drawBorders?"wireframe":"normal",overlay:this._hasOverlays,atmosphere:"spherical"===this.manifold&&this._velvetOverground,wireframeTexture:a,tileBorders:this._drawBorders,receiveShadows:this.receiveShadows,screenSizePerspective:this.debugScreenSizePerspective,slice:this._slicePlaneEnabled}),normal:b.getProgram(q.normalPass,{alphaZero:!0}),depth:b.getProgram(q.depthPass,{shadowMap:!1}),depthShadowMap:b.getProgram(q.depthPass,{shadowMap:!0}),highlight:b.getProgram(q.highlightPass,{})};
this.defaultPipelineState=m.makePipelineState({culling:this._cullBackFaces&&m.backFaceCullingParams,depthTest:{func:513},depthWrite:m.defaultDepthWriteParams,colorWrite:m.defaultColorWriteParams});this.stencilPipelineState=m.makePipelineState(V({},this.defaultPipelineState,{stencilTest:{function:{func:517,ref:1,mask:255},operation:{fail:7680,zFail:7680,zPass:7680}}}));this.setNeedsRender()};c.prototype._renderMaterialPass=function(a,b){var d=this,e=a.shadowMap&&a.shadowMap.enabled,f=a.rctx;this.receiveShadows!==
e&&(this.receiveShadows=e,this._updatePrograms());e=!this.drapedRenderer.isEmpty();e!==this._hasOverlays&&(this._hasOverlays=e,this._updatePrograms());var e=a.camera,c=this.wireframe,h=this.programs.color;f.bindProgram(h);if("shader"===c.mode||this._drawBorders)h.setUniform1f("wireframe.width",this.wireframe.width),h.setUniform1f("wireframe.falloff",Math.min(c.width,c.falloff)),h.setUniform1f("wireframe.wireOpacity",c.wireOpacity),h.setUniform1f("wireframe.surfaceOpacity",c.surfaceOpacity),h.setUniform4fv("wireframe.color",
c.color);a.shadowMap&&a.shadowMap.bind(h);a.ssaoHelper&&a.ssaoHelper.setUniforms(h);h.setUniform1i("tex",0);h.setUniform1i("overlay0Tex",1);h.setUniform1i("overlay1Tex",2);h.setUniformMatrix4fv("viewNormal",e.viewInverseTransposeMatrix);h.setUniformMatrix4fv("proj",e.projectionMatrix);a.lightingData.helper.setUniforms(h,!0);f=e.viewMatrix;t.vec3.set(G,f[12],f[13],f[14]);t.vec3.normalize(G,G);h.setUniform3fv("viewDirection",G);this.numOriginsRendered=this.numTrianglesRendered=this.numTilesCulled=this.numTilesRendered=
0;this._prepareScaleRangeQueries();this.isOpaque()?this._renderTiles(a,h,b):a.offscreenRenderingHelper.renderToTargets(function(){return d._renderTiles(a,h,b)},a.offscreenRenderingHelper.tmpColor,a.offscreenRenderingHelper.mainDepth,[0,0,0,0]);this._processScaleRangeQueries();0<this.numTilesRendered&&!this._loaded&&(this._loaded=!0,this.loaded&&this.loaded())};c.prototype._renderDepthPass=function(a,b,d){var e=a.camera;a.rctx.bindProgram(b);b.setUniformMatrix4fv("model",S);b.setUniformMatrix4fv("viewNormal",
e.viewInverseTransposeMatrix);K[0]=e.near;K[1]=e.far;b.setUniform2fv("nearFar",K);this._renderTilesAuxiliary(a,b,d,!1)};c.prototype._renderNormalPass=function(a,b){var d=a.camera,e=this.programs.normal;a.rctx.bindProgram(e);e.setUniformMatrix4fv("viewNormal",d.viewInverseTransposeMatrix);this._renderTilesAuxiliary(a,e,b,!1)};c.prototype._renderHighlightPass=function(a,b){var d=a.rctx,e=this.programs.highlight;d.bindProgram(e);var f=a.offscreenRenderingHelper;d.bindTexture(f.depthTexture,3);e.setUniform1i("depthTex",
3);e.setUniform4f("highlightViewportPixelSz",0,0,1/f.width,1/f.height);this._renderTilesAuxiliary(a,e,b,!0)};c.prototype._updatePerOriginTileData=function(){var a=this,b=this.perOriginTileData;if(!this.perOriginTileDataDirty)return b;this._highestVisibleLODTile=null;b.clear();this._renderCollectOrigins(b);if(this._renderOrder!==z.RenderOrder.NONE){for(var d=0;d<b.length;d++)p.sortTiles(this._renderOrder,b.data[d].tiles);b.sort(function(b,d){var e=a._renderOrder;b=0===b.tiles.length?-e:0===d.tiles.length?
e:p.compareTiles(b.tiles.data[0],d.tiles.data[0],e);return b})}this.perOriginTileDataDirty=!1;return b};c.prototype._renderCollectOrigins=function(a){var b=this.rootTiles,d="spherical"===this.manifold;a.clear();for(var e=0;e<b.length;e++){var c=b[e],g=a.pushNew();g.root=c;g.origin=d?T:c.centerAtSeaLevel;g.tiles.clear();this._renderCollectOriginsForRoot(a,g)}};c.prototype._renderCollectOriginsForRoot=function(a,b){var d=this.tileIterator;d.resetOne(b.root);var e=this.perOriginTileDataMap;e.clear();
for(e.set(b.origin,b);!d.done;){b=d.next();var c=b.renderData;if(c&&!b.visible)this.numTilesCulled++,d.skipSubtree();else{if(0===b.lij[0]%7){var g=a.pushNew();g.root=b;g.origin=b.centerAtSeaLevel;e.set(b.centerAtSeaLevel,g);g.tiles.clear()}if(c){(c=e.get(b.renderData.localOrigin))&&c.tiles.push(b);if(!this._highestVisibleLODTile||b.vlevel>this._highestVisibleLODTile.vlevel)this._highestVisibleLODTile=b;d.skipSubtree()}}}};c.prototype._scaleQueriesForTile=function(a){var b=a.extent;a=a.lij[0];for(var d=
0;d<this.visibleScaleRangeQueriesInvPtr;){var c=this.visibleScaleRangeQueries.data[d],f=c.extent;a>=c.minLevel&&a<=c.maxLevel&&f[0]<=b[2]&&f[2]>=b[0]&&f[1]<=b[3]&&f[3]>=b[1]?(this.visibleScaleRangeQueries.swapElements(d,this.visibleScaleRangeQueriesInvPtr-1),this.visibleScaleRangeQueriesInvPtr--):d++}};c.prototype._tileIntersectsStencilEnabledLayer=function(a){for(var b=this.stencilEnabledLayerExtents,d=0;d<b.length;d++)if(a.intersectsExtent(b[d]))return!0;return!1};c.prototype._renderTilesAuxiliary=
function(a,b,d,c){var e=a.rctx,g=a.camera;a=g.viewMatrix;e.setPipelineState(this.defaultPipelineState);var h=0<this.stencilEnabledLayerExtents.length;b.setUniformMatrix4fv("proj",g.projectionMatrix);b.setUniform1f("skirtScale",this._skirtScale);c&&(b.setUniform1i("overlay0Tex",1),b.setUniform1i("overlay1Tex",2));for(g=0;g<d.length;g++){var n=d.data[g];b.setUniform3fv("origin",n.origin);A.bindView(n.origin,a,b);for(var p=0;p<n.tiles.length;p++){var u=n.tiles.data[p],k=u.renderData;c&&(this._bindOverlayTextures(b,
k.overlays,!0),b.setUniform1f("overlayOpacity",k.overlayOpacity));h&&e.setPipelineState(this._tileIntersectsStencilEnabledLayer(u)?this.stencilPipelineState:this.defaultPipelineState);e.bindVAO(k.vao);R.assertCompatibleVertexAttributeLocations(k.vao,b);e.drawElements(4,0===this._skirtScale?k.geometryInfo.numWithoutSkirtIndices:k.vao.indexBuffer.size,k.vao.indexBuffer.indexType,0)}}e.bindVAO(null)};c.prototype._renderTiles=function(a,b,d){var c=a.rctx,f=a.camera,g=f.viewMatrix;c.setPipelineState(this.defaultPipelineState);
if(this.debugScreenSizePerspective&&this.pointsOfInterest){var h=ga.getSettings("spherical"===this.manifold?"global":"local");h.update({distance:this.pointsOfInterest.centerOnSurfaceFrequent.distance,fovY:f.fovY});A.bindScreenSizePerspective(h,b,"screenSizePerspective")}f=0<this.stencilEnabledLayerExtents.length;b.setUniform1f("skirtScale",this._skirtScale);for(h=0;h<d.length;h++){var n=d.data[h],q=n.tiles;if(0!==q.length){b.setUniform3fv("origin",n.origin);A.bindView(n.origin,g,b);var u=a.sliceHelper&&
a.sliceHelper.plane;u&&A.bindSlicePlane(n.origin,u,b);a.shadowMap&&a.shadowMap.bindView(b,n.origin);this.numOriginsRendered++;var n="debug"===this.wireframe.mode?1:4,k=this._highestVisibleLODTile,t=u=void 0;k?(u=k.vlevel,t=this.tileSize/this.wireframe.resolution):(u=16,t=this.tileSize/64);for(k=0;k<q.length;k++){var v=q.data[k],r=v.renderData;f&&c.setPipelineState(this._tileIntersectsStencilEnabledLayer(v)?this.stencilPipelineState:this.defaultPipelineState);J.trace("# RENDER TILE "+p.tile2str(v)+
", screenDepth:"+v.screenDepth);var l=r.geometryInfo.uvOffsetAndScale,m=r.texOffsetAndScale;P.vec4.set(U,l[0]*m[2]+m[0],l[1]*m[3]+m[1],l[2]*m[2],l[3]*m[3]);b.setUniform4fv("texOffsetAndScale",U);c.bindTexture(r.textureReference,0);b.setUniform1f("opacity",r.opacity);this._bindOverlayTextures(b,r.overlays,!1);b.setUniform1f("overlayOpacity",r.overlayOpacity);("shader"===this.wireframe.mode||this._drawBorders)&&b.setUniform1f("wireframe.subdivision",t*(1<<u-v.vlevel));l=0===this._skirtScale?r.geometryInfo.numWithoutSkirtIndices:
r.vao.indexBuffer.size;c.bindVAO(r.vao);R.assertCompatibleVertexAttributeLocations(r.vao,b);c.drawElements(n,l,r.vao.indexBuffer.indexType,0);v.renderOrder=this.numTilesRendered;this.numTilesRendered++;this.numTrianglesRendered+=l/3;this._scaleQueriesForTile(v)}}}c.bindVAO(null)};c.prototype._bindOverlayTextures=function(a,b,c){for(var d=0;2>d;d++){var f=2*d,g=b[d],h=c?g.highlightRenderTargetId:g.renderTargetId;h?(h=this.drapedRenderer.getRenderTargetTexture(h),w[f]=g.texOffset[0],w[f+1]=g.texOffset[1],
C[f]=g.texScale[0],C[f+1]=g.texScale[1],this.rctx.bindTexture(h,1+d)):(w[f]=0,w[f+1]=0,C[f]=0,C[f+1]=0,this.rctx.bindTexture(this.emptyTex,1+d))}a.setUniform4fv("overlayTexOffset",w);a.setUniform4fv("overlayTexScale",C)};c.prototype.releaseTileGeometry=function(a){a.releaseGeometry()&&this.setNeedsRender();this.renderDataPool.release(a)};c.prototype._prepareScaleRangeQueries=function(){for(var a=this.visibleScaleRangeQueries,b=this.visibleScaleRangeQueryQueue;a.length<a.data.length&&0<b.length;){var c=
b.pop();a.push(c)}this.visibleScaleRangeQueriesInvPtr=a.length};c.prototype._processScaleRangeQueries=function(){for(var a=this.visibleScaleRangeQueries,b=this.visibleScaleRangeQueryPool,c=0;c<a.length;c++){var e=a.data[c];b.release(e);e.callback(c>=this.visibleScaleRangeQueriesInvPtr);e.callback=null}a.clear()};return c}();var ka={mode:"none",width:1.5,falloff:1.5,wireOpacity:1,surfaceOpacity:0,color:[1,1,1,0],resolution:64},G=l.vec3f64.create(),la=l.vec3f64.create(),ma=l.vec3f64.create(),F=l.vec3f64.create(),
pa=l.vec3f64.create(),na="TerrainRenderer",oa={type:"external"};return N});