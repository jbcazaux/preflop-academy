'use client'

import Move from 'domain/move'
import Position from 'domain/position'
import { usePathname, useRouter } from 'next/navigation'

const Training = () => {
  const router = useRouter()
  const pathname = usePathname()

  router.push(`${pathname}/${Position.B}/${Move.OPEN}`)

  return null
}

export default Training
