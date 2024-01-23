import { PrismaClient } from '@prisma/client'
import { PrismaClient as PrismaEdgeClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const client = () => {
  if (process.env.POSTGRES_PRISMA_URL) {
    return new PrismaEdgeClient({ log: ['info', 'query'] }).$extends(withAccelerate())
  }
  return new PrismaClient({ log: ['info', 'query'] }).$extends(withAccelerate())
}

const c = client()

export default c
