import { Head } from "@inertiajs/react";
import Layout from "../../Layout/Layout";
import { useState } from "react";
import axios from "axios";

export default function Index({ todos: initialTodos }) {

    const [todos, setTodos] = useState(initialTodos)
    const [message, setMessage] = useState("")

    const handleUpdateTodoToFinish = async (id) => {
        try {
            const response = await axios.put(`/todos/${parseInt(id)}/status`, { is_finish: 1 });

            if (response.data.code === 200) {
                const updateTodosStatus = todos.map((todo) =>
                    todo.id === id ? { ...todo, is_finish: 1 } : todo
                )
                setTodos(updateTodosStatus)
                setMessage("Task Done! now advance to your next task!")
            } else {
                setMessage("Failed to update status!")
            }

        } catch (err) {
            console.error("Error ", err)
            console.log(err);
            setMessage("It's some error you need to fix!");
        }
    }

    const statusMap = {
        0: "Unfinished",
        1: "Finished"
    }

    const statusStyleMap = {
        0: "text-blue-500",
        1: "text-green-600",
    }

    return (
        <Layout>
            <Head title="Welcome!" />

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Task Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((todo) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {todo.task_name}
                                </th>
                                <td className="px-6 py-4">
                                    {todo.description}
                                </td>
                                <td className={`px-6 py-4 ${statusStyleMap[todo.is_finish]}`}>
                                    {statusMap[todo.is_finish] || "Unknown"}
                                </td>
                                <td className="px-6 py-4" key={todo.id}>
                                    <button
                                        type="button"
                                        onClick={() => handleUpdateTodoToFinish(todo.id)}
                                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Done</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {message && (
                    <div className="mt-4 p-4 text-white bg-blue-500 rounded">
                        {message}
                    </div>
                )}
            </div>

        </Layout>
    );
}