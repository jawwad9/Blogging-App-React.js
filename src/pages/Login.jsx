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
    <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-md shadow-2xl  rounded-lg p-5 w-full max-w-xs" onSubmit={handleSubmit(loginUserFromFirebase)}>
          <form action="#" method="POST" className="space-y-4">
              <div className="mt-2">
                <input type="email" placeholder=' Enter your email' {...register("email", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                  {errors.email && <span className="text-error text-sm">This field is required</span>}
              </div>

              <div className="mt-2">
                <input type="password" placeholder=' Enter your password' {...register("password", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                  {errors.email && <span className="text-error text-sm">This field is required</span>}
              </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >Login</button>
            </div>
          </form>

          <p className="mt-3 text-center text-sm text-gray-500">
            <Link to="/Register" className="mt-10 text-center text-sm text-gray-500">Don't have an account?</Link>
          </p>
        </div>
      </div>


          {/* <div>
          
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
    </div> */}
    </>
  )
}

export default Login