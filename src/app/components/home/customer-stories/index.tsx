'use client'
import Image from 'next/image'
import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap-utils'

function CustomerStories() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Premium Parallax Mosaic Animation
  useGSAP(() => {
    if (!containerRef.current) return

    // 1. Column Parallax
    // We will move odd columns faster than even columns creates a floating effect
    const oddColumns = containerRef.current.querySelectorAll('.parallax-col-odd')
    const evenColumns = containerRef.current.querySelectorAll('.parallax-col-even')

    oddColumns.forEach(col => {
      gsap.to(col, {
        y: -100, // Move up slightly
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      })
    })

    evenColumns.forEach(col => {
      gsap.to(col, {
        y: 50, // Move down slightly
        ease: 'none',
        scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
      })
    })

    // 2. Card Reveals & Tilt
    const cards = containerRef.current.querySelectorAll('.story-card')
    cards.forEach((card) => {
        // Reveal
        gsap.fromTo(card, 
            { opacity: 0, scale: 0.9, y: 50 },
            { 
                opacity: 1, 
                scale: 1, 
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                }
            }
        )

        // Magnetic Tilt Effect (Simple 3D feel on hover)
        card.addEventListener('mousemove', (e: Event) => {
            const mouseEvent = e as unknown as MouseEvent;
            const rect = card.getBoundingClientRect();
            const x = mouseEvent.clientX - rect.left;
            const y = mouseEvent.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg tilt
            const rotateY = ((x - centerX) / centerX) * 5;

            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                scale: 1.02,
                duration: 0.4,
                ease: 'power2.out'
            })
        })

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 0.6,
                ease: 'elastic.out(1, 0.5)'
            })
        })
    })

  }, { scope: containerRef })

  return (
    <section ref={containerRef} className='relative z-10 py-32 overflow-hidden'>
      <div className='container relative'>
        
        {/* Floating Background Elements */}
        <div className='absolute top-20 left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none' />
        <div className='absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none' />

        <div className='flex flex-col gap-20'>
            {/* Header */}
            <div className='text-center max-w-3xl mx-auto'>
                 <h2 className='text-sm font-mono text-emerald-500 uppercase tracking-[0.2em] mb-4'>Testimonials</h2>
                 <h3 className='text-4xl md:text-6xl font-bold dark:text-white leading-tight'>
                    Voices of <span className='italic font-serif text-emerald-400'>satisfaction</span> from our partners.
                 </h3>
            </div>

            {/* Mosaic Grid */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start'>
                
                {/* Column 1 (Odd) - Moves Up */}
                <div className='parallax-col-odd flex flex-col gap-8 lg:mt-20'>
                     {/* Card 1 */}
                     <div className='story-card group relative p-10 rounded-[2.5rem] bg-transparent border border-white/10 overflow-hidden hover:border-white/30 hover:bg-white/[0.01] transition-colors'>
                        <div className='relative z-10'>
                            <div className='mb-8'>
                                <div className='flex gap-1 mb-4'>
                                    {[1,2,3,4,5].map(i => <span key={i} className='text-yellow-400 text-xl'>★</span>)}
                                </div>
                                <h4 className='text-2xl font-light leading-relaxed dark:text-white'>
                                    &quot;Ronminco&apos;s expertise transformed my vision into success! The attention to detail is unmatched.&quot;
                                </h4>
                            </div>
                            <div className='flex items-center gap-4'>
                                <div className='w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500' />
                                <div>
                                    <p className='font-bold dark:text-white'>Phoebe Jiao</p>
                                    <p className='text-sm text-gray-500'>Founder, Propeak Finance</p>
                                </div>
                            </div>
                        </div>
                     </div>

                     {/* Card 2 (Image Focus) */}
                     <div className='story-card group relative h-[500px] rounded-[2.5rem] overflow-hidden'>
                        <Image 
                            src='/images/home/customerStories/creativity_img.jpg'
                            alt='Creative Work'
                            fill
                            className='object-cover transition-transform duration-700 group-hover:scale-110'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-10'>
                            <p className='text-white text-xl font-light italic'>&quot;A game changer for our brand identity.&quot;</p>
                        </div>
                     </div>
                </div>

                {/* Column 2 (Even) - Moves Down */}
                <div className='parallax-col-even flex flex-col gap-8'>
                     {/* Card 3 (Stats) */}
                     <div className='story-card p-10 rounded-[2.5rem] bg-transparent border border-emerald-500/10 min-h-[300px] flex flex-col justify-between group hover:bg-emerald-500/[0.02] hover:border-emerald-500/30 transition-colors'>
                         <div>
                            <p className='text-emerald-600 dark:text-emerald-400 font-mono text-sm uppercase tracking-wider mb-2'>Client Retention</p>
                            <h2 className='text-8xl font-bold text-emerald-900 dark:text-emerald-100 mb-4 group-hover:scale-110 transition-transform origin-left duration-500'>98%</h2>
                         </div>
                         <p className='text-emerald-800/60 dark:text-emerald-100/60 font-medium'>Of our clients choose to work with us on multiple projects.</p>
                     </div>

                     {/* Card 4 (Main Quote) - Redesigned */}
                     <div className='story-card relative p-12 rounded-[2.5rem] bg-transparent border border-white/10 text-white overflow-hidden min-h-[400px] flex flex-col justify-between hover:border-white/30 hover:bg-white/[0.01] transition-colors'>
                        {/* Decorative Quote Mark Background */}
                        <div className='absolute -top-10 -right-10 text-emerald-500/10 dark:text-emerald-500/5'>
                            <svg width="200" height="200" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.896 14.353 15.925 15.025 15.087C15.697 14.249 16.713 13.593 18.073 13.119C17.737 13.167 17.353 13.191 16.921 13.191C15.529 13.191 14.281 12.699 13.177 11.715C12.073 10.731 11.521 9.499 11.521 8.019C11.521 6.555 12.061 5.303 13.141 4.263C14.221 3.223 15.529 2.703 17.065 2.703C18.673 2.703 20.005 3.267 21.061 4.395C22.117 5.523 22.645 6.947 22.645 8.667C22.645 10.987 22.045 13.187 20.845 15.267C19.645 17.347 17.369 19.259 14.017 21ZM2.009 21L2.009 18C2.009 16.896 2.345 15.925 3.017 15.087C3.689 14.249 4.705 13.593 6.065 13.119C5.729 13.167 5.345 13.191 4.913 13.191C3.521 13.191 2.273 12.699 1.169 11.715C0.065 10.731 -0.487 9.499 -0.487 8.019C-0.487 6.555 0.053 5.303 1.133 4.263C2.213 3.223 3.521 2.703 5.057 2.703C6.665 2.703 7.997 3.267 9.053 4.395C10.109 5.523 10.637 6.947 10.637 8.667C10.637 10.987 10.037 13.187 8.837 15.267C7.637 17.347 5.361 19.259 2.009 21Z"/></svg>
                        </div>
                        
                        <div className='relative z-10'>
                            <svg className='w-10 h-10 mb-8 text-emerald-500' fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.896 14.353 15.925 15.025 15.087C15.697 14.249 16.713 13.593 18.073 13.119C17.737 13.167 17.353 13.191 16.921 13.191C15.529 13.191 14.281 12.699 13.177 11.715C12.073 10.731 11.521 9.499 11.521 8.019C11.521 6.555 12.061 5.303 13.141 4.263C14.221 3.223 15.529 2.703 17.065 2.703C18.673 2.703 20.005 3.267 21.061 4.395C22.117 5.523 22.645 6.947 22.645 8.667C22.645 10.987 22.045 13.187 20.845 15.267C19.645 17.347 17.369 19.259 14.017 21ZM2.009 21L2.009 18C2.009 16.896 2.345 15.925 3.017 15.087C3.689 14.249 4.705 13.593 6.065 13.119C5.729 13.167 5.345 13.191 4.913 13.191C3.521 13.191 2.273 12.699 1.169 11.715C0.065 10.731 -0.487 9.499 -0.487 8.019C-0.487 6.555 0.053 5.303 1.133 4.263C2.213 3.223 3.521 2.703 5.057 2.703C6.665 2.703 7.997 3.267 9.053 4.395C10.109 5.523 10.637 6.947 10.637 8.667C10.637 10.987 10.037 13.187 8.837 15.267C7.637 17.347 5.361 19.259 2.009 21Z"/></svg>
                            <h3 className='text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-8 tracking-tight'>
                                &quot;Exceptional creativity and precision. They didn&apos;t just build a website; they built a legacy.&quot;
                            </h3>
                        </div>
                        
                        <div className='relative z-10 flex items-center gap-4 border-t border-white/20 dark:border-black/5 pt-6 mt-auto'>
                            <div className='w-12 h-12 rounded-full overflow-hidden relative border-2 border-white/20 dark:border-black/5'>
                                <Image
                                    src='/images/home/avatar_1.jpg'
                                    alt='Michelle Tan'
                                    fill
                                    className='object-cover'
                                />
                            </div>
                            <div>
                                <p className='font-bold text-lg leading-none'>Michelle Tan</p>
                                <p className='text-sm opacity-60 mt-1'>CEO, Ronminco</p>
                            </div>
                        </div>
                     </div>
                </div>

            </div>
        </div>
      </div>
    </section>
  )
}

export default CustomerStories
