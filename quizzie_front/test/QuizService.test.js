import { QuizService } from '../src/services/QuizService.js'
import fetchMock from 'jest-fetch-mock'
import { jest } from '@jest/globals'
import fs from 'fs'
import exp from 'constants'

global.fetch = fetchMock

const quizService = new QuizService()

describe('QuizService', () => {
  test('Constructor should return instance of class QuizService.', () => {
    expect(quizService).toBeInstanceOf(QuizService)
  })
})

describe('getQuestion method', () => {
  test('getQuestion method should return object.', async () => {
    const mockResponse = { id: 'id' }
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse))

    const result = await quizService.getQuestion('id')
    expect(result).toEqual({ id: 'id' })
  })

  test('getQuestion method should call fetch with question url.', async () => {
    const mockResponse = { id: 'id' }
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse))
    await quizService.getQuestion('id')
    expect(fetch).toHaveBeenCalledWith(`${process.env.API_BASE_URL}/questions/question/id`)
  })

  test('getQuestion method should throw error when fetch failes with status 400.', async () => {
    const mockResponse = { error: 'error' }
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 400 })
    await expect(quizService.getQuestion('id')).rejects.toThrow('Failed to get question')
  })
})

describe('getAllQuestions method', () => {
  test('getAllQuestions method should return object.', async () => {
    const mockResponse = { id: 'id' }
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse))

    const result = await quizService.getAllQuestions('admin')
    expect(result).toEqual({ id: 'id' })
  })

  test('getAllQuestions method should call fetch with all questions url.', async () => {
    const mockResponse = { id: 'id' }
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse))
    await quizService.getAllQuestions('admin')
    expect(fetch).toHaveBeenCalledWith(`${process.env.API_BASE_URL}/questions/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + process.env.QUIZ_API_TOKEN
      }
    })
  })

  test('getAllQuestions method should throw error when fetch failes with status 400.', async () => {
    const mockResponse = { error: 'error' }
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 400 })
    await expect(quizService.getAllQuestions('admin')).rejects.toThrow('Failed to get questions')
  })
})

describe('getQuestions method', () => {
  test('getQuestions method should call fetch with random questions url.', async () => {
    const mockResponse = { questions: [{ id: 'id' }] }
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse))
    await quizService.getQuestions(1, 'mixed')
    expect(fetch).toHaveBeenCalledWith(`${process.env.API_BASE_URL}/questions/random?limit=1`)
  })

  test('getQuestions method should throw error on invalid typ.', async () => {
    const mockResponse = { questions: [{ id: 'id' }] }
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse))
    await expect(quizService.getQuestions(1, 'invalid')).rejects.toThrow('Invalid or missing type')
  })

  test('getQuestions method should throw error when fetch failes with status 400.', async () => {
    const mockResponse = { error: 'error' }
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 400 })
    await expect(quizService.getQuestions(1, 'mixed')).rejects.toThrow('Failed to get questions')
  })
})

describe('transformFunction methods', () => {
  test('transformIdiom method should return transformed object.', () => {
    const question = {
      type: 'idiom',
      question: 'question',
      options: ['one', 'two', 'three'],
      answer: 'answer'
    }
    const result = quizService.transformIdiom(question)
    expect(result.type).toEqual('idiom')
    expect(result.question).toEqual('question')
    expect(result.answer).toEqual('answer')
    expect(result.options.includes('one')).toBe(true)
    expect(result.options.includes('two')).toBe(true)
    expect(result.options.includes('three')).toBe(true)
  })

  test('transformVocab method should return transformed object.', () => {
    const question = {
      type: 'vocab',
      question: 'question',
      answer: 'answer'
    }
    const result = quizService.transformVocab(question)
    expect(result.type).toEqual('vocab')
    expect(result.question).toEqual('question')
    expect(result.answer).toEqual('answer')
  })

  test('transformVerbPhrase method should return transformed object.', () => {
    const question = {
      type: 'verbPhrase',
      question: 'question',
      answer: 'answer',
      meaning: 'meaning',
      examples: 'examples'
    }
    const result = quizService.transformVerbPhrase(question)
    expect(result.type).toEqual('verbPhrase')
    expect(result.question).toEqual('question')
    expect(result.answer).toEqual('answer')
    expect(result.meaning).toEqual('meaning')
    expect(result.examples).toEqual('examples')
  })

  test('transformMixed method should return transformed object.', () => {
    const questions = [
      { type: 'idiom', question: 'question', options: ['one', 'two', 'three'], answer: 'answer' },
      { type: 'vocab', question: 'question', answer: 'answer' },
      { type: 'verbPhrase', question: 'question', answer: 'answer', meaning: 'meaning', examples: 'examples' }
    ]
    const result = quizService.transformMixed(questions)
    expect(result.length).toEqual(3)
    expect(result[0].type).toEqual('idiom')
    expect(result[1].type).toEqual('vocab')
    expect(result[2].type).toEqual('verbPhrase')
  })
})

describe('getQuestions method', () => {
  testCallingTransformFunctions('idiom', 'transformIdiom', 3, ['transformed', 'transformed', 'transformed'])
  testCallingTransformFunctions('vocab', 'transformVocab', 3, ['transformed', 'transformed', 'transformed'])
  testCallingTransformFunctions('verbPhrase', 'transformVerbPhrase', 3, ['transformed', 'transformed', 'transformed'])

  test('getQuestions method should transform questions based on type = mixed', async () => {
    const mockData = {
      questions: [{question: {}}, {question: {}}, {question: {}}]
    }

    const response = {
      json: jest.fn().mockResolvedValueOnce(mockData),
      ok: true,
      status: 200
    }
    global.fetch = jest.fn().mockResolvedValueOnce(response);

    jest.spyOn(quizService, 'transformMixed').mockReturnValue('transformedMixed')

    const result = await quizService.getQuestions(3, 'mixed')

    expect(quizService['transformMixed']).toHaveBeenCalled()
    expect(result).toEqual({
      type: 'mixed',
      questions: 'transformedMixed'
    })
  })
})

  function testCallingTransformFunctions(type, transformFunction, size, questionsReturnValue) {
    test(`getQuestions method should transform questions based on type = ${type}`, async () => {
      const mockData = {
        questions: [{question: {}}, {question: {}}, {question: {}}]
      }
  
      const response = {
        json: jest.fn().mockResolvedValueOnce(mockData),
        ok: true,
        status: 200
      }
      global.fetch = jest.fn().mockResolvedValueOnce(response)
  
      jest.spyOn(quizService, transformFunction).mockReturnValue('transformed')
  
      const result = await quizService.getQuestions(size, type)
  
      expect(quizService[transformFunction]).toHaveBeenCalledTimes(mockData.questions.length)
      expect(result).toEqual({
        type: type,
        questions: questionsReturnValue
      })
    })
  }

  

  describe('addQuestion method', () => {
    test('addQuestion method should call fetch with add question url.', async () => {
      const mockData = { id: 'id' }
      const response = {
        json: jest.fn().mockResolvedValueOnce(mockData),
        ok: true,
        status: 200
      }
      global.fetch = jest.fn().mockResolvedValueOnce(response)

      await quizService.addQuestion({ type: 'vocab' })
      expect(fetch).toHaveBeenCalledWith(process.env.QUESTION_UPLOAD_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type: 'vocab' })
      })
    })

    test('addQuestion method should throw error when fetch failes with status 400.', async () => {
      const mockData = { id: 'id' }
      const response = {
        json: jest.fn().mockResolvedValueOnce(mockData),
        ok: false,
        status: 400
      }
      global.fetch = jest.fn().mockResolvedValueOnce(response)

      await expect(quizService.addQuestion({ type: 'vocab' })).rejects.toThrow('Failed to add question')
    })

    test('addQuestion method should build options when type = idiom', async () => {
      const mockData = { id: 'id' }
      const response = {
        json: jest.fn().mockResolvedValueOnce(mockData),
        ok: true,
        status: 200
      }
      global.fetch = jest.fn().mockResolvedValueOnce(response)

      await quizService.addQuestion({ type: 'idiom', optionOne: 'one', optionTwo: 'two', optionThree: 'three' })
      expect(fetch).toHaveBeenCalledWith(process.env.QUESTION_UPLOAD_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type: 'idiom', optionOne: 'one', optionTwo: 'two', optionThree: 'three', options: ['one', 'two', 'three'] })
      })
    })
  })

  describe('uploadFile method', () => {
    test('uploadFile method should call addQuestion for each question in file.', async () => {
      const mockData = { questions: [{ type: 'vocab' }, { type: 'idiom' }] }
      const response = {
        json: jest.fn().mockResolvedValueOnce(mockData),
        ok: true,
        status: 200
      }
      global.fetch = jest.fn().mockResolvedValueOnce(response)

      const mockJson = JSON.stringify(mockData);

      jest.spyOn(fs, 'readFileSync').mockReturnValue(mockJson)
      jest.spyOn(JSON, 'parse').mockReturnValue(mockData)
      jest.spyOn(quizService, 'addQuestion').mockResolvedValueOnce('added')

      await quizService.uploadFile({ path: 'path' })
      expect(quizService['addQuestion']).toHaveBeenCalledTimes(mockData.questions.length)
    })

    test('uploadFile method should throw error when addQuestion throws error.', async () => {
      const mockData = { questions: [{ type: 'vocab' }, { type: 'idiom' }] }
      const response = {
        json: jest.fn().mockResolvedValueOnce(mockData),
        ok: true,
        status: 200
      }
      global.fetch = jest.fn().mockResolvedValueOnce(response)

      jest.spyOn(quizService, 'addQuestion').mockRejectedValueOnce('error')

      await expect(quizService.uploadFile({ path: 'path' })).rejects.toThrow('Failed to upload file')
    })
  })

  describe('updateQuestion method', () => {
    test('updateQuestion method should call fetch with update question url.', async () => {
      const mockData = { id: 'id' }
      const response = {
        json: jest.fn().mockResolvedValueOnce(mockData),
        ok: true,
        status: 200
      }
      global.fetch = jest.fn().mockResolvedValueOnce(response)

      await quizService.updateQuestion('id', { type: 'vocab' })
      expect(fetch).toHaveBeenCalledWith(`${process.env.API_BASE_URL}/questions/id`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.QUIZ_API_TOKEN}`
        },
        body: JSON.stringify({ type: 'vocab' })
      })
    })

    test('updateQuestion method should throw error when fetch failes with status 400.', async () => {
      const mockData = { id: 'id' }
      const response = {
        json: jest.fn().mockResolvedValueOnce(mockData),
        ok: false,
        status: 400
      }
      global.fetch = jest.fn().mockResolvedValueOnce(response)

      await expect(quizService.updateQuestion('id', { type: 'vocab' })).rejects.toThrow('Failed to edit question')
    })
  })

  describe('deleteQuestion method', () => {
    test('deleteQuestion method should call fetch with delete question url.', async () => {
      const response = {
        ok: true,
        status: 204
      }
      global.fetch = jest.fn().mockResolvedValueOnce(response)

      await quizService.deleteQuestion('id')
      expect(fetch).toHaveBeenCalledWith(`${process.env.API_BASE_URL}/questions/id`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.QUIZ_API_TOKEN}`
        }
      })
    })

    test('deleteQuestion method should throw error when fetch failes with status 400.', async () => {
      const response = {
        ok: false,
        status: 400
      }
      global.fetch = jest.fn().mockResolvedValueOnce(response)

      await expect(quizService.deleteQuestion('id')).rejects.toThrow('Failed to delete question')
    })
  })