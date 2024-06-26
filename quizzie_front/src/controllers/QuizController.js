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
  async index (req, res, next) {
    try {
      res
        .status(200)
        .render('quiz/menu')
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
      const viewData = {
      ...questions
      }
      res
        .status(200)
        .render('quiz/game', { viewData })
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
        res
          .status(200)
          .render('quiz/upload')
    } catch (error) {
      next(error)
    }
  }

  async uploadQuestion (req, res, next) {
    try {
        await this.#service.addQuestion(req.body)
        req.session.flash = {
          type: 'success',
          text: 'Question uploaded successfully'
        }
        // console.log('current user: ', req.session.user)
        res.redirect('../quiz/upload')
    } catch (error) {
      req.session.flash = {
        type: 'danger',
        text: error.message
      }
      res.redirect('../quiz')
    }
  }

  async uploadFile (req, res, next) {
    try {
      await this.#service.uploadFile(req.file)
      req.session.flash = {
        type: 'success',
        text: 'File uploaded successfully'
      }
      res.redirect('../quiz/upload')
    } catch (error) {
      req.session.flash = {
        type: 'danger',
        text: error.message
      }
      res.redirect('../quiz')
    }
  }

  async showEdit (req, res, next) {
    try {
      const viewData = await this.#service.getAllQuestions(req.session.user.role)
      // const viewData = {
      //   ...questions
      // }
      res
        .status(200)
        .render('quiz/edit', { viewData })
    } catch (error) {
      next(error)      
    }
  }

  async updateQuestion (req, res, next) {
    try {
      await this.#service.updateQuestion(req.params.id, req.body)
      req.session.flash = {
        type: 'success',
        text: 'Question edited successfully'
      }
      res.redirect('../edit')
    } catch (error) {
      req.session.flash = {
        type: 'danger',
        text: error.message
      }
      res.redirect('../edit')
    }
  }

  async deleteQuestion (req, res, next) {
    try {
      await this.#service.deleteQuestion(req.params.id)
      req.session.flash = {
        type: 'success',
        text: 'Question deleted successfully'
      }
      res.redirect('../edit')
    } catch (error) {
      req.session.flash = {
        type: 'danger',
        text: error.message
      }
      res.redirect('../edit')
    }
  }
}
