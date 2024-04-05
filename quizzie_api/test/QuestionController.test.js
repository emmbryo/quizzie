import { QuestionController } from '../src/controllers/QuestionController.js'
import { QuestionServiceMock } from './mock-classes/QuestionServiceMock.js'
import { req, res, next } from './mock-objects/requestCycleObjects.js'

const questionController = new QuestionController(new QuestionServiceMock())

it('calls index function correctly with status 200', async () => {
  await questionController.index(req, res, next)
  expect(res.code).toEqual(200)
  expect(res.data).toEqual({ message: 'Welcome to the question route of the quizzie API!'} )
})

