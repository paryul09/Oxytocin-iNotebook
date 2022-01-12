import React from 'react'

const UpdateNote = () => {
    return (
        <>
                    <button ref = {ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
               <div className="modal-content">
               <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
              <div className="modal-body">
              <form>
          <div className="mb-3">
            <label htmlFor="etitle" className="form-label">Title</label>
            <input  type="text" className="form-control"  id="etitle" name="etitle" value={note.etitle}   onChange={onChange} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="edescription" className="form-label"> description </label>
            <input  type="text" className="form-control"  id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="etag" className="form-label"> Tag </label>
            <input  type="text" className="form-control"  id="etag" name="etag" value={note.etag} onChange={onChange}/>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="typ" value={note.etyp} id="typ1" onChange={onChange}/>
            <label className="form-check-label" htmlFor="typ1">
              Team 
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="typ" value={note.etyp} id="typ2" onChange={onChange} />
            <label className="form-check-label" htmlFor="typ2">
              Personal
            </label>
          </div>
        </form>
              </div>
              <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button disabled={note.etitle.length<5||note.edescription.length<5}  type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
              </div>
            </div>
          </div>
        </div>
        </>
    )
}

export default UpdateNote
