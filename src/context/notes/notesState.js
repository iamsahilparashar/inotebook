import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
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
        }
      ]

      const [notes, setNotes] = useState(notesinitial)
      
    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;