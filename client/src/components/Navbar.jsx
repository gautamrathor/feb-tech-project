import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='bg-blue-400 p-4 flex gap-2 hover:cursor-pointer '>
      <Link className='hover:text-gray-500' to="/">Home</Link>
      <Link className='hover:text-gray-500' to="/login">Login</Link>
      <Link className='hover:text-gray-500' to="/signup">SignUP</Link>
      <Link className='hover:text-gray-500' to="/">About</Link>
      
      
    </div>
  )
}

export default Navbar
