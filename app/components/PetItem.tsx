import { IPet } from '@/types/IPet'
import { CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
  pet: IPet;
  onDelete: () => void;
  viewOnly?: boolean;
}

export default function PetItem({pet, onDelete, viewOnly}: Props) {


  return (
    <section className="flex flex-col gap-2 rounded-lg bg-gray-100 bg-opacity-30 p-2 border-box mb-2 min-w-[200px]">

      <div className="flex flex-col items-center gap-2">
        {pet.lastPicLink && (
          <CardMedia
            component="img"
            image={pet.lastPicLink}
            alt="Pet Image"
            className="h-[80%] max-h-[20vh] max-w-[50%] object-contain rounded-lg"
          />
        )}
        <CardContent>
            <Typography variant="h6" component="div" className="text-xl">
            <strong>Name:</strong> {pet.petName}
            </Typography>
            <Typography variant="body2" color="text.secondary" className="text-xl">
            <strong>Type:</strong> {pet.petType}
            </Typography>
            <Typography variant="body2" color="text.secondary" className="text-xl">
            <strong>Breed:</strong> {pet.breed}
            </Typography>
            <Typography variant="body2" color="text.secondary" className="text-xl">
            <strong>Birth Date:</strong> {pet.birthDate ? pet.birthDate.toDateString() : 'N/A'}
            </Typography>
            <Typography variant="body2" color="text.secondary" className="text-xl">
            <strong>Gender:</strong> {pet.gender}
            </Typography>
            <Typography variant="body2" color="text.secondary" className="text-xl">
            <strong>Detail:</strong> {pet.detail}
            </Typography>
        </CardContent>
        {
          !viewOnly && (
            <IconButton onClick={onDelete} aria-label="delete">
              <DeleteIcon />
              <p>delete</p>
            </IconButton>
          )
        }
      
      </div>
      
    </section>
  )
}