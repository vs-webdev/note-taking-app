import { useState } from "react"
import data from "../data"
import Header from './Header.jsx'

const Content = () => {
  const [notes, setNotes] = useState(data.notes)
  
  const dateFormat = (lastEdited) =>  new Date(lastEdited).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className='content-wrapper'>
      <Header />
      <div className="notes-detail-wrapper">
        <div className="notes-wrapper">
          <button>Create New Note</button>
          <div className="notes-list-container">
            <ul className="notes-list">
              {notes.map((note, index) =>
                <li className="note-item" key={index}>
                  <h1>{note.title}</h1>
                  <ul className="note-tags">{note.tags.map((tag, tagIndex) =>
                    <li key={tagIndex}>{tag}</li>
                  )}</ul>
                  <p>{dateFormat(note.lastEdited)}</p>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content
