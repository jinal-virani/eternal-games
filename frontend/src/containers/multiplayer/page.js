import Image from 'next/image'
import { multiPlayer, offLineMultiplayer, onLineMultiplayer } from '../../assets/images'
import * as React from 'react'

const Multiplayer = () => {
  return (
      <div className="flex xs:justify-around nm:justify-between xs:gap-2 nm:gap-6 bg-slate-900 m-6 xs:p-2 sm:p-4 rounded-lg">
        <div className="xs:hidden nm:flex flex-row items-center w-fit font-sans font-bold">
          <div className="xs:hidden nm:block nm:text-3xl xs:text-2xl text-wrap pr-2">Play with <br/>friends!</div>
          <Image
              className="relative top-4 xs:hidden lg:block"
              src={multiPlayer}
              width={230}
              height={230}
              alt="gaming"
          />
        </div>
        <div className="md:w-1/3 xs:w-44 my-4 flex items-center justify-center bg-slate-950 w-1/3 p-2 rounded-xl xs:h-48 md:h-auto">
          <div className="flex m-auto">
            <Image
                className="xs:hidden xl:block xl:ml-4"
                src={offLineMultiplayer}
                width={150}
                height={150}
                alt="gaming"
            />
            <div className="md:m-3 text-center font-sans">
              <div className="font-bold mx-2 xs:text-ld md:text-xl">Local multiplayer</div>
              <div className="xs:hidden md:block text-gray-400 xs:text-sm md:text-lg mb-4">Play on same device</div>
              <button className="xs:text-sm sm:text-base bg-lime-500 hover:bg-lime-600 px-4 py-2 rounded-full font-bold">Explore games</button>
            </div>
          </div>
        </div>
        <div className="md:w-1/3 xs:w-44 my-4 flex items-center justify-center bg-slate-950 w-1/3 p-2 rounded-xl xs:h-48 md:h-auto">
          <div className="flex m-auto">
            <Image
                className="xs:hidden xl:block xl:ml-4"
                src={onLineMultiplayer}
                width={130}
                height={130}
                alt="gaming"
            />
            <div className="md:m-3 text-center font-sans">
              <div className="font-bold mx-2 md:text-xl xs:text-ld">Online multiplayer</div>
              <div className="xs:hidden md:block text-gray-400 xs:text-sm md:text-lg mb-4">Play on separate devices</div>
              <button className="xs:text-sm sm:text-base bg-lime-500 hover:bg-lime-600 px-4 py-2 rounded-full font-bold">Explore games</button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Multiplayer
