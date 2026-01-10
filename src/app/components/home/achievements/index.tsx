'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap-utils'
import SingleAchievement from './SingleAchievement'

function Achievements() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [achievementsList, setAchievementsList] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/page-data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setAchievementsList(data?.achievementsList)
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }
    fetchData()
  }, [])

  // GSAP Animations
  useGSAP(() => {
    if (!containerRef.current) return

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    })

    // 1. Heading Reveal
    const heading = containerRef.current.querySelector('.section-header')
    tl.fromTo(heading, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )

    // 2. Stats Counters (Simulated)
    const counters = containerRef.current.querySelectorAll<HTMLElement>('.stat-number')
    counters.forEach((counter) => {
        const raw = counter.textContent?.replace(/\D/g, '') || '0'
        const target = parseInt(raw)
        
        tl.to(counter, {
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            ease: 'power2.out',
            onUpdate: function() {
                counter.textContent = Math.ceil(this.targets()[0].innerText) + '+' 
            }
        }, '<')
    })
    
    // 3. Card Waterfall
    const cards = containerRef.current.querySelectorAll('.achievement-card')
    tl.fromTo(cards, 
        { opacity: 0, y: 100, scale: 0.9 },
        { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 0.8, 
            stagger: 0.1, 
            ease: 'back.out(1.2)' 
        }, '-=0.5'
    )

  }, { scope: containerRef, dependencies: [achievementsList] })

  return (
    <section id='awards' ref={containerRef} className='relative py-32 bg-slate-50 dark:bg-[#0a0a0a] overflow-hidden'>
      {/* Decorative BG */}
      <div className='absolute inset-0 opacity-30 pointer-events-none'>
        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-emerald-500/10 to-transparent rounded-full blur-3xl' />
      </div>

      <div className='container relative z-10'>
        <div className='flex flex-col gap-20'>
            
            {/* Header + Stats */}
            <div className='section-header flex flex-col md:flex-row justify-between items-end gap-10 border-b border-black/10 dark:border-white/10 pb-12'>
               <div className='max-w-2xl'>
                 <p className='text-emerald-500 font-mono text-sm uppercase tracking-widest mb-4'>Recognition</p>
                 <h2 className='text-4xl md:text-6xl font-bold dark:text-white leading-tight'>
                    Award-winning <span className='italic font-serif text-gray-500'>excellence</span> recognized globally.
                 </h2>
               </div>

               <div className='flex gap-12'>
                 <div>
                    <h3 className='stat-number text-5xl font-bold dark:text-white'>50+</h3>
                    <p className='text-sm text-gray-500 uppercase tracking-widest mt-2'>Awards Won</p>
                 </div>
                 <div>
                    <h3 className='stat-number text-5xl font-bold dark:text-white'>200+</h3>
                    <p className='text-sm text-gray-500 uppercase tracking-widest mt-2'>Projects</p>
                 </div>
               </div>
            </div>
            
            {/* Cards Grid */}
            <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12'>
              {achievementsList?.map((item: any, index: any) => {
                return (
                  <div key={index} className='achievement-card group relative bg-white dark:bg-white/5 p-8 rounded-3xl border border-black/5 dark:border-white/5 hover:border-emerald-500/30 transition-colors duration-300'>
                    <div className='absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl' />
                    <div className='relative z-10'>
                        <SingleAchievement key={index} achievements={item} />
                    </div>
                  </div>
                )
              })}
            </div>

        </div>
      </div>
    </section>
  )
}

export default Achievements
