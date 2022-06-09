<template>
  <div class="px-2">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form novalidate @submit.stop.prevent="handleSubmit(enviar)">
        <div>
          <div>
            <div class="p-form-control">
              <Media @setMedia="setMedia"></Media>
            </div>
          </div>
          <div v-if="media.tipo !== 'Imágenes'">
            <ValidationProvider
              v-slot="validationContext"
              name="url"
              :rules="{ required: media.tipo !== 'Imágenes' }"
            >
              <div class="p-form-control">
                <t-textarea
                  v-model="media.url"
                  placeholder="Código a insertar"
                  :state="getValidationState(validationContext)"
                />
                <span class="p-error">
                  {{ validationContext.errors[0] }}
                </span>
              </div>
            </ValidationProvider>
          </div>
          <div v-else class="mb-4">
            <label
              class="
                w-full
                flex flex-col
                items-center
                px-4
                py-4
                bg-primary-100
                rounded-md
                shadow-md
                tracking-wide
                border border-blue
                cursor-pointer
                hover:bg-primary-100
                text-primary-500
                ease-linear
                transition-all
                duration-150
              "
            >
              <i class="far fa-file-upload fa-3x font-light"></i>
              <span class="mt-2 text-base leading-normal"
                >Seleccionar imágenes</span
              >
              <input
                ref="archivo"
                type="file"
                accept=".gif,.png,.jpg,.jpeg"
                name="archivo"
                class="hidden"
                multiple
                @change="verificarArchivo"
              />
            </label>
            <div class="imagenes grid grid-cols-8 mt-2">
              <template v-for="(file, i) in urls"
                ><div :key="i" class="relative mx-1 my-1">
                  <button
                    class="absolute -right-1 -top-3 text-lg"
                    @click="quitarArchivo(i)"
                  >
                    <i class="bg-white fas fa-times-circle rounded-full"></i>
                  </button>
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
          <div class="flex w-full justify-between items-center">
            <label for="habilitado">Media activo</label>
            <t-toggle v-model="media.habilitado" name="habilitado" checked />
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import dataMixin from '~/mixins/data.js'

export default {
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
      media: {
        habilitado: true,
        tipo: '',
        cla: '',
        url: null,
      },
      img: { src: '' },
      files: [],
      urls: [],
      uploads: [],
    }
  },
  mounted() {
    if (this.info) {
      this.media = { ...this.info }
      if (this.media.tipo === 'Imágenes') {
        this.urls = [...this.media.url]
        // this.$nextTick(() => {
        //   this.loadFiles()
        // })
      }
    }
  },
  methods: {
    async loadFiles() {
      const dt = new DataTransfer()
      const promises = []
      this.urls.forEach((file, index) => {
        promises[index] = this.getFileFromUrl(file, `file-${index}`)
      })
      const fls = await Promise.all(promises)
      fls.forEach((file) => {
        dt.items.add(file)
      })
      // this.$refs.archivo.prop('files', dt.files)
      // this.$refs.archivo.files = dt.files // Assign the updates list
      this.files = this.$refs.archivo.files
      console.log('loadFiles FILES up ->', this.files, this.$refs.archivo)
    },
    async getFileFromUrl(url, name, defaultType = 'image/png') {
      const response = await fetch(url)
      const data = await response.blob()
      return new File([data], name, {
        type: data.type || defaultType,
      })
    },
    quitarArchivo(index) {
      console.log(
        'quitarArchivo FILES',
        this.urls[index].startsWith('htt'),
        this.files,
        this.$refs.archivo.files
      )
      if (!this.urls[index].startsWith('htt')) {
        const dt = new DataTransfer()
        this.$refs.archivo.files.forEach((file, i) => {
          if (index !== i) dt.items.add(file)
        })
        this.$refs.archivo.files = dt.files // Assign the updates list
        this.files = dt.files
      }
      this.urls.splice(index, 1)
    },
    verificarArchivo(e) {
      e.preventDefault()
      this.files = this.$refs.archivo.files
      console.log('FILES verificarArchivo up ->', this.files, e.target.files)
      if (this.$refs.archivo.files.length > 0) {
        this.files.forEach((file, index) => {
          const reader = new FileReader()
          reader.onload = (e) => {
            this.urls.push(e.target.result)
          }
          reader.readAsDataURL(file)
          // this.uploadImageAsPromise(file).then((url) => {
          //   console.log('url->', url)
          // })
        })
      }
    },
    setMedia(cla, tipo) {
      this.media.tipo = tipo
      this.media.cla = cla
      console.log('MEDIA', this.media)
    },
    async enviar() {
      if (this.isLoggedIn) {
        let resultado
        if (this.media.tipo === 'Imágenes') {
          if (this.$refs.archivo.files.length > 0 || this.urls.length > 0) {
            const promises = []
            this.files.forEach((file, index) => {
              promises[index] = this.uploadImageAsPromise(file)
            })
            const urls = await Promise.all(promises)
            const filt = this.urls.filter((url) => {
              return url.startsWith('htt')
            })
            this.media.url = [...filt, ...urls]
            console.log('enviar URLS cargadas', urls, filt)
            if (this.info) {
              let index

              if (this.userData.info.medias.length > 0) {
                const arrInfo = [...this.userData.info.medias]
                const newArr = arrInfo.filter((item, i) => {
                  if (this.info === item) index = i
                  return this.info !== item
                })
                newArr.splice(index, 0, this.media)
                resultado = await this.actualizarMedia(newArr)
              } else {
                resultado = await this.actualizarMedia([this.media])
              }
            } else {
              resultado = await this.agregarMedia(this.media)
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
          } else {
            this.$noty.error('Por favor selecciona una imagen para subir', {
              theme: 'bootstrap-v4',
              layout: 'topCenter',
            })
            return false
          }
        } else {
          if (this.info) {
            let index
            const arrInfo = [...this.userData.info.medias]
            const newArr = arrInfo.filter((item, i) => {
              if (this.info === item) index = i
              return this.info !== item
            })
            newArr.splice(index, 0, this.media)

            resultado = await this.actualizarMedia(newArr)
          } else {
            resultado = await this.agregarMedia(this.media)
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
      }
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },

    async uploadImageAsPromise(imageFile) {
      const name = this.userData.tag + '/' + imageFile.name
      const storageRef = this.$fire.storage.ref(name)

      try {
        const task = await storageRef.put(imageFile)
        const url = await storageRef.getDownloadURL()
        console.log('FILE->', url, task)
        return url
      } catch (e) {
        console.error('ERROR', e.message)
        return false
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