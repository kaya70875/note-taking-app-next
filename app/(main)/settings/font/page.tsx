
import IconMonoSpace from '@components/svgIcons/IconMonoSpace'
import IconSansSerif from '@components/svgIcons/IconSansSerif'
import IconSerif from '@components/svgIcons/IconSerif'
import ThemeSettingsComponent from '@components/ThemeSettingsComponent'
import React from 'react'

export default function page() {

    const themeOptions = [
        {
            name: 'Sans-serif',
            desc: 'Clean and modern, easy to read',
            svg: (<IconSansSerif props={{ color: 'text-neutral-950 dark:text-neutral-100' }} />)

        },
        {
            name: 'Serif',
            desc: 'Classic and elegant, great for reading',
            svg: (<IconSerif props={{ color: 'text-neutral-950 dark:text-neutral-100' }} />)

        },
        {
            name: 'Monospace',
            desc: 'Code-like , great for a technical vibe',
            svg: (<IconMonoSpace props={{ color: 'text-neutral-950 dark:text-neutral-100' }} />)

        }
    ]

    return (
        <ThemeSettingsComponent themeList={themeOptions} themeType='Font Theme' />
    )
}
