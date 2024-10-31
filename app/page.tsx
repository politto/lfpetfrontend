'use client'

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

import Post from "./components/Post";
import PostCreator from "./components/PostCreator";
import { getPosts20 } from "@/api/postsApi";
import { useEffect, useState } from "react";
import { IPost } from "@/types/IPost";
import PostManager from "./components/PostManager";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Link from 'next/link'



const queryClient = new QueryClient()

export default function Home() {
  

  return (
    <QueryClientProvider client={queryClient}>
      <main className = "flex flex-col center w-[95vw] xl:w-[70vw] m-auto noto-sans">
        {/* <ReactQueryDevtools /> */}
        <PostManager />
        //
      </main>
    </QueryClientProvider>
  );
}
