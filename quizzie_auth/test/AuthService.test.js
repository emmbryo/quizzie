import { AuthService } from '../src/services/AuthService.js'
import { AuthRepositoryMock } from './mock-classes/AuthRepositoryMock.js'

const authService = new AuthService(new AuthRepositoryMock())

describe('Auth service constructor', () => {
  test('Constructor should return instance of class AuthService', () => {
    console.log( typeof process.env.PRIVATE_KEY)
    expect(authService).toBeInstanceOf(AuthService)
  })
})

