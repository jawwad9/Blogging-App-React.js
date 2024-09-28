import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase/firebaseconfig';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Blogs'));
      const userBlog = [];
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} =>`, doc.data());
        userBlog.push(doc.data());
      });
      setData(userBlog);
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
    <h1 className=" text-3xl font-bold p-3">Good Morning Readers!</h1>
    <div className=" bg-gray-100  flex items-center justify-center p-4">
      {/* This div ensures full screen with white background */}
      <div className="max-w-2xl mx-auto w-full">
        <h1 className=" text-3xl font-bold mb-4">All Blogs</h1>
        {loading ? (
          <h1 className="text-center text-lg text-gray-500">
            <span className="loading loading-spinner loading-lg"></span>
          </h1>
        ) : data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 mb-4 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold mb-2">{item.Title}</h2>
              <p className="text-gray-700">{item.mind}</p>
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

export default Home;