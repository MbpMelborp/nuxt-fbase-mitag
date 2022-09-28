const admin = require('firebase-admin')
const db = admin.firestore()

const MAIL_CONTROLER = require('./mail')

/**
 * getTagById
 * @param {string} id
 * @returns {Promise}
 * Retorna un tag por su id
 */
const getTagById = function (id) {
  try {
    return db
      .collection('tags')
      .doc(id)
      .get()
      .then((doc) => {
        console.log('✅ -> RESULT TAG 🎮  getTagByID', doc.id)
        if (doc.exists) return { id: doc.id, ...doc.data() }
        else return { error: true, message: 'Tag no encontrado' }
      })
      .catch((error) => {
        return { error: true, message: 'Tag no encontrado', info: error }
      })
  } catch (error) {
    console.error('🚨 -> ERROR TAG 🎮  getTagByID', error)
    return { error: true, message: 'Tag no encontrado', info: error }
  }
}

/**
 * getTagByEmail
 * @param {*} email
 * @returns
 * Retorna un tag por el email del usuario
 */
const getTagByEmail = function (email) {
  if (email == undefined)
    return new Promise((resolve, reject) => {
      resolve({ error: true, message: 'Email no definido' })
    })
  try {
    return db
      .collection('tags')
      .where('email', '==', email)
      .get()
      .then((docs) => {
        if (docs.empty) return { error: true, message: 'Email no encontrado' }
        else {
          return { id: docs.docs[0].id, ...docs.docs[0].data() }
        }
      })
      .catch((error) => {
        return { error: true, message: 'Email no encontrado', info: error }
      })
  } catch (error) {
    console.error('🚨 -> ERROR TAG 🎮  getTagByID', error)
    return { error: true, message: 'Email no encontrado', info: error }
  }
}
/**
 * createTag
 * @param {*} id
 * @param {*} infop
 * @returns
 * Crea un tag con la información almacenada en infop y el id del usuario asignado
 */
const createTag = function (id, infop) {
  try {
    return getTagById(id)
      .then((tag) => {
        if (tag.error) {
          console.log('✅ ✅ ✅  -> RESULT TAG 🎮  createTag', id)
          let data = {
            usado: false,
            fecha_creacion: new Date(),
            informacion_inicial: infop,
          }
          const save = {
            usado: false,
            fecha_creacion: new Date(),
            informacion_inicial: infop,
          }
          return getTagByEmail(infop.email)
            .then((email) => {
              if (email.error) {
                return db
                  .collection('tags')
                  .doc(id)
                  .set(save)
                  .then((ok) => {
                    console.log('✅ -> RESULT TAG 🎮  createTag', ok)
                    if (infop.billing) {
                      if (infop.billing.email) {
                        const urlt =
                          'https://app.mitag.co/tag/' + id + '/create'
                        MAIL_CONTROLER.sendMail({
                          to: infop.billing.email,
                          message: {
                            subject:
                              '¡Hola ' +
                              infop.billing.first_name +
                              '! Bienvenido a MiTag',
                            text:
                              'Para ingresar tus datos por favor ingresa a la siguiente dirección: ' +
                              urlt,
                            html:
                              '<h1>Bienvenido a Mi Tag</h1><p>Para ingresar tus datos por favor ingresa a la siguiente dirección: <a href="' +
                              urlt +
                              '">' +
                              urlt +
                              '</a>',
                          },
                        })
                      }
                    }

                    return {
                      error: false,
                      id: id,
                      message: 'Tag creado con éxito',
                      tag: data,
                    }
                  })
                  .catch((error) => {
                    console.error('🚨 -> ERROR TAG 🎮  createTag', error)
                    return {
                      error: true,
                      message: 'Tag no creado',
                      info: error,
                    }
                  })
              } else {
                const urlt = 'https://app.mitag.co/tag/' + id + '/edit'
                MAIL_CONTROLER.sendMail({
                  to: infop.billing.email,
                  message: {
                    subject:
                      '¡Hola ' +
                      infop.billing.first_name +
                      '! Bienvenido a MiTag',
                    text:
                      'Para editar tu tag por favor ingresa a la siguiente dirección: ' +
                      urlt,
                    html:
                      '<h1>Bienvenido a Mi Tag</h1><p>Para actualizar tus datos por favor ingresa a la siguiente dirección: <a href="' +
                      urlt +
                      '">' +
                      urlt +
                      '</a>',
                  },
                })
                return {
                  error: false,
                  id: email.id,
                  message: 'Tag ya creado con éxito',
                  tag: email,
                }
              }
            })
            .catch((err) => {
              console.error('🚨 -> ERROR TAG 🎮  createTag', err)
              return { error: true, id, message: 'El Tag ya existe', tag }
            })
        } else {
          console.error('🚨 -> ERROR TAG 🎮  createTag', error)
          return { error: true, id, message: 'El Tag ya existe', tag }
        }
      })
      .catch((error) => {
        console.error('🚨 -> ERROR TAG 🎮  createTag', error)
        return { error: true, message: 'Tag no creado', info: error }
      })
  } catch (error) {
    console.error('🚨 -> ERROR TAG 🎮  createTag', error)
    return { error: true, message: 'Tag no creado', info: error }
  }
}
exports.createTag = createTag
exports.getTagById = getTagById
