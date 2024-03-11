const express = require('express');
const app = express();

app.use(express.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/',(req,res)=>{
    res.send("<h1>Hello World</h1>")
})

app.get("/api/notes",(req,resp)=>{
    resp.json(notes);
})

app.get("/api/notes/:id",(req,res)=>{
  const id = Number(req.params.id);
  const note = notes.find(note => {
    return note.id === id
  })
  if(note){
    res.json(note);
  }else{
    res.statusMessage="Resource not found";
    res.status(404).end();
  }
})

app.delete("/api/notes/:id",(req,res)=>{
  const id = Number(req.params.id);
  notes = notes.filter(note=> note.id !== id);

  res.status(204).end();
})

const generateId = ()=>{
  const maxId = notes.length>0 ? Math.max(...notes.map(note=>note.id)) : 0;
  return maxId+1;
}


app.post("/api/notes",(req,res)=>{
  const fromRequest = req.body;
  
  if(!fromRequest.content){
    return res.status(400).json({
      error:"content is missing"
    })
  }
  
  const newNote = {
    id: generateId(),
    content: fromRequest.content,
    important: Boolean(fromRequest.important) || false
  }

  notes = notes.concat(newNote);

  res.status(201).json(newNote);
})

const PORT = 3001
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})