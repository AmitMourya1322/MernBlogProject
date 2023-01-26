import { Button, InputLabel, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useState } from 'react'

const AddBlog = () => {
  const [inputs,setInputs] = useState({
    title:"",
    description:"",
    image:""
})
const handleChange =(e)=>{
  setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
  }))
}
const sendRequest = async()=>{
  const res=  await  axios.post('http://localhost:3001/api/blog/add',{
      title:inputs.title,
          description:inputs.description,
          image:inputs.image,
          user:localStorage.getItem("userId")
      }).catch(err=>console.log(err))

      const data = await res.data;
      console.log(data)
      return data;
  }
const handleSubmit=(e)=>{
  e.preventDefault();
console.log(inputs)
sendRequest().then(data=>console.log(data))
}
  return (
    <div>
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
          <InputLabel>Image</InputLabel>
          <TextField value={inputs.image}
          name="image"
          onChange={handleChange}/>
        <Button  variant='contained' sx={{borderRadius:3}} color='warning' type='submit'>Submit</Button>
        </Box>
      </form>
    </div>
  )
}

export default AddBlog
