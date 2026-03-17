const Navbar = () => {
  return (
      <nav className="sticky inset-x-0 top-0 z-40 w-full px-4 py-1 bg-[#002137] transition duration-700 ease-out">
        <div className="flex justify-between p-4">
          <div className="text-xl sm:text-xl md:text-2xl xl:text-3xl leading-[3rem] tracking-tight font-bold text-black text-white">
            DotPuzzle Games
          </div>
          <div className="flex items-center space-x-4 2xl:text-[1rem] font-semibold tracking-tight">
            <button className="px-6 py-2 text-white transition duration-500 ease-out bg-blue-700 rounded-lg hover:bg-blue-800 hover:ease-in hover:underline">
              contact us
            </button>
          </div>
        </div>
      </nav>
  )
}

export default Navbar
