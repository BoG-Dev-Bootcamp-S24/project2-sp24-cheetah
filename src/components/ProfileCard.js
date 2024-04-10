import React, { useContext, useEffect, useState } from 'react';

let users = [];

const ProfileCard = (props) => {
    const name = props.name;
    const isAdmin = props.isAdmin;
    return (
        <div className="mx-4 mt-4 flex rounded-md w-11/12 shadow-md">
            <div className="flex px-3 py-4 justify-between">
                <div className="flex">
                    <div className="circle bg-gray-400 text-white flex align-middle justify-center items-center rounded-full w-10 h-10 text-lg font-semibold">{name[0].toUpperCase()}</div>
                    <div className="flex flex-col items-start ml-2">
                        <div className="menu-item font-bold mr-4 text-gray-600">{name}</div>
                        <div className="text-gray-600 text-xs">{isAdmin ? "Admin" : ""}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const UsersList = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-5 ml-6 mt-4">
            {users.map(user => (
            <ProfileCard name={user.fullName} isAdmin={user.admin}/>
            ))}
        </div>
    )
}

const UsersPage = () => {
    const [usersLoading, setUsersLoading] = useState(false);

    async function getUsers() {
        setUsersLoading(true);
        try {
          let res = await fetch("/api/admin/users", {
            method: "GET"
          })
          users = await res.json();
        } catch (e) {
          console.error(e.message);
          users = [];
        }
        setUsersLoading(false);
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <div>
            <div className="pl-8 pt-6 text-xl font-semibold border-b-2 pb-2">All Users</div>
            {usersLoading ? <></> : <UsersList />}
        </div>
    )
}



export default UsersPage;
