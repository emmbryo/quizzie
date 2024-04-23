/**
 * User routes.
 *
 * @author ef222hr
 * @version 1.0.0
 */

import express from 'express'
export const router = express.Router()

/**
 * Resolves an UserController object from the IoC container.
 *
 * @param {object} req - Express request object.
 * @returns {object} - An object that can act as a UserController object.
 */
const resolveUserController = (req) => req.app.get('container').resolve('UserController')

// Map HTTP verbs and route paths to controller actions.

// The base of User routes.
router.get('/register',
  (req, res, next) => resolveUserController(req).showRegisterView(req, res, next)
)

router.get('/login',
  (req, res, next) => resolveUserController(req).showLoginView(req, res, next)
)

// Post requests
router.post('/register',
  (req, res, next) => resolveUserController(req).registerUser(req, res, next)
)

router.post('/login',
  (req, res, next) => resolveUserController(req).loginUser(req, res, next)
)

router.get('/logout', (req, res, next) => resolveUserController(req).logout(req, res, next))
