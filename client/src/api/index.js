import axios from 'axios'

const url = 'http://localhost:5000/todos'

export const readTodos = () =>axios.get(url);

export const createTodos = (newTodo) =>axios.post(url,newTodo);

export const updateTodos = (id,updatedtodo) =>axios.patch(`${url}/${id}`,updatedtodo);

export const deleteTodo = (id) => axios.delete(`${url}/${id}`)
