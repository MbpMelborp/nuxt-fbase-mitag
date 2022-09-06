const admin = require('firebase-admin')
const db = admin.firestore()
const vCardsJS = require('vcards-js')
const axios = require('axios')

exports.generateCard = async function (id, data) {
  try {
    const tagRef = db.collection('/tags').doc(id)
    const vCard = vCardsJS()

    // set properties
    vCard.firstName = data.primer_nombre
    vCard.middleName = data.segundo_nombre
    vCard.lastName = data.apellidos
    vCard.organization = data.empresa

    // vCard.photo.embedFromFile(data.foto, 'JPEG')
    console.log('📷  -> generateCard', data.foto)
    if (data.foto) {
      const image = await axios.get(data.foto, {
        responseType: 'arraybuffer',
      })
      let returnedB64 = Buffer.from(image.data).toString('base64')
      console.log('🚀 ~ file: vcard.js ~ line 32 ~ returnedB64', returnedB64)
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

    // const urls = []
    // data.info.iconos.forEach((icono) => {
    //   const red = icono.tipo.split('-')[1]
    //   //vCard.socialUrls[red] = icono.url
    //   urls.push({ title: red, url: icono.url })
    // })
    // let notas = ''
    let urlString = ''
    // data.info.varios.forEach((vario) => {
    //   if (vario.tipo == 'nota') {
    //     notas += vario.titulo + '\n' + vario.nota + '\n\n'
    //   }
    //   if (vario.tipo == 'link') {
    //     // vCard.socialUrls[vario.titulo] = vario.url
    //     urls.push({ title: vario.titulo, url: vario.url })
    //   }
    // })
    // if (notas != '') {
    //   vCard.note = notas
    // }
    // if (urls.length > 0) {
    //   urls.forEach((url, index) => {
    //     urlString += 'item' + (index + 1) + '.URL:' + url.url + '\n'
    //     urlString += 'item' + (index + 1) + '.X-ABLabel:' + url.title + '\n'
    //   })

    //   // let index = 0
    //   // // eslint-disable-next-line guard-for-in
    //   // for (let key in vCard.socialUrls) {
    //   //   index++
    //   //   if (vCard.socialUrls.hasOwnProperty(key) && vCard.socialUrls[key]) {
    //   //     formattedVCardString +=
    //   //       'item' + index + '.URL:' + vCard.socialUrls[key] + nl()
    //   //     formattedVCardString += 'item' + index + '.X-ABLabel:' + key + nl()
    //   //     // formattedVCardString += 'X-SOCIALPROFILE' + encodingPrefix + ';type=' + key + ':' + e(vCard.socialUrls[key]) + nl();
    //   //   }
    //   // }
    // }
    const vCardString =
      vCard.getFormattedString().replace('END:VCARD', '') +
      (urlString != '' ? '\n' + urlString : '') +
      '\n' +
      'END:VCARD'
    // console.log('CARD' + '\n', vCardString)
    return vCardString
    // return tagRef
    //   .update({
    //     vcard: vCardString,
    //   })
    //   .then((resp) => {
    //     return vCardString
    //   })
  } catch (error) {
    console.error('🚨 -> ERROR VCARD 🎮  generateCard', error)
    return { error: true, message: 'La vcard no se pudo crear', info: error }
  }
}
