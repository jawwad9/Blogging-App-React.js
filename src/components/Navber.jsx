import React from 'react'
import { Link } from 'react-router-dom'

const Navber = () => {
  return (
    <>

        <div>
       <h1><Link to='home'>Home</Link></h1>
       <h1><Link to='dashboard'>Dashboard</Link></h1>
       <h1><Link to='profile'>Profile</Link></h1>
       <h1><Link to='login'>Login</Link></h1>
       <h1><Link to='register'>Register</Link></h1>
        </div>

    </>
  )
}

export default Navber