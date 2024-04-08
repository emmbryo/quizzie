/**
 * Mongoose configuration.
 *
 * @version 1.0.0
 */

import mongoose from 'mongoose'

/**
 * Establishes a connection to a database.
 *
 * @param {string} connectionString - The connection used to open the MongoDB database.
 * @returns {Promise} Resolves to this if connection succeeded.
 */
export const connectDB = async (connectionString) => {
  const { connection } = mongoose

  // Bind connection to events (to get notifications).
  connection.on('connected', () => console.log('MongoDB connection opened.'))
  connection.on('error', err => console.error(`MongoDB connection error occurred: ${err}`))
  connection.on('disconnected', () => console.log('MongoDB is disconnected.'))

  // If the Node.js process ends, close the connection.
  for (const signalEvent of ['SIGINT', 'SIGTERM']) {
    process.on(signalEvent, () => {
      (async () => {
        await connection.close()
        console.log(`Mongoose disconnected from MongoDB through ${signalEvent}.`)
        process.exit(0)
      })()
    })
  }

  // Connect to the server.
  return mongoose.connect(connectionString)
}
