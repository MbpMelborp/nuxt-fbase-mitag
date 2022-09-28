const admin = require('firebase-admin')
const db = admin.firestore()
const vCardsJS = require('vcards-js')
const axios = require('axios')

/**
 * generateCard
 * @param {*} id
 * @param {*} data
 * @returns
 * Genera la vcard de un tag en formato string para poder ser descargada como archivo
 */
exports.generateCard = async function (id, data) {
  try {
    const tagRef = db.collection('/tags').doc(id)
    const vCard = vCardsJS()

    // set properties
    vCard.firstName = data.primer_nombre
    vCard.middleName = data.segundo_nombre
    vCard.lastName = data.apellidos
    vCard.organization = data.empresa

    console.log('📷  -> generateCard', data.foto)
    if (data.foto) {
      const image = await axios.get(data.foto, {
        responseType: 'arraybuffer',
      })
      let returnedB64 = Buffer.from(image.data).toString('base64')
      console.log('🚀 ~ file: vcard.js  ~ returnedB64', returnedB64)
      vCard.photo.embedFromString(returnedB64, 'image/jpeg')
    }

    vCard.workPhone = data.telefono_celular
    vCard.birthday = new Date(data.fecha_nacimiento._seconds * 1000) // data.fecha_nacimiento.toDate()
    vCard.title = data.cargo
    vCard.url = `https://app.mitag.co/tag/${data.tag}`
    vCard.email = data.email

    data.info.direcciones.forEach((direccion) => {
      if (direccion.tipo_dir == 'homeAddress') {
        vCard.homeAddress.label = 'Hogar'
        vCard.homeAddress.street = direccion.detalle
        vCard.homeAddress.city = direccion.location.city
          ? direccion.location.city
          : ''
        vCard.homeAddress.stateProvince = direccion.location.stateLong
          ? direccion.location.stateLong
          : ''
        vCard.homeAddress.postalCode = direccion.location.zipCode
          ? direccion.location.zipCode
          : ''
        vCard.homeAddress.countryRegion = direccion.location.countryLong
          ? direccion.location.countryLong
          : ''
      } else {
        vCard.workAddress.label = 'Trabajo'
        vCard.workAddress.street = direccion.detalle
        vCard.workAddress.city = direccion.location.city
          ? direccion.location.city
          : ''
        vCard.workAddress.stateProvince = direccion.location.stateLong
          ? direccion.location.stateLong
          : ''
        vCard.workAddress.postalCode = direccion.location.zipCode
          ? direccion.location.zipCode
          : ''
        vCard.workAddress.countryRegion = direccion.location.countryLong
          ? direccion.location.countryLong
          : ''
      }
    })
    const emails = []
    data.info.emails.forEach((email) => {
      emails.push(email.email)
    })
    vCard.email = emails
    const phones = []
    data.info.telefonos.forEach((phone) => {
      phones.push(phone.tel)
    })
    vCard.cellPhone = phones
    let urlString = ''
    const vCardString =
      vCard.getFormattedString().replace('END:VCARD', '') +
      (urlString != '' ? '\n' + urlString : '') +
      '\n' +
      'END:VCARD'
    return vCardString
  } catch (error) {
    console.error('🚨 -> ERROR VCARD 🎮  generateCard', error)
    return { error: true, message: 'La vcard no se pudo crear', info: error }
  }
}
