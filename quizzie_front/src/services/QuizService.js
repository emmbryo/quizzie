/**
 * Module for the QuizService.
 *
 * @author ef222hr
 * @version 1.0.0
 */

/**
 * Encapsulates a tandem service.
 */
export class QuizService {

  async getQuestions(size, type) {
    console.log(size, type) 
    const response = type === 'mixed' ? await fetch(`${process.env.API_BASE_URL}/questions/random?limit=${size}`) : await fetch(`${process.env.API_BASE_URL}/questions/all?limit=${size}&type=${type}`)
    const data = await response.json()
    if (type === 'idiom') {
      return {
        type: 'idiom',
        questions: data.questions.map(question => this.transformIdiom(question))
      }
    } else if (type === 'vocab') {
      return {
        type: 'vocab',
        questions: data.questions.map(question => this.transformVocab(question))
      }
    } else if (type === 'verbPhrase') {
      return {
        type: 'verbPhrase',
        questions: data.questions.map(question => this.transformVerbPhrase(question))
      }
    } else if (type === 'mixed') {
      return {
        type: 'mixed',
        questions: this.transformMixed(data.questions)
      }
    } else {
      throw Error('Invalid or missing type')
    }
  }

  async getSameCategoryQuestions (questions, type) {
    return fetch(`${process.env.API_BASE_URL}/questions/all?limit=${size}&type=${type}`)
  }

  transformMixed (questions) {
    // console.log(questions)
    return questions.map(question => { 
      if (question.type === 'idiom') {
        return this.transformIdiom(question)
      } else if (question.type === 'vocab') {
        return this.transformVocab(question)
      } else if (question.type === 'verbPhrase') {
        return this.transformVerbPhrase(question)
      }
    })
  }

  transformIdiom (question) {
      return {
        type: question.type,
        question: question.question,
        options: this.transformToString(question.options),
        answer: question.answer
      }
  }

  transformToString (rawAnswers) {
    const answers = this.shuffleArray(rawAnswers)
    return JSON.stringify(answers)
  }

  transformVocab (question) {
      return {
        type: question.type,
        question: question.question,
        answer: question.answer
      }
  }

  transformVerbPhrase (question) {
      return {
        type: question.type,
        question: question.question,
        meaning: question.meaning,
        examples: question.examples,
        answer: question.answer
      }
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  async addQuestion (data) {
    if (data.type === 'idiom') {
      const options = [data.optionOne, data.optionTwo, data.optionThree]
      data.options = options
    }

    const response = await fetch(process.env.QUESTION_UPLOAD_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Failed to add question')
    }
    return response.json()
  }
}
