<template>
  <div>
    <div v-if="!enviado">
      <h5 class="text-base font-light mb-3">
        Dejale saber a {{ info.primer_nombre }} quién eres
      </h5>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form novalidate @submit.stop.prevent="handleSubmit(submitUsuario)">
          <div class="flex space-x-2 mb-1">
            <ValidationProvider
              v-slot="validationContext"
              name="nombre"
              :rules="`required`"
              class="w-1/2"
            >
              <div class="p-form-control">
                <label for="nombre" class="p-label"> Tu Nombre </label>
                <t-input
                  v-model="form.nombre"
                  name="nombre"
                  class="p-input"
                  :state="getValidationState(validationContext)"
                />
                <span class="p-error">
                  {{ validationContext.errors[0] }}
                </span>
              </div>
            </ValidationProvider>
            <ValidationProvider
              v-slot="validationContext"
              name="email"
              :rules="{ email: true, required: true }"
            >
              <div class="p-form-control">
                <label for="email" class="p-label"> Email </label>
                <t-input
                  v-model="form.email"
                  name="email"
                  type="email"
                  required
                  :state="getValidationState(validationContext)"
                />
                <span class="p-error">
                  {{ validationContext.errors[0] }}
                </span>
              </div>
            </ValidationProvider>
          </div>
          <div class="mb-1">
            <ValidationProvider
              v-slot="validationContext"
              name="celular"
              :rules="{ required: true }"
            >
              <div class="p-form-control">
                <label for="celular" class="p-label"> Celular </label>
                <vue-tel-input
                  v-model="form.phone"
                  name="celular"
                  class="p-input"
                  country="CO"
                  placeholder="Selecciona tu país e ingresa tu celular "
                  :state="getValidationState(validationContext)"
                  v-bind="bindProps"
                  @input="phoneChange"
                ></vue-tel-input>

                <span class="p-error">
                  {{ validationContext.errors[0] }}
                </span>
              </div>
            </ValidationProvider>
            <t-button v-if="habilitarBoton" type="submit" class="w-full mb-2">
              Enviar <i class="fal fa-sign-in"></i>
            </t-button>
          </div>
        </form>
      </ValidationObserver>
    </div>
    <div class="pt-4 border-t border-primary-400 pb-3">
      <h5>
        <template v-if="!enviado"> O descarga el </template>
        <template v-else> Descarga el </template>
        <a
          :href="`${$axios.defaults.baseURL}tag?id=${info.tag}&file=true`"
          target="_blank"
          class="text-primary-900 underline-light-900"
        >
          <span>contacto </span><i class="far fa-address-card"></i>
        </a>
      </h5>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    info: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      form: {
        nombre: '',
        email: '',
        phone: '',
        phone_info: '',
      },
      bindProps: {
        mode: 'international',
        inputOptions: {
          country: 'CO',
          placeholder: 'Selecciona tu país e ingresa tu teléfono ',
        },
      },
      habilitarBoton: true,
      enviado: false,
    }
  },
  methods: {
    ...mapActions({ enviarLead: 'enviarLead' }),
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    phoneChange(phone, phoneo) {
      this.form.phone_info = phoneo
    },
    async submitUsuario() {
      try {
        this.habilitarBoton = false
        this.form.tag = this.info.tag
        this.form.leads = this.info.leads
        const resultadoRegistro = await this.enviarLead(this.form)

        if (resultadoRegistro.error === false) {
          this.enviado = true
          this.formleads = resultadoRegistro.leads
          this.$noty.success(resultadoRegistro.mensaje, {
            theme: 'bootstrap-v4',
            layout: 'topCenter',
          })
        } else {
          this.habilitarBoton = true
          this.$noty.error(resultadoRegistro.mensaje, {
            theme: 'bootstrap-v4',
            layout: 'topCenter',
          })
        }
      } catch (e) {
        this.habilitarBoton = true
        this.$noty.error('Ocurrió un error al enviar la información', {
          theme: 'bootstrap-v4',
          layout: 'topCenter',
        })
        console.error('└──🚨 | ⛹  >  ACTION submitUsuario data', e)
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
</style>