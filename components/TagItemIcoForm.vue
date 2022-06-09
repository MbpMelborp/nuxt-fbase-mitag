<template>
  <div class="px-2">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form novalidate @submit.stop.prevent="handleSubmit(enviar)">
        <div>
          <div>
            <div class="p-form-control">
              <Iconos @selIcon="selIcon"></Iconos>
            </div>
          </div>
          <div>
            <ValidationProvider
              v-slot="validationContext"
              name="url"
              :rules="{ required: true, url: true }"
            >
              <div class="p-form-control">
                <t-input
                  v-model="icon.url"
                  :placeholder="
                    tipoUrl ? 'https://www.example.com' : 'Teléfono'
                  "
                  :state="getValidationState(validationContext)"
                />
                <span class="p-error">
                  {{ validationContext.errors[0] }}
                </span>
              </div>
            </ValidationProvider>
          </div>
          <div class="flex w-full justify-between items-center">
            <label for="habilitado">Icono activo</label>
            <t-toggle v-model="icon.habilitado" name="habilitado" checked />
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
      icon: {
        habilitado: true,
        tipo: '',
        url: null,
      },
      tipoUrl: true,
    }
  },
  mounted() {
    if (this.info) {
      this.icon = { ...this.info }
    }
  },
  methods: {
    selIcon(tipo) {
      this.icon.tipo = tipo
      console.log('ICONO', this.icon)
      if (this.icon.tipo === 'icon fab fa-whatsapp') {
        this.tipoUrl = false
      }
    },
    async enviar() {
      if (this.isLoggedIn) {
        let resultado
        if (!this.tipoUrl) {
          this.icon.url = 'https://wa.me/57' + this.icon.url
        }
        if (this.info) {
          let index
          const arrInfo = [...this.userData.info.iconos]
          const newArr = arrInfo.filter((item, i) => {
            if (this.info === item) index = i
            return this.info !== item
          })
          newArr.splice(index, 0, this.icon)

          resultado = await this.actualizarIco(newArr)
        } else {
          resultado = await this.agregarIco(this.icon)
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