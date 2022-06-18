const admin = require('firebase-admin')
const db = admin.firestore()

/**
 *
 * @param {*} id
 * @returns object whit tag info
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

exports.sendMail = sendMail
