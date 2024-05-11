import { AuthController } from '../src/controllers/AuthController.js'
import { AuthServiceMock } from './mock-classes/AuthServiceMock.js'

import { jest } from '@jest/globals'
import jwt from 'jsonwebtoken'

const authController = new AuthController(new AuthServiceMock())

let req
let res
let next

describe('Auth controller constructor', () => {
  test('Constructor should return instance of class AuthController', () => {
    expect(authController).toBeInstanceOf(AuthController)
  })
})

describe('register method', () => {
  beforeEach(() => {
    req = { 
      body: { 
        username: 'username', password: 'password',
        role: 'user' 
      }
    }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    },
    next = jest.fn()
  })

  test('register method should respond with status code 201', async () => {
    await authController.register(req, res, next)
    expect(res.status).toHaveBeenCalledWith(201)
  })

  test('register method should return object', async () => {
    await authController.register(req, res, next)
    expect(res.json).toHaveBeenCalledWith({ id: 'id' })
  })

  test('should handle error in register method', async () => {
    const error = new Error('Test error')
    res.json.mockImplementationOnce(() => {
      throw error
    })
    await authController.register(req, res, next)
    expect(next).toHaveBeenCalledWith(error)
  })

  test('should handle duplicated keys error', async () => {
    const error = new Error('Test error')
    error.code = 11000
    res.json.mockImplementationOnce(() => {
      throw error
    })
    await authController.register(req, res, next)
    expect(next).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 409, message: 'Username already in use.'}))
  })

  test('should handle validation error', async () => {
    const error = new Error('Test error')
    error.name = 'ValidationError'
    res.json.mockImplementationOnce(() => {
      throw error
    })
    await authController.register(req, res, next)
    expect(next).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 400, message: 'Username and/or password missing. If provided, password must be at least 10 characters.' }))
  })
})

describe('login method', () => {
  const originalSign = jwt.sign
  beforeEach(() => {
    jwt.sign = jest.fn().mockReturnValue('the secret access token')
    req = { 
      body: { 
        username: 'username', 
        password: 'password' 
      }
    }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    },
    next = jest.fn()
  })

  afterEach(() => { 
    jwt.sign = originalSign 
  })

  test('login method should respond with status code 200', async () => {
    await authController.login(req, res, next)
    expect(res.status).toHaveBeenCalledWith(200)
  })

  test('login method should return object', async () => {
    await authController.login(req, res, next)
    expect(res.json).toHaveBeenCalledWith({ access_token: 'the secret access token' })
  })

  test('should handle unauthorized error', async () => {
    const error = new Error('Test error')
    res.json.mockImplementationOnce(() => {
      throw error
    })
    await authController.login(req, res, next)
    expect(next).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 401, message: 'Credentials invalid or not provided.' }))
  })
})

describe('logout method', () => {
  beforeEach(() => {
    req = jest.fn()
    res = { 
      status: jest.fn().mockReturnThis(),
      header: jest.fn().mockReturnThis(),
      cookie: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    next = jest.fn()
  })

  test('logout method should respond with status code 200', async () => {
    await authController.logout(req, res, next)
    expect(res.status).toHaveBeenCalledWith(200)
  })

  test('logout method should set correct headers', async () => {
    await authController.logout(req, res, next)
    expect(res.header).toHaveBeenCalledWith('access-control-expose-headers', 'Set-Cookie')
  })

  test('logout method should set correct cookie', async () => {
    await authController.logout(req, res, next)
    expect(res.cookie).toHaveBeenCalledWith('jwt', '', { httpOnly: true, secure: false, maxAge: 100 })
  })

  test('logout method should return object', async () => {
    await authController.logout(req, res, next)
    expect(res.json).toHaveBeenCalledWith({ status: 'logged out' })
  })
})




