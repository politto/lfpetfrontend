import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IPost, IPostData } from '@/types/IPost';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { uploadImage } from '@/api/ImageUploaderApi';
import { Button } from '@mui/material';
import MapMarker from './MapMarker';
import Petmanager from './PetManager';
import PetManager from './PetManager';
import { IPet } from '@/types/IPet';
import { createPost } from '@/api/postsApi';


type Props = {
  authorizedAccountId: number
}

export default function PostCreator({authorizedAccountId}: Props) {

  const [file, setFile] = useState<File>();
  const [queryEnabled, setQueryEnabled] = useState<boolean>(false);
  const [protoPost, setProtoPost] = useState<IPostData>({
    postId: null,
    postTitle: "",
    postContent: "",
    postDate: null,
    accountId: authorizedAccountId,
    postType: "Lost",
    postImageLink: null,
    petParticipated: []

    
  });
  const [lastLat, setLastLat] = useState<number>(13.74)
  const [lastLng, setLastLng] = useState<number>(100.71)

  const { data: dataImgUpload, isLoading: isLoadingImgUpload, isError: isErrorImgUpload, error: errorImgUpload } = useQuery({
    queryKey: ['repoData'],
    queryFn: () => uploadImage(file!, protoPost.postTitle ? protoPost.postTitle: ""),
    enabled: queryEnabled,
    // keepPreviousData: true,
  })

  const { data: dataPostUpload, isLoading: isLoadingPostUpload, isError: isErrorPostUpload, error: errorPostUpload } = useQuery({
    queryKey: ['postUpload'],
    queryFn: () => createPost(
      protoPost
    ),
    enabled: queryEnabled,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFile(file);
    
  };



  useEffect(() => {
    if (isErrorImgUpload) {
      console.error('Error fetching posts:', errorImgUpload);
      alert(errorImgUpload);
    }
    if (dataImgUpload && !isErrorImgUpload) {
      setProtoPost({...protoPost, postImageLink: dataImgUpload });
      console.log(protoPost.postImageLink)
    }
  }, [dataImgUpload, isErrorImgUpload, errorImgUpload]);

  useEffect(() => {
    if (dataPostUpload) {
      alert("post created")
    }
    return () => {
      
    };
  }, []);

   const handleUpload = async () => {
    if (file)setQueryEnabled(true);
  };
    
  return (
    <section className={`border-[4px] rounded-xl flex flex-col gap-4 p-5 [&>*]:flex [&>*]:gap-2
    ${protoPost.postType === 'Lost' ? 
    'bg-gradient-to-b from-green-200 to-yellow-200 border-yellow-500'
     : 'bg-gradient-to-b from-green-200 to-red-200 '}`}>
      <h1 className="text-3xl font-bold m-5 text-center">Create new post</h1>
      <div className = "flex flex-row-important items-center">
        <p>Post type</p>
        <FormControl sx={{ p: 1, minWidth: 120 }}>
          {/* <InputLabel id="demo-simple-select-standard-label">Pet type</InputLabel> */}
        
        
          <Select
            labelId="demo-simple-select-standard"
            id="demo-simple-select-standard"
            value={protoPost.postType!}
            label="post type"
            onChange={(event: SelectChangeEvent) => {
              setProtoPost({...protoPost, postType: event.target.value });
            }}
            className='h-[40px] w-full'
          >
          <MenuItem value="Lost" selected>Pet Loss</MenuItem>
          <MenuItem value="Found">Animal/Pet Found</MenuItem>
          </Select>
        </FormControl>
        

      </div>
      <hr></hr>

      <div className = "flex-col">
        <p className = "text-2xl mt-4 mb-2"> Add overview information for post</p>
        <div className = "flex flex-row items-center gap-1">
          
          <p className="min-w-[5em]">Post title</p>
          <TextField 
          id="outlined-basic" 
          label="Title" 
          variant="outlined"  
          className='w-full'/>
        </div>
        <div className = "flex flex-col gap-1">
          <p>Detail</p>
          <TextField
              id="outlined-textarea"
              placeholder="Placeholder"
              multiline
              className = "w-full"
              value={protoPost.postContent}
              onChange={(event) => {
                setProtoPost({...protoPost, postContent: event.target.value });
              }}
              error = {protoPost.postContent?.length! > 255}
              helperText = {protoPost.postContent?.length! > 255? "Text must not longer than 255 alplabets": ""}

            />

        
        </div>
        <div className = "justify-center m-auto">
          {
            protoPost.postImageLink ? (
              <>
              <p>Post Image</p>
              <img src={protoPost.postImageLink!} alt="Post Image" className="h-[80%] max-h-[40vh] max-w-[80vw] object-contain rounded-lg"/>
              </>
            ) : (
              <p>Insert Image</p>
            )
          }
        </div>
        <div>
          
          <input type="file" name="file" required onChange={handleFileChange}/>
          {/* <input type="text" name="displayName" placeholder="Display Name" required /> */}
          <Button variant="outlined" type="submit" disabled={isLoadingImgUpload} onClick={handleUpload}>
              {isLoadingImgUpload ? 'Uploading...' : 'Upload Image'}
          </Button>
          {isErrorImgUpload && <p>Error uploading image: {errorImgUpload.message}</p>}
          {dataImgUpload && <p>Image uploaded successfully!</p>}

        </div>
        <div className = "h-[40vh]">
          
          <p className = "text-2xl mt-4 mb-2"> Add Last Location of your pets in this post</p>
          <p>Drag this pin to last known location</p>
            <MapMarker draggable={true} lat={lastLat} lng={lastLng} setLat={setLastLat} setLng={setLastLng}/>
          </div>
      </div>

      <hr/>

      <div className = "flex-col">
        <p className = "text-2xl mt-4 mb-2"> Add pets</p>
        <PetManager 
        includedPet={protoPost.petParticipated} 
        setIncludedPet={(newPets : IPet[]) => setProtoPost({...protoPost, petParticipated: newPets})}
        lat={lastLat} lng={lastLng}/>

      </div>

      
      
      <div className="flex flex-row gap-4">
        {isLoadingImgUpload}dfd
        <Button variant="outlined" type="submit" disabled={isLoadingImgUpload} onClick={handleUpload} className = "text-2xl w-full">
            post
        </Button>
        <Button variant="outlined" type="submit" disabled={isLoadingImgUpload} onClick={handleUpload} className = "text-2xl w-full">
            cancle
        </Button>
      </div>

      {/* To be continued with actually posting to db */}

    </section>
  )
}