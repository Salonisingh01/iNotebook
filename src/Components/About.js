import React, { useContext, useEffect } from 'react'
import noteContext from '../Context/notes/NoteContext';

export const About = () => {
  const a = useContext(noteContext);
  useEffect(() => {
    a.update();
  }, [])
    
 
  return (
    <div>This is about {a.state.class} and she is in class {a.state.class}.</div>
  )
}
