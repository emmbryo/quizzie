/**
 * The routes.
 *
 * @author ef222hr
 * @version 1.0.0
 */

import express from 'express'
import createError from 'http-errors'
import { router as homeRouter } from './HomeRouter.js'
import { router as quizRouter } from './QuizRouter.js'

export const router = express.Router()

router.use('/', homeRouter)
router.use('/quiz', quizRouter)

// Catch 404 (ALWAYS keep this as the last route).
router.use('*', (req, res, next) => next(createError(404)))
