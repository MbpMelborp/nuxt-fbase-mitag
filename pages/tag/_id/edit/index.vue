<template>
  <!-- <div class="h-screen flex items-center justify-center">
    <h2 class="text-6xl">
      Editar tag
      <client-only>
        <b v-if="$route.params.id">{{ $route.params.id }}</b>
      </client-only>
    </h2>
  </div> -->
  <div class="wrap-tag">
    <div class="flex">
      <div class="w-full lg:w-3/5">
        <div class="wrap-edit">
          <TagEdit></TagEdit>
        </div>
      </div>
      <div class="iphone-wrap">
        <div class="iphone">
          <div class="content">
            <div class="content_wrap">
              <TagView
                :tag="$route.params.id"
                :lectura="true"
                class="perfilview-wrap"
              ></TagView>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Trama></Trama>
  </div>

  <!-- <div class="login">
    <div class="hero">
      <div class="hero-container">
        <div class="hero-container-center">
          <TagEdit></TagEdit>
        </div>
      </div>
    </div>
    <Trama></Trama>
  </div> -->
</template>

<script>
import dataMixin from '~/mixins/data.js'
export default {
  mixins: [dataMixin],
  middleware: 'authtag',
}
</script>

<style lang="postcss">
.wrap-tag {
  @apply w-full min-h-screen;
  .wrap-edit {
    @apply w-full lg:max-w-xl mx-auto text-center min-h-screen flex items-start pt-14;
  }
  .iphone-wrap {
    @apply hidden lg:flex lg:w-2/5  items-center justify-center  mt-20 rounded-lg bg-white bg-opacity-40;
    .iphone {
      @apply w-8/12 max-w-sm rounded-3xl border-12 border-gray-800 bg-white;
      .content {
        @apply aspect-w-9 aspect-h-16 w-full overflow-y-auto select-none;
        .content_wrap {
          .perfilview-wrap {
            @apply pointer-events-none;
          }
        }
      }
    }
  }
}
</style>