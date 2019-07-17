// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper ../../../core/Accessor ../../../core/accessorSupport/decorators ../../input/gamepad/GamepadInputDevice".split(" "),function(h,k,e,c,f,b,g){return function(d){function a(){var a=d.call(this)||this;a.enabled=!0;a.device=null;a.mode="pan";a.tiltDirection="forward-down";a.velocityFactor=1;return a}e(a,d);c([b.property({type:Boolean,nonNullable:!0})],a.prototype,"enabled",void 0);c([b.property({type:g})],
a.prototype,"device",void 0);c([b.property({type:["pan","zoom"],nonNullable:!0})],a.prototype,"mode",void 0);c([b.property({type:["forward-down","forward-up"],nonNullable:!0})],a.prototype,"tiltDirection",void 0);c([b.property({type:Number,nonNullable:!0})],a.prototype,"velocityFactor",void 0);return a=c([b.subclass("esri.views.navigation.gamepad.GamepadSettings")],a)}(b.declared(f))});