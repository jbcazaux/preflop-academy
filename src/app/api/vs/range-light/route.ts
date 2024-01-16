import Board from 'domain/board'
import Hand from 'domain/hand'

export const POST = async (request: Request) => {
  const body = (await request.json()) as { vilain: ReadonlyArray<string>; hero: Hand; board?: Board }

  const rawResponse = await fetch(`${process.env.API_URL}/vs/range-light`, {
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
