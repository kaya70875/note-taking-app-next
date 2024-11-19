import React, { useState } from 'react'
import SvgIcon from './reusables/SvgIcon'

export default function ChangePassword() {

    const [showPassword, setShowPassword] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    return (
        <div className='flex flex-col gap-6'>
            <header className='flex flex-col gap-2'>
                <h2>Change Password</h2>
            </header>

            <div className='flex flex-col gap-8'>
                <div className="input-wrapper flex flex-col gap-1 relative">
                    <label htmlFor="old-pass">Old Password</label>
                    <input type={showPassword.oldPassword ? 'text' : 'password'} id="old-pass" className='input' />
                    <div className="show-pass w-1/2 absolute right-10 top-1/2 -translate-y-1/1 cursor-pointer" onClick={() => setShowPassword({ ...showPassword, oldPassword: !showPassword.oldPassword })}>
                        {showPassword.oldPassword ? <SvgIcon path='hide-password' /> : <SvgIcon path='show-password' />}
                    </div>
                </div>

                <div className="input-wrapper flex flex-col gap-1 relative">
                    <label htmlFor="new-pass">New Password</label>
                    <input type={showPassword.newPassword ? 'text' : 'password'} id="new-pass" className='input' />
                    <div className="input-info flex items-center gap-1">
                        <SvgIcon path='info' />
                        <p>At least 8 characters</p>
                    </div>
                    <div className="show-pass w-1/2 absolute right-10 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword({ ...showPassword, newPassword: !showPassword.newPassword })}>
                        {showPassword.newPassword ? <SvgIcon path='hide-password' /> : <SvgIcon path='show-password' />}
                    </div>
                </div>

                <div className="input-wrapper flex flex-col gap-1 relative">
                    <label htmlFor="confirm-pass">Confirm New Password</label>
                    <input type={showPassword.confirmPassword ? 'text' : 'password'} id="confirm-pass" className='input' />
                    <div className="show-pass w-1/2 absolute right-10 top-1/2 -translate-y-1/1 cursor-pointer" onClick={() => setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })}>
                        {showPassword.confirmPassword ? <SvgIcon path='hide-password' /> : <SvgIcon path='show-password' />}
                    </div>
                </div>

                <div className='flex w-1/2 items-center justify-end'>
                    <button className="primary-btn w-1/2 max-w-48">
                        Change Password
                    </button>
                </div>

            </div>

        </div>
    )
}
