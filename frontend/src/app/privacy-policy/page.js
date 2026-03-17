'use client'
import React, { useEffect, useState } from 'react'
import { Box, Container, Skeleton, Typography } from '@mui/material'
import PageService from '../../services/pages.service'
import { useParams } from 'react-router'
import Navbar from '../../components/navbar/page'
import Footer from '../../components/footer/page'
import { GoogleAnalytics } from '@next/third-parties/google'

export default function Page() {
  const privacyPageId = 'privacy-policy'
  const params = useParams()
  const [ description, setDescription ] = useState('')

  useEffect(() => {
    document.title = 'EternalGames - Privacy Policy'

    getPage()
  }, [ params ])

  async function getPage() {
    try {
      const response = await PageService.fetchPage(privacyPageId)
      setDescription(response?.description)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
      <div className="w-screen text-white min-h-screen overflow-x-hidden">
        <Navbar/>
        {
          description ?
              <Container className="bg-slate-900 rounded-xl p-10 mx-auto my-8">
                <Typography variant="h3" component="h1" gutterBottom>
                  <b>Privacy Policy</b>
                </Typography>
                <Box className="row">
                  <Box className="col-lg-10 mx-auto" dangerouslySetInnerHTML={{ __html: description }}/>
                </Box>
              </Container> : <Container className="bg-slate-900 rounded-xl p-10 mx-auto my-8">
                <Box sx={{ mt: 4, mb: 4 }}>
                  <Skeleton variant="rectangular" width="60%" height={50} sx={{ borderRadius: 1, bgcolor: 'grey.700' }}/>
                </Box>
                <Skeleton variant="text" width="60%" height={40} sx={{ bgcolor: 'grey.700' }}/>
                <Skeleton variant="text" width="30%" height={30} sx={{ mt: 2, bgcolor: 'grey.700' }}/>
                <Skeleton variant="text" width="90%" height={20} sx={{ mt: 3, bgcolor: 'grey.700' }}/>
                <Skeleton variant="text" width="80%" height={20} sx={{ mt: 2, bgcolor: 'grey.700' }}/>

                <Skeleton variant="rectangular" width="100%" height={35} sx={{ borderRadius: 1, mt: 5, bgcolor: 'grey.700' }}/>
                <Skeleton variant="text" width="60%" height={30} sx={{ mt: 2, bgcolor: 'grey.700' }}/>
                <Skeleton variant="text" width="100%" height={20} sx={{ mt: 1, bgcolor: 'grey.700' }}/>
                <Skeleton variant="text" width="90%" height={20} sx={{ mt: 1, bgcolor: 'grey.700' }}/>

                <Skeleton variant="rectangular" width="100%" height={35} sx={{ borderRadius: 1, mt: 3, bgcolor: 'grey.700' }}/>
                <Skeleton variant="text" width="100%" height={20} sx={{ mt: 1, bgcolor: 'grey.700' }}/>
                <Skeleton variant="text" width="90%" height={20} sx={{ mt: 1, bgcolor: 'grey.700' }}/>
              </Container>
        }
        <Footer/>
        <GoogleAnalytics gaId="G-TF62GHPFEJ"/>
      </div>
  )
}
