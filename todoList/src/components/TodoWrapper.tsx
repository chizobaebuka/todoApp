import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import EditTodoForm from './EditTodoForm';

interface TodoItem {
    id: string;
    task: string;
    completed: boolean;
    isEditing: boolean;
}

export const TodoWrapper: React.FC = () => {
    const [todos, setTodos] = useState<TodoItem[]>([]);

    // Load todo items from local storage when the component mounts
    useEffect(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, []);

    // Function to save todo items to local storage
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
        saveTodosToLocalStorage(newTodos); // Save to local storage
    };

    const deleteTodo = (id: string) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
        saveTodosToLocalStorage(newTodos); // Save to local storage
    };

    const toggleComplete = (id: string) => {
        const newTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(newTodos);
        saveTodosToLocalStorage(newTodos); // Save to local storage
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
        saveTodosToLocalStorage(todos); // Save to local storage
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
                            <Todo
                                key={todo.id}
                                task={todo}
                                deleteTodo={deleteTodo}
                                editTodo={editTodo}
                                toggleComplete={toggleComplete}
                            />
                        )
                    )}
                </div>
            </div>
        </div>
    );
};
