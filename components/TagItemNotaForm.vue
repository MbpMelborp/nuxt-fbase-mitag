<template>
  <div class="px-2">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form novalidate @submit.stop.prevent="handleSubmit(enviar)">
        <div>
          <div>
            <ValidationProvider
              v-slot="validationContext"
              name="título"
              :rules="{ required: true }"
              class="w-1/2"
            >
              <div class="p-form-control">
                <t-input
                  v-model="nota.titulo"
                  placeholder="Título de ejemplo"
                  name="titulo"
                  class="p-input"
                  :state="getValidationState(validationContext)"
                />
                <span class="p-error">
                  {{ validationContext.errors[0] }}
                </span>
              </div>
            </ValidationProvider>
          </div>
          <div>
            <ValidationProvider
              v-slot="validationContext"
              name="nota"
              :rules="{ required: true }"
              class="w-1/2"
            >
              <div class="p-form-control">
                <t-textarea
                  v-model="nota.nota"
                  placeholder="Nota"
                  name="Nota"
                  class="p-input"
                  :state="getValidationState(validationContext)"
                />
                <span class="p-error">
                  {{ validationContext.errors[0] }}
                </span>
              </div>
            </ValidationProvider>
          </div>
          <div class="flex w-full justify-between items-center">
            <label for="habilitado">Nota visible</label>
            <t-toggle v-model="nota.habilitado" name="habilitado" checked />
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { extend } from 'vee-validate'
import dataMixin from '~/mixins/data.js'
extend('url', {
  validate(value) {
    if (value) {
      /* eslint-disable */
      return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(
        value
      )
    }
    return false
  },
  message: 'Debes ingresar una url válida',
})

export default {
  mixins: [dataMixin],
  props: {
    info: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      nota: {
        tipo: 'nota',
        habilitado: true,
        titulo: process.env.NODE_ENV !== 'production' ? `Nota #1` : '',
        nota:
          process.env.NODE_ENV !== 'production'
            ? `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget libero iaculis, finibus diam eu, sollicitudin neque. Maecenas ut risus faucibus, sodales neque non, pellentesque justo. Etiam sed sollicitudin nulla. Ut tristique ex ut tortor suscipit, vitae dignissim elit tincidunt. Proin ut cursus nisi.`
            : '',
      },
    }
  },
  mounted() {
    if (this.info) {
      this.nota = { ...this.info }
    }
  },
  methods: {
    async enviar() {
      if (this.isLoggedIn) {
        let resultado
        if (this.info) {
          let index
          const arrInfo = [...this.userData.info.varios]
          const newArr = arrInfo.filter((item, i) => {
            if (this.info === item) index = i
            return this.info !== item
          })
          newArr.splice(index, 0, this.nota)

          resultado = await this.actualizarVarios(newArr)
        } else {
          resultado = await this.agregarNota(this.nota)
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