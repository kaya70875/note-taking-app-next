import IconMoon from '@components/svgIcons/IconMoon'
import IconSun from '@components/svgIcons/IconSun'
import IconSystem from '@components/svgIcons/IconSystem'
import ThemeSettingsComponent from '@components/ThemeSettingsComponent'
import React from 'react'

export default function page() {

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

  return (
    <ThemeSettingsComponent themeType='Color Theme' themeList={colorOptions}  />
  )
}
