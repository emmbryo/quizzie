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
    console.log(data)
    if (type === 'idiom') {
      return data.questions.map(question => this.transformIdiom(question))
    } else if (type === 'vocab') {
      return data.questions.map(question => this.transformVocab(question))
    } else if (type === 'verbPhrase') {
      return data.questions.map(question => this.transformVerbPhrase(question))
    } else if (type === 'mixed') {
      return this.transformMixed(data.questions)
    } else {
      throw Error('Invalid type')
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
        answers: this.transformToString(question.options),
        correctAnswer: question.answer
      }
  }

  transformToString (rawAnswers) {
    const answers = this.shuffleArray(rawAnswers)
    let answersAsText = '['
    answers.forEach(answer => {
      answersAsText += '\"' + answer + '\"' + ', '
    })
    return answersAsText.slice(0, answersAsText.length - 2) + ']'
  }

  transformVocab (question) {
      return {
        type: question.type,
        question: question.question,
        correctAnswer: question.answer
      }
  }

  transformVerbPhrase (question) {
      return {
        type: question.type,
        question: question.question,
        meaning: question.meaning,
        examples: question.examples,
        correctAnswer: question.answer
      }
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
