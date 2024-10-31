import { uploadImage } from '@/api/ImageUploaderApi';
import { IPet } from '@/types/IPet';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import PetItem from './PetItem';

type Props = {
  includedPet: IPet[],
  setIncludedPet: (pet: IPet[]) => void,
  lat: number,
  lng: number

}
//continue implement this
const PetManager = ({includedPet, setIncludedPet, lat, lng}: Props) => {
    const [file, setFile] = useState<File>();
    const [queryEnabled, setQueryEnabled] = useState<boolean>(false);
    const [foundPet, setFoundPet] = useState<IPet>({
      petId: null,
      petName: "",
      petType: "",
      breed: "",
      birthDate: null,
      gender: "",
      isAdopted: false,
      detail: "",
      lastLat: -1,
      lastLng: -1,
      isLost: false,
      // ownerHistList: PetOwnershipEntity[],
      isDeceased: false,
      lastPicLink: "",
      isDeleted: false,
    })
    const [deleteImageQueryEnabled, setDeleteImageQueryEnabled] = useState<boolean>(false);

    const { data: dataImgUpload, isLoading: isLoadingImgUpload, isError: isErrorImgUpload, error: errorImgUpload } = useQuery({
      queryKey: ['petimg', includedPet.length],
      queryFn: () => {
        setQueryEnabled(false)
        return uploadImage(file!, foundPet.petName ? foundPet.petName: "")
      },
      enabled: queryEnabled,
      // keepPreviousData: true,
    })

    const {data: dataImagedelete, isLoading: isLoadingImageDelete, isError: isErrorImageDelete, error: errorImageDelete} = useQuery({
      queryKey: ['imagerepoDelete', file],
      queryFn: () => deleteImage(includedPet[includedPet.length]!.lastPicLink!),
      enabled: deleteImageQueryEnabled,
    })
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      setFile(file);
      
    };

    const clearAllFoundPetAdderProperties = () => {
      setFoundPet({
        petId: null,
        petName: "",
        petType: "",
        breed: "",
        birthDate: null,
        gender: "",
        isAdopted: false,
        detail: "",
        lastLat: -1,
        lastLng: -1,
        isLost: false,
        // ownerHistList: PetOwnershipEntity[],
        isDeceased: false,
        lastPicLink: "",
        isDeleted: false,
      })

      setFile(undefined)
    }
    const handleUpload = async () => {
      console.log(file)
      if (file)setQueryEnabled(true);
    };

    const handleDeletePet = (index: number) => {
      setIncludedPet(includedPet.filter((_, i) => i !== index));
    };

    //handle add pet and do some input validation
    const handleAddPet = () => {
      if (foundPet.petName === "" || foundPet.petType === "" || foundPet.breed === ""  || foundPet.gender === "" || foundPet.detail === "") {
        alert("Please fill in all the required fields")
        return
      }

      if (foundPet.lastPicLink === "") {
        alert("Please upload a pet image")
        return
      }

      setIncludedPet([...includedPet, foundPet])
      clearAllFoundPetAdderProperties()
    }
  
    useEffect(() => {
      if (isErrorImgUpload) {
        console.error('Error fetching posts:', errorImgUpload);
        alert(errorImgUpload);
      }
      if (dataImgUpload && !isErrorImgUpload) {
        setFoundPet({...foundPet, lastPicLink: dataImgUpload });
        console.log(foundPet)
      }
    }, [dataImgUpload, isErrorImgUpload, errorImgUpload]);
        
    return (
        
      <>
      <div className = "flex flex-row overflow-x-scroll gap-2">
      {
        includedPet.map((pet, index) => (
          <PetItem key={pet.petId} pet={pet} onDelete={() => handleDeletePet(index)} viewOnly={false}/>
        ))
      }
      </div>
      <div className="flex flex-col gap-2 rounded-tl-xl rounded-tr-xl bg-red-200 bg-opacity-20 p-2">
        <div className="flex flex-col md:flex-row gap-2 items-center">
        <div className = "rounded bg-gray-100 bg-opacity-30 p-2 border-box">
          <div className="justify-center m-auto ">
          {
        foundPet.lastPicLink ? (
          <>
          <p>Pet Image</p>
          <img src={foundPet.lastPicLink!} alt="Post Image" className="h-[80%] max-h-[20vh] max-w-[80%] object-contain rounded-lg"/>
          </>
        ) : (
          <p>Insert Pet Image</p>
        )
          }
          </div>
          <div className="flex gap-2 flex-col justify-center align-center">

        <input type="file" name="file" required onChange={handleFileChange}/>
        
        
        <button 
            type="submit" 
            disabled={isLoadingImgUpload} 
            onClick={handleUpload}
            className={`rounded ${!foundPet.lastPicLink ? 'bg-blue-500 hover:bg-blue-300' : 'bg-red-500 hover:bg-red-300'} p-2 w-[150px]`}
            value={file?.name}
            >
              {foundPet.lastPicLink ? "delete image" : isLoadingImgUpload ? 'Uploading...' : 'Upload Image'}
            </button>
        {isErrorImgUpload && <p>Error uploading image: {errorImgUpload.message}</p>}
        {dataImgUpload && <p></p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
        <TextField
        label="Pet Name"
        value={foundPet.petName}
        onChange={(e) => setFoundPet({...foundPet, petName: e.target.value})}
        fullWidth
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Pet type</InputLabel>
          <Select
            labelId="demo-simple-select-standard"
            id="demo-simple-select-standard"
            value={foundPet.petType}
            label="pet type"
            onChange={(e) => setFoundPet({...foundPet, petType: e.target.value})}
            className='w-full flex justify-center'
          >
          <MenuItem value="Cat">Cat</MenuItem>
          <MenuItem value="Dog">Dog</MenuItem>
          <MenuItem value="Bird">Bird</MenuItem>
          <MenuItem value="Fish">Fish</MenuItem>
          <MenuItem value="Rabbit">Rabbit</MenuItem>
          <MenuItem value="Hamster">Hamster</MenuItem>
          <MenuItem value="Turtle">Turtle</MenuItem>
          <MenuItem value="Snake">Snake</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
          
          </Select>
        </FormControl>
        <TextField
        label="Breed"
        value={foundPet.breed}
        onChange={(e) => setFoundPet({...foundPet, breed: e.target.value})}
        fullWidth
        />
        <TextField
        label="Birth Date"
        type="date"
        value={foundPet.birthDate?.toISOString().slice(0, 10)}
        onChange={(e) => setFoundPet({...foundPet, birthDate: new Date(e.target.value)})}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Pet gender</InputLabel>
          <Select
            labelId="demo-simple-select-standard"
            id="demo-simple-select-standard"
            value={foundPet.gender}
            label="post type"
            placeholder='gender'
            onChange={(e) => setFoundPet({...foundPet, gender: e.target.value})}
            className='w-full flex justify-center'
          >
          <MenuItem value="Male" selected>Male</MenuItem>
          <MenuItem value="Female">female</MenuItem>
          </Select>
        </FormControl>
        <TextField
        label="Pet detail"
        value={foundPet.detail}
        onChange={(e) => setFoundPet({...foundPet, detail: e.target.value})}
        fullWidth
        multiline
        className="col-span-2"
        />
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-end">
          {/* button that add foundPet to includedPet */}
          <Button 
          variant="contained" 
          onClick={() => {
            handleAddPet()
          }}
          sx={{ backgroundColor: 'lime', color: 'black', width: '200px' }}
          >Add Pet</Button>
          <Button 
          variant="contained" 
          onClick={clearAllFoundPetAdderProperties}
          sx={{ backgroundColor: 'yellow', color: 'black', width: '200px' }}
          >Clear Pet Properties</Button>
        </div>
        
      </div>
      </>
    );
}

export default PetManager;

function deleteImage(arg0: any): any {
  throw new Error('Function not implemented.');
}
