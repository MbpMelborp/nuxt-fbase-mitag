<template>
  <div class="login">
    <div class="hero">
      <div class="hero-container">
        <div class="hero-container-center2">
          <TagView v-if="info" :tag="info.doc.id" :lectura="false"></TagView>
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
  // middleware: 'auth',
  data() {
    return {
      tag: null,
      info: null,
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
      this.getTag()
    }
  },
  methods: {
    async getTag() {
      this.info = await this.getTagById(this.tag)
      console.log('INFO TAG', this.info)
      if (this.info.error) {
        this.$router.push({
          path: '/',
          params: { tag: 'not_foud' },
        })
      } else if (!this.info.doc.usado) {
        this.$router.push({
          path: '/tag/' + this.tag + '/create',
          params: { tag: 'createfromview' },
        })
      }
    },
  },
}
</script>

