(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{422:function(t,n,e){var content=e(441);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(28).default)("414d1cbc",content,!0,{sourceMap:!1})},440:function(t,n,e){"use strict";e(422)},441:function(t,n,e){var r=e(27)((function(i){return i[1]}));r.push([t.i,".twitter-navigation{display:flex;width:100%;align-items:center;justify-content:center;height:50px;}.twitter-navigation .twitter-navigation__wrapper{display:flex;align-items:center;max-width:400px;width:100%}.twitter-navigation .twitter-navigation__zoom-icon{height:18.75px;width:18.75px;flex-shrink:0;fill:#000;}.twitter-navigation .twitter-navigation__zoom-icon .twitter-navigation--left{margin-right:10px}.twitter-navigation .twitter-navigation__zoom-icon .twitter-navigation--right{margin-left:10px}.twitter-navigation .twitter-navigation__line-wrapper{height:20px;flex-direction:column;justify-content:center;cursor:pointer}.twitter-navigation .twitter-navigation__line,.twitter-navigation .twitter-navigation__line-wrapper{width:100%;display:flex;align-items:center;border-radius:5px}.twitter-navigation .twitter-navigation__line{height:5px;position:relative}.twitter-navigation .twitter-navigation__line{--tw-bg-opacity:1;background-color:var(--color-primary-500);}.twitter-navigation .twitter-navigation__fill{align-self:stretch;flex-basis:auto;flex-direction:column;flex-shrink:0}.twitter-navigation .twitter-navigation__fill{--tw-bg-opacity:1;background-color:var(--color-primary-700);}.twitter-navigation .twitter-navigation__circle{width:30px;height:30px;margin-left:-15px;border-radius:50%;display:flex;align-items:center;justify-content:center;position:absolute;transition-duration:.2s;transition-property:background-color,box-shadow;background-color:transparent;}.twitter-navigation .twitter-navigation__circle .twitter-navigation__circle--focus, .twitter-navigation .twitter-navigation__circle .twitter-navigation__circle:hover{--tw-bg-opacity:1;background-color:var(--color-primary-300);}.twitter-navigation .twitter-navigation__inner-circle{width:15px;height:15px;border-radius:50%;transform:scale(1);transition-duration:.1s;transition-property:transform;box-shadow:0 0 7px rgba(101,119,134,.2),0 1px 3px 1px rgba(101,119,134,.15)}.twitter-navigation .twitter-navigation__inner-circle{--tw-bg-opacity:1;background-color:var(--color-primary-500);}.twitter-navigation .twitter-navigation__inner-circle .twitter-navigation__inner-circle--focus{transform:scale(1.2)}",""]),r.locals={},t.exports=r},448:function(t,n,e){"use strict";e.r(n);e(241);var r={props:{zoom:{type:Number,default:0}},data:function(){return{focus:!1}},mounted:function(){window.addEventListener("mouseup",this.onStop,{passive:!1}),window.addEventListener("mousemove",this.onDrag,{passive:!1}),window.addEventListener("touchmove",this.onDrag,{passive:!1}),window.addEventListener("touchend",this.onStop,{passive:!1})},destroyed:function(){window.removeEventListener("mouseup",this.onStop),window.removeEventListener("mousemove",this.onDrag),window.removeEventListener("touchmove",this.onDrag),window.removeEventListener("touchend",this.onStop)},methods:{onDrag:function(t){if(this.focus){var n=t.touches?t.touches[0].clientX:t.clientX,line=this.$refs.line;if(line){var e=line.getBoundingClientRect(),r=e.left,o=e.width;this.$emit("change",Math.min(1,Math.max(0,n-r)/o))}t.preventDefault&&t.preventDefault()}},onStop:function(){this.focus=!1},onStart:function(t){this.focus=!0,this.onDrag(t)}}},o=(e(440),e(10)),component=Object(o.a)(r,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"twitter-navigation"},[e("div",{staticClass:"twitter-navigation__wrapper"},[e("div",{staticClass:"\n        twitter-navigation__zoom-icon twitter-navigation__zoom-icon--left\n      "},[e("svg",{staticClass:"\n          r-1re7ezh\n          r-4qtqp9\n          r-yyyyoo\n          r-1xvli5t\n          r-dnmrzs\n          r-bnwqim\n          r-1plcrui\n          r-lrvibr\n        ",attrs:{viewBox:"0 0 24 24"}},[e("g",[e("path",{attrs:{d:"M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"}}),t._v(" "),e("path",{attrs:{d:"M14.46 11.75H7.54c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h6.92c.415 0 .75.336.75.75s-.335.75-.75.75z"}})])])]),t._v(" "),e("div",{ref:"line",staticClass:"twitter-navigation__line-wrapper",on:{mousedown:t.onStart,touchstart:t.onStart}},[e("div",{staticClass:"twitter-navigation__line"},[e("div",{staticClass:"twitter-navigation__fill",style:{flexGrow:t.zoom}}),t._v(" "),e("div",{staticClass:"twitter-navigation__circle",class:{"twitter-navigation__circle--focus":t.focus},style:{left:100*t.zoom+"%"}},[e("div",{staticClass:"twitter-navigation__inner-circle",class:{"twitter-navigation__inner-circle--focus":t.focus}})])])]),t._v(" "),e("div",{staticClass:"\n        twitter-navigation__zoom-icon twitter-navigation__zoom-icon--right\n      "},[e("svg",{staticClass:"\n          r-1re7ezh\n          r-4qtqp9\n          r-yyyyoo\n          r-1xvli5t\n          r-dnmrzs\n          r-bnwqim\n          r-1plcrui\n          r-lrvibr\n        ",attrs:{viewBox:"0 0 24 24"}},[e("g",[e("path",{attrs:{d:"M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"}}),t._v(" "),e("path",{attrs:{d:"M15.21 11c0 .41-.34.75-.75.75h-2.71v2.71c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-2.71H7.54c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h2.71V7.54c0-.41.34-.75.75-.75s.75.34.75.75v2.71h2.71c.41 0 .75.34.75.75z"}})])])])])])}),[],!1,null,null,null);n.default=component.exports}}]);