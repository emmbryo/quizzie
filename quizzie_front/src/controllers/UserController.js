/**
 * Module for the UserController.
 *
 * @author Emma Fransson
 * @version 1.0.0
 */

import createError from 'http-errors'
import { UserService } from '../services/UserService.js'
import jwt from 'jsonwebtoken'

/**
 * Encapsulates a controller.
 */
export class UserController {
  /**
   * The private key.
   *
   * @type {string}
   */
  #publicKey 
  /**
   * @type {UserService}
   */
  #service
  /**
   * Instantiates an object of type UserController.
   *
   * @param {UserService} service - ...
   */
  constructor (service = new UserService()) {
    this.#service = service
    this.#publicKey = Buffer.from(process.env.PUBLIC_KEY, 'base64').toString('ascii')
  }

  /**
   * Return register/login form page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async showRegisterView (req, res, next) {
    try {
      res
        .status(200)
        .render('user/register')
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

  async registerUser (req, res, next) {
    try {
      const user = await this.#service.registerUser(req)
      // console.log('The user was successfully registered: ', user)
      req.session.flash = { type: 'success', text: 'The user was registered successfully.' }
      res.redirect('../user/login')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('../user/register')
    }
  }

  async loginUser (req, res, next) {
    try {
      const token = await this.#service.loginUser(req)
      req.session.user = this.authenticateJWT(token.access_token)
      req.session.isAdmin = req.session.user.role === 'admin'
      res.redirect('../quiz')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('../user/login')
    }
  }

  logout (req, res, next) {
    req.session.destroy()
    res.redirect('../quiz')
  }

  authenticateJWT (accessToken) {
    const jwtData = jwt.verify(accessToken, this.#publicKey)
    return {
      username: jwtData.username,
      id: jwtData.sub,
      role: jwtData.role
    }
  }
}