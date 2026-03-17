import Product from './Product'
// import ProductData from "../static/Global";
import { useEffect, useState } from 'react'
import axios from 'axios'
import Skeleton from './Skeleton'

function Products() {
  const [ games, setGames ] = useState([])
  const [ loading, setLoading ] = useState(false)
  const colors = [
    {
      bgcolor: 'bg-orange-500'
    },
    {
      bgcolor: 'bg-teal-500'
    },
    {
      bgcolor: 'bg-violet-500'
    },
    {
      bgcolor: 'bg-rose-500'
    },
    {
      bgcolor: 'bg-amber-500'
    },
    {
      bgcolor: 'bg-green-700'
    },
    {
      bgcolor: 'bg-sky-600'
    },
    {
      bgcolor: 'bg-gray-400'
    },
    {
      bgcolor: 'bg-red-400	'
    },
    {
      bgcolor: 'bg-indigo-400	'
    },
    {
      bgcolor: 'bg-lime-600'
    },
    {
      bgcolor: 'bg-yellow-800'
    }
  ]

  function getRandomTheme() {
    return colors[Math.floor(Math.random() * colors.length)]
  }

  // for API
  useEffect(() => {
    setLoading(true)
    axios.get('https://api.eternalgames.io/v1/website').then((res) => {
      console.log(res)
      setGames(res.data.websites)
      setLoading(false)
    })
  }, [])

  return (<>
        {loading ?
            <section>
              <Skeleton count={12}/>
            </section>
            :
            <div className="w-screen animate-slow-pulse bg-[#d9f6f8] grid grid-cols-2 gap-2 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2
      lg:gap-10 xl:gap-2 2xl:px-28 max-sm:p-1
      min-[2560px]:gap-10 min-[2560px]:px-60
      md:px-4 sm:px-10 pt-10">
              {
                games.map((productItem, index) => <Product key={index} data={productItem} theme={getRandomTheme()}/>)
              }
            </div>
        }
      </>
  )
}

export default Products
