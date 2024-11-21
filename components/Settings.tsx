import React from 'react'
import SvgIcon from './reusables/SvgIcon'
import ThemeSettingsComponent from './ThemeSettingsComponent'
import ChangePassword from './ChangePassword'
import { signOut } from 'next-auth/react'
import IconSun from './svgIcons/IconSun'
import IconMoon from './svgIcons/IconMoon'
import IconSystem from './svgIcons/IconSystem'
import IconSansSerif from './svgIcons/IconSansSerif'
import IconSerif from './svgIcons/IconSerif'
import IconMonoSpace from './svgIcons/IconMonoSpace'

interface SettingsProps {
    settingType: 'Color Theme' | 'Font Theme' | 'Change Password' | 'Logout'
}

export default function Settings({ settingType }: SettingsProps) {

    const colorOptions = [
        {
            name: 'Light Mode',
            desc: 'Pick a clean and classic light theme',
            svg: (<IconSun props={{color : 'text-neutral-950 dark:text-neutral-100'}} />)
        },
        {
            name: 'Dark Mode',
            desc: 'Pick a dark and classic dark theme',
            svg: (<IconMoon props={{color : 'text-neutral-950 dark:text-neutral-100'}} />)

        },
        {
            name: 'System',
            desc: 'Adapt the theme based on your system settings',
            svg: (<IconSystem props={{color : 'text-neutral-950 dark:text-neutral-100'}} />)

        }
    ]

    const themeOptions = [
        {
            name: 'Sans-serif',
            desc: 'Clean and modern, easy to read',
            svg: (<IconSansSerif props={{color : 'text-neutral-950 dark:text-neutral-100'}} />)

        },
        {
            name: 'Serif',
            desc: 'Classic and elegant, great for reading',
            svg: (<IconSerif props={{color : 'text-neutral-950 dark:text-neutral-100'}} />)

        },
        {
            name: 'Monospace',
            desc: 'Code-like , great for a technical vibe',
            svg: (<IconMonoSpace props={{color : 'text-neutral-950 dark:text-neutral-100'}} />)

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
