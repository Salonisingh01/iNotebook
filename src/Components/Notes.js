import { useContext,useEffect } from "react";
import noteContext from "../Context/notes/NoteContext";
import Noteitem from "./Noteitem";
import { AddNote } from "./AddNote";

export const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <AddNote />
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <Noteitem note={note} key={note._id} />;
        })}
      </div>
    </>
  );
};
