import { createContext, useContext, useEffect, useState } from "react";
import { useView } from "./ViewContext";
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
  const {currentView} = useView()
  const [allNotes, setAllNotes] = useState(data.notes)
  const initialNotes = allNotes.filter(note => !note.isArchived)
  const [notes, setNotes] = useState(initialNotes)
  const [selectedTag, setSelectedTag] = useState('')
  const [selectedNote, setSelectedNote] = useState(notes[0] || null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState({icon: null, title: ''})

  const filterNotesByView = () => {
    switch(currentView){
      case 'allNotes':
        return allNotes.filter(note => !note.isArchived)

      case 'archivedNotes':
        return allNotes.filter(note => note.isArchived)

      case 'tagNotes':
        return allNotes.filter(note => note.tags.includes(selectedTag))

      default:
        return []
    }
  }

  useEffect(() => {
    const filteredNotes = filterNotesByView()
    setNotes(filteredNotes)
  }, [currentView, allNotes, selectedTag])
  
  useEffect(() => {
    setSelectedNote(notes.length > 0 ? notes[0] : null)
  }, [notes])

  const value = {
    notes, setNotes,
    allNotes, setAllNotes,
    selectedNote, setSelectedNote,
    selectedTag, setSelectedTag,
    isModalOpen, setIsModalOpen,
    modalData, setModalData,
  }

  return <NoteContext.Provider value={value}>
    {children}
  </NoteContext.Provider>
}
