import { AuthService } from '../../src/services/AuthService.js'

export class AuthServiceMock extends AuthService {

  #user = {
      username: 'username',
      password: 'password'
    }

  constructor() {
    super()
  }
}