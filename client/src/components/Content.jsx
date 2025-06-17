import { useState } from "react"
import iconArchive from '../assets/images/icon-archive.svg'
import iconDelete from '../assets/images/icon-delete.svg'
import data from "../data"
import Header from './Header.jsx'
import ContentSidebar from "./ContentSidebar.jsx"
import NoteContent from "./NoteContent.jsx"

const Content = () => {
  const [notes, setNotes] = useState(data.notes)
  const [selectedNote, setSelectedNote] = useState(notes[0])
  
  const dateFormat = (lastEdited) =>  new Date(lastEdited).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <section className='content-wrapper'>
      <Header />
      <div className="notes-detail-wrapper">
        <ContentSidebar 
          notes={notes} 
          dateFormat={dateFormat}
          setSelectedNote={setSelectedNote}
        />

        <NoteContent 
          selectedNote={selectedNote}
          dateFormat={dateFormat}
        />

        <div className="action-btns-wrapper">
          <button><img src={iconArchive} alt="" /> Archive Notes</button>
          <button><img src={iconDelete} alt="" /> Delete Notes</button>
        </div>
      </div>
    </section>
  )
}

export default Content
