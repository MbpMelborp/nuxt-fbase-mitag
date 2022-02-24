const admin = require('firebase-admin')
const db = admin.firestore()

/**
 *
 * @param {*} id
 * @returns object whit tag info
 */
exports.getTagById = function (id) {
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
