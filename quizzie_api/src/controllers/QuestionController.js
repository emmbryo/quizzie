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
    res.status(200)
    res.json({
        message: "Welcome to the question route of the quizzie API!",
      })
  }

  /**
   * 
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getQuestion (req, res, next) {
    try {
      const question = await this.#service.getById(req.params.id)

      res.status(200)
      res.json({
          message: "Question found",
          question: question
        })
    } catch (error) {
      next(createError(400, error.message))
    }
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

      // console.log('question: ', question)

      res.status(200)
      res.json({
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
  async getAllQuestions (req, res, next) {
    try {
      const questions = await this.#service.getAll()

      res.status(200)
      res.json({
          message: "All questions",
          questions: questions
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
  async getSelectedQuestions (req, res, next) {
    try {
      if (!['verbPhrase', 'idiom', 'vocab'].includes(req.query.type)) {
        throw new Error('Invalid or missing type.')
      }
      this.checkLimit(req)

      const limitValue = req.query.limit || process.env.LIMIT 
      const questions = await this.#service.get(req.query.type ? { conditions: { type: req.query.type }, limit: limitValue } : { limit: limitValue })

      res.status(200)
      res.json({
          message: "Selected questions",
          questions: questions
        })
    } catch (error) {
      next(createError(400, error.message))
    }
  }

  /**
   * Get a set of random questions.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getRandomQuestions (req, res, next) {
    try {
      this.checkLimit(req)
      const questions = await this.#service.getRandom({ value: req.query.limit })

      res.status(200)
      res.json({
          message: "Set of random questions",
          questions: questions
        })
    } catch (error) {
      next(createError(400, error.message))
    }
  }

  /**
   * Check limit query.
   *
   * @param {object} req - Express request object.
   * @throws {Error} - If limit query is not in number format, if it is greater than the maximum value or lower than one.
   */
  async updateQuestion (req, res, next) {
    try {
      const question = await this.#service.update(req.params.id, req.body)

      res.status(200)
      res.json({
          message: "Question updated",
          question: question
        })
    } catch (error) {
      next(createError(400, error.message))
    }
  }

  /**
   * Get a set of random questions.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async deleteQuestion (req, res, next) {
    try {
      await this.#service.delete(req.params.id)
      res.status(204)
      res.end()
    } catch (error) {
      next(createError(400, error.message))
    }
  }

   /**
   * Check limit query.
   *
   * @param {object} req - Express request object.
   * @throws {Error} - If limit query is not in number format, if it is greater than the maximum value or lower than one.
   */
   checkLimit (req) {
    if (!req.query.limit || isNaN(req.query.limit) || 
        req.query.limit > Number.parseInt(process.env.MAX_LIMIT) || 
        req.query.limit < 1) {
      throw new Error(`Limit query in number format required. Maximun value ${process.env.MAX_LIMIT}, minimum value 1.`)
    }
  }
}
