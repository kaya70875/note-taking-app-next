'use client';

import { useFont } from '@context/FontContext';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

interface ThemeSettingsComponentProps {
    themeType: 'Color Theme' | 'Font Theme';
    themeList: {
        name: string;
        desc: string;
        svg: React.ReactNode;
    }[];
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('themePref');
    return savedTheme || 'Light Mode';
}

function initializeFontTheme() {
    const savedFont = localStorage.getItem('fontPref');
    return savedFont || 'Sans-serif';
}

export default function ThemeSettingsComponent({ themeType, themeList }: ThemeSettingsComponentProps) {
    const { setTheme } = useTheme();
    const { setFont } = useFont();

    const [selectedTheme, setSelectedTheme] = useState<string>(initializeTheme);
    const [selectedFont, setSelectedFont] = useState<string>(initializeFontTheme);

    useEffect(() => { // Initialize the selected theme on first mount.
        if(selectedFont === 'Sans-serif') {
            setFont('inter');
        } else if (selectedFont === 'Serif') {
            setFont('noto');
        } else if (selectedFont === 'Monospace') {
            setFont('mono');
        }
    } , [])

    const handleThemeChange = (option: string) => {
        if (themeType === 'Color Theme') {

            setSelectedTheme(option); // Update the selected theme
            localStorage.setItem('themePref', option);

            if (option === 'Dark Mode') {
                setTheme('dark');
            } else {
                setTheme('light');
            }
        }

        else if (themeType === 'Font Theme') {

            setSelectedFont(option); // Update the selected font
            localStorage.setItem('fontPref', option);

            if (option === 'Sans-serif') {
                setFont('inter');
            } else if (option === 'Serif') {
                setFont('noto');
            } else if (option === 'Monospace') {
                setFont('mono');
            }
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <header className="flex flex-col gap-2">
                {themeType === 'Color Theme' ? (
                    <>
                        <h2>Color Theme</h2>
                        <p className="text-neutral-950 dark:text-neutral-300">
                            Select your preferred color theme:
                        </p>
                    </>
                ) : (
                    <>
                        <h2>Font Theme</h2>
                        <p className="text-neutral-950 dark:text-neutral-300">
                            Choose your font theme:
                        </p>
                    </>
                )}
            </header>
            <div className="all-radio flex flex-col gap-4">
                {themeList.map((option) => (
                    <div
                        key={option.name}
                        className={`flex items-center justify-between gap-4 border border-neutral-300 dark:border-neutral-700 p-4 w-1/2 xxl:w-2/3 xl:w-full rounded-lg cursor-pointer ${(themeType === 'Color Theme' ? selectedTheme : selectedFont) === option.name ? 'ring ring-blue-500' : ''
                            }`}
                        onClick={() => handleThemeChange(option.name)}
                    >
                        <div className="flex items-center gap-4">
                            <div className="svg-wrapper flex items-center justify-center p-1 border border-neutral-300 dark:border-neutral-700 rounded-lg">
                                {option.svg}
                            </div>
                            <div className="flex flex-col gap-1">
                                <h3>{option.name}</h3>
                                <p className="text-neutral-950 dark:text-neutral-300">{option.desc}</p>
                            </div>
                        </div>
                        <input
                            type="radio"
                            id={option.name}
                            value={option.name}
                            checked={(themeType === 'Color Theme' ? selectedTheme : selectedFont) === option.name}
                            readOnly
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
