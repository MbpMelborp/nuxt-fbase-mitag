<template>
  <div class="px-2">
    <ValidationObserver ref="observerRef" v-slot="{ handleSubmit }">
      <form novalidate @submit.stop.prevent="handleSubmit(enviar)">
        <div>
          <div>
            <ValidationProvider
              v-slot="validationContext"
              name="url"
              :rules="{ required: true, url: true }"
            >
              <div class="p-form-control">
                <t-input
                  v-model="link.url"
                  placeholder="https://www.example.com"
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
              name="título"
              :rules="{ required: true }"
              class="w-1/2"
            >
              <div class="p-form-control">
                <t-input
                  v-model="link.titulo"
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
          <div class="flex w-full justify-between items-center">
            <label for="habilitado">Link activo</label>
            <t-toggle v-model="link.habilitado" name="habilitado" checked />
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
      return /^(?:(?:https?|http):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
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
      link: {
        tipo: 'link',
        habilitado: true,
        url: process.env.NODE_ENV !== 'production' ? `https://google.com` : '',
        titulo: process.env.NODE_ENV !== 'production' ? `Google` : '',
      },
    }
  },
  mounted() {
    if (this.info) {
      this.link = { ...this.info }
    }
  },
  methods: {
    async enviar() {
      if (this.isLoggedIn && this.$refs.observerRef.flags.valid) {
        let resultado
        if (this.info) {
          let index
          const arrInfo = [...this.userData.info.varios]
          const newArr = arrInfo.filter((item, i) => {
            if (this.info === item) index = i
            return this.info !== item
          })
          newArr.splice(index, 0, this.link)

          resultado = await this.actualizarVarios(newArr)
        } else {
          resultado = await this.agregarLink(this.link)
        }
        if (resultado.error === false) {
          this.$noty.success(resultado.mensaje, {
            theme: 'bootstrap-v4',
            layout: 'topCenter',
          })
          setTimeout(() => {
            this.$emit('closeaLink')
          }, 1000)
        } else {
          this.habilitarBoton = true
          this.$noty.error(resultado.mensaje, {
            theme: 'bootstrap-v4',
            layout: 'topCenter',
          })
        }
      } else {
        this.$noty.error('Por favor verifica la información', {
          theme: 'bootstrap-v4',
          layout: 'topCenter',
        })
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