/**
 * Module for the AuthController.
 *
 * @version 1.0.0
 */

import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { AuthService } from '../services/AuthService.js'

/**
 * Encapsulates a controller.
 */
export class AuthController {
  /**
   * The service.
   *
   * @type {AuthService}
   */
  #service

  /**
   * The private key.
   *
   * @type {string}
   */
  #privateKey = Buffer.from(process.env.PRIVATE_KEY, 'base64').toString('ascii')

  /**
   * Initializes a new instance.
   *
   * @param {AuthService} service - A service instantiated from a class with the same capabilities as AuthService.
   */
  constructor (service = new AuthService()) {
    this.#service = service
  }

  /**
   * Authenticates an user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async login (req, res, next) {
    try {
      const user = await this.#service.authenticate(req.body.username, req.body.password)

      const payload = {
        username: user.username,
        sub: user.id,
        role: user.role
      }

      // Create the access token.
      const accessToken = jwt.sign(payload, this.#privateKey, {
        algorithm: 'RS256',
        expiresIn: process.env.ACCESS_TOKEN_LIFE
      })

      res
        .status(200)
        .json({
          access_token: accessToken
        })
    } catch (error) {
      // Authentication failed.
      // console.log(error)
      const err = createError(401)
      err.cause = error
      err.message = 'Credentials invalid or not provided.'

      next(err)
    }
  }

  /**
   * Logs the user out by returning empt.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async logout (req, res, next) {
    res
      .status(200)
      .header('access-control-expose-headers', 'Set-Cookie')
      .cookie('jwt', '', { httpOnly: true, secure: false, maxAge: 100 })
      .json({ status: 'logged out' })
  }

  /**
   * Registers an user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async register (req, res, next) {
    try {
      const user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
      }
      if (req.body.role && this.#service.isAuthorized(req)) {
        user.role = req.body.role
      }
      const newUser = await this.#service.insert(user)

      res
        .status(201)
        .json({ id: newUser._id })
    } catch (error) {
      let err = error

      if (err.code === 11000) {
        // Duplicated keys.
        err = createError(409)
        err.message = 'Username already in use.'
        err.cause = error
      } else if (error.name === 'ValidationError') {
        // Validation error(s).
        err = createError(400)
        err.message = 'Username and/or password missing. If provided, password must be at least 10 characters.'
        err.cause = error
      }
      next(err)
    }
  }
}
