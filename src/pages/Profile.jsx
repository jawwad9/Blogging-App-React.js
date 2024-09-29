import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore"; 
import { db } from '../config/firebase/firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase/firebaseconfig';

const Profile = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const checkUser = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        console.log("Authenticated User UID:", uid);
        await UserData(uid);
      } else {
        console.log("User not signed in");
      }
    });
    return () => checkUser();
  }, []);

  const UserData = async (uid) => {
    const q = query(collection(db, "User"), where("UserId", "==", uid)); 
    const querySnapshot = await getDocs(q);
    
    console.log("Query Snapshot:", querySnapshot);

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`); 
        setData(doc.data());
      });
    } else {
      console.log("No user data found for this UID.");
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      {data ? (
        <div className='flex flex-col items-center gap-2'>
          <h1 className='text-2xl'>First Name: {data.FirstName}</h1>
          <h1 className='text-2xl'>Last Name: {data.LastName}</h1>
          <h1 className='text-2xl'>Email: {data.Email}</h1>
          <img style={{width: "14rem"}} className='rounded-lg' src={data.ImageUrl} alt="Profile" />
        </div>
      ) : (
        <h1 className='text-center'>Loading...</h1>
      )}
    </div>
  );
};

export default Profile;