'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

// Default animation settings
export const defaultEase = 'power3.out'
export const defaultDuration = 0.8

// Animation presets
export const animationPresets = {
  fadeUp: {
    from: { opacity: 0, y: 60 },
    to: { opacity: 1, y: 0, duration: defaultDuration, ease: defaultEase }
  },
  fadeDown: {
    from: { opacity: 0, y: -60 },
    to: { opacity: 1, y: 0, duration: defaultDuration, ease: defaultEase }
  },
  fadeLeft: {
    from: { opacity: 0, x: -60 },
    to: { opacity: 1, x: 0, duration: defaultDuration, ease: defaultEase }
  },
  fadeRight: {
    from: { opacity: 0, x: 60 },
    to: { opacity: 1, x: 0, duration: defaultDuration, ease: defaultEase }
  },
  scaleUp: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1, duration: defaultDuration, ease: 'back.out(1.5)' }
  },
  reveal: {
    from: { clipPath: 'inset(0 100% 0 0)' },
    to: { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power4.inOut' }
  }
}

// Hook for scroll-triggered animations
export function useScrollAnimation(
  options: {
    trigger?: string
    start?: string
    end?: string
    scrub?: boolean | number
    markers?: boolean
    once?: boolean
  } = {}
) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const {
    trigger,
    start = 'top 80%',
    end = 'bottom 20%',
    scrub = false,
    markers = false,
    once = true
  } = options

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Animate all children with data-animate attribute
      const elements = containerRef.current?.querySelectorAll('[data-animate]')
      
      elements?.forEach((el, index) => {
        const animType = el.getAttribute('data-animate') || 'fadeUp'
        const delay = parseFloat(el.getAttribute('data-delay') || '0') + index * 0.1
        const preset = animationPresets[animType as keyof typeof animationPresets] || animationPresets.fadeUp

        gsap.fromTo(el, preset.from, {
          ...preset.to,
          delay,
          scrollTrigger: {
            trigger: trigger || el,
            start,
            end,
            scrub,
            markers,
            toggleActions: once ? 'play none none none' : 'play reverse play reverse'
          }
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [trigger, start, end, scrub, markers, once])

  return containerRef
}

// Hook for staggered animations
export function useStaggerAnimation(staggerDelay = 0.1) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll('[data-stagger]')
      
      if (items?.length) {
        gsap.fromTo(items, 
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: staggerDelay,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [staggerDelay])

  return containerRef
}

// Hook for text reveal animation (split text effect)
export function useTextReveal() {
  const textRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const text = textRef.current
    const chars = text.textContent?.split('') || []
    text.innerHTML = chars.map(char => 
      `<span class="inline-block" style="opacity:0;transform:translateY(100%)">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('')

    const charElements = text.querySelectorAll('span')

    const ctx = gsap.context(() => {
      gsap.to(charElements, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.02,
        scrollTrigger: {
          trigger: text,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return textRef
}

// Magnetic button effect
export function useMagneticEffect(strength = 0.3) {
  const buttonRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!buttonRef.current) return

    const button = buttonRef.current
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      
      gsap.to(button, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      })
    }

    button.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      button.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength])

  return buttonRef
}

// Parallax scroll effect
export function useParallax(speed = 0.5) {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(elementRef.current, {
        y: () => window.innerHeight * speed * -1,
        ease: 'none',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })
    })

    return () => ctx.revert()
  }, [speed])

  return elementRef
}

// 3D tilt effect on hover
export function useTiltEffect(maxTilt = 10) {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      gsap.to(element, {
        rotateX: -y * maxTilt,
        rotateY: x * maxTilt,
        transformPerspective: 1000,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out'
      })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [maxTilt])

  return elementRef
}

// Animate counter
export function animateCounter(
  element: HTMLElement,
  endValue: number,
  duration = 2,
  prefix = '',
  suffix = ''
) {
  const obj = { value: 0 }
  
  gsap.to(obj, {
    value: endValue,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = `${prefix}${Math.round(obj.value)}${suffix}`
    },
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  })
}

// Export GSAP for direct use
export { gsap, ScrollTrigger, useGSAP }
