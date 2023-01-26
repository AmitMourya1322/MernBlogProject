import React, { useState } from 'react'
import {AppBar, Button, Tab, Tabs, Toolbar, Typography} from '@mui/material'
import { Box } from '@mui/system'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../store'
const Header = () => {
    const dispatch = useDispatch()
    const [value,setValue] = useState();
    const isLoggedIn = useSelector(state=>state.isLoggedIn);
    
  return (
    <AppBar sx={{background:"green"}} position="sticky">
        <Toolbar>
            <Typography variant='h4'>BlogsApp</Typography>
            {isLoggedIn && <Box display="flex" marginLeft={'auto'} marginRight={"auto"}>
                <Tabs textColor='inherit'
                 value={value} onChange={(e,val)=>setValue(val)}>
                    <Tab LinkComponent={Link} to="/blogs" label="All Blogs"/>
                    <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs"/>
                    <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog"/>
                
                </Tabs>
            </Box>}
            <Box display="flex" marginLeft="auto">
                {!isLoggedIn && <><Button
                LinkComponent={Link} to="/auth"
                 variant='contained' sx={{margin:1}} color='warning'>Login</Button>
                <Button 
                LinkComponent={Link} to="/auth"
                variant='contained' sx={{margin:1}} color='warning'>Sign Up</Button></>}
                {isLoggedIn && <Button 
                onClick={()=>dispatch(authActions.logout())}
                LinkComponent={Link} to="/auth"
                variant='contained' sx={{margin:1}} color='warning'>Logout</Button>}
            </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Header
