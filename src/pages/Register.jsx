import React from 'react';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase/firebaseconfig';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase/firebaseconfig';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  // Function to register the user with Firebase Authentication
  const registerUser = async (data) => {
    console.log(data);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate('/dashboard');
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });

    // Function to add data to Firebase Firestore
    const addData = async () => {
      try {
        const docRef = await addDoc(collection(db, 'User'), {
          FirstName: data.FirstName,
          LastName: data.LastName,
          Email: data.email,
        });
        console.log('Document written with ID: ', docRef.id);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    };
    addData();
  };

  return (
    <>
      <div className="bg-white min-h-screen flex items-center justify-center"> {/* Ensures a white background */}
        <div className="bg-white shadow-lg shadow-2xl  rounded-lg p-8 w-full max-w-xs">
          <h1 className="text-center text-2xl font-bold mb-6">Register</h1>
          <form onSubmit={handleSubmit(registerUser)} className="space-y-4">
            <input
              type="text"
              placeholder="First Name"
              className="input input-bordered input-neutral w-full  bg-white hover:border-violet-600 "
              {...register('FirstName', { required: true })}
            />
            {errors.FirstName && (
              <span className="text-error text-sm ">This field is required</span>
            )}
            <input
              type="text"
              placeholder="Last Name"
              className="input input-bordered input-neutral w-full bg-white  hover:border-violet-600"
              {...register('LastName', { required: true })}
            />
            {errors.LastName && (
              <span className="text-error text-sm">This field is required</span>
            )}
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered input-neutral w-full bg-white hover:border-violet-600"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <span className="text-error text-sm">This field is required</span>
            )}
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered input-neutral w-full  bg-white hover:border-violet-600"
              {...register('password', { required: true })}
            />
            {errors.password && (
              <span className="text-error text-sm">This field is required</span>
            )}
            <input
              type="file"
              placeholder="profileImage"
              className="file-input w-full max-w-xs input-bordered mb-4 block bg-white hover:border-violet-600"
              {...register('profileImage', { required: true })}
            />
            <button className="btn btn-primary w-full">Register</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;