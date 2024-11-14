import React from 'react'
import SvgIcon from './reusables/SvgIcon';

interface NoteContentProps {
  title: string;
  content: string;
  tags: string[];
}

export default function NoteContent({title , content , tags}: NoteContentProps) {
  return (
    <div className="content-section w-full flex flex-col flex-1 gap-4 p-4">
        <header className='flex flex-col gap-4'>
            <h1>{title}</h1>
            <div className='flex flex-col gap-4'>
                <div className="memo-info flex items-center gap-8">
                    <div className="tags-section flex gap-2">
                        <SvgIcon path="tag" />
                        <p>Tags</p>
                    </div>
                    <div className="tags-section flex gap-4">
                        <p>{tags}</p>
                    </div>
                </div>

                <div className="memo-info flex items-center gap-8">
                    <div className="tags-section flex gap-2">
                        <SvgIcon path="clock" />
                        <p>Last Edited</p>
                    </div>
                    <div className="tags-section flex gap-4">
                        <p>2012</p>
                    </div>
                </div>
            </div>
        </header>
    </div>
  )
}
