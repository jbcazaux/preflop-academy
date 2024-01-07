'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

import Move, { moveToUrlParam } from 'domain/move'
import Position from 'domain/position'

const Ranges = () => {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    router.push(`${pathname}/${moveToUrlParam(Move.OPEN)}/${Position.B}`)
  })

  return null
}

export default Ranges
