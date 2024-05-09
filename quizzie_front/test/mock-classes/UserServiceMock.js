import { UserService } from '../../src/services/UserService.js'

export class UserServiceMock extends UserService {
  
    #user = {
        username: 'username',
        password: 'password',
        id: 'id'
      }
  
    constructor() {
      super()
    }
  
    async loginUser() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({access_token: 'the token'})
        }, 10)
      })
    }
  
    async registerUser() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({})
        }, 10)
      })
    }
}