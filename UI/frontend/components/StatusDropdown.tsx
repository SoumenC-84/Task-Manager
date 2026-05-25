interface Props {
    selectedStatus: string;
    onStatusChange: (status: string) => void;
}

export default function StatusDropdown({
    selectedStatus,
    onStatusChange,
}: Props) {
    return (
        <div>
            <select className="border p-2 w-full"
                value={selectedStatus}
                onChange={(e) => onStatusChange(e.target.value)}
            >
                <option value="Select">Select Status</option>
                <option value="InProgress">In Progress</option>
                <option value="Done">Done</option>
            </select>
        </div>
    );
}