(window.webpackJsonp=window.webpackJsonp||[]).push([[23,22],{362:function(t,e,r){var content=r(378);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(28).default)("7d09e8e3",content,!0,{sourceMap:!1})},369:function(t,e,r){var content=r(401);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(28).default)("6338ee82",content,!0,{sourceMap:!1})},377:function(t,e,r){"use strict";r(362)},378:function(t,e,r){var n=r(27)((function(i){return i[1]}));n.push([t.i,".p-form-control[data-v-4f808f35]{margin-bottom:0.25rem}",""]),n.locals={},t.exports=n},390:function(t,e,r){"use strict";r.r(e);r(33),r(24),r(32),r(5),r(41),r(29),r(42);var n=r(3),o=r(15);r(14),r(69);function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var c={mixins:[r(149).a],props:{info:{type:Object,required:!1,default:null}},data:function(){return{email:{tipo:"email",habilitado:!0,email:"",tipo_email:"trabajo"}}},mounted:function(){this.info&&(this.email=function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},this.info))},methods:{enviar:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.isLoggedIn){e.next=5;break}return e.next=3,t.agregarEmail(t.email);case 3:!1===(r=e.sent).error?(t.$noty.success(r.mensaje,{theme:"bootstrap-v4",layout:"topCenter"}),setTimeout((function(){t.$emit("closeaModal")}),1e3)):(t.habilitarBoton=!0,t.$noty.error(r.mensaje,{theme:"bootstrap-v4",layout:"topCenter"}));case 5:case"end":return e.stop()}}),e)})))()},getValidationState:function(t){var e=t.dirty,r=t.validated,n=t.valid;return e||r?void 0===n?null:n:null}}},f=c,m=(r(377),r(10)),component=Object(m.a)(f,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"px-2"},[r("ValidationObserver",{scopedSlots:t._u([{key:"default",fn:function(e){var n=e.handleSubmit;return[r("form",{attrs:{novalidate:""},on:{submit:function(e){return e.stopPropagation(),e.preventDefault(),n(t.enviar)}}},[r("div",[r("div",[r("ValidationProvider",{attrs:{name:"email",rules:{required:!0,email:!0}},scopedSlots:t._u([{key:"default",fn:function(e){return[r("div",{staticClass:"p-form-control"},[r("t-input",{attrs:{placeholder:"mail@ejemplo.com",state:t.getValidationState(e)},model:{value:t.email.email,callback:function(e){t.$set(t.email,"email",e)},expression:"email.email"}}),t._v(" "),r("span",{staticClass:"p-error"},[t._v("\n                "+t._s(e.errors[0])+"\n              ")])],1)]}}],null,!0)})],1),t._v(" "),r("div",{staticClass:"flex w-full justify-between items-center"},[r("label",{attrs:{for:"habilitado"}},[t._v("Email activo")]),t._v(" "),r("t-toggle",{attrs:{name:"habilitado",checked:""},model:{value:t.email.habilitado,callback:function(e){t.$set(t.email,"habilitado",e)},expression:"email.habilitado"}})],1)])])]}}])})],1)}),[],!1,null,"4f808f35",null);e.default=component.exports},400:function(t,e,r){"use strict";r(369)},401:function(t,e,r){var n=r(27)((function(i){return i[1]}));n.push([t.i,".p-form-control[data-v-7bbe3f1f]{margin-bottom:0.25rem}",""]),n.locals={},t.exports=n},417:function(t,e,r){"use strict";r.r(e);var n=r(3),o=(r(14),{mixins:[r(149).a],props:{info:{type:Object,required:!0},view:{type:Boolean,required:!1,default:!1},lectura:{type:Boolean,required:!1,default:!0}},data:function(){return{aMail:!1}},methods:{eliminar:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.isLoggedIn){e.next=5;break}return e.next=3,t.agregarEmail(null);case 3:!1===(r=e.sent).error?t.$noty.success(r.mensaje,{theme:"bootstrap-v4",layout:"topCenter"}):(t.habilitarBoton=!0,t.$noty.error(r.mensaje,{theme:"bootstrap-v4",layout:"topCenter"}));case 5:case"end":return e.stop()}}),e)})))()}}}),l=(r(400),r(10)),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{class:t.view?"":"item-wrapper"},[t.view?[r("b",[t._v(" Trabajo")]),t._v(" "),r("a",{attrs:{href:"mailto:"+t.info.email}},[t._v(" "+t._s(t.info.email))])]:[r("div",{staticClass:"item-wrapper-info t-email"},[r("div",{staticClass:"item-tipo"},[r("i",{staticClass:"fas fa-link"}),t._v(" "+t._s(t.info.tipo)+" de trabajo\n      ")]),t._v(" "),r("div",{staticClass:"item-titulo"},[t._v("\n        "+t._s(t.info.email)+"\n      ")]),t._v(" "),r("div",{staticClass:"item-habilitado",class:t.info.habilitado?"activo":"inactivo"},[t.info.habilitado?r("span",[t._v("\n          Activo "),r("i",{staticClass:"fas fa-check-circle"})]):r("span",[t._v(" Inactivo "),r("i",{staticClass:"fas fa-times-circle"})])])]),t._v(" "),r("div",{staticClass:"item-wrapper-acciones"},[r("button",{staticClass:"borrar",on:{click:t.eliminar}},[r("i",{staticClass:"fas fa-trash-alt"})]),t._v(" "),r("button",{staticClass:"editar",on:{click:function(e){t.aMail=!0}}},[r("i",{staticClass:"fas fa-edit"})])]),t._v(" "),r("t-modal",{staticClass:"v-modal",attrs:{header:"Editar Email"},scopedSlots:t._u([{key:"footer",fn:function(){return[r("div",{staticClass:"v-footer flex justify-between"},[r("button",{staticClass:"v-cancel",attrs:{type:"button"},on:{click:function(e){t.aMail=!1}}},[r("i",{staticClass:"fas fa-times-circle"}),t._v(" "),r("span",[t._v("Cancelar ")])]),t._v(" "),r("button",{staticClass:"v-ok",attrs:{type:"button"},on:{click:t.enviarEmail}},[r("span",[t._v("Editar")]),t._v(" "),r("i",{staticClass:"fas fa-check-circle"})])])]},proxy:!0}],null,!1,1380658948),model:{value:t.aMail,callback:function(e){t.aMail=e},expression:"aMail"}},[r("TagItemEmailForm",{ref:"aMail",attrs:{info:t.info,edit:!0},on:{closeaModal:function(e){t.aMail=!1}}})],1)]],2)}),[],!1,null,"7bbe3f1f",null);e.default=component.exports;installComponents(component,{TagItemEmailForm:r(390).default})}}]);