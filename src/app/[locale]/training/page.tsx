'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

import Move, { moveToUrlParam } from 'domain/move'
import Position from 'domain/position'

const Training = () => {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    router.push(`${pathname}/${moveToUrlParam(Move.OPEN)}/${Position.B}/`)
  })
  return null
}

export default Training
