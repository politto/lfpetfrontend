import React, { useEffect, useState } from 'react'

import {
    QueryClient,
    QueryClientProvider,
    useQuery,
  } from '@tanstack/react-query'
import { getPosts20 } from '@/api/postsApi'
import { IPost } from '@/types/IPost'
import PostCreator from './PostCreator'
import Post from './Post'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { IPet } from '@/types/IPet'

type Props = {}

//must be from authentication instead
const authorizedAccountId = 2;

//mock post data of type IPost
const mockPost: IPost[] = [
  {
    postData: {
      postId: 5,
      postTitle: "My cat Lost",
      postContent: "คาดว่าตอนนี้น่าจะไปอยู่โลกเวทมนตร์",
      postDate: null,
      accountId: 3,
      postType: "Lost",
      postImageLink: "https://preview.redd.it/what-kind-of-cat-is-crookshanks-v0-8x4srkfs7gdc1.jpeg?auto=webp&s=9c054261b185132b6d29f0f37025dab8ff06a115",
      postStatus: null,
      isDeleted: false,
      pets: [],
    },
    email: "ira@gmail.com",
    phoneNumber: "0123456789",
  },
  {
    postData: {
      postId: 102,
      postTitle: "เจอแมวส้มครับ",
      postContent: "umm",
      postDate: new Date("2024-10-23T15:52:39.793+00:00"),
      accountId: 2,
      postType: "Found",
      postImageLink: null,
      postStatus: null,
      isDeleted: false,
      pets: [
        {
          petId: 999,
          petName: "Orange",
          petType: "cat",
          breed: "white-black",
          birthDate: null,
          gender: "m",
          isAdopted: false,
          detail: "silly cat",
          lastLat: 16.1,
          lastLng: 100.4,
          isLost: true,
          isDeceased: false,
          lastPicLink: "https://www.catster.com/wp-content/uploads/2023/12/a-persian-cat-sitting-on-a-table-by-the-window_Sergey-Nemirovsky_Shutterstock.jpg",
          isDeleted: false,

        }
      ],
    },
    email: "example@example.com",
    phoneNumber: "0123456789",
  },
  {
    postData: {
      postId: 21,
      postTitle: "Help me",
      postContent: "Omaygot",
      postDate: new Date("2024-10-23T15:23:19.470+00:00"),
      accountId: 2,
      postType: "Lost",
      postImageLink: "https://www.catster.com/wp-content/uploads/2023/12/a-persian-cat-sitting-on-a-table-by-the-window_Sergey-Nemirovsky_Shutterstock.jpg",
      postStatus: null,
      isDeleted: false,
      pets: [],
    },
    email: "example@example.com",
    phoneNumber: "0123456789",
  },
  {
    postData: {
      postId: 20,
      postTitle: "My dog lost",
      postContent: "ss",
      postDate: new Date("2024-10-23T14:40:38.816+00:00"),
      accountId: 2,
      postType: "Lost",
      postImageLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRwvb0LbRpkFDIGgHKi6AzarE36qdQa_FlIQ&s",
      postStatus: null,
      isDeleted: false,
      pets: [
        {
          petId: 888,
          petName: "cutecow",
          petType: "cat",
          breed: "white-black",
          birthDate: null,
          gender: "m",
          isAdopted: false,
          detail: "silly cat",
          lastLat: 16.1,
          lastLng: 100.4,
          isLost: true,
          isDeceased: false,
          lastPicLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjbOZtC3YCPMpmsObWK-saop-V7iOcLA4Qrg&s",
          isDeleted: false,
        },
        {
          petId: 999,
          petName: "cutecat",
          petType: "cat",
          breed: "white-black",
          birthDate: null,
          gender: "m",
          isAdopted: false,
          detail: "silly cat",
          lastLat: 16.1,
          lastLng: 100.4,
          isLost: true,
          isDeceased: false,
          lastPicLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjbOZtC3YCPMpmsObWK-saop-V7iOcLA4Qrg&s",
          isDeleted: false,

        }
      ],
    },
    email: "example@example.com",
    phoneNumber: "0123456789",
  },
];


export default function PostManager({}: Props) {
    const [posts, setPosts] = useState<IPost[]>([])
  const [beginFetchIdx, setBeginFetchIdx] = useState<number>(0)
  const [isOnlyMyPosts, setisOnlyMyPosts] = useState<boolean>(false);
  const [includedPet, setIncludedPet] = useState<IPet[]>([])

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['repoData', beginFetchIdx],
    queryFn: () => getPosts20(beginFetchIdx),
    // keepPreviousData: true,
  })
  // const data = mockPost;
  // const isLoading = false;
  // const isError = false;
  // const error = null;

  const loadMorePosts = () => {
    
    setBeginFetchIdx(beginFetchIdx)
  }

  useEffect(() => {
    console.log('Fetched posts:', posts);
    if (isError) {
      console.error('Error fetching posts:', error);
      alert(error);
    }
    if (data && !isError) {
      setPosts((prevPosts) => [...prevPosts, ...data]);
    }
    console.log('Updated posts:', posts);
  }, [data, isError, error]);

//   if (error) console.log(error)
  
  return (
    <section className='flex flex-col gap-4'>
         <h1 className="logo-font text-8xl text-center m-4">LostnFoundPet</h1>
        <PostCreator authorizedAccountId = {authorizedAccountId}/>
        <div className = " w-full flex flex-row gap-4 center justify-center">
          <Button variant="outlined">All post</Button>
          <Button variant="outlined">My Post Only</Button>
        </div>
        <p></p>
        
        {
            
           posts.length < 1 && posts ? <p>Loading... posts</p> :
            !isOnlyMyPosts ? (
              posts.map((post, idx) => (
                <Post key={idx} post={post} authorizedAccountId = {authorizedAccountId}/>
              ))
            ) : (
              posts.filter((post) => post.postData.accountId === authorizedAccountId).map((post) => (
                <Post key={post.postData.postId} post={post} authorizedAccountId = {authorizedAccountId}/>
              ))
            )
            
        }
        <button onClick={ () => loadMorePosts()}>Load More Posts</button>
    </section>
  )
}