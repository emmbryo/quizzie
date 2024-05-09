import { UserService } from '../src/services/UserService.js'
import fetchMock from 'jest-fetch-mock'

global.fetch = fetchMock

const userService = new UserService()
let req

describe('UserService', () => {
  test('Constructor should return instance of class UserService ', () => {
    expect(userService).toBeInstanceOf(UserService)
  })
})

describe('registerUser method', () => {
  beforeEach(() => {
    req = { 
      body: { 
        username: 'username', password: 'password',
        role: 'user' 
      }
    }
    fetchMock.resetMocks()
  })

  test('registerUser method should return object', async () => {
    const mockResponse = { id: 'id' }
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse))

    const result = await userService.registerUser(req)
    expect(result).toEqual({ id: 'id' })
  })

  test('registerUser method should call fetch with auth url', async () => {
    const mockResponse = { id: 'id' }
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse))
    await userService.registerUser(req)
    expect(fetch).toHaveBeenCalledWith(process.env.AUTH_REGISTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    })
  })

  test('registerUser method should throw error when fetch failes with status 400.', async () => {
    const mockResponse = { error: 'error' }
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 400 })
    await expect(userService.registerUser(req)).rejects.toThrow('Both username and password must be provided.')
  })

  test('registerUser method should throw error when fetch failes with status 409.', async () => {
    const mockResponse = { error: 'error' }
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 409 })
    await expect(userService.registerUser(req)).rejects.toThrow('The username is already taken.')
  })

  test('registerUser method should throw error when fetch failes with response.ok = false.', async () => {
    const mockResponse = { status: 500 }
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 500 })
    await expect(userService.registerUser(req)).rejects.toThrow('Something went wrong with the register process.')
  })
})

describe('loginUser method', () => {
  beforeEach(() => {
    req = { 
      body: { 
        username: 'username', 
        password: 'password', 
      }
    }
    fetchMock.resetMocks()
  })
  test('loginUser method should return object', async () => {
    const mockResponse = { token: 'token' }
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse))

    const result = await userService.loginUser(req)
    expect(result).toEqual({ token: 'token' })
  })
  test('loginUser method should call fetch with auth url', async () => {
    const mockResponse = { token: 'token' }
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse))

    await userService.loginUser(req)

    expect(fetch).toHaveBeenCalledWith(process.env.AUTH_LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    })
  })
  test('loginUser method should throw error when fetch failes with status 401.', async () => {
    const mockResponse = { error: 'error' }
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 401 })
    await expect(userService.loginUser(req)).rejects.toThrow('Wrong username or password.')
  })

  test('loginUser method should throw error when fetch failes with response.ok = false.', async () => {
    const mockResponse = { status: 500 }
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 500 })
    await expect(userService.loginUser(req)).rejects.toThrow('Something went wrong with the login.')
  })

})