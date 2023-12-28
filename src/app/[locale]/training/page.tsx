'use client'

import { usePathname, useRouter } from 'next/navigation'

const Training = () => {
  const router = useRouter()
  const pathname = usePathname()

  router.push(`${pathname}/B`)

  return null
}

export default Training
