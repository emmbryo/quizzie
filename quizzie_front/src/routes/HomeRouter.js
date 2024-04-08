/**
 * Home routes.
 *
 * @author ef222hr
 * @version 1.0.0
 */

import express from 'express'
export const router = express.Router()

/**
 * Resolves an HomeController object from the IoC container.
 *
 * @param {object} req - Express request object.
 * @returns {object} - An object that can act as a HomeController object.
 */
const resolveHomeController = (req) => req.app.get('container').resolve('HomeController')

// Map HTTP verbs and route paths to controller actions.

// The base of Home routes.
router.get('/',
  (req, res, next) => resolveHomeController(req).index(req, res, next)
)
