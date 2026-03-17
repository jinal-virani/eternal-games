import React, { useEffect, useState } from 'react'
import MainCard from 'ui-component/cards/MainCard'
import { useNavigate, useParams } from 'react-router'
import categoryService from '../../services/category.service'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { IconEdit, IconTrash, IconUsers } from '@tabler/icons'
import { STATUS } from '../../utils/enum'

const Category = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [ loading, setLoading ] = useState([ true ])
  const [ category, setCategory ] = useState({
    categoryName: '',
    categoryEmail: '',
    contactNumber: 0,
    remarks: '',
    joinedDate: null,
    profilePhoto: '',
    monthlyWages: 0
  })
  const [ isUpdateMode, setIsUpdateMode ] = useState(false)

  const [ showModel, setShowModel ] = useState(false)
  const [ inputDelete, setInputDelete ] = useState('')
  const [ enableDelete, setEnableDelete ] = useState(true)

  useEffect(() => {
    fetchCategory(params.id)
  }, [ params ])

  async function fetchCategory(categoryId) {
    try {
      setLoading(true)
      const response = await categoryService.getCategory(categoryId)
      setCategory(response.category)
      setLoading(false)
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleUpdateCategory(categoryId, category) {
    try {
      setLoading(true)
      await categoryService.updateCategory(categoryId, { ...category })
      const updatedCategory = await categoryService.getCategory(categoryId)
      setCategory(updatedCategory.category)
      setLoading(false)
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function deleteCategory(categoryId) {
    try {
      await categoryService.deleteCategory(categoryId)
      navigate('/categories')
    } catch (error) {
      console.log(error)
    }
  }

  function handleInputChange(e) {
    setInputDelete(e.target.value)
    setEnableDelete(e.target.value !== `category/${category.categoryName}`)
  }

  return (
      <MainCard title="Category Profile">
        {loading ? (
            <Typography varient="body2">Loading...</Typography>
        ) : (
            <>
              <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <Button
                    sx={{ width: '20px', height: '40px', padding: 0, fontSize: '20px', color: 'rgb(103, 58, 183)', borderRadius: '50px' }}
                    variant="outlined"
                    onClick={() => setIsUpdateMode((prevState) => !prevState)}
                >
                  <IconEdit stroke={1.5} size="1.3rem"/>
                </Button>
                <Button
                    sx={{ width: '20px', height: '40px', padding: 0, fontSize: '20px', color: 'rgb(103, 58, 183)', borderRadius: '50px' }}
                    variant="outlined"
                    onClick={() => setShowModel(true)}
                >
                  <IconTrash stroke={1.5} size="1.3rem"/>
                </Button>
                <Dialog open={showModel} onClose={() => setShowModel(false)}>
                  <DialogTitle sx={{ fontSize: '18px', fontWeight: '600' }}>Delete Category/{category.categoryName}</DialogTitle>
                  <Divider light/>
                  <DialogContentText sx={{ marginY: '20px' }}>
                    <Grid
                        item
                        xs={12}
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}
                    >
                      <IconUsers stroke={1.5} size="2.5rem" color="rgb(103, 58, 183)"/>
                      <DialogContentText sx={{ fontSize: '16px', fontWeight: '500', color: 'rgb(54, 37, 82)' }}>
                        Category/{category.categoryName}
                      </DialogContentText>
                    </Grid>
                  </DialogContentText>
                  <Divider light/>
                  <DialogContent>
                    <DialogContentText sx={{ fontWeight: '500', marginBottom: '12px' }}>
                      To confirm, type &quot;category/{category.categoryName}&quot; in the box below
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
                        onClick={() => deleteCategory(params.id)}
                    >
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
              <Box noValidate autoComplete="off" component="form" sx={{ '&.MuiTextField-root': { m: 2, width: '100%' } }}>
                <Grid container item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
                  <FormGroup>
                    <Grid item xs={12} sx={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                      <Grid
                          item
                          xs={3}
                          sx={{
                            margin: 'auto',
                            display: 'flex',
                            gap: '15px',
                            flexDirection: 'column',
                            alignItems: 'center'
                          }}
                      >
                        <img
                            style={{
                              width: '100px',
                              height: '100px',
                              borderRadius: '50%',
                              color: 'white'
                            }}
                            src={category?.categoryIcon}
                            onChange={(e) =>
                                setCategory({
                                  ...category,
                                  profilePhoto: e.target.value
                                })
                            }
                            alt="category"
                        />
                        <Typography
                            sx={{ fontSize: '18px', fontWeight: 'bold' }}
                            onChange={(e) =>
                                setCategory({
                                  ...category,
                                  categoryName: e.target.value
                                })
                            }
                        >
                          {category?.categoryName}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', gap: '20px', marginBottom: '30px', width: '100%' }}>
                      <Grid item xs={6} sx={{ width: '100%' }}>
                        <TextField
                            sx={{ width: '100%' }}
                            required
                            disabled={!isUpdateMode}
                            variant="outlined"
                            type="text"
                            label="Category Name"
                            placeholder="Category Name"
                            value={category.categoryName || ''}
                            onChange={(e) =>
                                setCategory({
                                  ...category,
                                  categoryName: e.target.value
                                })
                            }
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Status</InputLabel>
                          <Select
                              required
                              disabled={!isUpdateMode}
                              variant="outlined"
                              type="text"
                              label="Status"
                              labelId="demo-simple-select-label"
                              name="status"
                              value={category.status || STATUS.value}
                              onChange={(e) => setCategory({ ...category, status: e.target.value })}
                          >
                            {STATUS.map((status) => (
                                <MenuItem key={status.value} value={status.value}>
                                  {status.label}
                                </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', gap: '20px' }}>
                      <Grid item xs={12}>
                        <TextField
                            sx={{ width: '100%' }}
                            required
                            disabled={!isUpdateMode}
                            variant="outlined"
                            type="text"
                            label="Category Icon URL"
                            placeholder="Category Icon URL"
                            value={category.categoryIcon || ''}
                            onChange={(e) =>
                                setCategory({
                                  ...category,
                                  categoryIcon: e.target.value
                                })
                            }
                        />
                      </Grid>
                    </Grid>
                    {isUpdateMode ? (
                        <Grid item xs={12}>
                          <Stack direction="row" justifyContent="flex-start" marginTop="35px">
                            <Button variant="contained" color="success" onClick={() => handleUpdateCategory(category._id, category)}>
                              Update Category Profile
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

export default Category
