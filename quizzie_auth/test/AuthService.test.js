import { AuthService } from '../src/services/AuthService.js'
import { AuthRepositoryMock } from './mock-classes/AuthRepositoryMock.js'

const authService = new AuthService(new AuthRepositoryMock())

let req

describe('Auth service constructor', () => {
  test('Constructor should return instance of class AuthService', () => {
    expect(authService).toBeInstanceOf(AuthService)
  })
})

describe('authenticate method', () => {
  test('authenticate method should return object', async () => {
    const user = await authService.authenticate('username', 'password')
    expect(user).toEqual(true)
  })
})

describe('isAuthorized method', () => {
  test('isAuthorized method should return true for correct credentials', () => {
    req = { 
      headers: {
        authorization: process.env.REGISTER_ADMIN_TOKEN
      }
     }
    const isAuth = authService.isAuthorized(req)
    expect(isAuth).toEqual(true)
  })

  test('isAuthorized method should throw unauthorized error on invalid token.', () => {
    req = {
      headers: {
        authorization: 'invalid'
      }
    }
    expect(() => authService.isAuthorized(req)).toThrowError('Unauthorized. Invalid token.')
  })

  test('isAuthorized method should throw token required error on no token.', () => {
    req = { 
      headers: {
        authorization: null
      }
    }
    expect(() => authService.isAuthorized(req)).toThrowError('To register as admin an authorization token is required.')
  })
})

