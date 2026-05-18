import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex bg-gray-800 text-white p-4 justify-between items-center'>
        <div className='text-orange-300 font-semibold text-5xl '>fool</div>
        <div className='space-x-4'>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/blog">Blog</Link>
        </div>
        <div className='space-x-4'>
            <button className='bg-orange-300 text-gray-800 px-4 py-2 rounded-md hover:bg-orange-400'>Login</button>
            <button className='bg-orange-300 text-gray-800 px-4 py-2 rounded-md hover:bg-orange-400'>Sign Up</button>
        </div>
    </div>
  )
}

export default Navbar