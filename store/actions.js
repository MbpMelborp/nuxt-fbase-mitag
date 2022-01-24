export const strict = false
// const axios = require('axios')
// const axiosRetry = require('axios-retry')

const cl = true

// axiosRetry(axios, {
//   retries: 3, // number of retries
//   retryDelay: (retryCount) => {
//     console.log(`retry attempt: ${retryCount}`)
//     return retryCount * 2000 // time interval between retries
//   },
//   retryCondition: (error) => {
//     // if retry condition is not specified, by default idempotent requests are retried
//     return error.response.status === 404
//   },
// })

export default {
  async nuxtServerInit({ dispatch }, ctx) {
    // INFO -> Nuxt-fire Objects can be accessed in nuxtServerInit ⛹  >  ACTION via this.$fire___, ctx.$fire___ and ctx.app.$fire___'

    /** Get the VERIFIED authUser on the server */
    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
      const { allClaims: claims, ...authUser } = ctx.res.locals.user

      console.info(
        'Auth User verified on server-side. User: ',
        authUser,
        'Claims:',
        claims
      )

      await dispatch('onAuthStateChanged', {
        authUser,
        claims,
      })
    }
  },

  async onAuthStateChanged({ commit, dispatch }, { authUser }) {
    if (!authUser) {
      commit('RESET_STORE')
      return
    }
    if (authUser && authUser.getIdToken) {
      try {
        const idToken = await authUser.getIdToken(true)
        console.info('└──❕ | idToken', idToken)
      } catch (e) {
        console.error(e)
      }
    }
    commit('SET_AUTH_USER', { authUser })
    dispatch('getUserData')
    dispatch('getUsuarios')
    dispatch('getPagos')
  },
  registrarUsuario({ app, ctx, commit, state }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION registrarUsuario')
    try {
      if (this.$fire.auth !== null) {
        return this.$fire.auth
          .createUserWithEmailAndPassword(payload.email, payload.password)
          .then((resp) => {
            delete payload.password
            return this.$fire.firestore
              .collection('empresas')
              .doc(resp.user.uid)
              .set({ ...payload, creado: new Date() })
              .then((ingreso) => {
                setTimeout(
                  () =>
                    this.$router.push({
                      path: '/empresas/usuarios',
                      query: { registro: 1 },
                    }),
                  1000
                )
                return {
                  error: false,
                  mensaje: 'La empresa se ha registrado con éxito',
                }
              })
              .catch((error) => {
                return { error: true, mensaje: error }
              })
          })
          .catch((error) => {
            return { error: true, mensaje: this.$fb_error(error.code) }
          })
      } else {
        return { error: true, mensaje: 'Problema de conexión con Firebase' }
      }
    } catch (e) {
      return {
        error: true,
        mensaje: 'Problema de ejecución en registrarUsuario ' + e,
      }
    }
  },
  loginUsuario({ app, ctx, commit, state }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION loginUsuario')
    try {
      if (this.$fire.auth !== null) {
        return this.$fire.auth
          .signInWithEmailAndPassword(payload.email, payload.password)
          .then((resp) => {
            setTimeout(
              () =>
                this.$router.push({
                  path: '/empresas/usuarios',
                  query: { login: 1 },
                }),
              1000
            )

            return {
              error: false,
              mensaje: 'Haz ingresado con  éxito',
            }
          })
          .catch(async (error) => {
            await this.$fire.auth.signOut()
            setTimeout(
              () =>
                this.$router.push({
                  path: '/e',
                  query: { error_login: 1 },
                }),
              1000
            )
            return { error: true, mensaje: this.$fb_error(error.code) }
          })
      } else {
        return { error: true, mensaje: 'Problema de conexión con Firebase' }
      }
    } catch (e) {
      return {
        error: true,
        mensaje: 'Problema de ejecución en registrarUsuario ' + e,
      }
    }
  },
  async getUserData({ app, ctx, commit, state }) {
    if (cl) console.info('🏁  | ⛹  >  ACTION getUserData')
    try {
      if (this.$fire.auth !== null) {
        if (cl)
          console.info(
            '----❕ | ⛹  >  ACTION getUserData uid',
            state.authUser.uid
          )
        if (state.authUser.uid) {
          const doc = await this.$fire.firestore
            .collection('empresas')
            .doc(state.authUser.uid)
            .get()
          if (doc.exists) {
            const data = {
              id: doc.id,
              ...doc.data(),
            }
            if (cl) console.info('└──❕ | ⛹  >  ACTION getUserData data', data)
            commit('SET_USER_DATA', data)
            return {
              error: false,
              doc: data,
            }
          } else {
            return {
              error: true,
              mensaje: 'La empresa no está registrada en el sistema',
            }
          }
        }
      } else {
        return { error: true, mensaje: 'Problema de conexión con Firebase' }
      }
    } catch (e) {
      return {
        error: true,
        mensaje: 'Problema de ejecución en registrarUsuario ' + e,
      }
    }
  },
}
