import { AuthService } from '../../src/services/AuthService.js'

export class AuthServiceMock extends AuthService {

  #user = {
      username: 'username',
      password: 'password',
      _id: 'id' 
    }

  constructor () {
    super()
  }

  async authenticate () {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.#user)
      }, 10)
    })
  }

  async isAuthorized () {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true)
      }, 10)
    })
  }

  async insert () {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.#user)
      }, 10)
    })
  }
}