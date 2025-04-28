import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProfileMenu() {
  const [open, setOpen] = useState(false)
  const { signOut } = useAuth()
  const prof = JSON.parse(localStorage.getItem('userProfile')||"{}")
  return (
    <div className="relative">
      <button onClick={()=>setOpen(o=>!o)} className="focus:outline-none">
        <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">{prof.name?.[0]}</div>
      </button>
      {open && (
        <div className="absolute right-0 bg-white shadow rounded mt-2 w-48">
          <div className="p-2 font-bold">{prof.name}</div>
          <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">My Profile</Link>
          <Link to="/notes" className="block px-4 py-2 hover:bg-gray-100">My Notes</Link>
          <button onClick={signOut} className="w-full text-left px-4 py-2 hover:bg-gray-100">Log Out</button>
        </div>
      )}
    </div>
  )
}
