<template>
  <div class="h-screen flex items-center justify-center">
    <h2 class="text-6xl">
      Ver tag
      <client-only>
        <b v-if="$route.params.id">{{ $route.params.id }}</b>
      </client-only>
    </h2>
  </div>
</template>

<script>
import dataMixin from '~/mixins/data.js'
export default {
  mixins: [dataMixin],
}
</script>

<style>
</style>