<template>
  <div :class="view ? '' : 'item-wrapper'">
    <template v-if="!view">
      <div class="item-wrapper-info t-tel">
        <div class="item-tipo">
          <i class="fas fa-phone"></i> {{ info.tipo }}
        </div>
        <div class="item-titulo">
          {{ info.titulo }}
        </div>
        <div class="item-tel">
          <b v-if="tipo">{{ tipo[0].text }}</b> {{ info.tel }}
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
        <button class="editar" @click="aTel = true">
          <i class="fas fa-edit"></i>
        </button>
      </div>

      <t-modal v-model="aTel" class="v-modal" header="Editar Teléfono">
        <TagItemTelForm
          ref="aTel"
          :info="info"
          :edit="true"
          @closeaModal="aTel = false"
        ></TagItemTelForm>
        <template #footer>
          <div class="v-footer flex justify-between">
            <button class="v-cancel" type="button" @click="aTel = false">
              <i class="fas fa-times-circle"></i>
              <span>Cancelar </span>
            </button>
            <button class="v-ok" type="button" @click="enviarTel">
              <span>Editar</span>
              <i class="fas fa-check-circle"></i>
            </button>
          </div>
        </template>
      </t-modal>
    </template>
    <template v-else>
      <b v-if="tipo"> {{ tipo[0].text }} </b>
      <a :href="`tel:${info.tel}`"> {{ info.tel_info.formatted }}</a>
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
      aTel: false,
      tipo: null,
    }
  },
  mounted() {
    this.tipo = this.opciones.filter((obj) => {
      return obj.value === this.info.tipo_tel
    })
    console.log('Tipo', this.tipo)
  },
  methods: {
    async eliminar() {
      const arrInfo = [...this.userData.info.telefonos]

      const newArr = arrInfo.filter((item) => {
        return this.info !== item
      })
      if (this.isLoggedIn) {
        const resultado = await this.actualizarTelefonos(newArr)
        if (resultado.error === false) {
          this.$noty.success(resultado.mensaje, {
            theme: 'bootstrap-v4',
            layout: 'topCenter',
          })
          // setTimeout(() => {
          //   this.$emit('closeaTel')
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