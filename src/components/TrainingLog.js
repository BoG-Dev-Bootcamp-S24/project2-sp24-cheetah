import React, { useState } from 'react';
import { Button, Modal, TextField, Typography } from '@mui/material';


const trainingLogs = [
  {
    id: 1,
    title: 'Basic Obedience Training',
    date: '2024-03-25',
    userName: 'John Doe',
    animalName: 'Max',
    breed: 'Labrador Retriever',
    hoursLogged: 2,
    description: 'Worked on sit, stay, and come commands.'
  },
  {
    id: 2,
    title: 'Agility Training',
    date: '2024-03-24',
    userName: 'Jane Smith',
    animalName: 'Buddy',
    breed: 'Border Collie',
    hoursLogged: 1.5,
    description: 'Practiced navigating through agility obstacles.'
  }
];


const TrainingLog = ({ log, onEdit }) => (
  <div className="flex justify-between rounded-2xl bg-slate-300 shadow-md p-4 mb-4">
  <div className="flex">
    <div className="flex align-middle justify-center mx-5">
        <p className="flex text-black">Date: {log.date}</p>
    </div>
    <div className="flex flex-col align-top">
        <Typography variant="flex h1 text-black">{log.title}</Typography>
        <p className="flex text-black">User: {log.userName}</p>
        <p className="flex text-black">Animal: {log.animalName}</p>
        <p className="flex text-black">Breed: {log.breed}</p>
        <p className="flex text-black">Hours Logged: {log.hoursLogged}</p>
        <p className="flex text-black">Description: {log.description}</p>
    </div>
  </div>
    <div className="flex align-middle justify-end">
        <Button onClick={onEdit} variant="contained" color="primary" className="flex mt-2 rounded-full">
        Edit
        </Button>
    </div>
  </div>
);

const TrainingLogList = ({ logs, onEdit }) => (
  <div className="space-y-4 bg-zinc-400">
    {logs.map(log => (
      <TrainingLog key={log.id} log={log} onEdit={() => onEdit(log.id)} />
    ))}
  </div>
);

const TrainingLogForm = ({ open, handleClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hoursLogged, setHoursLogged] = useState('');
  const [animalId, setAnimalId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title && description && hoursLogged && animalId) {

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
        color: 'blue'
      }}
    >
      <div style={{ backgroundColor: 'grey', padding: 16, borderRadius: 8 }}>
      <Typography variant="h5" gutterBottom>Create Training Log</Typography>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col">
              <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="mb-4" />
              <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} multiline className="mb-4" />
              <TextField type="number" label="Hours Logged" value={hoursLogged} onChange={(e) => setHoursLogged(e.target.value)} className="mb-4" />
              <TextField label="Animal ID" value={animalId} onChange={(e) => setAnimalId(e.target.value)} className="mb-4" />
              <Button type="submit" variant="contained" color="primary" className="mt-4">
                Submit
              </Button>
            </form>
      </div>
    </Modal>
  );
};

const TrainingPage = () => {
  const [open, setOpen] = useState(false);
  const [editingLogId, setEditingLogId] = useState(null);

  const handleEdit = (logId) => {
    setEditingLogId(logId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingLogId(null);
  };

  return (
    <div className="flex-col container mx-auto p-4 bg-zinc-400">
        <div className="flex justify-between bg-zinc-400">
            <Typography variant="h1 text-black" gutterBottom>Training Logs</Typography>
            <Button onClick={() => setOpen(true)} variant="contained" color="primary" className="float-right mb-4">
                Add Training Log
            </Button>
        </div>
        <div className="flex-col bg-zinc-400">
            <TrainingLogForm open={open} handleClose={handleClose} />
            <TrainingLogList logs={trainingLogs} onEdit={handleEdit} />
        </div>
    </div>
  );
};

export default TrainingPage;
