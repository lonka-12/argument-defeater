import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.REDIS_URL as string,
  token: process.env.REDIS_TOKEN as string,
})

export async function rateLimit(identifier: string) {
  const key = `rate-limit:${identifier}`
  const limit = 5
  const window = 60 * 15 // 15 minutes

  const current = await redis.incr(key)
  if (current === 1) {
    await redis.expire(key, window)
  }

  return {
    success: current <= limit,
    remaining: Math.max(0, limit - current)
  }
}