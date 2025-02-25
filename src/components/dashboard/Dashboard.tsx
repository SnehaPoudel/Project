"use client";
import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import Navbar from '../nav-bar/Navbar';

export default function Dashboard() {
  return (
    <div className= 'bg-[#F0F0F0] min-h-screen'>
        <Sidebar />
        <Navbar />
        
        
    </div>
  )
}
