const Footer = () => {
  return (
      <footer className="bg-[#0c1015]">
        <div className="container px-6 py-12 mx-auto">
          <div className="flex max-[540px]:flex-col justify-between">
            <div className="sm:col-span-2">
              <h1 className="max-w-lg text-xl sm:text-md font-semibold tracking-tight text-gray-800 xl:text-2xl text-white">
                Subscribe our newsletter to get update.
              </h1>

              <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
                <input
                    id="email"
                    type="text"
                    className="px-4 py-2  border rounded-md bg-gray-900 text-gray-300 border-gray-600 focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                    placeholder="Email Address"
                />

                <button
                    className="w-full px-2 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:mx-4 focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                  Subscribe
                </button>
              </div>
            </div>

            <div className="max-[540px]:pt-4">
              <p className="font-semibold text-white">
                Quick Link
              </p>

              <div className="flex flex-col items-start mt-5 space-y-2">
                <a
                    href="#"
                    className=" transition-colors duration-300 text-gray-300 hover:text-blue-400 hover:underline"
                >
                  Home
                </a>
                <a
                    href="#"
                    className="transition-colors duration-300 text-gray-300 hover:text-blue-400 hover:underline"
                >
                  About
                </a>
                <a
                    href="#"
                    className=" transition-colors duration-300 text-gray-300 hover:text-blue-400 hover:underline "
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer
