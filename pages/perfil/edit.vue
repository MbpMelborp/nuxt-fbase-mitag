<template>
  <div class="login">
    <div class="hero">
      <div class="hero-container">
        <div v-if="userData" class="hero-container-center">
          <TagFormPerfil :tag="userData.tag" :edicion="true"></TagFormPerfil>
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
  middleware: 'auth',
  mounted() {},
}
</script>