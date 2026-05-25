"use client";

import { useState } from "react";

interface Props {
    onClose: () => void;
    onSave: (
        title: string,
        description: string
    ) => void;
}

export default function CreateTaskModal({
    onClose,
    onSave
}: Props) {

    const [title, setTitle] = useState("");
    const [description, setDescription] =
        useState("");

    return (

        <div
            className="
                fixed
                inset-0
                bg-black/40
                flex
                items-center
                justify-center
            "
        >

            <div
                className="
                    bg-white
                    rounded-xl
                    p-6
                    w-[500px]
                    shadow-2xl"
            >

                <h2 className="text-2xl font-bold mb-4">
                    Create New Task
                </h2>

                <div className="mb-4">

                    <label>
                        Task Title
                    </label>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        className="
                            w-full
                            border
                            rounded
                            p-2
                            mt-1
                        "
                    />

                </div>

                <div className="mb-4">

                    <label>
                        Description
                    </label>

                    <textarea
                        rows={4}
                        value={description}
                        onChange={(e) =>
                            setDescription(
                                e.target.value
                            )
                        }
                        className="
                            w-full
                            border
                            rounded
                            p-2
                            mt-1
                        "
                    />

                </div>

                <div className="flex gap-2">

                    <button
                        onClick={() => {
                            onSave(
                                title,
                                description
                            );
                        }}
                        className="
                            bg-green-600
                            text-white
                            px-4
                            py-2
                            rounded
                        "
                    >
                        Save
                    </button>

                    <button
                        onClick={onClose}
                        className="
                            bg-gray-400
                            text-white
                            px-4
                            py-2
                            rounded
                            bg-opacity-70
                        "
                    >
                        Cancel
                    </button>

                </div>

            </div>

        </div>
    );
}