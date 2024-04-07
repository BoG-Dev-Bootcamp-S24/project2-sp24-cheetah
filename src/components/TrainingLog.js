import React, { useState } from 'react';
import { Button, Modal, TextField, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { blue, blueGrey } from '@mui/material/colors';

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

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const theme = createTheme({
  palette: {
    ochre: {
      main: '#E3D026',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#242105',
    },
  },
});

const TrainingLog = ({ log, onEdit }) => {
  const [year, month, day] = log.date.split('-');
  return (
    <div className="flex justify-between rounded-2xl bg-slate-300 shadow-md mb-4">
      <div className="flex">
        <div className="flex flex-col align-middle justify-center text-center p-4 bg-white border mr-6 rounded-s-2xl w-28">
          <Typography variant="h2" className="text-black">{day}</Typography>
          <div className="flex flex-row align-middle justify-center text-center mx-2">
            <Typography variant="body1" className="text-black mx-1">{monthNames[parseInt(month, 10) - 1]}</Typography>
            <Typography variant="body1" className="text-black mr-1">{year}</Typography>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row py-2">
            <Typography variant="h6" className="text-black font-bold">{log.title}</Typography>
            <p className="flex text-gray-500 align-text-bottom mt-1 ml-2">- {log.hoursLogged} hours</p>
          </div>
          <div className="flex flex-row">
            <p className="flex text-gray-500">{log.userName }</p>
            <p className="flex text-gray-500 ml-1">- {log.breed}</p>
            <p className="flex text-gray-500 ml-1">- {log.animalName}</p>
          </div>
          <p className="flex text-black my-2">Description: {log.description}</p>
        </div>
      </div>
      <div className="flex align-middle justify-end">
        <Button onClick={onEdit} variant="contained" color="primary" className="flex m-8 rounded-full">
          Edit
        </Button>
      </div>
    </div>
  );
};

const TrainingLogList = ({ logs, onEdit }) => (
  <div className="space-y-4 bg-zinc-400">
    {logs.map(log => (
      <TrainingLog key={log.id} log={log} onEdit={() => onEdit(log)} />
    ))}
  </div>
);

const TrainingLogForm = ({ open, handleClose, log }) => {
  const [title, setTitle] = useState(log ? log.title : '');
  const [description, setDescription] = useState(log ? log.description : '');
  const [hoursLogged, setHoursLogged] = useState(log ? log.hoursLogged : '');
  const [animalId, setAnimalId] = useState(log ? log.animalId : '');
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
        color: 'blue',
      }}
    >
      <div style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, height: 450, width: 800 }}>
        <Typography variant="h5" gutterBottom color={'black'}>{log ? 'Edit Training Log' : 'Create Training Log'}</Typography>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="mb-4" />
          <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} multiline className="mb-4" />
          <TextField type="number" label="Hours Logged" value={hoursLogged} onChange={(e) => setHoursLogged(e.target.value)} className="mb-4" />
          <TextField label="Animal ID" value={animalId} onChange={(e) => setAnimalId(e.target.value)} className="mb-4" />
          <Button type="submit" variant="contained" className="mt-4" backgroundColor={blueGrey}>
            {log ? 'Update' : 'Submit'}
          </Button>
        </form>
      </div>
    </Modal>
  );
};

const TrainingPage = () => {
  const [open, setOpen] = useState(false);
  const [editingLog, setEditingLog] = useState(null);

  const handleEdit = (log) => {
    setEditingLog(log);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingLog(null);
  };

  return (
    <div className="flex-col container mx-auto p-4 bg-zinc-400">
      <div className="flex justify-between bg-zinc-400">
        <Typography variant="h4" className="text-black" gutterBottom>Training Logs</Typography>
        <Button onClick={() => setOpen(true)} variant="contained" color="primary" className="float-right mb-4">
          Add Training Log
        </Button>
      </div>
      <div className="flex-col bg-zinc-400">
        <TrainingLogForm open={open} handleClose={handleClose} log={editingLog} />
        <TrainingLogList logs={trainingLogs} onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default TrainingPage;
