"use client";
import { User } from "@/components/types/user";
import UpdateUserModal from "@/components/UpdateUserModel";
import UserDetailsModel from "@/components/UserDetailsModel";
import { useEffect, useState } from "react";
export default function UserListPage() {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [showUserCreateModal, setShowUserCreateModal] = useState(false);
    const [showUserEditModal, setShowUserEditModal] = useState(false);
    useEffect(() => {
        //debugger
        userList().then((data) => setUsers(data));
    }, []);
    const updateuser = async (
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        role: string
    ) => {
        const response = await fetch("http://localhost:5091/users", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, firstName, lastName, email, role })
        });
        const updatedUser = await response.json();
        setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
        setShowUserEditModal(false);
    };

    const createUser = async (
        firstName: string,
        lastName: string,
        email: string,
        role: string
    ) => {
        const response = await fetch("http://localhost:5091/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ firstName, lastName, email, role })
        });
        const newUser = await response.json();
        setUsers([...users, newUser]);
        userList().then((data) => setUsers(data));
        setShowUserCreateModal(false);
    };

    const userList = async () => {
        const response = await fetch(
            "http://localhost:5091/users"
        );
        const data = await response.json();
        return data;

    }
    return (
        <div className="min-h-screen bg-slate-100 p-6">

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold text-slate-800">
                    Users
                </h1>

                <button
                    className="
            bg-blue-600
            text-white
            px-4
            py-2
            rounded-lg
            hover:bg-blue-700
            transition
          "
                    onClick={() => setShowUserCreateModal(true)}
                >
                    + Add User
                </button>

            </div>

            <div className="grid gap-4">

                {users.map((user, index) => (
                    <div
                        key={user.id ?? index}
                        className="
              bg-white
              rounded-xl
              shadow-md
              hover:shadow-lg
              transition
              p-5
            "
                    >

                        <div className="flex justify-between items-center">

                            <div className="flex items-center gap-4">

                                <div
                                    className="
                    h-14
                    w-14
                    rounded-full
                    bg-blue-500
                    text-white
                    flex
                    items-center
                    justify-center
                    text-xl
                    font-bold
                  "
                                >
                                    {(user.firstName || "").charAt(0)}
                                </div>

                                <div>

                                    <h3
                                        className="
                      text-lg
                      font-semibold
                      text-slate-800
                    "
                                    >
                                        {user.firstName} {user.lastName}
                                    </h3>

                                    <p
                                        className="
                      text-sm
                      text-slate-500
                    "
                                    >
                                        {user.email}
                                    </p>

                                    <p
                                        className="
                      text-sm
                      text-slate-600
                      mt-1
                    "
                                    >
                                        {user.role == "1" ? "Admin" : "User"}
                                    </p>

                                </div>

                            </div>

                            <div className="flex items-center gap-3">

                                <span
                                    className={
                                        user.status === "Active"
                                            ? `
                        bg-green-100
                        text-green-700
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-medium
                      `
                                            : `
                        bg-red-100
                        text-red-700
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-medium
                      `
                                    }
                                >
                                    {user.status == "1" ? "Active" : "Inactive"}
                                </span>

                                <button
                                    onClick={() => {
                                        setShowUserEditModal(true);
                                        setSelectedUser(user);
                                    }}
                                    className="
                    border
                    border-slate-300
                    px-4
                    py-2
                    rounded-lg
                    hover:bg-slate-100
                  "
                                >
                                    Edit
                                </button>

                            </div>

                        </div>

                    </div>
                ))}

            </div>
            {showUserCreateModal && (
                <UserDetailsModel
                    onClose={() => setShowUserCreateModal(false)}
                    onSave={createUser}
                />
            )}
            {showUserEditModal && (
                <UpdateUserModal
                    user={selectedUser! as User}
                    onClose={() => setShowUserEditModal(false)}
                    onSave={updateuser}
                />
            )}

        </div>
    );
}