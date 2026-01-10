'use client'
import Link from 'next/link'
import { useRef, useEffect } from 'react'
import { gsap, useGSAP } from '@/lib/gsap-utils'

function Solutions() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const ctaButtonRef = useRef<HTMLAnchorElement>(null)

  // GSAP Animations
  useGSAP(() => {
    if (!containerRef.current || !cardRef.current) return

    // Card reveal animation
    gsap.fromTo(cardRef.current,
      { 
        opacity: 0, 
        y: 80,
        scale: 0.95,
        rotateX: -5,
        transformPerspective: 1000
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    )

    // Heading word-by-word reveal
    const heading = cardRef.current.querySelector('.solution-heading')
    if (heading) {
      const wordSpans = heading.querySelectorAll('.word-span')
      const dash = heading.querySelector('.dash-span')
      
      gsap.to([wordSpans, dash], {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      })
    }

    // Description fade in
    const description = cardRef.current.querySelector('.solution-description')
    if (description) {
      gsap.fromTo(description,
        { opacity: 0, y: 20, filter: 'blur(5px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          delay: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )
    }

    // Button animation
    if (ctaButtonRef.current) {
      gsap.fromTo(ctaButtonRef.current,
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: 0.6,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )

      // Subtle pulse animation
      gsap.to(ctaButtonRef.current, {
        scale: 1.02,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1
      })
    }

    // Animated gradient background
    const gradientBg = cardRef.current
    if (gradientBg) {
      // Create ambient animation
      gsap.to(gradientBg, {
        backgroundPosition: '200% 50%',
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    }

  }, { scope: containerRef })

  // Magnetic effect for CTA button
  useEffect(() => {
    if (!ctaButtonRef.current) return
    
    const button = ctaButtonRef.current
    const strength = 0.3

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
  }, [])

  return (
    <section ref={containerRef}>
      <div className='2xl:py-20 py-11'>
        <div className='container'>
          <div
            ref={cardRef}
            className='py-16 md:py-28 px-6 border border-dark_black/10 rounded-3xl bg-[linear-gradient(90deg,#CDEFFB_0%,#FFFFFF_33.23%,#FFFFFF_65.77%,#FDEECB_100%)] backdrop-blur-[200px] dark:opacity-80 opacity-0'
            style={{ backgroundSize: '200% 100%' }}
          >
            <div className='flex flex-col gap-6 items-center md:max-w-3xl mx-auto'>
              <div className='flex flex-col gap-3 items-center text-center'>
                <h2 className='solution-heading text-3xl md:text-5xl dark:text-dark_black'>
                  {['Innovative', 'Solutions', 'for'].map((word, i) => (
                    <span key={i} className="word-span inline-block opacity-0 translate-y-[30px] mr-2">
                      {word}
                    </span>
                  ))}
                  <span className='instrument-font italic font-normal dark:text-black/70 inline-block'>
                     {' '}
                     {['Bold', 'Brands'].map((word, i) => (
                      <span key={i} className="word-span inline-block opacity-0 translate-y-[30px] mr-2">
                        {word}
                      </span>
                     ))}
                  </span>
                </h2>
                <p className='solution-description dark:text-dark_black opacity-0'>
                  Looking to elevate your brand? We craft immersive experiences
                  that captivate, engage, and make your business unforgettable
                  in every interaction.
                </p>
              </div>
              <Link
                ref={ctaButtonRef}
                href='/contact'
                className='group w-fit text-white font-medium bg-dark_black rounded-full flex items-center gap-4 py-2 pl-5 pr-2 hover:bg-transparent border border-dark_black opacity-0'
              >
                <span className='group-hover:translate-x-9 group-hover:text-dark_black transform transition-transform duration-200 ease-in-out'>
                  Let&apos;s Collaborate
                </span>
                <svg
                  width='32'
                  height='32'
                  viewBox='0 0 32 32'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='group-hover:-translate-x-36 transition-all duration-200 ease-in-out group-hover:rotate-45'
                >
                  <rect
                    width='32'
                    height='32'
                    rx='16'
                    fill='white'
                    className='fill-white transition-colors duration-200 ease-in-out group-hover:fill-black'
                  />
                  <path
                    d='M11.832 11.3334H20.1654M20.1654 11.3334V19.6668M20.1654 11.3334L11.832 19.6668'
                    stroke='#1B1D1E'
                    strokeWidth='1.42857'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='stroke-[#1B1D1E] transition-colors duration-200 ease-in-out group-hover:stroke-white'
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Solutions
