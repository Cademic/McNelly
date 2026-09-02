import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Stagger in ms, applied as transition-delay. */
  delay?: number
}

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Scroll reveal: slides up 20px and fades in once on first scroll into view.
 * Fully respects prefers-reduced-motion — when reduced, content renders in
 * place with no transform or transition.
 */
export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.7, ease: EASE, delay: delay / 1000 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      {children}
    </motion.div>
  )
}
