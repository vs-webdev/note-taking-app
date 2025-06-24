import { createContext, useContext, useEffect, useState } from "react";
import { useView } from "./ViewContext";
import data from "../data";

const NoteContext = createContext(null)

export const useNote = () => {
  const context = useContext(NoteContext)
  if (!context){
    throw new Error('useNote should be used within NoteProvider')
  }
  return context
}

export const NoteProvider = ({children}) => {
  const {currentView} = useView()
  const [tags, setTags] = useState(data.tags)
  const [allNotes, setAllNotes] = useState(data.notes)
  const initialNotes = allNotes.filter(note => !note.isArchived)
  const [notes, setNotes] = useState(initialNotes)
  const [selectedTag, setSelectedTag] = useState('')
  const [selectedNote, setSelectedNote] = useState(notes[0] || null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState({icon: null, title: ''})
  const [showNewNote, setShowNewNote] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const filterNotesByView = () => {
    switch(currentView){
      case 'allNotes':
        return allNotes.filter(note => !note.isArchived)

      case 'archivedNotes':
        return allNotes.filter(note => note.isArchived)

      case 'tagNotes':
        return allNotes.filter(note => note.tags.includes(selectedTag))

      case 'searchNotes': {
        if (!searchValue) return []
          return allNotes.filter(note =>  (
              note.title.toLowerCase().includes(searchValue) ||
              note.content.toLowerCase().includes(searchValue) ||
              note.tags.some(tag => tag.toLowerCase().includes(searchValue))
            )
          )
      }

      default:
        return []
    }
  }

  useEffect(() => {
    const filteredNotes = filterNotesByView()
    const sortedNotes = [...filteredNotes].sort(
      (a, b) => new Date(b.lastEdited) - new Date(a.lastEdited)
    )
    setNotes(sortedNotes)
  }, [currentView, allNotes, selectedTag, searchValue])
  
  useEffect(() => {
    setSelectedNote(notes.length > 0 ? notes[0] : null)
  }, [notes])

  const value = {
    tags, setTags,
    notes, setNotes,
    allNotes, setAllNotes,
    selectedNote, setSelectedNote,
    selectedTag, setSelectedTag,
    isModalOpen, setIsModalOpen,
    modalData, setModalData,
    showNewNote, setShowNewNote,
    searchValue, setSearchValue,
  }

  return <NoteContext.Provider value={value}>
    {children}
  </NoteContext.Provider>
}
