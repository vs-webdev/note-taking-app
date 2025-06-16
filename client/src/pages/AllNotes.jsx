import { useState } from 'react'
import NavSidebar from '../components/NavSidebar.jsx'
import Content from '../components/Content.jsx'

const AllNotes = () => {
  const [selectedNote, setSelectedNote] = useState()
  
  return (
    <main className="note-app-container">
      <NavSidebar />
      <Content />
    </main>
  )
}

export default AllNotes