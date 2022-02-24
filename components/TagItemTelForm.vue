<template>
  <div class="px-2">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form novalidate @submit.stop.prevent="handleSubmit(enviar)">
        <div>
          <div>
            <ValidationProvider
              v-slot="validationContext"
              name="tipo"
              :rules="{ required: true }"
              class="w-1/2"
            >
              <div class="p-form-control">
                <t-select
                  v-model="tel.tipo_tel"
                  placeholder="Selecciona el tipo de teléfono"
                  name="telefono"
                  class="p-input"
                  :options="opciones"
                  :state="getValidationState(validationContext)"
                ></t-select>

                <span class="p-error">
                  {{ validationContext.errors[0] }}
                </span>
              </div>
            </ValidationProvider>
          </div>
          <div>
            <ValidationProvider
              v-slot="validationContext"
              name="teléfono"
              :rules="{ required: true }"
            >
              <div class="p-form-control">
                <vue-tel-input
                  v-model="tel.tel"
                  name="celular"
                  class="p-input"
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
          </div>
          <div class="flex w-full justify-between items-center">
            <label for="habilitado">Teléfono activo</label>
            <t-toggle v-model="tel.habilitado" name="habilitado" checked />
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import dataMixin from '~/mixins/data.js'

export default {
  mixins: [dataMixin],
  props: {
    info: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      bindProps: {
        mode: 'international',
        inputOptions: {
          country: 'CO',
          placeholder: 'Selecciona tu país e ingresa tu teléfono ',
        },
      },
      tel: {
        tipo: 'teléfono',
        habilitado: true,
        tel: '',
        tipo_tel: null,
        tel_info: null,
        nota:
          process.env.NODE_ENV !== 'production'
            ? `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget libero iaculis, finibus diam eu, sollicitudin neque. Maecenas ut risus faucibus, sodales neque non, pellentesque justo. Etiam sed sollicitudin nulla. Ut tristique ex ut tortor suscipit, vitae dignissim elit tincidunt. Proin ut cursus nisi.`
            : '',
      },
    }
  },
  mounted() {
    if (this.info) {
      this.tel = { ...this.info }
    }
  },
  methods: {
    phoneChange(phone, phoneo) {
      this.tel.tel_info = phoneo
    },
    async enviar() {
      if (this.isLoggedIn) {
        let resultado
        if (this.info) {
          let index
          const arrInfo = [...this.userData.info.telefonos]
          const newArr = arrInfo.filter((item, i) => {
            if (this.info === item) index = i
            return this.info !== item
          })
          newArr.splice(index, 0, this.tel)

          resultado = await this.actualizarTelefonos(newArr)
        } else {
          resultado = await this.agregarTel(this.tel)
        }
        if (resultado.error === false) {
          this.$noty.success(resultado.mensaje, {
            theme: 'bootstrap-v4',
            layout: 'topCenter',
          })
          setTimeout(() => {
            this.$emit('closeaModal')
          }, 1000)
        } else {
          this.habilitarBoton = true
          this.$noty.error(resultado.mensaje, {
            theme: 'bootstrap-v4',
            layout: 'topCenter',
          })
        }
      }
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
  },
}
</script>

<style lang="postcss" scoped>
.p-form-control {
  @apply mb-1;
}
</style>