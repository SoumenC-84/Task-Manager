"use client";

import { useEffect, useState } from "react";

import KanbanBoard from "@/components/KanbanBoard";
import TaskDetailsModal from "@/components/TaskDetailsModal";

import { Task } from "../../components/types/task";
import { User } from "../../components/types/user";

export default function HomePage() {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedTask, setSelectedTask] =
        useState<Task | null>(null);

    useEffect(() => {
        fetchTasks();
        fetchUsers();
    }, []);

    async function fetchTasks() {

        const response = await fetch(
            "http://localhost:5091/tasks"
        );

        const data = await response.json();

        setTasks(data);
    }

    async function fetchUsers() {

        const response = await fetch(
            "http://localhost:5091/users"
        );

        const data = await response.json();

        setUsers(data);
    }

    async function assignTask(
        taskId: string,
        userId: string,
        curStatus: string
    ) {

        await fetch(
            `http://localhost:5091/tasks/${taskId}/assign`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    id: taskId,
                    userId: userId,
                    status: curStatus,
                }),
            }
        );

        fetchTasks();
    }
    const todoTasks =
        tasks.filter((x) => x.status === "To Do");

    const progressTasks =
        tasks.filter(
            (x) => x.status === "InProgress"
        );
    const assignedTasks =
        tasks.filter((x) => x.status === "Assigned");

    const doneTasks =
        tasks.filter((x) => x.status === "Done");

    return (
        <div className="min-h-screen bg-slate-100 p-6">

            <h1 className="text-4xl font-bold text-slate-800 mb-8">
                Task Management Board
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <KanbanBoard
                    title="TODO"
                    tasks={todoTasks}
                    columnStatus="TODO"
                    onTaskClick={setSelectedTask}
                />
                <KanbanBoard
                    title="ASSIGNED"
                    tasks={assignedTasks}
                    columnStatus="ASSIGNED"
                    onTaskClick={setSelectedTask}
                />

                <KanbanBoard
                    title="IN PROGRESS"
                    tasks={progressTasks}
                    columnStatus="IN_PROGRESS"
                    onTaskClick={setSelectedTask}
                />

                <KanbanBoard
                    title="DONE"
                    tasks={doneTasks}
                    columnStatus="DONE"
                    onTaskClick={setSelectedTask}
                />

            </div>

            {selectedTask && (
                <TaskDetailsModal
                    task={selectedTask}
                    users={users}
                    onClose={() => setSelectedTask(null)}
                    onAssign={assignTask}
                />
            )}

        </div>
    );
}