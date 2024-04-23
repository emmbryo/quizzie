/**
 * Module for bootstrapping.
 *
 * @version 1.0.0
 */

import { IoCContainer } from '../util/IoCContainer.js'

import { QuizService } from '../services/QuizService.js'
import { UserService } from '../services/UserService.js'

import { QuizController } from '../controllers/QuizController.js'
import { UserController } from '../controllers/UserController.js'
import { HomeController } from '../controllers/HomeController.js'

const iocContainer = new IoCContainer()

iocContainer.register('ConnectionString', process.env.DB_CONNECTION_STRING)

// Register services

iocContainer.register('QuizServiceSingleton', QuizService, {
  singleton: true
})

iocContainer.register('UserServiceSingleton', UserService, {
  singleton: true
})

// Register controllers

iocContainer.register('QuizController', QuizController, {
  dependencies: [
    'QuizServiceSingleton'
  ]
})

iocContainer.register('UserController', UserController, {
  dependencies: [
    'UserServiceSingleton'
  ]
})

iocContainer.register('HomeController', HomeController, {

})

export const container = Object.freeze(iocContainer)
