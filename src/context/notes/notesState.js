import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const notesinitial = [
    {
      "_id": "613c23a073157c5f955a694f",
      "user": "613ac23b4927dd6685ad1cdb",
      "title": "my title",
      "description": "plz wake up early",
      "tag": "personal",
      "date": "1631331202629",
      "__v": 0
    },
    {
      "_id": "613cd979c0b7970a381f6ae5",
      "user": "613ac23b4927dd6685ad1cdb",
      "title": " note 1",
      "description": "this is a note  1",
      "tag": "personal",
      "date": "1631377744744",
      "__v": 0
    },
    {
      "_id": "613cd979c0b7970a38j1f6ae5",
      "user": "613ac23b4927dd6685ad1cdb",
      "title": " note 1",
      "description": "this is a note  1",
      "tag": "personal",
      "date": "1631377744744",
      "__v": 0
    },
    {
      "_id": "613cd979c0eb7970a381f6ae5",
      "user": "613ac23b4927dd6685ad1cdb",
      "title": " note 1",
      "description": "this is a note  1",
      "tag": "personal",
      "date": "1631377744744",
      "__v": 0
    },
    {
      "_id": "613cd979c0b7970a3k81f6ae5",
      "user": "613ac23b4927dd6685ad1cdb",
      "title": " note 1",
      "description": "this is a note  1",
      "tag": "personal",
      "date": "1631377744744",
      "__v": 0
    },
    {
      "_id": "613scd979c0b7920a381f6ae5",
      "user": "613ac23b4927dd6685ad1cdb",
      "title": " note 1",
      "description": "this is a note  1",
      "tag": "personal",
      "date": "1631377744744",
      "__v": 0
    }
  ]

  const [notes, setNotes] = useState(notesinitial);

  //add a note
  const addNote = (title, description, tag) => {
    let note = {
      "_id": "613cd979c0b7920a3k81f6ae5",
      "user": "613ac23b4927dd6685ad1cdb",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "1631377744744",
      "__v": 0
    };
    setNotes(notes.concat(note));
  }
  
  
  //delete a note
  const deleteNote = (id) => {
    console.log(id);
    const newNotes = notes.filter((note) => {return note._id!==id})
    setNotes(newNotes);
  }

  //edit a note
  const editNote = () => {

  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;