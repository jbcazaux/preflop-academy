export const GET = () =>
  Response.json({
    DISABLE_PREFLOP_VERSUS_RANGE: process.env.DISABLE_PREFLOP_VERSUS_RANGE === 'true',
  })

export const runtime = 'edge'
