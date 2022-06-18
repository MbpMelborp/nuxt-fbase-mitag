const functions = require('firebase-functions')
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true })
admin.initializeApp()
const db = admin.firestore()

const TAG_CONTROLLER = require('./controllers/tags')
const TAG_VCARD = require('./controllers/vcard')
const MAIL_CONTROLER = require('./controllers/mail')
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
    const params = req.params
    console.log(
      `🏁 API tag onRequest INIT body-> `,
      body,
      `Query -> `,
      query,
      `Params -> `,
      params,
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
                return TAG_VCARD.generateCard(query.id, tag)
                  .then((vcard) => {
                    console.log(
                      '✅  -> tagCreateUpdate archivo generado',
                      vcard
                    )
                    res.set(
                      'Content-Type',
                      `text/vcard; name="${query.id}.vcf"`
                    )
                    res.set(
                      'Content-Disposition',
                      `inline; filename="${query.id}.vcf"`
                    )
                    res.send(vcard)
                  })
                  .catch((error) => {
                    // console.log('🚨 -> ERROR tagCreateUpdate generado archivo', error)
                    res.status(500).send('error generando archivo ' + error)
                  })

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
      } else if (req.method === 'POST') {
        console.log(`🏁 API tag onRequest POST`, query, `\n`)
        const list =
          'abcdefghijklmnropqrstuvwABCDEFGHIJKLMNPQRSTUVWXYZ123456789'
        let id = ''
        for (let i = 0; i < 6; i++) {
          const rnd = Math.floor(Math.random() * list.length)
          id = id + list.charAt(rnd)
        }
        TAG_CONTROLLER.createTag(
          params[0]
            ? params[0] !== '/'
              ? params[0].replace('/', '').replace(' ', '')
              : id
            : id,
          body
        )
          .then((tag) => {
            res.status(200).json(tag)
          })
          .catch((error) => {
            res.status(500).json({ error: error })
          })
      }
    })
  } catch (error) {
    res.status(500).send(error)
    console.error(error)
  }
})

/**
 * API
 *
 */
exports.mail = functions.https.onRequest((req, res) => {
  try {
    const body = req.body
    const query = req.query
    const params = req.params
    console.log(
      `🏁 API mail onRequest INIT body-> `,
      body,
      `Query -> `,
      query,
      `Params -> `,
      params,
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
        //
      } else if (req.method === 'POST') {
        console.log(`🏁 API mail onRequest POST`, query, `\n`)

        MAIL_CONTROLER.sendMail(body)
          .then((tag) => {
            res.status(200).json(tag)
          })
          .catch((error) => {
            res.status(500).json({ error: error })
          })
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

    const data = change.after.data()
    const previousData = change.before.data()

    // We'll only update if the name has changed.
    // This is crucial to prevent infinite loops.
    if (data == previousData) {
      console.log('FINISH')
      return null
    }
    const tagId = context.params.tag
    const tagData = change.after.data()
    const vcard = TAG_VCARD.generateCard(tagId, tagData)
    console.log(previousData.vcard != vcard, previousData.vcard, vcard)
    if (previousData.vcard != vcard) {
      // return change.after.ref.set(
      //   {
      //     vcard: vcard,
      //   },
      //   { merge: true }
      // )
    } else {
      return null
    }

    // return TAG_VCARD.generateCard(tagId, tagData)
    //   .then((vcard) => {
    //     // console.log('✅  -> tagCreateUpdate archivo generado', vcard)
    //     return change.after.ref.set(
    //       {
    //         vcard: 222, //vcard,
    //       },
    //       { merge: true }
    //     )
    //   })
    //   .catch((error) => {
    //     // console.log('🚨 -> ERROR tagCreateUpdate generado archivo', error)
    //     return false
    //   })

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
  })
*/
