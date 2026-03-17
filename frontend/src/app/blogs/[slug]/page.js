'use client'
import React, { useEffect, useState } from 'react'
import Header from '../../../components/navbar/page'
import Footer from '../../../components/footer/page'
import { GoogleAnalytics } from '@next/third-parties/google'
import blogService from '../../../services/blog.service'
import moment from 'moment'

export default function Blog({ params }) {
  const { slug } = params

  const [ blog, setBlog ] = useState([])
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    fetchBlog(slug)
  }, [ slug ])

  async function fetchBlog(slug) {
    try {
      setLoading(true)
      const response = await blogService.getBlog(slug)
      setBlog(response?.blog)
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
      <div className="bg-black text-white min-h-screen w-full overflow-x-hidden">
        <Header/>
        <div className="px-2 sm:px-6 py-12 md:py-14">
          <div className="max-w-[7xl] 2xl:container rounded-xl bg-[#121212] mx-auto">
            <div className="pt-4 px-3 sm:px-5">
              <p className="font-bold text-lg xs:text-2xl sm:text-3xl text-center text-lime-500 tracking-wide mb-1 mt-2">{blog?.blogTitle}</p>
              <p className="text-center mt-3 text-sm font-medium text-gray-300">{moment(blog?.updatedOn ? blog?.updatedOn : blog?.createdOn).format('MMMM D, YYYY')}</p>
              <div className='border-b border-b-lime-500/20 mt-4'/>
            </div>
            <div className="py-8 px-4 sm:px-8">
              {/*<div className="aspect-square w-[65vh] mx-auto bg-no-repeat bg-center bg-contain rounded-xl" style={{ backgroundImage: `url(${encodeURI(blog?.blogImage)})`, backgroundColor: '#171717' }}/>*/}
              <div className="prose-lg mt-6" dangerouslySetInnerHTML={{ __html: blog?.description }}/>
            </div>
          </div>
        </div>
        <Footer/>
        <GoogleAnalytics gaId="G-TF62GHPFEJ"/>
      </div>
  )
}
