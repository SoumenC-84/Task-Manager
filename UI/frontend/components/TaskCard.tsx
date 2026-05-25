import { Task } from "./types/task";

interface Props {
    task: Task;
    onClick: () => void;
}

export default function TaskCard({
    task,
    onClick,
}: Props) {

    return (
        <div
            onClick={onClick}
            className="
                bg-white
                rounded-xl
                shadow
                p-4
                mb-4
                cursor-pointer
                hover:shadow-lg
                hover:scale-[1.02]
                transition-all
            "
        >
            <h3 className="font-semibold text-slate-800">
                {task.title}
            </h3>
            <div className="mt-3">
                <span className="
                    text-xs
                    bg-slate-100
                    px-2
                    py-1
                    rounded-full
                ">
                    {task.status}
                </span>
            </div>
        </div>
    );
}