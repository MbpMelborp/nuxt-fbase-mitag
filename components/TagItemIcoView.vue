<template>
  <div :class="view ? '' : 'item-wrapper'">
    <template v-if="!view">
      <div class="item-wrapper-info t-ico">
        <div class="item-icono">
          <a :href="info.url" target="_blank" :class="view ? 'btn-link' : ''">
            <i :class="info.tipo"></i>
          </a>
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
        <button class="editar" @click="aIcon = true">
          <i class="fas fa-edit"></i>
        </button>
      </div>

      <t-modal v-model="aIcon" class="v-modal" header="Editar Icono">
        <TagItemIcoForm
          ref="aIcon"
          :info="info"
          :edit="true"
          @closeaModal="aIcon = false"
        ></TagItemIcoForm>
        <template #footer>
          <div class="v-footer flex justify-between">
            <button class="v-cancel" type="button" @click="aIcon = false">
              <i class="fas fa-times-circle"></i>
              <span>Cancelar </span>
            </button>
            <button class="v-ok" type="button" @click="enviarIco">
              <span>Editar</span>
              <i class="fas fa-check-circle"></i>
            </button>
          </div>
        </template>
      </t-modal>
    </template>
    <template v-else>
      <a :href="info.url" target="_blank">
        <i :class="info.tipo"></i>
      </a>
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
      aIcon: false,
      tipo: null,
    }
  },
  mounted() {},
  methods: {
    async eliminar() {
      const arrInfo = [...this.userData.info.iconos]

      const newArr = arrInfo.filter((item) => {
        return this.info !== item
      })
      if (this.isLoggedIn) {
        const resultado = await this.actualizarIco(newArr)
        if (resultado.error === false) {
          this.$noty.success(resultado.mensaje, {
            theme: 'bootstrap-v4',
            layout: 'topCenter',
          })
          // setTimeout(() => {
          //   this.$emit('closeaIcon')
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