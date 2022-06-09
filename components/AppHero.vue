<template>
  <div class="pt-24">
    <div
      class="
        container
        px-3
        mx-auto
        flex flex-wrap flex-col
        md:flex-row
        items-center
      "
    >
      <div class="w-full md:w-3/5 py-6 text-center">
        <img class="w-full md:w-4/5 z-50" src="~/assets/images/banner.png" />
      </div>
      <!--Left Col-->
      <div
        class="
          flex flex-col
          w-full
          md:w-2/5
          justify-center
          items-start
          text-center
          md:text-left
        "
      >
        <h1 class="my-2 text-5xl leading-tight italic">
          <b>¡Smart Cards</b> made
        </h1>
        <p class="leading-normal text-5xl mb-2 italic">
          For <b>Smart Networking!</b>
        </p>
        <a
          href="https://mitag.co/"
          target="_blank"
          class="
            lg:mx-0
            bg-light
            text-gray-800
            font-bold
            rounded-full
            my-6
            py-4
            px-8
            shadow-lg
            focus:outline-none focus:shadow-outline
            transform
            transition-all
            hover:scale-105
            duration-300
            ease-in-out
          "
        >
          Ir a la tienda
        </a>
      </div>
      <!--Right Col-->
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>