import React, { useState, useEffect } from 'react';
import { Button, Modal, TextField, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { blue, blueGrey } from '@mui/material/colors';

let trainingLogs = [
  // {
  //   id: 1,
  //   title: 'Basic Obedience Training',
  //   date: '2024-03-25',
  //   userName: 'John Doe',
  //   animalName: 'Max',
  //   breed: 'Labrador Retriever',
  //   hoursLogged: 2,
  //   description: 'Worked on sit, stay, and come commands.'
  // },
  // {
  //   id: 2,
  //   title: 'Agility Training',
  //   date: '2024-03-24',
  //   userName: 'Jane Smith',
  //   animalName: 'Buddy',
  //   breed: 'Border Collie',
  //   hoursLogged: 1.5,
  //   description: 'Practiced navigating through agility obstacles.'
  // }
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

const TrainingLog = ({ log, onEdit, adminPage }) => {
  const [year, month, day] = log.date.split('-');
  return (
    <div className="flex justify-between rounded-2xl bg-slate-300 shadow-md mb-2">
      <div className="flex">
        <div className="flex flex-col align-middle justify-center text-center p-4 bg-blue-500 border mr-6 rounded-s-2xl w-28">
          <Typography variant="h2" className="text-black">{day.substring(0, 2)}</Typography>
          <div className="flex flex-row align-middle justify-center text-center mx-2">
            <Typography variant="body1" className="text-black">{monthNames[parseInt(month, 10) - 1].substring(0, 3)}</Typography>
            <Typography style={{marginLeft: "0.2rem", marginRight: "0.2rem"}} variant="body1" className="text-black">{"-"}</Typography>
            <Typography variant="body1" className="text-black">{year}</Typography>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row py-2">
            <Typography variant="h6" className="text-black font-bold">{log.title}</Typography>
            <p className="flex text-gray-500 align-text-bottom mt-1 ml-2">- {log.hours} {log.hours != 1 ? "hours" : "hour"}</p>
          </div>
          <div className="flex flex-row">
            <p className="flex text-gray-500">{log.userName }</p>
            <p className="flex text-gray-500 ml-1">- {log.breed}</p>
            <p className="flex text-gray-500 ml-1">- {log.animalName}</p>
          </div>
          <p className="flex text-black my-2">Description: {log.note}</p>
        </div>
      </div>
      <div className="flex align-middle justify-end">
        {!adminPage ? <Button onClick={onEdit} variant="contained" className="bg-blue-500 hover:bg-blue-700 flex m-8 rounded-full">
          Edit
        </Button> : <></>}
      </div>
    </div>
  );
};

const TrainingLogList = ({ logs, onEdit, adminPage }) => (
  <div className="space-y-4 bg-zinc-400">
    {logs.map(log => (
      <TrainingLog key={log._id} log={log} adminPage={adminPage} onEdit={() => onEdit(log._id)} />
    ))}
  </div>
);

const createLog = async (userId, title, description, hoursLogged, animalId, month, day, year) => {
  const date = new Date(year + "-" + month + "-" + day);
  let res = await fetch("/api/training", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          "userId": userId,
          "title": title,
          "animalId": animalId,
          "hours": hoursLogged,
          "date": date,
          "note": description
      })
  })
  return res;
}

const editLog = async (trainingLogId, description, hoursLogged) => {
  let res = await fetch("/api/training", {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          "trainingLogId": trainingLogId,
          "hours": hoursLogged,
          "note": description
      })
  })
  console.log(res);
  return res;
}

const TrainingLogForm = ({ open, handleClose, editingLogId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hoursLogged, setHoursLogged] = useState('')
  const [animalId, setAnimalId] = useState('');
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');
  const [animalsOptions, setAnimalsOptions] = useState(null);
  const [animalsLoading, setAnimalsLoading] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);

  async function getAnimals() {
    setAnimalsLoading(true);
    try {
      let res = await fetch("/api/admin/animals", {
        method: "GET"
      })
      let temp = await res.json(); //map to an html element and put into drop down
      const options = temp.filter((animal) => animal.ownerId === userId)
        .map ((animal) => (
        <option key={animal._id} value={animal._id}>{animal.name} - {animal.breed}</option>
      ))
      console.log(temp);
      setAnimalId(temp[0]._id);
      setAnimalsOptions(options);
    } catch (e) {
      console.error(e.message);
      setAnimalsOptions(null)
    }
    setAnimalsLoading(false);
  }

  useEffect(() => {
    getAnimals();
  }, [])

  useEffect(() => {
    if (editingLogId !== null) {
      setHoursLogged(trainingLogs.filter((log) => log._id === editingLogId)[0].hours);
      setDescription(trainingLogs.filter((log) => log._id === editingLogId)[0].note);
    }
 }, [editingLogId])

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (editingLogId === null) {
      if (title && description && hoursLogged && animalId && month && day && year) {
        let res = await createLog(userId, title, description, hoursLogged, animalId, month, day, year);
        if (res.status === 200) {
          setTitle("");
          setDescription("");
          setHoursLogged("");
          setAnimalId("");
          setMonth(1);
          setDay("");
          setYear("");
          setError("");
          handleClose();
        } else {
          setError('Error creating Training Log');
        }
      } else {
        setError('Please fill in all fields.');
      }
    } else {
      if (description && hoursLogged) {
        let res = await editLog(editingLogId, description, hoursLogged);
        if (res.status === 200) {
          setTitle("");
          setDescription("");
          setHoursLogged("");
          setAnimalId("");
          setMonth(1);
          setDay("");
          setYear("");
          setError("");
          handleClose();
        } else {
          setError('Error editing Training Log');
        }
      } else {
        setError('Please fill in all fields.');
      }
    }
  }
  

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
              {editingLogId !== null ? <></> : <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{marginBottom:"1rem"}} />}
              {editingLogId !== null ? <></> : 
                <select style={{borderColor:"rgba(0, 0, 0, 0.23)", color:"rgba(0, 0, 0, 0.6)",
                fontFamily:"\"Roboto\",\"Helvetica\",\"Arial\",sans-serif", fontWeight:400, height:"3.5em"}}
                label="Month" className="appearance-none mr-1 mb-4 bg-[#808080] border-[1px] rounded-[4px]
                text-current px-[14px] py-[14px]" value={animalId} onChange={(e) => setAnimalId(e.target.value)}>
                  {animalsLoading ? <option value={null}>Loading</option> : animalsOptions}
                </select>}
              <TextField type="number" label="Hours Logged" value={hoursLogged} onChange={(e) => setHoursLogged(e.target.value)} style={{marginBottom:"1rem"}} />
              {editingLogId !== null ? <></> : <div className="flex flex-row mb-4">
                <select style={{borderColor:"rgba(0, 0, 0, 0.23)", color:"rgba(0, 0, 0, 0.6)",
                fontFamily:"\"Roboto\",\"Helvetica\",\"Arial\",sans-serif", fontWeight:400, height:"3.5em"}}
                 label="Month" className="appearance-none mr-1 bg-[#808080] border-[1px] rounded-[4px]
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
              </div>}
              <TextField label="Description" style={{marginBottom:"1rem"}} value={description} onChange={(e) => setDescription(e.target.value)} multiline />
              <Button type="submit" variant="contained" color="primary" className="mt-4">
                Submit
              </Button>
            </form>
      </div>
    </Modal>
  );
};


const TrainingPage = (props) => {
  const [open, setOpen] = useState(false);
  const [editingLogId, setEditingLogId] = useState(null);
  const [trainingLoading, setTrainingLoading] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);

  async function getTraining() {
    setTrainingLoading(true);
    try {
      let res = await fetch("/api/admin/training", {
        method: "GET"
      })
      trainingLogs = await res.json();
      if (!props.adminPage) {
        trainingLogs = trainingLogs.filter((log) => log.userId === userId);
      }
      if (props.search !== "") {
        trainingLogs = trainingLogs.filter((log) => log.title.toLowerCase().includes(props.search.toLowerCase()));
      }
    } catch (e) {
      console.error(e.message);
      trainingLogs = [];
    }
    setTrainingLoading(false);
  }

  const handleEdit = (logId) => {
    setEditingLogId(logId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingLogId(null);
  };

  useEffect(() => {
    if (userId !== "") {
      getTraining();
    }
  }, [open, userId, props.search])

  return (
    <div className="flex-col container mx-auto p-4 bg-zinc-400">
        <div className="flex justify-between bg-zinc-400 mb-4">
            <Typography variant="h1 text-black" gutterBottom>Training Logs</Typography>
            {!props.adminPage ? <Button onClick={() => setOpen(true)} variant="contained" color="primary" className="float-right">
                Add Training Log
            </Button> : <></>}
        </div>
        <div className="flex-col bg-zinc-400">
            <TrainingLogForm open={open} handleClose={handleClose} editingLogId={editingLogId} />
            {trainingLoading ? <div>Loading</div> : <TrainingLogList logs={trainingLogs} onEdit={handleEdit} adminPage={props.adminPage} />}
        </div>
    </div>
  );
};

export default TrainingPage;
