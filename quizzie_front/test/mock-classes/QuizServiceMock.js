import { QuizService } from '../../src/services/QuizService.js'

export class QuizServiceMock extends QuizService {

  #user = {
      username: 'username',
      password: 'password'
    }

  #questions = [
    {
      id: 1,
      question: 'What is the capital of France?',
      answer: 'Paris'
    },
    {
      id: 2,
      question: 'What is the capital of Spain?',
      answer: 'Madrid'
    }
  ]

  constructor() {
    super()
  }

  async getQuestions() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({})
      }, 10)
    })
  }

  async addQuestion() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({})
      }, 10)
    })
  }

  async uploadFile() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({})
      }, 10)
    })
  }

  async getAllQuestions() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({})
      }, 10)
    })
  }

  async updateQuestion() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({})
      }, 10)
    })
  }

  async deleteQuestion() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({})
      }, 10)
    })
  }
}