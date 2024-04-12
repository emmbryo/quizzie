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
    console.log(size, type, `${process.env.API_BASE_URL}/questions/all?limit=${size}&type=${type}`)
    const response = await fetch(`${process.env.API_BASE_URL}/questions/all?limit=${size}&type=${type}`)
    const data = await response.json()
    console.log(data)
    // return data
  }

}
