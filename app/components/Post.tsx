import { IPost } from '@/types/IPost'
import React, { useState } from 'react'

import Link from 'next/link'
import MapMarker from './MapMarker'
import PetItem from './PetItem'
import PetManager from './PetManager'
import MapModal from './MapModal'

type Props = {
    authorizedAccountId: number
    post: IPost
}


export default function Post({post}: Props) {
  const [lastLat, setLastLat] = useState<number>(13.74)
  const [lastLng, setLastLng] = useState<number>(100.71)
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <div className="flex flex-col ">
        <p className={`text-4xl center ${post.postData.postType === "Lost"? `text-red-700` :`text-green-700`}`}>{post.postData.postTitle === ""? "No title" : post.postData.postTitle}</p>
        <p className="text-lg ml-2">{post.postData.postType} pet post</p>
      </div>

      <div className = "flex flex-col md:flex-row justify-between bg-white bg-opacity-20 p-2 rounded-xl"> 
        <div className="flex flex-col gap-6 w-[50vw]">
          
          <div className="flex flex-row items-top gap-2">
            <p className="font-bold text-lg min-w-[5em]">Detail:</p>
            <p className="text-lg min-h-[10vh]">{post.postData.postContent}</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <p className="font-bold text-lg min-w-[5em]">Date:</p>
            <p className="text-lg">{post.postData.postDate ? post.postData.postDate.toString() : 'N/A'}</p>
          </div>
          {/* <div className="flex flex-row items-center gap-2">
            <p className="font-bold text-lg min-w-[5em]">Account ID:</p>
            <p className="text-lg">{post.postData.accountId}</p>
          </div> */}

          <div className="flex flex-row items-center gap-2">
            <p className="font-bold text-lg">Last Known Location:</p>
            <button
              className="mb-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={() => setIsModalOpen(true)}>
                Open Map
            </button>
              {isModalOpen && (
                  <MapModal
                      draggable={true}
                      lat={lastLat}
                      lng={lastLng}
                      setLat={setLastLat}
                      setLng={setLastLng}
                      onClose={() => setIsModalOpen(false)}
                  />
              )}
          </div>
        </div>

        <div className="flex flex-row w-[50vw]">
          {post.postData.postImageLink && (
              <img
                src={post.postData.postImageLink}
                alt="Post Image"
                className="w-full h-full object-cover rounded-lg"
              />
          )}
          
        </div>
      </div>

      <div>
      <div className="flex flex-row gap-6">
        
        <div className="flex flex-row items-center gap-2">
            <p className="font-bold text-lg min-w-[5em]">Included pets:</p>
        </div>
      </div>
        <div className="flex flex-row gap-6">
          {post.postData.pets.map((pet, index) => (
            <PetItem key={pet.petId} pet={pet} viewOnly={true} onDelete={() => {}}/>
          ))}
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