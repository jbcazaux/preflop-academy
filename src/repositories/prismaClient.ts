import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const client = new PrismaClient({ log: ['info'] }).$extends(withAccelerate())

export default client
