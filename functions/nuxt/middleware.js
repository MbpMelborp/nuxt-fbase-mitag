const middleware = {}

middleware['admin'] = require('../middleware/admin.js')
middleware['admin'] = middleware['admin'].default || middleware['admin']

middleware['auth'] = require('../middleware/auth.js')
middleware['auth'] = middleware['auth'].default || middleware['auth']

middleware['authtag'] = require('../middleware/authtag.js')
middleware['authtag'] = middleware['authtag'].default || middleware['authtag']

middleware['noauth'] = require('../middleware/noauth.js')
middleware['noauth'] = middleware['noauth'].default || middleware['noauth']

export default middleware
