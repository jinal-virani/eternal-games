import { useTheme } from '@mui/material/styles'
import { Stack, Typography } from '@mui/material'
import config from '../config'
import LogoImage from '../assets/images/logo-full.png'

const Logo = () => {
  const theme = useTheme()
  return (
      <Stack direction="row" alignItems="center" justifyContent="center">
        <img src={LogoImage} width={160} alt={'logo'}/>
      </Stack>
  )
}

export default Logo
