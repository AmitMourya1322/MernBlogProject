import { Button, InputLabel, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const BlogDetail = () => {
  const navigate = useNavigate()
  const[blog,setBlog] = useState() 
  const id = useParams().id;
  const [inputs,setInputs] = useState({})
const handleChange =(e)=>{
  setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
  }))
}


  
  
  console.log(id)
  const fetchDetails = async()=>{
    const res = await axios.get(`http://localhost:3001/api/blog/${id}`).catch((err)=>{console.log(err)})
    const data = await res.data;
    return data;
  }
  useEffect(()=>{
    fetchDetails().then((data)=>
      
      {setBlog(data.blog)
      setInputs({
        title:data.blog.title,
      description:data.blog.description,
   })
      })
  },[id])
  const sendRequest = async()=>{
    const res =await axios.put(`http://localhost:3001/api/blog/update/${id}`,{
      title:inputs.title,
      description:inputs.description,
    }).catch((err)=>console.log(err))
    const data = await res.data
    return data
  }
  console.log(blog)
  const handleSubmit=(e)=>{
    e.preventDefault();
  console.log(inputs)
  sendRequest().then(data=>console.log(data)).then(()=>navigate("/myBlogs/"))
  }
  return (
   
    <div>
       {inputs && 
     <form onSubmit={handleSubmit}>
        <Box border={3} borderColor="green" 
        borderRadius={5} 
        boxShadow="10px 10px 20px #ccc" 
        padding={3}
        margin={3}
        display="flex"
        flexDirection={"column"}
        width={"80%"}>
          <Typography>Post Your Blog</Typography>
          <InputLabel
          >Title</InputLabel>
          <TextField value={inputs.title}
          name="title"
          onChange={handleChange}/>
          <InputLabel>Description</InputLabel>
          <TextField value={inputs.description}
          name="description"
          onChange={handleChange}/>
          
        <Button  variant='contained' sx={{borderRadius:3}} color='warning' type='submit'>Submit</Button>
        </Box>
      </form>
    }</div>
  )
}

export default BlogDetail
