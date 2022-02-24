<template>
  <div class="hero">
    <div class="hero-container">
      <!--Left Col-->
      <div class="hero-container-left">
        <h3>Bienvenido a miTag</h3>
        <p class="hero-wellcome">Estas a punto de activar el Tag:</p>
        <h1 class="hero-code">{{ tag }}</h1>
        <qr-code
          :text="`https://mitag.co/tag/${tag}`"
          :size="240"
          color="#ffc299"
          bg-color="#ffffff"
          error-level="L"
          class="
            w-auto
            md:mx-auto
            lg:mx-0
            p-4
            rounded-lg
            border-4 border-orange-100
            bg-white
            mb-8
          "
        >
        </qr-code>
      </div>
      <!--Right Col-->
      <div class="hero-container-right">
        <TagFormPerfil :tag="tag"></TagFormPerfil>
      </div>
    </div>
  </div>
</template>

<script>
import dataMixin from '~/mixins/data.js'
export default {
  mixins: [dataMixin],
  props: {
    tag: {
      type: String,
      required: true,
    },
  },
  mounted() {},
}
</script>
