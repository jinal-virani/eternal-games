'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/page'
import Footer from '../components/footer/page'
import Image from 'next/image'
import gameService from '../services/game.service'
import GameCards from '../components/game-cards/page'

export default function Page() {

  const [ games, setGames ] = useState([])

  useEffect(() => {
    getGames()
  }, [])

  async function getGames() {
    try {
      const response = await gameService.getGameList()
      setGames(response?.games)
    } catch (error) {
      console.log(error.message)
    }
  }


  return <div className="w-screen h-screen bg-center bo-contain bg-no-repeat z-50">
    <Navbar/>
    <div className="flex flex-col items-center py-6">
      <Image src={'/404.png'} width={300} height={160} alt={'error-404'}/>
      <p className="text-5xl text-white font-bold" style={{ fontFamily: '"Jersey 15", serif', fontWeight: 400 }}>Page not found</p>
      <div className="mt-10 mx-4 md:mt-20 lg:mt-32 grid grid-rows-2 items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <GameCards games={games} startSlice={0} endSlice={8}/>
      </div>
    </div>
    <Footer/>
  </div>
}
