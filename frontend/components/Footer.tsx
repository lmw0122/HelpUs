import react from 'react';
import { Box, Grid, Tab, Typography, Stack } from "@mui/material/";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter()
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Box sx={{height: 200, width: '100%', backgroundColor: '#FCF8F0' }}>
          <Box sx={{ my : 7, ml : 10}}>
            <Typography variant='h5' sx={{fontWeight: 'bold'}}>
              Help:us
            </Typography>
            <Typography variant='h6'>
              이메일 helpus@gmail.com
            </Typography>
            <Typography variant='h6'>
              <span>©Help : us. AllRights Reserved. </span>
              <span 
                style={{cursor:'pointer', fontSize:'17px', textDecoration: 'underline'}}
                onClick={() => router.push('/checkcerti')}
              >증명서 진위 확인</span> 
            </Typography>
          </Box>
        </Box>
    </Grid>
  )
}

export default Footer;