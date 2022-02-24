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

      actualizarVarios: 'actualizarVarios',
      actualizarTelefonos: 'actualizarTelefonos',
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
  },
}
