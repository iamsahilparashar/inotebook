import React,{ useContext} from 'react'
import noteContext from '../context/notes/noteContext';


const NoteItem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const { note } = props;
    return (
        <div className = "col-md-3 my-3">
            <div className="card">
                {/* <img src="..." className="card-img-top" alt="..."/> */}
                <div className ="card-body">
                <h5 className ="card-title">{note.title}</h5>
                <p className ="card-text">{note.description}</p>
                <i className="far fa-trash-alt mx-2"onClick={()=>{deleteNote(note._id)}}></i>
                <i className="fas fa-edit mx-2"></i>
                {/* <a href="#" className ="btn btn-primary">Go somewhere</a> */}
                </div>
            </div>
        </div>
    )
}

export default NoteItem
