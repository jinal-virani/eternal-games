'use client'
import React, { useState, useEffect } from 'react'
import Header from '../../../components/navbar/page'
import Footer from '../../../components/footer/page'
import { GoogleAnalytics } from '@next/third-parties/google'
import gameService from '../../../services/game.service'
import Link from 'next/link'

export default function Games() {

  const [ games, setGames] = useState([])

  useEffect(() => {
    document.title = `EternalGames - Sitemap Games`
    getGames()
  }, [])

  async function getGames() {
    try {
      const response = await gameService.getGameList()
      if (response?.games) {
        setGames(response?.games)
      }
    } catch (error) {
      console.error('Error fetching game list:', error.message)
    }
  }

  return (
      <div className="bg-black min-h-screen w-screen">
        <Header/>
        <div className="max-w-6xl mx-5 xl:mx-auto pt-12 pb-20">
          <div className='mb-8 flex flex-col gap-1'>
            <p className='text-3xl text-white font-bold'>All Eternal Games</p>
            {/*<p className='text-gray-400'>Page 1</p>*/}
          </div>
          <div className='mx-8 grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-2'>
            {
              games.map((game, index) => (
                  <Link href={`/game?slug=${game.slug}`} className='w-fit' key={index}>
                      <h2 className='font-semibold text-lime-500 transition duration-200 ease-in-out hover:text-lime-700'>{game.gameName}</h2>
                  </Link>
              ))
            }
          </div>
        </div>
        <Footer/>
        <GoogleAnalytics gaId="G-TF62GHPFEJ"/>
      </div>
  )
}
