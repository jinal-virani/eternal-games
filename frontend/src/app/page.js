'use client'
import { GoogleAnalytics } from '@next/third-parties/google'
import React, { useEffect, useState } from 'react'
import Desktop from '../components/desktop-medium-card/page'
import Footer from '../components/footer/page'
import NavBar from '../components/navbar/page'
import SpecialCard from '../components/SpecialGameCard/page'
import CarouselMain from '../containers/carousel-main/page'
import gameService from '../services/game.service'

export default function Home() {

  const [game, setGame] = useState([])
  const [loading, setLoading] = useState(false)
  const [trendingGames, setTrendingGames] = useState([])
  const [featureGames, setFeatureGames] = useState([])

  useEffect(() => {
    getGames()
    fetchTrendingGames()
    fetchFeatureGames()
  }, [])

  async function getGames() {
    try {
      setLoading(true)
      const response = await gameService.getGameList()
      setGame(response.games)
      setLoading(false)
    } catch (error) {
      console.log(error.message)
    }
  }

  async function fetchTrendingGames() {
    try {
      const response = await gameService.getTrendingGames();
      setTrendingGames(response.trendings)
    } catch (error) {
      console.log(error.message)
    }
  }

  async function fetchFeatureGames() {
    try {
      const response = await gameService.getFeatureGames();
      setFeatureGames(response.features)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/ad_script.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [])

  return (
    <>
      <div className="w-screen text-white min-h-screen overflow-x-hidden">
        <NavBar />
        <div className="home-page-sliders h-auto px-3 !z-30 sm:px-5">
          <ins className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-5284860989721758"
            data-ad-slot="9209979480"
            data-ad-format="auto"
            data-full-width-responsive="true" />
          <h1 className="font-medium text-3xl font-sans text-lime-300 mt-5">Featured Games – Play the Best Eternal Games Brain & Puzzle Games</h1>
          <CarouselMain helper={game} loading={loading} />
          <SpecialCard isHorizontal={true} games={trendingGames} name={'Discover Fun and Challenging Eternal Games'} loading={loading} />
          <SpecialCard isHorizontal={true} games={featureGames} name={'Eternal Brain Games to Boost Your Thinking Skills'} loading={loading} />
          <Desktop name={'Free Eternal Puzzle Games for Mental Challenges'} helper={game} />
        </div>
        <Footer />
        <GoogleAnalytics gaId="G-TF62GHPFEJ" />
      </div>
    </>
  )
}
