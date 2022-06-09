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
              <div class="grid grid-cols-4 space-x-4 space-y-1">
                <div class="text-lg font-bold">Nombre</div>
                <div class="text-lg font-bold">Email</div>
                <div class="text-lg font-bold">Teléfono</div>
                <div class="text-lg font-bold">Fecha</div>
                <template v-for="(item, w) in userData.leads">
                  <div :key="'lead' + w + '_n'">{{ item.nombre }}</div>
                  <div :key="'lead' + w + '_e'">{{ item.email }}</div>
                  <div :key="'lead' + w + '_p'">{{ item.phone }}</div>
                  <div :key="'lead' + w + '_d'">
                    {{ item.creado.toDate().toISOString().split('T')[0] }}
                  </div>
                </template>
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
  middleware: 'auth',
  mounted() {},
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
</style>