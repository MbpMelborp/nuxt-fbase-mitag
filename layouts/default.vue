<template>
  <div class="font-sans">
    <AppNav></AppNav>
    <Nuxt></Nuxt>
    <AppFooter></AppFooter>
  </div>
</template>
<style lang="postcss">
body {
  @apply min-h-screen;
}
.btn-link {
  @apply block px-8 py-3 shadow-lg rounded-xl duration-300 ease-in-out text-orange-900 font-bold bg-gradient-to-r from-orange-400 hover:scale-105  to-yellow-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed;
}
.btn-link-light {
  @apply block px-8 py-3 shadow-lg rounded-xl duration-300 ease-in-out text-orange-900 font-bold bg-gradient-to-r from-orange-100 hover:scale-105  to-yellow-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed;
}
.btn {
  @apply lg:mx-0 bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none transform transition-all hover:scale-105 duration-300 ease-in-out;
}
.vue-tel-input {
  @apply mb-1 px-3 py-1.5 text-pink-800 placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-100 rounded shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed;
  &:focus-within {
    @apply ring-2 ring-orange-500 ring-opacity-50 border-orange-500;
  }
}
.p-form-control {
  @apply relative z-0 w-full mb-8;
  label {
    @apply block text-orange-700 text-sm font-bold mb-2;
  }
  .p-select {
    background-color: #c1cac9 !important;

    @apply mb-2  block w-full focus:outline-none focus:ring-0  text-black  transition-all  duration-150 ease-linear disabled:bg-orange-300 disabled:bg-orange-300 disabled:opacity-50;
    &:focus {
      background-color: #ebe6df !important;
      @apply shadow-lg ring ring-orange-600 bg-orange-100 ring-offset-1 ring-offset-orange-200;
    }
    option {
      @apply p-2;
    }
    &.showd {
      height: 20px !important;
      background: transparent !important;
      @apply mt-0 mb-1 p-0 disabled:bg-transparent disabled:text-indigo-100 disabled:opacity-100 disabled:border-none;
    }
  }

  label.p-label {
    @apply mb-2 text-sm text-black block w-full;
  }
  .p-error {
    @apply text-xs text-red-500 block w-full mb-2;
  }
  .p-icon {
    @apply absolute inset-y-0 right-0 pr-3 flex items-center text-orange-800 font-bold text-xl;
  }
  .p-submit {
    @apply bg-orange-300 hover:bg-orange-200 text-white w-full;
    i {
      @apply ml-2;
    }
  }
  .p-validate {
    @apply mt-1 ml-2;
    ul {
      li {
        @apply text-sm font-light flex items-start leading-tight;
        .fa-check-circle {
          @apply block mr-2 text-green-500 text-xs;
        }
        .fa-circle {
          @apply block mr-2 text-red-500 text-xs;
        }
        span {
          @apply block;
        }
      }
    }
  }
}

.p-fade-enter-active,
.p-fade-leave-active {
  @apply animate-fade-in-down;
  /* transition: opacity 0.5s; */
}
.p-fade-enter,
.p-fade-leave-active {
  @apply animate-fade-out-down;
  /* opacity: 0; */
}

.hero {
  min-height: calc(100vh - 240px) !important;
  @apply py-24 flex justify-center items-center;
  .hero-container {
    @apply container px-3 mx-auto flex flex-wrap flex-col lg:flex-row items-center;
    .hero-container-left {
      @apply flex flex-col w-full lg:w-2/5 justify-center items-start text-center lg:text-left;
    }
    .hero-container-right {
      @apply w-full lg:w-3/5 py-6;
    }
    .hero-container-center {
      @apply w-full lg:max-w-xl mx-auto text-center;
    }
    p.hero-wellcome {
      @apply tracking-wide w-full mb-8;
    }
    h3 {
      @apply my-4 text-2xl font-bold leading-tight mb-8 w-full;
    }
    h1 {
      @apply my-4 text-7xl font-bold leading-tight mb-8 w-full bg-clip-text text-transparent bg-gradient-to-br from-orange-100 to-white;
    }
    p.hero-intro {
      @apply leading-normal text-2xl mb-8;
    }
  }
}

.firebase-emulator-warning {
  @apply hidden;
}

.drag {
  .flip-list-move {
    transition: transform 0.5s;
  }
  .no-move {
    transition: transform 0s;
  }
  .ghost {
    @apply bg-orange-200 opacity-25 rotate-45;
  }
}
.item {
  @apply flex items-center transition-all shadow-lg border-solid border-orange-100 border rounded-lg mb-2 px-2 py-2 space-x-2;
  .handle {
    @apply cursor-move px-2 text-center block;
    i {
      @apply text-base text-red-400 mx-0;
    }
  }
  .item-wrapper {
    @apply flex items-stretch px-2 space-x-3 w-full border-l border-orange-100;
    .item-wrapper-info {
      @apply flex-1 text-left border-r border-orange-100;
      .item-tipo {
        @apply text-xs text-orange-600 mb-1 uppercase;
      }
      &.t-link,
      &.t-nota,
      &.t-email,
      &.t-tel {
        .item-titulo {
          @apply text-orange-500 text-lg mb-0;
        }
        .item-link {
          @apply text-gray-300 text-sm mb-1;
        }
        .item-tel {
          @apply text-gray-300 text-base mb-1;
        }
        .item-nota {
          @apply h-12 overflow-hidden overflow-y-scroll text-gray-300 text-xs mb-1 mr-1;
        }
        .item-habilitado {
          @apply text-2xs font-bold mb-0 py-1 px-2 rounded-3xl text-white inline-block;
          &.activo {
            @apply bg-green-600;
          }
          &.inactivo {
            @apply bg-red-600;
          }
        }
      }
    }
    .item-wrapper-acciones {
      @apply flex justify-center items-end flex-col;
      button {
        @apply mb-2 h-8 w-8 shadow-md text-center block rounded-full text-sm  bg-white transition-all font-light;
        &.borrar {
          @apply text-red-600  hover:bg-red-600 hover:text-white;
        }
        &.editar {
          @apply text-yellow-600 hover:bg-yellow-600 hover:text-white;
        }
      }
    }
  }
}
</style>