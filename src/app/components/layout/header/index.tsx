'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { Icon } from '@iconify/react/dist/iconify.js'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import HeaderLink from './Navigation/HeaderLink'
import { headerData } from './Navigation/Menudata'
import Logo from './Logo'
import ThemeToggler from './ThemeToggle'
import CurvedMenu from '../../ui/curved-menu'

const Header = () => {
  const { data: session } = useSession()
  const [user, setUser] = useState<{ user: any } | null>(null)
  const [sticky, setSticky] = useState(false)
  const pathname = usePathname()

  const handleScroll = () => {
    setSticky(window.scrollY >= 80)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname])

  const handleSignOut = () => {
    localStorage.removeItem('user')
    signOut()
    setUser(null)
  }

  // On home page, only show header after scrolling past hero section
  const isHomePage = pathname === '/'
  const showHeader = !isHomePage || sticky

  // Convert headerData to curved menu format
  const curvedMenuItems = headerData.map((item) => ({
    heading: item.label,
    href: item.href,
  }))

  return (
    <>
      {/* Curved Menu - Visible on all screen sizes */}
      <CurvedMenu navItems={curvedMenuItems} />

      <header className={`fixed top-0 z-40 w-full transition-transform duration-300 ${!showHeader ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className='container p-3'>
          <nav
            className={`flex items-center py-3 px-4 justify-between ${
              sticky
                ? ' rounded-full shadow-sm bg-white dark:bg-dark_black'
                : null
            } `}>
            <div className='flex items-center'>
              <Logo />
            </div>
            {/* Hide the horizontal navigation menu - now using curved menu */}
            <div className='hidden'>
              <ul className='flex gap-0 2xl:gap-1.5'>
                {headerData.map((item, index) => (
                  <HeaderLink key={index} item={item} />
                ))}
              </ul>
            </div>
            <div className='flex items-center gap-1 xl:gap-4'>
              {/* ---------------------SignUp SignIn Button-----------------  */}
              {user?.user || session?.user ? (
                <div className='hidden lg:flex gap-4'>
                  <button
                    onClick={() => handleSignOut()}
                    className='flex group font-normal items-center gap-1 transition-all duration-200 ease-in-out text-white px-4 py-2 bg-dark_black dark:bg-white/15 rounded-full hover:text-dark_black hover:bg-white dark:hover:bg-white/5 dark:hover:text-white border border-dark_black'>
                    Sign Out
                    <Icon icon='solar:logout-outline' width='25' height='25' />
                  </button>
                  <div className='relative group'>
                    <Image
                      src='/images/home/avatar_1.jpg'
                      alt='Image'
                      width={40}
                      height={40}
                      quality={100}
                      className='rounded-full cursor-pointer'
                    />
                    <p className='absolute w-fit text-sm text-center z-10 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-200 bg-white dark:bg-white/5 text-dark_black/60 p-1 min-w-28 rounded-lg shadow-2xl top-full left-1/2 transform -translate-x-1/2 mt-3'>
                      {user?.user || session?.user?.name}
                    </p>
                  </div>
                </div>
              ) : (
                <div className='flex items-center gap-2'>
                  <Link
                    href={'/signin'}
                    className='hidden lg:block bg-transparent border border-dark_black dark:border-white/50 text-primary px-2.5 xl:px-4 py-2 rounded-full hover:bg-dark_black hover:text-white'>
                    Sign In
                  </Link>
                  <Link
                    href={'/signup'}
                    className='hidden lg:block text-white px-2.5 xl:px-4 py-2  bg-dark_black dark:bg-white/20 rounded-full hover:opacity-90'>
                    Sign Up
                  </Link>
                </div>
              )}

              {/* ---------------------Light/Dark Mode button-------------------- */}
              <ThemeToggler />
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header
