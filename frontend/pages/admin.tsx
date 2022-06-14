import { FC, useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SignupList from "../components/SignupList";
import UserList from "../components/UserList";
import { useRouter } from "next/router";
import { tokenCheck } from "../function/axios";




const Admin: FC = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  
  const router = useRouter()

  useEffect(() => {
      tokenCheck()
      // .then(res => console.log(res))
  },[])

  return (
    <>
      <Box sx={{ maxWidth: '600px', typography: 'body1', margin: 'auto', minHeight:'600px'}}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} variant="fullWidth">
              <Tab label="기관 가입 요청" value="1" />
              <Tab label="회원 관리" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <SignupList></SignupList>
          </TabPanel>
          <TabPanel value="2">
            <UserList></UserList>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  )
};

export default Admin;
