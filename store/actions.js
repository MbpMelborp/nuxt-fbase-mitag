const parseGooglePlace = require('parse-google-place')

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
                if (window) {
                  const bodyElement = document.querySelector('body')
                  if (docs.docs[0].data().theme) {
                    bodyElement.classList.remove(
                      'theme-default',
                      'theme-green',
                      'theme-red',
                      'theme-blue',
                      'theme-yellow',
                      'theme-light',
                      'theme-dark'
                    )
                    bodyElement.classList.add(
                      'theme-' + docs.docs[0].data().theme
                    )
                  } else {
                    bodyElement.classList.add('theme-default')
                    dispatch('actualizarTheme', 'default')
                  }
                }
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
              direcciones: state.userData.info.direcciones,
              emails: state.userData.info.emails,
              notas: state.userData.info.notas,
              medias: state.userData.info.medias,
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
              direcciones: state.userData.info.direcciones,
              emails: state.userData.info.emails,
              notas: state.userData.info.notas,
              medias: state.userData.info.medias,
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
              direcciones: state.userData.info.direcciones,
              emails: payload != null ? [payload] : [],
              notas: state.userData.info.notas,
              medias: state.userData.info.medias,
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
              direcciones: state.userData.info.direcciones,
              emails: state.userData.info.emails,
              notas: state.userData.info.notas,
              medias: state.userData.info.medias,
            },
            ultima_actualizacion: new Date(),
          })
          .then((ingreso) => {
            dispatch('getUserData')
            return {
              error: false,
              mensaje: `El teléfono ${payload.tipo_tel.nombre} se ha aegregado con éxito`,
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
      console.error('└──🚨 | ⛹  >  ACTION agregarTel', e)
      return {
        error: true,
        mensaje: 'Problema de ejecución en agregarTel ' + e,
      }
    }
  },
  agregarDir({ app, ctx, commit, state, dispatch }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION agregarDir', payload)
    try {
      if (this.$fire.auth !== null) {
        const location = payload.location
        payload.location = parseGooglePlace(payload.location)
        payload.location.geometry = {
          lat: location.geometry.location.lat(),
          lng: location.geometry.location.lng(),
        }
        return this.$fire.firestore
          .collection('tags')
          .doc(state.userData.tag)
          .update({
            info: {
              varios: state.userData.info.varios,
              iconos: state.userData.info.iconos,
              direcciones: [payload, ...state.userData.info.direcciones],
              telefonos: state.userData.info.telefonos,
              emails: state.userData.info.emails,
              notas: state.userData.info.notas,
              medias: state.userData.info.medias,
            },
            ultima_actualizacion: new Date(),
          })
          .then((ingreso) => {
            dispatch('getUserData')
            return {
              error: false,
              mensaje: `La dirección se ha agregado con éxito`,
            }
          })
          .catch((error) => {
            console.error('└──🚨 | ⛹  >  ACTION agregarDir', error)
            return { error: true, mensaje: error }
          })
      } else {
        return { error: true, mensaje: 'Problema de conexión con Firebase' }
      }
    } catch (e) {
      console.error('└──🚨 | ⛹  >  ACTION agregarDir', e)
      return {
        error: true,
        // mensaje: 'Problema de ejecución en agregarDir ' + e,
        mensaje: 'Por favor revisa los datos e intenta de nuevo',
      }
    }
  },
  agregarIco({ app, ctx, commit, state, dispatch }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION agregarIco', payload)
    try {
      if (this.$fire.auth !== null) {
        return this.$fire.firestore
          .collection('tags')
          .doc(state.userData.tag)
          .update({
            info: {
              varios: state.userData.info.varios,
              iconos: [payload, ...state.userData.info.iconos],
              telefonos: state.userData.info.telefonos,
              direcciones: state.userData.info.direcciones,
              emails: state.userData.info.emails,
              notas: state.userData.info.notas,
              medias: state.userData.info.medias,
            },
            ultima_actualizacion: new Date(),
          })
          .then((ingreso) => {
            dispatch('getUserData')
            return {
              error: false,
              mensaje: `El icono se ha aegregado con éxito`,
            }
          })
          .catch((error) => {
            console.error('└──🚨 | ⛹  >  ACTION agregarIco', error)
            return { error: true, mensaje: error }
          })
      } else {
        return { error: true, mensaje: 'Problema de conexión con Firebase' }
      }
    } catch (e) {
      console.error('└──🚨 | ⛹  >  ACTION agregarIco', e)
      return {
        error: true,
        mensaje: 'Problema de ejecución en agregarIco ' + e,
      }
    }
  },
  agregarMedia({ app, ctx, commit, state, dispatch }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION agregarMedia', payload)
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
              direcciones: state.userData.info.direcciones,
              emails: state.userData.info.emails,
              notas: state.userData.info.notas,
              medias: [payload, ...state.userData.info.medias],
            },
            ultima_actualizacion: new Date(),
          })
          .then((ingreso) => {
            dispatch('getUserData')
            if (window.instgrm) {
              window.instgrm.Embeds.process()
            }
            if (window.twitter) {
              window.twitter.widgets.load()
            }
            return {
              error: false,
              mensaje: `La información se ha agregado con éxito`,
            }
          })
          .catch((error) => {
            console.error('└──🚨 | ⛹  >  ACTION agregarMedia', error)
            return { error: true, mensaje: error }
          })
      } else {
        return { error: true, mensaje: 'Problema de conexión con Firebase' }
      }
    } catch (e) {
      console.error('└──🚨 | ⛹  >  ACTION agregarMedia', e)
      return {
        error: true,
        mensaje: 'Problema de ejecución en agregarMedia ' + e,
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
              direcciones: state.userData.info.direcciones,
              emails: state.userData.info.emails,
              notas: state.userData.info.notas,
              medias: state.userData.info.medias,
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
              direcciones: state.userData.info.direcciones,
              emails: state.userData.info.emails,
              notas: state.userData.info.notas,
              medias: state.userData.info.medias,
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
  actualizarDir({ app, ctx, commit, state, dispatch }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION actualizarDir', payload)
    try {
      if (this.$fire.auth !== null) {
        return this.$fire.firestore
          .collection('tags')
          .doc(state.userData.tag)
          .update({
            info: {
              varios: state.userData.info.varios,
              iconos: state.userData.info.iconos,
              direcciones: payload,
              telefonos: state.userData.info.telefonos,
              emails: state.userData.info.emails,
              notas: state.userData.info.notas,
              medias: state.userData.info.medias,
            },
            ultima_actualizacion: new Date(),
          })
          .then((ingreso) => {
            dispatch('getUserData')
            return {
              error: false,
              mensaje: `La dirección se ha actualizado con éxito`,
            }
          })
          .catch((error) => {
            console.error('└──🚨 | ⛹  >  ACTION actualizarDir', error)
            return {
              error: true,
              mensaje: `La dirección no se ha podido actualizar.`,
            }
          })
      } else {
        return { error: true, mensaje: 'Problema de conexión con Firebase' }
      }
    } catch (e) {
      return {
        error: true,
        mensaje: 'Problema de ejecución en actualizarDir ' + e,
      }
    }
  },
  actualizarIco({ app, ctx, commit, state, dispatch }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION actualizarIco', payload)
    try {
      if (this.$fire.auth !== null) {
        return this.$fire.firestore
          .collection('tags')
          .doc(state.userData.tag)
          .update({
            info: {
              varios: state.userData.info.varios,
              iconos: payload,
              telefonos: state.userData.info.telefonos,
              direcciones: state.userData.info.direcciones,
              emails: state.userData.info.emails,
              notas: state.userData.info.notas,
              medias: state.userData.info.medias,
            },
            ultima_actualizacion: new Date(),
          })
          .then((ingreso) => {
            dispatch('getUserData')
            return {
              error: false,
              mensaje: `El icono se ha actualizado con éxito`,
            }
          })
          .catch((error) => {
            console.error('└──🚨 | ⛹  >  ACTION actualizarIco', error)
            return {
              error: true,
              mensaje: `El icono no se ha podido actualizar.`,
            }
          })
      } else {
        return { error: true, mensaje: 'Problema de conexión con Firebase' }
      }
    } catch (e) {
      console.error('└──🚨 | ⛹  >  ACTION actualizarIco', e)
      return {
        error: true,
        mensaje:
          'Problema de ejecución en actualizaractualizarIcoTelefonos ' + e,
      }
    }
  },
  actualizarMedia({ app, ctx, commit, state, dispatch }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION actualizarMedia', payload)
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
              direcciones: state.userData.info.direcciones,
              emails: state.userData.info.emails,
              notas: state.userData.info.notas,
              medias: payload,
            },
            ultima_actualizacion: new Date(),
          })
          .then((ingreso) => {
            dispatch('getUserData')
            if (window.instgrm) {
              window.instgrm.Embeds.process()
            }
            if (window.twitter) {
              window.twitter.widgets.load()
            }
            return {
              error: false,
              mensaje: `La información se ha actualizado con éxito`,
            }
          })
          .catch((error) => {
            console.error('└──🚨 | ⛹  >  ACTION actualizarMedia', error)
            return {
              error: true,
              mensaje: `La información no se ha podido actualizar.`,
            }
          })
      } else {
        return { error: true, mensaje: 'Problema de conexión con Firebase' }
      }
    } catch (e) {
      console.error('└──🚨 | ⛹  >  ACTION actualizarMedia', e)
      return {
        error: true,
        mensaje:
          'Problema de ejecución en actualizaractualizarMediaTelefonos ' + e,
      }
    }
  },
  actualizarTheme({ app, ctx, commit, state, dispatch }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION actualizarTheme', payload)
    try {
      if (this.$fire.auth !== null) {
        return this.$fire.firestore
          .collection('tags')
          .doc(state.userData.tag)
          .update({
            theme: payload,
            ultima_actualizacion: new Date(),
          })
          .then((ingreso) => {
            dispatch('getUserData')
            if (window.instgrm) {
              window.instgrm.Embeds.process()
            }
            if (window.twitter) {
              window.twitter.widgets.load()
            }
            return {
              error: false,
              mensaje: `La información se ha actualizado con éxito`,
            }
          })
          .catch((error) => {
            console.error('└──🚨 | ⛹  >  ACTION actualizarTheme', error)
            return {
              error: true,
              mensaje: `La información no se ha podido actualizar.`,
            }
          })
      } else {
        return { error: true, mensaje: 'Problema de conexión con Firebase' }
      }
    } catch (e) {
      console.error('└──🚨 | ⛹  >  ACTION actualizarTheme', e)
      return {
        error: true,
        mensaje: 'Problema de ejecución en actualizarTheme ' + e,
      }
    }
  },
  enviarLead({ app, ctx, commit, state, dispatch }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION enviarLead', payload)
    try {
      const tag = payload.tag
      const leads = payload.leads !== undefined ? payload.leads : []
      delete payload.tag
      if (payload.leads === undefined) delete payload.leads
      const info = [payload, ...leads]
      console.log('enviarLead', leads)
      payload.creado = new Date()
      return this.$fire.firestore
        .collection('tags')
        .doc(tag)
        .update({
          leads: info,
        })
        .then((ingreso) => {
          return {
            error: false,
            mensaje: `tu información se ha enviado`,
            leads: info,
          }
        })
        .catch((error) => {
          console.error('└──🚨 | ⛹  >  ACTION enviarLead', error)
          return {
            error: true,
            mensaje: `Ocurrio un error al enviar la información`,
          }
        })
    } catch (e) {
      console.error('└──🚨 | ⛹  >  ACTION enviarLead', e)
      return {
        error: true,
        mensaje: 'Problema de ejecución en enviarLead ' + e,
      }
    }
  },
  vistaTag({ app, ctx, commit, state, dispatch }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION vistaTag', payload)
    try {
      if (this.$fire.auth !== null) {
        return this.$fire.firestore
          .collection('tags')
          .doc(payload.tag)
          .update({
            views: [new Date(), ...payload.views],
          })
          .then((ingreso) => {
            return {
              error: false,
              mensaje: `La información se ha actualizado con éxito`,
            }
          })
          .catch((error) => {
            console.error('└──🚨 | ⛹  >  ACTION vistaTag', error)
            return {
              error: true,
              mensaje: `La información no se ha podido actualizar.`,
            }
          })
      } else {
        return { error: true, mensaje: 'Problema de conexión con Firebase' }
      }
    } catch (e) {
      console.error('└──🚨 | ⛹  >  ACTION vistaTag', e)
      return {
        error: true,
        mensaje: 'Problema de ejecución en vistaTag ' + e,
      }
    }
  },
  getTagsList({ app, ctx, commit, state }) {
    if (cl) console.info('🏁  | ⛹  >  ACTION getTags')
    try {
      if (this.$fire.auth !== null) {
        if (cl) console.info('----❕ | ⛹  >  ACTION getTags uid')
        if (state.authUser.uid) {
          this.$fire.firestore
            .collection('tags')
            .get()
            .then((docs) => {
              const tags = []
              if (docs.size > 0) {
                docs.docs.forEach((doc) => {
                  tags.push({
                    id: doc.id,
                    data: doc.data(),
                  })
                })
                return tags
              }
            })
            .catch((error) => {
              console.error('└──🚨 | ⛹  >  ACTION getTags data', error)
            })
        }
      } else {
        return { error: true, mensaje: 'Problema de conexión con Firebase' }
      }
    } catch (e) {
      return {
        error: true,
        mensaje: 'Problema de ejecución en getTags ' + e,
      }
    }
  },
  agregarCorreo({ app, ctx, commit, state, dispatch }, payload) {
    if (cl) console.info('🏁  | ⛹  >  ACTION updateCorreo', payload)
    try {
      if (this.$fire.auth !== null) {
        return this.$fire.firestore
          .collection('correo')
          .doc('admin')
          .update({
            mail: payload,
          })
          .then((ingreso) => {
            return {
              error: false,
              mensaje: `Èl correo se actualizó con éxito`,
            }
          })
          .catch((error) => {
            console.error('└──🚨 | ⛹  >  ACTION updateCorreo', error)
            return {
              error: true,
              mensaje: `ﬁEl correo no se pudo actualizar.`,
            }
          })
      } else {
        return { error: true, mensaje: 'Problema de conexión con Firebase' }
      }
    } catch (e) {
      console.error('└──🚨 | ⛹  >  ACTION updateCorreo', e)
      return {
        error: true,
        mensaje: 'Problema de ejecución en updateCorreo ' + e,
      }
    }
  },
  getCorreo({ app, ctx, commit, state }) {
    console.group()
    console.info('🏁  | ⛹  >  ACTION getCorreo')
    try {
      // if (this.$fire.auth !== null) {
      console.info('└──❕ | ⛹  >  ACTION getCorreo id')

      return this.$fire.firestore
        .collection('correo')
        .doc('admin')
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.info('└──❕ | ⛹  >  ACTION getCorreo data', doc.data())
            console.groupEnd()
            return doc.data().mail
          } else {
            console.error(
              '└──🚨 | ⛹  >  ACTION getCorreo data',
              'El correo no ha sido encontrado'
            )
            console.groupEnd()
            return {
              error: true,
              mensaje: 'El correo no ha sido encontrado',
            }
          }
        })
        .catch((error) => {
          console.error('└──🚨 | ⛹  >  ACTION updateCorreo', error)
          return {
            error: true,
            mensaje: `ﬁEl correo no se pudo actualizar.`,
          }
        })
    } catch (e) {
      console.error('└──🚨 | ⛹  >  ACTION getCorreo data', e)
      console.groupEnd()

      return {
        error: true,
        mensaje: 'Problema de ejecución en getCorreo ' + e,
      }
    }
  },
}
