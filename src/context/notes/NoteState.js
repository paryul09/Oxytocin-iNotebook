import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) =>{
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

//Get all notes
const getNotes = async () =>{
  //to do api calls
  console.log(localStorage.getItem('token'))
  const response = await fetch(`${host}/api/note/fetchallnotes`, {
    method: 'GET', // 
    headers: {
      'Content-Type': 'application/json',// 'Content-Type': 'application/x-www-form-urlencoded',
      "authorization":localStorage.getItem('token'),
      // "auth-token":" eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiZWQzNmZhMzllNTMwNjM3NTFhMzdlIn0sImlhdCI6MTYzOTg5NTkxOX0.UeDe2l41D8APYriF3C0cIKWe_9ZJFRWZWEewvXujo_s"
    },
  });
  const json = await response.json()
  console.log(json)
  setNotes(json)
}
//Add a note
const addNote = async (title,description,tag,typ) =>{
  //to do api calls
  const  response = await fetch(`${host}/api/note/addnote`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
   
    headers: {
      'Content-Type': 'application/json',// 'Content-Type': 'application/x-www-form-urlencoded',
      'authorization':localStorage.getItem('token'),
      // "auth-token":" eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiZWQzNmZhMzllNTMwNjM3NTFhMzdlIn0sImlhdCI6MTYzOTg5NTkxOX0.UeDe2l41D8APYriF3C0cIKWe_9ZJFRWZWEewvXujo_s"
    },
    body: JSON.stringify({title,description,tag,typ}) // body  type must match "Content-Type" header
  });
  const note = await response.json();
  setNotes(notes.concat(note))  
}
//Delete a note
const deleteNote = async (id) =>{
  //API CALL
  const response = await fetch(`${host}/api/note/deletenode/${id}`, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
   
    headers: {
      'Content-Type': 'application/json',// 'Content-Type': 'application/x-www-form-urlencoded',
      "authorization":localStorage.getItem('token'),
      // "auth-token":" eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiZWQzNmZhMzllNTMwNjM3NTFhMzdlIn0sImlhdCI6MTYzOTg5NTkxOX0.UeDe2l41D8APYriF3C0cIKWe_9ZJFRWZWEewvXujo_s"
    },
  });
  const json = response.json();
  const  newNotes = notes.filter((note)=>{
   return  note._id !==id
  })
  setNotes(newNotes)
}
//Edit a note
const editNote = async (id,title,description,tag,typ) =>{
  //API CALL
  const response = await fetch(`${host}/api/note/updatenote/${id}`, {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json',// 'Content-Type': 'application/x-www-form-urlencoded',
      "authorization":localStorage.getItem('token'),
      // "auth-token":" eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiZWQzNmZhMzllNTMwNjM3NTFhMzdlIn0sImlhdCI6MTYzOTg5NTkxOX0.UeDe2l41D8APYriF3C0cIKWe_9ZJFRWZWEewvXujo_s"
    },
    body: JSON.stringify({title,description,tag,typ}) // body data type must match "Content-Type" header
  });
  const json = await response.json();  // parses JSON response into native JavaScript objects


let newNotes = JSON.parse(JSON.stringify(notes))
  for (let index = 0; index < notes.length; index++) {
    const element = notes[index];
    if(element._id===id){
      newNotes[index].title = title;
      newNotes[index].description = description;
      newNotes[index].tag = tag;
      newNotes[index].typ = typ;
      break;
    }  
  }
  setNotes(newNotes)
}
    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;