'use client'
import React, { useEffect } from 'react'
import { FaDraftingCompass, FaFileAlt, FaNewspaper, FaSitemap } from 'react-icons/fa'
import { GoogleAnalytics } from '@next/third-parties/google'
import Navbar from '../../components/navbar/page'
import Footer from '../../components/footer/page'

export default function Developer() {

  useEffect(() => {
    document.title = `EternalGames - Developer`
  }, [])


  return (
      <>
        <Navbar/>
        <div className="relative pt-16 mb-16">
          <div className="container mx-auto">
            <div className="flex flex-wrap items-center">
              <div className="w-full md:w-6/12 px-4">
                <div className="flex flex-wrap md:grid md:grid-cols-2 md: grid-rows-2 gap-4">
                  <div className="relative flex flex-col h-full">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg shadow-gray-600 rounded-full bg-white">
                        <FaSitemap size={20}/>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">CSS Components</h6>
                      <p className="mb-4 text-blueGray-500">
                        Notus JS comes with a huge number of Fully Coded CSS
                        components.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg shadow-gray-600 rounded-full bg-white">
                        <FaDraftingCompass size={20}/>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                        JavaScript Components
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                        We also feature many dynamic components for React, NextJS,
                        Vue and Angular.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg shadow-gray-600 rounded-full bg-white">
                        <FaNewspaper size={20}/>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">Pages</h6>
                      <p className="mb-4 text-blueGray-500">
                        This extension also comes with 3 sample pages. They are
                        fully coded so you can start working instantly.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg shadow-gray-600 rounded-full bg-white">
                        <FaFileAlt size={20}/>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">Documentation</h6>
                      <p className="mb-4 text-blueGray-500">
                        Built by developers for developers. You will love how easy
                        is to to work with Notus JS.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mx-auto -mt-78">
                <div className="relative flex flex-col break-words w-full mb-6 shadow-lg rounded-lg bg-deepPrimary">
                  <img className="w-full align-middle rounded-t-lg"
                       src="https://media.istockphoto.com/id/1530256492/vector/software-development-concept-laptop-with-open-screen-hanging-over-desk-coding-or-programming.jpg?s=612x612&w=0&k=20&c=LLywtLnfu5FETIvkaFjy_xcHnaIGmaKZYxcPKAoyPcA="
                       alt="about-card-img"/>
                  <div className="relative p-8 mb-4">
                    <h4 className="text-xl font-bold text-white">
                      Great for your awesome project
                    </h4>
                    <p className="text-md font-light mt-2 text-white">
                      Putting together a page has never been easier than matching
                      together pre-made components. From landing pages presentation
                      to login areas, you can easily customise and built your pages.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <GoogleAnalytics gaId="G-TF62GHPFEJ"/>
        <Footer/>
      </>
  )
}
