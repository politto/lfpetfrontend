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

type Props = {}

//must be from authentication instead
const authorizedAccountId = 1;


export default function PostManager({}: Props) {
    const [posts, setPosts] = useState<IPost[]>([])
  const [beginFetchIdx, setBeginFetchIdx] = useState<number>(0)
  const [isOnlyMyPosts, setisOnlyMyPosts] = useState<boolean>(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['repoData', beginFetchIdx],
    queryFn: () => getPosts20(beginFetchIdx),
    // keepPreviousData: true,
  })

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
         <h1 className="logo-font text-8xl text-center m-4">LostFoundPet</h1>
        <PostCreator authorizedAccountId = {authorizedAccountId}/>
        <div className = " w-full flex flex-row gap-4 center justify-center">
          <Button variant="outlined">All post</Button>
          <Button variant="outlined">My Post Only</Button>
        </div>
        <p></p>
        { data && data.length > 0 &&
            
            data?.length === 0 ? <p>Loading... posts</p> :
            !isOnlyMyPosts ? (
              posts.map((post) => (
                <Post key={post.postId} post={post} authorizedAccountId = {authorizedAccountId}/>
              ))
            ) : (
              posts.filter((post) => post.account === authorizedAccountId).map((post) => (
                <Post key={post.postId} post={post} authorizedAccountId = {authorizedAccountId}/>
              ))
            )
            
        }
        <button onClick={ () => loadMorePosts()}>Load More Posts</button>
    </section>
  )
}