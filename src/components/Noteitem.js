import React, {useContext} from 'react'
import NoteContext from "../context/notes/NoteContext"
const Noteitem = (props) => {
    const context = useContext(NoteContext);
    const {deleteNote} = context;
    const {note,updateNote} = props;
    return (
        <div className='col-lg-3 col-md-4 col-sm-6 col-xs-12'>
            <div className="card my-3" style={{"minWidth":"150px","minHeight":"200px"}}>
            <div className="card-body" style={{"backgroundColor":"lightblue",}}>
            <span className="badge rounded-pill bg-warning" style={{"marginBottom":"5px"}} >{note.typ} </span>
            <i className="far fa-trash-alt " onClick={()=>{deleteNote(note._id); props.showAlert(" Deleted successfully","success")}} style={{"position":"absolute","left":"75%","top":"10%"}}></i>
             <i className="far fa-edit "  onClick={()=>{updateNote(note)}} style={{"position":"absolute","left":"85%","top":"10%"}}></i>
                <div className="d-flex align-items-center">
                <h5 className="card-title text-uppercase">{note.title}</h5>
               
                </div>
                <p className="card-text ">{note.description} </p>
            </div>
            <div className="card-footer"style={{"backgroundColor":"lightgreen",}} >
                {note.tag}
            </div>
            </div>
            
        </div>
    )
}

export default Noteitem
