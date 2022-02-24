<template>
  <nav id="header" :class="isScrolled ? 'scrolled bg-white' : ''">
    <div class="header-container">
      <div class="header-container-int">
        <nuxt-link class="logo-link toggleColour" to="/">
          <svg
            class="h-12 fill-current inline"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            data-name="Grupo 18"
            viewBox="0 0 129.581 102.235"
          >
            <defs>
              <clipPath id="clip-path">
                <rect
                  data-name="Rectángulo 9"
                  width="129.581"
                  height="102.235"
                  fill="none"
                ></rect>
              </clipPath>
            </defs>
            <g data-name="Grupo 17" clip-path="url(#clip-path)">
              <path
                class="path"
                data-name="Trazado 92"
                d="M61.383,13.232a9.516,9.516,0,1,1-9.516,9.516,9.516,9.516,0,0,1,9.516-9.516"
              ></path>
              <path
                class="path"
                data-name="Trazado 93"
                d="M122.558,102.154c-5.986.094-4.483.122-19.088,0-23.7-.2-26.182-15.922-26.182-24.477V54.567h-.209c-13.368-.014-15.447,7.022-15.692,10.2V98.2a4.429,4.429,0,0,1-.842,2.928,3.321,3.321,0,0,1-2.676.993H46.1a4.52,4.52,0,0,1-3.007-.741,3.817,3.817,0,0,1-.821-2.871V95.823a8.029,8.029,0,0,1-.172-2.288c.079-1.26.136-2.605.172-4.073V65.338a9.1,9.1,0,0,0-.993-4.152,12.142,12.142,0,0,0-2.619-3.46,12.516,12.516,0,0,0-3.7-2.368,10.66,10.66,0,0,0-4.2-.87,9.539,9.539,0,0,0-3.741.813,12.655,12.655,0,0,0-3.518,2.273,13.4,13.4,0,0,0-2.7,3.411,10.016,10.016,0,0,0-1.245,4.252V98.348a4.934,4.934,0,0,1-.331,1.734,2.771,2.771,0,0,1-.993,1.324,4.7,4.7,0,0,1-1.252.561,5.4,5.4,0,0,1-1.345.151H4.13a4.089,4.089,0,0,1-3.166-1.065A4.134,4.134,0,0,1,0,98.2V41.228a3.744,3.744,0,0,1,.432-1.777,3.188,3.188,0,0,1,1.2-1.267l-.309.151a3.112,3.112,0,0,1,1.4-.712,6.939,6.939,0,0,1,1.4-.151h7.691a3.327,3.327,0,0,1,2.7,1.216,4.613,4.613,0,0,1,.734,1.273c.187.475.367.964.54,1.475L16.858,45.9a12.271,12.271,0,0,1,2.475-3.252,18.913,18.913,0,0,1,4.223-3.043,26.632,26.632,0,0,1,5.835-2.267,28.622,28.622,0,0,1,7.389-.885,22.438,22.438,0,0,1,14.577,4.879c4.26-3.742,8.792-4.864,10.634-4.879,4.317-.021,7.015-.021,7.346-.021l7.951.007V7.361c0-3.971,4.54-7.4,8.518-7.36l1.821.022c3.986.035,9.209,3.316,9.108,7.3-.179,7.217-.258,18.167-.287,29.125l13.094.007c4.476,0,7.879,3.684,7.879,8.785,0,4.461-2.18,9.26-6.67,9.325-6.324.079-10.512.1-14.318.086,0,4.109.008,7.836.008,10.915,0,21.369,2.554,18.376,10.619,18.376l15.412-.123c6.079.036,7.094,5.548,7.108,8.418.036,5.756-1.655,9.836-7.022,9.915"
              ></path>
            </g>
          </svg>
        </nuxt-link>
      </div>
      <div class="toogle-menu">
        <button id="nav-toggle">
          <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div id="nav-content" class="">
        <ul class="menu">
          <li class="mr-3">
            <a class="inline-block py-2 px-4 font-bold no-underline" href="#"
              >Tienda</a
            >
          </li>
          <li v-if="userData" class="mr-3">
            <nuxt-link to="/perfil"> Mi perfil </nuxt-link>
          </li>
          <li v-if="userData" class="mr-3">
            <nuxt-link :to="`/tag/${userData.tag}`"> Ver Mi Tag </nuxt-link>
          </li>
          <li v-if="userData" class="mr-3">
            <nuxt-link :to="`/tag/${userData.tag}/edit`">
              Editar Mi Tag
            </nuxt-link>
          </li>
          <li>
            <button class="navAction" @click="verUsuario">
              <template v-if="isLoggedIn">
                Salir <i class="fal fa-sign-out-alt"></i>
              </template>
              <template v-else>
                Ingresar <i class="fas fa-sign-in-alt"></i>
              </template>
            </button>
          </li>
        </ul>
      </div>
    </div>
    <hr />
  </nav>
</template>

<script>
import dataMixin from '~/mixins/data.js'
export default {
  mixins: [dataMixin],
  data() {
    return {
      isOpen: false,
      isScrolled: false,
    }
  },

  mounted() {
    let scrollposNav = window.scrollY

    document.addEventListener('scroll', function () {
      const header = document.getElementById('header')
      scrollposNav = window.scrollY
      this.isScrolled = scrollposNav > 10
      if (scrollposNav > 10) {
        header.classList.add('scrolled')
      } else {
        header.classList.remove('scrolled')
      }
    })
  },
  methods: {
    drawer() {
      this.isOpen = !this.isOpen
    },
    verUsuario() {
      if (this.isLoggedIn) {
        this.logout()
      } else {
        this.$router.push({
          path: '/login',
        })
      }
    },
  },
}
</script>
<style lang="postcss" scoped>
#header {
  @apply transition-all fixed w-full z-30 top-0;
  .header-container {
    @apply w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2;
    &-int {
      @apply pl-4 flex items-center;
      .logo-link {
        @apply text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl;
        svg {
          @apply h-16 transition hover:scale-105 duration-300 ease-in-out;
          .path {
            fill: #fff;
            @apply transition-all;
          }
        }
      }
    }
    .toogle-menu {
      @apply block lg:hidden pr-4;
      #nav-toggle {
        @apply flex items-center p-1 text-pink-800 hover:text-gray-900 focus:outline-none transition hover:scale-105 duration-300 ease-in-out;
        svg {
          @apply fill-current h-6 w-6;
        }
      }
    }
    #nav-content {
      @apply w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20;
      ul.menu {
        @apply lg:flex justify-end flex-1 items-center;
        li {
          @apply mr-3;
          a {
            @apply text-white transition-all inline-block no-underline hover:text-gray-800  py-2 px-4;
          }
          .navAction {
            @apply mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full lg:mt-0 py-2 px-8 shadow opacity-75 focus:outline-none transform transition hover:scale-105 duration-300 ease-in-out;
          }
        }
      }
    }

    hr {
      @apply border-b border-gray-100 opacity-25 my-0 py-0;
    }
  }
  &.scrolled {
    @apply bg-white shadow-xl;
    .logo-link {
      svg {
        .path {
          fill: #ff6700;
        }
      }
    }
    #nav-content {
      ul.menu {
        li {
          a {
            @apply text-orange-500;
          }
          .navAction {
            @apply bg-orange-500  text-white;
          }
        }
      }
    }
  }
}
</style>