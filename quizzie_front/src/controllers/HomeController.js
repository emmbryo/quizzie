/**
 * Module for the HomeController.
 *
 * @author Emma Fransson
 * @version 1.0.0
 */

import createError from 'http-errors'

/**
 * Encapsulates a controller.
 */
export class HomeController {

  /**
   * Return start page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      res.status(200)
      res.render('home/index')
    } catch (error) {
      next(error)
    }
    
  } 
}
