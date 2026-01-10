'use client'
import Slider from 'react-infinite-logo-slider'
import SingleBrand from './SingleBrand'
import { useEffect, useState } from 'react';

function Brand() {
  const [brandList, setbrandList] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/page-data')
        if (!res.ok) throw new Error('Failed to fetch')

        const data = await res.json()
        setbrandList(data?.brandList || [])
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <section>
      <div className='2xl:py-20 py-11'>
        <div className='container'>
          <div className='gap-4'>
            <div className='flex justify-center text-center py-4 relative'>
            <div className='flex justify-center text-center py-4 relative'>
              {/* Text removed as per request */}
            </div>
            </div>

            {brandList && brandList.length > 0 && (
              <div className='py-3 Xsm:py-7'>
                <Slider
                  width='200px'
                  duration={20}
                  pauseOnHover={true}
                  blurBorders={false}>
                  {brandList?.map((items: any, index: any) => (
                    <SingleBrand key={index} brand={items} />
                  ))}
                </Slider>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Brand
