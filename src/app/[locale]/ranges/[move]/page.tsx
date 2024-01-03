'use client'

import Move, { moveToUrlParam } from 'domain/move'
import Position from 'domain/position'
import { usePathname, useRouter } from 'next/navigation'

const Ranges = () => {
  const router = useRouter()
  const pathname = usePathname()

  router.push(`${pathname}/${moveToUrlParam(Move.OPEN)}/${Position.B}`)

  return null
}

export default Ranges
