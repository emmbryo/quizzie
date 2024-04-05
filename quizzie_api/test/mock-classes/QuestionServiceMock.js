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

  async getQuestions() {
    return this.#questions
  }

  async getRandom() {
    return this.#questions
  }

  async get (query) {
    return this.#questions
  }

  async getById (id) {
    return this.#questions[0]
  }

  async insert (data) {
    return this.#questions[0]
  }

}