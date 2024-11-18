const functions = require('firebase-functions')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: './' }); // Diretório da raiz
const handle = app.getRequestHandler()

exports.nextApp = functions.https.onRequest((req, res) => {
  app.prepare().then(() => {
    handle(req, res)
  })
})