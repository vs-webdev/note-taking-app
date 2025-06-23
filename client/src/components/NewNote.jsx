import tagIcon from '../assets/images/icon-tag.svg'
import lastEditedIcon from '../assets/images/icon-clock.svg'
import { useNote } from '../context/NoteContext'
import { useState } from 'react'
import {v4 as uuidv4} from 'uuid'

const NewNote = () => {
  const {setShowNewNote, setAllNotes, tags, setTags} = useNote()
  const [newNoteData, setNewNoteData] = useState({title: '', tags: '', content: ''})
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const validate = Object.values(newNoteData).filter(data => {
      const validateData = data.trim().replace(/,/g, '')
      return validateData.length
    })
    if (validate.length !== 3){
      console.log('no')
      return
    }
    let newNoteTags = newNoteData.tags
      .split(',')
      .map(tag => {
        tag = tag.trim();
        const existingTag = tags.find(existing => tag.toLowerCase() === existing.toLowerCase())
        console.log(existingTag)
        return existingTag || tag
      })

    // Updating tags with new tags
    setTags(prev => {
      const mergedTags = [...prev, ...newNoteTags]
      const uniqueTags = Array.from(new Set(mergedTags))
      return uniqueTags
    })

    setAllNotes(prev => [
      {
        "id": uuidv4(),
        "title": newNoteData.title,
        "tags": newNoteTags,
        "content": newNoteData.content,
        "lastEdited": new Date().toISOString(),
        "isArchived": false
      },
      ...prev
    ])

    setShowNewNote(false)
  }

  return (
    <div className="detailed-note-wrapper">
      <form className='new-note-form'>
        <header>
          <input
            type="text"
            placeholder="Enter a title..."
            className='new-note-title'
            onChange={e => setNewNoteData(prev => ({...prev, title: e.target.value}))}
            value={newNoteData.title}
          />
          <div className="new-note-meta-field">
            <label id='tags' name='tags'>
              <img src={tagIcon} alt="Tag Icon" />
              <span>Tags</span>
            </label>
            <input 
              type="text"  
              placeholder="Add tags seperated by commas (e.g. Work, Planning)"
              onChange={e => setNewNoteData(prev => ({...prev, tags: e.target.value}))}
              value={newNoteData.tags}
            />
          </div>
          <div className="new-note-meta-field">
            <label>
              <img src={lastEditedIcon} alt="Last Edited Icon" />
              <span>Last Edited</span>
            </label>
            <span>Note yet saved</span>
          </div>
        </header>
        <div className="new-note-textarea-container">
          <textarea 
            className="new-note-textarea" 
            id="content" 
            placeholder="Start typing your note here..."
            onChange={e => setNewNoteData(prev => ({...prev, content: e.target.value}))}
            value={newNoteData.content}
          ></textarea>
        </div>
        <div className="new-note-btn-wrapper">
          <button type='submit' onClick={handleSubmit}>Save Note</button>
          <button onClick={() => setShowNewNote(false)}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default NewNote
