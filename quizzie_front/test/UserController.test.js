import { UserController } from '../src/controllers/UserController.js'
import { UserServiceMock } from './mock-classes/UserServiceMock.js'
import jwt from 'jsonwebtoken'

import { jest } from '@jest/globals'

let req
let res
let next

const userService = new UserServiceMock()
const userController = new UserController(userService)

describe('UserController controller constructor', () => {
  test('Constructor should return instance of class UserController', () => {
    expect(userController).toBeInstanceOf(UserController)
  })
})

describe('showRegisterView mothod', () => {

  beforeEach(() => {
    req = jest.fn()
    res = { 
      status: jest.fn().mockReturnThis(), 
      render: jest.fn() 
    }
    next = jest.fn()
  })

  test('showRegisterView method should return status code 200', async () => {
    await userController.showRegisterView(req, res, next)
    expect(res.status).toHaveBeenCalledWith(200)
  })

  test('showRegisterView method should call res.render with user/register', async () => {
    await userController.showRegisterView(req, res, next)
    expect(res.render).toHaveBeenCalledWith('user/register')
  })

  test('should handle error in showRegisterView method', async () => {
    const error = new Error('Test error')
    res.render.mockImplementationOnce(() => {
      throw error
    })
    await userController.showRegisterView(req, res, next)
    expect(next).toHaveBeenCalledWith(error)
  })
})

describe('showLoginView mothod', () => {

  beforeEach(() => {
    req = jest.fn()
    res = { 
      status: jest.fn().mockReturnThis(), 
      render: jest.fn() 
    }
    next = jest.fn()
  })

  test('showLoginView method should return status code 200', async () => {
    await userController.showLoginView(req, res, next)
    expect(res.status).toHaveBeenCalledWith(200)
  })

  test('showLoginView method should call res.render with user/register', async () => {
    await userController.showLoginView(req, res, next)
    expect(res.render).toHaveBeenCalledWith('user/login')
  })

  test('should handle error in showLoginView method', async () => {
    const error = new Error('Test error')
    res.render.mockImplementationOnce(() => {
      throw error
    })
    await userController.showLoginView(req, res, next)
    expect(next).toHaveBeenCalledWith(error)
  })
})

describe('registerUser method', () => {

  beforeEach(() => {
    req = { session: { flash: { type: '', text: ''} } }
    res = { 
      redirect: jest.fn() 
    }
    next = jest.fn()
  })

  test('registerUser method should call res.redirect with ../user/login', async () => {
    await userController.registerUser(req, res, next)
    expect(res.redirect).toHaveBeenCalledWith('../user/login')
  })

  test('should handle error in registerUser method', async () => {
    const error = new Error('Test error')
    res.redirect.mockImplementationOnce(() => {
      throw error
    })
    await userController.registerUser(req, res, next)
    expect(req.session.flash.type).toEqual('danger')
    expect(res.redirect).toHaveBeenCalledWith('../user/register')
  })
})

describe('loginUser method', () => {
  const originalVerify = jwt.verify

  beforeEach(() => {
    jwt.verify = jest.fn().mockReturnValue({ username: 'user', id: 'id', role: 'admin' })
    req = { 
      session: { 
        flash: { 
          type: '', text: ''
        },
        user: {
          role: 'admin'
        },
        isAdmin: false 
      } 
    }
    res = { 
      redirect: jest.fn() 
    }
    next = jest.fn()
  })
  afterEach(() => { 
    jwt.verify = originalVerify 
  })

  test('loginUser method should call res.redirect with ../quiz', async () => {
    await userController.loginUser(req, res, next)
    expect(res.redirect).toHaveBeenCalledWith('../quiz')
  })

  test('should handle error in loginUser method', async () => {
    const error = new Error('Test error')
    res.redirect.mockImplementationOnce(() => {
      throw error
    })
    await userController.loginUser(req, res, next)
    expect(req.session.flash.type).toEqual('danger')
    expect(res.redirect).toHaveBeenCalledWith('../user/login')
  })
})

describe('logout method', () => {
  
    beforeEach(() => {
      req = { session: { destroy: jest.fn() } }
      res = { 
        redirect: jest.fn() 
      }
      next = jest.fn()
    })
  
    test('logout method should call req.session.destroy', () => {
      userController.logout(req, res, next)
      expect(req.session.destroy).toHaveBeenCalled()
    })
  
    test('logout method should call res.redirect with ../quiz', () => {
      userController.logout(req, res, next)
      expect(res.redirect).toHaveBeenCalledWith('../quiz')
    })
})