<template>
  <div class="px-2">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form novalidate @submit.stop.prevent="handleSubmit(enviar)">
        <div>
          <div>
            <ValidationProvider
              v-slot="validationContext"
              name="tipo"
              :rules="{ required: true }"
              class="w-1/2"
            >
              <div class="p-form-control">
                <t-select
                  v-model="dir.tipo_dir"
                  placeholder="Selecciona el tipo de dirección"
                  name="telefono"
                  class="p-input"
                  :options="opcionesDir"
                  :state="getValidationState(validationContext)"
                ></t-select>

                <span class="p-error">
                  {{ validationContext.errors[0] }}
                </span>
              </div>
            </ValidationProvider>
          </div>
          <div>
            <ValidationProvider
              v-slot="validationContext"
              name="dirección"
              :rules="{ required: true }"
            >
              <div class="p-form-control">
                <t-input
                  v-model="dir.searchPlace"
                  v-gmaps-searchbox:location="dir"
                  v-click-outside="dirChange"
                  placeholder="Escribe la dirección"
                  :state="getValidationState(validationContext)"
                  @input="dirChange"
                  @keyup="dirChange"
                  @keyDown="dirChange"
                />
                <span class="p-error">
                  {{ validationContext.errors[0] }}
                </span>
              </div>
            </ValidationProvider>
          </div>
          <GmapMap
            v-if="lat && lng"
            :center="{ lat: lat, lng: lng }"
            :zoom="17"
            map-type-id="roadmap"
            class="h-48 w-full mb-8"
          >
            <GmapMarker
              :position="{ lat: lat, lng: lng }"
              :clickable="false"
              :draggable="false"
              @click="center = { lat: lat, lng: lng }"
            />
          </GmapMap>
          <div>
            <ValidationProvider
              v-slot="validationContext"
              name="detalle"
              :rules="{ required: false }"
            >
              <div class="p-form-control">
                <t-input
                  v-model="dir.detalle"
                  placeholder="Detalle de la dirección"
                  :state="getValidationState(validationContext)"
                />
                <span class="p-error">
                  {{ validationContext.errors[0] }}
                </span>
              </div>
            </ValidationProvider>
          </div>
          <div class="flex w-full justify-between items-center">
            <label for="habilitado">Dirección activa</label>
            <t-toggle v-model="dir.habilitado" name="habilitado" checked />
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import dataMixin from '~/mixins/data.js'

export default {
  directives: {
    ClickOutside,
  },
  mixins: [dataMixin],
  props: {
    info: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      dir: {
        searchPlace: '',
        location: {},
        habilitado: true,
        tipo_dir: null,
        detalle: null,
      },
      lat: null,
      lng: null,
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        console.log('QS', document.querySelector('.pac-container'))
        document
          .querySelector('.pac-container')
          .addEventListener('click', () => {
            console.log('CLICK', this.dir.location)
            this.dirChange()
          })
      }, 1000)
    })

    if (this.info) {
      this.dir = { ...this.info }
    }
  },
  methods: {
    dirChange() {
      // this.getAddressObject()
      console.log('Dirección', this.dir.location, this.lat, this.lng)
      if (this.dir.location.geometry) {
        this.lat = this.dir.location.geometry.location.lat()
        this.lng = this.dir.location.geometry.location.lng()
        console.log('Dirección', this.dir.location, this.lat, this.lng)
      }
    },
    async enviar() {
      if (this.isLoggedIn) {
        let resultado
        if (this.info) {
          let index
          const arrInfo = [...this.userData.info.direcciones]
          const newArr = arrInfo.filter((item, i) => {
            if (this.info === item) index = i
            return this.info !== item
          })
          newArr.splice(index, 0, this.dir)

          resultado = await this.actualizarDir(newArr)
        } else {
          resultado = await this.agregarDir(this.dir)
        }
        if (resultado.error === false) {
          this.$noty.success(resultado.mensaje, {
            theme: 'bootstrap-v4',
            layout: 'topCenter',
          })
          setTimeout(() => {
            this.$emit('closeaModal')
          }, 1000)
        } else {
          this.habilitarBoton = true
          this.$noty.error(resultado.mensaje, {
            theme: 'bootstrap-v4',
            layout: 'topCenter',
          })
        }
      }
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
  },
}
</script>

<style lang="postcss" scoped>
.p-form-control {
  @apply mb-1;
}
</style>