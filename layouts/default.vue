<template>
  <div class="font-sans">
    <AppNav></AppNav>
    <Nuxt></Nuxt>
    <AppFooter></AppFooter>
  </div>
</template>
<style lang="postcss">
body {
  @apply min-h-screen bg-gradient-to-r from-primary-500  to-third-500;
}
.btn-link {
  @apply block px-8 py-3 shadow-lg rounded-xl duration-300 ease-in-out text-primary-900 font-bold bg-gradient-to-r from-primary-400 hover:scale-105  to-third-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed;
}
.btn-link-light {
  @apply block px-8 py-3 shadow-lg rounded-xl duration-300 ease-in-out text-primary-900 font-bold bg-gradient-to-r from-primary-100 hover:scale-105  to-third-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed;
}
.btn {
  @apply lg:mx-0 bg-light text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none transform transition-all hover:scale-105 duration-300 ease-in-out;
}
.vue-tel-input {
  @apply mb-1 px-3 py-1.5 text-primary-800 placeholder-gray-400 transition duration-100 ease-in-out bg-light border border-gray-100 rounded shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed;
  &:focus-within {
    @apply ring-2 ring-primary-500  border-primary-500;
  }
}
.p-form-control {
  @apply relative w-full mb-8;
  label {
    @apply block text-primary-700 text-sm font-bold mb-2;
  }
  .p-select {
    background-color: #c1cac9 !important;

    @apply mb-2  block w-full focus:outline-none focus:ring-0  text-dark  transition-all  duration-150 ease-linear disabled:bg-primary-300 disabled:bg-primary-300 disabled:opacity-50;
    &:focus {
      background-color: #ebe6df !important;
      @apply shadow-lg ring ring-primary-600 bg-primary-100 ring-offset-1 ring-offset-primary-200;
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
    @apply mb-2 text-sm text-dark block w-full;
  }
  .p-error {
    @apply text-xs text-secondary-500 block w-full mb-2;
  }
  .p-icon {
    @apply absolute inset-y-0 right-0 pr-3 flex items-center text-primary-800 font-bold text-xl;
  }
  .p-submit {
    @apply bg-primary-300 hover:bg-primary-200 text-light w-full;
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
          @apply block mr-2 text-secondary-500 text-xs;
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
    @apply relative container lg:px-3 px-1 mx-auto flex flex-wrap flex-col lg:flex-row;
    .hero-container-left {
      @apply lg:sticky lg:top-0 lg:max-h-screen flex flex-col w-full lg:w-2/5 justify-center items-start text-center lg:text-left;
    }
    .hero-container-right {
      @apply w-full lg:w-3/5 py-6;
    }
    .hero-container-center {
      @apply w-full lg:max-w-xl mx-auto text-center;
    }
    .hero-container-center2 {
      @apply w-full lg:max-w-2xl mx-auto text-center;
    }
    .hero-container-center3 {
      @apply w-full lg:max-w-4xl mx-auto text-center;
    }
    .hero-container-full {
      @apply w-full mx-auto text-center;
    }
    p.hero-wellcome {
      @apply tracking-wide w-full mb-8;
    }
    h3 {
      @apply my-4 text-2xl font-bold leading-tight mb-8 w-full;
    }
    h1 {
      @apply my-4 text-7xl font-bold leading-tight mb-8 w-full bg-clip-text text-transparent bg-gradient-to-br from-primary-100 to-light;
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
    @apply bg-primary-200 opacity-25 rotate-45;
  }
}
.item {
  @apply flex items-center transition-all shadow-lg border-solid border-primary-100 border rounded-lg mb-2 px-2 py-2 space-x-2;
  .handle {
    @apply cursor-move px-2 text-center block;
    i {
      @apply text-base text-secondary-400 mx-0;
    }
  }
  .item-wrapper {
    @apply flex items-stretch px-2 space-x-3 w-full border-l border-primary-100;
    .item-wrapper-info {
      @apply flex-1 text-left border-r border-primary-100;
      .item-tipo {
        @apply text-xs text-primary-600 mb-1 uppercase;
      }
      &.t-dir,
      &.t-link,
      &.t-nota,
      &.t-email,
      &.t-tel,
      &.t-ico,
      &.t-media {
        .item-embed {
          @apply text-primary-500 text-lg mb-0;
        }
        .item-titulo {
          @apply text-primary-500 text-lg mb-0;
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
          @apply text-2xs font-bold mb-0 py-1 px-2 rounded-3xl text-light inline-block;
          &.activo {
            @apply bg-green-600;
          }
          &.inactivo {
            @apply bg-secondary-600;
          }
        }
        .item-icono {
          i {
            @apply text-3xl text-primary-500 mb-2;
          }
        }
      }
      &.t-ico {
        @apply flex justify-around items-center mr-2;
      }
    }
    .item-wrapper-acciones {
      @apply flex justify-center items-end flex-col;
      button {
        @apply mb-2 h-8 w-8 shadow-md text-center block rounded-full text-sm  bg-light transition-all font-light;
        &.borrar {
          @apply text-secondary-600  hover:bg-secondary-600 hover:text-light;
        }
        &.editar {
          @apply text-third-600 hover:bg-third-600 hover:text-light;
        }
      }
    }
  }
}
.perfilview {
  .o-varios {
    @apply my-10 flex flex-col space-y-8;
  }
  .o-dirs,
  .o-tels,
  .o-emails,
  .o-media {
    @apply my-10;
    .icon {
      @apply mb-4 text-3xl text-secondary-400;
    }
    .item-embed {
      @apply w-full mb-4;
    }
    .tels {
      @apply flex flex-col w-10/12 mx-auto space-y-2;
      .tel {
        @apply flex justify-between align-bottom space-x-6 text-lg text-primary-400 pb-2 border-b border-gray-100;
        b {
          @apply font-light text-base;
        }
        a {
          @apply font-medium transition-all hover:text-primary-600;
        }
      }
    }
  }
  &.lectura {
    .o-varios {
      @apply space-y-2;
    }
    .o-dirs,
    .o-tels,
    .o-emails,
    .o-media {
      @apply my-4;
      .icon {
        @apply mb-2 text-lg;
      }
      .item-embed {
        @apply w-full mb-2;
      }
      .tels {
        .tel {
          @apply space-x-2 text-base;
          b {
            @apply font-light text-sm;
          }
          a {
            @apply text-sm;
          }
        }
      }
    }
  }
}
</style>