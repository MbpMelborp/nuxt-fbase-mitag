<template>
  <div class="form_wrap">
    <template v-if="!recuperar">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.stop.prevent="handleSubmit(login)">
          <div class="form_columns">
            <div class="wrap_form_col row-span-3">
              <ValidationProvider
                v-slot="validationContext"
                name="email"
                :rules="`required`"
              >
                <div class="p-form-control">
                  <label for="" class="p-label"> Email </label>
                  <t-input
                    v-model="form.email"
                    required
                    :state="getValidationState(validationContext)"
                  />
                  <span class="p-error">
                    {{ validationContext.errors[0] }}
                  </span>
                </div>
              </ValidationProvider>

              <ValidationProvider
                v-slot="validationContext"
                name="contraseña"
                :rules="`required`"
              >
                <div class="p-form-control">
                  <label for="" class="p-label"> Contraseña </label>
                  <div class="relative">
                    <t-input
                      v-model="form.password"
                      required
                      :state="getValidationState(validationContext)"
                      :type="showPass ? 'text' : 'password'"
                    />
                    <div class="p-icon leading-5" @click="showPass = !showPass">
                      <i v-if="showPass" class="fal fa-eye-slash"></i>
                      <i v-else class="fal fa-eye"></i>
                    </div>
                  </div>

                  <span class="p-error">
                    {{ validationContext.errors[0] }}
                  </span>
                </div>
              </ValidationProvider>
              <ValidationProvider
                v-slot="validationContext"
                name="terminos y condiciones"
                :rules="`required`"
              >
                <div class="p-form-control">
                  <label class="flex items-center ml-2">
                    <t-checkbox
                      v-model="form.sesion"
                      name="sesion"
                      :state="getValidationState(validationContext)"
                    />
                    <span class="ml-2 text-sm"> Seguir logueado</span>
                  </label>
                </div>
              </ValidationProvider>
              <div class="w-full flex justify-center my-4">
                <transition name="p-fade">
                  <div v-if="habilitarBoton">
                    <t-button class="p-btn p-btn-full" type="submit">
                      Ingresar <i class="fal fa-sign-in"></i>
                    </t-button>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </form>
      </ValidationObserver>
      <p class="mt-4 text-center">
        <a
          href="#"
          class="underline"
          type="buton"
          @click="
            recuperar = true
            habilitarBoton = true
          "
        >
          Recuperar contraseña
        </a>
      </p>
    </template>
    <template v-else>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.stop.prevent="handleSubmit(recordarContrasena)">
          <div class="form_columns">
            <div class="wrap_form_col row-span-3">
              <ValidationProvider
                v-slot="validationContext"
                name="email"
                :rules="`required`"
              >
                <div class="p-form-control">
                  <label for="" class="p-label"> Email </label>
                  <t-input
                    v-model="form.email"
                    required
                    :state="getValidationState(validationContext)"
                  />
                  <span class="p-error">
                    {{ validationContext.errors[0] }}
                  </span>
                </div>
              </ValidationProvider>
              <div class="w-full flex justify-center my-4">
                <transition name="p-fade">
                  <div v-if="habilitarBoton">
                    <t-button class="p-btn p-btn-full" type="submit">
                      Enviar correo de recuperación
                      <i class="fal fa-sign-in"></i>
                    </t-button>
                  </div>
                </transition>
              </div>
            </div>
          </div></form
      ></ValidationObserver>
      <p class="mt-4 text-center">
        <a
          href="#"
          type="buton"
          class="underline"
          @click="
            recuperar = false
            habilitarBoton = true
          "
        >
          Ingresar con email y contraseña
        </a>
      </p>
    </template>
  </div>
</template>

<script>
import dataMixin from '~/mixins/data.js'
export default {
  mixins: [dataMixin],
  data() {
    return {
      recuperar: false,
      isExist: false,
      habilitarBoton: true,
      form: {
        email: process.env.NODE_ENV !== 'production' ? `test0.87@gmail.co` : '',
        password: process.env.NODE_ENV !== 'production' ? `Problem4321` : '',
        sesion: true,
      },
      showPass: false,
    }
  },
  mounted() {},
  methods: {
    async login() {
      if (this.isLoggedIn === false) {
        this.habilitarBoton = false
        const resultadoLogins = await this.loginUsuario(this.form)
        console.log('resultadoLogins ', resultadoLogins)
        if (resultadoLogins.error === false) {
          this.$noty.success(resultadoLogins.mensaje, {
            theme: 'bootstrap-v4',
            layout: 'topCenter',
          })
        } else {
          this.habilitarBoton = true
          this.$noty.error(resultadoLogins.mensaje, {
            theme: 'bootstrap-v4',
            layout: 'topCenter',
          })
        }
      }
    },
    recordarContrasena() {
      this.sendPassword()
    },
    sendPassword() {
      try {
        this.habilitarBoton = false
        this.$fire.auth
          .sendPasswordResetEmail(this.form.email)
          .then((resp) => {
            this.$noty.success(
              'Te enviamos un correo con la información para reestablecer tu contraseña',
              {
                theme: 'bootstrap-v4',
                layout: 'topCenter',
              }
            )
          })
          // eslint-disable-next-line node/handle-callback-err
          .catch((error) => {
            this.habilitarBoton = true
            this.$noty.error(
              'Ocurrió un error al procesar la solicitud, por favor inténtalo nuevamente.',
              {
                theme: 'bootstrap-v4',
                layout: 'topCenter',
              }
            )
          })
      } catch (e) {
        alert(e)
      }
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
  },
}
</script>

<style lang="postcss">
.form_wrap {
  .wrap_form_col {
    @apply text-primary-800 border border-primary-100 bg-light rounded-xl p-8 transition-all text-left duration-500 mt-8 mb-24;
    &:focus-within {
      @apply shadow-lg bg-light-200;
    }
    h3 {
      @apply border-b border-third-400 pb-2;
    }
  }
}
</style>