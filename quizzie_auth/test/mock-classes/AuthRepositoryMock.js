import { AuthRepository } from '../../src/repositories/AuthRepository.js'

export class AuthRepositoryMock extends AuthRepository {
  user = {
      username: 'username',
      password: 'password'
    }

  constructor() {
    super()
  }

}