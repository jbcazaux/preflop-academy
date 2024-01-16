import Hand from 'domain/hand'

export const POST = async (request: Request) => {
  const body = (await request.json()) as { hand: Hand; turn: [number, number, number, number] }
  try {
    const rawResponse = await fetch(`${process.env.API_URL}/improvement/turn`, {
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
    // FIXME: add logger
  }
}

export const runtime = 'edge'
