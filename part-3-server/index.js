let data= require('./persons.json')
const express = require('express');
const app = express();

const generateId =()=>{
    const min=1;
    const max=1000;
    let id =1;
    while(data.some(person=>person.id === id)){
        id = Math.floor(Math.random()*(max-min+1))+min;
    }
    return id;
}

app.use(express.json());

app.get('/',(req,res)=>{
    res.json("Hello world")
})

app.get('/api/persons',(req,res)=>{
    res.json(data)
})

app.get('/info',(req,res)=>{
    const info = `
    <p>Phone book has info for ${data.length} people</p>
    <p>${new Date()}</p>
    ` 
    res.send(info);
})

app.get('/api/persons/:id',(req,res)=>{
    const reqId = Number(req.params.id);
    const person = data.find(person=>person.id === reqId);
    
    if(!person){
        res.statusMessage= "Person not found";
        res.status(404).end();
    }else{
        res.json(person)
    }
})

app.delete('/api/persons/:id',(req,res)=>{
    const reqId = Number(req.params.id);
    const person = data.find(person=>person.id === reqId);
    
    if(person){
        data = data.filter(person=> person.id !== reqId);
    }

    res.status(204).end();
    
})

app.post("/api/persons",(req,res)=>{
    const body = req.body;
    console.log(body);

    if(!body || !body.name || !body.number){
        return res.status(400).json({
            error:"Required params missing in body"
        })
    }

    if(data.some(person=> person.name === body.name)){
        return res.status(400).json({
            error:"name must be unique"
        })
    }

    const newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    data = data.concat(newPerson);
    res.status(201).json(newPerson);
})



const PORT = 3001;

app.listen(PORT,()=>{
    console.log("app listening on ",PORT)
})


