import { useEffect, useRef, useState } from "react"

export function useInView<T extends Element = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.unobserve(el) // fire once, then stop watching
      }
    }, {
      threshold: 0.08,
      rootMargin: "0px 0px -40px 0px",
      ...options
    })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}