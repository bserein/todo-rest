"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;
const connectDB_1 = require("./connectDB"); //you imported this from the connect file
//export function createTask() {}
//ES5 way
const createTask = (request, response) => {
    const newTask = {
        task: request.body.task,
        done: false,
    };
    const db = (0, connectDB_1.connectDB)();
    db.collection("tasks")
        .add(newTask)
        .then((doc) => response.status(201).send(doc.id))
        .catch((err) => response.status(500).send(err));
};
exports.createTask = createTask;
const getTasks = (request, response) => {
    const db = (0, connectDB_1.connectDB)();
    db.collection("tasks")
        .get()
        .then((snapshot) => {
        const taskList = snapshot.docs.map((doc) => {
            //get a snapshot of the doc to receive them
            let task = doc.data();
            task.id = doc.id;
            return task;
        });
        response.send(taskList); //to send the array of tasks
    })
        .catch((err) => response.status(500).send(err));
    // response.send("Get Tasks is working.") <-- this was just to make sure that it works
};
exports.getTasks = getTasks;
const updateTask = (request, response) => {
    const { taskId } = request.params;
    const isDone = request.body.done;
    const db = (0, connectDB_1.connectDB)();
    db.collection("tasks")
        .doc(taskId)
        .update({ done: isDone }) //if you want to be able to do more you would put reques.body but this is specific with only the done
        .then((doc) => response.status(202).send(doc)) //this will send back the status and the document
        .catch((err) => response.status(500).send(err));
};
exports.updateTask = updateTask;
const deleteTask = (request, response) => {
    const { taskId } = request.params;
    const db = (0, connectDB_1.connectDB)();
    db.collection("tasks")
        .doc(taskId)
        .delete()
        .then(() => {
        response.send("Deleted task");
    })
        .catch((err) => response.status(500).send(err));
};
exports.deleteTask = deleteTask;
//gcloud config set project "project name"
// gcloud app deploy - now it will deploy it
