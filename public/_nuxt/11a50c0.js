(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{457:function(e,t,r){"use strict";r.r(t);r(33),r(24),r(32),r(5),r(41),r(29),r(42);var n=r(3),o=r(15),l=(r(14),r(39));function c(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function f(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var d={props:{info:{type:Object,required:!1,default:null}},data:function(){return{form:{nombre:"",email:"",phone:"",phone_info:""},bindProps:{mode:"international",inputOptions:{country:"CO",placeholder:"Selecciona tu país e ingresa tu teléfono "}},habilitarBoton:!0,enviado:!1}},methods:f(f({},Object(l.b)({enviarLead:"enviarLead"})),{},{getValidationState:function(e){var t=e.dirty,r=e.validated,n=e.valid;return t||r?void 0===n?null:n:null},phoneChange:function(e,t){this.form.phone_info=t},submitUsuario:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e.habilitarBoton=!1,e.form.tag=e.info.tag,e.form.leads=e.info.leads,t.next=6,e.enviarLead(e.form);case 6:!1===(r=t.sent).error?(e.enviado=!0,e.formleads=r.leads,e.$noty.success(r.mensaje,{theme:"bootstrap-v4",layout:"topCenter"})):(e.habilitarBoton=!0,e.$noty.error(r.mensaje,{theme:"bootstrap-v4",layout:"topCenter"})),t.next=15;break;case 10:t.prev=10,t.t0=t.catch(0),e.habilitarBoton=!0,e.$noty.error("Ocurrió un error al enviar la información",{theme:"bootstrap-v4",layout:"topCenter"}),console.error("└──🚨 | ⛹  >  ACTION submitUsuario data",t.t0);case 15:case"end":return t.stop()}}),t,null,[[0,10]])})))()}})},m=r(10),component=Object(m.a)(d,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e.enviado?e._e():r("div",[r("h5",{staticClass:"text-base font-light mb-3"},[e._v("\n      Dejale saber a "+e._s(e.info.primer_nombre)+" quién eres\n    ")]),e._v(" "),r("ValidationObserver",{scopedSlots:e._u([{key:"default",fn:function(t){var n=t.handleSubmit;return[r("form",{attrs:{novalidate:""},on:{submit:function(t){return t.stopPropagation(),t.preventDefault(),n(e.submitUsuario)}}},[r("div",{staticClass:"flex space-x-2 mb-1"},[r("ValidationProvider",{staticClass:"w-1/2",attrs:{name:"nombre",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("div",{staticClass:"p-form-control"},[r("label",{staticClass:"p-label",attrs:{for:"nombre"}},[e._v(" Tu Nombre ")]),e._v(" "),r("t-input",{staticClass:"p-input",attrs:{name:"nombre",state:e.getValidationState(t)},model:{value:e.form.nombre,callback:function(t){e.$set(e.form,"nombre",t)},expression:"form.nombre"}}),e._v(" "),r("span",{staticClass:"p-error"},[e._v("\n                "+e._s(t.errors[0])+"\n              ")])],1)]}}],null,!0)}),e._v(" "),r("ValidationProvider",{attrs:{name:"email",rules:{email:!0,required:!0}},scopedSlots:e._u([{key:"default",fn:function(t){return[r("div",{staticClass:"p-form-control"},[r("label",{staticClass:"p-label",attrs:{for:"email"}},[e._v(" Email ")]),e._v(" "),r("t-input",{attrs:{name:"email",type:"email",required:"",state:e.getValidationState(t)},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}}),e._v(" "),r("span",{staticClass:"p-error"},[e._v("\n                "+e._s(t.errors[0])+"\n              ")])],1)]}}],null,!0)})],1),e._v(" "),r("div",{staticClass:"mb-1"},[r("ValidationProvider",{attrs:{name:"celular",rules:{required:!0}},scopedSlots:e._u([{key:"default",fn:function(t){return[r("div",{staticClass:"p-form-control"},[r("label",{staticClass:"p-label",attrs:{for:"celular"}},[e._v(" Celular ")]),e._v(" "),r("vue-tel-input",e._b({staticClass:"p-input",attrs:{name:"celular",country:"CO",placeholder:"Selecciona tu país e ingresa tu celular ",state:e.getValidationState(t)},on:{input:e.phoneChange},model:{value:e.form.phone,callback:function(t){e.$set(e.form,"phone",t)},expression:"form.phone"}},"vue-tel-input",e.bindProps,!1)),e._v(" "),r("span",{staticClass:"p-error"},[e._v("\n                "+e._s(t.errors[0])+"\n              ")])],1)]}}],null,!0)}),e._v(" "),e.habilitarBoton?r("t-button",{staticClass:"w-full mb-2",attrs:{type:"submit"}},[e._v("\n            Enviar "),r("i",{staticClass:"fal fa-sign-in"})]):e._e()],1)])]}}],null,!1,1974766389)})],1),e._v(" "),r("div",{staticClass:"pt-4 border-t border-primary-400 pb-3"},[r("h5",[e.enviado?[e._v(" Descarga el ")]:[e._v(" O descarga el ")],e._v(" "),r("a",{staticClass:"text-primary-900 underline-light-900",attrs:{href:e.$axios.defaults.baseURL+"tag?id="+e.info.tag+"&file=true",target:"_blank"}},[r("span",[e._v("contacto ")]),r("i",{staticClass:"far fa-address-card"})])],2)])])}),[],!1,null,"b98df01a",null);t.default=component.exports}}]);