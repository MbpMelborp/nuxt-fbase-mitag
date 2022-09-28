const functions = require('firebase-functions')
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true })
const Sharp = require('sharp')

admin.initializeApp()

const TAG_CONTROLLER = require('./controllers/tags')
const TAG_VCARD = require('./controllers/vcard')
const MAIL_CONTROLER = require('./controllers/mail')

/**
 * API
 * end point: https://us-central1-<project-id>.cloudfunctions.net/api/tag
 * @param {functions.https.Request} req
 * @param {functions.Response} res
 * @param {functions.https.CallableContext} context
 * @returns {Promise<void>}
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
        /**
         * GET
         * query: { id: 'tagId' }
         * Trae la informcacion de un tag pasando el parametro id con el código del tag
         */
        if (query.id) {
          console.log(`🏁 API tag onRequest GET ${query.id}`, `\n`)
          TAG_CONTROLLER.getTagById(query.id).then((tag) => {
            console.log('✅ -> API tag onRequest GET', tag)
            if (!tag.error) {
              if (query.file) {
                return TAG_VCARD.generateCard(query.id, tag)
                  .then((vcard) => {
                    if (!query.text) {
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
                    } else {
                      res.status(200).send(vcard)
                    }
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
        /**
         * POST
         * query: /tag , body informaci´on del tag a crear
         * Guarda un nuevo tag en la base de datos
         */
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
 * end point: https://us-central1-<project-id>.cloudfunctions.net/api/mail
 * @param {functions.https.Request} req
 * @param {functions.Response} res
 * @param {functions.https.CallableContext} context
 * @returns {Promise<void>}
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
      } else if (req.method === 'POST') {
        /**
         * POST
         * query: body envía un mail con la información del body
         */
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
 * Crea funciones para consumir desde el front
 */

/**
 * getTag
 * @param {functions.https.CallableContext} context
 * @param {Object} data
 * @returns {Promise<Object>}
 * Retorna la información de un tag pasando el id del tag
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
 * getQr
 * @param {functions.https.CallableContext} context
 * @param {Object} data
 * @returns {Promise<Object>}
 * Genera un qr pasando el id del tag
 */
exports.getQr = functions.https.onRequest((req, res) => {
  try {
    const body = req.body
    const query = req.query
    const params = req.params
    console.log(
      `🏁 API getQr onRequest INIT body-> `,
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
        const qrcode = new QRCode({
          content: 'https://app.mitag.co/tag/' + query.id,
          padding: 1,
          width: 800,
          height: 800,
          color: '#000000',
          background: 'transparent',
          ecl: 'M',
        })
        const svg = qrcode.svg()

        Sharp(Buffer.from(svg))
          .png()
          .toBuffer()
          .then((data) => {
            res.set(
              'Content-disposition',
              'attachment; filename=' + query.id + '.png'
            )
            res.set('Content-Type', 'image/png')
            res.send(data)
          })
      } else if (req.method === 'POST') {
      }
    })
  } catch (error) {
    res.status(500).send(error)
    console.error(error)
  }
})
