import Board from 'domain/board'
import { Range } from 'domain/combo'
import Hand from 'domain/hand'

export const POST = async (request: Request) => {
  const body = (await request.json()) as { vilain: Range; hero: Hand; board: Board }

  const rawResponse = await fetch(`${process.env.API_URL}/vs/range`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const content = (await rawResponse.json()) as string

  return Response.json(content)
}

export const runtime = 'edge'
