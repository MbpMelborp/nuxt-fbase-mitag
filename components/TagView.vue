<template>
  <section v-if="tagInfo" class="perfilview" :class="lectura ? 'lectura' : ''">
    <div class="perfil-wrap">
      <div class="perfil-wrap-int">
        <div class="perfil-wrap-intp">
          <div class="perfil-wrap-int-top">
            <div class="perfil-wrap-int-top-foto">
              <img
                v-if="!tagInfo.foto"
                alt="..."
                src="~/assets/images/avatar.svg"
                class="foto-perfil"
              />
              <img v-else alt="..." :src="tagInfo.foto" class="foto-perfil" />
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
              {{ tagInfo.primer_nombre }} {{ tagInfo.segundo_nombre }}
              {{ tagInfo.apellidos }}
            </h3>
            <div class="tag-btn">
              <a
                :href="`${$axios.defaults.baseURL}tag?id=${tagInfo.tag}&file=true`"
                target="_blank"
                class="btn-link-light btn-file"
              >
                <span>Descargar perfil </span
                ><i class="far fa-address-card"></i>
              </a>
            </div>

            <div class="tag-link">
              <i class="fas fa-qrcode"></i>
              <nuxt-link :to="`/tag/${tagInfo.tag}`">
                {{ `tags/${tagInfo.tag}` }}
              </nuxt-link>
            </div>

            <div v-if="tagInfo.telefono_celular" class="tag-empresa">
              <i class="fal fa-mobile"></i>
              {{ tagInfo.telefono_celular }}
            </div>

            <div class="tag-empresa">
              <i class="far fa-envelope"></i>
              {{ tagInfo.email }}
            </div>

            <div v-if="tagInfo.empresa || tagInfo.cargo" class="tag-empresa">
              <i class="fas fa-briefcase"></i>
              <template v-if="tagInfo.empresa">{{ tagInfo.empresa }}</template>
              <template v-if="tagInfo.cargo">
                <template v-if="tagInfo.empresa">-</template>
                {{ tagInfo.cargo }}</template
              >
            </div>
            <nuxt-link class="btn-file btn-link-light" :to="`/perfil/edit`">
              <span>Editar mi perfil </span> <i class="far fa-edit"></i>
            </nuxt-link>
          </div>
          <div v-if="tagInfo.info.varios.length" class="o-varios">
            <div
              v-for="(item, y) in tagInfo.info.varios"
              :key="'0-varios_' + y"
              class="item"
            >
              <span class="handle">
                <i class="fas fa-ellipsis-v"></i>
              </span>
              <TagItemLinkView
                v-if="item.tipo === 'link'"
                :info="item"
                :view="true"
              ></TagItemLinkView>
              <TagItemNotaView
                v-if="item.tipo === 'nota'"
                :info="item"
                :view="true"
              ></TagItemNotaView>
            </div>
          </div>

          <div class="perfil-wrap-int-top-info3">
            <div class="perfil-wrap-int-top-info3-wrap">
              <div class="perfil-wrap-int-top-info3-wrap2">
                <qr-code
                  :text="`https://mitag.co/tag/${tagInfo.tag}`"
                  :size="lectura ? 100 : 240"
                  color="#ffc299"
                  bg-color="#ffffff"
                  error-level="L"
                  class="qr-code-perfil"
                >
                </qr-code>
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
  props: {
    tag: {
      type: String,
      required: true,
    },
    lectura: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tagInfo: null,
    }
  },
  fetch() {
    if (!this.lectura) {
      // eslint-disable-next-line nuxt/no-this-in-fetch-data
      this.tagInfo = this.getTag(this.tag).then((tag) => {
        console.log('TAG VIEW fetch ->', this.tag, tag.doc)
        this.tagInfo = tag.doc
      })
    }
  },
  watch: {
    // eslint-disable-next-line vue/no-arrow-functions-in-watch
    userData(oldValue, newValue) {
      if (this.lectura) {
        console.log('TAG VIEW watch ->', this.userData)
        this.tagInfo = this.userData
      }
    },
  },
  mounted() {},
}
</script>

<style lang="postcss" scoped>
.perfilview {
  @apply pt-16 text-orange-700;
  .perfil-wrap {
    @apply w-full px-4 mx-auto;
    .perfil-wrap-int {
      @apply relative flex flex-col min-w-0 break-words bg-white w-full shadow-xl rounded-lg mt-16 mb-16;
      .perfil-wrap-intp {
        @apply px-6;
        .perfil-wrap-int-top {
          @apply flex flex-wrap justify-center;
          .perfil-wrap-int-top-foto {
            @apply w-full px-4 flex justify-center;
            .foto-perfil {
              max-width: 250px;
              @apply shadow-xl border-solid border-white border-4 rounded-full h-auto align-middle -mt-16 mx-auto object-cover bg-gradient-to-r from-orange-400  to-yellow-500;
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
                  @apply text-sm text-orange-400;
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
          .btn-file {
            @apply md:w-60 text-lg flex justify-around space-x-8 mx-auto;
          }
          .tag-link {
            @apply text-2xl leading-normal mt-0 mb-4 font-bold;
            i {
              @apply mr-2 text-lg text-red-400;
            }
          }
          .tag-btn {
            @apply mb-8;
          }
          .tag-empresa {
            @apply text-xl leading-normal mt-0 mb-4 font-bold;
            i {
              @apply mr-2 text-lg text-red-400;
            }
          }
        }
        .perfil-wrap-int-top-info3 {
          @apply mt-10 py-10 border-t border-orange-200 text-center;
          .perfil-wrap-int-top-info3-wrap {
            @apply flex flex-wrap justify-center;
            .perfil-wrap-int-top-info3-wrap2 {
              @apply w-full lg:w-9/12 px-4;
              .qr-code-perfil {
                @apply w-1/2 mx-auto p-4 rounded-lg border border-4 border-orange-100 bg-white mb-8;
              }
            }
          }
        }

        .o-varios {
          @apply mt-10;
        }
      }
    }
  }
  &.lectura {
    font-size: 0.8em;
    @apply w-full text-sm;
    .perfil-wrap {
      @apply px-0;
      .perfil-wrap-int {
        @apply mt-0 mb-0 pt-8 shadow-none;
        .perfil-wrap-intp {
          @apply px-2;
          .perfil-wrap-int-top {
            .perfil-wrap-int-top-foto {
              .foto-perfil {
                max-width: 80px;
                max-height: 80px;
                @apply border-2 -mt-16;
              }
            }
            .perfil-wrap-int-top-info1 {
              @apply px-2 mt-2 bg-black;
              .info1-int {
                @apply py-2 pt-2;
                li {
                  @apply p-1;
                  .number {
                    @apply text-lg h-10 w-10;
                  }
                  .desc {
                    @apply text-2xs;
                  }
                }
              }
            }
          }
          .perfil-wrap-int-top-info2 {
            @apply text-center mt-2;
            h3 {
              @apply text-base mb-4;
            }
            .btn-file {
              @apply text-sm space-x-2;
            }
            .tag-link {
              @apply text-sm mt-0 mb-2;
              i {
                @apply mr-1 text-sm;
              }
            }
            .tag-btn {
              @apply mb-2;
            }
            .tag-empresa {
              @apply text-sm mt-0 mb-2 font-bold;
              i {
                @apply mr-1 text-sm;
              }
            }
          }
          .perfil-wrap-int-top-info3 {
            @apply mt-8 py-4;
            .perfil-wrap-int-top-info3-wrap {
              .perfil-wrap-int-top-info3-wrap2 {
                @apply px-2;
                .qr-code-perfil {
                  @apply p-2 rounded-lg border-2 mb-4;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>