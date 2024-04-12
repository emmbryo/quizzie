/**
 * routes module.
 *
 * @author ef222hr
 * @version 1.0.0
 */

import express from 'express'
import { router as questionRouter } from './QuestionRouter.js'

export const router = express.Router()

router.get('/', (req, res) => res.json({
  message: 'Welcome to the quizzie language quiz API!',
}))

router.use('/questions', questionRouter)
