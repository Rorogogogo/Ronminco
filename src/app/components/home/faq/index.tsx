'use client'
import { useEffect, useState, useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap-utils'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion'

function Faq() {
  const [faqList, setfaqList] = useState<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/page-data')
        if (!res.ok) throw new Error('Failed to fetch')

        const data = await res.json()
        setfaqList(data?.faqList)
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
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
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

    // FAQ items stagger animation
    const faqItems = containerRef.current.querySelectorAll('.faq-item')
    faqItems.forEach((item, index) => {
      gsap.fromTo(item,
        { 
          opacity: 0, 
          x: index % 2 === 0 ? -50 : 50,
          scale: 0.95
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current?.querySelector('.faq-container'),
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )

      // Hover animation
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          scale: 1.01,
          boxShadow: '0 10px 30px -10px rgba(0,0,0,0.15)',
          duration: 0.3,
          ease: 'power2.out'
        })
      })

      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          scale: 1,
          boxShadow: 'none',
          duration: 0.3,
          ease: 'power2.out'
        })
      })
    })

  }, { scope: containerRef, dependencies: [faqList] })

  return (
    <section ref={containerRef}>
      <div className='2xl:py-20 py-11'>
        <div className='container'>
          <div className='flex flex-col gap-10 md:gap-20'>
            <div className='section-heading max-w-md text-center mx-auto opacity-0'>
              <h2>
                Got questions? We've got{' '}
                <span className='instrument-font italic font-normal dark:text-white/70'>
                  answers
                </span>
              </h2>
            </div>
            <div className='faq-container flex flex-col'>
              <Accordion
                type='single'
                collapsible
                className='flex flex-col gap-4'
              >
                {faqList?.map((item: any, index: any) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className='faq-item p-6 border border-dark_black/10 dark:border-white/50 group opacity-0 transition-all duration-300 hover:border-dark_black/30 dark:hover:border-white/70 rounded-xl'
                  >
                    <AccordionTrigger className='group-hover:cursor-pointer'>
                      <h4 className='text-dark_black dark:text-white/80 text-left'>
                        {item.faq_que}
                      </h4>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className='text-base font-normal text-dark_black/60 dark:text-white/60'>
                        {item.faq_ans}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Faq
