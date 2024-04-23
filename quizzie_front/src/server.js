/**
 * The starting point of the application.
 *
 * @version 1.0.0
 */

import { container } from './config/bootstrap.js'

import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import session from 'express-session'
import helmet from 'helmet'
import logger from 'morgan'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { router } from './routes/router.js'

const app = express()

app.set('container', container)

// Get the directory name of this module's path.
const directoryFullName = dirname(fileURLToPath(import.meta.url))

// Set the base URL to use for all relative URLs in a document.
const baseURL = process.env.BASE_URL || '/'

// Set various HTTP headers to make the application little more secure (https://www.npmjs.com/package/helmet). Config so images from gitlab can be retrieved.
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: false,
  contentSecurityPolicy: {
    directives: {
      imgSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      fontSrc: ["'self'"]
    }
  }
}))

// View engine setup.
app.set('view engine', 'ejs')
app.set('views', join(directoryFullName, 'views'))
app.use(expressLayouts)
app.set('layout', join(directoryFullName, 'views', 'layouts', 'default'))

// Set up a morgan logger using the dev format for log entries.
app.use(logger('dev'))

// Parse requests of the content type application/x-www-form-urlencoded.
// Populates the request object with a body object (req.body).
app.use(express.urlencoded({ extended: false }))

// Parse requests of the content type application/json.
app.use(express.json())

// Serve static files.
app.use(express.static(join(directoryFullName, '..', 'public')))

// Setup and use session middleware
const sessionOptions = {
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  resave: false, // Resave even if a request is not changing the session.
  saveUninitialized: false, // Don't save a created but not modified session.
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    sameSite: 'strict'
  }
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sessionOptions.cookie.secure = true // serve secure cookies
}

app.use(session(sessionOptions))

// Middleware to be executed before the routes.
app.use((req, res, next) => {
  // the views need to know if the user is logged in, in order to show the corrrect available choices.
  if (req.session.flash) {
    res.locals.flash = req.session.flash
    delete req.session.flash
  }

  if (req.session.user) {
    res.locals.user = req.session.user
  }
  // Pass the base URL to the views.
  res.locals.baseURL = baseURL

  next()
})

// Register routes.
app.use('/', router)

// Error handler.
app.use(function (err, req, res, next) {
  // 404 Not Found.
  if (err.status === 404) {
    return res
      .status(404)
      .sendFile(join(directoryFullName, 'views', 'errors', '404.html'))
  }

  // 500 Internal Server Error (in production, all other errors send this response).
  if (req.app.get('env') !== 'development') {
    return res
      .status(500)
      .sendFile(join(directoryFullName, 'views', 'errors', '500.html'))
  }

  // Development only!
  // Only providing detailed error in development.

  // Render the error page.
  res
    .status(err.status || 500)
    .render('errors/error', { error: err })
})

// Starts the HTTP server listening for connections.
app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`)
  console.log('Press Ctrl-C to terminate...')
})
