import React from 'react'
import Link from 'next/link'
import 'swiper/css'
import { Box, Skeleton } from '@mui/material'

const Desktop = ({ helper, name, isWidthFull = true }) => {
  return (
      <div className="mx-1 sm:mx-4">
        <h2 className="font-medium text-2xl font-sans text-lime-300 mt-4">{name}</h2>
        {
          helper.length ?
              <div className="grid grid-flow-row grid-cols-[repeat(auto-fit,minmax(120px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(170px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3 mt-4 mb-10">
                {
                  helper.map((item) => (
                      <div key={item._id} className={`h-24 md:h-28 lg:h-32 ${isWidthFull ? 'w-full' : 'w-[120px] sm:w-[170px] md:w-[200px] lg:w-[250px]'}`}>
                        <Link href={{ pathname: `/game/${item?.slug}` }}>
                        <img className="rounded-xl h-full w-full" src={item.thumbnail} alt={item?.gameName}/>
                        </Link>
                      </div>

                  ))
                }
              </div> : <Box
                  className="flex flex-row items-center flex-wrap justify-center shrink gap-4 mt-4 mb-10"
              >
                {Array.from({ length: 6 }).map((_, index) => (
                    <Box key={index} className="homepage-games">
                      <Skeleton
                          variant="rectangular"
                          width="100%"
                          height="100%"
                          sx={{ borderRadius: '12px', bgcolor: 'grey.700' }}
                      />
                    </Box>
                ))}
              </Box>
        }
      </div>
  )
}

export default Desktop
