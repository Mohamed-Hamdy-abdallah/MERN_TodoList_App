import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import todosRoutes from './routes/todos.js'

const app = express();
dotenv.config();
//dotenv.config({path: path.resolve('/routes'+'/.env')});
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use('/todos', todosRoutes)
const mongodb = process.env.DB_MONGO
                
app.get('/', (req, res) => {
    res.send('Welcome to server')
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.NODE_ENV_DB, { useUnifiedTopology: true, useNewUrlParser: true ,useFindAndModify:false })
.then(() => {app.listen(PORT);
console.log(`server is running on port ${PORT}`)})
.catch(err => console.log(err))
