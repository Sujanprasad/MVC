import axios from 'axios';

const API_URL_TODOS= 'http://127.0.0.1:8000/api/todos/';

export const fetchTodos = () => fetch(API_URL_TODOS).then(response => response.json());

export const createTodo = (todo) => fetch(API_URL_TODOS, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo)
}).then(response => response.json());

export const updateTodo = (id, updates) => fetch(`${API_URL_TODOS}${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
}).then(response => response.json());

export const deleteTodo = (id) => fetch(`${API_URL_TODOS}${id}/`, {
    method: 'DELETE'
});


const API_URL_RIGISTRATION='http://127.0.0.1:8000/api/Users/'

export const fetchUsers = () => fetch(API_URL_RIGISTRATION).then(response => response.json());

export const createUsers = (todo) => fetch(API_URL_RIGISTRATION, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo)
}).then(response => response.json());

const API_URL_STUDENTS='http://127.0.0.1:8000/api/students/'

export const fetchStudents = async () => {
    try {
        const token = localStorage.getItem('access_token'); 
        const response = await axios.get(API_URL_STUDENTS, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; 
    } catch (error) {
        console.error("Error fetching students:", error);
        return [];
    }
};

