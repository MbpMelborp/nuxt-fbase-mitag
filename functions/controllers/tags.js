const admin = require('firebase-admin')
const db = admin.firestore()

const MAIL_CONTROLER = require('./mail')

/**
 *
 * @param {*} id
 * @returns object whit tag info
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

const createTag = function (id, infop) {
  try {
    return getTagById(id)
      .then((tag) => {
        if (tag.error) {
          console.log('✅ ✅ ✅  -> RESULT TAG 🎮  createTag', id)
          const data = {
            usado: false,
            fecha_creacion: new Date(),
            informacion_inicial: infop,
          }
          return db
            .collection('tags')
            .doc(id)
            .set(data)
            .then((ok) => {
              console.log('✅ -> RESULT TAG 🎮  createTag', ok)
              if (infop.billing) {
                if (infop.billing.email) {
                  const urlt = 'https://app.mitag.co/tag/' + id + '/create'
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
              return { error: true, message: 'Tag no creado', info: error }
            })
        } else {
          return { error: true, id, message: 'El Tag ya existe', tag }
        }
      })
      .catch((error) => {
        return { error: true, message: 'Tag no creado', info: error }
      })
  } catch (error) {
    console.error('🚨 -> ERROR TAG 🎮  createTag', error)
    return { error: true, message: 'Tag no creado', info: error }
  }
}
exports.createTag = createTag
exports.getTagById = getTagById
