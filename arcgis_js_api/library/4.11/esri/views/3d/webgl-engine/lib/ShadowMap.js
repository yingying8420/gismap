// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/libs/gl-matrix-2/mat3f64 ../../../../core/libs/gl-matrix-2/mat4 ../../../../core/libs/gl-matrix-2/mat4f64 ../../../../core/libs/gl-matrix-2/vec2 ../../../../core/libs/gl-matrix-2/vec2f64 ../../../../core/libs/gl-matrix-2/vec3 ../../../../core/libs/gl-matrix-2/vec3f64 ../../../../core/libs/gl-matrix-2/vec4 ../../../../core/libs/gl-matrix-2/vec4f64 ../../support/mathUtils ./Camera ./glUtil3D ./Util ../../../webgl/FramebufferObject ../../../webgl/Texture ../../../webgl/Util".split(" "),
function(T,R,la,H,w,c,b,M,C,U,V,W,ma,na,m,oa,pa,qa){function r(a,k){c.vec2.set(X,a[k],a[k+3]);return X}var ra=function(){return function(){this.camera=new ma;this.lightMat=w.mat4f64.create()}}();T=function(){function b(a){this.doShadowMapMipmapsWork=!1;this.textureRes=4096;this.numCascades=1;this.maxNumCascades=2;this.cascadeDistances=[0,0,0,0,0];this.cascades=[];this.rctx=a;this.emptyTexture=na.createEmptyTexture(a);for(a=0;4>a;++a)this.cascades.push(new ra)}b.prototype.dispose=function(){this.emptyTexture.dispose();
this.emptyTexture=null};Object.defineProperty(b.prototype,"textureResolution",{get:function(){return this.textureRes},set:function(a){this.textureRes=a},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"maxCascades",{get:function(){return this.maxNumCascades},set:function(a){this.maxNumCascades=W.clamp(Math.floor(a),1,4)},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"enabled",{get:function(){return!!this.depthTexture},set:function(a){a?this.enable():this.disable()},
enumerable:!0,configurable:!0});b.prototype.getDepthTexture=function(){return this.depthTexture};b.prototype.getCascades=function(){for(var a=0;a<this.numCascades;++a)S[a]=this.cascades[a];S.length=this.numCascades;return S};b.prototype.prepare=function(b,x,n){m.assert(this.enabled);H.mat4.multiply(Y,b.projectionMatrix,b.viewMatrix);var d=n.near,k=n.far;2>d&&(d=2);2>k&&(k=2);d>=k&&(d=2,k=4);this.numCascades=Math.min(1+Math.floor(m.logWithBase(k/d,4)),this.maxNumCascades);var w=Math.pow(k/d,1/this.numCascades);
for(n=0;n<this.numCascades+1;++n)this.cascadeDistances[n]=d*Math.pow(w,n);H.mat4.invert(Z,Y);H.mat4.lookAt(aa,[0,0,0],[-x[0],-x[1],-x[2]],[0,1,0]);w=b.viewMatrix;b=b.projectionMatrix;for(n=0;n<this.numCascades;++n){var t=this.cascades[n],k=-this.cascadeDistances[n],d=-this.cascadeDistances[n+1],k=(b[10]*k+b[14])/Math.abs(b[11]*k+b[15]),d=(b[10]*d+b[14])/Math.abs(b[11]*d+b[15]);m.assert(k<d);for(var e=0;8>e;++e){U.vec4.set(ba,0===e%4||3===e%4?-1:1,0===e%4||1===e%4?-1:1,4>e?k:d,1);U.vec4.transformMat4(p[e],
ba,Z);for(var f=0;3>f;++f)p[e][f]/=p[e][3]}M.vec3.negate(ca,p[0]);H.mat4.translate(da,aa,ca);t.camera.viewMatrix=da;for(e=0;8>e;++e)M.vec3.transformMat4(p[e],p[e],t.camera.viewMatrix);M.vec3.copy(A,p[0]);M.vec3.copy(B,p[0]);for(e=1;8>e;++e)for(f=0;3>f;++f)A[f]=Math.min(A[f],p[e][f]),B[f]=Math.max(B[f],p[e][f]);A[2]-=200;B[2]+=200;t.camera.near=-B[2];t.camera.far=-A[2];d=1/p[0][3];k=1/p[4][3];m.assert(d<k);var f=d+Math.sqrt(d*k),e=Math.sin(W.acos(w[2]*x[0]+w[6]*x[1]+w[10]*x[2])),f=f/e,d=p,N=f,F=e,
e=ea,u=fa,h=sa,y=ga,f=ha;c.vec2.set(v,0,0);for(var g=0;4>g;++g)c.vec2.add(v,v,d[g]);c.vec2.scale(v,v,.25);c.vec2.set(I,0,0);for(g=4;8>g;++g)c.vec2.add(I,I,d[g]);c.vec2.scale(I,I,.25);c.vec2.lerp(G[0],d[4],d[5],.5);c.vec2.lerp(G[1],d[5],d[6],.5);c.vec2.lerp(G[2],d[6],d[7],.5);c.vec2.lerp(G[3],d[7],d[4],.5);for(var D=0,z=c.vec2.squaredDistance(G[0],v),g=1;4>g;++g){var J=c.vec2.squaredDistance(G[g],v);J<z&&(z=J,D=g)}c.vec2.subtract(l,G[D],d[D+4]);g=l[0];l[0]=-l[1];l[1]=g;c.vec2.subtract(ia,I,v);c.vec2.lerp(l,
l,ia,F);c.vec2.normalize(l,l);D=F=void 0;F=D=c.vec2.dot(c.vec2.subtract(E,d[0],v),l);for(g=1;8>g;++g)z=c.vec2.dot(c.vec2.subtract(E,d[g],v),l),z<F?F=z:z>D&&(D=z);c.vec2.copy(e,v);c.vec2.scale(E,l,F-N);c.vec2.add(e,e,E);for(var J=-1,C=1,g=N=z=0;8>g;++g){c.vec2.subtract(O,d[g],e);c.vec2.normalize(O,O);var P=l[0]*O[1]-l[1]*O[0];0<P?P>J&&(J=P,z=g):P<C&&(C=P,N=g)}m.verify(0<J,"leftArea");m.verify(0>C,"rightArea");c.vec2.scale(K,l,F);c.vec2.add(K,K,v);c.vec2.scale(L,l,D);c.vec2.add(L,L,v);Q[0]=-l[1];Q[1]=
l[0];u=m.rayRay2D(e,d[N],L,c.vec2.add(E,L,Q),1,u);h=m.rayRay2D(e,d[z],L,E,1,h);y=m.rayRay2D(e,d[z],K,c.vec2.add(E,K,Q),1,y);d=m.rayRay2D(e,d[N],K,E,1,f);m.verify(u,"rayRay");m.verify(h,"rayRay");m.verify(y,"rayRay");m.verify(d,"rayRay");h=ea;d=fa;e=ga;y=ha;f=t.camera.projectionMatrix;c.vec2.subtract(q,e,y);c.vec2.scale(q,q,.5);a[0]=q[0];a[1]=q[1];a[2]=0;a[3]=q[1];a[4]=-q[0];a[5]=0;a[6]=q[0]*q[0]+q[1]*q[1];a[7]=q[0]*q[1]-q[1]*q[0];a[8]=1;a[6]=-c.vec2.dot(r(a,0),h);a[7]=-c.vec2.dot(r(a,1),h);h=c.vec2.dot(r(a,
0),e)+a[6];u=c.vec2.dot(r(a,1),e)+a[7];g=c.vec2.dot(r(a,0),y)+a[6];y=c.vec2.dot(r(a,1),y)+a[7];h=-(h+g)/(u+y);a[0]+=a[1]*h;a[3]+=a[4]*h;a[6]+=a[7]*h;h=1/(c.vec2.dot(r(a,0),e)+a[6]);u=1/(c.vec2.dot(r(a,1),e)+a[7]);a[0]*=h;a[3]*=h;a[6]*=h;a[1]*=u;a[4]*=u;a[7]*=u;a[2]=a[1];a[5]=a[4];a[8]=a[7];a[7]+=1;h=c.vec2.dot(r(a,1),d)+a[7];u=c.vec2.dot(r(a,2),d)+a[8];g=c.vec2.dot(r(a,1),e)+a[7];y=c.vec2.dot(r(a,2),e)+a[8];h=-.5*(h/u+g/y);a[1]+=a[2]*h;a[4]+=a[5]*h;a[7]+=a[8]*h;h=c.vec2.dot(r(a,1),d)+a[7];u=c.vec2.dot(r(a,
2),d)+a[8];g=-u/h;a[1]*=g;a[4]*=g;a[7]*=g;f[0]=a[0];f[1]=a[1];f[2]=0;f[3]=a[2];f[4]=a[3];f[5]=a[4];f[6]=0;f[7]=a[5];f[8]=0;f[9]=0;f[10]=1;f[11]=0;f[12]=a[6];f[13]=a[7];f[14]=0;f[15]=a[8];t.camera.projectionMatrix[10]=2/(A[2]-B[2]);t.camera.projectionMatrix[14]=-(A[2]+B[2])/(A[2]-B[2]);H.mat4.multiply(t.lightMat,t.camera.projectionMatrix,t.camera.viewMatrix);d=this.textureRes/2;t.camera.viewport[0]=0===n%2?0:d;t.camera.viewport[1]=0===Math.floor(n/2)?0:d;t.camera.viewport[2]=d;t.camera.viewport[3]=
d}this.lastOrigin=null;this.cascadeDistances[this.numCascades]=100*k;x=this.rctx;x.bindFramebuffer(this.fbo);x.bindTexture(null,7);x.setClearColor(1,1,1,1);x.clearSafe(16640)};b.prototype.finish=function(a){m.assert(this.enabled);this.rctx.bindFramebuffer(a);this.doShadowMapMipmapsWork&&this.depthTexture.generateMipmap()};b.prototype.bind=function(a){var b=this.rctx,c=this.enabled;b.bindTexture(c?this.depthTexture:this.emptyTexture,7);b.bindProgram(a);a.setUniform1i("depthTex",7);a.setUniform1f("depthHalfPixelSz",
c?.5/this.textureRes:-1);a.setUniform1i("shadowMapNum",this.numCascades);a.setUniform4f("shadowMapDistance",this.cascadeDistances[0],this.cascadeDistances[1],this.cascadeDistances[2],this.cascadeDistances[3])};b.prototype.bindAll=function(a){a=a.getProgramsUsingUniform("shadowMapDistance");for(var b=0;b<a.length;b++)this.bind(a[b])};b.prototype.bindView=function(a,b){if(this.enabled){var c=this.lastOrigin;if(!c||c[0]!==b[0]||c[1]!==b[1]||c[2]!==b[2])for(this.lastOrigin=this.lastOrigin||C.vec3f64.create(),
M.vec3.copy(this.lastOrigin,b),c=0;c<this.numCascades;++c){H.mat4.translate(ja,this.cascades[c].lightMat,b);for(var d=0;16>d;++d)ka[16*c+d]=ja[d]}a.setUniformMatrix4fv("shadowMapMatrix",ka)}};b.prototype.enable=function(){this.enabled||(this.depthTexture=new pa(this.rctx,{target:3553,pixelFormat:6408,dataType:5121,wrapMode:33071,samplingMode:9728,flipped:!0,width:this.textureRes,height:this.textureRes}),this.fbo=oa.createWithAttachments(this.rctx,this.depthTexture,{colorTarget:0,depthStencilTarget:1,
width:this.textureRes,height:this.textureRes}))};b.prototype.disable=function(){this.enabled&&this.fbo&&(this.fbo.dispose(),this.depthTexture=this.fbo=null)};b.prototype.getGpuMemoryUsage=function(){return qa.getGpuMemoryUsage(this.fbo)};return b}();var da=w.mat4f64.create(),Y=w.mat4f64.create(),Z=w.mat4f64.create(),ba=V.vec4f64.create(),p=[];for(R=0;8>R;++R)p.push(V.vec4f64.create());var A=C.vec3f64.create(),B=C.vec3f64.create(),ea=b.vec2f64.create(),fa=b.vec2f64.create(),sa=b.vec2f64.create(),ga=
b.vec2f64.create(),ha=b.vec2f64.create(),aa=w.mat4f64.create(),ca=C.vec3f64.create(),S=[],ja=w.mat4f64.create(),ka=new Float32Array(64),v=b.vec2f64.create(),I=b.vec2f64.create(),G=[b.vec2f64.create(),b.vec2f64.create(),b.vec2f64.create(),b.vec2f64.create()],l=b.vec2f64.create(),ia=b.vec2f64.create(),E=b.vec2f64.create(),O=b.vec2f64.create(),K=b.vec2f64.create(),L=b.vec2f64.create(),Q=b.vec2f64.create(),X=b.vec2f64.create(),q=b.vec2f64.create(),a=la.mat3f64.create();return T});