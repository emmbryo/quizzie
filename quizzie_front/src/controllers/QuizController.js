/**
 * Module for the QuizController.
 *
 * @author Emma Fransson
 * @version 1.0.0
 */

import createError from 'http-errors'
import { QuizService } from '../services/QuizService.js'

/**
 * Encapsulates a controller.
 */
export class QuizController {
  /**
   * The service.
   *
   * @type {QuizService}
   */
  #service

  /**
   * Initializes a new instance.
   *
   * @param {QuizService} service - A service instantiated from a class with the same capabilities as QuizService.
   */
  constructor (service = new QuizService()) {
    this.#service = service
  }

  /**
   * Renders quiz menu..
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  index (req, res, next) {
    res.status(200)
    res.render('quiz/menu')
  }

  
}
