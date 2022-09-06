<template>
  <div class="px-2">
    <ValidationObserver ref="observerRef" v-slot="{ handleSubmit }">
      <form novalidate @submit.stop.prevent="handleSubmit(enviar)">
        <div>
          <div>
            <ValidationProvider
              v-slot="validationContext"
              name="email"
              :rules="{ required: true, email: true }"
            >
              <div class="p-form-control">
                <t-input
                  v-model="email.email"
                  placeholder="mail@ejemplo.com"
                  :state="getValidationState(validationContext)"
                />
                <span class="p-error">
                  {{ validationContext.errors[0] }}
                </span>
              </div>
            </ValidationProvider>
          </div>

          <div class="flex w-full justify-between items-center">
            <label for="habilitado">Email activo</label>
            <t-toggle v-model="email.habilitado" name="habilitado" checked />
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
      email: {
        tipo: 'email',
        habilitado: true,
        email: '',
        tipo_email: 'trabajo',
      },
    }
  },
  mounted() {
    if (this.info) {
      this.email = { ...this.info }
    }
  },
  methods: {
    async enviar() {
      if (this.isLoggedIn && this.$refs.observerRef.flags.valid) {
        const resultado = await this.agregarEmail(this.email)
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