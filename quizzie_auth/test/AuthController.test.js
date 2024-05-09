import { AuthController } from '../src/controllers/AuthController.js'
import { AuthServiceMock } from './mock-classes/AuthServiceMock.js'
import { req, res, next } from './mock-objects/requestCycleObjects.js'

const authController = new AuthController(new AuthServiceMock())

const resetRes = () => {
  res.json('')
  res.status(0)
}

describe('Auth controller constructor', () => {
  test('Constructor should return instance of class AuthController', () => {
    expect(authController).toBeInstanceOf(AuthController)
  })
})


