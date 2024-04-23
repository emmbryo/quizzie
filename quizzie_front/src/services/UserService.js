/**
 * Module for the UserService.
 *
 * @author ef222hr
 * @version 1.0.0
 */

import createError from 'http-errors'

/**
 * Encapsulates a tandem service.
 */
export class UserService {


    /**
   * Sends request to auth service to register user.
   *
   * @param {object} req - Express request object.
   * @returns {boolean} true/false
   */
  async registerUser (req) {
  // wait response from auth service
  const user = {
    username: req.body.username,
    password: req.body.password,
    permissionLevel: req.body.permissionLevel,
  }
  const response = await fetch(process.env.AUTH_REGISTER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })

  if (response.status === 400) {
    throw createError(400, 'Both username and password must be provided.')
  } else if (response.status === 409) {
    throw createError(409, 'The username is already taken.')
  } else if (!response.ok) {
    throw new Error('Something went wrong with the register process.')
  }

  return response.json()
  }

  /**
   * Sends request to auth service to login user.
   *
   * @param {object} req - Express request object.
   * @returns {object} user - ...
   */
  async loginUser (req) {
    const credentials = {
      username: req.body.username,
      password: req.body.password
    }
    const response = await fetch(process.env.AUTH_LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })

    if (response.status === 401) {
      throw createError(401, 'Wrong username or password.')
    } else if (!response.ok) {
      throw new Error('Something went wrong with the login.')
    }

    return response.json()
  }
}
