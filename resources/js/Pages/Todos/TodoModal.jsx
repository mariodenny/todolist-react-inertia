import React, { useState, useEffect } from "react";

export default function TodoModal({ isOpen, onClose, onSubmit, todo }) {
    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");
    const [isFinish, setIsFinish] = useState(false);

    useEffect(() => {
        if (todo) {
            setTaskName(todo.task_name);
            setDescription(todo.description);
            setIsFinish(todo.is_finish);
        } else {
            setTaskName("");
            setDescription("");
            setIsFinish(false);
        }
    }, [todo]);

    const handleSubmit = () => {
        const todoData = {
            task_name: taskName,
            description: description,
            is_finish: isFinish,
        };

        onSubmit(todoData);
        setTaskName("");
        setDescription("");
        setIsFinish(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">Your Todo</h3>
                            <button
                                className="text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={onClose}
                            >
                                <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    &times;
                                </span>
                            </button>
                        </div>

                        <div className="p-6 flex-auto">
                            <input
                                type="text"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                                placeholder="Task Name"
                                className="border p-2 mb-2 w-full"
                            />
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                                className="border p-2 mb-2 w-full"
                            />
                            {/* <div className="mt-2">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={isFinish}
                                        onChange={(e) => setIsFinish(e.target.checked)}
                                    />
                                    Mark as Finished
                                </label>
                            </div> */}
                        </div>

                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="text-red-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={onClose}
                            >
                                Close
                            </button>
                            <button
                                className="bg-emerald-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}
