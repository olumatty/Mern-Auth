import React from 'react'
import {assets} from "../assets/assets"
const Navbar = () => {
  return (
    <div className='w-full flex justify-between'>

      <img src={assets.logo} alt='' className='w-28 sm:w-32'/>

      <button>Login <img src={assets.arrow_icon} alt=''/></button>
    </div>
  )
}

export default Navbar
