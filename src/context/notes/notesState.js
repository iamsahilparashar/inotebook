import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesinitial = [];

  const [notes, setNotes] = useState(notesinitial);

  // get notes
  const getNotes = async () => {

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzYWMyM2I0OTI3ZGQ2Njg1YWQxY2RiIn0sImlhdCI6MTYzMTMyNzE2Mn0.aywVwQAvlfUFoexQYe1Pl_m0BA9MYADQNmclSwuVP34"
      },
    });

    const json = await response.json();
    console.log(json);
    setNotes(json);
  }




  //add a note
  const addNote = async (title, description, tag) => {

    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzYWMyM2I0OTI3ZGQ2Njg1YWQxY2RiIn0sImlhdCI6MTYzMTMyNzE2Mn0.aywVwQAvlfUFoexQYe1Pl_m0BA9MYADQNmclSwuVP34"
      },
      body: JSON.stringify({ title, description, tag })
    });

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
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);
  }



  //edit a note
  const editNote = async (id, title, description, tag) => {
    // url = ;
    const Id = "613c2343a24a6df0356b1b35";
    const response = await fetch(`${host}/api/notes/updatenote/${Id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzYWMyM2I0OTI3ZGQ2Njg1YWQxY2RiIn0sImlhdCI6MTYzMTMyNzE2Mn0.aywVwQAvlfUFoexQYe1Pl_m0BA9MYADQNmclSwuVP34"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();
    //Api call

    // logic to edit a client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote , getNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;