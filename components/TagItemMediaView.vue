
<template>
  <div :class="view ? '' : 'item-wrapper'">
    <template v-if="!view">
      <div class="item-wrapper-info t-media">
        <div class="item-icono ml-2">
          <i :class="info.cla"></i>
        </div>
        <div
          v-if="info.tipo !== 'Imágenes'"
          class="item-embed"
          v-html="info.url"
        ></div>
        <div v-else>
          <div class="imagenes flex mt-2">
            <template v-for="(file, i) in info.url"
              ><div :key="i" class="relative mx-1 my-1">
                <img
                  :src="file"
                  class="
                    w-12
                    h-12
                    object-cover
                    border border-primary-500
                    rounded-md
                  "
                /></div
            ></template>
          </div>
        </div>
        <div
          class="item-habilitado"
          :class="info.habilitado ? 'activo' : 'inactivo'"
        >
          <span v-if="info.habilitado">
            Activo <i class="fas fa-check-circle"></i>
          </span>
          <span v-else> Inactivo <i class="fas fa-times-circle"></i> </span>
        </div>
      </div>
      <div class="item-wrapper-acciones">
        <button class="borrar" @click="eliminar">
          <i class="fas fa-trash-alt"></i>
        </button>
        <button class="editar" @click="aMedia = true">
          <i class="fas fa-edit"></i>
        </button>
      </div>

      <t-modal v-model="aMedia" class="v-modal" header="Editar Media">
        <TagItemMediaForm
          ref="aMedia"
          :info="info"
          :edit="true"
          @closeaModal="aMedia = false"
        ></TagItemMediaForm>
        <template #footer>
          <div class="v-footer flex justify-between">
            <button class="v-cancel" type="button" @click="aMedia = false">
              <i class="fas fa-times-circle"></i>
              <span>Cancelar </span>
            </button>
            <button class="v-ok" type="button" @click="enviarMedia">
              <span>Editar</span>
              <i class="fas fa-check-circle"></i>
            </button>
          </div>
        </template>
      </t-modal>
    </template>
    <template v-else>
      <center v-if="info.tipo !== 'Imágenes'">
        <div class="item-embed" v-html="info.url"></div>
      </center>
      <div v-else class="item-embed">
        <div
          :class="
            info.url.length === 1
              ? 'masonry-1-col'
              : info.url.length === 2
              ? 'masonry-2-col'
              : 'lg:masonry-3-col masonry-2-col '
          "
        >
          <template v-for="(file, y) in info.url">
         
            <div
              :key="'i' + y"
              class="rounded-lg p-1 break-inside border border-primary-200"
            >
              <img :src="file" class="rounded" />
            </div>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import dataMixin from '~/mixins/data.js'

export default {
  mixins: [dataMixin],
  props: {
    info: {
      type: Object,
      required: true,
    },
    view: {
      type: Boolean,
      required: false,
      default: false,
    },
    lectura: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  data() {
    return {
      aMedia: false,
      tipo: null,
    }
  },
  mounted() {
    if (window.instgrm) {
      window.instgrm.Embeds.process()
    }
    if (window.twitter) {
      window.twitter.widgets.load()
    }
  },
  methods: {
    async eliminar() {
      const arrInfo = [...this.userData.info.medias]

      const newArr = arrInfo.filter((item) => {
        return this.info !== item
      })
      if (this.isLoggedIn) {
        const resultado = await this.actualizarMedia(newArr)
        if (resultado.error === false) {
          this.$noty.success(resultado.mensaje, {
            theme: 'bootstrap-v4',
            layout: 'topCenter',
          })
          // setTimeout(() => {
          //   this.$emit('closeaMedia')
          // }, 1000)
        } else {
          this.habilitarBoton = true
          this.$noty.error(resultado.mensaje, {
            theme: 'bootstrap-v4',
            layout: 'topCenter',
          })
        }
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.p-form-control {
  @apply mb-1;
}
</style>