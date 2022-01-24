const functions = require('firebase-functions')

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
