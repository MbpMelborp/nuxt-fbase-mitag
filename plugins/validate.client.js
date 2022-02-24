import Vue from 'vue'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from 'vee-validate'

import es from 'vee-validate/dist/locale/es.json'
import * as rules from 'vee-validate/dist/rules'

// Install VeeValidate rules and localization
for (const [rule, validation] of Object.entries(rules)) {
  // noinspection TypeScriptValidateTypes
  extend(rule, {
    ...validation,
  })
}
localize('es', es)

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
