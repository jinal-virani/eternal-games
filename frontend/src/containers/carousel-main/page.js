import React from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import { Skeleton } from '@mui/material'

const CarouselMain = ({ helper, loading }) => {

  return (
      <ImageList
          sx={{ margin: '20px 20px 60px', width: 'auto', display: 'flex' }}
          className="home-slider"
          variant="quilted"
          cols={4}
          rowHeight={135}
      >
        <Swiper
            className="h-auto w-screen"
            spaceBetween={10}
            slidesPerView={4}
            speed={1700}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false
            }}
            modules={[ Autoplay ]}
            loop={true}
            pagination={{ clickable: true }}
            scrollbar={false}
            breakpoints={{
              300: {
                slidesPerView: 1,
                spaceBetween: 8
              },
              535: {
                slidesPerView: 1.3,
                spaceBetween: 10
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 10
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 10
              },
              1440: {
                slidesPerView: 4,
                spaceBetween: 10
              }
            }}
        >
          {
            loading ? (
                    [ 1, 2, 3, 4, 5 ].map((index) => {
                      return (
                          <ImageListItem key={`main-${index}`} cols={1} rows={1}>
                            <SwiperSlide key={`main-${index}`}>
                              <Skeleton
                                  variant="rectangular"
                                  width={500}
                                  height={'100%'}
                                  sx={{ borderRadius: '8px', bgcolor: 'grey.700' }}
                              />
                            </SwiperSlide>
                          </ImageListItem>
                      )
                    })) :
                (
                    helper.slice(0, 5).map((item) => {
                      return (
                          <ImageListItem key={`main-${item._id}`} cols={item.cols || 1} rows={item.rows || 1}>
                            <SwiperSlide key={`main-${item._id}`}>
                              <Link href={{ pathname: `/game/${item?.slug}` }}>
                                <img
                                    className="rounded-lg h-full"
                                    width={500}
                                    src={item.thumbnail}
                                    alt={item.gameName}
                                />
                              </Link>
                            </SwiperSlide>
                          </ImageListItem>
                      )
                    }))
          }
        </Swiper>
      </ImageList>
  )
}

export default CarouselMain
