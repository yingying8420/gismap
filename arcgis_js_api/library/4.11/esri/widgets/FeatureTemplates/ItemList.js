// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define(["require","exports","../../core/tsSupport/assignHelper","../support/jsxFactory","../support/widgetUtils"],function(v,m,w,e,q){function t(a){var c=a.identify,b=a.items,f=a.renderIcon,h=a.filterText,k=a.onItemMouseLeave,g=a.onItemMouseEnter,l=a.onItemSelect;return 0===b.length?e.tsx("div",{class:d.noMatchesMessage,key:"no-matches"},a.messages.noMatches):b[0].items?e.tsx("div",{class:d.scroller,key:"item-container"},b.map(function(a){return r({group:a,filterText:h,identify:c,renderIcon:f,onItemMouseLeave:k,
onItemMouseEnter:g,onItemSelect:l})})):e.tsx("ul",{class:q.classes(d.list,d.scroller),key:"item-container"},b.map(function(a){return n({item:a,identify:c,grouped:!0,onItemMouseLeave:k,onItemMouseEnter:g,onItemSelect:l,renderIcon:f,filterText:h})}))}function u(a){var c=a.id+"-placeholder";return e.tsx("div",{class:d.filterContainer,key:"filter"},e.tsx("input",{"aria-labelledby":c,class:q.classes(d.input,d.filterInput),oninput:function(b){b=b.currentTarget;a.onFilterChange&&a.onFilterChange(b.value)},
value:a.filterText,type:"search"}),a.filterText?null:e.tsx("div",{class:d.filterPlaceholder,id:c,key:"placeholder"},e.tsx("span",{class:d.searchIcon,"aria-hidden":"true"}),e.tsx("div",{class:d.filterPlaceholderText},a.messages.filterPlaceholder)))}function n(a){var c=a.identify,b=a.item,f=a.grouped,h=a.filterText,k=a.onItemSelect,g=a.onItemMouseEnter,l=a.onItemMouseLeave;a=a.renderIcon;c=(c&&c(b)||b.id)+"__"+b.label;return e.tsx("li",{"aria-level":f?"2":"",class:d.item,"data-item":b,key:c,onclick:function(a){a=
a.currentTarget["data-item"];k&&k(a)},onmouseenter:function(a){a=a.currentTarget["data-item"];g&&g(a)},onkeydown:function(a){if("Enter"===a.key||"Space"===a.key)a=a.currentTarget["data-item"],k&&k(a)},onmouseleave:function(a){a=a.currentTarget["data-item"];l&&l(a)},tabIndex:0},e.tsx("div",{class:d.itemContainer},a&&a({item:b}),p({text:b.label,match:h})))}function r(a){var c=a.group,b=a.identify,f=a.onItemMouseLeave,h=a.onItemMouseEnter,k=a.onItemSelect,g=a.filterText,l=a.renderIcon;a=(b&&b(c)||c.id)+
"-heading";return e.tsx("section",{"aria-labelledby":a,class:d.group,key:c.label},e.tsx("h4",{"aria-level":"1",id:a,class:q.classes(d.groupHeader)},p({text:c.label,match:g})),e.tsx("ul",{class:d.list},c.items.map(function(a){return n({item:a,identify:b,grouped:!0,onItemMouseLeave:f,onItemMouseEnter:h,onItemSelect:k,renderIcon:l,filterText:g})})))}function p(a){var c=a.match;a=a.text;var b=null;if(c){var b=a.toLowerCase(),f=c.toLowerCase(),h=b.indexOf(f);-1===h?b=a:(b=a.substring(0,h),f=a.substr(h,
c.length),c=a.substring(h+c.length),b=e.tsx("span",null,b,e.tsx("strong",null,f),c))}else b=a;return e.tsx("span",{class:d.itemLabel},b)}Object.defineProperty(m,"__esModule",{value:!0});var d={base:"esri-item-list",list:"esri-item-list__list",group:"esri-item-list__group",scroller:"esri-item-list__scroller",groupHeader:"esri-item-list__group-header",item:"esri-item-list__list-item",itemSelected:"esri-item-list__list-item--selected",itemContainer:"esri-item-list__list-item-container",itemLabel:"esri-item-list__list-item-label",
noMatchesMessage:"esri-item-list__no-matches-message",noItemsMessage:"esri-item-list__no-items-message",filterContainer:"esri-item-list__filter-container",filterPlaceholder:"esri-item-list__filter-placeholder",filterInput:"esri-item-list__filter-input",filterPlaceholderText:"esri-item-list__filter-placeholder-text",searchIcon:"esri-icon-search",widget:"esri-widget",heading:"esri-widget__heading",input:"esri-input"};m.ItemList=function(a){var c=a.id,b=a.identify,f=a.filterEnabled,f=void 0===f?!0:f,
h=a.items,k=a.messages,g=a.filterText,g=void 0===g?"":g,l=a.onFilterChange,m=a.renderIcon,n=a.onItemMouseLeave,p=a.onItemMouseEnter;a=a.onItemSelect;return e.tsx("div",{class:q.classes(d.base,d.widget)},f?u({filterText:g,messages:k,onFilterChange:l,id:c}):null,t({identify:b,items:h,messages:k,filterText:g,renderIcon:m,onItemMouseLeave:n,onItemMouseEnter:p,onItemSelect:a}))};m.renderItem=n;m.renderGroup=r;m.renderLabel=p});