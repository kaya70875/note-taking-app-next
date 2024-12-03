import React, { useState } from 'react'
import IconInfo from './svgIcons/IconInfo';
import HidePassword from './svgIcons/HidePassword';
import ShowPassword from './svgIcons/ShowPassword';
import { useAuthActions } from '@hooks/useAuthActions';
import { useToast } from '@context/ToastContext';

export default function ChangePassword() {

    const { handleResetPassword } = useAuthActions();
    const { showToast } = useToast();

    const [showPassword, setShowPassword] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    const [password, setPassword] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [loading, setLoading] = useState(false);

    const handlePasswordChange = async () => {
        if (password.newPassword !== password.confirmPassword) {
            showToast('New passwords do not match', 'error');
            return;
        }

        setLoading(true);

        try {
            const response : any = await handleResetPassword(password.oldPassword, password.newPassword);
            console.log('response' , response);

            if (response.error) {
                showToast('Current password is wrong.', 'error');
            } else {
                showToast('Password changed successfully', 'success');
            }
        } catch (error : any) {
            console.error(error);
            showToast('Something went wrong. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col gap-6'>
            <header className='flex flex-col gap-2'>
                <h2>Change Password</h2>
            </header>

            <div className='flex flex-col gap-8'>
                <div className="input-wrapper w-1/2 xxl:w-3/4 lg:w-full flex flex-col gap-1 relative">
                    <label className='dark:text-neutral-300' htmlFor="old-pass">Old Password</label>
                    <input type={showPassword.oldPassword ? 'text' : 'password'} id="old-pass" className='input dark:border-neutral-700' onChange={(e) => setPassword({ ...password, oldPassword: e.target.value })} />
                    <div className="show-pass w-full absolute top-1/2 right-0 cursor-pointer" onClick={() => setShowPassword({ ...showPassword, oldPassword: !showPassword.oldPassword })}>
                        <div className='eye-icon'>
                            {showPassword.oldPassword ? <HidePassword props={{ color: 'text-neutral-950 dark:text-neutral-100' }} /> : <ShowPassword props={{ color: 'text-neutral-950 dark:text-neutral-100' }} />}
                        </div>
                    </div>
                </div>

                <div className="input-wrapper w-1/2 xxl:w-3/4 lg:w-full flex flex-col gap-1 relative">
                    <label className='dark:text-neutral-300' htmlFor="new-pass">New Password</label>
                    <input type={showPassword.newPassword ? 'text' : 'password'} id="new-pass" className='input dark:border-neutral-700' onChange={(e) => setPassword({ ...password, newPassword: e.target.value })} />
                    <div className="input-info flex items-center gap-1">
                        <IconInfo props={{ color: 'text-neutral-950 dark:text-neutral-100' }} />
                        <p className='text-neutral-950 dark:text-neutral-300'>At least 8 characters</p>
                    </div>
                    <div className="show-pass w-full absolute top-1/2 right-0 -translate-y-4 cursor-pointer" onClick={() => setShowPassword({ ...showPassword, newPassword: !showPassword.newPassword })}>
                        <div className="eye-icon">
                            {showPassword.newPassword ? <HidePassword props={{ color: 'text-neutral-950 dark:text-neutral-100' }} /> : <ShowPassword props={{ color: 'text-neutral-950 dark:text-neutral-100' }} />}
                        </div>
                    </div>
                </div>

                <div className="input-wrapper w-1/2 xxl:w-3/4 lg:w-full flex flex-col gap-1 relative">
                    <label className='dark:text-neutral-300' htmlFor="confirm-pass">Confirm New Password</label>
                    <input type={showPassword.confirmPassword ? 'text' : 'password'} id="confirm-pass" className='input dark:border-neutral-700' onChange={(e) => setPassword({ ...password, confirmPassword: e.target.value })} />
                    <div className="show-pass w-full absolute top-1/2 right-0 cursor-pointer" onClick={() => setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })}>
                        <div className="eye-icon">
                            {showPassword.confirmPassword ? <HidePassword props={{ color: 'text-neutral-950 dark:text-neutral-100' }} /> : <ShowPassword props={{ color: 'text-neutral-950 dark:text-neutral-100' }} />}

                        </div>
                    </div>
                </div>

                <div className='flex w-1/2 md:w-3/4 items-center justify-end xxl:justify-start'>
                    <button disabled={loading} onClick={handlePasswordChange} className="primary-btn w-1/2 sm:w-full max-w-48 disabled:bg-neutral-500">
                        Change Password
                    </button>
                </div>

            </div>

        </div>
    )
}
