'use client'
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap-utils'

function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)
  const bottomInfoRef = useRef<HTMLDivElement>(null)
  const ctaButtonRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      setVideoLoaded(true)
      video.play().catch(error => {
        console.log('Video autoplay failed:', error)
      })
    }

    if (video.readyState >= 3) {
      handleCanPlay()
    } else {
      video.addEventListener('canplay', handleCanPlay)
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
    }
  }, [])

  // GSAP Animations
  useGSAP(() => {
    if (!containerRef.current) return

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Logo animation
    tl.fromTo('.hero-logo',
      { opacity: 0, x: -50, scale: 0.8 },
      { opacity: 1, x: 0, scale: 1, duration: 0.8 },
      0.2
    )

    // Title animation - dramatic character reveal
    if (titleRef.current) {
      const chars = titleRef.current.textContent?.split('') || []
      titleRef.current.innerHTML = chars.map((char, i) => 
        `<span class="inline-block" style="opacity:0;transform:translateY(100px) rotateX(-90deg)">${char}</span>`
      ).join('')
      
      const charElements = titleRef.current.querySelectorAll('span')
      tl.to(charElements, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.04,
        ease: 'back.out(1.2)'
      }, 0.4)
    }

    // Subtitle animation
    tl.fromTo('.hero-subtitle',
      { opacity: 0, y: 30, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 },
      1.2
    )

    // Company values stagger animation
    if (valuesRef.current) {
      const values = valuesRef.current.querySelectorAll('.company-value')
      tl.fromTo(values,
        { opacity: 0, x: -30, scale: 0.9 },
        { 
          opacity: 0.8, 
          x: 0, 
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'elastic.out(1, 0.5)'
        },
        0.6
      )
    }

    // Bottom info animation
    tl.fromTo('.bottom-info',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 },
      1.4
    )

    // CTA button pulse animation
    if (ctaButtonRef.current) {
      gsap.to(ctaButtonRef.current, {
        scale: 1.02,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    }

    // Parallax effect on scroll
    gsap.to('.hero-overlay', {
      opacity: 0.8,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    })

    // Title parallax on scroll
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        y: 100,
        opacity: 0.3,
        scale: 0.95,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
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
    <section ref={containerRef} className='relative h-screen w-full overflow-hidden'>
      {/* Video Background */}
      <div className='absolute inset-0 w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload='auto'
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <source src='/videos/Hero.mp4' type='video/mp4' />
        </video>
        <div className='hero-overlay absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60 z-10' />
      </div>

      {/* Content Overlay */}
      <div className='relative z-20 h-full w-full'>
        {/* Logo */}
        <div className='absolute top-0 left-0 p-6 md:p-10'>
          <div className='hero-logo'>
            <Link href="/">
              <Image
                src="/logos/Logo_dark.png"
                alt="Ronminco Logo"
                width={120}
                height={48}
                style={{ width: 'auto', height: '48px', maxHeight: '48px' }}
                quality={100}
                priority={true}
                className='h-10 md:h-12 w-auto'
              />
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className='h-full flex items-center justify-center px-6 md:px-10 lg:px-20'>
          <div className='max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12'>
            {/* Left Sidebar - Company Values */}
            <div
              ref={valuesRef}
              className='lg:col-span-3 flex flex-col gap-3 md:gap-4'
            >
              {['INNOVATIVE SOLUTIONS', 'TECHNICAL EXCELLENCE', 'CLIENT FOCUSED', 'FUTURE READY'].map((value, index) => (
                <div
                  key={index}
                  className='company-value text-white text-xs md:text-sm font-medium tracking-wider opacity-0'
                >
                  {value}
                </div>
              ))}
            </div>

            {/* Center - Company Name */}
            <div className='lg:col-span-6 flex flex-col items-center justify-center text-center'>
              <h1 
                ref={titleRef}
                className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-none tracking-tight whitespace-nowrap'
                style={{ perspective: '1000px' }}
              >
                RONMINCO
              </h1>
              <div className='hero-subtitle mt-4 md:mt-6 text-white/90 text-sm md:text-base lg:text-lg max-w-2xl px-4 opacity-0'>
                A software studio crafting innovative solutions that transform businesses through cutting-edge technology and forward-thinking development.
              </div>
            </div>

            {/* Right Side - Spacer for balance */}
            <div className='hidden lg:block lg:col-span-3' />
          </div>
        </div>

        {/* Bottom Info */}
        <div className='bottom-info absolute bottom-0 left-0 right-0 p-6 md:p-10 opacity-0'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-end gap-4'>
            <div className='text-white/80 text-xs md:text-sm space-y-1'>
              <div className='tracking-wider'>EST. 2025</div>
              <div className='tracking-wider'>FOUNDED BY ROBERT & MICHELLE</div>
              <div className='tracking-wider'>SOFTWARE SOLUTIONS</div>
            </div>
            <Link
              ref={ctaButtonRef}
              href='/contact'
              className='hidden md:block bg-white/10 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-medium tracking-wide hover:bg-white/20 transition-all border border-white/20 hover:border-white/40 hover:shadow-lg hover:shadow-white/10'
            >
              GET IN TOUCH
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
