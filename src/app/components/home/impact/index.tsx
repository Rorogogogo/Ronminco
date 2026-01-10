'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap-utils'
import { ArrowRight, Code, Megaphone, Palette, Rocket, Target } from 'lucide-react'

// Helper to map titles to icons
const getIcon = (title: string) => {
    const lower = title.toLowerCase()
    if (lower.includes('strategy')) return <Target className="w-8 h-8 text-emerald-500" />
    if (lower.includes('marketing')) return <Megaphone className="w-8 h-8 text-emerald-500" />
    if (lower.includes('design')) return <Palette className="w-8 h-8 text-emerald-500" />
    if (lower.includes('development') || lower.includes('web')) return <Code className="w-8 h-8 text-emerald-500" />
    return <Rocket className="w-8 h-8 text-emerald-500" />
}

function Impact() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [data, setData] = useState<any>({
    innovationList: []
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/page-data')
        if (!res.ok) throw new Error('Failed to fetch')
        const json = await res.json()
        setData({
          innovationList: json?.innovationList || []
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  useGSAP(() => {
    if (!containerRef.current) return

    // Animate Rows on Scroll
    const rows = containerRef.current.querySelectorAll('.impact-row')
    gsap.fromTo(rows, 
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
        }
      }
    )

    // Counter Animation
    const counters = containerRef.current.querySelectorAll('.stat-counter')
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target') || '0')
        gsap.to(counter, {
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            scrollTrigger: {
                trigger: counter,
                start: 'top 80%'
            }
        })
    })

  }, { scope: containerRef, dependencies: [data] })

  return (
    <section ref={containerRef} className='relative z-10 py-20 lg:py-32'>
      <div className='container'>
        <div className='flex flex-col lg:flex-row gap-12 lg:gap-24'>
            
            {/* LEFT COLUMN - Sticky Header */}
            <div className='lg:w-1/3 relative'>
                <div className='sticky top-32'>
                    <h2 className='text-[12vw] lg:text-[8rem] font-bold text-white leading-[0.8] tracking-tighter mb-4'>
                        IMPACT
                    </h2>
                    <div className='h-1 w-24 bg-emerald-500 mb-8' />
                    <p className='text-white/60 text-lg max-w-sm'>
                        We don't just build software.<br/>
                        We engineer digital dominance.
                    </p>
                </div>
            </div>

            {/* RIGHT COLUMN - Interactive List */}
            <div className='lg:w-2/3 flex flex-col'>
                
                {/* Row 1: Projects */}
                <div className='impact-row group py-12 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between hover:bg-white/[0.02] transition-colors cursor-pointer'>
                    <div className='mb-4 md:mb-0'>
                        <span className='text-emerald-500 font-mono text-sm tracking-wider uppercase block mb-1'>Track Record</span>
                        <h3 className='text-3xl font-medium text-white'>Projects Delivered</h3>
                    </div>
                    <div className='text-right'>
                        <span className='text-6xl md:text-7xl font-bold text-white block leading-none'>
                             <span className='stat-counter' data-target='15'>0</span>+
                        </span>
                    </div>
                </div>

                {/* Row 2: Experience */}
                <div className='impact-row group py-12 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between hover:bg-white/[0.02] transition-colors cursor-pointer'>
                    <div className='mb-4 md:mb-0'>
                        <span className='text-emerald-500 font-mono text-sm tracking-wider uppercase block mb-1'>Expertise</span>
                        <h3 className='text-3xl font-medium text-white'>Years in Industry</h3>
                    </div>
                    <div className='text-right'>
                        <span className='text-6xl md:text-7xl font-bold text-white block leading-none'>
                             <span className='stat-counter' data-target='4'>0</span>+
                        </span>
                    </div>
                </div>

                {/* Services Rows */}
                {data.innovationList.slice(0, 3).map((item: any, i: number) => (
                    <div key={i} className='impact-row group py-12 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between hover:bg-white/[0.02] transition-colors cursor-pointer'>
                        <div className='flex items-center gap-6'>
                             <div className='w-16 h-16 rounded-full border border-white/10 flex items-center justify-center opacity-50 group-hover:opacity-100 group-hover:scale-110 group-hover:bg-white/5 transition-all'>
                                 {getIcon(item.title)}
                             </div>
                             <div>
                                 <h3 className='text-3xl font-medium text-white group-hover:text-emerald-400 transition-colors'>{item.title.replace('\n', ' ')}</h3>
                             </div>
                        </div>
                        <div className='mt-4 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300 transform'>
                             <ArrowRight className="w-8 h-8 text-emerald-500" />
                        </div>
                    </div>
                ))}

                 {/* Strategy Row */}
                 <div className='impact-row group py-12 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between hover:bg-white/[0.02] transition-colors cursor-pointer'>
                     <div className='flex items-center gap-6'>
                          <div className='w-16 h-16 rounded-full border border-emerald-500/20 flex items-center justify-center bg-emerald-500/5 group-hover:scale-110 transition-transform'>
                             <Target className="w-8 h-8 text-emerald-500" />
                          </div>
                          <div>
                              <h3 className='text-3xl font-medium text-white'>Strategy-First Approach</h3>
                          </div>
                     </div>
                 </div>

            </div>
        </div>
      </div>
    </section>
  )
}

export default Impact
