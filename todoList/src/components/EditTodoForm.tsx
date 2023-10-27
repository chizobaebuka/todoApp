import React, { useState, ChangeEvent, FormEvent } from 'react';

interface EditTodoFormProps {
    editTodo: (newTask: string, taskId: string) => void;
    task: { id: string; task: string };
}

const EditTodoForm: React.FC<EditTodoFormProps> = ({ editTodo, task }) => {
    const [value, setValue] = useState(task.task);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        editTodo(value, task.id);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-2 rounded shadow mb-2">
            <input
                type="text"
                value={value}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded"
                placeholder="Update task"
            />
            <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
                Update Task
            </button>
        </form>
    );
};

export default EditTodoForm;
