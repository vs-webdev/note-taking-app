import { useState } from 'react'
import { useNote } from '../../context/NoteContext'
import { useApi } from '../../api/axioinstance'
import tagIcon from '../../assets/images/icon-tag.svg'
import lastEditedIcon from '../../assets/images/icon-clock.svg'
import styles from './newNote.module.css'

const NewNote = () => {
  const {setShowNewNote, setAllNotes, tags, setTags} = useNote()
  const [newNoteData, setNewNoteData] = useState({title: '', tags: '', content: ''})
  const api = useApi()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const validate = Object.values(newNoteData).filter(data => {
      const validateData = data.trim().replace(/,/g, '')
      return validateData.length
    })
    if (validate.length !== 3){
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
    
    const splitTags = newNoteData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    console.log(splitTags)

    try {
      const res = await api.post("/user/notes", {...newNoteData, tags: splitTags})
      console.log(res.data)
      // Updating allNotes with new note
      setAllNotes(prev => [
        res.data.newNote,
        ...prev
      ])
    } catch (error) {
      console.log(error.message)
    }

    // Updating Data tags with new tags
    setTags(prev => {
      const mergedTags = [...prev, ...newNoteTags]
      const uniqueTags = Array.from(new Set(mergedTags))
      return uniqueTags
    })
    setShowNewNote(false)
  }

  return (
    <div className={styles.detailedNoteWrapper}>
      <form className={styles.newNoteForm}>
        <header>
          <input
            type="text"
            placeholder="Enter a title..."
            className={`${styles.newNoteTitle} text-preset-1`}
            onChange={e => setNewNoteData(prev => ({...prev, title: e.target.value}))}
            value={newNoteData.title}
          />
          <div className={styles.newNoteMetaField}>
            <label id='tags' name='tags'>
              <img src={tagIcon} alt="Tag Icon" />
              <span>Tags</span>
            </label>
            <input 
              type="text"  
              placeholder="Add tags seperated by commas (e.g. Work, Planning)"
              onChange={e => setNewNoteData(prev => ({...prev, tags: e.target.value}))}
              className='text-preset-4'
              value={newNoteData.tags}
            />
          </div>
          <div className={styles.newNoteMetaField}>
            <label>
              <img src={lastEditedIcon} alt="Last Edited Icon" />
              <span>Last Edited</span>
            </label>
            <span>Not yet saved</span>
          </div>
        </header>
        <div className={styles.newNoteTextareaContainer}>
          <textarea 
            className={`${styles.newNoteTextarea} text-preset-3`} 
            id="content" 
            placeholder="Start typing your note here..."
            onChange={e => setNewNoteData(prev => ({...prev, content: e.target.value}))}
            value={newNoteData.content}
          ></textarea>
        </div>
        <div className={styles.newNoteBtnWrapper}>
          <button type='submit' onClick={handleSubmit}>Save Note</button>
          <button onClick={() => setShowNewNote(false)}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default NewNote
