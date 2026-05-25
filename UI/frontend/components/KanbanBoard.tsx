import { Task } from "./types/task";
import TaskCard from "./TaskCard";

interface Props {
    title: string;
    columnStatus: string;
    tasks: Task[];
    onTaskClick: (task: Task) => void;
}

export default function KanbanBoard({
    title,
    tasks,
    onTaskClick,
    columnStatus
}: Props) {
    const statusColors = {
        TODO: "bg-red-100 border-red-300",
        IN_PROGRESS: "bg-yellow-100 border-yellow-300",
        DONE: "bg-green-100 border-green-300"
    };
    return (
        <div className={`
                rounded-xl
                border-2
                p-4
                shadow-md
                min-h-[600px]
                ${statusColors[columnStatus as keyof typeof statusColors]}
            `}>

            <h2 className="text-xl font-bold mb-4">
                {title}
                <span className="ml-2 text-sm bg-white px-2 py-1 rounded-full">
                    {tasks.length}
                </span>
            </h2>

            {tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onClick={() => onTaskClick(task)}
                />
            ))}

        </div>
    );
}