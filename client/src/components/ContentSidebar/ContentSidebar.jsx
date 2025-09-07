import { useNote } from "../../context/NoteContext"
import { useView } from "../../context/ViewContext"
import "./contentsidebar.css"

const ContentSidebar = ({dateFormat}) => {
  const {currentView} = useView()
  const {notes, setSelectedNote, selectedNote, selectedTag, setShowNewNote, searchValue} = useNote()

  return (
    <div className="content-sidebar-wrapper">
      <button className="text-preset-5 new-note-btn" onClick={() => setShowNewNote(true)}>
        Create New Note
      </button>
      <div className="content-sidebar-info">
        {currentView === 'archivedNotes' && <p className="text-preset-5">All your archived notes are stored here. You can restore or delete them anytime.</p>}
        {currentView === 'tagNotes' && <p className="text-preset-5">All notes tagged with '{selectedTag}' are stored here.</p>}
        {currentView === 'searchNotes' && <p className="text-preset-5">All notes matching '{searchValue}' are displayed here.</p>}
      </div>
      {notes.length > 0 && 
      <div className="notes-list-container">
        <ul className="notes-list">
          {notes.map((note, index) =>
            <li 
              className={`note-item ${selectedNote?._id === note?._id ? 'active-note': ''}`} 
              key={index}
              onClick={() => setSelectedNote(notes[index])}
            >
              <h1 className="text-preset-3 note-title">{note.title}</h1>
              <ul className="note-tags">{note.tags.map((tag, tagIndex) =>
                <li key={tagIndex} className="text-preset-6">{tag}</li>
              )}</ul>
              <p className="text-preset-6 note-date">{dateFormat(note.lastEdited)}</p>
            </li>
          )}
        </ul>
      </div>}
    </div>
  )
}

export default ContentSidebar
