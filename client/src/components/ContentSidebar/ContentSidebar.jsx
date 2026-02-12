import { useNote } from "../../context/NoteContext"
import { useView } from "../../context/ViewContext"
import styles from "./contentSidebar.module.css"

const ContentSidebar = ({dateFormat}) => {
  const {currentView} = useView()
  const {notes, setSelectedNote, selectedNote, selectedTag, setShowNewNote, searchValue} = useNote()

  return (
    <div className={styles.contentSidebarWrapper}>
      <button className={`text-preset-5 
      ${styles.newNoteBtn}
      `}
        onClick={() => setShowNewNote(true)}
      >
        Create New Note
      </button>
      <div className={styles.contentSidebarInfo}>
        {currentView === 'archivedNotes' && <p className="text-preset-5">All your archived notes are stored here. You can restore or delete them anytime.</p>}
        {currentView === 'tagNotes' && <p className="text-preset-5">All notes tagged with '{selectedTag}' are stored here.</p>}
        {currentView === 'searchNotes' && <p className="text-preset-5">All notes matching '{searchValue}' are displayed here.</p>}
      </div>
      
      {notes.length > 0 && (
        <div className={`${styles.notesListContainer}`}>
          <ul className={`${styles.notesList}`}>
            {notes.map((note, index) =>
              <li 
                className={`${styles.noteItem} ${selectedNote?._id === note?._id ? styles.activeNote: ''}`} 
                key={index}
                onClick={() => setSelectedNote(notes[index])}
              >
                <h1 className={`text-preset-3 ${styles.noteTitle}`}>{note.title}</h1>
                <ul className={`${styles.noteTags}`}>
                  {note.tags.map((tag, tagIndex) =>
                    <li key={tagIndex} className="text-preset-6">{tag}</li>
                  )}
                </ul>
                <p className={`text-preset-6 ${styles.noteDate}`}>
                  {dateFormat(note.lastEdited)}
                </p>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ContentSidebar
