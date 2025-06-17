
const ContentSidebar = ({notes, setSelectedNote, dateFormat}) => {
  return (
    <div className="content-sidebar-wrapper">
      <button>Create New Note</button>
      <div className="notes-list-container">
        <ul className="notes-list">
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
        </ul>
      </div>
    </div>
  )
}

export default ContentSidebar
