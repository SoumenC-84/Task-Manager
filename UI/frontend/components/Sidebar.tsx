import Link from "next/link"
export default function Sidebar() {
    return (
        <div className="flex min-h-screen" style={{ height: "69vh" }}>
            <aside className="w-64 bg-slate-900 text-white p-5">
                <div className="container flex-1" >
                    {/* MENU */}
                    <div className="menu" style={{ overflow: "auto" }}>
                        <nav>
                            <ul className="space-y-2">
                                <li className="block px-3 py-2 rounded hover:bg-slate-700">
                                    <Link href="/">Home</Link>
                                </li>
                                <li className="block px-3 py-2 rounded hover:bg-slate-700">
                                    <Link href="/modules/UserList">User List</Link>
                                </li>
                                <li className="block px-3 py-2 rounded hover:bg-slate-700">
                                    <Link href="/modules/TaskList">Task List</Link>
                                </li>

                            </ul>
                        </nav>

                    </div>

                </div>

            </aside>
        </div>
    );
}