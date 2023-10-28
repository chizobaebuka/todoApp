import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';
import CategoryList from './Category';
import { v4 as uuidv4 } from 'uuid';
import EditTodoForm from './EditTodoForm';

interface Category {
    id: string;
    name: string;
}

interface TodoItem {
    id: string;
    task: string;
    completed: boolean;
    isEditing: boolean;
    categoryId: string;
}

export const TodoWrapper: React.FC = () => {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [categories, setCategories] = useState<Category[]>([]);
    // const [newCategoryName, setNewCategoryName] = useState<string>('');
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

    useEffect(() => {
        const savedTodos = localStorage.getItem('todos');
        const savedCategories = localStorage.getItem('categories');
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
        if (savedCategories) {
            setCategories(JSON.parse(savedCategories));
        }
    }, []);

    const saveTodosToLocalStorage = (newTodos: TodoItem[]) => {
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    const saveCategoriesToLocalStorage = (newCategories: Category[]) => {
        localStorage.setItem('categories', JSON.stringify(newCategories));
    };

    const addTodo = (todo: string) => {
        let newCategoryId = selectedCategoryId; // Initialize with the selected category

        if (!newCategoryId) {
            // If no category is selected, you can assign a default category ID or leave it empty
            newCategoryId = 'defaultCategory'; // Modify this as needed
        }

        const newTodo = {
            id: uuidv4(),
            task: todo,
            completed: false,
            isEditing: false,
            categoryId: newCategoryId,
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

    const addCategory = (name: string) => {
        const newCategory = {
            id: uuidv4(),
            name,
        };
        const newCategories = [...categories, newCategory];
        setCategories(newCategories);
        saveCategoriesToLocalStorage(newCategories);
    };

    const deleteCategory = (id: string) => {
        // Remove todos associated with the deleted category
        const newTodos = todos.filter((todo) => todo.categoryId !== id);
        setTodos(newTodos);
        saveTodosToLocalStorage(newTodos);

        // Remove the category
        const newCategories = categories.filter((category) => category.id !== id);
        setCategories(newCategories);
        saveCategoriesToLocalStorage(newCategories);

        // Clear selectedCategoryId if the selected category is deleted
        if (selectedCategoryId === id) {
            setSelectedCategoryId(null);
        }
    };

    const selectCategory = (id: string) => {
        setSelectedCategoryId(id);
    };

    // Filter todo items based on the selected category
    const filteredTodos = todos.filter((todo) =>
        !selectedCategoryId || todo.categoryId === selectedCategoryId
    );

    return (
        <div className="bg-gradient-to-r from-green-200 via-blue-200 to-blue-600 min-h-screen p-4">
            <div className="mx-auto max-w-lg bg-white rounded-md p-4 shadow-lg">
                <h1 className="text-3xl font-semibold text-center text-blue-900 mb-6">
                    Todo List
                </h1>
                <CategoryList
                    categories={categories}
                    addCategory={addCategory}
                    deleteCategory={deleteCategory}
                    selectCategory={selectCategory}
                />
                <div className="mb-4">
                    {/* Search bar */}
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <TodoForm addTodo={addTodo} />
                <div className="mt-6 space-y-4">
                    {filteredTodos.map((todo) =>
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
