import React, { useRef } from 'react'
import { useForm } from "react-hook-form"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebase/firebaseconfig';




const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const registerUserFirebase  = (data) => {
    console.log(data)

    createUserWithEmailAndPassword(auth, data.email, data.password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);

  })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
  });
  }
  


  return (
    <>

    <h1>Register</h1>

        <form onSubmit={handleSubmit(registerUserFirebase)}>
          <input type="text" placeholder='Enter your Full Name' {...register("fullName", { required: true })}/>
          {errors.fullName && <span className='text-danger'>This field is required</span>}
          <br/>
          <input type="email" placeholder='Enter your Email' {...register("email", { required: true })}/>
          {errors.email && <span className='text-danger'>This field is required</span>}
          <br/>
          <input type="password" placeholder='Enter your First Password' {...register("password", { required: true })}/>
          {errors.password && <span className='text-danger'>This field is required</span>}
          <br/>
          <button type='sumbit'>Register</button>
        </form>
    </>
  )
}

export default Register