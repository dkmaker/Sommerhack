"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = process.env.PORT || 80;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// In-memory storage for demo purposes
let todos = [];
// Utility function to generate unique IDs
const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
};
// Utility function to validate todo
const validateTodoTitle = (title) => {
    const trimmed = title.trim();
    if (!trimmed)
        return "Task title is required";
    if (trimmed.length > 200)
        return "Task title too long (max 200 characters)";
    return null;
};
// API Routes
// GET /api/todos - Get all todos
app.get('/api/todos', (req, res) => {
    try {
        const response = {
            success: true,
            data: todos
        };
        res.json(response);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch todos'
        });
    }
});
// POST /api/todos - Create a new todo
app.post('/api/todos', (req, res) => {
    try {
        const { title, deadline } = req.body;
        const titleError = validateTodoTitle(title);
        if (titleError) {
            return res.status(400).json({
                success: false,
                message: titleError
            });
        }
        const newTodo = {
            id: generateId(),
            title: title.trim(),
            completed: false,
            createdAt: Date.now(),
            deadline: deadline || undefined
        };
        todos.push(newTodo);
        const response = {
            success: true,
            data: newTodo,
            message: 'Todo created successfully'
        };
        res.status(201).json(response);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create todo'
        });
    }
});
// PUT /api/todos/:id - Update a todo
app.put('/api/todos/:id', (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const todoIndex = todos.findIndex(todo => todo.id === id);
        if (todoIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found'
            });
        }
        // Validate title if being updated
        if (updates.title !== undefined) {
            const titleError = validateTodoTitle(updates.title);
            if (titleError) {
                return res.status(400).json({
                    success: false,
                    message: titleError
                });
            }
            updates.title = updates.title.trim();
        }
        // Update todo
        todos[todoIndex] = {
            ...todos[todoIndex],
            ...updates
        };
        const response = {
            success: true,
            data: todos[todoIndex],
            message: 'Todo updated successfully'
        };
        res.json(response);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update todo'
        });
    }
});
// DELETE /api/todos/:id - Delete a todo
app.delete('/api/todos/:id', (req, res) => {
    try {
        const { id } = req.params;
        const todoIndex = todos.findIndex(todo => todo.id === id);
        if (todoIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found'
            });
        }
        const deletedTodo = todos.splice(todoIndex, 1)[0];
        const response = {
            success: true,
            data: deletedTodo,
            message: 'Todo deleted successfully'
        };
        res.json(response);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete todo'
        });
    }
});
// Serve React frontend in production
app.use(express_1.default.static(path_1.default.join(__dirname, '../client/build')));
// Catch-all handler for React Router
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../client/build/index.html'));
});
// Start server
app.listen(port, () => {
    console.log(`TODO MVP Server running on port ${port}`);
    console.log(`API available at http://localhost:${port}/api`);
});
