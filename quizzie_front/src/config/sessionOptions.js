/**
 * @file This module contains the options object for the session middleware.
 * @module config/mongoose
 * @author Mats Loock
 * @version 1.0.0
 * @see {@link https://github.com/expressjs/session}
 */
import redisStore from './redis.js'
// Options object for the session middleware.
export const sessionOptions = {
  store: redisStore,
  name: process.env.SESSION_NAME, // Don't use default session cookie name.
  secret: process.env.SESSION_SECRET, // Change it!!! The secret is used to hash the session with HMAC.
  resave: false, // Resave even if a request is not changing the session.
  saveUninitialized: false, // Don't save a created but not modified session.
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    sameSite: 'strict'
  },
  secure: false
}

// if (process.env.NODE_ENV === 'production') {
//   sessionOptions.cookie.secure = true // serve secure cookies
// }
