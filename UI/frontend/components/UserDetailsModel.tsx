"use client";
import { useState } from "react";
import { User } from "./types/user";
interface Props {
    onClose: () => void;
    onSave: (
        firstName: string,
        lastName: string,
        email: string,
        role: string
    ) => void;
}
export default function CreateUserModal({
    onClose,
    onSave,
}: Props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("0");
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
          shadow-2xl
          w-[500px]
          p-6
        "
            >
                <h2
                    className="
            text-2xl
            font-bold
            mb-6
          "
                >
                    Create User
                </h2>

                <div className="mb-4">

                    <label className="block mb-1">
                        First Name
                    </label>

                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) =>
                            setFirstName(e.target.value)
                        }
                        className="
              w-full
              border
              rounded-lg
              px-3
              py-2
            "
                    />

                </div>

                <div className="mb-4">

                    <label className="block mb-1">
                        Last Name
                    </label>

                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) =>
                            setLastName(e.target.value)
                        }
                        className="
              w-full
              border
              rounded-lg
              px-3
              py-2
            "
                    />

                </div>
                <div className="mb-4">

                    <label className="block mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className="
              w-full
              border
              rounded-lg
              px-3
              py-2
            "
                    />
                </div>

                <div className="mb-6">

                    <label className="block mb-1">
                        Role
                    </label>

                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="
              w-full 
                border
                rounded-lg
                px-3
                py-2
            "
                    >
                        <option value="0">
                            User
                        </option>
                        <option value="1">
                            Admin
                        </option>
                    </select>

                </div>

                <div className="flex gap-3">

                    <button
                        onClick={() =>
                            onSave(
                                firstName,
                                lastName,
                                email,
                                role
                            )
                        }
                        className="
              bg-green-600
              text-white
              px-4
              py-2
              rounded-lg
              hover:bg-green-700
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
              rounded-lg
              hover:bg-gray-500
            "
                    >
                        Cancel
                    </button>

                </div>
            </div>
        </div>
    );
}