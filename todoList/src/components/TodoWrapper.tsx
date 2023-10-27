import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';
import EditTodoForm from './EditTodoForm';
import { v4 as uuidv4 } from 'uuid';

interface TodoItem {
    id: string;
    task: string;
    completed: boolean;
    isEditing: boolean;
}

export const TodoWrapper: React.FC = () => {
    const [todos, setTodos] = useState<TodoItem[]>([]);

    useEffect(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, []);

    const saveTodosToLocalStorage = (newTodos: TodoItem[]) => {
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    const addTodo = (todo: string) => {
        const newTodo = {
            id: uuidv4(),
            task: todo,
            completed: false,
            isEditing: false,
        };

        const newTodos = [...todos, newTodo];
        setTodos(newTodos);
        saveTodosToLocalStorage(newTodos);
    };

    const deleteTodo = (id: string) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
        saveTodosToLocalStorage(newTodos);
    };

    const toggleComplete = (id: string) => {
        const newTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(newTodos);
        saveTodosToLocalStorage(newTodos);
    };

    const editTodo = (id: string) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
            )
        );
    };

    const editTask = (task: string, id: string) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
            )
        );
        saveTodosToLocalStorage(todos);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
            .then(() => alert('Task copied to clipboard'))
            .catch((err) => alert('Failed to copy task: ' + err));
    };

    return (
        <div className="bg-gradient-to-r from-green-200 via-blue-200 to-blue-600 min-h-screen p-4">
            <div className="mx-auto max-w-lg bg-white rounded-md p-4 shadow-lg">
                <h1 className="text-3xl font-semibold text-center text-blue-900 mb-6">
                    Todo List
                </h1>
                <TodoForm addTodo={addTodo} />
                <div className="mt-6 space-y-4">
                    {todos.map((todo) =>
                        todo.isEditing ? (
                            <EditTodoForm editTodo={editTask} task={todo} key={todo.id} />
                        ) : (
                            <div key={todo.id} className="flex items-center justify-between">
                                <Todo task={todo} deleteTodo={deleteTodo} editTodo={editTodo} toggleComplete={toggleComplete} />
                                <button className="text-blue-500" onClick={() => copyToClipboard(todo.task)}>Copy</button>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};
