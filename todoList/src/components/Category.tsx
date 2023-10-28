import React, { useState } from 'react';

interface Category {
    id: string;
    name: string;
    todos: TodoItem[];
}

interface TodoItem {
    id: string;
    task: string;
    completed: boolean;
    isEditing: boolean;
}

interface CategoryListProps {
    categories: Category[];
    addCategory: (name: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, addCategory }) => {
    const [newCategoryName, setNewCategoryName] = useState<string>('');

    const handleCategoryAdd = () => {
        if (newCategoryName.trim() !== '') {
            addCategory(newCategoryName);
            setNewCategoryName('');
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Categories</h2>
            <div className="flex space-x-2">
                <input
                    type="text"
                    placeholder="New Category"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="w-1/2 p-2 border rounded"
                />
                <button
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                    onClick={handleCategoryAdd}
                >
                    Add
                </button>
            </div>
            <ul className="list-disc ml-4">
                {categories.map((category) => (
                    <li key={category.id}>{category.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;
