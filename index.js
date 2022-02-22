// to add them do --> npm i firebase-admin express cors <-- do this to add them
const express = require('express'); //<-- ES5 import 
const cors = require('cors'); //<-- allows cross origin resource sharing
const { getTasks, createTask, updateTask, deleteTask } = require('./src/tasks')
const PORT = process.env.PORT || 3000
//env is for environmental variable 


const app = express();
app.use(cors());
app.use(express.json());

//Routes
app.post('/tasks', createTask);
app.get('/tasks', getTasks);
app.patch('/tasks/:taskId', updateTask);
app.delete("/tasks/:taskId", deleteTask);

app.listen(PORT, () => {
    console.log('Listening on PORT: ', PORT)
});

