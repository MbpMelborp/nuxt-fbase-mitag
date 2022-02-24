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
    // dispatch('getUsuarios')
    // dispatch('getPagos')
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
              .collection('tags')
              .doc(payload.tag)
              .update({
                ...payload,
                creado: new Date(),
                usado: true,
                usuario: resp.user.uid,
              })
              .then((ingreso) => {
                /**
                 *  !guardar Vcard
                 */
                setTimeout(
                  () =>
                    this.$router.push({
                      path: `/tag/${payload.tag}/edit`,
                      query: { registro: 1 },
                    }),
                  1000
                )
                return {
                  error: false,
                  mensaje: 'El tag ha sido configurado con éxito',
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
  editarUsuario({ app, ctx, commit, state, dispatch }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION editarUsuario')
    try {
      if (this.$fire.auth !== null) {
        return this.$fire.firestore
          .collection('tags')
          .doc(payload.tag)
          .update({
            ...payload,
            ultima_actualizacion: new Date(),
          })
          .then((ingreso) => {
            dispatch('getUserData')
            return {
              error: false,
              mensaje: 'El perifl se ha actualizado con éxito',
            }
          })
          .catch((error) => {
            return { error: true, mensaje: error }
          })
      } else {
        return { error: true, mensaje: 'Problema de conexión con Firebase' }
      }
    } catch (e) {
      return {
        error: true,
        mensaje: 'Problema de ejecución en editarUsuario ' + e,
      }
    }
  },
  loginUsuario({ app, ctx, commit, state }, payload) {
    console.info('🏁  | ⛹  >  ACTION loginUsuario', this.$fire.auth)
    try {
      if (this.$fire.auth !== null) {
        // const persistence = payload.sesion
        //   ? this.$fire.auth.Persistence.LOCAL
        //   : this.$fire.auth.Persistence.SESSION
        // return (
        //   this.$fire.auth
        //     .authsetPersistence(persistence)
        //     .then(() => {
        return this.$fire.auth
          .signInWithEmailAndPassword(payload.email, payload.password)
          .then((resp) => {
            setTimeout(
              () =>
                this.$router.push({
                  path: '/perfil',
                  query: { login: 1 },
                }),
              1000
            )
            return {
              error: false,
              mensaje: 'Haz ingresado con éxito',
            }
          })
          .catch(async (error) => {
            await this.$fire.auth.signOut()
            // setTimeout(
            //   () =>
            //     this.$router.push({
            //       path: '/e',
            //       query: { error_login: 1 },
            //     }),
            //   1000
            // )
            return { error: true, mensaje: this.$fb_error(error.code) }
          })
        //     })
        //     // eslint-disable-next-line node/handle-callback-err
        //     .catch((error) => {
        //       console.error('└──🚨 | ⛹  >  ACTION loginUsuario data', error)
        //       return { error: true, mensaje: 'Problema de cal ingresar' }
        //     })
        // )
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
  getUserData({ app, ctx, commit, state, dispatch }) {
    if (cl) console.info('🏁  | ⛹  >  ACTION getUserData')
    try {
      if (this.$fire.auth !== null) {
        if (cl)
          console.info(
            '----❕ | ⛹  >  ACTION getUserData uid',
            state.authUser.uid
          )
        if (state.authUser.uid) {
          this.$fire.firestore
            .collection('tags')
            .where('usuario', '==', state.authUser.uid)
            .get()
            .then((docs) => {
              if (docs.size > 0) {
                console.log(docs.docs[0].id)
                commit('SET_USER_DATA', {
                  id: docs.docs[0].id,
                  ...docs.docs[0].data(),
                })
              }
            })
            .catch((error) => {
              console.error('└──🚨 | ⛹  >  ACTION getUserData data', error)
              dispatch('logout')
            })
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
  async getTagById({ app, ctx, commit, state }, payload) {
    console.group()
    console.info('🏁  | ⛹  >  ACTION getTagById')
    try {
      // if (this.$fire.auth !== null) {
      console.info('└──❕ | ⛹  >  ACTION getTagById id', payload)
      if (payload) {
        const doc = await this.$fire.firestore
          .collection('tags')
          .doc(payload)
          .get()
        if (doc.exists) {
          const data = {
            id: doc.id,
            ...doc.data(),
          }
          console.info('└──❕ | ⛹  >  ACTION getTagById data', data)
          console.groupEnd()
          return {
            error: false,
            doc: data,
          }
        } else {
          console.error(
            '└──🚨 | ⛹  >  ACTION getTagById data',
            'El tag no ha sido encontrado'
          )
          console.groupEnd()
          return {
            error: true,
            mensaje: 'El tag no ha sido encontrado',
          }
        }
      }
      // } else {
      //   return { error: true, mensaje: 'Problema de conexión con Firebase' }
      // }
    } catch (e) {
      console.error('└──🚨 | ⛹  >  ACTION getTagById data', e)
      console.groupEnd()

      return {
        error: true,
        mensaje: 'Problema de ejecución en getTagById ' + e,
      }
    }
  },
  getTag({ app, ctx, commit, state }, payload) {
    console.group()
    console.info('🏁  | ⛹  >  ACTION getTag', payload)
    try {
      // if (this.$fire.auth !== null) {
      console.info('└──❕ | ⛹  >  ACTION getTag id', payload)
      if (payload) {
        return this.$fire.firestore
          .collection('tags')
          .doc(payload)
          .get()
          .then((doc) => {
            if (doc.exists) {
              const data = {
                id: doc.id,
                ...doc.data(),
              }
              console.info('└──❕ | ⛹  >  ACTION getTag data', data)
              console.groupEnd()
              return {
                error: false,
                doc: data,
              }
            } else {
              console.error(
                '└──🚨 | ⛹  >  ACTION getTag data',
                'El tag no ha sido encontrado'
              )
              console.groupEnd()
              return {
                error: true,
                mensaje: 'El tag no ha sido encontrado',
              }
            }
          })
      }
      // } else {
      //   return { error: true, mensaje: 'Problema de conexión con Firebase' }
      // }
    } catch (e) {
      console.error('└──🚨 | ⛹  >  ACTION getTag data', e)
      console.groupEnd()

      return {
        error: true,
        mensaje: 'Problema de ejecución en getTag ' + e,
      }
    }
  },
  async logout({ app, ctx, commit, state, dispatch }) {
    try {
      await this.$fire.auth.signOut()
      this.$router.push({
        path: '/login',
      })
    } catch (e) {
      console.error('└──🚨 | ⛹  >  ACTION logout data', e)
    }
  },

  agregarLink({ app, ctx, commit, state, dispatch }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION agregarLink')
    try {
      if (this.$fire.auth !== null) {
        return this.$fire.firestore
          .collection('tags')
          .doc(state.userData.tag)
          .update({
            info: {
              varios: [payload, ...state.userData.info.varios],
              iconos: state.userData.info.iconos,
              telefonos: state.userData.info.telefonos,
              emails: state.userData.info.emails,
              notas: state.userData.info.notas,
            },
            ultima_actualizacion: new Date(),
          })
          .then((ingreso) => {
            dispatch('getUserData')
            return {
              error: false,
              mensaje: `El Link ${payload.titulo} se ha aegregado con éxito`,
            }
          })
          .catch((error) => {
            console.error('└──🚨 | ⛹  >  ACTION agregarLink', error)
            return { error: true, mensaje: error }
          })
      } else {
        return { error: true, mensaje: 'Problema de conexión con Firebase' }
      }
    } catch (e) {
      return {
        error: true,
        mensaje: 'Problema de ejecución en agregarLink ' + e,
      }
    }
  },
  agregarNota({ app, ctx, commit, state, dispatch }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION agregarNota')
    try {
      if (this.$fire.auth !== null) {
        return this.$fire.firestore
          .collection('tags')
          .doc(state.userData.tag)
          .update({
            info: {
              varios: [payload, ...state.userData.info.varios],
              iconos: state.userData.info.iconos,
              telefonos: state.userData.info.telefonos,
              emails: state.userData.info.emails,
              notas: state.userData.info.notas,
            },
            ultima_actualizacion: new Date(),
          })
          .then((ingreso) => {
            dispatch('getUserData')
            return {
              error: false,
              mensaje: `La Nota ${payload.titulo} se ha aegregado con éxito`,
            }
          })
          .catch((error) => {
            console.error('└──🚨 | ⛹  >  ACTION agregarNota', error)
            return { error: true, mensaje: error }
          })
      } else {
        return { error: true, mensaje: 'Problema de conexión con Firebase' }
      }
    } catch (e) {
      return {
        error: true,
        mensaje: 'Problema de ejecución en agregarNota ' + e,
      }
    }
  },
  agregarEmail({ app, ctx, commit, state, dispatch }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION agregarEmail', payload)
    try {
      if (this.$fire.auth !== null) {
        return this.$fire.firestore
          .collection('tags')
          .doc(state.userData.tag)
          .update({
            info: {
              varios: state.userData.info.varios,
              iconos: state.userData.info.iconos,
              telefonos: state.userData.info.telefonos,
              emails: payload != null ? [payload] : [],
              notas: state.userData.info.notas,
            },
            ultima_actualizacion: new Date(),
          })
          .then((ingreso) => {
            dispatch('getUserData')
            return {
              error: false,
              mensaje:
                payload != null
                  ? `El email ${payload.email} se ha aegregado con éxito`
                  : 'El email se ha eliminado con éxito',
            }
          })
          .catch((error) => {
            console.error('└──🚨 | ⛹  >  ACTION agregarEmail', error)
            return { error: true, mensaje: error }
          })
      } else {
        return { error: true, mensaje: 'Problema de conexión con Firebase' }
      }
    } catch (e) {
      return {
        error: true,
        mensaje: 'Problema de ejecución en agregarEmail ' + e,
      }
    }
  },
  agregarTel({ app, ctx, commit, state, dispatch }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION agregarTel', payload)
    try {
      if (this.$fire.auth !== null) {
        return this.$fire.firestore
          .collection('tags')
          .doc(state.userData.tag)
          .update({
            info: {
              varios: state.userData.info.varios,
              iconos: state.userData.info.iconos,
              telefonos: [payload, ...state.userData.info.telefonos],
              emails: state.userData.info.emails,
              notas: state.userData.info.notas,
            },
            ultima_actualizacion: new Date(),
          })
          .then((ingreso) => {
            dispatch('getUserData')
            return {
              error: false,
              mensaje: `El teléfono Nota ${payload.tipo_tel.nombre} se ha aegregado con éxito`,
            }
          })
          .catch((error) => {
            console.error('└──🚨 | ⛹  >  ACTION agregarTel', error)
            return { error: true, mensaje: error }
          })
      } else {
        return { error: true, mensaje: 'Problema de conexión con Firebase' }
      }
    } catch (e) {
      return {
        error: true,
        mensaje: 'Problema de ejecución en agregarTel ' + e,
      }
    }
  },
  actualizarVarios({ app, ctx, commit, state, dispatch }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION actualizarVarios')
    try {
      if (this.$fire.auth !== null) {
        return this.$fire.firestore
          .collection('tags')
          .doc(state.userData.tag)
          .update({
            info: {
              varios: payload,
              iconos: state.userData.info.iconos,
              telefonos: state.userData.info.telefonos,
              emails: state.userData.info.emails,
              notas: state.userData.info.notas,
            },
            ultima_actualizacion: new Date(),
          })
          .then((ingreso) => {
            dispatch('getUserData')
            return {
              error: false,
              mensaje: `El contenido se ha actualizado con éxito`,
            }
          })
          .catch((error) => {
            console.error('└──🚨 | ⛹  >  ACTION actualizarVarios', error)
            return {
              error: true,
              mensaje: `El contenido no se ha podido actualizar.`,
            }
          })
      } else {
        return { error: true, mensaje: 'Problema de conexión con Firebase' }
      }
    } catch (e) {
      return {
        error: true,
        mensaje: 'Problema de ejecución en actualizarVarios ' + e,
      }
    }
  },
  actualizarTelefonos({ app, ctx, commit, state, dispatch }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION actualizarTelefonos', payload)
    try {
      if (this.$fire.auth !== null) {
        return this.$fire.firestore
          .collection('tags')
          .doc(state.userData.tag)
          .update({
            info: {
              varios: state.userData.info.varios,
              iconos: state.userData.info.iconos,
              telefonos: payload,
              emails: state.userData.info.emails,
              notas: state.userData.info.notas,
            },
            ultima_actualizacion: new Date(),
          })
          .then((ingreso) => {
            dispatch('getUserData')
            return {
              error: false,
              mensaje: `El teléfono se ha actualizado con éxito`,
            }
          })
          .catch((error) => {
            console.error('└──🚨 | ⛹  >  ACTION actualizarTelefonos', error)
            return {
              error: true,
              mensaje: `El teléfono no se ha podido actualizar.`,
            }
          })
      } else {
        return { error: true, mensaje: 'Problema de conexión con Firebase' }
      }
    } catch (e) {
      return {
        error: true,
        mensaje: 'Problema de ejecución en actualizarTelefonos ' + e,
      }
    }
  },
}
