'use client'
import React, { useEffect, useState } from 'react'
import Header from '../../components/navbar/page'
import Footer from '../../components/footer/page'
import { GoogleAnalytics } from '@next/third-parties/google'
import blogService from '../../services/blog.service'
import { useRouter } from 'next/navigation'
import moment from 'moment'
import { FaArrowRight } from "react-icons/fa6";

export default function Blogs() {
  const route = useRouter()

  const [ blogs, setBlogs ] = useState([])
  const [ totalPage, setTotalPage ] = useState(1)
  const [ currentPage, setCurrentPage ] = useState(0)
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    fetchBlogs()
  }, [])

  async function fetchBlogs() {
    try {
      setLoading(true)
      const response = await blogService.getBlogList(currentPage + 1, 6)
      const blogsData = response?.blogs || []
      const sortedData = blogsData.sort(
          (a, b) => new Date(b.createdOn) - new Date(a.createdOn)
      )
      setCurrentPage(response?.currentPage)
      setTotalPage(response?.totalPages)
      setBlogs([...blogs, ...sortedData])
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      if (!loading && currentPage < totalPage && scrollTop + clientHeight >= scrollHeight - 100) {
        fetchBlogs();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, currentPage, totalPage]);

  return (
      <div className="bg-black text-white min-h-screen w-full overflow-x-hidden">
        <Header/>
        <div className="max-w-7xl 2xl:container mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div>
            <p className="font-bold text-5xl text-center text-lime-500">Eternal Games Blogs</p>
            <p className="tracking-wide mt-2 text-center max-w-2xl mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua.</p>
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap:6 lg:gap-8">
            {
              blogs.map((blog, index) => {
                return (
                    <div key={index} className="h-full flex flex-col rounded-lg border border-gray-800 shadow-xl shadow-[#121212] transition duration-300 ease-in-out z-30 rounded-2xl transform origin-bottom cursor-pointer hover:drop-shadow-gray-900 hover:scale-[1.02] hover:z-40"
                         onClick={() => route.push(`/blogs/${blog?.slug}`)}
                    >
                      <div className={`aspect-video bg-no-repeat bg-center ${blog?.blogImage === '/white-logo3.png' ? 'bg-contain' : 'bg-cover' } rounded-t-lg`} style={{ backgroundImage: `url(${encodeURI(blog?.blogImage)})`, backgroundColor: '#171717' }}/>
                      <div className="pt-3 pb-8 px-4 bg-[#121212] h-full rounded-b-lg">
                        <p className='text-end text-gray-300 text-xs font-medium'>{moment(blog?.updatedOn ? blog?.updatedOn : blog?.createdOn).format('MMMM D, YYYY')}</p>
                        <p className="font-bold text-lime-500/90 text-xl tracking-wide line-clamp-2 mb-1 mt-2">{blog?.blogTitle}</p>
                        <p className="line-clamp-[7] mt-5 text-sm">{blog?.shortDescription}</p>
                        <button className='absolute bottom-2 right-4 flex flex-row items-center ml-auto gap-2 text-lime-500/70 hover:text-[#f7bf16] transition duration-300 ease-in-out text-xs'>Read more <FaArrowRight /></button>
                      </div>
                    </div>
                )
              })
            }
          </div>
        </div>
        <Footer/>
        <GoogleAnalytics gaId="G-TF62GHPFEJ"/>
      </div>
  )
}
