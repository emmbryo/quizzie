import { QuestionService } from '../../src/services/QuestionService.js'

export class QuestionServiceMock extends QuestionService {

  #questions = [
    {
      id: 1,
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Madrid'],
      answer: 'Paris',
    },
    {
      id: 2,
      question: 'What is the capital of Germany?',
      options: ['Paris', 'London', 'Berlin', 'Madrid'],
      answer: 'Berlin',
    }
  ]

  constructor() {
    super()
  }

  async getSelectedQuestions() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.#questions);
      }, 10)
    })
  }

  async getAll() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.#questions);
      }, 10)
    })
  }

  
  async getRandom() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.#questions)
      }, 10)
    })
  }
  
  async get(query) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.#questions)
      }, 10)
    })
  }

  async getRandom(query) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.#questions)
      }, 10)
    })
  }
  
  async getById(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.#questions[0])
      }, 10)
    })
  }
  
  async insert(data) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.#questions[0])
      }, 10)
    })
  }

}