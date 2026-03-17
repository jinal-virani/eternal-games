import { ImAndroid, ImAppleinc } from 'react-icons/im'

function Product({ data, theme }) {

  function openLink(link = '') {
    window.open(link)
  }

  return (
      <>
        <div
            className={`overflow-hidden  hover:scale-105 hover:ease-in-out duration-200 z-10 shadow-xl flex-col md:m-2  xl:m-6 max-xl:my-2 rounded-3xl font-sans flex items-center ${theme.bgcolor}`}>
          <img
              src={data.cover}
              alt="cover"
              width={800}
              className="object-cover pb-4 max-sm:pb-2 rounded-lg h-full"/>
          <div className="p-2 w-full max-lg:p-0 ">
            <div className="flex justify-start items-center mb-6 max-sm:mb-2">
              <img className="w-20 max-lg:w-12 max-lg:rounded-lg rounded-2xl mx-4 max-lg:mx-2" src={data.logo} alt="logo" width={80}/>
              <h3 className="font-bold text-2xl max-sm:text-base lg:mr-10 xl:mr-1 sm:mr-2 text-white">
                {data.name}
              </h3>
            </div>
          </div>

          <div className="bg-transparent w-full font-bold flex justify-center max-sm:p-2 max-sm:gap-2 gap-4 p-4">
            {data.iosLink ?
                (<div className="bg-gray-200 w-1/2 rounded-xl p-3 max-sm:p-1  max-sm:mb-1 hover:scale-90 hover:ease-in-out duration-200">

                  <button className="w-full flex items-center justify-around" onClick={() => openLink(data.iosLink)}>

                    <ImAppleinc className="mr-2 max-sm:mr-1 w-5 max-sm:w-3"/>
                    <div className="flex flex-col text-sm max-sm:text-[10px]">
                      <p>Get it on</p>
                      <p>Apple Store</p>

                    </div>

                  </button>

                </div>)
                : null
            }

            {data.androidLink ?
                (<div className="bg-gray-200  w-1/2 rounded-xl p-3 max-sm:p-1  max-sm:mb-1 hover:scale-90 hover:ease-in-out duration-200">
                  <button className="w-full flex items-center justify-around" onClick={() => openLink(data.androidLink)}>

                    <div className="flex items-center">
                      <ImAndroid className="mr-2 max-sm:mr-1 w-5 max-sm:w-3"/>
                      <div className="flex flex-col text-sm max-sm:text-[10px]">
                        <p>Get it on</p>
                        <p>Google Play</p>
                      </div>

                    </div>

                  </button>
                </div>)
                : null}

          </div>

        </div>
      </>
  )
}

export default Product
