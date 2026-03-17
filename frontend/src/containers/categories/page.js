import Link from 'next/link'
import { categories } from '../../helper/helper'
import * as React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const Categories = () => {
  return (
      <div className="lg:flex mx-6 my-10 gap-6">
        <div className="about-Eternalgames p-6 bg-slate-900 rounded-xl xs:mb-6 lg:mb-0">
          <h2 className="font-sans font-bold pb-4 xs:text-base ld:text-lg">About Eternal games</h2>
          <p className="text-wrap pb-4 text-sm text-gray-400 xs:text-sm ld:text-base">CrazyGames features the latest and best free online games. You can enjoy playing fun games without
            interruptions from downloads, intrusive ads, or pop-ups.
          </p>
          <Link className="text-lime-400 font-bold font-sans xs:text-sm ld:text-base" href="/frontend/public">Learn More</Link>
        </div>
        <div className="h-full lg:w-3/4 w-full">
          <Swiper
              className="flex flex-row"
              slidesPerView={5}
              spaceBetween={10}
              pagination={{ clickable: true }}
              scrollbar={false}
              breakpoints={{
                320: {
                  slidesPerView: 2,
                  spaceBetween: 8
                },
                500: {
                  slidesPerView: 3,
                  spaceBetween: 10
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 10
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 10
                },
                1440: {
                  slidesPerView: 6,
                  spaceBetween: 10
                }
              }}
          >
            {
              categories.map((category, index) => (
                  <SwiperSlide key={index} className="font-sans font-bold">
                    <div className="m-auto bg-slate-900 h-1/2 pl-6 py-8 rounded-xl text-lime-400 hover:text-lime-500">
                      <div className="text-3xl">
                        {category.tag1.icon}
                      </div>
                      <div className="mt-2 text-white">
                        {category.tag1.title}
                      </div>
                    </div>
                    <div className="bg-slate-900 mt-4 h-1/2 pl-6 py-8 rounded-xl text-lime-400 hover:text-lime-500">
                      <div className="text-3xl">
                        {category.tag2.icon}
                      </div>
                      <div className="mt-2 text-white">
                        {category.tag2.title}
                      </div>
                    </div>
                  </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </div>
  )
}

export default Categories
