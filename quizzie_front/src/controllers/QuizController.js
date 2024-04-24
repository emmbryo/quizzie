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
    try {
      res.status(200)
      res.render('quiz/menu')
    } catch (error) {
      next(error)
    }
    
  }

  /**
   * Renders a quiz game menu
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getQuestions (req, res, next) {
    try {
      const questions = await this.#service.getQuestions(req.body.size, req.body.quizOption)
      console.log(questions)
      console.log('****')
      const viewData = {
        ...questions
      }
      res.render('quiz/game', { viewData })
    } catch (error) {
      req.session.flash = {
        type: 'danger',
        text: error.message
      }
      res.redirect('./quiz')
    }
  }

  async showUpload (req, res, next) {
    try {
      if (req.session.user && req.session.user.role === 'admin') {
        res.status(200)
        res.render('quiz/upload')
      } else {
        next(createError(404))
      }
    } catch (error) {
      next(error)
    }
  }

  async uploadQuestion (req, res, next) {
    try {
      if (req.session.user && req.session.user.role !== 'admin') {
        const question = await this.#service.addQuestion(req.body)
        req.session.flash = {
          type: 'success',
          text: 'Question uploaded successfully'
        }
        res.redirect('../quiz/upload')
      } else {
        next(createError(404))
      }
    } catch (error) {
      req.session.flash = {
        type: 'danger',
        text: error.message
      }
      res.redirect('../quiz')
    }
  }
}
