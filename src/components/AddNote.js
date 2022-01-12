import NoteContext from "../context/notes/NoteContext"
import React, { useContext,useState } from "react";
const AddNote = (props) => {
    const context = useContext(NoteContext);
    const {addNote} = context;
    const {showAlert} = props
    const [note, setNote] = useState({title:"",description:"",tag:"",typ:""})
       var typ1 = document.getElementById("typ1");
        var typ2 = document.getElementById("typ2");
    const handleClick =(e) =>{
        e.preventDefault();   
        if(typ1.checked===true){
            note.typ = "Team";
        }else if(typ2.checked===true){
            note.typ = "Personal";
        }
        addNote(note.title,note.description,note.tag,note.typ);
        typ1.checked = false
        typ2.checked = false
        setNote({title:"",description:"",tag:"",typ:""})
        showAlert(" Added Successfully","success");
    }
    const onChange = (e) =>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div>
         <div className="container my-3">
        <h2>Add a Note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input  type="text" className="form-control"  id="title" name="title"  value={note.title} onChange={onChange} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label"> Description </label>
            <input  type="text" className="form-control"  id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label"> Tag </label>
            <input  type="text" className="form-control"  id="tag" name="tag" value={note.tag} onChange={onChange}/>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="typ" value={note.typ} id="typ1" onChange={onChange}/>
            <label className="form-check-label" htmlFor="typ1">
              Team 
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="typ" value={note.typ} id="typ2" onChange={onChange}/>
            <label className="form-check-label" htmlFor="typ2">
              Personal
            </label>
          </div>
          <br/><br/>
          <button disabled={note.title.length<5||note.description.length<5||(typ1.checked===false&&typ2.checked===false)} type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
        </div>
    )
}

export default AddNote
