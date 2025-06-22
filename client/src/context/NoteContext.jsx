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
  const [selectedNote, setSelectedNote] = useState(notes[0])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState({icon: null, title: ''})

  useEffect(() => {
    if (currentView === 'allNotes') setNotes(allNotes.filter(note => !note.isArchived))
    
    if (currentView === 'archivedNotes') setNotes(allNotes.filter(note => note.isArchived))
    
    if (currentView === 'tagNotes'){
      const newTaggedList = allNotes.filter(note => note.tags.find(tag => tag === selectedTag))
      setNotes(newTaggedList)
    }
  }, [currentView, allNotes])
  
  useEffect(() => {
    if (selectedTag){
      const newTaggedList = allNotes.filter(note => note.tags.find(tag => tag === selectedTag))
      setNotes(newTaggedList)
    }
  }, [selectedTag])
  
  useEffect(() => {
    setSelectedNote(notes[0])
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
