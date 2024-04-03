/**
 * Module for bootstrapping.
 *
 * @version 1.0.0
 */

import { IoCContainer } from '../util/IoCContainer.js'

import { QuestionModel } from '../models/QuestionModel.js'

import { QuestionRepository } from '../repositories/QuestionRepository.js'

import { QuestionService } from '../services/QuestionService.js'

import { QuestionController } from '../controllers/QuestionController.js'

const iocContainer = new IoCContainer()

iocContainer.register('ConnectionString', process.env.DB_CONNECTION_STRING)

iocContainer.register('QuestionModelType', QuestionModel, { type: true })

// Register repositories

iocContainer.register('QuestionRepositorySingleton', QuestionRepository, {
  dependencies: [
    'QuestionModelType'
  ],
  singleton: true
})

// Register services

iocContainer.register('QuestionServiceSingleton', QuestionService, {
  dependencies: [
    'QuestionRepositorySingleton'
  ],
  singleton: true
})

// Register controllers

iocContainer.register('QuestionController', QuestionController, {
  dependencies: [
    'QuestionServiceSingleton'
  ]
})

export const container = Object.freeze(iocContainer)
