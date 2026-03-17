'use client'
import { useSearchParams } from 'next/navigation'
import Navbar from '../../components/navbar/page'
import Footer from '../../components/footer/page'
import React, { useEffect, useState } from 'react'
import gameService from '../../services/game.service'
import SearchedGameCard from '../../components/desktop-medium-card/page'
import GameCards from '../../components/game-cards/page'
import { GoogleAnalytics } from '@next/third-parties/google'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query')

  const [ isResultNotExist, setIsResultNotExist ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(true)
  const [ filteredGames, setFilteredGames ] = useState([])
  const [ games, setGames ] = useState([])

  useEffect(() => {
    if(!query) {
      setIsResultNotExist(true)
    }
    document.title = `EternalGames - Search`
    handleSearch()
  }, [ query ])

  async function handleSearch() {
    try {
      setIsLoading(true)
      const response = await gameService.getGameList()

      setGames(response.games)
      const term = query.toLowerCase()
      const filtered = response.games.filter(
          (game) =>
              game.gameName.toLowerCase().includes(term) ||
              game.shortDescription.toLowerCase().includes(term)
      )

      if (filtered.length === 0) {
        setIsResultNotExist(true)
      } else {
        setIsResultNotExist(false)
      }

      await setFilteredGames(filtered)
      setIsLoading(false)
    } catch (error) {
      console.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
      <div className="w-screen text-white min-h-screen overflow-x-hidden">
        <Navbar/>
        <div className="flex flex-col">
          {
            isResultNotExist ?
                <div className="mx-auto w-10/12 my-8 rounded-lg py-3 bg-slate-900">
                  <p className="mb-5 font-bold text-center text-lg font-sans text-lime-300 mt-4">No results found for "{query}"</p>
                </div> :
                <SearchedGameCard helper={filteredGames} name={'Matching Results'} isWidthFull={false}/>
          }
          {
            !isLoading ?
                (
                    filteredGames.length < 9 ?
                        <div className="mx-4 mb-5">
                          <p className="mb-5 font-bold text-lg font-sans text-lime-300 mt-4">Must-Play Games</p>
                          <div className="grid grid-flow-row grid-cols-[repeat(auto-fit,minmax(120px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3 mt-4 mb-10">
                            <GameCards games={games} endSlice={10}/>
                          </div>
                        </div> : null
                ) : null
          }
        </div>
        <Footer/>
        <GoogleAnalytics gaId="G-TF62GHPFEJ"/>
      </div>
  )
}
