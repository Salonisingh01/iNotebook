import React, { useState } from "react";
import NoteContext from "./NoteContext";

//Creating all states for Notes--

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setnotes] = useState(notesInitial);

  //Get all Notes--------------->>>>>>>
  const getNotes = async () => {
    //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc5ODY4NmU0NGU3ZjgyMDE2ODYxYmI5In0sImlhdCI6MTczODA0MTQ1NH0.M2RaFLEoR4xs5rZ6ZfBef6W7v9al4Tz4QoxYIXxdOco"
            },
    });
    const json = await response.json()
    console.log(json);
    setnotes(json)
  };

  //Add a Note--------------->>>>>>>
  const addNote = async (title, description, tag) => {
    //To do api call---------
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "Post",
      headers: {
        "content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc5ODY4NmU0NGU3ZjgyMDE2ODYxYmI5In0sImlhdCI6MTczODA0MTQ1NH0.M2RaFLEoR4xs5rZ6ZfBef6W7v9al4Tz4QoxYIXxdOco"
      },
      body: JSON.stringify({ title, description, tag }),
    });

    console.log("Adding a New Note");
    const note = {
      _id: "67983692944e7f8254555016861bc1",
      user: "6798686e44e7f82016861bb9",
      title: title,
      description: description,
      tag: tag,
      date: "2025-01-28T05:20:41.411Z",
      __v: 0,
    };
    setnotes(notes.concat(note));
  };

  //Delete a Note--------------->>>>>>>
  const deleteNote = async(id) => {
    //api call
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc5ODY4NmU0NGU3ZjgyMDE2ODYxYmI5In0sImlhdCI6MTczODA0MTQ1NH0.M2RaFLEoR4xs5rZ6ZfBef6W7v9al4Tz4QoxYIXxdOco"
      },
    });
    const json = response.json();
    console.log(json);

    console.log("Deleting the node with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNotes);
  };

  



  //Edit a Note--------------->>>>>>>
  const editNote = async (id, title, description, tag) => {
   
    //To do api call
    const response = await fetch(`${host}/api/notes/${id}`, {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc5NzJkOGU4ODFmYzdlNDUwYzI0ZTI5In0sImlhdCI6MTczNzk2MDg0Nn0.x2VFxmATwydsv2TaHI5miL3Upj19t07dkzD9l_CsnPg",
      },
      body: JSON.stringify({ title, description, tag }),
    });
 
    const json = response.json();
    console.log(json);

    //Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

