import React, { useEffect, useState } from 'react';
import { Button, Typography, Modal, TextField } from '@mui/material';
import Image from 'next/image';
import dogImage from "../../public/images/golden_retriever_image.jpg"

let animals = [
  // {
  //   id: 1,
  //   owner: 'Long Lam',
  //   profilePicture: '/../../public/images/golden_retriever_image.jpg',
  //   name: 'Max',
  //   breed: 'Golden Retriever',
  //   hoursTrained: 20,
  //   birthday: '2019-05-15',
  //   note: 'Friendly and energetic'
  // },
  // {
  //   id: 2,
  //   owner: 'Long Lam',
  //   profilePicture: '/../../public/images/golden_retriever_image.jpg',
  //   name: 'Buddy',
  //   breed: 'Labrador Retriever',
  //   hoursTrained: 15,
  //   birthday: '2020-02-20',
  //   note: 'Loves to play fetch'
  // },
  // {
  //   id: 3,
  //   owner: 'Long Lam',
  //   profilePicture: '/../../public/images/golden_retriever_image.jpg',
  //   name: 'Charlie',
  //   breed: 'German Shepherd',
  //   hoursTrained: 25,
  //   birthday: '2018-08-10',
  //   note: 'Highly intelligent and loyal'
  // }
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
          <p className="animal-owner text-gray-500">{animal.userName}</p>
          <p className="animal-training-time text-gray-500 ml-1">- Trained: {animal.hoursTrained} hours</p>
        </div>
      </div>
    </div>
    <Button onClick={() => deleteAnimal(animal._id)} variant="contained" className="bg-red-500 hover:bg-red-700 mb-4 mx-4">
        Delete
    </Button>
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

const createAnimal = async (ownerId, name, breed, hoursTrained, month, day, year, note) => {
  const date = new Date(year + "-" + month + "-" + day);
  let res = await fetch("/api/animal", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          "ownerId": ownerId,
          "name": name,
          "breed": breed,
          "hoursTrained": hoursTrained,
          "birthday": date,
          "note": note
      })
  })
  return res;
}

const deleteAnimal = async (animalId) => { 
    let res = await fetch("/api/animal", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "animalId": animalId
        })
    })
    return res;
}

const editAnimal = async (animalId, hoursTrained) => {
  let res = await fetch("/api/animal", {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          "animalId": animalId,
          "hours": hoursTrained
      })
  })
  console.log(res);
  return res;
}

const AnimalForm = ({ open, handleClose, animal }) => {
  const [name, setName] = useState(animal ? animal.name : '');
  const [breed, setBreed] = useState(animal ? animal.breed : '');
  const [hoursTrained, setHoursTrained] = useState(animal ? animal.hoursTrained : '');
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [note, setNote] = useState(animal ? animal.note : '');
  const [error, setError] = useState('');
  const [ownerId, setOwnerId] = useState("");

  useEffect(() => {
    setOwnerId(localStorage.getItem("userId"));
  }, []);

  useEffect(() => {
    if (animal !== null) {
      console.log(animals.filter((anml) => anml._id === animal._id)[0]);
      try {
        setHoursTrained(animals.filter((anml) => anml._id === animal._id)[0].hoursTrained);
      } catch (e) {
        setHoursTrained("");
      }
    } else {
      setHoursTrained("");
    }
  }, [animal])

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (animal === null) {
      if (name && breed && hoursTrained && month && day && year && note) {
        let res = await createAnimal(ownerId, name, breed, hoursTrained, month, day, year, note);
        if (res.status === 200) {
          setName("");
          setBreed("");
          setHoursTrained("");
          setMonth(1);
          setDay("");
          setYear("");
          setNote("");
          setError("");
          handleClose();
        } else {
          setError('Error creating Animal');
        }
      } else {
        setError('Please fill in all fields.');
      }
    } else {
      if (hoursTrained) {
        let res = await editAnimal(animal._id, hoursTrained);
        if (res.status === 200) {
          setName("");
          setBreed("");
          setHoursTrained("");
          setMonth(1);
          setDay("");
          setYear("");
          setNote("");
          setError("");
          handleClose();
        } else {
          setError('Error editing Animal');
        }
      } else {
        setError('Please fill in all fields.');
      }
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
      <div style={{ backgroundColor: 'white', padding: 16, borderRadius: 8}} className="flex-col">
        <Typography variant="h5" gutterBottom color={'black'}>{animal ? 'Edit Animal' : 'Create Animal'}</Typography>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col py-3">
          {!animal ? <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} style={{marginBottom:"1rem"}} /> : <></>}
          {!animal ? <TextField label="Breed" value={breed} onChange={(e) => setBreed(e.target.value)} style={{marginBottom:"1rem"}} /> : <></>}
          <TextField label="Hours Trained" type="number" value={hoursTrained} onChange={(e) => setHoursTrained(e.target.value)} style={{marginBottom:"1rem"}} />
          {!animal ? <div className="flex flex-row mb-4">
                <select style={{borderColor:"rgba(0, 0, 0, 0.23)", color:"rgba(0, 0, 0, 0.6)",
                fontFamily:"\"Roboto\",\"Helvetica\",\"Arial\",sans-serif", fontWeight:400, height:"3.5em"}}
                 label="Month" className="appearance-none mr-1 bg-[#FFFFFF] border-[1px] rounded-[4px]
                 text-current px-[14px] py-[14px]" value={month} onChange={(e) => setMonth(e.target.value)}>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <TextField type="number" label="Day" style={{marginRight:"0.25rem"}} value={day} onChange={(e) => setDay(e.target.value)} />
                <TextField type="number" label="Year" value={year} onChange={(e) => setYear(e.target.value)} />
              </div> : <></>}
          {!animal ? <TextField label="Note" value={note} onChange={(e) => setNote(e.target.value)} multiline style={{marginBottom:"1rem"}} /> : <></>}
          <Button type="submit" variant="contained" className="bg-blue-500 hover:bg-blue-700 mt-4">
            {animal ? 'Update' : 'Submit'}
          </Button>
        </form>
      </div>
    </Modal>
  );
};

const AnimalPage = (props) => {
  const [open, setOpen] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState(null);
  const [animalsLoading, setAnimalsLoading] = useState(false);
  const [ownerId, setOwnerId] = useState("");

  useEffect(() => {
    setOwnerId(localStorage.getItem("userId"));
  }, []);

  async function getAnimals() {
    setAnimalsLoading(true);
    try {
      let res = await fetch("/api/admin/animals", {
        method: "GET"
      })
      animals = await res.json();
      if (!props.adminPage) {
        animals = animals.filter((anml) => anml.ownerId === ownerId);
      }
      if (props.search !== "") {
        animals = animals.filter((anml) => anml.name.toLowerCase().includes(props.search.toLowerCase()));
      }
    } catch (e) {
      console.error(e.message);
      animals = [];
    }
    setAnimalsLoading(false);
  }

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

  useEffect(() => {
    if (ownerId !== "") {
      getAnimals();
    }
    console.log(props.search);
  }, [open, ownerId, props.search])

  return (
    <div className="animal-page p-4">
      <div className="animal-page-header flex justify-between items-center mb-4">
        <Typography variant="h4" className="animal-page-title">Animals</Typography>
        <Button onClick={handleCreateModalOpen} variant="contained" className="bg-blue-500 hover:bg-blue-700">Create new</Button>
      </div>
      {!animalsLoading ? <AnimalLogList animals={animals} onEdit={handleEditModalOpen} /> : <>Loading</>}
      <AnimalForm open={open} handleClose={handleEditModalClose} animal={editingAnimal} />
    </div>
  );
};

export default AnimalPage;
