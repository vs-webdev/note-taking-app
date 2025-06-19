import iconTag from '../assets/images/icon-tag.svg'
import iconClock from '../assets/images/icon-clock.svg'
import { useNote } from '../context/NoteContext'

const NoteContent = ({dateFormat}) => {
  const {selectedNote} = useNote()
  return (
    <div className="detailed-note-wrapper">
      <header className="detailed-note-header">
        <h2>{selectedNote.title}</h2>
        <div className="detailed-note-tags">
          <span><img src={iconTag} alt="" /> Tags</span>
          <ul>{selectedNote.tags.map((tag, tagIndex) => <li key={tagIndex}>{tag}</li>)}</ul>
        </div>
        <div className="detailed-note-edited">
          <span><img src={iconClock} alt="" /> Last Edited</span>
          <p>{dateFormat(selectedNote.lastEdited)}</p>
        </div>
      </header>
      <div className="detailed-note-content">
        <pre>{selectedNote.content}</pre>
      </div>
    </div>
  )
}

export default NoteContent
