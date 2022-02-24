const admin = require('firebase-admin')
const db = admin.firestore()
const vCardsJS = require('vcards-js')

exports.generateCard = function (id, data) {
  try {
    const tagRef = db.collection('/tags').doc(id)
    const vCard = vCardsJS()

    // set properties
    vCard.firstName = data.primer_nombre
    vCard.middleName = data.segundo_nombre
    vCard.lastName = data.apellidos
    vCard.organization = data.empresa
    // vCard.photo.attachFromUrl(
    //   'https://avatars2.githubusercontent.com/u/5659221?v=3&s=460',
    //   'JPEG'
    // )
    vCard.workPhone = data.telefono_celular
    vCard.birthday = new Date(data.fecha_nacimiento._seconds * 1000) // data.fecha_nacimiento.toDate()
    vCard.title = data.cargo
    vCard.url = `https://mitag.co/tag/${data.tag}`
    vCard.email = data.email
    // vCard.note = 'Notes on Eric'

    return tagRef
      .update({
        vcard: vCard.getFormattedString(),
      })
      .then((resp) => {
        return vCard
      })
  } catch (error) {
    console.error('🚨 -> ERROR VCARD 🎮  generateCard', error)
    return { error: true, message: 'La vcard no se pudo crear', info: error }
  }
}
