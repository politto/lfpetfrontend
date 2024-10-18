import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IPost } from '@/types/IPost';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { uploadImage } from '@/api/ImageUploaderApi';
import { Button } from '@mui/material';


type Props = {
  authorizedAccountId: number
}

export default function PostCreator({authorizedAccountId}: Props) {

  const [file, setFile] = useState<File>();
  const [queryEnabled, setQueryEnabled] = useState<boolean>(false);
  const [protoPost, setProtoPost] = useState<IPost>({
    postId: null,
    postTitle: "",
    postContent: "",
    postDate: null,
    account: authorizedAccountId,
    postType: "Lost",
    postImageLink: null,
    petParticipated: []

    
  });

  const { data: dataImgUpload, isLoading: isLoadingImgUpload, isError: isErrorImgUpload, error: errorImgUpload } = useQuery({
    queryKey: ['repoData'],
    queryFn: () => uploadImage(file!, protoPost.postTitle ? protoPost.postTitle: ""),
    enabled: queryEnabled,
    // keepPreviousData: true,
  })

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
      console.log(protoPost)
    }
  }, [dataImgUpload, isErrorImgUpload, errorImgUpload]);

   const handleUpload = async () => {
    if (file)setQueryEnabled(true);
  };
    
  return (
    <section className="border border-black border-[2px] rounded-xl flex flex-col gap-4 p-5">
      <h1 className="text-2xl font-bold">Create new post</h1>
      <div className = "flex flex-row items-center">
        <p>Post type</p>
        <FormControl sx={{ p: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Pet type</InputLabel>
        
        
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={protoPost.postType!}
            label="post type"
            onChange={(event: SelectChangeEvent) => {
              setProtoPost({...protoPost, postType: event.target.value });
            }}
            className='h-[40px] w-full'
          >
          <MenuItem value="Lost" selected>Pet Loss : My pet lt lost</MenuItem>
          <MenuItem value="Found">Animal/Pet Found : Found it/them in somewhere</MenuItem>
          </Select>
        </FormControl>
        

      </div>
      
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
      <div>
        <p>Post Image</p>
        <img src={protoPost.postImageLink!} alt="Post Image" className="h-[200px] w-[200px] object-cover"/>
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
      <div className="flex flex-row gap-4">
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

/*
for pet creator
<FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Pet type</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={protoPost.postType!}
          label="post type"
          onChange={(event: SelectChangeEvent) => {
            setProtoPost({...protoPost, postType: event.target.value });
          }}
          className='h-[40px]'
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Cat">Cat</MenuItem>
          <MenuItem value="Dog">Dog</MenuItem>
          <MenuItem value="Rabbit">Rabbit</MenuItem>
          <MenuItem value="Squirrel">Squirrel</MenuItem>
          <MenuItem value="Cat">Cat</MenuItem>
          </Select>
        </FormControl>
        */