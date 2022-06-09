<template>
  <div
    class="item-wrapper"
    :class="(view ? ' view ' : '') + (lectura ? ' lectura ' : '')"
  >
    <div class="item-wrapper-info t-link">
      <div class="item-tipo"><i class="fas fa-link"></i> {{ info.tipo }}</div>
      <div class="item-titulo">
        {{ info.titulo }}
      </div>
      <div class="item-link">
        <a :href="info.url" target="_blank" :class="view ? 'btn-link' : ''">
          <template v-if="!view">
            {{ info.url }}
          </template>
          <template v-else>
            {{ info.titulo }}
          </template>
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
      <button class="editar" @click="aLink = true">
        <i class="fas fa-edit"></i>
      </button>
    </div>

    <t-modal v-model="aLink" class="v-modal" header="Editar Nota">
      <TagItemLinkForm
        ref="aLink"
        :info="info"
        :edit="true"
        @closeaLink="aLink = false"
      ></TagItemLinkForm>
      <template #footer>
        <div class="v-footer flex justify-between">
          <button class="v-cancel" type="button" @click="aLink = false">
            <i class="fas fa-times-circle"></i>
            <span>Cancelar </span>
          </button>
          <button class="v-ok" type="button" @click="enviarLink">
            <span>Editar</span>
            <i class="fas fa-check-circle"></i>
          </button>
        </div>
      </template>
    </t-modal>
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
      aLink: false,
    }
  },
  methods: {
    async eliminar() {
      const arrInfo = [...this.userData.info.varios]

      const newArr = arrInfo.filter((item) => {
        return this.info !== item
      })
      if (this.isLoggedIn) {
        const resultado = await this.actualizarVarios(newArr)
        if (resultado.error === false) {
          this.$noty.success(resultado.mensaje, {
            theme: 'bootstrap-v4',
            layout: 'topCenter',
          })
          // setTimeout(() => {
          //   this.$emit('closeaLink')
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
.view {
  .item-link {
    @apply text-center text-xl;
  }
  .item-tipo,
  .item-titulo,
  .item-habilitado,
  .item-wrapper-acciones {
    @apply hidden;
  }
  &.lectura {
    .item-link {
      @apply text-sm;
    }
  }
}
</style>