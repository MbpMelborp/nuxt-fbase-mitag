<template>
  <section v-if="userData" class="perfil">
    <div class="perfil-wrap">
      <div class="perfil-wrap-int">
        <div class="px-6">
          <div class="perfil-wrap-int-top">
            <div class="perfil-wrap-int-top-foto">
              <img
                v-if="!userData.foto"
                alt="..."
                src="~/assets/images/avatar.svg"
                class="foto-perfil"
              />
              <img v-else alt="..." :src="userData.foto" class="foto-perfil" />
            </div>

            <!-- <div class="perfil-wrap-int-top-info1">
              <ul class="info1-int">
                <li>
                  <span class="number"> 22 </span>
                  <span class="desc">Friends</span>
                </li>
                <li>
                  <span class="number"> 10 </span>
                  <span class="desc">Photos</span>
                </li>
                <li>
                  <span class="number"> 89 </span>
                  <span class="desc">Comments</span>
                </li>
              </ul>
            </div> -->
          </div>
          <div class="perfil-wrap-int-top-info2">
            <h3 class="">
              {{ userData.primer_nombre }} {{ userData.segundo_nombre }}
              {{ userData.apellidos }}
            </h3>
            <div class="mb-8">
              <a
                :href="`${$axios.defaults.baseURL}tag?id=${userData.tag}&file=true`"
                target="_blank"
                class="
                  btn-link-light
                  text-lg
                  flex
                  justify-around
                  space-x-8
                  mx-auto
                "
              >
                <span>Descargar perfil </span
                ><i class="far fa-address-card"></i>
              </a>
            </div>

            <div class="tag-link">
              <i class="fas fa-qrcode"></i>
              <nuxt-link :to="`/tag/${userData.tag}`">
                {{ `tags/${userData.tag}` }}
              </nuxt-link>
            </div>

            <div class="tag-empresa">
              <i class="fal fa-mobile"></i>
              {{ userData.telefono_celular_info.formatted }}
            </div>

            <div class="tag-empresa">
              <i class="far fa-envelope"></i>
              {{ userData.email }}
            </div>

            <div v-if="userData.empresa || userData.cargo" class="tag-empresa">
              <i class="fas fa-briefcase"></i>
              <template v-if="userData.empresa">{{
                userData.empresa
              }}</template>
              <template v-if="userData.cargo">
                <template v-if="userData.empresa">-</template>
                {{ userData.cargo }}</template
              >
            </div>
            <nuxt-link
              class="
                btn-link-light
                text-sm
                flex
                justify-around
                space-x-8
                md:w-60
                mx-auto
              "
              :to="`/perfil/edit`"
            >
              <span>Editar mi perfil </span> <i class="far fa-edit"></i>
            </nuxt-link>
          </div>
          <div class="mt-10 py-10 border-t border-primary-200 text-center">
            <div class="flex flex-wrap justify-center">
              <div class="w-full lg:w-9/12 px-4">
                <qr-code
                  :text="`${location.origin}/tag/${userData.tag}`"
                  :size="240"
                  color="#666666"
                  bg-color="#ffffff"
                  error-level="L"
                  class="
                    w-1/2
                    mx-auto
                    p-4
                    rounded-lg
                    border border-4 border-primary-100
                    bg-light
                    mb-8
                  "
                >
                </qr-code>

                <nuxt-link
                  class="btn-link text-2xl flex justify-around space-x-8"
                  :to="`/tag/${userData.tag}/edit`"
                >
                  <span>Editar mi Tag </span> <i class="far fa-edit"></i>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import dataMixin from '~/mixins/data.js'
export default {
  mixins: [dataMixin],
  data() {
    return {
      location: !process.server ? window.location : '',
    }
  },
  mounted() {
    this.$fire.functions
      .httpsCallable('getTag')({
        id: 'mHRi9',
      })
      .then((resp) => {
        console.log('ID FROM TAG ', resp)
      })

    this.$fire.functions
      .httpsCallable('getTag')({
        id: 'mHRi9',
      })
      .then((resp) => {
        console.log('ID FROM TAG ', resp)
      })
  },
}
</script>

<style lang="postcss" scoped>
.perfil {
  @apply pt-16 text-primary-700;
  .perfil-wrap {
    @apply w-full lg:px-4 px-1 mx-auto;
    .perfil-wrap-int {
      @apply relative flex flex-col min-w-0 break-words bg-light w-full mb-6 shadow-xl rounded-lg mt-16 mb-16;
      .perfil-wrap-int-top {
        @apply flex flex-wrap justify-center;
        .perfil-wrap-int-top-foto {
          @apply w-full px-4 flex justify-center;
          .foto-perfil {
            max-width: 250px;
            @apply shadow-xl border-solid border-light border-4 rounded-full h-auto align-middle -mt-16 mx-auto object-cover bg-gradient-to-r from-primary-400  to-third-500;
          }
        }
        .perfil-wrap-int-top-info1 {
          @apply w-full px-4 text-center mt-8;
          .info1-int {
            @apply flex justify-center py-4 lg:pt-4 pt-8;
            li {
              @apply p-3 text-center;
              .number {
                @apply mx-auto text-2xl font-bold  uppercase tracking-wide h-20 w-20 flex items-center;
              }
              .desc {
                @apply text-sm text-primary-400;
              }
            }
          }
        }
      }
      .perfil-wrap-int-top-info2 {
        @apply text-center mt-8;
        h3 {
          @apply text-3xl font-semibold leading-normal mb-10;
        }
        .tag-link {
          @apply text-2xl leading-normal mt-0 mb-4 font-bold;
          i {
            @apply mr-2 text-lg text-secondary-400;
          }
        }
        .tag-empresa {
          @apply text-xl leading-normal mt-0 mb-4 font-bold;
          i {
            @apply mr-2 text-lg text-secondary-400;
          }
        }
      }
    }
  }
}
</style>