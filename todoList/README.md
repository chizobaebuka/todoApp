# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


# Todo List App

A simple web-based Todo List application built with React, allowing you to manage your tasks efficiently.

## Features

- Add, edit, and delete tasks.
- Mark tasks as complete or incomplete.
- Copy task text to the clipboard.
- Filter tasks by category.
- Create and manage categories.
- Add tasks to specific categories.
- Local storage support to persist data.

## Usage

1. Clone this repository to your local machine:
   git clone <repository-url>
2. Navigate to the project directory 
   cd todoList
3. Install the required dependencies 
   npm install 
4. Start the development server
   npm run dev

Adding a Task: Enter a task description in the input field and press "Add Task." 

Editing a Task: Click the "Edit" icon to modify the task's description. Press "Enter" on your keyboard to confirm the changes.

Deleting a Task: Click the "Delete" icon button to remove a task.

Copying a Task: Click the "Copy" button to copy the task text to your clipboard.

## LOCAL STORAGE
The app uses local storage to persist your tasks and categories, so your data will be saved even after you close the browser.
