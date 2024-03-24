import React from 'react'

const NavBar = () => {
  return (
   <>
   <nav className='flex justify-between bg-slate-700 text-white py-2 fixed top-0 left-0 w-full'>
    <div className="logo">
        <span className='font-bold text-xl mx-9'>Task</span>
    </div>
    <ul className="flex gap-8 mx-9">
        <li className='cursor-pointer hover:font-bold transition-all duration-50'>Your List</li>
        
    </ul>
   </nav>
   </>
  )
}

export default NavBar
