// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/declareExtendsHelper ../../../../core/tsSupport/decorateHelper ../../../../core/Error ../../../../core/promiseUtils ../../../../core/accessorSupport/decorators ../../statistics/support/utils ../utils ./FeatureLayerAdapter ./support/utils ../../../../tasks/support/generateRendererUtils".split(" "),function(x,y,r,t,l,m,h,u,v,w,k,n){function p(c){return"esri.tasks.support.ClassBreaksDefinition"===c.declaredClass}function q(c){return"esri.tasks.support.UniqueValueDefinition"===
c.declaredClass}return function(c){function d(a){return c.call(this,a)||this}r(d,c);d.prototype.generateRenderer=function(a){var b=a.classificationDefinition,g=null,c=null,d=null;p(b)?(g=b.classificationField,c=b.normalizationField,d=b.normalizationType):q(b)&&(g=b.attributeField);var f=this.layer,h=v.getFieldsList({field:g,normalizationField:c}),f=f.createQuery();f.returnGeometry=!1;f.outFields=h;f.where=u.mergeWhereClauses(f.where,a.where);return this.layer.queryFeatures(f).then(function(a){var e=
a&&a.features;if(!e||!e.length)return m.reject(new l("csv-layer-adapter:insufficient-data","No features are available to calculate statistics"));a=null;if("percent-of-total"===d&&(a=k.calculateStatsFromMemory({field:g},e).sum,null==a))return m.reject(new l("csv-layer-adapter:invalid","invalid normalizationTotal"));if(p(b))return e=k.getDataValues({field:g,normalizationType:d,normalizationField:c,normalizationTotal:a},e).filter(function(a){return null!=a&&k.isValidNumber(a)}),n.createGenerateRendererClassBreaks({definition:b,
values:e,normalizationTotal:a});if(q(b))return e=k.getDataValues({field:g},e).filter(function(a){return null!=a&&"string"===typeof a&&""!==a.trim()}),n.createGenerateRendererUniqueValues(e)})};d.prototype.load=function(){var a=this,b=this.layer,c=b.load().then(function(){a.geometryType=b.geometryType;a.objectIdField=b.objectIdField;a.supportsSQLExpression=!0;a._hasLocalSource=!1;a.hasQueryEngine=!0});this.addResolvingPromise(c);return this.when()};return d=t([h.subclass()],d)}(h.declared(w))});