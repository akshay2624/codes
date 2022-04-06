const data = require("./data");
const express = require("express");
const app = express();

app.use(express.json());

app.get("/api/details", (req, res) => {
    console.log("get all data",data.details);
    res.json(data);
});

app.get("/api/details/:id", (req, res) => {
    let obj = data.details.find(item => item.id == parseInt(req.params.id));
    console.log(obj);
    res.json(obj);
});

app.post("/api/details", (req, res) => {
    let name = req.body.name;
    let lname = req.body.lname;
    console.log(req.body);
    let id =
        data.details.reduce((prev, curr) => {
            return prev < curr.id ? curr.id : prev;
        }, 0) + 1;
    let last_update = Date.now();
    let obj = { id, name, lname, last_update };
    data.details.push(obj);
    console.log("POST", data.details);
    res.status(201).json(obj);
});

app.put("/api/details/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let name = req.body.name;
    let lname = req.body.lname;
    let last_update = Date.now();
    let idx = data.details.findIndex(item => item.id === id);
    data.details[idx].name = name;
    data.details[idx].lname = lname;
    data.details[idx].last_update = last_update;
    console.log("PUT", data.details[idx]);
    res.status(200).json(data.details[idx]);
});

app.patch("/api/details/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let name = req.body.name;
   
    let idx = data.details.findIndex(item => item.id === id);
    data.details[idx].name = name;
    
    console.log("PATCH", data.details[idx]);
    res.status(200).json(data.details[idx]);
});

app.delete("/api/details/:id", (req, res) => {
    let id = parseInt(req.params.id);
    data.details = data.details.filter(item => item.id !== id);
    console.log("DELETE", data.details);
    res.status(204).end();
});

app.listen(3000, err => {
    if (err) {
        return console.log(err);
    }
    console.log("listening on port", 3000);
});