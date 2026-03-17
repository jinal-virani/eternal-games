import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Products from './components/Products'
import Banner from './components/Banner'

function App() {

  return (
      <>
        <Navbar/>
        <Banner/>
        <Products/>
        <div className=" bg-[#d9f6f8] font-bold text-xl text-center py-32">
          <h1 className="text-red-700 pb-5">CONTACT US</h1>
          <h1 className="text-2xl">eternal@support.com</h1>
        </div>
        <Footer/>
      </>
  )
}

export default App
