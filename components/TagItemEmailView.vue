<template>
  <div class="item-wrapper">
    <div class="item-wrapper-info t-email">
      <div class="item-tipo">
        <i class="fas fa-link"></i> {{ info.tipo }} de trabajo
      </div>
      <div class="item-titulo">
        {{ info.email }}
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
      <button class="editar" @click="aMail = true">
        <i class="fas fa-edit"></i>
      </button>
    </div>

    <t-modal v-model="aMail" class="v-modal" header="Editar Email">
      <TagItemEmailForm
        ref="aMail"
        :info="info"
        :edit="true"
        @closeaModal="aMail = false"
      ></TagItemEmailForm>
      <template #footer>
        <div class="v-footer flex justify-between">
          <button class="v-cancel" type="button" @click="aMail = false">
            <i class="fas fa-times-circle"></i>
            <span>Cancelar </span>
          </button>
          <button class="v-ok" type="button" @click="enviarEmail">
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
  },
  data() {
    return {
      aMail: false,
    }
  },
  methods: {
    async eliminar() {
      if (this.isLoggedIn) {
        const resultado = await this.agregarEmail(null)
        if (resultado.error === false) {
          this.$noty.success(resultado.mensaje, {
            theme: 'bootstrap-v4',
            layout: 'topCenter',
          })
          // setTimeout(() => {
          //   this.$emit('closeaMail')
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