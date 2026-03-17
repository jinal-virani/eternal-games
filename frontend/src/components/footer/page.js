'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaArrowUp, FaRandom } from 'react-icons/fa'
import gameService from '../../services/game.service'
import { useRouter } from 'next/navigation'
import { SOCIAL_MEDIA_LINKS } from '../../helper/constant'

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const Footer = () => {
  const router = useRouter()

  const [ trendingGames, setTrendingGames ] = useState([])

  useEffect(() => {
    fetchTrendingGames()
  }, [])

  async function getRandomGame() {
    try {
      const response = await gameService.getGameList()

      const randomGame = response.games[Math.floor(Math.random() * response.games.length)]
      if (randomGame?.slug) {
        router.push(`/game/${randomGame.slug}`)
      } else {
        console.error('No slug found for the selected game')
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  async function fetchTrendingGames() {
    try {
      const response = await gameService.getTrendingGames()
      setTrendingGames(response.trendings)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
      <>
        <div className="p-8 sticky top-full bg-slate-900 shadow-inner shadow-slate-800 rounded-t-xl w-full">
          <div className="max-w-7xl mx-auto md:flex text-white md:flex-row justify-around xl:justify-between gap-5 mt-2">
            <Link href="/" className="md:basis-[15%] flex gap-4 overflow-y-hidden mx-auto md:mx-0 !w-40 mb-8 md:mb-0">
              <div className="flex gap-4 overflow-y-hidden w-fit h-16">
                <img src={'/trans-logo-full.png'} className="object-cover rounded-lg" width={160} alt={'logo'}/>
              </div>
            </Link>
            <div className="flex flex-col lg:flex-row basis-[70%] lg:basis-[80%] lg:justify-around gap-10">
              <div className="max-w-lg lg:basis-[55%] flex flex-col md:flex-row justify-between lg:w-full gap-5">
                <div className="flex flex-col items-start gap-2">
                  <p className="text-lg font-semibold mb-2">Resources</p>
                  <div className='w-full grid grid-cols-2 justify-between gap-y-2 gap-x-8 sm:gap-x-12 md:flex md:flex-col md:gap-2'>
                    <Link className="hover:text-lime-500 text-nowrap text-[#abb7c4] text-sm transition-colors duration-300" href={'/'}>Home</Link>
                    <Link className="hover:text-lime-500 text-nowrap text-[#abb7c4] text-sm transition-colors duration-300" href={'/blogs'}>Blogs</Link>
                    <Link className="hover:text-lime-500 text-nowrap text-[#abb7c4] text-sm transition-colors duration-300" href="/sitemap/games">Sitemap</Link>
                    <Link className="hover:text-lime-500 text-nowrap text-[#abb7c4] text-sm transition-colors duration-300" href="/contact-us">Contact Us</Link>
                    <Link className="hover:text-lime-500 text-nowrap text-[#abb7c4] text-sm transition-colors duration-300" href="/privacy-policy">Privacy Policy</Link>
                    <Link className="hover:text-lime-500 text-nowrap text-[#abb7c4] text-sm transition-colors duration-300" href="/terms-and-condition">Terms & Condition</Link>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-4">
                  <p className="text-lg font-semibold">Games</p>
                  <div className="w-full grid grid-cols-2 gap-y-2 gap-x-6">
                    {
                      trendingGames.map((game, index) => {
                        return (
                            <Link key={index} className="hover:text-lime-500 text-[#abb7c4] uppercase text-sm transition-colors duration-300" href={`/game/${game?.gameId?.slug}`}>
                              {game?.gameId?.gameName}
                            </Link>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
              <div className="mt-5 lg:mt-0 lg:basis-[30%] flex lg:flex-col xl:flex-row items-center lg:items-start justify-between gap-5 w-full">
                <div className="flex flex-col items-start gap-2">
                  <p className="text-lg font-semibold mb-2">Connect</p>
                  {
                    SOCIAL_MEDIA_LINKS.map((platform, index) => {
                      return (
                          <Link target={'_blank'} className="flex flex-row items-center gap-2 hover:text-lime-500 text-[#abb7c4] text-sm transition-colors duration-300"
                                href={platform?.link}>
                            {platform?.icon}
                            {platform?.name}
                          </Link>

                      )
                    })
                  }
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={getRandomGame}
                          className="flex items-center w-fit gap-2 rounded-full font-medium text-xs sm:text-sm py-2 px-3 hover:border-2 hover:border-lime-500 hover:bg-transparent border-2 border-lime-500 bg-lime-500 font-sans">
                    <FaRandom/> Random Game
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button style={{ zIndex: 999 }}
                  className="fixed bottom-3 right-5 !z-50 flex items-center gap-2 rounded-full font-medium transition duration-200 ease-in-out text-sm p-3 hover:border-2 hover:border-lime-500 hover:bg-transparent border-2 border-lime-500 bg-lime-500 font-sans"
                  onClick={scrollToTop}>
            <FaArrowUp size={23}/>
          </button>
        </div>
      </>
  )
}

export default Footer
