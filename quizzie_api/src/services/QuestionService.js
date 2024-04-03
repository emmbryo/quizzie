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

}
