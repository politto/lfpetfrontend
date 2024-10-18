import { IPost } from '@/types/IPost'
import React from 'react'

import Link from 'next/link'

type Props = {
    authorizedAccountId: number
    post: IPost
}

export default function Post({post}: Props) {
  return (
    <section className = 
    {post.postType === 'Found' ?
      "flex flex-col gap-4 p-6 border border-red-300 rounded-xl bg-red-200" :
      "flex flex-col gap-4 p-6 border border-yellow-300 rounded-xl bg-yellow-100"
    }
    
    >
        <h1 className = "text-2xl font-bold">{post.postTitle}</h1>
        <p>{post.postContent}</p>
        <img 
        src={post.postImageLink!} 
        alt={post.postTitle!} 
        className="w-1/2"/>
        {post.postDate ? new Date(post.postDate).toDateString() : 'Invalid Date'}
        {post.account}

    </section>
  )
}