import { useEffect, useState } from 'react'
import iconTag from '../../assets/images/icon-tag.svg'
import iconClock from '../../assets/images/icon-clock.svg'
import { useNote } from '../../context/NoteContext'
import { useApi } from '../../api/axioinstance'

const NoteContent = ({dateFormat}) => {
  const api = useApi()
  const {selectedNote, notes, setAllNotes, allNotes, setTags} = useNote()
  const [isEditing, setIsEditing] = useState({
    title: false, 
    tags: false,
    content: false
  })
  const [editData, setEditData] = useState({
    title: selectedNote?.title,
    tags: selectedNote?.tags.join(', '),
    content: selectedNote?.content,
  })

  const startEditing = (field) => setIsEditing(prev => ({...prev, [field]: true}))

  useEffect(() => {
    setEditData({
      title: selectedNote?.title,
      tags: selectedNote?.tags.join(', '),
      content: selectedNote?.content,
    })

    setIsEditing({
      title: false,
      tags: false,
      content: false
    })
  }, [selectedNote])

  const onSubmit = async () => {
    if (!editData.title.trim() || !editData.tags.trim() || !editData.content.trim()) return

    const updatedTags = editData.tags.split(',').map(tag => tag.trim()).filter(Boolean)

    try {
      const res = await api.put(`/user/notes/${selectedNote._id}`, {...editData, tags: updatedTags})
      if (res.data.success){
        const newNotes = allNotes.map(note => note._id === selectedNote._id ? res.data.updatedNote : note)
        setAllNotes(newNotes)

        // Update Tags
        const isTagsChanged = selectedNote.tags.join(', ') !== editData.tags
        if (isTagsChanged){
          const tags = [...new Set(newNotes.flatMap(note => note.tags))]
          setTags(tags)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onCancel = () => {
    setEditData({
      title: selectedNote?.title,
      tags: selectedNote?.tags.join(', '),
      content: selectedNote?.content,
    })

    setIsEditing({
      title: false,
      tags: false,
      content: false
    })
  }
  
  return (
    <div className="detailed-note-wrapper">
      {notes.length > 0 ? 
      <><header className="detailed-note-header">
        <div className="detailed-note-title">
          {isEditing.title ? (
            <input
              type="text"
              value={editData?.title}
              onChange={e => setEditData(prev => ({...prev, title: e.target.value}))}
            />
          ) : (
            <h2 onClick={() => startEditing('title')}>{selectedNote?.title}</h2>
          )}
        </div>

        <div className="detailed-note-tags">
          <span><img src={iconTag} alt="Icon Tag" /> Tags</span>
          {isEditing.tags ? (
            <input 
              type="text" 
              value={editData.tags} 
              onChange={e => setEditData(prev => ({...prev, tags: e.target.value}))}
            />
          ) : (
            <ul onClick={() => startEditing('tags')}>{selectedNote?.tags?.map((tag, tagIndex) => 
              <li key={tagIndex}>{tag}</li>
            )}</ul>
          )}
        </div>

        <div className="detailed-note-edited">
          <span><img src={iconClock} alt="Icon Clock" /> Last Edited</span>
          <p>{dateFormat(selectedNote?.lastEdited)}</p>
        </div>
      </header>

      <div className="detailed-note-content">
        {isEditing.content ? (
          <textarea
            className='detailed-note-content'
            value={editData?.content}
            onChange={e => setEditData(prev => ({...prev, content: e.target.value}))}
          >
          </textarea>
        ) : (
          <pre onClick={() => startEditing('content')} className='detailed-note-content'>{selectedNote?.content}</pre>
        )}
      </div>

        <div className="btn-wrapper">
          <button onClick={onSubmit}>Submit</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </> :
      <p>You don’t have any notes available in this tab. Start a new note to capture your thoughts and ideas.</p>
      }
    </div>
  )
}

export default NoteContent
