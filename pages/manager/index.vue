<template>
  <div class="login">
    <div class="hero">
      <div class="hero-container">
        <div v-if="userData" class="hero-container-full">
          <div class="flex">
            <div class="manager_wrap lg:w-full">
              <div class="manager_form_col flex flex-col md:flex-row space-x-4">
                <div class="flex flex-col md:flex-row items-center space-x-4">
                  <h2 class="flex-1 text-lg font-bold uppercase">
                    AGREGAR TAG
                  </h2>
                  <div class="flex-1">
                    <div class="p-form-control mb-1">
                      <t-input v-model="form.tag" type="text" />
                    </div>
                  </div>
                  <div>
                    <t-button
                      class="p-btn p-btn-full w-full"
                      @click="agregarTag"
                    >
                      Ingresar
                    </t-button>
                  </div>
                </div>
                <div
                  v-if="userData.superadmin"
                  class="flex flex-col md:flex-row items-center space-x-4"
                >
                  <h2 class="flex-1 text-lg font-bold uppercase">
                    CORREO DE ENVÍO
                  </h2>
                  <div>
                    <div class="p-form-control mb-1">
                      <t-input v-model="form.correo" type="text" />
                    </div>
                  </div>
                  <div>
                    <t-button
                      class="p-btn p-btn-full w-full"
                      @click="updateCorreo"
                    >
                      Actualizar
                    </t-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col md:flex-row">
            <div
              class="manager_wrap"
              :class="ser != '' ? 'w-full lg:w-8/12' : 'w-full lg:w-12/12'"
            >
              <div class="manager_form_col">
                <h2 class="text-lgl mb-8 font-bold uppercase">
                  LISTADO DE TAGS
                </h2>
                <div
                  class="
                    admin_list
                    grid grid-cols-1
                    md:grid-cols-4
                    sm:grid-cols-2
                    space-x-4 space-y-4
                  "
                  :class="
                    ser != ''
                      ? ' md:grid-cols-2 lg:grid-cols-3'
                      : 'md:grid-cols-3 lg:grid-cols-4'
                  "
                >
                  <div
                    v-for="(item, w) in tags"
                    :key="w + '-1'"
                    class="border border-gray-200 rounded-lg p-4"
                    :class="w % 2 === 0 ? 'bg-light-100' : 'bg-light-200'"
                  >
                    <dl class="flex space-x-2">
                      <dt class="font-bold"><i class="fas fa-tags"></i></dt>
                      <dd>
                        <template v-if="item.usado">
                          <button
                            class="text-primary-900 font-bold"
                            @click="cambiarTag(item.id)"
                          >
                            {{ item.id }}
                          </button></template
                        >
                        <template v-else>
                          <span>{{ item.id }}</span></template
                        >
                      </dd>
                    </dl>

                    <dl class="flex space-x-2">
                      <dt class="font-bold">Creado</dt>
                      <dd>
                        {{
                          item.fecha_creacion
                            .toDate()
                            .toISOString()
                            .split('T')[0]
                        }}
                      </dd>
                    </dl>
                    <dl class="flex space-x-2">
                      <dt class="font-bold">Usado</dt>
                      <dd>
                        <template v-if="item.usado">Usado</template
                        ><template v-else>No Usado</template>
                      </dd>
                    </dl>
                    <dl class="flex space-x-2">
                      <dt class="font-bold">Email</dt>
                      <dd>
                        <p class="overflow-ellipsis overflow-hidden">
                          <template v-if="item.usado">
                            {{ item.email }}</template
                          ><template v-else>-</template>
                        </p>
                      </dd>
                    </dl>
                    <dl class="flex space-x-2">
                      <dt class="font-bold">Nombre</dt>
                      <dd>
                        <span class="overflow-ellipsis overflow-hidden">
                          <template v-if="item.usado">
                            {{ item.primer_nombre }}
                            {{ item.apellidos }}</template
                          ><template v-else>-</template></span
                        >
                      </dd>
                    </dl>
                    <dl class="flex space-x-2">
                      <dt class="font-bold">Teléfono</dt>
                      <dd>
                        <template v-if="item.usado">
                          {{ item.telefono_celular }}</template
                        ><template v-else>-</template>
                      </dd>
                    </dl>
                    <dl class="flex space-x-2">
                      <dt class="font-bold">Fecha</dt>
                      <dd>
                        <template v-if="item.usado">
                          {{
                            item.creado.toDate().toISOString().split('T')[0]
                          }}</template
                        ><template v-else>-</template>
                      </dd>
                    </dl>
                    <dl class="flex space-x-2">
                      <dt class="font-bold">Orden</dt>
                      <dd>
                        <a
                          v-if="item.informacion_inicial"
                          :href="
                            'https://mitag.co/wp-admin/post.php?post=' +
                            item.informacion_inicial.id +
                            '&action=edit'
                          "
                          target="_blank"
                          class="text-primary-900 font-bold"
                        >
                          <template v-if="item.informacion_inicial.billing">
                            {{ item.informacion_inicial.id }} -
                            {{ item.informacion_inicial.billing.email }} -
                            {{ item.informacion_inicial.billing.first_name }}
                            {{ item.informacion_inicial.billing.last_name }}
                          </template>
                          <template v-else>
                            {{ item.informacion_inicial.id }}</template
                          >
                        </a>
                        <template v-else>Creado en la app</template>
                      </dd>
                    </dl>
                    <dl class="flex space-x-2">
                      <dd class="flex space-x-4">
                        <template v-if="item.usado">
                          <button
                            :key="'lead' + w + '_nq'"
                            class="
                              block
                              my-2
                              text-primary-900
                              font-bold
                              p-2
                              bg-primary-100
                              rounded-lg
                            "
                            @click="cambiarTag(item.id)"
                          >
                            Ver tag
                          </button></template
                        >
                        <template v-else>
                          <nuxt-link
                            :to="'tag/' + item.id + '/create'"
                            target="_blank"
                            class="
                              block
                              my-2
                              text-primary-900
                              font-bold
                              p-2
                              bg-primary-100
                              rounded-lg
                            "
                            >Crear</nuxt-link
                          >
                        </template>
                        <a
                          :href="
                            $axios.defaults.baseURL + 'getQr?id=' + item.id
                          "
                          class="
                            block
                            my-2
                            text-primary-900
                            font-bold
                            p-2
                            bg-primary-100
                            rounded-lg
                          "
                          target="_blank"
                          ><i class="fas fa-qrcode"> </i> QR</a
                        >
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="ser != ''"
              :id="'tag' + ser"
              class="relative w-full lg:w-4/12"
            >
              <button
                class="btn-clo btn absolute right-0 top-0"
                @click="ser = ''"
              >
                Cerrar
              </button>

              <div class="iphone-wrap">
                <div class="iphone-t">
                  <div class="content">
                    <div class="content_wrap">
                      <TagView
                        :tag="ser"
                        :lectura="true"
                        class="perfilview-wrap"
                      ></TagView>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Trama></Trama>
  </div>
</template>

<script>
import dataMixin from '~/mixins/data.js'
export default {
  mixins: [dataMixin],
  middleware: 'admin',
  data() {
    return {
      form: {
        tag: '',
        correo: '',
      },
      ser: '',
      tags: [],
      admin: false,
    }
  },
  mounted() {
    console.log('AXIOS', this.$axios.defaults.baseURL)
    this.getTagsU()

    if (this.userData.superadmin) {
      this.admin = true
      this.getAdminEmail()
    }
  },
  methods: {
    cambiarTag(id) {
      this.ser = id
      location.hash = '#tag' + this.ser
    },
    async getAdminEmail() {
      const correo = await this.getCorreo()
      if (!correo.eror) this.form.correo = correo
    },
    getTagsU() {
      // this.tags = await this.getTagsList()
      // console.log('TAGS', this.tags)
      this.$fire.firestore
        .collection('tags')
        .orderBy('fecha_creacion', 'desc')
        .get()
        .then((docs) => {
          const tags = []
          if (docs.size > 0) {
            docs.docs.forEach((doc) => {
              tags.push({
                id: doc.id,
                ...doc.data(),
              })
            })
            this.tags = tags
          }
        })
        .catch((error) => {
          console.error('└──🚨 | ⛹  >  ACTION getTags data', error)
        })
    },
    async agregarTag() {
      const { data } = await this.$axios.post(
        '/tag' + (this.form.tag !== '' ? '/' + this.form.tag : ''),
        {}
      )
      this.form.tag = ''

      if (data.error === false) {
        this.getTagsU()
        this.$noty.success(data.message + ', TAG: ' + data.id, {
          theme: 'bootstrap-v4',
          layout: 'topCenter',
        })
      } else {
        this.$noty.error(data.message, {
          theme: 'bootstrap-v4',
          layout: 'topCenter',
        })
      }
      // this.userData.leads.push(data)
    },
    async updateCorreo() {
      this.form.tag = ''
      const data = await this.agregarCorreo(this.form.correo)

      if (data.error === false) {
        this.getTagsU()
        this.$noty.success(data.mensaje, {
          theme: 'bootstrap-v4',
          layout: 'topCenter',
        })
      } else {
        this.$noty.error(data.mensaje, {
          theme: 'bootstrap-v4',
          layout: 'topCenter',
        })
      }
      // this.userData.leads.push(data)
    },
  },
}
</script>

<style lang="postcss">
.manager_wrap {
  @apply mt-2 mx-2 mb-3;
  .manager_form_col {
    @apply text-primary-800 w-full border border-primary-100 bg-light rounded-xl p-2 transition-all text-left duration-500;
    &:focus-within {
      @apply shadow-lg bg-light-200;
    }
    h3 {
      @apply border-b border-third-400 pb-2;
    }
  }
}
.btn-clo {
  z-index: 9999;
}
.tb {
  @apply w-full table-fixed border-separate border border-primary-500 rounded;
  tr {
    th {
      @apply border-b border-third-400 text-left text-gray-600 font-bold p-2 bg-primary-100 text-primary-800;
    }
    td {
      @apply text-sm border-b border-third-400 text-left text-gray-600 p-1;
    }
  }
}
.iphone-t {
  @apply relative w-full max-w-sm rounded-3xl border-12 border-gray-800 bg-light;
  .content {
    @apply w-full overflow-y-auto overflow-x-hidden select-none;
    .content_wrap {
      .perfilview-wrap {
        /* @apply pointer-events-none; */
      }
    }
  }
}
.admin_list {
  dd {
    @apply text-sm;
  }
}
</style>