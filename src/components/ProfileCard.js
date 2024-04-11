import React, { useContext, useEffect, useState } from 'react';
import { IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

let users = [];

const ProfileCard = (props) => {
    const name = props.name;
    const isAdmin = props.isAdmin;
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        handleClose(); 
        try {
            await fetch("/api/user", {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "userId": props.userId }) 
            });
            
            props.refreshUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="mx-4 mt-4 flex rounded-md w-11/12 shadow-md">
            <div className="flex flex-row px-3 py-4 justify-between">
                <div className="flex">
                    <div className="circle bg-gray-400 text-white flex align-middle justify-center items-center rounded-full w-10 h-10 text-lg font-semibold">{name[0].toUpperCase()}</div>
                    <div className="flex flex-col items-start ml-2">
                        <div className="menu-item font-bold mr-4 text-gray-600">{name}</div>
                        <div className="text-gray-600 text-xs">{isAdmin ? "Admin" : ""}</div>
                    </div>
                </div>
                <IconButton onClick={handleClickOpen} className="flex justify-end pl-5">
                    <DeleteIcon />
                </IconButton>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this user?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

const UsersList = ({ refreshUsers }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-5 ml-6 mt-4">
            {users.map(user => (
                <ProfileCard key={user._id} name={user.fullName} isAdmin={user.admin} userId={user._id} refreshUsers={refreshUsers} />
            ))}
        </div>
    )
}

const UsersPage = (props) => {
    const [usersLoading, setUsersLoading] = useState(false);

    async function getUsers() {
        setUsersLoading(true);
        try {
            let res = await fetch("/api/admin/users", {
                method: "GET"
            })
            users = await res.json();
            if (props.search !== "") {
                users = users.filter((user) => user.fullName.toLowerCase().includes(props.search.toLowerCase()));
            }
        } catch (e) {
            console.error(e.message);
            users = [];
        }
        setUsersLoading(false);
    }

    useEffect(() => {
        getUsers();
    }, [props.search])

    const refreshUsers = () => {
        getUsers(); 
    };

    return (
        <div>
            <div className="pl-8 pt-6 text-xl font-semibold border-b-2 pb-2">All Users</div>
            {usersLoading ? <></> : <UsersList refreshUsers={refreshUsers} />}
        </div>
    )
}

export default UsersPage;
