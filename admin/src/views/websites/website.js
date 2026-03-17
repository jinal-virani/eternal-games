import React, { useEffect, useState } from 'react'
import MainCard from 'ui-component/cards/MainCard'
import { useNavigate, useParams } from 'react-router'

import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Fab, FormGroup, Grid, TextField, Typography } from '@mui/material'
import { IconBrandGooglePlay, IconEdit, IconTrash, IconUpload } from '@tabler/icons'
import websiteService from '../../services/website.service'

const Website = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [ loading, setLoading ] = useState(true)

  const [ website, setWebsite ] = useState({
    logo: '',
    name: '',
    cover: '',
    androidLink: '',
    iosLink: ''
  })

  const [ isUpdateMode, setIsUpdateMode ] = useState(false)
  const [ showModel, setShowModel ] = useState(false)
  const [ inputDelete, setInputDelete ] = useState('')
  const [ enableDelete, setEnableDelete ] = useState(true)

  useEffect(() => {
    fetchWebsites(params.id)
  }, [ params ])

  async function fetchWebsites(websiteId) {
    try {
      setLoading(true)

      const response = await websiteService.getWebsite(websiteId)
      setWebsite(response.website)
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function updateWebsite(websiteId, website) {
    try {
      setLoading(true)

      await websiteService.updateWebsite(websiteId, {
        ...website
      })

      navigate('/websites')

      await fetchWebsites(websiteId)
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function deleteWebsite(websiteId) {
    try {
      await websiteService.deleteWebsite(websiteId)
      navigate('/websites')
    } catch (error) {
      console.log(error)
    }
  }

  function handleInputChange(e) {
    setInputDelete(e.target.value)
    setEnableDelete(e.target.value !== `website/${website.name}`)
  }

  return (
      <MainCard title={website.name}>
        {loading ? (
            <Typography variant="body2">Loading...</Typography>
        ) : (
            <>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <Fab
                    sx={{
                      width: '40px',
                      height: '40px',
                      fontSize: '20px',
                      color: 'rgb(103, 58, 183)',
                      backgroundColor: 'white',
                      boxShadow: '2px 4px 10px rgb(211, 210, 213)',
                      border: '1px solid rgb(103, 58, 183)'
                    }}
                    onClick={() => setIsUpdateMode((prevState) => !prevState)}
                >
                  <IconEdit stroke={1.5} size="1.3rem"/>
                </Fab>

                <Fab
                    sx={{
                      width: '40px',
                      height: '40px',
                      fontSize: '20px',
                      color: 'rgb(103, 58, 183)',
                      backgroundColor: 'white',
                      boxShadow: '2px 4px 10px rgb(211, 210, 213)',
                      border: '1px solid rgb(103, 58, 183)'
                    }}
                    onClick={() => setShowModel(true)}
                >
                  <IconTrash stroke={1.5} size="1.3rem"/>
                </Fab>
                <Dialog open={showModel} onClose={() => setShowModel(false)}>
                  <DialogTitle sx={{ fontSize: '18px', fontWeight: '600' }}>Delete Website/{website.name}</DialogTitle>
                  <Divider light/>
                  <DialogContentText sx={{ marginY: '20px' }}>
                    <Grid
                        item
                        xs={12}
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}
                    >
                      <IconBrandGooglePlay stroke={1.5} size="2.5rem" color="rgb(103, 58, 183)"/>
                      <DialogContentText sx={{ fontSize: '16px', fontWeight: '500', color: 'rgb(54, 37, 82)' }}>
                        Website/{website.name}
                      </DialogContentText>
                    </Grid>
                  </DialogContentText>
                  <Divider light/>

                  <DialogContent>
                    <DialogContentText sx={{ fontWeight: '500', marginBottom: '12px' }}>
                      To confirm, type &quot;website/{website.name}&quot; in the box below
                    </DialogContentText>
                    <TextField
                        sx={{ width: '100%' }}
                        required
                        variant="outlined"
                        type="text"
                        value={inputDelete}
                        onChange={handleInputChange}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                        variant="outlined"
                        color="error"
                        sx={{ width: '100%', margin: '10px' }}
                        disabled={enableDelete}
                        onClick={() => deleteWebsite(params.id)}
                    >
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>

              <Box noValidate autoComplete="off" component="form" sx={{ '& .MuiTextField-root': { my: 2, width: '100%' } }}>
                <FormGroup>
                  <Grid container columnSpacing={{ xs: 1, md: 2 }}>
                    <Grid item xs={12}>
                      <TextField
                          required
                          disabled={!isUpdateMode}
                          variant="outlined"
                          type="text"
                          label="Name"
                          placeholder="Name"
                          value={website.name}
                          onChange={(e) => setWebsite({ ...website, name: e.target.value })}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                          required
                          disabled={!isUpdateMode}
                          variant="outlined"
                          type="text"
                          label="Logo"
                          placeholder="Logo"
                          value={website.logo}
                          onChange={(e) => setWebsite({ ...website, logo: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                          disabled={!isUpdateMode}
                          variant="outlined"
                          type="url"
                          label="Cover"
                          placeholder="Cover"
                          value={website.cover}
                          onChange={(e) => setWebsite({ ...website, cover: e.target.value })}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                          disabled={!isUpdateMode}
                          variant="outlined"
                          type="text"
                          label="Android Link"
                          placeholder="Android Link"
                          value={website.androidLink}
                          onChange={(e) => setWebsite({ ...website, androidLink: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                          disabled={!isUpdateMode}
                          variant="outlined"
                          type="url"
                          label="iOS Link"
                          placeholder="iOS Link"
                          value={website.iosLink}
                          onChange={(e) => setWebsite({ ...website, iosLink: e.target.value })}
                      />
                    </Grid>

                    {isUpdateMode ? (
                        <Grid item xs={12} my={2}>
                          <Button variant="contained" sx={{ width: '100%' }} color="success" onClick={() => updateWebsite(website._id, website)}>
                            <IconUpload stroke={1.5} size="1.3rem"/>
                            Update Product
                          </Button>
                        </Grid>
                    ) : null}
                  </Grid>
                </FormGroup>
              </Box>
            </>
        )}
      </MainCard>
  )
}
export default Website
