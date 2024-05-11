import { QuestionService } from '../src/services/QuestionService.js'
import { QuestionRepositoryMock } from './mock-classes/QuestionRepositoryMock.js'



const questionService = new QuestionService(new QuestionRepositoryMock())

describe('Question service constructor', () => {
  test('Constructor should return instance of class QuestionService', () => {
    expect(questionService).toBeInstanceOf(QuestionService)
  })
})

describe('getRandom method', () => {
  test('getRandom method should return an object', async () => {
    const question = await questionService.getRandom({ value: 1 })
    expect(question).toBeInstanceOf(Object)
  })
})

describe('getAll method', () => {
  test('getAll method should return an array', async () => {
    const questions = await questionService.getAll()
    expect(questions).toBeInstanceOf(Array)
  })
})

describe('get method', () => {
  test('get method should return an array', async () => {
    const questions = await questionService.get()
    expect(questions).toBeInstanceOf(Array)
  })
})

describe('getById method', () => {
  test('getById method should return an object', async () => {
    const question = await questionService.getById(1)
    expect(question).toBeInstanceOf(Object)
  })
})

describe('insert method', () => {
  test('insert method should return an object', async () => {
    const question = await questionService.insert({ value: 1 })
    expect(question).toBeInstanceOf(Object)
  })
})

describe('update method', () => {
  test('update method should return an object', async () => {
    const question = await questionService.update({ value: 1 })
    expect(question).toBeInstanceOf(Object)
  })
})

describe('delete method', () => {
  test('delete method should return an object', async () => {
    const question = await questionService.delete(1)
    expect(question).toBeInstanceOf(Object)
  })
})
