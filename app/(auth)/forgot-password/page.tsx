'use client';

import Image from 'next/image'
import React, { useState } from 'react'
import logo from '@public/images/logo.svg'
import { useAuthActions } from '@hooks/useAuthActions';

export default function page() {

    const { handleSendResetPassword } = useAuthActions();

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (email) {
            setLoading(true);
            await handleSendResetPassword(email);
            setLoading(false);
        }
    }

    return (
        <div className='flex flex-col gap-8 p-12 xs:p-4'>
            <header className='flex flex-col gap-4 items-center justify-center text-center'>
                <Image src={logo} alt='logo' className='w-32 h-18' />
                <div className='flex flex-col gap-1'>
                    <h1>Forgotten Your Password ?</h1>
                    <p>Enter your email below, and we'll send you a link to reset it.</p>
                </div>
            </header>

            <div className="input-wrapper">
                <label htmlFor="email">Email Address</label>
                <input type="text" className='input !w-full' id='email'
                    placeholder='email@example.com'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <button onClick={handleClick} disabled={loading} className="primary-btn disabled:opacity-50 disabled:hover:bg-blue-600">Send Reset Link</button>
        </div>
    )
}
