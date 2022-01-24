const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()
// const db = admin.firestore()

// VCARD
const vCardsJS = require('vcards-js')

//FILES
const fs = require('fs')

const { Nuxt } = require('nuxt')
const nuxtConfig = require('./nuxt.config.js')
const config = {
  ...nuxtConfig,
  dev: false,
  debug: false,
  buildDir: 'nuxt',
  publicPath: 'public',
}

const nuxt = new Nuxt(config)
nuxt.ready()
exports.ssrapp = functions.https.onRequest(async (req, res) => {
  try {
    //create a new vCard
    let vCard = vCardsJS()

    //set properties
    vCard.firstName = 'Eric'
    vCard.middleName = 'J'
    vCard.lastName = 'Nesser'
    vCard.organization = 'ACME Corporation'
    vCard.photo.attachFromUrl(
      'https://avatars2.githubusercontent.com/u/5659221?v=3&s=460',
      'JPEG'
    )
    vCard.workPhone = '312-555-1212'
    vCard.birthday = new Date(1985, 0, 1)
    vCard.title = 'Software Developer'
    vCard.url = 'https://github.com/enesser'
    vCard.note = 'Notes on Eric'

    //save to file
    const file = 'vcards/temp.vcf'
    vCard.saveToFile(file)

    //get as formatted string
    console.log(vCard.getFormattedString())

    const bucket = admin.storage().bucket()
    bucket
      .upload(file)
      .then((data) => {
        console.log('upload success')
        fs.unlinkSync(file)
      })
      .catch((err) => {
        console.log('error uploading to storage', err)
      })
  } catch (error) {
    console.error(error)
  }
  try {
    await nuxt.ready()
    const result = await nuxt.renderRoute(req.path) // Returns { html, error, redirected }
    res.send(result.html)
  } catch (error) {
    res.send(error)
  }
})
