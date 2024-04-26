/**
 * @file This module contains the options object for the session middleware.
 * @module config/redis
 * @author Emma Fransson
 * @version 1.0.0
 */

import redis from 'redis'
import RedisStore from 'connect-redis'

const redisClient = redis.createClient({
  port: process.env.REDIS_PORT,
  url: process.env.REDIS_HOST
})

redisClient.connect().catch(console.error)

const redisStore = new RedisStore({
  client: redisClient,
  prefix: process.env.REDIS_PREFIX
})

redisClient.on('error', (err) => {
  console.error(`Error connecting to Redis: ${err}`)
})

redisClient.on('ready', () => {
  console.log('Redis client is ready')
})

redisClient.on('end', () => {
  console.log('Connection to Redis has ended')
})

export default redisStore
