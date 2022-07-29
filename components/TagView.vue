<template>
  <section v-if="tagInfo" class="perfilview" :class="lectura ? 'lectura' : ''">
    <div v-if="tagInfo.info && !lectura" class="perfilview-bot">
      <div class="perfilview-bot-wrap">
        <button
          target="_blank"
          class="btn-link-light btn-file w-full"
          @click="aLead = true"
        >
          <span>Descargar perfil </span><i class="far fa-address-card"></i>
        </button>
      </div>
    </div>
    <t-modal v-model="aLead" class="v-modal" header="Descargar contacto">
      <TagLeadForm
        ref="aLead"
        :info="tagInfo"
        @closeaModal="aLead = false"
      ></TagLeadForm>
    </t-modal>
    <div v-if="tagInfo.info" class="perfil-wrap">
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
            <div class="perfil-iconos">
              <template v-for="(item, w) in tagInfo.info.iconos">
                <TagItemIcoView
                  v-if="item.habilitado"
                  :key="'0-iconos_' + w"
                  :info="item"
                  :view="true"
                  :lectura="lectura"
                  class="icono-view"
                ></TagItemIcoView>
              </template>
            </div>
            <div v-if="tagInfo.empresa || tagInfo.cargo" class="tag-empresa">
              <i class="fas fa-briefcase"></i>
              <template v-if="tagInfo.empresa">{{ tagInfo.empresa }}</template>
              <template v-if="tagInfo.cargo">
                <template v-if="tagInfo.empresa">-</template>
                {{ tagInfo.cargo }}</template
              >
            </div>
            <div class="tag-btn">
              <!-- <a
                :href="`${$axios.defaults.baseURL}tag?id=${tagInfo.tag}&file=true`"
                target="_blank"
                class="hidden btn-link-light btn-file"
              >
                <span>Descargar perfil </span
                ><i class="far fa-address-card"></i>
              </a> -->

              <button class="w-full btn-link-light btn-file" @click="download">
                <span>Descargar perfil </span
                ><i class="far fa-address-card"></i>
              </button>
            </div>

            <div class="tag-link">
              <i class="fas fa-qrcode"></i>
              <client-only>
                <div class="flex space-x-6 items-center justify-center">
                  <a :href="`${location.origin}/tag/${tagInfo.tag}`">
                    {{ `tags/${tagInfo.tag}` }}
                  </a>
                  <button
                    @click="copiarUrl(`${location.origin}/tag/${tagInfo.tag}`)"
                  >
                    <i class="fas fa-clipboard"></i>
                  </button>
                </div>
              </client-only>
            </div>
            <div class="tag-share">
              <h4>Compartir en redes</h4>
              <div class="tag-share-wraper">
                <ShareNetwork
                  v-for="network in networks"
                  :key="network.network"
                  :network="network.network"
                  :style="{ borderColor: network.color, color: network.color }"
                  :url="sharing.url"
                  :title="sharing.title"
                  :description="sharing.description"
                  :quote="sharing.quote"
                  :hashtags="sharing.hashtags"
                  :twitterUser="sharing.twitterUser"
                  class="share-item"
                >
                  <i :class="network.icon"></i>
                  <span>{{ network.name }}</span>
                </ShareNetwork>
              </div>
            </div>

            <div class="o-tels">
              <i class="icon far fa-mobile"></i>
              <div class="tels">
                <div v-if="tagInfo.telefono_celular_info" class="tel">
                  <b> Personal </b>
                  <a :href="`tel:${tagInfo.telefono_celular_info.formatted}`">
                    {{ tagInfo.telefono_celular_info.formatted }}</a
                  >
                </div>
                <template v-if="tagInfo.info.telefonos.length > 0">
                  <template v-for="(item, y) in tagInfo.info.telefonos">
                    <TagItemTelView
                      v-if="item.habilitado"
                      :key="'0-telefonos_' + y"
                      :info="item"
                      :view="true"
                      :lectura="lectura"
                      class="tel"
                    ></TagItemTelView>
                  </template>
                </template>
              </div>
            </div>

            <div class="o-emails">
              <i class="icon fal fa-envelope"></i>
              <div class="tels">
                <div class="tel">
                  <b> Personal </b>
                  <a :href="`mailto:${tagInfo.email}`"> {{ tagInfo.email }}</a>
                </div>
                <template v-for="(item, y) in tagInfo.info.emails">
                  <TagItemEmailView
                    v-if="item.habilitado"
                    :key="'0-emails_' + y"
                    :info="item"
                    :view="true"
                    :lectura="lectura"
                    class="tel"
                  ></TagItemEmailView>
                </template>
              </div>
            </div>

            <div v-if="tagInfo.info.direcciones.length" class="o-dirs">
              <i class="icon fas fa-map-marker"></i>
              <div class="tels">
                <template v-for="(item, y) in tagInfo.info.direcciones">
                  <TagItemDirView
                    v-if="item.habilitado"
                    :key="'0-emails_' + y"
                    :info="item"
                    :view="true"
                    :lectura="lectura"
                    class="tel"
                  ></TagItemDirView>
                </template>
              </div>
            </div>
          </div>

          <div v-if="tagInfo.info.varios.length" class="o-varios">
            <div
              v-for="(item, y) in tagInfo.info.varios"
              :key="'0-varios_' + y"
              class="o-item"
            >
              <transition
                enter-active-class="duration-500 ease-out"
                enter-class="translate-y-full opacity-0"
                enter-to-class="translate-y-0 opacity-100"
                leave-active-class="duration-500 ease-in"
                leave-class="translate-y-0 opacity-100"
                leave-to-class="translate-y-full opacity-0"
              >
                <TagItemLinkView
                  v-if="item.tipo === 'link' && item.habilitado"
                  :info="item"
                  :view="true"
                  :lectura="lectura"
                ></TagItemLinkView>
                <TagItemNotaView
                  v-if="item.tipo === 'nota' && item.habilitado"
                  :info="item"
                  :view="true"
                  :lectura="lectura"
                ></TagItemNotaView>
              </transition>
            </div>
          </div>

          <div v-if="tagInfo.info.medias.length" class="o-media">
            <div
              v-for="(item, y) in tagInfo.info.medias"
              :key="'0-media_' + y"
              class="o-item"
            >
              <transition
                enter-active-class="duration-500 ease-out"
                enter-class="translate-y-full opacity-0"
                enter-to-class="translate-y-0 opacity-100"
                leave-active-class="duration-500 ease-in"
                leave-class="translate-y-0 opacity-100"
                leave-to-class="translate-y-full opacity-0"
              >
                <TagItemMediaView
                  v-if="item.habilitado"
                  :info="item"
                  :view="true"
                  :lectura="lectura"
                ></TagItemMediaView>
              </transition>
            </div>
          </div>

          <div class="perfil-wrap-int-top-info3">
            <div class="perfil-wrap-int-top-info3-wrap">
              <div class="perfil-wrap-int-top-info3-wrap2">
                <client-only>
                  <qr-code
                    :text="`${location.origin}/tag/${tagInfo.tag}`"
                    :size="lectura ? 100 : 240"
                    color="#666666"
                    bg-color="#ffffff"
                    error-level="L"
                    class="qr-code-perfil"
                  >
                  </qr-code>
                </client-only>
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
      aLead: false,
      location: !process.server ? window.location : '',
      sharing: {
        url: '',
        title: 'Visita mi perfil en MiTag.',
        description: 'Descarga la información de mi perfil en Mi Tag',
        quote: '',
        hashtags: '#MiTag',
        twitterUser: 'MiTag',
      },
      networks: [
        {
          network: 'whatsapp',
          name: 'Whatsapp',
          icon: 'fab fah fa-lg fa-whatsapp',
          color: '#25d366',
        },
        {
          network: 'sms',
          name: 'SMS',
          icon: 'far fah fa-lg fa-comment-dots',
          color: '#333333',
        },
        {
          network: 'email',
          name: 'Email',
          icon: 'far fah fa-lg fa-envelope',
          color: '#333333',
        },
        // {
        //   network: 'facebook',
        //   name: 'Facebook',
        //   icon: 'fab fah fa-lg fa-facebook-f',
        //   color: '#1877f2',
        // },
        {
          network: 'messenger',
          name: 'Messenger',
          icon: 'fab fah fa-lg fa-facebook-messenger',
          color: '#0084ff',
        },
        {
          network: 'twitter',
          name: 'Twitter',
          icon: 'fab fah fa-lg fa-twitter',
          color: '#1da1f2',
        },
        // {
        //   network: 'baidu',
        //   name: 'Baidu',
        //   icon: 'fas fah fa-lg fa-paw',
        //   color: '#2529d8',
        // },
        // {
        //   network: 'buffer',
        //   name: 'Buffer',
        //   icon: 'fab fah fa-lg fa-buffer',
        //   color: '#323b43',
        // },

        // {
        //   network: 'evernote',
        //   name: 'Evernote',
        //   icon: 'fab fah fa-lg fa-evernote',
        //   color: '#2dbe60',
        // },

        // {
        //   network: 'flipboard',
        //   name: 'Flipboard',
        //   icon: 'fab fah fa-lg fa-flipboard',
        //   color: '#e12828',
        // },
        // {
        //   network: 'hackernews',
        //   name: 'HackerNews',
        //   icon: 'fab fah fa-lg fa-hacker-news',
        //   color: '#ff4000',
        // },
        // {
        //   network: 'instapaper',
        //   name: 'Instapaper',
        //   icon: 'fas fah fa-lg fa-italic',
        //   color: '#428bca',
        // },
        // {
        //   network: 'line',
        //   name: 'Line',
        //   icon: 'fab fah fa-lg fa-line',
        //   color: '#00c300',
        // },
        // {
        //   network: 'linkedin',
        //   name: 'LinkedIn',
        //   icon: 'fab fah fa-lg fa-linkedin',
        //   color: '#007bb5',
        // },
        // {
        //   network: 'messenger',
        //   name: 'Messenger',
        //   icon: 'fab fah fa-lg fa-facebook-messenger',
        //   color: '#0084ff',
        // },
        // {
        //   network: 'odnoklassniki',
        //   name: 'Odnoklassniki',
        //   icon: 'fab fah fa-lg fa-odnoklassniki',
        //   color: '#ed812b',
        // },
        // {
        //   network: 'pinterest',
        //   name: 'Pinterest',
        //   icon: 'fab fah fa-lg fa-pinterest',
        //   color: '#bd081c',
        // },
        // {
        //   network: 'pocket',
        //   name: 'Pocket',
        //   icon: 'fab fah fa-lg fa-get-pocket',
        //   color: '#ef4056',
        // },
        // {
        //   network: 'quora',
        //   name: 'Quora',
        //   icon: 'fab fah fa-lg fa-quora',
        //   color: '#a82400',
        // },
        // {
        //   network: 'reddit',
        //   name: 'Reddit',
        //   icon: 'fab fah fa-lg fa-reddit-alien',
        //   color: '#ff4500',
        // },
        // {
        //   network: 'skype',
        //   name: 'Skype',
        //   icon: 'fab fah fa-lg fa-skype',
        //   color: '#00aff0',
        // },

        // {
        //   network: 'stumbleupon',
        //   name: 'StumbleUpon',
        //   icon: 'fab fah fa-lg fa-stumbleupon',
        //   color: '#eb4924',
        // },
        // {
        //   network: 'telegram',
        //   name: 'Telegram',
        //   icon: 'fab fah fa-lg fa-telegram-plane',
        //   color: '#0088cc',
        // },
        // {
        //   network: 'tumblr',
        //   name: 'Tumblr',
        //   icon: 'fab fah fa-lg fa-tumblr',
        //   color: '#35465c',
        // },

        // {
        //   network: 'viber',
        //   name: 'Viber',
        //   icon: 'fab fah fa-lg fa-viber',
        //   color: '#59267c',
        // },
        // {
        //   network: 'vk',
        //   name: 'Vk',
        //   icon: 'fab fah fa-lg fa-vk',
        //   color: '#4a76a8',
        // },
        // {
        //   network: 'weibo',
        //   name: 'Weibo',
        //   icon: 'fab fah fa-lg fa-weibo',
        //   color: '#e9152d',
        // },

        // {
        //   network: 'wordpress',
        //   name: 'Wordpress',
        //   icon: 'fab fah fa-lg fa-wordpress',
        //   color: '#21759b',
        // },
        // {
        //   network: 'xing',
        //   name: 'Xing',
        //   icon: 'fab fah fa-lg fa-xing',
        //   color: '#026466',
        // },
        // {
        //   network: 'yammer',
        //   name: 'Yammer',
        //   icon: 'fab fah fa-lg fa-yammer',
        //   color: '#0072c6',
        // },
      ],
    }
  },

  fetch() {
    // eslint-disable-next-line nuxt/no-this-in-fetch-data
    this.tagInfo = this.getTag(this.tag).then((tag) => {
      console.log('TAG VIEW fetch ->', this.tag, tag.doc)
      this.tagInfo = tag.doc
      this.sharing.url = `${location.origin}/tag/${this.tagInfo.tag}`
      if (window) {
        const bodyElement = document.querySelector('body')
        if (this.tagInfo.theme) {
          bodyElement.classList.remove(
            'theme-default',
            'theme-green',
            'theme-red',
            'theme-blue',
            'theme-yellow',
            'theme-light',
            'theme-dark'
          )
          bodyElement.classList.add('theme-' + this.tagInfo.theme)
        } else {
          bodyElement.classList.add('theme-default')
        }
      }
    })
    // if (!this.lectura) {

    // }
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
  mounted() {
    if (this.lectura) {
      console.log('TAG VIEW watch ->', this.userData)
      this.tagInfo = this.userData
    }
    console.log('ROUTE', this.$route, this.location)
  },
  methods: {
    copiarUrl(url) {
      if (!process.server) {
        navigator.clipboard.writeText(url)
        this.$noty.success('¡La url del tag se ha copiado!', {
          theme: 'bootstrap-v4',
          layout: 'topCenter',
        })
      }
    },
    download() {
      this.$axios
        .get('tag?id=' + this.tagInfo.tag + '&text=true&file=true', {})
        .then((result) => {
          console.log('res', result)
          const element = document.createElement('a')
          element.setAttribute(
            'href',
            'data:text/vcard;charset=utf-8,' + encodeURIComponent(result.data)
          )
          element.setAttribute('download', this.tagInfo.tag + '.vcf')
          element.style.display = 'none'
          document.body.appendChild(element)
          element.click()
          document.body.removeChild(element)
        })
    },
  },
}
</script>

<style lang="postcss" scoped>
.perfilview {
  @apply pt-16 text-primary-700 relative;
  .perfilview-bot {
    @apply px-1 w-full mx-auto fixed left-0 bottom-0 z-20 flex justify-center;
    .perfilview-bot-wrap {
      @apply w-full lg:max-w-2xl lg:px-4 mx-auto text-center;
    }
  }
  .perfil-wrap {
    @apply w-full lg:px-4 px-1 mx-auto;
    .perfil-wrap-int {
      @apply relative flex flex-col min-w-0 break-words bg-light w-full shadow-xl rounded-lg mt-16 mb-16;
      .perfil-wrap-intp {
        @apply px-6;
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
          .btn-file {
            @apply md:w-80 text-lg flex justify-around space-x-8 mx-auto;
          }
          .tag-link {
            @apply text-2xl leading-normal mt-0 mb-4 font-bold;
            i {
              @apply mr-2 text-lg text-secondary-400;
            }
          }
          .tag-btn {
            @apply mb-8;
          }
          .tag-empresa {
            @apply text-xl leading-normal mt-0 mb-4 font-bold;
            i {
              @apply mr-2 text-lg text-secondary-400;
            }
          }
          .perfil-iconos {
            @apply flex flex-wrap justify-center w-full mb-4;
            .icono-view {
              @apply flex flex-wrap justify-center items-center text-3xl w-14 h-14 bg-primary-400 text-light leading-none mb-2 mx-2 rounded-full px-2 py-2;
              a {
                @apply text-light hover:text-primary-100 transition-all;
              }
            }
          }
          .tag-share {
            h4 {
              @apply text-sm mb-2 uppercase;
            }
            .tag-share-wraper {
              @apply flex flex-wrap justify-center w-full items-center;
              a.share-item {
                @apply px-2 py-1 m-1 text-xs border rounded block transition-all ease-in-out;
                i {
                  @apply mr-1;
                }
              }
            }
          }
        }
        .perfil-wrap-int-top-info3 {
          @apply mt-10 py-10 border-t border-primary-200 text-center;
          .perfil-wrap-int-top-info3-wrap {
            @apply flex flex-wrap justify-center;
            .perfil-wrap-int-top-info3-wrap2 {
              @apply w-full lg:w-9/12 px-4;
              .qr-code-perfil {
                @apply w-1/2 mx-auto p-4 rounded-lg border-4 border-primary-100 bg-light mb-8;
              }
            }
          }
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
              @apply px-2 mt-2 bg-dark;
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
          .icono-link {
            @apply text-4xl;
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