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
    <div class="wrap-tag-int">
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
  .wrap-tag-int {
    @apply flex relative;
    .wrap-edit {
      @apply w-full lg:px-16 px-0 text-center min-h-screen flex items-start pt-16;
    }
    .iphone-wrap {
      @apply lg:sticky lg:top-20 lg:mt-14 hidden lg:flex lg:w-2/5  max-h-screen  items-center justify-center rounded-lg bg-light-200;
      .iphone {
        @apply relative w-8/12 max-w-sm rounded-3xl border-12 border-gray-800 bg-light;
        .content {
          @apply aspect-w-9 aspect-h-16 w-full overflow-y-auto overflow-x-hidden select-none;
          .content_wrap {
            .perfilview-wrap {
              /* @apply pointer-events-none; */
            }
          }
        }
      }
    }
  }
}
</style>