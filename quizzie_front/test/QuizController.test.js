import { QuizController } from '../src/controllers/QuizController.js'
import { QuizServiceMock } from './mock-classes/QuizServiceMock.js'
import { jest } from '@jest/globals'

// jest.mock('../src/services/QuizService.js')

let req
let res
let next


const quizService = new QuizServiceMock()
const quizController = new QuizController(quizService)

describe('QuizController controller constructor', () => {
  test('Constructor should return instance of class QuizController', () => {
    expect(quizController).toBeInstanceOf(QuizController)
  })
})

describe('index method', () => {

  beforeEach(() => {
    req = jest.fn()
    res = { status: jest.fn().mockReturnThis(), render: jest.fn() }
    next = jest.fn()
    })

    test('index method should return status code 200', async () => {
    await quizController.index(req, res, next)
    expect(res.status).toHaveBeenCalledWith(200)
    })

    test('index method should call res.render with quiz/menu', async () => {
      await quizController.index(req, res, next)
      expect(res.render).toHaveBeenCalledWith('quiz/menu')
    })

    test('should handle error in index method', async () => {
      const error = new Error('Test error')
      res.render.mockImplementationOnce(() => {
        throw error
      })
      await quizController.index(req, res, next)
      expect(next).toHaveBeenCalledWith(error)
    })
})

describe('getQuestions method', () => {

  beforeEach(() => {
    req = { body: { size: 2, quizOption: 'idiom'}, session: { flash: {} } }
    res = { status: jest.fn().mockReturnThis(), render: jest.fn(), redirect: jest.fn()}
    next = jest.fn()
    })

    test('getQuestions method should return status code 200', async () => {
    await quizController.getQuestions(req, res, next)
    expect(res.status).toHaveBeenCalledWith(200)
    })

    test('getQuestions method should call res.render with quiz/game, {\'viewData\': {}}', async () => {
      await quizController.getQuestions(req, res, next)
      expect(res.render).toHaveBeenCalledWith('quiz/game', {'viewData': {}})
    })

    test('should handle error in getQuestions method', async () => {
      const error = new Error('Test error')
      res.render.mockImplementationOnce(() => {
        throw error
      })
      await quizController.getQuestions(req, res, next)
      expect(res.redirect).toHaveBeenCalledWith('./quiz')
    })
})

describe('showUpload method', () => {

  beforeEach(() => {
    req = jest.fn()
    res = { status: jest.fn().mockReturnThis(), render: jest.fn() }
    next = jest.fn()
    })

    test('showUpload method should return status code 200', async () => {
    await quizController.showUpload(req, res, next)
    expect(res.status).toHaveBeenCalledWith(200)
    })

    test('showUpload method should call res.render with quiz/upload', async () => {
      await quizController.showUpload(req, res, next)
      expect(res.render).toHaveBeenCalledWith('quiz/upload')
    })

    test('should handle error in index method', async () => {
      const error = new Error('Test error')
      res.render.mockImplementationOnce(() => {
        throw error
      })
      await quizController.showUpload(req, res, next)
      expect(next).toHaveBeenCalledWith(error)
    })
})

describe('uploadQuestion method', () => {

  beforeEach(() => {
    req = { body: { size: 2, quizOption: 'idiom'}, session: { flash: {} }, file: {} }
    res = { status: jest.fn().mockReturnThis(), render: jest.fn(), redirect: jest.fn()}
    next = jest.fn()
    })

    test('uploadQuestion method should call res.redirect with ../quiz/upload', async () => {
      await quizController.uploadQuestion(req, res, next)
      expect(res.redirect).toHaveBeenCalledWith('../quiz/upload')
    })

    test('should handle error in getQuestions method', async () => {
      const error = new Error('Test error')
      res.redirect.mockImplementationOnce(() => {
        throw error
      })
      await quizController.uploadQuestion(req, res, next)
      expect(res.redirect).toHaveBeenCalledWith('../quiz')
    })
})

describe('uploadFile method', () => {

  beforeEach(() => {
    req = { body: { size: 2, quizOption: 'idiom'}, session: { flash: {} }, file: {} }
    res = { status: jest.fn().mockReturnThis(), render: jest.fn(), redirect: jest.fn()}
    next = jest.fn()
    })

    test('uploadFile method should call res.redirect with ../quiz/upload', async () => {
      await quizController.uploadFile(req, res, next)
      expect(res.redirect).toHaveBeenCalledWith('../quiz/upload')
    })

    test('should handle error in getQuestions method', async () => {
      const error = new Error('Test error')
      res.redirect.mockImplementationOnce(() => {
        throw error
      })
      await quizController.uploadFile(req, res, next)
      expect(res.redirect).toHaveBeenCalledWith('../quiz')
    })
})

describe('showEdit method', () => {

  beforeEach(() => {
    req = { session: { user: 'user', role: 'admin' }} 
    res = { status: jest.fn().mockReturnThis(), render: jest.fn() }
    next = jest.fn()
    })

    test('showEdit method should return status code 200', async () => {
    await quizController.showEdit(req, res, next)
    expect(res.status).toHaveBeenCalledWith(200)
    })

    test('showEdit method should call res.render with quiz/edit', async () => {
      await quizController.showEdit(req, res, next)
      expect(res.render).toHaveBeenCalledWith('quiz/edit', {viewData: {} })
    })

    test('should handle error in showEdit method', async () => {
      const error = new Error('Test error')
      res.render.mockImplementationOnce(() => {
        throw error
      })
      await quizController.showEdit(req, res, next)
      expect(next).toHaveBeenCalledWith(error)
    })
})

describe('updateQuestion method', () => {

  beforeEach(() => {
    req = { 
      body: { size: 2, quizOption: 'idiom' }, 
      session: { 
        flash: {
          type: '',
          text: ''
        }, 
        user: { 
          username: 'user', 
          role: 'admin' }
      }, 
      params: { 
        id: 'id' 
      }
    }
    res = { status: jest.fn().mockReturnThis(), redirect: jest.fn()}
    next = jest.fn()
    })

    test('updateQuestion method should call res.redirect with ../edit', async () => {
      await quizController.updateQuestion(req, res, next)
      expect(req.session.flash.type).toBe('success')
      expect(res.redirect).toHaveBeenCalledWith('../edit')
    })

    test('should handle error in updateQuestion method', async () => {
      const error = new Error('Test error')
      res.redirect.mockImplementationOnce(() => {
        throw error
      })
      await quizController.updateQuestion(req, res, next)
      expect(req.session.flash.type).toBe('danger')
      expect(res.redirect).toHaveBeenCalledWith('../edit')
    })
})

describe('deleteQuestion method', () => {

  beforeEach(() => {
    req = { 
      body: { size: 2, quizOption: 'idiom' }, 
      session: { 
        flash: {
          type: '',
          text: ''
        }, 
        user: { 
          username: 'user', 
          role: 'admin' }
      }, 
      params: { 
        id: 'id' 
      }
    }
    res = { status: jest.fn().mockReturnThis(), redirect: jest.fn()}
    next = jest.fn()
    })

    test('deleteQuestion method should call res.redirect with ../edit', async () => {
      await quizController.deleteQuestion(req, res, next)
      expect(req.session.flash.type).toBe('success')
      expect(res.redirect).toHaveBeenCalledWith('../edit')
    })

    test('should handle error in deleteQuestion method', async () => {
      const error = new Error('Test error')
      res.redirect.mockImplementationOnce(() => {
        throw error
      })
      await quizController.deleteQuestion(req, res, next)
      expect(req.session.flash.type).toBe('danger')
      expect(res.redirect).toHaveBeenCalledWith('../edit')
    })
})