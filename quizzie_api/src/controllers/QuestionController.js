/**
 * Module for the QuestionController.
 *
 * @author Emma Fransson
 * @version 1.0.0
 */

import createError from 'http-errors'
import { QuestionService } from '../services/QuestionService.js'

/**
 * Encapsulates a controller.
 */
export class QuestionController {
  /**
   * The service.
   *
   * @type {QuestionService}
   */
  #service

  /**
   * Initializes a new instance.
   *
   * @param {QuestionService} service - A service instantiated from a class with the same capabilities as QuestionService.
   */
  constructor (service = new QuestionService()) {
    this.#service = service
  }

  /**
   * Return info on question routes.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  index (req, res, next) {
    res
      .status(200)
      .json({
        message: "Welcome to the question route of the quizzie API!",
      })
  }

  /**
   * Create question.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async addQuestion (req, res, next) {
    try {
      const question = await this.#service.insert(req.body)

      console.log('question: ', question)

      res
        .status(200)
        .json({
          message: "Question added",
          question: question
        })
    } catch (error) {
      next(createError(400, error.message))
    }
  }

  /**
   * Return a specified number of questions.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getQuestions (req, res, next) {
    try {
      if (!['phrasalVerb', 'idiom', 'vocab'].includes(req.query.type)) {
        throw new Error('Invalid type.')
      }
      if (req.query.limit && isNaN(req.query.limit)) {
        throw new Error('Invalid limit query.')
      }

      const questions = await this.#service.get(req.query.type ? { conditions: { type: req.query.type }, limit: req.query.limit || process.env.LIMIT } : { limit: req.query.limit || process.env.LIMIT })
      res
        .status(200)
        .json({
          message: "All questions",
          questions: questions
        })
    } catch (error) {
      next(createError(400, error.message))
    }
  }
}
