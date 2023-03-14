const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const moment=require("moment");
const { MongoClient } = require("mongodb");
const url =
  "mongodb+srv://malliksubhabrata:SubhaM1782@cluster0.akjgeev.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/createtasklist", async (req, res) => {
  console.log("createList page requested");
  res.sendFile(path.join(__dirname, "createlist.html"));
});
app.post("/api/createtasklist", async (req, res) => {
  const name = req.body.name;
  const message = req.body.description;
  const active = req.body.active;
  console.log(`name:${name} description:${message} active:${active}`);
  var obj = {
    name: name,
    description: message,
    active: active,
  };
  client.connect();
  const collection = client.db("Tasks").collection("tasklist");
  await collection.insertOne(obj);
  await client.close();
  res.redirect("createtasklist");
});

app.get("/api/createtask", async (req, res) => {
  console.log("createtask page requested");
  res.sendFile(path.join(__dirname, "createtask.html"));
});

app.post("/api/createtask", async (req, res) => {
  const { taskName, description, dueDate, period, periodType, taskListId, monthly, quarterly, yearly} = req.body;

  // validate inputs
  
  var pt;
  if(monthly) pt="monthly";
  if(quarterly) pt="quarterly";
  if(yearly) pt="yearly";
  // validate due date
  const endOfPeriod = moment(period, 'MMM YYYY').endOf(periodType);
  const formattedDueDate = moment(dueDate, 'DD-MM-YYYY');
  if (!formattedDueDate.isValid() || formattedDueDate.isBefore(endOfPeriod)) {
    return res.status(400).json({ error: `Due date should be after ${endOfPeriod.format('DD MMM YYYY')}` });
  }

  const formattedDate = formattedDueDate.toISOString();

  // create task object
  const task = {
    taskName,
    description,
    dueDate: formattedDate,
    period,
    periodType:pt,
    taskListId
  };


  res.redirect("createtask");
  console.log(task);
  client.connect();
  await client.db("Tasks").collection("task").insertOne(task);
  await client.close();
});

app.get("/api/tasklist", async(req, res) => {
  client.connect();
  console.log(`list is requested`);
  let a;
  if(req.query.searchText!=null){
    const text=req.query.searchText;
    a=await client.db("Tasks").collection("task").find({name:text});
    console.log(`${text}`);
  }
  else{
   a= await client.db("Tasks").collection("task").find({});
   console.log("hola");
  }

  a.forEach((doc)=>{
    console.log(doc);
  });
  res.end();
  
});

app.listen(5000, () => {
  console.log("Server started on port 5000.");
});
