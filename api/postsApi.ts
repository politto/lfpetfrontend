//axios api

// import { IType1 } from "@/types/IType1";
import Post from "@/app/components/Post";
import { IPost, IPostData } from "@/types/IPost";
import axiosApi, { isAxiosError } from "@/utils/axiosApi";
import axios, { AxiosError } from "axios";


export const getPosts20 = async (index: number): Promise<IPost[]> => {
    // console.log("sdsdsdsdsd");
    try {
        const response = await axiosApi.get("/getTwentyPosts?index=" + index);
        const data = response.data;
        console.log(data);
        return data;
    } catch (error: any) {
        if (isAxiosError(error)) {
            console.error('Axios error:', error.response?.data);
            throw error.response?.data;
        }
        throw error;
    }
}

export const getPostById = async (postId: number): Promise<IPost> => {
    
    try {
        const response = await axiosApi.get("/getPostsById?postId=" + postId);
        const data = response.data;
        console.log('Fetched data:', data); 
        return data;
    } catch (error: any) {
        if (isAxiosError(error)) {
            throw error.response?.data;
        }
        throw error;
    }
}

export const getPostsByAccountId = async (accountId: number, startIndex: number): Promise<IPost[]> => {
    
    try {
        const response = await axiosApi.get("/getPostsByAccountId?accountId=" + accountId + "&startIndex=" + startIndex);
        return response.data.data;
    } catch (error: any) {
        if (isAxiosError(error)) {
            throw error.response?.data;
        }
        throw error;
    }
}

export const createPost = async (post: IPostData): Promise<IPost> => {
    
    try {
        console.log("hey post must be upload")
        console.log(post)
        const response = await axiosApi.post("/createPost", post, {
            headers: {
            'Content-Type': 'application/json'
            }
        });
        return response.data.data;
    } catch (error: any) {
        if (isAxiosError(error)) {
            throw error.response?.data;
        }
        throw error;
    }
}

export const updatePost = async (post: IPost): Promise<IPost> => {
    
    try {
        const response = await axiosApi.patch("/updatePost", post);
        return response.data.data;
    } catch (error: any) {
        if (isAxiosError(error)) {
            throw error.response?.data;
        }
        throw error;
    }
}

export const deletePost = async (postId: number): Promise<boolean> => {
    
    try {
        const response = await axiosApi.post("/deletePost?postId=" + postId);
        return response.data.data;
    } catch (error: any) {
        if (isAxiosError(error)) {
            throw error.response?.data;
        }
        throw error;
    }
}

export const sendLostPetEmail = async (postId: number): Promise<boolean> => {
    
    try {
        const response = await axiosApi.post("/sendLostPetEmail?postId=" + postId);
        return response.data.data;
    } catch (error: any) {
        if (isAxiosError(error)) {
            throw error.response?.data;
        }
        throw error;
    }
}

