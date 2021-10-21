import { useEffect, useRef, useState } from 'react'

interface State {
  width: number
  height: number
}

const useWindowSize = (): State => {
  const to = useRef<ReturnType<typeof setTimeout>>()

  const [windowSize, setWindowSize] = useState<State>({
    width: 0,
    height: 0,
  })
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    const debounce = () => {
      if (to.current) {
        clearTimeout(to.current)
      }

      to.current = setTimeout(() => {
        handleResize()
      }, 100)
    }

    window.addEventListener('resize', debounce)
    handleResize()
    return () => window.removeEventListener('resize', debounce)
  }, [])
  return windowSize
}

export default useWindowSize
