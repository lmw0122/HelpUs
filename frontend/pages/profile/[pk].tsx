import { FC } from "react";
import { getUserInfo } from "function/axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';

const Profile: FC = () => {
    const router = useRouter();
    
    useEffect(() => {
        if (router.isReady){
            getUserInfo(router.query.pk)
            .then(res => {
                if (res.data.role === 'ORG' || res.data.role === 'ORG_WAIT'){
                    router.push(`/orgpage/${res.data.memberId}`)
                } else if (res.data.role === 'USER'){
                    router.push(`/userpage/${res.data.memberId}`)
                } else (
                    router.push('/')
                )
            })
        }
    },[router.isReady])

  return (
    <div style={{display:'flex', justifyContent:'center'}}>
        <CircularProgress size='80px' color="primary" style={{margin:'100px'}}/>
    </div>
  )
};

export default Profile;
