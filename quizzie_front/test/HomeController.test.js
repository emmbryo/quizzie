import { HomeController } from '../src/controllers/HomeController.js'
import { jest } from '@jest/globals'

let req
let res
let next

const homeController = new HomeController()

describe('HomeController controller constructor', () => {
  test('Constructor should return instance of class HomeController', () => {
    expect(homeController).toBeInstanceOf(HomeController)
  })
})

describe('index method', () => {

  beforeEach(() => {
    req = jest.fn()
    res = { status: jest.fn().mockReturnThis(), render: jest.fn() }
    next = jest.fn()
    })

    test('index method should return status code 200', async () => {
    await homeController.index(req, res, next)
    expect(res.status).toHaveBeenCalledWith(200)
    })

    test('index method should call res.render with home/index', async () => {
      await homeController.index(req, res, next)
      expect(res.render).toHaveBeenCalledWith('home/index')
    })

    test('should handle error in index method', async () => {
      const error = new Error('Test error')
      res.render.mockImplementationOnce(() => {
        throw error
      })
      await homeController.index(req, res, next)
      expect(next).toHaveBeenCalledWith(error)
    })
})