import { PrismaClient as PrismaEdgeClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const client = new PrismaEdgeClient({ log: ['info', 'query'] }).$extends(withAccelerate())

export default client
