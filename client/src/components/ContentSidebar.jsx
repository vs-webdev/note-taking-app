import { useNote } from "../context/NoteContext"
import { useView } from "../context/ViewContext"

const ContentSidebar = ({dateFormat}) => {
  const {currentView} = useView()
  const {notes, setSelectedNote, selectedTag, setShowNewNote, searchValue} = useNote()

  return (
    <div className="content-sidebar-wrapper">
      <button onClick={() => setShowNewNote(true)}>Create New Note</button>
      {currentView === 'archivedNotes' && <p>All your archived notes are stored here. You can restore or delete them anytime.</p>}
      {currentView === 'tagNotes' && <p>All notes tagged with '{selectedTag}' are stored here.</p>}
      {currentView === 'searchNotes' && <p>All notes matching '{searchValue}' are displayed here.</p>}
      {notes.length > 0 && <div className="notes-list-container">
        <ul className="notes-list">
          {notes.map((note, index) =>
            <li 
              className="note-item" 
              key={index}
              onClick={() => setSelectedNote(notes[index])}
            >
              <h1>{note.title}</h1>
              <ul className="note-tags">{note.tags.map((tag, tagIndex) =>
                <li key={tagIndex}>{tag}</li>
              )}</ul>
              <p>{dateFormat(note.lastEdited)}</p>
            </li>
          )}
        </ul>
      </div>}
    </div>
  )
}

export default ContentSidebar
