import { Task } from "./types/task";

interface Props {
    tasks: Task[];
}

export default function TaskList({ tasks }: Props) {
    return (
        <div>
            <h2>Tasks</h2>

            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}