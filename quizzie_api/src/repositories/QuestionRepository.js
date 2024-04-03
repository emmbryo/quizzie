/**
 * Module for QuestionRepository.
 *
 * @author ef222hr
 * @version 1.0.0
 */

import { MongooseRepositoryBase } from './MongooseRepositoryBase.js'
import { QuestionModel } from '../models/QuestionModel.js'

/**
 * Encapsulates a user repository.
 */
export class QuestionRepository extends MongooseRepositoryBase {
  /**
   * Initializes a new instance.
   *
   * @param {QuestionModel} [model=QuestionModel] - A class with the same capabilities as QuestionModel.
   */
  constructor (model = QuestionModel) {
    super(model)
  }
}
