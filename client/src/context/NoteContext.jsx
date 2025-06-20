import { createContext, useContext, useState } from "react";
import data from "../data";

const NoteContext = createContext()

export const useNote = () => {
  const context = useContext(NoteContext)
  if (!context){
    throw new Error('useNote should be used within NoteProvider')
  }
  return context
}

export const NoteProvider = ({children}) => {
  const [notes, setNotes] = useState(data.allNotes)
  const [archivedNotes, setArchivedNotes] = useState(data.archivedNotes)
  const [selectedNote, setSelectedNote] = useState(notes[0])

  const value = {
    notes, setNotes,
    archivedNotes, setArchivedNotes,
    selectedNote, setSelectedNote,
  }

  return <NoteContext.Provider value={value}>
    {children}
  </NoteContext.Provider>
}
