<template>
  <div class="login">
    <div class="hero">
      <div class="hero-container">
        <div v-if="userData" class="hero-container-center3">
          <div class="form_wrap">
            <div class="wrap_form_col">
              <h2 class="text-3xl mb-8 font-bold uppercase">
                Contactos ingresados desde tu perfil
              </h2>
              <table v-if="userData.leads" class="tb">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, w) in userData.leads"
                    :key="'lead' + w + '_n'"
                  >
                    <td>{{ item.nombre }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.phone }}</td>
                    <td>
                      {{ item.creado.toDate().toISOString().split('T')[0] }}
                    </td>
                  </tr>
                </tbody>
              </table>
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
  middleware: 'auth',
  mounted() {
    this.getUserData()
  },
}
</script>

<style lang="postcss">
.form_wrap {
  .wrap_form_col {
    @apply text-primary-800 border border-primary-100 bg-light rounded-xl p-8 transition-all text-left duration-500 mt-8 mb-24;
    &:focus-within {
      @apply shadow-lg bg-light-200;
    }
    h3 {
      @apply border-b border-third-400 pb-2;
    }
  }
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
</style>