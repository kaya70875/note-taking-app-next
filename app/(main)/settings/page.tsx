'use client';

import Navbar from '@components/Navbar'
import React, { useState } from 'react'

export default function page() {
    const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className='w-full max-h-full'>
        <Navbar setSearchQuery={setSearchQuery} />
      
    </div>
  )
}
