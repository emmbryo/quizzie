/**
 * Mongoose model QuestionModel.
 *
 * @author ef222hr
 * @version 1.0.0
 */

import mongoose from 'mongoose'

// Create a schema.
const schema = new mongoose.Schema({
  type: {
    type: String,
    trim: true,
    maxlength: 10,
    required: [true, 'A question type must be given.'],
    enum: ['verbPhrase', 'idioms', 'vocab']
  },
  question: {
    type: String,
    required: [true, 'Question is required.'],
    unique: false,
    maxlength: 200,
  },
  answer: {
    type: String,
    required: [true, 'Answer is required.'],
    unique: false,
    maxlength: 200,
  },
}, {
  timestamps: true,
  toJSON: {
    /**
     * Performs a transformation of the resulting object to remove sensitive information.
     *
     * @param {object} doc - The mongoose document which is being converted.
     * @param {object} ret - The plain object representation which has been converted.
     */
    transform: function (doc, ret) {
      delete ret._id
      delete ret.__v
    },
    virtuals: true // ensure virtual fields are serialized
  }
})

schema.virtual('id').get(function () {
  return this._id.toHexString()
})

// Create a model using the schema.
export const QuestionModel = mongoose.model('Question', schema)
