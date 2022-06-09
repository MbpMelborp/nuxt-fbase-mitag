<template>
  <div
    class="item-wrapper"
    :class="(view ? ' view ' : '') + (lectura ? ' lectura ' : '')"
  >
    <div class="item-wrapper-info t-nota">
      <div class="item-tipo">
        <i class="fas fa-sticky-note"></i> {{ info.tipo }}
      </div>
      <div class="item-titulo">
        {{ info.titulo }}
      </div>
      <div class="item-nota">
        <p>
          {{ info.nota }}
        </p>
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
      <button class="editar" @click="aNot = true">
        <i class="fas fa-edit"></i>
      </button>
    </div>

    <t-modal v-model="aNot" class="v-modal" header="Editar link">
      <TagItemNotaForm
        ref="aNot"
        :info="info"
        :edit="true"
        @closeaModal="aNot = false"
      ></TagItemNotaForm>
      <template #footer>
        <div class="v-footer flex justify-between">
          <button class="v-cancel" type="button" @click="aNot = false">
            <i class="fas fa-times-circle"></i>
            <span>Cancelar </span>
          </button>
          <button class="v-ok" type="button" @click="enviarNota">
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
      aNot: false,
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
          //   this.$emit('closeaNot')
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
  .item-titulo {
    @apply text-xl mb-2;
  }
  .item-nota {
    @apply text-base mb-2;
  }
  .item-tipo,
  .item-habilitado,
  .item-wrapper-acciones {
    @apply hidden;
  }
  &.lectura {
    .item-titulo {
      @apply text-base mb-2;
    }
    .item-nota {
      @apply text-xs mb-2;
    }
  }
}
</style>