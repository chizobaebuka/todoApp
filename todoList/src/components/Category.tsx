// CategoryList.tsx
import React, { useState } from 'react';

interface Category {
    id: string;
    name: string;
}

interface CategoryListProps {
    categories: Category[];
    addCategory: (name: string) => void;
    deleteCategory: (id: string) => void;
    selectCategory: (id: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, addCategory, deleteCategory, selectCategory }) => {
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
                    <li
                        key={category.id}
                        className="cursor-pointer hover:underline"
                        onClick={() => selectCategory(category.id)}
                    >
                        {category.name}
                        <button
                            className="ml-2 text-red-500 hover:text-red-700"
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteCategory(category.id);
                            }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;
