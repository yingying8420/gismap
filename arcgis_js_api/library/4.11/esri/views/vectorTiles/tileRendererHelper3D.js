// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../../geometry ../../Viewpoint ../../core/has ../../core/libs/gl-matrix-2/mat4 ../2d/ViewState ../webgl/renderState".split(" "),function(v,f,k,m,n,p,q,a){Object.defineProperty(f,"__esModule",{value:!0});f.renderVectorTile=function(a,g,d,h,b,l,f,c){if(l!==f)throw Error("It is expected that tiles are square!");var e=b.adjustLevel(g[0]);c={context:a,drawPhase:0,state:r,stationary:!0,pixelRatio:c,displayLevel:e,requiredLevel:e,drawphase:0,renderer:h,layerOpacity:1,globalOpacity:1};
h.initializeProgramCache(a);e=b.getScale(g[0]);b=b.getShift(g,e);var k=b[1];d.tileTransform.displayCoord[0]=-1-b[0];d.tileTransform.displayCoord[1]=1+k;b=d.tileTransform.transform;p.mat4.identity(b);e=.25*e/l;b[0]=e;b[5]=-e;c.state.size=[l,f];h.setStateParams(c.state,c.pixelRatio,g[0]);d.attachWithContext(a);a.setPipelineState(t);d.processRender(c);a.setPipelineState(u);c.drawphase=1;d.processRender(c);c.drawphase=2;d.processRender(c);n("esri-vector-tiles-debug")&&h.renderTileInfo(a,d)};var r=new q({viewpoint:new m({targetGeometry:new k.Point(0,
0),scale:1,rotation:0}),size:[256,256]}),t=a.makePipelineState({depthTest:{func:515},depthWrite:a.defaultDepthWriteParams,colorWrite:a.defaultColorWriteParams}),u=a.makePipelineState({blending:a.simpleBlendingParams(1,771),depthTest:{func:515},colorWrite:a.defaultColorWriteParams})});