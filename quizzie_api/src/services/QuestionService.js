/**
 * Module for the QuestionService.
 *
 * @author ef222hr
 * @version 1.0.0
 */

import { MongooseServiceBase } from './MongooseServiceBase.js'
import { QuestionRepository } from '../repositories/QuestionRepository.js'

/**
 * Encapsulates a tandem service.
 */
export class QuestionService extends MongooseServiceBase {
  /**
   * Initializes a new instance.
   *
   * @param {QuestionRepository} [repository=new QuestionRepository()] - A repository instantiated from a class with the same capabilities as QuestionRepository.
   */
  constructor (repository = new QuestionRepository()) {
    super(repository)
  }
  
  /**
   * Gets a random question.
   *
   * @returns {Promise<object>} Promise resolved with a random question as a plain JavaScript object.
   */
  async getRandom () {
    // TODO: Implement getting a determined number of random questions.
    return this._repository.get({ limit: 5 })
  }

}
