<template>
  <div class="login">
    <div class="hero">
      <div class="hero-container">
        <div class="hero-container-center">
          <UserTags></UserTags>
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

