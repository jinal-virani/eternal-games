'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaFantasyFlightGames } from 'react-icons/fa6'
import { IoSearch } from 'react-icons/io5'
import './page.css'
import { useRouter } from 'next/navigation'
import { MdClose, MdMenu } from 'react-icons/md'

export default function Navbar({ toggleSideBar }) {
  const route = useRouter()

  const [ searchedGame, setSearchedGame ] = useState('')
  const [ isOpen, setIsOpen ] = useState(false)
  const [currentPath, setCurrentPath] = useState('')

  const navLinks = [
    { title: 'Home', link: '/' },
    { title: 'Contact Us', link: '/contact-us' },
    { title: 'Blogs', link: '/blogs' }
  ]

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  return (
      <>
        <div className="w-dvw flex text-lime-400 items-center justify-between top-0 left-0 right-0 md:px-6 xs:px-4 py-4 bg-slate-900/90 z-30 backdrop-blur-sm relative">
          <div className="flex ">
            {/*<button className="mr-10" onClick={toggleSideBar}>*/}
            {/*  <FaBars size={25}/>*/}
            {/*</button>*/}
            <Link href="/">
              <div className="flex gap-4 overflow-y-hidden h-16">
                <img src={'/trans-logo-full.png'} className='object-cover rounded-lg' width={160} alt={'logo'}/>
              </div>
            </Link>
          </div>
          <div className="hidden md:flex relative flex items-center header-search w-5/12 flex mx-auto">
            <input
                id="searchInput"
                className="w-full rounded-xl focus-visible:outline-none pl-4 pr-10 py-2 !bg-slate-800 border-2 border-slate-800"
                type="search"
                placeholder="Search"
                value={searchedGame}
                onChange={(e) => setSearchedGame(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    const value = e.target.value?.trim()
                    if (value) {
                      setSearchedGame(value)
                      route.push(`/search?query=${value}`)
                    }
                  }
                }}
            />
            {
              searchedGame ?
                  <button
                      id="clearButton"
                      onClick={() => setSearchedGame('')}
                      className="absolute right-16 z-50 text-lg text-lime-400"
                  >
                    ✕
                  </button> : null
            }
            <button className="absolute right-2  h-auto text-lime-300" onClick={() => route.push(`/search?query=${searchedGame}`)}>
              <IoSearch size={23}/>
            </button>
          </div>
          <div className='hidden md:flex flex-row items-center gap-5 mr-3'>
            {navLinks.map((item, index) => {
              const isActive = currentPath === item.link
              return (
                  <Link href={item.link} key={index} className="group relative">
                    <p className={`text-base font-medium transition-all duration-300 ease-in-out ${
                        (currentPath.includes('/game') && index === 0) || (currentPath.includes('/blogs') && index === 3) || isActive ? 'text-lime-500' : 'text-white hover:text-lime-500'
                    }`}>
                      {item.title}
                    </p>
                    <span className={`absolute -bottom-1 left-0 w-0 h-[2px] bg-lime-500 transition-all duration-300 group-hover:w-full ${(currentPath.includes('/game') && index === 0) || (currentPath.includes('/blogs') && index === 3) || isActive ? 'w-full' : ''}`}></span>
                  </Link>
              )
            })}
          </div>
          <button
              className="md:hidden bg-black p-2 rounded text-gray-700 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <MdClose color={'#ffffff'} size={24}/> : <MdMenu color={'#ffffff'} size={24}/>}
          </button>
          {/*<div className="flex items-center gap-6">*/}
          {/*  <FaRegHeart size={25}/>*/}
          {/*</div>*/}
        </div>
        {
          isOpen && (
              <div className="absolute z-50 py-2 bg-black/80 shadow-lg w-full">
                <div className='relative mx-3 header-search flex items-center'>
                  <input
                      id="searchInput"
                      className="w-full rounded-xl focus-visible:outline-none pl-4 pr-10 py-2 !bg-slate-800 border-2 border-slate-800"
                      type="search"
                      placeholder="Search"
                      value={searchedGame}
                      onChange={(e) => setSearchedGame(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          const value = e.target.value?.trim()
                          if (value) {
                            setSearchedGame(value)
                            route.push(`/search?query=${value}`)
                          }
                        }
                      }}
                  />
                  {
                    searchedGame ?
                        <button
                            id="clearButton"
                            onClick={() => setSearchedGame('')}
                            className="absolute right-10 z-50 text-lg text-lime-400"
                        >
                          ✕
                        </button> : null
                  }
                  <button className="absolute right-3 h-auto text-lime-300" onClick={() => route.push(`/search?query=${searchedGame}`)}>
                    <IoSearch size={23}/>
                  </button>
                </div>
                <div className='w-full gap-5 md:hidden'>
                  <div className="flex flex-col items-center py-4 space-y-1">
                    {navLinks.map((item, index) => (
                        <Link
                            href={item.link}
                            key={index}
                            className="group w-full text-center py-3 rounded-lg transition-all duration-300 ease-in-out hover:bg-lime-300"
                            onClick={() => setIsOpen(false)}
                        >
                          <p className="text-lg font-medium text-lime-500 group-hover:text-lime-700 transition-colors duration-200">
                            {item.title}
                          </p>
                        </Link>
                    ))}
                  </div>
                </div>
              </div>
          )
        }
      </>
  )
}
