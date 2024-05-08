import { QuestionController } from '../src/controllers/QuestionController.js'
import { QuestionServiceMock } from './mock-classes/QuestionServiceMock.js'
import { req, res, next } from './mock-objects/requestCycleObjects.js'

const questionController = new QuestionController(new QuestionServiceMock())

const resetRes = () => {
  res.json('')
  res.status(0)
}

describe('Question controller constructor', () => {
  test('Constructor should return instance of class QuestionController', () => {
    expect(questionController).toBeInstanceOf(QuestionController)
  })
})


testStatusCode('index method.',
  'index method should respond with status code 200',
  200,
  questionController.index.bind(questionController))
testMessage('index method.',
  'index method should respond with message: Welcome to the question route of the quizzie API!',
  'Welcome to the question route of the quizzie API!',
  questionController.index.bind(questionController))

testStatusCode('getQuestion method.', 
  'getQuestion method should respond with status code 200',
  200,
  questionController.getQuestion.bind(questionController))
testMessage('getQuestion method.',
  'getQuestion method should respond with message: Question found', 
  'Question found',
  questionController.getQuestion.bind(questionController))
testReturnsObject('getQuestion method.',
  'getQuestion method should respond with a question object',
  questionController.getQuestion.bind(questionController))

testStatusCode('addQuestion method.',
  'addQuestion method should respond with status code 200',
  200,
  questionController.addQuestion.bind(questionController))
testMessage('addQuestion method.',
  'addQuestion method should respond with message: Question added',
  'Question added', questionController.addQuestion.bind(questionController))
testReturnsObject('addQuestion method.',
  'addQuestion method should respond with a question object',
  questionController.addQuestion.bind(questionController))

testStatusCode('getAllQuestions method.',
  'getAllQuestions method should respond with status code 200',
  200,
  questionController.getAllQuestions.bind(questionController))
testMessage('getAllQuestions method.',
  'getAllQuestions method should respond with message: All questions',
  'All questions',
  questionController.getAllQuestions.bind(questionController))
testReturnsArray('getAllQuestions method.',
  'getAllQuestions method should respond with an array of questions',
  questionController.getAllQuestions.bind(questionController))

testStatusCode('getSelectedQuestions method.',
  'getSelectedQuestions method should respond with status code 200',
  200,
  questionController.getSelectedQuestions.bind(questionController))
testMessage('getSelectedQuestions method.',
  'getSelectedQuestions method should respond with message: Selected questions',
  'Selected questions',
  questionController.getSelectedQuestions.bind(questionController))
testReturnsArray('getSelectedQuestions method.',
  'getSelectedQuestions method should respond with an array of questions',
  questionController.getSelectedQuestions.bind(questionController))

testStatusCode('getRandomQuestions method.',
  'getRandomQuestions method should respond with status code 200',
  200,
  questionController.getRandomQuestions.bind(questionController))
testMessage('getRandomQuestions method.',
  'getRandomQuestions method should respond with message: Set of random questions',
  'Set of random questions',
  questionController.getRandomQuestions.bind(questionController))
testReturnsArray('getRandomQuestions method.',
  'getRandomQuestions method should respond with an array of questions',
  questionController.getRandomQuestions.bind(questionController))

testStatusCode('updateQuestion method.',
  'updateQuestion method should respond with status code 200',
  200,
  questionController.updateQuestion.bind(questionController))
testMessage('updateQuestion method.',
  'updateQuestion method should respond with message: Question updated',
  'Question updated',
  questionController.updateQuestion.bind(questionController))
testReturnsObject('updateQuestion method.',
  'updateQuestion method should respond with a question object',
  questionController.updateQuestion.bind(questionController))

testStatusCode('deleteQuestion method.',
  'deleteQuestion method should respond with status code 204',
  204,
  questionController.deleteQuestion.bind(questionController))
describe('deleteQuestion method.', () => {
  test('deleteQuestion method should call the res.end() method', async () => {
    resetRes()
    await questionController.deleteQuestion(req, res, next)
    expect(res.endCalled).toEqual(true)
  })
})

function testStatusCode (testSuite, testName, statusCode, methodToTest) {
  describe(testSuite, () => {
    test(testName, async () => {

      resetRes()
      await methodToTest(req, res, next)
      expect(res.code).toBe(statusCode)
    })
  })
}

function testMessage (testSuite, testName, message, methodToTest) {
  describe(testSuite, () => {
    test(testName, async () => {
      resetRes()
      await methodToTest(req, res, next)
      expect(res.data.message).toBe(message)
    })
  })
}

function testReturnsArray (testSuite, testName, methodToTest) {
  describe(testSuite, () => {
    test(testName, async () => {
      resetRes()
      await methodToTest(req, res, next)
      expect(Array.isArray(res.data.questions)).toBe(true)
    })
  })
}

function testReturnsObject (testSuite, testName, methodToTest) {
  describe(testSuite, () => {
    test(testName, async () => {
      resetRes()
      await methodToTest(req, res, next)
      expect(typeof res.data.question).toBe('object')
    })
  })
}

describe('checkLimit method.', () => {
  process.env.MAX_LIMIT = '100'
  test('checkLimit method should throw an error if limit query is not in number format', () => {
    req.query.limit = 'not a number'
    expect(() => questionController.checkLimit(req)).toThrow()
  })
  test('checkLimit method should throw an error if limit query is greater than the maximum value', () => {
    req.query.limit = 101
    expect(() => questionController.checkLimit(req)).toThrow()
  })
  test('checkLimit method should throw an error if limit query is lower than one', () => {
    req.query.limit = 0
    expect(() => questionController.checkLimit(req)).toThrow()
  })
  test('checkLimit method should not throw an error if limit query is in number format and within the range', () => {
    req.query.limit = 5
    expect(() => questionController.checkLimit(req)).not.toThrow()
  })
})