<template>
  <section v-if="userData" class="p-edit">
    <div class="nav-edit">
      <div class="nav-edit-wrap">
        <div class="nav-perfil">
          <div class="nav-perfil-foto">
            <img
              v-if="!userData.foto"
              alt="..."
              src="~/assets/images/avatar.svg"
              class="foto-perfil"
            />
            <img v-else alt="..." :src="userData.foto" class="foto-perfil" />
          </div>
          <h3>
            {{ userData.primer_nombre }} {{ userData.segundo_nombre }}
            {{ userData.apellidos }}
          </h3>
          <div class="nav-perfil-theme">
            <input
              v-model="theme"
              value="default"
              type="radio"
              name="theme"
              class="default"
              :checked="theme === 'default'"
            />
            <input
              v-model="theme"
              value="green"
              type="radio"
              name="theme"
              class="green"
              :checked="theme === 'green'"
            />
            <input
              v-model="theme"
              value="blue"
              type="radio"
              name="theme"
              class="blue"
              :checked="theme === 'blue'"
            />
            <input
              v-model="theme"
              value="red"
              type="radio"
              name="theme"
              class="red"
              :checked="theme === 'red'"
            />
            <input
              v-model="theme"
              value="yellow"
              type="radio"
              name="theme"
              class="yellow"
              :checked="theme === 'yellow'"
            />
            <input
              v-model="theme"
              value="light"
              type="radio"
              name="theme"
              class="light"
              :checked="theme === 'light'"
            />
            <input
              v-model="theme"
              value="dark"
              type="radio"
              name="theme"
              class="dark"
              :checked="theme === 'dark'"
            />
          </div>
        </div>

        <ul>
          <li class="col-span-2">
            <button @click="aMail = true">
              <i class="fas fa-envelope"></i>
              <span>Email de trabajo</span>
            </button>
          </li>
          <li>
            <button @click="aTel = true">
              <i class="fas fa-phone"></i>
              <span>Telefóno</span>
            </button>
          </li>
          <li>
            <button @click="aDir = true">
              <i class="fas fa-map-marker"></i>
              <span>Dirección</span>
            </button>
          </li>
          <li>
            <button @click="aNot = true">
              <i class="fas fa-sticky-note"></i>
              <span>Nota</span>
            </button>
          </li>
          <li>
            <button @click="aLink = true">
              <i class="fas fa-link"></i>
              <span>Enlace</span>
            </button>
          </li>
          <li>
            <button @click="aIcon = true">
              <i class="fas fa-icons"></i>
              <span>Iconos</span>
            </button>
          </li>
          <li>
            <button @click="aMedia = true">
              <i class="fas fa-photo-video"></i>
              <span>Medios</span>
            </button>
          </li>
        </ul>
      </div>
    </div>

    <t-modal v-model="aMail" class="v-modal" header="Agregar email">
      <TagItemEmailForm
        ref="aMail"
        @closeaModal="aMail = false"
      ></TagItemEmailForm>
      <template #footer>
        <div class="v-footer flex justify-between">
          <button class="v-cancel" type="button" @click="aMail = false">
            <i class="fas fa-times-circle"></i>
            <span>Cancelar </span>
          </button>
          <button class="v-ok" type="button" @click="enviarEmail">
            <span>Agregar</span>
            <i class="fas fa-check-circle"></i>
          </button>
        </div>
      </template>
    </t-modal>

    <t-modal v-model="aLink" class="v-modal" header="Agregar link">
      <TagItemLinkForm
        ref="aLink"
        @closeaLink="aLink = false"
      ></TagItemLinkForm>
      <template #footer>
        <div class="v-footer flex justify-between">
          <button class="v-cancel" type="button" @click="aLink = false">
            <i class="fas fa-times-circle"></i>
            <span>Cancelar </span>
          </button>
          <button class="v-ok" type="button" @click="enviarLink">
            <span>Agregar</span>
            <i class="fas fa-check-circle"></i>
          </button>
        </div>
      </template>
    </t-modal>

    <t-modal v-model="aNot" class="v-modal" header="Agregar Nota">
      <TagItemNotaForm ref="aNot" @closeaModal="aNot = false"></TagItemNotaForm>
      <template #footer>
        <div class="v-footer flex justify-between">
          <button class="v-cancel" type="button" @click="aNot = false">
            <i class="fas fa-times-circle"></i>
            <span>Cancelar </span>
          </button>
          <button class="v-ok" type="button" @click="enviarNota">
            <span>Agregar</span>
            <i class="fas fa-check-circle"></i>
          </button>
        </div>
      </template>
    </t-modal>

    <t-modal v-model="aTel" class="v-modal" header="Agregar Teléfono">
      <TagItemTelForm ref="aTel" @closeaModal="aTel = false"></TagItemTelForm>
      <template #footer>
        <div class="v-footer flex justify-between">
          <button class="v-cancel" type="button" @click="aTel = false">
            <i class="fas fa-times-circle"></i>
            <span>Cancelar </span>
          </button>
          <button class="v-ok" type="button" @click="enviarTel">
            <span>Agregar</span>
            <i class="fas fa-check-circle"></i>
          </button>
        </div>
      </template>
    </t-modal>

    <t-modal v-model="aIcon" class="v-modal" header="Agregar icono">
      <TagItemIcoForm ref="aIcon" @closeaModal="aIcon = false"></TagItemIcoForm>
      <template #footer>
        <div class="v-footer flex justify-between">
          <button class="v-cancel" type="button" @click="aIcon = false">
            <i class="fas fa-times-circle"></i>
            <span>Cancelar </span>
          </button>
          <button class="v-ok" type="button" @click="enviarIco">
            <span>Agregar</span>
            <i class="fas fa-check-circle"></i>
          </button>
        </div>
      </template>
    </t-modal>

    <t-modal v-model="aDir" class="v-modal" header="Agregar dirección">
      <TagItemDirForm ref="aDir" @closeaModal="aDir = false"></TagItemDirForm>
      <template #footer>
        <div class="v-footer flex justify-between">
          <button class="v-cancel" type="button" @click="aDir = false">
            <i class="fas fa-times-circle"></i>
            <span>Cancelar </span>
          </button>
          <button class="v-ok" type="button" @click="enviarDir">
            <span>Agregar</span>
            <i class="fas fa-check-circle"></i>
          </button>
        </div>
      </template>
    </t-modal>

    <t-modal v-model="aMedia" class="v-modal" header="Agregar Media">
      <TagItemMediaForm
        ref="aMedia"
        @closeaModal="aMedia = false"
      ></TagItemMediaForm>
      <template #footer>
        <div class="v-footer flex justify-between">
          <button class="v-cancel" type="button" @click="aMedia = false">
            <i class="fas fa-times-circle"></i>
            <span>Cancelar </span>
          </button>
          <button class="v-ok" type="button" @click="enviarMedia">
            <span>Agregar</span>
            <i class="fas fa-check-circle"></i>
          </button>
        </div>
      </template>
    </t-modal>

    <div class="perfil-wrap">
      <div class="perfil-wrap-int">
        <div class="px-2">
          <div v-if="userData.info.emails[0]" class="otros_enlaces info_email">
            <h3>Email de trabajo</h3>
            <div class="item">
              <TagItemEmailView
                :info="userData.info.emails[0]"
              ></TagItemEmailView>
            </div>
          </div>
          <div class="otros_enlaces">
            <hr />
            <h3>Iconos</h3>
            <Draggable
              v-if="iconos.length > 0"
              v-model="iconos"
              class="drag"
              draggable=".item"
              handle=".handle"
              gosth=".ghost"
              v-bind="dragOptions"
              @change="log"
              @start="isDragging = true"
              @end="isDragging = false"
            >
              <transition-group type="transition" name="flip-list">
                <div
                  v-for="(item, w) in iconos"
                  :key="'iconos_' + w"
                  class="item"
                >
                  <span class="handle">
                    <i class="fas fa-ellipsis-v"></i>
                  </span>
                  <TagItemIcoView :info="item"></TagItemIcoView>
                </div>
              </transition-group>
            </Draggable>
            <div v-else>
              <p class="text-center text-lg py-10">
                Puedes ingresar iconos

                <button
                  class="text-xl underline text-primary-500"
                  @click="aIcon = true"
                >
                  aquí
                </button>
              </p>
            </div>
          </div>
          <div class="otros_enlaces">
            <hr />
            <h3>Contenido</h3>
            <Draggable
              v-if="varios.length > 0"
              v-model="varios"
              class="drag"
              draggable=".item"
              handle=".handle"
              gosth=".ghost"
              v-bind="dragOptions"
              @change="log"
              @start="isDragging = true"
              @end="isDragging = false"
            >
              <transition-group type="transition" name="flip-list">
                <div
                  v-for="(item, y) in varios"
                  :key="'varios_' + y"
                  class="item"
                >
                  <span class="handle">
                    <i class="fas fa-ellipsis-v"></i>
                  </span>
                  <TagItemLinkView
                    v-if="item.tipo === 'link'"
                    :info="item"
                  ></TagItemLinkView>
                  <TagItemNotaView
                    v-if="item.tipo === 'nota'"
                    :info="item"
                  ></TagItemNotaView>
                </div>
              </transition-group>
            </Draggable>
            <div v-else>
              <p class="text-center text-lg py-10">
                Puedes agregar
                <!-- <button
                  class="text-xl underline text-primary-500"
                  @click="aMed = true"
                >
                  notas</button
                >, -->
                <button
                  class="text-xl underline text-primary-500"
                  @click="aNot = true"
                >
                  notas</button
                >,
                <button
                  class="text-xl underline text-primary-500"
                  @click="aLink = true"
                >
                  links
                </button>
              </p>
            </div>
          </div>

          <div class="otros_enlaces">
            <hr />
            <h3>Teléfonos</h3>

            <Draggable
              v-if="telefonos.length > 0"
              v-model="telefonos"
              class="drag"
              draggable=".item"
              handle=".handle"
              gosth=".ghost"
              v-bind="dragOptions"
              @change="log"
              @start="isDragging = true"
              @end="isDragging = false"
            >
              <transition-group type="transition" name="flip-list">
                <div
                  v-for="(item, y) in telefonos"
                  :key="'telefonos_' + y"
                  class="item"
                >
                  <span class="handle">
                    <i class="fas fa-ellipsis-v"></i>
                  </span>
                  <TagItemTelView :info="item"></TagItemTelView>
                </div>
              </transition-group>
            </Draggable>
            <div v-else>
              <p class="text-center text-lg py-10">
                Puedes ingresar teléfonos
                <button
                  class="text-xl underline text-primary-500"
                  @click="aTel = true"
                >
                  aquí
                </button>
              </p>
            </div>
          </div>

          <div class="otros_enlaces">
            <hr />
            <h3>Direcciones</h3>

            <Draggable
              v-if="direcciones.length > 0"
              v-model="direcciones"
              class="drag"
              draggable=".item"
              handle=".handle"
              gosth=".ghost"
              v-bind="dragOptions"
              @change="log"
              @start="isDragging = true"
              @end="isDragging = false"
            >
              <transition-group type="transition" name="flip-list">
                <div
                  v-for="(item, y) in direcciones"
                  :key="'direcciones_' + y"
                  class="item"
                >
                  <span class="handle">
                    <i class="fas fa-ellipsis-v"></i>
                  </span>
                  <TagItemDirView :info="item"></TagItemDirView>
                </div>
              </transition-group>
            </Draggable>
            <div v-else>
              <p class="text-center text-lg py-10">
                Puedes ingresar direcciones
                <button
                  class="text-xl underline text-primary-500"
                  @click="aDir = true"
                >
                  aquí
                </button>
              </p>
            </div>
          </div>
          <div class="otros_enlaces">
            <hr />
            <h3>Media</h3>

            <Draggable
              v-if="medias.length > 0"
              v-model="medias"
              class="drag"
              draggable=".item"
              handle=".handle"
              gosth=".ghost"
              v-bind="dragOptions"
              @change="changeMedia"
              @start="isDragging = true"
              @end="isDragging = false"
            >
              <transition-group type="transition" name="flip-list">
                <div
                  v-for="(item, y) in medias"
                  :key="'media_' + y"
                  class="item"
                >
                  <span class="handle">
                    <i class="fas fa-ellipsis-v"></i>
                  </span>
                  <TagItemMediaView :info="item"></TagItemMediaView>
                </div>
              </transition-group>
            </Draggable>
            <div v-else>
              <p class="text-center text-lg py-10">
                Puedes ingresar multimedia
                <button
                  class="text-xl underline text-primary-500"
                  @click="aMedia = true"
                >
                  aquí
                </button>
              </p>
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
      aMail: false,
      aLink: false,
      aIcon: false,
      aMedia: false,
      aTel: false,
      aDir: false,
      aNot: false,
      myArray: [
        { id: 1, name: 'Facebook' },
        { id: 2, name: 'Twitter' },
        { id: 3, name: 'Instagram' },
        { id: 4, name: 'LinkedIn' },
        { id: 5, name: 'Github' },
      ],
    }
  },

  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      }
    },
  },
  mounted() {
    // this.$fire.functions
    //   .httpsCallable('getTag')({
    //     id: 'mHRi9',
    //   })
    //   .then((resp) => {
    //     console.log('ID FROM TAG ', resp)
    //   })
    // this.$fire.functions
    //   .httpsCallable('getTag')({
    //     id: 'mHRi9',
    //   })
    //   .then((resp) => {
    //     console.log('ID FROM TAG ', resp)
    //   })
  },
  methods: {
    addPeople() {
      console.log('ADD PEOBLE')
      this.myArray.push({
        id: this.myArray.length + 2,
        name: 'New',
      })
    },
    log() {
      console.log('LOG', this.myArray)
    },
    changeMedia() {
      if (window.instgrm) {
        window.instgrm.Embeds.process()
      }

      if (window.twttr) {
        window.twttr.widgets.load()
      }
    },

    closeaLink() {
      this.aLink = false
    },
  },
}
</script>

<style lang="postcss">
.p-edit {
  @apply pt-4 text-primary-700 w-full;
  .perfil-wrap {
    @apply w-full lg:px-4 px-1 mx-auto;
    .perfil-wrap-int {
      @apply relative flex flex-col min-w-0 break-words bg-light w-full shadow-xl rounded-lg -mt-4 pt-8 mb-8 z-10;
      .perfil-wrap-int-top {
        @apply hidden flex flex-wrap justify-center;
        .perfil-wrap-int-top-foto {
          @apply w-full px-4 flex justify-center;
          .foto-perfil {
            max-width: 120px;
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
        @apply hidden text-center mt-2;
        h3 {
          @apply text-lg font-semibold leading-normal mb-4;
        }
        .btn-download {
          @apply text-sm flex justify-around space-x-8 mx-auto w-1/2;
        }
        .tag-link {
          @apply hidden text-sm leading-normal mt-0 mb-1 font-bold;
          i {
            @apply mr-2 text-base text-secondary-400;
          }
        }
        .tag-empresa {
          @apply hidden text-sm leading-normal mt-0 mb-1 font-bold;
          i {
            @apply mr-2 text-base text-secondary-400;
          }
        }
      }
      .otros_enlaces {
        @apply pt-8 mb-4;
        h3 {
          @apply text-left text-lg leading-normal ml-4 mb-4 uppercase tracking-wide font-light;
        }
      }
      .info_email {
        @apply pt-0;
        .item {
          @apply flex-1;
          .item-wrapper {
            @apply border-none;
          }
        }
      }
    }
  }
  .nav-edit {
    @apply px-4;
    .nav-edit-wrap {
      @apply justify-around py-4 bg-light-200 shadow-xl rounded-lg z-20;
      .nav-perfil {
        @apply border-b border-primary-200 pb-2 mb-4 px-6 flex flex-row space-x-4 items-center;
        img {
          @apply w-12 shadow-xl border-solid border-light border-4 rounded-full h-auto object-cover bg-gradient-to-r from-primary-400  to-primary-500;
        }
        h3 {
          @apply text-2xl flex-1;
        }
        .nav-perfil-theme {
          @apply flex space-x-2 items-center;
          input {
            @apply h-4 w-4 ring-1 ring-offset-1;
            &.default {
              accent-color: #ff5423;
              @apply border-orange-300 bg-orange-200 ring-orange-500;
            }
            &.green {
              accent-color: #00565d;
              @apply border-green-300 bg-green-200 ring-green-500;
            }
            &.blue {
              accent-color: #0c2291;
              @apply border-blue-300 bg-blue-200 ring-blue-500;
            }
            &.red {
              accent-color: #801212;
              @apply border-red-300 bg-red-200 ring-red-500;
            }
            &.yellow {
              accent-color: #ae8b16;
              @apply border-yellow-300 bg-yellow-200 ring-yellow-500;
            }
            &.light {
              accent-color: #c4c4c4;
              @apply border-light-300 bg-light-200 ring-light-500;
            }
            &.dark {
              accent-color: #484848;
              @apply border-dark-300 bg-dark-200 ring-dark-500;
            }
          }
        }
      }
      ul {
        @apply w-full grid gap-x-3 gap-y-2 lg:grid-cols-4 grid-cols-2 my-4 flex-wrap px-4;
        li {
          @apply text-sm font-bold w-full;
          button {
            @apply w-full flex space-x-4 items-center justify-around rounded-lg px-4 py-1 bg-gradient-to-br from-primary-100 to-primary-200 shadow-lg;
            i {
              @apply h-8 w-8 text-center shadow-inner text-sm block rounded-full pt-1 bg-primary-400 text-light;
            }
            span {
              @apply flex-1 block leading-3 text-left;
            }
          }
        }
      }
    }
  }
}
.v-modal {
  .v-footer {
    button {
      @apply flex space-x-4 items-center justify-around rounded-lg px-4 py-2 shadow-lg font-bold;
      &.v-cancel {
        @apply text-secondary-500 bg-gradient-to-br from-secondary-100 to-light;
      }
      &.v-ok {
        @apply text-green-500 bg-gradient-to-br from-green-100 to-light;
      }
      i {
        @apply text-center text-sm block;
      }
      span {
        @apply block leading-3 text-left;
      }
    }
  }
}
</style>