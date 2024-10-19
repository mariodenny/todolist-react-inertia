import { Head } from "@inertiajs/react";

export default function Index({ todos }) {
    return (
        <>
            <Head title="Welcome!" />
            <h1>Todo List!</h1>
            <ul>
                {todos.map((todo) => (
                    <div key={todo.id}>
                        <h2>{todo.task_name}</h2>
                        <h2>{todo.description}</h2>
                    </div>
                ))}
            </ul>
        </>
    );
}