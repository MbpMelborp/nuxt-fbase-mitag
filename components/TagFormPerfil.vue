<template>
  <div
    v-if="(edicion || !isLoggedIn) && tagOk"
    class="form_wrap"
    :class="lectura ? `lectura` : ``"
  >
    <ValidationObserver v-slot="{ handleSubmit }">
      <form novalidate @submit.stop.prevent="handleSubmit(submitUsuario)">
        <div class="form_columns">
          <div class="wrap_form_col row-span-3">
            <div class="mb-16">
              <client-only>
                <div v-if="edicion && img.src" class="mx-auto w-72 h-72 mb-8">
                  <cropper
                    ref="cropper"
                    class="twitter-cropper"
                    background-class="twitter-cropper__background"
                    foreground-class="twitter-cropper__foreground"
                    image-restriction="stencil"
                    :stencil-size="stencilSize"
                    :stencil-props="{
                      lines: {},
                      handlers: {},
                      movable: false,
                      scalable: false,
                      aspectRatio: 1,
                      previewClass: 'twitter-cropper__stencil',
                    }"
                    :transitions="false"
                    :canvas="true"
                    :debounce="false"
                    :default-size="defaultSize"
                    :min-width="150"
                    :min-height="150"
                    :src="img.src"
                    @change="onChange"
                  />
                </div>
                <!-- <NiceAvatar></NiceAvatar> -->
                <Navigation
                  v-if="edicion"
                  class="w-72 mx-auto mb-8"
                  :zoom="zoom"
                  @change="onZoom"
                />
                <div v-if="edicion" class="w-full mb-8">
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
                      >Seleccionar foto de perfil</span
                    >
                    <input
                      ref="archivo"
                      type="file"
                      accept=".gif,.png,.jpg,.jpeg"
                      name="archivo"
                      class="hidden"
                      @change="verificarArchivo"
                    />
                  </label>
                  <p
                    v-if="nombre"
                    class="text-center my-2 text-xs text-primary-200"
                  >
                    {{ nombre }}
                  </p>
                  <button
                    v-if="listo"
                    class="
                      btn-link-light
                      mx-auto
                      text-xm
                      flex
                      justify-around
                      space-x-8
                      mb-8
                    "
                    type="button"
                    @click="finalizarImagen"
                  >
                    <span>Guardar imagen </span> <i class="far fa-edit"></i>
                  </button>
                </div>

                <!-- <img v-if="blob" :src="blob" /> -->
              </client-only>
              <ValidationProvider
                v-slot="validationContext"
                name="email"
                :rules="{ email: true, required: true }"
              >
                <div class="p-form-control">
                  <label for="" class="p-label"> Email personal </label>
                  <t-input
                    v-model="form.email"
                    type="email"
                    required
                    :state="getValidationState(validationContext)"
                  />
                  <span class="p-error">
                    {{ validationContext.errors[0] }}
                  </span>
                </div>
              </ValidationProvider>
              <div class="w-full flex space-x-2">
                <ValidationProvider
                  v-slot="validationContext"
                  name="primer nombre"
                  :rules="`required`"
                  class="w-1/2"
                >
                  <div class="p-form-control">
                    <label for="primer_nombre" class="p-label">
                      Primer nombre
                    </label>
                    <t-input
                      v-model="form.primer_nombre"
                      name="primer_nombre"
                      class="p-input"
                      :class="lectura ? `disabled showd` : ``"
                      :disabled="lectura"
                      :state="getValidationState(validationContext)"
                    />
                    <span class="p-error">
                      {{ validationContext.errors[0] }}
                    </span>
                  </div>
                </ValidationProvider>

                <ValidationProvider
                  v-slot="validationContext"
                  name="segundo nombre"
                  class="w-1/2"
                >
                  <div class="p-form-control">
                    <label for="primer_nombre" class="p-label">
                      Segundo nombre
                    </label>
                    <t-input
                      v-model="form.segundo_nombre"
                      name="primer_nombre"
                      class="p-input"
                      :class="lectura ? `disabled showd` : ``"
                      :disabled="lectura"
                      :state="getValidationState(validationContext)"
                    />
                  </div>
                </ValidationProvider>
              </div>
              <ValidationProvider
                v-slot="validationContext"
                name="Apellidos"
                :rules="{ required: true }"
              >
                <div class="p-form-control">
                  <label for="primer_apellido" class="p-label">
                    Apellidos
                  </label>
                  <t-input
                    v-model="form.apellidos"
                    name="primer_apellido"
                    class="p-input"
                    :class="lectura ? `disabled showd` : ``"
                    :disabled="lectura"
                    :state="getValidationState(validationContext)"
                  />
                  <span class="p-error">
                    {{ validationContext.errors[0] }}
                  </span>
                </div>
              </ValidationProvider>

              <ValidationProvider
                v-slot="validationContext"
                name="Título"
                :rules="{ required: false }"
              >
                <div class="p-form-control">
                  <label for="titulo" class="p-label">
                    Título (Sr., Sra., Dr. Ingeniero ... )
                  </label>
                  <t-input
                    v-model="form.titulo"
                    name="titulo"
                    class="p-input"
                    :class="lectura ? `disabled showd` : ``"
                    :disabled="lectura"
                    :state="getValidationState(validationContext)"
                  />
                  <span class="p-error">
                    {{ validationContext.errors[0] }}
                  </span>
                </div>
              </ValidationProvider>

              <ValidationProvider
                v-slot="validationContext"
                name="fecha"
                :rules="{ required: true }"
              >
                <div class="p-form-control">
                  <label for="fecha" class="p-label">
                    Fecha de nacimiento
                  </label>
                  <t-input
                    v-model="form.fecha"
                    name="fecha"
                    class="p-input"
                    :class="lectura ? `disabled showd` : ``"
                    :disabled="lectura"
                    :state="getValidationState(validationContext)"
                    type="date"
                    :min="minDateS"
                    :max="maxDateS"
                  />
                  <span class="p-error">
                    {{ validationContext.errors[0] }}
                  </span>
                </div>
              </ValidationProvider>
              <div class="w-full flex space-x-2">
                <ValidationProvider
                  v-slot="validationContext"
                  name="empresa"
                  :rules="{ required: false }"
                  class="w-1/2"
                >
                  <div class="p-form-control">
                    <label for="empresa" class="p-label"> Empresa </label>
                    <t-input
                      v-model="form.empresa"
                      name="empresa"
                      class="p-input"
                      :class="lectura ? `disabled showd` : ``"
                      :disabled="lectura"
                      :state="getValidationState(validationContext)"
                      type="text"
                    />
                    <span class="p-error">
                      {{ validationContext.errors[0] }}
                    </span>
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="validationContext"
                  name="cargo"
                  :rules="{ required: false }"
                  class="w-1/2"
                >
                  <div class="p-form-control">
                    <label for="cargo" class="p-label"> Cargo </label>
                    <t-input
                      v-model="form.cargo"
                      name="cargo"
                      class="p-input"
                      :class="lectura ? `disabled showd` : ``"
                      :disabled="lectura"
                      :state="getValidationState(validationContext)"
                      type="text"
                    />
                    <span class="p-error">
                      {{ validationContext.errors[0] }}
                    </span>
                  </div>
                </ValidationProvider>
              </div>

              <ValidationProvider
                v-slot="validationContext"
                name="celular"
                :rules="{ required: true }"
              >
                <div class="p-form-control z-20">
                  <label for="celular" class="p-label"> Celular </label>
                  <vue-tel-input
                    v-model="phone"
                    name="celular"
                    class="p-input"
                    country="CO"
                    placeholder="Selecciona tu país e ingresa tu celular "
                    :class="lectura ? `disabled showd` : ``"
                    :disabled="lectura"
                    :state="getValidationState(validationContext)"
                    v-bind="bindProps"
                    @input="phoneChange"
                  ></vue-tel-input>

                  <span class="p-error">
                    {{ validationContext.errors[0] }}
                  </span>
                </div>
              </ValidationProvider>

              <!-- <VuePhoneNumberInput v-model="form.celular" /> -->

              <ValidationProvider
                v-if="!lectura && !edicion"
                v-slot="validationContext"
                name="contraseña"
                :rules="{ required: true, regex: /(?=.*[0-9a-zA-Z]).{6,}/ }"
              >
                <div class="p-form-control">
                  <label for="password" class="p-label"> Contraseña </label>
                  <div class="relative">
                    <t-input
                      v-model="form.password"
                      name="password"
                      class="p-input"
                      :state="getValidationState(validationContext)"
                      :type="showPass ? 'text' : 'password'"
                    />
                    <div class="p-icon leading-5" @click="showPass = !showPass">
                      <i v-if="showPass" class="fal fa-eye-slash"></i>
                      <i v-else class="fal fa-eye"></i>
                    </div>
                  </div>

                  <span class="p-error">
                    {{ validationContext.errors[0] }}
                  </span>

                  <div class="p-validate">
                    <ul>
                      <li>
                        <i
                          v-if="form.password.length > 5"
                          class="fas fa-check-circle"
                        ></i>
                        <i v-else class="fas fa-circle"></i>
                        <span>
                          La contraseña debe tener más de 6 caracteres</span
                        >
                      </li>
                      <li>
                        <i
                          v-if="/(?=.*[0-9a-zA-Z]).{6,}/.test(form.password)"
                          class="fas fa-check-circle"
                        ></i>
                        <i v-else class="fas fa-circle"></i>
                        <span>
                          Se permiten mayúsculas, minúsculas, números, espacios
                          y caracteres especiales</span
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </ValidationProvider>
              <ValidationProvider
                v-slot="validationContext"
                name="cargo"
                :rules="{ required: true, terminos: true }"
                class="w-full"
              >
                <div class="p-form-control">
                  <label class="flex items-center">
                    <t-checkbox
                      v-model="form.terminos"
                      name="terminos"
                      :value="true"
                      :checked="form.terminos"
                      :disabled="lectura"
                      :state="getValidationState(validationContext)"
                    />
                    <span class="ml-2 text-sm"
                      >Acepto la
                      <a
                        href="https://mitag.co/politica-de-tratamiento-de-datos-de-la-informacion/"
                        target="_blank"
                        >política de tratamiento de datos</a
                      ></span
                    >
                  </label>
                  <span class="p-error">
                    {{ validationContext.errors[0] }}
                  </span>
                </div>
              </ValidationProvider>
              <div v-if="!lectura" class="w-full flex justify-end m-4 p-8">
                <transition name="p-fade">
                  <div v-if="habilitarBoton">
                    <t-button type="submit">
                      <template v-if="edicion"> Actualizar usuario</template>
                      <template v-else> Activar tag</template>
                      <i class="fal fa-sign-in"></i>
                    </t-button>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
// import NiceAvatar from 'vue-nice-avatar'

import { extend } from 'vee-validate'
import departamentos from '~/static/departamentos.json'
import dataMixin from '~/mixins/data.js'

import Navigation from '~/components/Navigation'

extend('username', {
  validate(value, args) {
    console.log(args.val)
    return args.val === 'false'
  },
  params: ['val'],
  message: 'This username is already taken',
})

export default {
  components: {
    Navigation,
    // NiceAvatar,
  },
  mixins: [dataMixin],
  props: {
    tag: {
      type: String,
      required: true,
    },
    lectura: {
      type: Boolean,
      default: false,
    },
    edicion: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      phone: null,
      departamentos,
      tagOk: false,
      municipios: null,
      showPass: false,
      habilitarBoton: true,
      autocomplete: null,
      places: null,
      map: null,
      error_mapa: false,
      mensaje_mapa: '',
      minDateS: null,
      maxDateS: null,
      form: null,
      bindProps: {
        mode: 'international',
        inputOptions: {
          country: 'CO',
          placeholder: 'Selecciona tu país e ingresa tu teléfono ',
        },
      },
      showCropper: false,
      // Navigation
      zoom: 0,
      img: { src: require('~/assets/images/avatar_add.svg') },
      blob: null,
      url: null,
      listo: false,
      nombre: null,
    }
  },
  beforeMount() {
    if (!this.edicion)
      if (this.isLoggedIn) {
        this.$router.push({
          path: `/tag/${this.tag}`,
          params: { tag: 'usado' },
        })
      }
  },
  mounted() {
    extend('uniqueEmail', {
      validate: this.isEmailUnique,
      message: 'Ya existe una persona registrada con este email',
    })
    extend('terminos', {
      validate(value, args) {
        console.log('terminos', value)
        return value === true
      },
      params: ['val'],
      message: 'Acepta los términos y condiciones',
    })
    if (!this.edicion) {
      this.checkTag(this.tag)
    } else {
      this.getForm()
    }
    this.setFechas()
  },

  methods: {
    async checkTag(tag) {
      const tagInfo = await this.getTagById(tag)
      if (tagInfo.error === false) {
        if (tagInfo.doc.usado) {
          this.$router.push({
            path: `/tag/${tag}`,
            params: { tag: 'usado' },
          })
        } else {
          this.tagOk = true
          this.form = this.$estructuras('tag')
          this.form.id = this.tag
          this.form.tag = this.tag
        }
      } else {
        this.$noty.success(tagInfo.mensaje, {
          theme: 'bootstrap-v4',
          layout: 'topCenter',
        })
      }
    },
    getForm() {
      this.tagOk = true
      this.form = { ...this.userData }
      this.phone = this.form.telefono_celular
      this.form.telefono_celular_info = this.userData.telefono_celular_info
      if (this.form.foto) this.img.src = this.form.foto
      // this.$set(this.form, this.userData)
    },
    phoneChange(phone, phoneo) {
      this.form.telefono_celular = phone
      this.form.telefono_celular_info = phoneo
    },
    setFechas() {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const minDate = new Date(today)
      minDate.setYear(minDate.getFullYear() - 120)
      const maxDate = new Date(today)
      maxDate.setYear(maxDate.getFullYear() - 14)
      this.maxDateS = this.$moment(maxDate).format('YYYY-MM-DD')
      this.minDateS = this.$moment(minDate).format('YYYY-MM-DD')
    },
    cambiarDepartamento(evt) {
      this.municipios =
        this.departamentos[this.form.contacto.departamento].municipios

      this.form.contacto.municipio = this.municipios[0].value
    },
    async submitUsuario() {
      try {
        this.habilitarBoton = false

        const resultadoRegistro = !this.isLoggedIn
          ? await this.registrarUsuario(this.form)
          : await this.editarUsuario(this.form)

        if (resultadoRegistro.error === false) {
          this.habilitarBoton = true
          this.$noty.success(resultadoRegistro.mensaje, {
            theme: 'bootstrap-v4',
            layout: 'topCenter',
          })
        } else {
          this.habilitarBoton = true
          this.$noty.error(resultadoRegistro.mensaje, {
            theme: 'bootstrap-v4',
            layout: 'topCenter',
          })
        }
      } catch (e) {
        this.habilitarBoton = true
        this.$noty.error('Ocurrió un error al activar el Tag', {
          theme: 'bootstrap-v4',
          layout: 'topCenter',
        })
        console.error('└──🚨 | ⛹  >  ACTION submitUsuario data', e)
      }
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    async isEmailUnique() {
      try {
        const usuarioRef = await this.$fire.auth.getUserByEmail(this.form.email)
        console.log('Usuario email: ', usuarioRef)

        return false
      } catch (err) {
        console.log('Usuario email error:', err)
        return true
      }
    },
    defaultSize({ imageSize }) {
      return {
        width: Math.min(imageSize.height, imageSize.width),
        height: Math.min(imageSize.height, imageSize.width),
      }
    },
    stencilSize({ boundaries }) {
      return {
        width: Math.min(boundaries.height, boundaries.width),
        height: Math.min(boundaries.height, boundaries.width),
      }
    },
    onChange(result) {
      const cropper = this.$refs.cropper
      if (cropper) {
        const { coordinates, imageSize } = cropper
        if (
          imageSize.width / imageSize.height >
          coordinates.width / coordinates.height
        ) {
          // Determine the position of slider bullet
          // It's 0 if the stencil has the maximum size and it's 1 if the has the minimum size
          this.zoom =
            (cropper.imageSize.height - cropper.coordinates.height) /
            (cropper.imageSize.height - cropper.sizeRestrictions.minHeight)
        } else {
          this.zoom =
            (cropper.imageSize.width - cropper.coordinates.width) /
            (cropper.imageSize.width - cropper.sizeRestrictions.minWidth)
        }
      }
    },
    onZoom(value) {
      const cropper = this.$refs.cropper
      if (cropper) {
        if (cropper.imageSize.height < cropper.imageSize.width) {
          const minHeight = cropper.sizeRestrictions.minHeight
          const imageHeight = cropper.imageSize.height
          // Determine the current absolute zoom and the new absolute zoom
          // to calculate the sought relative zoom value
          cropper.zoom(
            (imageHeight - this.zoom * (imageHeight - minHeight)) /
              (imageHeight - value * (imageHeight - minHeight))
          )
        } else {
          const minWidth = cropper.sizeRestrictions.minWidth
          const imageWidth = cropper.imageSize.width
          cropper.zoom(
            (imageWidth - this.zoom * (imageWidth - minWidth)) /
              (imageWidth - value * (imageWidth - minWidth))
          )
        }
      }
    },
    finalizarImagen() {
      const { canvas } = this.$refs.cropper.getResult()
      console.log('IMAGEN', canvas)
      if (canvas) {
        const base64Canvas = canvas.toDataURL('image/jpeg')
        this.blob = base64Canvas
        const blobRaw = base64Canvas.split(',')[1]

        const task = this.$fire.storage
          .ref(this.form.tag + '.jpg')
          .putString(blobRaw, 'base64')
        // .put(this.blob, 'image/jpeg')
        task
          .then((snapshot) => snapshot.ref.getDownloadURL())
          .then(async (url) => {
            // this.$noty.success('Archivo cargado con éxito', {
            //   theme: 'bootstrap-v4',
            //   layout: 'topCenter',
            // })

            this.form.foto = url

            const actualizarImagen = await this.editarUsuario({
              foto: this.form.foto,
              tag: this.form.tag,
            })

            if (actualizarImagen.error === false) {
              this.habilitarBoton = true
              this.$noty.success(actualizarImagen.mensaje, {
                theme: 'bootstrap-v4',
                layout: 'topCenter',
              })
            } else {
              this.habilitarBoton = true
              this.$noty.error(actualizarImagen.mensaje, {
                theme: 'bootstrap-v4',
                layout: 'topCenter',
              })
            }
          })
          .catch((error) => {
            this.$noty.success('Ocurrió un error al cargar el archivo', {
              theme: 'bootstrap-v4',
              layout: 'topCenter',
            })
            console.error(error)
          })

        /*
        console.log('IMAGEN base64', base64Canvas)
        const form = new FormData()
        canvas.toBlob((blob) => {
          form.append('file', blob)
          console.log('IMAGEN blob', blob)
          const reader = new FileReader()
          reader.readAsDataURL(blob)
          reader.onloadend = function () {
            const base64data = reader.result
            console.log('IMAGEN blob final', base64data)

            // this.blob = base64data
          }

          // const reader = new window.FileReader()
          // reader.readAsDataURL(blob)
          // reader.onloadend = function () {
          //   // base64data = reader.result
          //   this.blob = reader.result
          //   // console.log(base64data)
          // }

          // You can use axios, superagent and other libraries instead here
          // fetch('http://example.com/upload/', {
          // 	method: 'POST',
          // 	body: form,
          // });
          // Perhaps you should add the setting appropriate file format here
        }, 'image/jpeg')
        */
      }
    },
    verificarArchivo() {
      if (this.$refs.archivo.files.length > 0) {
        this.listo = true
        this.nombre = this.$refs.archivo.files[0].name
        this.loadImage(this.$refs.archivo)
      } else {
        this.listo = false
        this.nombre = null
      }
    },
    getMimeType(file, fallback = null) {
      const byteArray = new Uint8Array(file).subarray(0, 4)
      let header = ''
      for (let i = 0; i < byteArray.length; i++) {
        header += byteArray[i].toString(16)
      }
      switch (header) {
        case '89504e47':
          return 'image/png'
        case '47494638':
          return 'image/gif'
        case 'ffd8ffe0':
        case 'ffd8ffe1':
        case 'ffd8ffe2':
        case 'ffd8ffe3':
        case 'ffd8ffe8':
          return 'image/jpeg'
        default:
          return fallback
      }
    },
    loadImage(event) {
      // Reference to the DOM input element
      const { files } = event
      console.log('loadImage', files)
      // Ensure that you have a file before attempting to read it
      if (files && files[0]) {
        // 1. Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
        if (this.img.src) {
          URL.revokeObjectURL(this.img.src)
        }
        // 2. Create the blob link to the file to optimize performance:
        const blob = URL.createObjectURL(files[0])

        // 3. The steps below are designated to determine a file mime type to use it during the
        // getting of a cropped image from the canvas. You can replace it them by the following string,
        // but the type will be derived from the extension and it can lead to an incorrect result:
        //
        // this.image = {
        //    src: blob;
        //    type: files[0].type
        // }

        // Create a new FileReader to read this image binary data
        const reader = new FileReader()
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
          // Note: arrow function used here, so that "this.image" refers to the image of Vue component
          this.img = {
            // Set the image source (it will look like blob:http://example.com/2c5270a5-18b5-406e-a4fb-07427f5e7b94)
            src: blob,
            // Determine the image type to preserve it during the extracting the image from canvas:
            type: this.getMimeType(e.target.result, files[0].type),
          }
        }
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsArrayBuffer(files[0])
      }
    },
  },
}
</script>

<style lang="postcss">
.form_columns {
  @apply w-full;

  .wrap_form_col {
    @apply text-primary-800 border border-primary-100 bg-light rounded-xl p-8 transition-all transition duration-500 mb-4;
    &:focus-within {
      @apply shadow-lg;
    }
    h3 {
      @apply border-b border-third-400 pb-2;
    }
  }
}
.vbga-results {
  @apply absolute z-10 bg-indigo-100 text-indigo-400 p-4 border rounded-xl shadow;

  li {
    width: 280px;
    @apply text-sm font-light border-b border-indigo-500 py-2 px-1 cursor-pointer;
  }
}
.twitter-cropper {
  height: 521px;
  @apply relative -mt-16 border-4 rounded-full overflow-hidden shadow-xl border-solid border-light cursor-move;
  &__background {
    background-color: #edf2f4;
  }
  &__foreground {
    background-color: #edf2f4;
  }
  &__stencil {
    border: solid 5px rgb(29, 161, 242);
  }
}
.twitter-cropper__foreground,
.twitter-cropper__background {
  background-image: linear-gradient(
    to right,
    var(--tw-gradient-stops)
  ) !important;
  --tw-gradient-from: #ff8533;
  --tw-gradient-stops: var(--tw-gradient-from),
    var(--tw-gradient-to, rgba(255, 133, 51, 0));
  --tw-gradient-to: #ffd500;
  @apply h-auto align-middle bg-gradient-to-r from-primary-400  to-third-500;
}
</style>