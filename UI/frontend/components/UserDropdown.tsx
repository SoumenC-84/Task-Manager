import { User } from "./types/user";

interface UserDropdownProps {
    users: User[];
    selectedUserId: string;
    onUserChange: (userId: string) => void;
}

export default function UserDropdown({
    users,
    selectedUserId,
    onUserChange,
}: UserDropdownProps) {
    return (
        <div>
            <label htmlFor="userSelect">
                Assign User
            </label>

            <br />

            <select
                id="userSelect"
                value={selectedUserId}
                onChange={(e) => onUserChange(e.target.value)}
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
        </div>
    );
}