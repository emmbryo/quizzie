/**
 * Module for the UserController.
 *
 * @author Emma Fransson
 * @version 1.0.0
 */

import createError from 'http-errors'

/**
 * Encapsulates a controller.
 */
export class UserController {

  /**
   * Return register/login form page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async showRegisterView (req, res, next) {
    try {
      res.status(200)
      res.render('user/register')
    } catch (error) {
      next(error)
    }
  }
  
  async showLoginView (req, res, next) {
    try {
      res.status(200)
      res.render('user/login')
    } catch (error) {
      next(error)
    }
  } 
}