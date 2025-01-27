import React, { useState } from "react";
import NoteContext from "./NoteContext";


//Creating all states for Notes--

const NoteState = (props) => {
 
    const s1 = {
        "name" :"saloni",
        "class":"5b"
    }
   const [state, setstate] = useState(s1);
  const update =()=>{
    setTimeout(() => {
        setstate({
            "name" :"Priya",
            "class":"10th a"
        })
    }, 1000);
   }
   
    return(
        <NoteContext.Provider value={{state,update}}>
           {props.children}
        </NoteContext.Provider>

    ) 

}


export default NoteState;