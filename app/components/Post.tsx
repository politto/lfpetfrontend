import { IPost } from '@/types/IPost'
import React, { useState } from 'react'

import Link from 'next/link'
import MapMarker from './MapMarker'
import PetItem from './PetItem'
import PetManager from './PetManager'

type Props = {
    authorizedAccountId: number
    post: IPost
}


export default function Post({post}: Props) {
  const [lastLat, setLastLat] = useState<number>(13.74)
  const [lastLng, setLastLng] = useState<number>(100.71)

  // if (post.postData.petParticipated[0]) {
  //   setLastLat(post.postData.petParticipated[0].lastLat)
  //   setLastLng(post.postData.petParticipated[0].lastLng)
  // }
  
  console.log(post)
  return (
    <div
      className={
        post.postData.postType === 'Lost'
          ? 'flex flex-col gap-6 p-6 border border-red-300 rounded-xl bg-red-200'
          : 'flex flex-col gap-6 p-6 border border-yellow-300 rounded-xl bg-yellow-100'
      }
    >
      <div className="flex flex-row items-center ">
        <p className="font-bold text-lg">Post Type: </p>
        <p className="text-lg font-bold ml-2">{post.postData.postType}</p>
      </div>

      <div className="flex flex-row gap-6">
        {post.postData.petParticipated.map((pet, index) => (
          <PetItem key={pet.petId} pet={pet} viewOnly={true} />
        ))}
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-row items-center gap-2">
          <p className="font-bold text-lg min-w-[5em]">Title:</p>
          <p className="text-lg">{post.postData.postTitle}</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <p className="font-bold text-lg min-w-[5em]">Content:</p>
          <p className="text-lg">{post.postData.postContent}</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <p className="font-bold text-lg min-w-[5em]">Date:</p>
          <p className="text-lg">{post.postData.postDate ? post.postData.postDate.toDateString() : 'N/A'}</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <p className="font-bold text-lg min-w-[5em]">Account ID:</p>
          <p className="text-lg">{post.postData.accountId}</p>
        </div>
      </div>

      <div className="flex flex-row gap-6">
        {post.postData.postImageLink && (
          <div className="flex flex-col items-center w-1/2">
            <p className="font-bold text-lg">Post Image:</p>
            <img
              src={post.postData.postImageLink}
              alt="Post Image"
              className="h-[80%] max-h-[20vh] max-w-[80%] object-contain rounded-lg"
            />
          </div>
        )}
        <div className="flex flex-col items-center w-1/2">
          <p className="font-bold text-lg">Last Known Location:</p>
          <div className="h-[30vh] w-full">
            <MapMarker draggable={true} lat={lastLat} lng={lastLng} setLat={setLastLat} setLng={setLastLng} />
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between gap-6 mt-4">
        <p className = "text-2xl font-bold">Contact</p>
        <div className="flex flex-row items-center">
          <p className="font-bold text-lg">Email:</p>
          <p className="text-lg">{post.email}</p>
        </div>
        <div className="flex flex-row items-center">
          <p className="font-bold text-lg">Phone Number:</p>
          <p className="text-lg">{post.phoneNumber}</p>
        </div>
      </div>
    </div>
  )
}