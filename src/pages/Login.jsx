import React, { useRef } from 'react'
import { useForm } from "react-hook-form"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebase/firebaseconfig';
import { Link, useNavigate } from 'react-router-dom';



const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const loginUserFromFirebase  = (data) => {
    console.log(data)

    signInWithEmailAndPassword(auth, data.email, data.password)
  .then((userCredential) => {
    const user = userCredential.user;
    navigate('/home')
    console.log(user);
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
  });
  }

  const navigate = useNavigate();
  return (
    <>
    <div>
          
    <h2>Login</h2>

<form onSubmit={handleSubmit(loginUserFromFirebase)}>
  <input type="email" placeholder='enter your email' {...register("email", { required: true })}/>
  {errors.email && <span className='text-danger'>This field is required</span>}
  <br/>
  <input type="password" placeholder='enter your password' {...register("password", { required: true })}/>
  {errors.password && <span className='text-danger'>This field is required</span>}
  <br/>
  <button type='submit'>Login</button>
</form>
<Link to="/Register" className="text-blue-500 hover:underline">Don't have an account?</Link>
    </div>
    </>
  )
}

export default Login