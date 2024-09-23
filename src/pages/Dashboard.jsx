import React, { useState } from 'react'
import { useForm } from "react-hook-form"


const Dashboard = () => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const [blogs, steBlogs] = useState([]);

const onAuthStateChanged = (data) => {
  console.log(data);

  blogs.push({
    title: data.title,
    description: data.description,
  })
  steBlogs([...blogs])
  console.log(blogs);



}


  return (
    <>

    <h1>Dashboard</h1>
        <form onSubmit={handleSubmit(onAuthStateChanged)}>
          <input type="text" placeholder='Enter Your Title' {...register("title", { required: true })}/><br/>
          <br/> {errors.title && <span>This field is required</span>}
          <input type="text" placeholder='What is in your mind' {...register("description", { required: true })}/><br/>{errors.description && <span>This field is required</span>}
          <br/>
          <button type='sumbit'>Click</button>
        </form>


        {/* <div>
        {blogs.length > 0 ? blogs.map((item, index) => {
          return <div key={index} className="card m-5 p-3">
            <h1>{item.title}</h1>
            <p>{item.description}</p>
          </div>
        }) : <h1>No blogs found</h1>}
      </div> */}

      
      {blogs.map((item, index) => (
        <div key={index} className='text-center flex justify-center gap-5 mt-3'>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
        </div>
      ))} 


    </>
  )
}

export default Dashboard