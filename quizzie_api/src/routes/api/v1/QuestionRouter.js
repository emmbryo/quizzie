/**
 * Question routes.
 *
 * @author ef222hr
 * @version 1.0.0
 */

import express from 'express'
export const router = express.Router()

/**
 * Resolves an QuestionController object from the IoC container.
 *
 * @param {object} req - Express request object.
 * @returns {object} - An object that can act as a QuestionController object.
 */
const resolveQuestionController = (req) => req.app.get('container').resolve('QuestionController')

// Map HTTP verbs and route paths to controller actions.

// The base of tandem routes.
router.get('/',
  (req, res, next) => resolveQuestionController(req).index(req, res, next)
)

