<template>
  <div class="login">
    <div class="hero">
      <div class="hero-container">
        <div v-if="userData" class="hero-container-full">
          <div class="flex">
            <div class="manager_wrap lg:w-full">
              <div class="manager_form_col">
                <h2 class="text-1xl mb-2 font-bold uppercase">AGREGAR TAG</h2>
                <div class="flex">
                  <div class="w-8/12 mt-1">
                    <div class="p-form-control mb-1">
                      <t-input v-model="form.tag" type="text" />
                    </div>
                  </div>
                  <div class="w-4/12">
                    <t-button
                      class="p-btn p-btn-full w-full"
                      @click="agregarTag"
                    >
                      Ingresar
                    </t-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex">
            <div
              class="manager_wrap"
              :class="ser != '' ? 'lg:w-8/12' : 'lg:w-12/12'"
            >
              <div class="manager_form_col">
                <h2 class="text-lgl mb-8 font-bold uppercase">
                  LISTADO DE TAGS
                </h2>
                <table v-if="tags" class="tb">
                  <thead>
                    <tr>
                      <th class="w-1/8">Tag</th>
                      <th class="">Creado</th>
                      <th class="">Usado</th>
                      <th class="w-2/8">Email</th>
                      <th class="">Nombre</th>
                      <th class="">Teléfono</th>
                      <th class="">Fecha</th>
                      <th class="">-</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, w) in tags"
                      :key="w"
                      :class="w % 2 === 0 ? 'bg-light-100' : 'bg-light-200'"
                    >
                      <td>
                        <template v-if="item.usado">
                          <button
                            :key="'lead' + w + '_nq'"
                            class="text-primary-900 font-bold"
                            @click="cambiarTag(item.id)"
                          >
                            {{ item.id }}
                          </button></template
                        >
                        <template v-else>
                          <span :key="'lead' + w + '_np'">{{
                            item.id
                          }}</span></template
                        >
                      </td>
                      <td>
                        {{
                          item.fecha_creacion
                            .toDate()
                            .toISOString()
                            .split('T')[0]
                        }}
                      </td>
                      <td>
                        <template v-if="item.usado">Usado</template
                        ><template v-else>No Usado</template>
                      </td>
                      <td>
                        <p class="overflow-ellipsis overflow-hidden">
                          <template v-if="item.usado">
                            {{ item.email }}</template
                          ><template v-else>-</template>
                        </p>
                      </td>
                      <td class="overflow-ellipsis overflow-hidden">
                        <span class="overflow-ellipsis overflow-hidden">
                          <template v-if="item.usado">
                            {{ item.primer_nombre }}
                            {{ item.apellidos }}</template
                          ><template v-else>-</template></span
                        >
                      </td>
                      <td>
                        <template v-if="item.usado">
                          {{ item.telefono_celular }}</template
                        ><template v-else>-</template>
                      </td>
                      <td v-if="item.usado">
                        {{ item.creado.toDate().toISOString().split('T')[0] }}
                      </td>
                      <td v-else>-</td>
                      <td>
                        <template v-if="item.usado">
                          <button
                            :key="'lead' + w + '_nq'"
                            class="text-primary-900 font-bold"
                            @click="cambiarTag(item.id)"
                          >
                            Ver
                          </button></template
                        >
                        <template v-else>
                          <nuxt-link
                            :to="'tag/' + item.id + '/create'"
                            target="_blank"
                            class="text-primary-900 font-bold"
                            >Crear</nuxt-link
                          >
                        </template>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div v-if="ser != ''" class="relative lg:w-4/12">
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
      },
      ser: '',
      tags: [],
    }
  },
  mounted() {
    this.getTagsU()
  },
  methods: {
    cambiarTag(id) {
      this.ser = id
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
    @apply aspect-w-9 aspect-h-16 w-full overflow-y-auto overflow-x-hidden select-none;
    .content_wrap {
      .perfilview-wrap {
        /* @apply pointer-events-none; */
      }
    }
  }
}
</style>