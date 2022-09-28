const admin = require('firebase-admin')
const db = admin.firestore()

/**
 * sendMail
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @param {string} html
 * @returns {Promise<*>}
 * Envío de mail con el servicio de firebase
 */
const sendMail = function (data) {
  try {
    return db
      .collection('mail')
      .doc()
      .set(data)
      .then((ok) => {
        console.log('✅ -> RESULT TAG 🎮  createTag', ok)
        return {
          error: false,
          message: 'Mail creado con éxito',
          mail: data,
        }
      })
      .catch((error) => {
        return { error: true, message: 'Mail no creado', info: error }
      })
  } catch (error) {
    console.error('🚨 -> ERROR MAIL 🎮  sendMail', error)
    return { error: true, message: 'Mail no enviado', info: error }
  }
}
/**
 * getAdmin
 * @param {string} id
 * @returns {Promise<*>}
 * Retorna la información de el mail de admin
 */
const getAdmin = function () {
  return db
    .collection('correo')
    .doc('admin')
    .get()
    .then((doc) => {
      return doc.data().mail
    })
    .catch((error) => {
      console.error('🚨 -> ERROR MAIL 🎮  getAdmin', error)
      return { error: true, message: 'Mail no encontrado', info: error }
    })
}

exports.sendMail = sendMail
exports.getAdmin = getAdmin
