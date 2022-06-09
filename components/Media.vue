<template>
  <div class="icons-wrapper">
    <div class="text-center iconsel mt-4 haveIcon">
      <i title="Imágenes" class="icon fas fa-images"></i>
    </div>
    <div class="text-center iconsel mt-4 haveIcon">
      <i title="Instagram" class="icon fab fa-instagram"></i>
    </div>
    <div class="text-center iconsel mt-4">
      <i title="TikTok" class="icon fab fa-tiktok"></i>
    </div>
    <div class="text-center iconsel mt-4">
      <i title="Twitter" class="icon fab fa-twitter"></i>
    </div>
    <div class="text-center iconsel mt-4">
      <i title="Facebook" class="icon fab fa-facebook-f"></i>
    </div>
    <div class="text-center iconsel mt-4">
      <i title="YouTube" class="icon fab fa-youtube"></i>
    </div>
    <div class="text-center iconsel mt-4">
      <i title="Spotify" class="icon fab fa-spotify"></i>
    </div>
    <div class="text-center iconsel mt-4">
      <i title="LinkedIn" class="icon fab fa-linkedin-in"></i>
    </div>
    <div class="text-center iconsel mt-4">
      <i title="Vimeo" class="icon fab fa-vimeo"></i>
    </div>
  </div>
</template>
<script>
import dataMixin from '~/mixins/data.js'

export default {
  mixins: [dataMixin],
  props: {
    selected: {
      type: Object,
      required: false,
      default: null,
    },
  },
  mounted() {
    const els = document.querySelectorAll('.iconsel i') // this element contains more than 1 DOMs.
    for (let i = 0; i < els.length; i++) {
      els[i].onclick = (el) => {
        console.log(
          'el.parentElement',
          el.target.parentNode,
          document.querySelectorAll('.iconsel.selected')
        )
        this.$emit('setMedia', el.target.className, el.target.title)
        if (document.querySelector('.iconsel.selected') !== null) {
          document
            .querySelector('.iconsel.selected')
            .classList.remove('selected')
        }
        el.target.parentNode.classList.add('selected')
      }
    }
  },
}
</script>
<style lang="postcss" scoped>
.icons-wrapper {
  @apply grid gap-x-3 gap-y-2 grid-cols-9 mb-8;
  .selected {
    i {
      @apply text-primary-500;
    }
  }
  i {
    @apply text-2xl text-primary-500 cursor-pointer;
  }
}
</style>