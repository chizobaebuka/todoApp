import React, { useState, ChangeEvent, FormEvent } from 'react';

interface TodoFormProps {
    addTodo: (todo: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
    const [value, setValue] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (value) {
            addTodo(value);
            setValue('');
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-200 p-4 rounded-lg shadow-md mb-4">
            <input
                type="text"
                value={value}
                onChange={handleInputChange}
                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                placeholder="What is the task today?"
            />
            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 mt-2 transition duration-300"
            >
                Add Task
            </button>
        </form>
    );
};

export default TodoForm;
