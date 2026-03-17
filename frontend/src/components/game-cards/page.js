import React from 'react'
import Link from 'next/link'

export default function GameCards({ games, startSlice = 0, endSlice = games.length }) {
  return (
      <React.Fragment>
        {
          games.slice(startSlice, endSlice ).map((game) => {
            return (
                <div key={game?._id}>
                  <Link href={{ pathname: `/game/${game?.slug}` }}>
                  <img className="rounded-lg h-24 md:h-28 lg:h-32 w-full" src={game?.thumbnail} alt={game?.gameName}/>
                  </Link>
                </div>
            )
          })
        }
      < /React.Fragment>
  )
}
