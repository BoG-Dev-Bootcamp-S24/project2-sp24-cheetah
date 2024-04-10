import React, { useState } from 'react';
import { Button, Typography, Modal, TextField } from '@mui/material';
import Image from 'next/image';
import dogImage from "../../public/images/golden_retriever_image.jpg"

const animals = [
  {
    id: 1,
    owner: 'Long Lam',
    profilePicture: '/../../public/images/golden_retriever_image.jpg',
    name: 'Max',
    breed: 'Golden Retriever',
    hoursTrained: 20,
    birthday: '2019-05-15',
    note: 'Friendly and energetic'
  },
  {
    id: 2,
    owner: 'Long Lam',
    profilePicture: '/../../public/images/golden_retriever_image.jpg',
    name: 'Buddy',
    breed: 'Labrador Retriever',
    hoursTrained: 15,
    birthday: '2020-02-20',
    note: 'Loves to play fetch'
  },
  {
    id: 3,
    owner: 'Long Lam',
    profilePicture: '/../../public/images/golden_retriever_image.jpg',
    name: 'Charlie',
    breed: 'German Shepherd',
    hoursTrained: 25,
    birthday: '2018-08-10',
    note: 'Highly intelligent and loyal'
  }
];

const AnimalLog = ({ animal, onEdit }) => (
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
    <Button onClick={() => onEdit(animal)} variant="contained" className="bg-blue-500 hover:bg-blue-700 mb-4 mx-4">
      Edit
    </Button>
  </div>
);

const AnimalLogList = ({ animals, onEdit }) => (
  <div className="animal-log-list grid grid-cols-1 md:grid-cols-3 gap-4">
    {animals.map(animal => (
      <AnimalLog key={animal.id} animal={animal} onEdit={onEdit} />
    ))}
  </div>
);

const AnimalForm = ({ open, handleClose, animal }) => {
  const [owner, setOwner] = useState(animal ? animal.owner : '');
  const [name, setName] = useState(animal ? animal.name : '');
  const [breed, setBreed] = useState(animal ? animal.breed : '');
  const [hoursTrained, setHoursTrained] = useState(animal ? animal.hoursTrained : '');
  const [birthday, setBirthday] = useState(animal ? animal.birthday : '');
  const [note, setNote] = useState(animal ? animal.note : '');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (owner && name && breed && hoursTrained && birthday) {
      handleClose();
    } else {
      setError('Please fill in all fields.');
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'blue',
      }}
    >
      <div style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, height: 450, width: 800 }} className="flex-col">
        <Typography variant="h5" gutterBottom color={'black'}>{animal ? 'Edit Animal' : 'Create Animal'}</Typography>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col py-3">
          <TextField label="Owner" value={owner} onChange={(e) => setOwner(e.target.value)} className="mb-4" />
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} className="mb-4" />
          <TextField label="Breed" value={breed} onChange={(e) => setBreed(e.target.value)} className="mb-4" />
          <TextField label="Hours Trained" type="number" value={hoursTrained} onChange={(e) => setHoursTrained(e.target.value)} className="mb-4" />
          <TextField label="" type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} className="mb-4" />
          <TextField label="Note" value={note} onChange={(e) => setNote(e.target.value)} multiline className="mb-4" />
          <Button type="submit" variant="contained" className="bg-blue-500 hover:bg-blue-700 mt-4">
            {animal ? 'Update' : 'Submit'}
          </Button>
        </form>
      </div>
    </Modal>
  );
};

const AnimalPage = () => {
  const [open, setOpen] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState(null);

  const handleCreateModalOpen = () => setOpen(true);
  const handleCreateModalClose = () => setOpen(false);

  const handleEditModalOpen = (animal) => {
    setEditingAnimal(animal);
    setOpen(true);
  };

  const handleEditModalClose = () => {
    setEditingAnimal(null);
    setOpen(false);
  };

  return (
    <div className="animal-page p-4">
      <div className="animal-page-header flex justify-between items-center mb-4">
        <Typography variant="h4" className="animal-page-title">Animals</Typography>
        <Button onClick={handleCreateModalOpen} variant="contained" className="bg-blue-500 hover:bg-blue-700">Create new</Button>
      </div>
      <AnimalLogList animals={animals} onEdit={handleEditModalOpen} />
      <AnimalForm open={open} handleClose={handleCreateModalClose} animal={editingAnimal} />
    </div>
  );
};

export default AnimalPage;
