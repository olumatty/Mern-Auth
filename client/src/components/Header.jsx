import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center'>
      <img src={assets.header_img} alt='' className='w-36 h-36 rounded-full mb-6'/>

        <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>Hello Developer
        <img src={assets.hand_wave} alt='' className='w-8 aspect-square'/> 
        </h1>

        <h2 className='text-2xl sm:text-5xl font-semibold mb-4'>Welcome to <span className='text-red-400'>OlumattyTech</span></h2>

        <p className='mb-8 max-w-md'> Let's start with a quick guide and we will have you up and running in no time!!</p>

        <button className="border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all">Get Started</button>
    </div>
  )
}

export default Header