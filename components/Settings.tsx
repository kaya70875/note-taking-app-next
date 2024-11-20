import React from 'react'
import SvgIcon from './reusables/SvgIcon'
import ThemeSettingsComponent from './ThemeSettingsComponent'
import ChangePassword from './ChangePassword'
import { signOut } from 'next-auth/react'

interface SettingsProps {
    settingType: 'Color Theme' | 'Font Theme' | 'Change Password' | 'Logout'
}

export default function Settings({ settingType }: SettingsProps) {

    const colorOptions = [
        {
            name: 'Light Mode',
            desc: 'Pick a clean and classic light theme',
            svg: (<SvgIcon path='sun' />)
        },
        {
            name: 'Dark Mode',
            desc: 'Pick a dark and classic dark theme',
            svg: (<SvgIcon path='moon' />)
        },
        {
            name: 'System',
            desc: 'Adapt the theme based on your system settings',
            svg: (<SvgIcon path='system-theme' />)
        }
    ]

    const themeOptions = [
        {
            name: 'Sans-serif',
            desc: 'Clean and modern, easy to read',
            svg: (<SvgIcon path='font-sans-serif' />)
        },
        {
            name: 'Serif',
            desc: 'Classic and elegant, great for reading',
            svg: (<SvgIcon path='font-serif' />)
        },
        {
            name: 'Monospace',
            desc: 'Code-like , great for a technical vibe',
            svg: (<SvgIcon path='font-monospace' />)
        }
    ]

    if (settingType === 'Logout') {
        signOut();
    }

    return (
        <div className='w-full h-full p-10'>
            {settingType === 'Color Theme' && (
                <ThemeSettingsComponent themeList={colorOptions} themeType={settingType} />
            )}
            {settingType === 'Font Theme' && (
                <ThemeSettingsComponent themeList={themeOptions} themeType={settingType} />
            )}

            {settingType === 'Change Password' && (
                <ChangePassword />
            )}
        </div>
    )
}
