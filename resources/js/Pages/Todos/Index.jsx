import { Head } from "@inertiajs/react";
import Layout from "../../Layout/Layout";
import { useState } from "react";
import axios from "axios";
import TodoModal from "./TodoModal";

export default function Index({ todos: initialTodos }) {
    const [todos, setTodos] = useState(initialTodos || []);
    const [message, setMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleStoreNewTodo = async (newTodo) => {
        try {
            const response = await axios.post(`/todos`, newTodo);
            if (response.data.code === 200) {
                const savedTodo = response.data.data;
                setTodos([...todos, savedTodo]);
                setMessage("Todo added successfully!");
            }
        } catch (err) {
            console.error("Error adding new todo:", err);
            setMessage("Failed to add new task!");
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            const response = await axios.delete(`/todos/${id}`);
            if (response.data.code === 200) {
                const updatedTodos = todos.filter((todo) => todo.id !== id);
                setTodos(updatedTodos);
                setMessage("Todo successfully deleted!");
            } else {
                setMessage("Failed to delete the todo.");
            }
        } catch (err) {
            console.error("Error deleting todo:", err);
            setMessage("An error occurred while trying to delete the todo.");
        }
    };

    const handleUpdateTodo = async (id, todoUpdated) => {
        try {
            const response = await axios.put(`/todos/${id}`, todoUpdated);
            if (response.data.code === 200) {
                setLoading(true);
                setMessage("Todo updated successfully!");

                setTimeout(async () => {
                    const todosResponse = await axios.get('/todos');
                    setTodos(todosResponse.data.data);
                    setLoading(false);
                    setIsModalOpen(false);
                }, 1000);
            } else {
                setMessage("Failed to update todo!");
            }
        } catch (err) {
            console.error("Error updating todo:", err);
            setMessage("Failed to update todo!");
        }
    };

    const handleUpdateTodoToFinish = async (id) => {
        try {
            const response = await axios.put(`/todos/${parseInt(id)}/status`, { is_finish: 1 });
            if (response.data.code === 200) {
                const updateTodosStatus = todos.map((todo) =>
                    todo.id === id ? { ...todo, is_finish: 1 } : todo
                );

                setTodos(updateTodosStatus);
                setMessage("Task Done! Now advance to your next task!");
            } else {
                setMessage("Failed to update status!");
            }
        } catch (err) {
            console.error("Error ", err);
            setMessage("It's some error you need to fix!");
        }
    };

    const statusMap = {
        0: "Unfinished",
        1: "Finished",
        false: "Unfinished",
        true: "Finished"
    };

    const statusStyleMap = {
        0: "text-blue-500",
        1: "text-green-600",
        false: "text-blue-500",
        true: "text-green-600",
    };

    return (
        <Layout>
            <Head title="Welcome!" />
            <div className="relative overflow-x-auto">
                <button
                    className="inline-block rounded border border-gray-700 bg-gray-700 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-gray-600 focus:outline-none focus:ring active:text-gray-500 mb-2"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Todo
                </button>

                <TodoModal
                    isOpen={isModalOpen}
                    todo={selectedTodo}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedTodo(null);
                    }}
                    onSubmit={(data) => {
                        if (selectedTodo) {
                            handleUpdateTodo(selectedTodo.id, data);
                        } else {
                            handleStoreNewTodo(data);
                        }
                    }}
                />

                {loading ? (
                    <div className="text-center mt-4">Loading...</div>
                ) : (
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Task Name</th>
                                <th scope="col" className="px-6 py-3">Description</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todos.map((todo) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={todo.id}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {todo.task_name}
                                    </th>
                                    <td className="px-6 py-4">{todo.description}</td>
                                    <td className={`px-6 py-4 ${statusStyleMap[todo.is_finish]}`}>
                                        {statusMap[todo.is_finish]}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedTodo(todo);
                                                setIsModalOpen(true);
                                            }}
                                            className="focus:outline-none text-white bg-blue-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            Update
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteTodo(todo.id)}
                                            className="focus:outline-none text-white bg-red-700 hover:bg-green-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleUpdateTodoToFinish(todo.id)}
                                            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                        >
                                            Mark as done
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {message && (
                    <div className="mt-4 p-4 text-white bg-blue-500 rounded">
                        {message}
                    </div>
                )}
            </div>
        </Layout>
    );
}
