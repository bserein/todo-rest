import { connectDB } from "./connectDB"; //you imported this from the connect file
import { Request, Response } from "express";
//export function createTask() {}

//ES5 way
export const createTask = (request: Request, response: Response) => {
  const newTask = {
    task: request.body.task,
    done: false,
  };
  const db = connectDB();
  db.collection("tasks")
    .add(newTask)
    .then((doc) => response.status(201).send(doc.id))
    .catch((err) => response.status(500).send(err));
};

export const getTasks = (request: Request, response: Response) => {
  const db = connectDB();
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

export const updateTask = (request: Request, response: Response) => {
  const { taskId } = request.params;
  const isDone = request.body.done;
  const db = connectDB();
  db.collection("tasks")
    .doc(taskId)
    .update({ done: isDone }) //if you want to be able to do more you would put reques.body but this is specific with only the done
    .then((doc) => response.status(202).send(doc)) //this will send back the status and the document
    .catch((err) => response.status(500).send(err));
};

export const deleteTask = (request: Request, response: Response) => {
  const { taskId } = request.params;
  const db = connectDB();
  db.collection("tasks")
    .doc(taskId)
    .delete()
    .then(() => {
      response.send("Deleted task");
    })
    .catch((err) => response.status(500).send(err));
};

//gcloud config set project "project name"
// gcloud app deploy - now it will deploy it
