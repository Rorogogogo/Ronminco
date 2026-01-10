'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap-utils'

function Innovation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const [innovationList, setinnovationList] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/page-data')
        if (!res.ok) throw new Error('Failed to fetch')

        const data = await res.json()
        setinnovationList(data?.innovationList)
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }

    fetchData()
  }, [])

  // GSAP Animations
  useGSAP(() => {
    if (!containerRef.current) return

    // Heading animation
    const heading = containerRef.current.querySelector('.section-heading')
    if (heading) {
      gsap.fromTo(heading,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )
    }

    // Cards stagger animation with 3D effect
    const cards = containerRef.current.querySelectorAll('.innovation-card')
    if (cards.length) {
      gsap.fromTo(cards,
        { 
          opacity: 0, 
          y: 80, 
          rotateX: -15,
          scale: 0.9,
          transformPerspective: 1000
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.8,
          stagger: {
            amount: 0.6,
            from: 'start'
          },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )

      // Add hover animations to each card
      cards.forEach((card) => {
        const icon = card.querySelector('.card-icon')
        
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.03,
            y: -8,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            duration: 0.3,
            ease: 'power2.out'
          })
          if (icon) {
            gsap.to(icon, {
              scale: 1.2,
              rotate: 10,
              duration: 0.4,
              ease: 'back.out(1.5)'
            })
          }
        })

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            boxShadow: 'none',
            duration: 0.3,
            ease: 'power2.out'
          })
          if (icon) {
            gsap.to(icon, {
              scale: 1,
              rotate: 0,
              duration: 0.3,
              ease: 'power2.out'
            })
          }
        })
      })
    }

    // CTA section animation
    if (ctaRef.current) {
      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 50, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )

      // Magnetic effect for CTA buttons
      const buttons = ctaRef.current.querySelectorAll('.cta-button')
      buttons.forEach((button) => {
        const strength = 0.25

        button.addEventListener('mousemove', (e: Event) => {
          const mouseEvent = e as MouseEvent
          const rect = (button as HTMLElement).getBoundingClientRect()
          const x = mouseEvent.clientX - rect.left - rect.width / 2
          const y = mouseEvent.clientY - rect.top - rect.height / 2
          
          gsap.to(button, {
            x: x * strength,
            y: y * strength,
            duration: 0.3,
            ease: 'power2.out'
          })
        })

        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)'
          })
        })
      })
    }

  }, { scope: containerRef, dependencies: [innovationList] })

  return (
    <section id='services' ref={containerRef}>
      <div className='2xl:py-20 py-11'>
        <div className='container'>
          <div className='flex flex-col gap-12'>
            <div className='flex flex-col justify-center items-center gap-10 lg:gap-16'>
              <div className='section-heading max-w-(--breakpoint-Xsm) text-center opacity-0'>
                <h2>
                  Where innovation meets{' '}
                  <span className='instrument-font italic font-normal dark:text-white/70'>
                    aesthetics
                  </span>
                </h2>
              </div>
              <div
                ref={cardsRef}
                className='grid auto-rows-max grid-cols-1 md:grid-cols-2 2xl:grid-cols-5 gap-6 w-full'
              >
                {innovationList?.map((items: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className={`innovation-card relative bg-white/5 backdrop-blur-xl border border-white/10 flex flex-col p-8 rounded-3xl gap-6 lg:gap-9 opacity-0 cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-emerald-500/30 overflow-hidden group`}
                    >
                      {/* Glow Effect */}
                      <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-shine" />
                      
                      <div className='card-icon relative z-10 w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300'>
                        <Image
                          src={items.image}
                          alt='image'
                          height={28}
                          width={28}
                          className="invert opacity-80"
                        />
                      </div>
                      <div className='relative z-10'>
                        <h5 className='text-white/90 font-medium text-lg leading-relaxed group-hover:text-emerald-300 transition-colors'>
                          {items.title.split('\n')?.map((line: any, i: number) => (
                            <React.Fragment key={i}>
                              {line}
                              <br />
                            </React.Fragment>
                          ))}
                        </h5>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div
              ref={ctaRef}
              className='flex flex-col gap-4 xl:flex xl:flex-row bg-dark_black items-center justify-between dark:bg-white/5 py-8 px-7 sm:px-12 rounded-3xl w-full opacity-0'
            >
              <h4 className='text-white text-center xl:text-left'>
                See Our Work in Action.
                <br />Start Your Creative Journey with Us!
              </h4>
              <div className='flex flex-col sm:flex-row gap-3 items-center'>
                <Link
                  href='/contact'
                  className='cta-button group gap-2 text-dark_black font-medium bg-white rounded-full flex items-center lg:gap-4 py-2 pl-5 pr-2 border border-white dark:border-opacity-50 hover:bg-transparent hover:text-white transition-all duration-200 ease-in-out'
                >
                  <span className='group-hover:translate-x-9 transform transition-transform duration-200 ease-in-out'>
                    Let&apos;s Collaborate
                  </span>
                  <svg
                    width='32'
                    height='32'
                    viewBox='0 0 32 32'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='group-hover:-translate-x-36 transition-all duration-200 ease-in-out'
                  >
                    <rect
                      width='32'
                      height='32'
                      rx='16'
                      fill='#1B1D1E'
                      className=' transition-colors duration-200 ease-in-out group-hover:fill-white'
                    />
                    <path
                      d='M11.832 11.3335H20.1654M20.1654 11.3335V19.6668M20.1654 11.3335L11.832 19.6668'
                      stroke='white'
                      strokeWidth='1.42857'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='group-hover:stroke-black'
                    />
                  </svg>
                </Link>
                <Link
                  href='/#work'
                  className='cta-button group border border-white dark:border-white/50 text-white font-medium bg-dark_black gap-2 rounded-full flex items-center justify-between lg:gap-4 py-2 pl-5 pr-2 hover:opacity-95 hover:bg-transparent hover:text-white transition-all duration-200 ease-in-out'
                >
                  <span className='group-hover:translate-x-9 transform transition-transform duration-200 ease-in-out'>
                    View Portfolio
                  </span>
                  <svg
                    width='32'
                    height='32'
                    viewBox='0 0 32 32'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='group-hover:-translate-x-[125px] transition-all duration-200 ease-in-out '
                  >
                    <rect width='32' height='32' rx='16' fill='white' />
                    <path
                      d='M11.832 11.3334H20.1654M20.1654 11.3334V19.6668M20.1654 11.3334L11.832 19.6668'
                      stroke='#1B1D1E'
                      strokeWidth='1.42857'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Innovation
