'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaPlay, FaRegComments, FaRegThumbsDown, FaRegThumbsUp, FaShareAlt } from 'react-icons/fa'
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md'
import NavBar from '../../../components/navbar/page'
import Footer from '../../../components/footer/page'
import PacmanLoader from 'react-spinners/PacmanLoader'
import { GoogleAnalytics } from '@next/third-parties/google'
import ShareModal from '../../../components/share-model/page'
import { ADSENCE_CLIENT_ID, LIVE_URL } from '../../../helper/constant'
import moment from 'moment'
import { Adsense } from '@ctrl/react-adsense'

export default function GamePageClient({ game, description, sideGames, slug }) {
  const descriptionRef = useRef()
  const iframeRef = useRef(null)
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [playGame, setPlayGame] = useState(false)
  const [mobileExitFullScreen, setMobileExitFullScreen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [playGameShowAd, setPlayGameShowAd] = useState(false)

  useEffect(() => {
    setIsFullScreen(false)
    setPlayGame(false)
    setMobileExitFullScreen(false)
    document.title = `EternalGames - ${game?.gameName}`
    if (descriptionRef.current && description) {
      descriptionRef.current.innerHTML = description
    }
    if (!game) {
      router.push('/')
    } else {
      setLoading(false)
    }
  }, [slug, description, game])

  useEffect(() => {

    const script = document.createElement('script');
    const script1 = document.createElement('script');
    script.src = '/ad_script.js';
    script1.src = '/ad_script.js';
    script.async = true;
    script1.async = true;


    document.body.appendChild(script);
    document.body.appendChild(script1);
    
    return () => {
      document.body.appendChild(script1);
      document.body.removeChild(script);
    };
  }, [])

  const goFullscreen = () => {
    const content = document.documentElement
    if (!isFullScreen) {
      setPlayGame(true)
      if (content.requestFullscreen) {
        content.requestFullscreen().then(() => setIsFullScreen(true)).catch(err => console.log(err))
      } else if (content.mozRequestFullScreen) {
        content.mozRequestFullScreen().then(() => setIsFullScreen(true)).catch(err => console.log(err))
      } else if (content.webkitRequestFullscreen) {
        content.webkitRequestFullscreen().then(() => setIsFullScreen(true)).catch(err => console.log(err))
      } else if (content.msRequestFullscreen) {
        content.msRequestFullscreen().then(() => setIsFullScreen(true)).catch(err => console.log(err))
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullScreen(false)).catch(err => console.log(err))
      } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen().then(() => setIsFullScreen(false)).catch(err => console.log(err))
      } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
        document.webkitExitFullscreen().then(() => setIsFullScreen(false)).catch(err => console.log(err))
      } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen().then(() => setIsFullScreen(false)).catch(err => console.log(err))
      }
    }
    setIsFullScreen(prevState => !prevState)
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement)
      if (iframeRef.current) {
        iframeRef.current.focus()
        if (!document.fullscreenElement && window.innerWidth <= 435) {
          iframeRef.current.style.display = 'none'
        } else {
          iframeRef.current.style.display = 'block'
        }
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('mozfullscreenchange', handleFullscreenChange)
    document.addEventListener('MSFullscreenChange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange)
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange)
    }
  }, [])

  function exitFullScreen() {
    if (window.innerWidth <= 435) {
      setMobileExitFullScreen(true)
      goFullscreen()
    } else {
      goFullscreen()
    }
  }

  function fullScreenGame() {
    if (mobileExitFullScreen) {
      goFullscreen()
      setMobileExitFullScreen(false)
      console.log('button clicked')
      window.scrollBy(0, 4)
    } else if (!mobileExitFullScreen) {
      goFullscreen()
      window.scrollBy(0, 4)
    }
  }

  function handleClickOnGame() {
    setPlayGame(false)
    setMobileExitFullScreen(false)
  }

  function handleCloseShareModal() {
    setIsShareModalOpen(false)
  }

  return (
    <>
      {/* {
        playGameShowAd ? <div className="absolute top-0 left-0 right-0 z-40 w-screen h-screen bg-black opacity-70" onClick={(e) => e.stopPropagation()}>
          <div className='flex items-start justify-end mt-3 mr-3'>
            <button className='bg-white text-black z-50 py-2 px-3' onClick={() => setPlayGameShowAd(false)}>X</button>
          </div>
          <ins class="adsbygoogle"
            style="display:block"
            data-ad-client="ca-pub-5284860989721758"
            data-ad-slot="9209979480"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
        </div> : null
      } */}
      <div className='flex items-start justify-end mt-3 mr-3'>
        <ins className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-5284860989721758"
          data-ad-slot="9209979480"
          data-ad-format="auto"
          data-full-width-responsive="true" />
      </div>
      <div className={`w-screen text-white overflow-x-hidden ${playGameShowAd ? 'overflow-y-hidden h-screen' : 'overflow-y-auto min-h-screen'}`}>
        <ShareModal open={isShareModalOpen} handleClose={handleCloseShareModal} shareUrl={`${LIVE_URL}game/${game?.slug}`} />
        {isFullScreen ? null : <NavBar />}
        {loading ? <div className="absolute w-full top-[46%]">
          <PacmanLoader
            color="rgb(190 242 100)"
            size={20}
            speedMultiplier={2}
            cssOverride={{
              flex: 1,
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
          />
        </div> :
          <div className={`${isFullScreen ? 'mx-1' : 'mx-4 font-sans'}`}>
            <div className={`${isFullScreen ? '' : 'flex flex-row gap-4 pt-3'}`}>
              {
                isFullScreen ? null :
                  <div className="hidden 2xl:block basis-[200px]">
                    {
                      sideGames.slice(0, 13).map((game) => {
                        return (
                          <div key={game?._id} onClick={() => handleClickOnGame()}>
                            <Link href={{ pathname: `/game/${game?.slug}` }}>
                              <img className="rounded-lg mb-4 h-28" src={game?.thumbnail} width={200} height={100} alt={game?.gameName} />
                            </Link>
                          </div>
                        )
                      })
                    }
                  </div>
              }
              <div className={`${isFullScreen ? '' : 'w-full xl:basis-[80%] 2xl:basis-[calc(80%-200px)]'}`}>
                <div className="game-thumbnail-div flex relative">
                  <div className={`${playGame ? 'hidden' : 'absolute w-full h-full mx-auto xs:hidden sm:flex flex-row items-center justify-center bg-transBlack z-30'}`}>
                    <button className="py-3 px-6 rounded-full flex flex-row items-center gap-2 bg-lime-500 text-base font-extrabold" onClick={() => {
                      setPlayGame(true)
                      setPlayGameShowAd(true)
                    }}><FaPlay />Play Now</button>
                  </div>
                  <div className={`${isFullScreen ? 'w-screen h-screen' : 'w-full h-auto'} ${playGame && !mobileExitFullScreen ? 'visible' : 'hidden'}`}>
                    <iframe
                      className={`w-full ${playGame && !mobileExitFullScreen ? 'visible' : 'hidden'}`}
                      ref={iframeRef} src={game?.url} height={`${isFullScreen ? '100%' : 600}`} />
                    {isFullScreen ? <button className="fixed bottom-2 right-2 p-1 bg-slate-800 rounded-lg" onClick={() => exitFullScreen()}>
                      <MdFullscreenExit size={30} />
                    </button> : null
                    }
                  </div>
                  {
                    playGame && !mobileExitFullScreen ? null :
                      <div className="w-full">
                        <div className="relative w-full">
                          <img className="game-thumbnail w-full" src={game?.thumbnail} alt={game?.gameName} />
                          <div className="absolute -bottom-1 bg-gradient-to-b from-transparent via-transBlack to-transBlack2 to-90% w-full h-full xs:block sm:hidden z-20" />
                        </div>
                        <div className="absolute bottom-24 w-full z-40 xs:block sm:hidden">
                          <img className="w-2/4 rounded-xl mx-auto" src={game?.thumbnail} style={{ height: '120px' }} alt={game?.gameName} />
                        </div>
                        <div className="h-20 xs:block sm:hidden" />
                        <div className={`${isFullScreen ? 'hidden' : 'mb-6 mx-auto flex flex-row items-center justify-center sm:hidden xs:flex'}`}>
                          <button className="py-3 px-6 rounded-full flex flex-row items-center gap-2 bg-lime-500 text-base font-extrabold" onClick={() => {
                            setPlayGameShowAd(true)
                            fullScreenGame()
                          }}>
                            <FaPlay />{playGame ? 'Continue Playing...' : 'Play Now'}</button>
                        </div>
                      </div>
                  }
                </div>
                {isFullScreen ? null : <div className="flex flex-row items-center justify-end pl-3 w-full bg-slate-800">
                  <div className="flex flex-row items-center justify-end gap-5 p-4 ">
                    <div className="cursor-pointer"><FaRegThumbsUp size={18} /></div>
                    <div className="cursor-pointer"><FaRegThumbsDown size={18} /></div>
                    <div className="cursor-pointer"><FaRegComments size={22} /></div>
                    <div className="cursor-pointer"
                      onClick={() => setIsShareModalOpen(prevState => !prevState)}
                    ><FaShareAlt size={18} /></div>
                    <div className="cursor-pointer xs:hidden sm:block">
                      {
                        playGame ? <div onClick={() => goFullscreen()}><MdFullscreen size={30} /></div> :
                          <div><MdFullscreen color="#616161" size={30} /></div>
                      }
                    </div>
                  </div>
                </div>
                }
                {isFullScreen ? null : <div className="h-32 w-full mt-4 bg-slate-800 rounded-xl">
                  <ins className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client="ca-pub-5284860989721758"
                    data-ad-slot="9209979480"
                    data-ad-format="auto"
                    data-full-width-responsive="true" />
                </div>}
                {isFullScreen ? null :
                  <div className="hidden lg:grid grid-flow-row grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 mt-4">
                    {
                      sideGames.slice(0, 12).map((game) => {
                        return (
                          <div key={game?._id} className="w-full" onClick={() => handleClickOnGame()}>
                            <Link href={{ pathname: `/game/${game?.slug}` }}>
                              <img className="rounded-lg h-28 w-full" src={game?.thumbnail} alt={game?.gameName} />
                            </Link>
                          </div>
                        )
                      })
                    }
                  </div>
                }
                {
                  isFullScreen ? null :
                    <div className="my-4 w-full bg-slate-900 p-2 rounded-lg">
                      <div className="flex flex-row gap-4">
                        <div className="w-full p-4">
                          <div className="font-extrabold text-2xl">{game?.gameName}</div>
                          <div className="flex gap-4 my-4">
                            <button className="flex flex-row items-center gap-2 font-bold bg-slate-700 rounded-full py-2 px-4"
                              onClick={() => setIsShareModalOpen(prevState => !prevState)}
                            >
                              <FaShareAlt size={15} />Share
                            </button>
                            {/*<button className="flex flex-row items-center gap-2 font-bold bg-slate-700 rounded-full py-2 px-4"><ImEmbed2 size={20}/>Embed</button>*/}
                          </div>
                          <div className="text-sm border-b pb-4 border-gray-700">
                            {/*<div className="flex gap-2">*/}
                            {/*  <div className="w-28 mt-1 text-gray-500">Rating:</div>*/}
                            {/*  <div><b className="text-lg">{game?.rating}</b></div>*/}
                            {/*</div>*/}
                            <div className="flex gap-2 mt-1 ">
                              <div className="w-28 text-gray-500">Released:</div>
                              <div>{moment(game?.createdOn).format('DD MMM, YYYY')}</div>
                            </div>
                            <div className="flex gap-2 mt-1 ">
                              <div className="w-28 text-gray-500">Last Updated:</div>
                              <div>{moment(game?.updatedOn).format('DD MMM, YYYY')}</div>
                            </div>
                            {/*<div className="flex gap-2 mt-1 ">*/}
                            {/*  <div className="w-28 text-gray-500">Technology:</div>*/}
                            {/*  <div>{game?.technology}</div>*/}
                            {/*</div>*/}
                            {/*<div className="flex gap-2 mt-1 ">*/}
                            {/*  <div className="w-28 text-gray-500">Platforms:</div>*/}
                            {/*  <div>{game?.platform}</div>*/}
                            {/*</div>*/}
                            {/*<div className="flex gap-2 mt-1">*/}
                            {/*  <div className="w-28 text-gray-500">Classification:</div>*/}
                            {/*  <div className="flex gap-2 text-lime-500">*/}
                            {/*    <div className="font-bold hover:text-lime-600">{game?.categories?.categoryName}</div>*/}
                            {/*    »*/}
                            {/*  </div>*/}
                            {/*</div>*/}
                          </div>
                          {/*<div ref={descriptionRef} className="my-6 text-sm leading-6 tracking-wide text-gray-200">*/}
                          {/*  {parse(game?.description)}*/}
                          {/*</div>*/}
                          <div className="my-6 text-sm leading-6 tracking-wide text-gray-200 reset-all" dangerouslySetInnerHTML={{ __html: game?.description || '' }} />
                          <div className="mb-8 text-sm">{game?.shortDescription}</div>
                        </div>
                        <div className="bg-slate-800 h-96 w-1/3 rounded-xl nm:block xs:hidden">
                          <Adsense
                            client={ADSENCE_CLIENT_ID}
                            slot="4317649413"
                            style={{ height: '384px', width: '33.33%' }}
                            format=""
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-start gap-3 mx-6 mb-8">
                        {
                          game?.categories?.map((tag) => {
                            return (
                              <div key={tag._id} className="flex items-center gap-2 px-4 py-2 bg-slate-600 rounded-full text-sm">
                                <img className="rounded-full my-px h-full" src={tag?.categoryIcon} width={20} height={20} alt="game" />
                                <div>{tag?.categoryName}</div>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                }
              </div>
              {
                isFullScreen ? null : <div className="basis-[20%] hidden xl:block">
                  <div className="h-1/2 w-full bg-slate-800 rounded-xl mb-5">
                    <Adsense
                      client={ADSENCE_CLIENT_ID}
                      slot="4452072240"
                      style={{ height: '100%' }}
                      format=""
                    />
                  </div>
                  {
                    isFullScreen ? null :
                      <div className="xs:hidden xl:block">
                        {
                          sideGames.slice(0, 4).map((game) => {
                            return (
                              <div key={game?._id} className="w-full h-auto" onClick={() => handleClickOnGame()}>
                                <Link href={{ pathname: `/game/${game?.slug}` }}>
                                  <img className="rounded-lg mb-4 w-full h-48" src={game?.thumbnail} width={'100%'} alt={game?.gameName} />
                                </Link>
                              </div>
                            )
                          })
                        }
                      </div>
                  }
                </div>
              }
            </div>
            {
              isFullScreen ? null :
                <div
                  className="grid grid-flow-row grid-cols-[repeat(auto-fit,minmax(125px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(140px,1fr))] nm:grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4 mt-4 mb-16">
                  {
                    sideGames.slice(0, 18).map((game) => {
                      return (
                        <div key={game?._id} onClick={() => handleClickOnGame()}>
                          <Link href={{ pathname: `/game/${game?.slug}` }}>
                            <img className="rounded-lg w-full h-28" src={game?.thumbnail} alt="game" />
                          </Link>
                        </div>
                      )
                    })
                  }
                </div>
            }
          </div>
        }
        {isFullScreen ? null : <Footer />}
        <GoogleAnalytics gaId="G-TF62GHPFEJ" />
      </div>
    </>
  )
}
