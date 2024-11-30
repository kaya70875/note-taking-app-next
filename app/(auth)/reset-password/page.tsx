'use client';

import React from 'react'
import logo from '@public/images/logo.svg'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useAuthActions } from '@hooks/useAuthActions'

export default function page() {

    const {handleResetPassword} = useAuthActions();

    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleClick = async () => {

        if(newPassword === confirmPassword) {
            setLoading(true);
            await handleResetPassword(token as string , newPassword);
            setLoading(false);
        }

        else {
            alert('Passwords do not match');
        }
    }

    return (
        <div className='flex flex-col gap-8 p-12 xs:p-4'>
            <header className='flex flex-col gap-4 items-center justify-center text-center'>
                <Image src={logo} alt='logo' className='w-32 h-18' />
                <div className='flex flex-col gap-1'>
                    <h1>Reset Your Password</h1>
                    <p>Choose a new password to secure your account.</p>
                </div>
            </header>

            <div className="input-wrapper">
                <label htmlFor="new-pass">New Password</label>
                <input type="password" className='input !w-full' id='new-pass'
                onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>

            <div className="input-wrapper">
                <label htmlFor="new-pass-again">Confirm New Password</label>
                <input type="password" className='input !w-full' id='new-pass-again'
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            <button onClick={handleClick} disabled={loading} className="primary-btn disabled:opacity-50 disabled:hover:bg-blue-600">Reset Password</button>
        </div>
    )
}
