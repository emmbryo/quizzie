/**
 * Quiz routes.
 *
 * @author ef222hr
 * @version 1.0.0
 */

import express from 'express'
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })
export const router = express.Router()

function authenticateUser(req, res, next) {
  if (req.session.isAdmin) {
    return next()
  }
  res.redirect('../')
}


/**
 * Resolves an QuizController object from the IoC container.
 *
 * @param {object} req - Express request object.
 * @returns {object} - An object that can act as a QuizController object.
 */
const resolveQuizController = (req) => req.app.get('container').resolve('QuizController')

// Map HTTP verbs and route paths to controller actions.

// The base of Quiz routes.
router.get('/',
  (req, res, next) => resolveQuizController(req).index(req, res, next)
)

router.post('/',
  (req, res, next) => resolveQuizController(req).getQuestions(req, res, next)
)

router.get('/upload',
  (req, res, next) => authenticateUser(req, res, next),
  (req, res, next) => resolveQuizController(req).showUpload(req, res, next)
)

router.post('/upload',
  (req, res, next) => authenticateUser(req, res, next),
  (req, res, next) => resolveQuizController(req).uploadQuestion(req, res, next)
)

router.post('/uploadFile',
  (req, res, next) => authenticateUser(req, res, next),
  upload.single('file'),
  (req, res, next) => resolveQuizController(req).uploadFile(req, res, next)
)

router.get('/edit',
  (req, res, next) => authenticateUser(req, res, next),
  (req, res, next) => resolveQuizController(req).showEdit(req, res, next)
)

router.post('/delete/:id',
  (req, res, next) => authenticateUser(req, res, next),
  (req, res, next) => resolveQuizController(req).deleteQuestion(req, res, next)
)

