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
   * Return info on tandem routes.
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
}
