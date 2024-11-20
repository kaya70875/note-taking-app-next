'use client';

import SvgIcon from '@components/reusables/SvgIcon'
import logo from '@public/images/logo.svg'
import Image from 'next/image';
import { useState } from 'react';

export default function page() {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='flex flex-col gap-12 p-12'>
      <header className='flex flex-col gap-4 items-center justify-center text-center'>
        <Image src={logo} alt='logo' className='w-32 h-18' />
        <div className='flex flex-col gap-1'>
          <h1>Welcome to Note</h1>
          <p>Please log in to continue</p>
        </div>
      </header>

      <div className='flex flex-col gap-4'>
        <div className="input-wrapper">
          <label htmlFor="email">Email Address</label>
          <input type="text" className='input !w-full' id='email'
           placeholder='email@example.com'/>
        </div>

        <div className="input-wrapper">
          <label htmlFor="new-pass" className="block mb-1">Password</label>
          <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              id="new-pass"
              className='input !w-full'
            />
            <div
              className="show-pass absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? <SvgIcon path='hide-password' /> : <SvgIcon path='show-password' />}
            </div>
          </div>
        </div>
        <button className="primary-btn">Sign Up</button>

        <div className="line"></div>
        <div className="google-auth flex flex-col gap-4 items-center justify-center">
          <p>Or log in with:</p>
          <button className='flex items-center justify-center p-3 gap-4 w-full border border-neutral-300 rounded-lg'>
            <SvgIcon path='google' />
            <h2>Google</h2>
          </button>
        </div>
        <div className="line"></div>
        <div className="already flex items-center justify-center gap-2">
          <p>Not account yet?</p>
          <a href='/register'>Register</a>
        </div>
      </div>
    </div>
  )
}