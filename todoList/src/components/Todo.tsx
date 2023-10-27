import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

interface TodoProps {
    task: {
        id: string;
        task: string;
        completed: boolean;
    };
    deleteTodo: (id: string) => void;
    editTodo: (id: string) => void;
    toggleComplete: (id: string) => void;
}

const Todo: React.FC<TodoProps> = ({ task, deleteTodo, editTodo, toggleComplete }) => {
    return (
        <div className=" bg-white p-2 rounded shadow mb-2">
            <p
                className={`cursor-pointer ${task.completed ? 'line-through text-gray-500' : 'text-black'}`}
                onClick={() => toggleComplete(task.id)}
            >
                {task.task}
            </p>
            <div className="flex mt-2">
                <button
                    className="mr-2 p-1 text-blue-500 hover:text-blue-700"
                    onClick={() => editTodo(task.id)}
                >
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button
                    className="p-1 text-red-500 hover:text-red-700"
                    onClick={() => deleteTodo(task.id)}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    );
};

export default Todo;
