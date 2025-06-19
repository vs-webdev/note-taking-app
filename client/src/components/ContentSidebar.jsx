import { useNote } from "../context/NoteContext"
import { useView } from "../context/ViewContext"

const ContentSidebar = ({dateFormat}) => {
  const {currentView} = useView()
  const {notes, setSelectedNote, archivedNotes} = useNote()

  return (
    <div className="content-sidebar-wrapper">
      <button>Create New Note</button>
      <div className="notes-list-container">
        {currentView === 'allNotes' && <ul className="notes-list">
          {notes.map((note, index) =>
            <li className="note-item" key={index}
              onClick={() => setSelectedNote(notes[index])}
            >
              <h1>{note.title}</h1>
              <ul className="note-tags">{note.tags.map((tag, tagIndex) =>
                <li key={tagIndex}>{tag}</li>
              )}</ul>
              <p>{dateFormat(note.lastEdited)}</p>
            </li>
          )}
        </ul>}

        {currentView === 'archivedNotes' &&
          <div className="archived-container">
            <p>All your archived notes are stored here. You can restore or delete them anytime.</p>
            <ul className="notes-list">
              {archivedNotes.map((note, archivedIndex) => 
              <li className="note-item" key={archivedIndex}
                onClick={() => setSelectedNote(archivedNotes[archivedIndex])}
              >
                <h1>{note.title}</h1>
                <ul className="note-tags">{note.tags.map((tag, tagIndex) =>
                  <li key={tagIndex}>{tag}</li>
                )}</ul>
                <p>{dateFormat(note.lastEdited)}</p>
              </li>)}
            </ul>
          </div>}
      </div>
    </div>
  )
}

export default ContentSidebar
