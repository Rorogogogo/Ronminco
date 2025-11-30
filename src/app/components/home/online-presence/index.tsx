'use client'
import { Icon } from '@iconify/react/dist/iconify.js'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function OnlinePresence() {
  const [onlinePresenceList, setonlinePresenceList] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/page-data')
        if (!res.ok) throw new Error('Failed to fetch')

        const data = await res.json()
        setonlinePresenceList(data?.onlinePresenceList)
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }

    fetchData()
  }, [])
  return (
    <section id='work'>
      <div className='2xl:py-20 py-11'>
        <div className='container'>
          <div className='flex flex-col justify-center items-center gap-10 md:gap-20'>
            <div className='max-w-2xl text-center'>
              <h2>
                How we transformed a small business’s
                <span className='instrument-font italic font-normal dark:text-white/70'>
                  {' '}
                  online presence
                </span>
              </h2>
            </div>
            <div className='grid md:grid-cols-2 gap-x-6 gap-y-8'>
              {onlinePresenceList?.map((items: any, index: any) => {
                return (
                  <div
                    key={index}
                    className='group flex flex-col gap-6 cursor-pointer'>
                    <div className='relative transition-transform duration-500 group-hover:scale-107 ease-[cubic-bezier(0.34,1.56,0.64,1.5)]'>
                      <Link href={items.link} target='_blank' className='block relative w-full h-full'>
                        <Image
                          src={items.image}
                          alt={items.title}
                          width={625}
                          height={410}
                          className='rounded-2xl'
                          unoptimized={true}
                        />
                        <div className='absolute inset-0 bg-transparent shadow-[inset_0_0_60px_rgba(0,0,0,0.9)] rounded-2xl pointer-events-none z-10' />
                      </Link>
                    </div>

                    <div className='flex flex-col items-start gap-4'>
                      <h5 className='group-hover:text-purple_blue'>
                        {items.title}
                      </h5>
                      <div className='flex gap-3'>
                        {items.tag?.map((tag: any, index: number) => (
                          <p
                            key={index}
                            className='text-sm border border-dark_black/10 dark:border-white/50 w-fit py-1.5 px-4 rounded-full hover:bg-dark_black hover:text-white'>
                            {tag}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OnlinePresence
