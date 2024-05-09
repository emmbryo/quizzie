import { HomeController } from '../src/controllers/HomeController.js'
import { req, res, next } from './mock-objects/requestCycleObjects.js'

const homeController = new HomeController()

const resetRes = () => {
  res.json('')
  res.status(0)
}

describe('HomeController controller constructor', () => {
  test('Constructor should return instance of class HomeController', () => {
    expect(homeController).toBeInstanceOf(HomeController)
  })
})


testStatusCode('index method.',
  'index method should respond with status code 200',
  200,
  homeController.index.bind(homeController))
testRender('index method.',
  'index method should render home/index',
  'home/index',
  homeController.index.bind(homeController))

function testStatusCode (testSuite, testName, statusCode, methodToTest) {
  describe(testSuite, () => {
    test(testName, async () => {

      resetRes()
      await methodToTest(req, res, next)
      expect(res.code).toBe(statusCode)
    })
  })
}

function testRender (testSuite, testName, fileRendered, methodToTest) {
  describe(testSuite, () => {
    test(testName, async () => {

      resetRes()
      await methodToTest(req, res, next)
      expect(res.path).toBe(fileRendered)
    })
  })
}


