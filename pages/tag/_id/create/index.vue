<template>
  <div class="tag_page">
    <TagHero v-if="tag" :tag="tag"></TagHero>
    <Trama></Trama>
  </div>
</template>

<script>
import dataMixin from '~/mixins/data.js'
export default {
  mixins: [dataMixin],
  middleware: 'noauth',
  data() {
    return {
      title: 'Tags',
      tag: null,
    }
  },
  mounted() {
    if (!this.$route.params.id) {
      this.$router.push({
        path: '/',
        params: { tag: 'not_foud' },
      })
    } else {
      this.tag = this.$route.params.id
      this.tag = this.tag.normalize('NFD').replace(/[\u0300-\u036F]/g, '')
    }
  },
}
</script>

<style lang="postcss">
.tag_page {
  @apply w-full;
}
</style>