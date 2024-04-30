/**
 * Question routes.
 *
 * @author ef222hr
 * @version 1.0.0
 */

import express from 'express'
import createError from 'http-errors'

export const router = express.Router()

const authorize = (req, res, next) => {
  try {
    const bearer = req.headers.authorization.split(' ')[1]
    if (bearer !== process.env.QUIZ_API_TOKEN) {
      throw new Error('Unauthorized')
    }
    next()
  } catch (error) {
    next(createError(401, 'Unauthorized'))
  }
  
}

/**
 * Resolves an QuestionController object from the IoC container.
 *
 * @param {object} req - Express request object.
 * @returns {object} - An object that can act as a QuestionController object.
 */
const resolveQuestionController = (req) => req.app.get('container').resolve('QuestionController')

// Map HTTP verbs and route paths to controller actions.

// The base of question routes.
router.get('/',
  (req, res, next) => resolveQuestionController(req).index(req, res, next)
)
 router.get('/all', 
  (req, res, next) => authorize(req, res, next),
  (req, res, next) => resolveQuestionController(req).getAllQuestions(req, res, next))

router.get('/selected', (req, res, next) => resolveQuestionController(req).getSelectedQuestions(req, res, next))

router.get('/random', (req, res, next) => resolveQuestionController(req).getRandomQuestions(req, res, next))

// POST

router.post('/', (req, res, next) => resolveQuestionController(req).addQuestion(req, res, next))

// DELETE

router.delete('/:id', 
  (req, res, next) => authorize(req, res, next),
  (req, res, next) => resolveQuestionController(req).deleteQuestion(req, res, next))