import express from 'express';
import {readTodos , createtodos , updatetodos,deletetodo} from '../controller/todos.js'

const router = express.Router();
router.get('/' , readTodos);
router.post('/' , createtodos);
router.patch('/:id' , updatetodos);
router.delete('/:id' , deletetodo);


export default router ; 