import { AuthRepository } from '../../src/repositories/AuthRepository.js'

export class AuthRepositoryMock extends AuthRepository {
  #user = {
      username: 'username',
      password: 'password',
      id: 'id'
    }

  constructor() {
    super()
  }

  async authenticate() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true)
      }, 10)
    })
  }

  async insert() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.#user)
      }, 10)
    })
  }

}