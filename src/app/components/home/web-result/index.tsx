'use client'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap-utils'

function WebResult() {
  const [data, setData] = useState<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const counter1Ref = useRef<HTMLSpanElement>(null)
  const counter2Ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/page-data')
        if (!res.ok) throw new Error('Failed to fetch')

        const data = await res.json()
        setData(data?.WebResultTagList)
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }

    fetchData()
  }, [])

  // GSAP Animations
  useGSAP(() => {
    if (!containerRef.current) return

    // Heading animation with text split
    const heading = containerRef.current.querySelector('.main-heading')
    if (heading) {
      gsap.fromTo(heading,
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
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

    // Tag pills stagger animation
    const tags = containerRef.current.querySelectorAll('.tag-pill')
    if (tags.length) {
      gsap.fromTo(tags,
        { opacity: 0, scale: 0.5, y: 30, rotateX: -45 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: tags[0],
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )
    }

    // Animate counters
    const animateCounter = (ref: React.RefObject<HTMLSpanElement | null>, endValue: number) => {
      if (!ref.current) return
      
      const obj = { value: 0 }
      gsap.to(obj, {
        value: endValue,
        duration: 2.5,
        ease: 'power2.out',
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent = Math.round(obj.value).toString()
          }
        },
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      })
    }

    animateCounter(counter1Ref, 15)
    animateCounter(counter2Ref, 6)

    // Stats container scale animation
    if (statsRef.current) {
      gsap.fromTo(statsRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )
    }

    // Divider line animation
    const divider = containerRef.current.querySelector('.stat-divider')
    if (divider) {
      gsap.fromTo(divider,
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )
    }

  }, { scope: containerRef, dependencies: [data] })

  return (
    <section id='aboutus' ref={containerRef}>
      <div className='2xl:py-20 py-11'>
        <div className='container'>
          <div className='flex flex-col lg:gap-16 gap-5'>
            <div className='flex flex-col items-center justify-center text-center gap-3'>
              <h2 className='main-heading max-w-6xl opacity-0'>
                Crafting exceptional, well experienced & technology driven
                strategies to drive impactful results with
              </h2>
              <div>
                <h2>
                  {data?.map((items: any, index: any) => (
                    <span
                      key={index}
                      className={`tag-pill inline-flex m-2 py-2 px-6 gap-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 items-center opacity-0 cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:border-emerald-500/30 group`}
                    >
                      <div className="relative w-8 h-8 opacity-70 group-hover:opacity-100 transition-opacity">
                         <Image
                           src={items.image}
                           alt={items.name}
                           fill
                           className='object-contain invert' 
                         />
                      </div>
                      <span className='instrument-font italic font-normal text-white/80 group-hover:text-white transition-colors text-lg'>
                        {items.name}
                      </span>
                    </span>
                  ))}
                </h2>
              </div>
            </div>
            <div 
              ref={statsRef}
              className='flex-col md:flex md:flex-row justify-center items-center text-center opacity-0'
            >
              <div className='relative 2xl:px-24 px-16 md:py-8 py-4 group'>
                <h2 className='2xl:text-[10rem] md:text-8xl text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20'>
                  <sup className='text-4xl md:text-6xl text-emerald-400'>+</sup>
                  <span ref={counter1Ref}>0</span>
                </h2>
                <p className='mt-2 text-lg text-emerald-400/80 font-mono tracking-wider uppercase'>
                  Total Projects Completed
                </p>
                <div className='stat-divider hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 h-40 w-[1px] bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent' />
              </div>
              <div className='relative 2xl:px-24 px-16 md:py-8 py-4 group'>
                <h2 className='2xl:text-[10rem] md:text-8xl text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20'>
                  <sup className='text-4xl md:text-6xl text-emerald-400'>+</sup>
                  <span ref={counter2Ref}>0</span>
                </h2>
                <p className='mt-2 text-lg text-emerald-400/80 font-mono tracking-wider uppercase'>
                  Years of Experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WebResult
