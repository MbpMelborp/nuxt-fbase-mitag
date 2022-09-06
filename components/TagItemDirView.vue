<template>
  <div v-if="tipo" :class="view ? '' : 'item-wrapper'">
    <template v-if="!view">
      <div class="item-wrapper-info t-dir">
        <div class="item-tipo">
          <i v-if="tipo" class="fas fa-map-marker"></i>
          <span v-if="tipo[0]">{{ tipo[0].text }}</span>
        </div>
        <div class="item-titulo mb-2">
          {{ info.location.address }} <br />{{ info.detalle }}
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
        <!-- <button class="editar" @click="aDir = true">
          <i class="fas fa-edit"></i>
        </button> -->
      </div>

      <t-modal v-model="aDir" class="v-modal" header="Editar Dirección">
        <TagItemDirForm
          ref="aDir"
          :info="info"
          :edit="true"
          @closeaModal="aDir = false"
        ></TagItemDirForm>
        <template #footer>
          <div class="v-footer flex justify-between">
            <button class="v-cancel" type="button" @click="aDir = false">
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
      <div class="text-left text-base">
        <button class="text-left" @click="aView = true">
          <b> Ver mapa </b> - {{ info.detalle }}
        </button>
      </div>

      <t-modal
        v-model="aView"
        class="v-modal"
        :header="info.location.address + ' - ' + info.detalle"
      >
        <GmapMap
          v-if="info.location.geometry.lat && info.location.geometry.lng"
          :center="{
            lat: info.location.geometry.lat,
            lng: info.location.geometry.lng,
          }"
          :zoom="17"
          map-type-id="roadmap"
          class="h-48 w-full mb-8"
        >
          <GmapMarker
            :position="{
              lat: info.location.geometry.lat,
              lng: info.location.geometry.lng,
            }"
            :clickable="false"
            :draggable="false"
            @click="
              center = {
                lat: info.location.geometry.lat,
                lng: info.location.geometry.lng,
              }
            "
          />
        </GmapMap>
      </t-modal>
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
      aDir: false,
      tipo: null,
      aView: false,
    }
  },
  mounted() {
    this.tipo = this.opcionesDir.filter((obj) => {
      return obj.value === this.info.tipo_dir
    })
    console.log('Tipo', this.tipo)
  },
  methods: {
    async eliminar() {
      const arrInfo = [...this.userData.info.direcciones]

      const newArr = arrInfo.filter((item) => {
        return this.info !== item
      })
      if (this.isLoggedIn) {
        const resultado = await this.actualizarDir(newArr)
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