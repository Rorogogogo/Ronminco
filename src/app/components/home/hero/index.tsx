'use client'
import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      setVideoLoaded(true)
      video.play().catch(error => {
        console.log('Video autoplay failed:', error)
      })
    }

    // Check if video is already loaded
    if (video.readyState >= 3) {
      handleCanPlay()
    } else {
      video.addEventListener('canplay', handleCanPlay)
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
    }
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <section className='relative h-screen w-full overflow-hidden'>
      {/* Video Background */}
      <div className='absolute inset-0 w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload='auto'
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src='/videos/Hero.mp4' type='video/mp4' />
        </video>
        <div className='absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60 z-10' />
      </div>

      {/* Content Overlay */}
      <div className='relative z-20 h-full w-full'>
        {/* Top Bar */}
        <div className='absolute top-0 left-0 right-0 flex justify-between items-center p-6 md:p-10'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='text-white text-xl md:text-2xl font-bold tracking-wider'
          >
            RM
          </motion.div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className='text-white text-sm md:text-base font-medium tracking-widest hover:opacity-70 transition-opacity'
          >
            MENU
          </motion.button>
        </div>

        {/* Main Content */}
        <div className='h-full flex items-center justify-center px-6 md:px-10 lg:px-20'>
          <div className='max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12'>
            {/* Left Sidebar - Company Values */}
            <motion.div
              variants={staggerChildren}
              initial='initial'
              animate='animate'
              className='lg:col-span-3 flex flex-col gap-3 md:gap-4'
            >
              {['INNOVATIVE SOLUTIONS', 'TECHNICAL EXCELLENCE', 'CLIENT FOCUSED', 'FUTURE READY'].map((value, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className='text-white text-xs md:text-sm font-medium tracking-wider opacity-80'
                >
                  {value}
                </motion.div>
              ))}
            </motion.div>

            {/* Center - Company Name */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className='lg:col-span-6 flex flex-col items-center justify-center text-center'
            >
              <h1 className='text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white leading-none tracking-tight'>
                RONMINCO
              </h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className='mt-4 md:mt-6 text-white/90 text-sm md:text-base lg:text-lg max-w-2xl px-4'
              >
                A software studio founded by Robert and Michelle, crafting innovative solutions that transform businesses through cutting-edge technology and forward-thinking development.
              </motion.div>
            </motion.div>

            {/* Right Side - Spacer for balance */}
            <div className='hidden lg:block lg:col-span-3' />
          </div>
        </div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className='absolute bottom-0 left-0 right-0 p-6 md:p-10'
        >
          <div className='flex flex-col md:flex-row justify-between items-start md:items-end gap-4'>
            <div className='text-white/80 text-xs md:text-sm space-y-1'>
              <div className='tracking-wider'>EST. 2025</div>
              <div className='tracking-wider'>FOUNDED BY ROBERT & MICHELLE</div>
              <div className='tracking-wider'>SOFTWARE SOLUTIONS</div>
            </div>
            <Link
              href='/contact'
              className='hidden md:block bg-white/10 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-medium tracking-wide hover:bg-white/20 transition-all border border-white/20'
            >
              GET IN TOUCH
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-black/95 z-50 flex items-center justify-center'
        >
          <button
            onClick={() => setMenuOpen(false)}
            className='absolute top-6 right-6 text-white text-2xl'
          >
            ✕
          </button>
          <nav className='flex flex-col items-center gap-8 text-white text-2xl font-medium'>
            <Link href='/' onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href='/about' onClick={() => setMenuOpen(false)}>About</Link>
            <Link href='/services' onClick={() => setMenuOpen(false)}>Services</Link>
            <Link href='/contact' onClick={() => setMenuOpen(false)}>Contact</Link>
          </nav>
        </motion.div>
      )}
    </section>
  )
}

export default HeroSection
