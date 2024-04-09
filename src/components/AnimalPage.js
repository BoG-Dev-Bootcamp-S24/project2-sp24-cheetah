import React from 'react';
import { Button, Typography } from '@mui/material';
import Image from 'next/image';
import dogImage from "../../public/images/golden_retriever_image.jpg"

const animals = [
    {
      owner: 'Long Lam',
      profilePicture: 'dog1.jpg',
      name: 'Max',
      breed: 'Golden Retriever',
      hoursTrained: 20,
      birthday: new Date('2019-05-15'),
      note: 'Friendly and energetic'
    },
    {
      owner: 'Long Lam',
      profilePicture: 'dog2.jpg',
      name: 'Buddy',
      breed: 'Labrador Retriever',
      hoursTrained: 15,
      birthday: new Date('2020-02-20'),
      note: 'Loves to play fetch'
    },
    {
      owner: 'Long Lam',
      profilePicture: 'dog3.jpg',
      name: 'Charlie',
      breed: 'German Shepherd',
      hoursTrained: 25,
      birthday: new Date('2018-08-10'),
      note: 'Highly intelligent and loyal'
    }
  ];
  

const AnimalLog = ({ animal }) => (
  <div className="flex flex-col animal-card bg-white rounded-lg shadow-md w-full">
    <div className="flex animal-image w-full justify-center">
      <Image src={dogImage} alt={animal.name} width={300} height={200}/>
    </div>
    <div className="animal-info flex flex-row p-4 align-middle justify-start">
      <div className="circle mt-2 bg-gray-400 text-white flex align-middle justify-center items-center rounded-full w-10 h-10 text-lg font-semibold">{animal.name[0]}</div>
        <div className="flex flex-col ml-4">
            <Typography variant="h6" className="animal-name font-bold mb-1">{animal.name + " - " + animal.breed}</Typography>
            <div className="flex flex-row">
                <p className="animal-owner text-gray-500">{animal.owner}</p>
                <p className="animal-training-time text-gray-500 ml-1">- Trained: {animal.hoursTrained} hours</p>
            </div>
        </div>
    </div>
  </div>
);

const AnimalLogList = ({ animals }) => (
  <div className="animal-log-list grid grid-cols-1 md:grid-cols-3 gap-4">
    {animals.map(animal => (
      <AnimalLog key={animal.id} animal={animal} className="flex w-1/3"/>
    ))}
  </div>
);

const AnimalPage = () => (
  <div className="animal-page p-4">
    <div className="animal-page-header flex justify-between items-center mb-4">
      <Typography variant="h4" className="animal-page-title">Animals</Typography>
      <Button variant="contained" className="bg-blue-500 hover:bg-blue-700">Create new</Button>
    </div>
    <AnimalLogList animals={animals} />
  </div>
);

export default AnimalPage;
