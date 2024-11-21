'use client';

import { useTheme } from 'next-themes';
import React, { useEffect } from 'react'

interface ThemeSettingsComponentProps {
    themeType: 'Color Theme' | 'Font Theme';
    themeList: {
        name: string;
        desc: string;
        svg: React.ReactNode;
    }[];
}

export default function ThemeSettingsComponent({ themeType, themeList }: ThemeSettingsComponentProps) {

    const {setTheme , resolvedTheme} = useTheme();

    const handleThemeChange = (theme: string) => {
        if(theme === 'Dark Mode') {
            setTheme('dark');
        }
        else {
            setTheme('light');
        }
    };

    useEffect(() => {
        if(resolvedTheme === 'dark') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    } ,[])

    return (
        <div className='flex flex-col gap-6'>
            <header className='flex flex-col gap-2'>
                {themeType === 'Color Theme' ? (
                    <>
                        <h2>Color Theme</h2>
                        <p>Select your preferred color theme:</p>
                    </>

                ) : (
                    <>
                        <h2>Font Theme</h2>
                        <p>Choose your font theme:</p>
                    </>
                )}

            </header>
            <div className="all-radio flex flex-col gap-4">
                {themeList.map(option => (
                    <div className='flex items-center justify-between gap-4 border border-neutral-300 p-4 w-1/2 rounded-lg cursor-pointer' onClick={() => handleThemeChange(option.name)}>
                        <div className='flex items-center gap-4'>
                            <div className="svg-wrapper flex items-center justify-center p-1 border border-neutral-300 rounded-lg">
                                {option.svg}
                            </div>
                            <div className='flex flex-col gap-1'>
                                <h3>{option.name}</h3>
                                <p>{option.desc}</p>
                            </div>
                        </div>

                        <input type="radio" id={option.name} name="color-theme" value={option.name} />
                    </div>
                ))}
            </div>

        </div>
    )
}
