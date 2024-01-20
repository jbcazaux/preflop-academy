import Hand from 'domain/hand'
import logger from 'utils/logger'

export const POST = async (request: Request) => {
  const body = (await request.json()) as { hand: Hand; flop: [number, number, number] }

  try {
    const rawResponse = await fetch(`${process.env.API_URL}/improvement/flop`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const content = (await rawResponse.json()) as string

    return Response.json(content)
  } catch (e) {
    logger.error(e)
  }
}

export const runtime = 'edge'
