const functions = require('firebase-functions')
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true })
admin.initializeApp()
const db = admin.firestore()

const TAG_CONTROLLER = require('./controllers/tags')
const TAG_VCARD = require('./controllers/vcard')
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
    await nuxt.ready()
    const result = await nuxt.renderRoute(req.path) // Returns { html, error, redirected }
    res.send(result.html)
  } catch (error) {
    res.send(error)
  }
})

/**
 * API
 *
 */
exports.tag = functions.https.onRequest((req, res) => {
  try {
    const body = req.body
    const query = req.query
    console.log(
      `🏁 API tag onRequest INIT body-> `,
      body,
      `Query -> `,
      query,
      `\n`
    )
    cors(req, res, () => {
      res.set('Access-Control-Allow-Origin', '*')
      if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Methods', 'GET,POST')
        res.set('Access-Control-Allow-Headers', 'Content-Type')
        res.set('Access-Control-Max-Age', '3600')
        res.status(204).send('')
      } else if (req.method === 'GET') {
        if (query.id) {
          console.log(`🏁 API tag onRequest GET ${query.id}`, `\n`)
          TAG_CONTROLLER.getTagById(query.id).then((tag) => {
            console.log('✅ -> API tag onRequest GET', tag)
            if (!tag.error) {
              if (query.file) {
                res.set('Content-Type', `text/vcard; name="${query.id}.vcf"`)
                res.set(
                  'Content-Disposition',
                  `inline; filename="${query.id}.vcf"`
                )
                res.send(tag.vcard)
                //res.send(vCard.getFormattedString())
              } else {
                res.status(200).json(tag)
              }
            } else {
              res.status(500).json(tag)
            }
          })
        } else {
          res.status(500).json({ error: true, message: 'No id' })
        }
      }
    })
  } catch (error) {
    res.status(500).send(error)
    console.error(error)
  }
})

/**
 * CALLABLES
 *
 */
exports.getTag = functions.https.onCall((data, context) => {
  console.log(context.auth)
  if (!context.auth)
    return { status: 'error', code: 401, message: 'Not signed in' }
  else {
    try {
      return TAG_CONTROLLER.getTagById(data.id).then((tag) => {
        console.log('✅ -> CALL tag getTag', tag)
        return tag
      })
    } catch (error) {
      throw new functions.https.HttpsError('getTag', error)
    }
  }
})

/**
 * TRIGGERS DE EN DOCUMENTOS
 *
 */
/*
exports.tagCreateUpdate = functions.firestore
  .document('/tags/{tag}')
  .onUpdate(async (change, context) => {
    // console.log(
    //   '🏁 tagCreateUpdate init ',
    //   context.params.tag
    //   // change.after.data(),
    // )
    try {
      const tagId = context.params.tag
      const tagData = change.after.data()
      TAG_VCARD.generateCard(tagId, tagData)
        .then((vcard) => {
          // console.log('✅  -> tagCreateUpdate archivo generado', vcard)
        })
        .catch((error) => {
          // console.log('🚨 -> ERROR tagCreateUpdate generado archivo', error)
        })

      //get as formatted string
      //console.log('📧  -> tagCreateUpdate', vCard.getFormattedString())

      // const bucket = admin.storage().bucket('vcards')
      // bucket
      //   .upload(file, {
      //     // destination: 'vcards',
      //     resumable: true,
      //     public: true,
      //   })
      //   .then(async (data) => {
      //     fs.unlinkSync(file)
      //     const url = data[0].metadata.mediaLink
      //     // let url = await bucket.ref(file).getDownloadURL()
      //     console.log(
      //       '✅  -> tagCreateUpdate archivo cargado',
      //       data[0].metadata.mediaLink
      //     )
      //     tagRef.update({
      //       vcard: url,
      //     })
      //   })
      //   .catch((err) => {
      //     console.log('🚨 -> ERROR tagCreateUpdate cargando archivo', err)
      //   })
    } catch (error) {
      console.error('🚨 -> ERROR tagCreateUpdate', error)
    }
  })
*/