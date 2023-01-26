import { Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import { Box } from '@mui/system'
import React from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Blog = ({title,description,imageURL,userName ,isUser,id}) => {
  const navigate=useNavigate()
  const handleEdit =()=>{
    navigate(`/myBlogs/${id}`)
  }
  const deleteRequest=async()=>{
const res = await axios.delete(`http://localhost:3001/api/blog/${id}`).catch(err=>console.log(err))
const data =await res.data
return data

  }
  const handleDelete=()=>{
    deleteRequest().then(()=>navigate("/").then(()=>navigate("/blogs")))
  }
  return (
    <div>
      {" "}
      <Card sx={{ width:"40%",mt:2,padding:2,boxShadow:"5px 5px 10px #ccc",":hover:":{
        boxShadow:"10px 10px 20px #ccc"
      } ,margin:'auto'}}>
        {isUser && (<Box display='flex'>
          <IconButton onClick={handleEdit} sx={{marginLeft:'auto'}}><ModeEditIcon/></IconButton>
          <IconButton onClick={handleDelete}><DeleteOutlineIcon/></IconButton>
        </Box>)}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {userName}
          </Avatar>
        }
       
        title={title}
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image={imageURL}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        <b>{userName}</b> {" : "} {description}
        </Typography>
      </CardContent>
   
     
    </Card>
    </div>
  )
}

export default Blog
