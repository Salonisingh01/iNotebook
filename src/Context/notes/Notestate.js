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
        "auth-token":localStorage.getItem('token')
            },
    });
    const json = await response.json()
     setnotes(json)
  };

  //Add a Note--------------->>>>>>>
  const addNote = async (title, description, tag) => {
    //To do api call---------
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "Post",
      headers: {
        "content-Type": "application/json",
        "auth-token":localStorage.getItem('token')

      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setnotes(notes.concat(note));
    // console.log(json);

    // console.log("Adding a New Note");
    // const note = {
    //   _id: "67cfd031bc2e5a0d16181450",
    //   user: "67cfcfc31a0e0ec05b49bde6",
    //   title: title,
    //   description: description,
    //   tag: tag,
    //   date: "2025-01-28T05:20:41.411Z",
    //   __v: 0,
    // };
  };

  //Delete a Note--------------->>>>>>>
  const deleteNote = async(id) => {
    //api call
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "content-Type": "application/json",
        "auth-token":localStorage.getItem('token')

      },
    });
    const json = await response.json();
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
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
        
      },
      body: JSON.stringify({ title, description, tag }),
    });
 
    const json = await response.json();
    console.log(json);


    let newNotes = JSON.parse(JSON.stringify(notes)); //changing the fronted  
    //Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    console.log(notes)
    setnotes(newNotes)
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

