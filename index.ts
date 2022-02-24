import express from 'express'; 
import  cors from 'cors'; //<-- allows cross origin resource sharing
import { getTasks, createTask, updateTask, deleteTask } from './src/tasks'
const PORT = process.env.PORT || 3000
//env is for environmental variable 


const app = express();
app.use(cors());
app.use(express.json());

//Routes
app.post('/tasks', createTask);
app.get('/tasks', getTasks);
app.patch('/tasks/:taskId', updateTask);
app.delete('/tasks/:taskId', deleteTask);

app.listen(PORT, () => {
    console.log('Listening on PORT: ', PORT)
});

