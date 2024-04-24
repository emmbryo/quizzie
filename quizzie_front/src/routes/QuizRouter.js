/**
 * Quiz routes.
 *
 * @author ef222hr
 * @version 1.0.0
 */

import express from 'express'
export const router = express.Router()

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

router.get('/upload',
  (req, res, next) => resolveQuizController(req).showUpload(req, res, next)
)

router.post('/upload',
  (req, res, next) => resolveQuizController(req).uploadQuestion(req, res, next)
)

router.post('/',
  (req, res, next) => resolveQuizController(req).getQuestions(req, res, next)
)

