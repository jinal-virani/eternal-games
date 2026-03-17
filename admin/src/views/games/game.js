import React, { useEffect, useState } from 'react'
import MainCard from 'ui-component/cards/MainCard'
import { useNavigate, useParams } from 'react-router'

import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import gameService from '../../services/game.service'
import { STATUS } from '../../utils/enum'
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Fab,
  FormControl,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { IconBrandGooglePlay, IconDeviceDesktop, IconDeviceMobile, IconEdit, IconTrash, IconUpload, IconX } from '@tabler/icons'
import categoryService from '../../services/category.service'
import { LoadingButton } from '@mui/lab'

const Game = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [ loading, setLoading ] = useState(true)
  const [ game, setGame ] = useState({
    gameName: '',
    description: '',
    thumbnail: '',
    rating: '',
    developer: '',
    technology: '',
    platform: '',
    shortDescription: '',
    categories: [],
    url: '',
    isSupportMobile: false,
    isSupportDesktop: false,
    likes: 0,
    disLikes: 0
  })
  const [ categories, setCategories ] = useState([])
  const [ isUpdateMode, setIsUpdateMode ] = useState(false)
  const [ showModel, setShowModel ] = useState(false)
  const [ inputDelete, setInputDelete ] = useState('')
  const [ enableDelete, setEnableDelete ] = useState(true)
  const [ mobileSupport, setMobileSupport ] = useState()
  const [ desktopSupport, setDesktopSupport ] = useState()
  const [ gameZip, setGameZip ] = useState(null)
  const [ uploadThumbnailLoading, setUploadThumbnailLoading ] = useState(false)
  const [ newThumbnail, setNewThumbnail ] = useState('')
  const [ uploadZipLoading, setUploadZipLoading ] = useState(false)

  const id = params.id

  useEffect(() => {
    fetchGames(id)
    fetchCategories()
  }, [ params ])

  async function fetchGames(gameId) {
    try {
      setLoading(true)

      const response = await gameService.getGame(gameId)
      setGame(response?.game)
      setMobileSupport(response.game.isSupportMobile)
      setDesktopSupport(response.game.isSupportDesktop)
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function fetchCategories() {
    try {
      const response = await categoryService.getActiveCategoryList()
      setCategories(response.categories)
    } catch (error) {
      console.log(error)
    }
  }

  async function updateGame(gameId, game) {
    try {
      setLoading(true)
      const categories = game.categories.map((category) => category._id)

      await gameService.updateGame(gameId, {
        ...game,
        categories,
        isSupportMobile: mobileSupport,
        isSupportDesktop: desktopSupport
      })
      await fetchGames(id)
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function deleteGame(gameId) {
    try {
      await gameService.deleteGame(gameId)
      navigate('/games')
    } catch (error) {
      console.log(error)
    }
  }

  function handleInputChange(e) {
    setInputDelete(e.target.value)
    setEnableDelete(e.target.value !== `game/${game.gameName}`)
  }

  async function updateGameThumbnail(file) {
    try {
      setUploadThumbnailLoading(true)
      const res = await gameService.uploadGameThumbnailMedia(file, game?._id)
      await setNewThumbnail(res.url)
      setGame({ ...game, thumbnail: res.url })
    } catch (e) {
      console.log('🚀🚀🚀 updateGameThumbnail => eMessage :: ', e.message)
    } finally {
      setUploadThumbnailLoading(false)
    }
  }

  async function handleFileUpload(file) {
    setUploadZipLoading(true)
    if (file && file.type === 'application/zip') {
      const formData = new FormData()
      formData.append('gameZip', file)
      formData.append('id', game?._id)

      try {
        const response = await gameService.uploadGameZip(formData)
        if (response && response.gameUrl) {
          setGame({ ...game, url: response.gameUrl })
        } else {
          console.error('Game URL not found in response:', response)
        }
      } catch (error) {
        console.error('Error uploading file:', error)
      } finally {
        setGameZip(null)
        setUploadZipLoading(false)
      }
    }
  }

  return (
      <MainCard title={`Game Profile/${game?.gameName}`}>
        {loading ? (
            <Typography variant="body2">Loading...</Typography>
        ) : (
            <>
              <Grid
                  item
                  xs={12}
                  sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}
              >
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
                  <DialogTitle sx={{ fontSize: '18px', fontWeight: '600' }}>
                    Delete Game/{game?.gameName}
                  </DialogTitle>
                  <Divider light/>
                  <DialogContentText sx={{ marginY: '20px' }}>
                    <Grid
                        item
                        xs={12}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          gap: '16px'
                        }}
                    >
                      <IconBrandGooglePlay
                          stroke={1.5}
                          size="2.5rem"
                          color="rgb(103, 58, 183)"
                      />
                      <DialogContentText
                          sx={{
                            fontSize: '16px',
                            fontWeight: '500',
                            color: 'rgb(54, 37, 82)'
                          }}
                      >
                        Game/{game?.gameName}
                      </DialogContentText>
                    </Grid>
                  </DialogContentText>
                  <Divider light/>

                  <DialogContent>
                    <DialogContentText
                        sx={{ fontWeight: '500', marginBottom: '12px' }}
                    >
                      To confirm, type &quot;game/{game?.gameName}&quot; in the box
                      below
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
                        onClick={() => deleteGame(params.id)}
                    >
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
              <Box
                  noValidate
                  autoComplete="off"
                  component="form"
                  sx={{ '& .MuiTextField-root': { my: 2, width: '100%' } }}
              >
                <Grid item
                      container
                      xs={12}
                      sx={{ display: 'flex', flexDirection: 'column' }}
                >
                  <FormGroup>
                    <TextField
                        required
                        disabled={!isUpdateMode}
                        variant="outlined"
                        type="text"
                        label="Game Name"
                        placeholder="Game Name"
                        value={game?.gameName}
                        onChange={(e) =>
                            setGame({
                              ...game,
                              gameName: e.target.value
                            })
                        }
                    />
                    <TextField
                        required
                        disabled={!isUpdateMode}
                        variant="outlined"
                        type="text"
                        label="Short Description"
                        placeholder="Short Description"
                        multiline
                        rows={2}
                        value={game?.shortDescription}
                        onChange={(e) =>
                            setGame({ ...game, shortDescription: e.target.value })
                        }
                    />

                    <Grid item xs={12} className="App" marginY={2}>
                      <CKEditor
                          onReady={(editor) => {
                            editor.editing.view.change((writer) => {
                              writer.setStyle(
                                  'min-height',
                                  '200px',
                                  editor.editing.view.document.getRoot()
                              )
                              writer.setStyle(
                                  'max-height',
                                  '300px',
                                  editor.editing.view.document.getRoot()
                              )
                            })
                          }}
                          disabled={!isUpdateMode}
                          editor={ClassicEditor}
                          data={game?.description}
                          value={game?.description || ''}
                          onChange={(event, editor) => {
                            const data = editor.getData()
                            setGame({ ...game, description: data })
                          }}
                      />
                    </Grid>

                    <Grid container item xs={12} spacing={2}>
                      <Grid container item xs={5} spacing={2} direction="row" alignItems="center" width={'100%'}>
                        <Grid item xs={8} fullWidth>
                          <img src={newThumbnail ? newThumbnail : game?.thumbnail} width={'100%'} height={300} alt={'thumbnail'}/>
                        </Grid>
                        <Grid item xs={4} fullWidth sx={{ alignSelf: 'center' }}>
                          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                            <Box width={'100%'}>
                              <input
                                  required={true}
                                  accept="image/png, image/jpeg, image/jpg, image/webp"
                                  style={{ display: 'none' }}
                                  disabled={!isUpdateMode}
                                  id="contained-button-file"
                                  multiple={false}
                                  type="file"
                                  onChange={async (event) => await updateGameThumbnail(event.target.files)}
                              />
                              <label htmlFor="contained-button-file">
                                <LoadingButton
                                    loading={uploadThumbnailLoading}
                                    variant="contained"
                                    disabled={!isUpdateMode}
                                    component="span"
                                    sx={{
                                      width: '100%',
                                      color: 'white',
                                      backgroundColor: '#F7BE15',
                                      ':hover': { backgroundColor: '#e3ab0c' }
                                    }}
                                    startIcon={<CloudUploadIcon/>}
                                >
                                  {newThumbnail ? 'Change' : 'Upload'} Thumbnail
                                </LoadingButton>
                              </label>
                            </Box>
                            {
                              newThumbnail ?
                                  <Box
                                      component="div"
                                      py={'7px'}
                                      sx={{
                                        width: '100%',
                                        borderRadius: 1,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        fontWeight: 500,
                                        justifyContent: 'center',
                                        gap: 1,
                                        color: 'white',
                                        backgroundColor: '#F7BE15'
                                      }}
                                  >
                                    <DoneAllIcon size={14}/>
                                    Thumbnail Uploaded
                                  </Box> : null
                            }
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid container item xs={7} spacing={2} direction="row" alignItems="center" width={'100%'}>
                        <Box sx={{ marginLeft: 3, display: 'flex', flexDirection: 'column', width: '100%' }}>
                          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, width: '100%' }}>
                            <TextField
                                sx={{ flexBasis: '80%' }}
                                required
                                disabled={!isUpdateMode}
                                variant="outlined"
                                type="url"
                                label="Game URL"
                                placeholder="Game URL"
                                value={game?.url}
                                onChange={(e) =>
                                    setGame({ ...game, url: e.target.value })
                                }
                            />
                            <Box sx={{ flexBasis: '20%' }}>
                              <input
                                  accept=".zip"
                                  disabled={!isUpdateMode}
                                  style={{ display: 'none' }}
                                  id="contained-button-file-upload"
                                  multiple={false}
                                  type="file"
                                  onChange={async (event) => await handleFileUpload(event.target.files[0])}
                              />
                              <label htmlFor="contained-button-file-upload">
                                <LoadingButton
                                    loading={uploadZipLoading}
                                    variant="contained"
                                    disabled={!isUpdateMode}
                                    component="span"
                                    sx={{
                                      width: '100%',
                                      color: 'white',
                                      backgroundColor: '#F7BE15',
                                      ':hover': { backgroundColor: '#e3ab0c' }
                                    }}
                                    startIcon={<CloudUploadIcon/>}
                                >
                                  Upload ZIP
                                </LoadingButton>
                              </label>
                            </Box>
                          </Box>
                          <FormControl fullWidth sx={{ marginTop: '16px', marginBottom: '16px' }}>
                            <InputLabel id="demo-multiple-chip-label">
                              Categories
                            </InputLabel>
                            <Select
                                multiple
                                required
                                disabled={!isUpdateMode}
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                name="categories"
                                value={game?.categories || []}
                                onChange={(event) => {
                                  setGame({ ...game, categories: event.target.value })
                                }}
                                input={
                                  <OutlinedInput
                                      id="select-multiple-chip"
                                      label="Chip"
                                  />
                                }
                                renderValue={(selected) => (
                                    <Stack gap={1} direction="row" flexWrap="wrap">
                                      {selected.map((selectedCategory, index) => (
                                          <Chip
                                              key={index}
                                              label={selectedCategory?.categoryName}
                                              onDelete={() => {
                                                const filteredCategories =
                                                    game?.categories.filter(
                                                        (category) =>
                                                            category._id !== selectedCategory?._id
                                                    )
                                                setGame({
                                                  ...game,
                                                  categories: filteredCategories
                                                })
                                              }}
                                              deleteIcon={
                                                <IconX
                                                    size={18}
                                                    onMouseDown={(event) =>
                                                        event.stopPropagation()
                                                    }
                                                />
                                              }
                                          />
                                      ))}
                                    </Stack>
                                )}
                            >
                              {categories?.map((category) => {
                                const isSelected = game?.categories.find(
                                    (gameCategory) => gameCategory._id === category._id
                                )
                                return (
                                    <MenuItem
                                        key={category._id}
                                        sx={{ display: 'flex', gap: '8px' }}
                                        value={category}
                                        divider={true}
                                        selected={!!isSelected}
                                    >
                                      <img
                                          src={category?.categoryIcon}
                                          width={20}
                                          height={20}
                                          alt="icon"
                                      />
                                      {category?.categoryName}
                                    </MenuItem>
                                )
                              })}
                            </Select>
                          </FormControl>
                          <FormControl fullWidth sx={{ marginTop: '16px', marginBottom: '16px' }}>
                            <InputLabel id="demo-simple-select-label">
                              Status
                            </InputLabel>
                            <Select
                                required
                                disabled={!isUpdateMode}
                                variant="outlined"
                                type="text"
                                label="Status"
                                labelId="demo-simple-select-label"
                                name="status"
                                value={game?.status || STATUS?.value}
                                onChange={(e) =>
                                    setGame({ ...game, status: e.target.value })
                                }
                            >
                              {STATUS.map((status) => (
                                  <MenuItem key={status?.value} value={status?.value}>
                                    {status?.label}
                                  </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>
                    </Grid>

                    {/*<Grid container item xs={12} spacing={2}>*/}
                    {/*  <Grid item xs={5}>*/}
                    {/*    <TextField*/}
                    {/*        required*/}
                    {/*        disabled={!isUpdateMode}*/}
                    {/*        variant="outlined"*/}
                    {/*        type="url"*/}
                    {/*        label="Thumbnail URL"*/}
                    {/*        placeholder="Thumbnail URL"*/}
                    {/*        value={game?.thumbnail}*/}
                    {/*        onChange={(e) =>*/}
                    {/*            setGame({ ...game, thumbnail: e.target.value })*/}
                    {/*        }*/}
                    {/*    />*/}
                    {/*  </Grid>*/}
                    {/*  /!*<Grid item xs={3}>*!/*/}
                    {/*  /!*  <TextField*!/*/}
                    {/*  /!*      required*!/*/}
                    {/*  /!*      disabled={!isUpdateMode}*!/*/}
                    {/*  /!*      variant="outlined"*!/*/}
                    {/*  /!*      type="url"*!/*/}
                    {/*  /!*      label="Game Preview URL"*!/*/}
                    {/*  /!*      placeholder="Game Preview URL"*!/*/}
                    {/*  /!*      value={game?.gamePreview}*!/*/}
                    {/*  /!*      onChange={(e) =>*!/*/}
                    {/*  /!*          setGame({ ...game, gamePreview: e.target.value })*!/*/}
                    {/*  /!*      }*!/*/}
                    {/*  /!*  />*!/*/}
                    {/*  /!*</Grid>*!/*/}
                    {/*  <Grid item xs={5}>*/}
                    {/*    <TextField*/}
                    {/*        required*/}
                    {/*        disabled={!isUpdateMode}*/}
                    {/*        variant="outlined"*/}
                    {/*        type="url"*/}
                    {/*        label="Game URL"*/}
                    {/*        placeholder="Game URL"*/}
                    {/*        value={game?.url}*/}
                    {/*        onChange={(e) =>*/}
                    {/*            setGame({ ...game, url: e.target.value })*/}
                    {/*        }*/}
                    {/*    />*/}
                    {/*  </Grid>*/}
                    {/*  <Grid item xs={2} sx={{ alignSelf: 'center' }}>*/}
                    {/*    <input*/}
                    {/*        accept=".zip"*/}
                    {/*        style={{ display: 'none' }}*/}
                    {/*        id="contained-button-file"*/}
                    {/*        multiple={false}*/}
                    {/*        type="file"*/}
                    {/*        onChange={(e) => setGameZip(e.target.files[0])}*/}
                    {/*    />*/}
                    {/*    <label htmlFor="contained-button-file">*/}
                    {/*      <LoadingButton*/}
                    {/*          loading={uploadLoading}*/}
                    {/*          variant="contained"*/}
                    {/*          disabled={!isUpdateMode}*/}
                    {/*          component="span"*/}
                    {/*          sx={{*/}
                    {/*            backgroundColor: 'rgb(103, 58, 183)',*/}
                    {/*            ':hover': { backgroundColor: 'rgb(126, 82, 201)' }*/}
                    {/*          }}*/}
                    {/*          startIcon={<CloudUploadIcon/>}*/}
                    {/*      >*/}
                    {/*        Upload ZIP*/}
                    {/*      </LoadingButton>*/}
                    {/*    </label>*/}
                    {/*  </Grid>*/}
                    {/*</Grid>*/}
                    {/*<Grid*/}
                    {/*    item*/}
                    {/*    xs={12}*/}
                    {/*    sx={{ display: 'flex', gap: '20px', marginY: '8px' }}*/}
                    {/*>*/}
                    {/*  <Grid item xs={10}>*/}
                    {/*    <FormControl fullWidth>*/}
                    {/*      <InputLabel id="demo-multiple-chip-label">*/}
                    {/*        Categories*/}
                    {/*      </InputLabel>*/}
                    {/*      <Select*/}
                    {/*          multiple*/}
                    {/*          disabled={!isUpdateMode}*/}
                    {/*          labelId="demo-multiple-chip-label"*/}
                    {/*          id="demo-multiple-chip"*/}
                    {/*          name="categories"*/}
                    {/*          value={game?.categories || []}*/}
                    {/*          onChange={(event) => {*/}
                    {/*            setGame({ ...game, categories: event.target.value })*/}
                    {/*          }}*/}
                    {/*          input={*/}
                    {/*            <OutlinedInput*/}
                    {/*                id="select-multiple-chip"*/}
                    {/*                label="Chip"*/}
                    {/*            />*/}
                    {/*          }*/}
                    {/*          renderValue={(selected) => (*/}
                    {/*              <Stack gap={1} direction="row" flexWrap="wrap">*/}
                    {/*                {selected.map((selectedCategory, index) => (*/}
                    {/*                    <Chip*/}
                    {/*                        key={index}*/}
                    {/*                        label={selectedCategory?.categoryName}*/}
                    {/*                        onDelete={() => {*/}
                    {/*                          const filteredCategories =*/}
                    {/*                              game?.categories.filter(*/}
                    {/*                                  (category) =>*/}
                    {/*                                      category._id !== selectedCategory?._id*/}
                    {/*                              )*/}
                    {/*                          setGame({*/}
                    {/*                            ...game,*/}
                    {/*                            categories: filteredCategories*/}
                    {/*                          })*/}
                    {/*                        }}*/}
                    {/*                        deleteIcon={*/}
                    {/*                          <IconX*/}
                    {/*                              size={18}*/}
                    {/*                              onMouseDown={(event) =>*/}
                    {/*                                  event.stopPropagation()*/}
                    {/*                              }*/}
                    {/*                          />*/}
                    {/*                        }*/}
                    {/*                    />*/}
                    {/*                ))}*/}
                    {/*              </Stack>*/}
                    {/*          )}*/}
                    {/*      >*/}
                    {/*        {categories?.map((category) => {*/}
                    {/*          const isSelected = game?.categories.find(*/}
                    {/*              (gameCategory) => gameCategory._id === category._id*/}
                    {/*          )*/}
                    {/*          return (*/}
                    {/*              <MenuItem*/}
                    {/*                  key={category._id}*/}
                    {/*                  sx={{ display: 'flex', gap: '8px' }}*/}
                    {/*                  value={category}*/}
                    {/*                  divider={true}*/}
                    {/*                  selected={!!isSelected}*/}
                    {/*              >*/}
                    {/*                <img*/}
                    {/*                    src={category?.categoryIcon}*/}
                    {/*                    width={20}*/}
                    {/*                    height={20}*/}
                    {/*                    alt="icon"*/}
                    {/*                />*/}
                    {/*                {category?.categoryName}*/}
                    {/*              </MenuItem>*/}
                    {/*          )*/}
                    {/*        })}*/}
                    {/*      </Select>*/}
                    {/*    </FormControl>*/}
                    {/*  </Grid>*/}
                    {/*  <Grid item xs={2}>*/}
                    {/*    <FormControl fullWidth>*/}
                    {/*      <InputLabel id="demo-simple-select-label">*/}
                    {/*        Status*/}
                    {/*      </InputLabel>*/}
                    {/*      <Select*/}
                    {/*          required*/}
                    {/*          disabled={!isUpdateMode}*/}
                    {/*          variant="outlined"*/}
                    {/*          type="text"*/}
                    {/*          label="Status"*/}
                    {/*          labelId="demo-simple-select-label"*/}
                    {/*          name="status"*/}
                    {/*          value={game?.status || STATUS?.value}*/}
                    {/*          onChange={(e) =>*/}
                    {/*              setGame({ ...game, status: e.target.value })*/}
                    {/*          }*/}
                    {/*      >*/}
                    {/*        {STATUS.map((status) => (*/}
                    {/*            <MenuItem key={status?.value} value={status?.value}>*/}
                    {/*              {status?.label}*/}
                    {/*            </MenuItem>*/}
                    {/*        ))}*/}
                    {/*      </Select>*/}
                    {/*    </FormControl>*/}
                    {/*  </Grid>*/}
                    {/*</Grid>*/}
                    <Grid item xs={12} sx={{ display: 'flex', gap: '20px' }}>
                      <Grid item xs={4}>
                        <TextField
                            required
                            disabled={!isUpdateMode}
                            variant="outlined"
                            type="text"
                            label="Technology"
                            placeholder="Technology"
                            value={game?.technology}
                            onChange={(e) =>
                                setGame({ ...game, technology: e.target.value })
                            }
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                            required
                            disabled={!isUpdateMode}
                            variant="outlined"
                            type="text"
                            label="Platform"
                            placeholder="Platform"
                            value={game?.platform}
                            onChange={(e) =>
                                setGame({ ...game, platform: e.target.value })
                            }
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                            required
                            disabled={!isUpdateMode}
                            variant="outlined"
                            type="text"
                            label="Developer"
                            placeholder="Developer"
                            value={game?.developer}
                            onChange={(e) =>
                                setGame({ ...game, developer: e.target.value })
                            }
                        />
                      </Grid>
                    </Grid>

                    <Grid item xs={12} sx={{ display: 'flex', gap: '20px' }}>
                      <Grid item xs={4}>
                        <TextField
                            required
                            disabled={!isUpdateMode}
                            variant="outlined"
                            type="text"
                            label="Rating"
                            placeholder="Rating"
                            value={game?.rating}
                            onChange={(e) =>
                                setGame({ ...game, rating: e.target.value })
                            }
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                            required
                            disabled={!isUpdateMode}
                            id="outlined-number"
                            label="Likes"
                            type="number"
                            InputLabelProps={{
                              shrink: true
                            }}
                            value={game?.likes}
                            onChange={(e) =>
                                setGame({ ...game, likes: e.target.valueAsNumber })
                            }
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                            required
                            disabled={!isUpdateMode}
                            id="outlined-number"
                            label="Dislikes"
                            type="number"
                            InputLabelProps={{
                              shrink: true
                            }}
                            value={game?.disLikes}
                            onChange={(e) =>
                                setGame({ ...game, disLikes: e.target.valueAsNumber })
                            }
                        />
                      </Grid>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '20px',
                          marginLeft: '20px',
                          marginY: '15px'
                        }}
                    >
                      <Typography>Support :</Typography>
                      <Grid
                          item
                          xs={1}
                          sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        <IconButton
                            disabled={!isUpdateMode}
                            onClick={() =>
                                setMobileSupport((prevState) => !prevState)
                            }
                        >
                          <IconDeviceMobile
                              color={mobileSupport ? '#ae3ec9' : '#000000'}
                          />
                        </IconButton>
                        <IconButton
                            disabled={!isUpdateMode}
                            onClick={() =>
                                setDesktopSupport((prevState) => !prevState)
                            }
                        >
                          <IconDeviceDesktop
                              color={desktopSupport ? '#ae3ec9' : '#000000'}
                          />
                        </IconButton>
                      </Grid>
                    </Grid>
                    {isUpdateMode ? (
                        <Grid item xs={12} my={2}>
                          <Stack
                              direction="row"
                              justifyContent="flex-start"
                              marginLeft="15px"
                          >
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => updateGame(game?._id, game)}
                            >
                              <IconUpload stroke={1.5} size="1.3rem"/>
                              Update Game
                            </Button>
                          </Stack>
                        </Grid>
                    ) : null}
                  </FormGroup>
                </Grid>
              </Box>
            </>
        )}
      </MainCard>
  )
}
export default Game
