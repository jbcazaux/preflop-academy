'use client'

import { useEffect } from 'react'

import Move, { moveToUrlParam } from 'domain/move'
import Position from 'domain/position'
import { usePathname, useRouter } from 'i18n/navigation'

const Ranges = () => {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    router.push(`${pathname}/${moveToUrlParam(Move.OPEN)}/${Position.B.toLowerCase()}`)
  })

  return null
}

export default Ranges
