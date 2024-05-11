import { AuthService } from '../../src/services/AuthService.js'

export class AuthServiceMock extends AuthService {

  #user = {
      username: 'username',
      password: 'password'
    }

  constructor() {
    super()
  }

  async authenticate() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({access_token: 'the token'})
      }, 10)
    })
  }
}