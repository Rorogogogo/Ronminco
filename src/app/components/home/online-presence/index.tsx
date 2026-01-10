'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap-utils'

function OnlinePresence() {
  const [onlinePresenceList, setonlinePresenceList] = useState<any[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const vineRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/page-data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setonlinePresenceList(data?.onlinePresenceList || [])
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }
    fetchData()
  }, [])

  // GSAP Horizontal Scroll & Premium Animations
  useGSAP(() => {
    if (!trackRef.current || !containerRef.current || onlinePresenceList.length === 0) return

    const items = trackRef.current.querySelectorAll('.project-item')
    const totalWidth = trackRef.current.scrollWidth
    const viewportWidth = window.innerWidth
    
    // 1. Master Horizontal Scroll Tween
    const scrollTween = gsap.to(trackRef.current, {
      xPercent: -100 * (items.length - 1) / items.length,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        // Make it feel substantial but not endless
        end: () => `+=${totalWidth - viewportWidth}`,
        invalidateOnRefresh: true,
      }
    })

    items.forEach((item) => {
        // 3. Text Reveal / Fade
        const content = item.querySelector('.project-content')
        if (content) {
            gsap.fromTo(content,
                { opacity: 0, y: 50 },
                {
                    opacity: 1, 
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: item,
                        containerAnimation: scrollTween,
                        start: 'left center+=200',
                        toggleActions: 'play reverse play reverse'
                    }
                }
            )
        }
    })

    // 4. Premium Vine Animation
    if (vineRef.current) {
      const length = vineRef.current.getTotalLength()
      gsap.set(vineRef.current, { strokeDasharray: length, strokeDashoffset: length })

      gsap.to(vineRef.current, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${totalWidth - viewportWidth}`,
          scrub: 1,
        }
      })
    }

  }, { scope: containerRef, dependencies: [onlinePresenceList] })

  // Elegant Vine Path
  const getPathData = () => {
    if (onlinePresenceList.length === 0) return ''
    
    // Logic: Smooth wave passing through the bottom/center of cards
    const widthPerSlide = 1000 // scalable unit
    const height = 800 // scalable unit height
    
    let d = `M 0 ${height * 0.6}`
    
    onlinePresenceList.forEach((_, i) => {
      const startX = i * widthPerSlide
      const endX = (i + 1) * widthPerSlide
      
      // Gentle, organic flow
      const yBase = height * 0.6
      const amplitude = 100
      
      // Control points for smooth Bezier
      // Alternating peaks and troughs
      const yControl = (i % 2 === 0) ? yBase + amplitude : yBase - amplitude
      
      d += ` C ${startX + widthPerSlide*0.4} ${yControl}, ${startX + widthPerSlide*0.6} ${yControl}, ${endX} ${yBase}`
    })
    
    return d
  }

  return (
    <section 
      ref={containerRef} 
      className='relative h-screen overflow-hidden'
    >
      <div 
        ref={trackRef}
        className='flex h-full w-fit will-change-transform'
      >
          {/* Background SVG Layer */}
          <div className='absolute top-0 left-0 h-full w-full pointer-events-none z-10'>
             <svg 
                className='h-full w-full' 
                viewBox={`0 0 ${Math.max(onlinePresenceList.length * 1000, 1000)} 800`} 
                preserveAspectRatio="none"
             >
                 <path
                    ref={vineRef}
                    d={getPathData()}
                    fill="none"
                    stroke="url(#vine-gradient)" 
                    strokeWidth="8"
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_15px_rgba(52,211,153,0.8)]"
                 />
                 <defs>
                    <linearGradient id="vine-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#059669" />
                        <stop offset="50%" stopColor="#34d399" />
                        <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                 </defs>
             </svg>
          </div>

          {onlinePresenceList.map((item, index) => (
            <div 
              key={index} 
              className='project-item w-screen h-full flex-shrink-0 flex items-center justify-center p-6 md:p-12 relative z-20 overflow-hidden'
            >
              <div className='max-w-[1600px] w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center h-full'>
                
                {/* Visual Side - Transparent Wireframe Card */}
                <div className={`lg:col-span-8 aspect-[4/3] w-full relative group ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                    <div className='absolute inset-0 bg-transparent rounded-3xl z-10 border border-white/10 transition-colors duration-500 group-hover:border-white/30 group-hover:bg-white/[0.01]' />
                    <div className='absolute inset-2 rounded-2xl overflow-hidden z-20'>
                        <div className='w-full h-full relative'>
                             {/* Wrapper for Parallax */}
                             <div className='absolute inset-[-10%] w-[120%] h-[120%]'> 
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className='object-cover'
                                />
                             </div>
                        </div>
                    </div>
                </div>

                {/* Content Side */}
                <div className={`project-content lg:col-span-4 flex flex-col items-start justify-center z-30 ${index % 2 !== 0 ? 'lg:order-1 lg:items-end lg:text-right' : ''}`}>
                    <div className='flex items-center gap-4 mb-6'>
                        <span className='h-[1px] w-12 bg-emerald-500/50' />
                        <span className='text-emerald-400 font-mono text-sm tracking-[0.2em] uppercase'>Project 0{index + 1}</span>
                    </div>
                    
                    <h3 className='text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[0.9] tracking-tighter'>
                        {item.title}
                    </h3>

                    <p className='text-lg text-white/60 leading-relaxed max-w-md mb-8'>
                        Crafting digital experiences that transcend the ordinary. We built a robust, scalable solution for {item.title}.
                    </p>

                    <Link 
                        href={item.link || '#'} 
                        target='_blank'
                        className='group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium overflow-hidden transition-all hover:pr-10'
                    >
                        <span className='relative z-10'>View Case Study</span>
                        <span className='relative z-10 transition-transform group-hover:translate-x-1'>&rarr;</span>
                        <div className='absolute inset-0 bg-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out' />
                    </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  )
}

export default OnlinePresence
