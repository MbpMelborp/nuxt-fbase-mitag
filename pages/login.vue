<template>
  <div class="login">
    <div class="hero">
      <div class="hero-container">
        <div class="hero-container-center">
          <div v-if="!isLoggedIn">
            <h3 class="text-5xl">Bienvenido a miTag</h3>
            <p class="hero-wellcome">
              Ingresa con tu nombre de usuario y contraseña
            </p>
            <FormLogin></FormLogin>
          </div>
        </div>
      </div>
    </div>
    <Trama></Trama>
  </div>
</template>

<script>
import dataMixin from '~/mixins/data.js'
export default {
  mixins: [dataMixin],
  middleware: 'noauth',
  mounted() {},
}
</script>

