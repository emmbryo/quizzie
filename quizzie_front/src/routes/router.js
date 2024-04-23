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
import { router as userRouter } from './UserRouter.js'

export const router = express.Router()

router.use('/', homeRouter)
router.use('/quiz', quizRouter)
router.use('/user', userRouter)

// Catch 404 (ALWAYS keep this as the last route).
router.use('*', (req, res, next) => next(createError(404)))
