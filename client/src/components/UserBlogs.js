import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Blog from './Blog'
const UserBlogs = () => {
  const [user,setUser] = useState()
  const id = localStorage.getItem('userId')
  const sendRequest = async()=>{
const resp = await axios.get(`http://localhost:3001/api/blog/user/${id}`).catch(err=>{console.log(err)})
const data = await resp.data
return data
  }
  useEffect(()=>{
    sendRequest().then((data)=>setUser(data.user))
  },[])
  console.log(user)
  return (
    <div>
      {user && user.blogs && user.blogs.map((blog,index)=>
          (<Blog 
            id={blog._id}
            key={index} title={blog.title} 
            isUser={true}
            description ={blog.description} 
            imageURL={blog.image} 
            userName ={user.name}/>)
        )}
    </div>
  )
}

export default UserBlogs
