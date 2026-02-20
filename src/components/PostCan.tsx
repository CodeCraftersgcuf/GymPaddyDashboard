import React from 'react'
import images from '../constants/images'
import { avatarUrl } from '../constants/help';

interface props {
    profile_picture?:string;
    Description : string;
    time:string;
}

const PostCan:React.FC<props> = ({
    profile_picture = images.admin,
    Description,
    time = "Just Now"
}) => {
  return (
    <div className='flex gap-4 p-2'>
        <img src={avatarUrl(profile_picture)} alt="name" className='w-14 h-14 rounded-md object-contain' />
        <div className='flex flex-col justify-between flex-[1]'>
            <h1 className='text-sm'>{Description.slice(0,40)} {Description.length > 40 && '...'}</h1>
            <span className='text-black/50 text-sm text-end w-full block'>{time}</span>
        </div>
    </div>
  )
}

export default PostCan