"use client";
import { useState } from "react";
import { Task } from "./types/task";
import { User } from "./types/user";
import StatusDropdown from "./StatusDropdown";

interface Props {
    task: Task;
    users: User[];
    onClose: () => void;
    onAssign: (
        taskId: string,
        userId: string,
        status: string
    ) => void;
}

export default function TaskDetailsModal({
    task,
    users,
    onClose,
    onAssign,
}: Props) {
    const [selectedStatus, setSelectedStatus] =
        useState(task.status);
    const [selectedUserId, setSelectedUserId] =
        useState(task.userId || "");
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

            <div className="bg-white
    rounded-2xl
    shadow-2xl
    p-8
    w-[500px]">

                <h2 className=" text-2xl
    font-bold
    text-slate-800
    mb-6">
                    Task Details
                </h2>

                <p className="mb-4">
                    {task.title}
                </p>

                <select
                    className="w-full
        border
        border-gray-300
        rounded-lg
        px-3
        py-2
        mt-2"
                    defaultValue={task.userId || ""}
                    onChange={(e) => {
                        onAssign(task.id, e.target.value, selectedStatus)
                        setSelectedUserId(e.target.value)
                    }}
                >
                    <option value="">
                        Select User
                    </option>

                    {users.map((user) => (
                        <option
                            key={user.id}
                            value={user.id}
                        >
                            {user.firstName} {user.lastName}
                        </option>
                    ))}
                </select>
                {task.status !== "To Do" && (
                    <StatusDropdown
                        selectedStatus={selectedStatus}
                        onStatusChange={setSelectedStatus}
                    />
                )}
                <div className="mt-4 flex gap-2">

                    <button className="bg-blue-600 text-white
        px-5
        py-2
        rounded-lg
        hover:bg-blue-700
        transition
    "
                        onClick={() => {
                            onAssign(
                                task.id,
                                selectedUserId,
                                task.status !== "To Do" ? selectedStatus : "Assigned"
                            );

                            onClose();
                        }}

                    >
                        Save
                    </button>

                    <button
                        onClick={onClose}
                        className="bg-gray-300
        px-5
        py-2
        rounded-lg
        hover:bg-gray-400
        transition"
                    >
                        Close
                    </button>

                </div>

            </div>
        </div>
    );
}