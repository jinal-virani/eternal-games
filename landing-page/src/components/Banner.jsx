import bannerImage from '../Assets/background-banner.jpg'

export default function Banner() {
  return (
      <>
        <div className="relative">
          <img className="max-[425px]:h-[200px]" src={bannerImage} alt="banner"/>

          <div className="absolute top-1/4 left-[42%] max-[425px]:left-[30%] text-center">
            <h1 className="text-5xl md:text-4xl 2xl:text-5xl max-[425px]:text-3xl font-bold text-white mb-6 max-[425px]:mb-1">Our Games</h1>
            <h3 className="text-3xl md:text-2xl 2xl:text-3xl  max-[425px]:text-2xl font-bold text-white">200+</h3>
            <h3 className="text-2xl md:text-xl 2xl:text-2xl max-[425px]:text-lg text-white">Games Available</h3>
          </div>
        </div>
      </>
  )
}
