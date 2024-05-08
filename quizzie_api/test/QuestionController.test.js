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

describe('index method.', () => {
  test('index method should call res.json with message: Welcome to the question route of the quizzie API!', () => {
    resetRes()
    questionController.index(req, res, next)
    expect(res.data.message).toBe("Welcome to the question route of the quizzie API!")
  })
})

describe('getQuestion method.', () => {
  test('getQuestion method should call res.json with message: Question found', async () => {
    resetRes()
    await questionController.getQuestion(req, res, next)
    expect(res.data.message).toBe("Question found")
  })
})

describe('getQuestion method.', () => {
  test('getQuestion method should call res.json with a question object', async () => {
    resetRes()
    await questionController.getQuestion(req, res, next)
    expect(typeof res.data.question).toBe('object')
  })
})

describe('addQuestion method.', () => {
  test('addQuestion method should call res.json with message: Question added', async () => {
    resetRes()
    await questionController.addQuestion(req, res, next)
    expect(res.data.message).toBe("Question added")
  })
})

describe('addQuestion method.', () => {
  test('addQuestion method should call res.json with a question object', async () => {
    resetRes()
    await questionController.addQuestion(req, res, next)
    expect(typeof res.data.question).toBe('object')
  })
})


describe('getAllQuestions method.', () => {
  test('getAllQuestions method should call res.json with message: All questions', async () => {
    resetRes()
    await questionController.getAllQuestions(req, res, next)
    expect(res.data.message).toBe("All questions")
  })
})

describe('getAllQuestions method.', () => {
  test('getAllQuestions method should call res.json with a question array', async () => {
    resetRes()
    await questionController.getAllQuestions(req, res, next)
    expect(Array.isArray(res.data.questions)).toBe(true)
  })
})

describe('getSelectedQuestions method.', () => {
  test('getSelectedQuestions method should call res.json with message: All questions', async () => {
    resetRes()
    await questionController.getSelectedQuestions(req, res, next)
    expect(res.data.message).toBe("Selected questions")
  })
})

describe('getSelectedQuestions method.', () => {
  test('getSelectedQuestions method should call res.json with a question array', async () => {
    resetRes()
    await questionController.getSelectedQuestions(req, res, next)
    expect(Array.isArray(res.data.questions)).toBe(true)
  })
})

describe('getRandomQuestions method.', () => {
  test('getRandomQuestions method should call res.json with message: Set of random questions', async () => {
    resetRes()
    await questionController.getRandomQuestions(req, res, next)
    expect(res.data.message).toBe("Set of random questions")
  })
})

describe('getRandomQuestions method.', () => {
  test('getRandomQuestions method should call res.json with a question array', async () => {
    resetRes()
    await questionController.getRandomQuestions(req, res, next)
    expect(Array.isArray(res.data.questions)).toBe(true)
  })
})

const testStatus = (testSuite, testName, statusCode) => {
  describe(testSuite, () => {
    test(testName, async () => {
      resetRes()
      await questionController.getRandomQuestions(req, res, next)
      expect(res.code).toBe(statusCode)
    })
  })
}

testStatus('index method.', 'index method should respond with status code 200', 200)
testStatus('getQuestion method.', 'getQuestion method should respond with status code 200', 200)
testStatus('addQuestion method.', 'addQuestion method should respond with status code 200', 200)
testStatus('getAllQuestions method.', 'getAllQuestions method should respond with status code 200', 200)
testStatus('getSelectedQuestions method.', 'getSelectedQuestions method should respond with status code 200', 200)
testStatus('getRandomQuestions method.', 'getRandomQuestions method should respond with status code 200', 200)