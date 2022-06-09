import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState(['userData', 'authUser']),
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
    }),
    varios: {
      get() {
        return this.userData.info.varios
      },
      set(value) {
        this.actualizarVarios(value)
      },
    },
    telefonos: {
      get() {
        return this.userData.info.telefonos
      },
      set(value) {
        this.actualizarTelefonos(value)
      },
    },
    iconos: {
      get() {
        return this.userData.info.iconos
      },
      set(value) {
        this.actualizarIco(value)
      },
    },
    direcciones: {
      get() {
        return this.userData.info.direcciones
      },
      set(value) {
        this.actualizarDir(value)
      },
    },
    medias: {
      get() {
        return this.userData.info.medias
      },
      set(value) {
        this.actualizarMedia(value)
      },
    },
    theme: {
      get() {
        return this.userData.theme
      },
      set(value) {
        this.actualizarTheme(value)
      },
    },
  },

  data() {
    return {
      opciones: [
        // cellPhone, pagerPhone, homePhone, workPhone, homeFax, workFax, otherPhone
        // {
        //   value: 'cellPhone',
        //   text: 'Celular',
        // },
        {
          value: 'homePhone',
          text: 'Hogar',
        },
        {
          value: 'workPhone',
          text: 'Trabajo',
        },
        {
          value: 'otherPhone',
          text: 'Otro',
        },
      ],
      opcionesDir: [
        // cellPhone, pagerPhone, homePhone, workPhone, homeFax, workFax, otherPhone
        // {
        //   value: 'cellPhone',
        //   text: 'Celular',
        // },
        {
          value: 'homeAddress',
          text: 'Hogar',
        },
        {
          value: 'workAddress',
          text: 'Trabajo',
        },
      ],
    }
  },
  methods: {
    ...mapMutations({
      setUserData: 'SET_USER_DATA',
    }),
    ...mapActions({
      registrarUsuario: 'registrarUsuario',
      editarUsuario: 'editarUsuario',

      loginUsuario: 'loginUsuario',
      getUserData: 'getUserData',
      getTagById: 'getTagById',
      getTag: 'getTag',

      agregarLink: 'agregarLink',
      agregarNota: 'agregarNota',
      agregarEmail: 'agregarEmail',
      agregarTel: 'agregarTel',
      agregarIco: 'agregarIco',
      agregarDir: 'agregarDir',
      agregarMedia: 'agregarMedia',

      actualizarVarios: 'actualizarVarios',
      actualizarTelefonos: 'actualizarTelefonos',
      actualizarIco: 'actualizarIco',
      actualizarDir: 'actualizarDir',
      actualizarMedia: 'actualizarMedia',

      actualizarTheme: 'actualizarTheme',
      enviarLead: 'enviarLead',

      getTagsList: 'getTagsList',
    }),
    NumbersOnly(evt) {
      evt = evt || window.event
      const charCode = evt.which ? evt.which : evt.keyCode
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault()
      } else {
        return true
      }
    },

    // LOGOUT
    async logout() {
      try {
        await this.$fire.auth.signOut()
        this.$router.push({
          path: '/login',
        })
      } catch (e) {
        alert(e)
      }
    },
    // ITEMS
    enviarLink() {
      const mod = this.$refs.aLink
      mod.enviar()
    },
    enviarNota() {
      const mod = this.$refs.aNot
      mod.enviar()
    },
    enviarEmail() {
      const mod = this.$refs.aMail
      mod.enviar()
    },
    enviarTel() {
      const mod = this.$refs.aTel
      mod.enviar()
    },
    enviarIco() {
      const mod = this.$refs.aIcon
      mod.enviar()
    },
    enviarDir() {
      const mod = this.$refs.aDir
      mod.enviar()
    },
    enviarMedia() {
      const mod = this.$refs.aMedia
      mod.enviar()
      if (window.instgrm) {
        window.instgrm.Embeds.process()
      }
      if (window.twttr) {
        window.twttr.widgets.load()
      }
    },
  },
}
