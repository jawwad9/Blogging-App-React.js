import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase/firebaseconfig';

const Dashboard = () => {
  const [data, setData] = useState([]); // For storing blog data
  const [loading, setLoading] = useState(true); // For loading state
  const [isSubmitting, setIsSubmitting] = useState(false); // For form submission state

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Fetch data from Firestore
  const fetchData = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'Blogs'));
      const userBlog = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(userBlog);
    } catch (error) {
      console.error('Error fetching data: ', error);
      alert('Error fetching data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  // Delete a blog by its ID
  const deleteBlog = async (id) => {
    try {
      await deleteDoc(doc(db, 'Blogs', id));
      console.log('Document successfully deleted!');
      fetchData(); // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting document: ', error);
      alert('Error deleting document: ' + error.message);
    }
  };


  // Add a new blog
  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'Blogs'), {
        Title: formData.Title,
        mind: formData.mind,
      });
      console.log('Document added successfully');
      fetchData(); // Refresh data after adding
      reset(); // Reset form fields
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error adding document: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>      
    <h1 className="m-5 mt-3 text-2xl font-bold">Dashboard</h1>
    <div className=" bg-gray-100 flex flex-col items-center justify-center"> {/* Full-screen background */}

      {/* Form for submitting a new blog */}
      <div className="flex flex-col items-center justify-center mt-5">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-full mb-4 bg-white hover:border-violet-600"
            {...register('Title', { required: true })}
          />
          {errors.Title && <span className="text-red-500">This field is required</span>}

          <textarea
            cols="100"
            rows="5"
            placeholder="What is on your mind"
            className="border border-neutral-300 p-4 w-full mb-4 bg-white hover:border-violet-600"
            {...register('mind', { required: true })}
          ></textarea>
          {errors.mind && <span className="text-red-500">This field is required</span>}

          <button className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Publishing..." : "Publish Blog"}
          </button>
        </form>
      </div>

      {/* Display the list of blogs */}
      <div className="max-w-2xl mx-auto p-4 rounded-lg w-full">
        <h1 className=" text-3xl font-bold mb-3">My Blogs</h1>

        {loading ? (
          <h1 className="text-center text-lg text-gray-500">
            <span className="loading loading-spinner loading-lg"></span> Loading...
          </h1>
        ) : data.length > 0 ? (
          data.map((item) => (
            <div key={item.id} className="bg-white shadow-lg rounded-lg p-5 mb-3 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold mb-2">{item.Title}</h2>
              <p className="text-gray-700">{item.mind}</p>

              <button className="m-3" >Edit</button>
              <button className="m-3" onClick={() => deleteBlog(item.id)}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <h1 className="text-center text-lg text-gray-500">No Blogs Found</h1>
        )}
      </div>
    </div>
    </>

  );
};

export default Dashboard;