import * as React from 'react'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@mui/styles'
import { visuallyHidden } from '@mui/utils'
import MainCard from 'ui-component/cards/MainCard'
import { getComparator, rowsInitial, stableSort } from '../../utils/table-filter'
import { IconPlus } from '@tabler/icons'
import {
  Button,
  CardContent,
  DialogTitle,
  Fab,
  Grid,
  IconButton,
  InputAdornment,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Typography
} from '@mui/material'

import { Search as SearchIcon, VisibilityTwoTone as VisibilityTwoToneIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import websiteService from '../../services/website.service'

const headCells = [
  {
    id: 'logo',
    numeric: false,
    label: 'Logo',
    align: 'center'
  },
  {
    id: 'name',
    numeric: false,
    label: 'Name',
    align: 'center'
  },
  {
    id: 'cover',
    numeric: false,
    label: 'Cover',
    align: 'center'
  },
  {
    id: 'actions',
    numeric: false,
    label: 'View',
    align: 'center'
  }
]

// style constant
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  sortSpan: visuallyHidden
}))

// ===========================|| TABLE HEADER ||=========================== //

function EnhancedTableHead({ classes, order, orderBy, onRequestSort }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
              <TableCell
                  key={headCell.id}
                  align={headCell.align}
                  padding={headCell.disablePadding ? 'none' : 'normal'}
                  sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                      <span className={classes.sortSpan}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
          ))}
        </TableRow>
      </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf([ 'asc', 'desc' ]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
}

// ===========================|| PRODUCT LIST ||=========================== //

const Websites = () => {
  const classes = useStyles()
  const theme = useTheme()
  const navigate = useNavigate()

  const [ websites, setWebsites ] = useState([])
  const [ createWebsite, setCreateWebsite ] = useState({
    logo: '',
    name: '',
    cover: '',
    androidLink: '',
    iosLink: ''
  })

  const [ order, setOrder ] = React.useState('asc')
  const [ orderBy, setOrderBy ] = React.useState('calories')
  // const [ page, setPage ] = React.useState(0)
  // const [ rowsPerPage, setRowsPerPage ] = React.useState(10)
  // const [ search, setSearch ] = React.useState('')
  const [ rows, setRows ] = React.useState(rowsInitial)
  const [ openModel, setOpenModel ] = React.useState(false)

  useEffect(() => {
    fetchWebsites()
  }, [])

  async function fetchWebsites() {
    try {
      const response = await websiteService.getWebsiteList()
      setWebsites(response.websites)

    } catch (error) {
      console.log(error.message)
    }
  }

  async function addWebsite(event) {
    try {
      event.preventDefault()
      const res = await websiteService.createWebsite({
        ...createWebsite
      })

      setWebsites([ ...websites, res.data ])

      setCreateWebsite({
        logo: '',
        name: '',
        cover: '',
        androidLink: '',
        iosLink: ''
      })
    } catch (error) {
      console.log(error.message)
    } finally {
      setOpenModel(false)
    }
  }

  // const handleSearch = (event) => {
  //   const newString = event.target.value
  //   setSearch(newString)
  //
  //   if (newString) {
  //     const newRows = rows.filter((row) => {
  //       let matches = true
  //
  //       const properties = [ 'logo', 'name', 'game type', 'link' ]
  //       let containsQuery = false
  //
  //       properties.forEach((property) => {
  //         if (row[property].toString().toLowerCase().includes(newString.toString().toLowerCase())) {
  //           containsQuery = true
  //         }
  //       })
  //
  //       if (!containsQuery) {
  //         matches = false
  //       }
  //       return matches
  //     })
  //     setRows(newRows)
  //   } else {
  //     setRows(rowsInitial)
  //   }
  // }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage)
  // }
  //
  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10))
  //   setPage(0)
  // }

  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  return (
      <MainCard title="Products" content={false}>
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
            <Grid item xs={12} sm={6}>
            {/*  <TextField*/}
            {/*      InputProps={{*/}
            {/*        startAdornment: (*/}
            {/*            <InputAdornment position="start">*/}
            {/*              <SearchIcon fontSize="small"/>*/}
            {/*            </InputAdornment>*/}
            {/*        )*/}
            {/*      }}*/}
            {/*      onChange={handleSearch}*/}
            {/*      placeholder="Search products..."*/}
            {/*      value={search}*/}
            {/*      size="small"*/}
            {/*  />*/}
            </Grid>

            <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: '10px' }}>
              <Fab
                  sx={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'rgb(103, 58, 183)',
                    color: 'white',
                    ':hover': { backgroundColor: 'rgb(126, 82, 201)' }
                  }}
                  aria-label="add"
                  onClick={() => setOpenModel(true)}
              >
                <IconPlus stroke={2.5} size="1.3rem"/>
              </Fab>

              <Modal
                  open={openModel}
                  onClose={() => setOpenModel(false)}
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Grid item xs={12} sm={6} sx={{ backgroundColor: 'white', padding: '20px', borderRadius: '20px' }}>
                  <DialogTitle sx={{ fontSize: '22px', fontWeight: '600', padding: 0, paddingBottom: '10px', color: 'rgb(97, 68, 146)' }}>
                    Add Product
                  </DialogTitle>

                  <form onSubmit={addWebsite}>
                    <Stack spacing={3}>
                      <Grid item xs={12} sx={{ display: 'flex', gap: '20px' }}>
                        <Grid item xs={12}>
                          <TextField
                              sx={{ width: '100%' }}
                              required
                              variant="outlined"
                              type="text"
                              label="Name"
                              placeholder="Name"
                              value={createWebsite.name || ''}
                              onChange={(e) => setCreateWebsite({ ...createWebsite, name: e.target.value })}
                          />
                        </Grid>
                      </Grid>

                      <Grid item xs={12} sx={{ display: 'flex', gap: '20px' }}>
                        <Grid item xs={6}>
                          <TextField
                              sx={{ width: '100%' }}
                              required
                              variant="outlined"
                              type="url"
                              label="Logo"
                              placeholder="Logo"
                              value={createWebsite.logo || ''}
                              onChange={(e) => setCreateWebsite({ ...createWebsite, logo: e.target.value })}
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <TextField
                              sx={{ width: '100%' }}
                              variant="outlined"
                              type="url"
                              label="Cover"
                              placeholder="Cover"
                              value={createWebsite.cover || ''}
                              onChange={(e) => setCreateWebsite({ ...createWebsite, cover: e.target.value })}
                          />
                        </Grid>
                      </Grid>

                      <Grid item xs={12} sx={{ display: 'flex', gap: '20px' }}>
                        <Grid item xs={6}>
                          <TextField
                              sx={{ width: '100%' }}
                              variant="outlined"
                              type="url"
                              label="Android Link"
                              placeholder="Android Link"
                              value={createWebsite.androidLink || ''}
                              onChange={(e) => setCreateWebsite({ ...createWebsite, androidLink: e.target.value })}
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <TextField
                              sx={{ width: '100%' }}
                              variant="outlined"
                              type="url"
                              label="iOS Link"
                              placeholder="iOS Link"
                              value={createWebsite.iosLink || ''}
                              onChange={(e) => setCreateWebsite({ ...createWebsite, iosLink: e.target.value })}
                          />
                        </Grid>
                      </Grid>

                      <Button variant="contained" color="success" sx={{ color: 'rgb(35, 8, 82)' }} type="submit">
                        Add Product
                      </Button>
                    </Stack>
                  </form>
                </Grid>
              </Modal>
            </Grid>
          </Grid>
        </CardContent>

        {/* table */}
        <TableContainer sx={{ width: '95%', margin: 'auto' }}>
          <Table className={classes.table} aria-labelledby="GameTable">
            <EnhancedTableHead classes={classes} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} rowCount={rows.length}/>
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                    <TableRow hover tabIndex={-1} key={index}>
                      <TableCell component="th" id={labelId} scope="row" sx={{ cursor: 'pointer' }}>
                        <Typography variant="subtitle2" sx={{ color: theme.palette.mode === 'dark' ? theme.palette.grey[600] : 'grey.900' }}>
                          {row.name}
                        </Typography>
                        <Typography variant="caption"> {row.shortDescription} </Typography>
                      </TableCell>
                      <TableCell>{row.url}</TableCell>
                      <TableCell align="right">{row.developer}</TableCell>
                      <TableCell align="center">{row.platform}</TableCell>
                      <TableCell align="center">{row.likes}</TableCell>
                      <TableCell align="center" sx={{ pr: 3 }} onClick={() => navigate(`/games/${row.id}`)}>
                        <IconButton color="primary">
                          <VisibilityTwoToneIcon sx={{ fontSize: '1.3rem' }}/>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                )
              })}

              {websites.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                    <TableRow hover tabIndex={-1} key={index}>

                      <TableCell align="center" component="th" id={labelId} scope="row" sx={{ cursor: 'pointer' }}>
                        <img src={row.logo} height="70px" width="70px" style={{ borderRadius: '50px', objectFit: 'cover' }} alt="game"/>
                      </TableCell>

                      <TableCell align="center">{row.name}</TableCell>

                      <TableCell align="center">
                        {row.cover && <img src={row.cover} height="100px" alt="cover"/>}
                      </TableCell>

                      <TableCell align="center" sx={{ pr: 3 }} onClick={() => navigate(`/websites/${row._id}`)}>
                        <IconButton color="primary">
                          <VisibilityTwoToneIcon sx={{ fontSize: '1.3rem' }}/>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                )
              })}

              {/*{emptyRows > 0 && (*/}
              {/*    <TableRow*/}
              {/*        style={{*/}
              {/*          height: 53 * emptyRows*/}
              {/*        }}*/}
              {/*    >*/}
              {/*      <TableCell colSpan={6}/>*/}
              {/*    </TableRow>*/}
              {/*)}*/}
            </TableBody>
          </Table>
        </TableContainer>

        {/*<TablePagination*/}
        {/*    rowsPerPageOptions={[ 5, 10, 25 ]}*/}
        {/*    component="div"*/}
        {/*    count={rows.length}*/}
        {/*    rowsPerPage={rowsPerPage}*/}
        {/*    page={page}*/}
        {/*    onPageChange={handleChangePage}*/}
        {/*    onRowsPerPageChange={handleChangeRowsPerPage}*/}
        {/*/>*/}
      </MainCard>
  )
}

export default Websites
