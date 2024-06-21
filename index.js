const express = require("express");
const app = express();
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')

const path = require("path");
const port = 8080;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));

app.listen(port,()=>{
    console.log(`App is Listening to port : ${port}`);
});

let tasks = [
    {
    id : uuidv4(),
    task : "Learn Node js and express js",
    },
    {
    id : uuidv4(),
    task : "Learn SQL Command",
    },
    {
        id : uuidv4(),
        task : "Solve 3 DSA Problems",
    }];

app.get("/task",(req,res)=>{
    res.render("index.ejs",{tasks});
});

app.get("/task/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/task/new",(req,res)=>{
    let {task} = req.body;
    let id = uuidv4();
    tasks.push({id,task});

    res.redirect("/task");
});

app.get("/task/:id",(req,res)=>{
    let {id} = req.params;

    tasks = tasks.filter((t) => t.id!==id);

    res.redirect("/task");
});